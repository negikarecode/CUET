# CUET Global Duplicate Question Elimination — Complete Audit Report

**Execution Timestamp**: 2026-10-25 13:23:10 UTC

## 1. Executive Summary

- **Total Question Records Audited**: 55,000 across all 22 subjects
- **Total Published Mock Papers Audited**: 1,100 (Mocks 1 to 50 for each subject)
- **Total Mocks Affected by Intra-Mock Duplication**: 467
- **Total Confirmed Intra-Mock Duplicates Eliminated**: 18,322
- **Total Redundant Records Archived in Quarantine**: 18,322 (in `data/quarantined_duplicates.json`)
- **Total Mocks Passing Final Uniqueness Verification**: **1,100 / 1,100 (100.0% zero-duplicate compliance)**
- **Remaining Intra-Mock Duplicates**: **0 (Zero)**

## 2. Root Cause Analysis & Candidate Key Regression Evidence

### Investigation of Candidate Key Duplicate (Computer Science Mock 35 Q9 vs Q20)

1. **Reported Regression**: In `mock/computer_science/35.json`, Question 9 and Question 20 presented the identical definition of a Candidate Key in the relational database model with shuffled options. In fact, the exact same question was also duplicated at Q31 and Q42 in the same mock paper.

2. **Verified Root Cause**: In `scripts/ai_synthesis/vocational.py` (and corresponding synthesis scripts for 20 domain subjects), mock expansion (Mocks 22–50) was generated using a list of blueprints looped with modulo arithmetic:
   ```python
   bp = cs_blueprints[(q_idx - 1) % len(cs_blueprints)]
   ```
   Because `len(cs_blueprints) == 11`, index 8 was selected at `q_idx = 9` (8 % 11 = 8), `q_idx = 20` (19 % 11 = 8), `q_idx = 31` (30 % 11 = 8), and `q_idx = 42` (41 % 11 = 8).

3. **Validation Bypass**: During generation, question IDs were synthesized sequentially (`COMPUTER_SCI-M35-Q09`, `COMPUTER_SCI-M35-Q20`), and `validate_and_save_mock` in `scripts/ai_synthesis/common.py` checked ID uniqueness and option counts, but never checked normalized question stems or option set signatures. Thus, repeated blueprints were saved as distinct questions without raising an error.

## 3. Three-Level Duplicate Detection Engine

The detection engine was implemented in both TypeScript (`lib/duplicate-detection/index.ts`) and Python (`scripts/duplicate_detection/engine.py`):

- **Level A: Exact Duplicates**:
  - Normalizes whitespace, HTML entities, and formatting tags.
  - Strips artificial prefixes (`[Set 35.9]`, `Set 35.9:`, `Q9.`, `(Q.9)`, `Question 9:`).
  - Strips option labels (`(A)`, `A.`, `Option A:`).
  - Standardizes Unicode (NFKC), quotes, hyphens, and casing.
  - Compares exact normalized stem and ordered option sequence.

- **Level B: Structural Duplicates**:
  - Compares normalized stem and **sorted substantive option texts** (`sorted([normalize(opt)])`).
  - Order-independent: option shuffling (`A` ↔ `B` ↔ `C` ↔ `D`) does not bypass detection.
  - Reliably captures the Candidate Key regression fixture with 0.99 confidence.

- **Level C: Semantic Duplicates & Distinction from Similar**:
  - Uses word-level token shingles and Jaccard similarity for question stems and options.
  - **Distinguishes parameterized variations**: extracts numeric tokens (`10 m/s` vs `25 m/s`) to prevent falsely removing legitimate numerical problems.
  - **Distinguishes cognitive targets**: checks contrast keywords (`differs from`, `advantage vs disadvantage`, `not`, `except`) so definition questions and distinction questions remain distinct.
  - Flags borderline semantic pairs (78%–87%) into `reports/SEMANTIC_DUPLICATES_REVIEW_QUEUE.md` for manual review rather than destructive deletion.

## 4. Subject-by-Subject Audit and Remediation Breakdown

| Subject | Total Mocks | Mocks Affected | Duplicates Replaced | Post-Repair Status |
| :--- | :---: | :---: | :---: | :---: |
| physics | 50 | 8 | 171 | **PASSED (50/50 Valid)** |
| chemistry | 50 | 6 | 198 | **PASSED (50/50 Valid)** |
| maths | 50 | 15 | 538 | **PASSED (50/50 Valid)** |
| bio | 50 | 26 | 1,014 | **PASSED (50/50 Valid)** |
| accountancy | 50 | 22 | 858 | **PASSED (50/50 Valid)** |
| eco | 50 | 17 | 663 | **PASSED (50/50 Valid)** |
| bst | 50 | 15 | 555 | **PASSED (50/50 Valid)** |
| history | 50 | 18 | 702 | **PASSED (50/50 Valid)** |
| pol science | 50 | 16 | 640 | **PASSED (50/50 Valid)** |
| geo | 50 | 24 | 960 | **PASSED (50/50 Valid)** |
| psychology | 50 | 25 | 1,050 | **PASSED (50/50 Valid)** |
| sociology | 50 | 25 | 1,050 | **PASSED (50/50 Valid)** |
| physical_education | 50 | 29 | 1,160 | **PASSED (50/50 Valid)** |
| computer_science | 50 | 29 | 1,131 | **PASSED (50/50 Valid)** |
| home_science | 50 | 28 | 1,176 | **PASSED (50/50 Valid)** |
| mass_media | 50 | 29 | 1,218 | **PASSED (50/50 Valid)** |
| environmental_studies | 50 | 28 | 1,204 | **PASSED (50/50 Valid)** |
| fine_arts | 50 | 29 | 1,218 | **PASSED (50/50 Valid)** |
| agriculture | 50 | 29 | 1,218 | **PASSED (50/50 Valid)** |
| anthropology | 50 | 29 | 1,218 | **PASSED (50/50 Valid)** |
| english | 50 | 20 | 380 | **PASSED (50/50 Valid)** |
| general-test | 50 | 0 | 0 | **PASSED (50/50 Valid)** |
| **TOTAL** | **1,100** | **467** | **18,322** | **100% Zero-Duplicate Compliance** |

## 5. Pipeline Uniqueness Enforcement

1. **`scripts/ai_synthesis/common.py`**: Added mandatory Level B structural fingerprint validation in `validate_and_save_mock()`. Any attempt to generate or save a mock containing repeated questions now raises an immediate assertion error.
2. **`lib/data/mock50Questions.ts`**: Added runtime deduplication and validation guard in the CBT mock loader, ensuring active test sessions only ever serve unique canonical questions.
3. **Registry and Rollback**: All original duplicate records are preserved in `data/quarantined_duplicates.json` with timestamps, provenance, and source metadata. Safe replacements are cataloged in `data/duplicate_registry.json`.
