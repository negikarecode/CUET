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

  // Determine initial status synchronously to prevent hydration mismatches
  const initialStatus: EntitlementStatus = initialIsVerified
    ? initialIsPremium
      ? "premium"
      : "free"
    : "loading";

  const [status, setStatus] = useState<EntitlementStatus>(initialStatus);
  const [isPremium, setIsPremium] = useState<boolean>(
    initialIsVerified ? Boolean(initialIsPremium) : false
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
          data: { user: authUser },
        } = await supabase.auth.getUser();

        const uid = authUser?.id || initialUserId || storeUser?.id;

        if (uid && uid !== "guest") {
          const res = await fetch(`/api/auth/profile?id=${encodeURIComponent(uid)}`, {
            cache: "no-store",
          });

          if (res.ok) {
            const data = await res.json();
            const serverIsPremium = Boolean(data?.profile?.is_premium);

            if (isMounted) {
              if (serverIsPremium) {
                setIsPremium(true);
                setStatus("premium");
                if (!storeUser?.isPremium) {
                  useTestStore.getState().loginUser({ isPremium: true });
                }
              } else {
                setIsPremium(false);
                setStatus("free");
                if (storeUser?.isPremium) {
                  // Revoke invalid or expired local premium flag
                  useTestStore.getState().loginUser({ isPremium: false });
                }
              }
              return;
            }
          }
        }

        // If no authenticated user exists or profile fetch failed
        if (isMounted) {
          setIsPremium(false);
          setStatus("free");
        }
      } catch (err) {
        console.warn("[useEntitlement] Client verification notice:", err);
        if (isMounted && !initialIsVerified) {
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

  return {
    isPremium,
    status,
    isLoading: status === "loading",
    isConfirmedFree: status === "free",
    isConfirmedPremium: status === "premium",
  };
}
