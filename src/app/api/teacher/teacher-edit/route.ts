import { NextResponse } from "next/server";
import TeacherModel from "@/models/teacherModel";
import { connectToDB } from "@/lib/database";

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract the `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Teacher ID is required." },
        { status: 400 }
      );
    }

    // Extract fields from form data
    const teacherName = formData.get("teacherName") as string | null;
    const subject = formData.get("subject") as string | null;
    const imageFile = formData.get("image") as File | null; // Handle file uploads

    if (!teacherName && !subject && !imageFile) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    let imageBuffer = undefined;
    if (imageFile) {
      // Convert uploaded file to a buffer
      imageBuffer = await imageFile.arrayBuffer();
    }

    // Dynamically build the update object
    interface UpdateFields {
      teacherName?: string;
      subject?: string;
      image?: Buffer;
    }

    const updateFields: UpdateFields = {};

    if (teacherName) updateFields.teacherName = teacherName;
    if (subject) updateFields.subject = subject;
    if (imageBuffer) updateFields.image = Buffer.from(imageBuffer);

    // Update the teacher entry in the database by ID
    const updatedTeacher = await TeacherModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedTeacher) {
      return NextResponse.json(
        { error: "Teacher not found or failed to update." },
        { status: 404 }
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
