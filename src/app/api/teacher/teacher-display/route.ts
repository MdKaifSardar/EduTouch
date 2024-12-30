import { NextResponse } from "next/server";
import TeacherModel from "@/models/teacherModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const teachers = await TeacherModel.find();
    const formattedTeacherItems = teachers.map((item) => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      image: `data:image/png;base64,${item.image.toString("base64")}`, // Correctly encode the image
    }));

    return NextResponse.json({ teachers: formattedTeacherItems });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json({ error: error, teachers: [] }, { status: 500 });
  }
};
