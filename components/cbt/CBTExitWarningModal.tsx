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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#FAF7EE] text-black p-5 sm:p-6 border-b-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FEE2E2] flex items-center justify-center text-[#DC2626] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3
                id="exit-modal-title"
                className="text-lg font-black tracking-tight text-black"
              >
                {t("exitModalTitle", "Exit Examination Session?")}
              </h3>
              <p className="text-xs text-black/70 font-semibold mt-0.5">
                {testMeta?.title ?? "CUET UG Active CBT Exam"} ({testMeta?.subject ?? "Domain Mock"})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeExitModal}
            className="p-1 rounded-lg border-2 border-black bg-white hover:bg-[#FAF7EE] text-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            aria-label="Close dialog and return to test"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* High-Visibility No Data Warning Banner */}
          <div className="p-4 rounded-xl bg-[#FEE2E2] border-2 border-[#DC2626] shadow-[3px_3px_0px_0px_#000]">
            <div className="flex items-center gap-2 text-[#991B1B] font-black text-xs sm:text-sm uppercase tracking-wide">
              <AlertTriangle className="w-5 h-5 text-[#DC2626] stroke-[2.5] shrink-0" />
              <span>{t("noDataWarningTitle", "Warning: No Data Will Be Recorded")}</span>
            </div>
            <p className="mt-2 text-xs sm:text-[13px] font-bold text-black/90 leading-relaxed">
              {t(
                "noDataWarningDesc",
                "If you close, refresh, or back out of this test now, no data will be recorded. Your responses, scores, accuracy, and test attempt will NOT be saved to your dashboard or leaderboard."
              )}
            </p>
          </div>

          {/* Current Test Snapshot */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#FAF7EE] border-2 border-black flex items-center gap-2.5 shadow-[2px_2px_0px_0px_#000]">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] stroke-[2.5] shrink-0" />
              <div>
                <p className="text-[10px] font-black text-black/60 uppercase">
                  {t("answered", "Answered")}
                </p>
                <p className="text-sm font-black font-mono text-black">
                  {totalAnswered} / {questions.length}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF7EE] border-2 border-black flex items-center gap-2.5 shadow-[2px_2px_0px_0px_#000]">
              <Clock className="w-4 h-4 text-[#F59E0B] stroke-[2.5] shrink-0" />
              <div>
                <p className="text-[10px] font-black text-black/60 uppercase">
                  {t("timeLeft", "Time Left")}
                </p>
                <p className="text-sm font-black font-mono text-black">
                  {timeFormatted}
                </p>
              </div>
            </div>
          </div>

          {/* Submission Hint */}
          <div className="p-3 rounded-lg bg-[#FAF7EE] border-2 border-black text-xs text-black/80 font-semibold flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[2.5]" />
            <p>
              {t(
                "wantToSaveHint",
                "To evaluate and save your score, click 'Return to Test' and use the 'Submit Test' button in the top header instead."
              )}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-6 py-4 bg-[#FAF7EE] border-t-2 border-black flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeExitModal}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-black rounded-lg border-2 border-black bg-white text-black hover:bg-[#FAF7EE] shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            {t("returnToPaper", "Return to Test")}
          </button>

          <button
            type="button"
            onClick={handleLeaveTest}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white border-2 border-black font-black text-xs sm:text-sm tracking-wide shadow-[3px_3px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-4 h-4 stroke-[2.5]" />
            <span>{t("leaveTestBtn", "Leave Test (Discard All Data)")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
