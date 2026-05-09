import {
  Search,
  Plus,
  Pencil,
  Trash2,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import ProductFormModal from "../../components/products/ProductFormModal";
import BarcodeModal from "../../components/products/BarcodeModal";
import { getProductStatus, STATUS_CONFIG } from "../../utils/product";
import { formatCurrency } from "../../utils/currency";
import { FAKE_CATEGORIES } from "../../constants/pos.fake";

export default function ProductsPage() {
  const {
    products,
    totalProducts,
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
  } = useProducts();

  return (
    <div className="flex flex-col gap-4">
      
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search products..."
            className="w-full h-10 bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 text-sm text-white placeholder-zinc-600 outline-none focus:border-red-600 transition-colors"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="h-10 px-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-400 outline-none focus:border-red-600 transition-colors"
        >
          {FAKE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <Button onClick={openAdd} size="md">
          <Plus size={15} className="mr-1.5" /> Add Product
        </Button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              {[
                "Product",
                "Category",
                "Price",
                "Stock",
                "Status",
                "Actions",
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
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center text-zinc-600 text-sm py-12"
                >
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const status = getProductStatus(product.stock);
                const statusConfig = STATUS_CONFIG[status];
                return (
                  <tr
                    key={product.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-white font-medium">
                      {product.name}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        label={product.category}
                        bg="#1a1a2e"
                        color="#6b7bff"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {product.stock}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        label={statusConfig.label}
                        bg={statusConfig.bg}
                        color={statusConfig.color}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEdit(product)}
                          className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-600 transition-all"
                          title="Edit"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-600 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                        <button
                          onClick={() => openBarcode(product)}
                          className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-red-600 transition-all"
                          title="Barcode"
                        >
                          <QrCode size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          Showing {Math.min((currentPage - 1) * 8 + 1, totalProducts)}–
          {Math.min(currentPage * 8, totalProducts)} of {totalProducts} products
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-40 transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg border text-xs font-medium transition-all ${
                currentPage === page
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-40 transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {showModal && (
        <ProductFormModal
          product={editingProduct}
          onSave={saveProduct}
          onClose={closeModal}
        />
      )}
      {showBarcodeModal && barcodeProduct && (
        <BarcodeModal product={barcodeProduct} onClose={closeBarcodeModal} />
      )}
    </div>
  );
}
