WITH 
-- ─── CHECK 1: COLUMN DEFINITIONS, TYPES, NULLABILITY & DEFAULTS ──────────────
check_1_expected_tables AS (
    SELECT unnest(ARRAY['profiles', 'payment_orders', 'payment_transactions', 'promotional_slots']) AS table_name
),
check_1_actual_cols AS (
    SELECT 
        table_name, 
        column_name, 
        data_type, 
        is_nullable, 
        column_default,
        ordinal_position
    FROM information_schema.columns
    WHERE table_schema = 'public' 
      AND table_name IN ('profiles', 'payment_orders', 'payment_transactions', 'promotional_slots')
),
check_1_table_presence AS (
    SELECT 
        e.table_name,
        EXISTS (
            SELECT 1 FROM information_schema.tables t 
            WHERE t.table_schema = 'public' AND t.table_name = e.table_name
        ) AS table_exists,
        count(c.column_name) AS col_count
    FROM check_1_expected_tables e
    LEFT JOIN check_1_actual_cols c ON c.table_name = e.table_name
    GROUP BY e.table_name
),
check_1_critical_cols AS (
    SELECT * FROM (VALUES
        ('profiles', 'id', 'uuid', true, NULL),
        ('profiles', 'is_premium', 'boolean', true, 'false'),
        ('profiles', 'subscription_tier', 'text', false, NULL),
        ('profiles', 'subscription_expires_at', 'timestamp with time zone', false, NULL),
        ('profiles', 'campus_coins', 'integer', false, NULL),
        ('profiles', 'xp', 'integer', false, NULL),
        ('profiles', 'current_streak', 'integer', false, NULL),
        ('payment_orders', 'id', 'uuid', true, NULL),
        ('payment_orders', 'user_id', 'uuid', true, NULL),
        ('payment_orders', 'provider', 'text', true, NULL),
        ('payment_orders', 'provider_order_id', 'text', true, NULL),
        ('payment_orders', 'amount_paise', 'integer', true, NULL),
        ('payment_orders', 'currency', 'text', true, NULL),
        ('payment_orders', 'status', 'text', true, NULL),
        ('payment_transactions', 'id', 'uuid', true, NULL),
        ('payment_transactions', 'order_id', 'uuid', false, NULL),
        ('payment_transactions', 'user_id', 'uuid', true, NULL),
        ('payment_transactions', 'provider', 'text', true, NULL),
        ('payment_transactions', 'provider_payment_id', 'text', true, NULL),
        ('payment_transactions', 'amount_paise', 'integer', true, NULL),
        ('payment_transactions', 'status', 'text', true, NULL),
        ('promotional_slots', 'slot_number', 'integer', true, NULL),
        ('promotional_slots', 'order_id', 'uuid', false, NULL),
        ('promotional_slots', 'user_id', 'uuid', false, NULL),
        ('promotional_slots', 'status', 'text', true, NULL),
        ('promotional_slots', 'expires_at', 'timestamp with time zone', true, NULL)
    ) AS req(table_name, column_name, expected_type, req_not_null, expected_default_pattern)
),
check_1_col_issues AS (
    SELECT 
        req.table_name, 
        req.column_name,
        CASE 
            WHEN c.column_name IS NULL THEN 'Missing critical column: ' || req.column_name
            WHEN c.data_type <> req.expected_type THEN 'Type mismatch: expected ' || req.expected_type || ', got ' || c.data_type
            WHEN req.req_not_null AND c.is_nullable = 'YES' THEN 'Nullability violation: column ' || req.column_name || ' must be NOT NULL'
            WHEN req.expected_default_pattern IS NOT NULL AND (c.column_default IS NULL OR c.column_default !~* req.expected_default_pattern)
                THEN 'Default value mismatch: expected default ' || req.expected_default_pattern || ', got ' || coalesce(c.column_default, 'NULL')
            ELSE NULL
        END AS issue
    FROM check_1_critical_cols req
    JOIN check_1_table_presence tp ON tp.table_name = req.table_name AND tp.table_exists = true
    LEFT JOIN check_1_actual_cols c ON c.table_name = req.table_name AND c.column_name = req.column_name
    WHERE c.column_name IS NULL 
       OR c.data_type <> req.expected_type
       OR (req.req_not_null AND c.is_nullable = 'YES')
       OR (req.expected_default_pattern IS NOT NULL AND (c.column_default IS NULL OR c.column_default !~* req.expected_default_pattern))
),
check_1 AS (
    SELECT 
        1 AS check_number,
        'Column Definitions, Types, Nullability & Defaults'::TEXT AS check_name,
        CASE 
            WHEN (SELECT count(*) FROM check_1_table_presence WHERE table_exists = true) = 0 THEN 'CANNOT_EVALUATE'
            WHEN (SELECT count(*) FROM check_1_table_presence WHERE table_exists = false) > 0 
              OR (SELECT count(*) FROM check_1_col_issues) > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        ((SELECT count(*)::INT FROM check_1_table_presence WHERE table_exists = false)
        + (SELECT count(*)::INT FROM check_1_col_issues))::INT AS finding_count,
        jsonb_build_object(
            'total_columns_found', (SELECT count(*) FROM check_1_actual_cols),
            'tables_found', (SELECT coalesce(jsonb_agg(table_name ORDER BY table_name), '[]'::JSONB) FROM check_1_table_presence WHERE table_exists = true),
            'missing_tables', (SELECT coalesce(jsonb_agg(table_name ORDER BY table_name), '[]'::JSONB) FROM check_1_table_presence WHERE table_exists = false),
            'column_issues', (SELECT coalesce(jsonb_agg(jsonb_build_object('table', table_name, 'column', column_name, 'issue', issue)), '[]'::JSONB) FROM check_1_col_issues),
            'columns_by_table', (
                SELECT coalesce(jsonb_object_agg(
                    tp.table_name, 
                    coalesce((
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'column_name', c.column_name,
                                'data_type', c.data_type,
                                'is_nullable', c.is_nullable,
                                'column_default', c.column_default
                            ) ORDER BY c.ordinal_position
                        )
                        FROM check_1_actual_cols c 
                        WHERE c.table_name = tp.table_name
                    ), '[]'::JSONB)
                ), '{}'::JSONB)
                FROM check_1_table_presence tp
            )
        ) AS details
),

-- ─── CHECK 2: CONSTRAINTS, FOREIGN KEYS, AND PRIMARY KEYS ───────────────────
check_2_raw_constraints AS (
    SELECT 
        c.relname AS table_name,
        con.conname AS constraint_name, 
        con.contype AS constraint_type,
        (SELECT array_agg(attname::text ORDER BY u.ord) 
         FROM unnest(con.conkey) WITH ORDINALITY AS u(attnum, ord)
         JOIN pg_attribute a ON a.attrelid = con.conrelid AND a.attnum = u.attnum
        ) AS con_columns,
        ncf.nspname AS ref_schema,
        cf.relname AS ref_table,
        (SELECT array_agg(attname::text ORDER BY u.ord) 
         FROM unnest(con.confkey) WITH ORDINALITY AS u(attnum, ord)
         JOIN pg_attribute a ON a.attrelid = con.confrelid AND a.attnum = u.attnum
        ) AS ref_columns,
        pg_get_constraintdef(con.oid) AS constraint_definition,
        (
            SELECT array_agg(DISTINCT elem ORDER BY elem)
            FROM (SELECT (regexp_matches(pg_get_constraintdef(con.oid), '''([^'']+)''', 'g'))[1] AS elem) s
        ) AS extracted_literals
    FROM pg_constraint con
    JOIN pg_class c ON c.oid = con.conrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    LEFT JOIN pg_class cf ON cf.oid = con.confrelid
    LEFT JOIN pg_namespace ncf ON ncf.oid = cf.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname IN ('profiles', 'payment_orders', 'payment_transactions', 'promotional_slots')
),
check_2_required_specs AS (
    SELECT * FROM (VALUES
        ('profiles', 'p', ARRAY['id'], NULL::text, NULL::text, NULL::text[], 'PRIMARY KEY (id)', 'PRIMARY_KEY'),
        ('payment_orders', 'p', ARRAY['id'], NULL::text, NULL::text, NULL::text[], 'PRIMARY KEY (id)', 'PRIMARY_KEY'),
        ('payment_orders', 'u', ARRAY['provider_order_id'], NULL::text, NULL::text, NULL::text[], 'UNIQUE (provider_order_id)', 'UNIQUE'),
        ('payment_orders', 'f', ARRAY['user_id'], 'public', 'profiles', ARRAY['id'], 'FOREIGN KEY (user_id) REFERENCES public.profiles(id)', 'FOREIGN_KEY'),
        ('payment_orders', 'c', ARRAY['amount_paise'], NULL::text, NULL::text, NULL::text[], 'CHECK (amount_paise > 0)', 'CHECK_AMOUNT_PAISE'),
        ('payment_transactions', 'p', ARRAY['id'], NULL::text, NULL::text, NULL::text[], 'PRIMARY KEY (id)', 'PRIMARY_KEY'),
        ('payment_transactions', 'u', ARRAY['provider_payment_id'], NULL::text, NULL::text, NULL::text[], 'UNIQUE (provider_payment_id)', 'UNIQUE'),
        ('payment_transactions', 'f', ARRAY['order_id'], 'public', 'payment_orders', ARRAY['id'], 'FOREIGN KEY (order_id) REFERENCES public.payment_orders(id)', 'FOREIGN_KEY'),
        ('payment_transactions', 'f', ARRAY['user_id'], 'public', 'profiles', ARRAY['id'], 'FOREIGN KEY (user_id) REFERENCES public.profiles(id)', 'FOREIGN_KEY'),
        ('payment_transactions', 'c', ARRAY['amount_paise'], NULL::text, NULL::text, NULL::text[], 'CHECK (amount_paise > 0)', 'CHECK_AMOUNT_PAISE'),
        ('promotional_slots', 'p', ARRAY['slot_number'], NULL::text, NULL::text, NULL::text[], 'PRIMARY KEY (slot_number)', 'PRIMARY_KEY'),
        ('promotional_slots', 'f', ARRAY['order_id'], 'public', 'payment_orders', ARRAY['id'], 'FOREIGN KEY (order_id) REFERENCES public.payment_orders(id)', 'FOREIGN_KEY'),
        ('promotional_slots', 'f', ARRAY['user_id'], 'public', 'profiles', ARRAY['id'], 'FOREIGN KEY (user_id) REFERENCES public.profiles(id)', 'FOREIGN_KEY'),
        ('promotional_slots', 'c', ARRAY['slot_number'], NULL::text, NULL::text, NULL::text[], 'CHECK (slot_number BETWEEN 1 AND 100)', 'CHECK_SLOT_NUMBER_RANGE'),
        ('promotional_slots', 'c', ARRAY['status'], NULL::text, NULL::text, NULL::text[], 'CHECK status IN (reserved, claimed, released)', 'CHECK_PROMOTIONAL_STATUS')
    ) AS s(table_name, constraint_type, con_columns, ref_schema, ref_table, ref_columns, req_desc, validation_rule)
),
check_2_missing_constraints AS (
    SELECT 
        s.table_name, 
        s.req_desc,
        CASE 
            WHEN NOT EXISTS (
                SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
                WHERE n.nspname = 'public' AND c.relname = s.table_name
            ) THEN 'Table ' || s.table_name || ' does not exist'
            WHEN EXISTS (
                SELECT 1 FROM check_2_raw_constraints rc 
                WHERE rc.table_name = s.table_name 
                  AND rc.constraint_type = s.constraint_type 
                  AND rc.con_columns = s.con_columns
            ) THEN 'Constraint on ' || s.table_name || '(' || array_to_string(s.con_columns, ', ') || ') definition mismatch or cannot be verified to match exact required expression - requires manual review: ' || (
                SELECT rc.constraint_definition FROM check_2_raw_constraints rc 
                WHERE rc.table_name = s.table_name 
                  AND rc.constraint_type = s.constraint_type 
                  AND rc.con_columns = s.con_columns 
                LIMIT 1
            )
            ELSE 'Constraint missing: ' || s.req_desc
        END AS reason
    FROM check_2_required_specs s
    WHERE NOT EXISTS (
        SELECT 1 FROM check_2_raw_constraints rc
        WHERE rc.table_name = s.table_name
          AND rc.constraint_type = s.constraint_type
          AND rc.con_columns = s.con_columns
          AND (s.ref_schema IS NULL OR rc.ref_schema = s.ref_schema)
          AND (s.ref_table IS NULL OR rc.ref_table = s.ref_table)
          AND (s.ref_columns IS NULL OR rc.ref_columns = s.ref_columns)
          AND (
              CASE s.validation_rule
                  WHEN 'CHECK_AMOUNT_PAISE' THEN
                      rc.constraint_definition !~* '\mOR\M'
                      AND rc.constraint_definition ~ '^CHECK\s*\(\s*\(+\s*amount_paise\s*>\s*0\s*\)+\s*\)$'
                  WHEN 'CHECK_SLOT_NUMBER_RANGE' THEN
                      rc.constraint_definition !~* '\mOR\M'
                      AND rc.constraint_definition ~ '^CHECK\s*\(\s*\(+\s*slot_number\s*>=\s*1\s*\)+\s*AND\s*\(+\s*slot_number\s*<=\s*100\s*\)+\s*\)$'
                  WHEN 'CHECK_PROMOTIONAL_STATUS' THEN
                      rc.constraint_definition !~* '\mOR\M'
                      AND rc.constraint_definition ~ '^CHECK\s*\(\s*\(+\s*status\s*=\s*ANY\s*\(\s*ARRAY\[.+\]\)\s*\)+\s*\)$'
                      AND rc.extracted_literals = ARRAY['claimed', 'released', 'reserved']
                  ELSE true
              END
          )
    )
),
check_2 AS (
    SELECT 
        2 AS check_number,
        'Constraints, Foreign Keys, and Primary Keys'::TEXT AS check_name,
        CASE 
            WHEN (SELECT count(*) FROM check_2_raw_constraints) = 0 THEN 'CANNOT_EVALUATE'
            WHEN (SELECT count(*) FROM check_2_missing_constraints) > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        (SELECT count(*)::INT FROM check_2_missing_constraints) AS finding_count,
        jsonb_build_object(
            'total_constraints_found', (SELECT count(*) FROM check_2_raw_constraints),
            'missing_required_constraints', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object('table', table_name, 'constraint', req_desc, 'reason', reason)
                ), '[]'::JSONB) 
                FROM check_2_missing_constraints
            ),
            'constraints_by_table', (
                SELECT coalesce(jsonb_object_agg(
                    t.table_name,
                    coalesce((
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'name', rc.constraint_name,
                                'type', rc.constraint_type,
                                'columns', rc.con_columns,
                                'ref_schema', rc.ref_schema,
                                'ref_table', rc.ref_table,
                                'ref_columns', rc.ref_columns,
                                'definition', rc.constraint_definition
                            ) ORDER BY rc.constraint_name
                        )
                        FROM check_2_raw_constraints rc
                        WHERE rc.table_name = t.table_name
                    ), '[]'::JSONB)
                ), '{}'::JSONB)
                FROM (SELECT unnest(ARRAY['profiles', 'payment_orders', 'payment_transactions', 'promotional_slots']) AS table_name) t
            )
        ) AS details
),

