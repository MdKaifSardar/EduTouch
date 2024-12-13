import { NextResponse } from "next/server";
import FeedbackModel from "@/models/feedbackModel"; // Adjust path as needed
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch all feedback items from the database
    const feedbackItems = await FeedbackModel.find();

    // Format the feedback items, including the image as a base64 string
    const formattedFeedbackItems = feedbackItems.map((item) => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      imageNew: `data:image/png;base64,${item.imageNew.toString("base64")}`, // Encode image as base64
    }));

    // Return the formatted feedback items in the response
    return NextResponse.json({ feedbackItems: formattedFeedbackItems });
  } catch (error) {
    console.error("Error fetching feedback items:", error);
    return NextResponse.json(
      { error: error, feedbackItems: [] },
      { status: 500 }
    );
  }
};
