import { NextResponse } from "next/server";
import ExamModel from "@/models/examModel";
import { connectToDB } from "@/lib/database";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();

    const examName = formData.get("examName") as string | null;
    const officialSiteLink = formData.get("officialSiteLink") as string | null;
    const qualifications = formData.get("qualifications") as string | null;
    const selectionProcess = formData.get("selectionProcess") as string | null;
    const formFillUpDate = formData.get("formFillUpDate") as string | null;
    const imageFile = formData.get("image") as File | null;
    const pdfFile = formData.get("pdf") as File | null;

    if (
      !examName ||
      !officialSiteLink ||
      !qualifications ||
      !selectionProcess ||
      !formFillUpDate ||
      !imageFile ||
      !pdfFile
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert image to base64 and upload to Cloudinary
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");
    const imageUploadResponse = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${imageBase64}`,
      {
        folder: "exams",
        resource_type: "image",
      }
    );

    // Convert PDF to Buffer
    const pdfBuffer = await pdfFile.arrayBuffer();

    // Save to the database
    const newExam = new ExamModel({
      examName,
      officialSiteLink,
      image: imageUploadResponse.secure_url,
      qualifications,
      selectionProcess,
      formFillUpDate, // Store as string
      pdf: Buffer.from(pdfBuffer),
    });

    await newExam.save();

    return NextResponse.json({
      message: "Exam created successfully",
      exam: newExam,
    });
  } catch (error) {
    console.error("Error creating exam:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
