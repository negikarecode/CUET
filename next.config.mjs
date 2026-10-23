/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.razorpay.com https://generativelanguage.googleapis.com https://api.groq.com; frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com; object-src 'none'; base-uri 'self';",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/dashboard/radar",
        destination: "/dashboard/reports",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/auth/callback",
        destination: "/api/auth/callback",
      },
      {
        source: "/auth/confirm",
        destination: "/api/auth/confirm",
      },
      {
        source: "/api/admin/pyq/export",
        destination: "/api/admin/pyq?export=1",
      },
      {
        source: "/api/payments/create-order",
        destination: "/api/payments",
      },
      {
        source: "/api/payments/verify",
        destination: "/api/payments",
      },
      {
        source: "/api/payments/webhook",
        destination: "/api/payments",
      },
      {
        source: "/api/test/record-attempt",
        destination: "/api/test/record-attempt",
      },
      {
        source: "/api/tests/generate-adaptive-drill",
        destination: "/api/ai/repair-quiz?type=adaptive",
      },
      {
        source: "/api/ai/why-wrong",
        destination: "/api/ai/insights?type=why-wrong",
      },
      {
        source: "/api/ai/post-mock",
        destination: "/api/ai/insights?type=post-mock",
      },
      {
        source: "/api/standing/explain",
        destination: "/api/ai/standing-explain",
      },
      {
        source: "/api/ai/diagnose-mistake",
        destination: "/api/ai/insights?type=diagnose-mistake",
      },
    ];
  },
};

export default nextConfig;

