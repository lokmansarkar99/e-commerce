import { productSchema, updateProductSchema } from "../validators/productValidators.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/productServices.js";

import { cloudinary } from "../utils/cloudinary.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createProductController = async (req, res) => {
  try {
    const imageUrl = req.file?.path || "";
    const imagePublicId = req.file?.filename || "";

    const parsed = productSchema.safeParse({
      ...req.body,
      image: imageUrl,
      imagePublicId: imagePublicId
    });

    if (!parsed.success) {
      const errorMsg = parsed.error.errors.map(e => e.message).join(", ");
      return res.status(400).json({ message: errorMsg });
    }

    const product = await createProduct(parsed.data);
    res.status(201).json({ message: "Product created successfully", product });

  } catch (err) {
    console.error("Product Create Error:", err);
    res.status(500).json({ message: "Product creation failed" });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to get product" });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingProduct = await getProductById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Default to old values
    let image = existingProduct.image;
    let imagePublicId = existingProduct.imagePublicId;

    // If there's a new image, delete old one from Cloudinary
    if (req.file) {
      if (existingProduct.imagePublicId) {
        await cloudinary.uploader.destroy(existingProduct.imagePublicId);
      }

      image = req.file.path;
      imagePublicId = req.file.filename;
    }

    const parsed = updateProductSchema.safeParse({
      ...req.body,
      image,
      imagePublicId,
    });

    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }

    const updatedProduct = await updateProduct(id, parsed.data);
    res.status(200).json({ message: "Product updated", product: updatedProduct });

  } catch (err) {
    console.error("Product Update Error:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    const deleted = await deleteProduct(id);
    res.json({ message: "Product deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};
