import { NextResponse } from "next/server";
import TeacherModel from "@/models/teacherModel";

export const POST = async (req: Request) => {
  try {
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

    // Read the file as a buffer using the arrayBuffer method
    const imageBuffer = await image.arrayBuffer();

    const newTeacher = new TeacherModel({
      teacherName,
      subject,
      image: Buffer.from(imageBuffer),
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
