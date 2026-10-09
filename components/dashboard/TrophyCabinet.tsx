"use client";

import React, { useState, useEffect } from "react";
import {
  Crosshair,
  Zap,
  Flame,
  Sparkles,
  Lock,
  Award,
  Coins,
  Calendar,
  CheckCircle2,
  Target,
} from "lucide-react";
import { Trophy } from "@/types";
import { getUserTrophiesWithProgress } from "@/lib/gamification";
import { useTestStore } from "@/lib/store/useTestStore";

const ICON_MAP: Record<string, React.ElementType> = {
  Crosshair,
  Zap,
  Flame,
  Sparkles,
};

export default function TrophyCabinet() {
  const user = useTestStore((state) => state.user);
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  const [selectedTrophy, setSelectedTrophy] = useState<Trophy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getUserTrophiesWithProgress(user.id).then((items) => {
      if (isMounted) {
        setTrophies(items);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [user.id]);

  const unlockedCount = trophies.filter((t) => t.isUnlocked).length;

  return (
    <section className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shadow-xs">
            <Award className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Academic Trophy Cabinet
              </h2>
              <span className="bg-amber-50 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200/60 font-mono">
                {unlockedCount} / {trophies.length} Unlocked
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Achieve NTA CBT milestones to earn bonus XP and redeemable Campus Coins.
            </p>
          </div>
        </div>

        {/* User Campus Coins Badge */}
        <div className="flex items-center gap-2.5 bg-amber-50/70 border border-amber-200/60 px-4 py-2 rounded-2xl shadow-xs self-start sm:self-auto">
          <Coins className="w-5 h-5 text-amber-600" />
          <div>
            <p className="text-[10px] uppercase font-bold text-amber-800/60">
              Campus Coins
            </p>
            <p className="text-base font-extrabold font-mono text-amber-900 leading-none">
              {user.campusCoins ?? 120}
            </p>
          </div>
        </div>
      </div>

      {/* Trophies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-slate-50 animate-pulse border border-slate-100"
            />
          ))
        ) : (
          trophies.map((trophy) => {
            const IconComp = ICON_MAP[trophy.icon] || Award;
            const isUnlocked = trophy.isUnlocked;

            return (
              <button
                key={trophy.id}
                type="button"
                onClick={() => setSelectedTrophy(trophy)}
                className={`group relative p-5 rounded-2xl border text-left transition-all flex flex-col justify-between focus:outline-none cursor-pointer ${
                  isUnlocked
                    ? "bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-md shadow-xs"
                    : "bg-slate-50/60 border-slate-200/60 opacity-80 hover:opacity-100"
                }`}
              >
                <div>
                  {/* Icon & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs ${
                        isUnlocked
                          ? "bg-amber-50 border-amber-200 text-amber-600"
                          : "bg-slate-100 border-slate-200 text-slate-400"
                      }`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-xs">
                        <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-xs">
                        <Lock className="w-3 h-3 text-slate-400" />
                        {trophy.progressPercentage}%
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="font-bold text-sm tracking-tight text-slate-900"
                  >
                    {trophy.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {trophy.description}
                  </p>
                </div>

                {/* Bottom Rewards & Progress */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-700 font-mono">
                        +{trophy.xp_reward} XP
                      </span>
                      <span className="text-amber-700 font-mono">
                        +{trophy.coin_reward} Coins
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-1.5">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-amber-500 rounded-full transition-all"
                          style={{ width: `${trophy.progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        Click to view requirements
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {selectedTrophy && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-7 text-center animate-in zoom-in-95 duration-150">
            {/* Trophy Icon */}
            <div className="relative mx-auto mb-4 w-20 h-20">
              {(() => {
                const IconComp = ICON_MAP[selectedTrophy.icon] || Award;
                return (
                  <div
                    className={`w-20 h-20 rounded-2xl border flex items-center justify-center shadow-xs ${
                      selectedTrophy.isUnlocked
                        ? "bg-amber-50 border-amber-200 text-amber-600"
                        : "bg-slate-100 border-slate-200 text-slate-400"
                    }`}
                  >
                    <IconComp className="w-10 h-10" />
                  </div>
                );
              })()}
              {selectedTrophy.isUnlocked && (
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              {selectedTrophy.title}
            </h3>

            <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
              {selectedTrophy.description}
            </p>

            {/* Criteria Box */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Unlock Criteria:</span>
              </div>
              <p className="text-slate-600 font-medium pl-6 text-xs">
                {selectedTrophy.criteria}
              </p>

              {selectedTrophy.isUnlocked && selectedTrophy.unlockedAt ? (
                <div className="pt-2.5 border-t border-slate-200/60 flex items-center gap-2 text-slate-700 text-[11px] font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  <span>
                    Unlocked on:{" "}
                    {new Date(selectedTrophy.unlockedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              ) : (
                <div className="pt-2.5 border-t border-slate-200/60">
                  <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                    <span>Progress</span>
                    <span>{selectedTrophy.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-amber-500 rounded-full"
                      style={{ width: `${selectedTrophy.progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Rewards Badge */}
            <div className="mt-5 flex items-center justify-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700">
                <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span>+{selectedTrophy.xp_reward} XP</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-700">
                <Coins className="w-4 h-4 text-amber-600" />
                <span>+{selectedTrophy.coin_reward} Coins</span>
              </div>
            </div>

            {/* Close */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedTrophy(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
