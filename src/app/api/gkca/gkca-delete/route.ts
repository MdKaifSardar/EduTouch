import { connectToDB } from "@/lib/database";
import GKCurrAffModel from "@/models/gkCurrAffModel";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }

    const deletedDocument = await GKCurrAffModel.findByIdAndDelete(id);

    if (!deletedDocument) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "GK & Current Affairs document deleted successfully" });
  } catch (error) {
    console.error("Error deleting GK & Current Affairs document:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
