import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET - Retrieve all users
export async function GET() {
  try {
    const result = await query(
      "SELECT id, email, name, role, picture, assigned_countries as \"assignedCountries\", created_at as \"createdAt\" FROM users ORDER BY id ASC;"
    );

    const users = result.rows.map((row) => ({
      id: String(row.id),
      email: row.email,
      name: row.name,
      role: row.role,
      picture: row.picture,
      assignedCountries: row.assignedCountries ? row.assignedCountries.split(",") : [],
      createdAt: row.createdAt,
    }));

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error("Fetch users admin API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users from database." },
      { status: 500 }
    );
  }
}

// PUT - Update user role & assigned countries
export async function PUT(request: Request) {
  try {
    const { id, role, assignedCountries } = await request.json();

    if (!id || !role) {
      return NextResponse.json(
        { success: false, error: "User ID and role are required." },
        { status: 400 }
      );
    }

    const assignedCountriesStr = Array.isArray(assignedCountries)
      ? assignedCountries.join(",")
      : "";

    const result = await query(
      "UPDATE users SET role = $1, assigned_countries = $2 WHERE id = $3 RETURNING id, email, name, role, picture, assigned_countries as \"assignedCountries\", created_at as \"createdAt\";",
      [role, assignedCountriesStr, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found." },
        { status: 404 }
      );
    }

    const updatedUser = result.rows[0];
    const userPayload = {
      id: String(updatedUser.id),
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      picture: updatedUser.picture,
      assignedCountries: updatedUser.assignedCountries ? updatedUser.assignedCountries.split(",") : [],
      createdAt: updatedUser.createdAt,
    };

    return NextResponse.json({ success: true, user: userPayload });
  } catch (error: any) {
    console.error("Update user admin API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update user." },
      { status: 500 }
    );
  }
}

// DELETE - Remove a user
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "User ID is required." },
        { status: 400 }
      );
    }

    const result = await query("DELETE FROM users WHERE id = $1 RETURNING id;", [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "User deleted successfully." });
  } catch (error: any) {
    console.error("Delete user admin API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete user." },
      { status: 500 }
    );
  }
}
