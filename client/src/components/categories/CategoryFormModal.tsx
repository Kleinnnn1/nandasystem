import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import type { Category, CategoryFormData } from "../../types/category.types";

interface Props {
  category: Category | null;
  onSave: (data: CategoryFormData) => void;
  onClose: () => void;
}

export default function CategoryFormModal({
  category,
  onSave,
  onClose,
}: Props) {
  const [name, setName] = useState(category?.name ?? "");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(category?.name ?? "");
    setError("");
  }, [category]);

  const handleSubmit = () => {
    if (!name.trim()) return setError("Category name is required");
    onSave({ name: name.trim() });
  };

  return (
    <Modal
      title={category ? "Edit Category" : "Add Category"}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Category Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          placeholder="e.g. Writing"
          error={error}
          autoFocus
        />
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth onClick={handleSubmit}>
            {category ? "Save Changes" : "Add Category"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
