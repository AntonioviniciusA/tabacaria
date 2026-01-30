import { NextResponse } from "next/server"
import { turso } from "@/lib/turso"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },

) {
  try {
    const { id } = await params;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    const body = await req.json();
    const { name, slug } = body;

    if (
      !name ||
      typeof name !== "string" ||
      !slug ||
      typeof slug !== "string"
    ) {
      return NextResponse.json(
        { error: "Nome ou slug inválido" },
        { status: 400 },
      );
    }
    const result = await turso.execute({
      sql: "UPDATE categories SET name = ?, slug = ? WHERE id = ?",
      args: [name.trim(), slug.trim(), id.trim()],
    });
    if (result.rowsAffected === 0) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Categoria atualizada com sucesso" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erro ao atualizar categoria" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }
    const result = await turso.execute({
      sql: "DELETE FROM categories WHERE id = ?",
      args: [id.trim()],
    });
    if (result.rowsAffected === 0) {
      return NextResponse.json(
        { error: "Categoria não encontrada" },
        { status: 404 },
      );
    }
    return NextResponse.json({ message: "Categoria deletada com sucesso" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Erro ao deletar categoria" },
      { status: 500 },
    );
  }
}
