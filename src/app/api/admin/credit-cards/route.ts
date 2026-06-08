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

// PUT - Update approval status or full details of a credit card
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, name } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Credit Card ID is required." },
        { status: 400 }
      );
    }

    if (name) {
      const {
        slug,
        overallRating,
        type,
        bestFor,
        issuer,
        issuerCode,
        network,
        likes,
        description,
        featuresChecklist,
        perks,
        fees,
        latePaymentCharges,
        pros,
        cons,
        ratingsBreakdown,
        reviewTitle,
        reviewContent,
        reviewOverviewTable,
        country,
        detailedArticle,
      } = body;

      const result = await query(
        `UPDATE credit_cards SET 
          slug = $1, name = $2, overall_rating = $3, type = $4, best_for = $5,
          issuer = $6, issuer_code = $7, network = $8, likes = $9, description = $10,
          features_checklist = $11, perks = $12, fees = $13, late_payment_charges = $14,
          pros = $15, cons = $16, ratings_breakdown = $17, review_title = $18,
          review_content = $19, review_overview_table = $20, country = $21,
          detailed_article = $22, status = COALESCE($23, status)
        WHERE id = $24 RETURNING *;`,
        [
          slug,
          name,
          Number(overallRating) || 4.0,
          type,
          bestFor,
          issuer,
          issuerCode,
          network,
          Number(likes) || 0,
          description,
          JSON.stringify(featuresChecklist || {}),
          JSON.stringify(perks || []),
          JSON.stringify(fees || {}),
          JSON.stringify(latePaymentCharges || []),
          pros,
          cons,
          JSON.stringify(ratingsBreakdown || {}),
          reviewTitle,
          reviewContent,
          JSON.stringify(reviewOverviewTable || []),
          country,
          detailedArticle ? JSON.stringify(detailedArticle) : null,
          status,
          id,
        ]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Credit card not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        creditCard: result.rows[0],
        message: "Credit card details updated successfully.",
      });
    } else {
      if (!status) {
        return NextResponse.json(
          { success: false, error: "ID and status required." },
          { status: 400 }
        );
      }

      const result = await query(
        "UPDATE credit_cards SET status = $1 WHERE id = $2 RETURNING id, name, status;",
        [status, id]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Credit card not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        creditCard: result.rows[0],
        message: `Status updated to ${status}.`,
      });
    }
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
