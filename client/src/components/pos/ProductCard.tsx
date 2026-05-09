import { Package } from "lucide-react";
import type { Product } from "../../types/pos.types";
import { formatCurrency } from "../../utils/currency";

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <button
      onClick={() => !isOutOfStock && onAdd(product)}
      disabled={isOutOfStock}
      className={`
        bg-zinc-900 border rounded-xl p-3 text-left
        flex flex-col gap-1 transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isOutOfStock ? "border-zinc-800" : "border-zinc-800 hover:border-red-600 cursor-pointer"}
      `}
    >

      <div className="w-full h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-1">
        <Package size={18} className="text-zinc-600" />
      </div>

      <p className="text-xs text-white font-medium leading-tight line-clamp-2">
        {product.name}
      </p>

      <p className="text-sm text-red-500 font-medium">
        {formatCurrency(product.price)}
      </p>

      <p
        className={`text-xs ${isLowStock ? "text-yellow-500" : "text-zinc-600"}`}
      >
        {isOutOfStock ? "Out of stock" : `${product.stock} in stock`}
      </p>
    </button>
  );
}
