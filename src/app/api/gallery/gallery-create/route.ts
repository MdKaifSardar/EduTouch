import { NextResponse } from "next/server";
import GalleryModel from "@/models/galleryModel";

export const POST = async (req: Request) => {
  try {
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

    const newGalleryItem = new GalleryModel({
      title,
      image: Buffer.from(imageBuffer),
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
