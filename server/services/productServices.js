import prisma from "../controllers/prismaController.js";

// Create product
export const createProduct = async (data) => {
  return await prisma.product.create({ data });
};

// Get all products
export const getAllProducts = async () => {
  return await prisma.product.findMany({
    include: { category: true }
  });
};

// Get single product
export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });
};

// Update product
export const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

// Delete product
export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: { id },
  });
};

