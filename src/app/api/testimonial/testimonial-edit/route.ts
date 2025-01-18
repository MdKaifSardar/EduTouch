import { NextResponse } from "next/server";
import TestimonialModel from "@/models/testimonialModel";
import { connectToDB } from "@/lib/database";
import { v2 as cloudinary } from "cloudinary";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete"; // Ensure the correct import path

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
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

    let studentImageUrl = undefined;
    let studentImageBuffer = undefined;

    if (image) {
      studentImageBuffer = await image.arrayBuffer();

      // If there's an existing image, delete it
      const existingTestimonial = await TestimonialModel.findById(id);
      if (existingTestimonial?.image) {
        try {
          await deleteImageFromCloudinary(existingTestimonial.image);
        } catch (error) {
          console.error("Failed to delete previous image:", error);
        }
      }

      // Upload the new image to Cloudinary
      const studentImageBase64 =
        Buffer.from(studentImageBuffer).toString("base64");
      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:${image.type};base64,${studentImageBase64}`,
        {
          folder: "testimonials",
          resource_type: "image",
        }
      );

      studentImageUrl = cloudinaryResponse.secure_url;
    }

    // Dynamically build the update object
    interface UpdateFields {
      studentName?: string;
      rank?: string;
      examName?: string;
      testimonial?: string;
      image?: string;
    }

    const updateFields: UpdateFields = {};

    if (studentName) updateFields.studentName = studentName;
    if (rank) updateFields.rank = rank;
    if (examName) updateFields.examName = examName;
    if (testimonial) updateFields.testimonial = testimonial;
    if (studentImageUrl) updateFields.image = studentImageUrl;

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
