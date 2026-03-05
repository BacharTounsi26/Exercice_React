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

  const { slides, loading: slidesLoading }               = useSlides();
  const { products: topSellers, loading: topSellersLoading } = useTopSellers();
  const { products: topNew, loading: topNewLoading }     = useTopNew();
  const { categories, loading: categoriesLoading }       = useCategories();
  const { products: recentlyViewed } = useRecentlyViewed();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <HeroSlider slides={slides} loading={slidesLoading} />
      <PromoStrip />
      <BrandStrip categories={categories} loading={categoriesLoading} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        <ProductWidgetSection
          title="Top Sellers"
          products={topSellers}
          loading={topSellersLoading}
          onViewAll={() => navigate("/top-sellers")}
        />
        <ProductWidgetSection
          title="New Arrivals"
          products={topNew}
          loading={topNewLoading}
          onViewAll={() => navigate("/new-arrivals")}
        />
        <ProductWidgetSection
          title="Recently Viewed"
          products={recentlyViewed}
          loading={false}
          onViewAll={recentlyViewed.length > 0 ? () => navigate("/recently-viewed") : undefined}
        />
      </div>
    </div>
  );
}