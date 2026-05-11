import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verification_code: {
      type: String,
      required: false,
    },
    is_verified: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("users", userSchema);