-- ─── CHECK 3: EXISTING INDEXES ON PAYMENT & PROFILE TABLES ───────────────────
check_3_raw_indexes AS (
    SELECT 
        c.relname AS table_name,
        ic.relname AS index_name,
        i.indisunique AS is_unique,
        i.indisprimary AS is_primary,
        i.indisvalid AS is_valid,
        i.indisready AS is_ready,
        (i.indpred IS NULL) AS is_unconditional,
        i.indnkeyatts AS key_column_count,
        pg_get_indexdef(i.indexrelid) AS index_def
    FROM pg_index i
    JOIN pg_class c ON c.oid = i.indrelid
    JOIN pg_class ic ON ic.oid = i.indexrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname IN ('profiles', 'payment_orders', 'payment_transactions', 'promotional_slots')
),
check_3_required_indexes AS (
    SELECT * FROM (VALUES
        ('payment_orders', 'Unique provider_order_id index', true, true, 1, 'btree\s*\(provider_order_id\)'),
        ('payment_orders', 'Foreign key user_id index', false, true, 1, 'btree\s*\(user_id\)'),
        ('payment_transactions', 'Unique provider_payment_id index', true, true, 1, 'btree\s*\(provider_payment_id\)'),
        ('payment_transactions', 'Foreign key user_id index', false, true, 1, 'btree\s*\(user_id\)')
    ) AS req(table_name, req_desc, req_unique, req_unconditional, req_col_count, pattern)
),
check_3_missing_indexes AS (
    SELECT 
        req.table_name, 
        req.req_desc,
        CASE 
            WHEN NOT EXISTS (
                SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
                WHERE n.nspname = 'public' AND c.relname = req.table_name
            ) THEN 'Table ' || req.table_name || ' does not exist'
            ELSE 'Index missing or validity/readiness/uniqueness requirement unmet: ' || req.req_desc
        END AS reason
    FROM check_3_required_indexes req
    WHERE NOT EXISTS (
        SELECT 1 FROM check_3_raw_indexes ri
        WHERE ri.table_name = req.table_name
          AND ri.is_valid = true
          AND ri.is_ready = true
          AND (NOT req.req_unique OR ri.is_unique = true)
          AND (NOT req.req_unconditional OR ri.is_unconditional = true)
          AND (req.req_col_count IS NULL OR ri.key_column_count = req.req_col_count)
          AND ri.index_def ~* req.pattern
    )
),
check_3_advisory_checks AS (
    SELECT 
        NOT EXISTS (
            SELECT 1 FROM check_3_raw_indexes 
            WHERE table_name = 'payment_transactions' AND index_def ~* '\(order_id\)' AND is_valid = true AND is_ready = true
        ) AS missing_tx_order_id_fk_index,
        EXISTS (
            SELECT 1 FROM check_3_raw_indexes
            WHERE table_name = 'payment_transactions' 
              AND is_unique = true
              AND is_valid = true
              AND is_ready = true
              AND index_def ~* 'order_id.*WHERE.*status\s*=\s*''captured'''
        ) AS has_captured_partial_unique_index
),
check_3 AS (
    SELECT 
        3 AS check_number,
        'Existing Indexes on Payment & Profile Tables'::TEXT AS check_name,
        CASE 
            WHEN (SELECT count(*) FROM check_3_raw_indexes) = 0 THEN 'CANNOT_EVALUATE'
            WHEN (SELECT count(*) FROM check_3_missing_indexes) > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        (SELECT count(*)::INT FROM check_3_missing_indexes) AS finding_count,
        jsonb_build_object(
            'total_indexes_found', (SELECT count(*) FROM check_3_raw_indexes),
            'missing_critical_indexes', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object('table', table_name, 'index', req_desc, 'reason', reason)
                ), '[]'::JSONB) 
                FROM check_3_missing_indexes
            ),
            'advisory_notes', jsonb_build_object(
                'tx_order_id_fk_indexed', NOT (SELECT missing_tx_order_id_fk_index FROM check_3_advisory_checks),
                'captured_order_partial_unique_index_present', (SELECT has_captured_partial_unique_index FROM check_3_advisory_checks)
            ),
            'indexes_by_table', (
                SELECT coalesce(jsonb_object_agg(
                    t.table_name,
                    coalesce((
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'index_name', ri.index_name,
                                'is_unique', ri.is_unique,
                                'is_primary', ri.is_primary,
                                'is_valid', ri.is_valid,
                                'is_ready', ri.is_ready,
                                'index_def', ri.index_def
                            ) ORDER BY ri.index_name
                        )
                        FROM check_3_raw_indexes ri
                        WHERE ri.table_name = t.table_name
                    ), '[]'::JSONB)
                ), '{}'::JSONB)
                FROM (SELECT unnest(ARRAY['profiles', 'payment_orders', 'payment_transactions', 'promotional_slots']) AS table_name) t
            )
        ) AS details
),

