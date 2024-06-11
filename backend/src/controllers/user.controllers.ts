import { Response, Request } from "express";
import User from "../models/User.model";
import { sendError, sendSuccess } from "../utils/responseHandlers";
import bcrypt from "bcrypt";

export const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.status(200).json({ message: "Users Found!", users });
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  },

  createUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Optional: Add basic validation
    if (!email || !password) {
      return sendError(res, "Username, Email and Password are required", 400);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return sendError(res, "A user with this email already exists!", 409);
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ email, password: hashedPassword });
      await user.save();
      // res.status(201).json({ message: "User Created!", user });
      return sendSuccess(res, "User Created!", user);
    } catch (error) {
      return sendError(res, "Something went wrong", 500);
    }
  },
};
