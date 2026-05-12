import { useState, useEffect, useMemo } from "react";
import type { Category, CategoryFormData } from "../types/category.types";
import { categoryService } from "../services/cateogory.service";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return categories.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
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

  const saveCategory = async (data: CategoryFormData) => {
    try {
      if (editingCategory) {
        await categoryService.update(editingCategory.id, data);
      } else {
        await categoryService.create(data);
      }
      await fetchCategories();
      closeModal();
    } catch (error) {
      console.error("Failed to save category:", error);
    }
  };

  const deleteCategory = async (id: number) => {
    const category = categories.find((c) => c.id === id);
    if (category && category.productCount > 0) {
      alert("Cannot delete a category with existing products.");
      return;
    }
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await categoryService.delete(id);
        await fetchCategories();
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  return {
    categories: filtered,
    loading,
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