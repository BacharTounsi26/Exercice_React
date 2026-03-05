
import { memo, useState, useCallback, useMemo } from "react";
import { Link }          from "react-router-dom";
import Breadcrumb        from "@/features/layout/ui/Breadcrumb";
import ProductGrid       from "@/features/shop/ui/ProductGrid";
import SortBar           from "@/features/shop/ui/SortBar";
import type { SortOption } from "@/features/shop/hooks/useShop";
import type { Product }  from "@/shared/types/Product";

interface ProductListPageProps {
  title:     string;        // ex: "Top Sellers"
  badge?:    string;        // ex: "🔥"
  products:  Product[];
  isLoading: boolean;
  error?:    string | null;
  /** Message affiché quand la liste est vide (ex: Recently Viewed) */
  emptyMessage?: string;
}

// ── Tri local (pas besoin d'API — données déjà chargées) ───────────────────

function sortProducts(products: Product[], option: SortOption): Product[] {
  const copy = [...products];
  switch (option) {
    case "price_asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price_desc":
      return copy.sort((a, b) => b.price - a.price);
    case "review_desc":
      return copy.sort((a, b) => (b.review ?? 0) - (a.review ?? 0));
    case "name_asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "discountRate_desc":
      return copy.sort((a, b) => (b.discountRate ?? 0) - (a.discountRate ?? 0));
    default:
      return copy;
  }
}

// ──────────────────────────────────────────────────────────────────────────

const ProductListPage = memo(function ProductListPage({
  title,
  badge,
  products,
  isLoading,
  error = null,
  emptyMessage,
}: ProductListPageProps) {
  const [sortOption, setSortOption] = useState<SortOption>("");

  const handleSort = useCallback((o: SortOption) => setSortOption(o), []);

  const sorted = useMemo(
    () => sortProducts(products, sortOption),
    [products, sortOption]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">

      {/* Fil d'Ariane */}
      <Breadcrumb
        category={{ id: "", name: title }}
        className="mb-5"
      />

      {/* Titre */}
      <div className="flex items-center gap-3 mb-6">
        {badge && <span className="text-2xl">{badge}</span>}
        <h1 className="font-display text-2xl font-bold text-slate-800">{title}</h1>
      </div>

      {/* Barre de tri — uniquement quand on a des produits */}
      {!isLoading && sorted.length > 0 && (
        <SortBar
          sortOption={sortOption}
          totalCount={sorted.length}
          onSort={handleSort}
        />
      )}

      {/* Empty state spécifique Recently Viewed */}
      {!isLoading && !error && products.length === 0 && emptyMessage && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
            <span className="text-4xl">👀</span>
          </div>
          <p className="font-semibold text-slate-700 mb-2">{emptyMessage}</p>
          <p className="text-sm text-slate-400 mb-8">
            Browse our catalog to discover products.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-colors shadow-md"
          >
            Explore the shop →
          </Link>
        </div>
      )}

      {/* Grille */}
      <ProductGrid
        products={sorted}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
});

export default ProductListPage;