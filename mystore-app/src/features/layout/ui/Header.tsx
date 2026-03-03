import { useState } from "react";

type HeaderProps = {
  onSearch?: (q: string) => void;
  cartAmount?: number;   
  cartCount?: number;    
  onCartClick?: () => void;
  onLogoClick?: () => void;
  logoSrc?: string;      
  brandName?: string;    
  brandTagline?: string; 
};

export default function Header({
  onSearch,
  cartAmount = 0,
  cartCount = 0,
  onCartClick,
  onLogoClick,
  logoSrc = "/logo.png",
  brandName = "Shop Mobile",
  brandTagline = "BUSINESS TAGLINE GOES HERE",
}: HeaderProps) {
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(q.trim());
  };

  return (
    <header className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <div className="grid grid-cols-12 items-center gap-4">
          {/* Logo + marque */}
          <div className="col-span-12 sm:col-span-4">
            <button
              type="button"
              onClick={onLogoClick}
              className="inline-flex items-center gap-3"
            >
              <img src={logoSrc} alt="Logo" className="h-12 w-12 object-contain" />
              <div className="text-left leading-tight">
                <div className="text-[18px] font-semibold text-slate-800">
                  {brandName}
                </div>
                <div className="text-[10px] uppercase tracking-wide text-slate-400">
                  {brandTagline}
                </div>
              </div>
            </button>
          </div>

          {/* Barre de recherche */}
          <div className="col-span-12 sm:col-span-5">
            <form onSubmit={submit} className="flex">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-l-md border border-slate-300 px-4 py-2 text-slate-700 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-300"
              />
              <button
                type="submit"
                className="rounded-r-md bg-indigo-500 px-5 py-2 text-sm font-semibold uppercase text-white hover:bg-indigo-600"
              >
                Search
              </button>
            </form>
          </div>

          {/* Mini-cart */}
          <div className="col-span-12 sm:col-span-3">
            <button
              type="button"
              onClick={onCartClick}
              className="relative ml-auto flex w-full items-center justify-end gap-3 rounded border border-slate-200 px-4 py-2 text-slate-600 hover:bg-slate-50"
              aria-label="Open cart"
            >
              <span>
                Cart :{" "}
                <span className="font-semibold text-indigo-600">
                  {cartAmount.toFixed(2)} €
                </span>
              </span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-500" fill="currentColor" aria-hidden="true">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.16 14.26l.03.01L19 15a1 1 0 0 0 .98-.8l1.71-8.58A1 1 0 0 0 20.71 4H6.21l-.38-2H2v2h2l2.6 12.01a3.001 3.001 0 1 0 5.8.99h4.8a3.001 3.001 0 1 0 0-2H10.4a3 3 0 0 0-3.24-2.74Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-indigo-500 px-2 text-[11px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}