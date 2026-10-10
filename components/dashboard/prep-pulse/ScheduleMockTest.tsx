import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { UpcomingTest } from '@/types/dashboard';
import { MOCK_FORMAT_OPTIONS, formatDateIndian } from '@/lib/config/dashboardConfig';

interface ScheduleMockTestProps {
  onTestScheduled?: (newTest: UpcomingTest) => void;
}

export const ScheduleMockTest: React.FC<ScheduleMockTestProps> = ({ onTestScheduled }) => {
  const todayStr = '2026-10-10';
  const [testType, setTestType] = useState('Physics Domain Test');
  const [testDate, setTestDate] = useState('2026-10-11');
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
      subtitle: `Mock session • ${selectedFormat.label}`,
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
      // storage quota fallback
    }

    onTestScheduled?.(newTest);

    setTimeout(() => {
      setIsScheduled(false);
    }, 3000);
  };

  return (
    <div className="app-card space-y-4">
      {/* Header */}
      <div className="border-b border-[var(--border)] pb-3">
        <h2 className="text-[16px] font-semibold text-[var(--text)]">
          Schedule mock test
        </h2>
        <p className="text-[14px] text-[var(--text-secondary)] mt-0.5">
          Plan an upcoming practice test session.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Subject */}
        <div className="space-y-1">
          <label className="block text-[14px] font-medium text-[var(--text-secondary)]">
            Subject
          </label>
          <div className="relative">
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="w-full h-10 appearance-none bg-white border border-[var(--border-strong)] rounded-[8px] px-3 text-[14px] text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer pr-9"
            >
              <option value="Physics Domain Test">Physics Domain Mock</option>
              <option value="Chemistry Domain Test">Chemistry Domain Mock</option>
              <option value="Mathematics Sectional">Mathematics Domain Mock</option>
              <option value="Environmental Studies Test">Environmental Studies Mock</option>
              <option value="English Speed Drill">English Language Drill</option>
              <option value="General Test Mock">General Test Multi-Section</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-[14px] font-medium text-[var(--text-secondary)]">
              Date
            </label>
            <input
              type="date"
              min={todayStr}
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full h-10 bg-white border border-[var(--border-strong)] rounded-[8px] px-3 text-[14px] text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[14px] font-medium text-[var(--text-secondary)]">
              Time slot
            </label>
            <div className="relative">
              <select
                value={testTime}
                onChange={(e) => setTestTime(e.target.value)}
                className="w-full h-10 appearance-none bg-white border border-[var(--border-strong)] rounded-[8px] px-3 text-[14px] text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer pr-9"
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
                <option value="07:00 PM">07:00 PM</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Format */}
        <div className="space-y-1">
          <label className="block text-[14px] font-medium text-[var(--text-secondary)]">
            Test format
          </label>
          <div className="relative">
            <select
              value={selectedFormatId}
              onChange={(e) => setSelectedFormatId(e.target.value)}
              className="w-full h-10 appearance-none bg-white border border-[var(--border-strong)] rounded-[8px] px-3 text-[14px] text-[var(--text)] focus:outline-none focus:border-[var(--accent)] cursor-pointer pr-9"
            >
              {MOCK_FORMAT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isScheduled}
            className={`w-full h-10 px-4 rounded-[8px] text-[14px] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              isScheduled
                ? 'bg-[var(--success)] text-white'
                : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white'
            }`}
          >
            {isScheduled ? (
              <>
                <Check className="w-4 h-4" />
                <span>Test scheduled</span>
              </>
            ) : (
              <span>Schedule test</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleMockTest;
