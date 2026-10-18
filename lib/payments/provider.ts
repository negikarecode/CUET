import crypto from "crypto";
import Razorpay from "razorpay";

export interface CreateOrderParams {
  userId: string;
  userEmail: string;
  userName: string;
  amountPaise: number;
  currency: string;
  planId: string;
  isPromotional: boolean;
}

export interface OrderResult {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  isSimulated: boolean;
  notes?: Record<string, any>;
}

export interface VerifySignatureParams {
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  event?: string;
  userId?: string;
  tier?: string;
  orderId?: string;
  paymentId?: string;
  amount?: number;
}

export interface PaymentProvider {
  name: string;
  isLive: boolean;
  createOrder(params: CreateOrderParams): Promise<OrderResult>;
  verifySignature(params: VerifySignatureParams): { isValid: boolean; error?: string };
  verifyWebhook(rawBody: string, signature: string): WebhookVerificationResult;
}

/**
 * Production Razorpay Provider
 */
export class RazorpayProvider implements PaymentProvider {
  name = "razorpay";
  isLive = true;
  private keyId: string;
  private keySecret: string;
  private webhookSecret: string;
  private client: Razorpay;

  constructor(keyId: string, keySecret: string, webhookSecret: string) {
    this.keyId = keyId;
    this.keySecret = keySecret;
    this.webhookSecret = webhookSecret;
    this.client = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  async createOrder(params: CreateOrderParams): Promise<OrderResult> {
    const receipt = `rcpt_${params.userId.slice(0, 8)}_${Date.now()}`.slice(0, 40);

    const order = await this.client.orders.create({
      amount: params.amountPaise,
      currency: params.currency,
      receipt,
      notes: {
        userId: params.userId,
        userEmail: params.userEmail,
        planId: params.planId,
        isPromotional: String(params.isPromotional),
        platform: "CUET_AI_PREP",
      },
    });

    return {
      orderId: order.id,
      amount: params.amountPaise,
      currency: params.currency,
      keyId: this.keyId,
      isSimulated: false,
      notes: order.notes as Record<string, any>,
    };
  }

  verifySignature({ orderId, paymentId, signature }: VerifySignatureParams): {
    isValid: boolean;
    error?: string;
  } {
    if (!this.keySecret || this.keySecret.includes("placeholder") || this.keySecret.trim() === "") {
      return { isValid: false, error: "Razorpay Secret Key is unconfigured. Failing closed." };
    }

    if (!orderId || !paymentId || !signature) {
      return { isValid: false, error: "Missing required signature verification parameters." };
    }

    const expectedSignature = crypto
      .createHmac("sha256", this.keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const expectedBuf = Buffer.from(expectedSignature, "utf-8");
    const actualBuf = Buffer.from(signature, "utf-8");

    if (expectedBuf.length !== actualBuf.length) {
      return { isValid: false, error: "Signature buffer length mismatch." };
    }

    const isMatch = crypto.timingSafeEqual(expectedBuf, actualBuf);
    return {
      isValid: isMatch,
      error: isMatch ? undefined : "Cryptographic HMAC-SHA256 signature mismatch.",
    };
  }

  verifyWebhook(rawBody: string, signature: string): WebhookVerificationResult {
    if (!this.webhookSecret || this.webhookSecret.includes("placeholder") || this.webhookSecret.trim() === "") {
      console.error("[SECURITY] Webhook secret missing or placeholder. Failing closed.");
      return { isValid: false };
    }

    const expectedSignature = crypto
      .createHmac("sha256", this.webhookSecret)
      .update(rawBody)
      .digest("hex");

    const isMatch =
      expectedSignature.length === signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "utf-8"),
        Buffer.from(signature, "utf-8")
      );

    if (!isMatch) {
      console.warn("[SECURITY] Razorpay Webhook signature mismatch.");
      return { isValid: false };
    }

    try {
      const payload = JSON.parse(rawBody);
      const event = payload.event;
      const entity = payload.payload?.payment?.entity || payload.payload?.order?.entity;
      const notes = entity?.notes || {};

      return {
        isValid: true,
        event,
        userId: notes.userId,
        tier: notes.planId || "all_access_pass",
        orderId: entity?.order_id || entity?.id,
        paymentId: entity?.id,
        amount: entity?.amount,
      };
    } catch {
      return { isValid: false };
    }
  }
}

/**
 * Sandboxed Mock Provider for Development and Pre-Onboarding environments
 */
export class MockSandboxProvider implements PaymentProvider {
  name = "mock_sandbox";
  isLive = false;

  async createOrder(params: CreateOrderParams): Promise<OrderResult> {
    const simOrderId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    console.log(
      `[SANDBOX] Generated simulated payment order ${simOrderId} for ₹${params.amountPaise / 100}`
    );

    return {
      orderId: simOrderId,
      amount: params.amountPaise,
      currency: params.currency,
      keyId: "rzp_test_placeholder_key_id",
      isSimulated: true,
      notes: {
        userId: params.userId,
        planId: params.planId,
      },
    };
  }

  verifySignature(params: VerifySignatureParams): { isValid: boolean; error?: string } {
    if (!params.orderId || !params.paymentId) {
      return { isValid: false, error: "Missing order ID or payment ID in sandbox verification." };
    }
    // In sandbox, validates that paymentId has safe sandbox signature
    const isValid = params.paymentId.startsWith("pay_sim_") || params.signature === "simulated_signature";
    return {
      isValid,
      error: isValid ? undefined : "Invalid sandbox payment signature format.",
    };
  }

  verifyWebhook(_rawBody: string, _signature: string): WebhookVerificationResult {
    return { isValid: false };
  }
}

/**
 * Factory returning the authoritative active provider based on environment secrets.
 */
export function getPaymentProvider(): PaymentProvider {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

  const isConfigured =
    Boolean(keyId && keySecret) &&
    !keyId?.includes("placeholder") &&
    !keySecret?.includes("placeholder") &&
    keyId !== "rzp_test_placeholder_key_id";

  if (isConfigured && keyId && keySecret) {
    return new RazorpayProvider(keyId, keySecret, webhookSecret);
  }

  return new MockSandboxProvider();
}
