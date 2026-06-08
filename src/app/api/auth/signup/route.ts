import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const checkUser = await query("SELECT id FROM users WHERE email = $1 LIMIT 1;", [normalizedEmail]);
    if (checkUser.rows.length > 0) {
      return NextResponse.json(
        { success: false, error: "Email is already registered. Please login." },
        { status: 409 }
      );
    }

    // Insert new user record
    const insertResult = await query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'USER') RETURNING *;",
      [name.trim(), normalizedEmail, password]
    );

    const newUser = insertResult.rows[0];

    // Prepare safe session user object
    const sessionUser = {
      id: String(newUser.id),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      createdAt: newUser.created_at,
    };

    return NextResponse.json({
      success: true,
      user: sessionUser,
    });
  } catch (error: any) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
