// import { Link } from "react-router-dom";

type Crumb = { label: string; href?: string };

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
}