import mongoose, { Document, Model } from "mongoose";

// Define the YouTubeVideo schema interface
export interface IYouTubeVideo extends Document {
  title: string;
  videoLink: string;
}

const YouTubeVideoSchema = new mongoose.Schema<IYouTubeVideo>({
  title: { type: String, required: true },
  videoLink: { type: String, required: true },
});

// Ensure the YouTubeVideo model has proper types with mongoose.Model
const YouTubeVideoModel: Model<IYouTubeVideo> =
  mongoose.models.YouTubeVideo ||
  mongoose.model<IYouTubeVideo>("YouTubeVideo", YouTubeVideoSchema);

export default YouTubeVideoModel;
