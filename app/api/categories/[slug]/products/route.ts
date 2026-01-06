import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    console.log(slug);
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug inválido" }, { status: 400 });
    }

    const catRes = await turso.execute({
      sql: "SELECT id FROM categories WHERE slug = ?",
      args: [slug.trim()],
    });

    if (catRes.rows.length === 0) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 }
      );
    }
    const categoryId = catRes.rows[0].id as string;
    console.log(categoryId);
    const result = await turso.execute({
      sql: "SELECT * FROM products WHERE category_id = ? ORDER BY created_at DESC",
      args: [categoryId],
    });

    const baseProducts = result.rows.map((row) => ({
      id: row.id as string,
      name: row.name as string,
      description: (row.description as string) ?? null,
      price: Number(row.price),
      image: (row.image as string) ?? null,
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

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erro ao buscar produtos por slug" },
      { status: 500 }
    );
  }
}
