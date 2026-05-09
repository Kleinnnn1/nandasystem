import { Tag, Pencil, Trash2 } from "lucide-react";
import type { Category } from "../../types/category.types";

interface Props {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

export default function CategoryCard({ category, onEdit, onDelete }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 hover:border-zinc-700 transition-colors">

      <div className="w-10 h-10 rounded-xl bg-red-950 flex items-center justify-center">
        <Tag size={18} className="text-red-500" />
      </div>

      <div>
        <p className="text-sm text-white font-medium">{category.name}</p>
        <p className="text-xs text-zinc-500 mt-0.5">
          {category.productCount} products
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(category)}
          className="flex-1 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-white hover:border-red-600 transition-all"
        >
          <Pencil size={12} /> Edit
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="flex-1 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-red-500 hover:border-red-600 transition-all"
        >
          <Trash2 size={12} /> Delete
        </button>
      </div>
    </div>
  );
}
