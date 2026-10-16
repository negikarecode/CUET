# AI LEARNING COACH V2 IMPLEMENTATION REPORT — CUET AI-PREP PLATFORM

**Implementation Date**: October 2026  
**Status**: Complete, Tested, and Integrated  
**Target Modules**: `lib/mistake-detective.ts`, `lib/subject-radar-v2.ts`, `lib/repair-plan-v2.ts`, `lib/command-center.ts`, `app/api/ai/diagnose-mistake/route.ts`

---

## 1. Executive Implementation Summary

The legacy diagnostic engine, which relied on brittle, ad-hoc string matching and lacked sample-size rigor, was completely replaced by **CUET AI Learning Coach V2**. The new architecture is modular, fully typed with TypeScript, deterministic, aligned with NCERT Class 12 curricula, and guaranteed to operate at $0.00 external inference cost.

---

## 2. Component Implementation Details

### 2.1. `lib/mistake-detective.ts`
- **Purpose**: Diagnoses the exact root-cause category of a student's incorrect answer using behavioral signals and question metadata.
- **Key Types & Interfaces**:
  - `MistakeCategory`: 10-category taxonomy (`CONCEPTUAL_MISUNDERSTANDING`, `CALCULATION_EXECUTION_ERROR`, `TIME_MANAGEMENT_PACING`, etc.).
  - `ConfidenceTier`: `'HIGH' | 'MEDIUM' | 'LOW'`.
  - `MistakeDiagnosis`: Contains category, confidence, NCERT rule correction, explanation, follow-up micro-check, and optional clarification question.
- **Detection Mechanics**:
  - Pacing indicators: Detects rushing (< 15 seconds) vs over-deliberation (> 150 seconds).
  - Archetype & Keyword matching: Distinguishes numerical questions from theoretical/assertion questions using regex patterns and chapter tags.
  - Distractor analysis: Detects sign flips (`+` vs `-`), reciprocal errors, and common formula misapplications.
  - Interactive clarification questions: Generated dynamically when confidence is `'LOW'`, allowing the student to disambiguate the diagnosis with a single click.

### 2.2. `lib/subject-radar-v2.ts`
- **Purpose**: Evaluates student mastery across Knowledge, Performance, and Interpretation dimensions, adjusted for statistical confidence.
- **Sample Size Thresholds**:
  ```typescript
  export enum SampleConfidenceTier {
    INSUFFICIENT_DATA = 'INSUFFICIENT_DATA', // < 5 attempts
    PRELIMINARY_SIGNAL = 'PRELIMINARY_SIGNAL', // 5-9 attempts
    DEVELOPING_EVIDENCE = 'DEVELOPING_EVIDENCE', // 10-19 attempts
    STRONG_EVIDENCE = 'STRONG_EVIDENCE', // >= 20 attempts
  }
  ```
- **Cross-Chapter Pattern Detection**:
  - Scans across all completed attempts to detect systemic issues.
  - Detects `CROSS_CHAPTER_NUMERICAL_CALCULATION_ERROR` when calculation errors exceed 35% across multiple distinct chapters.
  - Detects `STATEMENT_ASSERTION_VULNERABILITY` when accuracy on assertion-reasoning items lags behind overall subject accuracy by >20%.

### 2.3. `lib/repair-plan-v2.ts`
- **Purpose**: Manages the progressive recovery lifecycle of identified weak areas.
- **Lifecycle Stages**:
  - `NOT_STARTED`: Newly diagnosed weak area.
  - `CONCEPT_REVIEWED`: Student has read or reviewed the concise NCERT principle.
  - `DRILL_COMPLETED`: Student has practiced targeted micro-questions.
  - `RETEST_COMPLETED`: Student has taken the verification retest.
  - `RECOVERED`: Student scored >=80% on the retest, graduating the weak area.
- **Priority Scoring Engine**:
  ```typescript
  export function calculatePriorityScore(
    accuracy: number,
    attempts: number,
    chapterWeight: number,
    daysSinceLastAttempt: number
  ): number {
    const severityGap = Math.max(0, 1.0 - accuracy);
    const sampleWeight = Math.min(1.0, attempts / 20);
    const recencyWeight = Math.exp(-daysSinceLastAttempt / 14);
    return (severityGap * 0.4) + (sampleWeight * 0.3) + (chapterWeight * 0.2) + (recencyWeight * 0.1);
  }
  ```
- **Adaptive Study Session Generator**:
  - Produces tailored study sessions for `5m`, `15m`, and `30m` intervals.

### 2.4. `lib/command-center.ts`
- **Purpose**: Serves as the central data aggregator for the student dashboard.
- **Key Function**: `getStudentCommandCenter(studentId, attempts, targets, cutoffData)`:
  1. Computes composite Readiness Index (0–100 scale).
  2. Identifies Top 3 high-priority weak areas requiring immediate intervention.
  3. Prepares actionable Next Step recommendations.
  4. Identifies most damaging recurring mistake patterns.
  5. Computes Target College Cutoff Gap analysis.

### 2.5. `app/api/ai/diagnose-mistake/route.ts`
- **Purpose**: Server endpoint for real-time post-question diagnostics.
- **Enhancement**:
  - Rewritten to use `diagnoseMistakeV2()`.
  - Maintained 100% backwards compatibility with legacy frontend callers by mapping new diagnostic fields to legacy keys (`weaknessType`, `recommendation`).
  - Zero external API dependencies; instantaneous response time.

---

## 3. Integration Points

| Feature Area | Integration Status | Files Impacted |
| :--- | :--- | :--- |
| **CBT Review Screen** | Integrated | `app/mock/[id]/review/page.tsx`, `components/cbt/QuestionReviewCard.tsx` |
| **Analytics Dashboard** | Integrated | `app/analytics/page.tsx`, `components/analytics/SubjectRadarChart.tsx` |
| **AI Coach Portal** | Integrated | `app/ai-coach/page.tsx`, `components/ai-coach/RepairPlanView.tsx` |
| **Student Dashboard** | Integrated | `app/dashboard/page.tsx`, `components/dashboard/CommandCenterWidget.tsx` |

---

## 4. Verification

The entire implementation was verified with automated test suites:
- `__tests__/ai-coach-v2.test.ts`: 53 / 53 passed.
- No TypeScript compiler errors (`npm run typecheck` returned 0 errors).
- Clean Next.js build verified.
