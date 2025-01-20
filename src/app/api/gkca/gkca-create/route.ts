import { NextResponse } from "next/server";
import GKCurrAffModel from "@/models/gkCurrAffModel"; // Import your GK and Current Affairs model
import { connectToDB } from "@/lib/database";
import { uploadImageToCloudinary } from "@/hooks/CloudinaryImageUpload"; // Import the custom Cloudinary hook

export const POST = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const gkImage = formData.get("gkImage") as File | null;
    const caImage = formData.get("caImage") as File | null;
    const gkTitle = formData.get("gkTitle") as string | null;
    const caTitle = formData.get("caTitle") as string | null;
    const gkLink = formData.get("gkLink") as string | null;
    const caLink = formData.get("caLink") as string | null;

    // Validate required fields
    if (
      !title ||
      !gkImage ||
      !caImage ||
      !gkTitle ||
      !caTitle ||
      !gkLink ||
      !caLink
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if a document with the same title already exists
    const existingDocument = await GKCurrAffModel.findOne({ title });
    if (existingDocument) {
      return NextResponse.json(
        { error: "Title already exists" },
        { status: 400 }
      );
    }

    // Upload GK and CA images to Cloudinary
    const gkImageUrl = await uploadImageToCloudinary(gkImage, "gk-images");
    const caImageUrl = await uploadImageToCloudinary(caImage, "ca-images");

    // Create a new document
    const newDocument = new GKCurrAffModel({
      title,
      gkImage: gkImageUrl,
      caImage: caImageUrl,
      gkTitle,
      caTitle,
      gkLink,
      caLink,
    });

    await newDocument.save();

    return NextResponse.json({
      message: "GK & Current Affairs document added successfully",
      document: newDocument,
    });
  } catch (error) {
    console.error("Error creating GK & Current Affairs document:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the document" },
      { status: 500 }
    );
  }
};
