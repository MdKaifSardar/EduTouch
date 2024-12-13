import { NextResponse } from "next/server";
import GalleryModel from "@/models/galleryModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const galleryItems = await GalleryModel.find();
    const formattedGalleryItems = galleryItems.map((item) => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      imageNew: `data:image/png;base64,${item.imageNew.toString("base64")}`, // Correctly encode the image
    }));

    return NextResponse.json({ galleryItems: formattedGalleryItems });
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json(
      { error: error, galleryItems: [] },
      { status: 500 }
    );
  }
};
