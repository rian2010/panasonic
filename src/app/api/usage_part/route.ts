import { NextResponse } from "next/server";
import { addPost } from "../../../libs/mysql/usage_part/mysql";


export const POST = async (req: Request, res: Response) => {
  console.log("POST BERHASIL");

  const { id_usage, part_id, id_line, status_usage, start_date, end_date, quantity } = await req.json();

  try {
    const post = { id_usage, part_id, id_line, status_usage, start_date, end_date, quantity, id: Date.now().toString() };
    await addPost(post);
    return NextResponse.json({ message: "OK", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
