



import type { Product } from "@/shared/types/Product";

const API_BASE = "http://localhost:3001";

export type FetchProductsParams = {
  q?: string;
  categoryId?: string;
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";
};

export type FetchProductsResult = {
  products: Product[];
  totalCount: number;   // header X-Total-Count
};

/*export async function fetchProducts(
  params: FetchProductsParams = {}
) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`${API_BASE}/products?${query.toString()}`);

  if (!res.ok) throw new Error("Erreur chargement produits");

  const data = (await res.json()) as Product[];
  const totalCount = Number(
    res.headers.get("X-Total-Count") || data.length
  );

  return { data, totalCount };
}
*/
export async function fetchProducts(params: FetchProductsParams): Promise<FetchProductsResult> {
  const url = new URL(`${API_BASE}/products`);

  if (params.categoryId)           url.searchParams.set("categoryId", params.categoryId);
  if (params.q?.trim())            url.searchParams.set("q", params.q.trim());
  if (params._sort) {
    url.searchParams.set("_sort",  params._sort);
    url.searchParams.set("_order", params._order ?? "asc");
  }
  url.searchParams.set("_page",  String(params._page));
  url.searchParams.set("_limit", String(params._limit));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`fetchProducts: ${res.status}`);

  return {
    products:   await res.json(),
    totalCount: Number(res.headers.get("X-Total-Count") ?? 0),
  };
}