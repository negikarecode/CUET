"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle, Play } from "lucide-react";
import { useTestStore } from "@/lib/store/useTestStore";
import { buildPostMockDeterministicReport } from "@/lib/post-mock-engine";
import { resolveCanonicalTestId } from "@/lib/canonical-tests";
import PostMockAnalysisClient from "@/components/cbt/PostMockAnalysisClient";
import { useIsClient } from "@/lib/hooks/useIsClient";

export default function PYQAnalysisPage({ attemptId: propAttemptId }: { attemptId?: string } = {}) {
  const params = useParams();
  const router = useRouter();
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);

  const slug = (params?.slug as string[]) || [];
  const slugAttemptId = slug[0] === "pyqs" && slug[1] === "analysis" ? slug[2] : "";
  const attemptId = propAttemptId || String(params?.attemptId || "") || slugAttemptId || "";

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
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!matchingAttempt || !report) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <Link
          href="/dashboard/pyqs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All PYQ Papers
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">PYQ Attempt Not Found</h2>
          <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">
            We couldn&apos;t find saved question telemetry or a matching official paper for &ldquo;{attemptId}&rdquo;.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/test/${attemptId}`}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs inline-flex items-center gap-2 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Take Official CBT Paper Now</span>
            </Link>
            <Link
              href="/dashboard/pyqs"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              <span>Browse All PYQ Papers</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <PostMockAnalysisClient
        report={report}
        onRetake={() => {
          const canonicalSlug =
            resolveCanonicalTestId(matchingAttempt.testId || attemptId, matchingAttempt.testTitle, matchingAttempt.subject) ||
            matchingAttempt.testId ||
            attemptId;
          router.push(`/test/${canonicalSlug}?reattempt=true`);
        }}
      />
    </div>
  );
}
