import { NextRequest, NextResponse } from 'next/server';
import { updatePostStatus } from '@/libs/mysql/parts/mysql';

// PUT Update Post by ID
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    const { status_part } = await req.json();

    try {
        await updatePostStatus( status_part, id);
        return NextResponse.json({ message: 'OK' }, { status: 203 });
    } catch (err) {
        if (err === 'No Post Found') {
            return NextResponse.json({ message: 'Post Not Found' }, { status: 404 });
        } else {
            return NextResponse.json({ message: 'Error', err }, { status: 500 });
        }
    }
};