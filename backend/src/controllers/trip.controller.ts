import { Request, Response } from "express";
import { TripModel } from "../models";
import { sendError, sendSuccess } from "../utils";

export const tripController = {
  getAllTrips: async (req: Request, res: Response) => {
    try {
      const trips = await TripModel.find().populate("user");

      return sendSuccess(res, "Trips Found!", trips);
    } catch (error) {
      return sendError(res, error.message, 500);
    }
  },

  getTripById: async (req: Request, res: Response) => {
    try {
      const trips = await TripModel.findOne({ _id: req.params.id }).populate(
        "user"
      );

      return sendSuccess(res, "Trip Found!", trips);
    } catch (error) {
      return sendError(res, error.message, 500);
    }
  },

  createTrip: async (req: Request, res: Response) => {
    try {
      const trip = new TripModel(req.body);
      const newTrip = await trip.save();

      return sendSuccess(res, "Trip created!", newTrip, 201);
    } catch (error) {
      return sendError(res, error, 500);
    }
  },

  updateTrip: async (req: Request, res: Response) => {
    try {
      const updatedTrip = await TripModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      return sendSuccess(res, "Trip updated!", updatedTrip, 200);
    } catch (error) {
      return sendError(res, error, 500);
    }
  },

  deleteTrip: async (req: Request, res: Response) => {
    try {
      const deleteTrip = await TripModel.findByIdAndDelete({
        _id: req.params.id,
      });

      return sendSuccess(res, "Trip Deleted!", {}, 200);
    } catch (error) {
      return sendError(res, error, 500);
    }
  },
};
