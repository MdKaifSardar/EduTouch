import { NextResponse } from "next/server";
import FeedbackModel from "@/models/feedbackModel";  // Adjust path as needed
import { connectToDB } from "@/lib/database";

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

    // Read the file as a buffer
    const imageBuffer = await imageFile.arrayBuffer();

    // Create a new feedback entry
    const newFeedback = new FeedbackModel({
      name,
      batch,
      imageNew: Buffer.from(imageBuffer),  // Store image as binary data
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
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
