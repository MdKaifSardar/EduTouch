import mongoose, { Document, Model } from "mongoose";

// Define the GK and Current Affairs schema interface
export interface IGKCurrAff extends Document {
  title: string;
  gkImage: string; // GK image
  caImage: string; // Current Affairs image
  gkTitle: string; // Title for GK
  caTitle: string; // Title for Current Affairs
  gkLink: string; // Link for GK
  caLink: string; // Link for Current Affairs
}

const GKCurrAffSchema = new mongoose.Schema<IGKCurrAff>({
  title: { type: String, required: true, unique: true },
  gkImage: { type: String, required: true }, // GK image
  caImage: { type: String, required: true }, // Current Affairs image
  gkTitle: { type: String, required: true }, // Title for GK
  caTitle: { type: String, required: true }, // Title for Current Affairs
  gkLink: { type: String, required: true }, // Link for GK
  caLink: { type: String, required: true }, // Link for Current Affairs
});

// Ensure the GKCurrAff model has proper types with mongoose.Model
const GKCurrAffModel: Model<IGKCurrAff> =
  mongoose.models.GKCurrAff ||
  mongoose.model<IGKCurrAff>("GKCurrAff", GKCurrAffSchema);

export default GKCurrAffModel;
