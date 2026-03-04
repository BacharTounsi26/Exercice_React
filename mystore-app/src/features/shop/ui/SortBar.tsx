






/*type Props = {
  onSearch: (q: string) => void;
  onSortChange: (sort: string, order: "asc" | "desc") => void;
};

export default function SortBar({ onSearch, onSortChange }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => onSearch(e.target.value)}
        className="border px-4 py-2 rounded w-full md:w-72"
      />

      <select
        onChange={(e) => {
          const v = e.target.value;

          if (v === "price-asc") onSortChange("price", "asc");
          if (v === "price-desc") onSortChange("price", "desc");
          if (v === "name-asc") onSortChange("name", "asc");
          if (v === "name-desc") onSortChange("name", "desc");
        }}
        className="border px-4 py-2 rounded w-full md:w-60"
      >
        <option value="">Sort by</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="name-asc">A → Z</option>
        <option value="name-desc">Z → A</option>
      </select>
    </div>
  );
}*/
// src/features/shop/ui/SortBar.tsx
// Barre recherche (debounce 400ms) + sélecteur tri.
// memo() + useCallback dans le parent garantit zéro re-render inutile.
/*
import { memo, useState, useEffect, useRef } from "react";
import type { SortOption }                   from "../hooks/useShop";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "",                  label: "Pertinence"          },
  { value: "price_asc",         label: "Prix ↑"             },
  { value: "price_desc",        label: "Prix ↓"             },
  { value: "review_desc",       label: "Meilleures notes"   },
  { value: "name_asc",          label: "A → Z"              },
  { value: "discountRate_desc", label: "Meilleures remises"  },
];

interface SortBarProps {
  searchQuery: string;
  sortOption:  SortOption;
  totalCount:  number;
  onSearch:    (q: string)     => void;
  onSort:      (o: SortOption) => void;
}

const SortBar = memo(function SortBar({ searchQuery, sortOption, totalCount, onSearch, onSort }: SortBarProps) {
  const [input, setInput] = useState(searchQuery);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync si reset externe (ex: changement de catégorie)
  useEffect(() => { setInput(searchQuery); }, [searchQuery]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setInput(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch(v), 400);
  }

  function clearSearch() {
    setInput("");
    onSearch("");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-6 bg-white border border-slate-200 rounded-xl p-3 shadow-sm">

      {/* Compteur }
      <span className="text-[13px] text-slate-500 whitespace-nowrap hidden sm:block">
        <span className="font-semibold text-slate-700">{totalCount}</span> produit{totalCount > 1 ? "s" : ""}
      </span>

      <div className="hidden sm:block w-px bg-slate-200 self-stretch" />

      {/* Recherche }
      <div className="relative flex-1">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text" value={input} onChange={handleChange}
          placeholder="Rechercher un produit…"
          aria-label="Rechercher"
          className="w-full pl-9 pr-8 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
        {input && (
          <button onClick={clearSearch} aria-label="Effacer"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xl leading-none">
            ×
          </button>
        )}
      </div>

      <div className="hidden sm:block w-px bg-slate-200 self-stretch" />

      {/* Tri }
      <div className="flex items-center gap-2 shrink-0">
        <label htmlFor="sort-select" className="text-sm text-slate-500 whitespace-nowrap">
          Trier :
        </label>
        <select
          id="sort-select" value={sortOption}
          onChange={(e) => onSort(e.target.value as SortOption)}
          className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default SortBar;*/
// src/features/shop/ui/SortBar.tsx
// Barre de tri uniquement — la recherche est gérée par le Header global.
// memo() + useCallback dans le parent garantit zéro re-render inutile.

import { memo } from "react";
import type { SortOption } from "../hooks/useShop";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "",                  label: "Pertinence"          },
  { value: "price_asc",         label: "Prix ↑"             },
  { value: "price_desc",        label: "Prix ↓"             },
  { value: "review_desc",       label: "Meilleures notes"   },
  { value: "name_asc",          label: "A → Z"              },
  { value: "discountRate_desc", label: "Meilleures remises"  },
];

interface SortBarProps {
  sortOption:  SortOption;
  totalCount:  number;
  onSort:      (o: SortOption) => void;
}

const SortBar = memo(function SortBar({ sortOption, totalCount, onSort }: SortBarProps) {
  return (
    <div className="flex items-center justify-between mb-6 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">

      {/* Compteur */}
      <span className="text-[13px] text-slate-500">
        <span className="font-semibold text-slate-700">{totalCount}</span>{" "}
        produit{totalCount > 1 ? "s" : ""}
      </span>

      {/* Tri */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm text-slate-500 whitespace-nowrap hidden sm:block">
          Trier :
        </label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => onSort(e.target.value as SortOption)}
          className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
});

export default SortBar;