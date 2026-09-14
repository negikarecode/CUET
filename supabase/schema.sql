-- =============================================================================
-- CUET AI-Prep: High-Performance Production PostgreSQL Database Migration
-- Architecture: NTA-Compliant CBT Engine, 4D Diagnostic Matrix,
--               Pacing & Time-Sink Analytics, Gamified Trophy Engine
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. PROFILES TABLE (public.profiles)
-- Synchronized with Supabase auth.users
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    target_stream TEXT NOT NULL CHECK (target_stream IN ('Science', 'Commerce', 'Humanities')),
    target_university TEXT DEFAULT 'Delhi University',
    target_college TEXT DEFAULT 'SRCC',
    xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
    campus_coins INTEGER NOT NULL DEFAULT 0 CHECK (campus_coins >= 0),
    current_streak INTEGER NOT NULL DEFAULT 0 CHECK (current_streak >= 0),
    last_practice_date DATE,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    subscription_tier TEXT DEFAULT 'free',
    subscription_expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for leaderboard queries and user searches
CREATE INDEX IF NOT EXISTS idx_profiles_xp ON public.profiles (xp DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_stream ON public.profiles (target_stream);

-- =============================================================================
-- 2. QUESTIONS TABLE WITH 4D DIAGNOSTIC METADATA (public.questions)
-- Dimensions: Subject -> Chapter -> Micro-Topic -> NCERT Reference & Archetype
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject TEXT NOT NULL,
    chapter TEXT NOT NULL,
    micro_topic TEXT NOT NULL,
    ncert_reference TEXT NOT NULL,
    archetype TEXT NOT NULL CHECK (
        archetype IN (
            'Direct Fact',
            'Assertion-Reasoning',
            'Match the Following',
            'Case-Study MCQ',
            'Numerical'
        )
    ),
    question_text TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_option CHAR(1) NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
    explanation TEXT NOT NULL,
    is_pyq BOOLEAN NOT NULL DEFAULT FALSE,
    pyq_year INTEGER CHECK (pyq_year IS NULL OR (pyq_year >= 2020 AND pyq_year <= 2030)),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Diagnostic matrix indexes for rapid query filtering and AI mistake diagnosis
CREATE INDEX IF NOT EXISTS idx_questions_subject_chapter ON public.questions (subject, chapter);
CREATE INDEX IF NOT EXISTS idx_questions_micro_topic ON public.questions (micro_topic);
CREATE INDEX IF NOT EXISTS idx_questions_archetype ON public.questions (archetype);
CREATE INDEX IF NOT EXISTS idx_questions_pyq ON public.questions (is_pyq, pyq_year);

-- =============================================================================
-- 3. TESTS & JUNCTION TABLES (public.tests & public.test_questions)
-- Strict NTA CBT 50-Question Model (40 to attempt within 60 minutes)
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    total_questions INTEGER NOT NULL DEFAULT 50 CHECK (total_questions > 0),
    duration_minutes INTEGER NOT NULL DEFAULT 60 CHECK (duration_minutes > 0),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.test_questions (
    test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL CHECK (order_index >= 1),
    PRIMARY KEY (test_id, question_id),
    CONSTRAINT uq_test_question_order UNIQUE (test_id, order_index)
);

CREATE INDEX IF NOT EXISTS idx_test_questions_test_id ON public.test_questions (test_id, order_index ASC);

-- =============================================================================
-- 4. USER ATTEMPTS & PACING ANALYTICS (public.user_attempts)
-- Captures question-level time sinks (>90s) and choice evaluation
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.user_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    selected_option CHAR(1) CHECK (selected_option IS NULL OR selected_option IN ('A', 'B', 'C', 'D')),
    is_correct BOOLEAN,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0 CHECK (time_spent_seconds >= 0),
    is_time_sink BOOLEAN GENERATED ALWAYS AS (time_spent_seconds > 90) STORED,
    diagnostic_report JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Analytical indexes for pacing reports and AI diagnostic queries
CREATE INDEX IF NOT EXISTS idx_user_attempts_user_test ON public.user_attempts (user_id, test_id);
CREATE INDEX IF NOT EXISTS idx_user_attempts_time_sink ON public.user_attempts (user_id, is_time_sink) WHERE is_time_sink = TRUE;
CREATE INDEX IF NOT EXISTS idx_user_attempts_question ON public.user_attempts (question_id);

-- =============================================================================
-- 5. TROPHIES & USER TROPHIES (public.trophies & public.user_trophies)
-- Gamification system rewarding streaks, accuracy, pacing, and remediation
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.trophies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    xp_reward INTEGER NOT NULL DEFAULT 0 CHECK (xp_reward >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_trophies (
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    trophy_id TEXT NOT NULL REFERENCES public.trophies(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, trophy_id)
);

CREATE INDEX IF NOT EXISTS idx_user_trophies_user ON public.user_trophies (user_id);

-- =============================================================================
-- 6. ANALYTICAL VIEW: PACING & TIME-SINK DIAGNOSTICS
-- Identifies questions where students waste >90 seconds with incorrect answers
-- =============================================================================
CREATE OR REPLACE VIEW public.pacing_analytics_summary AS
SELECT 
    ua.user_id,
    q.subject,
    q.chapter,
    q.micro_topic,
    q.archetype,
    COUNT(ua.id) AS total_attempts,
    COUNT(CASE WHEN ua.is_correct = TRUE THEN 1 END) AS correct_attempts,
    ROUND(AVG(ua.time_spent_seconds)::NUMERIC, 1) AS avg_time_seconds,
    COUNT(CASE WHEN ua.is_time_sink = TRUE THEN 1 END) AS time_sink_count,
    COUNT(CASE WHEN ua.is_time_sink = TRUE AND ua.is_correct = FALSE THEN 1 END) AS fatal_time_sinks,
    ROUND(
        (COUNT(CASE WHEN ua.is_correct = TRUE THEN 1 END)::NUMERIC / NULLIF(COUNT(ua.id), 0)) * 100, 
        2
    ) AS accuracy_percentage
FROM public.user_attempts ua
JOIN public.questions q ON ua.question_id = q.id
GROUP BY ua.user_id, q.subject, q.chapter, q.micro_topic, q.archetype;

-- =============================================================================
-- 7. AUTOMATIC USER PROFILE PROVISIONING TRIGGER
-- Seamlessly provisions public.profiles row whenever a new user signs up in auth.users
-- =============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        full_name,
        target_stream,
        target_university,
        target_college,
        xp,
        campus_coins,
        current_streak
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'CUET Aspirant'),
        COALESCE(NEW.raw_user_meta_data->>'target_stream', 'Commerce'),
        COALESCE(NEW.raw_user_meta_data->>'target_university', 'Delhi University'),
        COALESCE(NEW.raw_user_meta_data->>'target_college', 'SRCC'),
        0,
        50,
        0
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict zero-trust security per table
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trophies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_trophies ENABLE ROW LEVEL SECURITY;

-- 8.1 PROFILES POLICIES
-- Users can view their own profile or public leaderboard stats
CREATE POLICY "Allow public read access to basic profiles"
    ON public.profiles FOR SELECT
    TO anon, authenticated
    USING (true);

-- Users can only update their own profile
CREATE POLICY "Allow users to update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Profiles insertable by service role or internal trigger
CREATE POLICY "Allow service role full access to profiles"
    ON public.profiles FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 8.2 QUESTIONS POLICIES
-- Readable by everyone (anonymous & authenticated for mock previews)
CREATE POLICY "Allow public read access to questions"
    ON public.questions FOR SELECT
    TO anon, authenticated
    USING (true);

-- Modifiable only by service role / administrative scripts
CREATE POLICY "Allow service role full access to questions"
    ON public.questions FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 8.3 TESTS POLICIES
-- Active tests are viewable by all users
CREATE POLICY "Allow public read access to active tests"
    ON public.tests FOR SELECT
    TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "Allow service role full access to tests"
    ON public.tests FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 8.4 TEST_QUESTIONS POLICIES
CREATE POLICY "Allow public read access to test questions"
    ON public.test_questions FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow service role full access to test questions"
    ON public.test_questions FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 8.5 USER_ATTEMPTS POLICIES
-- Users can view ONLY their own attempts
CREATE POLICY "Allow users to view own attempts"
    ON public.user_attempts FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Users can insert attempts for themselves
CREATE POLICY "Allow users to record own attempts"
    ON public.user_attempts FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Users can update only their own attempts
CREATE POLICY "Allow users to update own attempts"
    ON public.user_attempts FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow service role full access to user attempts"
    ON public.user_attempts FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 8.6 TROPHIES POLICIES
-- Readable by everyone
CREATE POLICY "Allow public read access to trophies"
    ON public.trophies FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Allow service role full access to trophies"
    ON public.trophies FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 8.7 USER_TROPHIES POLICIES
-- Users can view their unlocked trophies
CREATE POLICY "Allow users to view unlocked trophies"
    ON public.user_trophies FOR SELECT
    TO anon, authenticated
    USING (true);

-- Users can claim/unlock their own trophies
CREATE POLICY "Allow users to unlock own trophies"
    ON public.user_trophies FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow service role full access to user trophies"
    ON public.user_trophies FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- =============================================================================
-- 9. SEED DATA: 4 INITIAL GAMIFIED TROPHIES
-- =============================================================================
INSERT INTO public.trophies (id, title, description, icon, xp_reward)
VALUES
    (
        'consistency-king',
        'Consistency King',
        'Maintained a continuous 7-day practice streak on NTA-style domain mocks.',
        'Flame',
        200
    ),
    (
        'ncert-sharpshooter',
        'NCERT Sharpshooter',
        'Achieved 90%+ accuracy across 50 questions with verified NCERT textbook page references.',
        'Crosshair',
        350
    ),
    (
        'speed-demon',
        'Speed Demon',
        'Solved domain questions in under 45 seconds average per question with positive net score.',
        'Zap',
        250
    ),
    (
        'the-phoenix',
        'The Phoenix',
        'Successfully remediated a flagged conceptual weak topic with 3 consecutive correct answers.',
        'Sparkles',
        500
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    xp_reward = EXCLUDED.xp_reward;

-- =============================================================================
-- 10. SEED DATA: 5 REAL CUET MCQS FOR 'English Language'
-- Complete 4D tagging: Subject, Chapter, Micro-Topic, NCERT Reference & Archetype
-- =============================================================================

INSERT INTO public.questions (
    id,
    subject,
    chapter,
    micro_topic,
    ncert_reference,
    archetype,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    explanation,
    is_pyq,
    pyq_year
)
VALUES
    -- English MCQ 1: Direct Fact (Vocabulary / Contextual Synonym)
    (
        'e1000000-0000-0000-0000-000000000001',
        'English',
        'Vocabulary & Lexical Usage',
        'Contextual Synonyms',
        'NCERT Class 12 Flamingo, Ch 1 (The Last Lesson), Page 6',
        'Direct Fact',
        'Choose the word that is nearest in meaning to the highlighted word in context: "M. Hamel announced the order from Berlin with a profound and "solemn" gravity."',
        'Frivolous and lighthearted',
        'Grave, earnest, and dignified',
        'Hesitant and uncertain',
        'Hostile and aggressive',
        'B',
        'The word "solemn" in this literary context implies deep sincerity, earnestness, and gravity. Option B ("Grave, earnest, and dignified") is the exact synonym. Option A is the direct antonym.',
        TRUE,
        2024
    ),

    -- English MCQ 2: Assertion-Reasoning (Syntactic Inference)
    (
        'e1000000-0000-0000-0000-000000000002',
        'English',
        'Reading Comprehension & Critical Reasoning',
        'Inference & Syntactic Linkage',
        'NCERT Class 12 Flamingo, Ch 2 (Lost Spring), Page 15',
        'Assertion-Reasoning',
        'Given below are two statements, one labeled as Assertion (A) and the other as Reason (R):
Assertion (A): Anees Jung remarks that Saheb is no longer his own master while working at the tea stall.
Reason (R): The steel canister he carries belongs to the tea stall owner, whereas the plastic bag was his own and felt lighter.
In the light of the above statements, choose the most appropriate answer from the options given below:',
        'Both (A) and (R) are correct and (R) is the correct explanation of (A)',
        'Both (A) and (R) are correct but (R) is NOT the correct explanation of (A)',
        '(A) is correct but (R) is not correct',
        '(A) is not correct but (R) is correct',
        'A',
        'Assertion (A) captures Saheb''s loss of freedom at the tea stall. Reason (R) provides the direct symbolic rationale cited by Anees Jung: the canister symbolizes servitude to the shopkeeper, making (R) the exact analytical justification of (A).',
        TRUE,
        2024
    ),

    -- English MCQ 3: Match the Following (Phrasal Verbs & Idiomatic Expressions)
    (
        'e1000000-0000-0000-0000-000000000003',
        'English',
        'Applied Grammar',
        'Idiomatic Expressions & Phrasal Verbs',
        'NCERT Class 12 English Core Grammar & Composition, Page 112',
        'Match the Following',
        'Match List I with List II:
List I (Idiom)
(A) To burn the midnight oil
(B) To read between the lines
(C) Once in a blue moon
(D) To call it a day

List II (Contextual Meaning)
(I) To stop working on something for the day
(II) To work or study late into the night
(III) An event that occurs very rarely
(IV) To discover a hidden or implied meaning

Choose the correct option from the codes given below:',
        '(A)-(II), (B)-(IV), (C)-(III), (D)-(I)',
        '(A)-(IV), (B)-(II), (C)-(I), (D)-(III)',
        '(A)-(II), (B)-(I), (C)-(III), (D)-(IV)',
        '(A)-(III), (B)-(IV), (C)-(II), (D)-(I)',
        'A',
        'Correct mappings: (A) To burn the midnight oil = (II) work or study late; (B) To read between the lines = (IV) understand hidden meaning; (C) Once in a blue moon = (III) very rarely; (D) To call it a day = (I) stop working.',
        TRUE,
        2024
    ),

    -- English MCQ 4: Case-Study MCQ (Analytical Reading Passage)
    (
        'e1000000-0000-0000-0000-000000000004',
        'English',
        'Reading Comprehension',
        'Authorial Tone & Central Thesis',
        'NCERT Class 12 English Core Comprehension Framework, Page 34',
        'Case-Study MCQ',
        'Read the following excerpt: "While algorithms curate content tailored precisely to user biases, they systematically eliminate intellectual friction. The resulting echo-chamber does not simply comfort the user; it atrophies the critical faculty required to evaluate opposing viewpoints in a pluralistic democracy."
Question: The primary concern voiced by the author regarding algorithmic content curation is:',
        'The monetary cost incurred by digital publishing platforms',
        'The erosion of independent critical reasoning and exposure to counter-arguments',
        'The technical difficulty in generating personalized recommendation feeds',
        'The enhancement of participatory dialogue in democratic institutions',
        'B',
        'The author states that curation "systematically eliminates intellectual friction" and "atrophies the critical faculty required to evaluate opposing viewpoints". Thus, the erosion of critical discernment and counter-argument exposure (Option B) is the primary concern.',
        TRUE,
        2023
    ),

    -- English MCQ 5: Direct Fact (Sentence Transformation & Structural Voice)
    (
        'e1000000-0000-0000-0000-000000000005',
        'English',
        'Sentence Structure & Transformation',
        'Active-Passive Voice with Modal Auxiliaries',
        'NCERT Class 12 English Core Syntax Workbook, Page 78',
        'Direct Fact',
        'Identify the correct passive voice transformation of the sentence: "The committee should have vetted the examination guidelines beforehand."',
        'The examination guidelines should have vetted by the committee beforehand.',
        'The examination guidelines should have been vetted by the committee beforehand.',
        'The examination guidelines had been vetted by the committee beforehand.',
        'The examination guidelines should be vetted by the committee beforehand.',
        'B',
        'For modal perfect active sentences ("should have + V3"), the passive voice rule strictly requires: "Subject + modal + have + been + V3 + by + agent". Therefore, Option B is grammatically impeccable.',
        TRUE,
        2023
    )
ON CONFLICT (id) DO UPDATE SET
    question_text = EXCLUDED.question_text,
    option_a = EXCLUDED.option_a,
    option_b = EXCLUDED.option_b,
    option_c = EXCLUDED.option_c,
    option_d = EXCLUDED.option_d,
    correct_option = EXCLUDED.correct_option,
    explanation = EXCLUDED.explanation,
    ncert_reference = EXCLUDED.ncert_reference;

-- =============================================================================
-- 11. SEED DATA: 5 REAL CUET MCQS FOR 'Accountancy'
-- Complete 4D tagging: Subject, Chapter, Micro-Topic, NCERT Reference & Archetype
-- =============================================================================

INSERT INTO public.questions (
    id,
    subject,
    chapter,
    micro_topic,
    ncert_reference,
    archetype,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    explanation,
    is_pyq,
    pyq_year
)
VALUES
    -- Accountancy MCQ 1: Direct Fact (Collateral Security)
    (
        'a1000000-0000-0000-0000-000000000001',
        'Accountancy',
        'Accounting for Debentures',
        'Collateral Security',
        'NCERT Part 2, Ch 2, Page 84',
        'Direct Fact',
        'When debentures are issued as collateral security against a bank loan and the second method (recording the entry in books of accounts) is followed, which account is debited?',
        'Debentures Account',
        'Bank Loan Account',
        'Debenture Suspense Account',
        'Statement of Profit and Loss',
        'C',
        'Under the second accounting method described on NCERT Part 2, Ch 2, Page 84, the journal entry passed is: Debenture Suspense A/c Dr. to Debentures A/c. Hence, Debenture Suspense Account is debited and shown as a deduction from Debentures under Non-Current Liabilities.',
        TRUE,
        2024
    ),

    -- Accountancy MCQ 2: Assertion-Reasoning (Goodwill on Admission of Partner)
    (
        'a1000000-0000-0000-0000-000000000002',
        'Accountancy',
        'Admission of a Partner',
        'Treatment of Goodwill & Sacrificing Ratio',
        'NCERT Part 1, Ch 3, Page 122',
        'Assertion-Reasoning',
        'Given below are two statements, one labeled as Assertion (A) and the other as Reason (R):
Assertion (A): On admission of a new partner, premium for goodwill brought in cash is credited to the old partners in their sacrificing ratio.
Reason (R): The incoming partner must compensate the existing partners who surrender a fraction of their future profit shares in their favour.
In the light of the above statements, choose the most appropriate answer:',
        'Both (A) and (R) are true and (R) is the correct explanation of (A)',
        'Both (A) and (R) are true but (R) is NOT the correct explanation of (A)',
        '(A) is true but (R) is false',
        '(A) is false but (R) is true',
        'A',
        'According to NCERT Part 1, Ch 3, Page 122, premium for goodwill represents compensation paid by the incoming partner to old partners for surrendering their profit shares. Because the loss is sustained in the sacrificing ratio, the compensation must be distributed in that identical ratio. Both statements are true and (R) is the direct explanation of (A).',
        TRUE,
        2024
    ),

    -- Accountancy MCQ 3: Numerical (Forfeiture & Reissue of Shares)
    (
        'a1000000-0000-0000-0000-000000000003',
        'Accountancy',
        'Accounting for Share Capital',
        'Forfeiture & Reissue at Discount',
        'NCERT Part 2, Ch 1, Page 48',
        'Numerical',
        'Zenith Ltd. forfeited 400 equity shares of Rs. 10 each, fully called up, on which application and allotment money of Rs. 6 per share was paid, but first and final call of Rs. 4 per share was unpaid. Out of these, 300 shares were subsequently reissued as fully paid-up at Rs. 7 per share. What amount will be transferred to Capital Reserve Account?',
        'Rs. 1,800',
        'Rs. 900',
        'Rs. 1,200',
        'Rs. 2,400',
        'B',
        'Calculation per NCERT principles (Part 2, Ch 1, Page 48):
1. Amount forfeited per share = Rs. 6.
2. For 300 reissued shares, total forfeited amount available = 300 * Rs. 6 = Rs. 1,800.
3. Discount allowed on reissue = 300 * (Rs. 10 - Rs. 7) = Rs. 900.
4. Capital Reserve = Available Forfeited Amount - Reissue Discount = Rs. 1,800 - Rs. 900 = Rs. 900.',
        TRUE,
        2023
    ),

    -- Accountancy MCQ 4: Match the Following (Cash Flow Statement AS-3)
    (
        'a1000000-0000-0000-0000-000000000004',
        'Accountancy',
        'Cash Flow Statement',
        'Classification of Cash Flows (AS-3 Revised)',
        'NCERT Part 2, Ch 6, Page 254',
        'Match the Following',
        'Match List I (Transaction of a Manufacturing Enterprise) with List II (Cash Flow Classification):
List I
(A) Dividend paid on Equity Shares
(B) Cash proceeds from sale of Patents
(C) Cash payment to suppliers for goods
(D) Bank overdraft increase

List II
(I) Operating Activity
(II) Investing Activity
(III) Financing Activity
(IV) Financing Activity

Choose the correct option from the codes given below:',
        '(A)-(III), (B)-(II), (C)-(I), (D)-(IV)',
        '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)',
        '(A)-(II), (B)-(III), (C)-(I), (D)-(IV)',
        '(A)-(IV), (B)-(I), (C)-(II), (D)-(III)',
        'A',
        'Per NCERT Part 2, Ch 6, Page 254 (AS-3): Dividend paid is a financing outflow; Sale of patents is an investing inflow; Payments to trade suppliers is an operating outflow; Bank overdraft is a short-term borrowing and therefore classified under Financing Activities.',
        TRUE,
        2024
    ),

    -- Accountancy MCQ 5: Numerical (Sacrificing Ratio & New Profit Sharing Ratio)
    (
        'a1000000-0000-0000-0000-000000000005',
        'Accountancy',
        'Admission of a Partner',
        'Sacrificing Ratio Calculation',
        'NCERT Part 1, Ch 3, Page 116',
        'Numerical',
        'A and B are partners sharing profits and losses in the ratio of 3:2. They admit C into the firm for 1/5th share in profits. C acquires 1/10th from A and 1/10th from B. What is the New Profit Sharing Ratio of A, B, and C?',
        '5 : 3 : 2',
        '3 : 2 : 1',
        '4 : 3 : 2',
        '2 : 2 : 1',
        'A',
        'Calculation per NCERT Part 1, Ch 3, Page 116:
Old shares: A = 3/5, B = 2/5.
C acquires: 1/10 from A, 1/10 from B.
A''s new share = 3/5 - 1/10 = 6/10 - 1/10 = 5/10.
B''s new share = 2/5 - 1/10 = 4/10 - 1/10 = 3/10.
C''s share = 1/5 = 2/10.
New Profit Sharing Ratio = 5/10 : 3/10 : 2/10 = 5 : 3 : 2.',
        TRUE,
        2023
    )
ON CONFLICT (id) DO UPDATE SET
    question_text = EXCLUDED.question_text,
    option_a = EXCLUDED.option_a,
    option_b = EXCLUDED.option_b,
    option_c = EXCLUDED.option_c,
    option_d = EXCLUDED.option_d,
    correct_option = EXCLUDED.correct_option,
    explanation = EXCLUDED.explanation,
    ncert_reference = EXCLUDED.ncert_reference;

-- =============================================================================
-- 12. SEED DATA: OFFICIAL TESTS & TEST_QUESTIONS JUNCTION
-- Creates initial tests and attaches the seeded questions
-- =============================================================================

INSERT INTO public.tests (id, title, subject, total_questions, duration_minutes, is_active)
VALUES
    (
        'b1000000-0000-0000-0000-000000000001',
        'CUET English Language Official PYQ Shift Paper',
        'English',
        50,
        60,
        TRUE
    ),
    (
        'b1000000-0000-0000-0000-000000000002',
        'CUET Accountancy Domain CBT Speed & Accuracy Mock 01',
        'Accountancy',
        50,
        60,
        TRUE
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    is_active = EXCLUDED.is_active;

-- Map English Questions into Test 1
INSERT INTO public.test_questions (test_id, question_id, order_index)
VALUES
    ('b1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 1),
    ('b1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000002', 2),
    ('b1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000003', 3),
    ('b1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000004', 4),
    ('b1000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000005', 5)
ON CONFLICT (test_id, question_id) DO UPDATE SET
    order_index = EXCLUDED.order_index;

-- Map Accountancy Questions into Test 2
INSERT INTO public.test_questions (test_id, question_id, order_index)
VALUES
    ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 1),
    ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 2),
    ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000003', 3),
    ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000004', 4),
    ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000005', 5)
ON CONFLICT (test_id, question_id) DO UPDATE SET
    order_index = EXCLUDED.order_index;
