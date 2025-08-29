import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import frontDesk from "../middlewares/frontDesk.js";

const ImageRouter = express.Router();

import uploadMiddleware from "../middlewares/uploadMiddleware.js";

// import uploadImageController from "../controllers/image-controller";
import {
  uploadImageController,
  fetchImagesController,
} from "../controllers/image-controller.js";

ImageRouter.post(
  "/upload",
  authMiddleware,
  // adminMiddleware,
  // frontDesk,
  uploadMiddleware.single("image"),
  uploadImageController
);

ImageRouter.get("/get-images", authMiddleware, fetchImagesController);
export default ImageRouter;
