import YouTubeVideoModel from "@/models/youtubeVideoModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const videos = await YouTubeVideoModel.find();
    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: error, videos: [] }, { status: 500 });
  }
};
