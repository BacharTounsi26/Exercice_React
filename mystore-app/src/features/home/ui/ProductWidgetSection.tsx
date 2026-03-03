import type { Product } from "@/shared/types/Product";
import ProductWidgetItem from "./ProductWidgetItem";

type Props = {
  title: string;
  products: Product[];
  onViewAll?: () => void;
};

export default function ProductWidgetSection({ title, products, onViewAll }: Props) {
  return (
    <div className="mb-8">
      {/* Header avec titre et bouton view all */}
      <div className="flex justify-between items-center mb-4 px-2 md:px-0">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800">{title}</h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-indigo-600 font-semibold hover:underline text-sm md:text-base"
          >
            View All
          </button>
        )}
      </div>

      {/* Liste de produits en scroll horizontal */}
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 px-2 md:px-0">
        {products.length === 0 && (
          <p className="text-gray-400 text-sm">No products to display.</p>
        )}

        {products.map((p) => (
          <ProductWidgetItem key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}