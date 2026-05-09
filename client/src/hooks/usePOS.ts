import { useState, useCallback, useMemo } from "react";
import type { Product, CartItem, Order } from "../types/pos.types";

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
  const [order, setOrder] = useState<Order>(INITIAL_ORDER);
  const [discountInput, setDiscountInput] = useState<string>("");
  const [cashInput, setCashInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

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

  const recalculate = (o: Order): Order => {
    const subtotal = o.items.reduce((sum, i) => sum + i.total, 0);
    const discountAmt =
      o.discountType === "percent" ? (subtotal * o.discount) / 100 : o.discount;
    const total = Math.max(0, subtotal - discountAmt);
    const change = Math.max(0, o.cash - total);
    return { ...o, subtotal, total, change };
  };

  const filteredProducts = useMemo(
    () => ({
      search,
      activeCategory,
    }),
    [search, activeCategory],
  );

  return {
    order,
    discountInput,
    cashInput,
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    filteredProducts,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyDiscount,
    applyCash,
  };
}
