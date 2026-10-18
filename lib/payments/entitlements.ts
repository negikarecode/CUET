import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeSubject } from "@/lib/analytics";
import {
  UserEntitlement,
  UserUsageSummary,
  TestSessionEligibility,
  PricingOfferDetails,
  SubscriptionTier,
  SessionType,
} from "./types";

export const FREE_LIMITS = {
  MAX_MOCK_SESSIONS: 3,
  MAX_PRACTICE_SESSIONS: 3,
  MAX_PYQ_PER_SUBJECT: 1,
} as const;

export const PRICING_CONFIG = {
  STANDARD_PRICE_PAISE: 79900,
  STANDARD_PRICE_INR: 799,
  PROMOTIONAL_PRICE_PAISE: 49900,
  PROMOTIONAL_PRICE_INR: 499,
  TOTAL_PROMOTIONAL_SLOTS: 100,
  CURRENCY: "INR",
  PLAN_ID: "all_access_pass_799",
  PLAN_NAME: "CUETMate Premium (All-Access Pass)",
  BILLING_DURATION: "1 Full CUET Exam Cycle (365 Days)",
  TAX_POLICY: "Inclusive of all taxes & GST. Flat one-time checkout.",
} as const;

/**
 * Retrieves the authoritative entitlement for a candidate from Supabase.
 */
export async function getUserEntitlement(userId: string): Promise<UserEntitlement> {
  if (!userId || userId === "guest") {
    return {
      userId: "guest",
      isPremium: false,
      subscriptionTier: "free",
      subscriptionExpiresAt: null,
      isActive: false,
    };
  }

  try {
    const admin = createAdminClient();
    const { data: profile, error } = await admin
      .from("profiles")
      .select("id, is_premium, subscription_tier, subscription_expires_at")
      .eq("id", userId)
      .maybeSingle();

    if (error || !profile) {
      return {
        userId,
        isPremium: false,
        subscriptionTier: "free",
        subscriptionExpiresAt: null,
        isActive: false,
      };
    }

    const isExplicitlyPremium = Boolean(profile.is_premium);
    let isNotExpired = true;

    if (profile.subscription_expires_at) {
      const expiresAt = new Date(profile.subscription_expires_at).getTime();
      if (!isNaN(expiresAt) && expiresAt < Date.now()) {
        isNotExpired = false;
      }
    }

    const isPremium = isExplicitlyPremium && isNotExpired;
    const tier = (profile.subscription_tier as SubscriptionTier) || (isPremium ? "all_access_pass" : "free");

    return {
      userId,
      isPremium,
      subscriptionTier: isPremium ? tier : "free",
      subscriptionExpiresAt: profile.subscription_expires_at || null,
      isActive: isPremium,
    };
  } catch (err) {
    console.warn("[Entitlements Query Error]:", err);
    return {
      userId,
      isPremium: false,
      subscriptionTier: "free",
      subscriptionExpiresAt: null,
      isActive: false,
    };
  }
}

/**
 * Classifies a test ID into its canonical session type and subject.
 */
export function classifyTestType(testId: string): {
  sessionType: SessionType | "adaptive_drill";
  canonicalSubject: string;
} {
  const lowerId = (testId || "").toLowerCase();

  // 1. Adaptive Drill / Repair Quiz
  if (lowerId.includes("repair") || lowerId.includes("drill")) {
    return {
      sessionType: "adaptive_drill",
      canonicalSubject: normalizeSubject(testId).key,
    };
  }

  // 2. Unit-wise Practice Test
  if (
    lowerId.includes("practice") ||
    (lowerId.includes("unit") && (lowerId.includes("test") || /unit[-_]?\d+/.test(lowerId)))
  ) {
    return {
      sessionType: "practice",
      canonicalSubject: normalizeSubject(testId).key,
    };
  }

  // 3. Official PYQ
  if (lowerId.includes("pyq")) {
    return {
      sessionType: "pyq",
      canonicalSubject: normalizeSubject(testId).key,
    };
  }

  // 4. Default: Full Mock Test
  return {
    sessionType: "mock",
    canonicalSubject: normalizeSubject(testId).key,
  };
}

/**
 * Computes authoritative usage ledger counts for Free users.
 */
