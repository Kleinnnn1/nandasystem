import { useState, useEffect } from "react";
import { PackagePlus } from "lucide-react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import type {
  InventoryItem,
  RestockFormData,
} from "../../types/inventory.types";

interface Props {
  item: InventoryItem;
  onRestock: (data: RestockFormData) => void;
  onClose: () => void;
}

export default function RestockModal({ item, onRestock, onClose }: Props) {
  const [form, setForm] = useState<RestockFormData>({ quantity: "", note: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm({ quantity: "", note: "" });
    setError("");
  }, [item]);

  const handleSubmit = () => {
    const qty = parseInt(form.quantity);
    if (!form.quantity || isNaN(qty) || qty <= 0) {
      return setError("Please enter a valid quantity");
    }
    onRestock(form);
  };

  return (
    <Modal title="Restock Item" onClose={onClose}>
      <div className="flex flex-col gap-4">
        {/* Item info */}
        <div className="flex items-center gap-3 bg-zinc-800 rounded-xl px-4 py-3">
          <div className="w-9 h-9 rounded-lg bg-red-950 flex items-center justify-center flex-shrink-0">
            <PackagePlus size={16} className="text-red-500" />
          </div>
          <div>
            <p className="text-sm text-white font-medium">{item.name}</p>
            <p className="text-xs text-zinc-500">
              Current stock: <span className="text-white">{item.stock}</span>
            </p>
          </div>
        </div>

        <Input
          label="Quantity to Add"
          type="number"
          value={form.quantity}
          onChange={(e) => {
            setForm((p) => ({ ...p, quantity: e.target.value }));
            setError("");
          }}
          placeholder="e.g. 50"
          error={error}
          autoFocus
        />

        <Input
          label="Note (optional)"
          value={form.note}
          onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
          placeholder="e.g. Supplier delivery"
        />

        {form.quantity && parseInt(form.quantity) > 0 && (
          <div className="bg-zinc-800 rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-xs text-zinc-500">
              New stock after restock
            </span>
            <span className="text-sm text-green-500 font-medium">
              {item.stock + (parseInt(form.quantity) || 0)}
            </span>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth onClick={handleSubmit}>
            Confirm Restock
          </Button>
        </div>
      </div>
    </Modal>
  );
}
