"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionButtonProps {
  id: "A" | "B" | "C" | "D";
  text: string;
  isSelected: boolean;
  isSubmitted: boolean;
  isCorrect: boolean;
  onSelect: (id: "A" | "B" | "C" | "D") => void;
  disabled?: boolean;
}

export function OptionButton({
  id,
  text,
  isSelected,
  isSubmitted,
  isCorrect,
  onSelect,
  disabled = false,
}: OptionButtonProps) {
  // Determine button styles based on state
  let stateClasses = "border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/30";
  let letterBadgeClasses = "bg-slate-100 text-slate-700 border-slate-200";

  if (isSubmitted) {
    if (isCorrect) {
      stateClasses = "border-green-500 bg-green-50/80 text-green-950 font-medium shadow-sm ring-1 ring-green-500";
      letterBadgeClasses = "bg-green-600 text-white border-green-600";
    } else if (isSelected && !isCorrect) {
      stateClasses = "border-red-500 bg-red-50/80 text-red-950 font-medium shadow-sm ring-1 ring-red-500";
      letterBadgeClasses = "bg-red-600 text-white border-red-600";
    } else {
      stateClasses = "border-slate-200 bg-slate-50/50 text-slate-400 opacity-60";
      letterBadgeClasses = "bg-slate-100 text-slate-400 border-slate-200";
    }
  } else if (isSelected) {
    stateClasses = "border-indigo-600 bg-indigo-50/60 text-indigo-950 font-semibold ring-2 ring-indigo-600/30";
    letterBadgeClasses = "bg-indigo-600 text-white border-indigo-600";
  }

  return (
    <button
      type="button"
      disabled={disabled || isSubmitted}
      onClick={() => onSelect(id)}
      className={cn(
        "w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-150 min-h-[52px] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
        stateClasses
      )}
      aria-label={`Option ${id}: ${text}`}
    >
      <div className="flex items-center gap-3 w-full pr-2">
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-xs sm:text-sm transition-colors",
            letterBadgeClasses
          )}
        >
          {id}
        </div>
        <span className="text-sm sm:text-base leading-relaxed break-words">{text}</span>
      </div>

      {isSubmitted && (
        <div className="flex-shrink-0 ml-2">
          {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
          {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
        </div>
      )}
    </button>
  );
}
