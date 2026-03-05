import { API_URL } from "@/shared/utils/apiBase";

export type Slide = {
  id: number;
  image: string;
  title?: string;
  subtitle?: string;
};

export async function fetchSlides(): Promise<Slide[]> {
  const res = await fetch(`${API_URL}/slides`);
  if (!res.ok) throw new Error("Failed to load slides");
  return res.json();
}