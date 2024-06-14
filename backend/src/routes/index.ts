import express from "express";
import userRoutes from "./userRoutes";
import tripRoutes from "./tripRoutes";

const router = express.Router();

export default (): express.Router => {
  userRoutes(router);
  tripRoutes(router);

  return router;
};
