export type StockFilter = "all" | "low_stock" | "out_of_stock";

export interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  lastRestocked: string;
}

export interface RestockFormData {
  quantity: string;
  note: string;
}
