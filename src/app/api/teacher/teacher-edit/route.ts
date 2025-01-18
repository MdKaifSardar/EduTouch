import { NextResponse } from "next/server";
import TeacherModel from "@/models/teacherModel";
import { connectToDB } from "@/lib/database";
import { v2 as cloudinary } from "cloudinary";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();
    const id = formData.get("id") as string | null;

    if (!id) {
      return NextResponse.json(
        { error: "Teacher ID is required." },
        { status: 400 }
      );
    }

    // Fetch the current teacher
    const existingTeacher = await TeacherModel.findById(id);
    if (!existingTeacher) {
      return NextResponse.json(
        { error: "Teacher not found." },
        { status: 404 }
      );
    }

    // Extract fields from form data
    const teacherName = formData.get("teacherName") as string | null;
    const subject = formData.get("subject") as string | null;
    const imageFile = formData.get("image") as File;

    let imageBuffer = undefined;
    if (imageFile) {
      imageBuffer = await imageFile.arrayBuffer();
    }

    let updatedImageUrl = undefined;
    if (imageBuffer) {
      // Delete the previous image only if a new image is being uploaded
      if (existingTeacher.image) {
        try {
          await deleteImageFromCloudinary(existingTeacher.image);
        } catch (error) {
          console.error("Failed to delete previous image:", error);
        }
      }

      // Upload the new image to Cloudinary
      const imageBase64 = Buffer.from(imageBuffer).toString("base64");
      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${imageBase64}`,
        {
          folder: "teachers",
          resource_type: "image",
        }
      );

      updatedImageUrl = cloudinaryResponse.secure_url;
    }

    // Build the update object dynamically
    interface UpdateFields {
      teacherName?: string;
      subject?: string;
      image?: string;
    }

    const updateFields: UpdateFields = {};
    if (teacherName) updateFields.teacherName = teacherName;
    if (subject) updateFields.subject = subject;
    if (updatedImageUrl) updateFields.image = updatedImageUrl;

    // Update the teacher
    const updatedTeacher = await TeacherModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedTeacher) {
      return NextResponse.json(
        { error: "Failed to update the teacher." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Teacher updated successfully", updatedTeacher },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing teacher:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
