"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

function createRandom(seed: number) {
  let state = seed >>> 0;
  return function next() {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function shake(rand: () => number, amount: number) {
  return (rand() - 0.5) * 2 * amount;
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function trace(points: { x: number; y: number }[], close = false) {
  const [first, ...rest] = points;
  if (!first) return "";

  let d = `M${round(first.x)},${round(first.y)}`;

  rest.forEach((anchor, index) => {
    const next = rest[index + 1];
    if (!next) {
      d += ` L${round(anchor.x)},${round(anchor.y)}`;
      return;
    }
    d += ` Q${round(anchor.x)},${round(anchor.y)} ${round(
      (anchor.x + next.x) / 2
    )},${round((anchor.y + next.y) / 2)}`;
  });

  return close ? `${d} Z` : d;
}

function stroke(
  from: { x: number; y: number },
  to: { x: number; y: number },
  options: { sag?: number; wobble?: number; steps?: number },
  rand: () => number
) {
  const { sag = 0, wobble = 0.55, steps = 12 } = options;
  const points = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const loose = i === 0 || i === steps ? 0 : 1;
    points.push({
      x: from.x + (to.x - from.x) * t + shake(rand, wobble) * loose,
      y:
        from.y +
        (to.y - from.y) * t +
        Math.sin(t * Math.PI) * sag +
        shake(rand, wobble) * loose,
    });
  }

  return points;
}

function wave(
  from: { x: number; y: number },
  to: { x: number; y: number },
  options: { amplitude: number; cycles: number; wobble?: number },
  rand: () => number
) {
  const { amplitude, cycles, wobble = 0.35 } = options;
  const steps = Math.round(cycles * 4);
  const points = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    points.push({
      x: from.x + (to.x - from.x) * t,
      y:
        from.y +
        (to.y - from.y) * t +
        Math.sin(t * cycles * Math.PI * 2) * amplitude +
        shake(rand, wobble),
    });
  }

  return points;
}

function wavyStrokes() {
  const rand = createRandom(17);
  return [
    {
      d: trace(
        wave(
          { x: 2, y: 7 },
          { x: 138, y: 7 },
          { amplitude: 3, cycles: 9 },
          rand
        )
      ),
      width: 2.2,
      opacity: 1,
      fill: false,
    },
  ];
}

function underlineStrokes() {
  const rand = createRandom(23);
  return [
    {
      d: trace(stroke({ x: 3, y: 6 }, { x: 137, y: 5 }, { sag: -2 }, rand)),
      width: 2.4,
      opacity: 1,
      fill: false,
    },
  ];
}

function highlightStrokes() {
  const rand = createRandom(163);
  const outline = [
    ...stroke({ x: 5, y: 6 }, { x: 165, y: 5 }, { sag: -2, steps: 10 }, rand),
    ...stroke({ x: 165, y: 5 }, { x: 165, y: 21 }, { steps: 3 }, rand),
    ...stroke({ x: 165, y: 21 }, { x: 5, y: 22 }, { sag: 2, steps: 10 }, rand),
    ...stroke({ x: 5, y: 22 }, { x: 5, y: 6 }, { steps: 3 }, rand),
  ];

  return [{ d: trace(outline, true), fill: true, width: undefined, opacity: 1 }];
}

const marks: Record<string, any> = {
  wavy: {
    wrapper: "relative inline-block whitespace-nowrap",
    decoration:
      "pointer-events-none absolute bottom-[-0.4em] left-[-2%] h-[0.7em] w-[104%]",
    color: "text-purple-500",
    viewBox: "0 0 140 14",
    strokes: wavyStrokes(),
  },
  underline: {
    wrapper: "relative inline-block whitespace-nowrap",
    decoration:
      "pointer-events-none absolute bottom-[-0.32em] left-[-1%] h-[0.5em] w-[102%]",
    color: "text-purple-500",
    viewBox: "0 0 140 10",
    strokes: underlineStrokes(),
  },
  highlight: {
    wrapper: "relative inline-block whitespace-nowrap",
    decoration:
      "pointer-events-none absolute inset-x-[-4%] bottom-[-0.08em] z-0 h-[1.15em] w-[108%]",
    color: "text-yellow-300/60",
    viewBox: "0 0 170 26",
    strokes: highlightStrokes(),
    behindText: true,
  },
};

export function AnnotatedText({
  children,
  variant = "wavy",
  color,
  className,
  animate = true,
  delay = 0,
  duration = 0.65,
}: {
  children: React.ReactNode;
  variant?: "wavy" | "underline" | "highlight";
  color?: string;
  className?: string;
  animate?: boolean;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !animate) return;

    const drawings = element.querySelectorAll("[data-annotation-drawing]");
    const animations = Array.from(drawings, (drawing, index) => {
      const reveal =
        drawing.getAttribute("data-annotation-drawing") === "reveal";
      const opacity = Number(drawing.getAttribute("opacity") ?? 1);
      const animation = drawing.animate(
        reveal
          ? [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }]
          : [
              {
                strokeDasharray: "1",
                strokeDashoffset: "1",
                opacity: 0,
                offset: 0,
              },
              {
                strokeDasharray: "1",
                strokeDashoffset: "0.999",
                opacity,
                offset: 0.001,
              },
              {
                strokeDasharray: "1",
                strokeDashoffset: "0",
                opacity,
                offset: 1,
              },
            ],
        {
          duration: Math.max(0, duration) * 1000,
          delay: Math.max(0, delay) * 1000 + index * 160,
          easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
          fill: "backwards",
        }
      );
      animation.pause();
      return animation;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        animations.forEach((animation) => animation.play());
        observer.disconnect();
      },
      { threshold: 0.01 }
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [animate, delay, duration, variant]);

  const mark = marks[variant] || marks.wavy;
  const decorationClass = cn(mark.decoration, color ?? mark.color);

  return (
    <span ref={ref} className={cn(mark.wrapper, className)}>
      {mark.behindText ? (
        <span className="relative z-10">{children}</span>
      ) : (
        children
      )}

      <svg
        className={cn(decorationClass, mark.behindText && "z-0")}
        viewBox={mark.viewBox}
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {mark.strokes?.map((line: any, idx: number) => (
          <path
            key={idx}
            d={line.d}
            pathLength={1}
            data-annotation-drawing={line.fill ? "reveal" : "stroke"}
            fill={line.fill ? "currentColor" : "none"}
            stroke={line.fill ? "none" : "currentColor"}
            strokeWidth={line.fill ? undefined : line.width ?? 2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={line.opacity}
          />
        ))}
      </svg>
    </span>
  );
}
