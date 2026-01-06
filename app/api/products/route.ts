import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const categoryId = url.searchParams.get("categoryId");
    console.log("[API] /api/products GET params:", {
      categoryId,
    });

    let sql = "SELECT * FROM products";
    const args: any[] = [];

    if (categoryId) {
      sql += " WHERE category_id = ?";
      args.push(categoryId);
    }

    sql += " ORDER BY created_at DESC";
    console.log("[API] /api/products SQL:", sql, "args:", args);

    const result = await turso.execute({
      sql,
      args,
    });
    const baseProducts = result.rows.map((row) => ({
      id: row.id as string,
      name: row.name as string,
      description: row.description as string | null,
      price: row.price as number,
      image: row.image as string | null,
      categoryId: row.category_id as string,
    }));
    const products = await Promise.all(
      baseProducts.map(async (p) => {
        const imagesRes = await turso.execute({
          sql: "SELECT image_data FROM product_images WHERE product_id = ? ORDER BY created_at DESC",
          args: [p.id],
        });
        const extraImages = imagesRes.rows.map((r) => r.image_data as string);
        return { ...p, extraImages };
      })
    );
    console.log("[API] /api/products result count:", products.length);
    return NextResponse.json(products);
  } catch (error: any) {
    console.error(
      "[API] /api/products error:",
      error?.message || String(error)
    );
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, price, image, categoryId } = await req.json();

    if (!name || price === undefined || !categoryId) {
      return NextResponse.json(
        { error: "Nome, preço e categoria são obrigatórios" },
        { status: 400 }
      );
    }

    const normalizeMoney = (val: unknown) => {
      if (val === null) return null;
      if (typeof val === "number") return val;
      if (typeof val === "string") {
        const s = val.trim();
        if (s === "") return null;
        const n = Number(
          s
            .replace(/[^\d,.-]/g, "")
            .replace(".", "")
            .replace(",", ".")
        );
        return Number.isFinite(n) ? n : null;
      }
      return null;
    };
    const priceNorm = normalizeMoney(price);
    if (priceNorm === null) {
      return NextResponse.json({ error: "Preço inválido" }, { status: 400 });
    }
    const catId = typeof categoryId === "string" ? categoryId.trim() : "";
    if (!catId) {
      return NextResponse.json(
        { error: "Categoria inválida" },
        { status: 400 }
      );
    }
    const catCheck = await turso.execute({
      sql: "SELECT id FROM categories WHERE id = ?",
      args: [catId],
    });
    if (catCheck.rows.length === 0) {
      return NextResponse.json(
        { error: "Categoria inexistente" },
        { status: 400 }
      );
    }

    const id = `prod_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    await turso.execute({
      sql: `INSERT INTO products (id, name, description, price, image, category_id)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [id, name, description || null, priceNorm, image || null, catId],
    });

    const product = {
      id,
      name,
      description: description || null,
      price: priceNorm,
      image: image || null,
      categoryId,
    };

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error(
      "[API] /api/products POST error:",
      error?.message || String(error)
    );
    return NextResponse.json(
      { error: error?.message || "Erro interno ao criar produto" },
      { status: 500 }
    );
  }
}
