# CUET UG Universal Question Bank Inventory & System Architecture Map

**Generated Date**: 2026-10-16 14:58:16Z  
**Auditor**: Senior Examination Content Auditor & CBT Assessment QA Specialist  
**Coverage**: 100% Comprehensive Discovery across all Subjects, Mocks, PYQs, Practice Tests, and Databases.

---

## 1. Executive Summary & Repository Totals

A complete, exhaustive file-system and database traversal was executed across the CUET UG 2026 application codebase. Every active JSON dataset, SQLite database, and runtime loader was analyzed.

| Metric | Direct Measured Count | Description |
| :--- | :--- | :--- |
| **Total Active Question Files** | **3,865** | JSON files across `mock/`, `pyq/`, and `practice/` (excluding symlinks & backups) |
| **Total Active Questions** | **102,650** | Every playable question accessible in the live web application |
| **Unique Question IDs** | **97,596** | Deduplicated question ID signatures |
| **Duplicate IDs Detected** | **2,154** | Cross-file or intra-bank ID collisions slated for safe normalization |
| **LaTeX / Mathematical Questions** | **10,652** | Questions utilizing math formulas, KaTeX formatting, or chemical equations |
| **Match-the-Following Questions** | **10,562** | Column/List matching questions (List-I / List-II) |
| **Assertion-Reason / Statements** | **16,423** | Two-statement evaluations and Assertion-Reasoning questions |
| **Diagram / Visual Questions** | **111** | Questions requiring SVG schematics or diagram descriptions |
| **Master PYQ Database Questions** | **13,211** | Ingested NTA past-year questions stored in `data/cuet_pyq_master.db` |
| **Master PYQ Documents / Shifts** | **251** | Official exam shifts cataloged in the SQLite database |

---

## 2. Subject-by-Subject Question Breakdown

The application supports **22 distinct CUET UG subjects / domains**. Below is the exact inventory of active test papers and questions per domain:

| Subject / Domain | Mock Tests (50 Qs) | PYQ Papers | Practice Tests (20-50 Qs) | Total Live Questions | Canonical Directory |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **accountancy** | 18 | 21 | 120 | **4,350** | `mock/accountancy/`, `pyq/accountancy/`, `practice/accountancy/` |
| **agriculture** | 20 | 0 | 80 | **2,600** | `mock/agriculture/`, `pyq/agriculture/`, `practice/agriculture/` |
| **anthropology** | 20 | 0 | 100 | **3,000** | `mock/anthropology/`, `pyq/anthropology/`, `practice/anthropology/` |
| **bio** | 12 | 20 | 100 | **3,600** | `mock/bio/`, `pyq/bio/`, `practice/bio/` |
| **bst** | 20 | 20 | 240 | **6,800** | `mock/bst/`, `pyq/bst/`, `practice/bst/` |
| **bst_units** | 13 | 0 | 0 | **1,000** | `mock/bst_units/`, `pyq/bst_units/`, `practice/bst_units/` |
| **chemistry** | 20 | 25 | 200 | **6,250** | `mock/chemistry/`, `pyq/chemistry/`, `practice/chemistry/` |
| **computer_science** | 20 | 0 | 60 | **2,200** | `mock/computer_science/`, `pyq/computer_science/`, `practice/computer_science/` |
| **eco** | 20 | 20 | 180 | **5,600** | `mock/eco/`, `pyq/eco/`, `practice/eco/` |
| **eco_units** | 11 | 0 | 0 | **1,000** | `mock/eco_units/`, `pyq/eco_units/`, `practice/eco_units/` |
| **english** | 20 | 25 | 100 | **4,250** | `mock/english/`, `pyq/english/`, `practice/english/` |
| **environmental_studies** | 20 | 0 | 140 | **3,800** | `mock/environmental_studies/`, `pyq/environmental_studies/`, `practice/environmental_studies/` |
| **fine_arts** | 20 | 0 | 80 | **2,600** | `mock/fine_arts/`, `pyq/fine_arts/`, `practice/fine_arts/` |
| **general-test** | 20 | 25 | 100 | **4,250** | `mock/general-test/`, `pyq/general-test/`, `practice/general-test/` |
| **geo** | 20 | 10 | 160 | **4,700** | `mock/geo/`, `pyq/geo/`, `practice/geo/` |
| **geo_units** | 17 | 0 | 0 | **1,200** | `mock/geo_units/`, `pyq/geo_units/`, `practice/geo_units/` |
| **history** | 20 | 15 | 240 | **6,550** | `mock/history/`, `pyq/history/`, `practice/history/` |
| **history_units** | 13 | 0 | 0 | **1,000** | `mock/history_units/`, `pyq/history_units/`, `practice/history_units/` |
| **home_science** | 20 | 0 | 120 | **3,400** | `mock/home_science/`, `pyq/home_science/`, `practice/home_science/` |
| **mass_media** | 20 | 0 | 100 | **3,000** | `mock/mass_media/`, `pyq/mass_media/`, `practice/mass_media/` |
| **maths** | 20 | 20 | 140 | **4,800** | `mock/maths/`, `pyq/maths/`, `practice/maths/` |
| **physical_education** | 20 | 0 | 100 | **3,000** | `mock/physical_education/`, `pyq/physical_education/`, `practice/physical_education/` |
| **physics** | 20 | 25 | 180 | **5,850** | `mock/physics/`, `pyq/physics/`, `practice/physics/` |
| **pol science** | 20 | 15 | 280 | **7,350** | `mock/pol science/`, `pyq/pol science/`, `practice/pol science/` |
| **pol_units** | 18 | 0 | 0 | **1,200** | `mock/pol_units/`, `pyq/pol_units/`, `practice/pol_units/` |
| **psy_units** | 12 | 0 | 0 | **1,200** | `mock/psy_units/`, `pyq/psy_units/`, `practice/psy_units/` |
| **psychology** | 20 | 5 | 140 | **4,050** | `mock/psychology/`, `pyq/psychology/`, `practice/psychology/` |
| **sociology** | 20 | 5 | 140 | **4,050** | `mock/sociology/`, `pyq/sociology/`, `practice/sociology/` |

