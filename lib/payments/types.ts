/**
 * CUETMate Entitlements & Payments Type Definitions
 */

export type SubscriptionTier = "free" | "ai_practice_pass" | "all_access_pass";

export type SessionType = "mock" | "practice" | "pyq";

export type AccessState = "UNVERIFIED" | "FREE" | "PREMIUM";

export interface UserEntitlement {
  userId: string;
  isPremium: boolean;
  accessState: AccessState;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiresAt: string | null;
  isActive: boolean;
}

export interface UserUsageSummary {
  userId: string;
  isPremium: boolean;
  accessState: AccessState;
  mockSessionsCompleted: number;
  maxFreeMockSessions: number;
  practiceSessionsCompleted: number;
  maxFreePracticeSessions: number;
  pyqSubjectsAttempted: string[];
  maxFreePyqPerSubject: number;
  // Distinct content item tracking across platform
  unlockedMockTestIds?: string[];
  maxFreeDistinctMocks?: number;
  unlockedPracticeTestIds?: string[];
  maxFreeDistinctPractice?: number;
  unlockedPyqTestIds?: string[];
  maxFreeDistinctPyq?: number;
}

export interface TestSessionEligibility {
  allowed: boolean;
  reason?: string;
  limitReached: boolean;
  testType: SessionType | "adaptive_drill" | "unknown";
  currentUsage: number;
  maxAllowed: number;
  canonicalSubject?: string;
  isUnlockedContent?: boolean;
}

export interface PricingOfferDetails {
  planId: string;
  planName: string;
  standardPricePaise: number;
  standardPriceInr: number;
  promotionalPricePaise: number;
  promotionalPriceInr: number;
  isPromotionalActive: boolean;
  totalPromotionalSlots: number;
  claimedPromotionalSlots: number;
  remainingPromotionalSlots: number;
  currentPricePaise: number;
  currentPriceInr: number;
  currency: string;
  billingDuration: string;
  taxPolicy: string;
}

export interface CreateOrderRequest {
  action: "create-order";
  planId?: string;
}

export interface VerifyPaymentRequest {
  action: "verify";
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  tier?: string;
}

export interface RazorpayStandardOrderResponse {
  order_id: string;
  orderId?: string;
  amount: number;
  currency: string;
  key_id?: string;
}

export interface RazorpayStandardVerificationPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  userId?: string;
  tier?: string;
}

