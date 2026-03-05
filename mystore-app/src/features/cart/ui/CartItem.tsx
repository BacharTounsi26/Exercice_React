
import { memo, useCallback }   from "react";
import { Link }                from "react-router-dom";
import { productImagePath }    from "@/shared/utils/productImagePath";
import Button                  from "@/shared/ui/Button";
import type { CartItem as CartItemType } from "@/shared/types/CartItem";

interface CartItemProps {
  item:       CartItemType;
  onUpdate:   (id: number, qty: number) => void;
  onRemove:   (id: number) => void;
  isSyncing:  boolean;
}

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f1f5f9'/%3E%3Cpath d='M20 28h40v26H20z' fill='%23cbd5e1'/%3E%3C/svg%3E";

const CartItem = memo(function CartItem({ item, onUpdate, onRemove, isSyncing }: CartItemProps) {
  const lineTotal = +(item.price * item.qty).toFixed(2);

  const dec = useCallback(() => {
    if (item.qty > 1) onUpdate(item.id, item.qty - 1);
  }, [item.id, item.qty, onUpdate]);

  const inc = useCallback(() => {
    if (item.qty < 99) onUpdate(item.id, item.qty + 1);
  }, [item.id, item.qty, onUpdate]);

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">

      {/* ── Supprimer ─────────────────────────────────────────────────── */}
      <td className="py-4 px-3 w-10">
        <Button
          onClick={() => onRemove(item.id)}
          disabled={isSyncing}
          aria-label="Remove"
          variant="dangerGhost"
          size="none"
          radius="full"
          className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
        >
          ×
        </Button>
      </td>

      {/* ── Image ─────────────────────────────────────────────────────── */}
      <td className="py-4 px-3 w-24">
        <Link to={`/product/${item.id}`}>
          <div className="w-16 h-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center overflow-hidden hover:border-indigo-200 transition-colors">
            <img
              src={productImagePath(item.categoryName, item.imageName)}
              alt={item.name}
              className="max-w-full max-h-full object-contain p-1"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
                (e.currentTarget as HTMLImageElement).onerror = null;
              }}
            />
          </div>
        </Link>
      </td>

      {/* ── Nom ───────────────────────────────────────────────────────── */}
      <td className="py-4 px-3">
        <Link
          to={`/product/${item.id}`}
          className="text-sm font-semibold text-slate-800 hover:text-indigo-600 transition-colors capitalize line-clamp-2"
        >
          {item.name}
        </Link>
        <p className="text-xs text-slate-400 mt-0.5">{item.categoryName}</p>
      </td>

      {/* ── Prix unitaire ─────────────────────────────────────────────── */}
      <td className="py-4 px-3 text-sm text-slate-600 font-medium whitespace-nowrap">
        {item.price.toFixed(2)} €
      </td>

      {/* ── Quantité ──────────────────────────────────────────────────── */}
      <td className="py-4 px-3">
        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden w-fit">
          <Button
            onClick={dec}
            disabled={item.qty <= 1 || isSyncing}
            aria-label="Decrease"
            variant="plain"
            size="none"
            radius="none"
            className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:text-slate-300 transition-colors text-lg font-light"
          >
            −
          </Button>
          <span className="w-10 text-center text-sm font-semibold text-slate-800 select-none">
            {item.qty}
          </span>
          <Button
            onClick={inc}
            disabled={item.qty >= 99 || isSyncing}
            aria-label="Increase"
            variant="plain"
            size="none"
            radius="none"
            className="w-9 h-9 flex items-center justify-center text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:text-slate-300 transition-colors text-lg font-light"
          >
            +
          </Button>
        </div>
      </td>

      {/* ── Total ligne ───────────────────────────────────────────────── */}
      <td className="py-4 px-3 text-sm font-bold text-indigo-600 whitespace-nowrap">
        {lineTotal.toFixed(2)} €
      </td>
    </tr>
  );
});

export default CartItem;