import { NextResponse } from "next/server";
import TestimonialModel from "@/models/testimonialModel";
import { connectToDB } from "@/lib/database";
import { v2 as cloudinary } from "cloudinary";
import { uploadImageToCloudinary } from "@/hooks/CloudinaryImageUpload"; // Import your Cloudinary hook

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();

    const studentName = formData.get("studentName") as string | null;
    // const rank = formData.get("rank") as string | null;
    const examName = formData.get("examName") as string | null;
    const testimonial = formData.get("testimonial") as string | null;
    const image = formData.get("image") as File | null;

    if (!studentName || !examName || !testimonial || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Upload the image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(image, "testimonials");

    const newTestimonial = new TestimonialModel({
      studentName,
      // rank,
      examName,
      testimonial,
      image: imageUrl, // Using Cloudinary image URL
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
