"use client";

import React from "react";
import {
  Crosshair,
  Zap,
  Flame,
  Sparkles,
  Award,
  CheckCircle2,
  Lock,
  Calendar,
  Target,
  Coins,
  X,
} from "lucide-react";
import { ProfileTrophyItem } from "@/types/profile";

const ICON_MAP: Record<string, React.ElementType> = {
  Crosshair,
  Zap,
  Flame,
  Sparkles,
  Award,
};

interface TrophyDetailModalProps {
  trophy: ProfileTrophyItem | null;
  onClose: () => void;
}

export default function TrophyDetailModal({
  trophy,
  onClose,
}: TrophyDetailModalProps) {
  if (!trophy) return null;

  const IconComp = ICON_MAP[trophy.icon] || Award;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-md bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#000] p-6 text-center animate-in zoom-in-95 duration-150 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Trophy Icon */}
        <div className="relative mx-auto mb-4 w-20 h-20">
          <div
            className={`w-20 h-20 rounded-xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000] ${
              trophy.isUnlocked
                ? "bg-[#FEF3C7] text-black"
                : "bg-black/10 text-black/40"
            }`}
          >
            <IconComp className="w-10 h-10" />
          </div>
          {trophy.isUnlocked ? (
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#10B981] border border-black text-white flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            </span>
          ) : (
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-black text-black/60 flex items-center justify-center shadow-[1px_1px_0px_0px_#000]">
              <Lock className="w-3.5 h-3.5" />
            </span>
          )}
        </div>

        <h3 className="text-xl font-black text-black tracking-tight">
          {trophy.title}
        </h3>

        <p className="mt-2 text-xs text-black/70 font-semibold leading-relaxed max-w-xs mx-auto">
          {trophy.description}
        </p>

        {/* Criteria Box */}
        <div className="mt-5 p-3.5 rounded-lg bg-[#FAF7EE] border-2 border-black text-left text-xs space-y-2 shadow-[2px_2px_0px_0px_#000]">
          <div className="flex items-center gap-2 text-black font-black">
            <Target className="w-4 h-4 text-black" />
            <span>Unlock Criteria:</span>
          </div>
          <p className="text-black/80 font-medium pl-6 text-xs">
            {trophy.criteria}
          </p>

          {trophy.isUnlocked && trophy.unlockedAt ? (
            <div className="pt-2 border-t-2 border-black/10 flex items-center gap-2 text-black text-[11px] font-bold">
              <Calendar className="w-3.5 h-3.5 text-[#10B981] stroke-[2.5]" />
              <span>
                Unlocked on:{" "}
                {new Date(trophy.unlockedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          ) : (
            <div className="pt-2 border-t-2 border-black/10">
              <div className="flex justify-between text-[11px] font-black text-black mb-1">
                <span>Progress to Unlock</span>
                <span>{trophy.progressPercentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-white border border-black rounded-full overflow-hidden shadow-[1px_1px_0px_0px_#000]">
                <div
                  className="h-full bg-[#F59E0B] rounded-full transition-all"
                  style={{ width: `${trophy.progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Rewards Badge */}
        <div className="mt-5 flex items-center justify-center gap-4 text-xs font-black">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EEF2FF] border-2 border-black text-black shadow-[2px_2px_0px_0px_#000]">
            <Zap className="w-4 h-4 text-[#4F46E5] fill-[#4F46E5]" />
            <span>+{trophy.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FEF3C7] border-2 border-black text-black shadow-[2px_2px_0px_0px_#000]">
            <Coins className="w-4 h-4 text-[#D97706]" />
            <span>+{trophy.coinReward} Coins</span>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t-2 border-black/10">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-black hover:bg-[#121212] text-white font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
