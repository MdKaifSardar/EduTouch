import { connectToDB } from "@/lib/database";
import YouTubeVideoModel from "@/models/youtubeVideoModel";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const videoLink = formData.get("videoLink") as string | null;

    if (!title || !videoLink) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newVideo = new YouTubeVideoModel({ title, videoLink });
    await newVideo.save();

    return NextResponse.json({
      message: "Video added successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
