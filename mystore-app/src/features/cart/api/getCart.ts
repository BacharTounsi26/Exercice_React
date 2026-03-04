// src/features/cart/api/getCart.ts
// GET /carts/:id — retourne le panier ou null si non trouvé (404).

import type { Cart } from "@/shared/types/Cart";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function getCart(id: string): Promise<Cart | null> {
  const res = await fetch(`${BASE}/carts/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`getCart: ${res.status}`);
  return res.json();
}