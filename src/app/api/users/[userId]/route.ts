import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";


export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId// user id

  try {
    const db = await pool.getConnection()

    const query = 'select * from users where id = ?'
    const [rows] = await db.execute(query, [userId])
    db.release()

    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}

