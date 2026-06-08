import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Retrieve banks (optionally filter by countrySlug or slug)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countrySlug = searchParams.get("countrySlug");
    const slug = searchParams.get("slug");
    const includePending = searchParams.get("includePending") === "true";

    let sql = "SELECT * FROM banks";
    const params: any[] = [];

    if (slug) {
      sql += " WHERE slug = $1";
      params.push(slug);
      if (!includePending) {
        sql += " AND status = 'approved'";
      }
    } else if (countrySlug) {
      sql += " WHERE country_slug = $1";
      params.push(countrySlug);
      if (!includePending) {
        sql += " AND status = 'approved'";
      }
    } else if (!includePending) {
      sql += " WHERE status = 'approved'";
    }

    sql += " ORDER BY id DESC;";

    const result = await query(sql, params);

    const banks = result.rows.map((row) => ({
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
      interestRate: row.interest_rate,
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

    if (slug && banks.length === 0) {
      return NextResponse.json(
        { success: false, error: "Bank not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      banks: slug ? banks[0] : banks,
    });
  } catch (error: any) {
    console.error("Fetch banks API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch banks from database." },
      { status: 500 }
    );
  }
}

// POST - Create / submit a new bank
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      slug,
      name,
      rating,
      activeUsers,
      likes,
      country,
      countrySlug,
      type,
      logoColor,
      logoLetter,
      summary,
      features,
      charges,
      interestRate,
      platforms,
      pros,
      cons,
      categoryRatings,
      detailedReview,
      detailedArticle,
      addedBy,
      userRole,
    } = body;

    if (!slug || !name || !summary || !countrySlug) {
      return NextResponse.json(
        { success: false, error: "Slug, name, summary and countrySlug are required." },
        { status: 400 }
      );
    }

    const status = userRole === "ADMIN" ? "approved" : "pending";

    const result = await query(
      `INSERT INTO banks (
        slug, name, rating, active_users, likes, country, country_slug, type,
        logo_color, logo_letter, summary, features, charges, interest_rate,
        platforms, pros, cons, category_ratings, detailed_review, detailed_article,
        status, added_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      RETURNING *;`,
      [
        slug.trim().toLowerCase(),
        name.trim(),
        Number(rating) || 4.0,
        activeUsers || "10 Million+",
        Number(likes) || 0,
        country || "India",
        countrySlug.trim().toLowerCase(),
        type || "Traditional Savings",
        logoColor || "#6366f1",
        logoLetter || name.charAt(0).toUpperCase(),
        summary.trim(),
        JSON.stringify(features || {}),
        JSON.stringify(charges || {}),
        interestRate || "2.5% p.a.",
        platforms || ["Mobile App", "Online Web"],
        pros || [],
        cons || [],
        JSON.stringify(categoryRatings || { rates: 4.0, usability: 4.0, customerService: 4.0 }),
        JSON.stringify(detailedReview || {}),
        detailedArticle ? JSON.stringify(detailedArticle) : null,
        status,
        addedBy || "unknown@ipopreipo.com",
      ]
    );

    return NextResponse.json({
      success: true,
      bank: result.rows[0],
      message: status === "approved" ? "Bank published directly." : "Bank submitted to review queue.",
    });
  } catch (error: any) {
    console.error("Create bank API error:", error);
    if (error.code === "23505") {
      return NextResponse.json(
        { success: false, error: "A bank with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to save bank to database." },
      { status: 500 }
    );
  }
}
