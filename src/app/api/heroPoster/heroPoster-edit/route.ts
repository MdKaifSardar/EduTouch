import { NextResponse } from "next/server";
import HeroPosterModel from "@/models/heroPosterModel"; // Adjust the import path
import { connectToDB } from "@/lib/database";
import { v2 as cloudinary } from "cloudinary";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete"; // Adjust the import path

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();
    const id = formData.get("id") as string | null;

    if (!id) {
      return NextResponse.json(
        { error: "HeroPoster ID is required." },
        { status: 400 }
      );
    }

    // Fetch the current HeroPoster
    const existingHeroPoster = await HeroPosterModel.findById(id);
    if (!existingHeroPoster) {
      return NextResponse.json(
        { error: "HeroPoster not found." },
        { status: 404 }
      );
    }

    // Extract fields from form data
    const title = formData.get("title") as string | null;
    const imageFile = formData.get("image") as File | null;

    let updatedImageUrl = existingHeroPoster.image; // Retain the existing image URL unless a new image is uploaded

    if (imageFile) {
      // Delete the previous image only if a new image is being uploaded
      if (existingHeroPoster.image) {
        try {
          await deleteImageFromCloudinary(existingHeroPoster.image);
        } catch (error) {
          console.error("Failed to delete previous image:", error);
        }
      }

      // Convert the uploaded file to a buffer
      const imageBuffer = await imageFile.arrayBuffer();
      const imageBase64 = Buffer.from(imageBuffer).toString("base64");

      // Upload the new image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${imageBase64}`,
        {
          folder: "hero_posters", // Folder in Cloudinary for organization
          resource_type: "image",
        }
      );

      updatedImageUrl = cloudinaryResponse.secure_url;
    }

    // Build the update object dynamically
    const updateFields: { title?: string; image?: string } = {};
    if (title) updateFields.title = title;
    if (updatedImageUrl) updateFields.image = updatedImageUrl;

    // Update the HeroPoster
    const updatedHeroPoster = await HeroPosterModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedHeroPoster) {
      return NextResponse.json(
        { error: "Failed to update the HeroPoster." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "HeroPoster updated successfully", updatedHeroPoster },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing HeroPoster item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
