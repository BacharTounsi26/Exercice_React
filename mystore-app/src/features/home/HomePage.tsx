// src/features/home/HomePage.tsx
import { useSlides } from "./hooks/useSlides";
import { useTopSellers } from "./hooks/useTopSellers";
import { useTopNew } from "./hooks/useTopNew";
import HeroSlider from "./ui/HeroSlider";
import PromoStrip from "./ui/PromoStrip";
import BrandStrip from "./ui/BrandStrip";
import ProductWidgetSection from "./ui/ProductWidgetSection";
import { useCategories } from "../layout/hooks/useCategories";

export default function HomePage() {
  const { slides } = useSlides();
  const { products: topSellers } = useTopSellers();
  const { products: topNew } = useTopNew();
  const { categories } = useCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <HeroSlider slides={slides} />
      <PromoStrip />
      <BrandStrip categories={categories} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
        <ProductWidgetSection title="Top Sellers" products={topSellers} />
        <ProductWidgetSection title="New Arrivals" products={topNew} />
        <ProductWidgetSection title="Recently Viewed" products={[]} />
      </div>
    </div>
  );
}