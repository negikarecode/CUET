"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ClipboardCheck,
  Info,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useIsClient } from "@/lib/hooks/useIsClient";
import { useTarget } from "@/lib/hooks/useTarget";
import CascadingTargetSelector from "@/components/ui/CascadingTargetSelector";
import { useTargetSelection } from "@/lib/hooks/useTargetSelection";
import SubjectCombinationCard from "./SubjectCombinationCard";
import DreamCollegeGapCard from "./DreamCollegeGapCard";
import CollegeStandingsTable from "./CollegeStandingsTable";
import {
  CANONICAL_COURSES_MAP,
  computeCollegeStandings,
  computeDreamCollegeGap,
  NORMALIZED_CUTOFFS,
  resolveTargetCollegeMatch,
  normalizeSubjectToKey,
} from "@/lib/standing-engine";
import { CategoryCode } from "@/lib/config/standingConfig";
import { StreamType } from "@/types";
import { stringToUuid } from "@/lib/utils";
import { deduplicateTestAttempts } from "@/lib/analytics";

interface StandingViewClientProps {
  initialUser?: { targetCollege?: string; targetCourse?: string; targetStream?: string };
  initialAttempts?: import("@/types").RecordedTestAttempt[];
}

export default function StandingViewClient({
  initialUser,
  initialAttempts = [],
}: StandingViewClientProps = {}) {
  const isClient = useIsClient();
  const profileTarget = useTarget();
  const storeUser = useTestStore((state) => state.user);
  const user = useMemo(() => {
    return {
      ...(storeUser || {}),
      targetCollege: profileTarget.college || initialUser?.targetCollege || storeUser?.targetCollege,
      targetCourse: profileTarget.course || initialUser?.targetCourse || storeUser?.targetCourse,
      preferredStream: initialUser?.targetStream
        ? (initialUser.targetStream.toLowerCase() as StreamType)
        : storeUser?.preferredStream,
    };
  }, [storeUser, initialUser, profileTarget]);

  const setSelectedStream = useTestStore((state) => state.setSelectedStream);
  const testAttemptsRaw = useTestStore((state) => state.testAttempts);
  const testAttempts = useMemo(() => {
    const raw =
      testAttemptsRaw && testAttemptsRaw.length > 0
        ? testAttemptsRaw
        : initialAttempts && initialAttempts.length > 0
        ? initialAttempts
        : [];
    return deduplicateTestAttempts(raw);
  }, [testAttemptsRaw, initialAttempts]);
  const setTargetCollege = useTestStore((state) => state.setTargetCollege);

  // Sync server attempts into store if missing locally
  useEffect(() => {
    if (initialAttempts && initialAttempts.length > 0) {
      const { testAttempts: localAttempts, recordTestAttempt } = useTestStore.getState();
      const localKeys = new Set(
        (localAttempts || []).flatMap((a) => [
          (a.testId || "").trim(),
          (a.id || "").trim(),
          stringToUuid((a.testId || "").trim()),
        ])
      );
      initialAttempts.forEach((att) => {
        const k = (att.testId || att.id || "").trim();
        const uuidK = stringToUuid(k);
        const matchesLocal = (localAttempts || []).some(
          (la) =>
            la.testTitle?.toLowerCase().trim() === att.testTitle?.toLowerCase().trim() &&
            la.subject?.toLowerCase().trim() === att.subject?.toLowerCase().trim()
        );
        if (k && !localKeys.has(k) && !localKeys.has(uuidK) && !matchesLocal) {
          recordTestAttempt(att);
        }
      });
    }
  }, [initialAttempts]);

  const searchParams = useSearchParams();
  const collegeParam = searchParams ? searchParams.get("college") : null;
  const courseParam = searchParams ? searchParams.get("course") : null;

  // Initial target resolution
  const initialCollege = useMemo(() => {
    const raw = collegeParam || profileTarget.college || user?.targetCollege || "Hindu College";
    return resolveTargetCollegeMatch(raw) || raw;
  }, [collegeParam, profileTarget.college, user?.targetCollege]);

  const initialCourse = useMemo(() => {
    if (courseParam) {
      const match = CANONICAL_COURSES_MAP[courseParam];
      if (match) return match.name;
    }
    return profileTarget.course || user?.targetCourse || "B.Sc. (Hons.) Physics";
  }, [courseParam, profileTarget.course, user?.targetCourse]);

  const targetSelection = useTargetSelection({
    initialCollege,
    initialCourse,
    initialStream: "All",
    filterCoursesByStream: false,
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryCode>("UR");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  const targetCollege = targetSelection.selectedCollege?.name || targetSelection.collegeName || "Hindu College";
  const selectedCourseId = targetSelection.selectedCourse?.id || targetSelection.courseId || "bsc_phys";
  const [trendCollege, setTrendCollege] = useState<string>(targetCollege);

  // Sync stream when selected course changes
  useEffect(() => {
    if (targetSelection.selectedCourse) {
      const s = targetSelection.selectedCourse.stream;
      if (s === "science" || s === "commerce" || s === "humanities") {
        setSelectedStream(s as StreamType);
      }
    }
  }, [targetSelection.selectedCourse, setSelectedStream]);

  // Keep trendCollege synced with targetCollege
  useEffect(() => {
    if (targetCollege) {
      setTrendCollege(targetCollege);
    }
  }, [targetCollege]);

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
    if (targetSelection.availableColleges && targetSelection.availableColleges.length > 0) {
      return targetSelection.availableColleges.map((c) => c.name);
    }
    const list = Array.from(
      new Set(
        NORMALIZED_CUTOFFS.filter(
          (r) => r.canonical_course_id === selectedCourseId
        ).map((r) => r.college)
      )
    ).sort();
    return list;
  }, [targetSelection.availableColleges, selectedCourseId]);

  // Dream College Gap Analysis
  const dreamCollegeGap = useMemo(() => {
    return computeDreamCollegeGap({
      collegeName: targetCollege,
      courseId: selectedCourseId,
      category: selectedCategory,
      userAttempts: testAttempts,
    });
  }, [targetCollege, selectedCourseId, selectedCategory, testAttempts]);

  // Compute exact mock averages per subject across all user test attempts
  const userSubjectAverages = useMemo(() => {
    const map: Record<string, number | null> = {};
    (standingsResult.resolution.resolvedSubjects || []).forEach((sub) => {
      const normKey = normalizeSubjectToKey(sub.subjectId);
      const normName = normalizeSubjectToKey(sub.subjectName);

      const matched = testAttempts.filter((att) => {
        const rawSubj = att.subject || att.testTitle || "";
        const attKey = normalizeSubjectToKey(rawSubj);
        return attKey === normKey || attKey === normName;
      });

      if (matched.length > 0) {
        const totalMarks = matched.reduce((sum, att) => {
          const marks =
            att.totalMarks !== undefined
              ? att.totalMarks
              : att.correctCount * 5 - (att.incorrectCount || 0) * 1;
          return sum + marks;
        }, 0);
        map[sub.subjectId] = Math.round((totalMarks / matched.length) * 10) / 10;
      } else if (sub.averageMarks !== null && sub.averageMarks !== undefined && sub.averageMarks > 0) {
        map[sub.subjectId] = Math.round(sub.averageMarks * 10) / 10;
      } else {
        map[sub.subjectId] = null;
      }
    });
    return map;
  }, [standingsResult.resolution.resolvedSubjects, testAttempts]);

  // Composite total: exact sum of subject averages
  const compositeTotal = useMemo(() => {
    const vals = Object.values(userSubjectAverages).filter((v): v is number => v !== null);
    if (vals.length === 0) return 0;
    return Math.round(vals.reduce((a, b) => a + b, 0) * 10) / 10;
  }, [userSubjectAverages]);

  const isAllSubjectsComplete = useMemo(() => {
    const subjects = standingsResult.resolution.resolvedSubjects || [];
    if (subjects.length === 0) return false;
    return subjects.every((s) => userSubjectAverages[s.subjectId] !== null);
  }, [standingsResult.resolution.resolvedSubjects, userSubjectAverages]);

  const hasZeroAttempts = testAttempts.length === 0;

  const handleSaveProfileTarget = (colName: string) => {
    setTargetCollege(colName);
    targetSelection.selectCollege(colName);
    setTrendCollege(colName);
  };

  const isViewingDifferentTarget =
    Boolean(profileTarget.college) &&
    targetCollege.toLowerCase() !== (profileTarget.college || "").toLowerCase();

  if (!isClient) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-4 animate-pulse">
        <div className="h-14 bg-slate-200 rounded-2xl w-full" />
        <div className="h-44 bg-slate-200 rounded-2xl w-full" />
        <div className="h-64 bg-slate-200 rounded-2xl w-full" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6">
      {/* Zero Attempts Guidance Banner */}
      {hasZeroAttempts ? (
        <div className="p-5 bg-blue-50 border border-blue-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-900">
              <ClipboardCheck className="w-5 h-5 text-blue-600" />
              <span>Take your first mock to see your standing</span>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed max-w-2xl">
              You haven&apos;t taken any mock tests yet. Complete at least one mock test in your core domain subject to see your standing against previous cutoffs.
            </p>
          </div>
          <Link
            href="/dashboard/mocks"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all shrink-0 flex items-center gap-2"
          >
            <span>Take Your First Mock</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : null}

      {/* Viewing vs Saved Target Chip (View-only for this page, never overwrites profile) */}
      {isViewingDifferentTarget && (
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200/90 px-4 py-2.5 rounded-2xl text-xs sm:text-sm text-amber-900 shadow-2xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-amber-800">Viewing:</span>
            <span className="font-bold text-amber-950">{targetCollege}</span>
            <span className="text-amber-700 hidden sm:inline">(view-only for this page)</span>
          </div>
          <button
            type="button"
            onClick={() => {
              targetSelection.reset(
                profileTarget.college,
                profileTarget.course,
                profileTarget.stream
              );
              if (profileTarget.college) {
                setTrendCollege(profileTarget.college);
              }
            }}
            className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 font-bold hover:underline cursor-pointer ml-3 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to saved target ({profileTarget.college})</span>
          </button>
        </div>
      )}

      {/* 1. Cascading Target Selector Toolbar: Two equal-width dropdowns side by side */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <CascadingTargetSelector
          targetSelection={targetSelection}
          layout="grid"
          showStreamButtons={false}
          showDerivedUniversity={false}
          showUnavailableToggle={true}
          collegeLabelPrefix="Target College"
          courseLabelPrefix="Target Degree Program"
          collegePlaceholder="Search college (e.g. SRCC, Hansraj, Hindu)..."
          coursePlaceholder="Search any program (e.g. B.Com, Physics, Economics)..."
        />
      </div>

      {/* 2. Subject Cards Grid with average mock-test scores & subtle disclaimer */}
      <SubjectCombinationCard
        resolution={standingsResult.resolution}
        subjectBreakdown={dreamCollegeGap?.subjectImprovementBreakdown || []}
        targetCollege={targetCollege}
        testAttempts={testAttempts}
      />

      {/* 3. Dream College Gap Analysis: composite score is sum of subject averages */}
      <DreamCollegeGapCard
        analysis={dreamCollegeGap}
        targetCollege={targetCollege}
        onSelectCollege={(c) => {
          targetSelection.selectCollege(c);
          setTrendCollege(c);
        }}
        onSaveAsProfileTarget={handleSaveProfileTarget}
        availableColleges={availableColleges}
        userId={user?.id || "guest"}
        isSavedAsTarget={profileTarget.college === targetCollege}
        compositeScore={compositeTotal}
      />

      {/* 4. College Standings Table & Trend Chart */}
      <CollegeStandingsTable
        standings={standingsResult.standings}
        category={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        selectedYear={selectedYear}
        onSelectYear={(yr) => setSelectedYear(yr)}
        selectedCollegeForTrend={trendCollege}
        onSelectCollegeForTrend={(col) => setTrendCollege(col)}
        combinedAverageMarks={isAllSubjectsComplete ? compositeTotal : null}
        targetCollege={targetCollege}
        savedTargetCollege={profileTarget.college}
        cutoffScale={standingsResult.resolution.course.cutoffScale}
      />

      {/* 5. Methodology & Honest Labelling Disclaimers */}
      <div className="p-5 bg-slate-50/90 rounded-2xl border border-slate-200/80 space-y-2.5 text-sm text-slate-500">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Cutoff Methodology & Disclaimers</span>
        </div>
        <ul className="space-y-1.5 list-disc list-inside text-[13px] leading-relaxed text-slate-600">
          <li>
            <strong>Data Source:</strong> Benchmarks are derived from official institutional archives across participating CUET universities (University of Delhi, Banaras Hindu University, Jawaharlal Nehru University, University of Allahabad, Jamia Millia Islamia, Dr. B.R. Ambedkar University Delhi, BBAU, GGSIPU, and Central Universities) covering 2023 to 2026 seat allocations across 118 colleges and 47 degree programs.
          </li>
          <li>
            <strong>Score Scale:</strong> Standard CUET 2026 scoring applies (+5 correct, -1 incorrect, max 250 marks per test paper). Cutoff values reflect total normalized marks across required subject combinations (750 marks for 3-subject science courses, 1000 marks for 4-subject arts/commerce courses).
          </li>
          <li>
            <strong>Shift Normalization Caveat:</strong> Student performance reflects raw mock test marks (+5 / -1 marking scheme). Real CUET results undergo NTA equi-percentile shift normalization.
          </li>
          <li>
            <strong>No Guarantees:</strong> Admission cutoffs shift each year based on exam difficulty, paper distribution, and applicant volumes. Standing is estimated by direct marks comparisons against historical cutoffs.
          </li>
        </ul>
      </div>
    </div>
  );
}
