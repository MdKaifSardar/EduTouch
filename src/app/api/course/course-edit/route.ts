import { NextResponse } from "next/server";
import CourseModel from "@/models/courseModel";
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
        { error: "Course ID is required." },
        { status: 400 }
      );
    }

    // Fetch the current course
    const existingCourse = await CourseModel.findById(id);
    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    // Extract fields from form data
    const courseName = formData.get("courseName") as string | null;
    const courseHighlights = formData.get("courseHighlights") as string | null;
    const courseSyllabus = formData.get("courseSyllabus") as string | null;
    const courseDuration = formData.get("courseDuration") as string | null;
    const courseDescription = formData.get("courseDescription") as
      | string
      | null;
    const image = formData.get("image") as File;

    let bannerBuffer = undefined;
    if (image) {
      bannerBuffer = await image.arrayBuffer();
    }

    let updatedImageUrl = undefined;
    if (bannerBuffer) {
      // Delete the previous image only if a new image is being uploaded
      if (existingCourse.image) {
        try {
          await deleteImageFromCloudinary(existingCourse.image);
        } catch (error) {
          console.error("Failed to delete previous image:", error);
        }
      }

      // Upload the new image to Cloudinary
      const bannerBase64 = Buffer.from(bannerBuffer).toString("base64");
      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:${image.type};base64,${bannerBase64}`,
        {
          folder: "courses",
          resource_type: "image",
        }
      );

      updatedImageUrl = cloudinaryResponse.secure_url;
    }

    // Build the update object dynamically
    interface UpdateFields {
      courseName?: string;
      courseHighlights?: string;
      courseSyllabus?: string;
      courseDescription?: string;
      courseDuration?: string;
      image?: string;
    }

    const updateFields: UpdateFields = {};
    if (courseName) updateFields.courseName = courseName;
    if (courseHighlights) updateFields.courseHighlights = courseHighlights;
    if (courseSyllabus) updateFields.courseSyllabus = courseSyllabus;
    if (courseDescription) updateFields.courseDescription = courseDescription;
    if (courseDuration) updateFields.courseDuration = courseDuration;
    if (updatedImageUrl) updateFields.image = updatedImageUrl;

    // Update the course
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { error: "Failed to update the course." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Course updated successfully", updatedCourse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing course:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
