import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeSubject } from "@/lib/analytics";
import { resolveCanonicalTestId } from "@/lib/canonical-tests";
import { stringToUuid } from "@/lib/utils";
export { stringToUuid };
import {
  UserEntitlement,
  UserUsageSummary,
  TestSessionEligibility,
  PricingOfferDetails,
  SubscriptionTier,
  SessionType,
} from "./types";

export type {
  UserEntitlement,
  UserUsageSummary,
  TestSessionEligibility,
  PricingOfferDetails,
  SubscriptionTier,
  SessionType,
};

export const FREE_LIMITS = {
  MAX_MOCK_SESSIONS: 3,
  MAX_PRACTICE_SESSIONS: 3,
  MAX_PYQ_PER_SUBJECT: 1,
} as const;

/**
 * Option A Authoritative Registry: Designated tests accessible to free-tier candidates.
 * Restricted strictly to Mock 1, Unit 1 Test 1, and PYQ Paper 1 across all 22 domain subjects.
 */
export const DESIGNATED_FREE_TEST_IDS = new Set<string>([
  // Full-Length Mocks: Paper 1 only across all canonical domain subjects
  "physics-mock-1",
  "chemistry-mock-1",
  "maths-mock-1",
  "bio-mock-1",
  "accountancy-mock-1",
  "eco-mock-1",
  "bst-mock-1",
  "history-mock-1",
  "pol-science-mock-1",
  "geo-mock-1",
  "psychology-mock-1",
  "sociology-mock-1",
  "physical-education-mock-1",
  "computer-science-mock-1",
  "home-science-mock-1",
  "mass-media-mock-1",
  "environmental-studies-mock-1",
  "fine-arts-mock-1",
  "agriculture-mock-1",
  "anthropology-mock-1",
  "english-mock-1",
  "general-test-mock-1",

  // Unit Practice Tests: Unit 1 Test 1 across all canonical domain subjects
  "practice-physics-unit1-test1",
  "practice-chemistry-unit1-test1",
  "practice-maths-unit1-test1",
  "practice-bio-unit1-test1",
  "practice-accountancy-unit1-test1",
  "practice-eco-unit1-test1",
  "practice-bst-unit1-test1",
  "practice-history-unit1-test1",
  "practice-pol-science-unit1-test1",
  "practice-geo-unit1-test1",
  "practice-psychology-unit1-test1",
  "practice-sociology-unit1-test1",
  "practice-physical-education-unit1-test1",
  "practice-computer-science-unit1-test1",
  "practice-home-science-unit1-test1",
  "practice-mass-media-unit1-test1",
  "practice-environmental-studies-unit1-test1",
  "practice-fine-arts-unit1-test1",
  "practice-agriculture-unit1-test1",
  "practice-anthropology-unit1-test1",
  "practice-english-unit1-test1",
  "practice-general-test-unit1-test1",

  // Official Past Year Papers: Paper 1 across all canonical domain subjects
  "physics-pyq-1",
  "chemistry-pyq-1",
  "maths-pyq-1",
  "bio-pyq-1",
  "accountancy-pyq-1",
  "eco-pyq-1",
  "bst-pyq-1",
  "history-pyq-1",
  "pol-science-pyq-1",
  "geo-pyq-1",
  "psychology-pyq-1",
  "sociology-pyq-1",
  "physical-education-pyq-1",
  "computer-science-pyq-1",
  "home-science-pyq-1",
  "mass-media-pyq-1",
  "environmental-studies-pyq-1",
  "fine-arts-pyq-1",
  "agriculture-pyq-1",
  "anthropology-pyq-1",
  "english-pyq-1",
  "general-test-pyq-1",
]);

/**
 * Checks whether a testId (or its canonical resolved key) is within the designated free test set.
 */
