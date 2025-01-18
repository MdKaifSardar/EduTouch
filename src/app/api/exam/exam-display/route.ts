import { connectToDB } from "@/lib/database";
import ExamModel from "@/models/examModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const exams = await ExamModel.find({});

    return NextResponse.json({ exams: exams });
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json({ error: error, exams: [] }, { status: 500 });
  }
};
