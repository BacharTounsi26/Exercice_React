// src/features/cart/api/createCart.ts
// POST /carts — crée un nouveau panier vide et retourne son id.

import type { Cart } from "@/shared/types/Cart";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function createCart(): Promise<Cart> {
  const newCart: Omit<Cart, "id"> = {
    items:    [],
    subTotal: 0,
    tax:      0,
    total:    0,
  };

  const res = await fetch(`${BASE}/carts`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(newCart),
  });

  if (!res.ok) throw new Error(`createCart: ${res.status}`);
  return res.json();
}