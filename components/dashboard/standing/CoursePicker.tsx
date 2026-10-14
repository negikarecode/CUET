"use client";

import React, { useState, useRef, useEffect, useId, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Check,
  GraduationCap,
  X,
  Layers,
  Briefcase,
  FlaskConical,
  BookOpen,
  Building2,
  Bookmark,
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

type StreamFilter = "all" | StreamType;

interface StreamOption {
  id: StreamFilter;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeClass: string;
  activeClass: string;
}

const STREAM_OPTIONS: StreamOption[] = [
  {
    id: "all",
    label: "All Streams",
    shortLabel: "All",
    icon: Layers,
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    activeClass: "bg-slate-900 text-white shadow-xs",
  },
  {
    id: "commerce",
    label: "Commerce",
    shortLabel: "Commerce",
    icon: Briefcase,
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    activeClass: "bg-emerald-600 text-white shadow-xs",
  },
  {
    id: "science",
    label: "Science",
    shortLabel: "Science",
    icon: FlaskConical,
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    activeClass: "bg-blue-600 text-white shadow-xs",
  },
  {
    id: "humanities",
    label: "Humanities / Arts",
    shortLabel: "Humanities",
    icon: BookOpen,
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    activeClass: "bg-purple-600 text-white shadow-xs",
  },
];

export default function CoursePicker({
  courses,
  selectedCourseId,
  onSelectCourse,
  selectedStream,
  onSelectStream,
  targetCollege = "Shri Ram College of Commerce",
  onSelectCollege,
  availableColleges = [],
  isSavedAsTarget = false,
  onSaveAsProfileTarget,
}: CoursePickerProps) {
  // Course dropdown state
  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");
  const [highlightedCourseIndex, setHighlightedCourseIndex] = useState(0);

  // College dropdown state
  const [isCollegeOpen, setIsCollegeOpen] = useState(false);
  const [collegeSearch, setCollegeSearch] = useState("");
  const [justSaved, setJustSaved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const courseInputRef = useRef<HTMLInputElement>(null);
  const collegeInputRef = useRef<HTMLInputElement>(null);
  const courseListboxId = useId();
  const collegeListboxId = useId();

  const selectedCourse = useMemo(() => {
    return courses.find((c) => c.id === selectedCourseId) || courses[0];
  }, [courses, selectedCourseId]);

  // Active stream filter state (defaults to selected course stream or selectedStream prop)
  const [activeStream, setActiveStream] = useState<StreamFilter>(
    selectedStream || (selectedCourse?.stream as StreamType) || "all"
  );

  // Synchronize stream tab when selected course changes
  useEffect(() => {
    if (selectedCourse?.stream) {
      setActiveStream(selectedCourse.stream as StreamType);
    }
  }, [selectedCourse?.stream]);

  // Stream counts
  const streamCounts = useMemo(() => {
    const counts: Record<string, number> = { all: courses.length };
    courses.forEach((c) => {
      counts[c.stream] = (counts[c.stream] || 0) + 1;
    });
    return counts;
  }, [courses]);

  // Filtered courses based on search query and stream filter
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesStream = activeStream === "all" || c.stream === activeStream;
      const q = courseSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.stream.toLowerCase().includes(q) ||
        c.degreeType.toLowerCase().includes(q);
      return matchesStream && matchesSearch;
    });
  }, [courses, activeStream, courseSearch]);

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

  // Keyboard navigation for courses
  const handleCourseKeyDown = (e: React.KeyboardEvent) => {
    if (!isCourseOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setIsCourseOpen(true);
        setIsCollegeOpen(false);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedCourseIndex((prev) =>
        prev < filteredCourses.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedCourseIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCourses.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCourses[highlightedCourseIndex]) {
        handleSelectCourseItem(filteredCourses[highlightedCourseIndex]!);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsCourseOpen(false);
    }
  };

  // Select course & automatically select stream
  const handleSelectCourseItem = (course: CanonicalCourse) => {
    const courseStream = course.stream as StreamType;
    setActiveStream(courseStream);
    if (onSelectStream) {
      onSelectStream(courseStream);
    }
    onSelectCourse(course.id);
    setIsCourseOpen(false);
    setCourseSearch("");
  };

  // Stream Tab click
  const handleStreamTabClick = (streamId: StreamFilter) => {
    setActiveStream(streamId);
    setHighlightedCourseIndex(0);
    if (streamId !== "all") {
      if (onSelectStream) {
        onSelectStream(streamId as StreamType);
      }
      if (selectedCourse?.stream !== streamId) {
        const firstInStream = courses.find((c) => c.stream === streamId);
        if (firstInStream) {
          onSelectCourse(firstInStream.id);
        }
      }
    }
  };

  // Stream styling helper
  const getStreamBadgeStyle = (streamName: string) => {
    switch (streamName.toLowerCase()) {
      case "commerce":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "science":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "humanities":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const handleSaveTarget = () => {
    if (onSaveAsProfileTarget && targetCollege) {
      onSaveAsProfileTarget(targetCollege);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  const isSaved = isSavedAsTarget || justSaved;

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs px-3 sm:px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-4 md:min-h-[58px] md:max-h-[72px]"
    >
      {/* 1. Category Chips: All / Commerce / Science / Humanities (with counts) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 [scrollbar-width:none] shrink-0">
        {STREAM_OPTIONS.map((opt) => {
          const count = streamCounts[opt.id] ?? 0;
          const isSelected = activeStream === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleStreamTabClick(opt.id)}
              className={`px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isSelected
                  ? opt.activeClass
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <span>{opt.shortLabel}</span>
              <span className="opacity-75">({count})</span>
            </button>
          );
        })}
      </div>

      {/* 2. Dropdowns Row: Program Dropdown + Target College Search/Dropdown */}
      <div className="flex items-center gap-2 flex-1 md:justify-end min-w-0">
        {/* Program Dropdown */}
        <div className="relative flex-1 md:flex-initial" onKeyDown={handleCourseKeyDown}>
          <button
            id="course-picker-trigger"
            type="button"
            onClick={() => {
              setIsCourseOpen(!isCourseOpen);
              setIsCollegeOpen(false);
              setTimeout(() => courseInputRef.current?.focus(), 50);
            }}
            aria-haspopup="listbox"
            aria-expanded={isCourseOpen}
            aria-controls={courseListboxId}
            className="w-full md:w-auto min-w-[170px] max-w-[260px] flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/90 rounded-xl border border-slate-200/90 text-left transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <div className="flex items-center gap-2 min-w-0">
              <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-slate-900 text-sm truncate">
                  {selectedCourse?.name || "Select Program"}
                </span>
              </div>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ${
                isCourseOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Program Dropdown Menu */}
          {isCourseOpen && (
            <div
              id={courseListboxId}
              role="listbox"
              aria-label="Programs List"
              className="absolute left-0 md:left-auto md:right-0 z-50 mt-1.5 w-72 sm:w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-96 flex flex-col"
            >
              {/* Search Bar */}
              <div className="p-2.5 border-b border-slate-100 sticky top-0 bg-white z-10 space-y-2">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/70 rounded-xl px-2.5 py-1.5">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    ref={courseInputRef}
                    type="text"
                    value={courseSearch}
                    onChange={(e) => {
                      setCourseSearch(e.target.value);
                      setHighlightedCourseIndex(0);
                    }}
                    placeholder="Search program..."
                    className="w-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
                    aria-label="Filter programs"
                  />
                  {courseSearch && (
                    <button
                      type="button"
                      onClick={() => setCourseSearch("")}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                      aria-label="Clear program search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Course Options */}
              <div className="overflow-y-auto p-2 space-y-1 flex-1 [scrollbar-width:thin]">
                {filteredCourses.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-500">
                    No matching programs found.
                  </div>
                ) : (
                  filteredCourses.map((c, index) => {
                    const isSelected = c.id === selectedCourseId;
                    const isHighlighted = index === highlightedCourseIndex;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectCourseItem(c)}
                        onMouseEnter={() => setHighlightedCourseIndex(index)}
                        className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50 text-blue-900 border border-blue-200 font-semibold"
                            : isHighlighted
                            ? "bg-slate-50 text-slate-900"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-slate-900 truncate">
                              {c.name}
                            </span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[13px] font-semibold uppercase tracking-wider border ${getStreamBadgeStyle(
                                c.stream
                              )}`}
                            >
                              {c.stream}
                            </span>
                          </div>
                          <span className="text-[13px] text-slate-500 mt-0.5">
                            {c.degreeType} • {c.subjectCount} Subjects ({c.cutoffScale} marks scale)
                          </span>
                        </div>
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

        {/* Target College Search & Dropdown */}
        <div className="relative flex-1 md:flex-initial">
          <div className="flex items-center gap-1.5">
            <button
              id="college-picker-trigger"
              type="button"
              onClick={() => {
                setIsCollegeOpen(!isCollegeOpen);
                setIsCourseOpen(false);
                setTimeout(() => collegeInputRef.current?.focus(), 50);
              }}
              aria-haspopup="listbox"
              aria-expanded={isCollegeOpen}
              aria-controls={collegeListboxId}
              className="w-full md:w-auto min-w-[170px] max-w-[260px] flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/90 rounded-xl border border-slate-200/90 text-left transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-semibold text-slate-900 text-sm truncate">
                  {targetCollege || "Select College"}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ${
                  isCollegeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Saved Target Green Badge or Set Target Action */}
            {isSaved ? (
              <span
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[13px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 whitespace-nowrap"
                title="Target college saved to your profile"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Saved Target</span>
              </span>
            ) : onSaveAsProfileTarget ? (
              <button
                type="button"
                onClick={handleSaveTarget}
                title="Save as dream college target"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[13px] font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 transition-colors shrink-0 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Set Target</span>
              </button>
            ) : null}
          </div>

          {/* College Dropdown Menu */}
          {isCollegeOpen && (
            <div
              id={collegeListboxId}
              role="listbox"
              aria-label="Colleges List"
              className="absolute right-0 z-50 mt-1.5 w-72 sm:w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-96 flex flex-col"
            >
              <div className="p-2.5 border-b border-slate-100 sticky top-0 bg-white z-10 space-y-2">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/70 rounded-xl px-2.5 py-1.5">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input
                    ref={collegeInputRef}
                    type="text"
                    value={collegeSearch}
                    onChange={(e) => setCollegeSearch(e.target.value)}
                    placeholder="Search college..."
                    className="w-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
                    aria-label="Filter colleges"
                  />
                  {collegeSearch && (
                    <button
                      type="button"
                      onClick={() => setCollegeSearch("")}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                      aria-label="Clear college search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-y-auto p-2 space-y-1 flex-1 [scrollbar-width:thin]">
                {filteredColleges.length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-500">
                    No matching colleges found.
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
                        <span className="text-sm font-semibold truncate">
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
