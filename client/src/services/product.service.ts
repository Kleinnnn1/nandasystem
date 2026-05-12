import { api } from "./api";
import type { Product } from "../types/product.types";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    return api.get("/api/products");
  },

  create: async (data: Partial<Product>): Promise<Product> => {
    return api.post("/api/products", data);
  },

  update: async (id: number, data: Partial<Product>): Promise<Product> => {
    return api.put(`/api/products/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/products/${id}`);
  },
};
