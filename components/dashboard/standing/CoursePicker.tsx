"use client";

import React, { useState, useRef, useEffect, useId, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Check,
  GraduationCap,
  X,
  Building2,
} from "lucide-react";
import { CanonicalCourse } from "@/lib/standing-engine";
import { StreamType } from "@/types";

interface CoursePickerProps {
  courses: CanonicalCourse[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
  selectedStream?: StreamType;
  onSelectStream?: (stream: StreamType) => void;
  targetCollege?: string;
  onSelectCollege?: (collegeName: string) => void;
  availableColleges?: string[];
  isSavedAsTarget?: boolean;
  onSaveAsProfileTarget?: (collegeName: string) => void;
}

const STREAM_GROUPS: Array<{ key: string; label: string }> = [
  { key: "science", label: "Science" },
  { key: "commerce", label: "Commerce" },
  { key: "humanities", label: "Humanities & Arts" },
];

export default function CoursePicker({
  courses,
  selectedCourseId,
  onSelectCourse,
  onSelectStream,
  targetCollege = "Hindu College",
  onSelectCollege,
  availableColleges = [],
}: CoursePickerProps) {
  // Course dropdown combobox state
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [highlightedCourseIndex, setHighlightedCourseIndex] = useState(0);

  // College dropdown state
  const [isCollegeOpen, setIsCollegeOpen] = useState(false);
  const [collegeSearch, setCollegeSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const courseInputRef = useRef<HTMLInputElement>(null);
  const collegeInputRef = useRef<HTMLInputElement>(null);
  const courseListboxId = useId();
  const collegeListboxId = useId();

  const selectedCourse = useMemo(() => {
    return courses.find((c) => c.id === selectedCourseId) || courses[0];
  }, [courses, selectedCourseId]);

  // Filtered courses based on search query
  const filteredCourses = useMemo(() => {
    const q = courseSearch.toLowerCase().trim();
    if (!q) return courses;
    return courses.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.stream.toLowerCase().includes(q) ||
        c.degreeType.toLowerCase().includes(q)
      );
    });
  }, [courses, courseSearch]);

  // Group filtered courses by stream
  const groupedCourses = useMemo(() => {
    const groups: Array<{ key: string; label: string; items: CanonicalCourse[] }> = [];

    STREAM_GROUPS.forEach((g) => {
      const items = filteredCourses.filter(
        (c) => c.stream.toLowerCase() === g.key.toLowerCase()
      );
      if (items.length > 0) {
        groups.push({ key: g.key, label: g.label, items });
      }
    });

    // Catch any courses that don't match the known stream groups
    const otherItems = filteredCourses.filter(
      (c) =>
        !STREAM_GROUPS.some(
          (g) => g.key.toLowerCase() === c.stream.toLowerCase()
        )
    );
    if (otherItems.length > 0) {
      groups.push({ key: "other", label: "Other Programs", items: otherItems });
    }

    return groups;
  }, [filteredCourses]);

  // Flattened list of grouped courses for keyboard navigation index
  const flattenedGroupedCourses = useMemo(() => {
    return groupedCourses.flatMap((g) => g.items);
  }, [groupedCourses]);

  // Filtered colleges based on search query
  const filteredColleges = useMemo(() => {
    const q = collegeSearch.toLowerCase().trim();
    return availableColleges.filter((c) => !q || c.toLowerCase().includes(q));
  }, [availableColleges, collegeSearch]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsCourseOpen(false);
        setIsCollegeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation for program combobox
  const handleCourseKeyDown = (e: React.KeyboardEvent) => {
    if (!isCourseOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setIsCourseOpen(true);
        setIsCollegeOpen(false);
        setTimeout(() => courseInputRef.current?.focus(), 50);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedCourseIndex((prev) =>
        prev < flattenedGroupedCourses.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedCourseIndex((prev) =>
        prev > 0 ? prev - 1 : flattenedGroupedCourses.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flattenedGroupedCourses[highlightedCourseIndex]) {
        handleSelectCourseItem(flattenedGroupedCourses[highlightedCourseIndex]!);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsCourseOpen(false);
    }
  };

  // Select course & automatically select stream
  const handleSelectCourseItem = (course: CanonicalCourse) => {
    const courseStream = course.stream as StreamType;
    if (onSelectStream) {
      onSelectStream(courseStream);
    }
    onSelectCourse(course.id);
    setIsCourseOpen(false);
    setCourseSearch("");
  };

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-3 sm:p-4 w-full"
    >
      {/* Two equal-width dropdowns side by side on desktop/tablet, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
        {/* 1. Program Dropdown (Searchable Combobox Grouped by Stream) */}
        <div className="relative w-full min-w-0" onKeyDown={handleCourseKeyDown}>
          <button
            id="course-picker-trigger"
            type="button"
            onClick={() => {
              const next = !isCourseOpen;
              setIsCourseOpen(next);
              setIsCollegeOpen(false);
              if (next) {
                setTimeout(() => courseInputRef.current?.focus(), 50);
              }
            }}
            aria-haspopup="listbox"
            aria-expanded={isCourseOpen}
            aria-controls={courseListboxId}
            className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/90 rounded-xl border border-slate-200/90 text-left transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider block leading-none">
                  Target Program
                </span>
                <span className="font-semibold text-slate-900 text-sm truncate block mt-1">
                  {selectedCourse?.name || "Select Program"}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                isCourseOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Program Searchable Dropdown Menu */}
          {isCourseOpen && (
            <div
              id={courseListboxId}
              role="listbox"
              aria-label="Programs List"
              className="absolute left-0 right-0 z-50 mt-1.5 w-full bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-96 flex flex-col"
            >
              {/* Search Bar Input */}
              <div className="p-2.5 border-b border-slate-100 sticky top-0 bg-white z-20 space-y-2">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    ref={courseInputRef}
                    type="text"
                    value={courseSearch}
                    onChange={(e) => {
                      setCourseSearch(e.target.value);
                      setHighlightedCourseIndex(0);
                    }}
                    placeholder="Search 48 programs (e.g. Physics, B.Com, Economics)..."
                    className="w-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
                    aria-label="Filter programs"
                  />
                  {courseSearch && (
                    <button
                      type="button"
                      onClick={() => setCourseSearch("")}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Clear program search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Options List Grouped by Stream */}
              <div className="overflow-y-auto p-2 space-y-3 flex-1 [scrollbar-width:thin]">
                {groupedCourses.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No programs match &ldquo;{courseSearch}&rdquo;.
                  </div>
                ) : (
                  groupedCourses.map((group) => (
                    <div key={group.key} className="space-y-1">
                      {/* Stream Group Heading */}
                      <div className="px-2.5 py-1 text-[12px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100/80 rounded-lg flex items-center justify-between sticky top-0 z-10">
                        <span>{group.label}</span>
                        <span className="text-slate-400 font-normal">
                          ({group.items.length})
                        </span>
                      </div>

                      {/* Programs in this Stream */}
                      <div className="space-y-0.5 pt-0.5">
                        {group.items.map((c) => {
                          const flatIndex = flattenedGroupedCourses.findIndex(
                            (fc) => fc.id === c.id
                          );
                          const isSelected = c.id === selectedCourseId;
                          const isHighlighted = flatIndex === highlightedCourseIndex;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => handleSelectCourseItem(c)}
                              onMouseEnter={() => setHighlightedCourseIndex(flatIndex)}
                              className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-blue-50 text-blue-900 border border-blue-200 font-semibold"
                                  : isHighlighted
                                  ? "bg-slate-50 text-slate-900"
                                  : "text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex flex-col min-w-0 flex-1">
                                <span className="text-sm font-semibold text-slate-900 truncate">
                                  {c.name}
                                </span>
                                <span className="text-[13px] text-slate-500 mt-0.5">
                                  {c.degreeType} • {c.subjectCount} Subjects ({c.cutoffScale} marks scale)
                                </span>
                              </div>
                              {isSelected && (
                                <Check className="w-4 h-4 text-blue-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* 2. Target College Dropdown (Searchable Combobox) */}
        <div className="relative w-full min-w-0">
          <button
            id="college-picker-trigger"
            type="button"
            onClick={() => {
              const next = !isCollegeOpen;
              setIsCollegeOpen(next);
              setIsCourseOpen(false);
              if (next) {
                setTimeout(() => collegeInputRef.current?.focus(), 50);
              }
            }}
            aria-haspopup="listbox"
            aria-expanded={isCollegeOpen}
            aria-controls={collegeListboxId}
            className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 sm:py-3 bg-slate-50 hover:bg-slate-100/90 rounded-xl border border-slate-200/90 text-left transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
                <Building2 className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[12px] font-semibold text-slate-500 uppercase tracking-wider block leading-none">
                  Target College
                </span>
                <span className="font-semibold text-slate-900 text-sm truncate block mt-1">
                  {targetCollege || "Select College"}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                isCollegeOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* College Dropdown Menu */}
          {isCollegeOpen && (
            <div
              id={collegeListboxId}
              role="listbox"
              aria-label="Colleges List"
              className="absolute left-0 right-0 z-50 mt-1.5 w-full bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-96 flex flex-col"
            >
              {/* Search Bar Input */}
              <div className="p-2.5 border-b border-slate-100 sticky top-0 bg-white z-20 space-y-2">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    ref={collegeInputRef}
                    type="text"
                    value={collegeSearch}
                    onChange={(e) => setCollegeSearch(e.target.value)}
                    placeholder="Search college (e.g. Hindu, Miranda House, SRCC)..."
                    className="w-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
                    aria-label="Filter colleges"
                  />
                  {collegeSearch && (
                    <button
                      type="button"
                      onClick={() => setCollegeSearch("")}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Clear college search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* College Options List */}
              <div className="overflow-y-auto p-2 space-y-0.5 flex-1 [scrollbar-width:thin]">
                {filteredColleges.length === 0 ? (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No colleges match &ldquo;{collegeSearch}&rdquo;.
                  </div>
                ) : (
                  filteredColleges.map((colName) => {
                    const isSelected = colName === targetCollege;
                    return (
                      <button
                        key={colName}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          if (onSelectCollege) {
                            onSelectCollege(colName);
                          }
                          setIsCollegeOpen(false);
                          setCollegeSearch("");
                        }}
                        className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50 text-blue-900 border border-blue-200 font-semibold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-sm font-semibold truncate flex-1">
                          {colName}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
