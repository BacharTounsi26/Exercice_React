import type { Category } from "src/shared/types/Category";


const API_BASE = "http://localhost:3001";

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) {
    throw new Error("Erreur lors du chargement des catégories");
  }
  return res.json() as Promise<Category[]>;
}