-- ─── CHECK 4: ROW LEVEL SECURITY (RLS) STATUS & ACTIVE POLICIES ─────────────
check_4_expected_tables AS (
    SELECT unnest(ARRAY['profiles', 'payment_orders', 'payment_transactions', 'promotional_slots']) AS table_name
),
check_4_raw_rls AS (
    SELECT 
        c.relname AS table_name,
        c.relrowsecurity AS rls_enabled,
        c.relforcerowsecurity AS rls_forced_for_owner,
        p.policyname,
        p.roles,
        p.cmd AS command_type,
        p.qual AS using_expression,
        p.with_check AS with_check_expression
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    LEFT JOIN pg_policies p ON p.schemaname = n.nspname AND p.tablename = c.relname
    WHERE n.nspname = 'public'
      AND c.relname IN ('profiles', 'payment_orders', 'payment_transactions', 'promotional_slots')
),
check_4_table_rls_summary AS (
    SELECT 
        e.table_name,
        c.oid IS NOT NULL AS table_exists,
        coalesce(bool_and(c.relrowsecurity), false) AS is_rls_enabled
    FROM check_4_expected_tables e
    LEFT JOIN (
        pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace AND n.nspname = 'public'
    ) ON c.relname = e.table_name
    GROUP BY e.table_name, c.oid
),
check_4_unprotected_tables AS (
    SELECT table_name FROM check_4_table_rls_summary WHERE table_exists = true AND is_rls_enabled = false
),
check_4_missing_tables AS (
    SELECT table_name FROM check_4_table_rls_summary WHERE table_exists = false
),
check_4_overly_permissive_policies AS (
    SELECT DISTINCT table_name, policyname, roles, using_expression, with_check_expression
    FROM check_4_raw_rls
    WHERE policyname IS NOT NULL
      AND (
          (using_expression = 'true' AND (
              roles IS NULL 
              OR 'anon' = ANY(roles) 
              OR 'public' = ANY(roles)
              OR ('authenticated' = ANY(roles) AND table_name IN ('profiles', 'payment_orders', 'payment_transactions', 'promotional_slots'))
          ))
          OR
          (with_check_expression = 'true' AND (
              roles IS NULL 
              OR 'anon' = ANY(roles) 
              OR 'public' = ANY(roles)
              OR ('authenticated' = ANY(roles) AND table_name IN ('payment_orders', 'payment_transactions', 'promotional_slots'))
          ))
      )
),
check_4_view_leaks AS (
    SELECT 
        c.relname AS view_name,
        r.rolname AS grantee,
        'View in public schema grants SELECT to client role (' || r.rolname || ') without security_invoker enforcement'::TEXT AS leak_reason
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_roles r ON r.rolname IN ('anon', 'authenticated')
    WHERE n.nspname = 'public' 
      AND c.relkind = 'v'
      AND has_table_privilege(r.rolname, c.oid, 'SELECT')
      AND NOT coalesce((
          SELECT (regexp_match(array_to_string(c.reloptions, ','), 'security_invoker=(true|on|1)'))[1] IS NOT NULL
      ), false)
),
check_4 AS (
    SELECT 
        4 AS check_number,
        'Row Level Security (RLS) Status & Active Policies'::TEXT AS check_name,
        CASE 
            WHEN (SELECT count(*) FROM check_4_table_rls_summary WHERE table_exists = true) = 0 THEN 'CANNOT_EVALUATE'
            WHEN (SELECT count(*) FROM check_4_missing_tables) > 0
              OR (SELECT count(*) FROM check_4_unprotected_tables) > 0 
              OR (SELECT count(*) FROM check_4_overly_permissive_policies) > 0 
              OR (SELECT count(*) FROM check_4_view_leaks) > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        ((SELECT count(*)::INT FROM check_4_missing_tables)
        + (SELECT count(*)::INT FROM check_4_unprotected_tables) 
        + (SELECT count(*)::INT FROM check_4_overly_permissive_policies)
        + (SELECT count(*)::INT FROM check_4_view_leaks))::INT AS finding_count,
        jsonb_build_object(
            'tables_evaluated', (SELECT coalesce(jsonb_agg(table_name ORDER BY table_name), '[]'::JSONB) FROM check_4_table_rls_summary WHERE table_exists = true),
            'missing_tables', (SELECT coalesce(jsonb_agg(table_name ORDER BY table_name), '[]'::JSONB) FROM check_4_missing_tables),
            'tables_with_rls_disabled', (SELECT coalesce(jsonb_agg(table_name ORDER BY table_name), '[]'::JSONB) FROM check_4_unprotected_tables),
            'overly_permissive_policies', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'table', table_name,
                        'policy', policyname,
                        'roles', roles,
                        'qual', using_expression,
                        'with_check', with_check_expression
                    )
                ), '[]'::JSONB)
                FROM check_4_overly_permissive_policies
            ),
            'view_privilege_leaks', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'view_name', view_name,
                        'grantee', grantee,
                        'reason', leak_reason
                    )
                ), '[]'::JSONB)
                FROM check_4_view_leaks
            ),
            'policies_by_table', (
                SELECT coalesce(jsonb_object_agg(
                    t.table_name,
                    coalesce((
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'policyname', r.policyname,
                                'roles', r.roles,
                                'cmd', r.command_type,
                                'qual', r.using_expression,
                                'with_check', r.with_check_expression
                            ) ORDER BY r.policyname
                        )
                        FROM check_4_raw_rls r
                        WHERE r.table_name = t.table_name AND r.policyname IS NOT NULL
                    ), '[]'::JSONB)
                ), '{}'::JSONB)
                FROM (SELECT unnest(ARRAY['profiles', 'payment_orders', 'payment_transactions', 'promotional_slots']) AS table_name) t
            )
        ) AS details
),

-- ─── CHECK 5: TABLE-LEVEL PRIVILEGES FOR CLIENT ROLES ────────────────────────
check_5_expected_tables AS (
    SELECT unnest(ARRAY['profiles', 'payment_orders', 'payment_transactions', 'promotional_slots']) AS table_name
),
check_5_raw_privileges AS (
    SELECT 
        table_name, 
        grantee, 
        privilege_type
    FROM information_schema.table_privileges
    WHERE table_schema = 'public'
      AND table_name IN ('profiles', 'payment_orders', 'payment_transactions', 'promotional_slots')
      AND grantee IN ('anon', 'authenticated', 'service_role', 'PUBLIC')
),
check_5_direct_unauthorized AS (
    SELECT table_name, grantee, privilege_type,
           CASE 
               WHEN grantee IN ('anon', 'PUBLIC') THEN 'Direct table privilege ' || privilege_type || ' granted to ' || grantee || ' on ' || table_name
               WHEN grantee = 'authenticated' AND table_name IN ('payment_orders', 'payment_transactions', 'promotional_slots') AND privilege_type IN ('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE') 
                    THEN 'Authenticated role holds direct write privilege ' || privilege_type || ' on payment table ' || table_name
               WHEN grantee = 'authenticated' AND table_name = 'promotional_slots' AND privilege_type = 'SELECT'
                    THEN 'Authenticated role holds direct table SELECT on promotional_slots (violates SEC-06; aggregate RPC required)'
               WHEN grantee = 'authenticated' AND table_name = 'profiles' AND privilege_type IN ('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE')
                    THEN 'Authenticated role holds direct table-level ' || privilege_type || ' on profiles (violates SEC-02; column grants required)'
               ELSE NULL
           END AS reason
    FROM check_5_raw_privileges
    WHERE (grantee IN ('anon', 'PUBLIC'))
       OR (grantee = 'authenticated' AND table_name IN ('payment_orders', 'payment_transactions', 'promotional_slots') AND privilege_type IN ('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE'))
       OR (grantee = 'authenticated' AND table_name = 'promotional_slots' AND privilege_type = 'SELECT')
       OR (grantee = 'authenticated' AND table_name = 'profiles' AND privilege_type IN ('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE'))
),
check_5_effective_privileges AS (
    SELECT 
        t.table_name,
        r.role_name,
        p.privilege_type,
        CASE 
            WHEN to_regclass('public.' || t.table_name) IS NOT NULL AND EXISTS (SELECT 1 FROM pg_roles WHERE rolname = r.role_name)
                THEN has_table_privilege(r.role_name, 'public.' || t.table_name, p.privilege_type)
            ELSE false
        END AS has_priv
    FROM check_5_expected_tables t
    CROSS JOIN (VALUES ('anon'), ('authenticated')) AS r(role_name)
    CROSS JOIN (VALUES ('SELECT'), ('INSERT'), ('UPDATE'), ('DELETE'), ('TRUNCATE')) AS p(privilege_type)
),
check_5_effective_unauthorized AS (
    SELECT 
        table_name,
        role_name AS grantee,
        privilege_type,
        CASE 
            WHEN role_name = 'anon' THEN 'Effective privilege ' || privilege_type || ' held by anon on ' || table_name
            WHEN role_name = 'authenticated' AND table_name = 'promotional_slots' THEN 'Effective SELECT privilege held by authenticated on promotional_slots (violates SEC-06)'
            WHEN role_name = 'authenticated' AND privilege_type IN ('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE') THEN 'Effective write privilege ' || privilege_type || ' held by authenticated on ' || table_name
            ELSE NULL
        END AS reason
    FROM check_5_effective_privileges
    WHERE has_priv = true
      AND (
          role_name = 'anon'
          OR (role_name = 'authenticated' AND table_name = 'promotional_slots')
          OR (role_name = 'authenticated' AND privilege_type IN ('INSERT', 'UPDATE', 'DELETE', 'TRUNCATE'))
      )
),
check_5_all_findings AS (
    SELECT 'DIRECT_GRANT' AS source, table_name, grantee, privilege_type, reason FROM check_5_direct_unauthorized
    UNION
    SELECT 'EFFECTIVE_PRIVILEGE' AS source, table_name, grantee, privilege_type, reason FROM check_5_effective_unauthorized
),
check_5 AS (
    SELECT 
        5 AS check_number,
        'Table-Level Privileges for Client Roles'::TEXT AS check_name,
        CASE 
            WHEN (SELECT count(*) FROM check_5_raw_privileges) = 0 THEN 'CANNOT_EVALUATE'
            WHEN (SELECT count(*) FROM check_5_all_findings) > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        (SELECT count(*)::INT FROM check_5_all_findings) AS finding_count,
        jsonb_build_object(
            'total_privilege_grants_found', (SELECT count(*) FROM check_5_raw_privileges),
            'unauthorized_findings', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'source', source,
                        'table_name', table_name,
                        'grantee', grantee,
                        'privilege_type', privilege_type,
                        'reason', reason
                    ) ORDER BY table_name, grantee, privilege_type
                ), '[]'::JSONB)
                FROM check_5_all_findings
            ),
            'direct_grants', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'table_name', table_name,
                        'grantee', grantee,
                        'privilege_type', privilege_type
                    ) ORDER BY table_name, grantee, privilege_type
                ), '[]'::JSONB)
                FROM check_5_raw_privileges
            )
        ) AS details
),

