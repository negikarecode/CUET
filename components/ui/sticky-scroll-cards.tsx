"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";

export interface StickyScrollCardItem {
  title: string;
  src: string;
}

interface StickyScrollCardsProps {
  cards?: StickyScrollCardItem[];
  hint?: string;
  className?: string;
}

const DEFAULT_CARDS: StickyScrollCardItem[] = [
  {
    title: "Miranda College",
    src: "/assets/images/download (9).jpg",
  },
  {
    title: "Hindu College",
    src: "/assets/images/Hindu College, University of Delhi.jpg",
  },
  {
    title: "St. Stephen's College",
    src: "/assets/images/St Stephen’s College, University Of Delhi.jpg",
  },
  {
    title: "Dare to Dream Big",
    src: "/assets/images/download (10).jpg",
  },
  {
    title: "SRCC",
    src: "/assets/images/@Shri Ram College of commerce (1).jpg",
  },
  {
    title: "Find your place at Delhi University",
    src: "/assets/images/Delhi University vibezzz.jpg",
  },
];

const TILT_PATTERN = [-1.25, 0.85, -0.65, 1.35, -0.9, 0.75];

function StackCard({
  card,
  index,
  total,
  container,
  reduceMotion,
}: {
  card: StickyScrollCardItem;
  index: number;
  total: number;
  container: React.RefObject<HTMLDivElement | null>;
  reduceMotion: boolean;
}) {
  const { scrollYProgress } = useScroll({
    target: container as any,
    offset: ["start start", "end end"],
  });
  const start = total > 1 ? index / (total + 1) : 0;
  const restingScale = Math.max(0.56, 1 - (total - index - 1) * 0.095);
  const scale = useTransform(
    scrollYProgress,
    [start, 1],
    reduceMotion ? [1, 1] : [1, restingScale]
  );

  return (
    <section className="sticky top-0 grid h-screen place-items-center">
      <motion.figure
        className="relative m-0 origin-top overflow-hidden rounded-2xl bg-white text-neutral-950 border border-slate-200/80 shadow-2xl"
        style={{
          scale,
          rotate: reduceMotion ? 0 : TILT_PATTERN[index % TILT_PATTERN.length],
          top: `calc(-5vh + ${24 + index * 8}px)`,
          boxShadow:
            "0 4px 12px rgba(0, 0, 0, 0.05), 0 20px 48px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div className="p-2.5 pb-0">
          <img
            src={card.src}
            alt={card.title}
            className="block h-[clamp(280px,64vh,580px)] w-[min(88vw,800px)] object-cover rounded-xl"
            loading={index < 2 ? "eager" : "lazy"}
            draggable={false}
          />
        </div>
        <figcaption className="grid h-12 place-items-center px-4 text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-slate-500 font-sans">
          {card.title}
        </figcaption>
      </motion.figure>
    </section>
  );
}

export function StickyScrollCards({
  cards = DEFAULT_CARDS,
  hint = "Explore university campuses",
  className,
}: StickyScrollCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <main
      ref={container}
      className={cn(
        "relative flex w-full flex-col items-center pb-[30vh] pt-[10vh]",
        className
      )}
    >
      <div className="absolute left-1/2 top-[2%] flex -translate-x-1/2 flex-col items-center gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
          {hint}
        </p>
        <span className="h-10 w-px bg-gradient-to-b from-slate-400 to-transparent" />
      </div>

      {cards.map((card, index) => (
        <StackCard
          key={`${card.src}-${index}`}
          card={card}
          index={index}
          total={cards.length}
          container={container}
          reduceMotion={reduceMotion}
        />
      ))}
    </main>
  );
}
