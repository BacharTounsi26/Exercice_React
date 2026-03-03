// src/features/home/ui/ProductWidgetSection.tsx
import type { Product } from "@/shared/types/Product";
import ProductWidgetItem from "./ProductWidgetItem";

type Props = {
  title: string;
  products: Product[];
};

export default function ProductWidgetSection({ title, products }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <ProductWidgetItem key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}