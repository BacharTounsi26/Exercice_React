
import type { Category } from "@/shared/types/Category";
import { brandPath } from "@/shared/utils/brandPath";

export default function BrandStrip({ categories }: { categories: Category[] }) {
  return (
    <div className="py-10 grid grid-cols-2 md:grid-cols-5 gap-6 opacity-80">
      {categories.map((c) => (
        <img
          key={c.id}
          src={brandPath(c.image)}
          alt={c.name}
          className="h-12 w-auto mx-auto object-contain grayscale hover:grayscale-0 transition"
        />
      ))}
    </div>
  );
}