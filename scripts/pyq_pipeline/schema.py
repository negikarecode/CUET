"""
SQLite Schema definition for Stage 1 CUET UG PYQ Ingestion Pipeline.
Preserves complete traceability, raw vs normalized data, quality checks, and review queue.
"""

SCHEMA_SQL = """
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

-- 1. Subjects table
CREATE TABLE IF NOT EXISTS subjects (
    id TEXT PRIMARY KEY,               -- e.g. 'physics', 'accountancy'
    code TEXT,                         -- e.g. '312', '301'
    name TEXT NOT NULL,                -- e.g. 'Physics', 'Accountancy'
    stream TEXT,                       -- 'science', 'commerce', 'humanities', 'common'
    slug TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Documents table
CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,               -- e.g. 'DOC_ACC_2025_06_02_S1'
    filename TEXT NOT NULL,            -- e.g. 'shift-02-06-2025-300PM-600PM.pdf'
    filepath TEXT NOT NULL,
    subject_id TEXT NOT NULL REFERENCES subjects(id),
    year INTEGER,                      -- e.g. 2025, or NULL if unverified
    shift TEXT,                        -- e.g. 'Shift 2' or '3:00 PM - 6:00 PM', or NULL
    exam_date TEXT,                    -- e.g. '2025-06-02'
    time_slot TEXT,                    -- e.g. '3:00 PM - 6:00 PM'
    page_count INTEGER DEFAULT 0,
    file_size_bytes INTEGER DEFAULT 0,
    md5_hash TEXT,
    layout_type TEXT DEFAULT 'standard_cbt', -- 'standard_cbt', 'scanned', 'mixed'
    status TEXT DEFAULT 'pending',     -- 'pending', 'processing', 'completed', 'failed', 'partial'
    metadata_json TEXT,                -- Full extracted header / conflict notes
    has_conflict INTEGER DEFAULT 0,    -- 1 if filename vs text conflict detected
    conflict_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_documents_subject ON documents(subject_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);

-- 3. Pages table
CREATE TABLE IF NOT EXISTS pages (
    id TEXT PRIMARY KEY,               -- e.g. 'PAGE_DOC1_001'
    document_id TEXT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    page_number INTEGER NOT NULL,
    raw_text TEXT,
    ocr_text TEXT,
    has_images INTEGER DEFAULT 0,
    image_count INTEGER DEFAULT 0,
    page_image_path TEXT,              -- e.g. '/pyq_pages/DOC1/page_1.png'
    extraction_method TEXT,            -- 'pdf_text', 'tesseract_ocr', 'hybrid'
    quality_score REAL DEFAULT 1.0,    -- 0.0 to 1.0
    status TEXT DEFAULT 'extracted',
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(document_id, page_number)
);

CREATE INDEX IF NOT EXISTS idx_pages_doc ON pages(document_id);

-- 4. Questions table
CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,               -- Stable unique ID e.g. 'Q_ACC_2025_06_02_S1_01'
    document_id TEXT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL REFERENCES subjects(id),
    question_number INTEGER NOT NULL,  -- 1, 2, ..., 50
    raw_question_text TEXT NOT NULL,
    normalized_question_text TEXT NOT NULL,
    has_image INTEGER DEFAULT 0,
    image_path TEXT,                   -- Crop of formula/diagram e.g. '/pyq_images/Q1.png'
    image_description TEXT,
    has_table INTEGER DEFAULT 0,
    table_data_json TEXT,              -- Structured table { headers: [], rows: [] }
    source_page INTEGER NOT NULL,
    source_pages_json TEXT,            -- Multi-page list e.g. [1, 2]
    extraction_method TEXT NOT NULL,   -- 'direct_text', 'ocr', 'hybrid'
    extraction_confidence REAL NOT NULL, -- 0.0 to 1.0
    text_hash TEXT NOT NULL,           -- MD5/SHA256 of normalized text
    semantic_fingerprint TEXT,         -- Simhash or normalized token n-grams
    duplicate_group_id TEXT,           -- e.g. 'DG_0042'
    duplicate_status TEXT DEFAULT 'unique', -- 'unique', 'duplicate', 'near_duplicate'
    requires_review INTEGER DEFAULT 0, -- 1 if flagged
    review_reasons_json TEXT,          -- array of reasons
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(document_id, question_number)
);

CREATE INDEX IF NOT EXISTS idx_questions_doc ON questions(document_id);
CREATE INDEX IF NOT EXISTS idx_questions_sub ON questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_review ON questions(requires_review);
CREATE INDEX IF NOT EXISTS idx_questions_hash ON questions(text_hash);
CREATE INDEX IF NOT EXISTS idx_questions_dup ON questions(duplicate_group_id);

-- 5. Question Options table
CREATE TABLE IF NOT EXISTS question_options (
    id TEXT PRIMARY KEY,               -- e.g. 'OPT_Q1_A'
    question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    option_key TEXT NOT NULL,          -- 'A', 'B', 'C', 'D'
    raw_text TEXT NOT NULL,
    normalized_text TEXT NOT NULL,
    is_correct INTEGER DEFAULT 0,      -- 1 if verified as correct
    distractor_reason TEXT,            -- Inferred trap/error type or NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(question_id, option_key)
);

CREATE INDEX IF NOT EXISTS idx_options_qid ON question_options(question_id);

-- 6. Answer Keys table
CREATE TABLE IF NOT EXISTS answer_keys (
    id TEXT PRIMARY KEY,
    document_id TEXT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    correct_option TEXT,               -- 'A', 'B', 'C', 'D' or NULL
    source_type TEXT NOT NULL,         -- 'official_key', 'response_sheet', 'verified_manual', 'none'
    confidence REAL DEFAULT 1.0,
    raw_data_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(document_id, question_number)
);

CREATE INDEX IF NOT EXISTS idx_answers_doc ON answer_keys(document_id);

-- 7. Question Metadata & Taxonomy table
CREATE TABLE IF NOT EXISTS question_metadata (
    id TEXT PRIMARY KEY,
    question_id TEXT NOT NULL UNIQUE REFERENCES questions(id) ON DELETE CASCADE,
    exam TEXT DEFAULT 'CUET UG',
    year INTEGER,
    shift TEXT,
    subject TEXT NOT NULL,
    chapter TEXT,                      -- e.g. 'Electrostatics'
    topic TEXT,                        -- e.g. 'Coulombs Law'
    subtopic TEXT,
    concept TEXT,
    taxonomy_source TEXT DEFAULT 'AI_INFERRED', -- 'AI_INFERRED' or NULL
    taxonomy_confidence REAL DEFAULT 0.0,
    question_type TEXT,                -- 'factual', 'conceptual', 'numerical', 'assertion_reason', etc.
    cognitive_level TEXT,              -- 'recall', 'understand', 'apply', 'analyze'
    cognitive_level_confidence REAL DEFAULT 0.0,
    difficulty TEXT,                   -- 'easy', 'medium', 'hard'
    difficulty_confidence REAL DEFAULT 0.0,
    requires_calculation INTEGER DEFAULT 0,
    requires_reading INTEGER DEFAULT 0,
    requires_diagram INTEGER DEFAULT 0,
    requires_table INTEGER DEFAULT 0,
    question_dna_json TEXT,            -- { format, calculation_steps, concept_count, requires_formula, ... }
    answer_verification_json TEXT,     -- { source_answer, ai_check, status, requires_human_review }
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_qmeta_qid ON question_metadata(question_id);
CREATE INDEX IF NOT EXISTS idx_qmeta_type ON question_metadata(question_type);
CREATE INDEX IF NOT EXISTS idx_qmeta_diff ON question_metadata(difficulty);

-- 8. Question Duplicates table
CREATE TABLE IF NOT EXISTS question_duplicates (
    id TEXT PRIMARY KEY,
    question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    duplicate_of_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    duplicate_group_id TEXT NOT NULL,
    similarity_score REAL NOT NULL,
    duplicate_type TEXT NOT NULL,       -- 'exact', 'near', 'cross_shift', 'cross_year'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_qdup_gid ON question_duplicates(duplicate_group_id);

-- 9. Extraction Runs table
CREATE TABLE IF NOT EXISTS extraction_runs (
    id TEXT PRIMARY KEY,
    run_id TEXT NOT NULL,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    status TEXT DEFAULT 'running',     -- 'running', 'completed', 'failed'
    total_documents INTEGER DEFAULT 0,
    total_pages INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    validated_count INTEGER DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    duplicates_count INTEGER DEFAULT 0,
    average_confidence REAL DEFAULT 0.0,
    errors_json TEXT
);

-- 10. Review Queue table
CREATE TABLE IF NOT EXISTS review_queue (
    id TEXT PRIMARY KEY,
    question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,              -- e.g. 'mathematical_expression_uncertain', 'answer_key_conflict'
    severity TEXT DEFAULT 'warning',   -- 'info', 'warning', 'critical'
    status TEXT DEFAULT 'pending',     -- 'pending', 'approved', 'flagged', 'edited'
    notes TEXT,
    assigned_to TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_review_qid ON review_queue(question_id);
CREATE INDEX IF NOT EXISTS idx_review_status ON review_queue(status);
"""
