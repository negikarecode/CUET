import React, { useState, useMemo } from 'react';
import { useTestStore } from '@/lib/store/useTestStore';
import { generate90DayHeatmap, HeatmapDay } from '@/lib/heatmap-utils';

export const DailyPracticeCalendar: React.FC = () => {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const testAttempts = useTestStore((s) => s.testAttempts);

  const attempts = useMemo(() => {
    if (testAttempts && testAttempts.length > 0) {
      return testAttempts;
    }
    return [
      {
        submittedAt: '2026-10-06T14:30:00.000Z',
        subject: 'Environmental Studies',
        attemptedCount: 50,
        score: 10,
      },
    ];
  }, [testAttempts]);

  const heatmapData = useMemo(() => {
    return generate90DayHeatmap(new Date('2026-10-10'), attempts);
  }, [attempts]);

  const getCellColor = (count: number, isInRange: boolean) => {
    if (!isInRange) return 'bg-slate-50 opacity-40 border border-slate-100 cursor-default';
    if (count === 0) return 'bg-slate-100 border border-slate-200/50';
    if (count <= 1) return 'bg-[#BFDBFE] border border-[#93C5FD]'; // Step 1: Blue 200
    if (count <= 3) return 'bg-[#60A5FA] border border-[#3B82F6]'; // Step 2: Blue 400
    if (count <= 5) return 'bg-[var(--accent)] border border-[var(--accent)]'; // Step 3: var(--accent)
    return 'bg-[var(--accent-hover)] border border-[var(--accent-hover)]'; // Step 4: var(--accent-hover)
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

  return (
    <div className="app-card space-y-4 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-3 gap-2">
        <div>
          <h2 className="text-[20px] font-semibold text-[var(--text)] leading-[1.25]">
            Activity
          </h2>
          <p className="text-[14px] text-[var(--text-secondary)] mt-0.5">
            Practice sessions over the last 90 days.
          </p>
        </div>

        <div className="text-[12px] text-[var(--text-muted)] tabular-nums self-start sm:self-auto">
          {heatmapData.totalMocks} tests completed • {heatmapData.totalQuestions} questions
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pt-2 pb-2">
        <div className="inline-block min-w-[500px]">
          {/* Month labels aligned with week columns (12px square + 3px gap = 15px pitch) */}
          <div className="relative h-5 mb-1 pl-8">
            {heatmapData.monthLabels.map((m, idx) => (
              <span
                key={`${m.name}-${idx}`}
                className="absolute text-[12px] font-medium text-[var(--text-muted)]"
                style={{ left: `${32 + m.columnIndex * 15}px` }}
              >
                {m.name}
              </span>
            ))}
          </div>

          {/* Grid: Day labels + Week columns */}
          <div className="flex gap-[3px] items-start">
            {/* Day of week labels */}
            <div className="flex flex-col gap-[3px] text-[12px] text-[var(--text-muted)] w-8 text-right pr-2 select-none">
              <span className="h-3 leading-[12px]">Mon</span>
              <span className="h-3 leading-[12px] opacity-0" aria-hidden="true">Tue</span>
              <span className="h-3 leading-[12px]">Wed</span>
              <span className="h-3 leading-[12px] opacity-0" aria-hidden="true">Thu</span>
              <span className="h-3 leading-[12px]">Fri</span>
              <span className="h-3 leading-[12px] opacity-0" aria-hidden="true">Sat</span>
              <span className="h-3 leading-[12px] opacity-0" aria-hidden="true">Sun</span>
            </div>

            {/* Weeks */}
            <div className="flex gap-[3px]" role="grid" aria-label="Activity heatmap">
              {heatmapData.weeks.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]" role="row">
                  {week.map((day, rowIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${rowIdx}`}
                          className="w-3 h-3 rounded-[2px] bg-transparent"
                          aria-hidden="true"
                        />
                      );
                    }

                    return (
                      <div
                        key={day.date}
                        role="gridcell"
                        aria-label={day.tooltipText}
                        onMouseEnter={(e) => handleMouseEnter(day, e)}
                        onMouseLeave={handleMouseLeave}
                        className={`w-3 h-3 rounded-[2px] transition-colors cursor-pointer ${getCellColor(
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
          <div className="flex items-center justify-end gap-1.5 mt-4 text-[12px] text-[var(--text-muted)]">
            <span>Less</span>
            <div className="flex gap-[3px]">
              <div className="w-3 h-3 rounded-[2px] bg-slate-100 border border-slate-200/50" />
              <div className="w-3 h-3 rounded-[2px] bg-[#BFDBFE] border border-[#93C5FD]" />
              <div className="w-3 h-3 rounded-[2px] bg-[#60A5FA] border border-[#3B82F6]" />
              <div className="w-3 h-3 rounded-[2px] bg-[var(--accent)] border border-[var(--accent)]" />
              <div className="w-3 h-3 rounded-[2px] bg-[var(--accent-hover)] border border-[var(--accent-hover)]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && tooltipPos && (
        <div
          className="fixed pointer-events-none z-50 bg-white border border-[var(--border)] text-[var(--text)] rounded-[8px] px-3 py-1.5 text-[12px] shadow-[0_8px_24px_rgba(15,23,42,0.12)] -translate-x-1/2 -translate-y-full"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="font-semibold">{hoveredDay.formattedDate}</div>
          <div className="text-[var(--text-secondary)] tabular-nums">
            {hoveredDay.count === 0
              ? 'No practice activity'
              : `${hoveredDay.count} ${hoveredDay.count === 1 ? 'test' : 'tests'} (${hoveredDay.questionCount} questions)`}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyPracticeCalendar;
