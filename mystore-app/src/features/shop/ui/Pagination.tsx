
import { memo } from "react";
import Button from "@/shared/ui/Button";

interface PaginationProps {
  currentPage:  number;
  totalPages:   number;
  onPageChange: (p: number) => void;
}

// Génère la liste des pages avec null pour les ellipses
function buildRange(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | null)[] = [1];
  if (current > 3)         pages.push(null);
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push(null);
  pages.push(total);
  return pages;
}

const Pagination = memo(function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const base     = "min-w-[38px] h-9 px-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors";
  const active   = "bg-indigo-600 text-white shadow-sm pointer-events-none";
  const normal   = "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400";
  const disabled = "bg-white border border-slate-200 text-slate-300 pointer-events-none cursor-not-allowed";

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10 flex-wrap" aria-label="Pagination">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
        variant="plain"
        size="none"
        radius="lg"
        className={`${base} ${currentPage === 1 ? disabled : normal}`}
      >
        ‹
      </Button>

      {buildRange(currentPage, totalPages).map((p, i) =>
        p === null
          ? <span key={`e${i}`} className="min-w-[38px] h-9 flex items-center justify-center text-slate-400 select-none">…</span>
          : <Button
              key={p}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
              variant="plain"
              size="none"
              radius="lg"
              className={`${base} ${p === currentPage ? active : normal}`}
            >
              {p}
            </Button>
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
        variant="plain"
        size="none"
        radius="lg"
        className={`${base} ${currentPage === totalPages ? disabled : normal}`}
      >
        ›
      </Button>
    </nav>
  );
});

export default Pagination;