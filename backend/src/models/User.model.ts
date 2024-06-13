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
      required: false,
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
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

export default User;
