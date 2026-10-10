"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  ClipboardCheck,
  AlertTriangle,
  Info,
  ArrowRight,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import CoursePicker from "./CoursePicker";
import SubjectCombinationCard from "./SubjectCombinationCard";
import DreamCollegeGapCard from "./DreamCollegeGapCard";
import CollegeStandingsTable from "./CollegeStandingsTable";
import {
  CANONICAL_COURSES_MAP,
  computeCollegeStandings,
  computeDreamCollegeGap,
  NORMALIZED_CUTOFFS,
  CanonicalCourse,
} from "@/lib/standing-engine";
import { CategoryCode } from "@/lib/config/standingConfig";

export default function StandingViewClient() {
  const isClient = useIsClient();
  const user = useTestStore((state) => state.user);
  const testAttemptsRaw = useTestStore((state) => state.testAttempts);
  const testAttempts = useMemo(() => testAttemptsRaw || [], [testAttemptsRaw]);
  const setTargetCollege = useTestStore((state) => state.setTargetCollege);

  const coursesList: CanonicalCourse[] = useMemo(() => {
    return Object.values(CANONICAL_COURSES_MAP);
  }, []);

  // Determine initial course
  const [selectedCourseId, setSelectedCourseId] = useState<string>("bcom_hons");
  const [selectedCategory, setSelectedCategory] = useState<CategoryCode>("UR");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [targetCollege, setTargetCollegeLocal] = useState<string>("Shri Ram College of Commerce");
  const [trendCollege, setTrendCollege] = useState<string>("Shri Ram College of Commerce");

  // Sync target college from user profile if available
  useEffect(() => {
    if (user?.targetCollege) {
      // Find closest matching college in cutoff data
      const matched = NORMALIZED_CUTOFFS.find((r) =>
        user.targetCollege.toLowerCase().includes(r.college.toLowerCase()) ||
        r.college.toLowerCase().includes(user.targetCollege.toLowerCase())
      );
      if (matched) {
        setTargetCollegeLocal(matched.college);
        setTrendCollege(matched.college);
      }
    }
  }, [user?.targetCollege]);

  // Compute standings for selected course
  const standingsResult = useMemo(() => {
    return computeCollegeStandings({
      courseId: selectedCourseId,
      category: selectedCategory,
      userAttempts: testAttempts,
      filterYear: selectedYear === "all" ? undefined : selectedYear,
    });
  }, [selectedCourseId, selectedCategory, testAttempts, selectedYear]);

  // Colleges offering this course
  const availableColleges = useMemo(() => {
    const list = Array.from(
      new Set(
        NORMALIZED_CUTOFFS.filter(
          (r) => r.canonical_course_id === selectedCourseId
        ).map((r) => r.college)
      )
    ).sort();
    return list;
  }, [selectedCourseId]);

  // Update target & trend college if current target is not offering the new course
  useEffect(() => {
    if (availableColleges.length > 0 && !availableColleges.includes(targetCollege)) {
      setTargetCollegeLocal(availableColleges[0]!);
      setTrendCollege(availableColleges[0]!);
    }
  }, [availableColleges, targetCollege]);

  // Dream College Gap Analysis
  const dreamCollegeGap = useMemo(() => {
    return computeDreamCollegeGap({
      collegeName: targetCollege,
      courseId: selectedCourseId,
      category: selectedCategory,
      userAttempts: testAttempts,
    });
  }, [targetCollege, selectedCourseId, selectedCategory, testAttempts]);

  // Check if student has zero attempts or all low-effort
  const hasZeroAttempts = testAttempts.length === 0;
  const allSessionsLowEffort =
    testAttempts.length > 0 &&
    testAttempts.every((a) => a.isLowEffort === true);

  const handleSaveProfileTarget = (colName: string) => {
    setTargetCollege(colName);
  };

  if (!isClient) {
    // Skeleton loader while hydrating
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-pulse">
        <div className="h-10 bg-slate-200 rounded-xl w-64" />
        <div className="h-28 bg-slate-200 rounded-2xl w-full" />
        <div className="h-48 bg-slate-200 rounded-2xl w-full" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-tr from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-200 border border-blue-400/30">
              Admission Cutoff Benchmarking
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-300 text-xs">Based on 2025–2026 DU Lists</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <Compass className="w-7 h-7 text-blue-400" />
            Where Do I Stand?
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Compare your mock test performance against previous years&apos; official University of Delhi college cutoffs. Deterministic, band-based chance classification with transparent coverage tracking.
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shrink-0 self-start md:self-auto space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block">
            Target College
          </span>
          <span className="text-sm font-bold text-white block max-w-[200px] truncate">
            {targetCollege}
          </span>
          <span className="text-[11px] text-blue-200 block">
            {standingsResult.resolution.course.name}
          </span>
        </div>
      </div>

      {/* 2. Low-Effort or Zero Attempts Warning Banner */}
      {hasZeroAttempts ? (
        <div className="p-6 bg-blue-50 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
              <ClipboardCheck className="w-5 h-5 text-blue-600" />
              <span>Take your first mock to calibrate your standing</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed max-w-2xl">
              You haven&apos;t taken any mock tests yet. Complete at least one 50-question mock in your core domain subject to calibrate your standing against previous cutoffs.
            </p>
          </div>
          <Link
            href="/dashboard/mocks"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 flex items-center gap-2"
          >
            <span>Take Your First Mock</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : allSessionsLowEffort ? (
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Low-effort sessions detected: results not calibrated</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed max-w-2xl">
              All recorded sessions had very rapid pacing (&lt;8s/Q) or chance accuracy (&le;25%). To prevent false confidence, standing predictions require sessions completed under normal exam timing.
            </p>
          </div>
          <Link
            href="/dashboard/mocks"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 flex items-center gap-2"
          >
            <span>Retake with Timed Pacing</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : null}

      {/* 3. Course Picker Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="max-w-xl">
          <CoursePicker
            courses={coursesList}
            selectedCourseId={selectedCourseId}
            onSelectCourse={(id) => setSelectedCourseId(id)}
          />
        </div>
      </div>

      {/* 4. Subject Combination Card */}
      <SubjectCombinationCard resolution={standingsResult.resolution} />

      {/* 5. Dream College Gap Card */}
      <DreamCollegeGapCard
        analysis={dreamCollegeGap}
        targetCollege={targetCollege}
        onSelectCollege={(c) => {
          setTargetCollegeLocal(c);
          setTrendCollege(c);
        }}
        onSaveAsProfileTarget={handleSaveProfileTarget}
        availableColleges={availableColleges}
        userId={user?.id || "guest"}
        isSavedAsTarget={user?.targetCollege === targetCollege}
      />

      {/* 6. College Standings Table & Trend Chart */}
      <CollegeStandingsTable
        standings={standingsResult.standings}
        category={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        selectedYear={selectedYear}
        onSelectYear={(yr) => setSelectedYear(yr)}
        selectedCollegeForTrend={trendCollege}
        onSelectCollegeForTrend={(col) => setTrendCollege(col)}
        userPct={standingsResult.resolution.userPct}
      />

      {/* 7. Methodology & Honest Labelling Disclaimers */}
      <div className="p-5 bg-slate-50/90 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs text-slate-500">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Cutoff Methodology & Disclaimers</span>
        </div>
        <ul className="space-y-1.5 list-disc list-inside text-[11px] leading-relaxed text-slate-600">
          <li>
            <strong>Data Source:</strong> Benchmarks are derived from official University of Delhi 2025 and 2026 final seat allocation lists across 69 colleges and 264 programs.
          </li>
          <li>
            <strong>Score Scale:</strong> Standard CUET 2026 scoring applies (+5 correct, -1 incorrect, max 250 points per test paper). Cutoff values reflect total normalized marks across required subject combinations (750 marks for 3-subject science courses, 1000 marks for 4-subject arts/commerce courses).
          </li>
          <li>
            <strong>Shift Normalization Caveat:</strong> Student percentages reflect raw practice test sessions. Real CUET results undergo NTA equi-percentile shift normalization. Score mapping is an estimate with a 1.0x calibration factor.
          </li>
          <li>
            <strong>No Guarantees:</strong> Admission cutoffs shift each year based on exam difficulty, paper distribution, and cohort application volumes. Predictions use chance bands (Safe, Likely, Possible, Reach, Far) rather than false percentage probabilities.
          </li>
        </ul>
      </div>
    </div>
  );
}
