import { NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { connectToDB } from "@/lib/database";

export const GET = async () => {
  try {
    await connectToDB();
    // Fetch all users (admins)
    const users = await UserModel.find();
    
    // Format the data for response
    const formattedUsers = users.map((user) => ({
      _id: user._id, // Include the user ID
      email: user.email,
      username: user.username,
      // Exclude sensitive fields like password
    }));

    return NextResponse.json({ admins: formattedUsers });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json(
      { error: "Failed to fetch admins", admins: [] },
      { status: 500 }
    );
  }
};
