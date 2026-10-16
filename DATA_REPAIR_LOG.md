# DATA REPAIR LOG — CUET AI-PREP PLATFORM

**Audit Date**: October 2026  
**Log Type**: Cumulative Data Integrity & Logic Repair Audit Trail  
**Status**: All Repairs Applied, Backwards-Compatible & Verified

---

## 1. Repair Summary Table

| ID | Module / Component | Defect Detected | Applied Repair | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **REP-01** | `app/api/test/record-attempt` | Reliance on client-provided score field in POST body. | Refactored endpoint to calculate authoritative score server-side using stored answer keys with `+5 / -1` formula. Discarded client score. | Verified via test suite (`test:core`) |
| **REP-02** | `app/where-i-stand/page.tsx` | Target program selector artificially restricted courses to student's initial high school stream. | Removed stream restriction filter; students can now select any program from any stream provided the university offers it. | Verified via UI tests and `test:standing` |
| **REP-03** | `lib/selectors.ts` | Duplicate scoring logic spread across components (`getMockStats`, `getSessionScore`). | Unified all UI scoring and accuracy displays through canonical selectors in `lib/selectors.ts`. | Verified via `npm run test:core` |
| **REP-04** | `app/mock/[id]/page.tsx` | Questions rendered with `correctOption` and `explanation` visible in active test DOM. | Implemented `sanitizeQuestionForCBT()` pipeline stripping answers during active test mode. | Verified via DOM inspection and payload tests |
| **REP-05** | `lib/subject-radar-v2.ts` | Potential TypeError on optional `prompt` in question attempts (`q.prompt.toUpperCase()`). | Guarded all stem lookups with `(q.prompt || "").toUpperCase()` across all radar analysis filters. | Verified via `npm run test:coach` |
| **REP-06** | `lib/command-center.ts` | Division by zero risk on empty student attempt histories in readiness calculations. | Added empty-guard fallbacks returning zeroed metrics without crashing dashboard. | Verified via test suite (`__tests__/ai-coach-v2.test.ts`) |

---

## 2. Detailed Technical Audit Trail

### REP-01: Server-Side Authoritative Scoring
- **File**: `app/api/test/record-attempt/route.ts`
- **Before**:
  ```typescript
  // INSECURE: Storing client-computed score directly
  const { testId, score, answers } = await req.json();
  await db.from('mock_attempts').insert({ test_id: testId, score });
  ```
- **After**:
  ```typescript
  // SECURE: Authoritative recomputation on server
  const { testId, answers } = await req.json();
  const testData = await loadTestQuestions(testId);
  
  let authoritativeScore = 0;
  for (const ans of answers) {
    const q = testData.find(item => item.id === ans.questionId);
    if (!q) continue;
    if (ans.selectedOption === q.correctOption) {
      authoritativeScore += 5;
    } else if (ans.selectedOption !== null && ans.selectedOption !== undefined) {
      authoritativeScore -= 1;
    }
  }
  await db.from('mock_attempts').insert({ test_id: testId, score: authoritativeScore });
  ```

### REP-02: Multi-Stream Target Degree Freedom
- **File**: `app/where-i-stand/page.tsx`, `components/college-predictor/TargetDegreeSelector.tsx`
- **Issue**: Science students could not explore Commerce (e.g. B.Com Hons) or Humanities (e.g. B.A. Economics) degrees, despite CUET UG officially permitting cross-stream eligibility at universities like Delhi University.
- **Repair**:
  - Decoupled `selectedStream` from the course filter dropdown.
  - Retained college-level eligibility validation while allowing universal course selection.

### REP-03: Shared Selector Unification
- **File**: `lib/selectors.ts`
- **Issue**: Score, accuracy, and streak calculations were independently implemented across 4 different dashboard widgets with minor rounding discrepancies.
- **Repair**:
  - Exported canonical selectors: `getMockStats`, `getPracticeStats`, `getSessionScore`, `getDiagnosticProgress`.
  - All widgets refactored to consume unified selector output.

### REP-04: Active CBT Answer Key Sanitization
- **File**: `app/mock/[id]/page.tsx`, `app/pyq/[id]/page.tsx`
- **Issue**: Inspecting network tab revealed `correctOption` in test JSON payload before submission.
- **Repair**:
  - Filtered test object before passing to client component.
  - Full solutions returned only on post-submission review route (`/mock/[id]/review`).

### REP-05: Radar Engine Stem Guarding
- **File**: `lib/subject-radar-v2.ts`
- **Issue**: In `RecordedQuestionAttempt`, `prompt` is optional (`prompt?: string`). A test attempt without a prompt caused `TypeError: Cannot read properties of undefined (reading 'toUpperCase')`.
- **Repair**:
  - Rewrote question stem inspection:
  ```typescript
  const promptText = (q.prompt || "").toUpperCase();
  const hasNumericalKeywords = promptText.includes("CALCULAT") || promptText.includes("FIND THE VALUE");
  ```

---

## 3. Verification & Regression Analysis

All automated test suites were run following the repairs:
- `npm run test:core`: **37 / 37 passed**
- `npm run test:standing`: **47 / 47 passed**
- `npm run test:smoke`: **11 / 11 passed**
- `npm run test:coach`: **53 / 53 passed**
- `npm run typecheck`: **0 errors**
