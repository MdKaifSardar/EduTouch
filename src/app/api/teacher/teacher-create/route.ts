import { NextResponse } from "next/server";
import TeacherModel from "@/models/teacherModel";
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

    const teacherName = formData.get("teacherName") as string | null;
    const subject = formData.get("subject") as string | null;
    const image = formData.get("image") as File | null;

    if (!teacherName || !subject || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert the uploaded file to a buffer
    const imageBuffer = await image.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString("base64");

    // Upload the file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      `data:${image.type};base64,${imageBase64}`,
      {
        folder: "teachers", // Folder named "teachers"
        resource_type: "image",
      }
    );

    // Save the Cloudinary URL to the database
    const newTeacher = new TeacherModel({
      teacherName,
      subject,
      image: cloudinaryResponse.secure_url, // URL returned by Cloudinary
    });

    await newTeacher.save();
    return NextResponse.json({
      message: "Teacher added successfully",
      teacher: newTeacher,
    });
  } catch (error) {
    console.error("Error creating teacher:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
