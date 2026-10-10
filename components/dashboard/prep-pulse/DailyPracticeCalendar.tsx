import React, { useState, useMemo } from 'react';
import { Flame, Activity } from 'lucide-react';
import { useTestStore } from '@/lib/store/useTestStore';
import { GlowCard } from './GlowCard';
import { generate90DayHeatmap, HeatmapDay } from '@/lib/heatmap-utils';

export const DailyPracticeCalendar: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const testAttempts = useTestStore((s) => s.testAttempts);
  const activeStreak = useTestStore((s) => s.user.dailyStreak) || 1;

  // Real mock attempts or fallback attempt from test session
  const attempts = useMemo(() => {
    if (testAttempts && testAttempts.length > 0) {
      return testAttempts;
    }
    // Default single mock on Oct 6, 2026 if store is fresh
    return [
      {
        submittedAt: '2026-10-06T14:30:00.000Z',
        subject: 'Environmental Studies',
        attemptedCount: 50,
        score: 10,
      },
    ];
  }, [testAttempts]);

  // Heatmap ending today (2026-10-10)
  const heatmapData = useMemo(() => {
    return generate90DayHeatmap(new Date('2026-10-10'), attempts);
  }, [attempts]);

  const getCellColor = (count: number, isInRange: boolean) => {
    if (!isInRange) return 'bg-slate-50 opacity-40 border border-slate-100 cursor-not-allowed';
    if (count === 0) return 'bg-slate-100 hover:bg-slate-200 border border-slate-200/50';
    if (count <= 1) return 'bg-[#86efac] hover:bg-[#4ade80] border border-[#4ade80]/40';
    if (count <= 3) return 'bg-[#34d399] hover:bg-[#10b981] border border-[#10b981]/40';
    if (count <= 5) return 'bg-[#10b981] hover:bg-[#059669] border border-[#059669]/50 shadow-2xs';
    return 'bg-[#047857] hover:bg-[#065f46] border border-[#065f46] shadow-2xs';
  };

  return (
    <GlowCard className="p-6 h-full flex flex-col justify-between relative group">
      {/* Header: Title, Subtitle, Streak */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100/80 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Daily Practice Activity
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {activeStreak}d streak
              </span>
            </div>
            <p className="text-[13px] text-slate-500 mt-0.5">
              90-day consistency heatmap ending today
            </p>
          </div>
        </div>
      </div>

      {/* Main Heatmap Grid */}
      <div className="my-auto py-4 overflow-x-auto">
        <div className="min-w-[420px]">
          {/* Month labels header */}
          <div className="flex text-xs font-semibold text-slate-500 mb-2 pl-8 font-mono">
            <div className="flex justify-between w-full max-w-[420px] pr-2">
              {heatmapData.monthLabels.map((m, idx) => (
                <span key={`${m.name}-${idx}`} className="tracking-wide">
                  {m.name}
                </span>
              ))}
            </div>
          </div>

          {/* Grid: 7 Rows (Mon-Sun) across weeks */}
          <div className="flex gap-2 items-start">
            {/* Day of week labels aligned with 7 rows */}
            <div className="flex flex-col gap-1.5 text-[11px] font-semibold text-slate-400 select-none py-0 pr-1 w-6 text-right">
              <span className="h-3.5 sm:h-3.5 leading-[14px]">Mon</span>
              <span className="h-3.5 sm:h-3.5 leading-[14px] opacity-0" aria-hidden="true">Tue</span>
              <span className="h-3.5 sm:h-3.5 leading-[14px]">Wed</span>
              <span className="h-3.5 sm:h-3.5 leading-[14px] opacity-0" aria-hidden="true">Thu</span>
              <span className="h-3.5 sm:h-3.5 leading-[14px]">Fri</span>
              <span className="h-3.5 sm:h-3.5 leading-[14px] opacity-0" aria-hidden="true">Sat</span>
              <span className="h-3.5 sm:h-3.5 leading-[14px] opacity-0" aria-hidden="true">Sun</span>
            </div>

            {/* Week columns */}
            <div className="flex gap-1.5" role="grid" aria-label="90-day activity heatmap">
              {heatmapData.weeks.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1.5" role="row">
                  {week.map((day, rowIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${rowIdx}`}
                          className="w-3.5 h-3.5 rounded-[3px] opacity-0"
                          aria-hidden="true"
                        />
                      );
                    }
                    return (
                      <div
                        key={day.date}
                        role="gridcell"
                        aria-label={day.tooltipText}
                        tabIndex={0}
                        onMouseEnter={(e) => {
                          setHoveredDay(day);
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        onFocus={(e) => {
                          setHoveredDay(day);
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
                        }}
                        onBlur={() => setHoveredDay(null)}
                        className={`w-3.5 h-3.5 rounded-[3px] transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 ${getCellColor(
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
        </div>
      </div>

      {/* Footer stats & Legend */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] text-slate-500">
        <span className="font-semibold text-slate-700">
          <strong className="text-slate-900 font-extrabold">{heatmapData.totalMocks}</strong> mock ({heatmapData.totalQuestions} questions) in 90 days
        </span>

        {/* Less to More scale */}
        <div className="flex items-center gap-1.5 text-xs select-none">
          <span className="text-slate-400 text-[11px]">Less</span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 border border-slate-200" aria-label="0 activity"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#86efac]" aria-label="1 mock"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#34d399]" aria-label="2-3 mocks"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10b981]" aria-label="4-5 mocks"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#047857]" aria-label="5+ mocks"></span>
          <span className="text-slate-400 text-[11px]">More</span>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredDay && tooltipPos && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 bg-slate-900 text-white rounded-lg px-3 py-1.5 shadow-xl text-left text-xs min-w-[170px] animate-in fade-in duration-100"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="font-bold text-slate-100 text-[11px]">
            {hoveredDay.formattedDate}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
            {hoveredDay.count === 0 ? 'No practice activity' : `${hoveredDay.count} mock (${hoveredDay.questionCount} questions)`}
          </div>
          {hoveredDay.subjectTag && (
            <div className="text-[10px] text-slate-300 mt-0.5 truncate">
              Subject: {hoveredDay.subjectTag}
            </div>
          )}
        </div>
      )}
    </GlowCard>
  );
};

export default DailyPracticeCalendar;
