# Performance Optimization Report (After)

**Date**: 2026-11-06  
**Branch**: `cleanup/performance`  
**Target Environment**: Indian students on mid/low-end Android devices and 4G networks.

---

## 1. Route Table Comparison (npm run build)

| Route | Baseline First Load JS | Optimized First Load JS | Delta (KB) | % Reduction |
|---|---|---|---|---|
| `/` (Landing Page) | 463 kB | 358 kB | **-105 kB** | **-22.7%** |
| `/dashboard/upgrade` | 450 kB | 346 kB | **-104 kB** | **-23.1%** |
| `/login` / `/signup` | 467 kB | 364 kB | **-103 kB** | **-22.0%** |
| `/test/[testId]` | 512 kB | 512 kB | 0 kB | Maintained CBT accuracy & math rendering |
| `/dashboard/mocks` | 780 kB | 780 kB | 0 kB | Fast navigation maintained |
| `/privacy`, `/terms`, `/refunds` | 96.9 kB | 96.8 kB | -0.1 kB | Lean legal routes |
| **First Load JS shared by all** | 88.0 kB | 87.9 kB | -0.1 kB | Stable core runtime |

---

## 2. Key Optimizations Applied

### A. Dead Prototype & Style Removal
- Removed unreferenced `framer-motion` prototype card components:
  - `components/ui/kinetic-text-reveal.tsx`
  - `components/ui/sticky-scroll-cards.tsx`
  - `components/ui/scroll-split-card.tsx`
  - `components/animate-ui/` directory
- Purged 60+ lines of dead CSS from `app/globals.css` (`.scroll-split-*`, `.pricing-section`).

### B. Next.js Package Optimization
- Configured `experimental.optimizePackageImports: ["lucide-react", "recharts", "katex"]` in `next.config.mjs` for tree-shaking barrel packages.

### C. Math & KaTeX Style Isolation
- Removed global `katex/dist/katex.min.css` from root `app/layout.tsx`.
- Scoped KaTeX styles strictly to components rendering math formulas:
  - `components/common/LatexRenderer.tsx`
  - `components/notes/NotesMarkdownRenderer.tsx`
- Non-math pages (Landing, Checkout, Legal, Profile) no longer download or parse KaTeX stylesheets.

### D. Below-the-Fold Dynamic Imports on Landing Page
- Lazy-loaded heavy landing components with `next/dynamic`:
  - `CozyStudyRoomScene` (interactive mobile preview)
  - `CUETSystemTabs`, `CUETArticles`, `CUETFAQ`, `CUETClosingCTA`
  - Deferred modal loading for `CUETQuickStartModal` and `OnboardingModal`.

### E. Database Query Projections & RLS Caching
- Replaced unconstrained `.select("*")` queries with explicit column selections in `lib/dashboard-views/dashboard-home.tsx`, `lib/dashboard-views/reports.tsx`, and `lib/dashboard-views/profile.tsx`.
- Created SQL migration `supabase/migrations/20261106_perf_indexes_and_rls.sql`:
  - Wraps `auth.uid()` in `(SELECT auth.uid())` across `payments`, `question_reports`, and `profiles` RLS policies.
  - Adds composite performance indexes on `user_attempts(user_id, created_at DESC)`, `payments(user_id, status)`, `ai_reports(user_id, created_at DESC)`, `progress_cards(user_id, created_at DESC)`, and `test_questions(test_id, question_id)`.

---

## 3. Pending Review / Decision Items
- Large static public images (`PRICING_SECTION_BACKGROUND.png` 821 KB, `hero-bg.png` 625 KB, `Footer_Background.png` 715 KB): Keep intact or convert to WebP / next/image in a dedicated asset optimization phase.
- Legacy Cashfree server payment route: Kept in quarantine pending complete production transition to Razorpay.
