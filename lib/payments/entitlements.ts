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
  MAX_DISTINCT_MOCKS: 3,
  MAX_DISTINCT_PRACTICE: 3,
  MAX_DISTINCT_PYQ: 1,
  // Backwards-compatible session aliases
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
 * Checks whether a testId (or its canonical resolved key) is within the designated free test set
 * or matches an eligible free template (Mocks 1-3, Unit 1 Practice Tests 1-3, PYQ Paper 1).
 */
export function isDesignatedFreeTest(testId: string): boolean {
  if (!testId) return false;
  const canonical = resolveCanonicalTestId(testId) || testId.toLowerCase().trim();
  if (DESIGNATED_FREE_TEST_IDS.has(canonical)) return true;

  const { sessionType } = classifyTestType(canonical);
  if (sessionType === "mock") {
    const mockMatch =
      canonical.match(/\bmock(?:\s+paper|\s+test|\s+exam)?[-_]?\s*(\d+)\b/i) ||
      canonical.match(/(?:mock|paper)[-_]?(\d+)/i) ||
      canonical.match(/-(\d+)$/);
    const mockNum = mockMatch && mockMatch[1] ? parseInt(mockMatch[1], 10) : 1;
    return mockNum >= 1 && mockNum <= 3;
  }
  if (sessionType === "practice") {
    const unitMatch = canonical.match(/unit[-_]?(\d+)/i);
    const testMatch = canonical.match(/test[-_]?(\d+)/i);
    const unitNum = unitMatch && unitMatch[1] ? parseInt(unitMatch[1], 10) : 1;
    const testNum = testMatch && testMatch[1] ? parseInt(testMatch[1], 10) : 1;
    return unitNum === 1 && testNum >= 1 && testNum <= 3;
  }
  if (sessionType === "pyq") {
    const pyqMatch = canonical.match(/pyq[-_]?(\d+)/i);
    const pyqNum = pyqMatch && pyqMatch[1] ? parseInt(pyqMatch[1], 10) : 1;
    return pyqNum === 1;
  }
  return false;
}

