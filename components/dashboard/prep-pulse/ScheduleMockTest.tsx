import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { UpcomingTest } from '@/types/dashboard';
import { GlowCard } from './GlowCard';
import { MOCK_FORMAT_OPTIONS, formatDateIndian } from '@/lib/config/dashboardConfig';

interface ScheduleMockTestProps {
  onTestScheduled?: (newTest: UpcomingTest) => void;
}

export const ScheduleMockTest: React.FC<ScheduleMockTestProps> = ({ onTestScheduled }) => {
  const todayStr = '2026-10-10'; // System current date baseline
  const [testType, setTestType] = useState('Physics Domain Test');
  const [testDate, setTestDate] = useState(() => {
    // Tomorrow by default
    return '2026-10-11';
  });
  const [testTime, setTestTime] = useState('10:00 AM');
  const defaultFormat = MOCK_FORMAT_OPTIONS[0]!;
  const [selectedFormatId, setSelectedFormatId] = useState<string>(defaultFormat.id);
  const [isScheduled, setIsScheduled] = useState(false);

  const selectedFormat = MOCK_FORMAT_OPTIONS.find((f) => f.id === selectedFormatId) || defaultFormat;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduled(true);

    const formattedDate = formatDateIndian(testDate);

    const newTest: UpcomingTest = {
      id: `test-${Date.now()}`,
      title: `CUET ${testType}`,
      subtitle: `Mock Session • ${selectedFormat.label}`,
      dateTime: `${formattedDate} - ${testTime}`,
      status: 'Ready',
      questions: selectedFormat.questions,
      durationHours: Math.round((selectedFormat.durationMinutes / 60) * 10) / 10,
    };

    try {
      const existingStr = typeof window !== 'undefined' ? localStorage.getItem('cuet_scheduled_mocks') : null;
      const existing = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem('cuet_scheduled_mocks', JSON.stringify([newTest, ...existing]));
    } catch {
      // storage quota or SSR fallback
    }

    onTestScheduled?.(newTest);

    setTimeout(() => {
      setIsScheduled(false);
    }, 3500);
  };

  return (
    <GlowCard className="p-6 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100/80">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Schedule Mock Test
          </h2>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Book test slot &amp; simulate exam day
          </p>
        </div>

        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-200 action-glow">
          <CalendarIcon className="w-4 h-4 text-slate-700" />
        </div>
      </div>

      {/* Integrated Scheduling Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5 my-auto py-2">
        {/* Select Subject / Test Focus */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Subject Focus
          </label>
          <div className="relative">
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all action-glow"
            >
              <option value="Physics Domain Test">Physics Domain Mock</option>
              <option value="Chemistry Domain Test">Chemistry Domain Mock</option>
              <option value="Mathematics Sectional">Mathematics Domain Mock</option>
              <option value="Environmental Studies Test">Environmental Studies Mock</option>
              <option value="English Speed Drill">English Language Drill</option>
              <option value="General Test Mock">General Test Multi-Section</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Date and Time Pickers in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Select Date with clear unambiguous format badge */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Date
              </label>
              <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                {formatDateIndian(testDate)}
              </span>
            </div>
            <div className="relative">
              <input
                type="date"
                min={todayStr}
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all action-glow"
              />
            </div>
          </div>

          {/* Select Time */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Slot Time
            </label>
            <div className="relative">
              <select
                value={testTime}
                onChange={(e) => setTestTime(e.target.value)}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all action-glow"
              >
                <option value="09:00 AM">09:00 AM (Morning Slot)</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="02:00 PM">02:00 PM (Afternoon Slot)</option>
                <option value="04:30 PM">04:30 PM</option>
                <option value="07:00 PM">07:00 PM (Evening Slot)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Duration / Mock Format Option driven by config */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            CUET Mock Format
          </label>
          <div className="relative">
            <select
              value={selectedFormatId}
              onChange={(e) => setSelectedFormatId(e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all action-glow"
            >
              {MOCK_FORMAT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* CTA Button: Dark pill button "Schedule Test ->" */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isScheduled}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
              isScheduled
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-slate-900 text-white hover:bg-slate-800 hover:shadow-[0_0_16px_rgba(56,189,248,0.5)] active:scale-[0.98]'
            }`}
          >
            {isScheduled ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Slot Booked Successfully!</span>
              </>
            ) : (
              <>
                <span>Schedule Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Subtle reassurance */}
      <div className="pt-2 text-center text-[11px] text-slate-400 font-medium">
        Timed exam simulation with NTA proctored interface
      </div>
    </GlowCard>
  );
};

export default ScheduleMockTest;
