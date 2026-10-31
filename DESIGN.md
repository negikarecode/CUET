# Design System: CUET AI-Prep — Warm Redesign

A warm, scholarly, high-clarity editorial design system engineered for focused student preparation. Defined by a warm cream canvas, crisp white cards, rich terracotta accents, and deep espresso dark highlights (as specified in `design.pdf`).

---

## 1. Design Tokens

### Colors (Warm Redesign)

| Token | Hex Value | Role |
| :--- | :--- | :--- |
| `--bg` | `#FFF8F0` | Warm cream page canvas |
| `--surface` | `#FFFFFF` | Crisp white card & modal background |
| `--surface-warm` | `#FEF1E0` | Warm peach highlight card background ("Your next best action", "Do this today") |
| `--surface-warm-subtle` | `#FFF5EA` | Table row highlights, subtle badge backgrounds |
| `--surface-dark` | `#441408` | Deep espresso hero banner (AI Coach & My Reports) |
| `--border` | `#EFE6DC` | Subtle warm 1px card and divider border |
| `--border-strong` | `#E2D4C3` | Secondary buttons, active borders, inputs |
| `--border-warm` | `#F6D3AF` | Border for peach highlight cards and badges |
| `--text` | `#1C1917` | Deep warm charcoal primary text, titles, values |
| `--text-secondary` | `#5C524A` | Warm body text, labels, descriptions |
| `--text-muted` | `#8C7D73` | Warm caption text, small metadata |
| `--accent` | `#C2410C` | Terracotta primary buttons, logo badge, active nav indicator, charts |
| `--accent-hover` | `#9A3412` | Darker terracotta hover state |
| `--accent-subtle` | `#FDF0E6` | Active sidebar nav pill, soft badge background |
| `--danger` | `#DC2626` | Critical alerts |
| `--danger-subtle` | `#FEF2F2` | Error badge background |
| `--warning` | `#B45309` | Priority attention / "Target required" text |
| `--warning-subtle` | `#FEF3C7` | Warm amber pill background |
| `--success` | `#15803D` | Mastery / recovered topics |
| `--success-subtle` | `#F0FDF4` | Positive state badge background |

---

## 2. Global Components Architecture (from `design.pdf`)

1. **Sidebar Navigation**:
   - Logo: Rounded square in terracotta (`#C2410C`) with white "C" and bold "CUET AI-Prep" title.
   - Grouping:
     - `Dashboard`
     - `Prepare`: `PYQs`, `Mock tests`, `Practice tests`
     - `Track`: `Where do I stand`, `AI Coach`, `My Reports`
   - Active state: `#FDF0E6` warm peach pill, `#9F3014` font-semibold text.
   - Inactive: `#5C524A` text, `#FAF3EB` hover.
   - Bottom badge: "Premium plan active" in rounded border `#EADDCF`.

2. **Top Navigation Bar**:
   - Search bar: White input, border `#E8DCD1`, placeholder "Search mock tests, topics, subjects...", shortcut `Ctrl K`.
   - Right: Streak indicator ("1-day streak") and User Avatar pill (`#C2410C` circle with initials, bold user name).

3. **Page 1: Dashboard**:
   - Greeting + Target Program card.
   - Highlight Card (`#FEF1E0`): "Your next best action", "Strengthen...", Progress bar, "Read concept summary" button.
   - 4 Stat Cards: Latest mock, Recent accuracy, Questions attempted, Study streak.
   - 2-column: Performance analytics (terracotta line chart) + Topics to fix (AI diagnosis links).
   - Recent sessions table.

4. **Page 2: CUET UG Mock Exams**:
   - Shared layout with PYQs and Practice tests.
   - Pills: "Official PYQ papers", "Unit practice tests".
   - Status filters: "All", "Started", "Not started".
   - Recommended for target subject grid + All other admission subjects grid.
   - Action buttons: "Start Mock X" (solid terracotta) + "All mocks" (outline).

5. **Page 3: Where Do I Stand**:
   - Target college and course pills.
   - Required subject combination with 4 subject cards.
   - Dream college gap analysis with dual metric boxes & "Explain my result" button.
   - Cutoff trend line chart for dream college.
   - Category standings table with target college highlighted.

6. **Page 4: AI Coach**:
   - Deep espresso hero banner (`#441408`) with daily quota.
   - "Do this today" alert card with "Start 10-question fix".
   - Subject calibration cards.
   - Critical score leaks cards with "Start fix".
   - Topics to fix list.
   - 7-day score accelerator day cards.
   - Next mock target alert card.

7. **Page 5: My Reports**:
   - Deep espresso hero banner (`#441408`) with "AI Coach hub" button.
   - Tabs: Diagnostic reports, Shareable progress cards.
   - Report cards with 3 peach metric boxes: Net score, Accuracy, Lost marks.
