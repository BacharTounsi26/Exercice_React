
import { useState, useEffect, useCallback, useRef } from "react";
import type { Product } from "@/shared/types/Product";

const STORAGE_KEY = "recently_viewed";
const MAX_ITEMS   = 5;

function readFromStorage(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function writeToStorage(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {}
}

export function useRecentlyViewed() {
  const [products, setProducts] = useState<Product[]>(readFromStorage);
  // Ref pour éviter de re-enregistrer le même produit plusieurs fois
  const lastAddedId = useRef<number | null>(null);

  // Synchronise depuis localStorage au montage
  useEffect(() => {
    setProducts(readFromStorage());
  }, []);

  const addProduct = useCallback((product: Product) => {
    // Évite d'appeler setProducts si c'est déjà le dernier produit ajouté
    if (lastAddedId.current === product.id) return;
    lastAddedId.current = product.id;

    setProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const next     = [product, ...filtered].slice(0, MAX_ITEMS);
      writeToStorage(next);
      return next;
    });
  }, []);

  return { products, addProduct };
}