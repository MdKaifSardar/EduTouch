import { NextResponse } from "next/server";
import TestimonialModel from "@/models/testimonialModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    const testimonials = await TestimonialModel.find();

    return NextResponse.json({ testimonials: testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: error, testimonials: [] },
      { status: 500 }
    );
  }
};
