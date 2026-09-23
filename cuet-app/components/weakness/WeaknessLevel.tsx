"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, PlayCircle, Sparkles } from "lucide-react";
import { WeaknessScore, Topic } from "@/lib/types";
import { TopicCard } from "./TopicCard";
import { Button } from "@/components/ui/button";

interface WeaknessLevelProps {
  critical: WeaknessScore[];
  weak: WeaknessScore[];
  average: WeaknessScore[];
  strong: WeaknessScore[];
  excellent: WeaknessScore[];
  untested: Topic[];
}

export function WeaknessLevel({
  critical,
  weak,
  average,
  strong,
  excellent,
  untested,
}: WeaknessLevelProps) {
  const [showAllWeak, setShowAllWeak] = useState(false);
  const [expandAverage, setExpandAverage] = useState(false);
  const [expandMastered, setExpandMastered] = useState(false);
  const [expandUntested, setExpandUntested] = useState(false);

  const displayedWeak = showAllWeak ? weak : weak.slice(0, 4);
  const mastered = [...excellent, ...strong];

  return (
    <div className="w-full space-y-6">
      {/* 1. CRITICAL SECTION (Red) */}
      {critical.length > 0 && (
        <section className="space-y-3" aria-labelledby="critical-heading">
          <div className="flex items-center justify-between">
            <h3 id="critical-heading" className="text-base sm:text-lg font-bold text-red-700 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              Fix These First ({critical.length})
            </h3>
            <span className="text-xs text-red-600 font-medium hidden sm:inline">
              High priority for score boost
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {critical.map((score) => (
              <TopicCard key={score.topic_id} score={score} />
            ))}
          </div>
        </section>
      )}

      {/* 2. WEAK SECTION (Orange) */}
      {weak.length > 0 && (
        <section className="space-y-3" aria-labelledby="weak-heading">
          <div className="flex items-center justify-between">
            <h3 id="weak-heading" className="text-base sm:text-lg font-bold text-orange-700 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              Needs Regular Practice ({weak.length})
            </h3>
            {weak.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllWeak(!showAllWeak)}
                className="text-xs text-orange-700 hover:text-orange-900 h-8"
              >
                {showAllWeak ? "Show Less" : `Show All (${weak.length})`}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedWeak.map((score) => (
              <TopicCard key={score.topic_id} score={score} />
            ))}
          </div>
        </section>
      )}

      {/* 3. AVERAGE SECTION (Yellow) */}
      {average.length > 0 && (
        <section className="space-y-3 rounded-xl border border-yellow-200 bg-yellow-50/50 p-4" aria-labelledby="average-heading">
          <button
            type="button"
            onClick={() => setExpandAverage(!expandAverage)}
            className="w-full flex items-center justify-between text-left focus:outline-none min-h-[44px]"
          >
            <h3 id="average-heading" className="text-sm sm:text-base font-bold text-yellow-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              Moderate Mastery Topics ({average.length})
            </h3>
            <span className="text-xs text-yellow-700 flex items-center gap-1 font-semibold">
              {expandAverage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {expandAverage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {average.map((score) => (
                <TopicCard key={score.topic_id} score={score} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* 4. MASTERED SECTION (Green/Emerald) */}
      {mastered.length > 0 && (
        <section className="space-y-3 rounded-xl border border-green-200 bg-green-50/50 p-4" aria-labelledby="mastered-heading">
          <button
            type="button"
            onClick={() => setExpandMastered(!expandMastered)}
            className="w-full flex items-center justify-between text-left focus:outline-none min-h-[44px]"
          >
            <h3 id="mastered-heading" className="text-sm sm:text-base font-bold text-green-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
              Mastered & Strong Topics ({mastered.length})
            </h3>
            <span className="text-xs text-green-700 flex items-center gap-1 font-semibold">
              {expandMastered ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {expandMastered && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {mastered.map((score) => (
                <TopicCard key={score.topic_id} score={score} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* 5. UNTESTED SECTION (Gray) */}
      {untested.length > 0 && (
        <section className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4" aria-labelledby="untested-heading">
          <button
            type="button"
            onClick={() => setExpandUntested(!expandUntested)}
            className="w-full flex items-center justify-between text-left focus:outline-none min-h-[44px]"
          >
            <h3 id="untested-heading" className="text-sm sm:text-base font-bold text-slate-700 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              ⬜ Untested Topics ({untested.length})
            </h3>
            <span className="text-xs text-slate-600 flex items-center gap-1 font-semibold">
              {expandUntested ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {expandUntested && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {untested.map((t) => (
                <div key={t.id} className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-2 shadow-sm">
                  <div className="overflow-hidden">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">{t.topic_name}</h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <span>⬜ You haven&apos;t tried this yet</span>
                    </p>
                  </div>
                  <Link href={`/practice/ai/${t.id}?weakness_level=untested`}>
                    <Button size="sm" className="h-8 text-xs font-bold gap-1 min-h-[36px] bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      Try AI Questions →
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}

        </section>
      )}
    </div>
  );
}
