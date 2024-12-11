import { NextResponse } from "next/server";
import GKCurrAffModel from "@/models/gkCurrAffModel";
import { connectToDB } from "@/lib/database";

export const GET = async (req: Request) => {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const record = await GKCurrAffModel.findById(id);

    if (!record?.currentAffairsPDF) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Ensure buffer is an ArrayBuffer
    const buffer =
      record.currentAffairsPDF.buffer instanceof ArrayBuffer
        ? record.currentAffairsPDF.buffer
        : new ArrayBuffer(record.currentAffairsPDF.buffer.byteLength);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="current-affairs.pdf"',
      },
    });
  } catch (error) {
    console.error("Error fetching Current Affairs PDF", error);
    return NextResponse.json(
      { error: "Failed to download the file" },
      { status: 500 }
    );
  }
};
