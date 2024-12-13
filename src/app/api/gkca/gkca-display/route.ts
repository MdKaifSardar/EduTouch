import { NextResponse } from "next/server";
import GKCurrAffModel from "@/models/gkCurrAffModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const gkcaList = await GKCurrAffModel.find();
    const formattedGkcaList = gkcaList.map((item) => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      gkImage: `data:image/png;base64,${item.gkImage.toString("base64")}`, // Encode GK image
      caImage: `data:image/png;base64,${item.caImage.toString("base64")}`, // Encode Current Affairs image
    }));

    return NextResponse.json({ gkcaList: formattedGkcaList });
  } catch (error) {
    console.error("Error fetching GK & Current Affairs documents:", error);
    return NextResponse.json({ error: error, gkcaList: [] }, { status: 500 });
  }
};
