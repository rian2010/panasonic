import { NextResponse } from "next/server";
import { addPost, getPosts } from "../../../libs/mysql/line/mysql";

export const GET = async (req: Request, res: Response) => {
  console.log("GET BERHASIL");

  try {
    const lines = await getPosts();
    return NextResponse.json({ message: "OK", lines }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

export const POST = async (req: Request, res: Response) => {
  console.log("POST BERHASIL");

  const { id_line, nama_line, status_line } = await req.json();

  try {
    const post = { id_line, nama_line, status_line, id: Date.now().toString() };
    await addPost(post);
    return NextResponse.json({ message: "OK", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
