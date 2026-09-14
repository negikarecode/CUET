"use client";

import React, { useEffect } from "react";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";
import CBTPlayer from "@/components/cbt/CBTPlayer";

interface CBTPageClientProps {
  testId: string;
  isReattempt?: boolean;
}

export default function CBTPageClient({ testId, isReattempt = false }: CBTPageClientProps) {
  const isInitialized = useCBTStore((state) => state.isInitialized);
  const currentTestId = useCBTStore((state) => state.testId);
  const isSubmitted = useCBTStore((state) => state.isSubmitted);
  const initTest = useCBTStore((state) => state.initTest);

  useEffect(() => {
    const { testMeta, questions } = getQuestionsForTest(testId);
    initTest(testId, testMeta, questions, isReattempt);
  }, [testId, initTest, isReattempt]);

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
