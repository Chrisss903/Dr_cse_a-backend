import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";


dotenv.config({
  path: path.resolve(process.cwd(), ".env")
});
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected");
  } catch (e) {
    console.log("error", e);
  }
};

console.log("MONGO_URI:", process.env.MONGO_URI);

export default connectDB;