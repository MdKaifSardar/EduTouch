import { NextResponse } from "next/server";
import CourseModel from "@/models/courseModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const courses = await CourseModel.find();
    const formattedCourses = courses.map((course) => ({
      ...course.toObject(), // Convert Mongoose document to plain JS object
      image: `data:image/jpeg;base64,${course.image.toString(
        "base64"
      )}`, // Transform image buffer to Base64
    }));

    return NextResponse.json({ courses: formattedCourses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: error, courses: [] }, { status: 500 });
  }
};
