import prisma from "../controllers/prismaController.js";

export const createCategory = async (data) => {
  return await prisma.category.create({ data });
};

export const getAllCategories = async () => {
  return await prisma.category.findMany()
};

export const getCategoryById = async (id) => {
  return await prisma.category.findUnique({ where: { id } });
};

export const updateCategory = async (id, data) => {
  return await prisma.category.update({ where: { id }, data });
};

export const deleteCategory = async (id) => {
  return await prisma.category.delete({ where: { id } });
};
