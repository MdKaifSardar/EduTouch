import { NextResponse } from "next/server";
import GKCurrAffModel from "@/models/gkCurrAffModel"; // Import your GK and Current Affairs model
import { connectToDB } from "@/lib/database";
import { uploadImageToCloudinary } from "@/hooks/CloudinaryImageUpload"; // Import the custom Cloudinary hook

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

    // Upload GK image to Cloudinary in "gk-images" folder
    const gkImageUrl = gkImage
      ? await uploadImageToCloudinary(gkImage, "gk-images")
      : undefined;

    // Upload CA image to Cloudinary in "ca-images" folder
    const caImageUrl = caImage
      ? await uploadImageToCloudinary(caImage, "ca-images")
      : undefined;

    const gkPDFBuffer = await gkPDF.arrayBuffer();
    const currentAffairsPDFBuffer = await currentAffairsPDF.arrayBuffer();

    const newDocument = new GKCurrAffModel({
      title,
      gkPDF: Buffer.from(gkPDFBuffer),
      currentAffairsPDF: Buffer.from(currentAffairsPDFBuffer),
      gkImage: gkImageUrl,
      caImage: caImageUrl,
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
