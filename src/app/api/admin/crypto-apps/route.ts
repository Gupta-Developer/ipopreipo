import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    let sql = "SELECT * FROM crypto_apps";
    const params: any[] = [];
    if (status) { sql += " WHERE status = $1"; params.push(status); }
    sql += " ORDER BY id DESC;";
    const result = await query(sql, params);
    const cryptoApps = result.rows.map((row) => ({
      id: String(row.id), slug: row.slug, name: row.name, rating: Number(row.rating),
      activeUsers: row.active_users, likes: row.likes, country: row.country, countrySlug: row.country_slug,
      type: row.type, logoColor: row.logo_color, logoLetter: row.logo_letter, summary: row.summary,
      features: typeof row.features === "string" ? JSON.parse(row.features) : row.features,
      charges: typeof row.charges === "string" ? JSON.parse(row.charges) : row.charges,
      limits: typeof row.limits === "string" ? JSON.parse(row.limits) : row.limits,
      platforms: row.platforms, pros: row.pros, cons: row.cons,
      categoryRatings: typeof row.category_ratings === "string" ? JSON.parse(row.category_ratings) : row.category_ratings,
      detailedReview: typeof row.detailed_review === "string" ? JSON.parse(row.detailed_review) : row.detailed_review,
      status: row.status, addedBy: row.added_by, createdAt: row.created_at,
    }));
    return NextResponse.json({ success: true, cryptoApps });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Failed to fetch crypto apps." }, { status: 500 });
  }
}

// PUT - Update approval status or full details of a crypto app
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, name } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Crypto App ID is required." },
        { status: 400 }
      );
    }

    if (name) {
      const {
        slug,
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
        limits,
        platforms,
        pros,
        cons,
        categoryRatings,
        detailedReview,
      } = body;

      const result = await query(
        `UPDATE crypto_apps SET 
          slug = $1, name = $2, rating = $3, active_users = $4, likes = $5,
          country = $6, country_slug = $7, type = $8, logo_color = $9, logo_letter = $10,
          summary = $11, features = $12, charges = $13, limits = $14,
          platforms = $15, pros = $16, cons = $17, category_ratings = $18,
          detailed_review = $19, status = COALESCE($20, status)
        WHERE id = $21 RETURNING *;`,
        [
          slug,
          name,
          Number(rating) || 4.0,
          activeUsers,
          Number(likes) || 0,
          country,
          countrySlug,
          type,
          logoColor,
          logoLetter,
          summary,
          JSON.stringify(features || {}),
          JSON.stringify(charges || {}),
          JSON.stringify(limits || {}),
          platforms,
          pros,
          cons,
          JSON.stringify(categoryRatings || {}),
          JSON.stringify(detailedReview || {}),
          status,
          id,
        ]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Crypto app not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        cryptoApp: result.rows[0],
        message: "Crypto app details updated successfully.",
      });
    } else {
      if (!status) {
        return NextResponse.json(
          { success: false, error: "ID and status required." },
          { status: 400 }
        );
      }

      const result = await query(
        "UPDATE crypto_apps SET status = $1 WHERE id = $2 RETURNING id, name, status;",
        [status, id]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Crypto app not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        cryptoApp: result.rows[0],
        message: `Status updated to ${status}.`,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Failed to update crypto app." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ success: false, error: "ID required." }, { status: 400 });
    const result = await query("DELETE FROM crypto_apps WHERE id = $1 RETURNING id;", [id]);
    if (result.rows.length === 0) return NextResponse.json({ success: false, error: "Crypto app not found." }, { status: 404 });
    return NextResponse.json({ success: true, message: "Crypto app deleted successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Failed to delete crypto app." }, { status: 500 });
  }
}
