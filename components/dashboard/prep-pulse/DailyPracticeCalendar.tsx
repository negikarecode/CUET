"use client";

import React, { useState, useMemo } from "react";
import { Info } from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { generateHeatmapGrid, HeatmapDay } from "@/lib/heatmap-utils";
import { deduplicateTestAttempts } from "@/lib/analytics";

export const DailyPracticeCalendar: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const testAttempts = useTestStore((s) => s.testAttempts);

  const attempts = useMemo(() => {
    return deduplicateTestAttempts(testAttempts || []);
  }, [testAttempts]);

  const heatmapData = useMemo(() => {
    return generateHeatmapGrid(new Date(), attempts, 60);
  }, [attempts]);

  const getCellColor = (count: number, isInRange: boolean) => {
    if (!isInRange) return "bg-[#FAF3EB]/50 opacity-40 border border-[#EFE6DC] cursor-default";
    if (count === 0) return "bg-[#FAF3EB] border border-[#EFE6DC] hover:border-[#E2D4C3]";
    if (count <= 1) return "bg-[#FDE6D2] border border-[#F6D3AF] hover:border-[#C2410C]";
    if (count <= 3) return "bg-[#FED7AA] border border-[#F97316] hover:border-[#C2410C]";
    if (count <= 5) return "bg-[#EA580C] border border-[#C2410C] hover:bg-[#C2410C]";
    return "bg-[#C2410C] border border-[#9A3412] hover:bg-[#9A3412]";
  };

  const handleMouseEnter = (day: HeatmapDay | null, e: React.MouseEvent) => {
    if (!day || !day.isInRange) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay(day);
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
    setTooltipPos(null);
  };

  const PITCH = 22;

  return (
    <div className="bg-white rounded-2xl border border-[#EFE6DC] p-5 sm:p-6 shadow-2xs space-y-4 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EFE6DC] pb-3 gap-2">
        <div>
          <h2 className="text-base font-bold text-[#1C1917] tracking-tight leading-tight">
            Practice activity
          </h2>
          <p className="text-xs text-[#8C7D73] mt-0.5">
            Daily study sessions, practice drills, and mock exams over the last 60 days.
          </p>
        </div>

        <div className="text-xs text-[#5C524A] tabular-nums self-start sm:self-auto font-medium bg-[#FFF8F0] px-2.5 py-1 rounded-lg border border-[#EFE6DC]">
          <strong className="text-[#1C1917]">{heatmapData.totalMocks}</strong> {heatmapData.totalMocks === 1 ? "test" : "tests"} completed • <strong className="text-[#1C1917]">{heatmapData.totalQuestions}</strong> questions answered
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pt-1 pb-1">
        <div className="inline-block min-w-[340px]">
          {/* Month labels aligned with week columns */}
          <div className="relative h-4 mb-1 pl-8">
            {heatmapData.monthLabels.map((m, idx) => (
              <span
                key={`${m.name}-${idx}`}
                className="absolute text-[11px] font-semibold text-slate-400"
                style={{ left: `${32 + m.columnIndex * PITCH}px` }}
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* Grid: Day labels + Week columns */}
          <div className="flex gap-1 items-start">
            {/* Day of week labels */}
            <div className="flex flex-col gap-1 text-[10px] sm:text-[11px] font-medium text-slate-400 w-8 text-right pr-2 select-none">
              <span className="h-[18px] leading-[18px]">Mon</span>
              <span className="h-[18px] leading-[18px] opacity-0" aria-hidden="true">Tue</span>
              <span className="h-[18px] leading-[18px]">Wed</span>
              <span className="h-[18px] leading-[18px] opacity-0" aria-hidden="true">Thu</span>
              <span className="h-[18px] leading-[18px]">Fri</span>
              <span className="h-[18px] leading-[18px] opacity-0" aria-hidden="true">Sat</span>
              <span className="h-[18px] leading-[18px] opacity-0" aria-hidden="true">Sun</span>
            </div>

            {/* Weeks */}
            <div className="flex gap-1" role="grid" aria-label="Activity heatmap">
              {heatmapData.weeks.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1" role="row">
                  {week.map((day, rowIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${rowIdx}`}
                          className="w-[18px] h-[18px] rounded-xs bg-transparent"
                          aria-hidden="true"
                        />
                      );
                    }

                    return (
                      <div
                        key={day.date}
                        role="gridcell"
                        tabIndex={0}
                        aria-label={day.tooltipText}
                        onMouseEnter={(e) => handleMouseEnter(day, e)}
                        onMouseLeave={handleMouseLeave}
                        onFocus={(e) => handleMouseEnter(day, e as any)}
                        onBlur={handleMouseLeave}
                        className={`w-[18px] h-[18px] rounded-xs transition-colors cursor-pointer outline-hidden focus:ring-2 focus:ring-blue-500 ${getCellColor(
                          day.count,
                          day.isInRange
                        )}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Scale Legend */}
          <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
            <span className="text-[11px] flex items-center gap-1">
              <Info className="w-3 h-3 text-slate-400" />
              Hover or focus any square to inspect activity details.
            </span>

            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-[16px] h-[16px] rounded-xs bg-slate-100 border border-slate-200/50" />
                <div className="w-[16px] h-[16px] rounded-xs bg-blue-100 border border-blue-200" />
                <div className="w-[16px] h-[16px] rounded-xs bg-blue-300 border border-blue-400" />
                <div className="w-[16px] h-[16px] rounded-xs bg-blue-600 border border-blue-600" />
                <div className="w-[16px] h-[16px] rounded-xs bg-indigo-700 border border-indigo-700" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && tooltipPos && (
        <div
          className="fixed pointer-events-none z-50 bg-white border border-slate-200 text-slate-900 rounded-lg px-3 py-1.5 text-xs shadow-md -translate-x-1/2 -translate-y-full"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="font-bold text-slate-900">{hoveredDay.formattedDate}</div>
          <div className="text-slate-600 tabular-nums">
            {hoveredDay.count === 0
              ? "No practice activity"
              : `${hoveredDay.count} ${hoveredDay.count === 1 ? "test" : "tests"} (${hoveredDay.questionCount} questions)`}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyPracticeCalendar;
