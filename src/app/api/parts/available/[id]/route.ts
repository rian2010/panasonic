import { NextRequest, NextResponse } from 'next/server';
import { getByIdAvailable } from '../../../../../libs/mysql/parts/mysql';

// GET Post by ID
// ! ini belom dipakai karena ini kode hanya unutk menampilkan part yang dibutuhkan saja
// ! kode ini ada di modalModel unutk tabel tapi tidak digunakan
// export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
//     const { id } = params;

//     try {
//         const post = await getByIdAvailable(id);
//         if (post) {
//             return NextResponse.json({ message: 'OK', post }, { status: 202 });
//         } else {
//             return NextResponse.json({ message: 'Post Not Found' }, { status: 404 });
//         }
//     } catch (err) {
//         return NextResponse.json({ message: 'Error', err }, { status: 500 });
//     }
// };