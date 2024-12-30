import { NextResponse } from "next/server";
import HeroPosterModel from "@/models/heroPosterModel";
import { connectToDB } from "@/lib/database";

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const heroPosterFile = formData.get("image") as File | null;

    if (!title || !heroPosterFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Read the file as a buffer
    const heroPosterBuffer = await heroPosterFile.arrayBuffer();

    const newHeroPosterItem = new HeroPosterModel({
      title,
      image: Buffer.from(heroPosterBuffer),
    });

    await newHeroPosterItem.save();
    return NextResponse.json({
      message: "Hero poster item added successfully",
      heroPosterItem: newHeroPosterItem,
    });
  } catch (error) {
    console.error("Error creating hero poster item:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
