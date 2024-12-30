import { connectToDB } from "@/lib/database";
import ExamModel from "@/models/examModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const exams = await ExamModel.find({});

    const formattedExams = exams.map((item) => ({
      ...item.toObject(), // Convert Mongoose document to plain JavaScript object
      image: `data:image/png;base64,${item.image.toString("base64")}`, // Correctly encode the image
    }));

    return NextResponse.json({ exams: formattedExams });
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json({ error: error, exams: [] }, { status: 500 });
  }
};
