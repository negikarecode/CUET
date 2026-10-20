-- =============================================================================
-- CUETMATE SECURITY REMEDIATION: SEC-07 & CWE-426
-- Migration: 20261020_remediate_view_pii_and_search_path.sql
-- Purpose:
-- 1. SEC-07: Revoke anonymous & authenticated direct SELECT on legacy views
--    (public.students, public.student_attempts, public.pacing_analytics_summary)
--    preventing anonymous candidates' PII and email scraping (RLS bypass).
-- 2. CWE-426: Pin search_path = public, pg_temp on public.handle_new_user()
--    trigger function to eliminate search-path hijacking privilege escalation.
-- =============================================================================

-- 1. Revoke client permissions on views that bypass profiles and user_attempts RLS
REVOKE ALL ON public.students FROM anon, authenticated;
REVOKE ALL ON public.student_attempts FROM anon, authenticated;
REVOKE ALL ON public.pacing_analytics_summary FROM anon, authenticated;

-- Ensure service_role maintains administrative access for background jobs
GRANT SELECT ON public.students TO service_role;
GRANT SELECT ON public.student_attempts TO service_role;
GRANT SELECT ON public.pacing_analytics_summary TO service_role;

-- 2. Hardening handle_new_user search path against privilege escalation (CWE-426)
ALTER FUNCTION public.handle_new_user() SET search_path = public, pg_temp;

COMMENT ON VIEW public.students IS 
'Restricted compatibility view for internal server-role jobs (SEC-07). Direct client access revoked to prevent RLS bypass.';
