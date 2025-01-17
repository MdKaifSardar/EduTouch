import { NextResponse } from "next/server";
import GalleryModel from "@/models/galleryModel";
import { connectToDB } from "@/lib/database";
import { uploadImageToCloudinary } from "@/hooks/CloudinaryImageUpload";

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

    // Upload the image to Cloudinary using the utility function
    const imageUrl = await uploadImageToCloudinary(imageFile, "gallery");

    // Create a new gallery item
    const newGalleryItem = new GalleryModel({
      title,
      imageNew: imageUrl,
    });

    await newGalleryItem.save();
    return NextResponse.json({
      message: "Gallery item added successfully",
      galleryItem: newGalleryItem,
    });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
