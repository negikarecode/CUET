import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { SubjectCalibrationData, TopicMastery } from '@/types';
import { useTestStore } from '@/lib/store/useTestStore';
import { useIsClient } from '@/lib/hooks/useIsClient';
import { MARKING_SCHEME } from '@/lib/config/dashboardConfig';

type PerformanceTab = 'trend' | 'subjects';

interface CombinedPerformanceCardProps {
  calibrations?: SubjectCalibrationData[];
  weaknesses?: TopicMastery[];
  targetScore?: number;
}

export const CombinedPerformanceCard: React.FC<CombinedPerformanceCardProps> = ({
  calibrations = [],
  targetScore = 238,
}) => {
  const [activeTab, setActiveTab] = useState<PerformanceTab>('trend');
  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);

  const rawAttempts = useMemo(() => {
    if (!isClient || !testAttempts || testAttempts.length === 0) {
      return [];
    }
    return [...testAttempts].sort((a, b) => {
      const ta = new Date(a.submittedAt || 0).getTime();
      const tb = new Date(b.submittedAt || 0).getTime();
      return ta - tb;
    });
  }, [isClient, testAttempts]);

  const attemptsCount = rawAttempts.length;

  const trendChartData = useMemo(() => {
    if (attemptsCount < 2) return [];
    return rawAttempts.map((att, idx) => {
      const d = new Date(att.submittedAt || Date.now());
      const label = `Mock ${idx + 1}`;
      const dateLabel = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
      const score = Math.round(att.totalMarks ?? 0);
      const acc = Math.round(att.accuracyPercentage ?? 0);
      return {
        id: att.id || `att-${idx}`,
        label,
        dateLabel,
        score,
        accuracy: acc,
        target: targetScore,
      };
    });
  }, [rawAttempts, attemptsCount, targetScore]);

  const subjectsWithData = useMemo(() => {
    return calibrations.filter((c) => c.totalAttempted > 0);
  }, [calibrations]);

  const CustomChartTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0]?.payload;
      return (
        <div className="bg-white rounded-[8px] p-3 border border-[var(--border)] shadow-[0_8px_24px_rgba(15,23,42,0.12)] text-[12px]">
          <div className="font-semibold text-[var(--text)]">{item?.label} ({item?.dateLabel})</div>
          <div className="text-[var(--accent)] font-medium tabular-nums mt-1">
            Score: {item?.score} / {MARKING_SCHEME.MAX_SCORE_PER_SUBJECT}
          </div>
          <div className="text-[var(--text-secondary)] tabular-nums">
            Accuracy: {item?.accuracy}%
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app-card flex flex-col justify-between">
      {/* Card Header with Underline Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border)] pb-3 gap-3">
        <h3 className="text-[16px] font-semibold text-[var(--text)]">
          Performance
        </h3>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('trend')}
            className={`pb-1 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'trend'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text)]'
            }`}
          >
            Trend
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('subjects')}
            className={`pb-1 text-[14px] font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'subjects'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text)]'
            }`}
          >
            By subject
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="pt-6">
        {activeTab === 'trend' && (
          <div>
            <div className="sr-only">
              Score trend chart showing historical test attempts with a target score line at {targetScore}.
            </div>

            {attemptsCount === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-[14px] font-medium text-[var(--text)]">
                  No mock tests attempted yet
                </p>
                <p className="text-[14px] text-[var(--text-secondary)] max-w-sm mx-auto">
                  Complete your first diagnostic test to establish your baseline score and start tracking your performance trend.
                </p>
              </div>
            ) : attemptsCount === 1 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-[14px] font-medium text-[var(--text)]">
                  Baseline recorded: {rawAttempts[0]?.totalMarks ?? 0} / {MARKING_SCHEME.MAX_SCORE_PER_SUBJECT}
                </p>
                <p className="text-[14px] text-[var(--text-secondary)] max-w-sm mx-auto">
                  Complete at least one more mock test to view your performance trend line over time.
                </p>
              </div>
            ) : (
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendChartData}
                    margin={{ top: 12, right: 12, left: -16, bottom: 0 }}
                  >
                    <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="dateLabel"
                      stroke="transparent"
                      tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="transparent"
                      domain={[0, MARKING_SCHEME.MAX_SCORE_PER_SUBJECT]}
                      tick={{ fontSize: 12, fill: "var(--text-muted)" }}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomChartTooltip />} />
                    <ReferenceLine
                      y={targetScore}
                      stroke="var(--warning)"
                      strokeDasharray="4 4"
                      label={{
                        value: `Target: ${targetScore}`,
                        fill: 'var(--text-secondary)',
                        fontSize: 12,
                        position: 'top',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--accent)"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "var(--accent)", strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: "var(--accent)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {activeTab === 'subjects' && (
          <div>
            {subjectsWithData.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-[14px] font-medium text-[var(--text)]">
                  No subject attempts recorded yet
                </p>
                <p className="text-[14px] text-[var(--text-secondary)] max-w-sm mx-auto">
                  Take domain-specific practice tests to calibrate performance by subject.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {subjectsWithData.map((sub) => {
                  return (
                    <div
                      key={sub.subjectKey}
                      className="p-3 rounded-[8px] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="text-[14px] font-semibold text-[var(--text)]">
                          {sub.subject}
                        </div>
                        <div className="text-[12px] text-[var(--text-secondary)] tabular-nums">
                          {sub.totalAttempted} questions attempted • {sub.totalCorrect} correct
                        </div>
                      </div>

                      <div className="w-full sm:w-48 space-y-1.5">
                        <div className="flex justify-between text-[12px]">
                          <span className="text-[var(--text-secondary)]">Accuracy</span>
                          <span className="font-semibold text-[var(--text)] tabular-nums">{sub.accuracyPercentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
                            style={{ width: `${sub.accuracyPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CombinedPerformanceCard;