export function isDesignatedFreeTest(testId: string): boolean {
  if (!testId) return false;
  const canonical = resolveCanonicalTestId(testId) || testId.toLowerCase().trim();
  return DESIGNATED_FREE_TEST_IDS.has(canonical);
}

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
      accessState: "UNVERIFIED",
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
        accessState: "UNVERIFIED",
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
      accessState: isPremium ? "PREMIUM" : "FREE",
      subscriptionTier: isPremium ? tier : "free",
      subscriptionExpiresAt: profile.subscription_expires_at || null,
      isActive: isPremium,
    };
  } catch (err) {
    console.warn("[Entitlements Query Error]:", err);
    return {
      userId,
      isPremium: false,
      accessState: "UNVERIFIED",
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
    accessState: "UNVERIFIED",
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
  defaultSummary.accessState = entitlement.accessState;

  try {
    const admin = createAdminClient();

    // Strategy 1: Check user_usage_ledger table (immutable source of truth)
    const { data: ledgerRows, error: ledgerError } = await admin
      .from("user_usage_ledger")
      .select("session_type, canonical_subject, test_id")
      .eq("user_id", userId);

    if (!ledgerError && ledgerRows && ledgerRows.length > 0) {
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
      .select("test_id, attempt_id, created_at, tests(subject, title)")
      .eq("user_id", userId);

    if (!attemptsError && userAttempts) {
      // Group distinct test sessions by attempt_id if present, otherwise by test_id
      const distinctSessions = new Map<string, string>(); // sessionId -> testIdentifier
      userAttempts.forEach((ua: any) => {
        const sessionId = ua.attempt_id ? String(ua.attempt_id) : (ua.test_id ? String(ua.test_id) : null);
        if (sessionId && !distinctSessions.has(sessionId)) {
          // Use tests.title or subject or test_id for classification
          const testObj = Array.isArray(ua.tests) ? ua.tests[0] : ua.tests;
          const identifier = testObj?.title || String(ua.test_id || "mock");
          distinctSessions.set(sessionId, identifier);
        }
      });

      let mocks = 0;
      let practices = 0;
      const pyqSubjects = new Set<string>();

      distinctSessions.forEach((identifier) => {
        const { sessionType, canonicalSubject } = classifyTestType(identifier);
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
  try {
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
    const lowerId = (testId || "").toLowerCase();

    // Free candidates are strictly restricted to DESIGNATED_FREE_TEST_IDS (Option A)
    if (!isDesignatedFreeTest(testId)) {
      return {
        allowed: false,
        reason: "This test is exclusive to CUETMate Premium. The Free plan includes designated sample tests (Mock 1, Unit 1 Test 1, and PYQ Paper 1). Upgrade to CUETMate Premium to unlock all tests.",
        limitReached: true,
        testType: sessionType,
        currentUsage:
          sessionType === "mock"
            ? usage.mockSessionsCompleted
            : sessionType === "practice"
            ? usage.practiceSessionsCompleted
            : usage.pyqSubjectsAttempted.length,
        maxAllowed:
          sessionType === "mock"
            ? FREE_LIMITS.MAX_MOCK_SESSIONS
            : sessionType === "practice"
            ? FREE_LIMITS.MAX_PRACTICE_SESSIONS
            : FREE_LIMITS.MAX_PYQ_PER_SUBJECT,
        canonicalSubject,
      };
    }

    if (sessionType === "mock") {
      // Free users can only access Mock 1 to Mock 3 templates
      const mockMatch =
        lowerId.match(/\bmock(?:\s+paper|\s+test|\s+exam)?[-_]?\s*(\d+)\b/i) ||
        lowerId.match(/(?:mock|paper)[-_]?(\d+)/i) ||
        lowerId.match(/-(\d+)$/);
      const mockNum = mockMatch && mockMatch[1] ? parseInt(mockMatch[1], 10) : 1;

      if (mockNum > FREE_LIMITS.MAX_MOCK_SESSIONS) {
        return {
          allowed: false,
          reason: `Mock ${mockNum} requires CUETMate Premium. The Free plan includes Mock 1 to Mock 3. Upgrade to unlock all 20 full-length mocks.`,
          limitReached: true,
          testType: sessionType,
          currentUsage: usage.mockSessionsCompleted,
          maxAllowed: FREE_LIMITS.MAX_MOCK_SESSIONS,
          canonicalSubject,
        };
      }

      const isUnderLimit = usage.mockSessionsCompleted < FREE_LIMITS.MAX_MOCK_SESSIONS;
      return {
        allowed: isUnderLimit,
        reason: isUnderLimit
          ? undefined
          : `You have completed all ${FREE_LIMITS.MAX_MOCK_SESSIONS} free mock exams. Unlock unlimited full-length mocks across all subjects with CUETMate Premium.`,
        limitReached: !isUnderLimit,
        testType: sessionType,
        currentUsage: usage.mockSessionsCompleted,
        maxAllowed: FREE_LIMITS.MAX_MOCK_SESSIONS,
        canonicalSubject,
      };
    }

    if (sessionType === "practice") {
      // Free plan allows up to 3 practice sessions, restricted to Unit 1 tests 1-3
      const unitMatch = lowerId.match(/unit[-_]?(\d+)/i);
      const testMatch = lowerId.match(/test[-_]?(\d+)/i);
      const unitNum = unitMatch && unitMatch[1] ? parseInt(unitMatch[1], 10) : 1;
      const testNum = testMatch && testMatch[1] ? parseInt(testMatch[1], 10) : 1;

      if (unitNum > 1 || testNum > FREE_LIMITS.MAX_PRACTICE_SESSIONS) {
        return {
          allowed: false,
          reason: "This unit practice test requires CUETMate Premium. The Free plan includes up to 3 practice sessions. Upgrade to unlock all practice tests across all chapters.",
          limitReached: true,
          testType: sessionType,
          currentUsage: usage.practiceSessionsCompleted,
          maxAllowed: FREE_LIMITS.MAX_PRACTICE_SESSIONS,
          canonicalSubject,
        };
      }

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
      if (alreadyAttemptedSubject) {
        return {
          allowed: false,
          reason: `You have completed your 1 free PYQ attempt for ${canonicalSubject.toUpperCase()}. Unlock unlimited official past year papers across all subjects with CUETMate Premium.`,
          limitReached: true,
          testType: sessionType,
          currentUsage: 1,
          maxAllowed: FREE_LIMITS.MAX_PYQ_PER_SUBJECT,
          canonicalSubject,
        };
      }

      // Check if this PYQ is Paper 2 or beyond
      const pyqNumMatch = lowerId.match(/pyq[-_]?(\d+)/i);
      const pyqNum = pyqNumMatch && pyqNumMatch[1] ? parseInt(pyqNumMatch[1], 10) : 1;
      if (pyqNum > 1) {
        return {
          allowed: false,
          reason: `PYQ Paper ${pyqNum} requires CUETMate Premium. The Free plan includes Paper 1 for each subject. Upgrade to unlock all official NTA shift papers.`,
          limitReached: true,
          testType: sessionType,
          currentUsage: 0,
          maxAllowed: FREE_LIMITS.MAX_PYQ_PER_SUBJECT,
          canonicalSubject,
        };
      }

      return {
        allowed: true,
        reason: undefined,
        limitReached: false,
        testType: sessionType,
        currentUsage: 0,
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
  } catch (err) {
    console.error("[Eligibility Check Error]:", err);
    // Fail safely closed: Do not grant unrestricted access on unexpected errors
    return {
      allowed: false,
      reason: "Unable to verify session authorization. Please refresh the page or upgrade to CUETMate Premium.",
      limitReached: false,
      testType: "mock",
      currentUsage: 0,
      maxAllowed: 0,
      canonicalSubject: "domain",
    };
  }
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

  const admin = createAdminClient();
  const { error } = await admin.from("user_usage_ledger").upsert(
    {
      user_id: userId,
      session_type: sessionType === "adaptive_drill" ? "practice" : sessionType,
      test_id: testId,
      canonical_subject: finalSubject,
      session_id: sessionId,
    },
    { onConflict: "user_id, session_id" }
  );

  if (error) {
    console.error("[Usage Ledger Record Error]:", error);
    throw error;
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
