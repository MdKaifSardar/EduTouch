import { NextResponse } from "next/server";
import NoticeModel from "@/models/noticeModel";
import { connectToDB } from "@/lib/database";

export const POST = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();

    const noticeTitle = formData.get("noticeTitle") as string | null;
    const pdfFile = formData.get("pdf") as File | null;

    if (!noticeTitle || !pdfFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Convert PDF to Buffer
    const pdfBuffer = await pdfFile.arrayBuffer();

    // Save to the database
    const newNotice = new NoticeModel({
      noticeTitle,
      pdf: Buffer.from(pdfBuffer),
    });

    await newNotice.save();

    return NextResponse.json({
      message: "Notice added successfully",
      notice: newNotice,
    });
  } catch (error) {
    console.error("Error creating notice:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
