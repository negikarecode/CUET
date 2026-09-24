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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#FAF7EE] text-black p-6 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FEF3C7] flex items-center justify-center text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3
                id="submit-modal-title"
                className="text-lg font-black tracking-tight text-black"
              >
                {t("confirmSubmission", "Confirm Test Paper Submission")}
              </h3>
              <p className="text-xs text-black/70 font-semibold mt-0.5">
                {t("examSummary", "NTA CUET Examination Summary")} ({counts.total} {t("compulsoryBadge", "Compulsory Questions")})
              </p>
            </div>
          </div>
        </div>

        {/* Body Stats */}
        <div className="p-6 space-y-5">
          {/* Summary Grid: 4 NTA Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {/* Answered */}
            <div className="p-3 rounded-lg bg-[#D1FAE5] border-2 border-black text-center shadow-[2px_2px_0px_0px_#000]">
              <div className="w-6 h-6 rounded-full bg-white text-black border border-black flex items-center justify-center mx-auto mb-1 shadow-[1px_1px_0px_0px_#000]">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p className="text-xl font-black text-black font-mono">
                {totalAnswered}
              </p>
              <p className="text-[10px] font-black text-black uppercase tracking-wide">
                {t("answered", "Answered")}
              </p>
            </div>

            {/* Not Answered */}
            <div className="p-3 rounded-lg bg-[#FEE2E2] border-2 border-black text-center shadow-[2px_2px_0px_0px_#000]">
              <div className="w-6 h-6 rounded-full bg-white text-black border border-black flex items-center justify-center mx-auto mb-1 shadow-[1px_1px_0px_0px_#000]">
                <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p className="text-xl font-black text-black font-mono">
                {counts.notAnswered}
              </p>
              <p className="text-[10px] font-black text-black uppercase tracking-wide">
                {t("notAnswered", "Not Answered")}
              </p>
            </div>

            {/* Marked Review */}
            <div className="p-3 rounded-lg bg-[#FEF3C7] border-2 border-black text-center shadow-[2px_2px_0px_0px_#000]">
              <div className="w-6 h-6 rounded-full bg-white text-black border border-black flex items-center justify-center mx-auto mb-1 shadow-[1px_1px_0px_0px_#000]">
                <Bookmark className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p className="text-xl font-black text-black font-mono">
                {counts.markedReview + counts.answeredMarkedReview}
              </p>
              <p className="text-[10px] font-black text-black uppercase tracking-wide">
                {t("markedReview", "Marked Review")}
              </p>
            </div>

            {/* Not Visited */}
            <div className="p-3 rounded-lg bg-[#FAF7EE] border-2 border-black text-center shadow-[2px_2px_0px_0px_#000]">
              <div className="w-6 h-6 rounded-full bg-white text-black border border-black flex items-center justify-center mx-auto mb-1 shadow-[1px_1px_0px_0px_#000]">
                <EyeOff className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p className="text-xl font-black text-black font-mono">
                {counts.notVisited}
              </p>
              <p className="text-[10px] font-black text-black uppercase tracking-wide">
                {t("notVisited", "Not Visited")}
              </p>
            </div>
          </div>

          {/* Time Remaining Notice */}
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#FAF7EE] border-2 border-black text-xs font-bold text-black">
            <span className="flex items-center gap-2 text-black">
              <Clock className="w-4 h-4 text-black stroke-[2.5]" />
              {t("timeRemaining", "Remaining Test Time:")}
            </span>
            <span className="font-mono font-black text-black bg-white px-2.5 py-1 rounded border-2 border-black shadow-[1px_1px_0px_0px_#000]">
              {timeFormatted}
            </span>
          </div>

          {/* Warning Message if Unattempted Questions Exist */}
          {totalUnattempted > 0 ? (
            <div className="p-3.5 rounded-lg bg-[#FEF3C7] border-2 border-black text-xs text-black leading-relaxed flex items-start gap-2.5 shadow-[2px_2px_0px_0px_#000]">
              <HelpCircle className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[2.5]" />
              <p className="font-medium">
                {t("areYouSureSubmit", "Are you sure you want to submit your test paper? Once submitted, your score will be calculated and AI mistake diagnosis generated.")}
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-lg bg-[#D1FAE5] border-2 border-black text-xs text-black leading-relaxed flex items-start gap-2.5 shadow-[2px_2px_0px_0px_#000]">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[2.5]" />
              <p className="font-medium">
                {t("areYouSureSubmit", "Are you sure you want to submit your test paper? Once submitted, your score will be calculated and AI mistake diagnosis generated.")}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#FAF7EE] border-t-2 border-black flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={closeSubmitModal}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-black rounded-lg border-2 border-black bg-white text-black hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000] disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            {t("returnToPaper", "Return to Test")}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white border-2 border-black font-black text-xs sm:text-sm tracking-wide shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-75 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                <span>Evaluating Official Answers...</span>
              </>
            ) : (
              <>
                <span>{t("submitExamNow", "Submit Exam Now")}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
