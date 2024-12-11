import { NextResponse } from "next/server";
import TeacherModel from "@/models/teacherModel";

export const GET = async () => {
  try {
    const teachers = await TeacherModel.find();
    const formattedTeacherItems = teachers.map((item) => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      image: `data:image/png;base64,${item.image.toString("base64")}`, // Correctly encode the image
    }));

    return NextResponse.json({ teachers: formattedTeacherItems });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
