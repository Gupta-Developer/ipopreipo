import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Query database for user
    const result = await query("SELECT * FROM users WHERE email = $1 LIMIT 1;", [normalizedEmail]);
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "User profile not found. Please register." },
        { status: 404 }
      );
    }

    const foundUser = result.rows[0];

    // Check password
    if (foundUser.password !== password) {
      return NextResponse.json(
        { success: false, error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    // Prepare safe session user object
    const sessionUser = {
      id: String(foundUser.id),
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
      createdAt: foundUser.created_at,
    };

    return NextResponse.json({
      success: true,
      user: sessionUser,
    });
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
