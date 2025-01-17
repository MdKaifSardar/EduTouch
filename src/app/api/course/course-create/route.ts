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

    if (
      !courseName ||
      !courseHighlights ||
      !courseSyllabus ||
      !courseDescription ||
      !courseDuration ||
      !image
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert the uploaded file to a buffer
    const bannerBuffer = await image.arrayBuffer();
    const bannerBase64 = Buffer.from(bannerBuffer).toString("base64");

    // Upload the file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      `data:${image.type};base64,${bannerBase64}`,
      {
        folder: "courses", // Optional: Folder in Cloudinary for organization
        resource_type: "image",
      }
    );

    // Save the Cloudinary URL to the database
    const newCourse = new CourseModel({
      courseName,
      courseHighlights,
      courseSyllabus,
      courseDescription,
      courseDuration,
      image: cloudinaryResponse.secure_url, // URL returned by Cloudinary
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
