
import { memo }            from "react";
import { Link }            from "react-router-dom";
import type { Category }   from "@/shared/types/Category";

type NavbarProps = {
  categories:        Category[];
  activeCategoryId?: string;     
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