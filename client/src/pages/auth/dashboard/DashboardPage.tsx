import { DollarSign, ShoppingCart, AlertTriangle, Package } from "lucide-react";
import WeeklySalesChart from "../../../components/dashboard/WeeklySalesChart";
import TopProducts from "../../../components/dashboard/TopProducts";
import LowStockAlerts from "../../../components/dashboard/LowStockAlerts";
import RecentTransactions from "../../../components/dashboard/RecentTransactions";
import { useDashboard } from "../../../hooks/useDashboard";
import { formatCurrency } from "../../../utils/currency";
import StatCard from "../../../components/ui/StatCard";

export default function DashboardPage() {
  const { stats, loading } = useDashboard();

  if (loading || !stats) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-24 animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-48 animate-pulse" />
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-48 animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-48 animate-pulse" />
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-48 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Today's Sales"
          value={formatCurrency(stats.todayRevenue)}
          sub="today"
          icon={DollarSign}
          iconBg="#1f1010"
          iconColor="#dc2626"
        />
        <StatCard
          label="Transactions"
          value={stats.todayTransactions}
          sub="today"
          icon={ShoppingCart}
          iconBg="#111f11"
          iconColor="#22c55e"
        />
        <StatCard
          label="Low Stock"
          value={stats.lowStockCount}
          sub="items need restock"
          icon={AlertTriangle}
          iconBg="#1f1010"
          iconColor="#dc2626"
          valueColor="#dc2626"
        />
        <StatCard
          label="Total Products"
          value={stats.totalProducts}
          sub={`${stats.outOfStockCount} out of stock`}
          icon={Package}
          iconBg="#111827"
          iconColor="#6b7280"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <WeeklySalesChart data={stats.weeklyData} />
        </div>
        <TopProducts data={stats.topProducts} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LowStockAlerts data={stats.lowStockItems} />
        <RecentTransactions data={stats.recentTransactions} />
      </div>
    </div>
  );
}
