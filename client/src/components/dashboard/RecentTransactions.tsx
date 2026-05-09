import { Receipt } from "lucide-react";
import type { RecentTransaction } from "../../types/dashboard.types";
import { formatCurrency } from "../../utils/currency";

interface Props {
  data: RecentTransaction[];
}

export default function RecentTransactions({ data }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <p className="text-sm text-white font-medium mb-1">Recent Transactions</p>
      <p className="text-xs text-zinc-500 mb-3">Latest sales today</p>
      <div className="flex flex-col">
        {data.map((txn, i) => (
          <div
            key={txn.id}
            className={`flex items-center justify-between py-2 ${
              i < data.length - 1 ? "border-b border-zinc-800" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Receipt size={13} className="text-zinc-600 shrink-0" />
              <div>
                <p className="text-xs text-white">#{txn.id}</p>
                <p className="text-xs text-zinc-600">{txn.time}</p>
              </div>
            </div>
            <p className="text-sm text-red-500 font-medium">
              {formatCurrency(txn.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
