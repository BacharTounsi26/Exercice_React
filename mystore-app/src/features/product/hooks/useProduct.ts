
import { useState, useEffect } from "react";
import { fetchProductById }    from "../api/fetchProductById";
import type { Product }        from "@/shared/types/Product";

export function useProduct(id: string | undefined) {
  const [product,   setProduct]   = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing product identifier.");
      setIsLoading(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    fetchProductById(id)
      .then((data) => { if (!cancelled) setProduct(data); })
      .catch((e)   => { if (!cancelled) setError(e instanceof Error ? e.message : "Error."); })
      .finally(()  => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  return { product, isLoading, error };
}