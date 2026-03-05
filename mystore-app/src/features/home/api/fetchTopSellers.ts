import type { Product } from "@/shared/types/Product";
import { API_URL } from "@/shared/utils/apiBase";

export async function fetchTopSellers(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products?isTopSeller=true`);
  if (!res.ok) throw new Error("Failed to load top sellers");
  return res.json();
}