-- ─── CHECK 6: COLUMN-LEVEL PRIVILEGES ON public.profiles ─────────────────────
check_6_raw_col_privs AS (
    SELECT 
        table_name, 
        grantee, 
        column_name, 
        privilege_type
    FROM information_schema.column_privileges
    WHERE table_schema = 'public' 
      AND table_name = 'profiles'
      AND privilege_type = 'UPDATE'
      AND grantee IN ('anon', 'authenticated', 'PUBLIC')
),
check_6_privileged_columns AS (
    SELECT unnest(ARRAY[
        'is_premium', 'campus_coins', 'xp', 'current_streak',
        'subscription_tier', 'subscription_expires_at',
        'last_practice_date', 'total_questions_attempted',
        'last_adaptive_drill_at', 'created_at', 'id'
    ]) AS column_name
),
check_6_direct_unauthorized AS (
    SELECT cp.column_name, cp.grantee, cp.privilege_type,
           CASE 
               WHEN cp.grantee IN ('anon', 'PUBLIC') THEN 'Anonymous/Public role granted direct UPDATE on column ' || cp.column_name
               WHEN cp.column_name IN (SELECT column_name FROM check_6_privileged_columns) THEN 'Privileged column ' || cp.column_name || ' granted UPDATE to ' || cp.grantee
               ELSE 'Unexpected grantee or column grant'
           END AS reason
    FROM check_6_raw_col_privs cp
    WHERE cp.grantee IN ('anon', 'PUBLIC')
       OR cp.column_name IN (SELECT column_name FROM check_6_privileged_columns)
),
check_6_effective_unauthorized AS (
    SELECT 
        r.role_name AS grantee,
        c.column_name,
        'UPDATE'::TEXT AS privilege_type,
        'Effective UPDATE privilege held by ' || r.role_name || ' on column ' || c.column_name AS reason
    FROM (VALUES ('anon'), ('authenticated')) AS r(role_name)
    CROSS JOIN check_6_privileged_columns c
    WHERE to_regclass('public.profiles') IS NOT NULL
      AND EXISTS (SELECT 1 FROM pg_roles WHERE rolname = r.role_name)
      AND has_column_privilege(r.role_name, 'public.profiles', c.column_name, 'UPDATE') = true
),
check_6_all_findings AS (
    SELECT 'DIRECT_COLUMN_GRANT' AS source, column_name, grantee, privilege_type, reason FROM check_6_direct_unauthorized
    UNION
    SELECT 'EFFECTIVE_COLUMN_PRIVILEGE' AS source, column_name, grantee, privilege_type, reason FROM check_6_effective_unauthorized
),
check_6_permitted_cols AS (
    SELECT unnest(ARRAY[
        'full_name', 'target_stream', 'target_university', 'target_college',
        'exam_date', 'daily_study_hours', 'selected_subjects', 'avatar_url', 'updated_at'
    ]) AS column_name
),
check_6_auth_grants AS (
    SELECT column_name FROM check_6_raw_col_privs WHERE grantee = 'authenticated'
),
check_6_is_migration1_applied AS (
    SELECT (count(*) = 9 AND bool_and(column_name IN (SELECT column_name FROM check_6_permitted_cols))) AS applied
    FROM check_6_auth_grants
),
check_6 AS (
    SELECT 
        6 AS check_number,
        'Column-Level Privileges on public.profiles'::TEXT AS check_name,
        CASE 
            WHEN NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace WHERE n.nspname = 'public' AND c.relname = 'profiles') THEN 'CANNOT_EVALUATE'
            WHEN (SELECT count(*) FROM check_6_all_findings) > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        (SELECT count(*)::INT FROM check_6_all_findings) AS finding_count,
        jsonb_build_object(
            'total_column_grants', (SELECT count(*) FROM check_6_raw_col_privs),
            'migration1_profile_update_grants_active', (SELECT coalesce(applied, false) FROM check_6_is_migration1_applied),
            'unauthorized_findings', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'source', source,
                        'column_name', column_name,
                        'grantee', grantee,
                        'reason', reason
                    ) ORDER BY column_name, grantee
                ), '[]'::JSONB)
                FROM check_6_all_findings
            ),
            'authenticated_granted_columns', (SELECT coalesce(jsonb_agg(column_name ORDER BY column_name), '[]'::JSONB) FROM check_6_auth_grants),
            'all_column_privileges', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'grantee', grantee,
                        'column_name', column_name,
                        'privilege_type', privilege_type
                    ) ORDER BY column_name, grantee
                ), '[]'::JSONB)
                FROM check_6_raw_col_privs
            )
        ) AS details
),

-- ─── CHECK 7: DATABASE FUNCTIONS, SECURITY DEFINER & SEARCH PATHS ────────────
check_7_target_functions AS (
    SELECT unnest(ARRAY[
        'fulfill_payment_order',
        'check_profile_update_privileges',
        'get_claimed_promotional_slots_count'
    ]) AS func_name
),
check_7_raw_funcs AS (
    SELECT 
        p.proname AS function_name, 
        p.prosecdef AS is_security_definer, 
        (SELECT substring(c FROM '^search_path=(.*)$') FROM unnest(p.proconfig) c WHERE c LIKE 'search_path=%' LIMIT 1) AS raw_search_path,
        replace(regexp_replace(trim((SELECT substring(c FROM '^search_path=(.*)$') FROM unnest(p.proconfig) c WHERE c LIKE 'search_path=%' LIMIT 1)), '\s*,\s*', ', ', 'g'), '"', '') AS norm_search_path,
        p.proconfig AS full_proconfig,
        pg_get_function_identity_arguments(p.oid) AS argument_signature,
        r.rolname AS function_owner
    FROM pg_proc p
    JOIN pg_roles r ON r.oid = p.proowner
    WHERE p.pronamespace = 'public'::REGNAMESPACE
      AND (
          p.proname IN (SELECT func_name FROM check_7_target_functions)
          OR p.prosecdef = true
      )
),
check_7_overloads AS (
    SELECT 
        rf.function_name AS func_name, 
        count(*) AS func_count,
        array_agg(rf.argument_signature ORDER BY rf.argument_signature) AS signatures
    FROM check_7_raw_funcs rf
    WHERE rf.function_name IN (SELECT func_name FROM check_7_target_functions)
    GROUP BY rf.function_name
    HAVING count(*) > 1
),
check_7_func_evaluations AS (
    -- Target function evaluations
    SELECT 
        tf.func_name,
        rf.function_name IS NOT NULL AS function_exists,
        rf.is_security_definer,
        rf.raw_search_path,
        rf.norm_search_path,
        rf.argument_signature,
        rf.function_owner,
        CASE 
            WHEN rf.function_name IS NULL THEN 'Function is missing in public schema'
            WHEN tf.func_name = 'fulfill_payment_order' AND rf.is_security_definer = false 
                THEN 'fulfill_payment_order must be SECURITY DEFINER to execute atomic fulfillment'
            WHEN tf.func_name = 'check_profile_update_privileges' AND rf.is_security_definer = true 
                THEN 'CRITICAL: check_profile_update_privileges must be SECURITY INVOKER (prosecdef=false) to inspect caller role'
            WHEN tf.func_name = 'get_claimed_promotional_slots_count' AND rf.is_security_definer = false 
                THEN 'get_claimed_promotional_slots_count must be SECURITY DEFINER to aggregate restricted slot rows'
            WHEN rf.raw_search_path IS NULL 
                THEN 'Unpinned search_path configuration (CWE-426); search_path setting is unconfigured/missing in proconfig'
            WHEN rf.norm_search_path <> 'public, pg_temp'
                THEN 'Unexpected search_path configuration: found ' || quote_literal(rf.raw_search_path) || '; expected search_path=public, pg_temp'
            ELSE NULL
        END AS issue
    FROM check_7_target_functions tf
    LEFT JOIN check_7_raw_funcs rf ON rf.function_name = tf.func_name

    UNION ALL

    -- Target function overload ambiguity
    SELECT 
        o.func_name,
        true AS function_exists,
        NULL::boolean AS is_security_definer,
        NULL::text AS raw_search_path,
        NULL::text AS norm_search_path,
        array_to_string(o.signatures, '; ') AS argument_signature,
        NULL::text AS function_owner,
        'CRITICAL: Multiple overloaded functions found for ' || o.func_name || ' (' || o.func_count::text || ' overloads detected: ' || array_to_string(o.signatures, '; ') || ') - requires manual review' AS issue
    FROM check_7_overloads o

    UNION ALL

    -- Audit ALL other SECURITY DEFINER functions in public schema (e.g. handle_new_user)
    SELECT 
        rf.function_name AS func_name,
        true AS function_exists,
        rf.is_security_definer,
        rf.raw_search_path,
        rf.norm_search_path,
        rf.argument_signature,
        rf.function_owner,
        CASE
            WHEN rf.raw_search_path IS NULL
                THEN 'CRITICAL CWE-426: SECURITY DEFINER function ' || rf.function_name || ' lacks pinned search_path (unconfigured in proconfig)'
            WHEN rf.norm_search_path <> 'public, pg_temp'
                THEN 'CRITICAL CWE-426: SECURITY DEFINER function ' || rf.function_name || ' has unexpected search_path: ' || quote_literal(rf.raw_search_path) || ' (expected public, pg_temp)'
            ELSE NULL
        END AS issue
    FROM check_7_raw_funcs rf
    WHERE rf.is_security_definer = true
      AND rf.function_name NOT IN (SELECT func_name FROM check_7_target_functions)
),
check_7_issues_list AS (
    SELECT func_name, issue FROM check_7_func_evaluations WHERE issue IS NOT NULL
),
check_7 AS (
    SELECT 
        7 AS check_number,
        'Database Functions, Security Definer & Search Paths'::TEXT AS check_name,
        CASE 
            WHEN (SELECT count(*) FROM check_7_issues_list) > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        (SELECT count(*)::INT FROM check_7_issues_list) AS finding_count,
        jsonb_build_object(
            'total_functions_found', (SELECT count(*) FROM check_7_raw_funcs),
            'expected_functions_count', 3,
            'overloads_detected', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object('function', func_name, 'count', func_count, 'signatures', signatures)
                ), '[]'::JSONB) 
                FROM check_7_overloads
            ),
            'issues', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'function_name', func_name,
                        'issue', issue
                    )
                ), '[]'::JSONB)
                FROM check_7_issues_list
            ),
            'functions', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'function_name', function_name,
                        'is_security_definer', is_security_definer,
                        'raw_search_path', raw_search_path,
                        'normalized_search_path', norm_search_path,
                        'argument_signature', argument_signature,
                        'function_owner', function_owner
                    ) ORDER BY function_name, argument_signature
                ), '[]'::JSONB)
                FROM check_7_raw_funcs
            )
        ) AS details
),

