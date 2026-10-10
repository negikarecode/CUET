"use client";

import React, { useState } from "react";
import {
  Trophy,
  Flame,
  Bell,
  Users,
} from "lucide-react";

interface RetentionLeaderboardCardProps {
  currentStreak: number;
  todayQuestionsAttempted: number;
  dailyGoalQuestions?: number;
  userRankData?: Array<{ name: string; score: number; streak: number; isCurrentUser?: boolean }>;
}

export function RetentionLeaderboardCard({
  currentStreak,
  todayQuestionsAttempted,
  dailyGoalQuestions = 25,
  userRankData = [],
}: RetentionLeaderboardCardProps) {
  const dailyGoal = dailyGoalQuestions;
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  const goalProgressPct = Math.min(
    100,
    Math.round((todayQuestionsAttempted / dailyGoal) * 100)
  );

  const toggleNotifications = () => {
    const next = !notificationsEnabled;
    setNotificationsEnabled(next);
    setShowNotificationToast(true);
    setTimeout(() => setShowNotificationToast(false), 3000);
  };

  // Rule: Only render leaderboard among users with real data; proper empty state when not enough
  const hasRealLeaderboardData = userRankData && userRankData.length >= 3;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 1. Daily Goal & Retention Tracker */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Daily Practice Target</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {currentStreak}-day active streak
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700">
            <span>Goal: {dailyGoal} Qs</span>
          </div>
        </div>

        {/* Goal Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Today&apos;s Progress</span>
            <span className="font-mono text-slate-900 font-bold">
              {todayQuestionsAttempted} / {dailyGoal} Questions ({goalProgressPct}%)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${goalProgressPct}%` }}
            />
          </div>
        </div>

        {/* Opt-in Study Reminders Stub */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Bell className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="font-medium text-[11px]">
              Daily 8:00 PM Practice Reminder (WhatsApp / Push)
            </span>
          </div>
          <button
            type="button"
            onClick={toggleNotifications}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              notificationsEnabled
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {notificationsEnabled ? "✓ Active" : "Opt-in"}
          </button>
        </div>

        {showNotificationToast && (
          <p className="text-[11px] font-medium text-emerald-700 animate-in fade-in">
            {notificationsEnabled
              ? "Notification preference saved. You'll receive a daily reminder."
              : "Reminders turned off."}
          </p>
        )}
      </div>

      {/* 2. Real-Data Leaderboard with Empty State */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Cohort Practice Benchmark</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Verified domain peer activity
              </p>
            </div>
          </div>
        </div>

        {hasRealLeaderboardData ? (
          <div className="space-y-2">
            {userRankData.map((peer, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                  peer.isCurrentUser
                    ? "bg-blue-50/70 border-blue-200 font-bold text-blue-950"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span>{peer.name} {peer.isCurrentUser && "(You)"}</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span>{peer.score} pts</span>
                  <span className="text-amber-600 font-semibold">{peer.streak}d streak</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 text-center space-y-2">
            <Users className="w-7 h-7 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-800">
              Peer Leaderboard Calibrating
            </p>
            <p className="text-[11px] text-slate-500 font-medium max-w-xs mx-auto">
              Cohort comparisons unlock when enough students in your target stream complete their baseline diagnostic cycles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
