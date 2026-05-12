import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import type { Product, ProductFormData } from "../../types/product.types";
import type { Category } from "../../types/category.types";
import { getInitialFormData, generateBarcode } from "../../utils/product";

interface Props {
  product: Product | null;
  categories: Category[];
  onSave: (data: ProductFormData) => void;
  onClose: () => void;
}

export default function ProductFormModal({
  product,
  categories,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState<ProductFormData>(
    getInitialFormData(product ?? undefined),
  );
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  useEffect(() => {
    setForm(getInitialFormData(product ?? undefined));
    setErrors({});
  }, [product]);

  const validate = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.price || isNaN(parseFloat(form.price)))
      newErrors.price = "Valid price is required";
    if (!form.stock || isNaN(parseInt(form.stock)))
      newErrors.stock = "Valid stock is required";
    if (!form.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSave(form);
  };

  const handleChange = (field: keyof ProductFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <Modal title={product ? "Edit Product" : "Add Product"} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input
          label="Product Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g. Ballpen Black"
          error={errors.name}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Price (₱)"
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="0.00"
            error={errors.price}
          />
          <Input
            label="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
            placeholder="0"
            error={errors.stock}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 uppercase tracking-widest">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="h-12 px-4 text-sm bg-zinc-900 text-white border border-zinc-800 rounded-lg outline-none focus:border-red-600 transition-colors"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-red-500">{errors.category}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 uppercase tracking-widest">
            Barcode
          </label>
          <div className="flex gap-2">
            <Input
              value={form.barcode}
              onChange={(e) => handleChange("barcode", e.target.value)}
              placeholder="Auto-generated if empty"
              className="flex-1"
            />
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleChange("barcode", generateBarcode())}
              title="Generate barcode"
            >
              <RefreshCw size={15} />
            </Button>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth onClick={handleSubmit}>
            {product ? "Save Changes" : "Add Product"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
