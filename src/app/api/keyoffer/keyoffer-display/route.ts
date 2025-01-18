import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import KeyOfferingModel from "@/models/keyOfferingsModel";

export const GET = async () => {
  try {
    await connectToDB();
    const keyOfferings = await KeyOfferingModel.find();
    return NextResponse.json({ keyOfferings: keyOfferings });
  } catch (error) {
    console.error("Error fetching key offerings:", error);
    return NextResponse.json(
      { error: error, keyOfferings: [] },
      { status: 500 }
    );
  }
};
