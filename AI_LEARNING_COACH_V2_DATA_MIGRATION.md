# AI LEARNING COACH V2 DATA MIGRATION & COMPATIBILITY GUIDE

**Guide Date**: October 2026  
**Version**: 2.0.0 Migration Specification  
**Scope**: Schema Evolution, Historical Attempt Normalization, Backwards-Compatibility Layer, and Rollback Procedures

---

## 1. Executive Summary

This guide outlines the data migration and schema compatibility strategy implemented for **CUET AI Learning Coach V2**. The system introduces structured 10-category diagnostic typing, 4-tier sample size thresholds, and a 4-stage repair plan lifecycle without disrupting existing user sessions or invalidating historical attempt records.

---

## 2. Backwards Compatibility Layer (`/api/ai/diagnose-mistake`)

To ensure that legacy frontend components or cached client bundles continue functioning without errors, the `/api/ai/diagnose-mistake` route implements an automatic adapter layer:

```typescript
// Legacy Consumer Adapter
const legacyWeaknessMap: Record<MistakeCategory, string> = {
  CONCEPTUAL_MISUNDERSTANDING: 'Conceptual Gap',
  MISSING_PREREQUISITE: 'Foundational Knowledge Gap',
  FORMULA_METHOD_ERROR: 'Formula Application Error',
  CALCULATION_EXECUTION_ERROR: 'Calculation Error',
  QUESTION_MISINTERPRETATION: 'Misread Question',
  INCORRECT_CONCEPT_APPLICATION: 'Concept Overgeneralization',
  TIME_MANAGEMENT_PACING: 'Time Pacing Issue',
  REPEATED_ERROR_PATTERN: 'Systemic Error Pattern',
  CARELESS_ERROR: 'Careless Mistake',
  UNCLASSIFIED_INSUFFICIENT_EVIDENCE: 'General Review Needed'
};

return NextResponse.json({
  // V2 Structured Payload
  category: diagnosis.category,
  confidence: diagnosis.confidence,
  ncertCorrection: diagnosis.ncertCorrection,
  clarificationQuestion: diagnosis.clarificationQuestion,
  microCheck: diagnosis.microCheck,
  suggestedAction: diagnosis.suggestedAction,

  // Legacy Backwards-Compatible Fields
  weaknessType: legacyWeaknessMap[diagnosis.category],
  recommendation: diagnosis.ncertCorrection || diagnosis.suggestedAction
});
```

---

## 3. Database Schema Migration for Repair Plans

For environments persisting repair plans in PostgreSQL / Supabase, the following non-destructive migration script is applied:

```sql
-- Migration: Add user_repair_plans table for Coach V2
CREATE TABLE IF NOT EXISTS public.user_repair_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    chapter_id TEXT NOT NULL,
    mistake_category TEXT NOT NULL,
    priority_score DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    status TEXT NOT NULL DEFAULT 'NOT_STARTED' 
        CHECK (status IN ('NOT_STARTED', 'CONCEPT_REVIEWED', 'DRILL_COMPLETED', 'RETEST_COMPLETED', 'RECOVERED')),
    attempts_count INTEGER NOT NULL DEFAULT 0,
    retest_accuracy DOUBLE PRECISION,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT user_chapter_category_unique UNIQUE (user_id, chapter_id, mistake_category)
);

-- Row-Level Security
ALTER TABLE public.user_repair_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own repair plans"
    ON public.user_repair_plans FOR ALL
    USING (auth.uid() = user_id);

-- Indexing for fast dashboard retrieval
CREATE INDEX IF NOT EXISTS idx_repair_plans_user_priority 
    ON public.user_repair_plans(user_id, priority_score DESC);
```

---

## 4. Historical Attempt Normalization Pipeline

When reading historical attempts from `mock_attempts` or `practice_sessions`:
1. **Optional Prompt Field**: Stored attempts where `prompt` was not recorded default to `""`, preventing null-pointer errors.
2. **Missing Time Spent**: Historical sessions without per-question timestamps default to average chapter pacing ($60\text{ seconds}$ per question), assigning `'MEDIUM'` or `'LOW'` confidence rather than discarding the attempt.
3. **Archetype Tagging**: Untagged legacy questions dynamically receive inferred tags (`numerical` if containing numbers/formulas; `theoretical` if purely verbal) via the V2 fallback extractor.

---

## 5. Rollback Procedures

If an emergency rollback of the API endpoint is ever required:
1. Revert `app/api/ai/diagnose-mistake/route.ts` to the previous commit.
2. The database schema is non-destructive (uses `IF NOT EXISTS` and optional new columns); existing `mock_attempts` and `practice_sessions` tables remain 100% unaltered.
3. The application will continue serving legacy responses seamlessly.
