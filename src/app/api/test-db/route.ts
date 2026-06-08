import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Run a simple query to get the current timestamp from the database
    const result = await query("SELECT NOW() as db_time, version() as db_version;");
    const { db_time, db_version } = result.rows[0];

    return NextResponse.json({
      success: true,
      message: "Successfully connected to Neon database!",
      databaseTime: db_time,
      databaseVersion: db_version,
    });
  } catch (error: any) {
    console.error("Database connection test failed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to the database.",
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}
