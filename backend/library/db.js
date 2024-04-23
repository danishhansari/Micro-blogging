import mongoose from "mongoose";

export const connectDB = async () => {
  return await mongoose.connect(process.env.MONGO_DB);
};
