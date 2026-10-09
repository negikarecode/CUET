"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Bookmark,
  XCircle,
  HelpCircle,
  Clock,
  ArrowRight,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function CBTSubmitModal() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmitModalOpen = useCBTStore((state) => state.isSubmitModalOpen);
  const closeSubmitModal = useCBTStore((state) => state.closeSubmitModal);
  const submitTest = useCBTStore((state) => state.submitTest);
  const getSummaryCounts = useCBTStore((state) => state.getSummaryCounts);
  const remainingSeconds = useCBTStore((state) => state.remainingSeconds);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await submitTest();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSubmitModalOpen) return null;

  const counts = getSummaryCounts();
  const minutesLeft = Math.floor(remainingSeconds / 60);
  const secondsLeft = remainingSeconds % 60;
  const timeFormatted = `${minutesLeft}m ${secondsLeft.toString().padStart(2, "0")}s`;

  // Standard NTA CUET Definitions:
  // Answered = explicitly answered (pure answered + ans & marked for review)
  const totalAnswered = counts.answered + counts.answeredMarkedReview;
  // Unattempted = questions not answered (not answered + marked for review + not visited)
  const totalUnattempted = counts.notAnswered + counts.markedReview + counts.notVisited;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-50 text-slate-900 p-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100 shrink-0">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3
                id="submit-modal-title"
                className="text-base font-bold tracking-tight text-slate-900"
              >
                {counts.total <= 15
                  ? "Confirm Remediation Drill Submission"
                  : t("confirmSubmission", "Confirm Test Paper Submission")}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {counts.total <= 15
                  ? `AI Adaptive Drill Summary (${counts.total} Questions)`
                  : `${t("examSummary", "NTA CUET Examination Summary")} (${counts.total} ${t("compulsoryBadge", "Compulsory Questions")})`}
              </p>
            </div>
          </div>
        </div>

        {/* Body Stats */}
        <div className="p-6 space-y-5">
          {/* Summary Grid: 4 NTA Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Answered */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-center">
              <div className="w-6 h-6 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-1 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p className="text-xl font-bold text-slate-900 font-mono">
                {totalAnswered}
              </p>
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                {t("answered", "Answered")}
              </p>
            </div>

            {/* Not Answered */}
            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 text-center">
              <div className="w-6 h-6 rounded-full bg-white text-rose-600 flex items-center justify-center mx-auto mb-1 shadow-xs">
                <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p className="text-xl font-bold text-slate-900 font-mono">
                {counts.notAnswered}
              </p>
              <p className="text-[10px] font-bold text-rose-700 uppercase tracking-wide">
                {t("notAnswered", "Not Answered")}
              </p>
            </div>

            {/* Marked Review */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
              <div className="w-6 h-6 rounded-full bg-white text-amber-600 flex items-center justify-center mx-auto mb-1 shadow-xs">
                <Bookmark className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p className="text-xl font-bold text-slate-900 font-mono">
                {counts.markedReview + counts.answeredMarkedReview}
              </p>
              <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">
                {t("markedReview", "Marked Review")}
              </p>
            </div>

            {/* Not Visited */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-center">
              <div className="w-6 h-6 rounded-full bg-white text-slate-400 flex items-center justify-center mx-auto mb-1 shadow-xs">
                <EyeOff className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p className="text-xl font-bold text-slate-900 font-mono">
                {counts.notVisited}
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                {t("notVisited", "Not Visited")}
              </p>
            </div>
          </div>

          {/* Time Remaining Notice */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-amber-500 stroke-[2.5]" />
              {t("timeRemaining", "Remaining Test Time:")}
            </span>
            <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-xs">
              {timeFormatted}
            </span>
          </div>

          {/* Warning Message if Unattempted Questions Exist */}
          {totalUnattempted > 0 ? (
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 stroke-[2.5]" />
              <p className="font-medium text-amber-900/90">
                {t("areYouSureSubmit", "Are you sure you want to submit your test paper? Once submitted, your score will be calculated and official solutions displayed.")}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
              <p className="font-medium text-emerald-900/90">
                {t("areYouSureSubmit", "Are you sure you want to submit your test paper? Once submitted, your score will be calculated and official solutions displayed.")}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={closeSubmitModal}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
          >
            {t("returnToPaper", "Return to Test")}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs tracking-wide shadow-xs hover:shadow disabled:opacity-75 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                <span>Evaluating Official Answers...</span>
              </>
            ) : (
              <>
                <span>
                  {counts.total <= 15
                    ? "Submit Drill Now"
                    : t("submitExamNow", "Submit Exam Now")}
                </span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
