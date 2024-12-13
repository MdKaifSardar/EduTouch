import mongoose, { Document, Model } from "mongoose";

// Define the Gallery schema interface
export interface IGallery extends Document {
  title: string;
  imageNew: Buffer; // Store the image as a binary buffer
}

const GallerySchema = new mongoose.Schema<IGallery>({
  title: { type: String, required: true },
  imageNew: { type: Buffer, required: true }, // Image stored as binary data
});

// Ensure the Gallery model has proper types with mongoose.Model
const GalleryModel: Model<IGallery> =
  mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);

export default GalleryModel;
