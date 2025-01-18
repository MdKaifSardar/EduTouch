import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete";
import { connectToDB } from "@/lib/database";
import GalleryModel from "@/models/galleryModel";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Gallery item ID is required" },
        { status: 400 }
      );
    }

    // Fetch the gallery item to get the image URL before deleting
    const galleryItem = await GalleryModel.findById(id);

    if (!galleryItem) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    // Delete the image from Cloudinary if it exists
    if (galleryItem.imageNew) {
      try {
        await deleteImageFromCloudinary(galleryItem.imageNew);
      } catch (error) {
        console.error("Failed to delete gallery image from Cloudinary:", error);
        // You might want to return an error here or proceed with deleting the gallery item
      }
    }

    // Delete the gallery item from the database
    const deletedGalleryItem = await GalleryModel.findByIdAndDelete(id);

    if (!deletedGalleryItem) {
      return NextResponse.json(
        { error: "Failed to delete the gallery item" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
