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
  eventId?: string;
  event?: string;
  userId?: string;
  tier?: string;
  orderId?: string;
  paymentId?: string;
  amount?: number;
  currency?: string;
  refundId?: string;
  refundAmount?: number;
  disputeId?: string;
  disputeAmount?: number;
  disputeStatus?: string;
  disputeReason?: string;
  paymentStatus?: string;
  paymentAmountRefunded?: number;
  entityType?: "payment" | "order" | "refund" | "dispute";
  paymentEntity?: any;
  orderEntity?: any;
  refundEntity?: any;
  disputeEntity?: any;
  rawPayload?: any;
}

export interface PaymentProvider {
  name: string;
  isLive: boolean;
  createOrder(params: CreateOrderParams): Promise<OrderResult>;
  verifySignature(params: VerifySignatureParams): { isValid: boolean; error?: string };
  verifyPaymentStatus(paymentId: string, orderId: string): Promise<{ isPaid: boolean; amount?: number; currency?: string; error?: string }>;
  verifyWebhook(rawBody: string, signature: string): WebhookVerificationResult;
  fetchOrderPayments(orderId: string): Promise<Array<{ id: string; status: string; amount: number; currency: string }>>;
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
    this.isLive = Boolean(keyId && keyId.startsWith("rzp_live_"));
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

  async verifyPaymentStatus(
    paymentId: string,
    orderId: string
  ): Promise<{ isPaid: boolean; amount?: number; currency?: string; error?: string }> {
    try {
      const payment: any = await this.client.payments.fetch(paymentId);
      if (!payment) {
        return { isPaid: false, error: "Payment record not found on Razorpay server." };
      }
      if (payment.order_id && payment.order_id !== orderId) {
        return {
          isPaid: false,
          error: `Payment order ID mismatch: expected ${orderId}, found ${payment.order_id}`,
        };
      }

      // CRITICAL SEC-02: 'authorized' is NOT paid. Only 'captured' is paid.
      // If the payment is authorized, attempt server-side capture via Razorpay API.
      if (payment.status === "authorized") {
        try {
          const captureResponse: any = await this.client.payments.capture(
            paymentId,
            Number(payment.amount),
            String(payment.currency)
          );
          if (captureResponse && captureResponse.status === "captured") {
            return {
              isPaid: true,
              amount: Number(captureResponse.amount),
              currency: String(captureResponse.currency),
            };
          }
        } catch (captureErr: any) {
          console.warn("[Razorpay Auto-Capture Attempt Notice]:", captureErr?.message);
        }

        // Authorization alone is NEVER sufficient to activate Premium
        return {
          isPaid: false,
          error: "Payment is authorized but not captured. Payment capture is required before Premium activation.",
        };
      }

      if (payment.status !== "captured") {
        return {
          isPaid: false,
          error: `Payment in non-captured state: ${payment.status}`,
        };
      }

      return {
        isPaid: true,
        amount: Number(payment.amount),
        currency: String(payment.currency),
      };
    } catch (err: any) {
      console.error("[Razorpay Payment Status Query Error]:", err?.message);
      // Strictly fail-closed if payment status query to gateway fails
      return {
        isPaid: false,
        error: `Gateway payment verification failed: ${err?.message || "Unable to confirm payment status with Razorpay."}`,
      };
    }
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
      const eventId = payload.event_id || payload.id || undefined;
      
      const paymentEntity = payload.payload?.payment?.entity;
      const orderEntity = payload.payload?.order?.entity;
      const refundEntity = payload.payload?.refund?.entity;
      const disputeEntity = payload.payload?.dispute?.entity;

      // CRITICAL P1: Distinguish payment, order, refund and dispute entities.
      // NEVER use an order ID as a payment ID. Do not synthesize payment IDs.
      let paymentId: string | undefined = undefined;
      if (paymentEntity?.id && (paymentEntity.entity === "payment" || String(paymentEntity.id).startsWith("pay_"))) {
        paymentId = paymentEntity.id;
      } else if (refundEntity?.payment_id) {
        paymentId = refundEntity.payment_id;
      } else if (disputeEntity?.payment_id) {
        paymentId = disputeEntity.payment_id;
      }

      const orderId =
        orderEntity?.id ||
        paymentEntity?.order_id ||
        undefined;

      const refundId = refundEntity?.id;
      const refundAmount = typeof refundEntity?.amount === "number" ? refundEntity.amount : undefined;

      const disputeId = disputeEntity?.id;
      const disputeAmount = typeof disputeEntity?.amount === "number" ? disputeEntity.amount : undefined;
      const disputeStatus = disputeEntity?.status;
      const disputeReason = disputeEntity?.reason_code;

      const notes =
        orderEntity?.notes ||
        paymentEntity?.notes ||
        refundEntity?.notes ||
        disputeEntity?.notes ||
        {};

      let amount: number | undefined = undefined;
      if (typeof paymentEntity?.amount === "number") {
        amount = paymentEntity.amount;
      } else if (typeof orderEntity?.amount === "number") {
        amount = orderEntity.amount;
      } else if (typeof refundEntity?.amount === "number") {
        amount = refundEntity.amount;
      } else if (typeof disputeEntity?.amount === "number") {
        amount = disputeEntity.amount;
      }

      const currency =
        paymentEntity?.currency ||
        orderEntity?.currency ||
        refundEntity?.currency ||
        disputeEntity?.currency ||
        "INR";

      let entityType: "payment" | "order" | "refund" | "dispute" | undefined = undefined;
      if (event?.startsWith("payment.dispute.")) {
        entityType = "dispute";
      } else if (event?.startsWith("refund.")) {
        entityType = "refund";
      } else if (event?.startsWith("order.")) {
        entityType = "order";
      } else if (event?.startsWith("payment.")) {
        entityType = "payment";
      }

      return {
        isValid: true,
        eventId,
        event,
        userId: notes.userId,
        tier: notes.planId || undefined,
        orderId,
        paymentId,
        amount,
        currency,
        refundId,
        refundAmount,
        disputeId,
        disputeAmount,
        disputeStatus,
        disputeReason,
        paymentStatus: paymentEntity?.status,
        paymentAmountRefunded: typeof paymentEntity?.amount_refunded === "number" ? paymentEntity.amount_refunded : undefined,
        entityType,
        paymentEntity,
        orderEntity,
        refundEntity,
        disputeEntity,
        rawPayload: payload,
      };
    } catch {
      return { isValid: false };
    }
  }

  async fetchOrderPayments(
    orderId: string
  ): Promise<Array<{ id: string; status: string; amount: number; currency: string }>> {
    try {
      const res: any = await this.client.orders.fetchPayments(orderId);
      const items = res?.items || (Array.isArray(res) ? res : []);
      return items.map((p: any) => ({
        id: String(p.id),
        status: String(p.status),
        amount: Number(p.amount),
        currency: String(p.currency),
      }));
    } catch (err: any) {
      console.warn(`[Razorpay fetchOrderPayments Error for order ${orderId}]:`, err?.message);
      return [];
    }
  }
}

