# Security Test & Access Control Matrix
**Platform:** CUET AI-Prep  
**Date:** October 2026  

---

## 1. Access Control & Authorization Matrix

| Endpoint | Method | Required Auth | IDOR Protection | Rate Limited | Fail-Closed Policy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/auth/profile` | POST | Authenticated (`authUser.id`) | Enforced (`authUser.id === body.id`) | Global Middleware | Yes (401 if null) |
| `/api/auth/profile` | GET | Authenticated (`authUser.id`) | Fields masked for third parties | Global Middleware | Yes (401 if null) |
| `/api/profile/update` | POST | Authenticated (`authUser.id`) | Strictly bound to session | Global Middleware | Yes (401 if null) |
| `/api/student/sunday-ritual` | GET/POST | Authenticated (`authUser.id`) | Strictly bound to session | Qualification Gate (150 Qs) | Yes (401 if null) |
| `/api/student/attempts` | GET | Authenticated (`authUser.id`) | Strictly bound to session | Global Middleware | Returns empty if guest |
| `/api/student/diagnostic-cycle` | GET | Optional | Filtered by session | No | Safe read |
| `/api/student/diagnostic-cycle` | POST | Optional | Metadata update requires auth | 30 / day | Rate limited |
| `/api/tests/generate-adaptive-drill` | POST | Authenticated (`authUser.id`) | Strictly bound to session | 12h Cadence Limiter | Yes (401 if null) |
| `/api/test/[testId]` | GET | Public / Guest | Pre-sanitized (No answers) | Global Middleware | Safe |
| `/api/test/[testId]` | POST | Submission Proof Required | Answers withheld until submitted | Global Middleware | Yes (403 if unverified) |
| `/api/test/record-attempt` | POST | Optional | Writes allowed only if auth | In-memory scoring for guest | Safe |
| `/api/payments/create-order` | POST | Authenticated (`authUser.id`) | Session email and user bound | Global Middleware | Yes (401 if null) |
| `/api/payments/verify` | POST | Authenticated (`authUser.id`) | Session user bound | Cryptographic HMAC SHA-256 | Yes (503 if unconfigured) |
| `/api/payments/webhook` | POST | Webhook Signature | HMAC verified with secret | Timing-Safe Equal | Yes (503 if unconfigured) |
| `/api/leaderboard` | GET | Public / Guest | UUIDs masked for peers | Cached Response | Safe |
| `/api/admin/pyq` | GET/PATCH | Admin Token (`PYQ_ADMIN_TOKEN`)| Bearer token required | Timing-Safe Equal | Yes (401 if missing) |
| `/api/admin/pyq/export` | GET | Admin Token (`PYQ_ADMIN_TOKEN`)| Bearer token required | Timing-Safe Equal | Yes (401 if missing) |
| `/api/cron/sunday-ritual` | GET | Cron Secret (`CRON_SECRET`) | Bearer token required | Timing-Safe Equal | Yes (401 if missing) |
| `/api/ai/doubt-solver` | POST | IP / Auth User | Bounded grounding | 40 / day | Fallback refuse |
| `/api/ai/why-wrong` | POST | IP / Auth User | Scoped by question ID | 40 / day | Fallback deterministic |
| `/api/ai/diagnose` | POST | IP / Auth User | Scoped by test attempt | 3 free / 25 paid per day | Cached response |
| `/api/ai/diagnose-mistake` | POST | IP / Auth User | Scoped by mistake | 30 free / 60 paid per day | Token-metered |
| `/api/ai/repair-quiz` | POST | IP / Auth User | Scoped by weak micro-topic | 30 / day | Curated question bank |
| `/api/ai/subject-radar` | POST | IP / Auth User | Fingerprinted telemetry | 30 / day | Qualification gate (150 Qs) |
| `/api/ai/post-mock` | POST | IP / Auth User | Fingerprinted telemetry | 30 / day | Fallback deterministic |
| `/api/standing/explain` | POST | IP / Auth User | Scoped to college & course | 30 / day | Cached fallback |

---

## 2. Automated Regression Test Results

Executed via `npx tsx --test __tests__/security-hardening.test.ts`:

```
✔ should allow requests under the defined limit and decrement remaining quota
✔ should strictly reject requests once the limit is exhausted (HTTP 429 semantics)
✔ should format correct rate limit HTTP headers
✔ should resolve client identifier from user ID when authenticated
✔ should fallback to client IP when user is anonymous, guest, or unauthenticated
✔ should never throw RangeError when comparing signatures of unequal length
✔ should reject tampered HMAC payloads in constant time
✔ should strip correctOptionId, explanation, and solutions during active exam
✔ should mask other students' database UUIDs while preserving active user identity
```

- **Tests Executed:** 9
- **Passed:** 9
- **Failed:** 0
- **Duration:** 54.17ms
