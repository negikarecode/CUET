"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Target,
  User,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { StreamOption } from "@/types/database";
import { getSubjectsForStream } from "@/lib/constants/cuetSubjects";
import CascadingTargetSelector from "@/components/ui/CascadingTargetSelector";
import { useTargetSelection } from "@/lib/hooks/useTargetSelection";

interface EditGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStream: StreamOption;
  initialUniversity?: string;
  initialCollege: string;
  initialCourse?: string;
  initialFullName: string;
  initialSelectedSubjects?: string[];
  onSave: (data: {
    targetStream: StreamOption;
    targetUniversity: string;
    targetCollege: string;
    targetCourse: string;
    fullName: string;
    selectedSubjects: string[];
  }) => Promise<void>;
}

export default function EditGoalsModal({
  isOpen,
  onClose,
  initialStream,
  initialCollege,
  initialCourse,
  initialFullName,
  initialSelectedSubjects = [],
  onSave,
}: EditGoalsModalProps) {
  const targetSelection = useTargetSelection({
    initialCollege,
    initialCourse,
    initialStream,
  });

  const [fullName, setFullName] = useState<string>(initialFullName || "");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    initialSelectedSubjects && initialSelectedSubjects.length > 0
      ? initialSelectedSubjects
      : getSubjectsForStream(initialStream || "Science")
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { reset } = targetSelection;

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      reset(initialCollege, initialCourse, initialStream);
      setFullName(initialFullName || "");
      setSelectedSubjects(
        initialSelectedSubjects && initialSelectedSubjects.length > 0
          ? initialSelectedSubjects
          : getSubjectsForStream(initialStream || "Science")
      );
      setErrorMessage(null);
      setIsSaving(false);
    }
  }, [
    isOpen,
    initialStream,
    initialCollege,
    initialCourse,
    initialFullName,
    initialSelectedSubjects,
    reset,
  ]);

  // Keep selected domain subjects synced with stream
  useEffect(() => {
    if (isOpen) {
      const newSubs = getSubjectsForStream(targetSelection.stream as StreamOption);
      setSelectedSubjects(newSubs);
    }
  }, [targetSelection.stream, isOpen]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetSelection.isValidPair) {
      setErrorMessage("Please choose a valid college and degree course combination.");
      return;
    }

    if (selectedSubjects.length === 0) {
      setErrorMessage("Please select at least 1 CUET domain subject.");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      await onSave({
        targetStream: targetSelection.stream as StreamOption,
        targetUniversity: targetSelection.derivedUniversity || "University of Delhi",
        targetCollege: targetSelection.collegeName,
        targetCourse: targetSelection.courseName,
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-goals-title"
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
              <h3 id="edit-goals-title" className="text-lg font-bold text-slate-900 tracking-tight">
                Edit Academic Goals
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Update your dream target college, degree course, and academic stream
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800 flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Aspirant Name */}
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

          {/* Cascading Target Selector: Stream + College + Course + Derived University */}
          <CascadingTargetSelector
            targetSelection={targetSelection}
            showStreamButtons={true}
            showDerivedUniversity={true}
            showUnavailableToggle={true}
            collegeLabelPrefix="Dream Target College"
            courseLabelPrefix="Dream Degree Course / Program"
          />

          {/* Domain Subjects (Auto-Calibrated) */}
          <div className="p-3.5 rounded-2xl border border-slate-200/60 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Stream Domain Subjects (Auto-Calibrated)</span>
              </label>
              <span className="text-[11px] font-bold bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-600">
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
            <p className="text-xs font-medium text-slate-500 pt-0.5">
              Domain subjects are calibrated automatically based on your {targetSelection.stream} stream.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || !targetSelection.isValidPair}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center gap-2 ${
                targetSelection.isValidPair && !isSaving
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-70"
              }`}
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving Goals...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Save Academic Goals</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
