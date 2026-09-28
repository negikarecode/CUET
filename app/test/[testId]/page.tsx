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
      <div className="min-h-screen bg-[#FAF7EE] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl border-2 border-black p-8 shadow-[4px_4px_0px_0px_#000] text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FEF3C7] border-2 border-black flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#000]">
            <RotateCcw className="w-7 h-7 text-black stroke-[2.5]" />
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-black uppercase bg-[#FEF3C7] px-2.5 py-1 rounded border border-black shadow-[1px_1px_0px_0px_#000]">
              Test In Preparation
            </span>
            <h2 className="text-xl font-black text-black">
              {testMeta?.title || "Exam Paper Under Reconstruction"}
            </h2>
            <p className="text-xs text-black/70 font-semibold leading-relaxed">
              This paper is currently being remade and recalibrated with official CUET NTA past year papers according to the latest 50 compulsory questions pattern.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href={isMock ? "/dashboard/mocks" : "/dashboard/pyqs"}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF5C5C] hover:bg-[#FF4545] text-white font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] transition-all"
            >
              <span>{isMock ? "Back to All Mocks" : "Back to All PYQ Papers"}</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF7EE] text-black font-black text-xs border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-white transition-all"
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
