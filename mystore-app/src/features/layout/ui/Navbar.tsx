/*import type { Category } from "@/shared/types/Category";

type NavbarProps = {
  categories: Category[];
  activeCategoryId?: string;         // undefined => Home
  onSelect?: (id?: string) => void;  // undefined => Home
  showHome?: boolean;
  className?: string;
};

export default function Navbar({
  categories,
  activeCategoryId,
  onSelect,
  showHome = true,
  className = "",
}: NavbarProps) {
  return (
    <nav className={`w-full border-t border-slate-100 bg-slate-50 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        <ul className="flex flex-wrap items-center gap-2 py-3 text-[13px] tracking-wide text-slate-600">
          {showHome && (
            <li>
              <button
                type="button"
                onClick={() => onSelect?.(undefined)}
                className={`rounded px-3 py-2 hover:text-slate-900 ${
                  !activeCategoryId ? "bg-indigo-500 font-semibold text-white" : ""
                }`}
              >
                HOME
              </button>
            </li>
          )}

          {categories.map((c) => {
            const active = c.id === activeCategoryId;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(c.id)}
                  className={`rounded px-3 py-2 hover:text-slate-900 ${
                    active ? "bg-indigo-500 font-semibold text-white" : ""
                  }`}
                >
                  {c.name.toUpperCase()}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}*/

// src/features/layout/ui/Navbar.tsx
// Design fourni conservé (slate-50, indigo active, tracking-wide).
// Buttons → Links React Router pour deep-link + bouton retour natif.

import { memo }            from "react";
import { Link }            from "react-router-dom";
import type { Category }   from "@/shared/types/Category";

type NavbarProps = {
  categories:        Category[];
  activeCategoryId?: string;     // undefined → Home actif
  className?:        string;
};

const Navbar = memo(function Navbar({ categories, activeCategoryId, className = "" }: NavbarProps) {
  const base   = "rounded px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors";
  const active = "bg-indigo-600 text-white shadow-sm";
  const idle   = "text-slate-600 hover:text-slate-900 hover:bg-slate-100";

  return (
    <nav className={`w-full bg-slate-50 border-b border-slate-100 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        <ul className="flex flex-wrap items-center gap-1.5 py-2.5">

          {/* Home */}
          <li>
            <Link to="/" className={`${base} ${!activeCategoryId ? active : idle}`}>
              HOME
            </Link>
          </li>

          {/* Categories */}
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                to={`/shop/${c.id}`}
                className={`${base} ${c.id === activeCategoryId ? active : idle}`}
              >
                {c.name.toUpperCase()}
              </Link>
            </li>
          ))}

          {/* All Products */}
          <li className="ml-auto">
            <Link
              to="/shop"
              className={`${base} ${!activeCategoryId && window.location.pathname === "/shop" ? active : idle}`}
            >
              ALL PRODUCTS
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
});

export default Navbar;