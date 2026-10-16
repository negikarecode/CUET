# AI LEARNING COACH V2 OPEN ISSUES & ENHANCEMENT ROADMAP

**Document Date**: October 2026  
**Status**: Active Tracking & Future Enhancements  
**Current Engine State**: Fully Functional, 53/53 Automated Tests Passing

---

## 1. Overview

While **CUET AI Learning Coach V2** has successfully achieved complete diagnostic coverage across all CUET UG subjects with zero external API costs, the following enhancement opportunities and edge condition refinements have been cataloged for future iterations.

---

## 2. Tracked Enhancement Items

| ID | Module | Title | Description | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **ENH-01** | `lib/mistake-detective.ts` | **Humanities Heuristic Deepening** | Extend chapter-specific distractor maps for History (chronology inversions), Political Science (constitutional article confusion), and Geography (map coordinate slips) to match current Physics/Chemistry formula depth. | Medium |
| **ENH-02** | `app/mock/[id]/review` | **Clarification Feedback Persistence** | When a student clicks an interactive clarification button (*"Did you forget the formula or make an algebra slip?"*), persist the selected reason directly to `user_repair_plans` in Supabase to train individual confidence weights. | Low |
| **ENH-03** | `lib/repair-plan-v2.ts` | **Web Speech API Audio Summaries** | Add optional zero-cost client-side speech synthesis (`window.speechSynthesis`) to read the 1-minute NCERT rule aloud during 5-minute study sessions for auditory learners. | Low |
| **ENH-04** | `lib/subject-radar-v2.ts` | **Cohort-Wide Difficulty Recalibration** | Implement scheduled cron aggregation to dynamically adjust chapter exam weightings based on live pass rates across the active student cohort. | Low |
| **ENH-05** | `components/cbt/Scratchpad` | **Multi-Step Intermediate Error Tracking** | For complex calculus and stoichiometry problems, provide a 3-step checkpoint modal to identify exactly which step failed (setup, integration, or arithmetic evaluation). | Medium |

---

## 3. Edge Conditions Handled & Monitored

1. **Zero-Attempt Fresh Student**:
   - *Status*: **Resolved & Guarded**.
   - The Command Center gracefully displays empty baseline metrics and guides the student to take an initial diagnostic test without throwing runtime exceptions.
2. **Missing Question Prompt Text**:
   - *Status*: **Resolved & Guarded**.
   - Optional prompt strings are handled via `(q.prompt || "").toUpperCase()` preventing undefined reference errors.
3. **Repeated Retest Failures**:
   - *Status*: **Resolved**.
   - If a student scores <80% on a retest, the weak area remains in `DRILL_COMPLETED` and queues a fresh concept review card rather than stalling.

---

## 4. Product Decision Recommendations for User

- **Decision 1: Humanities Distractor Tagging**:
  - Should chapter-specific NCERT rule dictionaries for History and Political Science be expanded using automated NCERT syllabus extractors or manually verified by subject teachers?
- **Decision 2: Retest Passing Threshold**:
  - The current recovery threshold is set to **>= 80% accuracy** on a 5-question drill. Should this be adjustable by the student based on target university ambition (e.g. 75% for general admission vs 90% for top-tier SRCC / St. Stephen's)?
