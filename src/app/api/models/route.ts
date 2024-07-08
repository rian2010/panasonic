import { NextResponse } from "next/server";
import pool from "@/libs/mysql";
import { addPost } from "@/libs/mysql/models/mysql";

export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = `
      SELECT m.model_id, m.model_name, p.process_name, p.process_id
      FROM models m
      JOIN process p ON m.process_id = p.process_id
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

export const POST = async (req: Request, res: Response) => {
  console.log("POST BERHASIL");

  const { model_id, model_name, process_id } = await req.json();

  try {
    const post = { model_id, model_name, process_id, id: Date.now().toString() };
    await addPost(post);
    return NextResponse.json({ message: "OK", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
