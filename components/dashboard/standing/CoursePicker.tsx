"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { Search, ChevronDown, Check, GraduationCap, X } from "lucide-react";
import { CanonicalCourse } from "@/lib/standing-engine";

interface CoursePickerProps {
  courses: CanonicalCourse[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
}

export default function CoursePicker({
  courses,
  selectedCourseId,
  onSelectCourse,
}: CoursePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const selectedCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0];

  const filteredCourses = courses.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      c.name.toLowerCase().includes(q) ||
      c.stream.toLowerCase().includes(q) ||
      c.degreeType.toLowerCase().includes(q)
    );
  });

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
        onSelectCourse(filteredCourses[highlightedIndex]!.id);
        setIsOpen(false);
        setSearchQuery("");
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef} onKeyDown={handleKeyDown}>
      <label
        htmlFor="course-picker-trigger"
        className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5"
      >
        Select Target Course / Program
      </label>

      {/* Trigger Button */}
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
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-white hover:bg-slate-50/80 rounded-xl border border-slate-200/90 shadow-xs text-left transition-all focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-slate-900 text-sm truncate">
              {selectedCourse?.name || "Select Course"}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">
                {selectedCourse?.stream}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] text-slate-500">
                {selectedCourse?.subjectCount} Subjects ({selectedCourse?.cutoffScale} pts max)
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Courses List"
          className="absolute z-50 mt-1.5 w-full bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-80 flex flex-col"
        >
          {/* Search Input Filter */}
          <div className="p-2 border-b border-slate-100 sticky top-0 bg-white z-10 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              placeholder="Search courses (e.g. B.Com, Physics, Economics)..."
              className="w-full text-xs py-2 px-1 text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
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

          {/* Courses List */}
          <div className="overflow-y-auto p-1.5 space-y-0.5 flex-1 [scrollbar-width:thin]">
            {filteredCourses.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                No matching courses found. Try searching by degree or subject name.
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
                    onClick={() => {
                      onSelectCourse(c.id);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                      isSelected
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : isHighlighted
                        ? "bg-slate-50 text-slate-900"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-medium truncate">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {c.stream} • {c.subjectCount} Subjects ({c.cutoffScale} marks scale)
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
