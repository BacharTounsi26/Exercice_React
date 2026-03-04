/*import { useState } from "react";

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
          {/* Logo + marque }
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

          {/* Barre de recherche }
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

          {/* Mini-cart }
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
}*/
// src/features/layout/ui/Header.tsx
// Design fourni conservé à l'identique (grid-cols-12, indigo, border).
// Recherche globale → /shop?q=...   |   Cart → /cart

/*import { memo, useState }          from "react";
import { useNavigate, Link }        from "react-router-dom";

type HeaderProps = {
  cartAmount?: number;
  cartCount?:  number;
};

const Header = memo(function Header({ cartAmount = 0, cartCount = 0 }: HeaderProps) {
  const [q, setQ]   = useState("");
  const navigate    = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed) navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <header className="w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="grid grid-cols-12 items-center gap-4">

          {/* ── Logo + Marque ────────────────────────────────────────────── }
          <div className="col-span-12 sm:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md group-hover:bg-indigo-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                  <path d="M9 21V12h6v9" fill="none" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="text-left leading-tight">
                <div className="text-[17px] font-semibold text-slate-800 font-display">
                  Shop<span className="text-indigo-600">Mobile</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400">
                  Premium Devices
                </div>
              </div>
            </Link>
          </div>

          {/* ── Barre de recherche ───────────────────────────────────────── }
          <div className="col-span-12 sm:col-span-5">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-l-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold uppercase text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* ── Mini-cart ────────────────────────────────────────────────── }
          <div className="col-span-12 sm:col-span-3">
            <Link
              to="/cart"
              className="relative flex w-full items-center justify-end gap-3 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:border-indigo-200 transition group"
              aria-label="Open cart"
            >
              <span className="text-slate-500">
                Cart :{" "}
                <span className="font-semibold text-indigo-600">
                  {cartAmount.toFixed(2)} €
                </span>
              </span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.16 14.26l.03.01L19 15a1 1 0 0 0 .98-.8l1.71-8.58A1 1 0 0 0 20.71 4H6.21l-.38-2H2v2h2l2.6 12.01a3.001 3.001 0 1 0 5.8.99h4.8a3.001 3.001 0 1 0 0-2H10.4a3 3 0 0 0-3.24-2.74Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
});

export default Header;*/

// src/features/layout/ui/Header.tsx
// Design fourni conservé à l'identique (grid-cols-12, indigo, border).
// Recherche globale → /shop?q=...   |   Cart → /cart
// La barre de recherche se synchronise avec l'URL ?q= quand on est sur /shop.

/*import { memo, useState, useEffect }   from "react";
import { useNavigate, Link, useSearchParams, useLocation } from "react-router-dom";

type HeaderProps = {
  cartAmount?: number;
  cartCount?:  number;
};

const Header = memo(function Header({ cartAmount = 0, cartCount = 0 }: HeaderProps) {
  const [q, setQ]         = useState("");
  const navigate          = useNavigate();
  const location          = useLocation();
  const [searchParams]    = useSearchParams();

  // Sync avec l'URL ?q= — quand on est sur /shop et que la recherche change via la navbar
  useEffect(() => {
    const isShopPage = location.pathname.startsWith("/shop");
    if (isShopPage) {
      setQ(searchParams.get("q") ?? "");
    } else {
      setQ("");
    }
  }, [location.pathname, searchParams]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    // Si déjà sur /shop, on met à jour le ?q= sans recharger la page
    navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
  }

  function handleClear() {
    setQ("");
    if (location.pathname.startsWith("/shop")) {
      navigate("/shop");
    }
  }

  return (
    <header className="w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="grid grid-cols-12 items-center gap-4">

          {/* ── Logo + Marque ────────────────────────────────────────────── }
          <div className="col-span-12 sm:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md group-hover:bg-indigo-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                  <path d="M9 21V12h6v9" fill="none" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="text-left leading-tight">
                <div className="text-[17px] font-semibold text-slate-800 font-display">
                  Shop<span className="text-indigo-600">Mobile</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400">
                  Premium Devices
                </div>
              </div>
            </Link>
          </div>

          {/* ── Barre de recherche ───────────────────────────────────────── }
          <div className="col-span-12 sm:col-span-5">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-l-lg border border-slate-300 px-4 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                />
                {q && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Effacer"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xl leading-none"
                  >×</button>
                )}
              </div>
              <button
                type="submit"
                className="rounded-r-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold uppercase text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex-shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* ── Mini-cart ────────────────────────────────────────────────── }
          <div className="col-span-12 sm:col-span-3">
            <Link
              to="/cart"
              className="relative flex w-full items-center justify-end gap-3 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:border-indigo-200 transition group"
              aria-label="Open cart"
            >
              <span className="text-slate-500">
                Cart :{" "}
                <span className="font-semibold text-indigo-600">
                  {cartAmount.toFixed(2)} €
                </span>
              </span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.16 14.26l.03.01L19 15a1 1 0 0 0 .98-.8l1.71-8.58A1 1 0 0 0 20.71 4H6.21l-.38-2H2v2h2l2.6 12.01a3.001 3.001 0 1 0 5.8.99h4.8a3.001 3.001 0 1 0 0-2H10.4a3 3 0 0 0-3.24-2.74Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
});

export default Header;*/
// src/features/layout/ui/Header.tsx
// Le Header lit maintenant directement le store Redux pour cartAmount et cartCount.
// Plus besoin de passer ces props depuis RootLayout.

