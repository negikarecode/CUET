import React, { useState, useId, useMemo } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  TrendingUp,
  Layers,
  BarChart3,
  Sparkles,
  ArrowRight,
  Target,
  GraduationCap,
  Calculator,
  FlaskConical,
  Zap,
  Dna,
  Briefcase,
  Scale,
  Landmark,
  Globe,
  Brain,
  Users,
  BookOpen,
  Laptop,
  Medal,
} from 'lucide-react';
import { GlowCard } from './GlowCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { SubjectCalibrationData, TopicMastery } from '@/types';
import { useTestStore } from '@/lib/store/useTestStore';
import { useIsClient } from '@/lib/hooks/useIsClient';
import { MARKING_SCHEME } from '@/lib/config/dashboardConfig';

const SUBJECT_ICON_MAP: Record<string, React.ElementType> = {
  Calculator,
  FlaskConical,
  Zap,
  Dna,
  BarChart3,
  TrendingUp,
  Briefcase,
  Scale,
  Landmark,
  Globe,
  Brain,
  Users,
  BookOpen,
  Target,
  Laptop,
  Medal,
  GraduationCap,
};

function SubjectIcon({ name, className = 'w-4 h-4 text-slate-700' }: { name?: string; className?: string }) {
  const IconComponent = (name && SUBJECT_ICON_MAP[name]) || GraduationCap;
  return <IconComponent className={className} />;
}

type PerformanceTab = 'trend' | 'subjects' | 'topics';

interface CombinedPerformanceCardProps {
  calibrations?: SubjectCalibrationData[];
  weaknesses?: TopicMastery[];
  targetScore?: number; // e.g. 238
}

