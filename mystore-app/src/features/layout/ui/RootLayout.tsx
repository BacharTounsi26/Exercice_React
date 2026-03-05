
import { Outlet, useLocation }  from "react-router-dom";
import { useEffect }  from "react";
import { useCategories }        from "@/features/layout/hooks/useCategories";
import Header                   from "./Header";
import Navbar                   from "./Navbar";
import Footer                   from "./Footer";

export default function RootLayout() {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const location = useLocation();

  // Active category depuis l'URL : /shop/:categoryId → categoryId
  const activeCategoryId = (() => {
    const m = location.pathname.match(/^\/shop\/(.+)$/);
    return m ? m[1] : undefined;
  })();

  const isShopPath = location.pathname === "/shop";

  // Remonte en haut à chaque changement de page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      <Navbar
        categories={categories}
        loading={categoriesLoading}
        error={categoriesError}
        activeCategoryId={activeCategoryId}
        isShopPath={isShopPath}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}