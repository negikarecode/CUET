import React from "react";
import { AIPracticeSession } from "@/components/ai-practice/AIPracticeSession";

interface AIPracticePageProps {
  params: {
    topic_id: string;
  };
}

export default function AIPracticePage({ params }: AIPracticePageProps) {
  const topicId = parseInt(params.topic_id, 10) || 4;

  return (
    <main className="min-h-screen bg-slate-50/50">
      <AIPracticeSession topicId={topicId} />
    </main>
  );
}
