import React, { Suspense } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import { AppDataStore } from '@/lib/data-store';
import { WeaknessScore } from '@/lib/types';

export const dynamic = 'force-dynamic';

interface ChatPageProps {
  searchParams: {
    topic?: string;
    subject?: string;
    q?: string;
  };
}

export default function ChatPage({ searchParams }: ChatPageProps) {
  const topicId = searchParams.topic ? parseInt(searchParams.topic, 10) : undefined;
  const subjectId = searchParams.subject ? parseInt(searchParams.subject, 10) : undefined;

  // Fetch student weak topics from Module 1
  const student = AppDataStore.student;
  const allScores = Array.from(AppDataStore.weaknessScores.values());
  const weakTopics = allScores
    .filter((s) => s.weakness_level === 'critical' || s.weakness_level === 'weak')
    .sort((a, b) => a.final_weakness_score - b.final_weakness_score);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-2 sm:p-4 md:p-6">
      <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Loading CUETBot...</div>}>
        <ChatInterface
          initialTopicId={topicId}
          initialSubjectId={subjectId}
          studentName={student.name}
          weakTopics={weakTopics}
        />
      </Suspense>
    </div>
  );
}