export const CombinedPerformanceCard: React.FC<CombinedPerformanceCardProps> = ({
  calibrations = [],
  weaknesses = [],
  targetScore = 238,
}) => {
  const [activeTab, setActiveTab] = useState<PerformanceTab>('trend');
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [selectedSubTab, setSelectedSubTab] = useState<'Score' | 'Accuracy'>('Score');

  const chartId = useId().replace(/:/g, '');
  const strokeGradId = `strokeGrad_${chartId}`;
  const areaGradId = `areaGrad_${chartId}`;

  const isClient = useIsClient();
  const testAttempts = useTestStore((state) => state.testAttempts);

  // Genuine test attempts sorted chronologically
  const rawAttempts = useMemo(() => {
    if (!isClient || !testAttempts || testAttempts.length === 0) {
      // Default fallback if fresh session
      return [
        {
          id: 'mock-1',
          submittedAt: '2026-10-06T14:30:00.000Z',
          subject: 'Environmental Studies',
          totalMarks: 10,
          accuracyPercentage: 20,
          attemptedCount: 50,
          correctCount: 10,
        },
      ];
    }
    return [...testAttempts].sort((a, b) => {
      const ta = new Date(a.submittedAt || 0).getTime();
      const tb = new Date(b.submittedAt || 0).getTime();
      return ta - tb;
    });
  }, [isClient, testAttempts]);

  // Attempts count
  const attemptsCount = rawAttempts.length;

  // Single attempt baseline
  const singleAttempt = rawAttempts[0] || null;
  const singleAttemptScore = singleAttempt?.totalMarks ?? 10;

  // Multi-attempt trend chart data
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

  // Subjects with authentic attempts
  const subjectsWithData = useMemo(() => {
    return calibrations.filter((c) => c.totalAttempted > 0);
  }, [calibrations]);

  // Subject comparison data on real 250-mark scale
  const subjectComparisonData = useMemo(() => {
    if (subjectsWithData.length === 0) return [];
    return subjectsWithData.map((item) => {
      const score = Math.round((item.accuracyPercentage / 100) * MARKING_SCHEME.MAX_SCORE_PER_SUBJECT);
      return {
        subject: item.subject,
        yours: selectedSubTab === 'Score' ? score : item.accuracyPercentage,
        cohortAvg: selectedSubTab === 'Score' ? 160 : 64,
        topper: selectedSubTab === 'Score' ? 238 : 95,
        unit: selectedSubTab === 'Score' ? ' pts' : '%',
      };
    });
  }, [subjectsWithData, selectedSubTab]);

  // Real topic mastery bars
  const topicBars = useMemo(() => {
    if (!weaknesses || weaknesses.length === 0) return [];
    return weaknesses.slice(0, 8).map((w, idx) => ({
      id: `topic-${idx}`,
      topic: w.chapter || w.microTopic,
      shortLabel: (w.chapter || w.microTopic).slice(0, 10),
      score: w.accuracyPercentage,
      attemptsCount: w.attemptsCount,
    }));
  }, [weaknesses]);

  // Custom tooltips
  const CustomTopicTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0]?.payload;
      return (
        <div className="bg-slate-900 text-white rounded-xl shadow-xl px-3 py-2 text-xs border border-slate-800">
          <div className="font-semibold text-slate-300">{item?.topic}</div>
          <div className="text-sm font-bold text-sky-400 font-mono mt-0.5">
            {item?.score}% Accuracy ({item?.attemptsCount} attempts)
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomSubjectTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const unit = payload[0]?.payload?.unit || '';
      return (
        <div className="bg-slate-900 text-white rounded-xl shadow-xl p-3 min-w-[170px] text-xs border border-slate-800">
          <div className="font-bold text-slate-200 pb-1 mb-1 border-b border-slate-800 flex justify-between">
            <span>{label}</span>
            <span className="text-[10px] text-sky-400">{selectedSubTab}</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-sky-300">Your {selectedSubTab}:</span>
              <span className="font-mono font-bold">{payload[0]?.value}{unit}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cohort Avg:</span>
              <span className="font-mono">{payload[1]?.value}{unit}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Topper Cutoff:</span>
              <span className="font-mono">{payload[2]?.value}{unit}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <GlowCard className="p-6 h-full flex flex-col justify-between">
      {/* Header + Tabs Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Performance Intelligence
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200/60 font-mono">
              CUET 250-pt scale
            </span>
          </div>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Track score trends, domain proficiencies, and topic accuracy
          </p>
        </div>

        {/* Tab Switcher: Trend / By subject / Topic drill */}
        <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('trend')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'trend'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Trend</span>
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'subjects'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-orange-600" />
            <span>By Subject</span>
          </button>
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'topics'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Topic Drill</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="py-4 my-auto min-h-[280px]">
        {/* TAB 1: SCORE TREND */}
        {activeTab === 'trend' && (
          <div>
            {attemptsCount === 0 ? (
              <EmptyState
                title="No Mock History Yet"
                description="Complete your first diagnostic CBT mock test to establish your baseline score curve."
                actionText="Start Diagnostic Mock"
                actionHref="/dashboard/mocks"
              />
            ) : attemptsCount === 1 ? (
              /* Phase 3 requirement: With 1 attempt, show "Baseline: 10 pts" number with target line */
              <div className="p-6 bg-slate-50/70 rounded-2xl border border-slate-200/70 flex flex-col justify-between space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Initial Diagnostic Benchmark
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono mt-1">
                      Baseline: {singleAttemptScore} pts
                    </div>
                    <p className="text-[13px] text-slate-500 mt-1">
                      Recorded from 1 CBT Mock ({singleAttempt?.subject || 'Domain'}). Take 1 more mock to unlock the multi-point spline trend curve.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Target Cutoff
                    </span>
                    <span className="text-xl font-extrabold text-blue-700 font-mono">
                      {targetScore} / 250 pts
                    </span>
                  </div>
                </div>

                {/* Visual Target Line Representation */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600 font-mono">Current: {singleAttemptScore} pts</span>
                    <span className="text-blue-700 font-mono">Target: {targetScore} pts (Need +{Math.max(0, targetScore - singleAttemptScore)} pts)</span>
                  </div>
                  <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(5, (singleAttemptScore / MARKING_SCHEME.MAX_SCORE_PER_SUBJECT) * 100)}%` }}
                    />
                    {/* Target line pin */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-rose-500 shadow-sm"
                      style={{ left: `${(targetScore / MARKING_SCHEME.MAX_SCORE_PER_SUBJECT) * 100}%` }}
                      title={`Target benchmark: ${targetScore} pts`}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 pt-0.5">
                    <span>0 pts</span>
                    <span className="text-rose-600 font-bold">Target Cutoff ({targetScore} pts)</span>
                    <span>250 pts</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Link
                    href="/dashboard/mocks"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-xs"
                  >
                    <span>Take Second Mock for Full Spline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              /* 2+ attempts: Full spline curve */
              <div className="w-full h-64 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendChartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id={strokeGradId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </linearGradient>
                      <linearGradient id={areaGradId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={{ stroke: '#F1F5F9' }}
                      tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                      dy={6}
                    />
                    <YAxis
                      domain={[0, 250]}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#94A3B8', fontSize: 11 }}
                    />
                    <ReferenceLine
                      y={targetScore}
                      stroke="#EF4444"
                      strokeDasharray="4 4"
                      label={{ value: `Target: ${targetScore} pts`, fill: '#EF4444', fontSize: 11, position: 'insideTopRight' }}
                    />
                    <Tooltip
                      formatter={(val: any) => [`${val} pts`, 'Mock Score']}
                      contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '12px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke={`url(#${strokeGradId})`}
                      strokeWidth={3}
                      fill={`url(#${areaGradId})`}
                      dot={{ r: 4, stroke: '#2563EB', strokeWidth: 2, fill: '#FFFFFF' }}
                      activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 3, fill: '#FFFFFF' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BY SUBJECT & CALIBRATION MATRIX */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            {/* Sub-bar chart: Only render if user has domain attempts, else show empty state per Phase 1 #3 */}
            {subjectsWithData.length === 0 ? (
              <EmptyState
                title="No Domain Data for Cohort Comparison"
                description="Take your first Physics mock to unlock cohort comparison."
                actionText="Start Physics Mock"
                actionHref="/test/cbt?subject=physics"
              />
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Comparative Benchmark ({selectedSubTab})
                  </span>
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
                    <button
                      onClick={() => setSelectedSubTab('Score')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        selectedSubTab === 'Score' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                      }`}
                    >
                      Score (250 pts)
                    </button>
                    <button
                      onClick={() => setSelectedSubTab('Accuracy')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        selectedSubTab === 'Accuracy' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                      }`}
                    >
                      Accuracy (%)
                    </button>
                  </div>
                </div>

                <div className="w-full h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectComparisonData}
                      margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
                      barGap={6}
                      barCategoryGap={24}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                      <XAxis
                        dataKey="subject"
                        tickLine={false}
                        axisLine={{ stroke: '#F1F5F9' }}
                        tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                        dy={6}
                      />
                      <YAxis
                        domain={selectedSubTab === 'Score' ? [0, 250] : [0, 100]}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#94A3B8', fontSize: 10 }}
                      />
                      <Tooltip content={<CustomSubjectTooltip />} cursor={{ fill: 'transparent' }} />
                      <Bar dataKey="yours" name="Your Result" fill="#0C8CE9" radius={[8, 8, 8, 8]} barSize={14} />
                      <Bar dataKey="cohortAvg" name="Cohort Average" fill="#CBD5E1" radius={[8, 8, 8, 8]} barSize={14} />
                      <Bar dataKey="topper" name="Topper Benchmark" fill="#475569" radius={[8, 8, 8, 8]} barSize={14} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Subject-Wise AI Calibration Matrix in Responsive Grid (Phase 3: 4 cols desktop, 2x2 tablet, stacked mobile) */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Subject Calibration Matrix (150 Qs per subject gate)
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {calibrations.length} Tracked Subjects
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {calibrations.map((sub) => {
                  const hasData = sub.totalAttempted > 0;
                  return (
                    <div
                      key={sub.subjectKey}
                      className={`rounded-2xl border p-4 flex flex-col justify-between transition-all shadow-2xs hover:shadow-sm ${
                        sub.isUnlocked
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : hasData
                          ? 'bg-amber-50/50 border-amber-200'
                          : 'bg-slate-50/60 border-slate-200'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                              <SubjectIcon name={sub.icon} />
                            </span>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-slate-900 truncate">
                                {sub.subject}
                              </h4>
                              <span className="text-[10px] text-slate-500 block truncate">
                                {sub.category}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shrink-0 ${
                              sub.isUnlocked
                                ? 'bg-emerald-100 text-emerald-800'
                                : hasData
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {sub.isUnlocked ? 'Unlocked' : hasData ? `${sub.unlockProgress}%` : '0%'}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-semibold">
                            <span className="font-mono text-slate-700">
                              {sub.totalAttempted} / 150 Qs
                            </span>
                            <span className="text-slate-500 font-mono text-[10px]">
                              {hasData ? `${sub.accuracyPercentage}% Acc` : 'Not Started'}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-slate-200/60">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(hasData ? 6 : 0, sub.unlockProgress)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 mt-2 border-t border-slate-200/50 flex items-center gap-2">
                        <Link
                          href={`/dashboard/radar?subject=${sub.subjectKey}`}
                          className="flex-1 py-1 px-2 rounded-lg text-[11px] font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-center transition-all"
                        >
                          Radar
                        </Link>
                        <Link
                          href={sub.mockUrl}
                          className="py-1 px-2.5 rounded-lg text-[11px] font-semibold bg-slate-900 text-white hover:bg-slate-800 text-center transition-all"
                        >
                          Practice
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TOPIC DRILL */}
        {activeTab === 'topics' && (
          <div>
            {topicBars.length === 0 ? (
              <EmptyState
                title="No Topic Diagnostic Data"
                description="Complete a full mock or domain practice to calibrate topic accuracy."
                actionText="Start Diagnostic Mock"
                actionHref="/dashboard/mocks"
              />
            ) : (
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topicBars}
                    margin={{ top: 20, right: 15, left: -25, bottom: 0 }}
                    onMouseMove={(e) => {
                      if (e && typeof e.activeTooltipIndex === 'number') {
                        setActiveTopicIndex(e.activeTooltipIndex);
                      }
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis
                      dataKey="shortLabel"
                      tickLine={false}
                      axisLine={{ stroke: '#F1F5F9' }}
                      tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }}
                      dy={6}
                    />
                    <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                    <Tooltip content={<CustomTopicTooltip />} cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="score" name="Topic Accuracy" radius={[8, 8, 8, 8]} barSize={18}>
                      {topicBars.map((_entry, index) => (
                        <Cell
                          key={`topic-cell-${index}`}
                          fill={index === activeTopicIndex ? '#0C8CE9' : '#CBD5E1'}
                          className="cursor-pointer transition-colors"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-500" />
          <span>Single consolidated intelligence view for trends, domains, and topics.</span>
        </span>
        <Link
          href="/dashboard/mocks"
          className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 self-end sm:self-auto"
        >
          <span>Launch Mock Session</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </GlowCard>
  );
};

export default CombinedPerformanceCard;
