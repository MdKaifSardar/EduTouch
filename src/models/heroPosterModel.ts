import mongoose, { Document, Model } from "mongoose";

// Define the HeroPoster schema interface
export interface IHeroPoster extends Document {
  title: string;
  image: string; // Store the hero poster image as a URL string
}

const HeroPosterSchema = new mongoose.Schema<IHeroPoster>({
  title: { type: String, required: true },
  image: { type: String, required: true }, // Hero poster image stored as a URL string
});

// Ensure the HeroPoster model has proper types with mongoose.Model
const HeroPosterModel: Model<IHeroPoster> =
  mongoose.models.HeroPoster ||
  mongoose.model<IHeroPoster>("HeroPoster", HeroPosterSchema);

export default HeroPosterModel;
