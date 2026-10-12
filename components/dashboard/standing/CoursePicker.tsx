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
} from "lucide-react";
import { CanonicalCourse } from "@/lib/standing-engine";
import { StreamType } from "@/types";

interface CoursePickerProps {
  courses: CanonicalCourse[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
  selectedStream?: StreamType;
  onSelectStream?: (stream: StreamType) => void;
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
}: CoursePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

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
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.stream.toLowerCase().includes(q) ||
        c.degreeType.toLowerCase().includes(q);
      return matchesStream && matchesSearch;
    });
  }, [courses, activeStream, searchQuery]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredCourses.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCourses.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCourses[highlightedIndex]) {
        handleSelectCourseItem(filteredCourses[highlightedIndex]!);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
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
    setIsOpen(false);
    setSearchQuery("");
  };

  // Stream Tab click
  const handleStreamTabClick = (streamId: StreamFilter) => {
    setActiveStream(streamId);
    setHighlightedIndex(0);
    if (streamId !== "all") {
      if (onSelectStream) {
        onSelectStream(streamId as StreamType);
      }
      // If selected course is not in this stream, auto-switch to top course in stream
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

  return (
    <div className="relative w-full space-y-3" ref={containerRef} onKeyDown={handleKeyDown}>
      {/* 1. Divide Courses by Streams: Interactive Stream Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label
          htmlFor="course-picker-trigger"
          className="block text-xs font-bold uppercase tracking-wider text-slate-500"
        >
          Target Degree & Program
        </label>

        {/* Stream Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {STREAM_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const count = streamCounts[opt.id] ?? 0;
            const isSelected = activeStream === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleStreamTabClick(opt.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? opt.activeClass
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.shortLabel}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Course Picker Trigger Button */}
      <button
        id="course-picker-trigger"
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200/90 shadow-xs text-left transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 text-sm truncate">
                {selectedCourse?.name || "Select Course"}
              </span>
              {selectedCourse?.stream && (
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStreamBadgeStyle(
                    selectedCourse.stream
                  )}`}
                >
                  {selectedCourse.stream}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
              <span>{selectedCourse?.degreeType || "Undergraduate"}</span>
              <span className="text-slate-300">•</span>
              <span>
                {selectedCourse?.subjectCount} Subjects ({selectedCourse?.cutoffScale} pts scale)
              </span>
            </div>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 3. Course Picker Dropdown */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Courses List"
          className="absolute z-50 mt-1.5 w-full bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-96 flex flex-col"
        >
          {/* Search Bar & Quick Filter Header */}
          <div className="p-3 border-b border-slate-100 sticky top-0 bg-white z-10 space-y-2">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/70 rounded-xl px-2.5 py-1.5">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                placeholder="Search degree (e.g. B.Com, Physics, Economics, History)..."
                className="w-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
                aria-label="Filter courses"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* In-Dropdown Stream Quick Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
              {STREAM_OPTIONS.map((opt) => {
                const isSelected = activeStream === opt.id;
                return (
                  <button
                    key={`dropdown_${opt.id}`}
                    type="button"
                    onClick={() => handleStreamTabClick(opt.id)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? opt.activeClass
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {opt.shortLabel} ({streamCounts[opt.id] ?? 0})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Courses List */}
          <div className="overflow-y-auto p-2 space-y-1 flex-1 [scrollbar-width:thin]">
            {filteredCourses.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700">No matching programs found</p>
                <p className="text-[11px]">
                  Try clearing the search or switching stream to &ldquo;All Streams&rdquo;.
                </p>
              </div>
            ) : (
              filteredCourses.map((c, index) => {
                const isSelected = c.id === selectedCourseId;
                const isHighlighted = index === highlightedIndex;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectCourseItem(c)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-50/90 text-blue-900 border border-blue-200/80 font-semibold"
                        : isHighlighted
                        ? "bg-slate-50 text-slate-900"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {c.name}
                        </span>
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border ${getStreamBadgeStyle(
                            c.stream
                          )}`}
                        >
                          {c.stream}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-0.5">
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
  );
}