export const PRICING_CONFIG = {
  STANDARD_PRICE_PAISE: 79900,
  STANDARD_PRICE_INR: 799,
  PROMOTIONAL_PRICE_PAISE: 200,
  PROMOTIONAL_PRICE_INR: 2,
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
    unlockedMockTestIds: [],
    maxFreeDistinctMocks: FREE_LIMITS.MAX_DISTINCT_MOCKS,
    unlockedPracticeTestIds: [],
    maxFreeDistinctPractice: FREE_LIMITS.MAX_DISTINCT_PRACTICE,
    unlockedPyqTestIds: [],
    maxFreeDistinctPyq: FREE_LIMITS.MAX_DISTINCT_PYQ,
  };

  if (!userId || userId === "guest") {
    return defaultSummary;
  }

  const entitlement = await getUserEntitlement(userId);
  defaultSummary.isPremium = entitlement.isPremium;
  defaultSummary.accessState = entitlement.accessState;

  try {
    const admin = createAdminClient();

    const distinctMocks = new Set<string>();
    const distinctPractice = new Set<string>();
    const distinctPyqs = new Set<string>();

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
        const rawId = (row.test_id || "").toLowerCase().trim();
        const canonical = resolveCanonicalTestId(rawId) || rawId;
        const sType = row.session_type || classifyTestType(canonical).sessionType;

        if (sType === "mock") {
          mocks++;
          if (canonical) distinctMocks.add(canonical);
          if (rawId) distinctMocks.add(rawId);
        } else if (sType === "practice") {
          practices++;
          if (canonical) distinctPractice.add(canonical);
          if (rawId) distinctPractice.add(rawId);
        } else if (sType === "pyq") {
          if (row.canonical_subject) pyqSubjects.add(row.canonical_subject);
          if (canonical) distinctPyqs.add(canonical);
          if (rawId) distinctPyqs.add(rawId);
        }
      });

      return {
        ...defaultSummary,
        mockSessionsCompleted: mocks,
        practiceSessionsCompleted: practices,
        pyqSubjectsAttempted: Array.from(pyqSubjects),
        unlockedMockTestIds: Array.from(distinctMocks),
        unlockedPracticeTestIds: Array.from(distinctPractice),
        unlockedPyqTestIds: Array.from(distinctPyqs),
      };
    }

    // Strategy 2 (Fallback): Derive from public.user_attempts
    const { data: userAttempts, error: attemptsError } = await admin
      .from("user_attempts")
      .select("test_id, attempt_id, created_at, tests(subject, title)")
      .eq("user_id", userId);

    if (!attemptsError && userAttempts) {
      let mocks = 0;
      let practices = 0;
      const pyqSubjects = new Set<string>();

      userAttempts.forEach((ua: any) => {
        const testObj = Array.isArray(ua.tests) ? ua.tests[0] : ua.tests;
        const rawId = (ua.test_id ? String(ua.test_id) : testObj?.title || "").toLowerCase().trim();
        const canonical = resolveCanonicalTestId(rawId) || rawId;
        const { sessionType, canonicalSubject } = classifyTestType(rawId);

        if (sessionType === "mock") {
          mocks++;
          if (canonical) distinctMocks.add(canonical);
          if (rawId) distinctMocks.add(rawId);
        } else if (sessionType === "practice") {
          practices++;
          if (canonical) distinctPractice.add(canonical);
          if (rawId) distinctPractice.add(rawId);
        } else if (sessionType === "pyq") {
          pyqSubjects.add(canonicalSubject);
          if (canonical) distinctPyqs.add(canonical);
          if (rawId) distinctPyqs.add(rawId);
        }
      });

      return {
        ...defaultSummary,
        mockSessionsCompleted: mocks,
        practiceSessionsCompleted: practices,
        pyqSubjectsAttempted: Array.from(pyqSubjects),
        unlockedMockTestIds: Array.from(distinctMocks),
        unlockedPracticeTestIds: Array.from(distinctPractice),
        unlockedPyqTestIds: Array.from(distinctPyqs),
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
        isUnlockedContent: true,
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
    const lowerId = (testId || "").toLowerCase().trim();
    const canonicalId = resolveCanonicalTestId(testId) || lowerId;

    const unlockedMocks = new Set(usage.unlockedMockTestIds || []);
    const unlockedPractice = new Set(usage.unlockedPracticeTestIds || []);
    const unlockedPyq = new Set(usage.unlockedPyqTestIds || []);

    // Free candidates are strictly restricted to eligible free templates
    if (!isDesignatedFreeTest(testId)) {
      return {
        allowed: false,
        reason: "This test is exclusive to CUETMate Premium. The Free plan includes up to 3 distinct mock exams (Mocks 1-3), 3 distinct practice tests (Unit 1 Tests 1-3), and 1 distinct PYQ paper with unlimited retries. Upgrade to CUETMate Premium to unlock all tests.",
        limitReached: true,
        testType: sessionType,
        currentUsage:
          sessionType === "mock"
            ? unlockedMocks.size
            : sessionType === "practice"
            ? unlockedPractice.size
            : unlockedPyq.size,
        maxAllowed:
          sessionType === "mock"
            ? FREE_LIMITS.MAX_DISTINCT_MOCKS
            : sessionType === "practice"
            ? FREE_LIMITS.MAX_DISTINCT_PRACTICE
            : FREE_LIMITS.MAX_DISTINCT_PYQ,
        canonicalSubject,
      };
    }

    if (sessionType === "mock") {
      const mockMatch =
        lowerId.match(/\bmock(?:\s+paper|\s+test|\s+exam)?[-_]?\s*(\d+)\b/i) ||
        lowerId.match(/(?:mock|paper)[-_]?(\d+)/i) ||
        lowerId.match(/-(\d+)$/);
      const mockNum = mockMatch && mockMatch[1] ? parseInt(mockMatch[1], 10) : 1;

      if (mockNum > 3) {
        return {
          allowed: false,
          reason: `Mock ${mockNum} requires CUETMate Premium. The Free plan includes Mock 1 to Mock 3. Upgrade to unlock all 20 full-length mocks.`,
          limitReached: true,
          testType: sessionType,
          currentUsage: unlockedMocks.size,
          maxAllowed: FREE_LIMITS.MAX_DISTINCT_MOCKS,
          canonicalSubject,
        };
      }

      // If already unlocked, allow unlimited retries with zero restrictions
      const isAlreadyUnlocked = unlockedMocks.has(canonicalId) || unlockedMocks.has(lowerId);
      if (isAlreadyUnlocked) {
        return {
          allowed: true,
          limitReached: false,
          testType: sessionType,
          currentUsage: unlockedMocks.size,
          maxAllowed: FREE_LIMITS.MAX_DISTINCT_MOCKS,
          canonicalSubject,
          isUnlockedContent: true,
        };
      }

      // New distinct mock item: check if user is under distinct allowance across platform
      const isUnderLimit = unlockedMocks.size < FREE_LIMITS.MAX_DISTINCT_MOCKS;
      return {
        allowed: isUnderLimit,
        reason: isUnderLimit
          ? undefined
          : `You have reached your Free plan allowance of ${FREE_LIMITS.MAX_DISTINCT_MOCKS} distinct mock exams. Upgrade to CUETMate Premium for unlimited full-length mocks across all subjects.`,
        limitReached: !isUnderLimit,
        testType: sessionType,
        currentUsage: unlockedMocks.size,
        maxAllowed: FREE_LIMITS.MAX_DISTINCT_MOCKS,
        canonicalSubject,
      };
    }

    if (sessionType === "practice") {
      const unitMatch = lowerId.match(/unit[-_]?(\d+)/i);
      const testMatch = lowerId.match(/test[-_]?(\d+)/i);
      const unitNum = unitMatch && unitMatch[1] ? parseInt(unitMatch[1], 10) : 1;
      const testNum = testMatch && testMatch[1] ? parseInt(testMatch[1], 10) : 1;

      if (unitNum > 1 || testNum > 3) {
        return {
          allowed: false,
          reason: "This unit practice test requires CUETMate Premium. The Free plan includes up to 3 distinct practice tests from Unit 1. Upgrade to unlock all practice tests across all chapters.",
          limitReached: true,
          testType: sessionType,
          currentUsage: unlockedPractice.size,
          maxAllowed: FREE_LIMITS.MAX_DISTINCT_PRACTICE,
          canonicalSubject,
        };
      }

      // If already unlocked, allow unlimited retries with zero restrictions
      const isAlreadyUnlocked = unlockedPractice.has(canonicalId) || unlockedPractice.has(lowerId);
      if (isAlreadyUnlocked) {
        return {
          allowed: true,
          limitReached: false,
          testType: sessionType,
          currentUsage: unlockedPractice.size,
          maxAllowed: FREE_LIMITS.MAX_DISTINCT_PRACTICE,
          canonicalSubject,
          isUnlockedContent: true,
        };
      }

      // New distinct practice item: check if user is under distinct allowance across platform
      const isUnderLimit = unlockedPractice.size < FREE_LIMITS.MAX_DISTINCT_PRACTICE;
      return {
        allowed: isUnderLimit,
        reason: isUnderLimit
          ? undefined
          : `You have reached your Free plan allowance of ${FREE_LIMITS.MAX_DISTINCT_PRACTICE} distinct unit practice tests. Upgrade to CUETMate Premium for unlimited practice across all units.`,
        limitReached: !isUnderLimit,
        testType: sessionType,
        currentUsage: unlockedPractice.size,
        maxAllowed: FREE_LIMITS.MAX_DISTINCT_PRACTICE,
        canonicalSubject,
      };
    }

    if (sessionType === "pyq") {
      const pyqNumMatch = lowerId.match(/pyq[-_]?(\d+)/i);
      const pyqNum = pyqNumMatch && pyqNumMatch[1] ? parseInt(pyqNumMatch[1], 10) : 1;
      if (pyqNum > 1) {
        return {
          allowed: false,
          reason: `PYQ Paper ${pyqNum} requires CUETMate Premium. The Free plan includes Paper 1 for 1 distinct subject. Upgrade to unlock all official NTA shift papers.`,
          limitReached: true,
          testType: sessionType,
          currentUsage: unlockedPyq.size,
          maxAllowed: FREE_LIMITS.MAX_DISTINCT_PYQ,
          canonicalSubject,
        };
      }

      // If already unlocked, allow unlimited retries with zero restrictions
      const isAlreadyUnlocked = unlockedPyq.has(canonicalId) || unlockedPyq.has(lowerId);
      if (isAlreadyUnlocked) {
        return {
          allowed: true,
          limitReached: false,
          testType: sessionType,
          currentUsage: unlockedPyq.size,
          maxAllowed: FREE_LIMITS.MAX_DISTINCT_PYQ,
          canonicalSubject,
          isUnlockedContent: true,
        };
      }

      // New distinct PYQ item: check if user is under distinct allowance across platform
      const isUnderLimit = unlockedPyq.size < FREE_LIMITS.MAX_DISTINCT_PYQ;
      return {
        allowed: isUnderLimit,
        reason: isUnderLimit
          ? undefined
          : `You have reached your Free plan allowance of ${FREE_LIMITS.MAX_DISTINCT_PYQ} distinct PYQ paper. Upgrade to CUETMate Premium for unlimited official past year papers across all subjects.`,
        limitReached: !isUnderLimit,
        testType: sessionType,
        currentUsage: unlockedPyq.size,
        maxAllowed: FREE_LIMITS.MAX_DISTINCT_PYQ,
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
