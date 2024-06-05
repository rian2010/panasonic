
import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/libs/mysql";


export async function GET(
  request: NextRequest,
  { params }: { params: { machineId: string } }
) {
  const machineId = params.machineId// user id

  try {
    const db = await pool.getConnection()

    const query = 'select * from mesin where id_mesin = ?'
    const [rows] = await db.execute(query, [machineId])
    db.release()

    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({
      error: error
    }, { status: 500 })
  }
}

