
// import { NextRequest, NextResponse } from "next/server";
// import pool from "@/app/libs/mysql";


// export async function GET(
//   request: NextRequest,
//   { params }: { params: { modelId: string } }
// ) {
//   const modelId = params.modelId// user id

//   try {
//     const db = await pool.getConnection()

//     const query = 'select * from line where id_line = ?'
//     const [rows] = await db.execute(query, [modelId])
//     db.release()

//     return NextResponse.json(rows)
//   } catch (error) {
//     return NextResponse.json({
//       error: error
//     }, { status: 500 })
//   }
// }

