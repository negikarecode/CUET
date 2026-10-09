import { Metadata } from "next";
import CBTPageClient from "@/components/cbt/CBTPageClient";
import { getQuestionsForTest } from "@/lib/data/mock50Questions";

interface PageProps {
  params: {
    testId: string;
  };
  searchParams?: {
    reattempt?: string;
  };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const { testMeta } = getQuestionsForTest(params.testId);
  return {
    title: `${testMeta.title} | CUET AI-Prep NTA CBT Simulator`,
    description: `Official CUET UG Computer-Based Test environment for ${testMeta.subject}. 50 compulsory questions, 60-minute continuous timer, +5 / -1 marking scheme.`,
  };
}

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { sanitizeQuestionForActiveExam } from "@/lib/store/useCBTStore";

export default function TestPage({ params, searchParams }: PageProps) {
  const isReattempt = searchParams?.reattempt === "true";
  const { testMeta, questions } = getQuestionsForTest(params.testId);

  if (questions.length === 0) {
    const isMock = params.testId.toLowerCase().includes("mock");
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 p-8 shadow-sm text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto text-amber-600 shadow-xs">
            <RotateCcw className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200/60 inline-block">
              Test In Preparation
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {testMeta?.title || "Exam Paper Under Reconstruction"}
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              This paper is currently being remade and recalibrated with official CUET NTA past year papers according to the latest 50 compulsory questions pattern.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href={isMock ? "/dashboard/mocks" : "/dashboard/pyqs"}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs hover:shadow transition-all"
            >
              <span>{isMock ? "Back to All Mocks" : "Back to All PYQ Papers"}</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 font-semibold text-xs border border-slate-200 transition-all"
            >
              <span>Go to Command Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Server-side sanitization prevents answer leakage in client bundle and React tree
  const sanitizedQuestions = questions.map(sanitizeQuestionForActiveExam);

  return (
    <CBTPageClient
      testId={params.testId}
      isReattempt={isReattempt}
      initialTestMeta={testMeta}
      initialQuestions={sanitizedQuestions}
    />
  );
}
