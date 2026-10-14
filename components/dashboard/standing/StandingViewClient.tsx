"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ClipboardCheck,
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
  resolveTargetCollegeMatch,
  matchCourseToId,
} from "@/lib/standing-engine";
import { CategoryCode } from "@/lib/config/standingConfig";
import { StreamType } from "@/types";
import { stringToUuid } from "@/lib/utils";

interface StandingViewClientProps {
  initialUser?: { targetCollege?: string; targetCourse?: string; targetStream?: string };
  initialAttempts?: import("@/types").RecordedTestAttempt[];
}

export default function StandingViewClient({
  initialUser,
  initialAttempts = [],
}: StandingViewClientProps = {}) {
  const isClient = useIsClient();
  const storeUser = useTestStore((state) => state.user);
  const user = useMemo(() => {
    return {
      ...(storeUser || {}),
      targetCollege: initialUser?.targetCollege || storeUser?.targetCollege,
      targetCourse: initialUser?.targetCourse || storeUser?.targetCourse,
      preferredStream: initialUser?.targetStream
        ? (initialUser.targetStream.toLowerCase() as StreamType)
        : storeUser?.preferredStream,
    };
  }, [storeUser, initialUser]);

  const selectedStream = useTestStore((state) => state.selectedStream);
  const setSelectedStream = useTestStore((state) => state.setSelectedStream);
  const testAttemptsRaw = useTestStore((state) => state.testAttempts);
  const testAttempts = useMemo(() => {
    if (testAttemptsRaw && testAttemptsRaw.length > 0) return testAttemptsRaw;
    if (initialAttempts && initialAttempts.length > 0) return initialAttempts;
    return [];
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

  useEffect(() => {
    if (initialUser?.targetCollege) {
      setTargetCollege(initialUser.targetCollege);
    }
  }, [initialUser?.targetCollege, setTargetCollege]);

  const coursesList: CanonicalCourse[] = useMemo(() => {
    return Object.values(CANONICAL_COURSES_MAP);
  }, []);

  // Determine user's remembered dream college from authentication / profile
  const userDreamRaw = (user?.targetCollege || initialUser?.targetCollege || storeUser?.targetCollege || "").trim();
  const dreamCollegeResolved = useMemo(() => {
    if (!userDreamRaw) return null;
    return resolveTargetCollegeMatch(userDreamRaw) || userDreamRaw;
  }, [userDreamRaw]);

  // Initial state with dream college prioritized
  const [selectedCourseId, setSelectedCourseId] = useState<string>("bcom_hons");
  const [selectedCategory, setSelectedCategory] = useState<CategoryCode>("UR");
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [targetCollege, setTargetCollegeLocal] = useState<string>(
    dreamCollegeResolved || "Shri Ram College of Commerce"
  );
  const [trendCollege, setTrendCollege] = useState<string>(
    dreamCollegeResolved || "Shri Ram College of Commerce"
  );

  const searchParams = useSearchParams();

  // Keep targetCollege synced with dreamCollegeResolved as soon as available
  useEffect(() => {
    if (dreamCollegeResolved) {
      setTargetCollegeLocal(dreamCollegeResolved);
      setTrendCollege(dreamCollegeResolved);
    }
  }, [dreamCollegeResolved]);

  // Sync target college & course from search params or user profile with dream college precedence
  useEffect(() => {
    const collegeParam = searchParams ? searchParams.get("college") : null;
    const courseParam = searchParams ? searchParams.get("course") : null;

    // 1. Explicit search param takes first priority
    if (courseParam && CANONICAL_COURSES_MAP[courseParam]) {
      setSelectedCourseId(courseParam);
      const chosen = CANONICAL_COURSES_MAP[courseParam];
      if (
        chosen &&
        (chosen.stream === "science" ||
          chosen.stream === "commerce" ||
          chosen.stream === "humanities")
      ) {
        setSelectedStream(chosen.stream as StreamType);
      }
    } else if (dreamCollegeResolved) {
      // 2. Default to a course offered by user's dream college!
      const offeredCourseIds = Array.from(
        new Set(
          NORMALIZED_CUTOFFS.filter((r) => r.college === dreamCollegeResolved).map(
            (r) => r.canonical_course_id
          )
        )
      );

      if (offeredCourseIds.length > 0) {
        // A. Match target course if specified by user profile
        const matchedTarget = matchCourseToId(user?.targetCourse || "", coursesList);
        if (matchedTarget && offeredCourseIds.includes(matchedTarget)) {
          setSelectedCourseId(matchedTarget);
          const chosen = CANONICAL_COURSES_MAP[matchedTarget];
          if (
            chosen &&
            (chosen.stream === "science" ||
              chosen.stream === "commerce" ||
              chosen.stream === "humanities")
          ) {
            setSelectedStream(chosen.stream as StreamType);
          }
        } else {
          // B. Otherwise match course by user's active/preferred stream
          const activeStream = user?.preferredStream || selectedStream;
          const streamCourse = offeredCourseIds.find(
            (cid) => CANONICAL_COURSES_MAP[cid]?.stream === activeStream
          );
          const pickedCourseId = streamCourse || offeredCourseIds[0]!;
          setSelectedCourseId(pickedCourseId);
          const chosen = CANONICAL_COURSES_MAP[pickedCourseId];
          if (
            chosen &&
            (chosen.stream === "science" ||
              chosen.stream === "commerce" ||
              chosen.stream === "humanities")
          ) {
            setSelectedStream(chosen.stream as StreamType);
          }
        }
      }
    } else if (user?.preferredStream || selectedStream) {
      // 3. Fall back to stream default course
      const activeStream = user?.preferredStream || selectedStream;
      const streamCourse = coursesList.find((c) => c.stream === activeStream);
      if (streamCourse) {
        setSelectedCourseId(streamCourse.id);
      }
    }

    // Initialize college
    if (collegeParam) {
      const matched = resolveTargetCollegeMatch(collegeParam);
      if (matched) {
        setTargetCollegeLocal(matched);
        setTrendCollege(matched);
        return;
      }
    }

    if (dreamCollegeResolved) {
      setTargetCollegeLocal(dreamCollegeResolved);
      setTrendCollege(dreamCollegeResolved);
    }
  }, [
    searchParams,
    dreamCollegeResolved,
    user?.targetCourse,
    user?.preferredStream,
    coursesList,
    selectedStream,
    setSelectedStream,
  ]);

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

  // Keep target & trend college synced with dream college or available colleges
  useEffect(() => {
    if (availableColleges.length === 0) return;

    // 1. If user's dream college offers this course, ALWAYS prioritize it as default!
    if (dreamCollegeResolved && availableColleges.includes(dreamCollegeResolved)) {
      setTargetCollegeLocal(dreamCollegeResolved);
      setTrendCollege(dreamCollegeResolved);
      return;
    }

    // 2. If current targetCollege is in availableColleges, keep it
    if (availableColleges.includes(targetCollege)) {
      return;
    }

    // 3. Otherwise fall back to first offering college
    setTargetCollegeLocal(availableColleges[0]!);
    setTrendCollege(availableColleges[0]!);
  }, [availableColleges, dreamCollegeResolved, targetCollege]);

  // Dream College Gap Analysis
  const dreamCollegeGap = useMemo(() => {
    return computeDreamCollegeGap({
      collegeName: targetCollege,
      courseId: selectedCourseId,
      category: selectedCategory,
      userAttempts: testAttempts,
    });
  }, [targetCollege, selectedCourseId, selectedCategory, testAttempts]);

  // Check if student has zero attempts
  const hasZeroAttempts = testAttempts.length === 0;

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    const chosen = CANONICAL_COURSES_MAP[courseId];
    if (
      chosen &&
      (chosen.stream === "science" ||
        chosen.stream === "commerce" ||
        chosen.stream === "humanities")
    ) {
      setSelectedStream(chosen.stream as StreamType);
    }
  };

  const handleSaveProfileTarget = (colName: string) => {
    setTargetCollege(colName);
    setTargetCollegeLocal(colName);
    setTrendCollege(colName);
  };

  if (!isClient) {
    // Skeleton loader while hydrating
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
      {/* Zero Attempts Guidance Banner (if candidate has no recorded attempts) */}
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

      {/* 1. Compact Unified Toolbar: Category Chips, Program Dropdown, Target College Search/Dropdown */}
      <CoursePicker
        courses={coursesList}
        selectedCourseId={selectedCourseId}
        onSelectCourse={handleSelectCourse}
        selectedStream={selectedStream}
        onSelectStream={(st) => setSelectedStream(st)}
        targetCollege={targetCollege}
        onSelectCollege={(c) => {
          setTargetCollegeLocal(c);
          setTrendCollege(c);
        }}
        availableColleges={availableColleges}
        isSavedAsTarget={user?.targetCollege === targetCollege}
        onSaveAsProfileTarget={handleSaveProfileTarget}
      />

      {/* 2. Subject Cards Grid (Hero of the page) */}
      <SubjectCombinationCard
        resolution={standingsResult.resolution}
        subjectBreakdown={dreamCollegeGap?.subjectImprovementBreakdown || []}
        targetCollege={targetCollege}
        testAttempts={testAttempts}
      />

      {/* 3. Dream College Gap Analysis */}
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

      {/* 4. College Standings Table & Trend Chart (Sticky Category/Year Filters -> Chart -> Table) */}
      <CollegeStandingsTable
        standings={standingsResult.standings}
        category={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        selectedYear={selectedYear}
        onSelectYear={(yr) => setSelectedYear(yr)}
        selectedCollegeForTrend={trendCollege}
        onSelectCollegeForTrend={(col) => setTrendCollege(col)}
        combinedAverageMarks={standingsResult.resolution.combinedAverageMarks}
        targetCollege={targetCollege}
      />

      {/* 5. Methodology & Honest Labelling Disclaimers */}
      <div className="p-5 bg-slate-50/90 rounded-2xl border border-slate-200/80 space-y-2.5 text-sm text-slate-500">
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Cutoff Methodology & Disclaimers</span>
        </div>
        <ul className="space-y-1.5 list-disc list-inside text-[13px] leading-relaxed text-slate-600">
          <li>
            <strong>Data Source:</strong> Benchmarks are derived from official institutional archives across participating CUET universities (University of Delhi, Banaras Hindu University, Jawaharlal Nehru University, University of Allahabad, Jamia Millia Islamia, Dr. B.R. Ambedkar University Delhi, BBAU, GGSIPU, and Central Universities) covering 2023 to 2026 seat allocations across 96+ colleges and 48 degree programs.
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
