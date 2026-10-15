"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  History,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";
import { DiagnosticCycle } from "@/types/cycle";

interface CycleHistorySelectorProps {
  currentCycleNumber: number;
  currentCycleQuestionCount: number;
  diagnosticCycles: DiagnosticCycle[];
  onSelectCycle: (cycle: DiagnosticCycle) => void;
}

function formatCycleDate(dateStr?: string) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export function CycleHistorySelector({
  currentCycleNumber,
  currentCycleQuestionCount,
  diagnosticCycles,
  onSelectCycle,
}: CycleHistorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Cycle 1 baseline accuracy for delta comparison
  const cycle1 = diagnosticCycles.find((c) => c.cycleNumber === 1);
  const cycle1Acc = cycle1
    ? Math.round(cycle1.overallAccuracyPercentage ?? cycle1.accuracyPercentage ?? 0)
    : null;

  return (
    <div className="relative">
      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-[13px] border border-slate-200/80 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
      >
        <History className="w-4 h-4 text-blue-600" />
        <span>Cycle History ({diagnosticCycles.length} Completed)</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Popover list */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-xl z-40 p-3.5 space-y-2.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
            <span className="text-[13px] font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Diagnostic Cycle History</span>
            </span>
            <span className="text-[13px] font-medium text-slate-500">
              Window: 150 Qs
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
            {/* Active Cycle (In Progress) */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">Cycle {currentCycleNumber}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[13px] font-semibold text-amber-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> In Progress
                </span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-medium text-slate-700">
                <span>{currentCycleQuestionCount} / 150 questions</span>
                <span className="font-semibold">{Math.round((currentCycleQuestionCount / 150) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((currentCycleQuestionCount / 150) * 100)}%` }}
                />
              </div>
            </div>

            {/* Completed Historical Cycles */}
            {diagnosticCycles.length === 0 ? (
              <p className="text-center text-[13px] font-medium text-slate-400 py-3">
                No completed cycles yet. Reach 150 questions to close Cycle 1!
              </p>
            ) : (
              [...diagnosticCycles]
                .reverse()
                .map((cycle) => {
                  const cycleAcc = Math.round(
                    cycle.overallAccuracyPercentage ?? cycle.accuracyPercentage ?? 0
                  );
                  const delta = cycle1Acc !== null ? cycleAcc - cycle1Acc : null;
                  const deltaText =
                    delta !== null
                      ? delta > 0
                        ? `+${delta}% vs Cycle 1`
                        : delta < 0
                        ? `${delta}% vs Cycle 1`
                        : `0% vs Cycle 1`
                      : null;
                  const formattedDate = formatCycleDate(cycle.completedAt);

                  return (
                    <button
                      key={cycle.cycleNumber}
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onSelectCycle(cycle);
                      }}
                      className="w-full p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs text-left transition-all space-y-1.5 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          Cycle {cycle.cycleNumber}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[13px] font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[13px] font-medium text-slate-700">
                        <span>
                          {cycle.totalQuestionsAttempted || cycle.questionCount || 150}/150 questions
                        </span>
                        <span className="text-slate-900 font-bold">{cycleAcc}% Acc</span>
                      </div>
                      <div className="flex items-center justify-between text-[13px] font-medium text-slate-500 pt-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {cycle.cycleNumber === 1 ? (
                            <span>Baseline Profile</span>
                          ) : (
                            diagnosticCycles.length >= 2 &&
                            deltaText && (
                              <span
                                className={
                                  delta && delta > 0
                                    ? "text-emerald-600 font-semibold"
                                    : delta && delta < 0
                                    ? "text-rose-600 font-semibold"
                                    : "text-slate-600"
                                }
                              >
                                {deltaText}
                              </span>
                            )
                          )}
                          {formattedDate && (
                            <>
                              <span>·</span>
                              <span>{formattedDate}</span>
                            </>
                          )}
                        </div>
                        <span className="text-blue-600 font-semibold group-hover:underline text-[13px] shrink-0">
                          View Analysis →
                        </span>
                      </div>
                    </button>
                  );
                })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

