import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countrySlug = searchParams.get("countrySlug");
    const slug = searchParams.get("slug");
    const includePending = searchParams.get("includePending") === "true";

    let sql = "SELECT * FROM crypto_apps";
    const params: any[] = [];

    if (slug) {
      sql += " WHERE slug = $1";
      params.push(slug);
      if (!includePending) sql += " AND status = 'approved'";
    } else if (countrySlug) {
      sql += " WHERE country_slug = $1";
      params.push(countrySlug);
      if (!includePending) sql += " AND status = 'approved'";
    } else if (!includePending) {
      sql += " WHERE status = 'approved'";
    }

    sql += " ORDER BY id DESC;";
    const result = await query(sql, params);

    const cryptoApps = result.rows.map((row) => ({
      id: String(row.id), slug: row.slug, name: row.name,
      rating: Number(row.rating), activeUsers: row.active_users, likes: row.likes,
      country: row.country, countrySlug: row.country_slug, type: row.type,
      logoColor: row.logo_color, logoLetter: row.logo_letter, summary: row.summary,
      features: typeof row.features === "string" ? JSON.parse(row.features) : row.features,
      charges: typeof row.charges === "string" ? JSON.parse(row.charges) : row.charges,
      limits: typeof row.limits === "string" ? JSON.parse(row.limits) : row.limits,
      platforms: row.platforms, pros: row.pros, cons: row.cons,
      categoryRatings: typeof row.category_ratings === "string" ? JSON.parse(row.category_ratings) : row.category_ratings,
      detailedReview: typeof row.detailed_review === "string" ? JSON.parse(row.detailed_review) : row.detailed_review,
      status: row.status, addedBy: row.added_by, createdAt: row.created_at,
    }));

    if (slug && cryptoApps.length === 0) {
      return NextResponse.json({ success: false, error: "Crypto app not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, cryptoApps: slug ? cryptoApps[0] : cryptoApps });
  } catch (error: any) {
    console.error("Fetch crypto apps error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch crypto apps." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, name, rating, activeUsers, likes, country, countrySlug, type, logoColor, logoLetter,
      summary, features, charges, limits, platforms, pros, cons, categoryRatings, detailedReview, addedBy, userRole } = body;

    if (!slug || !name || !summary || !countrySlug) {
      return NextResponse.json({ success: false, error: "Slug, name, summary and countrySlug are required." }, { status: 400 });
    }

    const status = userRole === "ADMIN" ? "approved" : "pending";

    const result = await query(
      `INSERT INTO crypto_apps (slug, name, rating, active_users, likes, country, country_slug, type,
        logo_color, logo_letter, summary, features, charges, limits, platforms, pros, cons,
        category_ratings, detailed_review, status, added_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21) RETURNING *;`,
      [
        slug.trim().toLowerCase(), name.trim(), Number(rating) || 4.0, activeUsers || "1 Million+",
        Number(likes) || 0, country || "India", countrySlug.trim().toLowerCase(), type || "Exchange",
        logoColor || "#6366f1", logoLetter || name.charAt(0).toUpperCase(), summary.trim(),
        JSON.stringify(features || {}), JSON.stringify(charges || {}), JSON.stringify(limits || {}),
        platforms || ["Android App", "iOS App"], pros || [], cons || [],
        JSON.stringify(categoryRatings || { speed: 4.0, usability: 4.0, security: 4.0 }),
        JSON.stringify(detailedReview || {}), status, addedBy || "unknown@ipopreipo.com",
      ]
    );

    return NextResponse.json({ success: true, cryptoApp: result.rows[0], message: status === "approved" ? "App published." : "App submitted to review." });
  } catch (error: any) {
    console.error("Create crypto app error:", error);
    if (error.code === "23505") return NextResponse.json({ success: false, error: "A crypto app with this slug already exists." }, { status: 409 });
    return NextResponse.json({ success: false, error: "Failed to save crypto app." }, { status: 500 });
  }
}
