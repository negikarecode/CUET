import React, { useState, useMemo } from 'react';
import { Flame, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useTestStore } from '@/lib/store/useTestStore';
import { GlowCard } from './GlowCard';

interface DayPracticeData {
  date: string;       // YYYY-MM-DD
  dayOfWeek: number;  // 0 = Sun, 1 = Mon, ..., 6 = Sat
  monthIndex: number; // 0, 1, 2 for the 3 months
  monthName: string;
  count: number;      // Actual attempt count
  subjectTag?: string;
}

export const DailyPracticeCalendar: React.FC = () => {
  // Current 3-month window offset: 0 = current 3-month quarter, -1 = previous, +1 = next
  const [windowOffset, setWindowOffset] = useState<number>(0);
  const [hoveredDay, setHoveredDay] = useState<DayPracticeData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const testAttempts = useTestStore((s) => s.testAttempts);
  const activeStreak = useTestStore((s) => s.user.dailyStreak) || 0;

  // Map real attempts by YYYY-MM-DD
  const attemptsByDate = useMemo(() => {
    const map: Record<string, { count: number; subjects: Set<string> }> = {};
    testAttempts.forEach((att) => {
      if (!att.submittedAt) return;
      const dateKey = att.submittedAt.slice(0, 10);
      if (!map[dateKey]) {
        map[dateKey] = { count: 0, subjects: new Set() };
      }
      map[dateKey].count += 1;
      if (att.subject) map[dateKey].subjects.add(att.subject);
    });
    return map;
  }, [testAttempts]);

  // Month configurations dynamically computed from current date
  const windowMonths = useMemo(() => {
    const now = new Date();
    const currentMonthIdx = now.getMonth();
    const currentYear = now.getFullYear();
    const shift = windowOffset * 3;

    return [-2, -1, 0].map((rel, idx) => {
      const d = new Date(currentYear, currentMonthIdx + rel + shift, 1);
      const month = d.getMonth();
      const year = d.getFullYear();
      const days = new Date(year, month + 1, 0).getDate();
      const startDay = d.getDay();
      const name = d.toLocaleDateString('en-US', { month: 'short' });
      return { name, year, days, startDay, monthNumber: month + 1, windowIndex: idx };
    });
  }, [windowOffset]);

  const { weeksGrid, totalSubmissions } = useMemo(() => {
    const allDays: DayPracticeData[] = [];

    windowMonths.forEach((m) => {
      for (let d = 1; d <= m.days; d++) {
        const dateStr = `${m.year}-${String(m.monthNumber).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const match = attemptsByDate[dateStr];
        const count = match ? match.count : 0;
        const subjectTag = match && match.subjects.size > 0 
          ? Array.from(match.subjects).join(', ') 
          : undefined;

        allDays.push({
          date: dateStr,
          dayOfWeek: (d + m.startDay - 1) % 7,
          monthIndex: m.windowIndex,
          monthName: m.name,
          count,
          subjectTag,
        });
      }
    });

    const weeks: (DayPracticeData | null)[][] = [];
    let currentWeek: (DayPracticeData | null)[] = [];

    const getRowIndex = (dOfWeek: number) => (dOfWeek === 0 ? 6 : dOfWeek - 1);

    const firstDayRow = allDays[0] ? getRowIndex(allDays[0].dayOfWeek) : 0;
    for (let i = 0; i < firstDayRow; i++) {
      currentWeek.push(null);
    }

    allDays.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    const total = allDays.reduce((acc, d) => acc + d.count, 0);

    return {
      weeksGrid: weeks,
      totalSubmissions: total,
    };
  }, [windowMonths, attemptsByDate]);

  const getCellColor = (count: number) => {
    if (count === 0) return 'bg-slate-100 hover:bg-slate-200 border border-slate-200/50';
    if (count <= 1) return 'bg-[#86efac] hover:bg-[#4ade80] border border-[#4ade80]/40';
    if (count <= 3) return 'bg-[#34d399] hover:bg-[#10b981] border border-[#10b981]/40';
    if (count <= 5) return 'bg-[#10b981] hover:bg-[#059669] border border-[#059669]/50 shadow-2xs';
    return 'bg-[#047857] hover:bg-[#065f46] border border-[#065f46] shadow-2xs';
  };

  return (
    <GlowCard className="p-6 h-full flex flex-col justify-between relative group">
      
      {/* Header: Title, Subtitle, Streak & Month Range Switcher */}
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
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200/60">
                <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                {activeStreak}d streak
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              90-day consistency heatmap & mock drills
            </p>
          </div>
        </div>

        {/* Month Window Switcher */}
        <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 rounded-lg p-1 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setWindowOffset(prev => Math.max(prev - 1, -2))}
            disabled={windowOffset <= -2}
            aria-label="Previous 3 months"
            className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-bold text-slate-700 px-2 font-mono">
            {windowMonths[0]?.name} {windowMonths[0]?.year} – {windowMonths[2]?.name} {windowMonths[2]?.year}
          </span>
          <button
            onClick={() => setWindowOffset(prev => Math.min(prev + 1, 0))}
            disabled={windowOffset >= 0}
            aria-label="Next 3 months"
            className="p-1 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded hover:bg-white transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Heatmap Grid */}
      <div className="my-auto py-4 overflow-x-auto">
        {/* Month labels header */}
        <div className="flex text-xs font-semibold text-slate-400 mb-2 pl-6">
          <div className="flex justify-between w-full max-w-[460px] pr-2 font-mono">
            {windowMonths.map((m) => (
              <span key={`${m.name}-${m.year}`} className="tracking-wide">
                {m.name} {m.year}
              </span>
            ))}
          </div>
        </div>

        {/* Grid: 7 Rows (Mon-Sun) across weeks */}
        <div className="flex gap-2 items-start">
          
          {/* Day of week labels */}
          <div className="flex flex-col justify-between h-[106px] text-[10px] font-bold text-slate-400 select-none py-0.5 pr-1">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Week columns */}
          <div className="flex gap-1.5">
            {weeksGrid.map((week, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1.5">
                {week.map((day, rowIdx) => {
                  if (!day) {
                    return (
                      <div
                        key={rowIdx}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] opacity-0"
                      />
                    );
                  }
                  return (
                    <div
                      key={day.date}
                      onMouseEnter={(e) => {
                        setHoveredDay(day);
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top });
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[3px] transition-all duration-150 cursor-pointer ${getCellColor(
                        day.count
                      )}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer stats & Legend */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-700">
          <strong className="text-slate-900 font-extrabold">{totalSubmissions}</strong> completed practice drills in 3 months
        </span>

        {/* Less to More scale */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px]">Less</span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 border border-slate-200"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#86efac]"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#34d399]"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#10b981]"></span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#047857]"></span>
          <span className="text-slate-400 text-[11px]">More</span>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredDay && tooltipPos && (
        <div 
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 bg-slate-900 text-white rounded-lg px-2.5 py-1.5 shadow-xl text-left text-xs min-w-[150px] animate-in fade-in duration-100"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="font-bold text-slate-100 text-[11px]">
            {new Date(hoveredDay.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">
            {hoveredDay.count === 0 ? 'No drills completed' : `${hoveredDay.count} practice drills completed`}
          </div>
          {hoveredDay.subjectTag && (
            <div className="text-[9px] text-slate-300 mt-0.5 truncate">
              Focus: {hoveredDay.subjectTag}
            </div>
          )}
        </div>
      )}

    </GlowCard>
  );
};

export default DailyPracticeCalendar;
