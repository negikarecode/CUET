import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  MoreVertical, 
  FileText, 
  Atom, 
  Play, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2,
  X,
  AlertCircle
} from 'lucide-react';
import { UpcomingTest } from '../types/dashboard';
import { GlowCard } from './GlowCard';

interface UpcomingMockTestsProps {
  tests: UpcomingTest[];
  onStartTest?: (test: UpcomingTest) => void;
}

export const UpcomingMockTests: React.FC<UpcomingMockTestsProps> = ({ tests, onStartTest }) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [activeModalTest, setActiveModalTest] = useState<UpcomingTest | null>(null);

  const getStatusBadge = (status: 'Ready' | 'Scheduled' | 'Completed') => {
    switch (status) {
      case 'Ready':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs action-glow cursor-pointer">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Ready
          </span>
        );
      case 'Scheduled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs action-glow cursor-pointer">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            Scheduled
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 action-glow cursor-default">
            Completed
          </span>
        );
    }
  };

  const getTestIcon = (title: string) => {
    if (title.toLowerCase().includes('physics')) {
      return (
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          <Atom className="w-5 h-5" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
        <FileText className="w-5 h-5" />
      </div>
    );
  };

  return (
    <GlowCard className="p-6 h-full">
      {/* Header Row */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100/80">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Upcoming Mock Tests
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered test sessions & proctored mocks
          </p>
        </div>

        <button 
          onClick={() => setActiveModalTest(tests[0])}
          className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg text-blue-600 hover:text-blue-700 action-glow group"
        >
          <span>View All</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* List / Table Rows */}
      <div className="divide-y divide-slate-100 my-auto py-1">
        {tests.map((test) => (
          <div 
            key={test.id}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 -mx-2 px-2 rounded-xl transition-all relative group border border-transparent hover:border-slate-200/50"
          >
            {/* Left: Icon & Details */}
            <div className="flex items-start sm:items-center gap-3.5">
              {getTestIcon(test.title)}
              
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">
                    {test.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  {test.subtitle}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 sm:hidden">
                  <span className="font-semibold text-slate-600">{test.dateTime}</span>
                </div>
              </div>
            </div>

            {/* Right: Date, Status Badge & Context Menu */}
            <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto border-t sm:border-0 border-slate-100 pt-2 sm:pt-0">
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-600 font-mono">
                {test.dateTime}
              </span>

              <div 
                onClick={() => {
                  if (test.status === 'Ready') {
                    setActiveModalTest(test);
                  }
                }}
              >
                {getStatusBadge(test.status)}
              </div>

              {/* Context menu ... with action-glow */}
              <div className="relative">
                <button
                  onClick={() => setActiveMenuId(activeMenuId === test.id ? null : test.id)}
                  aria-label="Options"
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors action-glow"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>

                {activeMenuId === test.id && (
                  <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-40 animate-in fade-in zoom-in-95 duration-100">
                    <button
                      onClick={() => {
                        setActiveModalTest(test);
                        setActiveMenuId(null);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium action-glow"
                    >
                      <Play className="w-3.5 h-3.5 text-blue-600" />
                      <span>{test.status === 'Ready' ? 'Start Mock Test' : 'Test Instructions'}</span>
                    </button>
                    <button
                      onClick={() => setActiveMenuId(null)}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 action-glow"
                    >
                      <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reschedule Slot</span>
                    </button>
                    <button
                      onClick={() => setActiveMenuId(null)}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 action-glow"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>View Test Syllabus</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Footer reassurance */}
      <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
        <span>Mock window opens 15 mins prior to start time</span>
        <span className="font-semibold text-slate-700 px-2 py-0.5 rounded bg-slate-50 action-glow cursor-default">NTA Standard Exam Interface</span>
      </div>

      {/* Test Launch Modal */}
      {activeModalTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{activeModalTest.title}</h3>
                  <p className="text-xs text-slate-500">{activeModalTest.dateTime}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModalTest(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 action-glow"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-5 space-y-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Pattern:</span>
                  <span className="font-bold text-slate-800">CUET UG 2025 Standard</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Questions:</span>
                  <span className="font-bold text-slate-800">200 Multiple Choice</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Marking Scheme:</span>
                  <span className="font-bold text-emerald-600">+5 Correct, -1 Incorrect</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-bold text-slate-800">180 Minutes (3.0 Hours)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Webcam and full screen proctoring will activate upon start.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveModalTest(null)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl text-xs transition-colors action-glow"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Starting ${activeModalTest.title} in exam mode! Good luck, Sarah!`);
                  setActiveModalTest(null);
                }}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm shadow-blue-500/20 action-glow"
              >
                Launch Mock Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </GlowCard>
  );
};
