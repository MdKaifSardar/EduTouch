import { NextResponse } from "next/server";
import TestimonialModel from "@/models/testimonialModel";
import { connectToDB } from "@/lib/database";

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();

    const studentName = formData.get("studentName") as string | null;
    const rank = formData.get("rank") as string | null;
    const examName = formData.get("examName") as string | null;
    const testimonial = formData.get("testimonial") as string | null;
    const image = formData.get("image") as File | null;

    if (!studentName || !rank || !examName || !testimonial || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Read the file as a buffer using the arrayBuffer method
    const imageBuffer = await image.arrayBuffer();

    const newTestimonial = new TestimonialModel({
      studentName,
      rank,
      examName,
      testimonial,
      image: Buffer.from(imageBuffer),
    });

    await newTestimonial.save();
    return NextResponse.json({
      message: "Testimonial added successfully",
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
