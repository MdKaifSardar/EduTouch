import mongoose, { Document, Model } from "mongoose";

// Define the Course schema interface
export interface ICourse extends Document {
  courseName: string;
  courseHighlights: string;
  courseSyllabus: string;
  courseDescription: string;
  courseDuration: string;
  image: Buffer; // Store the image as a binary buffer
}

const CourseSchema = new mongoose.Schema<ICourse>({
  courseName: { type: String, required: true },
  courseHighlights: { type: String, required: true },
  courseSyllabus: { type: String, required: true },
  courseDescription: { type: String, required: true },
  courseDuration: { type: String, required: true },
  image: { type: Buffer, required: true }, // Image stored as binary data
});

// Ensure the Course model has proper types with mongoose.Model
const CourseModel: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);

export default CourseModel;
