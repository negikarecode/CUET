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

export default function TestPage({ params, searchParams }: PageProps) {
  const isReattempt = searchParams?.reattempt === "true";
  return <CBTPageClient testId={params.testId} isReattempt={isReattempt} />;
}
