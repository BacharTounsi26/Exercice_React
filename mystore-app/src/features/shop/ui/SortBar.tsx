
import { memo } from "react";
import type { SortOption } from "../hooks/useShop";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "",                  label: "Relevance"          },
  { value: "price_asc",         label: "Price ↑"             },
  { value: "price_desc",        label: "Price ↓"             },
  { value: "review_desc",       label: "Top Rated"   },
  { value: "name_asc",          label: "A → Z"              },
  { value: "discountRate_desc", label: "Best Discounts"  },
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
        product{totalCount > 1 ? "s" : ""}
      </span>

      {/* Tri */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm text-slate-500 whitespace-nowrap hidden sm:block">
          Sort:
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