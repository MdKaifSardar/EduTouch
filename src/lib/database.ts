import mongoose from "mongoose";

// Flag to track connection status
// let isConnected = false;

export const connectToDB = async (): Promise<void> => {
  // Enable strict mode for queries
  mongoose.set("strictQuery", true);

  // if (isConnected) {
  //   console.log("Database is already connected.");
  //   return;
  // }

  try {
    // Retrieve MongoDB URI from environment variables
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in the environment variables.");
    }

    // Establish connection with MongoDB
    await mongoose.connect(mongoUri, {
        dbName: "EduTouchDB",
        serverSelectionTimeoutMS: 30000,
      });

    // isConnected = true; // Update connection status on success
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error(`Error connecting to the database: ${(error as Error).message}`);
    // isConnected = false; // Reset connection status on failure
    throw new Error("Failed to connect to the database. Please check your configuration.");
  }
};
