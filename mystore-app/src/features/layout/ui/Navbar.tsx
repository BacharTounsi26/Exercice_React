import type { Category } from "@/shared/types/Category";

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
}