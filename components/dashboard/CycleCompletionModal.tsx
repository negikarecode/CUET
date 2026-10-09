"use client";

import React from "react";
import {
  Sparkles,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  X,
  Award,
} from "lucide-react";
import { CycleCompletionNotification } from "@/types/cycle";

interface CycleCompletionModalProps {
  notification: CycleCompletionNotification;
  onClose: () => void;
  onViewAnalysis: () => void;
}

export function CycleCompletionModal({
  notification,
  onClose,
  onViewAnalysis,
}: CycleCompletionModalProps) {
  const { cycleNumber, totalAnalyzed, isBaseline, comparisonSummary } = notification;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 max-w-lg w-full shadow-xl relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 shadow-xs mb-2">
            <Award className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic Cycle {cycleNumber} Complete
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 font-mono">
            {totalAnalyzed} questions analyzed. Your new diagnostic analysis is ready.
          </p>
          <div className="pt-1">
            <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              {isBaseline
                ? "Cycle 1 establishes your initial performance baseline."
                : `Your performance has been compared with Cycle ${cycleNumber - 1}.`}
            </span>
          </div>
        </div>

        {/* Summary Badges (If comparative Cycle 2+) */}
        {!isBaseline && comparisonSummary && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" /> Improved
              </span>
              <p className="text-lg font-bold text-emerald-900 font-mono">{comparisonSummary.improvedCount}</p>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100 text-center">
              <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <RefreshCw className="w-3 h-3" /> Still Weak
              </span>
              <p className="text-lg font-bold text-rose-900 font-mono">{comparisonSummary.recurringCount}</p>
            </div>

            <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-100 text-center">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Resolved
              </span>
              <p className="text-lg font-bold text-teal-900 font-mono">{comparisonSummary.resolvedCount}</p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> New Patterns
              </span>
              <p className="text-lg font-bold text-amber-900 font-mono">{comparisonSummary.newMistakesCount}</p>
            </div>

            <div className="p-3 rounded-2xl bg-orange-50/70 border border-orange-100 text-center col-span-2 sm:col-span-2">
              <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider flex items-center justify-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Declined Areas
              </span>
              <p className="text-lg font-bold text-orange-900 font-mono">{comparisonSummary.declinedCount}</p>
            </div>
          </div>
        )}

        {/* Automatic Rollover Notice */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
          <p className="font-semibold text-slate-800">
            Active Question Counter automatically reset to <span className="font-bold font-mono">0 / 150</span>.
          </p>
          <p className="text-slate-500 text-[11px]">
            Your next question will automatically record into <span className="font-semibold text-slate-700">Cycle {cycleNumber + 1}</span>. No manual action required.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onViewAnalysis();
            }}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Cycle Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all cursor-pointer"
          >
            Continue Practicing
          </button>
        </div>
      </div>
    </div>
  );
}
