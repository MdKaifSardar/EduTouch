import { connectToDB } from "@/lib/database";
import NoticeModel from "@/models/noticeModel";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Notice ID is required" },
        { status: 400 }
      );
    }

    // Delete the notice from the database
    const deletedNotice = await NoticeModel.findByIdAndDelete(id);

    if (!deletedNotice) {
      return NextResponse.json(
        { error: "Failed to delete the notice" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Error deleting notice:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
