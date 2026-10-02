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
        className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center gap-2 transition-all"
      >
        <History className="w-3.5 h-3.5 text-[#FF5C5C]" />
        <span>Cycle History ({diagnosticCycles.length} Completed)</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Popover list */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border-3 border-black shadow-[6px_6px_0px_0px_#000] z-40 p-3 space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b-2 border-black/10 px-1">
            <span className="text-[11px] font-black uppercase text-black tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Diagnostic Cycle History</span>
            </span>
            <span className="text-[10px] font-bold text-black/60 font-mono">
              Window: 150 Qs
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
            {/* Active Cycle (In Progress) */}
            <div className="p-3 rounded-xl bg-[#FAF7EE] border-2 border-black shadow-[2px_2px_0px_0px_#000] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-black">Cycle {currentCycleNumber}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] border border-black text-[10px] font-black uppercase text-[#B45309] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> In Progress
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono font-bold text-black/70">
                <span>{currentCycleQuestionCount} / 150 questions</span>
                <span>{Math.round((currentCycleQuestionCount / 150) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-white border border-black rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#F59E0B] to-[#10B981]"
                  style={{ width: `${Math.max(3, (currentCycleQuestionCount / 150) * 100)}%` }}
                />
              </div>
            </div>

            {/* Completed Historical Cycles */}
            {diagnosticCycles.length === 0 ? (
              <p className="text-center text-xs font-semibold text-black/60 py-3">
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
                    className="w-full p-3 rounded-xl bg-white hover:bg-[#F0FDF4] border-2 border-black shadow-[2px_2px_0px_0px_#000] text-left transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-black group-hover:text-[#15803D]">
                        Cycle {cycle.cycleNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] border border-black text-[10px] font-black uppercase text-[#16A34A] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-black/80 font-mono">
                      <span>{cycle.totalQuestionsAttempted}/150 questions</span>
                      <span className="text-black font-black">{cycle.overallAccuracyPercentage}% Acc</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-medium text-black/60 pt-0.5">
                      <span>
                        {cycle.cycleNumber === 1
                          ? "Baseline Profile"
                          : `Compared vs Cycle ${cycle.cycleNumber - 1}`}
                      </span>
                      <span className="text-[#FF5C5C] font-bold underline group-hover:no-underline">
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
