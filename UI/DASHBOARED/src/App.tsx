import React, { useState } from 'react';
import { Header } from './components/Header';
import { WelcomeBanner } from './components/WelcomeBanner';
import { TopMetricsRow } from './components/TopMetricsRow';
import { ScoreImprovementTrend } from './components/ScoreImprovementTrend';
import { SubjectWisePerformance } from './components/SubjectWisePerformance';
import { DetailedPerformanceAnalysis } from './components/DetailedPerformanceAnalysis';
import { StrengthsWeaknesses } from './components/StrengthsWeaknesses';
import { ScheduleMockTest } from './components/ScheduleMockTest';
import { DailyPracticeCalendar } from './components/DailyPracticeCalendar';
import { UpcomingTest } from './types/dashboard';
import { CheckCircle2, GraduationCap } from 'lucide-react';

export const App: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const handleTestScheduled = (newTest: UpcomingTest) => {
    setToastMessage(`Mock Test "${newTest.title}" scheduled for ${newTest.dateTime}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSearch = (query: string) => {
    setSearchFilter(query.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Navigation Header */}
      <Header onSearch={handleSearch} />

      {/* Main Content Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Search Feedback Banner if active */}
        {searchFilter && (
          <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-3 px-4 flex items-center justify-between text-xs text-blue-900">
            <span className="font-medium">
              Filtering dashboard insights matching: <strong className="font-bold">"{searchFilter}"</strong>
            </span>
            <button 
              onClick={() => setSearchFilter('')}
              className="text-blue-600 hover:text-blue-800 font-semibold underline"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* 2. Welcome & Banner Row */}
        <section aria-label="Welcome and Motivation">
          <WelcomeBanner />
        </section>

        {/* 3. Top Metrics Row (3 Cards matching design inspiration) */}
        <section aria-label="Top Metrics">
          <TopMetricsRow />
        </section>

        {/* 4. Main Performance Charts (2 Columns: ~65% / 35%) */}
        <section aria-label="Performance Charts" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Score Improvement Trend (~65% width) */}
          <div className="lg:col-span-8">
            <ScoreImprovementTrend />
          </div>

          {/* Right Card: Subject-wise Performance (~35% width) */}
          <div className="lg:col-span-4">
            <SubjectWisePerformance />
          </div>
        </section>

        {/* 5. Detailed Analytics & AI Diagnostic Suggestions (2 Columns: 8 cols / 4 cols) */}
        <section aria-label="Detailed Analytics" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Detailed Performance Analysis (8 cols - matches Score Improvement Trend) */}
          <div className="lg:col-span-8">
            <DetailedPerformanceAnalysis />
          </div>

          {/* Card 2: Strengths & Weaknesses (4 cols - matches Subject-wise Performance) */}
          <div className="lg:col-span-4">
            <StrengthsWeaknesses />
          </div>
        </section>

        {/* 6. Bottom Row: Schedule Mock Test (50%) & Daily Practice Heatmap (50%) */}
        <section aria-label="Schedule Test and Activity Heatmap" className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Left Card: Schedule Mock Test (Moved in place of Upcoming Mock Tests) */}
          <div>
            <ScheduleMockTest onTestScheduled={handleTestScheduled} />
          </div>

          {/* Right Card: Activity Heatmap (Only Activity Heatmap in that card) */}
          <div>
            <DailyPracticeCalendar />
          </div>
        </section>

      </main>

      {/* Minimal Clean Footer */}
      <footer className="w-full bg-white border-t border-slate-100 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-600">CUET UG 2025 Test-Prep Analytics</span>
            <span>•</span>
            <span>Standardized NTA Percentile Engine</span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Syllabus Guide</span>
            <span className="hover:text-slate-600 cursor-pointer">Score Normalization</span>
            <span className="hover:text-slate-600 cursor-pointer">Mock Test Rules</span>
            <span className="hover:text-slate-600 cursor-pointer">Support</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
