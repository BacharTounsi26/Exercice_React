// src/features/cart/api/updateCart.ts
// PUT /carts/:id — sauvegarde l'état complet du panier côté serveur.

import type { Cart } from "@/shared/types/Cart";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function updateCart(cart: Cart): Promise<Cart> {
  const res = await fetch(`${BASE}/carts/${cart.id}`, {
    method:  "PUT",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(cart),
  });

  if (!res.ok) throw new Error(`updateCart: ${res.status}`);
  return res.json();
}