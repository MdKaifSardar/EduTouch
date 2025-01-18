import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete";
import { connectToDB } from "@/lib/database";
import CourseModel from "@/models/courseModel";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    // Fetch the course to get the image URL before deleting
    const course = await CourseModel.findById(id);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Delete the image from Cloudinary if it exists
    if (course.image) {
      try {
        await deleteImageFromCloudinary(course.image);
      } catch (error) {
        console.error("Failed to delete course image from Cloudinary:", error);
        // You might want to return an error here or proceed with deleting the course
      }
    }

    // Delete the course from the database
    const deletedCourse = await CourseModel.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json(
        { error: "Failed to delete the course" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
