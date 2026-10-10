import React from 'react';
import Link from 'next/link';
import { TopicMastery } from '@/types';
import { normalizeSubject } from '@/lib/analytics';
import {
  CALIBRATION_THRESHOLDS,
  getTopicConfidence,
  formatPlainLanguageDiagnosis,
} from '@/lib/config/dashboardConfig';

interface NextBestActionCardProps {
  prioritizedTopic?: TopicMastery;
  totalAttempted: number;
  currentCycleNumber?: number;
  currentCycleQuestionCount?: number;
}

export const NextBestActionCard: React.FC<NextBestActionCardProps> = ({
  prioritizedTopic,
  totalAttempted,
  currentCycleQuestionCount,
}) => {
  const attempts = currentCycleQuestionCount ?? totalAttempted;
  const isCalibrated = attempts >= CALIBRATION_THRESHOLDS.SUBJECT_CALIBRATION_QUESTIONS;
  const unlockProgress = Math.min(100, Math.round((attempts / CALIBRATION_THRESHOLDS.SUBJECT_CALIBRATION_QUESTIONS) * 100));

  // Default fallback if no weakness recorded yet
  const topic: TopicMastery = (prioritizedTopic || {
    subject: 'Physics',
    chapter: 'Electrostatics & Coulomb Law',
    microTopic: 'Electric Field Lines',
    accuracyPercentage: 0,
    attemptsCount: 6,
    correctCount: 0,
    incorrectCount: 6,
    avgTimeSeconds: 2,
    status: 'critical',
    isRecovered: false,
    fullDiagnosis: {
      primaryDiagnosis: 'Rapid Response Pacing',
      contributingFactor: 'High-Speed Answer Selection',
      specificWeakness: 'Rushing through questions without reviewing options',
    },
  }) as TopicMastery;

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

        {!isCalibrated && (
          <div className="pt-2 max-w-md space-y-1.5">
            <div className="flex justify-between text-[12px] text-[var(--text-secondary)]">
              <span>Unlocks at 150 questions</span>
              <span className="tabular-nums font-medium text-[var(--text)]">{attempts} of 150 questions</span>
            </div>
            <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
                style={{ width: `${Math.max(4, unlockProgress)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="shrink-0 self-start md:self-center">
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
