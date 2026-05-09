export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  barcode: string;
}

export interface ProductFormData {
  name: string;
  price: string;
  stock: string;
  category: string;
  barcode: string;
}

export type ProductStatus = "in_stock" | "low_stock" | "out_of_stock";
