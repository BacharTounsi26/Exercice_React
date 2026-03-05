
import { useEffect, useState }    from "react";
import { useCart }                 from "./hooks/useCart";
import { fetchTopSellers }         from "@/features/home/api/fetchTopSellers";
import Breadcrumb                  from "@/features/layout/ui/Breadcrumb";
import CartTable                   from "./ui/CartTable";
import CartSummary                 from "./ui/CartSummary";
import EmptyCart            from "./ui/EmptyCart";
import type { Product }            from "@/shared/types/Product";

// ── Skeleton ────────────────────────────────────────────────────────────────
function CartSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 animate-pulse">
      <div className="h-4 w-32 bg-slate-200 rounded mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-100 rounded-2xl h-64" />
        <div className="bg-slate-100 rounded-2xl h-48" />
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function CartPage() {
  const {
    items, subTotal, tax, total,
    isEmpty, isSyncing, status,
    update, remove,
  } = useCart();

  const [crossSells, setCrossSells] = useState<Product[]>([]);

  // Charge quelques produits suggérés pour la section "Vous aimerez aussi"
  useEffect(() => {
    fetchTopSellers().then((products) => setCrossSells(products.slice(0, 3))).catch(() => {});
  }, []);

  if (status === "loading") return <CartSkeleton />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">

      {/* ── Fil d'Ariane ─────────────────────────────────────────────────── */}
      <Breadcrumb
        category={{ id: "cart", name: "Cart" }}
        className="mb-6"
      />

      {/* ── Titre + Compteur ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-slate-800">
          My Cart
        </h1>
        {!isEmpty && (
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">
            {items.length}
          </span>
        )}
        {isSyncing && (
          <svg className="w-4 h-4 text-indigo-400 animate-spin ml-1" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        )}
      </div>

      {/* ── Contenu ──────────────────────────────────────────────────────── */}
      {isEmpty ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Tableau (2/3 de la largeur) */}
          <div className="lg:col-span-2">
            <CartTable
              items={items}
              isSyncing={isSyncing}
              onUpdate={update}
              onRemove={remove}
            />
          </div>

          {/* Résumé + Cross-sells (1/3) */}
          <div className="sticky top-4">
            <CartSummary
              subTotal={subTotal}
              tax={tax}
              total={total}
              isSyncing={isSyncing}
              crossSells={crossSells}
            />
          </div>

        </div>
      )}
    </div>
  );
}