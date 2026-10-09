import React, { useState, useId } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  DETAILED_ANALYSIS_DATA, 
  TOPIC_MASTERY_BARS 
} from '../data/mockData';
import { GlowCard } from './GlowCard';
import { BarChart3, Layers } from 'lucide-react';

type TabType = 'Score' | 'Accuracy' | 'Time Taken';
type ViewType = 'comparison' | 'topics';

export const DetailedPerformanceAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Score');
  const [viewType, setViewType] = useState<ViewType>('comparison');
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(5); // Index 5: Modern Physics (tall blue bar)

  const uniqueId = useId().replace(/:/g, '');
  const bluePillGradId = `bluePillGrad_${uniqueId}`;

  // Data for 4 Subjects Comparison
  const getComparisonData = () => {
    switch (activeTab) {
      case 'Accuracy':
        return DETAILED_ANALYSIS_DATA.map(item => ({
          subject: item.subject,
          yours: item.yourAccuracy,
          average: item.averageAccuracy,
          topper: item.topperAccuracy,
          unit: '%',
        }));
      case 'Time Taken':
        return DETAILED_ANALYSIS_DATA.map(item => ({
          subject: item.subject,
          yours: item.yourTime,
          average: item.averageTime,
          topper: item.topperTime,
          unit: ' mins',
        }));
      case 'Score':
      default:
        return DETAILED_ANALYSIS_DATA.map(item => ({
          subject: item.subject,
          yours: item.yourScore,
          average: item.averageScore,
          topper: item.topperScore,
          unit: ' pts',
        }));
    }
  };

  const comparisonData = getComparisonData();

  // Colors — bars keep original blue gradient
  // "Yours" / Active: Vibrant Blue gradient
  // "Average": Soft light grey pill (#E2E8F0)
  // "Topper": Deep slate pill (#475569)
  const barColors = {
    Score: {
      yours: '#2563EB',
      average: '#E2E8F0',
      topper: '#475569',
    },
    Accuracy: {
      yours: '#10B981',
      average: '#E2E8F0',
      topper: '#0F766E',
    },
    'Time Taken': {
      yours: '#F59E0B',
      average: '#E2E8F0',
      topper: '#64748B',
    },
  }[activeTab];

  // Custom Dark Callout Tooltip matching the reference screenshot
  // Black/Charcoal card with downward pointer beak pointing directly to the bar
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      if (viewType === 'topics') {
        const item = payload[0]?.payload;
        return (
          <div className="relative bg-slate-900 text-white rounded-xl shadow-2xl px-3.5 py-2 z-50 border border-slate-800 animate-in fade-in zoom-in-95 duration-100 flex flex-col items-center">
            <div className="text-[11px] font-semibold text-slate-300">
              {item?.topic}
            </div>
            <div className="text-base font-extrabold text-blue-400 font-mono">
              {item?.score}% Mastery
            </div>
            {/* Downward pointer triangle beak */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-slate-800" />
          </div>
        );
      }

      const unit = payload[0]?.payload?.unit || '';
      return (
        <div className="relative bg-slate-900 text-white rounded-xl shadow-2xl p-3 min-w-[180px] z-50 border border-slate-800 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-200">{label}</span>
            <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/80 px-1.5 py-0.5 rounded">
              {activeTab}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Your Score:
              </span>
              <span className="font-bold text-blue-400 font-mono">{payload[0]?.value}{unit}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                Cohort Avg:
              </span>
              <span className="font-bold text-slate-300 font-mono">{payload[1]?.value}{unit}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
                Topper:
              </span>
              <span className="font-bold text-slate-200 font-mono">{payload[2]?.value}{unit}</span>
            </div>
          </div>

          {/* Downward pointer triangle beak */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-slate-800" />
        </div>
      );
    }
    return null;
  };

  return (
    <GlowCard className="p-6 h-full flex flex-col justify-between">
      {/* Header + Segmented Mode Switcher + Pill Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100/80">
        <div>
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Detailed Performance Analysis
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare across cohort benchmarks and topic proficiencies
          </p>
        </div>

        {/* View Toggle & Tabs */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100/80 p-0.5 rounded-xl border border-slate-200/50 text-xs font-semibold">
            <button
              onClick={() => setViewType('comparison')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                viewType === 'comparison'
                  ? 'text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              style={viewType === 'comparison' ? { backgroundColor: '#FF671F' } : {}}
            >
              <BarChart3 className="w-3 h-3" />
              <span>Subjects</span>
            </button>
            <button
              onClick={() => setViewType('topics')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                viewType === 'topics'
                  ? 'text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              style={viewType === 'topics' ? { backgroundColor: '#FF671F' } : {}}
            >
              <Layers className={`w-3 h-3 ${viewType === 'topics' ? 'text-white' : 'text-blue-600'}`} />
              <span>Topic Drill</span>
            </button>
          </div>

          {/* Metric Tabs (only relevant in comparison mode) */}
          {viewType === 'comparison' && (
            <div className="flex items-center p-0.5 bg-slate-100/80 rounded-xl border border-slate-200/50 text-xs font-semibold">
              {(['Score', 'Accuracy', 'Time Taken'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    activeTab === tab
                      ? 'text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  style={activeTab === tab ? { backgroundColor: '#FF671F' } : {}}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Bar Chart Canvas */}
      <div className="w-full h-60 pt-3">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === 'comparison' ? (
            /* 1. SUBJECTS COMPARISON VIEW: Both-sides rounded pill bars with generous spacing */
            <BarChart
              data={comparisonData}
              margin={{ top: 18, right: 15, left: -20, bottom: 0 }}
              barGap={10}
              barCategoryGap={32}
            >
              <defs>
                <linearGradient id={bluePillGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              
              <XAxis 
                dataKey="subject" 
                tickLine={false} 
                axisLine={{ stroke: '#F1F5F9' }}
                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                dy={6}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: '#94A3B8', fontSize: 10 }}
                domain={activeTab === 'Accuracy' ? [0, 100] : activeTab === 'Time Taken' ? [0, 80] : [0, 2000]}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'transparent' }} />

              {/* Bar 1: Your Score - Pill rounded on both top and bottom with generous space */}
              <Bar 
                dataKey="yours" 
                name="Your Score" 
                fill={`url(#${bluePillGradId})`} 
                radius={[12, 12, 12, 12]} 
                barSize={16}
                animationDuration={800}
              />
              {/* Bar 2: Cohort Average - Soft grey pill rounded on both sides */}
              <Bar 
                dataKey="average" 
                name="Cohort Average" 
                fill="#E2E8F0" 
                radius={[12, 12, 12, 12]} 
                barSize={16}
                animationDuration={800}
              />
              {/* Bar 3: Topper - Slate/dark pill rounded on both sides */}
              <Bar 
                dataKey="topper" 
                name="Topper Benchmark" 
                fill="#475569" 
                radius={[12, 12, 12, 12]} 
                barSize={16}
                animationDuration={800}
              />
            </BarChart>
          ) : (
            /* 2. TOPIC MASTERY VIEW (10 BARS MATCHING REFERENCE IMAGE):
               - Pill capsules rounded on both top and bottom
               - Bit space between bars
               - Active blue bar with dark callout badge on top
               - Soft grey pill bars for other topics
            */
            <BarChart
              data={TOPIC_MASTERY_BARS}
              margin={{ top: 25, right: 15, left: -25, bottom: 0 }}
              barCategoryGap="16%"
              onMouseMove={(e) => {
                if (e && typeof e.activeTooltipIndex === 'number') {
                  setActiveTopicIndex(e.activeTooltipIndex);
                }
              }}
            >
              <defs>
                <linearGradient id={bluePillGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />

              <XAxis 
                dataKey="shortLabel" 
                tickLine={false} 
                axisLine={{ stroke: '#F1F5F9' }}
                tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }}
                dy={6}
              />
              <YAxis 
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#94A3B8', fontSize: 10 }}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'transparent' }} />

              <Bar 
                dataKey="score" 
                name="Topic Accuracy" 
                radius={[12, 12, 12, 12]} 
                barSize={20}
                animationDuration={800}
              >
                {TOPIC_MASTERY_BARS.map((entry, index) => {
                  const isHighlighted = index === activeTopicIndex;
                  return (
                    <Cell
                      key={`topic-cell-${index}`}
                      fill={isHighlighted ? `url(#${bluePillGradId})` : '#E2E8F0'}
                      className="cursor-pointer transition-colors duration-200"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Bottom Legend and Summary Notes */}
      <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-3">
        {viewType === 'comparison' ? (
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <div className="flex items-center gap-1.5 p-1 rounded-md action-glow cursor-pointer">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="font-semibold text-slate-800">Your {activeTab === 'Time Taken' ? 'Time' : activeTab}</span>
            </div>
            <div className="flex items-center gap-1.5 p-1 rounded-md action-glow cursor-pointer">
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="text-slate-500">Cohort Average</span>
            </div>
            <div className="flex items-center gap-1.5 p-1 rounded-md action-glow cursor-pointer">
              <span className="w-3 h-3 rounded-full bg-slate-600" />
              <span className="text-slate-500">Topper Score</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="font-semibold text-slate-800">Selected: {TOPIC_MASTERY_BARS[activeTopicIndex]?.topic}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span className="text-slate-500">Other Topics ({TOPIC_MASTERY_BARS.length - 1})</span>
            </div>
          </div>
        )}

      </div>
    </GlowCard>
  );
};

export default DetailedPerformanceAnalysis;