import { memo, useState, useEffect }   from "react";
import { useNavigate, Link, useSearchParams, useLocation } from "react-router-dom";
import { useAppSelector }              from "@/shared/hooks/useAppStore";
import { selectCartTotal, selectCartCount } from "@/features/cart/state/Selectors"; 

const Header = memo(function Header() {
  const [q, setQ]      = useState("");
  const navigate       = useNavigate();
  const location       = useLocation();
  const [searchParams] = useSearchParams();

  // Données panier depuis Redux
  const cartTotal = useAppSelector(selectCartTotal);
  const cartCount = useAppSelector(selectCartCount);

  useEffect(() => {
    const isShopPage = location.pathname.startsWith("/shop");
    if (isShopPage) {
      setQ(searchParams.get("q") ?? "");
    } else {
      setQ("");
    }
  }, [location.pathname, searchParams]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(q.trim())}`);
  }

  function handleClear() {
    setQ("");
    if (location.pathname.startsWith("/shop")) navigate("/shop");
  }

  return (
    <header className="w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="grid grid-cols-12 items-center gap-4">

          {/* Logo */}
          <div className="col-span-12 sm:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md group-hover:bg-indigo-700 transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
                  <path d="M9 21V12h6v9" fill="none" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="text-left leading-tight">
                <div className="text-[17px] font-semibold text-slate-800 font-display">
                  Shop<span className="text-indigo-600">Mobile</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400">
                  Premium Devices
                </div>
              </div>
            </Link>
          </div>

          {/* Recherche */}
          <div className="col-span-12 sm:col-span-5">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-l-lg border border-slate-300 px-4 py-2.5 pr-8 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                />
                {q && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Effacer"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xl leading-none"
                  >×</button>
                )}
              </div>
              <button
                type="submit"
                className="rounded-r-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold uppercase text-white hover:bg-indigo-700 transition-colors flex-shrink-0"
              >
                Search
              </button>
            </form>
          </div>

          {/* Mini-cart — valeurs dynamiques depuis Redux */}
          <div className="col-span-12 sm:col-span-3">
            <Link
              to="/cart"
              className="relative flex w-full items-center justify-end gap-3 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:border-indigo-200 transition group"
            >
              <span className="text-slate-500">
                Cart :{" "}
                <span className="font-semibold text-indigo-600">
                  {cartTotal.toFixed(2)} €
                </span>
              </span>
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-colors" fill="currentColor">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM7.16 14.26l.03.01L19 15a1 1 0 0 0 .98-.8l1.71-8.58A1 1 0 0 0 20.71 4H6.21l-.38-2H2v2h2l2.6 12.01a3.001 3.001 0 1 0 5.8.99h4.8a3.001 3.001 0 1 0 0-2H10.4a3 3 0 0 0-3.24-2.74Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
});

export default Header;