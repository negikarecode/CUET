"use client";

import React from "react";
import { Clock, AlertTriangle, ShieldAlert } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function StatsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-6 sm:py-8 bg-white border-y-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Chip 1: 72 Seconds */}
          <div className="p-4 sm:p-5 rounded-xl border-2 border-black bg-[#FAF7EE] shadow-[4px_4px_0px_0px_#000] flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#FEF3C7] border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
              <Clock className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-black font-mono">
                  {t("secondsPerQ", "72 Seconds")}
                </span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-black text-white font-mono">
                  {t("targetPace", "Target Pace")}
                </span>
              </div>
              <p className="text-xs text-black/80 font-bold mt-0.5 leading-snug">
                Strict per-question pace monitor so you don&apos;t blank out on question 43.
              </p>
            </div>
          </div>

          {/* Chip 2: -6 Net Mark Cost */}
          <div className="p-4 sm:p-5 rounded-xl border-2 border-black bg-[#FEE2E2] shadow-[4px_4px_0px_0px_#000] flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
              <AlertTriangle className="w-6 h-6 text-[#DC2626] stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-[#DC2626] font-mono">
                  {t("netMarkCost", "-6 Net Mark Cost")}
                </span>
              </div>
              <p className="text-xs text-black/80 font-bold mt-0.5 leading-snug">
                Every wrong answer wipes out +5 potential marks plus a -1 penalty.
              </p>
            </div>
          </div>

          {/* Chip 3: 0 Chapter Skips */}
          <div className="p-4 sm:p-5 rounded-xl border-2 border-black bg-[#D1FAE5] shadow-[4px_4px_0px_0px_#000] flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]">
              <ShieldAlert className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-black font-mono">
                  {t("zeroChapterSkips", "0 Chapter Skips")}
                </span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-black text-white font-mono">
                  {t("mandatoryFifty", "50/50 Mandatory")}
                </span>
              </div>
              <p className="text-xs text-black/80 font-bold mt-0.5 leading-snug">
                100% compulsory questions mean choice buffers are dead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
