"use client";

import React, { useState, useMemo } from "react";
import { Search, Check, X, Layers } from "lucide-react";
import { CUET_DOMAIN_SUBJECTS, CUETSubjectItem } from "@/lib/constants/cuetSubjects";

interface SubjectMultiSelectorProps {
  selectedSubjects: string[];
  onChangeSubjects: (subjects: string[]) => void;
}

export default function SubjectMultiSelector({
  selectedSubjects,
  onChangeSubjects,
}: SubjectMultiSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggleSubject = (name: string) => {
    if (selectedSubjects.includes(name)) {
      if (selectedSubjects.length > 1) {
        onChangeSubjects(selectedSubjects.filter((s) => s !== name));
      }
    } else {
      onChangeSubjects([...selectedSubjects, name]);
    }
  };

  const filteredSubjects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CUET_DOMAIN_SUBJECTS.filter((sub) => {
      // Category filter
      if (activeCategory === "popular" && !sub.isCore) return false;
      if (
        activeCategory !== "all" &&
        activeCategory !== "popular" &&
        sub.category !== activeCategory
      ) {
        return false;
      }
      if (!q) return true;
      return (
        sub.name.toLowerCase().includes(q) ||
        sub.category.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeCategory]);

  const categoryBadges: Record<string, string> = {
    Commerce: "bg-amber-50 text-amber-800 border-amber-200",
    Science: "bg-blue-50 text-blue-800 border-blue-200",
    Humanities: "bg-purple-50 text-purple-800 border-purple-200",
    "Arts & Performing": "bg-pink-50 text-pink-800 border-pink-200",
    Common: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };

  return (
    <div className="space-y-2.5">
      {/* Label and Count */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>CUET Domain Subjects ({selectedSubjects.length} selected)</span>
        </label>
        <span className="text-[10px] text-slate-400 font-mono font-medium">
          Min 1 required
        </span>
      </div>

      {/* Selected Subject Chips Preview */}
      {selectedSubjects.length > 0 && (
        <div className="flex flex-wrap gap-1.5 p-2.5 bg-slate-50/70 rounded-2xl border border-slate-200/80">
          {selectedSubjects.map((subName) => (
            <span
              key={subName}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs"
            >
              <span className="truncate max-w-[200px]">{subName}</span>
              <button
                type="button"
                onClick={() => toggleSubject(subName)}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded cursor-pointer"
                title={`Remove ${subName}`}
              >
                <X className="w-3 h-3 stroke-[2]" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search Input & Quick Category Tabs */}
      <div className="space-y-2">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search domain subjects (e.g. Physics, Accountancy, Dance)..."
            className="w-full pl-8 pr-7 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 placeholder:text-slate-400 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 p-0.5 rounded text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px] font-semibold no-scrollbar">
          {[
            { id: "all", label: "All Subjects" },
            { id: "popular", label: "Core/Popular" },
            { id: "Commerce", label: "Commerce" },
            { id: "Science", label: "Science" },
            { id: "Humanities", label: "Humanities" },
            { id: "Arts & Performing", label: "Arts & Performing" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-2.5 py-0.5 rounded-full border whitespace-nowrap transition-all shadow-xs ${
                activeCategory === tab.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Domain Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto p-1.5 border border-slate-200/80 rounded-2xl bg-white">
        {filteredSubjects.map((sub: CUETSubjectItem) => {
          const isChecked = selectedSubjects.includes(sub.name);
          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => toggleSubject(sub.name)}
              className={`p-2.5 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer shadow-xs ${
                isChecked
                  ? "bg-blue-50/70 border-blue-600 text-slate-900"
                  : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex flex-col pr-1 truncate">
                <span
                  className={`text-xs leading-snug truncate ${
                    isChecked ? "font-bold text-slate-900" : "font-medium text-slate-700"
                  }`}
                >
                  {sub.name}
                </span>
                <div className="mt-1">
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded-full text-[9px] font-semibold border ${
                      categoryBadges[sub.category] || "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {sub.category}
                  </span>
                </div>
              </div>

              <div
                className={`w-4 h-4 rounded-md mt-0.5 border flex items-center justify-center shrink-0 transition-all ${
                  isChecked
                    ? "bg-blue-600 border-blue-600 shadow-xs"
                    : "border-slate-300 bg-white"
                }`}
              >
                {isChecked && <Check className="w-3 h-3 text-white stroke-[2.5]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
