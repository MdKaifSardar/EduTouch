import { NextResponse } from "next/server";
import GalleryModel from "@/models/galleryModel";
import { connectToDB } from "@/lib/database";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete";
import { uploadImageToCloudinary } from "@/hooks/CloudinaryImageUpload";

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();
    const id = formData.get("id") as string | null;

    if (!id) {
      return NextResponse.json(
        { error: "Gallery ID is required." },
        { status: 400 }
      );
    }

    // Fetch the current gallery item
    const existingGallery = await GalleryModel.findById(id);
    if (!existingGallery) {
      return NextResponse.json(
        { error: "Gallery item not found." },
        { status: 404 }
      );
    }

    // Extract fields from form data
    const title = formData.get("title") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (imageFile) {
      // Delete the previous image only if a new image is being uploaded
      if (existingGallery.imageNew) {
        try {
          await deleteImageFromCloudinary(existingGallery.imageNew);
        } catch (error) {
          console.error("Failed to delete previous image:", error);
        }
      }

      // Upload the new image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(imageFile, "gallery");
      existingGallery.imageNew = imageUrl;
    }

    // Update title if provided
    if (title) {
      existingGallery.title = title;
    }

    // Save the updated gallery item
    await existingGallery.save();

    return NextResponse.json(
      {
        message: "Gallery item updated successfully",
        updatedGallery: existingGallery,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
