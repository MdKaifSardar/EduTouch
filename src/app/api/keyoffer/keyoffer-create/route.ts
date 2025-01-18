import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import KeyOfferingModel from "@/models/keyOfferingsModel";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Convert the uploaded file to a buffer
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");

    // Upload the file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${imageBase64}`,
      {
        folder: "keyOfferings", // Folder in Cloudinary for organization
        resource_type: "image",
      }
    );

    // Save the Cloudinary URL to the database
    const newKeyOffering = new KeyOfferingModel({
      title,
      image: cloudinaryResponse.secure_url, // URL returned by Cloudinary
    });

    await newKeyOffering.save();
    return NextResponse.json({
      message: "Key offering added successfully",
      keyOffering: newKeyOffering,
    });
  } catch (error) {
    console.error("Error creating key offering:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
