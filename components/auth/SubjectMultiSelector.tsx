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
    Commerce: "bg-[#FEF3C7] text-black border-black",
    Science: "bg-[#E0F2FE] text-[#0369A1] border-black",
    Humanities: "bg-[#FCE7F3] text-[#9D174D] border-black",
    "Arts & Performing": "bg-[#F3E8FF] text-[#6B21A8] border-black",
    Common: "bg-[#D1FAE5] text-[#065F46] border-black",
  };

  return (
    <div className="space-y-2.5">
      {/* Label and Count */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#FF5C5C]" />
          <span>CUET Domain Subjects ({selectedSubjects.length} selected)</span>
        </label>
        <span className="text-[10px] text-black/60 font-mono font-bold">
          Min 1 required
        </span>
      </div>

      {/* Selected Subject Chips Preview */}
      {selectedSubjects.length > 0 && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-[#FAF7EE] rounded-xl border-2 border-black">
          {selectedSubjects.map((subName) => (
            <span
              key={subName}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white border border-black text-[11px] font-black text-black shadow-[1px_1px_0px_0px_#000]"
            >
              <span className="truncate max-w-[200px]">{subName}</span>
              <button
                type="button"
                onClick={() => toggleSubject(subName)}
                className="text-black/50 hover:text-black p-0.5 rounded"
                title={`Remove ${subName}`}
              >
                <X className="w-3 h-3 stroke-[2.5]" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search Input & Quick Category Tabs */}
      <div className="space-y-2">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-2.5 text-black/50 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search domain subjects (e.g. Physics, Accountancy, Dance)..."
            className="w-full pl-8 pr-7 py-1.5 text-xs font-bold bg-white border-2 border-black rounded-lg focus:outline-none placeholder:text-black/40 shadow-[2px_2px_0px_0px_#000]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 p-0.5 rounded text-black/60 hover:text-black"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[10px] font-black no-scrollbar">
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
              className={`px-2 py-0.5 rounded-full border whitespace-nowrap transition-all ${
                activeCategory === tab.id
                  ? "bg-black text-white border-black"
                  : "bg-white text-black/70 border-black/30 hover:border-black hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Domain Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto p-1 border-2 border-black rounded-xl bg-white divide-y sm:divide-y-0">
        {filteredSubjects.map((sub: CUETSubjectItem) => {
          const isChecked = selectedSubjects.includes(sub.name);
          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => toggleSubject(sub.name)}
              className={`p-2 rounded-lg border-2 text-left flex items-start justify-between transition-all cursor-pointer ${
                isChecked
                  ? "bg-[#D1FAE5] border-black shadow-[2px_2px_0px_0px_#000] -translate-y-0.5"
                  : "bg-white border-black/20 hover:border-black hover:bg-[#FAF7EE]"
              }`}
            >
              <div className="flex flex-col pr-1 truncate">
                <span
                  className={`text-xs leading-snug truncate ${
                    isChecked ? "font-black text-black" : "font-bold text-black/80"
                  }`}
                >
                  {sub.name}
                </span>
                <div className="mt-1">
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-black border ${
                      categoryBadges[sub.category] || "bg-gray-100 text-black border-black"
                    }`}
                  >
                    {sub.category}
                  </span>
                </div>
              </div>

              <div
                className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 transition-all ${
                  isChecked
                    ? "bg-[#10B981] border-black shadow-[1px_1px_0px_0px_#000]"
                    : "border-black/30 bg-white"
                }`}
              >
                {isChecked && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
