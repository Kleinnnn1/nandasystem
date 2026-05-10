import { useState, useMemo } from "react";
import type {
  InventoryItem,
  StockFilter,
  RestockFormData,
} from "../types/inventory.types";
import { FAKE_INVENTORY } from "../constants/inventory.fake";
import { getProductStatus } from "../utils/product";

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(FAKE_INVENTORY);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StockFilter>("all");
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [restockingItem, setRestockingItem] = useState<InventoryItem | null>(
    null,
  );

  const filtered = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const status = getProductStatus(item.stock);
      const matchesFilter =
        filter === "all" ||
        (filter === "low_stock" && status === "low_stock") ||
        (filter === "out_of_stock" && status === "out_of_stock");
      return matchesSearch && matchesFilter;
    });
  }, [inventory, search, filter]);

  const stats = useMemo(
    () => ({
      total: inventory.length,
      lowStock: inventory.filter(
        (i) => getProductStatus(i.stock) === "low_stock",
      ).length,
      outOfStock: inventory.filter(
        (i) => getProductStatus(i.stock) === "out_of_stock",
      ).length,
    }),
    [inventory],
  );

  const openRestock = (item: InventoryItem) => {
    setRestockingItem(item);
    setShowRestockModal(true);
  };

  const closeRestock = () => {
    setShowRestockModal(false);
    setRestockingItem(null);
  };

  const restock = (data: RestockFormData) => {
    if (!restockingItem) return;
    const qty = parseInt(data.quantity);
    if (isNaN(qty) || qty <= 0) return;

    setInventory((prev) =>
      prev.map((item) =>
        item.id === restockingItem.id
          ? {
              ...item,
              stock: item.stock + qty,
              lastRestocked: new Date().toLocaleDateString("en-PH", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }),
            }
          : item,
      ),
    );
    closeRestock();
  };

  return {
    inventory: filtered,
    stats,
    search,
    setSearch,
    filter,
    setFilter,
    showRestockModal,
    restockingItem,
    openRestock,
    closeRestock,
    restock,
  };
}
