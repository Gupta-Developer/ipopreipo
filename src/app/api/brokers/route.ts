import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Retrieve brokers (optionally filter by country or slug)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countrySlug = searchParams.get("countrySlug"); // matches country_name (case-insensitive conversion or matching)
    const slug = searchParams.get("slug");
    const includePending = searchParams.get("includePending") === "true";

    let sql = "SELECT * FROM brokers";
    const params: any[] = [];

    if (slug) {
      sql += " WHERE slug = $1";
      params.push(slug);
      if (!includePending) {
        sql += " AND status = 'approved'";
      }
    } else if (countrySlug) {
      // In brokersData, country_name represents the full name like 'India'
      // country represents 'IN', 'US', etc.
      // So we can convert countrySlug (e.g. 'india', 'united-states') to match.
      sql += " WHERE LOWER(REPLACE(country_name, ' ', '-')) = $1";
      params.push(countrySlug.toLowerCase());
      if (!includePending) {
        sql += " AND status = 'approved'";
      }
    } else if (!includePending) {
      sql += " WHERE status = 'approved'";
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

    if (slug && brokers.length === 0) {
      return NextResponse.json(
        { success: false, error: "Broker not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      brokers: slug ? brokers[0] : brokers,
    });
  } catch (error: any) {
    console.error("Fetch brokers API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch brokers from database." },
      { status: 500 }
    );
  }
}

// POST - Create / submit a new broker
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      slug,
      name,
      country, // 'IN', 'US', 'UK'
      countryName, // 'India', 'United States', etc.
      rating,
      type,
      depository,
      activeClients,
      likes,
      summary,
      logoColor,
      logoLetter,
      segments,
      charges,
      brokerage,
      margins,
      platforms,
      pros,
      cons,
      additionalFeatures,
      otherInvestments,
      categoryRatings,
      detailedReviews,
      taxes,
      detailedArticle,
      addedBy,
      userRole,
    } = body;

    if (!slug || !name || !summary || !country) {
      return NextResponse.json(
        { success: false, error: "Slug, name, summary and country are required." },
        { status: 400 }
      );
    }

    const status = userRole === "ADMIN" ? "approved" : "pending";

    // Map country code to country name if missing
    let finalCountryName = countryName;
    if (!finalCountryName) {
      if (country.toUpperCase() === "IN") finalCountryName = "India";
      else if (country.toUpperCase() === "US") finalCountryName = "United States";
      else if (country.toUpperCase() === "UK") finalCountryName = "United Kingdom";
      else finalCountryName = country;
    }

    const result = await query(
      `INSERT INTO brokers (
        slug, name, country, country_name, rating, type, depository, active_clients,
        likes, summary, logo_color, logo_letter, segments, charges, brokerage, margins,
        platforms, pros, cons, additional_features, other_investments, category_ratings,
        detailed_reviews, taxes, detailed_article, status, added_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
      RETURNING *;`,
      [
        slug.trim().toLowerCase(),
        name.trim(),
        country.trim().toUpperCase(),
        finalCountryName.trim(),
        Number(rating) || 4.0,
        type || "Discount Broker",
        depository || "CDSL",
        activeClients || "1 Million+",
        Number(likes) || 0,
        summary.trim(),
        logoColor || "#6366f1",
        logoLetter || name.charAt(0).toUpperCase(),
        JSON.stringify(segments || {}),
        JSON.stringify(charges || {}),
        JSON.stringify(brokerage || {}),
        JSON.stringify(margins || {}),
        platforms || ["Web", "App"],
        pros || [],
        cons || [],
        JSON.stringify(additionalFeatures || []),
        JSON.stringify(otherInvestments || []),
        JSON.stringify(categoryRatings || { charges: 4.0, usability: 4.0, customerService: 4.0 }),
        JSON.stringify(detailedReviews || {}),
        JSON.stringify(taxes || {}),
        detailedArticle ? JSON.stringify(detailedArticle) : null,
        status,
        addedBy || "unknown@ipopreipo.com",
      ]
    );

    return NextResponse.json({
      success: true,
      broker: result.rows[0],
      message: status === "approved" ? "Broker published directly." : "Broker submitted to review queue.",
    });
  } catch (error: any) {
    console.error("Create broker API error:", error);
    if (error.code === "23505") {
      return NextResponse.json(
        { success: false, error: "A broker with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to save broker to database." },
      { status: 500 }
    );
  }
}
