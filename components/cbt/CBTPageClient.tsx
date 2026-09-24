"use client";

import React, { useEffect } from "react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { Question, FullTestMeta } from "@/types";
import CBTPlayer from "@/components/cbt/CBTPlayer";

interface CBTPageClientProps {
  testId: string;
  isReattempt?: boolean;
  initialTestMeta?: FullTestMeta;
  initialQuestions?: Question[];
}

export default function CBTPageClient({
  testId,
  isReattempt = false,
  initialTestMeta,
  initialQuestions,
}: CBTPageClientProps) {
  const isInitialized = useCBTStore((state) => state.isInitialized);
  const currentTestId = useCBTStore((state) => state.testId);
  const isSubmitted = useCBTStore((state) => state.isSubmitted);
  const initTest = useCBTStore((state) => state.initTest);

  useEffect(() => {
    if (initialTestMeta && initialQuestions && initialQuestions.length > 0) {
      initTest(testId, initialTestMeta, initialQuestions, isReattempt);
    } else {
      // Secure Client-Side Fallback: Load sanitized test from server API endpoint
      fetch(`/api/test/${testId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.testMeta && data?.questions) {
            initTest(testId, data.testMeta, data.questions, isReattempt);
          }
        })
        .catch((err) => {
          console.error("Secure test initialization notice:", err);
        });
    }
  }, [testId, initTest, isReattempt, initialTestMeta, initialQuestions]);

  // Intercept tab/window close or refresh at page root during active exam
  useEffect(() => {
    if (isSubmitted) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      const msg = "Warning: No test data will be recorded if you close or leave this test.";
      e.returnValue = msg;
      return msg;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.onbeforeunload = null;
    };
  }, [isSubmitted]);

  if (!isInitialized || currentTestId !== testId || (isReattempt && isSubmitted)) {
    return (
      <div className="min-h-screen bg-[#FAF7EE] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-black/70">
          <div className="w-9 h-9 border-4 border-[#FF5C5C] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-black uppercase tracking-wider">
            {isReattempt
              ? "Preparing Fresh Re-attempt Environment..."
              : "Initializing NTA CBT Secure Examination Engine..."}
          </p>
        </div>
      </div>
    );
  }

  return <CBTPlayer />;
}
