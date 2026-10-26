import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserEntitlement } from "@/lib/payments/entitlements";
import { User } from "@supabase/supabase-js";

export interface AuthSuccess {
  success: true;
  user: User;
  userId: string;
}

export interface AuthFailure {
  success: false;
  response: NextResponse;
}

export type AuthResult = AuthSuccess | AuthFailure;

/**
 * Validates that the request has an active, authenticated Supabase candidate session.
 * Standardizes authentication enforcement across all API routes.
 */
export async function requireAuth(_req?: NextRequest | Request): Promise<AuthResult> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return {
        success: false,
        response: NextResponse.json(
          { error: "Authentication required to access this resource.", code: "AUTH_REQUIRED" },
          { status: 401 }
        ),
      };
    }

    return {
      success: true,
      user,
      userId: user.id,
    };
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Session verification failed.", code: "AUTH_FAILED" },
        { status: 401 }
      ),
    };
  }
}

/**
 * Validates that the candidate is authenticated AND has verified their email address.
 */
export async function requireVerifiedAuth(req?: NextRequest | Request): Promise<AuthResult> {
  const auth = await requireAuth(req);
  if (!auth.success) return auth;

  const isEmailVerified = Boolean(
    auth.user.email_confirmed_at ||
      (auth.user as any).confirmed_at ||
      (auth.user.app_metadata?.provider && auth.user.app_metadata.provider !== "email")
  );

  if (!isEmailVerified) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: "Email verification required before accessing this feature.",
          code: "EMAIL_VERIFICATION_REQUIRED",
        },
        { status: 403 }
      ),
    };
  }

  return auth;
}

/**
 * Validates that the candidate has CUETMate Premium entitlement.
 */
export async function requirePremium(
  userId: string,
  featureName = "premium_feature"
): Promise<{
  isPremium: boolean;
  response?: NextResponse;
}> {
  const entitlement = await getUserEntitlement(userId);
  if (!entitlement.isPremium) {
    return {
      isPremium: false,
      response: NextResponse.json(
        {
          error: "Unlock this feature with CUETMate Premium.",
          code: "PAYWALL_FEATURE_LOCKED",
          feature: featureName,
        },
        { status: 403 }
      ),
    };
  }
  return { isPremium: true };
}

/**
 * Validates resource ownership (IDOR defense).
 */
export function requireOwnership(
  authUserId: string,
  targetResourceId: string,
  resourceName = "resource"
): {
  isOwner: boolean;
  response?: NextResponse;
} {
  if (authUserId !== targetResourceId) {
    return {
      isOwner: false,
      response: NextResponse.json(
        {
          error: `Forbidden: You do not have permission to access or modify this ${resourceName}.`,
          code: "FORBIDDEN_OWNERSHIP",
        },
        { status: 403 }
      ),
    };
  }
  return { isOwner: true };
}
