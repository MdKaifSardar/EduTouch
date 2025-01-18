import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import KeyOfferingModel from "@/models/keyOfferingsModel";
import { v2 as cloudinary } from "cloudinary";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete"; // Importing image deletion function

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
        { error: "Key offering ID is required." },
        { status: 400 }
      );
    }

    // Fetch the current key offering
    const existingKeyOffering = await KeyOfferingModel.findById(id);
    if (!existingKeyOffering) {
      return NextResponse.json(
        { error: "Key offering not found." },
        { status: 404 }
      );
    }

    // Extract fields from form data
    const title = formData.get("title") as string | null;
    const imageFile = formData.get("image") as File; // Handle file uploads

    let imageBuffer = undefined;
    if (imageFile) {
      imageBuffer = await imageFile.arrayBuffer();
    }

    let updatedImageUrl = undefined;
    if (imageBuffer) {
      // Delete the previous image only if a new image is being uploaded
      if (existingKeyOffering.image) {
        try {
          await deleteImageFromCloudinary(existingKeyOffering.image);
        } catch (error) {
          console.error("Failed to delete previous image:", error);
        }
      }

      // Upload the new image to Cloudinary
      const imageBase64 = Buffer.from(imageBuffer).toString("base64");
      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${imageBase64}`,
        {
          folder: "keyOfferings",
          resource_type: "image",
        }
      );

      updatedImageUrl = cloudinaryResponse.secure_url;
    }

    // Build the update object dynamically
    interface UpdateFields {
      title?: string;
      image?: string;
    }

    const updateFields: UpdateFields = {};
    if (title) updateFields.title = title;
    if (updatedImageUrl) updateFields.image = updatedImageUrl;

    // Update the key offering
    const updatedKeyOffering = await KeyOfferingModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedKeyOffering) {
      return NextResponse.json(
        { error: "Failed to update the key offering." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Key offering updated successfully", updatedKeyOffering },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing key offering:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
