import { Trash2, X } from "lucide-react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onConfirm,
  onCancel,
  title = "Delete Category",
  description = "Are you sure you want to delete this category? This action cannot be undone.",
}: ConfirmDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        className="relative w-full max-w-sm mx-4 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600/10 border border-red-600/20 mb-4">
          <Trash2 size={20} className="text-red-500" />
        </div>

        <h2 className="text-white text-base font-semibold mb-1">{title}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-10 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-10 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
