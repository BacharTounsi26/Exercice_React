
import { useState, useEffect, useCallback } from "react";
import { fetchProducts }                    from "../api/fetchProducts";
import type { Product }                     from "@/shared/types/Product";

const LIMIT = 12;

export type SortOption =
  | ""
  | "price_asc"
  | "price_desc"
  | "review_desc"
  | "name_asc"
  | "discountRate_desc";

// Mapping option → paramètres API json-server
const SORT_MAP: Record<SortOption, { _sort?: string; _order?: "asc" | "desc" }> = {
  "":                   {},
  price_asc:            { _sort: "price",        _order: "asc"  },
  price_desc:           { _sort: "price",        _order: "desc" },
  review_desc:          { _sort: "review",       _order: "desc" },
  name_asc:             { _sort: "name",         _order: "asc"  },
  discountRate_desc:    { _sort: "discountRate", _order: "desc" },
};

export function useShop(categoryId: string | undefined, initialQuery = "") {
  const [products,    setProducts]    = useState<Product[]>([]);
  const [totalCount,  setTotalCount]  = useState(0);
  const [isLoading,   setIsLoading]   = useState(false);
  const [error,       setError]       = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortOption,  setSortOption]  = useState<SortOption>("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalCount / LIMIT) || 0;

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const sortParams = SORT_MAP[sortOption];
      const result = await fetchProducts({
        categoryId,
        q: searchQuery,
        _page: currentPage,
        _limit: LIMIT,
        ...sortParams,
      });
      setProducts(result.products);
      setTotalCount(result.totalCount);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error.");
      setProducts([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, searchQuery, sortOption, currentPage]);

  useEffect(() => { load(); }, [load]);

  // Revenir page 1 si catégorie, recherche ou tri changent
  useEffect(() => { setCurrentPage(1); }, [categoryId, searchQuery, sortOption]);

  // ── Handlers (useCallback pour éviter re-renders des enfants) ─────────────
  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  const handleSort = useCallback((o: SortOption) => {
    setSortOption(o);
  }, []);

  const handlePageChange = useCallback((p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return {
    products, totalCount, totalPages, isLoading, error,
    searchQuery, sortOption, currentPage,
    setSearchQuery,    // exposé pour sync avec URL ?q=
    handleSearch, handleSort, handlePageChange,
  };
}