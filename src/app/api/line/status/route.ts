import { NextResponse } from "next/server";
import { getPostsStatus } from "../../../../libs/mysql/line/mysql";

export const GET = async (req: Request, res: Response) => {
  console.log("GET BERHASIL");

  try {
    const lines = await getPostsStatus();
    return NextResponse.json({ message: "OK", lines }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};