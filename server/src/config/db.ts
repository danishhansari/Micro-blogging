import mongoose from "mongoose";
import { MONGO_URI } from "../constant/env";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Error while connecting the db", error);
    process.exit(1);
  }
};

export { connectToDatabase };
