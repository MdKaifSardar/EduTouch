import { NextResponse } from "next/server";
import TeacherModel from "@/models/teacherModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const teachers = await TeacherModel.find();
    return NextResponse.json({ teachers: teachers });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json({ error: error, teachers: [] }, { status: 500 });
  }
};
