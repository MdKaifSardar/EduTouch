import mongoose, { Document, Model } from "mongoose";

// Define the User schema interface
export interface IUser extends Document {
  email: string;
  username?: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  password: { type: String, required: true },
});

// Ensure the User model has proper types with mongoose.Model
const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
