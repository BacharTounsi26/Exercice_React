import type { Category } from "@/shared/types/Category";
import { imagePath } from "@/shared/utils/imagePath";

type Props = {
  categories: Category[];
  loading?: boolean;
};

export default function BrandStrip({ categories, loading = false }: Props) {
  if (loading) {
    return (
      <div className="py-10 grid grid-cols-2 md:grid-cols-5 gap-6">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-24 md:h-28 bg-slate-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-slate-500">
        No brands available at the moment.
      </div>
    );
  }

  return (
    <div className="py-10 grid grid-cols-2 md:grid-cols-5 gap-6">
      {categories.map((c) => (
        <div
          key={c.id}
          className="flex items-center justify-center bg-white rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <img
            src={imagePath(c.image)}
            alt={c.name}
            className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
          />
        </div>
      ))}
    </div>
  );
}