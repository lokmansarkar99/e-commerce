import prisma from "../controllers/prismaController.js";

// Create a new order with stock update
export const createOrder = async (userId, addressId, items) => {
  // Fetch products and calculate total
  let total = 0;
  const productMap = new Map();

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });

    if (!product) throw new Error(`Product not found (ID: ${item.productId})`);

    if (product.stock < item.quantity) {
      throw new Error(`Not enough stock for product ID ${item.productId}`);
    }

    productMap.set(item.productId, product);
    total += product.price * item.quantity;
  }

  // Transaction: create order, items, and update product stock
  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        addressId,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: productMap.get(item.productId).price, // store snapshot
          })),
        },
      },
      include: { items: true },
    });

    // Update stock for each product
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

  return order;
};

// Get all orders of a user
export const getUserOrders = async (userId) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
      address: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

// Get single order for a user
export const getOrderById = async (orderId, userId) => {
  return await prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      items: {
        include: { product: true },
      },
      address: true,
    },
  });
};

// Admin: Get all orders
export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: true,
      address: true,
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

// Admin: Update order status
export const updateOrderStatus = async (orderId, status) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};
