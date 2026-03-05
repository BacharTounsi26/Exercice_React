import { Link }           from "react-router-dom";
import { useCategories }  from "../hooks/useCategories";
import Button             from "@/shared/ui/Button";

export default function Footer() {
  const { categories, loading: isLoading } = useCategories();

  return (
    <footer className="w-full bg-[#2f2f2f] text-slate-200">

      {/* Top area */}
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Column 1: Brand + Description */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400 mb-4">MyStore</h2>
          <p className="text-sm leading-6 text-slate-300">
            At MyStore, we bring you the latest and most innovative mobile technology all in one place.
            From cutting-edge smartphones and high-performance devices to essential accessories and smart
            gadgets, our store is designed to meet every digital lifestyle need. We carefully select top
            brands known for quality, reliability, and performance, ensuring that our customers always
            get the best value.
          </p>
        </div>

        {/* Column 2: Categories from API */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Categories</h2>

          {isLoading ? (
            // Skeleton pendant le chargement
            <ul className="space-y-3">
              {Array.from({ length: 5 }, (_, i) => (
                <li key={i} className="border-b border-slate-500/30 pb-2">
                  <div className="h-3 w-24 bg-slate-600 rounded animate-pulse" />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-3 text-slate-300 text-sm">
              {categories.map((cat) => (
                <li key={cat.id} className="border-b border-slate-500/30 pb-2">
                  <Link
                    to={`/shop/${cat.id}`}
                    className="hover:text-indigo-300 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Column 3: Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
          <p className="text-sm text-slate-300 mb-4">
            Sign up to our newsletter and get exclusive deals you won't find
            anywhere else straight to your inbox!
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Type your email"
              className="flex-1 px-4 py-2 rounded bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <Button
              type="submit"
              variant="primary"
              size="none"
              radius="md"
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600"
            >
              SUBSCRIBE
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom area */}
      <div className="border-t border-slate-600/40 py-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} MyStore — All rights reserved.
      </div>
    </footer>
  );
}