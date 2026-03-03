import type { Product } from "@/shared/types/Product";

/**
 * Calcul les infos dérivées d'un produit :
 * - prix après réduction
 * - prix barré si discount
 * - étoiles pour review
 */
export function useProductInfo(product: Product) {
  const discountedPrice = product.discountRate
    ? +(product.price * (1 - product.discountRate / 100)).toFixed(2)
    : product.price;

  const oldPrice = product.discountRate ? product.price : null;

  const stars = Array.from({ length: 5 }, (_, i) => i < (product.review || 0));

  return { discountedPrice, oldPrice, stars };
}