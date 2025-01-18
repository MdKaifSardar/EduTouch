import { NextResponse } from "next/server";
import GKCurrAffModel from "@/models/gkCurrAffModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const gkcaList = await GKCurrAffModel.find();

    return NextResponse.json({ gkcaList: gkcaList });
  } catch (error) {
    console.error("Error fetching GK & Current Affairs documents:", error);
    return NextResponse.json({ error: error, gkcaList: [] }, { status: 500 });
  }
};
