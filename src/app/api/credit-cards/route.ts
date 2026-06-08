import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Retrieve credit cards (optionally filter by country or slug)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countrySlug = searchParams.get("countrySlug");
    const slug = searchParams.get("slug");
    const includePending = searchParams.get("includePending") === "true";

    let sql = "SELECT * FROM credit_cards";
    const params: any[] = [];

    if (slug) {
      sql += " WHERE slug = $1";
      params.push(slug);
      if (!includePending) {
        sql += " AND status = 'approved'";
      }
    } else if (countrySlug) {
      // countrySlug matches country field (e.g. 'india', 'united-states')
      sql += " WHERE LOWER(REPLACE(country, ' ', '-')) = $1";
      params.push(countrySlug.toLowerCase());
      if (!includePending) {
        sql += " AND status = 'approved'";
      }
    } else if (!includePending) {
      sql += " WHERE status = 'approved'";
    }

    sql += " ORDER BY id DESC;";

    const result = await query(sql, params);

    const creditCards = result.rows.map((row) => ({
      id: String(row.id),
      slug: row.slug,
      name: row.name,
      overallRating: Number(row.overall_rating),
      type: row.type,
      bestFor: row.best_for,
      issuer: row.issuer,
      issuerCode: row.issuer_code,
      network: row.network,
      likes: row.likes,
      description: row.description,
      featuresChecklist: typeof row.features_checklist === "string" ? JSON.parse(row.features_checklist) : row.features_checklist,
      perks: typeof row.perks === "string" ? JSON.parse(row.perks) : row.perks,
      fees: typeof row.fees === "string" ? JSON.parse(row.fees) : row.fees,
      latePaymentCharges: typeof row.late_payment_charges === "string" ? JSON.parse(row.late_payment_charges) : row.late_payment_charges,
      pros: row.pros,
      cons: row.cons,
      ratingsBreakdown: typeof row.ratings_breakdown === "string" ? JSON.parse(row.ratings_breakdown) : row.ratings_breakdown,
      reviewTitle: row.review_title,
      reviewContent: row.review_content,
      reviewOverviewTable: typeof row.review_overview_table === "string" ? JSON.parse(row.review_overview_table) : row.review_overview_table,
      country: row.country,
      detailedArticle: row.detailed_article ? (typeof row.detailed_article === "string" ? JSON.parse(row.detailed_article) : row.detailed_article) : null,
      status: row.status,
      addedBy: row.added_by,
      createdAt: row.created_at,
    }));

    if (slug && creditCards.length === 0) {
      return NextResponse.json(
        { success: false, error: "Credit card not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      creditCards: slug ? creditCards[0] : creditCards,
    });
  } catch (error: any) {
    console.error("Fetch credit cards API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch credit cards from database." },
      { status: 500 }
    );
  }
}

// POST - Create / submit a new credit card
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      slug,
      name,
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
      addedBy,
      userRole,
    } = body;

    if (!slug || !name || !description || !country) {
      return NextResponse.json(
        { success: false, error: "Slug, name, description and country are required." },
        { status: 400 }
      );
    }

    const status = userRole === "ADMIN" ? "approved" : "pending";

    const result = await query(
      `INSERT INTO credit_cards (
        slug, name, overall_rating, type, best_for, issuer, issuer_code, network,
        likes, description, features_checklist, perks, fees, late_payment_charges,
        pros, cons, ratings_breakdown, review_title, review_content, review_overview_table,
        country, detailed_article, status, added_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      RETURNING *;`,
      [
        slug.trim().toLowerCase(),
        name.trim(),
        Number(overallRating) || 4.0,
        type || "Cashback",
        bestFor || "Everyday Spending",
        issuer || "Standard Issuer",
        issuerCode || "standard",
        network || "Visa",
        Number(likes) || 0,
        description.trim(),
        JSON.stringify(featuresChecklist || {}),
        JSON.stringify(perks || []),
        JSON.stringify(fees || {}),
        JSON.stringify(latePaymentCharges || []),
        pros || [],
        cons || [],
        JSON.stringify(ratingsBreakdown || { charges: 4.0, rewards: 4.0, customerService: 4.0 }),
        reviewTitle || `${name} Review`,
        reviewContent || "",
        JSON.stringify(reviewOverviewTable || []),
        country.trim(),
        detailedArticle ? JSON.stringify(detailedArticle) : null,
        status,
        addedBy || "unknown@ipopreipo.com",
      ]
    );

    return NextResponse.json({
      success: true,
      creditCard: result.rows[0],
      message: status === "approved" ? "Credit card published directly." : "Credit card submitted to review queue.",
    });
  } catch (error: any) {
    console.error("Create credit card API error:", error);
    if (error.code === "23505") {
      return NextResponse.json(
        { success: false, error: "A credit card with this slug already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to save credit card to database." },
      { status: 500 }
    );
  }
}
