import { NextResponse } from "next/server";
import GKCurrAffModel from "@/models/gkCurrAffModel"; // Import your GK and Current Affairs model
import { connectToDB } from "@/lib/database";

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

    // Initialize buffers for the PDF files and images
    let gkPDFBuffer = undefined;
    let currentAffairsPDFBuffer = undefined;
    let gkImageBuffer = undefined;
    let caImageBuffer = undefined;

    if (gkPDFFile) {
      // Convert the GK PDF file to a buffer if uploaded
      gkPDFBuffer = await gkPDFFile.arrayBuffer();
    }

    if (currentAffairsPDFFile) {
      // Convert the Current Affairs PDF file to a buffer if uploaded
      currentAffairsPDFBuffer = await currentAffairsPDFFile.arrayBuffer();
    }

    if (gkImage) {
      // Convert the GK Image file to a buffer if uploaded
      gkImageBuffer = await gkImage.arrayBuffer();
    }

    if (caImage) {
      // Convert the Current Affairs Image file to a buffer if uploaded
      caImageBuffer = await caImage.arrayBuffer();
    }

    // Dynamically build the update object to only include provided fields
    interface UpdateFields {
      title?: string;
      gkPDF?: Buffer;
      currentAffairsPDF?: Buffer;
      gkImage?: Buffer;
      caImage?: Buffer;
    }

    const updateFields: UpdateFields = {};

    if (title) updateFields.title = title;
    if (gkPDFBuffer) updateFields.gkPDF = Buffer.from(gkPDFBuffer);
    if (currentAffairsPDFBuffer)
      updateFields.currentAffairsPDF = Buffer.from(currentAffairsPDFBuffer);
    if (gkImageBuffer) updateFields.gkImage = Buffer.from(gkImageBuffer);
    if (caImageBuffer) updateFields.caImage = Buffer.from(caImageBuffer);

    // Fetch and partially update the GK and Current Affairs document by ID
    const updatedGKCA = await GKCurrAffModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedGKCA) {
      return NextResponse.json(
        { error: "GK and Current Affairs not found or failed to update." },
        { status: 404 }
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
