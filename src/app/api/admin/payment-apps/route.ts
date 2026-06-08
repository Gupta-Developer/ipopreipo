import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Retrieve all payment apps with optional status filter for Admin review
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let sql = "SELECT * FROM payment_apps";
    const params: any[] = [];

    if (status) {
      sql += " WHERE status = $1";
      params.push(status);
    }

    sql += " ORDER BY id DESC;";

    const result = await query(sql, params);

    const paymentApps = result.rows.map((row) => ({
      id: String(row.id),
      slug: row.slug,
      name: row.name,
      rating: Number(row.rating),
      activeUsers: row.active_users,
      likes: row.likes,
      country: row.country,
      countrySlug: row.country_slug,
      type: row.type,
      logoColor: row.logo_color,
      logoLetter: row.logo_letter,
      summary: row.summary,
      features: typeof row.features === "string" ? JSON.parse(row.features) : row.features,
      charges: typeof row.charges === "string" ? JSON.parse(row.charges) : row.charges,
      limits: typeof row.limits === "string" ? JSON.parse(row.limits) : row.limits,
      platforms: row.platforms,
      pros: row.pros,
      cons: row.cons,
      categoryRatings: typeof row.category_ratings === "string" ? JSON.parse(row.category_ratings) : row.category_ratings,
      detailedReview: typeof row.detailed_review === "string" ? JSON.parse(row.detailed_review) : row.detailed_review,
      detailedArticle: row.detailed_article ? (typeof row.detailed_article === "string" ? JSON.parse(row.detailed_article) : row.detailed_article) : null,
      status: row.status,
      addedBy: row.added_by,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ success: true, paymentApps });
  } catch (error: any) {
    console.error("Admin fetch payment apps API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch payment apps." },
      { status: 500 }
    );
  }
}

// PUT - Update approval status of a payment app
export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "App ID and status are required." },
        { status: 400 }
      );
    }

    const result = await query(
      "UPDATE payment_apps SET status = $1 WHERE id = $2 RETURNING id, name, status;",
      [status, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Payment app not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentApp: result.rows[0],
      message: `Payment app status updated to ${status}.`,
    });
  } catch (error: any) {
    console.error("Admin update payment app status error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update payment app." },
      { status: 500 }
    );
  }
}

// DELETE - Remove a payment app
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "App ID is required." },
        { status: 400 }
      );
    }

    const result = await query("DELETE FROM payment_apps WHERE id = $1 RETURNING id;", [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Payment app not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Payment app deleted successfully." });
  } catch (error: any) {
    console.error("Admin delete payment app error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete payment app." },
      { status: 500 }
    );
  }
}
