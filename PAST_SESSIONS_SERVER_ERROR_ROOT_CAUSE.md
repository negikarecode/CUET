# CUETMate Production Incident Report: Past Sessions Server Error (Bug B)

**Incident Title**: Server-Side Exception on `/dashboard/sessions` (Digest: `304861364`)  
**Severity**: High (Total Route Crash on Production)  
**Status**: Resolved & Verified  
**Date**: October 19, 2026  
**Author**: Senior Next.js, Supabase Auth & Database Security Engineer  

---

## 1. Executive Summary

When students opened `/dashboard/sessions` on the deployed production website, the page immediately crashed with the Next.js runtime error:
> "Application error: a server-side exception has occurred (see the server logs for more information)."  
> Digest: `304861364`

This crash prevented students from reviewing their completed mock exam attempts, analyzing questions, and tracking their historical progress.

A thorough forensic investigation identified five distinct interacting failure points spanning dynamic regex compilation, PostgREST relational shape mismatches, session collapse, flight boundary serialization, and the absence of a route-level React Error Boundary.

---

## 2. Investigation & Forensic Reproductions

### Anatomy of Next.js Digest `304861364`
In Next.js App Router (production mode), unhandled server exceptions thrown during React Server Component (RSC) rendering are redacted for security to avoid exposing stack traces and database schemas to the browser. Next.js computes a deterministic hash (the digest `304861364`) of the underlying exception.

By analyzing the call stack of `/dashboard/sessions` SSR:
`Page (RSC)` ──► `fetchServerTestAttempts()` ──► `deduplicateTestAttempts()` ──► `getCanonicalTestKey()`, multiple fatal exceptions were uncovered.

---

## 3. Confirmed Root Causes

### Root Cause 1: Dynamic Regex SyntaxError in `getCanonicalTestKey`
- **Location**: `lib/analytics.ts` (lines 280–282)
- **Mechanism**:
  ```ts
  // VULNERABLE CODE:
  const sub = normalizeSubject(att.subject || att.testTitle || "domain").key;
  const cleanTId = tId.replace(new RegExp(`^${sub}[-_]?`, "i"), "");
  ```
  If `sub` or `att.subject` contained regex metacharacters—such as parentheses `()` in subjects like `"Fine Arts (Visual)"` or `"Mathematics (Applied)"`—the JavaScript engine threw an uncaught:
  `SyntaxError: Unterminated group`
  Because `getCanonicalTestKey` ran on every attempt in `deduplicateTestAttempts`, this SyntaxError crashed SSR before any HTML could be rendered.

### Root Cause 2: PostgREST Relational Return Shape Mismatch
- **Location**: `lib/server-attempts.ts` (lines 35–45)
- **Mechanism**:
  The Supabase query joined `user_attempts` with `questions(...)`:
  ```ts
  const { data: userAttempts } = await supabase.from("user_attempts").select(`..., questions (...)`);
  ```
  Depending on foreign key cardinality and Supabase PostgREST version, Supabase returns joined relations as an array `ua.questions: [{...}]` rather than a single object `ua.questions: {...}`. Direct property access `ua.questions.subject` or `ua.questions.correct_option` returned `undefined` or threw a `TypeError: Cannot read properties of undefined (reading 'subject')`.

### Root Cause 3: Attempt Collapsing & Megatest Mutation (Missing `attempt_id`)
- **Location**: `lib/server-attempts.ts` (lines 40–95)
- **Mechanism**:
  Attempts were grouped solely by `tId = ua.test_id`. If a candidate re-attempted the same mock exam twice (e.g. `physics-mock-1`), all question responses from both attempts (100 total rows) were merged into a single pseudo-attempt object with 100 questions. This violated the 50-question schema invariant, corrupted totalMarks calculations, and caused client components expecting 50 questions to crash during rendering.

### Root Cause 4: Unchecked Date Sorting on Null/Partial Attempts
- **Location**: `lib/analytics.ts` (lines 310–315)
- **Mechanism**:
  ```ts
  // VULNERABLE CODE:
  attempts.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  ```
  If any attempt in local storage or database had `submittedAt: undefined`, `null`, or an invalid ISO timestamp, `new Date(a.submittedAt).getTime()` evaluated to `NaN`. Subtracting `NaN` in JavaScript sort algorithms yields unstable sorting and runtime TypeErrors when accessing properties on null/undefined elements in the array.

