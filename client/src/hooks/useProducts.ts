import { useState, useEffect, useMemo } from "react";
import type { Product, ProductFormData } from "../types/product.types";
import { productService } from "../services/product.service";
import { categoryService } from "../services/category.service";
import { generateBarcode } from "../utils/product";
import type { Category } from "../types/category.types";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 8;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [barcodeProduct, setBarcodeProduct] = useState<Product | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const categoryNames = ["All", ...categories.map((c) => c.name)];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const openAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };
  const openEdit = (product: Product) => {
    setEditingProduct(product);
    setShowModal(true);
  };
  const openBarcode = (product: Product) => {
    setBarcodeProduct(product);
    setShowBarcodeModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };
  const closeBarcodeModal = () => {
    setShowBarcodeModal(false);
    setBarcodeProduct(null);
  };

  const saveProduct = async (data: ProductFormData) => {
    try {
      const category = categories.find((c) => c.name === data.category);
      const payload = {
        name: data.name,
        price: parseFloat(data.price),
        stock: parseInt(data.stock),
        barcode: data.barcode || generateBarcode(),
        categoryId: category?.id,
      };

      if (editingProduct) {
        await productService.update(editingProduct.id, payload);
      } else {
        await productService.create(payload);
      }
      await fetchProducts();
      closeModal();
      toast.success(editingProduct ? "Product updated." : "Product added.");
    } catch (error) {
      toast.error("Failed to save product.");
    }
  };

  const deleteProduct = (id: number) => {
    setDeletingId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deletingId === null) return;
    try {
      await productService.delete(deletingId);
      await fetchProducts();
      toast.success("Product deleted.");
    } catch {
      toast.error("Failed to delete product.");
    } finally {
      setShowDeleteModal(false);
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingId(null);
  };

  return {
    products: paginated,
    categories,
    categoryNames,
    totalProducts: filtered.length,
    loading,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    showModal,
    showBarcodeModal,
    editingProduct,
    barcodeProduct,
    openAdd,
    openEdit,
    openBarcode,
    closeModal,
    closeBarcodeModal,
    saveProduct,
    deleteProduct,
    showDeleteModal,
    confirmDelete,
    cancelDelete,
  };
}
