# 02 — COMPLETE ROUTE AND FEATURE INVENTORY
## CUET AI-Prep Page, API & Feature Register

**Audit Method:** Code inspection of `app/**/*` files, static route compilation analysis (`npm run build`), and smoke testing (`__tests__/routes-smoke.test.ts`).

---

### A. Frontend Application Routes

| Route | Page Purpose | Entry Points | Key Components | Data Dependencies & Stores | Access Control | UI States Verified | Coverage |
|---|---|---|---|---|---|---|:---:|
| `/` | Public Marketing Landing Page | Direct URL, Root Domain | `LandingPageClient.tsx`, Hero, Features, PricingTable | Static props, local user target | Public | Loading, Dynamic Stream Hero, Pricing Modal | `INSPECTED` |
| `/login` | Candidate Sign In | Header, Landing CTAs | `LoginForm.tsx`, Supabase Auth client | Supabase Auth session | Guest only (Authed redirects to `/dashboard`) | Empty, Invalid Credentials, Loading spinner | `INSPECTED` |
| `/signup` | Candidate Registration & Onboarding | Header, Hero CTA, Auth Guard | `SignupForm.tsx`, Stream/College Selector | Supabase Auth, `profiles` insert | Guest only (Authed redirects to `/dashboard`) | Validation errors, Loading, Success redirect | `INSPECTED` |
| `/dashboard` | Student Command Center & Learning Pulse | Navigation, Post-login, Logo | `PrepPulseHub.tsx`, MetricCards, RecommendationCard | `useTestStore` (attempts, streak, XP, target) | Protected (Guest practice allowed by middleware) | Calibration Locked (<150 Qs), Unlocked, Empty state | `INSPECTED` |
| `/dashboard/pyqs` | Official PYQ Archive Hub (251 Papers) | Sidebar, Dashboard Action | `PYQLibraryClient.tsx`, SubjectFilterBar, PaperCards | `pyq_manifest.json`, `useTestStore` | Protected / Practice route | All, Filtered by Stream, Attempted badges | `INSPECTED` |
| `/dashboard/pyqs/[subject]` | Subject-Specific Past Paper Listing | Click on Subject card in PYQ Hub | `SubjectPYQListingClient.tsx`, YearFilter, ShiftCard | `pyq/<subject>/*.json`, `useTestStore` | Protected / Practice route | Year filter pills, Score pills, Start/Review CTA | `INSPECTED` |
| `/dashboard/pyqs/analysis/[attemptId]` | Detailed PYQ Attempt Review | Session History row, CBT scorecard | `PostMockAnalysisClient.tsx`, SolutionDrawer | `useTestStore.testAttempts`, local CBT cache | Protected / Practice route | Question breakdown, Filter by mistake category | `INSPECTED` |
| `/dashboard/mocks` | Full-Length CBT Mock Hub (514 Papers) | Sidebar, Next Action Card | `MocksClient.tsx`, SubjectGrid, TargetBanner | `lib/data/mock50Questions.ts`, `useTestStore` | Protected / Practice route | Recommended for target vs Other domains | `INSPECTED` |
| `/dashboard/mocks/[subject]` | Subject Mock Listing (20 Full Mocks) | Mock Hub subject card | `SubjectMockListingClient.tsx`, MockGrid | `mock/<subject>/*.json`, `useTestStore` | Protected / Practice route | Unattempted, In-Progress, Completed scores | `INSPECTED` |
| `/dashboard/mocks/analysis/[attemptId]` | Detailed Mock Scorecard & Analysis | CBT submission, Session History | `PostMockAnalysisClient.tsx`, MistakeCategorizer | `useTestStore.testAttempts`, `/api/ai/diagnose` | Protected / Practice route | Score summary, Pacing alerts, Mistake tags | `INSPECTED` |
| `/dashboard/practice` | Unit-Level Practice Hub (3,100 Tests) | Sidebar, Weakness Report drill | `PracticeHubClient.tsx`, SyllabusTree | `practice_test_manifest.json`, `useTestStore` | Protected / Practice route | Stream tabs, 22 domain subjects grid | `INSPECTED` |
| `/dashboard/practice/[subject]` | 20-Test Unit Practice Grid (NCERT) | Practice Hub subject card | `SubjectPracticeClient.tsx`, UnitAccordion | `practice/<subject>/unit*/*.json` | Protected / Practice route | 20 unit tests grid, 25-min timed badges | `INSPECTED` |
| `/dashboard/standing` | Where Do I Stand (DU College Predictor) | Sidebar, Dashboard Hero | `StandingClient.tsx`, CollegeList, CutoffTable | `lib/standing-engine.ts`, `normalized_cutoffs.json` | Protected / Practice route | Incomplete (missing subjects), Projected Gap | `INSPECTED` |
| `/dashboard/radar` | Weakness Report & Diagnostic Matrix | Sidebar, Priority Topics widget | `WeaknessRadarClient.tsx`, BenchmarkChart | `lib/diagnostic-status.ts`, `useTestStore` | Protected / Practice route | Gated (<150 Qs), 80% Benchmark, Topics to Fix | `INSPECTED` |
| `/dashboard/sessions` | CBT Session History & Score Trends | Sidebar, View All Sessions | `SessionsHistoryClient.tsx`, SVG Line Chart | `useTestStore.testAttempts`, safeStorage | Protected / Practice route | Desktop table, Mobile cards, Deletion modal | `INSPECTED` |
| `/dashboard/leaderboard` | All-India Student Standing & Trophies | Sidebar, Rank badge | `Leaderboard.tsx`, Podium, StreamTabs | `/api/leaderboard`, `useTestStore` | Protected / Practice route | Desktop table, Mobile rank cards, Fair-play footer | `INSPECTED` |
| `/dashboard/notes` | High-Yield NCERT Revision Notes Hub | Header, Practice test link | `NotesHubClient.tsx`, SubjectCards | `lib/notes/store.ts`, NCERT taxonomy | Protected / Practice route | 22 subjects, Chapter counts, Reading time | `INSPECTED` |
| `/dashboard/notes/[subject]` | Subject Chapter Notes Listing | Notes Hub subject card | Chapter listing cards, Search filter | `lib/notes/taxonomy.ts` | Protected / Practice route | Units, Chapters, High-yield badges | `INSPECTED` |
| `/dashboard/notes/[subject]/[slug]` | Interactive Chapter Note & Formulae | Chapter card click | Markdown reader, KaTeX renderer | Static chapter Markdown files | Protected / Practice route | Reading progress bar, Formulas callouts | `INSPECTED` |
| `/dashboard/profile` | Student Profile & Goal Settings | Sidebar, Avatar Menu | `ProfileClient.tsx`, EditGoalsModal, ResetModal | `useTarget()`, `useTestStore.user`, Supabase | Protected | Readiness meter, Exam season, Data export | `INSPECTED` |
| `/dashboard/admin/pyq` | Internal Question Management Tool | Direct URL (Staff only) | Admin table, Ingestion status, Review queue | `/api/admin/pyq`, local JSON banks | Admin Session Required | Drafts, Needs Review, Export JSON | `INSPECTED` |
| `/test/[testId]` | Fullscreen NTA CBT Examination Engine | "Start Mock" / "Start Practice" | `CBTScreen.tsx`, QuestionPalette, Timer | `useCBTStore`, `/api/test/[testId]` | Public / Guest / Student | Active 60m countdown, Auto-submit, Review | `INSPECTED` |

