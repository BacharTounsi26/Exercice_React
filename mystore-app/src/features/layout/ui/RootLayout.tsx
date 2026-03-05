
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