"use client";

import React from "react";
import {
  Building2,
  BookOpen,
  GraduationCap,
  AlertCircle,
  Info,
  Check,
} from "lucide-react";
import SearchableSelect, {
  SelectOption,
  SelectGroup,
} from "@/components/ui/SearchableSelect";
import { useTargetSelection } from "@/lib/hooks/useTargetSelection";
import { StreamOption } from "@/types/database";

export interface CascadingTargetSelectorProps {
  targetSelection: ReturnType<typeof useTargetSelection>;
  showStreamButtons?: boolean;
  showDerivedUniversity?: boolean;
  showUnavailableToggle?: boolean;
  layout?: "grid" | "stacked";
  collegeLabelPrefix?: string;
  courseLabelPrefix?: string;
  collegePlaceholder?: string;
  coursePlaceholder?: string;
  className?: string;
}

const STREAM_OPTIONS: Array<{
  id: StreamOption | "All";
  label: string;
  desc: string;
  selectedColor: string;
}> = [
  {
    id: "All",
    label: "All Streams",
    desc: "Any course across all streams",
    selectedColor: "bg-slate-100 border-slate-700 text-slate-900",
  },
  {
    id: "Science",
    label: "Science",
    desc: "Physics, Chem, Math, Bio",
    selectedColor: "bg-blue-50/80 border-blue-500 text-blue-900",
  },
  {
    id: "Commerce",
    label: "Commerce",
    desc: "Accountancy, Eco, BST",
    selectedColor: "bg-amber-50/80 border-amber-500 text-amber-900",
  },
  {
    id: "Humanities",
    label: "Humanities",
    desc: "Pol Sci, History, Psych, Soc",
    selectedColor: "bg-purple-50/80 border-purple-500 text-purple-900",
  },
];

