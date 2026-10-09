"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  LogOut,
  Clock,
  HelpCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function CBTExitWarningModal() {
  const { t } = useTranslation();
  const router = useRouter();

  const isExitModalOpen = useCBTStore((state) => state.isExitModalOpen);
  const closeExitModal = useCBTStore((state) => state.closeExitModal);
  const abandonTest = useCBTStore((state) => state.abandonTest);
  const testMeta = useCBTStore((state) => state.testMeta);
  const questions = useCBTStore((state) => state.questions);
  const remainingSeconds = useCBTStore((state) => state.remainingSeconds);
  const getSummaryCounts = useCBTStore((state) => state.getSummaryCounts);

  // Close on Escape key press
  useEffect(() => {
    if (!isExitModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeExitModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExitModalOpen, closeExitModal]);

  if (!isExitModalOpen) return null;

  const counts = getSummaryCounts();
  const totalAnswered = counts.answered + counts.answeredMarkedReview;
  const minutesLeft = Math.floor(remainingSeconds / 60);
  const secondsLeft = remainingSeconds % 60;
  const timeFormatted = `${minutesLeft}m ${secondsLeft.toString().padStart(2, "0")}s`;

  const handleLeaveTest = () => {
    abandonTest();
    router.push("/dashboard");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-50 text-slate-900 p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100 shrink-0">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3
                id="exit-modal-title"
                className="text-base font-bold tracking-tight text-slate-900"
              >
                {t("exitModalTitle", "Exit Examination Session?")}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {testMeta?.title ?? "CUET UG Active CBT Exam"} ({testMeta?.subject ?? "Domain Mock"})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeExitModal}
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-900 shadow-xs transition-colors cursor-pointer"
            aria-label="Close dialog and return to test"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* High-Visibility No Data Warning Banner */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-rose-600 stroke-[2.5] shrink-0" />
              <span>{t("noDataWarningTitle", "Warning: No Data Will Be Recorded")}</span>
            </div>
            <p className="mt-1.5 text-xs font-medium text-rose-900/80 leading-relaxed">
              {t(
                "noDataWarningDesc",
                "If you close, refresh, or back out of this test now, no data will be recorded. Your responses, scores, accuracy, and test attempt will NOT be saved to your dashboard or leaderboard."
              )}
            </p>
          </div>

          {/* Current Test Snapshot */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5] shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  {t("answered", "Answered")}
                </p>
                <p className="text-sm font-bold font-mono text-slate-900">
                  {totalAnswered} / {questions.length}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
              <Clock className="w-4 h-4 text-amber-500 stroke-[2.5] shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  {t("timeLeft", "Time Left")}
                </p>
                <p className="text-sm font-bold font-mono text-slate-900">
                  {timeFormatted}
                </p>
              </div>
            </div>
          </div>

          {/* Submission Hint */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 font-medium flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 stroke-[2.5]" />
            <p>
              {t(
                "wantToSaveHint",
                "To evaluate and save your score, click 'Return to Test' and use the 'Submit Test' button in the top header instead."
              )}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeExitModal}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-xs transition-all cursor-pointer"
          >
            {t("returnToPaper", "Return to Test")}
          </button>

          <button
            type="button"
            onClick={handleLeaveTest}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs tracking-wide shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4 stroke-[2.5]" />
            <span>{t("leaveTestBtn", "Leave Test (Discard All Data)")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
