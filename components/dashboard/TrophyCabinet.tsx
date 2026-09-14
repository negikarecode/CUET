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
    <section className="bg-white rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_#000] p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#FEF3C7] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
            <Award className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-black tracking-tight">
                Academic Trophy Cabinet
              </h2>
              <span className="bg-[#FEF3C7] text-black text-[11px] font-black px-2.5 py-0.5 rounded-full border border-black font-mono shadow-[1px_1px_0px_0px_#000]">
                {unlockedCount} / {trophies.length} Unlocked
              </span>
            </div>
            <p className="text-xs text-black/70 font-semibold mt-0.5">
              Achieve NTA CBT milestones to earn bonus XP and redeemable Campus Coins.
            </p>
          </div>
        </div>

        {/* User Campus Coins Badge */}
        <div className="flex items-center gap-2 bg-[#FEF3C7] border-2 border-black px-3.5 py-2 rounded-lg shadow-[2px_2px_0px_0px_#000] self-start sm:self-auto">
          <Coins className="w-5 h-5 text-[#D97706]" />
          <div>
            <p className="text-[10px] uppercase font-black text-black/60">
              Campus Coins
            </p>
            <p className="text-base font-black font-mono text-black leading-none">
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
              className="h-48 rounded-xl bg-[#FAF7EE] animate-pulse border-2 border-black shadow-[3px_3px_0px_0px_#000]"
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
                className={`group relative p-5 rounded-xl border-2 border-black text-left transition-all flex flex-col justify-between focus:outline-none ${
                  isUnlocked
                    ? "bg-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] shadow-[3px_3px_0px_0px_#000]"
                    : "bg-[#FAF7EE] opacity-80 hover:opacity-100 shadow-[2px_2px_0px_0px_#000]"
                }`}
              >
                <div>
                  {/* Icon & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center transition-transform group-hover:scale-105 shadow-[2px_2px_0px_0px_#000] ${
                        isUnlocked
                          ? "bg-[#FEF3C7] text-black"
                          : "bg-black/10 text-black/40"
                      }`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-black text-black bg-[#D1FAE5] border border-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_0px_#000]">
                        <CheckCircle2 className="w-3 h-3 text-[#10B981] stroke-[2.5]" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-black text-black/60 bg-white border border-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_0px_#000]">
                        <Lock className="w-3 h-3 text-black/40" />
                        {trophy.progressPercentage}%
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="font-black text-sm tracking-tight text-black"
                  >
                    {trophy.title}
                  </h3>
                  <p className="mt-1 text-xs text-black/70 font-medium line-clamp-2 leading-relaxed">
                    {trophy.description}
                  </p>
                </div>

                {/* Bottom Rewards & Progress */}
                <div className="mt-4 pt-3 border-t-2 border-black/10">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-[11px] font-black">
                      <span className="text-black font-mono">
                        +{trophy.xp_reward} XP
                      </span>
                      <span className="text-[#D97706] font-mono">
                        +{trophy.coin_reward} Coins
                      </span>
                    </div>
                  ) : (
                    <div>
                      <div className="w-full h-2 bg-white border border-black rounded-full overflow-hidden mb-1.5 shadow-[1px_1px_0px_0px_#000]">
                        <div
                          className="h-full bg-[#F59E0B] rounded-full transition-all"
                          style={{ width: `${trophy.progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-black/60 font-bold">
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="w-full max-w-md bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#000] p-6 text-center animate-in zoom-in-95 duration-150">
            {/* Trophy Icon */}
            <div className="relative mx-auto mb-4 w-20 h-20">
              {(() => {
                const IconComp = ICON_MAP[selectedTrophy.icon] || Award;
                return (
                  <div
                    className={`w-20 h-20 rounded-xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000] ${
                      selectedTrophy.isUnlocked
                        ? "bg-[#FEF3C7] text-black"
                        : "bg-black/10 text-black/40"
                    }`}
                  >
                    <IconComp className="w-10 h-10" />
                  </div>
                );
              })()}
              {selectedTrophy.isUnlocked && (
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#10B981] border border-black text-white flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </span>
              )}
            </div>

            <h3 className="text-xl font-black text-black tracking-tight">
              {selectedTrophy.title}
            </h3>

            <p className="mt-2 text-xs text-black/70 font-semibold leading-relaxed max-w-xs mx-auto">
              {selectedTrophy.description}
            </p>

            {/* Criteria Box */}
            <div className="mt-5 p-3.5 rounded-lg bg-[#FAF7EE] border-2 border-black text-left text-xs space-y-2 shadow-[2px_2px_0px_0px_#000]">
              <div className="flex items-center gap-2 text-black font-black">
                <Target className="w-4 h-4 text-black" />
                <span>Unlock Criteria:</span>
              </div>
              <p className="text-black/80 font-medium pl-6 text-xs">
                {selectedTrophy.criteria}
              </p>

              {selectedTrophy.isUnlocked && selectedTrophy.unlockedAt ? (
                <div className="pt-2 border-t-2 border-black/10 flex items-center gap-2 text-black text-[11px] font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#10B981] stroke-[2.5]" />
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
                <div className="pt-2 border-t-2 border-black/10">
                  <div className="flex justify-between text-[11px] font-black text-black mb-1">
                    <span>Progress</span>
                    <span>{selectedTrophy.progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white border border-black rounded-full overflow-hidden shadow-[1px_1px_0px_0px_#000]">
                    <div
                      className="h-full bg-[#F59E0B] rounded-full"
                      style={{ width: `${selectedTrophy.progressPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Rewards Badge */}
            <div className="mt-5 flex items-center justify-center gap-4 text-xs font-black">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEF2FF] border-2 border-black text-black shadow-[2px_2px_0px_0px_#000]">
                <Zap className="w-4 h-4 text-[#D97706] fill-[#F59E0B]" />
                <span>+{selectedTrophy.xp_reward} XP</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FEF3C7] border-2 border-black text-black shadow-[2px_2px_0px_0px_#000]">
                <Coins className="w-4 h-4 text-[#D97706]" />
                <span>+{selectedTrophy.coin_reward} Coins</span>
              </div>
            </div>

            {/* Close */}
            <div className="mt-6 pt-4 border-t-2 border-black/10">
              <button
                type="button"
                onClick={() => setSelectedTrophy(null)}
                className="w-full py-2.5 rounded-lg bg-black hover:bg-[#121212] text-white font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
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
