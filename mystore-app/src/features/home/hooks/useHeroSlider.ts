import { useState, useEffect } from "react";

export function useHeroSlider(length: number, intervalTime = 4000) {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    if (length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [length, intervalTime]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  return {
    current,
    next,
    prev,
  };
}