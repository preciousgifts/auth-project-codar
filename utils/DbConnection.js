import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DbConnection = async () => {
  const url = process.env.MONGO_URL;
  if (!url) {
    console.error("MongoDB connection string is not defined in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(url);
    console.log("Database connected successfully ");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};
export default DbConnection;
