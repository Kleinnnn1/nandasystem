import { DollarSign, ShoppingCart, AlertTriangle, Package } from "lucide-react";
import {
  FAKE_WEEKLY_SALES,
  FAKE_TOP_PRODUCTS,
  FAKE_LOW_STOCK,
  FAKE_RECENT_TRANSACTIONS,
} from "../../../constants/dashboard.fake";
import StatCard from "../../../components/ui/StatCard";
import WeeklySalesChart from "../../../components/dashboard/WeeklySalesChart";
import { formatCurrency } from "../../../utils/currency";
import RecentTransactions from "../../../components/dashboard/RecentTransactions";
import LowStockAlerts from "../../../components/dashboard/LowStockAlerts";
import TopProducts from "../../../components/dashboard/TopProducts";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="Today's Sales"
          value={formatCurrency(2450)}
          sub="from yesterday"
          icon={DollarSign}
          iconBg="#1f1010"
          iconColor="#dc2626"
          trend="up"
          trendValue="12%"
        />
        <StatCard
          label="Transactions"
          value={34}
          sub="from yesterday"
          icon={ShoppingCart}
          iconBg="#111f11"
          iconColor="#22c55e"
          trend="up"
          trendValue="5"
        />
        <StatCard
          label="Low Stock"
          value={5}
          sub="Items need restock"
          icon={AlertTriangle}
          iconBg="#1f1010"
          iconColor="#dc2626"
          valueColor="#dc2626"
        />
        <StatCard
          label="Total Products"
          value={128}
          sub="Across 8 categories"
          icon={Package}
          iconBg="#111827"
          iconColor="#6b7280"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <WeeklySalesChart data={FAKE_WEEKLY_SALES} />
        </div>
        <TopProducts data={FAKE_TOP_PRODUCTS} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <LowStockAlerts data={FAKE_LOW_STOCK} />
        <RecentTransactions data={FAKE_RECENT_TRANSACTIONS} />
      </div>
    </div>
  );
}
