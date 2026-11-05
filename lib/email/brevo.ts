/**
 * Brevo Transactional Email Service
 * Handles sending transactional emails (such as 6-digit OTP verification codes)
 * via Brevo's v3 SMTP REST API.
 */

export interface SendEmailPayload {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  textContent?: string;
  sender?: { name: string; email: string };
}

export interface SendOtpOptions {
  email: string;
  code: string;
  type: "signup" | "login" | "recovery";
  expiryMinutes?: number;
}

export class BrevoError extends Error {
  code?: string;
  status?: number;
  isIpBlocked?: boolean;

  constructor(message: string, options?: { code?: string; status?: number; isIpBlocked?: boolean }) {
    super(message);
    this.name = "BrevoError";
    this.code = options?.code;
    this.status = options?.status;
    this.isIpBlocked = options?.isIpBlocked;
  }
}

/**
 * Sends a transactional email through Brevo's REST API.
 */
export async function sendBrevoEmail(payload: SendEmailPayload): Promise<{ messageId?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new BrevoError("BREVO_API_KEY environment variable is not configured.", { status: 500 });
  }

  const rawSenderEmail = (process.env.BREVO_SENDER_EMAIL || "").trim();
  const rawSenderName = (process.env.BREVO_SENDER_NAME || "").trim();

  // Defensive resolution: ensure senderEmail is a valid email, not a swapped name string
  let senderEmail = "cuetmateofficial@gmail.com";
  let senderName = "CUETMate";

  if (rawSenderEmail.includes("@") && rawSenderEmail.includes(".")) {
    senderEmail = rawSenderEmail;
  } else if (rawSenderName.includes("@") && rawSenderName.includes(".")) {
    // If env vars were swapped on deployment, recover gracefully
    senderEmail = rawSenderName;
  }

  if (rawSenderName && !rawSenderName.includes("@")) {
    senderName = rawSenderName;
  } else if (rawSenderEmail && !rawSenderEmail.includes("@")) {
    senderName = rawSenderEmail;
  }

  const body = {
    sender: payload.sender || { name: senderName, email: senderEmail },
    to: payload.to,
    subject: payload.subject,
    htmlContent: payload.htmlContent,
    textContent: payload.textContent || undefined,
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || "Failed to dispatch email via Brevo.";
    const code = data?.code || "BREVO_API_ERROR";

    // Detect Brevo IP authorization restrictions
    const isIpBlocked =
      typeof message === "string" &&
      (message.toLowerCase().includes("unrecognised ip") ||
        message.toLowerCase().includes("unauthorised ip") ||
        message.toLowerCase().includes("not authorised"));

    if (isIpBlocked) {
      console.error(
        "[Brevo IP Security Block]: Brevo blocked this request due to IP whitelist restrictions. " +
          "Visit https://app.brevo.com/security/authorised_ips and click 'Deactivate blocking' or authorize your server IP."
      );
      throw new BrevoError(
        "Email delivery provider requires IP authorization. Please visit Brevo Settings -> Security -> Authorized IPs and click 'Deactivate blocking'.",
        { code: "BREVO_IP_UNAUTHORIZED", status: 401, isIpBlocked: true }
      );
    }

    throw new BrevoError(message, { code, status: response.status });
  }

  return { messageId: data?.messageId };
}

/**
 * Builds a responsive, branded HTML email template for 6-digit OTP codes.
 */
export function buildOtpEmailHtml({
  code,
  type,
  expiryMinutes = 10,
}: {
  code: string;
  type: "signup" | "login" | "recovery";
  expiryMinutes?: number;
}): { subject: string; html: string; text: string } {
  let title = "Verify Your Email Address";
  let subtitle = "Welcome to CUETMate. Enter this 6-digit code to complete your registration:";
  let subject = `Your CUETMate Verification Code: ${code}`;

  if (type === "login") {
    title = "Sign In With One-Time Code";
    subtitle = "You requested a passwordless login to your CUETMate account:";
    subject = `CUETMate Login Code: ${code}`;
  } else if (type === "recovery") {
    title = "Reset Your Password";
    subtitle = "You requested to reset your password. Use the verification code below to proceed:";
    subject = `CUETMate Password Reset Code: ${code}`;
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FFF8F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c1917;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FFF8F0; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 520px; background-color: #FFFFFF; border-radius: 20px; border: 1px solid #F6D3AF; box-shadow: 0 4px 20px rgba(194, 65, 12, 0.06); overflow: hidden; text-align: center;">
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #C2410C; padding: 28px 24px;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
                CUETMate
              </h1>
              <p style="margin: 4px 0 0; color: #FED7AA; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">
                NTA CUET UG 2026 Preparation
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 36px 32px 28px;">
              <h2 style="margin: 0 0 12px; font-size: 20px; font-weight: 700; color: #1c1917;">
                ${title}
              </h2>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.5; color: #78716c;">
                ${subtitle}
              </p>

              <!-- 6-Digit OTP Card -->
              <table role="presentation" align="center" cellspacing="0" cellpadding="0" style="margin: 0 auto 24px;">
                <tr>
                  <td style="background-color: #FEF1E0; border: 2px dashed #C2410C; border-radius: 14px; padding: 18px 36px; text-align: center;">
                    <span style="font-family: 'Courier New', Courier, monospace, monospace; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #C2410C; display: inline-block;">
                      ${code}
                    </span>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 12px; font-size: 13px; color: #a8a29e;">
                This code is valid for <strong>${expiryMinutes} minutes</strong> and can only be used once.
              </p>

              <hr style="border: none; border-top: 1px solid #F5EBE1; margin: 24px 0;" />

              <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #78716c; text-align: left;">
                <strong>Security Notice:</strong> Never share this verification code with anyone. CUETMate representatives will never ask for your code. If you did not initiate this request, you can safely disregard this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FAF4ED; padding: 20px 24px; border-top: 1px solid #F6D3AF;">
              <p style="margin: 0; font-size: 11px; color: #a8a29e;">
                © 2026 CUETMate. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
${title}

${subtitle}

Your 6-Digit Verification Code: ${code}

This code is valid for ${expiryMinutes} minutes. Never share this code with anyone.
If you did not request this, please ignore this email.

CUETMate - NTA CUET UG 2026 Preparation
  `.trim();

  return { subject, html, text };
}

/**
 * High-level helper to send a 6-digit OTP code to an email address.
 */
export async function sendOtpEmail(options: SendOtpOptions): Promise<{ messageId?: string }> {
  const { subject, html, text } = buildOtpEmailHtml({
    code: options.code,
    type: options.type,
    expiryMinutes: options.expiryMinutes || 10,
  });

  return sendBrevoEmail({
    to: [{ email: options.email.trim().toLowerCase() }],
    subject,
    htmlContent: html,
    textContent: text,
  });
}
