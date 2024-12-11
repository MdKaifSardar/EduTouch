import { NextResponse } from "next/server";
import TestimonialModel from "@/models/testimonialModel";

export const GET = async () => {
  try {
    const testimonials = await TestimonialModel.find();
    const formattedTestimonials = testimonials.map((item) => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      image: `data:image/png;base64,${item.image.toString("base64")}`, // Correctly encode the image
    }));

    return NextResponse.json({ testimonials: formattedTestimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
