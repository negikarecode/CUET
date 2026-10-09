import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Atom, FlaskConical, Binary, Languages, CheckCircle2, X, Calculator, Target } from 'lucide-react';
import { SubjectCalibrationData } from '@/types';
import { GlowCard } from './GlowCard';

interface SubjectWisePerformanceProps {
  calibrations?: SubjectCalibrationData[];
}

const getSubjectIcon = (subject: string) => {
  const s = subject.toLowerCase();
  if (s.includes('phys')) return <Atom className="w-4 h-4 text-blue-600" />;
  if (s.includes('chem')) return <FlaskConical className="w-4 h-4 text-orange-600" />;
  if (s.includes('math')) return <Binary className="w-4 h-4 text-emerald-600" />;
  if (s.includes('eng')) return <Languages className="w-4 h-4 text-purple-600" />;
  if (s.includes('acc') || s.includes('calc')) return <Calculator className="w-4 h-4 text-emerald-600" />;
  return <Target className="w-4 h-4 text-slate-600" />;
};

const getSubjectBgLight = (subject: string) => {
  const s = subject.toLowerCase();
  if (s.includes('phys')) return 'bg-blue-50';
  if (s.includes('chem')) return 'bg-orange-50';
  if (s.includes('math')) return 'bg-emerald-50';
  if (s.includes('eng')) return 'bg-purple-50';
  if (s.includes('acc')) return 'bg-emerald-50';
  return 'bg-slate-50';
};

const getSubjectColor = (subject: string) => {
  const s = subject.toLowerCase();
  if (s.includes('phys')) return '#3B82F6';
  if (s.includes('chem')) return '#F97316';
  if (s.includes('math')) return '#10B981';
  if (s.includes('eng')) return '#8B5CF6';
  if (s.includes('acc')) return '#10B981';
  return '#64748B';
};

export const SubjectWisePerformance: React.FC<SubjectWisePerformanceProps> = ({
  calibrations = [],
}) => {
  const [showModal, setShowModal] = useState(false);
  const [_selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Take candidate calibrations or default 4 domains
  const displaySubjects = calibrations.length > 0 ? calibrations.slice(0, 4) : [];
  const subjectsAbove80 = displaySubjects.filter(s => s.totalAttempted > 0 && s.accuracyPercentage >= 80).length;
  const attemptedSubjectsCount = displaySubjects.filter(s => s.totalAttempted > 0).length;

  return (
    <GlowCard className="p-6 h-full flex flex-col justify-between">
      {/* Header Row */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100/80">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Subject-wise Performance
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Domain proficiency & accuracy benchmarks
          </p>
        </div>

        {displaySubjects.length > 0 && (
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg text-blue-600 hover:text-blue-700 action-glow group cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        )}
      </div>

      {/* List Items */}
      {displaySubjects.length > 0 ? (
        <div className="space-y-4 my-auto py-3">
          {displaySubjects.map((item) => {
            const hasData = item.totalAttempted > 0;
            const color = getSubjectColor(item.subject);

            return (
              <div 
                key={item.subjectKey}
                onClick={() => setSelectedSubject(item.subject)}
                className="p-3 -mx-2 rounded-xl hover:bg-slate-50/80 transition-all cursor-pointer group border border-transparent hover:border-slate-200/50 action-glow"
              >
                {/* Top row: Icon + Name + Percentage label and Percentile badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${getSubjectBgLight(item.subject)} flex items-center justify-center shrink-0 shadow-2xs`}>
                      {getSubjectIcon(item.subject)}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {item.subject}
                      </span>
                      <span className="text-xs font-bold text-slate-900 ml-2">
                        {hasData ? `${item.accuracyPercentage}%` : '--'}
                      </span>
                    </div>
                  </div>

                  {/* Percentile column on right */}
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-700 bg-slate-100/80 px-2 py-0.5 rounded-md font-mono">
                      {hasData ? `${item.totalAttempted} Qs Attempted` : 'Not Started'}
                    </span>
                  </div>
                </div>

                {/* Progress Bar styled in the subject's theme color */}
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: hasData ? `${item.accuracyPercentage}%` : '0%',
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-500">
            Configure your target stream subjects to populate domain performance.
          </p>
        </div>
      )}

      {/* Bottom Insights Note */}
      <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className={`w-3.5 h-3.5 ${subjectsAbove80 > 0 ? "text-emerald-500" : "text-slate-400"}`} />
          {attemptedSubjectsCount > 0
            ? `${subjectsAbove80} of ${displaySubjects.length} subjects above 80% accuracy`
            : "Complete domain mocks to calibrate proficiency"}
        </span>
        {displaySubjects.length > 0 && (
          <button 
            onClick={() => setShowModal(true)}
            className="font-semibold text-blue-600 px-2 py-0.5 rounded-md action-glow text-[11px] cursor-pointer"
          >
            Deep Dive →
          </button>
        )}
      </div>

      {/* Subject Deep Dive Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  %
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Subject Performance Breakdown</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 action-glow cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 my-4">
              {displaySubjects.map((subj) => {
                const hasData = subj.totalAttempted > 0;
                return (
                  <div key={subj.subjectKey} className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${getSubjectBgLight(subj.subject)} flex items-center justify-center`}>
                        {getSubjectIcon(subj.subject)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{subj.subject}</div>
                        <div className="text-xs text-slate-400">CUET Domain Core · {subj.category || "Section II"}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-slate-900">
                        {hasData ? `${subj.accuracyPercentage}% Accuracy` : "Not Calibrated"}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {hasData ? `${subj.totalAttempted} / 150 Qs` : "0 Qs attempted"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Link
                href="/dashboard/mocks"
                className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-xs text-center transition-all action-glow"
              >
                Launch Mock Practice
              </Link>
              <button
                onClick={() => setShowModal(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </GlowCard>
  );
};
