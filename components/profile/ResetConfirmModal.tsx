"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, Trash2, X, ShieldCheck } from "lucide-react";

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
}

export default function ResetConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: ResetConfirmModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setConfirmText("");
      setIsResetting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isConfirmed = confirmText.trim().toUpperCase() === "RESET";

  const handleReset = async () => {
    if (!isConfirmed) return;
    setIsResetting(true);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      console.error("Reset error:", err);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 sm:p-7 text-left animate-in zoom-in-95 duration-150 relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Danger Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 id="reset-modal-title" className="text-xl font-bold text-slate-900 tracking-tight">
              Reset Practice Data
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              This action will reset your practice history and analytics across the app.
            </p>
          </div>
        </div>

        {/* Details Box */}
        <div className="space-y-3.5 my-5 text-xs sm:text-sm">
          {/* What gets deleted */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-2 text-rose-950">
            <p className="font-bold text-rose-900 uppercase tracking-wider text-[11px]">
              What will be permanently deleted:
            </p>
            <ul className="space-y-1 list-disc list-inside text-rose-800 text-xs sm:text-sm">
              <li>All completed CBT sessions, PYQ attempts, and practice drills</li>
              <li>Mock test averages, subject scores, and accuracy history</li>
              <li>Active daily practice streak (resets to 0)</li>
              <li>Diagnostic calibration progress (resets to 0 / 150 questions)</li>
            </ul>
          </div>

          {/* What is preserved */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5 text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <p className="font-bold text-emerald-950">Academic targets preserved:</p>
              <p className="text-emerald-800 text-xs mt-0.5">
                Your saved dream college, course preferences, and target parameters will <strong>NOT</strong> be deleted.
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Input */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Type <span className="font-mono text-rose-600">RESET</span> to confirm:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type RESET"
            autoFocus
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-900 font-mono text-sm tracking-widest focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={isResetting}
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!isConfirmed || isResetting}
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            {isResetting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Resetting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Permanently Reset Data</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
