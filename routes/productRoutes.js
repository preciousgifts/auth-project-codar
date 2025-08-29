import express from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/ProductController.js";

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);

export default router;
