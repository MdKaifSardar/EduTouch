import { NextResponse } from "next/server";
import HeroPosterModel from "@/models/heroPosterModel"; // Adjust the import path
import { connectToDB } from "@/lib/database";

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract the `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "HeroPoster ID is required." },
        { status: 400 }
      );
    }

    // Extract fields from form data
    const title = formData.get("title") as string | null;
    const imageFile = formData.get("image") as File | null; // Handle file uploads

    if (!title && !imageFile) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    let imageBuffer = undefined;
    if (imageFile) {
      // Convert uploaded file to a buffer
      imageBuffer = await imageFile.arrayBuffer();
    }

    // Dynamically build the update object
    interface UpdateFields {
      title?: string;
      image?: Buffer;
    }

    const updateFields: UpdateFields = {};

    if (title) updateFields.title = title;
    if (imageBuffer) updateFields.image = Buffer.from(imageBuffer);

    // Update the HeroPoster entry in the database by ID
    const updatedHeroPoster = await HeroPosterModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedHeroPoster) {
      return NextResponse.json(
        { error: "HeroPoster item not found or failed to update." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "HeroPoster item updated successfully", updatedHeroPoster },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing HeroPoster item:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
