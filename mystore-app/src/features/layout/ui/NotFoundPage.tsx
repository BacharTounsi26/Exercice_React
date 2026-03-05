
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="font-display text-8xl font-bold text-indigo-100 mb-4 select-none">404</p>
      <h1 className="font-display text-2xl font-bold text-slate-800 mb-2">Page not found</h1>
      <p className="text-slate-500 mb-8 max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="rounded-lg bg-indigo-600 text-white px-6 py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors">
        Back to home
      </Link>
    </div>
  );
}