import { NextResponse } from "next/server"
import { turso } from "@/lib/turso"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Slug inválido" }, { status: 400 })
    }

    const result = await turso.execute({
      sql: "SELECT id, name, slug FROM categories WHERE slug = ?",
      args: [slug.trim()],
    })

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Categoria não encontrada" }, { status: 404 })
    }

    const row = result.rows[0]
    return NextResponse.json({
      id: row.id as string,
      name: row.name as string,
      slug: row.slug as string,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Erro ao buscar categoria" }, { status: 500 })
  }
}