-- ─── CHECK 8: CALLABLE RPC PRIVILEGES & PUBLIC ACL VERIFICATION MATRIX ───────
check_8_expected_funcs AS (
    SELECT * FROM (VALUES
        ('fulfill_payment_order', 'p_user_id uuid, p_provider text, p_provider_order_id text, p_provider_payment_id text, p_provider_signature text, p_amount_paise integer, p_currency text, p_tier text, p_expires_at timestamp with time zone, p_bonus_coins integer, p_raw_payload jsonb'),
        ('get_claimed_promotional_slots_count', '')
    ) AS f(func_name, expected_args)
),
check_8_actual_funcs AS (
    SELECT 
        p.proname AS func_name, 
        p.oid, 
        p.proacl, 
        p.proowner,
        pg_get_function_identity_arguments(p.oid) AS argument_signature,
        p.prorettype::regtype::text AS return_type
    FROM pg_proc p
    WHERE p.pronamespace = 'public'::REGNAMESPACE
      AND p.proname IN (SELECT func_name FROM check_8_expected_funcs)
),
check_8_overloads AS (
    SELECT func_name, count(*) AS func_count
    FROM check_8_actual_funcs
    GROUP BY func_name
    HAVING count(*) > 1
),
check_8_missing_funcs AS (
    SELECT ef.func_name, ef.expected_args
    FROM check_8_expected_funcs ef
    LEFT JOIN check_8_actual_funcs af ON af.func_name = ef.func_name
    WHERE af.func_name IS NULL
),
check_8_signature_mismatches AS (
    SELECT af.func_name, af.argument_signature, ef.expected_args
    FROM check_8_actual_funcs af
    JOIN check_8_expected_funcs ef ON ef.func_name = af.func_name
    WHERE af.argument_signature <> ef.expected_args
),
check_8_target_roles AS (
    SELECT unnest(ARRAY['anon', 'authenticated', 'service_role']) AS target_role
),
check_8_role_presence AS (
    SELECT 
        r.target_role,
        EXISTS (SELECT 1 FROM pg_roles WHERE rolname = r.target_role) AS role_exists
    FROM check_8_target_roles r
),
check_8_raw_matrix AS (
    SELECT 
        ef.func_name AS function_name,
        r.target_role,
        af.oid IS NOT NULL AS function_exists,
        af.argument_signature,
        CASE 
            WHEN af.oid IS NOT NULL AND EXISTS (SELECT 1 FROM pg_roles WHERE rolname = r.target_role)
                THEN has_function_privilege(r.target_role, af.oid, 'EXECUTE')
            ELSE false 
        END AS has_effective_execute,
        CASE 
            WHEN af.oid IS NOT NULL THEN (
                SELECT coalesce(bool_or(a.privilege_type = 'EXECUTE'), false)
                FROM aclexplode(coalesce(af.proacl, acldefault('f', af.proowner))) a
                WHERE a.grantee = 0
            )
            ELSE false
        END AS public_has_execute_grant,
        CASE WHEN af.oid IS NOT NULL THEN (af.proacl IS NULL) ELSE NULL END AS is_default_acl
    FROM check_8_expected_funcs ef
    LEFT JOIN check_8_actual_funcs af ON af.func_name = ef.func_name
    CROSS JOIN check_8_target_roles r
),
check_8_public_acl_violations AS (
    SELECT 
        af.func_name AS function_name,
        'PUBLIC'::TEXT AS target_role,
        CASE 
            WHEN af.proacl IS NULL THEN 
                'CRITICAL: ' || af.func_name || ' has default function ACL (unrevoked PUBLIC EXECUTE grant; acldefault)'
            ELSE
                'CRITICAL: ' || af.func_name || ' explicitly grants EXECUTE to PUBLIC pseudo-role'
        END AS violation_reason
    FROM check_8_actual_funcs af
    WHERE EXISTS (
        SELECT 1 
        FROM aclexplode(coalesce(af.proacl, acldefault('f', af.proowner))) a
        WHERE a.grantee = 0 AND a.privilege_type = 'EXECUTE'
    )
),
check_8_role_privilege_violations AS (
    SELECT 
        m.function_name,
        m.target_role,
        CASE 
            WHEN m.function_name = 'fulfill_payment_order' AND m.target_role = 'anon' AND m.has_effective_execute = true
                THEN 'CRITICAL: fulfill_payment_order is effectively executable by anonymous clients (anon)'
            WHEN m.function_name = 'fulfill_payment_order' AND m.target_role = 'authenticated' AND m.has_effective_execute = true
                THEN 'CRITICAL: fulfill_payment_order is effectively executable by authenticated clients (privilege escalation risk)'
            WHEN m.function_name = 'fulfill_payment_order' AND m.target_role = 'service_role' AND m.has_effective_execute = false
                THEN 'service_role lacks effective EXECUTE privilege on fulfill_payment_order'
            WHEN m.function_name = 'get_claimed_promotional_slots_count' AND m.target_role = 'anon' AND m.has_effective_execute = true
                THEN 'CRITICAL: get_claimed_promotional_slots_count is effectively executable by anonymous clients (anon)'
            WHEN m.function_name = 'get_claimed_promotional_slots_count' AND m.target_role = 'authenticated' AND m.has_effective_execute = false
                THEN 'authenticated role lacks effective EXECUTE privilege on get_claimed_promotional_slots_count'
            WHEN m.function_name = 'get_claimed_promotional_slots_count' AND m.target_role = 'service_role' AND m.has_effective_execute = false
                THEN 'service_role lacks effective EXECUTE privilege on get_claimed_promotional_slots_count'
            ELSE NULL
        END AS violation_reason
    FROM check_8_raw_matrix m
    WHERE m.function_exists = true
),
check_8_violations AS (
    -- Missing required functions
    SELECT func_name AS function_name, NULL::text AS target_role,
           'Required RPC function ' || func_name || ' does not exist in public schema' AS violation_reason
    FROM check_8_missing_funcs

    UNION ALL

    -- Overload ambiguity
    SELECT func_name AS function_name, NULL::text AS target_role,
           'CRITICAL: Multiple overloaded functions found for ' || func_name || ' (' || func_count::text || ' overloads detected)' AS violation_reason
    FROM check_8_overloads

    UNION ALL

    -- Signature mismatch
    SELECT func_name AS function_name, NULL::text AS target_role,
           'Unexpected argument signature for ' || func_name || ': found ' || quote_literal(argument_signature) || '; expected ' || quote_literal(expected_args) AS violation_reason
    FROM check_8_signature_mismatches

    UNION ALL

    -- PUBLIC ACL violations (default acldefault or explicit PUBLIC grant)
    SELECT function_name, target_role, violation_reason
    FROM check_8_public_acl_violations

    UNION ALL

    -- Role effective privilege violations (anon, authenticated, service_role)
    SELECT function_name, target_role, violation_reason
    FROM check_8_role_privilege_violations
    WHERE violation_reason IS NOT NULL
),
check_8_unexpected_public_rpcs AS (
    SELECT 
        p.proname AS function_name,
        CASE 
            WHEN EXISTS (
                SELECT 1 FROM aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
                WHERE a.grantee = 0 AND a.privilege_type = 'EXECUTE'
            ) THEN 'PUBLIC'
            WHEN EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') AND has_function_privilege('anon', p.oid, 'EXECUTE') THEN 'anon'
            WHEN EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') AND has_function_privilege('authenticated', p.oid, 'EXECUTE') THEN 'authenticated'
            ELSE 'service_role/owner'
        END AS target_role,
        CASE 
            WHEN EXISTS (
                SELECT 1 FROM aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
                WHERE a.grantee = 0 AND a.privilege_type = 'EXECUTE'
            )
                THEN 'CRITICAL: Unexpected callable RPC function ' || p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ') is executable by PUBLIC pseudo-role'
            WHEN EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') AND has_function_privilege('anon', p.oid, 'EXECUTE')
                THEN 'CRITICAL: Unexpected callable RPC function ' || p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ') is executable by anonymous clients'
            WHEN EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') AND has_function_privilege('authenticated', p.oid, 'EXECUTE')
                THEN 'CRITICAL: Unexpected callable RPC function ' || p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ') is executable by authenticated clients'
            ELSE 'AMBIGUOUS / MANUAL REVIEW: Unexpected custom non-extension function in public schema: ' || p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ')'
        END AS violation_reason
    FROM pg_proc p
    WHERE p.pronamespace = 'public'::REGNAMESPACE
      AND p.proname NOT IN (SELECT func_name FROM check_8_expected_funcs)
      AND p.prorettype <> 'trigger'::REGTYPE
      AND NOT EXISTS (SELECT 1 FROM pg_depend d WHERE d.objid = p.oid AND d.deptype = 'e')
),
check_8_active_violations AS (
    SELECT DISTINCT function_name, target_role, violation_reason
    FROM check_8_violations
    WHERE violation_reason IS NOT NULL

    UNION ALL

    SELECT function_name, target_role, violation_reason
    FROM check_8_unexpected_public_rpcs
),
check_8 AS (
    SELECT 
        8 AS check_number,
        'Callable RPC Privileges & Public ACL Verification Matrix'::TEXT AS check_name,
        CASE 
            WHEN NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname IN ('anon', 'authenticated', 'service_role')) THEN 'CANNOT_EVALUATE'
            WHEN (SELECT count(*) FROM check_8_active_violations) > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        (SELECT count(*)::INT FROM check_8_active_violations) AS finding_count,
        jsonb_build_object(
            'target_functions_evaluated', (SELECT coalesce(jsonb_agg(DISTINCT func_name ORDER BY func_name), '[]'::JSONB) FROM check_8_expected_funcs),
            'missing_functions', (SELECT coalesce(jsonb_agg(func_name ORDER BY func_name), '[]'::JSONB) FROM check_8_missing_funcs),
            'overloads_detected', (SELECT coalesce(jsonb_agg(jsonb_build_object('function', func_name, 'count', func_count)), '[]'::JSONB) FROM check_8_overloads),
            'signature_mismatches', (SELECT coalesce(jsonb_agg(jsonb_build_object('function', func_name, 'actual', argument_signature, 'expected', expected_args)), '[]'::JSONB) FROM check_8_signature_mismatches),
            'role_presence', (SELECT coalesce(jsonb_object_agg(target_role, role_exists), '{}'::JSONB) FROM check_8_role_presence),
            'violations', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'function_name', function_name,
                        'target_role', target_role,
                        'reason', violation_reason
                    )
                ), '[]'::JSONB)
                FROM check_8_active_violations
            ),
            'rpc_privilege_matrix', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'function_name', function_name,
                        'target_role', target_role,
                        'argument_signature', argument_signature,
                        'has_effective_execute', has_effective_execute,
                        'public_has_execute_grant', public_has_execute_grant,
                        'is_default_acl', is_default_acl
                    ) ORDER BY function_name, target_role
                ), '[]'::JSONB)
                FROM check_8_raw_matrix
                WHERE function_exists = true
            )
        ) AS details
),

-- ─── CHECK 9: ACTIVE TRIGGERS & SECURITY CONTEXT ON public.profiles ──────────
check_9_raw_trigger AS (
    SELECT 
        t.tgname AS trigger_name,
        n.nspname AS schema_name,
        c.relname AS table_name,
        t.tgenabled::TEXT AS trigger_enabled,
        np.nspname AS function_schema,
        p.proname AS function_name,
        p.prosecdef AS is_security_definer,
        (SELECT substring(conf FROM '^search_path=(.*)$') FROM unnest(p.proconfig) conf WHERE conf LIKE 'search_path=%' LIMIT 1) AS raw_search_path,
        replace(regexp_replace(trim((SELECT substring(conf FROM '^search_path=(.*)$') FROM unnest(p.proconfig) conf WHERE conf LIKE 'search_path=%' LIMIT 1)), '\s*,\s*', ', ', 'g'), '"', '') AS norm_search_path,
        p.proconfig AS search_path_configuration,
        pg_get_triggerdef(t.oid) AS trigger_definition
    FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_proc p ON p.oid = t.tgfoid
    JOIN pg_namespace np ON np.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND c.relname = 'profiles'
      AND t.tgname = 'trg_protect_profiles_privileges'
      AND NOT t.tgisinternal
),
check_9_table_exists AS (
    SELECT EXISTS (
        SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relname = 'profiles'
    ) AS profiles_exists
),
check_9_trigger_issues AS (
    SELECT issue FROM (
        SELECT 
            CASE 
                WHEN NOT (SELECT profiles_exists FROM check_9_table_exists) 
                    THEN 'Table public.profiles does not exist'
                WHEN (SELECT count(*) FROM check_9_raw_trigger) = 0 
                    THEN 'Defense-in-depth trigger trg_protect_profiles_privileges is missing on public.profiles'
                ELSE NULL
            END AS issue
        UNION ALL
        SELECT 
            CASE
                WHEN (SELECT count(*) FROM check_9_raw_trigger) > 0 AND (r.function_schema <> 'public' OR r.function_name <> 'check_profile_update_privileges')
                    THEN 'Trigger trg_protect_profiles_privileges invokes unexpected function: ' || quote_literal(r.function_schema || '.' || r.function_name) || ' (expected public.check_profile_update_privileges)'
                ELSE NULL
            END AS issue
        FROM check_9_raw_trigger r
        UNION ALL
        SELECT 
            CASE
                WHEN (SELECT count(*) FROM check_9_raw_trigger) > 0 AND r.trigger_enabled <> 'O'
                    THEN 'Trigger trg_protect_profiles_privileges is disabled (enabled status: ' || r.trigger_enabled || ')'
                ELSE NULL
            END AS issue
        FROM check_9_raw_trigger r
        UNION ALL
        SELECT 
            CASE
                WHEN (SELECT count(*) FROM check_9_raw_trigger) > 0 AND r.is_security_definer = true
                    THEN 'CRITICAL: Trigger function check_profile_update_privileges is SECURITY DEFINER (must be SECURITY INVOKER)'
                ELSE NULL
            END AS issue
        FROM check_9_raw_trigger r
        UNION ALL
        SELECT 
            CASE
                WHEN (SELECT count(*) FROM check_9_raw_trigger) > 0 AND r.raw_search_path IS NULL
                    THEN 'Trigger function check_profile_update_privileges search_path is unpinned/missing in proconfig (CWE-426)'
                WHEN (SELECT count(*) FROM check_9_raw_trigger) > 0 AND r.norm_search_path <> 'public, pg_temp'
                    THEN 'Unexpected trigger function search_path: found ' || quote_literal(r.raw_search_path) || '; expected search_path=public, pg_temp'
                ELSE NULL
            END AS issue
        FROM check_9_raw_trigger r
    ) all_issues
    WHERE issue IS NOT NULL
),
check_9 AS (
    SELECT 
        9 AS check_number,
        'Active Triggers & Security Context on public.profiles'::TEXT AS check_name,
        CASE 
            WHEN NOT (SELECT profiles_exists FROM check_9_table_exists) THEN 'CANNOT_EVALUATE'
            WHEN (SELECT count(*) FROM check_9_trigger_issues) > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        (SELECT count(*)::INT FROM check_9_trigger_issues) AS finding_count,
        jsonb_build_object(
            'trigger_installed', ((SELECT count(*) FROM check_9_raw_trigger) > 0),
            'target_table', 'public.profiles',
            'expected_function', 'public.check_profile_update_privileges',
            'issue', (SELECT issue FROM check_9_trigger_issues LIMIT 1),
            'issues', (SELECT coalesce(jsonb_agg(issue), '[]'::JSONB) FROM check_9_trigger_issues),
            'trigger_details', (
                SELECT coalesce(jsonb_build_object(
                    'trigger_name', trigger_name,
                    'schema_name', schema_name,
                    'table_name', table_name,
                    'trigger_enabled', trigger_enabled,
                    'function_schema', function_schema,
                    'function_name', function_name,
                    'is_security_definer', is_security_definer,
                    'raw_search_path', raw_search_path,
                    'normalized_search_path', norm_search_path,
                    'search_path_configuration', search_path_configuration,
                    'trigger_definition', trigger_definition
                ), '{}'::JSONB)
                FROM check_9_raw_trigger
            )
        ) AS details
),

