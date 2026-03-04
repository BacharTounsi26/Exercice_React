// import { Link } from "react-router-dom";

/*type Crumb = { label: string; href?: string };

type BreadcrumbProps = {
  items: Crumb[];
  separator?: string;
  className?: string;
};

export default function Breadcrumb({
  items,
  separator = ">",
  className = "",
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`w-full bg-white ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-4">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span className="text-slate-700">{item.label}</span>
                )}
                {!isLast && <span className="text-slate-400">{separator}</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}*/

// src/features/layout/ui/Breadcrumb.tsx
// Fil d'Ariane générique : Home > Catégorie > Produit
// Seuls les niveaux fournis sont affichés.

import { memo }       from "react";
import { Link }       from "react-router-dom";

interface BreadcrumbItem { id: string; name: string; }

interface BreadcrumbProps {
  category?: BreadcrumbItem;
  product?:  string;          // dernier niveau, non cliquable
  className?: string;
}

const Breadcrumb = memo(function Breadcrumb({ category, product, className = "" }: BreadcrumbProps) {
  const sep = <span className="text-slate-300 mx-1.5 select-none">›</span>;

  return (
    <nav aria-label="Fil d'Ariane" className={`text-[13px] text-slate-400 flex items-center flex-wrap ${className}`}>

      <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>

      {category && (
        <>
          {sep}
          {product ? (
            <Link to={`/shop/${category.id}`} className="hover:text-indigo-600 transition-colors">
              {category.name}
            </Link>
          ) : (
            <span className="text-slate-600 font-medium">{category.name}</span>
          )}
        </>
      )}

      {product && (
        <>
          {sep}
          <span className="text-slate-600 font-medium truncate max-w-[220px]">{product}</span>
        </>
      )}
    </nav>
  );
});

export default Breadcrumb;