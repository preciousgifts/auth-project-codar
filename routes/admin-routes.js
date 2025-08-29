import express from "express";
const router = express.Router();

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: "welcome to the admin page",
  });
});

export default router;
