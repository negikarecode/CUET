"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface PricingCardItem {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  features: string[];
  cta: string;
  tier: "free" | "gold";
  bgColor: string;
  textColor: string;
}

export function ScrollSplitCard({
  className,
  imageSrc,
  cards,
  onSelect,
  containerRef: externalContainerRef,
}: {
  className?: string;
  imageSrc: string;
  cards: PricingCardItem[];
  onSelect?: () => void;
  containerRef?: any;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: externalContainerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 560px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.25,
  });

  const leftX = useTransform(smoothProgress, [0, 0.28, 0.48, 1], [0, -10, -20, -20]);
  const rightX = useTransform(smoothProgress, [0, 0.28, 0.48, 1], [0, 10, 20, 20]);
  const leftY = useTransform(smoothProgress, [0, 0.28, 0.48, 1], [0, -8, -20, -20]);
  const rightY = useTransform(smoothProgress, [0, 0.28, 0.48, 1], [0, 8, 20, 20]);
  const scale = useTransform(smoothProgress, [0, 0.28, 0.48, 1], [1, 0.98, 0.92, 0.92]);
  const rotateY = useTransform(smoothProgress, [0.48, 0.7, 1], [0, 180, 180]);
  const borderRadiusLeft = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["16px 0 0 16px", "16px"]
  );
  const borderRadiusMiddle = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0px", "16px"]
  );
  const borderRadiusRight = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["0 16px 16px 0", "16px"]
  );
  const borderOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.2]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.4]);
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`;
  const textOpacity = useTransform(smoothProgress, [0.72, 0.86], [0, 1]);
  const textY = useTransform(smoothProgress, [0.72, 0.86], [40, 0]);

  return (
    <div ref={containerRef} className={cn("scroll-split-card", className)}>
      <span
        id="pricing-cards"
        className="scroll-split-navigation-target"
        aria-hidden="true"
      />
      <div className="scroll-split-sticky">
        <motion.div
          style={{ scale, transformStyle: "preserve-3d" }}
          className="scroll-split-panels"
        >
          {cards.map((card, index) => {
            const isFirst = index === 0;
            const isLast = index === cards.length - 1;
            const radius = isFirst
              ? borderRadiusLeft
              : isLast
              ? borderRadiusRight
              : borderRadiusMiddle;
            return (
              <motion.div
                key={card.title}
                className="scroll-split-panel"
                style={{
                  x: isMobile ? 0 : isFirst ? leftX : isLast ? rightX : 0,
                  y: isMobile ? (isFirst ? leftY : isLast ? rightY : 0) : 0,
                  rotateY,
                  zIndex: index,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="scroll-split-front"
                  style={{ zIndex: 2, borderRadius: radius, boxShadow }}
                >
                  <div
                    className="scroll-split-image"
                    style={{
                      backgroundImage: `url(${imageSrc})`,
                      left: isFirst ? 0 : "calc(-100% - var(--split-gap))",
                    }}
                  />
                </motion.div>
                <motion.div
                  className={`scroll-split-back pricing-plan-card pricing-plan-card--${card.tier}`}
                  style={{
                    backgroundColor: card.bgColor,
                    color: card.textColor,
                    transform: "rotateY(180deg)",
                    zIndex: 1,
                    borderRadius: radius,
                    boxShadow,
                  }}
                >
                  <div className="scroll-split-noise" />
                  {card.badge && (
                    <span className="pricing-plan-badge">{card.badge}</span>
                  )}
                  <div className="pricing-plan-heading">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                  <div className="pricing-plan-price">
                    <strong>{card.price}</strong>
                    {card.originalPrice && <del>{card.originalPrice}</del>}
                  </div>
                  <ul className="pricing-plan-features">
                    {card.features.map((feature) => (
                      <li key={feature}>
                        <span aria-hidden="true">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="pricing-plan-cta"
                    type="button"
                    onClick={onSelect}
                  >
                    {card.cta}
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          className="scroll-split-end"
          style={{ opacity: textOpacity, y: textY }}
        >
          <p>Ready to choose your edge?</p>
        </motion.div>
      </div>
    </div>
  );
}
