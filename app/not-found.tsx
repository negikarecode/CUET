import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 text-slate-800">
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xs text-center space-y-5">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-mono font-black text-xl">
          404
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Page Not Found</h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            The page you are looking for does not exist, has been removed, or the URL might be mistyped.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
