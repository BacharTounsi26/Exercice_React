// src/features/home/api/fetchTopNew.ts
import type { Product } from "@/shared/types/Product";
import { API_URL } from "@/shared/utils/apiBase";

export async function fetchTopNew(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products?isNewProduct=true`);
  if (!res.ok) throw new Error("Failed to load top new products");
  return res.json();
}