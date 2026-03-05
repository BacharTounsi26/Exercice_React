// src/features/home/ui/ProductWidgetSection.tsx
import type { Product } from "@/shared/types/Product";
import ProductWidgetItem from "./ProductWidgetItem";
import Button from "@/shared/ui/Button";

type Props = {
  title:      string;
  products:   Product[];
  loading?:   boolean;
  onViewAll?: () => void;
};

export default function ProductWidgetSection({ title, products, loading = false, onViewAll }: Props) {
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-2 md:px-0">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800">{title}</h2>
        {onViewAll && (
          <Button
            onClick={onViewAll}
            variant="secondary"
            size="none"
            radius="lg"
            className="
              inline-flex items-center gap-1.5
              px-3 py-1.5 rounded-lg
              bg-indigo-50 hover:bg-indigo-100
              text-indigo-600 hover:text-indigo-700
              text-sm font-semibold
              border border-indigo-200 hover:border-indigo-300
              transition-all duration-150
              active:scale-95
            "
          >
            View All
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        )}
      </div>

      {/* Liste de produits en scroll horizontal */}
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-2 md:px-0 pb-2">
        {loading && Array.from({ length: 3 }, (_, i) => (
          <div key={`sk-${i}`} className="w-48 md:w-52 flex-shrink-0 rounded-lg border border-gray-200 bg-white overflow-hidden animate-pulse">
            <div className="h-48 bg-slate-100" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-slate-100 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
              <div className="h-4 bg-slate-100 rounded w-1/3" />
            </div>
          </div>
        ))}
        {!loading && products.length === 0 && (
          <p className="text-gray-400 text-sm py-4">No products to display.</p>
        )}
        {!loading && products.map((p) => (
          <ProductWidgetItem key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}