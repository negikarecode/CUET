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

export function CycleHistorySelector({
  currentCycleNumber,
  currentCycleQuestionCount,
  diagnosticCycles,
  onSelectCycle,
}: CycleHistorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200/80 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
      >
        <History className="w-3.5 h-3.5 text-blue-600" />
        <span>Cycle History ({diagnosticCycles.length} Completed)</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Popover list */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-100 shadow-xl z-40 p-3 space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-1">
            <span className="text-[11px] font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Diagnostic Cycle History</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 font-mono">
              Window: 150 Qs
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
            {/* Active Cycle (In Progress) */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Cycle {currentCycleNumber}</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-semibold uppercase text-amber-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> In Progress
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-600">
                <span>{currentCycleQuestionCount} / 150 questions</span>
                <span>{Math.round((currentCycleQuestionCount / 150) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                  style={{ width: `${Math.max(3, (currentCycleQuestionCount / 150) * 100)}%` }}
                />
              </div>
            </div>

            {/* Completed Historical Cycles */}
            {diagnosticCycles.length === 0 ? (
              <p className="text-center text-xs font-medium text-slate-400 py-3">
                No completed cycles yet. Reach 150 questions to close Cycle 1!
              </p>
            ) : (
              [...diagnosticCycles]
                .reverse()
                .map((cycle) => (
                  <button
                    key={cycle.cycleNumber}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      onSelectCycle(cycle);
                    }}
                    className="w-full p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs text-left transition-all space-y-1 group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600">
                        Cycle {cycle.cycleNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-semibold uppercase text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600 font-mono">
                      <span>{cycle.totalQuestionsAttempted}/150 questions</span>
                      <span className="text-slate-900 font-bold">{cycle.overallAccuracyPercentage}% Acc</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-medium text-slate-400 pt-0.5">
                      <span>
                        {cycle.cycleNumber === 1
                          ? "Baseline Profile"
                          : `Compared vs Cycle ${cycle.cycleNumber - 1}`}
                      </span>
                      <span className="text-blue-600 font-semibold group-hover:underline">
                        View Analysis →
                      </span>
                    </div>
                  </button>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
