type BackendUnavailablePageProps = {
  onRetry: () => void;
};

export default function BackendUnavailablePage({ onRetry }: BackendUnavailablePageProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 mx-auto mb-4 flex items-center justify-center">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-slate-800 mb-2">Backend is unavailable</h1>
        <p className="text-sm text-slate-500 mb-6">
          We can&apos;t reach the API right now. Please make sure the backend server is running, then try again.
        </p>

        <button
          onClick={onRetry}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          Retry connection
        </button>
      </div>
    </div>
  );
}
