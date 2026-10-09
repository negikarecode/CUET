import React, { useState, useId } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  ChevronDown, 
  Layers, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Flame,
  Award
} from 'lucide-react';
import { 
  SMOOTH_CHART_12_MONTHS, 
  SCORE_TREND_DATA, 
  MonthlySmoothDataPoint 
} from '../data/mockData';
import { GlowCard } from './GlowCard';

interface SubjectConfig {
  key: 'Physics' | 'Chemistry' | 'Maths' | 'English';
  label: string;
  color: string;
  lightBg: string;
}

const SUBJECT_CONFIGS: SubjectConfig[] = [
  { key: 'Physics', label: 'Physics', color: '#3B82F6', lightBg: '#EFF6FF' },
  { key: 'Chemistry', label: 'Chemistry', color: '#F97316', lightBg: '#FFF7ED' },
  { key: 'Maths', label: 'Maths', color: '#10B981', lightBg: '#ECFDF5' },
  { key: 'English', label: 'English', color: '#8B5CF6', lightBg: '#F5F3FF' },
];

// Custom Active Pin Component matching the reference screenshot exactly:
// 1. Tooltip card with white background, rounded corners, drop shadow, and downward pointer beak
// 2. Center-white ring dot with thick coral stroke on the curve peak
// 3. Vertical gradient drop guide line extending to the baseline
interface CustomActivePinProps {
  cx?: number;
  cy?: number;
  index?: number;
  value?: any;
  height?: number;
  activeIndex: number;
  gradientId: string;
  shadowId: string;
  payload?: any;
}

const CustomActivePin: React.FC<CustomActivePinProps> = ({
  cx = 0,
  cy = 0,
  index = 0,
  value,
  height = 220,
  activeIndex,
  gradientId,
  shadowId,
  payload,
}) => {
  if (index !== activeIndex) return null;

  // Resolve display score: in AreaChart props.value can be [0, val]
  const displayScore = payload?.score ?? (Array.isArray(value) ? value[1] : value) ?? 250;
  
  // Baseline right above X-axis (margin.top is 48)
  const chartBottom = height + 48;

  return (
    <g key={`active-pin-${index}`} className="pointer-events-none transition-all duration-300">
      {/* 1. Vertical Gradient Guide Line from circle down to bottom */}
      <line
        x1={cx}
        y1={cy + 6}
        x2={cx}
        y2={chartBottom}
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* 2. Circular Ring Dot with Pure White Center & Coral Red Border */}
      <circle
        cx={cx}
        cy={cy}
        r={6.5}
        fill="#FFFFFF"
        stroke="#FF5E62"
        strokeWidth={3}
      />

      {/* 3. Floating Tooltip Badge with Downward Pointer Beak */}
      <g filter={`url(#${shadowId})`}>
        {/* Tooltip Card Rect */}
        <rect
          x={cx - 29}
          y={cy - 48}
          width={58}
          height={34}
          rx={8}
          ry={8}
          fill="#FFFFFF"
          stroke="#F8FAFC"
          strokeWidth={1}
        />
        {/* Downward Pointer Triangle */}
        <polygon
          points={`${cx - 5.5},${cy - 14.5} ${cx + 5.5},${cy - 14.5} ${cx},${cy - 8.5}`}
          fill="#FFFFFF"
        />
        {/* Value Text (e.g. "250") */}
        <text
          x={cx}
          y={cy - 31}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#64748B"
          fontSize={15}
          fontWeight={700}
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        >
          {displayScore}
        </text>
      </g>
    </g>
  );
};

