import { connectToDB } from "@/lib/database";
import YouTubeVideoModel from "@/models/youtubeVideoModel";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract the `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Video ID is required." },
        { status: 400 }
      );
    }

    // Extract other fields from form data
    const title = formData.get("title") as string | null;
    const videoLink = formData.get("videoLink") as string | null;

    if (!title && !videoLink) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    // Dynamically build the update object to only include provided fields
    interface UpdateFields {
      title?: string;
      videoLink?: string;
    }

    const updateFields: UpdateFields = {};

    if (title) updateFields.title = title;
    if (videoLink) updateFields.videoLink = videoLink;

    // Fetch and partially update the video by ID
    const updatedVideo = await YouTubeVideoModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedVideo) {
      return NextResponse.json(
        { error: "Video not found or failed to update." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Video updated successfully", updatedVideo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing video:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
