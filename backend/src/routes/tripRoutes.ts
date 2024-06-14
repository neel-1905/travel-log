import express from "express";
import { tripController } from "../controllers";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../middlewares/verifyToken";
import { validateBody } from "../middlewares/validation.middleware";
import { partialTripSchema, tripSchema } from "../validations";

export default (router: express.Router) => {
  router.get("/trips", verifyToken, tripController.getAllTrips);
  router.post(
    "/trips",
    verifyToken,
    validateBody(tripSchema),
    tripController.createTrip
  );
  router.patch(
    "/trips/:id",
    verifyToken,
    validateBody(partialTripSchema),
    tripController.updateTrip
  );
  router.delete("/trips/:id", verifyToken, tripController.deleteTrip);
  router.get("/trips/:id", verifyToken, tripController.getAllTrips);
};
