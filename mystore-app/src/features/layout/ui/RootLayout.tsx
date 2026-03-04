// src/features/layout/ui/RootLayout.tsx
// Enveloppe globale présente sur TOUTES les pages.
// ─ Charge les catégories une seule fois (pas de re-fetch au changement de page)
// ─ Détecte la catégorie active depuis l'URL pour surligner la Navbar
// ─ Synchronise la recherche globale du Header avec ShopPage via URL

import { Outlet, useLocation }  from "react-router-dom";
import { useState, useEffect }  from "react";
import { fetchCategories }      from "@/features/layout/api/fetchCategories";
import type { Category }        from "@/shared/types/Category";
import Header                   from "./Header";
import Navbar                   from "./Navbar";
import Footer                   from "./Footer";

export default function RootLayout() {
  const [categories, setCategories] = useState<Category[]>([]);
  const location = useLocation();

  // Chargement unique — stale-while-revalidate simplifié
  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  // Active category depuis l'URL : /shop/:categoryId → categoryId
  const activeCategoryId = (() => {
    const m = location.pathname.match(/^\/shop\/(.+)$/);
    return m ? m[1] : undefined;
  })();

  // Remonte en haut à chaque changement de page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <Navbar categories={categories} activeCategoryId={activeCategoryId} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}