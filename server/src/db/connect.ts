import mongoose from "mongoose";

export class Connect {
  /**
   * Connect to the database
   * @param dbURI Database connection URI, defaulting to the environment variable
   */
  static async connectToDatabase(dbURI: string = process.env.MONGO_URI || "") {
    if (!dbURI) {
      console.error("MongoDB connection URI is missing!");
      process.exit(1); // Exit process with failure
    }

    try {
      await mongoose.connect(dbURI);
      console.log("Successfully connected to MongoDB!");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      process.exit(1); // Exit process with failure
    }
  }
}
