import { NextResponse } from "next/server";
import ExamModel from "@/models/examModel";
import { connectToDB } from "@/lib/database";
import { v2 as cloudinary } from "cloudinary";
import { deleteImageFromCloudinary } from "@/hooks/CloudinaryImageDelete";

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
    const id = formData.get("id") as string | null;

    if (!id) {
      return NextResponse.json(
        { error: "Exam ID is required." },
        { status: 400 }
      );
    }

    // Extract allowed fields from form data
    const examName = formData.get("examName") as string | null;
    const officialSiteLink = formData.get("officialSiteLink") as string | null;
    const qualifications = formData.get("qualifications") as string | null;
    const selectionProcess = formData.get("selectionProcess") as string | null;
    const formFillUpDate = formData.get("formFillUpDate") as string | null;
    const imageFile = formData.get("image") as File | null;
    const pdfFile = formData.get("pdf") as File | null;

    if (
      !examName &&
      !officialSiteLink &&
      !qualifications &&
      !selectionProcess &&
      !formFillUpDate &&
      !imageFile &&
      !pdfFile
    ) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    // Fetch the existing exam
    const existingExam = await ExamModel.findById(id);
    if (!existingExam) {
      return NextResponse.json({ error: "Exam not found." }, { status: 404 });
    }

    let imageUrl = undefined;
    if (imageFile) {
      // Delete the existing image from Cloudinary
      if (existingExam.image) {
        try {
          const isDeleted = await deleteImageFromCloudinary(existingExam.image);
          if (!isDeleted) {
            console.warn(
              "Failed to delete the existing image from Cloudinary."
            );
          }
        } catch (error) {
          console.error("Error deleting the existing image:", error);
        }
      }

      // Convert file to buffer and upload the new image to Cloudinary
      const imageBuffer = await imageFile.arrayBuffer();
      const imageBase64 = Buffer.from(imageBuffer).toString("base64");

      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${imageBase64}`,
        {
          folder: "exams",
          resource_type: "image",
        }
      );

      imageUrl = cloudinaryResponse.secure_url;
    }

    let pdfBuffer = undefined;
    if (pdfFile) {
      // Convert the PDF file to a buffer and store it in MongoDB
      pdfBuffer = await pdfFile.arrayBuffer();
    }

    // Dynamically build the update object to only include provided fields
    interface UpdateFields {
      examName?: string;
      officialSiteLink?: string;
      image?: string;
      pdf?: Buffer; // Store PDF as a buffer in MongoDB
      qualifications?: string;
      selectionProcess?: string;
      formFillUpDate?: string; // Store as string
    }

    const updateFields: UpdateFields = {};

    if (examName) updateFields.examName = examName;
    if (officialSiteLink) updateFields.officialSiteLink = officialSiteLink;
    if (imageUrl) updateFields.image = imageUrl;
    if (pdfBuffer) updateFields.pdf = Buffer.from(pdfBuffer);
    if (qualifications) updateFields.qualifications = qualifications;
    if (selectionProcess) updateFields.selectionProcess = selectionProcess;
    if (formFillUpDate) updateFields.formFillUpDate = formFillUpDate;

    // Partially update the exam by ID
    const updatedExam = await ExamModel.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated document
    });

    if (!updatedExam) {
      return NextResponse.json(
        { error: "Failed to update the exam." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Exam updated successfully", updatedExam },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing exam:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