### Root Cause 5: Total Absence of a Route-Level Error Boundary
- **Location**: `app/dashboard/sessions/`
- **Mechanism**:
  The directory lacked an `error.tsx` file. In Next.js App Router, when a page component throws an unhandled server exception without a route-level `error.tsx`, the error bubbles up to the root layout, tearing down the entire UI tree and displaying the generic production error screen with the opaque digest.

---

## 4. Remediation Implemented

### 1. Regex Metacharacter Escaping (`lib/analytics.ts`)
Escaped all regex special characters in dynamic strings and added a top-level try/catch wrapper in `getCanonicalTestKey`:
```ts
const escapedSub = sub.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const cleanTId = tId.replace(new RegExp(`^${escapedSub}[-_]?`, "i"), "");
```

### 2. Relational Unboxing & Defend-in-Depth (`lib/server-attempts.ts`)
Added relation unboxing that handles both object and array shapes returned by PostgREST:
```ts
const rawQ = ua.questions;
const qData = Array.isArray(rawQ) ? rawQ[0] : rawQ;
```

### 3. Distinct Session Grouping by `attempt_id` (`lib/server-attempts.ts`)
Grouped attempts by their unique `attempt_id` (or fallback `${tId}:::${timestamp}`):
```ts
const sessionGroupKey = ua.attempt_id
  ? `${tId}:::${ua.attempt_id}`
  : `${tId}:::${ua.created_at ? new Date(ua.created_at).toISOString().slice(0, 16) : "session"}`;
```
Each attempt retains its true, isolated question responses without mutative merging.

### 4. Null-Safe Filtering & Timestamp Parsing (`lib/analytics.ts`)
```ts
const validAttempts = attempts.filter((a) =>
  Boolean(a && typeof a === "object" && (a.id || a.testId || a.testTitle || (a as any).test_id || (a as any).attempt_id))
);
const sorted = [...validAttempts].sort((a, b) => {
  const ta = new Date(a?.submittedAt || (a as any)?.date || 0).getTime() || 0;
  const tb = new Date(b?.submittedAt || (b as any)?.date || 0).getTime() || 0;
  return tb - ta;
});
```

### 5. Strict Flight Boundary Serialization (`app/dashboard/sessions/page.tsx`)
Sanitized all attempts passing across the Server Component flight boundary:
```ts
const initialAttempts = JSON.parse(JSON.stringify(rawAttempts));
```
Guarantees all properties are standard JSON primitives (no `Date` object prototypes or non-serializable circular references).

### 6. Created Route-Level Error Boundary (`app/dashboard/sessions/error.tsx`)
Created a user-friendly, recoverable error UI:
- Catches any unexpected client or server rendering exceptions in the `/dashboard/sessions` segment.
- Displays a clean error card: *"Unable to Load Past Sessions"*.
- Offers an interactive *"Try Again"* button (`reset()`) and a *"Return to Dashboard"* link.
- Logs diagnostic error details server-side while keeping PII hidden from the browser.

---

## 5. Verification Matrix

| Test Scenario | Input State | Result | Verification Status |
| :--- | :--- | :--- | :--- |
| **New User (0 Sessions)** | `[]` empty array | Renders clean *"No test sessions yet"* state with quick start CTA | **PASSED** (Scenario 15) |
| **Completed Sessions** | 2 valid mock attempts | Displays both mock cards with accurate scores (+5/-1), dates, and analysis links | **PASSED** (Scenario 16) |
| **Parenthesized Subject** | `"Fine Arts (Visual) Mock 1"` | Escaped regex runs cleanly; returns canonical key without SyntaxError | **PASSED** (Scenario 17a) |
| **Corrupted Records** | `[null, undefined, {}, { invalid date }]` | Filtered safely; valid attempts display without exception | **PASSED** (Scenario 17b, 17c) |
| **Database Failure / Timeout** | Supabase query throws network timeout | Recoverable error message displayed; page does not crash | **PASSED** (Scenario 18) |
| **Cross-User Session Protection** | Student A requests Student B sessions | PostgREST RLS and server function reject with 403 Forbidden | **PASSED** (Scenario 19) |

---

## 6. Conclusion

The root causes behind digest `304861364` have been eliminated at their source. `/dashboard/sessions` is now resilient against empty histories, multi-attempt grouping, malformed subject titles, and database connectivity interruptions.
