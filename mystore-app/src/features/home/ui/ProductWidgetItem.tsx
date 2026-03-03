import type { Product } from "@/shared/types/Product";
import { productImagePath } from "@/shared/utils/productImagePath";
import { formatPrice } from "@/shared/utils/formatPrice";
import { useProductInfo } from "@/shared/hooks/useProductInfo";

type Props = {
  product: Product;
};

export default function ProductWidgetItem({ product }: Props) {
  const { discountedPrice, oldPrice, stars } = useProductInfo(product);

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden w-48 md:w-52 flex-shrink-0">
      
      {/* Image */}
      <div className="flex-shrink-0 h-48 bg-gray-50 flex items-center justify-center p-4 overflow-hidden rounded-t-lg">
        <img
          src={productImagePath(product.categoryName, product.imageName)}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      {/* Contenu */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Nom */}
        <p className="text-gray-900 font-semibold line-clamp-2 text-sm md:text-base mb-2">
          {product.name}
        </p>

        {/* Étoiles */}
        <div className="flex items-center mb-2">
          {stars.map((filled: boolean, idx: number) => (
            <svg
              key={idx}
              className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.454a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.538 1.118l-3.376-2.454a1 1 0 00-1.175 0l-3.376 2.454c-.783.57-1.838-.197-1.538-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.056 9.386c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.959z" />
            </svg>
          ))}
        </div>

        {/* Prix */}
        <div className="flex items-center gap-2">
          <span className="text-indigo-600 font-bold text-base md:text-lg">
            {formatPrice(discountedPrice)}
          </span>
          {oldPrice && (
            <span className="text-gray-400 line-through text-sm md:text-base">
              {formatPrice(oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}