/*import { useProductInfo } from "@/shared/hooks/useProductInfo";
import type { Product } from "@/shared/types/Product";
import { productImagePath } from "@/shared/utils/productImagePath";

export default function ProductCard({ product }: { product: Product }) {
  const { discountedPrice, oldPrice, stars } = useProductInfo(product);

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg overflow-hidden w-full">
      {/* IMAGE }
      <div className="flex-shrink-0 h-56 bg-gray-50 flex items-center justify-center p-4">
        <img
          src={productImagePath(product.categoryName, product.imageName)}
          alt={product.name}
          className="max-h-full object-contain"
        />
      </div>

      {/* CONTENU }
      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-gray-900 font-semibold line-clamp-2 text-base mb-2">
          {product.name}
        </p>

        <div className="flex items-center mb-2 space-x-1">
          {stars.map((filled, idx) => (
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

        <div className="flex items-center gap-2">
          <span className="text-indigo-600 font-bold text-lg">{discountedPrice}€</span>
          {oldPrice && <span className="text-gray-400 line-through text-sm">{oldPrice}€</span>}
        </div>
      </div>
    </div>
  );
}*/

// src/features/shop/ui/ProductCard.tsx
// Design fourni conservé à 100% (layout, couleurs, étoiles SVG).
// Ajouts : <Link> React Router, badge remise, indicateur stock, onError image.

import { memo }              from "react";
import { Link }              from "react-router-dom";
import { useProductInfo }    from "@/shared/hooks/useProductInfo";
import { productImagePath }  from "@/shared/utils/productImagePath";
import type { Product }      from "@/shared/types/Product";

interface ProductCardProps { product: Product }

const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { discountedPrice, oldPrice, stars } = useProductInfo(product);

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg overflow-hidden w-full transition-shadow duration-300 group">

      {/* ── IMAGE ─────────────────────────────────────────────────────────── */}
      <Link to={`/product/${product.id}`} className="relative flex-shrink-0 h-56 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        {/* Badge remise */}
        {product.discountRate && product.discountRate > 0 && (
          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            -{product.discountRate}%
          </span>
        )}
        {/* Badge stock */}
        {product.inStock === false && (
          <span className="absolute top-2 right-2 z-10 bg-slate-400 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            Épuisé
          </span>
        )}
        <img
          src={productImagePath(product.categoryName, product.imageName)}
          alt={product.name}
          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/placeholder.png"; }}
        />
      </Link>

      {/* ── CONTENU ───────────────────────────────────────────────────────── */}
      <div className="p-4 flex-1 flex flex-col justify-between">

        {/* Nom */}
        <Link to={`/product/${product.id}`}>
          <p className="text-gray-900 font-semibold line-clamp-2 text-base mb-2 hover:text-indigo-600 transition-colors capitalize">
            {product.name}
          </p>
        </Link>

        {/* Étoiles SVG (design fourni conservé à l'identique) */}
        <div className="flex items-center mb-2 space-x-1" aria-label={`Note : ${product.review ?? 0}/5`}>
          {stars.map((filled, idx) => (
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
          <span className="text-indigo-600 font-bold text-lg">{discountedPrice}€</span>
          {oldPrice && <span className="text-gray-400 line-through text-sm">{oldPrice}€</span>}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;