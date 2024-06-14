import express from "express";
import { userController } from "../controllers";
import {
  verifyAdmin,
  verifyToken,
  verifyUser,
} from "../middlewares/verifyToken";

export default (router: express.Router) => {
  router.get("/users", verifyAdmin, userController.getAllUsers);
  router.get("/users/:id", verifyUser, userController.getUserById);
  router.post("/users", userController.createUser);
  router.post("/users/login", userController.login);
  router.patch("/users/:id", verifyUser, userController.updateUser);
  router.delete("/users/:id", verifyUser, userController.deleteUser);
};
