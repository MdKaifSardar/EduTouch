import { connectToDB } from "@/lib/database";
import { signToken } from "@/lib/jwt";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string | null;
    const username = formData.get("username") as string | null;
    const password = formData.get("password") as string | null;

    if (!(email || username)) {
      return new Response(
        JSON.stringify({
          message: "Either email or username must be provided.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!password) {
      return new Response(
        JSON.stringify({ message: "Password is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectToDB();

    const user = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const pepper = process.env.PEPPER as string;
    if (!pepper) {
      throw new Error("PEPPER environment variable is missing.");
    }

    const isPasswordValid = await bcrypt.compare(
      password + pepper,
      user.password
    );

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: "Invalid credentials." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = await signToken({ id: user._id });

    return new Response(
      JSON.stringify({
        message: "Login successful.",
        token,
        user: { email: user.email, username: user.username },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return new Response(
      JSON.stringify({ message: "Login failed, please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