-- ─── CHECK 10: DUPLICATE CAPTURED TRANSACTIONS PER ORDER (SAFE DYNAMIC) ──────
check_10_raw AS (
    SELECT CASE 
        WHEN to_regclass('public.payment_transactions') IS NOT NULL THEN
            (xpath('//res/text()', query_to_xml($q$
                WITH dupes AS (
                    SELECT 
                        order_id, 
                        count(*) AS captured_count, 
                        array_agg(id ORDER BY verified_at) AS transaction_ids,
                        array_agg(provider_payment_id ORDER BY verified_at) AS provider_payment_ids,
                        array_agg(amount_paise ORDER BY verified_at) AS amounts,
                        array_agg(user_id ORDER BY verified_at) AS user_ids
                    FROM public.payment_transactions
                    WHERE status = 'captured' AND order_id IS NOT NULL
                    GROUP BY order_id
                    HAVING count(*) > 1
                ),
                dupe_count AS (
                    SELECT count(*) AS total_count FROM dupes
                )
                SELECT jsonb_build_object(
                    'finding_count', (SELECT total_count FROM dupe_count),
                    'duplicate_order_count', (SELECT total_count FROM dupe_count),
                    'diagnostic_guidance', 'Every order must have at most 1 captured transaction before applying unique index uq_payment_transactions_captured_order.',
                    'duplicates', coalesce((
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'order_id', order_id,
                                'captured_count', captured_count,
                                'transaction_ids', transaction_ids,
                                'provider_payment_ids', provider_payment_ids,
                                'amounts', amounts,
                                'user_ids', user_ids
                            )
                        ) FROM (SELECT * FROM dupes LIMIT 50) s
                    ), '[]'::jsonb)
                )::text AS res
            $q$, true, false, '')))[1]::TEXT::JSONB
        ELSE NULL
    END AS payload
),
check_10 AS (
    SELECT 
        10 AS check_number,
        'Preflight Audit: Duplicate Captured Transactions per Order'::TEXT AS check_name,
        CASE 
            WHEN payload IS NULL THEN 'CANNOT_EVALUATE'
            WHEN (payload->>'finding_count')::INT > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        coalesce((payload->>'finding_count')::INT, 0) AS finding_count,
        coalesce(payload - 'finding_count', jsonb_build_object('error', 'Relation public.payment_transactions does not exist.')) AS details
    FROM check_10_raw
),

-- ─── CHECK 11: DUPLICATE SLOTS PER ORDER (SAFE DYNAMIC) ─────────────────────
check_11_raw AS (
    SELECT CASE 
        WHEN to_regclass('public.promotional_slots') IS NOT NULL THEN
            (xpath('//res/text()', query_to_xml($q$
                WITH dupe_slots AS (
                    SELECT 
                        order_id, 
                        count(*) AS slot_count, 
                        array_agg(slot_number ORDER BY reserved_at) AS slot_numbers,
                        array_agg(status ORDER BY reserved_at) AS statuses
                    FROM public.promotional_slots
                    WHERE order_id IS NOT NULL
                    GROUP BY order_id
                    HAVING count(*) > 1
                ),
                dupe_count AS (
                    SELECT count(*) AS total_count FROM dupe_slots
                )
                SELECT jsonb_build_object(
                    'finding_count', (SELECT total_count FROM dupe_count),
                    'duplicate_slot_order_count', (SELECT total_count FROM dupe_count),
                    'diagnostic_guidance', 'Each promotional order must reserve at most 1 slot to prevent inventory leakage.',
                    'duplicates', coalesce((
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'order_id', order_id,
                                'slot_count', slot_count,
                                'slot_numbers', slot_numbers,
                                'statuses', statuses
                            )
                        ) FROM (SELECT * FROM dupe_slots LIMIT 50) s
                    ), '[]'::jsonb)
                )::text AS res
            $q$, true, false, '')))[1]::TEXT::JSONB
        ELSE NULL
    END AS payload
),
check_11 AS (
    SELECT 
        11 AS check_number,
        'Preflight Audit: Duplicate Slots per Order'::TEXT AS check_name,
        CASE 
            WHEN payload IS NULL THEN 'CANNOT_EVALUATE'
            WHEN (payload->>'finding_count')::INT > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        coalesce((payload->>'finding_count')::INT, 0) AS finding_count,
        coalesce(payload - 'finding_count', jsonb_build_object('error', 'Relation public.promotional_slots does not exist.')) AS details
    FROM check_11_raw
),

-- ─── CHECK 12: INCONSISTENT / ORPHANED PAYMENT RECORDS (SAFE DYNAMIC) ───────
check_12_raw AS (
    SELECT CASE 
        WHEN to_regclass('public.payment_orders') IS NOT NULL 
         AND to_regclass('public.payment_transactions') IS NOT NULL THEN
            (xpath('//res/text()', query_to_xml($q$
                WITH issues AS (
                    SELECT 'ORDER_PAID_WITHOUT_CAPTURED_TRANSACTION'::TEXT AS issue_type,
                           o.id AS order_id, NULL::UUID AS transaction_id, o.provider_order_id,
                           NULL::TEXT AS provider_payment_id, o.user_id, o.amount_paise AS order_amount_paise,
                           NULL::INTEGER AS transaction_amount_paise, o.status AS order_status,
                           NULL::TEXT AS transaction_status,
                           'Order is marked paid but no corresponding captured payment transaction exists in public.payment_transactions.'::TEXT AS diagnostic_notes
                    FROM public.payment_orders o
                    LEFT JOIN public.payment_transactions t ON t.order_id = o.id AND t.status = 'captured'
                    WHERE o.status = 'paid' AND t.id IS NULL

                    UNION ALL

                    SELECT 'TRANSACTION_CAPTURED_BUT_ORDER_UNPAID'::TEXT AS issue_type,
                           o.id AS order_id, t.id AS transaction_id, o.provider_order_id,
                           t.provider_payment_id, t.user_id, o.amount_paise AS order_amount_paise,
                           t.amount_paise AS transaction_amount_paise, o.status AS order_status,
                           t.status AS transaction_status,
                           ('Transaction is captured but linked order has status ' || quote_literal(o.status) || '; expected paid or refunded.')::TEXT AS diagnostic_notes
                    FROM public.payment_transactions t
                    JOIN public.payment_orders o ON o.id = t.order_id
                    WHERE t.status = 'captured' AND o.status NOT IN ('paid', 'refunded')

                    UNION ALL

                    SELECT 'AMOUNT_MISMATCH_BETWEEN_ORDER_AND_TRANSACTION'::TEXT AS issue_type,
                           o.id AS order_id, t.id AS transaction_id, o.provider_order_id,
                           t.provider_payment_id, t.user_id, o.amount_paise AS order_amount_paise,
                           t.amount_paise AS transaction_amount_paise, o.status AS order_status,
                           t.status AS transaction_status,
                           ('Order amount (' || o.amount_paise::TEXT || ' paise) does not match captured transaction amount (' || t.amount_paise::TEXT || ' paise).')::TEXT AS diagnostic_notes
                    FROM public.payment_transactions t
                    JOIN public.payment_orders o ON o.id = t.order_id
                    WHERE t.status = 'captured' AND t.amount_paise <> o.amount_paise

                    UNION ALL

                    SELECT 'TRANSACTION_REFERENCES_NONEXISTENT_ORDER'::TEXT AS issue_type,
                           t.order_id AS order_id, t.id AS transaction_id, NULL::TEXT AS provider_order_id,
                           t.provider_payment_id, t.user_id, NULL::INTEGER AS order_amount_paise,
                           t.amount_paise AS transaction_amount_paise, NULL::TEXT AS order_status,
                           t.status AS transaction_status,
                           ('Transaction has non-null order_id ' || t.order_id::TEXT || ' which does not exist in public.payment_orders.')::TEXT AS diagnostic_notes
                    FROM public.payment_transactions t
                    LEFT JOIN public.payment_orders o ON o.id = t.order_id
                    WHERE t.order_id IS NOT NULL AND o.id IS NULL

                    UNION ALL

                    SELECT 'USER_ID_MISMATCH_BETWEEN_ORDER_AND_TRANSACTION'::TEXT AS issue_type,
                           o.id AS order_id, t.id AS transaction_id, o.provider_order_id,
                           t.provider_payment_id, t.user_id, o.amount_paise AS order_amount_paise,
                           t.amount_paise AS transaction_amount_paise, o.status AS order_status,
                           t.status AS transaction_status,
                           ('Transaction belongs to candidate user ' || t.user_id::TEXT || ' but linked payment order belongs to candidate user ' || o.user_id::TEXT || '.')::TEXT AS diagnostic_notes
                    FROM public.payment_transactions t
                    JOIN public.payment_orders o ON o.id = t.order_id
                    WHERE t.status = 'captured' AND t.user_id <> o.user_id

                    UNION ALL

                    SELECT 'PROVIDER_MISMATCH_BETWEEN_ORDER_AND_TRANSACTION'::TEXT AS issue_type,
                           o.id AS order_id, t.id AS transaction_id, o.provider_order_id,
                           t.provider_payment_id, t.user_id, o.amount_paise AS order_amount_paise,
                           t.amount_paise AS transaction_amount_paise, o.status AS order_status,
                           t.status AS transaction_status,
                           ('Transaction recorded provider ' || quote_literal(t.provider) || ' but linked order recorded provider ' || quote_literal(o.provider) || '.')::TEXT AS diagnostic_notes
                    FROM public.payment_transactions t
                    JOIN public.payment_orders o ON o.id = t.order_id
                    WHERE t.status = 'captured' AND t.provider IS DISTINCT FROM o.provider

                    UNION ALL

                    SELECT 'CURRENCY_MISMATCH_BETWEEN_ORDER_AND_TRANSACTION'::TEXT AS issue_type,
                           o.id AS order_id, t.id AS transaction_id, o.provider_order_id,
                           t.provider_payment_id, t.user_id, o.amount_paise AS order_amount_paise,
                           t.amount_paise AS transaction_amount_paise, o.status AS order_status,
                           t.status AS transaction_status,
                           ('Transaction currency (' || quote_literal(coalesce(t.currency, '')) || ') does not match order currency (' || quote_literal(coalesce(o.currency, '')) || ').')::TEXT AS diagnostic_notes
                    FROM public.payment_transactions t
                    JOIN public.payment_orders o ON o.id = t.order_id
                    WHERE t.status = 'captured' AND upper(coalesce(t.currency, '')) <> upper(coalesce(o.currency, ''))
                ),
                issues_count AS (
                    SELECT count(*) AS total_count FROM issues
                ),
                breakdown AS (
                    SELECT issue_type, count(*) AS count_per_type
                    FROM issues
                    GROUP BY issue_type
                )
                SELECT jsonb_build_object(
                    'finding_count', (SELECT total_count FROM issues_count),
                    'total_anomalies_count', (SELECT total_count FROM issues_count),
                    'breakdown_by_issue_type', coalesce((SELECT jsonb_object_agg(issue_type, count_per_type) FROM breakdown), '{}'::jsonb),
                    'sample_anomalies', coalesce((
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'issue_type', issue_type,
                                'order_id', order_id,
                                'transaction_id', transaction_id,
                                'provider_order_id', provider_order_id,
                                'provider_payment_id', provider_payment_id,
                                'user_id', user_id,
                                'order_amount_paise', order_amount_paise,
                                'transaction_amount_paise', transaction_amount_paise,
                                'order_status', order_status,
                                'transaction_status', transaction_status,
                                'diagnostic_notes', diagnostic_notes
                            )
                        ) FROM (SELECT * FROM issues LIMIT 50) s
                    ), '[]'::jsonb)
                )::text AS res
            $q$, true, false, '')))[1]::TEXT::JSONB
        ELSE NULL
    END AS payload
),
check_12 AS (
    SELECT 
        12 AS check_number,
        'Preflight Audit: Inconsistent / Orphaned Payment Records'::TEXT AS check_name,
        CASE 
            WHEN payload IS NULL THEN 'CANNOT_EVALUATE'
            WHEN (payload->>'finding_count')::INT > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        coalesce((payload->>'finding_count')::INT, 0) AS finding_count,
        coalesce(payload - 'finding_count', jsonb_build_object('error', 'Required tables (payment_orders, payment_transactions) do not exist.')) AS details
    FROM check_12_raw
),

