"use client";

import React from "react";
import { Image as ImageIcon } from "lucide-react";
import { Question } from "@/types";

interface CBTDiagramViewerProps {
  question: Question;
}

export default function CBTDiagramViewer({ question }: CBTDiagramViewerProps) {
  if (!question.hasDiagram && !question.diagramDescription) {
    return null;
  }

  const desc = question.diagramDescription || "Schematic diagram for question reference";
  const subject = (question.subjectId || "").toLowerCase();
  const topic = (question.topic || "").toLowerCase();
  const chapter = (question.chapter || "").toLowerCase();

  // Generate appropriate SVG schematic based on subject & topic context
  const renderSvgSchematic = () => {
    // 1. Ray Optics / Light Refraction
    if (topic.includes("optics") || topic.includes("lens") || chapter.includes("optics")) {
      return (
        <svg viewBox="0 0 400 160" className="w-full max-w-[380px] h-auto text-black mx-auto" aria-label={desc}>
          {/* Principal Axis */}
          <line x1="20" y1="80" x2="380" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          {/* Convex Lens */}
          <path d="M 200 20 Q 220 80 200 140 Q 180 80 200 20" fill="#E0F2FE" stroke="currentColor" strokeWidth="2.5" />
          {/* Focus Points */}
          <circle cx="120" cy="80" r="3" fill="currentColor" />
          <text x="120" y="100" fontSize="11" fontWeight="bold" textAnchor="middle">F₁</text>
          <circle cx="280" cy="80" r="3" fill="currentColor" />
          <text x="280" y="100" fontSize="11" fontWeight="bold" textAnchor="middle">F₂</text>
          {/* Object Arrow */}
          <line x1="80" y1="80" x2="80" y2="40" stroke="#DC2626" strokeWidth="3" />
          <polygon points="76,43 84,43 80,33" fill="#DC2626" />
          <text x="80" y="100" fontSize="11" fontWeight="bold" textAnchor="middle">Object</text>
          {/* Incident Ray Parallel */}
          <line x1="80" y1="40" x2="200" y2="40" stroke="#2563EB" strokeWidth="2" />
          {/* Refracted Ray through F2 */}
          <line x1="200" y1="40" x2="340" y2="120" stroke="#2563EB" strokeWidth="2" />
          {/* Ray through Optical Center */}
          <line x1="80" y1="40" x2="320" y2="120" stroke="#059669" strokeWidth="2" />
        </svg>
      );
    }

    // 2. Electric Circuit / Resistance / Capacitance
    if (topic.includes("circuit") || topic.includes("current") || topic.includes("capacitor") || chapter.includes("electricity")) {
      return (
        <svg viewBox="0 0 400 160" className="w-full max-w-[380px] h-auto text-black mx-auto" aria-label={desc}>
          {/* Circuit Loop */}
          <rect x="50" y="30" width="300" height="100" fill="none" stroke="currentColor" strokeWidth="2.5" rx="4" />
          {/* DC Battery Symbol at bottom */}
          <rect x="180" y="125" width="40" height="10" fill="#FAF7EE" />
          <line x1="190" y1="115" x2="190" y2="145" stroke="currentColor" strokeWidth="3.5" />
          <line x1="205" y1="122" x2="205" y2="138" stroke="currentColor" strokeWidth="2" />
          <text x="185" y="156" fontSize="10" fontWeight="bold">+</text>
          <text x="210" y="156" fontSize="10" fontWeight="bold">-</text>
          {/* Resistor Zig-Zag at Top */}
          <rect x="160" y="25" width="80" height="10" fill="#FAF7EE" />
          <polyline points="160,30 170,20 180,40 190,20 200,40 210,20 220,40 230,20 240,30" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <text x="200" y="18" fontSize="11" fontWeight="bold" textAnchor="middle">Resistor R</text>
          {/* Ammeter Node */}
          <rect x="335" y="65" width="30" height="30" fill="#FAF7EE" />
          <circle cx="350" cy="80" r="14" fill="#FEF3C7" stroke="currentColor" strokeWidth="2" />
          <text x="350" y="84" fontSize="12" fontWeight="black" textAnchor="middle">A</text>
        </svg>
      );
    }

    // 3. Genetics / Biology Punnett Square
    if (topic.includes("genetics") || topic.includes("cross") || chapter.includes("genetics")) {
      return (
        <svg viewBox="0 0 300 160" className="w-full max-w-[280px] h-auto text-black mx-auto" aria-label={desc}>
          {/* Punnett Square 2x2 Grid */}
          <rect x="80" y="30" width="160" height="100" fill="#F8FAFC" stroke="currentColor" strokeWidth="2" />
          <line x1="160" y1="30" x2="160" y2="130" stroke="currentColor" strokeWidth="2" />
          <line x1="80" y1="80" x2="240" y2="80" stroke="currentColor" strokeWidth="2" />
          {/* Gamete Headers */}
          <text x="120" y="22" fontSize="12" fontWeight="black" textAnchor="middle">T</text>
          <text x="200" y="22" fontSize="12" fontWeight="black" textAnchor="middle">t</text>
          <text x="65" y="60" fontSize="12" fontWeight="black" textAnchor="middle">T</text>
          <text x="65" y="110" fontSize="12" fontWeight="black" textAnchor="middle">t</text>
          {/* Genotype Cells */}
          <text x="120" y="60" fontSize="12" fontWeight="bold" textAnchor="middle">TT</text>
          <text x="200" y="60" fontSize="12" fontWeight="bold" textAnchor="middle">Tt</text>
          <text x="120" y="110" fontSize="12" fontWeight="bold" textAnchor="middle">Tt</text>
          <text x="200" y="110" fontSize="12" fontWeight="bold" textAnchor="middle">tt</text>
        </svg>
      );
    }

    // 4. Economics / Mathematics Curve (PPC / Supply-Demand / Function graph)
    if (subject.includes("eco") || subject.includes("math") || topic.includes("curve") || topic.includes("graph")) {
      return (
        <svg viewBox="0 0 320 160" className="w-full max-w-[300px] h-auto text-black mx-auto" aria-label={desc}>
          {/* Coordinate Axes */}
          <line x1="40" y1="20" x2="40" y2="130" stroke="currentColor" strokeWidth="2.5" />
          <line x1="40" y1="130" x2="290" y2="130" stroke="currentColor" strokeWidth="2.5" />
          <text x="35" y="18" fontSize="11" fontWeight="bold" textAnchor="end">Y</text>
          <text x="300" y="135" fontSize="11" fontWeight="bold">X</text>
          {/* Downward Sloping Curve (e.g. PPC / Demand curve) */}
          <path d="M 50 40 Q 150 70 260 125" fill="none" stroke="#DC2626" strokeWidth="3" />
          <text x="260" y="115" fontSize="11" fontWeight="bold" fill="#DC2626">Curve C</text>
          {/* Reference Tangent Point */}
          <circle cx="150" cy="78" r="4" fill="#2563EB" />
          <text x="160" y="75" fontSize="10" fontWeight="bold" fill="#2563EB">Point P</text>
        </svg>
      );
    }

    // Default High-Contrast Examination Schematic Frame
    return (
      <svg viewBox="0 0 360 120" className="w-full max-w-[340px] h-auto text-black mx-auto" aria-label={desc}>
        <rect x="20" y="15" width="320" height="90" fill="#F8FAFC" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" rx="6" />
        <circle cx="80" cy="60" r="22" fill="#E2E8F0" stroke="currentColor" strokeWidth="1.5" />
        <rect x="130" y="45" width="170" height="30" fill="#E2E8F0" stroke="currentColor" strokeWidth="1.5" rx="4" />
        <text x="80" y="65" fontSize="11" fontWeight="bold" textAnchor="middle">Node A</text>
        <text x="215" y="64" fontSize="11" fontWeight="bold" textAnchor="middle">Component B</text>
      </svg>
    );
  };

  return (
    <div className="my-5 p-4 rounded-xl border-2 border-black bg-[#F8FAFC] shadow-[2px_2px_0px_0px_#000]">
      <div className="flex items-center gap-2 mb-3">
        <ImageIcon className="w-4 h-4 text-black stroke-[2.5]" />
        <span className="text-xs font-black uppercase tracking-wider text-black">
          FIGURE / DIAGRAM REFERENCE
        </span>
      </div>

      <div className="bg-white p-3 rounded-lg border border-black/20 flex flex-col items-center justify-center">
        {renderSvgSchematic()}
        <p className="mt-2 text-xs font-semibold text-slate-700 italic text-center max-w-[420px]">
          {desc}
        </p>
      </div>
    </div>
  );
}
