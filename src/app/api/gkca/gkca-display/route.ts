import { NextResponse } from "next/server";
import GKCurrAffModel from "@/models/gkCurrAffModel";

export const GET = async () => {
  try {
    const gkcaList = await GKCurrAffModel.find();
    return NextResponse.json({ gkcaList });
  } catch (error) {
    console.error("Error fetching GK & Current Affairs documents:", error);
    return NextResponse.json({ error: error, gkcaList: []}, { status: 500 });
  }
};
