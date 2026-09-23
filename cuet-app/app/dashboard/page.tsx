"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { Target, BookOpen, Clock, Calendar, CheckCircle2, Flame, ArrowRight, Award, Zap, Sparkles } from "lucide-react";
import { useWeakness } from "@/hooks/useWeakness";
import { useStudent } from "@/hooks/useStudent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { student } = useStudent();
  const { data, isLoading } = useWeakness();
  const [plannerData, setPlannerData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/planner/today")
      .then((res) => res.json())
      .then((d) => {
        if (d.success) setPlannerData(d);
      })
      .catch(() => {});
  }, []);

  // Days until exam countdown: May 15, 2026
  const daysUntilExam = useMemo(() => {
    const examDate = new Date(student?.exam_date || "2026-05-15").getTime();
    const now = new Date().getTime();
    const diffDays = Math.ceil((examDate - now) / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }, [student?.exam_date]);

  const criticalCount = data?.topics_by_level.critical.length || 0;
  const weakCount = data?.topics_by_level.weak.length || 0;
  const overallScore = data?.overall_score || 0;

  // AI Unlock Gate: 150 attempts required
  const totalAttempts = useMemo(() => {
    if (data?.topics_by_level) {
      const allScores = [
        ...data.topics_by_level.critical,
        ...data.topics_by_level.weak,
        ...data.topics_by_level.average,
        ...data.topics_by_level.strong,
        ...data.topics_by_level.excellent,
      ];
      return allScores.reduce((acc: number, s: any) => acc + (s.total_attempts || 0), 0);
    }
    return student?.xp ? Math.floor(student.xp / 5) : 0;
  }, [data, student]);

  const isAiUnlocked = totalAttempts >= 150;
  const attemptsNeeded = Math.max(0, 150 - totalAttempts);
  const unlockPercent = Math.min(100, Math.round((totalAttempts / 150) * 100));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back, {student?.name || "Aspirant"}! 👋
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Targeting: <span className="font-semibold text-slate-800">{student?.target_college || "Delhi University"}</span>
          </p>
        </div>

        {/* Exam Countdown Badge */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 p-3 rounded-2xl">
          <div className="p-2 rounded-xl bg-indigo-600 text-white font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-indigo-950 block leading-none">
              {daysUntilExam} Days
            </span>
            <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider">
              Until CUET UG 2026
            </span>
          </div>
        </div>
      </div>

      {/* AI Cold-Start Qualification Gate Progress Meter */}
      {!isAiUnlocked ? (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-white font-bold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-950">
                  Unlocking AI Mentor: {totalAttempts}/150 questions attempted
                </p>
                <p className="text-xs text-amber-800">
                  Attempt {attemptsNeeded} more questions across mocks to calibrate your baseline and unlock the AI Diagnostic Matrix and Adaptive Drills.
                </p>
              </div>
            </div>
            <span className="text-xs font-black text-amber-900 bg-amber-200 px-3 py-1 rounded-full shrink-0">
              {unlockPercent}% Calibrated
            </span>
          </div>
          <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(4, unlockPercent)}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-xs sm:text-sm font-bold text-emerald-900">
              AI Diagnostic Matrix &amp; Adaptive Drills Unlocked ({totalAttempts} questions evaluated)
            </span>
          </div>
          <Badge className="bg-emerald-600 text-white font-bold text-[10px] uppercase">
            Active
          </Badge>
        </div>
      )}

      {/* Today's Study Plan Highlight Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-indigo-900/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-indigo-500/30 text-indigo-300 border-indigo-400/40 text-[11px] font-bold uppercase tracking-wider">
                📅 Day {plannerData?.day_number || 1} • Today&apos;s Plan
              </Badge>
              {plannerData?.streak?.current !== undefined && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  🔥 {plannerData.streak.current} Day Streak
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {plannerData?.completion?.is_day_complete
                ? "🎉 Today's Study Plan Completed!"
                : plannerData?.tasks?.find((t: any) => t.status !== "completed")?.title
                ? `Next up: ${plannerData.tasks.find((t: any) => t.status !== "completed").title}`
                : "Your Personalized Plan is Ready!"}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 line-clamp-1 max-w-xl">
              {plannerData?.daily_motivation ||
                "Complete today's targeted tasks to boost your score & protect your streak."}
            </p>
          </div>

          <div className="flex flex-row sm:flex-col items-end gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="text-left sm:text-right">
              <span className="text-xs font-semibold text-indigo-300 block">Today&apos;s Progress</span>
              <span className="text-base sm:text-lg font-black text-white">
                {plannerData?.completion?.completed_tasks || 0} / {plannerData?.completion?.total_tasks || 4} Tasks ({plannerData?.completion?.percentage || 0}%)
              </span>
            </div>
            <Link href="/planner">
              <Button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md gap-1.5 h-10 px-4 rounded-xl">
                Open Full Plan <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-white/10 rounded-full h-2 mt-5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-400 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${plannerData?.completion?.percentage || 0}%` }}
          />
        </div>
      </div>

      {/* 3 Core Action Navigation Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. My Weaknesses (Primary Highlight) */}
        <Link href="/weakness" className="group">
          <div className="h-full p-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border border-indigo-500 shadow-md group-hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-white/20 text-white">
                  <Target className="w-6 h-6" />
                </div>
                <Badge className="bg-red-500 text-white border-none font-bold text-[10px]">
                  {criticalCount + weakCount} Areas to Fix
                </Badge>
              </div>
              <h3 className="text-lg font-bold">My Weaknesses</h3>
              <p className="text-xs text-indigo-100 mt-1 leading-relaxed">
                View real-time accuracy, speed bottlenecks & AI study recommendations.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-200 mt-4 group-hover:text-white transition-colors">
              Open Weakness Detector <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        {/* 2. Practice Topics */}
        <Link href="/practice/4" className="group">
          <div className="h-full p-5 rounded-2xl bg-white border border-slate-200 shadow-xs group-hover:shadow-md group-hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <Badge variant="outline" className="text-slate-600 text-[10px]">
                  Topic-Wise
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Practice Hub</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Attempt curated questions across Political Science, History, Economics & English.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 mt-4 group-hover:text-indigo-800 transition-colors">
              Start Practice Session <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        {/* 3. Mock Tests & AI Analysis */}
        <Link href="/analysis/history" className="group">
          <div className="h-full p-5 rounded-2xl bg-white border border-slate-200 shadow-xs group-hover:shadow-md group-hover:border-slate-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <Award className="w-6 h-6" />
                </div>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-[10px]">
                  AI Mock Analyzer
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-slate-900">CUET Mock Tests</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Post-test AI diagnostics, DU cutoff predictions & 4-page PDF report card.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-purple-600 mt-4 group-hover:text-purple-800 transition-colors">
              View Mock Reports & History <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Overview Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-xs font-bold text-slate-400 block uppercase">Overall Health</span>
          <span className="text-2xl font-black text-indigo-600 mt-1 block">{overallScore}/100</span>
          <span className="text-[11px] text-slate-500">Readiness Score</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-xs font-bold text-slate-400 block uppercase">Critical Zones</span>
          <span className="text-2xl font-black text-red-600 mt-1 block">{criticalCount} Topics</span>
          <span className="text-[11px] text-red-600 font-medium">Immediate focus</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-xs font-bold text-slate-400 block uppercase">Study Streak</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">5 Days 🔥</span>
          <span className="text-[11px] text-slate-500">Active engagement</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200">
          <span className="text-xs font-bold text-slate-400 block uppercase">Daily Goal</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{student?.daily_study_hours || 4} Hours</span>
          <span className="text-[11px] text-slate-500">Scheduled target</span>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Recent Activity Log
          </h3>
          <Link href="/weakness" className="text-xs font-bold text-indigo-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="space-y-3">
          {[
            {
              topic: "Fundamental Rights",
              subject: "Political Science",
              time: "Yesterday",
              accuracy: "33%",
              badge: "Needs Work",
              color: "bg-orange-100 text-orange-800",
            },
            {
              topic: "Emergency Provisions",
              subject: "Political Science",
              time: "3 days ago",
              accuracy: "0%",
              badge: "Critical",
              color: "bg-red-100 text-red-800",
            },
            {
              topic: "Constituent Assembly",
              subject: "Political Science",
              time: "4 days ago",
              accuracy: "100%",
              badge: "Mastered",
              color: "bg-green-100 text-green-800",
            },
          ].map((act, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                  ✓
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{act.topic}</span>
                  <span className="text-xs text-slate-400">{act.subject} • {act.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-700">Accuracy: {act.accuracy}</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${act.color}`}>
                  {act.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
