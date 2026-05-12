import { Search, RefreshCw } from "lucide-react";
import { useInventory } from "../../hooks/useInventory";
import RestockModal from "../../components/inventory/RestockModal";
import Badge from "../../components/ui/Badge";
import { getProductStatus, STATUS_CONFIG } from "../../utils/product";
import type { StockFilter } from "../../types/inventory.types";

const FILTERS: { label: string; value: StockFilter }[] = [
  { label: "All", value: "all" },
  { label: "Low Stock", value: "low_stock" },
  { label: "Out of Stock", value: "out_of_stock" },
];

export default function InventoryPage() {
  const {
    inventory,
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
  } = useInventory();

  return (
    <div className="flex flex-col gap-4">
      {/* Top row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full h-10 bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 text-sm text-white placeholder-zinc-600 outline-none focus:border-red-600 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`h-10 px-4 rounded-xl text-xs font-medium border transition-all ${
                filter === f.value
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
            Total Products
          </p>
          <p className="text-2xl font-medium text-white">{stats.total}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
            Low Stock
          </p>
          <p className="text-2xl font-medium text-yellow-500">
            {stats.lowStock}
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
            Out of Stock
          </p>
          <p className="text-2xl font-medium text-red-500">
            {stats.outOfStock}
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              {[
                "Product",
                "Category",
                "Current Stock",
                "Status",
                "Last Restocked",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs text-zinc-500 uppercase tracking-widest px-4 py-3 font-medium"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-zinc-800">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-zinc-800 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : inventory.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-zinc-600 text-sm py-12"
                >
                  No items found
                </td>
              </tr>
            ) : (
              inventory.map((item) => {
                const status = getProductStatus(item.stock);
                const config = STATUS_CONFIG[status];
                return (
                  <tr
                    key={item.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-white font-medium">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-500">
                      {item.category}
                    </td>
                    <td
                      className="px-4 py-3 text-sm font-medium"
                      style={{ color: config.color }}
                    >
                      {item.stock}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        label={config.label}
                        bg={config.bg}
                        color={config.color}
                      />
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-500">
                      {new Date(item.lastRestocked).toLocaleDateString(
                        "en-PH",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openRestock(item)}
                        className="h-8 px-3 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white hover:border-red-600 transition-all"
                      >
                        <RefreshCw size={12} /> Restock
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showRestockModal && restockingItem && (
        <RestockModal
          item={restockingItem}
          onRestock={restock}
          onClose={closeRestock}
        />
      )}
    </div>
  );
}
