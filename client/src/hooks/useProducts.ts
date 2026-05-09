import { useState, useMemo } from "react";
import type { Product, ProductFormData } from "../types/product.types";
import { FAKE_PRODUCTS } from "../constants/pos.fake";
import { generateBarcode } from "../utils/product";

const ITEMS_PER_PAGE = 8;

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(
    FAKE_PRODUCTS.map((p) => ({ ...p, barcode: generateBarcode() })),
  );
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [barcodeProduct, setBarcodeProduct] = useState<Product | null>(null);

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

  const saveProduct = (data: ProductFormData) => {
    const product: Product = {
      id: editingProduct?.id ?? Date.now(),
      name: data.name,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      category: data.category,
      barcode: data.barcode || generateBarcode(),
    };

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? product : p)),
      );
    } else {
      setProducts((prev) => [...prev, product]);
    }
    closeModal();
  };

  const deleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return {
    products: paginated,
    totalProducts: filtered.length,
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
  };
}
