export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  barcode?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  total: number;
}

export interface Order {
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountType: "percent" | "fixed";
  total: number;
  cash: number;
  change: number;
}
