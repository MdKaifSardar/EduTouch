import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import KeyOfferingModel from "@/models/keyOfferingsModel";

export const GET = async () => {
  try {
    await connectToDB();
    const keyOfferings = await KeyOfferingModel.find();
    const formattedKeyOfferings = keyOfferings.map((item) => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      image: `data:image/png;base64,${item.image.toString("base64")}`, // Correctly encode the image
    }));

    return NextResponse.json({ keyOfferings: formattedKeyOfferings });
  } catch (error) {
    console.error("Error fetching key offerings:", error);
    return NextResponse.json(
      { error: error, keyOfferings: [] },
      { status: 500 }
    );
  }
};
