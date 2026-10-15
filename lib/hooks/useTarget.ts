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
  CANONICAL_SUBJECTS_MAP,
  CanonicalCourse,
} from "@/lib/standing-engine";
import { normalizeSubject } from "@/lib/analytics";
import { normalizePracticeFolder } from "@/lib/practice-stats";

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
 * Resolves the 3-4 subjects required for a target course based on combination rules.
 * Prioritizes required subjects first, then resolves electives according to
 * student-selected profile subjects and stream core subjects.
 */
export function resolveTargetRequiredSubjects(
  courseObj: CanonicalCourse | undefined,
  userSelectedSubs: string[] = [],
  stream: string = "science"
): string[] {
  if (!courseObj || !courseObj.combinations || !courseObj.combinations[0]) {
    return [];
  }
  const comb = courseObj.combinations[0];
  const targetCount = courseObj.subjectCount || 4;
  const picked = new Set<string>();

  const streamPreferences: Record<string, string[]> = {
    science: ["physics", "chemistry", "maths", "bio", "computer_science"],
    commerce: ["accs", "bst", "eco", "maths"],
    humanities: ["pol science", "history", "geo", "eco", "psychology", "sociology"],
  };

  const courseStream = (courseObj.stream || stream).toLowerCase();
  const streamPref: string[] = streamPreferences[courseStream] || streamPreferences["science"] || [];

  // 1. Required rules first
  for (const rule of comb.rules) {
    if (rule.type === "required") {
      for (const s of rule.subjects) {
        if (picked.size < targetCount && !picked.has(s)) {
          picked.add(s);
        }
      }
    }
  }

  // 2. Elective rules (one_of, best_of)
  for (const rule of comb.rules) {
    if (rule.type !== "required") {
      let needed = rule.count || 1;
      const candidates = rule.subjects.filter((s: string) => !picked.has(s));

      // Priority 0: Course-specific subject match (e.g. computer_science for B.Sc. CS)
      const courseIdLower = (courseObj.id || "").toLowerCase();
      const courseNameLower = (courseObj.name || "").toLowerCase();
      for (const cand of candidates) {
        const cLower = cand.toLowerCase();
        const candName = (CANONICAL_SUBJECTS_MAP[cand]?.name || "").toLowerCase();
        const firstWord = candName ? candName.split(" ")[0] || "" : "";
        const matchesCourse =
          courseIdLower.includes(cLower) ||
          (firstWord.length > 0 && courseNameLower.includes(firstWord.toLowerCase()));
        if (matchesCourse && needed > 0 && picked.size < targetCount && !picked.has(cand)) {
          picked.add(cand);
          needed--;
        }
      }

      // Priority 1: user selected profile subjects
      for (const userSub of userSelectedSubs) {
        const uLower = userSub.toLowerCase().trim();
        const match = candidates.find(
          (c: string) =>
            c.toLowerCase() === uLower ||
            CANONICAL_SUBJECTS_MAP[c]?.name.toLowerCase() === uLower ||
            normalizeSubject(c).key === normalizeSubject(userSub).key
        );
        if (match && needed > 0 && picked.size < targetCount && !picked.has(match)) {
          picked.add(match);
          needed--;
        }
      }

      // Priority 2: if language rule (contains english), default to english
      if (needed > 0 && candidates.includes("english") && !picked.has("english") && picked.size < targetCount) {
        picked.add("english");
        needed--;
      }

      // Priority 3: stream core subjects
      for (const pref of streamPref) {
        if (needed > 0 && candidates.includes(pref) && !picked.has(pref) && picked.size < targetCount) {
          picked.add(pref);
          needed--;
        }
      }

      // Priority 4: remaining candidates in rule order
      for (const cand of candidates) {
        if (needed > 0 && !picked.has(cand) && picked.size < targetCount) {
          picked.add(cand);
          needed--;
        }
      }
    }
  }

  return Array.from(picked).map((s) => CANONICAL_SUBJECTS_MAP[s]?.name || s);
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
    const hasTarget = Boolean(rawCollege);

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

    // Build per-subject targets map for each resolved subject in this course combination
    const perSubjectTargets: Record<string, number> = {};
    const requiredSubjects: string[] = hasTarget
      ? resolveTargetRequiredSubjects(courseObj, storeUser?.selectedSubjects, stream)
      : [];

    if (hasTarget && requiredSubjects.length > 0) {
      requiredSubjects.forEach((s) => {
        perSubjectTargets[s.toLowerCase()] = perSubjectTarget;
        perSubjectTargets[s] = perSubjectTarget;
        const normKey = normalizeSubject(s).key;
        perSubjectTargets[normKey] = perSubjectTarget;
        const practiceFolder = normalizePracticeFolder(s);
        if (practiceFolder) {
          perSubjectTargets[practiceFolder] = perSubjectTarget;
        }
      });
    }

    const label = hasTarget
      ? `Target: ${perSubjectTarget} · ${resolvedCollege}, ${canonicalCourseName}`
      : "Target: None configured";

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
  }, [storeUser?.targetCollege, storeUser?.targetCourse, storeUser?.preferredStream, storeUser?.selectedSubjects]);
}

export default useTarget;
