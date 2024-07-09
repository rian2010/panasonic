import { getByIdOrdered } from '@/libs/mysql/usage_part/mysql';
import { NextRequest, NextResponse } from 'next/server';

// GET Post by ID
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        const post = await getByIdOrdered(id);
        if (post) {
            return NextResponse.json({ message: 'OK', post }, { status: 202 });
        } else {
            return NextResponse.json({ message: 'Post Not Found' }, { status: 404 });
        }
    } catch (err) {
        return NextResponse.json({ message: 'Error', err }, { status: 500 });
    }
};