import React from 'react';
import Link from 'next/link';
import { MoreHorizontal, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { GlowCard } from './GlowCard';
import { useTestStore } from '@/lib/store/useTestStore';
import { RecordedTestAttempt } from '@/types';
import Avatar from '@/components/ui/Avatar';
import { getEvaluatorForSubject, formatDateIndian, MARKING_SCHEME } from '@/lib/config/dashboardConfig';

interface EvaluationTableRow {
  id: string;
  title: string;
  subject: string;
  date: string;
  scoreFormatted: string;
  accuracyFormatted: string;
  status: string;
  statusColor: string;
  evaluator: string;
  avatar: string;
  href: string;
  isLowEffort?: boolean;
  sessionConfidence?: "Low" | "Medium" | "High";
}

export const RecentEvaluationsTable: React.FC = () => {
  const testAttempts = useTestStore((s) => s.testAttempts) || [];

  // Default baseline diagnostic tests if user has 0 attempts
  const defaultRecommendedRows: EvaluationTableRow[] = [
    {
      id: 'mock-rec-1',
      title: 'Physics Domain Diagnostic Mock (Mechanics & Waves)',
      subject: 'Physics',
      date: 'Recommended Baseline',
      scoreFormatted: '50 Qs • 60 Mins',
      accuracyFormatted: 'Calibration Gate',
      status: 'Ready to Start',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      evaluator: 'Dr. A. Verma (Physics Lead)',
      avatar: '/assets/images/avatar1.png',
      href: '/test/physics-mock-1',
    },
    {
      id: 'mock-rec-2',
      title: 'Chemistry Organic & Physical CBT Diagnostic',
      subject: 'Chemistry',
      date: 'Recommended Baseline',
      scoreFormatted: '50 Qs • 60 Mins',
      accuracyFormatted: 'Calibration Gate',
      status: 'Ready to Start',
      statusColor: 'bg-blue-50 text-blue-700 border-blue-200/60',
      evaluator: 'Prof. R. Sen (Chemistry Specialist)',
      avatar: '/assets/images/avatar2.png',
      href: '/test/chemistry-mock-1',
    },
    {
      id: 'mock-rec-3',
      title: 'Mathematics Sectional: Calculus & Matrices',
      subject: 'Mathematics',
      date: 'Recommended Baseline',
      scoreFormatted: '50 Qs • 60 Mins',
      accuracyFormatted: 'Calibration Gate',
      status: 'Ready to Start',
      statusColor: 'bg-amber-50 text-amber-800 border-amber-200/60',
      evaluator: 'Dr. P. Iyer (Maths Evaluator)',
      avatar: '/assets/images/avatar3.png',
      href: '/test/maths-mock-1',
    },
    {
      id: 'mock-rec-4',
      title: 'English Reading Comprehension & Verbal Ability',
      subject: 'English',
      date: 'Recommended Baseline',
      scoreFormatted: '50 Qs • 45 Mins',
      accuracyFormatted: 'Calibration Gate',
      status: 'Ready to Start',
      statusColor: 'bg-purple-50 text-purple-700 border-purple-200/60',
      evaluator: 'K. Joshi (English Faculty)',
      avatar: '/assets/images/avatar4.png',
      href: '/test/english-mock-1',
    },
  ];

  const hasRealAttempts = testAttempts.length > 0;

  // Format real attempts with strict domain-accurate evaluators and clear labelling
  const realRows = testAttempts.slice(0, 5).map((att: RecordedTestAttempt, idx: number) => {
    const evaluatorInfo = getEvaluatorForSubject(att.subject);
    const evaluatorTitle = `${evaluatorInfo.name} (${evaluatorInfo.role})`;
    const formattedDate = formatDateIndian(att.submittedAt || new Date());
    const maxMarks = att.maxMarks || MARKING_SCHEME.MAX_MARKS_PER_SUBJECT;

    return {
      id: att.id || `attempt-${idx}`,
      title: att.testTitle || `${att.subject || 'Domain'} CBT Mock Test`,
      subject: att.subject || 'Domain',
      date: formattedDate,
      scoreFormatted: `${att.totalMarks} / ${maxMarks} pts`,
      accuracyFormatted: `${att.accuracyPercentage}% Accuracy`,
      status: att.accuracyPercentage >= 70 ? 'Complete' : att.accuracyPercentage >= 50 ? 'Calibrated' : 'Needs Review',
      statusColor:
        att.accuracyPercentage >= 70
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
          : att.accuracyPercentage >= 50
          ? 'bg-blue-50 text-blue-700 border-blue-200/60'
          : 'bg-amber-50 text-amber-800 border-amber-200/60',
      evaluator: evaluatorTitle,
      avatar: `/assets/images/avatar${(idx % 4) + 1}.png`,
      isLowEffort: att.isLowEffort,
      sessionConfidence: att.sessionConfidence || (att.isLowEffort ? "Low" : "High"),
      href: `/dashboard/mocks/analysis/${att.id}`,
    };
  });

  const displayRows = hasRealAttempts ? realRows : defaultRecommendedRows;

  return (
    <GlowCard className="p-4 sm:p-6">
      {/* Table Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Recent Test Sessions &amp; Diagnostic Evaluations
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {hasRealAttempts
              ? 'Practice sessions under timed conditions with AI mistake pattern diagnosis'
              : 'Timed domain practice tests with automated pattern diagnosis'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/mocks"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors hidden sm:inline"
          >
            View All Mocks &rarr;
          </Link>
          <button
            type="button"
            aria-label="Table options"
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Responsive Table with horizontal scrollguard */}
      <div className="overflow-x-auto pt-2 -mx-1 sm:mx-0">
        <table className="w-full min-w-[640px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-3 px-2">Evaluator &amp; Test Session</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Score / Format</th>
              <th className="py-3 px-2">Diagnostic Status</th>
              <th className="py-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs font-medium">
            {displayRows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
              >
                {/* Evaluator + Title */}
                <td className="py-3.5 px-2">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={row.avatar}
                      name={row.evaluator}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                        {row.title}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium truncate">
                        {row.evaluator}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3.5 px-2 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                  {row.date}
                </td>

                {/* Score & Accuracy clearly labelled */}
                <td className="py-3.5 px-2 whitespace-nowrap">
                  <div className="flex flex-col">
                    <span className="font-mono font-bold text-slate-800 text-xs">
                      {row.scoreFormatted}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {row.accuracyFormatted}
                    </span>
                  </div>
                </td>

                {/* Status & Confidence Badge */}
                <td className="py-3.5 px-2 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${row.statusColor}`}
                    >
                      {row.status === 'Complete' && <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />}
                      {row.status === 'Ready to Start' && <Clock className="w-3 h-3" />}
                      {row.status}
                    </span>
                    {row.sessionConfidence && (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          row.sessionConfidence === 'High'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                            : row.sessionConfidence === 'Medium'
                            ? 'bg-blue-50 text-blue-700 border-blue-200/60'
                            : 'bg-amber-50 text-amber-800 border-amber-200/60'
                        }`}
                        title={row.isLowEffort ? "Low-effort session, results not reliable" : `${row.sessionConfidence} confidence evaluation`}
                      >
                        {row.isLowEffort ? '⚠️ Low Effort' : `Confidence: ${row.sessionConfidence}`}
                      </span>
                    )}
                  </div>
                </td>

                {/* Action CTA */}
                <td className="py-3.5 px-2 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    {row.isLowEffort && (
                      <Link
                        href={`/dashboard/mocks`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
                      >
                        Retake Paced
                      </Link>
                    )}
                    <Link
                      href={row.href}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      <span>{hasRealAttempts ? 'Audit' : 'Start'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlowCard>
  );
};

export default RecentEvaluationsTable;
