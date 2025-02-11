import { NextResponse } from "next/server";
import CourseModel from "@/models/courseModel";
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

    const courseName = formData.get("courseName") as string | null;
    const courseHighlights = formData.get("courseHighlights") as string | null;
    const courseSyllabus = formData.get("courseSyllabus") as string | null;
    const courseDuration = formData.get("courseDuration") as string | null;
    const courseDescription = formData.get("courseDescription") as
      | string
      | null;
    const image = formData.get("image") as File | null;
    const pdfFile = formData.get("pdf") as File | null;

    if (
      !courseName ||
      !courseHighlights ||
      !courseSyllabus ||
      !courseDescription ||
      !courseDuration ||
      !image ||
      !pdfFile
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert image to base64
    const imageBuffer = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      `data:${image.type};base64,${imageBase64}`,
      {
        folder: "courses",
        resource_type: "image",
      }
    );

    // Convert PDF to Buffer
    const pdfBuffer = await pdfFile.arrayBuffer();

    // Save to the database
    const newCourse = new CourseModel({
      courseName,
      courseHighlights,
      courseSyllabus,
      courseDescription,
      courseDuration,
      image: cloudinaryResponse.secure_url, // Image URL from Cloudinary
      pdf: Buffer.from(pdfBuffer), // Store PDF as a buffer
    });

    await newCourse.save();

    return NextResponse.json({
      message: "Course added successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
