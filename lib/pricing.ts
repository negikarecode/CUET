/**
 * CUET AI-Prep Single Source of Truth for Pricing & Plans.
 *
 * All pricing amounts, plan identifiers, validity periods, and feature lists
 * are defined strictly here. The same configuration is consumed by:
 * 1. Client UI (<PricingSection />, paywalls, upgrade banners)
 * 2. Server order-creation route (POST /api/payments/razorpay/create-order)
 *
 * Client cannot manipulate the checkout amount; the server route always
 * derives the payable amount directly from this file via getPriceInPaise().
 */

export interface PricingConfig {
  planId: string;
  planName: string;
  priceInr: number;
  validityLabel: string;
  gstNote: string;
  strikethroughPriceInr: number | null;
  launchBadgeText: string;
  domainSubjectCount: number;
  freeFeatures: readonly string[];
  goldFeatures: readonly string[];
}

export const PRICING_CONFIG: PricingConfig = {
  planId: "gold_pass_2027",
  planName: "Gold Pass",
  priceInr: 999,
  validityLabel: "Valid till CUET 2027",
  // [[GST_INCLUSIVE_OR_EXCLUSIVE]] - Specify whether prices include or exclude GST
  gstNote: "[[GST_INCLUSIVE_OR_EXCLUSIVE]]",
  // [[ORIGINAL_PRICE_CONFIRMED]] - Keep null until an authentic original/anchor price is confirmed
  strikethroughPriceInr: null,
  launchBadgeText: "Launch price",
  domainSubjectCount: 22,
  freeFeatures: [
    "3 Full-Length NTA-Style Mocks per domain subject",
    "1 Past-Year Shift Paper attempt per subject",
    "3 Chapter-Wise Diagnostic Practice Drills",
    "Standard Raw & Normalized Scorecard",
    "Verified NCERT Answer Explanations",
    "Desktop & Mobile Browser Access",
  ],
  goldFeatures: [
    "All 251+ Reconstructed Shift Papers (2022–2025)",
    "Unlimited Full-Length NTA-Style CBT Mock Tests",
    "Granular AI Mistake Diagnosis (Careless Slips vs Concept Gaps)",
    "Exact NCERT Class 12 Page & Chapter Citations",
    "DU CSAS College Cutoff Predictor (SRCC, Hindu, Hansraj & more)",
    "Spaced Repetition & Weakness Targeted Drills",
    "Comprehensive Performance Benchmarking",
    "Step-by-Step NCERT Solution Walkthroughs & AI Guidance",
  ],
} as const;

/**
 * Returns the authoritative payable order amount in Indian Paise.
 * Used exclusively by server route handlers to guarantee amount integrity.
 */
export function getPriceInPaise(): number {
  return PRICING_CONFIG.priceInr * 100;
}
