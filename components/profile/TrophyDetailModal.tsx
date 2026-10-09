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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-7 text-center animate-in zoom-in-95 duration-150 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Trophy Icon */}
        <div className="relative mx-auto mb-4 w-20 h-20">
          <div
            className={`w-20 h-20 rounded-2xl border flex items-center justify-center shadow-xs ${
              trophy.isUnlocked
                ? "bg-amber-50 border-amber-200/80 text-amber-600"
                : "bg-slate-100 border-slate-200 text-slate-400"
            }`}
          >
            <IconComp className="w-10 h-10" />
          </div>
          {trophy.isUnlocked ? (
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            </span>
          ) : (
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-200 border-2 border-white text-slate-600 flex items-center justify-center shadow-xs">
              <Lock className="w-3.5 h-3.5" />
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          {trophy.title}
        </h3>

        <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
          {trophy.description}
        </p>

        {/* Criteria Box */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left text-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-700 font-bold">
            <Target className="w-4 h-4 text-blue-600" />
            <span>Unlock Criteria:</span>
          </div>
          <p className="text-slate-600 font-medium pl-6 text-xs">
            {trophy.criteria}
          </p>

          {trophy.isUnlocked && trophy.unlockedAt ? (
            <div className="pt-2.5 border-t border-slate-200/60 flex items-center gap-2 text-slate-700 text-[11px] font-semibold">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
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
            <div className="pt-2.5 border-t border-slate-200/60">
              <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1.5">
                <span>Progress to Unlock</span>
                <span>{trophy.progressPercentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-amber-500 rounded-full transition-all"
                  style={{ width: `${trophy.progressPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Rewards Badge */}
        <div className="mt-5 flex items-center justify-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700">
            <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            <span>+{trophy.xpReward} XP</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-100 text-amber-700">
            <Coins className="w-4 h-4 text-amber-600" />
            <span>+{trophy.coinReward} Coins</span>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs hover:shadow transition-all cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
