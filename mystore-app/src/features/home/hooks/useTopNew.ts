
import { useEffect, useState } from "react";
import { fetchTopNew } from "../api/fetchTopNew";
import type { Product } from "../../../shared/types/Product";

export function useTopNew() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchTopNew()
      .then((data) => alive && setProducts(data))
      .finally(() => alive && setLoading(false));

    return () => { alive = false };
  }, []);

  return { products, loading };
}