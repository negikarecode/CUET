"use client";

import { useState, useEffect, useRef } from "react";
import { useTestStore } from "@/lib/store/useTestStore";

export type EntitlementStatus = "loading" | "premium" | "free";

export interface UseEntitlementOptions {
  initialIsPremium?: boolean;
  initialIsVerified?: boolean;
  initialUserId?: string;
}

export interface UseEntitlementResult {
  isPremium: boolean;
  status: EntitlementStatus;
  isLoading: boolean;
  isConfirmedFree: boolean;
  isConfirmedPremium: boolean;
}

/**
 * Single source of truth hook for Premium entitlement on the client.
 *
 * Guarantees:
 * 1. If server verified (initialIsVerified === true), state is known immediately at SSR/hydration.
 * 2. If unknown (initialIsVerified === false), status is "loading" and isConfirmedFree is false.
 *    The Free Plan / Upgrade banner MUST NOT render until status is confirmed "free".
 * 3. Does not rely solely on localStorage; checks authoritative backend profile and expiration.
 * 4. Automatically reacts to store updates (e.g. loginUser after payment verification).
 */
export function useEntitlement({
  initialIsPremium = false,
  initialIsVerified = false,
  initialUserId,
}: UseEntitlementOptions = {}): UseEntitlementResult {
  const storeUser = useTestStore((s) => s.user);
  const isStorePremium = Boolean(storeUser?.isPremium);

  // Determine initial status synchronously to prevent hydration mismatches and false paywalls on first load
  const initialStatus: EntitlementStatus = initialIsVerified
    ? initialIsPremium
      ? "premium"
      : "free"
    : isStorePremium
    ? "premium"
    : "loading";

  const [status, setStatus] = useState<EntitlementStatus>(initialStatus);
  const [isPremium, setIsPremium] = useState<boolean>(
    initialIsVerified ? Boolean(initialIsPremium) : isStorePremium
  );

  const isVerifiedRef = useRef(initialIsVerified);
  isVerifiedRef.current = initialIsVerified;

  // React if server props change (e.g. after router.refresh())
  useEffect(() => {
    if (initialIsVerified) {
      if (initialIsPremium) {
        setStatus("premium");
        setIsPremium(true);
      } else {
        setStatus("free");
        setIsPremium(false);
      }
    }
  }, [initialIsPremium, initialIsVerified]);

  // React if store user becomes premium (e.g. immediately after Razorpay verify-payment)
  useEffect(() => {
    if (isStorePremium && !isPremium) {
      setIsPremium(true);
      setStatus("premium");
    }
  }, [isStorePremium, isPremium]);

  // Authoritative background verification when not verified on server
  useEffect(() => {
    let isMounted = true;

    async function verifyAuthoritativeEntitlement() {
      // If already verified by the server for this exact session, skip redundant network call
      if (initialIsVerified && (initialIsPremium || !isStorePremium)) {
        return;
      }

      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const authUser = session?.user;
        const uid = authUser?.id || initialUserId || storeUser?.id;

        if (uid && uid !== "guest") {
          // 1. Direct Supabase query to public.profiles
          const { data: profile } = await supabase
            .from("profiles")
            .select("is_premium, subscription_tier, subscription_expires_at")
            .eq("id", uid)
            .maybeSingle();

          let serverIsPremium = Boolean(profile?.is_premium);

          // 2. Direct Supabase query to public.payment_orders for captured orders
          if (!serverIsPremium) {
            const { data: capturedOrder } = await supabase
              .from("payment_orders")
              .select("id")
              .eq("user_id", uid)
              .eq("status", "captured")
              .limit(1)
              .maybeSingle();

            if (capturedOrder) {
              serverIsPremium = true;
            }
          }

          // 3. Fallback to API route with authorization token
          if (!serverIsPremium && session?.access_token) {
            try {
              const res = await fetch(`/api/auth/profile?id=${encodeURIComponent(uid)}`, {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${session.access_token}`,
                },
              });

              if (res.ok) {
                const data = await res.json();
                if (data?.profile?.is_premium) {
                  serverIsPremium = true;
                }
              }
            } catch {}
          }

          if (isMounted) {
            if (serverIsPremium) {
              setIsPremium(true);
              setStatus("premium");
              if (!storeUser?.isPremium) {
                useTestStore.getState().loginUser({ isPremium: true });
              }
            } else {
              if (!isStorePremium) {
                setIsPremium(false);
                setStatus("free");
              }
            }
            return;
          }
        }

        // If no authenticated user exists or profile fetch failed
        if (isMounted) {
          if (!isStorePremium) {
            setIsPremium(false);
            setStatus("free");
          }
        }
      } catch (err) {
        console.warn("[useEntitlement] Client verification notice:", err);
        if (isMounted && !initialIsVerified && !isStorePremium) {
          setIsPremium(false);
          setStatus("free");
        }
      }
    }

    verifyAuthoritativeEntitlement();

    return () => {
      isMounted = false;
    };
  }, [initialIsVerified, initialIsPremium, initialUserId, storeUser?.id, isStorePremium, storeUser?.isPremium]);

  const effectiveIsPremium = Boolean(isPremium || isStorePremium || (initialIsVerified && initialIsPremium));

  return {
    isPremium: effectiveIsPremium,
    status,
    isLoading: status === "loading" && !effectiveIsPremium,
    isConfirmedFree: status === "free" && !effectiveIsPremium,
    isConfirmedPremium: effectiveIsPremium,
  };
}
