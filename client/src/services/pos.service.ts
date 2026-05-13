import { api } from "./api";
import type { Product } from "../types/pos.types";

export interface SalePayload {
  items: {
    productId: number;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
  discount: number;
  cash: number;
  change: number;
}

export const posService = {
  getProducts: async (): Promise<Product[]> => {
    return api.get("/api/products");
  },

  createSale: async (payload: SalePayload): Promise<{ id: number }> => {
    return api.post("/api/sales", payload);
  },
};
