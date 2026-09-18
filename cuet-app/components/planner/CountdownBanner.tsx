'use client';
import React from 'react';
import { Calendar, AlertTriangle, Flame, Clock } from 'lucide-react';

interface CountdownBannerProps {
  daysToExam: number;
  dailyHours?: number;
  examDate?: string;
}

export default function CountdownBanner({
  daysToExam,
  dailyHours = 4,
  examDate = 'May 15, 2026',
}: CountdownBannerProps) {
  const totalHoursLeft = daysToExam * dailyHours;

  // Assuming a standard 90-day preparation window
  const totalPrepDays = 90;
  const daysElapsed = Math.max(0, totalPrepDays - daysToExam);
  const prepProgress = Math.min(100, Math.round((daysElapsed / totalPrepDays) * 100));

  if (daysToExam <= 7) {
    return (
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white shadow-lg border border-red-500/50 animate-pulse">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <AlertTriangle className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20">
                  FINAL STRETCH
                </span>
                <span className="text-xs text-rose-100 font-medium">{examDate}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black mt-0.5">
                🚨 CUET IN {daysToExam} {daysToExam === 1 ? 'DAY' : 'DAYS'}!
              </h2>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-white/20 sm:pl-4">
            <p className="text-xs font-semibold text-rose-100">
              Revision only. No new topics. Sleep 8h & stay calm!
            </p>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-[11px] font-medium text-rose-100 mb-1">
            <span>Prep timeline</span>
            <span>{prepProgress}% elapsed</span>
          </div>
          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${prepProgress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  if (daysToExam <= 30) {
    return (
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md border border-amber-400/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/15">
                  CRITICAL PHASE
                </span>
                <span className="text-xs text-amber-100">{examDate}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black mt-0.5">
                ⚠️ {daysToExam} DAYS TO CUET — Final Phase!
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs">
            <span className="block font-bold text-amber-100">{totalHoursLeft} study hours left</span>
            <span className="text-amber-200 text-[11px]">Focus on critical & weak topics</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between text-[11px] font-medium text-amber-100 mb-1">
            <span>Prep timeline</span>
            <span>{prepProgress}% elapsed</span>
          </div>
          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${prepProgress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-md border border-indigo-700/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-indigo-300">
            <Calendar className="w-6 h-6 text-indigo-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                CUET UG 2026 TARGET
              </span>
              <span className="text-xs text-indigo-200">• {examDate}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black mt-0.5">
              📅 {daysToExam} Days to CUET
            </h2>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <div className="flex items-center sm:justify-end gap-1.5 text-xs text-indigo-200">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              {daysToExam} days × {dailyHours}h = <strong className="text-white font-bold">{totalHoursLeft} hours</strong> left
            </span>
          </div>
          <span className="text-[11px] text-indigo-300 block mt-0.5">
            Plenty of time to master all domain topics with discipline.
          </span>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex justify-between text-[11px] font-medium text-indigo-200 mb-1">
          <span>Preparation Journey</span>
          <span>{prepProgress}% of prep time elapsed</span>
        </div>
        <div className="w-full h-2 bg-indigo-950/80 rounded-full overflow-hidden border border-indigo-700/40">
          <div
            className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full transition-all duration-500"
            style={{ width: `${prepProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
