import { NextResponse } from "next/server";
import TestimonialModel from "@/models/testimonialModel";

export const PATCH = async (req: Request) => {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract the `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Testimonial ID is required." },
        { status: 400 }
      );
    }

    // Extract fields from form data
    const studentName = formData.get("studentName") as string | null;
    const rank = formData.get("rank") as string | null;
    const examName = formData.get("examName") as string | null;
    const testimonial = formData.get("testimonial") as string | null;
    const image = formData.get("image") as File | null; // Handle file uploads

    if (!studentName && !rank && !examName && !testimonial && !image) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    let studentImageBuffer = undefined;
    if (image) {
      // Convert uploaded file to a buffer
      studentImageBuffer = await image.arrayBuffer();
    }

    // Dynamically build the update object
    interface UpdateFields {
      studentName?: string;
      rank?: string;
      examName?: string;
      testimonial?: string;
      image?: Buffer;
    }

    const updateFields: UpdateFields = {};

    if (studentName) updateFields.studentName = studentName;
    if (rank) updateFields.rank = rank;
    if (examName) updateFields.examName = examName;
    if (testimonial) updateFields.testimonial = testimonial;
    if (studentImageBuffer)
      updateFields.image = Buffer.from(studentImageBuffer);

    // Update the testimonial entry in the database by ID
    const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedTestimonial) {
      return NextResponse.json(
        { error: "Testimonial not found or failed to update." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Testimonial updated successfully", updatedTestimonial },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing testimonial:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
