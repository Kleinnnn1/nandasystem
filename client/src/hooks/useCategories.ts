import { useState, useMemo } from "react";
import type { Category, CategoryFormData } from "../types/category.types";
import { FAKE_CATEGORIES_DATA } from "../constants/categories.fake";

export function useCategories() {
  const [categories, setCategories] =
    useState<Category[]>(FAKE_CATEGORIES_DATA);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const filtered = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const openAdd = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const saveCategory = (data: CategoryFormData) => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id ? { ...c, name: data.name } : c,
        ),
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { id: Date.now(), name: data.name, productCount: 0 },
      ]);
    }
    closeModal();
  };

  const deleteCategory = (id: number) => {
    const category = categories.find((c) => c.id === id);
    if (category && category.productCount > 0) {
      alert("Cannot delete a category with existing products.");
      return;
    }
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return {
    categories: filtered,
    search,
    setSearch,
    showModal,
    editingCategory,
    openAdd,
    openEdit,
    closeModal,
    saveCategory,
    deleteCategory,
  };
}
