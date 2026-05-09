import { useMemo } from "react";
import { Search } from "lucide-react";
import { usePOS } from "../hooks/usePOS";
import ProductCard from "../components/pos/ProductCard";
import CartPanel from "../components/pos/CartPanel";
import { FAKE_PRODUCTS, FAKE_CATEGORIES } from "../constants/pos.fake";

export default function POSPage() {
  const {
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
  } = usePOS();

  const filteredProducts = useMemo(() => {
    return FAKE_PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const handleCheckout = () => {
    alert(
      `Payment processed!\nTotal: ₱${order.total}\nChange: ₱${order.change}`,
    );
    clearCart();
  };

  return (
    <div className="flex h-[calc(100vh-52px)] -m-6 overflow-hidden">

      <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">

        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product or scan barcode..."
            className="w-full h-10 bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 text-sm text-white placeholder-zinc-600 outline-none focus:border-red-600 transition-colors"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {FAKE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`h-7 px-3 rounded-lg text-xs font-medium whitespace-nowrap border transition-all duration-150 ${
                activeCategory === cat
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-zinc-700 text-sm">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-72 shrink-0">
        <CartPanel
          order={order}
          discountInput={discountInput}
          cashInput={cashInput}
          onUpdateQty={updateQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
          onDiscount={applyDiscount}
          onCash={applyCash}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
}
