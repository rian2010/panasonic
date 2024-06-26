import { NextRequest, NextResponse } from 'next/server';
import { getById } from '../../../../libs/mysql/parts/mysql';

// GET Post by ID
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        const post = await getById(id);
        if (post) {
            return NextResponse.json({ message: 'OK', post }, { status: 202 });
        } else {
            return NextResponse.json({ message: 'Post Not Found' }, { status: 404 });
        }
    } catch (err) {
        return NextResponse.json({ message: 'Error', err }, { status: 500 });
    }
};