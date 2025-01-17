import { NextResponse } from "next/server";
import GalleryModel from "@/models/galleryModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const galleryItems = await GalleryModel.find();

    return NextResponse.json({ galleryItems: galleryItems });
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json(
      { error: error, galleryItems: [] },
      { status: 500 }
    );
  }
};
