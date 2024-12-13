import { connectToDB } from "@/lib/database";
import FeedbackModel from "@/models/feedbackModel"; // Adjust path as needed
import { NextResponse } from "next/server";

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

    // Find and delete the feedback item by ID
    const deletedFeedback = await FeedbackModel.findByIdAndDelete(id);

    // If no feedback item is found, return an error
    if (!deletedFeedback) {
      return NextResponse.json(
        { error: "Feedback item not found" },
        { status: 404 }
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
