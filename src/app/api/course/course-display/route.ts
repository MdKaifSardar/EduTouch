import { NextResponse } from "next/server";
import CourseModel from "@/models/courseModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const courses = await CourseModel.find();

    return NextResponse.json({ courses: courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: error, courses: [] }, { status: 500 });
  }
};
