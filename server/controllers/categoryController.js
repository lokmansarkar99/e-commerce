import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/categoryServices.js";
import { categorySchema } from "../validators//categoryValidator.js";

export const createCategoryController = async (req, res) => {
  const parsed = categorySchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ message: parsed.error.errors[0].message });

  try {
    const category = await createCategory(parsed.data);
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create category" });
  }
};

export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to get categories" });
  }
};

export const getCategoryByIdController = async (req, res) => {
  try {
    const category = await getCategoryById(Number(req.params.id));
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Failed to get category" });
  }
};

export const updateCategoryController = async (req, res) => {
  const parsed = categorySchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ message: parsed.error.errors[0].message });

  try {
    const updated = await updateCategory(Number(req.params.id), parsed.data);
    res.json({ message: "Category updated", category: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update category" });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    await deleteCategory(Number(req.params.id));
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete category" });
  }
};
