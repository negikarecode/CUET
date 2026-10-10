# Design System: CUET AI-Prep

A clean, restrained, high-density design system engineered for focus, clarity, and precision (Linear, Stripe Dashboard, Vercel aesthetic).

---

## 1. Design Tokens

### Colors (Light Theme)
All components must consume these variables directly or via Tailwind theme extensions:

| Token | Hex Value | Role |
| :--- | :--- | :--- |
| `--bg` | `#F8FAFC` | Page background |
| `--surface` | `#FFFFFF` | Card & modal background |
| `--border` | `#E2E8F0` | Default 1px card and divider border |
| `--border-strong` | `#CBD5E1` | Secondary buttons, active borders, inputs |
| `--text` | `#0F172A` | Primary text, titles, values |
| `--text-secondary` | `#475569` | Body text, labels, table headers (WCAG AA compliant) |
| `--text-muted` | `#64748B` | Non-essential hints, secondary captions ($\ge 13$px) |
| `--accent` | `#2563EB` | Primary buttons, active nav text, links |
| `--accent-hover` | `#1D4ED8` | Primary button hover state |
| `--accent-subtle` | `#EFF6FF` | Selected background, active nav background |
| `--danger` | `#DC2626` | Weak areas, errors, critical alerts |
| `--danger-subtle` | `#FEF2F2` | Subtle error badge/banner background |
| `--warning` | `#B45309` | Needs attention, moderate priority |
| `--warning-subtle` | `#FFFBEB` | Warning banner/badge background |
| `--success` | `#15803D` | Good performance, recovered areas |
| `--success-subtle` | `#F0FDF4` | Positive state badge background |

#### Semantic Rules
* **Red (`--danger`)**: Only for problems, errors, or diagnosed weak topics.
* **Amber (`--warning`)**: Only for topics needing attention or nearing threshold.
* **Green (`--success`)**: Only for masteries, recovered topics, or target achievements.
* **Never** use green for a weakness or low score.
* **Never** use semantic colors for decorative card tints or backgrounds.

---

## 2. Typography

* **Font Family**: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.
* **Weights**: `400` (Regular) and `600` (Semi-bold) only.
* **Line Heights**: `1.5` for body text, `1.25` for titles and headings.
* **Numeric Data**: Use `tabular-nums` for all scores, timers, percentages, and metrics.
* **Monospace**: Only for authentic technical IDs or code snippets. Never for labels, badges, or stats.

### Strict 5-Step Scale
| Step | Size | Line Height | Usage |
| :--- | :--- | :--- | :--- |
| **Caption** | `12px` | `1.5` | Table column headers, small metadata |
| **Body / Label** | `14px` | `1.5` | Standard body copy, form labels, table cells |
| **Card Title** | `16px` | `1.25` | Section headers within cards, subheadings |
| **Section Title** | `20px` | `1.25` | Page section headers |
| **Page Title / Stat** | `28px` | `1.25` | Page titles, primary stat card figures |

---

## 3. Spacing, Shapes & Elevation

* **Spacing Scale**: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`.
* **Card Padding**: `24px` desktop, `16px` mobile. Card gaps: `24px` desktop, `16px` mobile.
* **Border Radii**:
  * `12px` (`rounded-xl`): Cards, dialogs, modals.
  * `8px` (`rounded-lg`): Buttons, inputs, search boxes, status pills.
* **Elevation**:
  * Cards: `1px solid var(--border)` with **zero shadow**.
  * Modals, Popovers, Dropdowns: `box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12)`.
* **Transitions**: `150ms ease` on color, background, and border only. No bounce, scale, or glowing animations.
* **Focus States**: `2px solid var(--accent)` outline with `2px offset` on all interactive elements.

---

## 4. Component Rules

1. **Cards**:
   * Every card is pure white (`--surface`) with a 1px border (`--border`).
   * No dark/tinted background boxes, no background gradients.
2. **Buttons**:
   * Exactly **one primary button** (`--accent` fill, 40px height, 8px radius) per screen.
   * All other actions must be outline (1px `--border-strong`, white background) or text links.
   * Sentence case only. No all-caps button text.
3. **Badges & Pills**:
   * At most **one status pill per card**, reserved for true statuses (e.g., "Needs work", "Recovered", "Low confidence").
   * Format: `12px`, 500/600 weight, subtle background, 8px radius, sentence case.
4. **Stat Cards**:
   * 4 uniform white cards: Label (`14px` secondary), Value (`28px`, 600, tabular-nums), Context note (`14px` muted).
   * No colored square icon containers or sparkline bars.
5. **Tables**:
   * Real HTML `<table>` elements with 12px muted sentence-case headers, 48px rows, 1px dividers, right-aligned tabular numbers.
   * Responsive collapse to stacked cards under 640px.
6. **Progress Bars**:
   * 8px height, flat rounded track (`--border`), flat fill (`--accent`), with 14px label and value positioned above.
7. **Empty States**:
   * Single sentence description and single primary action button.

---

## 5. Do's and Don'ts

### Do
* Left-align titles, headings, and cards on a consistent 1120px max-width container.
* Write concise, honest copy using "you" and plain action verbs.
* Display real coverage ratios and data transparency disclaimers.
* Use Lucide icons sized 16px inline or 20px headers with 1.75 stroke width.

### Don't
* **No emoji** in headers, labels, badges, or buttons (no 🎯, 🚀, 🔥, 🏆, 👋).
* **No gradients or glows** (no background glows, gradient text, or button gradients).
* **No uppercase or letter-spaced micro-labels**.
* **No marketing hype or fabricated titles** (no "Command Hub", "AI Evidence Analyst", "Executive Narrative", or fake doctor titles).
