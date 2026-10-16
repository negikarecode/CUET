"use client";

import { useState, useMemo, useCallback } from "react";
import {
  COLLEGES,
  CANONICAL_COURSES,
  resolveCollege,
  resolveProgram,
  isValidPair,
  getProgramsForCollege,
  getCollegesForProgram,
} from "@/lib/college-offerings";

export interface InlineNotice {
  message: string;
  type: "warning" | "info";
}

export interface UseTargetSelectionOptions {
  initialCollege?: string | null;
  initialCourse?: string | null;
  initialStream?: string | null;
  showUnavailable?: boolean;
  filterCoursesByStream?: boolean;
}

export function useTargetSelection(options?: UseTargetSelectionOptions) {
  const [showUnavailable, setShowUnavailable] = useState(
    options?.showUnavailable ?? false
  );

  // Normalize initial stream ("Science", "Commerce", "Humanities", "All")
  const initialStreamNorm = useMemo(() => {
    const s = (options?.initialStream || "").toLowerCase();
    if (s === "all") return "All";
    if (s === "commerce") return "Commerce";
    if (s === "humanities") return "Humanities";
    if (s === "science") return "Science";
    return options?.filterCoursesByStream === false ? "All" : "Science";
  }, [options?.initialStream, options?.filterCoursesByStream]);

  const [stream, setStreamState] = useState<string>(initialStreamNorm);

  // Resolved initial college & program
  const resolvedInitCol = useMemo(
    () => resolveCollege(options?.initialCollege),
    [options?.initialCollege]
  );
  const resolvedInitProg = useMemo(
    () => resolveProgram(options?.initialCourse),
    [options?.initialCourse]
  );

  const [collegeId, setCollegeId] = useState<string | null>(
    resolvedInitCol?.id || null
  );
  const [courseId, setCourseId] = useState<string | null>(
    resolvedInitProg?.id || null
  );

  const [inlineNotice, setInlineNotice] = useState<InlineNotice | null>(null);

  // Current College & Course Objects
  const selectedCollege = useMemo(() => {
    return collegeId ? resolveCollege(collegeId) || null : null;
  }, [collegeId]);

  const selectedCourse = useMemo(() => {
    return courseId ? resolveProgram(courseId) || null : null;
  }, [courseId]);

  // Derived University
  const derivedUniversity = useMemo(() => {
    return selectedCollege?.university || "University of Delhi";
  }, [selectedCollege]);

  // Check if current pair is valid
  const isValid = useMemo(() => {
    if (!collegeId || !courseId) return false;
    return isValidPair(collegeId, courseId);
  }, [collegeId, courseId]);

  // Available Courses based on selected college and stream
  const availableCourses = useMemo(() => {
    const streamKey = stream.toLowerCase();
    const isAll = streamKey === "all" || options?.filterCoursesByStream === false;
    if (selectedCollege) {
      return getProgramsForCollege(selectedCollege.id, {
        stream: isAll ? undefined : streamKey,
        showUnavailable,
      });
    }
    // No college selected: show all canonical courses matching active stream or all if isAll
    return CANONICAL_COURSES.filter((c) => {
      if (showUnavailable) return true;
      if (isAll) return true;
      return c.stream.toLowerCase() === streamKey;
    });
  }, [selectedCollege, stream, showUnavailable, options?.filterCoursesByStream]);

  // Course Count and Label for Dropdown
  const courseDropdownLabel = useMemo(() => {
    if (selectedCollege) {
      return `${availableCourses.length} courses at ${selectedCollege.shortName || selectedCollege.name}`;
    }
    return `${availableCourses.length} programs available`;
  }, [selectedCollege, availableCourses.length]);

  // Available Colleges based on selected course
  const availableColleges = useMemo(() => {
    if (selectedCourse) {
      return getCollegesForProgram(selectedCourse.id, { showUnavailable });
    }
    // No course selected: all CUET offering colleges
    return COLLEGES.filter((c) => {
      if (showUnavailable) return true;
      return c.admissionBasis === "CUET";
    });
  }, [selectedCourse, showUnavailable]);

  // College Count and Label for Dropdown
  const collegeDropdownLabel = useMemo(() => {
    if (selectedCourse) {
      return `${availableColleges.length} colleges offer ${selectedCourse.name}`;
    }
    return `${availableColleges.length} colleges available`;
  }, [selectedCourse, availableColleges.length]);

  // Selection Action: Select College
  const selectCollege = useCallback(
    (input: string | null) => {
      if (!input) {
        setCollegeId(null);
        return;
      }

      const col = resolveCollege(input);
      if (!col) return;

      const newCollegeId = col.id;
      setCollegeId(newCollegeId);

      // Cascading logic: check if existing course is offered by new college
      if (courseId) {
        const isOffered = isValidPair(newCollegeId, courseId);
        if (!isOffered) {
          const oldCourse = resolveProgram(courseId);
          const oldCourseName = oldCourse?.name || "the selected course";
          // Clear course, keep college, set inline notice
          setCourseId(null);
          setInlineNotice({
            message: `${col.shortName || col.name} doesn't offer ${oldCourseName}. Choose a course.`,
            type: "warning",
          });
          return;
        }
      }

      // If valid or no course was selected, clear warning notice
      setInlineNotice(null);
    },
    [courseId]
  );

  // Selection Action: Select Course
  const selectCourse = useCallback(
    (input: string | null) => {
      if (!input) {
        setCourseId(null);
        return;
      }

      const prog = resolveProgram(input);
      if (!prog) return;

      const newCourseId = prog.id;
      setCourseId(newCourseId);

      // Check stream sync: if course belongs to another stream, switch stream with inline notice
      const courseStream = prog.stream.toLowerCase();
      let streamChanged = false;
      let newStreamFormatted = stream;

      if (courseStream !== stream.toLowerCase()) {
        newStreamFormatted =
          courseStream === "commerce"
            ? "Commerce"
            : courseStream === "humanities"
            ? "Humanities"
            : "Science";
        setStreamState(newStreamFormatted);
        streamChanged = true;
      }

      // Cascading logic: check if existing college offers new course
      if (collegeId) {
        const isOffered = isValidPair(collegeId, newCourseId);
        if (!isOffered) {
          const oldCollege = resolveCollege(collegeId);
          const oldCollegeName = oldCollege?.shortName || oldCollege?.name || "this college";
          // Clear college, keep course, set inline notice
          setCollegeId(null);
          setInlineNotice({
            message: `${prog.name} isn't offered at ${oldCollegeName}. Choose a college.`,
            type: "warning",
          });
          return;
        }
      }

      if (streamChanged) {
        setInlineNotice({
          message: `Stream updated to ${newStreamFormatted} for ${prog.name}.`,
          type: "info",
        });
      } else {
        setInlineNotice(null);
      }
    },
    [collegeId, stream]
  );

  // Selection Action: Select Stream
  const selectStream = useCallback(
    (newStreamInput: string) => {
      const sLower = newStreamInput.toLowerCase();
      const formatted =
        sLower === "all"
          ? "All"
          : sLower === "commerce"
          ? "Commerce"
          : sLower === "humanities"
          ? "Humanities"
          : "Science";

      setStreamState(formatted);

      if (formatted === "All") {
        setInlineNotice(null);
        return;
      }

      // If existing course belongs to another stream, clear it with notice
      if (courseId) {
        const currentCourse = resolveProgram(courseId);
        if (currentCourse && currentCourse.stream.toLowerCase() !== sLower) {
          setCourseId(null);
          setInlineNotice({
            message: `Switched to ${formatted} stream. Please choose an offered course.`,
            type: "info",
          });
        }
      }
    },
    [courseId]
  );

  const clearCollege = useCallback(() => {
    setCollegeId(null);
  }, []);

  const clearCourse = useCallback(() => {
    setCourseId(null);
  }, []);

  const clearNotice = useCallback(() => {
    setInlineNotice(null);
  }, []);

  const reset = useCallback(
    (
      newCollege?: string | null,
      newCourse?: string | null,
      newStream?: string | null
    ) => {
      const c = resolveCollege(newCollege);
      const p = resolveProgram(newCourse);
      const s = (newStream || "").toLowerCase();
      const sFormatted =
        s === "all"
          ? "All"
          : s === "commerce"
          ? "Commerce"
          : s === "humanities"
          ? "Humanities"
          : s === "science"
          ? "Science"
          : options?.filterCoursesByStream === false
          ? "All"
          : "Science";

      setCollegeId(c?.id || null);
      setCourseId(p?.id || null);
      setStreamState(sFormatted);
      setInlineNotice(null);
    },
    [options?.filterCoursesByStream]
  );

  return {
    // Current selections
    collegeId,
    collegeName: selectedCollege?.name || "",
    selectedCollege,
    courseId,
    courseName: selectedCourse?.name || "",
    selectedCourse,
    stream,
    derivedUniversity,
    isValidPair: isValid,

    // Lists & Labels
    availableCourses,
    availableColleges,
    courseDropdownLabel,
    collegeDropdownLabel,

    // Notice & Toggles
    inlineNotice,
    showUnavailable,
    setShowUnavailable,

    // Mutators
    selectCollege,
    selectCourse,
    selectStream,
    clearCollege,
    clearCourse,
    clearNotice,
    reset,
  };
}

export default useTargetSelection;
