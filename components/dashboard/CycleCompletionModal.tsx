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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border-3 border-black p-6 sm:p-8 max-w-lg w-full shadow-[8px_8px_0px_0px_#000] relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border-2 border-black bg-[#FAF7EE] hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_#000]"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FEF3C7] border-3 border-black shadow-[3px_3px_0px_0px_#000] mb-2">
            <Award className="w-7 h-7 text-[#D97706]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
            🎉 Diagnostic Cycle {cycleNumber} Complete
          </h2>
          <p className="text-xs sm:text-sm font-bold text-black/70 font-mono">
            {totalAnalyzed} questions analyzed. Your new diagnostic analysis is ready.
          </p>
          <div className="pt-1">
            <span className="px-3 py-1 rounded-full bg-[#FAF7EE] border border-black text-xs font-black uppercase text-black/80">
              {isBaseline
                ? "Cycle 1 establishes your initial performance baseline."
                : `Your performance has been compared with Cycle ${cycleNumber - 1}.`}
            </span>
          </div>
        </div>

        {/* Summary Badges (If comparative Cycle 2+) */}
        {!isBaseline && comparisonSummary && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
            <div className="p-2.5 rounded-xl bg-[#F0FDF4] border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center">
              <span className="text-[10px] font-black text-[#15803D] uppercase flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" /> Improved
              </span>
              <p className="text-lg font-black text-black font-mono">{comparisonSummary.improvedCount}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FEF2F2] border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center">
              <span className="text-[10px] font-black text-[#DC2626] uppercase flex items-center justify-center gap-1">
                <RefreshCw className="w-3 h-3" /> Still Weak
              </span>
              <p className="text-lg font-black text-black font-mono">{comparisonSummary.recurringCount}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#DCFCE7] border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center">
              <span className="text-[10px] font-black text-[#16A34A] uppercase flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Resolved
              </span>
              <p className="text-lg font-black text-black font-mono">{comparisonSummary.resolvedCount}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FFFBEB] border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center">
              <span className="text-[10px] font-black text-[#B45309] uppercase flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> New Patterns
              </span>
              <p className="text-lg font-black text-black font-mono">{comparisonSummary.newMistakesCount}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FEF3C7] border-2 border-black shadow-[2px_2px_0px_0px_#000] text-center col-span-2 sm:col-span-2">
              <span className="text-[10px] font-black text-[#92400E] uppercase flex items-center justify-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Declined Areas
              </span>
              <p className="text-lg font-black text-black font-mono">{comparisonSummary.declinedCount}</p>
            </div>
          </div>
        )}

        {/* Automatic Rollover Notice */}
        <div className="p-3 rounded-xl bg-[#FAF7EE] border-2 border-black text-xs space-y-1">
          <p className="font-bold text-black">
            Active Question Counter automatically reset to <span className="font-black font-mono">0 / 150</span>.
          </p>
          <p className="text-black/70 text-[11px]">
            Your next question will automatically record into <span className="font-black">Cycle {cycleNumber + 1}</span>. No manual action required.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onViewAnalysis();
            }}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <span>VIEW CYCLE ANALYSIS</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white hover:bg-black hover:text-white text-black font-bold text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
          >
            Continue Practicing
          </button>
        </div>
      </div>
    </div>
  );
}
