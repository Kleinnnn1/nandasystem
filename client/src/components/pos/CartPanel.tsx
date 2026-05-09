import { ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import Input from "../ui/Input";
import type { Order } from "../../types/pos.types";
import { formatCurrency } from "../../utils/currency";

interface Props {
  order: Order;
  discountInput: string;
  cashInput: string;
  onUpdateQty: (productId: number, qty: number) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
  onDiscount: (value: string) => void;
  onCash: (value: string) => void;
  onCheckout: () => void;
}

export default function CartPanel({
  order,
  discountInput,
  cashInput,
  onUpdateQty,
  onRemove,
  onClear,
  onDiscount,
  onCash,
  onCheckout,
}: Props) {
  const canCheckout = order.items.length > 0 && order.cash >= order.total;

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-l border-zinc-800">

      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <ShoppingCart size={15} className="text-zinc-400" />
          <span className="text-sm text-white font-medium">Current Order</span>
          {order.items.length > 0 && (
            <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {order.items.length}
            </span>
          )}
        </div>
        {order.items.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-zinc-600 hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {order.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-zinc-700">
            <ShoppingCart size={32} />
            <p className="text-xs">No items yet</p>
            <p className="text-xs">Click a product to add</p>
          </div>
        ) : (
          order.items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onUpdateQty={onUpdateQty}
              onRemove={onRemove}
            />
          ))
        )}
      </div>

      {order.items.length > 0 && (
        <div className="border-t border-zinc-800 px-4 py-3 flex flex-col gap-2.5">

          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-500">Subtotal</span>
            <span className="text-xs text-white">
              {formatCurrency(order.subtotal)}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-xs text-zinc-500 w-16 shrink-0">
              Discount
            </span>
            <Input
              value={discountInput}
              onChange={(e) => onDiscount(e.target.value)}
              placeholder="0 or 10%"
              className="h-8 text-xs"
            />
          </div>

          <hr className="border-zinc-800" />

          <div className="flex justify-between items-center">
            <span className="text-sm text-white font-medium">Total</span>
            <span className="text-lg text-red-500 font-medium">
              {formatCurrency(order.total)}
            </span>
          </div>

          <div className="flex gap-2 items-center">
            <span className="text-xs text-zinc-500 w-16 shrink-0">Cash</span>
            <Input
              type="number"
              value={cashInput}
              onChange={(e) => onCash(e.target.value)}
              placeholder="0.00"
              className="h-8 text-xs"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-zinc-500">Change</span>
            <span
              className={`text-sm font-medium ${order.change > 0 ? "text-green-500" : "text-zinc-500"}`}
            >
              {formatCurrency(order.change)}
            </span>
          </div>

          <Button
            onClick={onCheckout}
            disabled={!canCheckout}
            fullWidth
            size="lg"
            className="mt-1"
          >
            Process Payment
          </Button>
        </div>
      )}
    </div>
  );
}
