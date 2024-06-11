import express from "express";
import { userController } from "../controllers/user.controllers";

export default (router: express.Router) => {
  router.get("/users", userController.getAllUsers); // Specify the path "/users"
  router.post("/users", userController.createUser);
};
