import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { WeeklySale } from "../../types/dashboard.types";
import { formatCurrency } from "../../utils/currency";

interface Props {
  data: WeeklySale[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
        <p className="text-xs text-zinc-400 mb-1">{label}</p>
        <p className="text-sm text-white font-medium">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export default function WeeklySalesChart({ data }: Props) {
  const maxSales = Math.max(...data.map((d) => d.sales));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <p className="text-sm text-white font-medium mb-1">Weekly Sales</p>
      <p className="text-xs text-zinc-500 mb-4">
        Total revenue per day this week
      </p>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={data} barSize={28}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 11 }}
          />
          <YAxis hide />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={entry.day}
                fill={entry.sales === maxSales ? "#dc2626" : "#2a2a2a"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
