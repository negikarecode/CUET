import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { UpcomingTest } from '@/types/dashboard';
import { MOCK_FORMAT_OPTIONS, formatDateIndian } from '@/lib/config/dashboardConfig';
import { safeStorage } from '@/lib/storage/safe-storage';
import SearchableSelect from '@/components/ui/SearchableSelect';

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
      const existingStr = safeStorage.getItem('cuet_scheduled_mocks');
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const updated = [newTest, ...existing].slice(0, 10);
      safeStorage.setItem('cuet_scheduled_mocks', JSON.stringify(updated));
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
          <SearchableSelect
            ariaLabel="Select Subject"
            value={testType}
            onChange={(val) => setTestType(val)}
            options={[
              { value: "Physics Domain Test", label: "Physics Domain Mock" },
              { value: "Chemistry Domain Test", label: "Chemistry Domain Mock" },
              { value: "Mathematics Sectional", label: "Mathematics Domain Mock" },
              { value: "Environmental Studies Test", label: "Environmental Studies Mock" },
              { value: "English Speed Drill", label: "English Language Drill" },
              { value: "General Test Mock", label: "General Test Multi-Section" },
            ]}
            className="w-full"
            buttonClassName="h-10 bg-white border-[var(--border-strong)] rounded-[8px] px-3 text-[14px] text-[var(--text)] font-normal"
            searchPlaceholder="Search subjects..."
          />
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
            <SearchableSelect
              ariaLabel="Select Time slot"
              value={testTime}
              onChange={(val) => setTestTime(val)}
              options={[
                { value: "09:00 AM", label: "09:00 AM" },
                { value: "10:00 AM", label: "10:00 AM" },
                { value: "02:00 PM", label: "02:00 PM" },
                { value: "04:30 PM", label: "04:30 PM" },
                { value: "07:00 PM", label: "07:00 PM" },
              ]}
              className="w-full"
              buttonClassName="h-10 bg-white border-[var(--border-strong)] rounded-[8px] px-3 text-[14px] text-[var(--text)] font-normal"
              searchPlaceholder="Search time slot..."
            />
          </div>
        </div>

        {/* Format */}
        <div className="space-y-1">
          <label className="block text-[14px] font-medium text-[var(--text-secondary)]">
            Test format
          </label>
          <SearchableSelect
            ariaLabel="Select Test format"
            value={selectedFormatId}
            onChange={(val) => setSelectedFormatId(val)}
            options={MOCK_FORMAT_OPTIONS.map((opt) => ({
              value: opt.id,
              label: opt.label,
            }))}
            className="w-full"
            buttonClassName="h-10 bg-white border-[var(--border-strong)] rounded-[8px] px-3 text-[14px] text-[var(--text)] font-normal"
            searchPlaceholder="Search format..."
          />
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
