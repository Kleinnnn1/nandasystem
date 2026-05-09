import type {
  Product,
  ProductFormData,
  ProductStatus,
} from "../types/product.types";

export const getProductStatus = (stock: number): ProductStatus => {
  if (stock === 0) return "out_of_stock";
  if (stock <= 5) return "low_stock";
  return "in_stock";
};

export const STATUS_CONFIG: Record<
  ProductStatus,
  { label: string; bg: string; color: string }
> = {
  in_stock: { label: "In Stock", bg: "#1a2e1a", color: "#22c55e" },
  low_stock: { label: "Low Stock", bg: "#2e1a1a", color: "#dc2626" },
  out_of_stock: { label: "Out of Stock", bg: "#2e2a1a", color: "#f59e0b" },
};

export const generateBarcode = (): string => {
  return Math.floor(Math.random() * 9000000000000 + 1000000000000).toString();
};

export const getInitialFormData = (product?: Product): ProductFormData => ({
  name: product?.name ?? "",
  price: product?.price.toString() ?? "",
  stock: product?.stock.toString() ?? "",
  category: product?.category ?? "",
  barcode: product?.barcode ?? "",
});
