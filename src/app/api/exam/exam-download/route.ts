import { NextResponse } from "next/server";
import ExamModel from "@/models/examModel";
import { connectToDB } from "@/lib/database";

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const record = await ExamModel.findById(id);

    if (!record?.pdf) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Ensure we are passing an ArrayBuffer to Response
    const buffer =
      record.pdf.buffer instanceof ArrayBuffer
        ? record.pdf.buffer
        : new ArrayBuffer(record.pdf.buffer.byteLength);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="exam-details.pdf"',
      },
    });
  } catch (error) {
    console.error("Error fetching Exam PDF", error);
    return NextResponse.json(
      { error: "Failed to download the file" },
      { status: 500 }
    );
  }
};
