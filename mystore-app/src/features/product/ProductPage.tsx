// src/features/product/ProductPage.tsx
import { useParams }              from "react-router-dom";
import { useEffect, useState }    from "react";
import { useProduct }             from "./hooks/useProduct";
import { useRecentlyViewed }      from "@/shared/hooks/useRecentlyViewed";
import { fetchCategories }        from "@/features/layout/api/fetchCategories";
import Breadcrumb                 from "@/features/layout/ui/Breadcrumb";
import ProductGallery             from "./ui/ProductGallery";
import ProductInfo                from "./ui/ProductInfo";
import ProductDescription         from "./ui/ProductDescription";
import ProductWidgetSection       from "@/features/home/ui/ProductWidgetSection";
import OtherBrands                from "./ui/OtherBrands";
import { useAppDispatch }            from "@/shared/hooks/useAppStore";
import { addItem }                    from "@/features/cart/state/CartSlice";
import type { Product }               from "@/shared/types/Product";
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
      <h2 className="text-xl font-bold text-slate-700 mb-2">Produit introuvable</h2>
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  );
}

export default function ProductPage() {
  const { id }                                   = useParams<{ id: string }>();
  const { product, isLoading, error }            = useProduct(id);
  const dispatch                                = useAppDispatch();
  const { products: recentlyViewed, addProduct } = useRecentlyViewed();
  const [categories, setCategories]              = useState<Category[]>([]);

  // Enregistre le produit visité après le rendu initial
  // Le délai garantit que recentlyViewed est lu depuis localStorage AVANT l'écriture
  useEffect(() => {
    if (!product) return;
    const timer = setTimeout(() => addProduct(product), 50);
    return () => clearTimeout(timer);
  }, [product?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Charge les catégories pour Other Brands
  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  if (isLoading) return <ProductSkeleton />;
  if (error || !product) return <ProductError message={error ?? "Produit introuvable."} />;

  // Exclure le produit courant — on affiche les autres visites précédentes
  const recentFiltered = recentlyViewed.filter((p) => p.id !== product.id);

  function handleAddToCart(p: Product, qty: number) {
    console.log("Add to cart:", p.id, "×", qty);
    dispatch(addItem({ product: p, qty }));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">

      <Breadcrumb
        category={{ id: product.categoryId, name: product.categoryName }}
        product={product.name}
        className="mb-6"
      />

      <div className="flex gap-6 items-start">

        {/* Sidebar — desktop uniquement */}
        <aside className="hidden lg:flex flex-col gap-4 w-56 flex-shrink-0 sticky top-4">

          {/* Recently Viewed — même composant que HomePage */}
          <ProductWidgetSection
            title="Recently Viewed"
            products={recentFiltered}
          />

          {/* Other Brands */}
          <OtherBrands
            categories={categories}
            currentCategoryId={product.categoryId}
          />
        </aside>

        {/* Contenu principal */}
        <div className="flex-1 min-w-0">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <ProductGallery
              imageName={product.imageName}
              categoryName={product.categoryName}
              productName={product.name}
            />
            <ProductInfo
              product={product}
              onAddToCart={handleAddToCart}
            />
          </div>

          <ProductDescription product={product} />

          {/* Recently Viewed mobile */}
          {recentFiltered.length > 0 && (
            <div className="lg:hidden mt-8">
              <ProductWidgetSection
                title="Recently Viewed"
                products={recentFiltered}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}