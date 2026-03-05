// src/features/home/HomePage.tsx
import { useNavigate }           from "react-router-dom";
import { useSlides }             from "./hooks/useSlides";
import { useTopSellers }         from "./hooks/useTopSellers";
import { useTopNew }             from "./hooks/useTopNew";
import { useCategories }         from "../layout/hooks/useCategories";
import { useRecentlyViewed }     from "@/shared/hooks/useRecentlyViewed";
import HeroSlider                from "./ui/HeroSlider";
import PromoStrip                from "./ui/PromoStrip";
import BrandStrip                from "./ui/BrandStrip";
import ProductWidgetSection      from "./ui/ProductWidgetSection";

export default function HomePage() {
  const navigate = useNavigate();

  const { slides }                   = useSlides();
  const { products: topSellers }     = useTopSellers();
  const { products: topNew }         = useTopNew();
  const { categories }               = useCategories();
  const { products: recentlyViewed } = useRecentlyViewed();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <HeroSlider slides={slides} />
      <PromoStrip />
      <BrandStrip categories={categories} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        <ProductWidgetSection
          title="Top Sellers"
          products={topSellers}
          onViewAll={() => navigate("/top-sellers")}
        />
        <ProductWidgetSection
          title="New Arrivals"
          products={topNew}
          onViewAll={() => navigate("/new-arrivals")}
        />
        <ProductWidgetSection
          title="Recently Viewed"
          products={recentlyViewed}
          onViewAll={recentlyViewed.length > 0 ? () => navigate("/recently-viewed") : undefined}
        />
      </div>
    </div>
  );
}