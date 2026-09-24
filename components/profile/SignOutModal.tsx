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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-md bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#000] p-6 text-center animate-in zoom-in-95 duration-150 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg border border-black bg-white hover:bg-[#FAF7EE] text-black"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-xl bg-[#FEE2E2] text-[#DC2626] border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
        </div>

        <h3 className="text-xl font-black text-black tracking-tight">
          Are you sure you want to sign out?
        </h3>

        <p className="mt-2 text-xs text-black/70 font-semibold leading-relaxed max-w-sm mx-auto">
          Your CBT mock test sessions, daily practice streaks, and AI calibration metrics are safely stored in your account. You will need to log back in to resume practice.
        </p>

        <div className="mt-6 pt-4 border-t-2 border-black/10 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleSignOut}
            className="flex-1 py-2.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing Out...</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4 stroke-[2.5]" />
                <span>Yes, Sign Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
