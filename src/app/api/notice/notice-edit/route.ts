import { NextResponse } from "next/server";
import NoticeModel from "@/models/noticeModel";
import { connectToDB } from "@/lib/database";

export const PATCH = async (req: Request) => {
  try {
    await connectToDB();
    const formData = await req.formData();
    const id = formData.get("id") as string | null;

    if (!id) {
      return NextResponse.json(
        { error: "Notice ID is required." },
        { status: 400 }
      );
    }

    // Fetch the current notice
    const existingNotice = await NoticeModel.findById(id);
    if (!existingNotice) {
      return NextResponse.json({ error: "Notice not found." }, { status: 404 });
    }

    // Extract fields from form data
    const noticeTitle = formData.get("noticeTitle") as string | null;
    const pdfFile = formData.get("pdf") as File | null;

    let pdfBuffer = undefined;
    if (pdfFile) {
      pdfBuffer = await pdfFile.arrayBuffer();
    }

    // Build the update object dynamically
    interface UpdateFields {
      noticeTitle?: string;
      pdf?: Buffer;
    }

    const updateFields: UpdateFields = {};
    if (noticeTitle) updateFields.noticeTitle = noticeTitle;
    if (pdfBuffer) updateFields.pdf = Buffer.from(pdfBuffer);

    // Update the notice
    const updatedNotice = await NoticeModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedNotice) {
      return NextResponse.json(
        { error: "Failed to update the notice." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Notice updated successfully", updatedNotice },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error editing notice:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
