import express from "express";
import { verifyAuth } from "../middleware/verifyAuth.js";
import { isAdmin } from "../middleware/roleAuth.js";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", verifyAuth, isAdmin, createCategoryController);
router.get("/", getAllCategoriesController);
router.get("/:id", getCategoryByIdController);
router.put("/:id", verifyAuth, isAdmin, updateCategoryController);
router.delete("/:id", verifyAuth, isAdmin, deleteCategoryController);

export default router;
