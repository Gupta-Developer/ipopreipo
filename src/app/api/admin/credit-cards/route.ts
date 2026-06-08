import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let sql = "SELECT * FROM credit_cards";
    const params: any[] = [];
    if (status) { sql += " WHERE status = $1"; params.push(status); }
    sql += " ORDER BY id DESC;";

    const result = await query(sql, params);
    const creditCards = result.rows.map((row) => ({
      id: String(row.id), slug: row.slug, name: row.name,
      overallRating: Number(row.overall_rating), type: row.type,
      bestFor: row.best_for, issuer: row.issuer, issuerCode: row.issuer_code,
      network: row.network, likes: row.likes, description: row.description,
      featuresChecklist: typeof row.features_checklist === "string" ? JSON.parse(row.features_checklist) : row.features_checklist,
      perks: typeof row.perks === "string" ? JSON.parse(row.perks) : row.perks,
      fees: typeof row.fees === "string" ? JSON.parse(row.fees) : row.fees,
      latePaymentCharges: typeof row.late_payment_charges === "string" ? JSON.parse(row.late_payment_charges) : row.late_payment_charges,
      pros: row.pros, cons: row.cons,
      ratingsBreakdown: typeof row.ratings_breakdown === "string" ? JSON.parse(row.ratings_breakdown) : row.ratings_breakdown,
      reviewTitle: row.review_title, reviewContent: row.review_content,
      reviewOverviewTable: typeof row.review_overview_table === "string" ? JSON.parse(row.review_overview_table) : row.review_overview_table,
      country: row.country,
      detailedArticle: row.detailed_article ? (typeof row.detailed_article === "string" ? JSON.parse(row.detailed_article) : row.detailed_article) : null,
      status: row.status, addedBy: row.added_by, createdAt: row.created_at,
    }));
    return NextResponse.json({ success: true, creditCards });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Failed to fetch credit cards." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) return NextResponse.json({ success: false, error: "ID and status required." }, { status: 400 });
    const result = await query("UPDATE credit_cards SET status = $1 WHERE id = $2 RETURNING id, name, status;", [status, id]);
    if (result.rows.length === 0) return NextResponse.json({ success: false, error: "Credit card not found." }, { status: 404 });
    return NextResponse.json({ success: true, creditCard: result.rows[0], message: `Status updated to ${status}.` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Failed to update credit card." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: "ID required." }, { status: 400 });
    const result = await query("DELETE FROM credit_cards WHERE id = $1 RETURNING id;", [id]);
    if (result.rows.length === 0) return NextResponse.json({ success: false, error: "Credit card not found." }, { status: 404 });
    return NextResponse.json({ success: true, message: "Credit card deleted successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Failed to delete credit card." }, { status: 500 });
  }
}
