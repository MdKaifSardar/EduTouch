import { NextResponse } from "next/server";
import HeroPosterModel from "@/models/heroPosterModel"; // Adjust the import path
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const heroPosterItems = await HeroPosterModel.find();
    return NextResponse.json({ heroPosters: heroPosterItems });
  } catch (error) {
    console.error("Error fetching hero posters:", error);
    return NextResponse.json(
      {
        error: error,
        heroPosters: [],
      },
      { status: 500 }
    );
  }
};
