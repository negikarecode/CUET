"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle, ArrowRight, X } from "lucide-react";
import { isValidPair } from "@/lib/college-offerings";

interface InvalidTargetBannerProps {
  college?: string | null;
  course?: string | null;
  onOpenEditModal: () => void;
  className?: string;
}

export default function InvalidTargetBanner({
  college,
  course,
  onOpenEditModal,
  className = "",
}: InvalidTargetBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem("cuet_invalid_target_banner_dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    }
  }, []);

  if (!college || !course) return null;

  // If the pair is already valid, do not show banner
  const valid = isValidPair(college, course);
  if (valid || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("cuet_invalid_target_banner_dismissed", "true");
    }
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-950 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 duration-200 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs sm:text-sm font-bold text-amber-900 leading-snug">
            Your saved target ({course} at {college}) isn&apos;t a valid combination. Update your goal.
          </p>
          <p className="text-[11px] sm:text-xs text-amber-700 leading-relaxed">
            Historical benchmarks for this target are currently marked as unverified until you select an offered degree course.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={onOpenEditModal}
          className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Update Goal</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="p-2 rounded-xl hover:bg-amber-100 text-amber-600 hover:text-amber-800 transition-colors cursor-pointer"
          title="Dismiss notice for this session"
          aria-label="Dismiss invalid target warning"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
