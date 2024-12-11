import { connectToDB } from "@/lib/database";
import { signToken } from "@/lib/jwt";
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
    if (!(email || username)) {
      return new Response("Either email or username must be provided.", {
        status: 400,
      });
    }

    if (!password) {
      return new Response("Password is required.", { status: 400 });
    }

    // Connect to DB
    await connectToDB();

    const user = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return new Response("User not found.", { status: 404 });
    }

    const pepper = process.env.PEPPER as string;
    if (!pepper) {
      throw new Error("PEPPER environment variable is missing.");
    }

    // Compare password using pepper
    const isPasswordValid = await bcrypt.compare(
      password + pepper,
      user.password
    );

    if (!isPasswordValid) {
      return new Response("Invalid credentials.", { status: 401 });
    }

    // Generate JWT Token
    const token = await signToken({ id: user._id });

    return new Response(
      JSON.stringify({
        token,
        user: { email: user.email, username: user.username },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return new Response("Login failed, please try again later.", {
      status: 500,
    });
  }
};
