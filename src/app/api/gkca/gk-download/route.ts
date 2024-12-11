import { NextResponse } from "next/server";
import GKCurrAffModel from "@/models/gkCurrAffModel";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const record = await GKCurrAffModel.findById(id);

    if (!record?.gkPDF) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Ensure we're passing an ArrayBuffer to Response
    const buffer =
      record.gkPDF.buffer instanceof ArrayBuffer
        ? record.gkPDF.buffer
        : new ArrayBuffer(record.gkPDF.buffer.byteLength);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="general-knowledge.pdf"',
      },
    });
  } catch (error) {
    console.error("Error fetching GK PDF", error);
    return NextResponse.json(
      { error: "Failed to download the file" },
      { status: 500 }
    );
  }
};
