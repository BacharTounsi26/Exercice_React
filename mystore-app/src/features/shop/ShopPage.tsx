// src/features/shop/ShopPage.tsx

/*import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useShop } from "./hooks/useShop";
import Breadcrumb from "@/features/layout/ui/Breadcrumb";
import PageTitle from "./ui/PageTitle";
import SortBar from "./ui/SortBar";
import ProductGrid from "./ui/ProductGrid";
import Pagination from "./ui/Pagination";

export default function ShopPage() {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get("q") ?? "";

  const {
    products,
    totalCount,
    totalPages,
    isLoading,
    error,
    searchQuery,
    sortOption,
    currentPage,
    setSearchQuery,
    handleSearch,
    handleSort,
    handlePageChange,
  } = useShop(categoryId);

  // Sync avec ?q=
  useEffect(() => {
    if (qParam !== searchQuery) setSearchQuery(qParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qParam]);

  const categoryItem =
    categoryId && products.length > 0
      ? { id: products[0].categoryId, name: products[0].categoryName }
      : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      
      <Breadcrumb category={categoryItem} className="mb-5" />

      {/* 🔥 Nouveau composant }
      <PageTitle title={categoryItem?.name ?? "Tous les produits"} />

      {/* Compteur dynamique }
      <p className="text-sm text-slate-500 mb-6">
        {searchQuery ? (
          <>
            {totalCount} résultat{totalCount > 1 ? "s" : ""} pour{" "}
            <strong className="text-slate-700">"{searchQuery}"</strong>
          </>
        ) : (
          <>
            {totalCount} produit{totalCount > 1 ? "s" : ""}
          </>
        )}
      </p>

      <SortBar
        searchQuery={searchQuery}
        sortOption={sortOption}
        totalCount={totalCount}
        onSearch={handleSearch}
        onSort={handleSort}
      />

      <ProductGrid products={products} isLoading={isLoading} error={error} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}*/

// src/features/shop/ShopPage.tsx
// Page orchestratrice — ZÉRO logique, ZÉRO fetch, ZÉRO useEffect.
// Synchronise le ?q= URL param venant de la recherche globale Header.

import { useParams, useSearchParams } from "react-router-dom";
import { useEffect }                  from "react";
import { useShop }                    from "./hooks/useShop";
import Breadcrumb                     from "@/features/layout/ui/Breadcrumb";
import SortBar                        from "./ui/SortBar";
import ProductGrid                    from "./ui/ProductGrid";
import Pagination                     from "./ui/Pagination";

export default function ShopPage() {
  const { categoryId }     = useParams<{ categoryId?: string }>();
  const [searchParams]     = useSearchParams();
  const qParam             = searchParams.get("q") ?? "";

  const {
    products, totalCount, totalPages, isLoading, error,
    searchQuery, sortOption, currentPage,
    setSearchQuery, handleSort, handlePageChange,
  } = useShop(categoryId);

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
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-slate-800">
          {categoryItem?.name ?? "Tous les produits"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {searchQuery
            ? <>{totalCount} résultat{totalCount > 1 ? "s" : ""} pour <strong className="text-slate-700">"{searchQuery}"</strong></>
            : <>{totalCount} produit{totalCount > 1 ? "s" : ""}</>
          }
        </p>
      </div>

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