import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../services/orderServices.js";

import prisma from "./prismaController.js";

// ✅ Create Order Controller (with stock update)
export const createOrderController = async (req, res) => {
  const userId = req.user.id;
  const { addressId, items } = req.body;

  if (!addressId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Address and items required" });
  }

  try {
    // Run entire order + stock update as transaction
    const order = await prisma.$transaction(async (tx) => {
      // Step 1: Validate and calculate total
      let total = 0;
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) throw new Error(`Product not found: ${item.productId}`);
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }

        total += product.price * item.quantity;
      }

      // Step 2: Create the order
      const createdOrder = await tx.order.create({
        data: {
          userId,
          addressId,
          total,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price, // Snapshot price
            })),
          },
        },
        include: { items: true },
      });

      // Step 3: Update stock levels
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return createdOrder;
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get orders for logged-in user
export const getUserOrdersController = async (req, res) => {
  try {
    const orders = await getUserOrders(req.user.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get order by ID (user-specific)
export const getOrderByIdController = async (req, res) => {
  try {
    const order = await getOrderById(parseInt(req.params.id), req.user.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all orders (admin)
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update order status (admin)
export const updateOrderStatusController = async (req, res) => {
  const { status } = req.body;
  const orderId = parseInt(req.params.id);

  if (!status) return res.status(400).json({ message: "Status required" });

  try {
    const updated = await updateOrderStatus(orderId, status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
