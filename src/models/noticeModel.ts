import mongoose, { Document, Model } from "mongoose";

// Define the Notice schema interface
export interface INotice extends Document {
  noticeTitle: string;
  pdf: Buffer;
}

const NoticeSchema = new mongoose.Schema<INotice>({
  noticeTitle: { type: String, required: true },
  pdf: { type: Buffer, required: true },
});

// Ensure the Notice model has proper types with mongoose.Model
const NoticeModel: Model<INotice> =
  mongoose.models.Notice || mongoose.model<INotice>("Notice", NoticeSchema);

export default NoticeModel;
