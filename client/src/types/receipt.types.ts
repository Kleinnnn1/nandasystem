export interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ReceiptData {
  id: number;
  receiptNo: string;
  cashier: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  total: number;
  cash: number;
  change: number;
  createdAt: Date;
}
