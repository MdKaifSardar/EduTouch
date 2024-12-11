import { NextResponse } from "next/server";
import CourseModel from "@/models/courseModel";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const courseName = formData.get("courseName") as string | null;
    const courseHighlights = formData.get("courseHighlights") as string | null;
    const courseSyllabus = formData.get("courseSyllabus") as string | null;
    const courseDuration = formData.get("courseDuration") as string | null;
    const courseDescription = formData.get("courseDescription") as
      | string
      | null;
    const image = formData.get("image") as File | null;

    if (
      !courseName ||
      !courseHighlights ||
      !courseSyllabus ||
      !courseDescription ||
      !courseDuration ||
      !image
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Read the file as a buffer using the arrayBuffer method
    const bannerBuffer = await image.arrayBuffer();

    const newCourse = new CourseModel({
      courseName,
      courseHighlights,
      courseSyllabus,
      courseDescription,
      courseDuration,
      image: Buffer.from(bannerBuffer),
    });

    await newCourse.save();
    return NextResponse.json({
      message: "Course added successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
