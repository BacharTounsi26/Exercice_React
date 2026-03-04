// src/features/product/api/fetchProductById.ts
import type { Product } from "@/shared/types/Product";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) throw new Error(`Produit #${id} introuvable (${res.status})`);
  return res.json();
}