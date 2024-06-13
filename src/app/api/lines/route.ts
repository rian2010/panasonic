import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";
import { NextApiResponse, NextApiRequest } from "next";


export async function GET() {
  try {
    const db = await pool.getConnection()
    const query = 'select * from line'
    const [rows] = await db.execute(query)
    db.release()

    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}



