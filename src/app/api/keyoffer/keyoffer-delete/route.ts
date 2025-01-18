import { connectToDB } from "@/lib/database";
import KeyOfferingModel from "@/models/keyOfferingsModel";
import { NextResponse } from "next/server";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete"; // Importing image deletion function

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null;

    if (!id) {
      return NextResponse.json(
        { error: "Key offering ID is required" },
        { status: 400 }
      );
    }

    // Fetch the current key offering
    const existingKeyOffering = await KeyOfferingModel.findById(id);
    if (!existingKeyOffering) {
      return NextResponse.json(
        { error: "Key offering not found" },
        { status: 404 }
      );
    }

    // Delete the image from Cloudinary
    if (existingKeyOffering.image) {
      try {
        await deleteImageFromCloudinary(existingKeyOffering.image);
      } catch (error) {
        console.error("Failed to delete the image from Cloudinary:", error);
      }
    }

    // Delete the key offering
    const deletedKeyOffering = await KeyOfferingModel.findByIdAndDelete(id);

    if (!deletedKeyOffering) {
      return NextResponse.json(
        { error: "Key offering not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Key offering deleted successfully" });
  } catch (error) {
    console.error("Error deleting key offering:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