---

### B. Backend API Route Handlers

| Route Handler | HTTP Method | Purpose | Input Payload / Query | Output Contract | Security & Verification | Status |
|---|:---:|---|---|---|---|:---:|
| `/api/test/[testId]` | `GET` | Fetch active test questions | Path param `testId` | `{ testMeta, questions }` (sanitized) | Answer keys stripped server-side | `VERIFIED` |
| `/api/test/[testId]` | `POST` | Verified score submission & reveal | `{ action: "submit", answersSubmitted: true }` | `{ success: true, testMeta, questions }` (with keys) | Answers revealed only upon submission | `VERIFIED` |
| `/api/test/record-attempt` | `POST` | Record attempt in database | Full `RecordedTestAttempt` object | `{ success: true, attemptId }` | Validates session, authenticated user check | `VERIFIED` |
| `/api/ai/diagnose` | `POST` | End-of-test diagnostic coaching | `{ testId, score, answers, mistakes }` | Full diagnostic report with remedial advice | Groq LPU with deterministic fallback | `VERIFIED` |
| `/api/ai/why-wrong` | `POST` | Detailed option-trap explanation | `{ questionId, selectedOption, prompt }` | `{ misconception, correctReason, trapType }` | Cache-first -> Groq -> Local rule engine | `VERIFIED` |
| `/api/ai/doubt-solver` | `POST` | Interactive student doubt chat | `{ questionText, studentQuery, subject }` | `{ answer, ncertRef, stepByStep }` | Groq LPU with rule-based fallback | `VERIFIED` |
| `/api/ai/subject-radar` | `POST` | Deep subject weakness analysis | `{ subjectKey, evidencePack }` | `{ confidence, priorityTopics, repairPlan }` | 150-Q gate check -> AI analysis -> Fallback | `VERIFIED` |
| `/api/payments/create-order`| `POST` | Initiate Razorpay order | `{ planId: "ai_pass_399" }` | `{ orderId, amount, currency, keyId }` | Requires authenticated user session | `VERIFIED` |
| `/api/payments/verify` | `POST` | Verify Razorpay payment signature | `{ razorpay_order_id, payment_id, signature }`| `{ success: true, upgraded: true }` | HMAC-SHA256 constant-time check | `VERIFIED` |
| `/api/payments/webhook` | `POST` | Server-to-server payment hook | Razorpay webhook event payload | `{ status: "ok", received: true }` | HMAC-SHA256 signature verification | `VERIFIED` |
| `/api/leaderboard` | `GET` | Fetch ranked student standings | `?stream=science&window=all` | `{ entries: LeaderboardEntry[], userRank }` | Masks student UUIDs; rate-limited | `VERIFIED` |
| `/api/standing/explain` | `POST` | Explain admission cutoff gap | `{ college, course, currentAvg, cutoff }` | `{ analysis, chances, recommendedActions }` | Gemini 2.5 Flash with standing engine rules | `VERIFIED` |
| `/api/profile/update` | `POST` | Update student targets & streams | `{ targetCollege, targetCourse, stream }` | `{ success: true, profile }` | Authenticated session check | `VERIFIED` |
| `/api/student/attempts` | `GET` | Fetch student historical attempts | Query param `userId` | `{ attempts: RecordedTestAttempt[] }` | User ID ownership check via Supabase session | `VERIFIED` |
