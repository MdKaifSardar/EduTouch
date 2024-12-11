import { NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const PATCH = async (req: Request) => {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string | null;

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // Extract fields to be updated
    const email = formData.get("email") as string | null;
    const username = formData.get("username") as string | null;
    const password = formData.get("password") as string | null;

    if (!email && !username && !password) {
      return NextResponse.json(
        { error: "No fields to update provided." },
        { status: 400 }
      );
    }

    // Dynamically build the update object
    const updateFields: Partial<{ email: string; username: string; password: string }> = {};
    if (email) updateFields.email = email;
    if (username) updateFields.username = username;

    // Hash password if provided
    if (password) {
      const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);
      const pepper = process.env.PEPPER as string;

      if (!saltRounds || !pepper) {
        throw new Error("SALT_ROUNDS or PEPPER environment variable is missing.");
      }

      updateFields.password = await bcrypt.hash(password + pepper, saltRounds);
    }

    // Update the user in the database
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated document
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found or failed to update." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
