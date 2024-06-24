import { NextRequest, NextResponse } from "next/server";
import pool from "@/libs/mysql";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("session");

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = JSON.parse(session);

  const [rows] = await pool.query(
    "SELECT id, username, role FROM users WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = rows[0];

  return NextResponse.json({ user });
}
