import { NextResponse } from "next/server";
import HeroPosterModel from "@/models/heroPosterModel"; // Adjust the import path
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const heroPosterItems = await HeroPosterModel.find();
    const formattedHeroPosterItems = heroPosterItems.map((item) => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      image: `data:image/png;base64,${item.image.toString("base64")}`, // Correctly encode the image
    }));

    return NextResponse.json({ heroPosters: formattedHeroPosterItems });
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
