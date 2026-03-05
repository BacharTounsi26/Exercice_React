
import type { Product } from "@/shared/types/Product";
import { API_URL } from "@/shared/utils/apiBase";

export async function fetchProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Product #${id} not found (${res.status})`);
  return res.json();
}