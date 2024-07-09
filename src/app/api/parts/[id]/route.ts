import { NextRequest, NextResponse } from 'next/server';
import { deletePost, getById, updatePost } from '../../../../libs/mysql/parts/mysql';

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

// PUT Update Post by ID
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    const { part_name, model_id, size, status_part } = await req.json();

    try {
        await updatePost( part_name, model_id, size, status_part, id);
        return NextResponse.json({ message: 'OK' }, { status: 203 });
    } catch (err) {
        if (err === 'No Post Found') {
            return NextResponse.json({ message: 'Post Not Found' }, { status: 404 });
        } else {
            return NextResponse.json({ message: 'Error', err }, { status: 500 });
        }
    }
};

// DELETE Post by ID
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        await deletePost(id);
        return NextResponse.json({ message: 'OK' }, { status: 204 });
    } catch (err) {
        return NextResponse.json({ message: 'Error', err }, { status: 500 });
    }
};