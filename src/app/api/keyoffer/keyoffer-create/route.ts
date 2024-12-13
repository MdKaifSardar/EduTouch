import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import KeyOfferingModel from "@/models/keyOfferingsModel";

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (!title || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Read the file as a buffer
    const imageBuffer = await imageFile.arrayBuffer();

    const newKeyOffering = new KeyOfferingModel({
      title,
      image: Buffer.from(imageBuffer),
    });

    await newKeyOffering.save();
    return NextResponse.json({
      message: "Key offering added successfully",
      keyOffering: newKeyOffering,
    });
  } catch (error) {
    console.error("Error creating key offering:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
