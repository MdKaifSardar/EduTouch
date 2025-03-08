import { NextResponse } from "next/server";
import NoticeModel from "@/models/noticeModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const notices = await NoticeModel.find();

    return NextResponse.json({ notices: notices });
  } catch (error) {
    console.error("Error fetching notices:", error);
    return NextResponse.json({ error: error, notices: [] }, { status: 500 });
  }
};
