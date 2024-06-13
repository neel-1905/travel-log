import express from "express";
import { userController } from "../controllers";
import { verifyAdmin, verifyToken } from "../middlewares/verifyToken";

export default (router: express.Router) => {
  router.get("/users", verifyToken, verifyAdmin, userController.getAllUsers); // Specify the path "/users"
  router.post("/users", userController.createUser);
  router.post("/users/login", userController.login);
};
