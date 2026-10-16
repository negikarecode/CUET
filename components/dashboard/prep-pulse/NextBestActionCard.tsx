"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles, AlertTriangle } from "lucide-react";
import { TopicMastery } from "@/types";
import { normalizeSubject } from "@/lib/analytics";
import {
  getTopicConfidence,
  formatPlainLanguageDiagnosis,
} from "@/lib/config/dashboardConfig";
import { computeAuthoritativeDiagnosticProgress } from "@/lib/diagnostic-status";

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

  // If no attempts or weakness recorded yet, show onboarding diagnostic calibration card
  if (!prioritizedTopic || totalAttempted === 0) {
    return (
      <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs transition-all hover:shadow-sm">
        {/* Subtle accent highlight line on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Initial Diagnostic Calibration
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-500">
                Cycle 1
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                Complete your first diagnostic test
              </h2>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                Take an official 50-question mock or PYQ shift paper to calibrate your score, detect question traps, and unlock your AI weakness diagnosis.
              </p>
            </div>

            {/* Diagnostic Unlock Progress Tracker */}
            <div className="pt-2 max-w-md space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-700">Diagnostic unlocks at 150 questions</span>
                <span className="tabular-nums font-semibold text-slate-900">
                  0 of 150 questions
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: "0%" }}
                />
              </div>
              <p className="text-[12px] text-slate-500">
                150 qualifying questions needed to unlock full multi-subject radar & error taxonomy.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
            <Link
              href="/dashboard/mocks"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm cursor-pointer text-center"
            >
              <span>Start diagnostic test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
  const topicTitle = topic.chapter || topic.microTopic || "Domain Knowledge Practice";
  const reasonText = plainDiagnosis.humanSentence || "Lowest accuracy in recent domain tests.";

  return (
    <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs transition-all hover:shadow-sm">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3.5 max-w-2xl">
          {/* Header metadata row */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Your Next Best Action
            </span>

            <span className="text-slate-300">•</span>

            <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {topic.subject}
            </span>

            {!confidence.isReliable ? (
              <span className="inline-flex items-center gap-1 font-medium text-amber-700 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                Preliminary signal ({topic.attemptsCount || 0} attempts)
              </span>
            ) : (
              <span className="font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                High confidence ({topic.attemptsCount || 0} attempts)
              </span>
            )}
          </div>

          {/* Recommended topic and explanation */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              Strengthen {topicTitle}
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-normal">
              Target this priority concept to recover lost marks and prevent trap errors in upcoming tests.
            </p>
          </div>

          {/* "Why this matters" callout box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs sm:text-sm text-slate-700 space-y-1">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <span>Why this matters:</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {reasonText}
            </p>
            {topic.accuracyPercentage !== undefined && (
              <div className="flex items-center gap-4 pt-1 text-xs text-slate-500 tabular-nums">
                <span>Accuracy: <strong className="text-slate-900">{topic.accuracyPercentage}%</strong></span>
                <span>•</span>
                <span>Attempted: <strong className="text-slate-900">{topic.attemptsCount || 0}</strong> questions</span>
                {topic.avgTimeSeconds ? (
                  <>
                    <span>•</span>
                    <span>Avg speed: <strong className="text-slate-900">{topic.avgTimeSeconds}s</strong>/q</span>
                  </>
                ) : null}
              </div>
            )}
          </div>

          {/* Diagnostic Cycle Progress */}
          <div className="pt-1 max-w-md space-y-1.5">
            {!isUnlocked ? (
              /* LOCKED STATE (<150 questions) */
              <>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-700">Diagnostic unlocks at 150 questions</span>
                  <span className="tabular-nums font-semibold text-slate-900">
                    {diagnostic.progressText}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(4, diagnostic.unlockProgressPercentage)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  {diagnostic.questionsToUnlock} qualifying questions remaining to unlock cycle analysis.
                </p>
              </>
            ) : (
              /* UNLOCKED STATE (>=150 questions) */
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cycle {diagnostic.currentCycleNumber} Active</span>
                  </span>
                  <span className="tabular-nums font-semibold text-slate-900">
                    {diagnostic.progressText}
                  </span>
                </div>
                {diagnostic.currentCycleQuestionCount > 0 ? (
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(4, diagnostic.activeCycleProgressPercentage)}%` }}
                    />
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>

        {/* Clear Action Hierarchy: 1 prominent primary button + 1 subtle secondary link */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0 self-stretch sm:self-auto lg:self-center">
          <Link
            href={`/dashboard/radar?subject=${subjectKey}`}
            className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold transition-all shadow-sm hover:shadow cursor-pointer text-center"
          >
            <span>Start focused practice</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {isUnlocked && (
            <Link
              href="/dashboard/radar"
              className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 transition-colors cursor-pointer text-center"
            >
              View diagnosis report
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NextBestActionCard;
