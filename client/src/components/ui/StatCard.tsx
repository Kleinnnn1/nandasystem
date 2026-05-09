import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  valueColor?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export default function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  iconBg = "#1a1a1a",
  iconColor = "#6b7280",
  valueColor = "#ffffff",
  trend,
  trendValue,
}: StatCardProps) {
  const trendColor =
    trend === "up" ? "#22c55e" : trend === "down" ? "#dc2626" : "#6b7280";
  const trendSymbol = trend === "up" ? "↑" : trend === "down" ? "↓" : "";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs text-zinc-500 uppercase tracking-widest">
          {label}
        </p>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: iconBg }}
        >
          <Icon size={16} color={iconColor} />
        </div>
      </div>
      <p className="text-2xl font-medium mb-1" style={{ color: valueColor }}>
        {value}
      </p>
      <p className="text-xs text-zinc-500">
        {trendValue && (
          <span className="mr-1" style={{ color: trendColor }}>
            {trendSymbol} {trendValue}
          </span>
        )}
        {sub}
      </p>
    </div>
  );
}
