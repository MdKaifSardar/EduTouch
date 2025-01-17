import { NextResponse } from "next/server";
import FeedbackModel from "@/models/feedbackModel"; // Adjust path as needed
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all feedback items from the database
    const feedbackItems = await FeedbackModel.find();

    // Return the formatted feedback items in the response
    return NextResponse.json({ feedbackItems: feedbackItems });
  } catch (error) {
    console.error("Error fetching feedback items:", error);
    return NextResponse.json(
      { error: error, feedbackItems: [] },
      { status: 500 }
    );
  }
};
