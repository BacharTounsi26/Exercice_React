
import { useEffect, useState } from "react";
import { fetchSlides, type Slide } from "../api/fetchSlides";

export function useSlides() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetchSlides()
      .then((data) => alive && setSlides(data))
      .finally(() => alive && setLoading(false));
    return () => { alive = false };
  }, []);

  return { slides, loading };
}