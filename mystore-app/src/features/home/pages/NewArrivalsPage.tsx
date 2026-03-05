// src/features/home/pages/NewArrivalsPage.tsx
import { useTopNew }        from "../hooks/useTopNew";
import ProductListPage      from "./ProductListPage";

export default function NewArrivalsPage() {
  const { products, loading } = useTopNew();

  return (
    <ProductListPage
      title="New Arrivals"
      badge="✨"
      products={products}
      isLoading={loading}
    />
  );
}