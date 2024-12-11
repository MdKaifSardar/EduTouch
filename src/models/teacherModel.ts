import mongoose, { Document, Model } from "mongoose";

// Define the Teacher schema interface
export interface ITeacher extends Document {
  teacherName: string;
  subject: string;
  image: Buffer; // Store the image as a binary buffer
}

const TeacherSchema = new mongoose.Schema<ITeacher>({
  teacherName: { type: String, required: true },
  subject: { type: String, required: true },
  image: { type: Buffer, required: true }, // Image stored as binary data
});

// Ensure the Teacher model has proper types with mongoose.Model
const TeacherModel: Model<ITeacher> =
  mongoose.models.Teacher || mongoose.model<ITeacher>("Teacher", TeacherSchema);

export default TeacherModel;
