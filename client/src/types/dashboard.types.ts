export interface StatCard {
  label: string;
  value: string | number;
  sub: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export interface WeeklySale {
  day: string;
  sales: number;
}

export interface TopProduct {
  rank: number;
  name: string;
  category: string;
  sales: number;
  percentage: number;
}

export interface LowStockItem {
  name: string;
  stock: number;
  threshold: number;
}

export interface RecentTransaction {
  id: string;
  time: string;
  amount: number;
}
