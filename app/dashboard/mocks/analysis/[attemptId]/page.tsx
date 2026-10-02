"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { useCBTStore } from "@/lib/store/useCBTStore";
import { buildPostMockDeterministicReport } from "@/lib/post-mock-engine";
import PostMockAnalysisClient from "@/components/cbt/PostMockAnalysisClient";
import { useIsClient } from "@/lib/hooks/useIsClient";

export default function MockAnalysisPage() {
  const params = useParams();
  const router = useRouter();
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);
  const resetSession = useCBTStore((state) => state.resetSession);

  const attemptId = String(params?.attemptId || "");

  // Find attempt matching either attempt.id or attempt.testId
  const matchingAttempt = useMemo(() => {
    if (!testAttempts || testAttempts.length === 0) return null;
    return (
      testAttempts.find((a) => a.id === attemptId) ||
      testAttempts.find((a) => a.testId === attemptId) ||
      null
    );
  }, [testAttempts, attemptId]);

  const report = useMemo(() => {
    if (!matchingAttempt) return null;
    return buildPostMockDeterministicReport(matchingAttempt);
  }, [matchingAttempt]);

  if (!isClient) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-[#FF5C5C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!matchingAttempt || !report) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <Link
          href="/dashboard/mocks"
          className="inline-flex items-center gap-1.5 text-xs font-black text-black/60 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mock History
        </Link>

        <div className="bg-white rounded-2xl border-2 border-black p-8 shadow-[6px_6px_0px_0px_#000] text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] border-2 border-black flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_#000]">
            <AlertTriangle className="w-6 h-6 text-[#D97706]" />
          </div>
          <h2 className="text-xl font-black text-black">Mock Attempt Not Found</h2>
          <p className="text-xs text-black/70 font-semibold max-w-md mx-auto">
            We couldn&apos;t find saved question telemetry for this mock attempt in your authenticated account.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/mocks"
              className="px-5 py-2.5 rounded-xl bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] inline-flex items-center gap-2"
            >
              <span>View All Mocks</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/mocks"
          className="inline-flex items-center gap-1.5 text-xs font-black text-black/60 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Mock Papers
        </Link>

        <Link
          href={`/test/${matchingAttempt.testId}`}
          className="text-xs font-black text-black hover:underline"
        >
          View In-Exam Scorecard →
        </Link>
      </div>

      <PostMockAnalysisClient
        report={report}
        onRetake={() => {
          resetSession();
          router.push(`/test/${matchingAttempt.testId}?reattempt=true`);
        }}
      />
    </div>
  );
}
