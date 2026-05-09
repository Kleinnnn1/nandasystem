import { AlertTriangle } from "lucide-react";
import type { LowStockItem } from "../../types/dashboard.types";

interface Props {
  data: LowStockItem[];
}

export default function LowStockAlerts({ data }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <p className="text-sm text-white font-medium mb-1">Low Stock Alerts</p>
      <p className="text-xs text-zinc-500 mb-3">Items running low</p>
      <div className="flex flex-col">
        {data.map((item, i) => {
          const isCritical = item.stock <= 3;
          return (
            <div
              key={item.name}
              className={`flex items-center gap-3 py-2 ${
                i < data.length - 1 ? "border-b border-zinc-800" : ""
              }`}
            >
              <AlertTriangle
                size={13}
                color={isCritical ? "#dc2626" : "#f59e0b"}
                className="shrink-0"
              />
              <p className="text-xs text-white flex-1">{item.name}</p>
              <p
                className="text-xs font-medium"
                style={{ color: isCritical ? "#dc2626" : "#f59e0b" }}
              >
                {item.stock} left
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
