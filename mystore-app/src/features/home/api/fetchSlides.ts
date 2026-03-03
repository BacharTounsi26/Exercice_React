const API = "http://localhost:3001";

export type Slide = {
  id: number;
  image: string;
  title?: string;
  subtitle?: string;
};

export async function fetchSlides(): Promise<Slide[]> {
  const res = await fetch(`${API}/slides`);
  if (!res.ok) throw new Error("Failed to load slides");
  return res.json();
}