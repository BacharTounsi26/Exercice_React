// src/App.tsx
import { useState } from "react";

// --------- LAYOUT COMPONENTS ---------
import Header from "./features/layout/ui/Header";
import Navbar from "./features/layout/ui/Navbar";
import Breadcrumb from "./features/layout/ui/Breadcrumb";
import Footer from "./features/layout/ui/Footer";

// --------- HOME COMPONENTS ---------
import HeroSlider from "./features/home/ui/HeroSlider";
import PromoStrip from "./features/home/ui/PromoStrip";
import BrandStrip from "./features/home/ui/BrandStrip";
import ProductWidgetSection from "./features/home/ui/ProductWidgetSection";

// --------- LOGIC (HOOKS) ---------
import { useCategories } from "./features/layout/hooks/useCategories";
import { useSlides } from "./features/home/hooks/useSlides";
import { useTopSellers } from "./features/home/hooks/useTopSellers";
import { useTopNew } from "./features/home/hooks/useTopNew";

export default function App() {
  // ----------------- LOAD DATA -----------------
  const { categories, loading: catLoading, error: catError } = useCategories();
  const { slides, loading: slidesLoading } = useSlides();
  const { products: topSellers, loading: tsLoading } = useTopSellers();
  const { products: topNew, loading: tnLoading } = useTopNew();

  // ----------------- PAGE STATE -----------------
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(undefined);

  // ----------------- SEARCH HANDLER (Header) -----------------
  const handleSearch = (q: string) => {
    console.log("SEARCH:", q);
  };

  // ----------------- BREADCRUMB -----------------
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: activeCategoryId || "All categories" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* ---------------- HEADER ---------------- */}
      <Header
        onSearch={handleSearch}
        cartAmount={150.90}
        cartCount={3}
        onCartClick={() => console.log("Cart clicked")}
        onLogoClick={() => setActiveCategoryId(undefined)}
        logoSrc="/logo.png"
        brandName="MyStore"
        brandTagline="BEST ELECTRONICS ONLINE"
      />

      {/* ---------------- NAVBAR ---------------- */}
      {catLoading && (
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-500">
          Chargement des catégories…
        </div>
      )}
      {catError && (
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-red-600">
          Impossible de charger les catégories.
        </div>
      )}
      {!catLoading && !catError && (
        <Navbar
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelect={setActiveCategoryId}
          showHome={true}
        />
      )}

      {/* ---------------- BREADCRUMB ---------------- */}
      <Breadcrumb items={breadcrumbItems} />

      {/* ---------------- MAIN CONTENT (HOMEPAGE) ---------------- */}
      <main className="flex-1 mx-auto max-w-7xl px-4 py-10">
        {/* SLIDER */}
        {slidesLoading ? (
          <div className="h-64 bg-slate-200 animate-pulse rounded"></div>
        ) : (
          <HeroSlider slides={slides} />
        )}

        {/* PROMO STRIP */}
        <PromoStrip />

        {/* BRAND STRIP (using categories) */}
        <BrandStrip categories={categories} />

        {/* PRODUCT WIDGETS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
          <ProductWidgetSection
            title="Top Sellers"
            products={tsLoading ? [] : topSellers}
          />

          <ProductWidgetSection
            title="New Arrivals"
            products={tnLoading ? [] : topNew}
          />

          {/* Recently Viewed (empty for now — will be dynamic later) */}
          <ProductWidgetSection
            title="Recently Viewed"
            products={[]} 
          />
        </div>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <Footer />
    </div>
  );
}