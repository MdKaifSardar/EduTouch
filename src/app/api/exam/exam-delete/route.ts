import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete";
import { connectToDB } from "@/lib/database";
import ExamModel from "@/models/examModel";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Exam ID is required" },
        { status: 400 }
      );
    }

    // Fetch the exam to get the image URL before deleting
    const exam = await ExamModel.findById(id);

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    // Delete the associated image from Cloudinary if it exists
    if (exam.image) {
      try {
        await deleteImageFromCloudinary(exam.image);
      } catch (error) {
        console.error("Failed to delete exam image from Cloudinary:", error);
        // You might want to log this or handle it based on requirements
      }
    }

    // Delete the exam from the database
    const deletedExam = await ExamModel.findByIdAndDelete(id);

    if (!deletedExam) {
      return NextResponse.json(
        { error: "Failed to delete the exam" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Error deleting exam:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
