import mongoose, { Document, Model } from "mongoose";

// Define the Gallery schema interface
export interface IFeedback extends Document {
  name: string;
  batch: string;
  imageNew: string; // Store the image as a binary buffer
}

const FeedbackSchema = new mongoose.Schema<IFeedback>({
  name: { type: String, required: true },
  batch: { type: String, required: true },
  imageNew: { type: String, required: true }, // Image stored as binary data
});

// Ensure the Gallery model has proper types with mongoose.Model
const FeedbackModel: Model<IFeedback> =
  mongoose.models.Feedback || mongoose.model<IFeedback>("Feedback", FeedbackSchema);

export default FeedbackModel;
