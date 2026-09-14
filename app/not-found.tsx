import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7EE] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border-2 border-black rounded-xl p-8 shadow-[4px_4px_0px_0px_#000] text-center space-y-4">
        <h2 className="text-3xl font-black text-black">404 - Page Not Found</h2>
        <p className="text-sm font-bold text-black/70">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-5 py-2.5 bg-[#FF5C5C] text-white font-black text-sm rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FF4545] transition-all"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
