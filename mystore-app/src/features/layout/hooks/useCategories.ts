import { useEffect, useState } from "react";
import type { Category } from "@/shared/types/Category";
import { fetchCategories } from "../api/fetchCategories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCategories();
        setCategories(data);
      } catch {
        setError("Unable to load categories");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { categories, loading, error };
}