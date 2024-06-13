import { Response } from "express";

interface SuccessResponse {
  success: true;
  message: string;
  data?: any;
  statusCode: number;
}

interface ErrorResponse {
  success: false;
  message: string;
  error?: any;
  statusCode: number;
}

export const sendSuccess = (
  res: Response,
  message: string,
  data?: any,
  statusCode: number = 200
) => {
  const response: SuccessResponse = {
    success: true,
    message,
    data,
    statusCode,
  };
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error?: any
) => {
  const response: ErrorResponse = {
    success: false,
    message,
    error,
    statusCode,
  };
  res.status(statusCode).json(response);
};
