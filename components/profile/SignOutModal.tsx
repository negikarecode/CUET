"use client";

import React, { useState } from "react";
import { AlertTriangle, LogOut, X } from "lucide-react";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function SignOutModal({
  isOpen,
  onClose,
  onConfirm,
}: SignOutModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch (e) {
      console.error("Sign out error:", e);
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-7 text-center animate-in zoom-in-95 duration-150 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Are you sure you want to sign out?
        </h3>

        <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
          Your CBT mock test sessions, daily practice streaks, and AI calibration metrics are safely stored in your account. You will need to log back in to resume practice.
        </p>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleSignOut}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing Out...</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 stroke-[2.2]" />
                <span>Yes, Sign Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
