import { addPost, getPosts } from "@/libs/mysql/parts/mysql";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  console.log("GET BERHASIL");

  try {
    const posts = await getPosts();
    return NextResponse.json({ message: "OK", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  console.log("POST BERHASIL");

  const { part_id, part_name, model_id, size } = await req.json();

  try {
    const post = { part_id, part_name, model_id, size, id: Date.now().toString() };
    await addPost(post);
    return NextResponse.json({ message: "OK", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
