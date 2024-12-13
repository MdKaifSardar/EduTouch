import { connectToDB } from "@/lib/database";
import KeyOfferingModel from "@/models/keyOfferingsModel";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  try {
    await connectToDB();

    const formData = await req.formData();
    const id = formData.get("id") as string | null; // Extract `id` from FormData

    if (!id) {
      return NextResponse.json(
        { error: "Key offering ID is required" },
        { status: 400 }
      );
    }

    const deletedKeyOffering = await KeyOfferingModel.findByIdAndDelete(id);

    if (!deletedKeyOffering) {
      return NextResponse.json(
        { error: "Key offering not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Key offering deleted successfully" });
  } catch (error) {
    console.error("Error deleting key offering:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
};
