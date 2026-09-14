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
    "Commerce & Mgmt": "bg-[#FEF3C7] text-black border-black",
    "Science & Tech": "bg-[#E0F2FE] text-[#0369A1] border-black",
    "Arts & Humanities": "bg-[#FCE7F3] text-[#9D174D] border-black",
    "Education & Professional": "bg-[#D1FAE5] text-[#065F46] border-black",
  };

  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      {label && (
        <label className="text-xs font-black uppercase tracking-wider text-black flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>{label}</span>
          </span>
          <span className="text-[10px] text-black/60 font-mono">
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
        className="w-full px-3 py-2 rounded-lg border-2 border-black bg-[#FAF7EE] hover:bg-white text-black font-bold text-xs sm:text-sm flex items-center justify-between shadow-[2px_2px_0px_0px_#000] cursor-pointer transition-all"
      >
        <div className="flex items-center gap-2 truncate">
          <BookOpen className="w-4 h-4 shrink-0 text-black/60" />
          <span className={selectedCourse ? "text-black font-black truncate" : "text-black/50"}>
            {selectedCourse || placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#000] overflow-hidden flex flex-col max-h-72 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Input */}
          <div className="p-2.5 border-b-2 border-black bg-[#FAF7EE] space-y-2">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-black/50 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search degree, course name (e.g. BCom, Physics)..."
                className="w-full pl-8 pr-7 py-1.5 text-xs font-bold bg-white border-2 border-black rounded-md focus:outline-none placeholder:text-black/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 p-0.5 rounded text-black/60 hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px] font-black no-scrollbar">
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
                  className={`px-2 py-0.5 rounded-full border whitespace-nowrap transition-all ${
                    categoryFilter === tab.id
                      ? "bg-black text-white border-black"
                      : "bg-white text-black/70 border-black/30 hover:border-black hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Courses List */}
          <div className="overflow-y-auto divide-y divide-black/10 flex-1">
            {filteredCourses.length === 0 ? (
              <div className="p-4 text-center space-y-2">
                <p className="text-xs font-bold text-black/70">
                  No courses matched &quot;{searchQuery}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => handleSelect(searchQuery)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FEF3C7] border border-black text-xs font-black text-black hover:bg-[#FDE68A]"
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
                    className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-all hover:bg-[#FAF7EE] ${
                      isSelected ? "bg-[#D1FAE5]/60 font-black" : "font-medium"
                    }`}
                  >
                    <div className="flex flex-col truncate pr-2">
                      <span className="truncate text-black font-bold">
                        {crs.name}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-black border ${
                            categoryBadges[crs.category] || "bg-gray-100 text-black border-black"
                          }`}
                        >
                          {crs.category}
                        </span>
                        {crs.popular && (
                          <span className="text-[9px] text-[#DC2626] font-black uppercase tracking-wider">
                            High Demand
                          </span>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0 border border-black shadow-[1px_1px_0px_0px_#000]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Custom Input fallback at bottom */}
          <div className="p-2 border-t border-black bg-white flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-black/50 shrink-0" />
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
