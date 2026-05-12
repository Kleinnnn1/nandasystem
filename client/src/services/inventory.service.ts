import { api } from "./api";
import type { InventoryItem, RestockFormData } from "../types/inventory.types";

export const inventoryService = {
  getAll: async (): Promise<InventoryItem[]> => {
    return api.get("/api/inventory");
  },

  restock: async (id: number, data: RestockFormData): Promise<void> => {
    return api.patch(`/api/inventory/${id}/restock`, {
      quantity: parseInt(data.quantity),
      note: data.note,
    });
  },
};
