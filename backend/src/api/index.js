import dotenv from "dotenv";
import app from "../app.js";
import connectDB from "../config/database.js";

dotenv.config();

let isConnected = false;

const connectDatabase = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB Connected");
  }
};

export default async function handler(req, res) {
  await connectDatabase();
  return app(req, res);
}