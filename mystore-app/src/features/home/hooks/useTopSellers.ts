
import { useEffect, useState } from "react";
import { fetchTopSellers } from "../api/fetchTopSellers";
import type { Product } from "../../../shared/types/Product";

export function useTopSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchTopSellers()
      .then((data) => alive && setProducts(data))
      .finally(() => alive && setLoading(false));

    return () => { alive = false };
  }, []);

  return { products, loading };
}