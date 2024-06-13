import { Response, Request } from "express";
import { User } from "../models";
import { sendError, sendSuccess } from "../utils/responseHandlers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const { username, email, password } = req.body;

    // Optional: Add basic validation
    if (!username || !email || !password) {
      return sendError(res, "Username, Email and Password are required", 400);
    }

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return sendError(res, "A user with this email already exists!", 409);
      }

      const userExistsWithUsername = await User.findOne({ username });

      if (userExistsWithUsername) {
        return sendError(res, "A user with this username already exists!", 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ email, password: hashedPassword, username });
      await user.save();
      // res.status(201).json({ message: "User Created!", user });
      return sendSuccess(res, "User Created!", user, 201);
    } catch (error) {
      return sendError(res, error, 500);
    }
  },

  // USER LOGIN FUNCTIONALITY
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, "Email and Password is required");
    }

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        const hashedPassword = userExists.password;
        const passwordIsCorrect = await bcrypt.compare(
          password,
          hashedPassword
        );

        if (!passwordIsCorrect) {
          return sendError(res, "Invalid Credentials", 400);
        }

        const token = jwt.sign(
          { id: userExists._id, role: userExists.role },
          process.env.JWT_SECRET
        );

        const { password: _, ...userWithoutPassword } = userExists.toObject();

        const data = {
          user: userWithoutPassword,
          token,
        };

        return sendSuccess(res, "User Login Successful!", data, 200);
      }
    } catch (error) {
      return sendError(res, error.message, 500);
    }
  },
};
