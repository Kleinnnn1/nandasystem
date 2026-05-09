import type { TopProduct } from "../../types/dashboard.types";
import { formatCurrency } from "../../utils/currency";

interface Props {
  data: TopProduct[];
}

export default function TopProducts({ data }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <p className="text-sm text-white font-medium mb-1">Top Products</p>
      <p className="text-xs text-zinc-500 mb-4">Best sellers today</p>
      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <div key={item.rank} className="flex items-center gap-3">
            <span className="text-xs text-zinc-600 w-3">{item.rank}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white truncate">{item.name}</p>
              <p className="text-xs text-zinc-600">{item.category}</p>
            </div>
            <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-xs text-red-500 font-medium w-16 text-right">
              {formatCurrency(item.sales)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
