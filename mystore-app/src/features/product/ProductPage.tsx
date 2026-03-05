
import { useParams }              from "react-router-dom";
import { useEffect, useMemo, useState }    from "react";
import { useProduct }             from "./hooks/useProduct";
import { useRecentlyViewed }      from "@/shared/hooks/useRecentlyViewed";
import { useCart }                from "@/features/cart/hooks/useCart";
import { fetchCategories }        from "@/features/layout/api/fetchCategories";
import Breadcrumb                 from "@/features/layout/ui/Breadcrumb";
import ProductGallery             from "./ui/ProductGallery";
import ProductInfo                from "./ui/ProductInfo";
import ProductDescription         from "./ui/ProductDescription";
import ProductWidgetSection       from "@/features/home/ui/ProductWidgetSection";
import OtherBrands                from "./ui/OtherBrands";
import type { Product }           from "@/shared/types/Product";
import type { Category }          from "@/shared/types/Category";

function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 animate-pulse">
      <div className="h-4 w-48 bg-slate-200 rounded mb-8" />
      <div className="flex gap-6">
        <div className="hidden lg:flex flex-col gap-4 w-52 flex-shrink-0">
          <div className="h-40 bg-slate-100 rounded-2xl" />
          <div className="h-48 bg-slate-100 rounded-2xl" />
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-slate-100 rounded-2xl h-96" />
          <div className="space-y-4">
            <div className="h-4 w-24 bg-slate-100 rounded" />
            <div className="h-8 w-3/4 bg-slate-200 rounded" />
            <div className="h-10 w-48 bg-slate-200 rounded" />
            <div className="h-11 w-full bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductError({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-700 mb-2">Product not found</h2>
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  );
}

export default function ProductPage() {
  const { id }                               = useParams<{ id: string }>();
  const { product, isLoading, error }        = useProduct(id);
  const { products: recentlyViewed, addProduct } = useRecentlyViewed();
  const { add }                              = useCart();   // ← useCart au lieu de dispatch brut
  const [categories, setCategories]          = useState<Category[]>([]);

  useEffect(() => {
    if (!product) return;
    const timer = setTimeout(() => addProduct(product), 50);
    return () => clearTimeout(timer);
  }, [product?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  if (isLoading) return <ProductSkeleton />;
  if (error || !product) return <ProductError message={error ?? "Product not found."} />;

  const recentFiltered = useMemo(
    () => recentlyViewed.filter((p) => p.id !== product.id),
    [recentlyViewed, product.id]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb
        category={{ id: product.categoryId, name: product.categoryName }}
        product={product.name}
        className="mb-6"
      />

      <div className="flex gap-6 items-start">
        <aside className="hidden lg:flex flex-col gap-4 w-52 flex-shrink-0 sticky top-4">
          {recentFiltered.length > 0 && (
            <ProductWidgetSection title="Recently Viewed" products={recentFiltered} />
          )}
          <OtherBrands categories={categories} currentCategoryId={product.categoryId} />
        </aside>

        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <ProductGallery
              imageName={product.imageName}
              categoryName={product.categoryName}
              productName={product.name}
            />
            {/* onAddToCart appelle useCart().add() — attend que le panier soit prêt */}
            <ProductInfo
              product={product}
              onAddToCart={(p: Product, qty: number) => add(p, qty)}
            />
          </div>

          <ProductDescription product={product} />

          {recentFiltered.length > 0 && (
            <div className="lg:hidden mt-8">
              <ProductWidgetSection title="Recently Viewed" products={recentFiltered} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}