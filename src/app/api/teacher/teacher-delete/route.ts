import { connectToDB } from "@/lib/database";
import TeacherModel from "@/models/teacherModel";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null;

    if (!id) {
      return NextResponse.json(
        { error: "Teacher ID is required" },
        { status: 400 }
      );
    }

    const existingTeacher = await TeacherModel.findById(id);

    if (!existingTeacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    // Delete the image from Cloudinary if it exists
    if (existingTeacher.image) {
      try {
        await deleteImageFromCloudinary(existingTeacher.image);
      } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
      }
    }

    // Delete the teacher from the database
    const deletedTeacher = await TeacherModel.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return NextResponse.json(
        { error: "Failed to delete the teacher." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
