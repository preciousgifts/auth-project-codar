import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import superAdminMiddleware from "../middlewares/superAdminMiddleware.js";

const superAdminRoutes = express.Router();
superAdminRoutes.get(
  "/welcome",
  authMiddleware,
  superAdminMiddleware,
  (req, res) => {
    res.json({
      message: "Welcome to the Super Admin Page",
    });
  }
);

export default superAdminRoutes;
