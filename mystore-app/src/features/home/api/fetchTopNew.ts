// src/features/home/api/fetchTopNew.ts
import type { Product } from "@/shared/types/Product";

const API = "http://localhost:3001";

export async function fetchTopNew(): Promise<Product[]> {
  const res = await fetch(`${API}/products?isNewProduct=true`);
  if (!res.ok) throw new Error("Failed to load top new products");
  return res.json();
}