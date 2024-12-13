import { NextResponse } from "next/server";
import GKCurrAffModel from "@/models/gkCurrAffModel";
import { connectToDB } from "@/lib/database";

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();

    const title = formData.get("title") as string | null;
    const gkPDF = formData.get("gkPDF") as File | null;
    const currentAffairsPDF = formData.get("currentAffairsPDF") as File | null;
    const gkImage = formData.get("gkImage") as File | null;
    const caImage = formData.get("caImage") as File | null;

    if (!title || !gkPDF || !currentAffairsPDF || !gkImage || !caImage) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if a document with the same title already exists
    const existingDocument = await GKCurrAffModel.findOne({ title });
    if (existingDocument) {
      return NextResponse.json(
        { error: "Title already exists" },
        { status: 400 }
      );
    }

    const gkPDFBuffer = await gkPDF.arrayBuffer();
    const currentAffairsPDFBuffer = await currentAffairsPDF.arrayBuffer();
    const gkImageBuffer = await gkImage.arrayBuffer();
    const caImageBuffer = await caImage.arrayBuffer();

    const newDocument = new GKCurrAffModel({
      title,
      gkPDF: Buffer.from(gkPDFBuffer),
      currentAffairsPDF: Buffer.from(currentAffairsPDFBuffer),
      gkImage: Buffer.from(gkImageBuffer),
      caImage: Buffer.from(caImageBuffer),
    });

    await newDocument.save();

    return NextResponse.json({
      message: "GK & Current Affairs documents added successfully",
      document: newDocument,
    });
  } catch (error) {
    console.error("Error creating GK & Current Affairs document:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
