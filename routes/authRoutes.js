import express from "express";
import {
  loginUser,
  passwordReset,
  registerUser,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.patch("/reset_password", passwordReset);

export default authRouter;
