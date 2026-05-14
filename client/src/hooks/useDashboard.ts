import { useState, useEffect } from "react";
import { dashboardService } from "../services/dashboard.service";
import type {
  WeeklySale,
  TopProduct,
  LowStockItem,
  RecentTransaction,
} from "../types/dashboard.types";

interface DashboardStats {
  todayRevenue: number;
  todayTransactions: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalProducts: number;
  weeklyData: WeeklySale[];
  topProducts: TopProduct[];
  lowStockItems: LowStockItem[];
  recentTransactions: RecentTransaction[];
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.getStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchStats };
}
