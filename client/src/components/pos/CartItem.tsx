import { Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../../types/pos.types";
import { formatCurrency } from "../../utils/currency";

interface Props {
  item: CartItemType;
  onUpdateQty: (productId: number, qty: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({ item, onUpdateQty, onRemove }: Props) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-zinc-900">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white font-medium truncate">
          {item.product.name}
        </p>
        <p className="text-xs text-zinc-600">
          {formatCurrency(item.product.price)} each
        </p>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
          className="w-6 h-6 rounded bg-zinc-800 hover:bg-red-600 text-white text-sm flex items-center justify-center transition-colors"
        >
          −
        </button>
        <span className="text-xs text-white w-5 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
          disabled={item.quantity >= item.product.stock}
          className="w-6 h-6 rounded bg-zinc-800 hover:bg-red-600 text-white text-sm flex items-center justify-center transition-colors disabled:opacity-40"
        >
          +
        </button>
      </div>

      <p className="text-xs text-red-500 font-medium w-14 text-right">
        {formatCurrency(item.total)}
      </p>

      <button
        onClick={() => onRemove(item.product.id)}
        className="text-zinc-700 hover:text-red-500 transition-colors ml-1"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}
