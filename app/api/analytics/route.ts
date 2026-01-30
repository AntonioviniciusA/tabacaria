import { NextResponse } from "next/server"
import { turso } from "@/lib/turso"

export async function GET() {
  try {
    const result = await turso.execute("SELECT * FROM analytics ORDER BY clicks DESC")
    const analytics = result.rows.map((row) => ({
      productId: row.product_id as string,
      productName: row.product_name as string,
      clicks: row.clicks as number,
      lastClicked: row.last_clicked as string | null,
    }))
    return NextResponse.json(analytics)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    console.log(req.json);
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "productId é obrigatório" },
        { status: 400 }
      );
    }

    const result = await turso.execute({
      sql: `
        UPDATE analytics
        SET
          clicks = clicks + 1,
          last_clicked = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
        WHERE product_id = ?
      `,
      args: [productId],
    });

    if (result.rowsAffected === 0) {
      return NextResponse.json(
        { error: "Analytics não encontrado para este produto" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