export async function getUserUsageSummary(userId: string): Promise<UserUsageSummary> {
  const defaultSummary: UserUsageSummary = {
    userId,
    isPremium: false,
    mockSessionsCompleted: 0,
    maxFreeMockSessions: FREE_LIMITS.MAX_MOCK_SESSIONS,
    practiceSessionsCompleted: 0,
    maxFreePracticeSessions: FREE_LIMITS.MAX_PRACTICE_SESSIONS,
    pyqSubjectsAttempted: [],
    maxFreePyqPerSubject: FREE_LIMITS.MAX_PYQ_PER_SUBJECT,
  };

  if (!userId || userId === "guest") {
    return defaultSummary;
  }

  const entitlement = await getUserEntitlement(userId);
  defaultSummary.isPremium = entitlement.isPremium;

  try {
    const admin = createAdminClient();

    // Strategy 1: Check user_usage_ledger table if available
    const { data: ledgerRows, error: ledgerError } = await admin
      .from("user_usage_ledger")
      .select("session_type, canonical_subject, test_id")
      .eq("user_id", userId);

    if (!ledgerError && ledgerRows) {
      let mocks = 0;
      let practices = 0;
      const pyqSubjects = new Set<string>();

      ledgerRows.forEach((row: any) => {
        if (row.session_type === "mock") mocks++;
        else if (row.session_type === "practice") practices++;
        else if (row.session_type === "pyq" && row.canonical_subject) {
          pyqSubjects.add(row.canonical_subject);
        }
      });

      return {
        ...defaultSummary,
        mockSessionsCompleted: mocks,
        practiceSessionsCompleted: practices,
        pyqSubjectsAttempted: Array.from(pyqSubjects),
      };
    }

    // Strategy 2 (Fallback): Derive from public.user_attempts
    const { data: userAttempts, error: attemptsError } = await admin
      .from("user_attempts")
      .select("test_id, created_at, tests(subject)")
      .eq("user_id", userId);

    if (!attemptsError && userAttempts) {
      // Group distinct test sessions
      const distinctTestIds = new Set<string>();
      userAttempts.forEach((ua: any) => {
        if (ua.test_id) distinctTestIds.add(String(ua.test_id));
      });

      let mocks = 0;
      let practices = 0;
      const pyqSubjects = new Set<string>();

      distinctTestIds.forEach((tId) => {
        const { sessionType, canonicalSubject } = classifyTestType(tId);
        if (sessionType === "mock") mocks++;
        else if (sessionType === "practice") practices++;
        else if (sessionType === "pyq") pyqSubjects.add(canonicalSubject);
      });

      return {
        ...defaultSummary,
        mockSessionsCompleted: mocks,
        practiceSessionsCompleted: practices,
        pyqSubjectsAttempted: Array.from(pyqSubjects),
      };
    }
  } catch (err) {
    console.warn("[Usage Summary Calculation Notice]:", err);
  }

  return defaultSummary;
}

/**
 * Checks whether an authenticated user is eligible to start or submit a given test.
 */
export async function checkTestSessionEligibility(
  userId: string,
  testId: string
): Promise<TestSessionEligibility> {
  const entitlement = await getUserEntitlement(userId);
  const { sessionType, canonicalSubject } = classifyTestType(testId);

  // Premium candidates have 100% unrestricted access
  if (entitlement.isPremium) {
    return {
      allowed: true,
      limitReached: false,
      testType: sessionType,
      currentUsage: 0,
      maxAllowed: Infinity,
      canonicalSubject,
    };
  }

  // Adaptive drills / repair quizzes require Premium
  if (sessionType === "adaptive_drill") {
    return {
      allowed: false,
      reason: "Adaptive Repair Drills require CUETMate Premium.",
      limitReached: true,
      testType: sessionType,
      currentUsage: 0,
      maxAllowed: 0,
      canonicalSubject,
    };
  }

  // Calculate current Free usage
  const usage = await getUserUsageSummary(userId);

  if (sessionType === "mock") {
    const isUnderLimit = usage.mockSessionsCompleted < FREE_LIMITS.MAX_MOCK_SESSIONS;
    return {
      allowed: isUnderLimit,
      reason: isUnderLimit
        ? undefined
        : `You have completed all ${FREE_LIMITS.MAX_MOCK_SESSIONS} free mock exams. Unlock unlimited full-length mocks with CUETMate Premium.`,
      limitReached: !isUnderLimit,
      testType: sessionType,
      currentUsage: usage.mockSessionsCompleted,
      maxAllowed: FREE_LIMITS.MAX_MOCK_SESSIONS,
      canonicalSubject,
    };
  }

  if (sessionType === "practice") {
    const isUnderLimit = usage.practiceSessionsCompleted < FREE_LIMITS.MAX_PRACTICE_SESSIONS;
    return {
      allowed: isUnderLimit,
      reason: isUnderLimit
        ? undefined
        : `You have completed all ${FREE_LIMITS.MAX_PRACTICE_SESSIONS} free unit practice tests. Unlock unlimited practice across all units with CUETMate Premium.`,
      limitReached: !isUnderLimit,
      testType: sessionType,
      currentUsage: usage.practiceSessionsCompleted,
      maxAllowed: FREE_LIMITS.MAX_PRACTICE_SESSIONS,
      canonicalSubject,
    };
  }

  if (sessionType === "pyq") {
    const alreadyAttemptedSubject = usage.pyqSubjectsAttempted.includes(canonicalSubject);
    return {
      allowed: !alreadyAttemptedSubject,
      reason: !alreadyAttemptedSubject
        ? undefined
        : `You have completed your 1 free PYQ attempt for ${canonicalSubject.toUpperCase()}. Unlock unlimited official past year papers across all subjects with CUETMate Premium.`,
      limitReached: alreadyAttemptedSubject,
      testType: sessionType,
      currentUsage: alreadyAttemptedSubject ? 1 : 0,
      maxAllowed: FREE_LIMITS.MAX_PYQ_PER_SUBJECT,
      canonicalSubject,
    };
  }

  return {
    allowed: true,
    limitReached: false,
    testType: sessionType,
    currentUsage: 0,
    maxAllowed: 1,
    canonicalSubject,
  };
}