-- ─── CHECK 13: PROMOTIONAL SLOT INTEGRITY & ORDER CONFLICTS (SAFE DYNAMIC) ───
check_13_raw AS (
    SELECT CASE 
        WHEN to_regclass('public.payment_orders') IS NOT NULL 
         AND to_regclass('public.promotional_slots') IS NOT NULL THEN
            (xpath('//res/text()', query_to_xml($q$
                WITH slot_issues AS (
                    SELECT 'SLOT_REFERENCES_NONEXISTENT_ORDER'::TEXT AS issue_type,
                           ps.slot_number, ps.status AS slot_status, ps.user_id AS slot_user_id,
                           ps.order_id AS slot_order_id, NULL::UUID AS order_user_id,
                           NULL::INTEGER AS order_slot_number, NULL::TEXT AS order_status,
                           ps.reserved_at, ps.claimed_at,
                           ('Slot ' || ps.slot_number::TEXT || ' references order_id ' || ps.order_id::TEXT || ' which does not exist in public.payment_orders.')::TEXT AS diagnostic_notes
                    FROM public.promotional_slots ps
                    LEFT JOIN public.payment_orders o ON o.id = ps.order_id
                    WHERE ps.order_id IS NOT NULL AND o.id IS NULL

                    UNION ALL

                    SELECT 'SLOT_USER_ID_MISMATCH_WITH_ORDER'::TEXT AS issue_type,
                           ps.slot_number, ps.status AS slot_status, ps.user_id AS slot_user_id,
                           ps.order_id AS slot_order_id, o.user_id AS order_user_id,
                           o.promotional_slot_number AS order_slot_number, o.status AS order_status,
                           ps.reserved_at, ps.claimed_at,
                           ('Slot user (' || ps.user_id::TEXT || ') does not match order user (' || o.user_id::TEXT || ').')::TEXT AS diagnostic_notes
                    FROM public.promotional_slots ps
                    JOIN public.payment_orders o ON o.id = ps.order_id
                    WHERE ps.user_id IS NOT NULL AND ps.user_id <> o.user_id

                    UNION ALL

                    SELECT 'SLOT_NUMBER_MISMATCH_WITH_ORDER'::TEXT AS issue_type,
                           ps.slot_number, ps.status AS slot_status, ps.user_id AS slot_user_id,
                           ps.order_id AS slot_order_id, o.user_id AS order_user_id,
                           o.promotional_slot_number AS order_slot_number, o.status AS order_status,
                           ps.reserved_at, ps.claimed_at,
                           ('Slot ledger has slot ' || ps.slot_number::TEXT || ' but linked order records promotional_slot_number ' || coalesce(o.promotional_slot_number::TEXT, 'NULL') || '.')::TEXT AS diagnostic_notes
                    FROM public.promotional_slots ps
                    JOIN public.payment_orders o ON o.id = ps.order_id
                    WHERE o.promotional_slot_number IS NOT NULL AND ps.slot_number <> o.promotional_slot_number

                    UNION ALL

                    SELECT 'SLOT_UNCLAIMED_FOR_PAID_ORDER'::TEXT AS issue_type,
                           ps.slot_number, ps.status AS slot_status, ps.user_id AS slot_user_id,
                           ps.order_id AS slot_order_id, o.user_id AS order_user_id,
                           o.promotional_slot_number AS order_slot_number, o.status AS order_status,
                           ps.reserved_at, ps.claimed_at,
                           ('Payment order is paid, but associated promotional slot ' || ps.slot_number::TEXT || ' remains reserved instead of claimed.')::TEXT AS diagnostic_notes
                    FROM public.promotional_slots ps
                    JOIN public.payment_orders o ON o.id = ps.order_id
                    WHERE o.status = 'paid' AND ps.status = 'reserved'

                    UNION ALL

                    SELECT 'SLOT_CLAIMED_FOR_UNPAID_ORDER'::TEXT AS issue_type,
                           ps.slot_number, ps.status AS slot_status, ps.user_id AS slot_user_id,
                           ps.order_id AS slot_order_id, o.user_id AS order_user_id,
                           o.promotional_slot_number AS order_slot_number, o.status AS order_status,
                           ps.reserved_at, ps.claimed_at,
                           ('Promotional slot ' || ps.slot_number::TEXT || ' is claimed, but linked order has unpaid status ' || quote_literal(o.status) || '.')::TEXT AS diagnostic_notes
                    FROM public.promotional_slots ps
                    JOIN public.payment_orders o ON o.id = ps.order_id
                    WHERE ps.status = 'claimed' AND o.status NOT IN ('paid', 'refunded')

                    UNION ALL

                    SELECT 'ORDER_PROMOTIONAL_FLAG_WITHOUT_SLOT_RECORD'::TEXT AS issue_type,
                           o.promotional_slot_number AS slot_number, ps.status AS slot_status,
                           ps.user_id AS slot_user_id, ps.order_id AS slot_order_id,
                           o.user_id AS order_user_id, o.promotional_slot_number AS order_slot_number,
                           o.status AS order_status, ps.reserved_at, ps.claimed_at,
                           ('Order ' || o.id::TEXT || ' has is_promotional = TRUE but lacks a valid slot reservation in promotional_slots.')::TEXT AS diagnostic_notes
                    FROM public.payment_orders o
                    LEFT JOIN public.promotional_slots ps ON (ps.slot_number = o.promotional_slot_number OR ps.order_id = o.id)
                    WHERE o.is_promotional = TRUE 
                      AND (o.promotional_slot_number IS NULL OR ps.slot_number IS NULL)
                ),
                slot_issues_count AS (
                    SELECT count(*) AS total_count FROM slot_issues
                ),
                breakdown AS (
                    SELECT issue_type, count(*) AS count_per_type
                    FROM slot_issues
                    GROUP BY issue_type
                )
                SELECT jsonb_build_object(
                    'finding_count', (SELECT total_count FROM slot_issues_count),
                    'total_conflicts_count', (SELECT total_count FROM slot_issues_count),
                    'breakdown_by_issue_type', coalesce((SELECT jsonb_object_agg(issue_type, count_per_type) FROM breakdown), '{}'::jsonb),
                    'sample_conflicts', coalesce((
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'issue_type', issue_type,
                                'slot_number', slot_number,
                                'slot_status', slot_status,
                                'slot_user_id', slot_user_id,
                                'slot_order_id', slot_order_id,
                                'order_user_id', order_user_id,
                                'order_slot_number', order_slot_number,
                                'order_status', order_status,
                                'reserved_at', reserved_at,
                                'claimed_at', claimed_at,
                                'diagnostic_notes', diagnostic_notes
                            )
                        ) FROM (SELECT * FROM slot_issues LIMIT 50) s
                    ), '[]'::jsonb)
                )::text AS res
            $q$, true, false, '')))[1]::TEXT::JSONB
        ELSE NULL
    END AS payload
),
check_13 AS (
    SELECT 
        13 AS check_number,
        'Preflight Audit: Promotional Slot Integrity & Order Conflicts'::TEXT AS check_name,
        CASE 
            WHEN payload IS NULL THEN 'CANNOT_EVALUATE'
            WHEN (payload->>'finding_count')::INT > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        coalesce((payload->>'finding_count')::INT, 0) AS finding_count,
        coalesce(payload - 'finding_count', jsonb_build_object('error', 'Required tables (payment_orders, promotional_slots) do not exist.')) AS details
    FROM check_13_raw
),

