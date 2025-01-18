import { connectToDB } from "@/lib/database";
import FeedbackModel from "@/models/feedbackModel"; // Adjust path as needed
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE = async (req: Request) => {
  try {
    // Connect to the database
    await connectToDB();

    // Get form data from the request
    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    // Check if `id` is provided
    if (!id) {
      return NextResponse.json(
        { error: "Feedback item ID is required" },
        { status: 400 }
      );
    }

    // Fetch the current feedback item
    const existingFeedback = await FeedbackModel.findById(id);
    if (!existingFeedback) {
      return NextResponse.json(
        { error: "Feedback item not found" },
        { status: 404 }
      );
    }

    // Delete the image from Cloudinary only if the image exists
    if (existingFeedback.imageNew) {
      try {
        await deleteImageFromCloudinary(existingFeedback.imageNew.toString());
      } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
      }
    }

    // Find and delete the feedback item by ID
    const deletedFeedback = await FeedbackModel.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return NextResponse.json(
        { error: "Failed to delete feedback item." },
        { status: 500 }
      );
    }

    // Return a success response
    return NextResponse.json({ message: "Feedback item deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback item:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
