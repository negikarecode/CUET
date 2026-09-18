"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WeaknessLevel } from "@/lib/types";

interface ProgressBarProps {
  value: number; // 0 to 100
  level?: WeaknessLevel;
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
  animate?: boolean;
}

export function ProgressBar({
  value,
  level = "average",
  height = "md",
  showLabel = false,
  className,
  animate = true,
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, animate]);

  const levelColors: Record<WeaknessLevel, { bar: string; track: string }> = {
    critical: { bar: "bg-red-600", track: "bg-red-100" },
    weak: { bar: "bg-orange-500", track: "bg-orange-100" },
    average: { bar: "bg-yellow-500", track: "bg-yellow-100" },
    strong: { bar: "bg-green-600", track: "bg-green-100" },
    excellent: { bar: "bg-emerald-600", track: "bg-emerald-100" },
    untested: { bar: "bg-slate-400", track: "bg-slate-100" },
  };

  const heightClasses = {
    sm: "h-1.5",
    md: "h-2", // 8px standard per design system
    lg: "h-3",
  };

  const activeColors = levelColors[level] || levelColors.untested;

  return (
    <div className={cn("w-full space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
          <span>Progress</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        className={cn(
          "w-full overflow-hidden rounded-full transition-colors",
          heightClasses[height],
          activeColors.track
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            activeColors.bar
          )}
          style={{ width: `${Math.max(0, Math.min(100, displayValue))}%` }}
        />
      </div>
    </div>
  );
}
