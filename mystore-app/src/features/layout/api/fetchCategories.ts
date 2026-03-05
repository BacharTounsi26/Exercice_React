import type { Category } from "src/shared/types/Category";
import { API_URL } from "@/shared/utils/apiBase";


export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) {
    throw new Error("Error loading categories");
  }
  return res.json() as Promise<Category[]>;
}