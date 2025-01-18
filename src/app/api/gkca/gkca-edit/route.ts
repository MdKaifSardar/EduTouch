import { NextResponse } from "next/server";
import GKCurrAffModel from "@/models/gkCurrAffModel"; // Import your GK and Current Affairs model
import { connectToDB } from "@/lib/database";
import { uploadImageToCloudinary } from "@/hooks/CloudinaryImageUpload"; // Import the hook with folder parameter
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete"; // Import the hook for deleting images

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract the `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "GK and Current Affairs ID is required." },
        { status: 400 }
      );
    }

    // Extract other fields from form data
    const title = formData.get("title") as string | null;
    const gkPDFFile = formData.get("gkPDF") as File | null;
    const currentAffairsPDFFile = formData.get(
      "currentAffairsPDF"
    ) as File | null;
    const gkImage = formData.get("gkImage") as File | null;
    const caImage = formData.get("caImage") as File | null;

    if (
      !title &&
      !gkPDFFile &&
      !currentAffairsPDFFile &&
      !caImage &&
      !gkImage
    ) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    let gkImageUrl: string | undefined;
    let caImageUrl: string | undefined;

    // Check and upload new images if provided
    if (gkImage) {
      gkImageUrl = await uploadImageToCloudinary(gkImage, "gk-images"); // Specify the folder
    }

    if (caImage) {
      caImageUrl = await uploadImageToCloudinary(caImage, "ca-images"); // Specify the folder
    }

    // Fetch the existing document
    const existingDocument = await GKCurrAffModel.findById(id);

    if (!existingDocument) {
      return NextResponse.json(
        { error: "GK and Current Affairs not found." },
        { status: 404 }
      );
    }

    // Delete existing images from Cloudinary only if new images are uploaded
    if (gkImage && existingDocument.gkImage) {
      try {
        await deleteImageFromCloudinary(existingDocument.gkImage); // Delete the existing GK image
      } catch (error) {
        console.error("Failed to delete GK image from Cloudinary:", error);
      }
    }

    if (caImage && existingDocument.caImage) {
      try {
        await deleteImageFromCloudinary(existingDocument.caImage); // Delete the existing CA image
      } catch (error) {
        console.error("Failed to delete CA image from Cloudinary:", error);
      }
    }

    // Dynamically build the update object to only include provided fields
    interface UpdateFields {
      title?: string;
      gkPDF?: Buffer;
      currentAffairsPDF?: Buffer;
      gkImage?: string;
      caImage?: string;
    }

    const updateFields: UpdateFields = {};

    if (title) updateFields.title = title;
    if (gkImageUrl) updateFields.gkImage = gkImageUrl;
    if (caImageUrl) updateFields.caImage = caImageUrl;

    // Partially update the GK and Current Affairs document by ID
    const updatedGKCA = await GKCurrAffModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedGKCA) {
      return NextResponse.json(
        { error: "Failed to update GK and Current Affairs." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "GK and Current Affairs updated successfully", updatedGKCA },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing GK and Current Affairs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
