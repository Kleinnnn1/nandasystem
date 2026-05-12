import { api } from "./api";
import type { Category, CategoryFormData } from "../types/category.types";

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    return api.get("/api/categories");
  },

  create: async (data: CategoryFormData): Promise<Category> => {
    return api.post("/api/categories", data);
  },

  update: async (id: number, data: CategoryFormData): Promise<Category> => {
    return api.put(`/api/categories/${id}`, data);
  },

  delete: async (id: number): Promise<void> => {
    return api.delete(`/api/categories/${id}`);
  },
};
