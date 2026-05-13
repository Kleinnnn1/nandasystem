import { useState, useEffect, useMemo } from "react";
import type {
  InventoryItem,
  StockFilter,
  RestockFormData,
} from "../types/inventory.types";
import { inventoryService } from "../services/inventory.service";
import { getProductStatus } from "../utils/product";
import toast from "react-hot-toast";

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StockFilter>("all");
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [restockingItem, setRestockingItem] = useState<InventoryItem | null>(
    null,
  );

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getAll();
      setInventory(data);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const restock = async (data: RestockFormData) => {
    if (!restockingItem) return;
    try {
      await inventoryService.restock(restockingItem.id, data);
      await fetchInventory();
      closeRestock();
      toast.success(`${restockingItem.name} restocked successfully.`);
    } catch (error) {
      toast.error("Failed to restock item.");
    }
  };

  return {
    inventory: filtered,
    stats,
    loading,
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
