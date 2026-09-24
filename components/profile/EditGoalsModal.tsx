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

  const streamOptions: { id: StreamOption; label: string; desc: string; color: string }[] = [
    {
      id: "Science",
      label: "Science",
      desc: "Physics, Chem, Math, Bio",
      color: "bg-[#EEF2FF] border-[#6366F1] text-black",
    },
    {
      id: "Commerce",
      label: "Commerce",
      desc: "Accountancy, Eco, BST",
      color: "bg-[#FEF3C7] border-[#F59E0B] text-black",
    },
    {
      id: "Humanities",
      label: "Humanities",
      desc: "Pol Sci, History, Psych, Soc",
      color: "bg-[#F3E8FF] border-[#A855F7] text-black",
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#000] p-6 text-left animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
              <Target className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-black tracking-tight">
                Edit Academic Goals & Domain Subjects
              </h3>
              <p className="text-xs text-black/60 font-semibold">
                Update your dream college target and domain subjects you are preparing for
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-[#FEE2E2] border-2 border-[#DC2626] text-xs font-black text-[#991B1B]">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-black/60" />
              <span>Aspirant Name</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-3 py-2 rounded-lg border-2 border-black bg-[#FAF7EE] focus:bg-white text-black font-bold text-xs sm:text-sm focus:outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          {/* Target Stream Selector */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#FF5C5C]" />
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
                    className={`p-3 rounded-lg border-2 text-left transition-all relative ${
                      isSelected
                        ? `${opt.color} border-black shadow-[3px_3px_0px_0px_#000] font-black`
                        : "bg-white border-black/30 hover:border-black font-bold opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-black">
                        {opt.label}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-black/60 line-clamp-1">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stream Domain Subjects (Auto-Calibrated) */}
          <div className="p-3.5 rounded-xl border-2 border-black bg-[#FAF7EE] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5C5C]" />
                <span>Stream Domain Subjects (Auto-Calibrated)</span>
              </label>
              <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded border border-black text-black/70">
                {selectedSubjects.length} Domains
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedSubjects.map((sub) => (
                <span
                  key={sub}
                  className="px-2.5 py-1 text-xs font-black bg-white text-black border-2 border-black rounded-lg shadow-[1px_1px_0px_0px_#000]"
                >
                  {sub}
                </span>
              ))}
            </div>
            <p className="text-[11px] font-bold text-black/60 pt-0.5">
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
            <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-black/60" />
              <span>Target University</span>
            </label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="e.g. Delhi University, BHU, JNU"
              className="w-full px-3 py-2 rounded-lg border-2 border-black bg-[#FAF7EE] focus:bg-white text-black font-bold text-xs sm:text-sm focus:outline-none shadow-[2px_2px_0px_0px_#000]"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t-2 border-black/10 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white hover:bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
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
