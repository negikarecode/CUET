import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { TopicMastery } from '@/types';
import { normalizeSubject } from '@/lib/analytics';
import {
  getTopicConfidence,
  formatPlainLanguageDiagnosis,
} from '@/lib/config/dashboardConfig';
import {
  computeAuthoritativeDiagnosticProgress,
} from '@/lib/diagnostic-status';

interface NextBestActionCardProps {
  prioritizedTopic?: TopicMastery;
  totalAttempted: number;
  currentCycleNumber?: number;
  currentCycleQuestionCount?: number;
  isUnlocked?: boolean;
}

export const NextBestActionCard: React.FC<NextBestActionCardProps> = ({
  prioritizedTopic,
  totalAttempted,
  currentCycleNumber,
  currentCycleQuestionCount,
  isUnlocked: isUnlockedProp,
}) => {
  const diagnostic = computeAuthoritativeDiagnosticProgress({
    totalAttempted,
    currentCycleNumber,
    currentCycleQuestionCount,
  });

  const isUnlocked = isUnlockedProp !== undefined ? isUnlockedProp : diagnostic.isUnlocked;

  // If no attempts or weakness recorded yet, show onboarding diagnostic card
  if (!prioritizedTopic || totalAttempted === 0) {
    return (
      <div className="app-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-[var(--text-secondary)]">
              Recommended next step
            </span>
            <span className="text-[12px] text-[var(--text-muted)]">•</span>
            <span className="text-[12px] text-[var(--text-secondary)]">
              Diagnostic Mock
            </span>
          </div>
          <h2 className="text-[20px] font-semibold text-[var(--text)] leading-[1.25]">
            Complete your first diagnostic test
          </h2>
          <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">
            Take an official 50-question mock or PYQ shift paper to calibrate your score, detect question traps, and unlock AI weakness diagnosis.
          </p>

          {/* Explicit Diagnostic Unlock Progress Tracker */}
          <div className="pt-2 max-w-md space-y-1.5">
            <div className="flex justify-between text-[12px] text-[var(--text-secondary)]">
              <span>Diagnostic unlocks at 150 questions</span>
              <span className="tabular-nums font-medium text-[var(--text)]">
                0 of 150 questions
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/dashboard/mocks"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-[8px] text-[14px] font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors cursor-pointer"
          >
            Start diagnostic test
          </Link>
        </div>
      </div>
    );
  }

  const topic: TopicMastery = prioritizedTopic;

  const confidence = getTopicConfidence(topic.attemptsCount || 0);
  const plainDiagnosis = formatPlainLanguageDiagnosis({
    primaryDiagnosis: topic.fullDiagnosis?.primaryDiagnosis,
    contributingFactor: topic.fullDiagnosis?.contributingFactor,
    avgTimeSeconds: topic.avgTimeSeconds,
    accuracyPercentage: topic.accuracyPercentage,
  });

  const subjectKey = normalizeSubject(topic.subject).key;
  const topicTitle = topic.chapter || topic.microTopic || 'Diagnostic Practice';
  const reasonText = plainDiagnosis.humanSentence || 'Lowest accuracy in recent domain tests.';

  return (
    <div className="app-card flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-2 max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-[var(--text-secondary)]">
            Next action
          </span>
          <span className="text-[12px] text-[var(--text-muted)]">•</span>
          <span className="text-[12px] text-[var(--text-secondary)]">
            {topic.subject}
          </span>
          {!confidence.isReliable && (
            <span className="text-[12px] font-medium text-[var(--warning)] bg-[var(--warning-subtle)] px-2 py-0.5 rounded-[8px]">
              Low confidence
            </span>
          )}
        </div>

        <div>
          <h2 className="text-[20px] font-semibold text-[var(--text)] leading-[1.25]">
            {topicTitle}
          </h2>
          <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5] mt-1">
            {reasonText}
          </p>
        </div>

        {/* Diagnostic Progress & Cycle State */}
        {!isUnlocked ? (
          /* LOCKED STATE (<150 questions) */
          <div className="pt-2 max-w-md space-y-1.5">
            <div className="flex justify-between text-[12px] text-[var(--text-secondary)]">
              <span>Diagnostic unlocks at 150 questions</span>
              <span className="tabular-nums font-medium text-[var(--text)]">
                {diagnostic.progressText}
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
                style={{ width: `${Math.max(4, diagnostic.unlockProgressPercentage)}%` }}
              />
            </div>
          </div>
        ) : (
          /* UNLOCKED STATE (>=150 questions) */
          <div className="pt-2 max-w-md space-y-1.5">
            <div className="flex items-center justify-between text-[12px]">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Diagnostic unlocked</span>
              </span>
              <span className="tabular-nums font-medium text-[var(--text)]">
                {diagnostic.progressText}
              </span>
            </div>
            {diagnostic.currentCycleQuestionCount > 0 ? (
              <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(4, diagnostic.activeCycleProgressPercentage)}%` }}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-center">
        {isUnlocked && (
          <Link
            href="/dashboard/radar"
            className="inline-flex items-center justify-center h-10 px-4 rounded-[8px] border border-[var(--border)] hover:bg-[var(--surface-hover)] text-[var(--text)] text-[14px] font-medium transition-colors cursor-pointer"
          >
            View report
          </Link>
        )}
        <Link
          href={`/dashboard/radar?subject=${subjectKey}`}
          className="inline-flex items-center justify-center h-10 px-5 rounded-[8px] bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors cursor-pointer"
        >
          Practice this topic
        </Link>
      </div>
    </div>
  );
};

export default NextBestActionCard;
