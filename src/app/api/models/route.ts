// import { NextResponse } from "next/server";
// import pool from "@/app/libs/mysql";

// export async function GET() {
//   try {
//     const db = await pool.getConnection();
//     const query = `
//       SELECT m.model_id, m.model_name, p.process_name
//       FROM models m
//       JOIN process p ON m.process_id = p.process_id
//     `;
//     const [rows] = await db.execute(query);
//     db.release();

//     return NextResponse.json(rows);
//   } catch (error) {
//     console.error("Error fetching models and processes:", error);
//     return NextResponse.json({ error: "Failed to fetch models and processes" }, { status: 500 });
//   }
// }

