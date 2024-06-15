import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profileImg: {
      type: String,
      required: false,
      default: "",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

export default User;
