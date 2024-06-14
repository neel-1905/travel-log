import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils";
import { ZodIssue, ZodSchema } from "zod";

export const validateBody =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (error) {
      let errors: string[] = [];
      error.issues.forEach((elem: any) => {
        errors.push(elem.message);
      });
      return sendError(res, errors.toString(), 400);
    }
  };
