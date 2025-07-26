import express from "express";
import {
  createOrderController,
  getUserOrdersController,
  getOrderByIdController,
  getAllOrdersController,
  updateOrderStatusController,
} from "../controllers/orderController.js";
import {verifyAuth} from "../middleware/verifyAuth.js";
import {isAdmin, isUser} from "../middleware/roleAuth.js";

const router = express.Router();

router.use(verifyAuth);

// User routes
router.post("/", createOrderController);
router.get("/", getUserOrdersController);
router.get("/:id", getOrderByIdController);

// Admin-only
router.get("/admin/all", isAdmin, getAllOrdersController);
router.patch("/admin/:id/status", isAdmin, updateOrderStatusController);

export default router;
