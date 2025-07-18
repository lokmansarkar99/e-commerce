import express from "express";
import { verifyAuth } from "../middleware/verifyAuth.js";
import { isAdmin } from "../middleware/roleAuth.js";
import upload from "../middleware/uploadImage.js";

import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";

const router = express.Router();

router.post(
  "/create",
  verifyAuth,
  isAdmin,
  upload.single("image"),
  createProductController
);

router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);

router.patch(
  "/:id",
  verifyAuth,
  isAdmin,
  upload.single("image"),
  updateProductController
);

router.delete("/:id", verifyAuth, isAdmin, deleteProductController);

export default router;