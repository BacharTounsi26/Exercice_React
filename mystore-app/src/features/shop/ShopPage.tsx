
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect }                  from "react";
import { useShop }                    from "./hooks/useShop";
import Breadcrumb                     from "@/features/layout/ui/Breadcrumb";
import SortBar                        from "./ui/SortBar";
import ProductGrid                    from "./ui/ProductGrid";
import Pagination                     from "./ui/Pagination";
import PageHeader                     from "@/shared/ui/PageHeader";

export default function ShopPage() {
  const { categoryId }     = useParams<{ categoryId?: string }>();
  const [searchParams]     = useSearchParams();
  const qParam             = searchParams.get("q") ?? "";

  const {
    products, totalCount, totalPages, isLoading, error,
    searchQuery, sortOption, currentPage,
    setSearchQuery, handleSort, handlePageChange,
  } = useShop(categoryId, qParam);

  // Sync avec ?q= venant de la barre de recherche globale du Header
  useEffect(() => {
    if (qParam !== searchQuery) setSearchQuery(qParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qParam]);

  // Catégorie active pour le Breadcrumb (disponible dès les premiers produits chargés)
  const categoryItem = categoryId && products.length > 0
    ? { id: products[0].categoryId, name: products[0].categoryName }
    : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">

      {/* Fil d'Ariane */}
      <Breadcrumb category={categoryItem} className="mb-5" />

      {/* Titre + compteur */}
      <PageHeader
        title={categoryItem?.name ?? "All products"}
        subtitle={
          searchQuery
            ? <>{totalCount} result{totalCount > 1 ? "s" : ""} for <strong className="text-slate-700">"{searchQuery}"</strong></>
            : <>{totalCount} product{totalCount > 1 ? "s" : ""}</>
        }
      />

      {/* Tri */}
      <SortBar
        sortOption={sortOption}
        totalCount={totalCount}
        onSort={handleSort}
      />

      {/* Grille */}
      <ProductGrid products={products} isLoading={isLoading} error={error} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}