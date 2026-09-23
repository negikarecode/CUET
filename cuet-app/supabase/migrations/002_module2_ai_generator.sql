-- ─────────────────────────────────────────────────────
-- MODULE 2: AI QUESTION GENERATOR TABLES & SEED DATA [DEPRECATED]
-- DEPRECATION NOTICE: Runtime LLM question synthesis into `ai_generated_questions`
-- is completely DEPRECATED. All test generation and question retrieval must
-- query the curated, verified question bank in `public.questions` (sourced from the
-- 484 official mock papers) with 0 runtime token consumption.
-- ─────────────────────────────────────────────────────

-- ─────────────────────────────────────────────────────
-- TABLE: cuet_content_chunks
-- Stores the raw text chunks before embedding
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cuet_content_chunks (
  id                BIGSERIAL PRIMARY KEY,
  subject_id        INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
  chapter_id        INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  topic_id          INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  
  content_text      TEXT NOT NULL,
  content_type      VARCHAR(20) DEFAULT 'notes'
                    CHECK (content_type IN 
                    ('notes','ncert','pyq_explanation',
                     'example','definition')),
  
  source_document   VARCHAR(200),
  page_number       INTEGER,
  chunk_index       INTEGER,
  
  pinecone_id       VARCHAR(200) UNIQUE,
  is_embedded       BOOLEAN DEFAULT false,
  
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- TABLE: ai_generated_questions
-- All AI-generated questions before/after SME review
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_generated_questions (
  id                BIGSERIAL PRIMARY KEY,
  subject_id        INTEGER REFERENCES subjects(id) ON DELETE CASCADE,
  chapter_id        INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  topic_id          INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  
  -- The generated question
  question_text     TEXT NOT NULL,
  option_a          TEXT NOT NULL,
  option_b          TEXT NOT NULL,
  option_c          TEXT NOT NULL,
  option_d          TEXT NOT NULL,
  correct_option    CHAR(1) NOT NULL 
                    CHECK (correct_option IN ('A','B','C','D')),
  explanation       TEXT NOT NULL,
  
  difficulty        VARCHAR(10) DEFAULT 'medium'
                    CHECK (difficulty IN ('easy','medium','hard')),
  
  -- AI metadata
  generated_for_student UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  prompt_used       TEXT,
  model_used        VARCHAR(50) DEFAULT 'gpt-4o-mini',
  content_chunks_used TEXT[],
  pinecone_ids_used TEXT[],
  generation_tokens INTEGER,
  generation_cost   DECIMAL(10,6),
  
  -- Review status
  review_status     VARCHAR(20) DEFAULT 'pending'
                    CHECK (review_status IN 
                    ('pending','approved','rejected',
                     'auto_approved')),
  reviewed_by       VARCHAR(100),
  review_notes      TEXT,
  reviewed_at       TIMESTAMP WITH TIME ZONE,
  
  -- After approval, copy to main questions table
  questions_table_id INTEGER REFERENCES questions(id) ON DELETE SET NULL,
  
  -- Auto-approval rules
  auto_approve_score DECIMAL(5,2),
  
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- TABLE: ai_usage_tracking
-- Track every AI API call for cost control
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_usage_tracking (
  id                BIGSERIAL PRIMARY KEY,
  student_id        UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  usage_date        DATE DEFAULT CURRENT_DATE,
  
  call_type         VARCHAR(30),
  -- 'question_generation', 'batch_generation'
  
  topic_id          INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  model_used        VARCHAR(50),
  
  input_tokens      INTEGER DEFAULT 0,
  output_tokens     INTEGER DEFAULT 0,
  total_tokens      INTEGER DEFAULT 0,
  
  estimated_cost_usd DECIMAL(10,6) DEFAULT 0,
  
  was_cached        BOOLEAN DEFAULT false,
  cache_key         VARCHAR(200),
  
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- TABLE: ai_question_cache
-- Cache generated questions to avoid repeat API calls
-- ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_question_cache (
  id                BIGSERIAL PRIMARY KEY,
  cache_key         VARCHAR(500) UNIQUE NOT NULL,
  -- key = topic_id + difficulty + hash of content chunks
  
  topic_id          INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  difficulty        VARCHAR(10),
  
  cached_questions  JSONB NOT NULL,
  -- Array of question objects
  
  hit_count         INTEGER DEFAULT 0,
  -- How many times this cache entry was used
  
  expires_at        TIMESTAMP WITH TIME ZONE,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_ai_questions_topic 
  ON ai_generated_questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_ai_questions_status 
  ON ai_generated_questions(review_status);
CREATE INDEX IF NOT EXISTS idx_ai_questions_student 
  ON ai_generated_questions(generated_for_student);
CREATE INDEX IF NOT EXISTS idx_usage_student_date 
  ON ai_usage_tracking(student_id, usage_date);
CREATE INDEX IF NOT EXISTS idx_cache_key 
  ON ai_question_cache(cache_key);
CREATE INDEX IF NOT EXISTS idx_chunks_topic 
  ON cuet_content_chunks(topic_id);
CREATE INDEX IF NOT EXISTS idx_chunks_embedded 
  ON cuet_content_chunks(is_embedded);

-- ─────────────────────────────────────────────────────
-- SEED: Initial CUET content chunks for Political Science
-- ─────────────────────────────────────────────────────
INSERT INTO cuet_content_chunks 
  (subject_id, chapter_id, topic_id, content_text, 
   content_type, source_document, chunk_index) VALUES

(1, 10, 4,
'Fundamental Rights are contained in Part III of the 
Indian Constitution (Articles 12-35). They are 
justiciable rights, meaning they are enforceable by 
courts. The six Fundamental Rights are:
1. Right to Equality (Articles 14-18)
2. Right to Freedom (Articles 19-22)
3. Right Against Exploitation (Articles 23-24)
4. Right to Freedom of Religion (Articles 25-28)
5. Cultural and Educational Rights (Articles 29-30)
6. Right to Constitutional Remedies (Article 32)
Dr. B.R. Ambedkar called Article 32 the Heart and 
Soul of the Constitution.',
'ncert', 'NCERT Political Science Part 2', 1),

(1, 10, 4,
'Article 14 guarantees Equality before Law and Equal 
Protection of Laws. Article 15 prohibits discrimination 
on grounds of religion, race, caste, sex or place of 
birth. Article 16 provides equality of opportunity in 
public employment. Article 17 abolishes untouchability 
and its practice in any form is forbidden. Article 18 
abolishes titles except military and academic titles.',
'ncert', 'NCERT Political Science Part 2', 2),

(1, 10, 4,
'Article 19 guarantees six freedoms: 
(a) Freedom of speech and expression
(b) Freedom to assemble peacefully
(c) Freedom to form associations
(d) Freedom to move freely throughout India
(e) Freedom to reside in any part of India
(f) Freedom to practice any profession
Article 20 protects against arbitrary conviction.
Article 21 protects life and personal liberty.
Article 21A provides Right to Education for children 
aged 6-14 years (added by 86th Amendment, 2002).
Article 22 protects against arbitrary arrest.',
'ncert', 'NCERT Political Science Part 2', 3),

(1, 10, 5,
'Directive Principles of State Policy (DPSP) are 
contained in Part IV of the Indian Constitution 
(Articles 36-51). They are non-justiciable — courts 
cannot enforce them. They are guidelines for the 
government to create a welfare state.
Key DPSPs include:
- Article 39A: Free legal aid
- Article 40: Organisation of village panchayats
- Article 44: Uniform Civil Code
- Article 45: Free education for children
- Article 48: Agriculture and animal husbandry
- Article 51: International peace
DPSPs are classified as Socialistic, Gandhian, and 
Liberal-Intellectual principles.',
'ncert', 'NCERT Political Science Part 2', 1),

(1, 10, 6,
'Emergency Provisions in the Indian Constitution:
1. National Emergency (Article 352):
   - Declared by President on advice of Cabinet
   - Grounds: War, External Aggression, Armed Rebellion
   - Approved by 2/3rd majority of both Houses
   - Can suspend Fundamental Rights (except Art 20,21)
   
2. State Emergency/President Rule (Article 356):
   - When constitutional machinery fails in a state
   - Approved by simple majority in Parliament
   - Maximum duration: 3 years
   
3. Financial Emergency (Article 360):
   - When financial stability of India is threatened
   - Never been declared so far in Indian history',
'ncert', 'NCERT Political Science Part 2', 1)
ON CONFLICT DO NOTHING;
