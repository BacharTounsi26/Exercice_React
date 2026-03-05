
import { memo }            from "react";
import { Link }            from "react-router-dom";
import type { Category }   from "@/shared/types/Category";

type NavbarProps = {
  categories:        Category[];
  loading?:          boolean;
  error?:            string | null;
  activeCategoryId?: string;     
  isShopPath?:       boolean;
  className?:        string;
};

const Navbar = memo(function Navbar({
  categories,
  loading = false,
  error = null,
  activeCategoryId,
  isShopPath = false,
  className = "",
}: NavbarProps) {
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
          {loading && Array.from({ length: 5 }, (_, i) => (
            <li key={`sk-${i}`}>
              <span className="inline-block w-24 h-8 rounded bg-slate-200 animate-pulse" />
            </li>
          ))}
          {!loading && !error && categories.map((c) => (
            <li key={c.id}>
              <Link
                to={`/shop/${c.id}`}
                className={`${base} ${c.id === activeCategoryId ? active : idle}`}
              >
                {c.name.toUpperCase()}
              </Link>
            </li>
          ))}
          {!loading && error && (
            <li>
              <span className="text-xs text-red-600 px-2">Unable to load categories</span>
            </li>
          )}
          {!loading && !error && categories.length === 0 && (
            <li>
              <span className="text-xs text-slate-500 px-2">No categories available</span>
            </li>
          )}

          {/* All Products */}
          <li className="ml-auto">
            <Link
              to="/shop"
              className={`${base} ${!activeCategoryId && isShopPath ? active : idle}`}
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