export default function CascadingTargetSelector({
  targetSelection,
  showStreamButtons = false,
  showDerivedUniversity = true,
  showUnavailableToggle = false,
  layout = "stacked",
  collegeLabelPrefix = "Target College",
  courseLabelPrefix = "Target Course",
  collegePlaceholder = "Search college (e.g. SRCC, Hindu, Venky)...",
  coursePlaceholder = "Search course (e.g. B.Sc. Computer Science)...",
  className = "",
}: CascadingTargetSelectorProps) {
  const {
    collegeName,
    courseName,
    stream,
    derivedUniversity,
    availableCourses,
    availableColleges,
    courseDropdownLabel,
    collegeDropdownLabel,
    inlineNotice,
    showUnavailable,
    setShowUnavailable,
    selectCollege,
    selectCourse,
    selectStream,
    clearCollege,
    clearCourse,
  } = targetSelection;

  // Build College Select Options
  const collegeOptions: SelectOption[] = React.useMemo(() => {
    return availableColleges.map((c) => ({
      value: c.name,
      label: c.name,
      sublabel: c.university !== "University of Delhi" ? c.university : undefined,
      badge: c.campus !== "Off Campus" ? c.campus : undefined,
      keywords: [c.name, c.id, ...(c.aliases || []), c.university, c.campus],
    }));
  }, [availableColleges]);

  // Group Courses by Stream for structured combobox display
  const courseOptions: SelectGroup[] = React.useMemo(() => {
    const scienceCourses = availableCourses.filter(
      (c) => c.stream.toLowerCase() === "science"
    );
    const commerceCourses = availableCourses.filter(
      (c) => c.stream.toLowerCase() === "commerce"
    );
    const humanitiesCourses = availableCourses.filter(
      (c) => c.stream.toLowerCase() === "humanities"
    );
    const otherCourses = availableCourses.filter(
      (c) =>
        !["science", "commerce", "humanities"].includes(c.stream.toLowerCase())
    );

    const groups: SelectGroup[] = [];

    const toOpt = (c: (typeof availableCourses)[0]): SelectOption => ({
      value: c.name,
      label: c.name,
      badge: c.degreeType,
      keywords: [c.name, c.id, c.stream, c.degreeType],
    });

    if (scienceCourses.length > 0) {
      groups.push({
        heading: "Science & Technology",
        options: scienceCourses.map(toOpt),
      });
    }
    if (commerceCourses.length > 0) {
      groups.push({
        heading: "Commerce & Management",
        options: commerceCourses.map(toOpt),
      });
    }
    if (humanitiesCourses.length > 0) {
      groups.push({
        heading: "Humanities & Social Sciences",
        options: humanitiesCourses.map(toOpt),
      });
    }
    if (otherCourses.length > 0) {
      groups.push({
        heading: "Other Degree Programs",
        options: otherCourses.map(toOpt),
      });
    }

    return groups;
  }, [availableCourses]);

  const gridClass =
    layout === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
      : "space-y-4";

  return (
    <div className={`space-y-4 w-full ${className}`}>
      {/* 1. Target Stream Buttons (Optional) */}
      {showStreamButtons && (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Target Domain Stream</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-400 lowercase">
              filters available courses
            </span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {STREAM_OPTIONS.map((opt) => {
              const isSelected = stream === opt.id || (!stream && opt.id === "All");
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectStream(opt.id)}
                  className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                    isSelected
                      ? `${opt.selectedColor} shadow-xs font-bold`
                      : "bg-white border-slate-200/80 hover:border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{opt.label}</span>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 line-clamp-1">
                    {opt.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Accessible Inline Cascading Notice */}
      {inlineNotice && (
        <div
          role="status"
          aria-live="polite"
          className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-1 duration-200 ${
            inlineNotice.type === "warning"
              ? "bg-amber-50/90 border-amber-200 text-amber-900"
              : "bg-blue-50/90 border-blue-200 text-blue-900"
          }`}
        >
          {inlineNotice.type === "warning" ? (
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          )}
          <span className="flex-1 leading-relaxed">{inlineNotice.message}</span>
        </div>
      )}

      {/* 3. Cascading Dropdowns (College & Course) */}
      <div className={gridClass}>
        {/* Target College Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{collegeLabelPrefix}</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-500 font-mono">
              {collegeDropdownLabel}
            </span>
          </label>
          <SearchableSelect
            ariaLabel={collegeLabelPrefix}
            value={collegeName}
            onChange={(val) => selectCollege(val)}
            onClear={collegeName ? clearCollege : undefined}
            options={collegeOptions}
            placeholder="Select target college..."
            searchPlaceholder={collegePlaceholder}
            buttonClassName="w-full px-3.5 py-2.5 rounded-xl border-slate-200 bg-white text-slate-800 font-semibold text-xs sm:text-sm"
          />

          {/* Derived University Line (Read-Only) */}
          {showDerivedUniversity && (
            <div className="flex items-center gap-1.5 pt-0.5 px-1 text-[11px] text-slate-500 font-medium">
              <span className="text-slate-400">University:</span>
              <strong className="text-slate-700 font-semibold truncate">
                {derivedUniversity}
              </strong>
            </div>
          )}
        </div>

        {/* Target Degree Course Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>{courseLabelPrefix}</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-500 font-mono">
              {courseDropdownLabel}
            </span>
          </label>
          <SearchableSelect
            ariaLabel={courseLabelPrefix}
            value={courseName}
            onChange={(val) => selectCourse(val)}
            onClear={courseName ? clearCourse : undefined}
            options={courseOptions}
            placeholder="Select degree course..."
            searchPlaceholder={coursePlaceholder}
            buttonClassName="w-full px-3.5 py-2.5 rounded-xl border-slate-200 bg-white text-slate-800 font-semibold text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* 4. Show Unavailable Toggle (Optional) */}
      {showUnavailableToggle && (
        <div className="flex items-center justify-between pt-1 px-1">
          <label className="text-xs text-slate-500 flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUnavailable}
              onChange={(e) => setShowUnavailable(e.target.checked)}
              className="w-3.5 h-3.5 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500"
            />
            <span>Show unavailable options across all institutions</span>
          </label>
        </div>
      )}
    </div>
  );
}
