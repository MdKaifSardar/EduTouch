import mongoose, { Document, Model } from "mongoose";

// Define the KeyOffering schema interface
export interface IKeyOffering extends Document {
  title: string;
  image: Buffer; // Store the image as a binary buffer
}

const KeyOfferingSchema = new mongoose.Schema<IKeyOffering>({
  title: { type: String, required: true },
  image: { type: Buffer, required: true }, // Image stored as binary data
});

// Ensure the KeyOffering model has proper types with mongoose.Model
const KeyOfferingModel: Model<IKeyOffering> =
  mongoose.models.KeyOffering || mongoose.model<IKeyOffering>("KeyOffering", KeyOfferingSchema);

export default KeyOfferingModel;
