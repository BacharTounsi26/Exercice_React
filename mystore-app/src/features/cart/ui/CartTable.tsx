// src/features/cart/ui/CartTable.tsx
// Tableau principal du panier : en-têtes + lignes produits + bouton Checkout.

import { memo }             from "react";
import { useNavigate }      from "react-router-dom";
import CartItemRow          from "./CartItem";
import type { CartItem }    from "@/shared/types/CartItem";

interface CartTableProps {
  items:      CartItem[];
  isSyncing:  boolean;
  onUpdate:   (id: number, qty: number) => void;
  onRemove:   (id: number) => void;
}

const CartTable = memo(function CartTable({ items, isSyncing, onUpdate, onRemove }: CartTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

      {/* ── Indicateur de sync ───────────────────────────────────────── */}
      {isSyncing && (
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border-b border-indigo-100">
          <svg className="w-3 h-3 text-indigo-500 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          <span className="text-xs text-indigo-600 font-medium">Mise à jour en cours…</span>
        </div>
      )}

      {/* ── Tableau ──────────────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="py-3 px-3 w-10" />
              <th className="py-3 px-3 w-24 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Photo
              </th>
              <th className="py-3 px-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Produit
              </th>
              <th className="py-3 px-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Prix
              </th>
              <th className="py-3 px-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Quantité
              </th>
              <th className="py-3 px-3 text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdate={onUpdate}
                onRemove={onRemove}
                isSyncing={isSyncing}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Bouton Checkout ──────────────────────────────────────────── */}
      <div className="flex justify-end px-4 py-4 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={() => navigate("/checkout")}
          disabled={isSyncing}
          className="
            px-8 py-3 rounded-xl font-semibold text-sm text-white
            bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800
            disabled:bg-slate-300 disabled:cursor-not-allowed
            transition-colors shadow-md hover:shadow-lg
            flex items-center gap-2
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          Passer la commande
        </button>
      </div>
    </div>
  );
});

export default CartTable;