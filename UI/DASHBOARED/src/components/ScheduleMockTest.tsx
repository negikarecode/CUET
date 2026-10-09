import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronDown, Check, ArrowRight, BookOpen } from 'lucide-react';
import { UpcomingTest } from '../types/dashboard';
import { GlowCard } from './GlowCard';

interface ScheduleMockTestProps {
  onTestScheduled?: (newTest: UpcomingTest) => void;
}

export const ScheduleMockTest: React.FC<ScheduleMockTestProps> = ({ onTestScheduled }) => {
  const [testType, setTestType] = useState('Full Mock Test');
  const [testDate, setTestDate] = useState('2025-05-28');
  const [testTime, setTestTime] = useState('10:00 AM');
  const [duration, setDuration] = useState('3 hours (200 Questions)');
  const [isScheduled, setIsScheduled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduled(true);

    const formattedDate = new Date(testDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newTest: UpcomingTest = {
      id: `test-${Date.now()}`,
      title: `CUET ${testType} - Custom`,
      subtitle: `Mock Session • ${duration}`,
      dateTime: `${formattedDate || 'May 28, 2025'} - ${testTime}`,
      status: 'Ready',
      questions: duration.includes('200') ? 200 : duration.includes('100') ? 100 : 50,
      durationHours: duration.includes('3') ? 3 : duration.includes('2') ? 2 : 1,
    };

    onTestScheduled?.(newTest);

    setTimeout(() => {
      setIsScheduled(false);
    }, 3500);
  };

  return (
    <GlowCard className="p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100/80">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Schedule Mock Test
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Book test slot & simulate exam day
          </p>
        </div>

        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 action-glow">
          <CalendarIcon className="w-4 h-4 text-slate-700" />
        </div>
      </div>

      {/* Integrated Scheduling Form */}
      <form onSubmit={handleSubmit} className="space-y-3 my-auto py-2">
        
        {/* Select Test Type */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Select Test Type
          </label>
          <div className="relative">
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all action-glow"
            >
              <option value="Full Mock Test">Full Mock Test</option>
              <option value="Physics Domain Test">Physics Domain Test</option>
              <option value="Chemistry Domain Test">Chemistry Domain Test</option>
              <option value="Mathematics Sectional">Mathematics Sectional</option>
              <option value="English Speed Drill">English Speed Drill</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Date and Time Pickers in 2 columns */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Select Date */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all action-glow"
              />
            </div>
          </div>

          {/* Select Time */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
              Select Time
            </label>
            <div className="relative">
              <select
                value={testTime}
                onChange={(e) => setTestTime(e.target.value)}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all action-glow"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
                <option value="07:00 PM">07:00 PM</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Duration Dropdown */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Duration
          </label>
          <div className="relative">
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer transition-all action-glow"
            >
              <option value="3 hours (200 Questions)">3 hours (200 Questions)</option>
              <option value="2 hours (120 Questions)">2 hours (120 Questions)</option>
              <option value="1 hour (50 Questions)">1 hour (50 Questions)</option>
              <option value="45 mins (40 Questions)">45 mins (40 Questions)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* CTA Button: Dark pill button "Schedule Test ->" */}
        <div className="pt-1.5">
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
      <div className="pt-2 text-center text-[10px] text-slate-400 font-medium">
        Timed exam simulation with proctored countdown
      </div>
    </GlowCard>
  );
};
