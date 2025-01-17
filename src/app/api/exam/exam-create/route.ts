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
    const courseSyllabus = formData.get("courseSyllabus") as string | null;
    const description = formData.get("description") as string | null;
    const examDate = formData.get("examDate") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (
      !examName ||
      !officialSiteLink ||
      !courseSyllabus ||
      !description ||
      !examDate ||
      !imageFile
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert the uploaded file to a buffer
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");

    // Upload the file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      `data:${imageFile.type};base64,${imageBase64}`,
      {
        folder: "exams", // Optional: Folder in Cloudinary for organization
        resource_type: "image",
      }
    );

    // Save the Cloudinary URL to the database
    const newExam = new ExamModel({
      examName,
      officialSiteLink,
      courseSyllabus,
      description,
      examDate,
      image: cloudinaryResponse.secure_url, // URL returned by Cloudinary
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
