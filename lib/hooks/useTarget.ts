"use client";

import { useMemo } from "react";
import { useTestStore } from "@/lib/store/useTestStore";
import {
  computeMultiYearCutoff,
  getProjectedCutoff,
  resolveTargetCollegeMatch,
  matchCourseToId,
  calculateSubjectTargetMarks,
  CANONICAL_COURSES_MAP,
} from "@/lib/standing-engine";

export interface TargetData {
  college: string;
  course: string;
  courseId: string | null;
  cutoffScale: number;
  expectedCutoff: number;
  perSubjectTarget: number;
  perSubjectTargets: Record<string, number>;
  requiredSubjects: string[];
  targetAccuracy: number;
  hasTarget: boolean;
  label: string;
  projectedYear?: number;
  likelyRange?: {
    low: number;
    high: number;
    label: string;
  } | string;
  basis?: string;
}

/**
 * Single source of truth for student dream college target and cutoffs.
 * Reads directly from Zustand store (public.profiles user target).
 * Reactively updates across Dashboard, Performance Chart, Where Do I Stand, and Homepage
 * without requiring a page reload.
 */
export function useTarget(): TargetData {
  const storeUser = useTestStore((state) => state.user);

  return useMemo(() => {
    const rawCollege = (storeUser?.targetCollege || "").trim();
    const rawCourse = (storeUser?.targetCourse || "").trim();
    const stream = (storeUser?.preferredStream || "science").toLowerCase();

    // Default fallback course by stream if none explicitly saved in profile
    const fallbackCourse =
      stream === "commerce"
        ? "B.Com. (Hons.)"
        : stream === "humanities"
        ? "B.A. (Hons.) Political Science"
        : "B.Sc. (Hons.) Physics";

    const effectiveCollege = rawCollege || "Hindu College";
    const effectiveCourse = rawCourse || fallbackCourse;

    const resolvedCollege = resolveTargetCollegeMatch(effectiveCollege) || effectiveCollege;
    const resolvedCourseId = matchCourseToId(effectiveCourse) || "bsc_hons_physics";
    const courseObj = CANONICAL_COURSES_MAP[resolvedCourseId];
    const canonicalCourseName = courseObj?.name || effectiveCourse;

    const projection = getProjectedCutoff(resolvedCollege, resolvedCourseId, "UR");
    const stats = computeMultiYearCutoff(resolvedCollege, resolvedCourseId, "UR");

    const expectedCutoff = projection.projectedValue;
    const cutoffScale = stats?.cutoffScale ?? 750;
    const subjectCount =
      courseObj?.subjectCount ?? (cutoffScale > 0 ? Math.round(cutoffScale / 250) : 3);

    const perSubjectTarget = calculateSubjectTargetMarks(
      expectedCutoff,
      cutoffScale,
      250,
      subjectCount
    );

    // Target accuracy percentage (e.g. 556.8 / 750 = 74.2%)
    const targetAccuracy =
      cutoffScale > 0 ? Math.round((expectedCutoff / cutoffScale) * 1000) / 10 : 75;

    // Build per-subject targets map for each subject in this course combination
    const perSubjectTargets: Record<string, number> = {};
    const requiredSubjects: string[] = [];
    if (courseObj && courseObj.combinations && courseObj.combinations[0]) {
      const comb = courseObj.combinations[0];
      const allSubs = comb.rules.flatMap((r) => r.subjects);
      allSubs.forEach((s) => {
        perSubjectTargets[s.toLowerCase()] = perSubjectTarget;
        perSubjectTargets[s] = perSubjectTarget;
        if (!requiredSubjects.includes(s)) {
          requiredSubjects.push(s);
        }
      });
    }

    const hasTarget = Boolean(rawCollege);
    const label = `Target: ${perSubjectTarget} · ${resolvedCollege}, ${canonicalCourseName}`;

    return {
      college: resolvedCollege,
      course: canonicalCourseName,
      courseId: resolvedCourseId,
      cutoffScale,
      expectedCutoff,
      perSubjectTarget,
      perSubjectTargets,
      requiredSubjects,
      targetAccuracy,
      hasTarget,
      label,
      projectedYear: projection.projectedYear,
      likelyRange: projection.likelyRange,
      basis: projection.basis,
    };
  }, [storeUser?.targetCollege, storeUser?.targetCourse, storeUser?.preferredStream]);
}

export default useTarget;
