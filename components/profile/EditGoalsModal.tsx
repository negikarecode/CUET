"use client";

import React, { useState } from "react";
import {
  X,
  Target,
  GraduationCap,
  Building2,
  User,
  Sparkles,
  Check,
} from "lucide-react";
import { StreamOption } from "@/types/database";
import CollegeSearchDropdown from "@/components/auth/CollegeSearchDropdown";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";

interface EditGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStream: StreamOption;
  initialUniversity: string;
  initialCollege: string;
  initialFullName: string;
  initialSelectedSubjects?: string[];
  onSave: (data: {
    targetStream: StreamOption;
    targetUniversity: string;
    targetCollege: string;
    fullName: string;
    selectedSubjects: string[];
  }) => Promise<void>;
}

export default function EditGoalsModal({
  isOpen,
  onClose,
  initialStream,
  initialUniversity,
  initialCollege,
  initialFullName,
  initialSelectedSubjects = [],
  onSave,
}: EditGoalsModalProps) {
  const [stream, setStream] = useState<StreamOption>(initialStream || "Science");
  const [university, setUniversity] = useState<string>(initialUniversity || "Delhi University");
  const [college, setCollege] = useState<string>(initialCollege || "SRCC");
  const [fullName, setFullName] = useState<string>(initialFullName || "");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    initialSelectedSubjects && initialSelectedSubjects.length > 0
      ? initialSelectedSubjects
      : getSubjectsForStream(initialStream || "Science")
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubjects.length === 0) {
      setErrorMessage("Please select at least 1 CUET domain subject.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      await onSave({
        targetStream: stream,
        targetUniversity: university.trim() || "Delhi University",
        targetCollege: college.trim() || "SRCC",
        fullName: fullName.trim() || initialFullName,
        selectedSubjects,
      });
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to update academic goals. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const streamOptions: { id: StreamOption; label: string; desc: string; selectedColor: string }[] = [
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-7 text-left animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Edit Academic Goals & Domain Subjects
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Update your dream college target and domain subjects you are preparing for
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Aspirant Name</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Target Stream Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Target Domain Stream</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {streamOptions.map((opt) => {
                const isSelected = stream === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setStream(opt.id);
                      setSelectedSubjects(getSubjectsForStream(opt.id));
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? `${opt.selectedColor} shadow-xs font-bold`
                        : "bg-white border-slate-200/80 hover:border-slate-300 text-slate-700 font-medium hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">
                        {opt.label}
                      </span>
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

          {/* Stream Domain Subjects (Auto-Calibrated) */}
          <div className="p-3.5 rounded-2xl border border-slate-200/60 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Stream Domain Subjects (Auto-Calibrated)</span>
              </label>
              <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-600">
                {selectedSubjects.length} Domains
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedSubjects.map((sub) => (
                <span
                  key={sub}
                  className="px-2.5 py-1 text-xs font-semibold bg-white text-slate-700 border border-slate-200 rounded-lg shadow-xs"
                >
                  {sub}
                </span>
              ))}
            </div>
            <p className="text-[11px] font-medium text-slate-500 pt-0.5">
              Domain subjects are calibrated automatically based on your {stream} stream.
            </p>
          </div>

          {/* Dream College Dropdown */}
          <div className="space-y-1.5">
            <CollegeSearchDropdown
              selectedCollege={college}
              onSelectCollege={(collegeName, universityName) => {
                setCollege(collegeName);
                if (universityName) setUniversity(universityName);
              }}
              label="Dream Target College"
              placeholder="Search or pick your target college..."
            />
          </div>

          {/* Target University */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Target University</span>
            </label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="e.g. Delhi University, BHU, JNU"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving Goals & Subjects...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Save Academic Goals & Subjects</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
