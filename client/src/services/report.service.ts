import { api } from "./api";

export type SalesPeriod = "today" | "week" | "month";

export interface SalesItem {
  productId: number;
  productName: string;
  qtySold: number;
  revenue: number;
}

export interface SalesReport {
  period: SalesPeriod;
  totalRevenue: number;
  totalOrders: number;
  totalItemsSold: number;
  items: SalesItem[];
}

export const reportService = {
  getSales: (period: SalesPeriod): Promise<SalesReport> =>
    api.get(`/api/reports/sales?period=${period}`),
};
