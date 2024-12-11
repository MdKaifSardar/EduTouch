import { NextResponse } from "next/server";
import CourseModel from "@/models/courseModel";

export const PATCH = async (req: Request) => {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract the `id` from the FormData

    if (!id) {
      return NextResponse.json(
        { error: "Course ID is required." },
        { status: 400 }
      );
    }

    // Extract other fields from form data
    const courseName = formData.get("courseName") as string | null;
    const courseHighlights = formData.get("courseHighlights") as string | null; // Assuming it's a JSON-encoded string
    const courseSyllabus = formData.get("courseSyllabus") as string | null;
    const courseDuration = formData.get("courseDuration") as string | null;
    const courseDescription = formData.get("courseDescription") as
      | string
      | null;
    const image = formData.get("image") as File | null; // Handle file uploads if necessary

    if (
      !courseName &&
      !courseHighlights &&
      !courseSyllabus &&
      !courseDescription &&
      !courseDuration &&
      !image
    ) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    let bannerBuffer = undefined;
    if (image) {
      // Convert file to buffer
      bannerBuffer = await image.arrayBuffer();
    }

    // Dynamically build the update object to only include provided fields
    interface UpdateFields {
      courseName?: string;
      courseHighlights?: string;
      courseSyllabus?: string;
      courseDescription?: string;
      courseDuration?: string;
      image?: Buffer;
    }

    const updateFields: UpdateFields = {};
    if (courseName) updateFields.courseName = courseName;
    if (courseHighlights) updateFields.courseHighlights = courseHighlights;
    if (courseSyllabus) updateFields.courseSyllabus = courseSyllabus;
    if (courseDescription) updateFields.courseDescription = courseDescription;
    if (courseDuration) updateFields.courseDuration = courseDuration;
    if (bannerBuffer) updateFields.image = Buffer.from(bannerBuffer);

    // Fetch and partially update the course by ID
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedCourse) {
      return NextResponse.json(
        { error: "Course not found or failed to update." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Course updated successfully", updatedCourse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing course:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
