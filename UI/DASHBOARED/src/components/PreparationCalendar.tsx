import React, { useState } from 'react';
import { ArrowUpRight, Calendar as CalendarIcon, CheckCircle2, Clock, Sparkles, Activity } from 'lucide-react';
import { PREPARATION_CALENDAR_DAYS } from '../data/mockData';
import { GlowCard } from './GlowCard';
import { DailyPracticeCalendar } from './DailyPracticeCalendar';

export const PreparationCalendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'activity'>('schedule');
  const [selectedDayId, setSelectedDayId] = useState<string>('cal-wed'); // Wed 28 default active as per spec!

  const currentSelected = PREPARATION_CALENDAR_DAYS.find(d => d.id === selectedDayId) || PREPARATION_CALENDAR_DAYS[2];

  return (
    <GlowCard className="p-6 h-full flex flex-col justify-between">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Preparation Calendar
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md action-glow cursor-default">
              May – Jun 2025
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeTab === 'schedule' 
              ? 'Weekly structured revision & mock roadmap' 
              : '90-day practice consistency & streak activity'}
          </p>
        </div>

        {/* Tab switch & View Calendar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === 'schedule'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Roadmap
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                activeTab === 'activity'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Activity className="w-3 h-3 text-emerald-500" />
              Activity Heatmap
            </button>
          </div>

          <button 
            onClick={() => alert('Opening Full Monthly Preparation Schedule')}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg text-blue-600 hover:text-blue-700 action-glow group"
          >
            <span>Full View</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {activeTab === 'activity' ? (
        <div className="my-auto py-2">
          <DailyPracticeCalendar />
        </div>
      ) : (
        <>
          {/* 7-Day Strip Layout: Horizontal Grid (Mon 26 to Sun 1) */}
          <div className="my-auto py-3">
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
              {PREPARATION_CALENDAR_DAYS.map((day) => {
                const isSelected = day.id === selectedDayId;
                return (
                  <div
                    key={day.id}
                    onClick={() => setSelectedDayId(day.id)}
                    className={`flex flex-col items-center cursor-pointer transition-all duration-200 group rounded-xl p-1.5 sm:p-2 action-glow ${
                      isSelected 
                        ? 'ring-2 ring-slate-900 ring-offset-2' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Date header box */}
                    <div
                      className={`w-full py-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-slate-50 text-slate-700 group-hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider opacity-75">
                        {day.dayShort}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold mt-0.5">
                        {day.dayNumber}
                      </span>
                    </div>

                    {/* Below each date column: Color-coded activity pill */}
                    <div className="mt-2 w-full text-center">
                      <div
                        className={`text-[9px] sm:text-[10px] font-bold py-1 px-1 rounded-md leading-tight line-clamp-2 transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-white ring-1 ring-slate-800'
                            : 'border border-transparent'
                        }`}
                        style={{
                          backgroundColor: isSelected ? '#0F172A' : day.badgeBgColor,
                          color: isSelected ? '#FFFFFF' : day.badgeTextColor,
                          borderColor: isSelected ? 'transparent' : `${day.badgeColor}30`,
                        }}
                        title={day.activityTitle}
                      >
                        {day.activityTitle}
                      </div>
                    </div>

                    {/* Active Indicator dot */}
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1 animate-pulse"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Day Activity Preview Bar */}
          <div className="pt-3 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">
                {currentSelected.dayShort}, {currentSelected.dateStr}:
              </span>
              <span className="font-semibold text-slate-700 px-2 py-0.5 rounded-md action-glow cursor-pointer" style={{ backgroundColor: currentSelected.badgeBgColor, color: currentSelected.badgeTextColor }}>
                {currentSelected.activityTitle}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Scheduled Duration: 3.5 Hours</span>
            </div>
          </div>
        </>
      )}
    </GlowCard>
  );
};
