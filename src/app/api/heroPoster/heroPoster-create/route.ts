import { NextResponse } from "next/server";
import HeroPosterModel from "@/models/heroPosterModel";
import { connectToDB } from "@/lib/database";
import { uploadImageToCloudinary } from "@/hooks/CloudinaryImageUpload"; // Import the upload hook

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const heroPosterFile = formData.get("image") as File | null;

    if (!title || !heroPosterFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Use the uploadImageToCloudinary hook to upload the image
    const imageUrl = await uploadImageToCloudinary(heroPosterFile, "hero_posters");

    // Save the Cloudinary URL to the database
    const newHeroPosterItem = new HeroPosterModel({
      title,
      image: imageUrl, // URL returned by Cloudinary
    });

    await newHeroPosterItem.save();
    return NextResponse.json({
      message: "Hero poster item added successfully",
      heroPosterItem: newHeroPosterItem,
    });
  } catch (error) {
    console.error("Error creating hero poster item:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
