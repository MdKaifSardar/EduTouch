import { NextResponse } from "next/server";
import FeedbackModel from "@/models/feedbackModel"; // Adjust path as needed
import { connectToDB } from "@/lib/database";
import { uploadImageToCloudinary } from "@/hooks/CloudinaryImageUpload";

export const POST = async (req: Request) => {
  try {
    // Connect to the database
    await connectToDB();

    // Get form data from the request
    const formData = await req.formData();

    // Extract feedback fields
    const name = formData.get("name") as string | null;
    const batch = formData.get("batch") as string | null;
    const imageFile = formData.get("image") as File | null;

    // Check if all fields are provided
    if (!name || !batch || !imageFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Upload the image to Cloudinary using the utility function
    const imageUrl = await uploadImageToCloudinary(
      imageFile,
      "feedback_images"
    );

    // Create a new feedback entry with Cloudinary image URL
    const newFeedback = new FeedbackModel({
      name,
      batch,
      imageNew: imageUrl, // Store image URL
    });

    // Save the feedback item to the database
    await newFeedback.save();

    // Return a success response
    return NextResponse.json({
      message: "Feedback added successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