-- ─── CHECK 14: PROFILES WITH ACTIVE PREMIUM WITHOUT PAYMENT (SAFE DYNAMIC) ───
check_14_raw AS (
    SELECT CASE 
        WHEN to_regclass('public.profiles') IS NOT NULL 
         AND to_regclass('public.payment_transactions') IS NOT NULL 
         AND to_regclass('public.payment_orders') IS NOT NULL
         AND EXISTS (
             SELECT 1 FROM information_schema.columns 
             WHERE table_schema = 'public' AND table_name = 'payment_orders' AND column_name = 'plan_id'
         ) THEN
            (xpath('//res/text()', query_to_xml($q$
                WITH entitlement_eval AS (
                    SELECT 
                        p.id AS user_id, 
                        concat(left(p.full_name, 1), '***') AS masked_name,
                        p.subscription_tier, 
                        p.subscription_expires_at, 
                        p.created_at,
                        p.is_premium,
                        -- Project entitlement rule: is_premium = true AND (subscription_expires_at IS NULL OR subscription_expires_at > NOW())
                        (p.subscription_expires_at IS NULL OR p.subscription_expires_at > NOW()) AS is_within_validity,
                        -- Conclusively verify payment backing: captured transaction linked to paid order for an authorized Premium plan from the verified allowlist
                        EXISTS (
                            SELECT 1 
                            FROM public.payment_transactions t
                            JOIN public.payment_orders o ON o.id = t.order_id
                            WHERE t.user_id = p.id 
                              AND o.user_id = p.id
                              AND t.status = 'captured'
                              AND o.status = 'paid'
                              AND o.plan_id = ANY (ARRAY['all_access_pass_799', 'all_access_pass', 'ai_practice_pass', 'ai_practice_pass_499', 'ai_pass_399'])
                        ) AS has_verified_premium_payment,
                        -- Detect any captured transaction to distinguish unbacked from unrelated/unverifiable payment
                        EXISTS (
                            SELECT 1 
                            FROM public.payment_transactions t 
                            WHERE t.user_id = p.id AND t.status = 'captured'
                        ) AS has_any_captured_payment
                    FROM public.profiles p
                    WHERE p.is_premium = true
                ),
                classified AS (
                    SELECT 
                        user_id,
                        masked_name,
                        subscription_tier,
                        subscription_expires_at,
                        created_at,
                        is_within_validity,
                        has_verified_premium_payment,
                        has_any_captured_payment,
                        CASE 
                            WHEN is_within_validity AND has_verified_premium_payment 
                                THEN 'CURRENTLY_ACTIVE_BACKED_PREMIUM'
                            WHEN is_within_validity AND NOT has_verified_premium_payment AND has_any_captured_payment 
                                THEN 'CURRENTLY_ACTIVE_PREMIUM_UNRELATED_PAYMENT'
                            WHEN is_within_validity AND NOT has_any_captured_payment 
                                THEN 'CURRENTLY_ACTIVE_UNBACKED_PREMIUM'
                            WHEN NOT is_within_validity AND has_verified_premium_payment 
                                THEN 'EXPIRED_STALE_PREMIUM_FLAG'
                            WHEN NOT is_within_validity AND NOT has_verified_premium_payment AND has_any_captured_payment 
                                THEN 'EXPIRED_PREMIUM_UNRELATED_PAYMENT'
                            ELSE 'EXPIRED_UNBACKED_PREMIUM'
                        END AS classification
                    FROM entitlement_eval
                ),
                counts AS (
                    SELECT 
                        count(*) AS total_flagged_premium,
                        count(*) FILTER (WHERE classification = 'CURRENTLY_ACTIVE_UNBACKED_PREMIUM') AS active_unbacked_count,
                        count(*) FILTER (WHERE classification = 'CURRENTLY_ACTIVE_PREMIUM_UNRELATED_PAYMENT') AS active_unrelated_payment_count,
                        count(*) FILTER (WHERE classification = 'EXPIRED_UNBACKED_PREMIUM') AS expired_unbacked_count,
                        count(*) FILTER (WHERE classification = 'EXPIRED_PREMIUM_UNRELATED_PAYMENT') AS expired_unrelated_payment_count,
                        count(*) FILTER (WHERE classification = 'EXPIRED_STALE_PREMIUM_FLAG') AS expired_stale_flag_count,
                        count(*) FILTER (WHERE classification = 'CURRENTLY_ACTIVE_BACKED_PREMIUM') AS active_backed_count
                    FROM classified
                ),
                findings AS (
                    SELECT * FROM classified
                    WHERE classification IN (
                        'CURRENTLY_ACTIVE_UNBACKED_PREMIUM', 
                        'CURRENTLY_ACTIVE_PREMIUM_UNRELATED_PAYMENT',
                        'EXPIRED_UNBACKED_PREMIUM',
                        'EXPIRED_PREMIUM_UNRELATED_PAYMENT'
                    )
                )
                SELECT jsonb_build_object(
                    'finding_count', (SELECT (active_unbacked_count + active_unrelated_payment_count + expired_unbacked_count + expired_unrelated_payment_count) FROM counts),
                    'active_unbacked_count', (SELECT active_unbacked_count FROM counts),
                    'active_unrelated_payment_count', (SELECT active_unrelated_payment_count FROM counts),
                    'expired_unbacked_count', (SELECT expired_unbacked_count FROM counts),
                    'expired_unrelated_payment_count', (SELECT expired_unrelated_payment_count FROM counts),
                    'expired_stale_flag_count', (SELECT expired_stale_flag_count FROM counts),
                    'active_backed_count', (SELECT active_backed_count FROM counts),
                    'total_premium_flagged', (SELECT total_flagged_premium FROM counts),
                    'diagnostic_guidance', 'Entitlement rules require active premium (is_premium=true AND (expires_at IS NULL OR expires_at > NOW())) to be backed by a verified captured payment transaction linked to an authorized Premium plan order (allowlist: all_access_pass_799, all_access_pass, ai_practice_pass, ai_practice_pass_499, ai_pass_399). Active accounts with no payment or only unrelated payments (e.g. non-premium orders) represent critical privilege anomalies. Expired subscriptions retaining is_premium=true indicate state desynchronization requiring background cleanup.',
                    'unbacked_profiles', coalesce((
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'classification', classification,
                                'user_id', user_id,
                                'masked_name', masked_name,
                                'subscription_tier', subscription_tier,
                                'subscription_expires_at', subscription_expires_at,
                                'created_at', created_at
                            )
                        ) FROM (SELECT * FROM findings LIMIT 50) s
                    ), '[]'::jsonb),
                    'stale_expired_samples', coalesce((
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'user_id', user_id,
                                'masked_name', masked_name,
                                'subscription_tier', subscription_tier,
                                'subscription_expires_at', subscription_expires_at
                            )
                        ) FROM (SELECT * FROM classified WHERE classification = 'EXPIRED_STALE_PREMIUM_FLAG' LIMIT 10) s
                    ), '[]'::jsonb)
                )::text AS res
            $q$, true, false, '')))[1]::TEXT::JSONB
        WHEN to_regclass('public.profiles') IS NOT NULL 
         AND to_regclass('public.payment_transactions') IS NOT NULL THEN
            jsonb_build_object(
                'finding_count', (SELECT count(*)::INT FROM public.profiles WHERE is_premium = true),
                'active_unbacked_count', 0,
                'active_unrelated_payment_count', 0,
                'expired_unbacked_count', 0,
                'expired_unrelated_payment_count', 0,
                'expired_stale_flag_count', 0,
                'active_backed_count', 0,
                'total_premium_flagged', (SELECT count(*)::INT FROM public.profiles WHERE is_premium = true),
                'limitation', 'Relation public.payment_orders or column plan_id does not exist. Purchase purpose cannot be established from database schema alone.',
                'diagnostic_guidance', 'Payment orders table or plan_id column is missing; cannot reliably establish purchase purpose. Payment backing cannot be conclusively verified from payment_transactions alone.',
                'unbacked_profiles', '[]'::jsonb,
                'stale_expired_samples', '[]'::jsonb
            )
        ELSE NULL
    END AS payload
),
check_14 AS (
    SELECT 
        14 AS check_number,
        'Preflight Audit: Active Premium Profiles without Payment'::TEXT AS check_name,
        CASE 
            WHEN payload IS NULL THEN 'CANNOT_EVALUATE'
            WHEN (payload->>'finding_count')::INT > 0 THEN 'INVESTIGATION_REQUIRED'
            WHEN (payload->>'expired_stale_flag_count')::INT > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        coalesce((payload->>'finding_count')::INT, 0) + coalesce((payload->>'expired_stale_flag_count')::INT, 0) AS finding_count,
        coalesce(payload - 'finding_count', jsonb_build_object('error', 'Required tables (profiles, payment_transactions) do not exist.')) AS details
    FROM check_14_raw
),

-- ─── CHECK 15: VALIDATE TARGET COLUMNS FOR MIGRATION 1 ───────────────────────
check_15_expected_cols AS (
    SELECT unnest(ARRAY[
        'full_name',
        'target_stream',
        'target_university',
        'target_college',
        'exam_date',
        'daily_study_hours',
        'selected_subjects',
        'avatar_url',
        'updated_at'
    ]) AS column_name
),
check_15_actual_cols AS (
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
      AND table_name = 'profiles' 
      AND column_name IN (SELECT column_name FROM check_15_expected_cols)
),
check_15_table_presence AS (
    SELECT EXISTS (
        SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public' AND c.relname = 'profiles'
    ) AS has_profiles
),
check_15_missing_cols AS (
    SELECT e.column_name 
    FROM check_15_expected_cols e
    LEFT JOIN check_15_actual_cols a ON a.column_name = e.column_name
    WHERE a.column_name IS NULL
),
check_15 AS (
    SELECT 
        15 AS check_number,
        'Validate Target Columns for Migration 1 (Column Update Grants)'::TEXT AS check_name,
        CASE 
            WHEN NOT (SELECT has_profiles FROM check_15_table_presence) THEN 'CANNOT_EVALUATE'
            WHEN (SELECT count(*) FROM check_15_missing_cols) > 0 THEN 'INVESTIGATION_REQUIRED'
            ELSE 'HEALTHY'
        END AS status,
        (SELECT count(*)::INT FROM check_15_missing_cols) AS finding_count,
        jsonb_build_object(
            'expected_column_count', 9,
            'found_column_count', (SELECT count(*) FROM check_15_actual_cols),
            'missing_columns', (SELECT coalesce(jsonb_agg(column_name ORDER BY column_name), '[]'::JSONB) FROM check_15_missing_cols),
            'present_columns', (
                SELECT coalesce(jsonb_agg(
                    jsonb_build_object(
                        'column_name', column_name,
                        'data_type', data_type
                    ) ORDER BY column_name
                ), '[]'::JSONB)
                FROM check_15_actual_cols
            )
        ) AS details
)

-- ─── FINAL CONSOLIDATED REPORT RESULT SET ────────────────────────────────────
SELECT check_number, check_name, status, finding_count, details FROM check_1
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_2
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_3
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_4
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_5
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_6
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_7
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_8
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_9
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_10
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_11
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_12
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_13
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_14
UNION ALL
SELECT check_number, check_name, status, finding_count, details FROM check_15
ORDER BY check_number;
