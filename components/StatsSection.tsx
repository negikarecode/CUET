"use client";

import React from "react";
import { Clock, AlertTriangle, ShieldAlert } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function StatsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-8 sm:py-10 bg-slate-50/50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Chip 1: 72 Seconds */}
          <div className="p-5 sm:p-6 rounded-3xl border border-slate-200/80 bg-white shadow-xs hover:shadow-sm transition-all flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600 group-hover:scale-105 transition-transform shadow-xs">
              <Clock className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {t("secondsPerQ", "72 Seconds")}
                </span>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700">
                  {t("targetPace", "Target Pace")}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                Strict per-question pace monitor so you don&apos;t blank out on question 43.
              </p>
            </div>
          </div>

          {/* Chip 2: -6 Net Mark Cost */}
          <div className="p-5 sm:p-6 rounded-3xl border border-slate-200/80 bg-white shadow-xs hover:shadow-sm transition-all flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 text-rose-600 group-hover:scale-105 transition-transform shadow-xs">
              <AlertTriangle className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-rose-600 tracking-tight">
                  {t("netMarkCost", "-6 Net Mark Cost")}
                </span>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200/60 text-rose-700">
                  Penalty
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                Every wrong answer wipes out +5 potential marks plus a -1 penalty.
              </p>
            </div>
          </div>

          {/* Chip 3: 0 Chapter Skips */}
          <div className="p-5 sm:p-6 rounded-3xl border border-slate-200/80 bg-white shadow-xs hover:shadow-sm transition-all flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 group-hover:scale-105 transition-transform shadow-xs">
              <ShieldAlert className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {t("zeroChapterSkips", "0 Chapter Skips")}
                </span>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700">
                  {t("mandatoryFifty", "50/50 Mandatory")}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                100% compulsory questions mean choice buffers are dead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
