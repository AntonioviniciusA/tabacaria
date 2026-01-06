import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "ID de categoria inválido" },
        { status: 400 }
      );
    }

    console.log("[API] /api/categories/[id]/products GET id:", id);
    const result = await turso.execute({
      sql: "SELECT * FROM products WHERE category_id = ? ORDER BY created_at DESC",
      args: [id.trim()],
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

    console.log(
      "[API] /api/categories/[id]/products result count:",
      products.length
    );
    return NextResponse.json(products);
  } catch (error: any) {
    console.error(
      "[API] /api/categories/[id]/products error:",
      error?.message || String(error)
    );
    return NextResponse.json(
      { error: error?.message || "Erro ao buscar produtos da categoria" },
      { status: 500 }
    );
  }
}
