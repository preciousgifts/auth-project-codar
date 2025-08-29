import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const homeRoutes = express.Router();

homeRoutes.get("/welcome", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Welcome to the home page",
  });
});

export default homeRoutes;
