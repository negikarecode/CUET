"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Check,
  BookOpen,
  X,
  Compass,
} from "lucide-react";
import { DU_COURSES, DUCourseItem } from "@/lib/constants/duCourses";

interface CourseSearchDropdownProps {
  selectedCourse: string;
  onSelectCourse: (courseName: string) => void;
  label?: string;
  placeholder?: string;
}

export default function CourseSearchDropdown({
  selectedCourse,
  onSelectCourse,
  label = "Target Degree / Program",
  placeholder = "Search 75+ DU degrees (e.g. BCom Hons, Economics, Physics)...",
}: CourseSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered DU courses
  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return DU_COURSES.filter((crs) => {
      if (categoryFilter !== "all" && crs.category !== categoryFilter) {
        return false;
      }
      if (!q) return true;
      return (
        crs.name.toLowerCase().includes(q) ||
        crs.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, categoryFilter]);

  const handleSelect = (courseName: string) => {
    onSelectCourse(courseName);
    setIsOpen(false);
    setSearchQuery("");
  };

  const categoryBadges: Record<string, string> = {
    "Commerce & Mgmt": "bg-amber-50 text-amber-800 border-amber-200",
    "Science & Tech": "bg-blue-50 text-blue-800 border-blue-200",
    "Arts & Humanities": "bg-purple-50 text-purple-800 border-purple-200",
    "Education & Professional": "bg-emerald-50 text-emerald-800 border-emerald-200",
  };

  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>{label}</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {DU_COURSES.length} Official DU Programs
          </span>
        </label>
      )}

      {/* Selected Value Trigger */}
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 font-medium text-xs sm:text-sm flex items-center justify-between shadow-xs cursor-pointer transition-all"
      >
        <div className="flex items-center gap-2 truncate">
          <BookOpen className="w-4 h-4 shrink-0 text-slate-400" />
          <span className={selectedCourse ? "text-slate-900 font-semibold truncate" : "text-slate-400"}>
            {selectedCourse || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-72 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Input */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/70 space-y-2">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search degree, course name (e.g. BCom, Physics)..."
                className="w-full pl-8 pr-7 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 p-0.5 rounded text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px] font-semibold no-scrollbar">
              {[
                { id: "all", label: "All Programs" },
                { id: "Commerce & Mgmt", label: "Commerce & Mgmt" },
                { id: "Science & Tech", label: "Science & Tech" },
                { id: "Arts & Humanities", label: "Arts & Humanities" },
                { id: "Education & Professional", label: "Education & Others" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategoryFilter(tab.id)}
                  className={`px-2.5 py-0.5 rounded-full border whitespace-nowrap transition-all shadow-xs ${
                    categoryFilter === tab.id
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Courses List */}
          <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
            {filteredCourses.length === 0 ? (
              <div className="p-4 text-center space-y-2">
                <p className="text-xs font-medium text-slate-500">
                  No courses matched &quot;{searchQuery}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => handleSelect(searchQuery)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors shadow-xs"
                >
                  <span>Select &quot;{searchQuery}&quot; as custom course</span>
                </button>
              </div>
            ) : (
              filteredCourses.map((crs: DUCourseItem) => {
                const isSelected = selectedCourse === crs.name;
                return (
                  <button
                    key={crs.id}
                    type="button"
                    onClick={() => handleSelect(crs.name)}
                    className={`w-full px-3.5 py-2 text-left flex items-center justify-between text-xs transition-all hover:bg-slate-50 ${
                      isSelected ? "bg-blue-50/60 font-semibold" : "font-normal"
                    }`}
                  >
                    <div className="flex flex-col truncate pr-2">
                      <span className="truncate text-slate-900 font-medium">
                        {crs.name}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`inline-block px-1.5 py-0.2 rounded-full text-[9px] font-semibold border ${
                            categoryBadges[crs.category] || "bg-slate-100 text-slate-700 border-slate-200"
                          }`}
                        >
                          {crs.category}
                        </span>
                        {crs.popular && (
                          <span className="text-[9px] text-rose-600 font-semibold uppercase tracking-wider">
                            High Demand
                          </span>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Custom Input fallback at bottom */}
          <div className="p-2.5 border-t border-slate-100 bg-white flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Or type custom degree/course..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                  e.preventDefault();
                  handleSelect((e.target as HTMLInputElement).value.trim());
                }
              }}
              className="w-full text-xs font-medium focus:outline-none placeholder:text-black/40"
            />
          </div>
        </div>
      )}
    </div>
  );
}