/**
 * Sandboxed Mock Provider for Development and Pre-Onboarding environments
 */
export class MockSandboxProvider implements PaymentProvider {
  name = "mock";
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

  async verifyPaymentStatus(
    paymentId: string,
    _orderId: string
  ): Promise<{ isPaid: boolean; amount?: number; currency?: string; error?: string }> {
    if (paymentId.startsWith("pay_sim_authorized_")) {
      return {
        isPaid: false,
        error: "Payment is authorized but not captured. Payment capture is required before Premium activation.",
      };
    }
    if (paymentId.startsWith("pay_sim_failed_")) {
      return {
        isPaid: false,
        error: "Payment in failed state.",
      };
    }
    if (paymentId.startsWith("pay_sim_unknown_")) {
      return {
        isPaid: false,
        error: "Payment in unknown non-captured state.",
      };
    }
    if (paymentId.startsWith("pay_sim_")) {
      return { isPaid: true, amount: 49900, currency: "INR" };
    }
    return { isPaid: false, error: "Invalid sandbox payment reference." };
  }

  async fetchOrderPayments(
    orderId: string
  ): Promise<Array<{ id: string; status: string; amount: number; currency: string }>> {
    if (orderId && orderId.includes("has_captured_payment")) {
      return [{ id: `pay_sim_captured_${orderId}`, status: "captured", amount: 79900, currency: "INR" }];
    }
    return [];
  }

  verifyWebhook(rawBody: string, signature: string): WebhookVerificationResult {
    if (signature === "mock_webhook_sig" || signature.startsWith("mock_")) {
      try {
        const payload = JSON.parse(rawBody);
        const event = payload.event;
        const eventId = payload.event_id || payload.id || undefined;
        const paymentEntity = payload.payload?.payment?.entity;
        const orderEntity = payload.payload?.order?.entity;
        const refundEntity = payload.payload?.refund?.entity;
        const disputeEntity = payload.payload?.dispute?.entity;

        let paymentId: string | undefined = undefined;
        if (paymentEntity?.id && (paymentEntity.entity === "payment" || String(paymentEntity.id).startsWith("pay_"))) {
          paymentId = paymentEntity.id;
        } else if (refundEntity?.payment_id) {
          paymentId = refundEntity.payment_id;
        } else if (disputeEntity?.payment_id) {
          paymentId = disputeEntity.payment_id;
        }

        const notes =
          orderEntity?.notes ||
          paymentEntity?.notes ||
          refundEntity?.notes ||
          disputeEntity?.notes ||
          {};

        let entityType: "payment" | "order" | "refund" | "dispute" | undefined = undefined;
        if (event?.startsWith("payment.dispute.")) entityType = "dispute";
        else if (event?.startsWith("refund.")) entityType = "refund";
        else if (event?.startsWith("order.")) entityType = "order";
        else if (event?.startsWith("payment.")) entityType = "payment";

        return {
          isValid: true,
          eventId,
          event,
          userId: notes.userId,
          tier: notes.planId || undefined,
          orderId: orderEntity?.id || paymentEntity?.order_id || undefined,
          paymentId,
          amount: paymentEntity?.amount || orderEntity?.amount || refundEntity?.amount,
          currency: paymentEntity?.currency || orderEntity?.currency || "INR",
          refundId: refundEntity?.id,
          refundAmount: typeof refundEntity?.amount === "number" ? refundEntity.amount : undefined,
          disputeId: disputeEntity?.id,
          disputeAmount: typeof disputeEntity?.amount === "number" ? disputeEntity.amount : undefined,
          disputeStatus: disputeEntity?.status,
          disputeReason: disputeEntity?.reason_code,
          paymentStatus: paymentEntity?.status,
          paymentAmountRefunded: typeof paymentEntity?.amount_refunded === "number" ? paymentEntity.amount_refunded : undefined,
          entityType,
          paymentEntity,
          orderEntity,
          refundEntity,
          disputeEntity,
          rawPayload: payload,
        };
      } catch {
        return { isValid: false };
      }
    }
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

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "[CRITICAL SECURITY] Razorpay payment provider credentials unconfigured in production environment. Failing closed to prevent mock sandbox bypass."
    );
  }

  return new MockSandboxProvider();
}
