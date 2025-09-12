// src/api/productApi.js
import api from "./axiosInstance"

// Get all products
export const getProducts = async () => {
  const res = await api.get("/product")
  console.log(res.data)
  return res.data
  
}

// Get single product
export const getProductById = async (id) => {
  const res = await api.get(`/product/${id}`)
  return res.data
}

// Admin: create product
export const createProduct = async (data) => {
  const res = await api.post("/product", data)
  return res.data
}

// Admin: update product
export const updateProduct = async (id, data) => {
  const res = await api.put(`/product/${id}`, data)
  return res.data
}

// Admin: delete product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/product/${id}`)
  return res.data
}
