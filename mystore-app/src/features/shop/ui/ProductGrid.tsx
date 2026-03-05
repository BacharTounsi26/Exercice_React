
import { memo }           from "react";
import ProductCard        from "./ProductCard";
import type { Product }   from "@/shared/types/Product";

interface ProductGridProps {
  products:  Product[];
  isLoading: boolean;
  error:     string | null;
}

const ProductGrid = memo(function ProductGrid({ products, isLoading, error }: ProductGridProps) {

  // ── Skeleton ──────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex flex-col bg-white border border-gray-200 rounded-lg shadow overflow-hidden animate-pulse">
            <div className="h-56 bg-slate-100" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-slate-100 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, j) => (
                  <div key={j} className="w-4 h-4 bg-slate-100 rounded" />
                ))}
              </div>
              <div className="h-4 bg-slate-100 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Erreur ────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="font-semibold text-slate-700 mb-1">{error}</p>
        <p className="text-sm text-slate-400">Check that json-server is running on port 3001.</p>
      </div>
    );
  }

  // ── Vide ──────────────────────────────────────────────────────────────────
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
          </svg>
        </div>
        <p className="font-semibold text-slate-700 mb-1">No products found</p>
        <p className="text-sm text-slate-400">Try changing your search or filters.</p>
      </div>
    );
  }

  // ── Grille ────────────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
});

export default ProductGrid;