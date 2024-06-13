import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendError } from "../utils/responseHandlers";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user as JwtPayload;
    next();
  });
};

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "ADMIN") {
      next();
    } else {
      //   return res.status(401).json({ message: "You are not authorized to access this data" });
      return sendError(res, "You are not authorized to access this data", 401);
    }
  });
};

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.role === "ADMIN") {
      next();
    } else {
      return sendError(
        res,
        `You are not authorized to access this data ${req.params.id}`,
        401
      );
    }
  });
};

export { verifyAdmin, verifyToken, verifyUser };
