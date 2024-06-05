import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";


export async function GET(
  request: NextRequest,
  { params }: { params: { lineId: string } }
) {
  const lineId = params.lineId// user id

  try {
    const db = await pool.getConnection()

    const query = 'select * from line where id_line = ?'
    const [rows] = await db.execute(query, [lineId])
    db.release()

    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}

