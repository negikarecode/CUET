# Performance Baseline Audit (Phase 0)

Date: November 6, 2026
Branch: `cleanup/performance`
Framework: Next.js 14.2.35 (App Router, Node runtime)

---

## 1. Initial Route Table & First Load JavaScript

Measured via `npm run build`:

| Route | Size | First Load JS | Notes |
| :--- | :--- | :--- | :--- |
| `/` (Landing Page) | 27.9 kB | **405 kB** | Target: < 150 kB gzipped |
| `/dashboard/[[...slug]]` | 1.54 MB | **2.44 MB** | Heavy client analytics components |
| `/dashboard/mocks` | 5.46 kB | **780 kB** | Subject mocks listing |
| `/dashboard/practice` | 4.97 kB | **779 kB** | Unit practice listing |
| `/dashboard/pyqs` | 9.26 kB | **781 kB** | Past-year shift papers |
| `/dashboard/upgrade` | 971 B | **345 kB** | Unified Gold Pass pricing section |
| `/test/[testId]` (CBT Simulator) | 15.9 kB | **512 kB** | Timed examination view |
| `/checkout` | 3.9 kB | **103 kB** | Test sandbox |
| Shared Chunks (all routes) | - | **87.6 kB** | Baseline shared runtime |
| Middleware | - | **85.9 kB** | Edge routing & session protection |

---

## 2. Dependencies Inventory

- **Runtime Dependencies**: 20
- **DevDependencies**: 16

### Key Runtime Dependencies:
1. `lucide-react`: ^0.475.0 (barrel icons imported across 50+ files)
2. `katex`: ^0.18.5 (loaded globally on every route via `app/layout.tsx`)
3. `recharts`: ^2.15.4 (charting in dashboard views)
4. `framer-motion`: ^11.18.2 (only referenced in orphaned prototype components)
5. `better-sqlite3`: ^13.0.3 (server-side SQLite evidence store)
6. `react-markdown` / `remark-math` / `rehype-katex`: markdown question renderer

---

## 3. Public Assets Inventory (Largest Files)

1. `public/pyq_pages/.../page_11.png`: 1.2 MB (Shift scans)
2. `public/pyq_pages/.../page_10.png`: 1.2 MB
3. `public/pyq_pages/.../page_11.png`: 967 KB
4. `public/pyq_pages/.../page_12.png`: 953 KB
5. `public/assets/images/PRICING_SECTION_BACKGROUND.png`: 821 KB
6. `public/assets/images/Footer_Background.png`: 715 KB
7. `public/assets/images/hero-bg.png`: 625 KB
8. Question crops / diagrams: 500-600 KB each

---

## 4. Initial Test & Lint Results

- `npm run typecheck`: 0 errors (Pass)
- `npm run lint`: 0 errors (Pass with 4 image warnings on legacy tags)
- `npm run test:payments:all`: 140/140 tests pass (Pass)
