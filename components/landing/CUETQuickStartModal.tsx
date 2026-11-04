"use client";

import React from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

interface CUETQuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSignUp?: () => void;
}

export default function CUETQuickStartModal({
  isOpen,
  onClose,
  onStartSignUp,
}: CUETQuickStartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-[36px] p-6 sm:p-8 shadow-2xl border border-slate-100 text-center select-none animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mascot & Heading */}
        <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 text-3xl shadow-sm">
          🦉
        </div>

        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Practice <span className="text-purple-600">CUET CBT</span> on the Go
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          Scan the QR code to practice timed chapter drills, review error logs, and track dream college cutoffs directly on your mobile device.
        </p>

        {/* Mock QR Code */}
        <div className="my-6 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl inline-block shadow-inner">
          <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
            <rect width="120" height="120" fill="#FFFFFF" rx="8" />
            <rect x="10" y="10" width="30" height="30" fill="#1E293B" rx="4" />
            <rect x="16" y="16" width="18" height="18" fill="#FFFFFF" rx="2" />
            <rect x="20" y="20" width="10" height="10" fill="#6C5CE7" rx="1" />

            <rect x="80" y="10" width="30" height="30" fill="#1E293B" rx="4" />
            <rect x="86" y="16" width="18" height="18" fill="#FFFFFF" rx="2" />
            <rect x="90" y="20" width="10" height="10" fill="#6C5CE7" rx="1" />

            <rect x="10" y="80" width="30" height="30" fill="#1E293B" rx="4" />
            <rect x="16" y="86" width="18" height="18" fill="#FFFFFF" rx="2" />
            <rect x="20" y="90" width="10" height="10" fill="#6C5CE7" rx="1" />

            {/* Matrix dots */}
            <circle cx="55" cy="20" r="3" fill="#1E293B" />
            <circle cx="65" cy="25" r="3" fill="#1E293B" />
            <circle cx="50" cy="40" r="4" fill="#6C5CE7" />
            <circle cx="65" cy="50" r="3" fill="#1E293B" />
            <circle cx="80" cy="55" r="3" fill="#1E293B" />
            <circle cx="95" cy="50" r="3" fill="#6C5CE7" />
            <circle cx="35" cy="55" r="4" fill="#1E293B" />
            <circle cx="50" cy="65" r="3" fill="#1E293B" />
            <circle cx="65" cy="75" r="4" fill="#6C5CE7" />
            <circle cx="80" cy="85" r="3" fill="#1E293B" />
            <circle cx="95" cy="95" r="3" fill="#1E293B" />
            <circle cx="60" cy="100" r="3" fill="#1E293B" />
          </svg>
          <span className="block mt-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            Point smartphone camera to scan
          </span>
        </div>

        {/* Store Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/dashboard/mocks"
            onClick={onClose}
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span className="text-base">💻</span> Launch Web CBT
          </Link>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onStartSignUp) onStartSignUp();
            }}
            className="flex-1 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span className="text-base">🚀</span> Create Free Account
          </button>
        </div>

        {/* Direct dashboard link */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1"
          >
            Already registered? Open Candidate Dashboard <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
