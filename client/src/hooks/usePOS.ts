import { useState, useCallback, useMemo, useEffect } from "react";
import type { Product, CartItem, Order } from "../types/pos.types";
import { posService } from "../services/pos.service";
import type { ReceiptData } from "../types/receipt.types";
import { generateReceiptNo } from "../utils/receipt";
import toast from "react-hot-toast";

const INITIAL_ORDER: Order = {
  items: [],
  subtotal: 0,
  discount: 0,
  discountType: "fixed",
  total: 0,
  cash: 0,
  change: 0,
};

export function usePOS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [order, setOrder] = useState<Order>(INITIAL_ORDER);
  const [discountInput, setDiscountInput] = useState<string>("");
  const [cashInput, setCashInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const closeReceipt = useCallback(() => {
    setReceipt(null);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await posService.getProducts();
      setProducts(data);
      const cats = ["All", ...Array.from(new Set(data.map((p) => p.category)))];
      setCategories(cats);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const addToCart = useCallback((product: Product) => {
    setOrder((prev) => {
      const existing = prev.items.find((i) => i.product.id === product.id);
      let updatedItems: CartItem[];

      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        updatedItems = prev.items.map((i) =>
          i.product.id === product.id
            ? {
                ...i,
                quantity: i.quantity + 1,
                total: (i.quantity + 1) * i.product.price,
              }
            : i,
        );
      } else {
        updatedItems = [
          ...prev.items,
          { product, quantity: 1, total: product.price },
        ];
      }
      return recalculate({ ...prev, items: updatedItems });
    });
  }, []);

  const updateQuantity = useCallback((productId: number, qty: number) => {
    setOrder((prev) => {
      const updatedItems =
        qty <= 0
          ? prev.items.filter((i) => i.product.id !== productId)
          : prev.items.map((i) =>
              i.product.id === productId
                ? { ...i, quantity: qty, total: qty * i.product.price }
                : i,
            );
      return recalculate({ ...prev, items: updatedItems });
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setOrder((prev) =>
      recalculate({
        ...prev,
        items: prev.items.filter((i) => i.product.id !== productId),
      }),
    );
  }, []);

  const clearCart = useCallback(() => {
    setOrder(INITIAL_ORDER);
    setDiscountInput("");
    setCashInput("");
  }, []);

  const applyDiscount = useCallback((value: string) => {
    setDiscountInput(value);
    const num = parseFloat(value) || 0;
    const isPercent = value.includes("%");
    setOrder((prev) =>
      recalculate({
        ...prev,
        discount: num,
        discountType: isPercent ? "percent" : "fixed",
      }),
    );
  }, []);

  const applyCash = useCallback((value: string) => {
    setCashInput(value);
    const cash = parseFloat(value) || 0;
    setOrder((prev) => ({
      ...prev,
      cash,
      change: Math.max(0, cash - prev.total),
    }));
  }, []);

  const checkout = useCallback(async () => {
    if (order.items.length === 0 || order.cash < order.total) return;
    setCheckoutLoading(true);
    try {
      const payload = {
        items: order.items.map((i) => ({
          productId: i.product.id,
          quantity: i.quantity,
          price: i.product.price,
          total: i.total,
        })),
        total: order.total,
        discount: order.discount,
        cash: order.cash,
        change: order.change,
      };

      const sale = await posService.createSale(payload);

      const receiptData: ReceiptData = {
        id: sale.id,
        receiptNo: generateReceiptNo(sale.id),
        cashier: "Admin",
        items: order.items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          price: i.product.price,
          total: i.total,
        })),
        subtotal: order.subtotal,
        discount: order.discount,
        total: order.total,
        cash: order.cash,
        change: order.change,
        createdAt: new Date(),
      };

      setReceipt(receiptData);
      await fetchProducts();
      clearCart();
      return true;
    } catch (error) {
      toast.error("Failed to process payment.");
      return false;
    } finally {
      setCheckoutLoading(false);
    }
  }, [order, clearCart]);

  const recalculate = (o: Order): Order => {
    const subtotal = o.items.reduce((sum, i) => sum + i.total, 0);
    const discountAmt =
      o.discountType === "percent" ? (subtotal * o.discount) / 100 : o.discount;
    const total = Math.max(0, subtotal - discountAmt);
    const change = Math.max(0, o.cash - total);
    return { ...o, subtotal, total, change };
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return {
    products: filteredProducts,
    categories,
    loadingProducts,
    order,
    discountInput,
    cashInput,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyDiscount,
    applyCash,
    checkout,
    checkoutLoading,
    receipt,
    closeReceipt,
  };
}
