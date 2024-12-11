import mongoose, { Document, Model } from "mongoose";

// Define the GK and Current Affairs schema interface
export interface IGKCurrAff extends Document {
  title: string;
  gkPDF: Buffer; // Store the GK PDF as a binary buffer
  currentAffairsPDF: Buffer; // Store the Current Affairs PDF as a binary buffer
}

const GKCurrAffSchema = new mongoose.Schema<IGKCurrAff>({
  title: { type: String, required: true, unique: true },
  gkPDF: { type: Buffer, required: true }, // GK PDF stored as binary data
  currentAffairsPDF: { type: Buffer, required: true }, // Current Affairs PDF stored as binary data
});

// Ensure the GKCurrAff model has proper types with mongoose.Model
const GKCurrAffModel: Model<IGKCurrAff> =
  mongoose.models.GKCurrAff ||
  mongoose.model<IGKCurrAff>("GKCurrAff", GKCurrAffSchema);

export default GKCurrAffModel;
