import React from 'react';
import Link from 'next/link';
import { Play, ArrowRight, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
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
  currentCycleNumber = 1,
  currentCycleQuestionCount,
}) => {
  const attempts = currentCycleQuestionCount ?? totalAttempted;
  const isCalibrated = attempts >= CALIBRATION_THRESHOLDS.SUBJECT_CALIBRATION_QUESTIONS;
  const attemptsToUnlock = Math.max(0, CALIBRATION_THRESHOLDS.SUBJECT_CALIBRATION_QUESTIONS - attempts);
  const unlockProgress = Math.min(100, Math.round((attempts / CALIBRATION_THRESHOLDS.SUBJECT_CALIBRATION_QUESTIONS) * 100));

  // Fallback candidate if no weakness recorded yet
  const topic: TopicMastery = (prioritizedTopic || {
    subject: 'Physics',
    chapter: 'Electrostatics & Coulomb Law',
    microTopic: 'Electric Field Lines',
    accuracyPercentage: 0,
    attemptsCount: 6,
    correctCount: 0,
    incorrectCount: 6,
    timeSinksCount: 1,
    avgTimeSeconds: 2,
    status: 'critical',
    isRecovered: false,
    fullDiagnosis: {
      subject: 'Physics',
      chapter: 'Electrostatics & Coulomb Law',
      microTopic: 'Electric Field Lines',
      ncertReference: 'NCERT Class 12 Chapter 1',
      observedPerformance: {
        attemptsCount: 6,
        correctCount: 0,
        incorrectCount: 6,
        accuracyPercentage: 0,
        avgTimeSeconds: 2,
        targetTimeSeconds: 45,
        speedVsAccuracyState: 'Rapid Response Pattern',
      },
      diagnosticConfidence: 'LOW',
      confidenceRationale: 'Limited sample',
      evidenceThresholdLabel: 'Early signal',
      primaryFailurePattern: 'Rapid response pacing',
      primaryDiagnosis: 'Rapid Response Pacing',
      contributingFactor: 'High-Speed Answer Selection',
      specificWeakness: 'Rapid response pacing without checking all options',
      evidenceList: ['6 of 6 wrong under 2s'],
      interpretation: 'High answering speed suggests guessing or rushing.',
      errorTaxonomy: {
        conceptualGapCount: 6,
        factualRecallCount: 0,
        formulaMethodCount: 0,
        calculationCount: 0,
        questionInterpretationCount: 0,
        distractorTrapCount: 0,
        carelessCount: 0,
        multiStepReasoningCount: 0,
        applicationGapCount: 0,
        timePacingCount: 6,
        guessingCount: 0,
        memoryConfusionCount: 0,
        totalErrors: 6,
      },
      weakSubtopics: [],
      masteryModel: {
        conceptMastery: 0,
        applicationMastery: 0,
        accuracy: 0,
        speed: 2,
        consistency: 0,
        overallStatus: 'critical',
        isSufficientData: false,
      },
      remediationPlan: {
        step1Rebuild: { title: 'Review field lines', topicsToReview: ['Field line properties'] },
        step2DecisionFramework: { title: 'Pacing check', checklist: ['Read question completely', 'Eliminate options'] },
      },
      commonTrap: 'Rushing to option A without reading D',
      recommendedPracticeType: '5-Question Concept Repair',
      retestCriteria: { targetAccuracy: 80, targetPacingSeconds: 45, minimumNewAttemptsRequired: 5 },
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      {/* 1. Next Best Action Card (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div className="space-y-3">
          {/* Top badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
              <span>Next Best Action</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase">
              {topic.subject}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${confidence.badgeColorClass}`}>
              {confidence.badgeLabel}
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {topic.chapter || topic.microTopic}
            </h3>
            <p className="text-[13px] font-semibold text-slate-500 font-mono mt-0.5">
              {topic.accuracyPercentage}% Accuracy • {topic.attemptsCount} Attempts
              {topic.avgTimeSeconds ? ` • Avg ${topic.avgTimeSeconds}s / question` : ''}
            </p>
          </div>

          {/* Plain Language Diagnosis Box (Phase 4 requirement) */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-[13px] text-amber-950 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
              Performance Diagnosis:
            </span>
            <p className="font-medium leading-relaxed">
              {plainDiagnosis.humanSentence}
            </p>
            <p className="text-xs text-amber-800/80 pt-0.5">
              Guidance: {plainDiagnosis.actionGuidance}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href={`/dashboard/radar?subject=${subjectKey}`}
            className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-white shrink-0" />
            <span>Start 6-min repair</span>
          </Link>

          <Link
            href="/dashboard/radar"
            className="py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Weakness Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Prominent Calibration Progress Bar (5 cols) */}
      <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-800 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Cycle {currentCycleNumber} • AI Calibration Gate
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold border border-white/10">
              {unlockProgress}% Calibrated
            </span>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {attempts} / {CALIBRATION_THRESHOLDS.SUBJECT_CALIBRATION_QUESTIONS} Questions Attempted
            </h4>
            <p className="text-[13px] text-slate-300 mt-1 leading-relaxed">
              {isCalibrated
                ? 'Calibration gate achieved! Full adaptive drills and mistake diagnostics are active.'
                : `Complete ${attemptsToUnlock} more questions across CBT mocks to unlock Adaptive Drills & Deep Mistake Diagnostics.`}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(4, unlockProgress)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>0 Qs</span>
              <span>Goal: 150 Qs</span>
            </div>
          </div>

          {/* Unlocks preview checklist */}
          <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${unlockProgress >= 33 ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Initial Diagnostic Baseline (Recorded)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${isCalibrated ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Adaptive Question Sequencing ({isCalibrated ? 'Active' : 'Unlocks at 150 Qs'})</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${isCalibrated ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Deep Mistake Diagnostics ({isCalibrated ? 'Active' : 'Unlocks at 150 Qs'})</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/dashboard/mocks"
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Solve Mocks to Calibrate (+{attemptsToUnlock} Qs)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-900" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NextBestActionCard;
