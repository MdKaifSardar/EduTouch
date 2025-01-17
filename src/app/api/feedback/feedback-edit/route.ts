import { NextResponse } from "next/server";
import FeedbackModel from "@/models/feedbackModel"; // Adjust path as needed
import { connectToDB } from "@/lib/database";
import { v2 as cloudinary } from "cloudinary";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete";

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
        { error: "Feedback ID is required." },
        { status: 400 }
      );
    }

    // Fetch the current feedback
    const existingFeedback = await FeedbackModel.findById(id);
    if (!existingFeedback) {
      return NextResponse.json(
        { error: "Feedback item not found." },
        { status: 404 }
      );
    }

    // Extract fields from form data
    const name = formData.get("name") as string | null;
    const batch = formData.get("batch") as string | null;
    const newImage = formData.get("image") as File;

    let updatedImageUrl = existingFeedback.imageNew; // Keep the existing image if no new image is uploaded

    // Handle image upload
    if (newImage) {
      // Delete the previous image only if a new image is being uploaded
      if (existingFeedback.imageNew) {
        try {
          await deleteImageFromCloudinary(existingFeedback.imageNew.toString());
        } catch (error) {
          console.error("Failed to delete previous image:", error);
        }
      }

      // Upload the new image to Cloudinary
      const imageBuffer = await newImage.arrayBuffer();
      const imageBase64 = Buffer.from(imageBuffer).toString("base64");
      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:${newImage.type};base64,${imageBase64}`,
        {
          folder: "feedback_images",
          resource_type: "image",
        }
      );

      updatedImageUrl = cloudinaryResponse.secure_url;
    }

    // Build the update object dynamically
    interface UpdateFields {
      name?: string;
      batch?: string;
      imageNew?: string;
    }

    const updateFields: UpdateFields = {};
    if (name) updateFields.name = name;
    if (batch) updateFields.batch = batch;
    if (updatedImageUrl) updateFields.imageNew = updatedImageUrl;

    // Update the feedback
    const updatedFeedback = await FeedbackModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedFeedback) {
      return NextResponse.json(
        { error: "Failed to update feedback item." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Feedback item updated successfully", updatedFeedback },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing feedback:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
