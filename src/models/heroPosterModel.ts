import mongoose, { Document, Model } from "mongoose";

// Define the HeroPoster schema interface
export interface IHeroPoster extends Document {
  title: string;
  image: Buffer; // Store the hero poster image as a binary buffer
}

const HeroPosterSchema = new mongoose.Schema<IHeroPoster>({
  title: { type: String, required: true },
  image: { type: Buffer, required: true }, // Hero poster image stored as binary data
});

// Ensure the HeroPoster model has proper types with mongoose.Model
const HeroPosterModel: Model<IHeroPoster> =
  mongoose.models.HeroPoster ||
  mongoose.model<IHeroPoster>("HeroPoster", HeroPosterSchema);

export default HeroPosterModel;
