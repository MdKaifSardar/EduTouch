import { NextResponse } from "next/server";
import ExamModel from "@/models/examModel";
import { connectToDB } from "@/lib/database";

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract the `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Exam ID is required." },
        { status: 400 }
      );
    }

    // Extract other fields from form data
    const examName = formData.get("examName") as string | null;
    const officialSiteLink = formData.get("officialSiteLink") as string | null;
    const courseSyllabus = formData.get("courseSyllabus") as string | null;
    const description = formData.get("description") as string | null;
    const examDate = formData.get("examDate") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (
      !examName &&
      !officialSiteLink &&
      !courseSyllabus &&
      !description &&
      !examDate &&
      !imageFile
    ) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    let imageBuffer = undefined;
    if (imageFile) {
      // Convert file to buffer if uploaded
      imageBuffer = await imageFile.arrayBuffer();
    }

    // Dynamically build the update object to only include provided fields
    interface UpdateFields {
      examName?: string;
      officialSiteLink?: string;
      courseSyllabus?: string;
      description?: string;
      examDate?: string | Date; // Assuming examDate is a string or Date
      image?: Buffer;
    }

    const updateFields: UpdateFields = {};

    if (examName) updateFields.examName = examName;
    if (officialSiteLink) updateFields.officialSiteLink = officialSiteLink;
    if (courseSyllabus) updateFields.courseSyllabus = courseSyllabus;
    if (description) updateFields.description = description;
    if (examDate) updateFields.examDate = examDate;
    if (imageBuffer) updateFields.image = Buffer.from(imageBuffer);

    // Fetch and partially update the exam by ID
    const updatedExam = await ExamModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedExam) {
      return NextResponse.json(
        { error: "Exam not found or failed to update." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Exam updated successfully", updatedExam },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing exam:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
