import { connectToDB } from "@/lib/database";
import TestimonialModel from "@/models/testimonialModel";
import { NextResponse } from "next/server";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete"; // Ensure the correct import path

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    // Fetch the testimonial to get the image URL before deleting
    const testimonial = await TestimonialModel.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    // Delete the image from Cloudinary if it exists
    if (testimonial.image) {
      try {
        await deleteImageFromCloudinary(testimonial.image);
      } catch (error) {
        console.error(
          "Failed to delete testimonial image from Cloudinary:",
          error
        );
        // You might want to return an error here or proceed with deleting the testimonial
      }
    }

    // Delete the testimonial from the database
    const deletedTestimonial = await TestimonialModel.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json(
        { error: "Failed to delete the testimonial" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
