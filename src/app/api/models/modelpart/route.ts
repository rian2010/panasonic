import { NextResponse } from "next/server";
import pool from "@/libs/mysql";

// ! ini kode unutk menampilkan data model yang usage_part nya lagi di ordered
export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = `
        SELECT DISTINCT m.model_id, m.model_name, p.process_name, usage_part.status_usage, usage_part.start_date, usage_part.end_date
        FROM models m
        JOIN process p ON m.process_id = p.process_id 
        LEFT JOIN parts ON parts.model_id = m.model_id
        LEFT JOIN usage_part ON usage_part.part_id = parts.part_id
        WHERE usage_part.status_usage = 'Ordered' OR usage_part.status_usage = 'Uncompleted'
    `;
    const [rows] = await db.execute(query);
    db.release();

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching models and processes:", error);
    return NextResponse.json(
      { error: "Failed to fetch models and processes" },
      { status: 500 }
    );
  }
}

