import { NextResponse } from "next/server";
import GKCurrAffModel, { IGKCurrAff } from "@/models/gkCurrAffModel"; // Import your GK and Current Affairs model
import { connectToDB } from "@/lib/database";
import { uploadImageToCloudinary } from "@/hooks/CloudinaryImageUpload"; // Import the hook with folder parameter
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete"; // Import the hook for deleting images

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();
    const id = formData.get("id") as string | null;

    if (!id) {
      return NextResponse.json(
        { error: "GK and Current Affairs ID is required." },
        { status: 400 }
      );
    }

    // Extract fields from form data
    const title = formData.get("title") as string | null;
    const gkTitle = formData.get("gkTitle") as string | null;
    const caTitle = formData.get("caTitle") as string | null;
    const gkLink = formData.get("gkLink") as string | null;
    const caLink = formData.get("caLink") as string | null;
    const gkImage = formData.get("gkImage") as File | null;
    const caImage = formData.get("caImage") as File | null;

    if (
      !title &&
      !gkTitle &&
      !caTitle &&
      !gkLink &&
      !caLink &&
      !gkImage &&
      !caImage
    ) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary if provided
    let gkImageUrl: string | undefined;
    let caImageUrl: string | undefined;

    if (gkImage) {
      gkImageUrl = await uploadImageToCloudinary(gkImage, "gk-images");
    }

    if (caImage) {
      caImageUrl = await uploadImageToCloudinary(caImage, "ca-images");
    }

    // Fetch the existing document
    const existingDocument = await GKCurrAffModel.findById(id);

    if (!existingDocument) {
      return NextResponse.json(
        { error: "GK and Current Affairs not found." },
        { status: 404 }
      );
    }

    // Delete existing images from Cloudinary if new images are uploaded
    if (gkImage && existingDocument.gkImage) {
      try {
        await deleteImageFromCloudinary(existingDocument.gkImage);
      } catch (error) {
        console.error("Failed to delete GK image from Cloudinary:", error);
      }
    }

    if (caImage && existingDocument.caImage) {
      try {
        await deleteImageFromCloudinary(existingDocument.caImage);
      } catch (error) {
        console.error("Failed to delete CA image from Cloudinary:", error);
      }
    }

    // Build the update object dynamically
    const updateFields: Partial<IGKCurrAff> = {};

    if (title) updateFields.title = title;
    if (gkTitle) updateFields.gkTitle = gkTitle;
    if (caTitle) updateFields.caTitle = caTitle;
    if (gkLink) updateFields.gkLink = gkLink;
    if (caLink) updateFields.caLink = caLink;
    if (gkImageUrl) updateFields.gkImage = gkImageUrl;
    if (caImageUrl) updateFields.caImage = caImageUrl;

    // Update the document
    const updatedGKCA = await GKCurrAffModel.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
      }
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
