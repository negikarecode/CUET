import React, { useState } from 'react';
import { ArrowUpRight, Atom, FlaskConical, Binary, Languages, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { SUBJECT_PERFORMANCE_LIST } from '../data/mockData';
import { GlowCard } from './GlowCard';

const getSubjectIcon = (subject: string) => {
  switch (subject) {
    case 'Physics':
      return <Atom className="w-4 h-4 text-blue-600" />;
    case 'Chemistry':
      return <FlaskConical className="w-4 h-4 text-orange-600" />;
    case 'Mathematics':
      return <Binary className="w-4 h-4 text-emerald-600" />;
    case 'English':
      return <Languages className="w-4 h-4 text-purple-600" />;
    default:
      return <Atom className="w-4 h-4 text-slate-600" />;
  }
};

const getSubjectBgLight = (subject: string) => {
  switch (subject) {
    case 'Physics':
      return 'bg-blue-50';
    case 'Chemistry':
      return 'bg-orange-50';
    case 'Mathematics':
      return 'bg-emerald-50';
    case 'English':
      return 'bg-purple-50';
    default:
      return 'bg-slate-50';
  }
};

export const SubjectWisePerformance: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  return (
    <GlowCard className="p-6 h-full">
      {/* Header Row */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100/80">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Subject-wise Performance
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Proficiency and percentile benchmarks
          </p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg text-blue-600 hover:text-blue-700 action-glow group"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* List Items (4 Subjects) with Interactive Action Glow on hover */}
      <div className="space-y-4 my-auto py-3">
        {SUBJECT_PERFORMANCE_LIST.map((item) => (
          <div 
            key={item.subject}
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
                    {item.score}%
                  </span>
                </div>
              </div>

              {/* Percentile column on right */}
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-700 bg-slate-100/80 px-2 py-0.5 rounded-md font-mono">
                  {item.percentile} Percentile
                </span>
              </div>
            </div>

            {/* Progress Bar styled in the subject's theme color */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${item.score}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Insights Note */}
      <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          3 of 4 subjects above 80th percentile
        </span>
        <button 
          onClick={() => setShowModal(true)}
          className="font-semibold text-blue-600 px-2 py-0.5 rounded-md action-glow text-[11px]"
        >
          Deep Dive →
        </button>
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
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 action-glow"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 my-4">
              {SUBJECT_PERFORMANCE_LIST.map((subj) => (
                <div key={subj.subject} className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${getSubjectBgLight(subj.subject)} flex items-center justify-center`}>
                      {getSubjectIcon(subj.subject)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{subj.subject}</div>
                      <div className="text-xs text-slate-400">CUET Section II Core</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-slate-900">{subj.score}% Accuracy</div>
                    <div className="text-xs text-emerald-600 font-medium">{subj.percentile}th %ile Rank</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-colors action-glow"
            >
              Done Reviewing
            </button>
          </div>
        </div>
      )}
    </GlowCard>
  );
};
