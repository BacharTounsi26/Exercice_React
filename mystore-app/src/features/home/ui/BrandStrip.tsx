import type { Category } from "@/shared/types/Category";
import { imagePath } from "@/shared/utils/imagePath";

type Props = {
  categories: Category[];
};

export default function BrandStrip({ categories }: Props) {
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