import { connectToDB } from "@/lib/database";
import GKCurrAffModel from "@/models/gkCurrAffModel";
import { NextResponse } from "next/server";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete"; // Import the delete hook

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }

    // Fetch the existing document
    const existingDocument = await GKCurrAffModel.findById(id);

    if (!existingDocument) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    // Delete images from both GK and CA images folders if they exist
    if (existingDocument.gkImage) {
      try {
        await deleteImageFromCloudinary(existingDocument.gkImage); // Delete GK image
      } catch (error) {
        console.error("Failed to delete GK image from Cloudinary:", error);
      }
    }

    if (existingDocument.caImage) {
      try {
        await deleteImageFromCloudinary(existingDocument.caImage); // Delete CA image
      } catch (error) {
        console.error("Failed to delete CA image from Cloudinary:", error);
      }
    }

    // Delete the document
    const deletedDocument = await GKCurrAffModel.findByIdAndDelete(id);

    if (!deletedDocument) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "GK & Current Affairs document deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting GK & Current Affairs document:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
