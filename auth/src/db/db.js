import mongoose from "mongoose";
import config from "../config/config.js";

async function connectDB() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Failed to connect to the Database", error);
  }
}

export default connectDB;