export const ScoreImprovementTrend: React.FC = () => {
  const chartUniqueId = useId().replace(/:/g, '');
  const strokeGradId = `strokeGrad_${chartUniqueId}`;
  const areaGradId = `areaGrad_${chartUniqueId}`;
  const verticalPinGradId = `verticalPinGrad_${chartUniqueId}`;
  const badgeShadowId = `badgeShadow_${chartUniqueId}`;

  // Time filter state
  const [selectedRange, setSelectedRange] = useState<'12M' | '6M' | '30D'>('12M');
  
  // View mode: 'overall' (matches reference image) or 'breakdown' (subject lines)
  const [viewMode, setViewMode] = useState<'overall' | 'breakdown'>('overall');

  // Active highlighted point: default to index 4 ("May", value 250) matching reference image
  const [pinnedIndex, setPinnedIndex] = useState<number>(4);
  const [activeIndex, setActiveIndex] = useState<number>(4);

  // Subject toggles for breakdown mode
  const [activeSubjects, setActiveSubjects] = useState<Record<string, boolean>>({
    Physics: true,
    Chemistry: true,
    Maths: true,
    English: true,
  });

  const toggleSubject = (subjectKey: string) => {
    setActiveSubjects(prev => {
      const next = { ...prev, [subjectKey]: !prev[subjectKey] };
      const hasAny = Object.values(next).some(Boolean);
      return hasAny ? next : prev;
    });
  };

  // Filter 12-month data based on range
  const chartData = React.useMemo(() => {
    if (selectedRange === '6M') {
      return SMOOTH_CHART_12_MONTHS.slice(0, 6);
    }
    if (selectedRange === '30D') {
      return SMOOTH_CHART_12_MONTHS.slice(2, 6);
    }
    return SMOOTH_CHART_12_MONTHS;
  }, [selectedRange]);

  const currentFocusedPoint = chartData[activeIndex] || chartData[4] || chartData[0];

  // Tooltip for Subject Breakdown mode
  const BreakdownTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const pointData = payload[0]?.payload;
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-3.5 min-w-[210px] z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800">
              {pointData?.month || label} 2025
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Overall: {pointData?.score} pts
            </span>
          </div>

          <div className="space-y-1.5">
            {SUBJECT_CONFIGS.map(({ key, label: sLabel, color }) => {
              const val = pointData?.[key];
              if (val === undefined || !activeSubjects[key]) return null;
              return (
                <div key={key} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2.5 h-2.5 rounded-full ring-2 ring-white" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-slate-600 font-medium">{sLabel}</span>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">{val}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <GlowCard className="p-6 h-full flex flex-col justify-between">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100/80">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Score Improvement Trend
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/60 action-glow">
              <TrendingUp className="w-3 h-3 stroke-[2.5]" /> +19.4% Growth
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized mock test progression across the annual preparation cycle
          </p>
        </div>

        {/* View Switcher & Time Filter Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Segmented View Switcher */}
          <div className="flex items-center bg-slate-100/80 p-0.5 rounded-xl border border-slate-200/60 text-xs font-semibold">
            <button
              onClick={() => setViewMode('overall')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'overall'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3 h-3 text-orange-500" />
              <span>Overall Trend</span>
            </button>
            <button
              onClick={() => setViewMode('breakdown')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'breakdown'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-3 h-3 text-blue-500" />
              <span>By Subject</span>
            </button>
          </div>

          {/* Time Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value as any)}
              className="appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-xs font-semibold text-slate-700 pl-3 pr-8 py-1.5 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20 action-glow"
            >
              <option value="12M">Full Year (12M)</option>
              <option value="6M">Last 6 Months</option>
              <option value="30D">Last 30 Days</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Interactive Status & Key Metrics Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 pb-1 text-xs">
        {viewMode === 'overall' ? (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Active Focus: <strong className="text-slate-900 font-bold">{currentFocusedPoint?.month}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Score Benchmark: <strong className="text-slate-900 font-bold">{currentFocusedPoint?.score} pts</strong></span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-emerald-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Percentile: {currentFocusedPoint?.percentile || 88.5}th %ile</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Filter:
            </span>
            {SUBJECT_CONFIGS.map(({ key, label, color, lightBg }) => {
              const isActive = activeSubjects[key];
              return (
                <button
                  key={key}
                  onClick={() => toggleSubject(key)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all action-glow ${
                    isActive 
                      ? 'border shadow-2xs' 
                      : 'opacity-40 grayscale border border-dashed border-slate-200 hover:opacity-75'
                  }`}
                  style={{
                    backgroundColor: isActive ? lightBg : 'transparent',
                    borderColor: isActive ? `${color}50` : '#E2E8F0',
                    color: isActive ? color : '#64748B',
                  }}
                >
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: color }}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 ml-auto">
          <span>Target Cutoff: <strong className="text-slate-700 font-mono">250+ pts</strong></span>
        </div>
      </div>

      {/* Main Chart Canvas with subtle left accent line matching reference image */}
      <div className="relative w-full h-72 sm:h-80 pt-2 pl-1 sm:pl-2">
        {/* Left vertical amber accent line matching reference image */}
        <div 
          className="absolute left-0 top-12 bottom-9 w-0.5 bg-amber-400/30 rounded-full pointer-events-none"
          aria-hidden="true" 
        />

        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'overall' ? (
            /* EXACT SMOOTH SPLINE AREA CHART FROM REFERENCE IMAGE */
            <AreaChart
              data={chartData}
              margin={{ top: 48, right: 16, left: 6, bottom: 20 }}
              onMouseMove={(e) => {
                if (e && typeof e.activeTooltipIndex === 'number') {
                  setActiveIndex(e.activeTooltipIndex);
                }
              }}
              onMouseLeave={() => {
                setActiveIndex(pinnedIndex);
              }}
              onClick={(e) => {
                if (e && typeof e.activeTooltipIndex === 'number') {
                  setPinnedIndex(e.activeTooltipIndex);
                  setActiveIndex(e.activeTooltipIndex);
                }
              }}
            >
              <defs>
                {/* 1. Multi-stop Gradient Stroke: Amber -> Coral -> Crimson */}
                <linearGradient id={strokeGradId} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFA03A" />
                  <stop offset="25%" stopColor="#FF7A45" />
                  <stop offset="48%" stopColor="#FF5E62" />
                  <stop offset="72%" stopColor="#FF3E75" />
                  <stop offset="100%" stopColor="#FF2665" />
                </linearGradient>

                {/* 2. Subtle Warm Area Fill Gradient: Soft peach fading to transparent */}
                <linearGradient id={areaGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF5E62" stopOpacity={0.20} />
                  <stop offset="40%" stopColor="#FFA03A" stopOpacity={0.08} />
                  <stop offset="90%" stopColor="#FFA03A" stopOpacity={0.01} />
                  <stop offset="100%" stopColor="#FFA03A" stopOpacity={0.0} />
                </linearGradient>

                {/* 3. Vertical Guide Drop Line Gradient: Coral to Warm Peach */}
                <linearGradient id={verticalPinGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF5E62" stopOpacity={0.9} />
                  <stop offset="60%" stopColor="#FFA03A" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#FFA03A" stopOpacity={0.08} />
                </linearGradient>

                {/* 4. Soft Floating Box Shadow for Tooltip Badge */}
                <filter id={badgeShadowId} x="-25%" y="-25%" width="150%" height="160%">
                  <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.09" />
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.04" />
                </filter>
              </defs>

              {/* Warm Dashed Horizontal Gridlines matching reference screenshot */}
              <CartesianGrid 
                strokeDasharray="4 4" 
                stroke="#FCE6D5" 
                vertical={false} 
              />

              {/* Clean Minimalist X-Axis with 12 Months */}
              <XAxis 
                dataKey="monthShort" 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />

              {/* Y-Axis: Hidden tick values for edge-to-edge clean aesthetic matching reference image */}
              <YAxis 
                domain={[90, 310]}
                ticks={[100, 150, 200, 250, 300]}
                tickLine={false}
                axisLine={false}
                tick={false}
                width={0}
              />

              {/* Ultra-Smooth Spline Curve with Dynamic Active Pin Dot */}
              <Area
                type="monotone"
                dataKey="score"
                stroke={`url(#${strokeGradId})`}
                strokeWidth={3}
                fill={`url(#${areaGradId})`}
                strokeLinecap="round"
                animationDuration={900}
                dot={
                  <CustomActivePin 
                    activeIndex={activeIndex}
                    gradientId={verticalPinGradId}
                    shadowId={badgeShadowId}
                  />
                }
              />
            </AreaChart>
          ) : (
            /* SUBJECT BREAKDOWN MULTI-LINE SPLINE VIEW */
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 16, left: -20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis 
                dataKey="monthShort" 
                tickLine={false} 
                axisLine={{ stroke: '#F1F5F9' }}
                tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }}
                dy={8}
              />
              <YAxis 
                domain={[800, 2000]}
                ticks={[800, 1200, 1600, 2000]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#94A3B8', fontSize: 11 }}
                dx={-5}
              />
              <Tooltip content={<BreakdownTooltip />} />

              {activeSubjects.Physics && (
                <Line
                  type="monotone"
                  dataKey="Physics"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 3.5, stroke: '#3B82F6', strokeWidth: 2, fill: '#FFFFFF' }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 3, fill: '#FFFFFF' }}
                  animationDuration={1000}
                />
              )}

              {activeSubjects.Chemistry && (
                <Line
                  type="monotone"
                  dataKey="Chemistry"
                  stroke="#F97316"
                  strokeWidth={3}
                  dot={{ r: 3.5, stroke: '#F97316', strokeWidth: 2, fill: '#FFFFFF' }}
                  activeDot={{ r: 6, stroke: '#F97316', strokeWidth: 3, fill: '#FFFFFF' }}
                  animationDuration={1000}
                />
              )}

              {activeSubjects.Maths && (
                <Line
                  type="monotone"
                  dataKey="Maths"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 3.5, stroke: '#10B981', strokeWidth: 2, fill: '#FFFFFF' }}
                  activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 3, fill: '#FFFFFF' }}
                  animationDuration={1000}
                />
              )}

              {activeSubjects.English && (
                <Line
                  type="monotone"
                  dataKey="English"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 3.5, stroke: '#8B5CF6', strokeWidth: 2, fill: '#FFFFFF' }}
                  activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 3, fill: '#FFFFFF' }}
                  animationDuration={1000}
                />
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Note & Legend */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          Interactive smooth spline chart matching reference design. Hover over any month or click to lock pin.
        </span>
        <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-[11px]">
          <span className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 action-glow">
            May Peak: 250 pts
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold action-glow">
            Predicted: 275+ (Dec)
          </span>
        </div>
      </div>
    </GlowCard>
  );
};

export default ScoreImprovementTrend;
