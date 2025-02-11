import mongoose, { Document, Model } from "mongoose";

// Define the Exam schema interface
export interface IExam extends Document {
  examName: string;
  officialSiteLink: string;
  // courseSyllabus: string;
  // description: string;
  // examDate: string;
  image: string;
  qualifications: string;
  selectionProcess: string;
  formFillUpDate: Date;
  pdf: Buffer;
}

// Define the schema using the IExam interface
const examSchema = new mongoose.Schema<IExam>(
  {
    examName: { type: String, required: true },
    officialSiteLink: { type: String, required: true },
    // courseSyllabus: { type: String, required: true },
    // description: { type: String, required: true },
    // examDate: { type: String, required: true },
    image: { type: String, required: true },
    qualifications: { type: String, required: true },
    selectionProcess: { type: String, required: true },
    formFillUpDate: { type: Date, required: true },
    pdf: { type: Buffer, required: true },
  },
  { timestamps: true }
);

// Ensure the Exam model has proper types with mongoose.Model
const ExamModel: Model<IExam> =
  mongoose.models.Exam || mongoose.model<IExam>("Exam", examSchema);

export default ExamModel;
