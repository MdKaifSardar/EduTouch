import { connectToDB } from "@/lib/database";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const POST = async (req: Request) => {
  try {
    // Parse FormData
    const formData = await req.formData();
    const email = formData.get("email") as string | null;
    const username = formData.get("username") as string | null;
    const password = formData.get("password") as string | null;

    // Validate input
    if (!email || !password || !username) {
      return new Response(
        JSON.stringify({
          error: "Email, Username, and Password are required fields.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the database
    await connectToDB();

    // Check for existing user
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          error: "User with this email or username already exists.",
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash password with salt and pepper
    const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);
    const pepper = process.env.PEPPER as string;

    if (!saltRounds || !pepper) {
      throw new Error("SALT_ROUNDS or PEPPER environment variable is missing.");
    }

    const hashedPassword = await bcrypt.hash(password + pepper, saltRounds);

    // Create new user
    const newUser = new UserModel({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // Success response
    return new Response(
      JSON.stringify({
        message: "User created successfully",
        user: { email, username },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Registration Error:", error);

    // Generic error response
    return new Response(
      JSON.stringify({
        error: "User registration failed.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
