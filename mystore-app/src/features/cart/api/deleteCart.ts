// src/features/cart/api/deleteCart.ts
// DELETE /carts/:id — supprime le panier du serveur.

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function deleteCart(id: string): Promise<void> {
  const res = await fetch(`${BASE}/carts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`deleteCart: ${res.status}`);
}