"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

interface SessionsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SessionsError({ error, reset }: SessionsErrorProps) {
  useEffect(() => {
    // Log sanitized error diagnostic server/client side
    console.error("[Past Sessions Route Error Boundary]:", error?.message, "Digest:", error?.digest);
  }, [error]);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-600 shadow-2xs">
          <AlertCircle className="w-7 h-7 stroke-[2.2]" />
        </div>

        <div className="space-y-2 max-w-lg mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200/60 inline-block">
            Recoverable Session Notice
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Unable to Load Past Sessions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            We encountered a temporary issue retrieving your examination history from the secure database. Your completed attempts and test scores are safe.
          </p>
          {error?.digest && (
            <p className="text-[11px] text-slate-400 font-mono pt-1">
              Ref Code: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 shadow-2xs transition-all"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