/**
 * Records an authorized test completion into the usage ledger.
 */
export async function recordSessionCompletion(params: {
  userId: string;
  testId: string;
  sessionId: string;
  subject?: string;
}): Promise<void> {
  const { userId, testId, sessionId, subject } = params;
  if (!userId || userId === "guest" || !sessionId) return;

  const { sessionType, canonicalSubject } = classifyTestType(testId);
  const finalSubject = subject ? normalizeSubject(subject).key : canonicalSubject;

  try {
    const admin = createAdminClient();
    await admin.from("user_usage_ledger").upsert(
      {
        user_id: userId,
        session_type: sessionType === "adaptive_drill" ? "practice" : sessionType,
        test_id: testId,
        canonical_subject: finalSubject,
        session_id: sessionId,
      },
      { onConflict: "user_id, session_id" }
    );
  } catch (err) {
    // Graceful fallback if table does not exist
    console.warn("[Usage Ledger Record Notice]:", err);
  }
}

/**
 * Retrieves the authoritative promotional slot availability and current pricing.
 */
export async function getPricingOffer(): Promise<PricingOfferDetails> {
  let claimedCount = 0;

  try {
    const admin = createAdminClient();

    // Check promotional_slots table if available
    const { count, error } = await admin
      .from("promotional_slots")
      .select("slot_number", { count: "exact", head: true })
      .eq("status", "claimed");

    if (!error && typeof count === "number") {
      claimedCount = count;
    } else {
      // Fallback: count paid premium profiles
      const { count: profileCount } = await admin
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("is_premium", true);

      claimedCount = profileCount || 0;
    }
  } catch (err) {
    console.warn("[Promotional Slot Check Notice]:", err);
  }

  const totalSlots = PRICING_CONFIG.TOTAL_PROMOTIONAL_SLOTS;
  const remainingSlots = Math.max(0, totalSlots - claimedCount);
  const isPromotionalActive = remainingSlots > 0;

  const currentPricePaise = isPromotionalActive
    ? PRICING_CONFIG.PROMOTIONAL_PRICE_PAISE
    : PRICING_CONFIG.STANDARD_PRICE_PAISE;

  const currentPriceInr = isPromotionalActive
    ? PRICING_CONFIG.PROMOTIONAL_PRICE_INR
    : PRICING_CONFIG.STANDARD_PRICE_INR;

  return {
    planId: PRICING_CONFIG.PLAN_ID,
    planName: PRICING_CONFIG.PLAN_NAME,
    standardPricePaise: PRICING_CONFIG.STANDARD_PRICE_PAISE,
    standardPriceInr: PRICING_CONFIG.STANDARD_PRICE_INR,
    promotionalPricePaise: PRICING_CONFIG.PROMOTIONAL_PRICE_PAISE,
    promotionalPriceInr: PRICING_CONFIG.PROMOTIONAL_PRICE_INR,
    isPromotionalActive,
    totalPromotionalSlots: totalSlots,
    claimedPromotionalSlots: claimedCount,
    remainingPromotionalSlots: remainingSlots,
    currentPricePaise,
    currentPriceInr,
    currency: PRICING_CONFIG.CURRENCY,
    billingDuration: PRICING_CONFIG.BILLING_DURATION,
    taxPolicy: PRICING_CONFIG.TAX_POLICY,
  };
}
