import { useEffect, useState } from "react";
import type { Product } from "@/shared/types/Product";

const STORAGE_KEY = "recently_viewed";

export function useRecentlyViewed(allProducts: Product[]) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedIds = localStorage.getItem(STORAGE_KEY);
    if (!storedIds) return;

    const ids: string[] = JSON.parse(storedIds);

    const productMap = new Map(
      allProducts.map((p) => [p.id, p])
    );

    const products = ids
      .map((id) => productMap.get(Number(id)))
      .filter(Boolean) as Product[];

    setRecentProducts(products);
  }, [allProducts]);

  return recentProducts;
}