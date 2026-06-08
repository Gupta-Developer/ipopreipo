import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Retrieve all brokers with optional status filter for Admin review
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let sql = "SELECT * FROM brokers";
    const params: any[] = [];

    if (status) {
      sql += " WHERE status = $1";
      params.push(status);
    }

    sql += " ORDER BY id DESC;";

    const result = await query(sql, params);

    const brokers = result.rows.map((row) => ({
      id: String(row.id),
      slug: row.slug,
      name: row.name,
      country: row.country,
      countryName: row.country_name,
      rating: Number(row.rating),
      type: row.type,
      depository: row.depository,
      activeClients: row.active_clients,
      likes: row.likes,
      summary: row.summary,
      logoColor: row.logo_color,
      logoLetter: row.logo_letter,
      segments: typeof row.segments === "string" ? JSON.parse(row.segments) : row.segments,
      charges: typeof row.charges === "string" ? JSON.parse(row.charges) : row.charges,
      brokerage: typeof row.brokerage === "string" ? JSON.parse(row.brokerage) : row.brokerage,
      margins: typeof row.margins === "string" ? JSON.parse(row.margins) : row.margins,
      platforms: row.platforms,
      pros: row.pros,
      cons: row.cons,
      additionalFeatures: typeof row.additional_features === "string" ? JSON.parse(row.additional_features) : row.additional_features,
      otherInvestments: typeof row.other_investments === "string" ? JSON.parse(row.other_investments) : row.other_investments,
      categoryRatings: typeof row.category_ratings === "string" ? JSON.parse(row.category_ratings) : row.category_ratings,
      detailedReviews: typeof row.detailed_reviews === "string" ? JSON.parse(row.detailed_reviews) : row.detailed_reviews,
      taxes: typeof row.taxes === "string" ? JSON.parse(row.taxes) : row.taxes,
      detailedArticle: row.detailed_article ? (typeof row.detailed_article === "string" ? JSON.parse(row.detailed_article) : row.detailed_article) : null,
      status: row.status,
      addedBy: row.added_by,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ success: true, brokers });
  } catch (error: any) {
    console.error("Admin fetch brokers API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch brokers." },
      { status: 500 }
    );
  }
}

// PUT - Update approval status of a broker
export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Broker ID and status are required." },
        { status: 400 }
      );
    }

    const result = await query(
      "UPDATE brokers SET status = $1 WHERE id = $2 RETURNING id, name, status;",
      [status, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Broker not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      broker: result.rows[0],
      message: `Broker status updated to ${status}.`,
    });
  } catch (error: any) {
    console.error("Admin update broker status error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update broker." },
      { status: 500 }
    );
  }
}

// DELETE - Remove a broker
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Broker ID is required." },
        { status: 400 }
      );
    }

    const result = await query("DELETE FROM brokers WHERE id = $1 RETURNING id;", [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Broker not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Broker deleted successfully." });
  } catch (error: any) {
    console.error("Admin delete broker error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete broker." },
      { status: 500 }
    );
  }
}