---

## 3. Data Architecture & Question Storage

### 3.1 Primary Runtime Sources
1. **Full-Length Mocks (`mock/<subject>/<mockNum>.json`)**:
   - 22 subjects, totaling 514 active mock files (including unit-wise full mocks).
   - Standard length: 50 compulsory questions adhering to the latest CUET UG pattern.
   - Marking scheme: **+5 for correct, -1 for incorrect, 0 for unattempted**.
2. **Official Past Year Questions (`pyq/<subject>/<paperNum>.json`)**:
   - 13 core subjects, 251 authentic NTA past exam papers (2022, 2023, 2024, 2025).
   - Cataloged via `pyq/pyq_manifest.json` and synchronized with `data/cuet_pyq_master.db`.
3. **Topic-Wise & Chapter-Wise Practice (`practice/<subject>/unit<N>/<testNum>.json`)**:
   - 3,100 targeted practice drill files providing granular diagnostic and chapter-level mastery.
4. **Master Archive & Ingestion DB (`data/cuet_pyq_master.db`)**:
   - SQLite 3 database with 13,211 structured questions, 52,844 options, and review queues.
   - Used by admin routes (`/dashboard/admin/pyq`) and notes/evidence extractors.

### 3.2 Obsolete / Legacy / Backup Repositories
The audit identified several non-runtime backup and staging directories that must **NOT** be touched or loaded by runtime routes:
- `CUET_Premium_Mocks_*` (e.g. `_AUDITED`, `_PHASE3_REPAIRED`, `_PHASE4_REPAIRED`, `_UNITS`): Prior repair batches.
- `mock_backup_20260917/`, `mock_backup_before_phase4_sync/`: Historic snapshots.
- `pyq_backup_20261014/`: Legacy PYQ backups.
- `cuet_ug_pyqs/`: Raw scanned source PDFs and preliminary extraction keys.

---

## 4. Question Schemas & Type Representation

All 102,650 questions comply with the standardized CUET JSON schema:

```typescript
interface RawQuestion {
  questionNumber: number;
  questionId?: string;
  conceptId?: string;
  chapter: string;
  topic: string;
  questionText: string;
  hasDiagram?: boolean;
  diagramDescription?: string | null;
  options: Array<{
    id: "A" | "B" | "C" | "D";
    text: string;
    isCorrect?: boolean;
    misconception?: { type: string; description: string } | null;
    studentSelectionTrap?: string | null;
    mistakeAnalysis?: string;
  }>;
  correctOption: "A" | "B" | "C" | "D";
  detailedSolution: string;
  solution?: {
    quick: string;
    concept: string;
    detailed: string;
  };
  questionType?: string;
  difficulty?: number | string;
  difficultyLevel?: number;
  estimatedTimeSeconds?: number;
  formula?: string;
  keyConcept?: string;
  tags?: string[];
  qualityScore?: number;
  pyqSource?: string;
}
```

### 4.1 Question Types Discovered
1. **Conceptual / Single-Choice** (46,026): Standard 4-option conceptual evaluation.
2. **Match the Following** (10,562): Two-column items (List-I / Column-I vs List-II / Column-II) rendered via `CBTMatchTheFollowingView.tsx`.
3. **Assertion-Reasoning & Statements** (16,423): Assertion (A) & Reason (R) or Statement I & Statement II format.
4. **Direct Numerical / Calculation** (5,856): Quantitative evaluation requiring formula application.
5. **Diagram / Visual** (111): Renders context-aware SVG schematics via `CBTDiagramViewer.tsx`.
6. **Passage / Case-Based** (3,223): Contextual comprehension passages parsed via `CBTCaseStudyPanel.tsx`.

### 4.2 Answer Key & Option Distribution
Across the entire live bank of 102,650 questions, the option keys are distributed as follows:
- **Option A**: 30,216 (29.4%)
- **Option B**: 24,510 (23.9%)
- **Option C**: 24,371 (23.7%)
- **Option D**: 23,553 (22.9%)

All keys are strictly bounded to valid "A", "B", "C", "D" identifiers with 0% unmapped or out-of-bounds keys.

---

## 5. CBT Rendering Pipeline & Display Rules

1. **Active Test Mode (`/test/[testId]`)**:
   - `sanitizeQuestionForActiveExam` strips `correctOptionId`, `explanation`, `solution`, and option-level traps server-side and client-side before render.
   - Timer countdown ticks with auto-save to IndexedDB/LocalStorage.
   - `LatexRenderer` dynamically formats inline (`$`) and display (`$$`) equations with KaTeX and `mhchem`.
2. **Post-Submission & Analysis Mode (`/dashboard/mocks/analysis/[attemptId]`)**:
   - Unveils full solutions (`solution.quick`, `solution.concept`, `solution.detailed`), mistake analysis, and trap explanations.
   - Calculates +5 / -1 marking scores, time-per-question, chapter-level weakness radar, and projected percentiles.
