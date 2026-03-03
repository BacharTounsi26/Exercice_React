import type { Product } from "@/shared/types/Product";

const API = "http://localhost:3001";

export async function fetchTopSellers(): Promise<Product[]> {
  const res = await fetch(`${API}/products?isTopSeller=true`);
  if (!res.ok) throw new Error("Failed to load top sellers");
  return res.json();
}