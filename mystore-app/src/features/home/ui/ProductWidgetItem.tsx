
import type { Product } from "@/shared/types/Product";
import { formatPrice } from "@/shared/utils/formatPrice";

export default function ProductWidgetItem({ product }: { product: Product }) {
  return (
    <div className="flex gap-3 items-center">
      <img
        src={`/images/products/${product.categoryName}/${product.imageName}`}
        className="h-20 w-20 object-contain rounded"
      />

      <div>
        <p className="font-medium line-clamp-1">{product.name}</p>
        <p className="font-semibold text-indigo-600">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}