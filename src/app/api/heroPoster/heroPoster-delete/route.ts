import { connectToDB } from "@/lib/database";
import HeroPosterModel from "@/models/heroPosterModel";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Hero poster item ID is required" },
        { status: 400 }
      );
    }

    const deletedHeroPosterItem = await HeroPosterModel.findByIdAndDelete(id);

    if (!deletedHeroPosterItem) {
      return NextResponse.json(
        { error: "Hero poster item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Hero poster item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hero poster item:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
