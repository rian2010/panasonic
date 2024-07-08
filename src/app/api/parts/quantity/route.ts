import { getPostsQuantity } from "@/libs/mysql/parts/mysql";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  console.log("GET BERHASIL");

  try {
    const posts = await getPostsQuantity();
    return NextResponse.json({ message: "OK", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};