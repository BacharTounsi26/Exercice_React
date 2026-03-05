// src/features/home/pages/TopSellersPage.tsx
import { useTopSellers }    from "../hooks/useTopSellers";
import ProductListPage      from "./ProductListPage";

export default function TopSellersPage() {
  const { products, loading } = useTopSellers();

  return (
    <ProductListPage
      title="Top Sellers"
      badge="🔥"
      products={products}
      isLoading={loading}
      error={undefined}
    />
  );
}