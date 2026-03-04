/*import { useState, useEffect } from "react";

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
}*/
// src/features/home/hooks/useHeroSlider.ts
import { useState, useEffect, useCallback } from "react";

export function useHeroSlider(total: number, autoPlayMs = 5000) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const goTo = useCallback((i: number) => setCurrent(i), []);

  // Auto-play — s'arrête si total = 0
  useEffect(() => {
    if (total === 0) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [next, total, autoPlayMs]);

  return { current, next, prev, goTo };
}