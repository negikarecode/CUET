import React from "react";
import Link from "next/link";
import { Target, ArrowRight } from "lucide-react";
import { TopicMastery } from "@/types";
import { normalizeSubject } from "@/lib/analytics";

interface StrengthsWeaknessesProps {
  weaknesses?: TopicMastery[];
  strengths?: TopicMastery[];
}

export const StrengthsWeaknesses: React.FC<StrengthsWeaknessesProps> = ({
  weaknesses = [],
}) => {
  const items = weaknesses.slice(0, 3).map((w) => ({
    title: w.chapter || w.microTopic || "Topic to improve",
    accuracy: `${w.accuracyPercentage ?? 0}%`,
    mistakes:
      w.incorrectCount ||
      (w.attemptsCount
        ? Math.round(w.attemptsCount * (1 - (w.accuracyPercentage || 0) / 100))
        : 0),
    subjectKey: normalizeSubject(w.subject || "physics").key,
  }));

  return (
    <div className="bg-white rounded-2xl border border-[#EFE6DC] p-5 sm:p-6 shadow-2xs h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div>
          <h2 className="text-base font-bold text-[#1C1917] tracking-tight">
            Topics to fix
          </h2>
          <p className="text-xs text-[#8C7D73] mt-0.5">
            Priority areas from your practice errors.
          </p>
        </div>

        {/* Content: Real weakness items if available, genuine empty state otherwise */}
        {items.length === 0 ? (
          <div className="py-8 px-2 text-center my-auto space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto border border-purple-200">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Radar Not Calibrated</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Complete practice questions to detect question traps, conceptual blindspots, and priority topics to fix.
              </p>
            </div>
            <Link
              href="/dashboard/practice"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline pt-1"
            >
              <span>Explore Practice Drills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#EFE6DC] mt-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5 min-w-0 pr-2">
                  <h3 className="text-sm font-bold text-[#1C1917] truncate" title={item.title}>
                    {item.title}
                  </h3>
                  <div className="text-xs text-[#786E65]">
                    {item.accuracy} accuracy · {item.mistakes} {item.mistakes === 1 ? "mistake" : "mistakes"}
                  </div>
                </div>

                <Link
                  href={`/dashboard/ai-coach?subject=${item.subjectKey}`}
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 hover:underline shrink-0"
                >
                  AI diagnosis
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StrengthsWeaknesses;
