import { NextResponse } from "next/server";
import FeedbackModel from "@/models/feedbackModel"; // Adjust path as needed
import { connectToDB } from "@/lib/database";

export const PATCH = async (req: Request) => {
  try {
    // Connect to the database
    await connectToDB();

    // Extract form data from the request
    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    // Ensure the ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Feedback ID is required." },
        { status: 400 }
      );
    }

    // Extract fields from form data
    const name = formData.get("name") as string | null;
    const batch = formData.get("batch") as string | null;
    const imageFile = formData.get("image") as File | null; // Handle file uploads

    if (!name && !batch && !imageFile) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    // Handle image upload if provided
    let imageBuffer = undefined;
    if (imageFile) {
      imageBuffer = await imageFile.arrayBuffer();
    }

    // Dynamically build the update object
    interface UpdateFields {
      name?: string;
      batch?: string;
      imageNew?: Buffer;
    }

    const updateFields: UpdateFields = {};

    if (name) updateFields.name = name;
    if (batch) updateFields.batch = batch;
    if (imageBuffer) updateFields.imageNew = Buffer.from(imageBuffer);

    // Update the feedback entry in the database by ID
    const updatedFeedback = await FeedbackModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedFeedback) {
      return NextResponse.json(
        { error: "Feedback item not found or failed to update." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Feedback item updated successfully", updatedFeedback },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing feedback item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
