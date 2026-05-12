import { Search, Plus } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import CategoryCard from "../../components/categories/CategoryCard";
import CategoryFormModal from "../../components/categories/CategoryFormModal";
import Button from "../../components/ui/Button";

export default function CategoriesPage() {
  const {
    categories,
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
  } = useCategories();

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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full h-10 bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 text-sm text-white placeholder-zinc-600 outline-none focus:border-red-600 transition-colors"
          />
        </div>
        <Button onClick={openAdd} size="md">
          <Plus size={15} className="mr-1.5" /> Add Category
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-36 animate-pulse"
            />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-zinc-700 text-sm">
          No categories found
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={openEdit}
              onDelete={deleteCategory}
            />
          ))}
        </div>
      )}

      {showModal && (
        <CategoryFormModal
          category={editingCategory}
          onSave={saveCategory}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
