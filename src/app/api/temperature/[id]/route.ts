
// import { NextRequest, NextResponse } from "next/server";
// import pool from "@/app/libs/mysql";


// export async function GET(
//   request: NextRequest,
//   { params }: { params: { temperatureId: string } }
// ) {
//   const temperatureId = params.temperatureId// user id

//   try {
//     const db = await pool.getConnection()

//     const query = 'select * from suhu_mesin where id_suhu = ?'
//     const [rows] = await db.execute(query, [temperatureId])
//     db.release()

//     return NextResponse.json(rows)
//   } catch (error) {
//     return NextResponse.json({
//       error: error
//     }, { status: 500 })
//   }
// }


