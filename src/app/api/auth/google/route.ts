import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        { success: false, error: "Google credential token is required." },
        { status: 400 }
      );
    }

    // Verify token with Google's tokeninfo API
    const tokenInfoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    if (!tokenInfoRes.ok) {
      return NextResponse.json(
        { success: false, error: "Failed to verify Google credential." },
        { status: 400 }
      );
    }

    const tokenInfo = await tokenInfoRes.json();
    
    // Check Client ID to prevent token spoofing
    const configuredClientId = process.env.GOOGLE_CLIENT_ID;
    if (configuredClientId && tokenInfo.aud !== configuredClientId) {
      return NextResponse.json(
        { success: false, error: "Google token was not issued for this application." },
        { status: 401 }
      );
    }

    const email = tokenInfo.email;
    const name = tokenInfo.name || tokenInfo.given_name || email.split("@")[0];
    const picture = tokenInfo.picture || null;

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Google token did not provide an email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    let result = await query("SELECT * FROM users WHERE email = $1 LIMIT 1;", [normalizedEmail]);
    let user;

    if (result.rows.length > 0) {
      user = result.rows[0];
      // Update name and picture if they changed
      if (user.picture !== picture || user.name !== name) {
        const updateResult = await query(
          "UPDATE users SET name = $1, picture = $2 WHERE id = $3 RETURNING *;",
          [name.trim(), picture, user.id]
        );
        user = updateResult.rows[0];
      }
    } else {
      // Create new user with managed password placeholder
      const insertResult = await query(
        "INSERT INTO users (name, email, password, role, picture) VALUES ($1, $2, 'google-oauth-managed', 'USER', $3) RETURNING *;",
        [name.trim(), normalizedEmail, picture]
      );
      user = insertResult.rows[0];
    }

    // Prepare safe session user object
    const sessionUser = {
      id: String(user.id),
      email: user.email,
      name: user.name,
      role: user.role,
      picture: user.picture,
      createdAt: user.created_at,
    };

    return NextResponse.json({
      success: true,
      user: sessionUser,
    });
  } catch (error: any) {
    console.error("Google auth API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}

