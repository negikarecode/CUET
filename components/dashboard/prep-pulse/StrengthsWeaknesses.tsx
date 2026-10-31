import React from "react";
import Link from "next/link";
import { TopicMastery } from "@/types";
import { normalizeSubject } from "@/lib/analytics";

interface StrengthsWeaknessesProps {
  weaknesses?: TopicMastery[];
  strengths?: TopicMastery[];
}

export const StrengthsWeaknesses: React.FC<StrengthsWeaknessesProps> = ({
  weaknesses = [],
}) => {
  // Fallback sample items matching design.pdf Page 1 if user has no recorded weaknesses yet
  const defaultItems = [
    {
      title: "Electrostatic Potential and Capacitance",
      accuracy: "0%",
      mistakes: 14,
      subjectKey: "physics",
    },
    {
      title: "Electromagnetic Waves",
      accuracy: "0%",
      mistakes: 13,
      subjectKey: "physics",
    },
    {
      title: "Alternating Current",
      accuracy: "9%",
      mistakes: 10,
      subjectKey: "physics",
    },
  ];

  // If weaknesses exist, map them, else use default items from design.pdf
  const items =
    weaknesses.length > 0
      ? weaknesses.slice(0, 3).map((w) => ({
          title: w.chapter || w.microTopic || "Topic to improve",
          accuracy: `${w.accuracyPercentage ?? 0}%`,
          mistakes: w.incorrectCount || (w.attemptsCount ? Math.round(w.attemptsCount * (1 - (w.accuracyPercentage || 0) / 100)) : 10),
          subjectKey: normalizeSubject(w.subject || "physics").key,
        }))
      : defaultItems;

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

        {/* List of items */}
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
                  {item.accuracy} accuracy · {item.mistakes} mistakes
                </div>
              </div>

              <Link
                href={`/dashboard/ai-coach?subject=${item.subjectKey}`}
                className="text-xs font-semibold text-[#C2410C] hover:underline shrink-0"
              >
                AI diagnosis
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrengthsWeaknesses;
