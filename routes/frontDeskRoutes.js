import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import frontDeskMiddleware from "../middlewares/frontDesk.js";

const router = express.Router();
router.get("/welcome", authMiddleware, frontDeskMiddleware, (req, res) => {
  res.json({
    message: "Welcome to front desk page",
  });
});

export default router;
