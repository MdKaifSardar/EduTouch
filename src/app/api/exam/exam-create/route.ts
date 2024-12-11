import { NextResponse } from "next/server";
import ExamModel from "@/models/examModel";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const examName = formData.get("examName") as string | null;
    const officialSiteLink = formData.get("officialSiteLink") as string | null;
    const courseSyllabus = formData.get("courseSyllabus") as string | null;
    const description = formData.get("description") as string | null;
    const examDate = formData.get("examDate") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (
      !examName ||
      !officialSiteLink ||
      !courseSyllabus ||
      !description ||
      !examDate ||
      !imageFile
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Read the file as a buffer using the arrayBuffer method
    const imageBuffer = await imageFile.arrayBuffer();

    const newExam = new ExamModel({
      examName,
      officialSiteLink,
      courseSyllabus,
      description,
      examDate,
      image: Buffer.from(imageBuffer),
    });

    await newExam.save();
    return NextResponse.json({
      message: "Exam created successfully",
      exam: newExam,
    });
  } catch (error) {
    console.error("Error creating exam:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
