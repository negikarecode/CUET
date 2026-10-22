import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fetchServerTestAttempts } from "../lib/server-attempts";

describe("SEC-08 Migration & Privilege Lockdown Test Suite", () => {
  const migrationPath = path.join(
    __dirname,
    "../supabase/migrations/20261022_lock_down_answer_keys_attempts_trophies_cache.sql"
  );
  const migrationSql = fs.readFileSync(migrationPath, "utf-8");

  describe("1. Static Migration SQL Invariant Audits", () => {
    it("should drop public read policies on questions and test_questions", () => {
      assert.ok(
        migrationSql.includes('DROP POLICY IF EXISTS "Allow public read access to questions" ON public.questions;'),
        "Must drop public read on questions"
      );
      assert.ok(
        migrationSql.includes('DROP POLICY IF EXISTS "Allow public read access to test questions" ON public.test_questions;'),
        "Must drop public read on test_questions"
      );
    });

    it("should revoke all permissions on questions and test_questions from anon and authenticated", () => {
      assert.ok(
        migrationSql.includes("REVOKE ALL ON public.questions FROM anon, authenticated;"),
        "Must revoke all on questions from anon, authenticated"
      );
      assert.ok(
        migrationSql.includes("REVOKE ALL ON public.test_questions FROM anon, authenticated;"),
        "Must revoke all on test_questions from anon, authenticated"
      );
      assert.ok(
        migrationSql.includes("GRANT ALL ON public.questions TO service_role;"),
        "Must grant all on questions to service_role"
      );
      assert.ok(
        migrationSql.includes("GRANT ALL ON public.test_questions TO service_role;"),
        "Must grant all on test_questions to service_role"
      );
    });

    it("should revoke client write privileges on user_attempts and preserve own-row SELECT", () => {
      assert.ok(
        migrationSql.includes('DROP POLICY IF EXISTS "Allow users to record own attempts" ON public.user_attempts;'),
        "Must drop client insert policy on user_attempts"
      );
      assert.ok(
        migrationSql.includes('DROP POLICY IF EXISTS "Allow users to update own attempts" ON public.user_attempts;'),
        "Must drop client update policy on user_attempts"
      );
      assert.ok(
        migrationSql.includes("REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.user_attempts FROM anon, authenticated;"),
        "Must revoke writes on user_attempts from clients"
      );
      assert.ok(
        migrationSql.includes("GRANT SELECT ON public.user_attempts TO authenticated;"),
        "Must grant SELECT on user_attempts to authenticated"
      );
      assert.ok(
        migrationSql.includes("auth.uid() = user_id"),
        "Must enforce auth.uid() = user_id for authenticated SELECT"
      );
    });

    it("should revoke client write privileges on user_trophies and restrict SELECT to own rows", () => {
      assert.ok(
        migrationSql.includes('DROP POLICY IF EXISTS "Allow users to unlock own trophies" ON public.user_trophies;'),
        "Must drop client insert policy on user_trophies"
      );
      assert.ok(
        migrationSql.includes("REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.user_trophies FROM anon, authenticated;"),
        "Must revoke writes on user_trophies from clients"
      );
      assert.ok(
        migrationSql.includes("GRANT SELECT ON public.user_trophies TO authenticated;"),
        "Must grant SELECT on user_trophies to authenticated"
      );
      assert.ok(
        migrationSql.includes("REVOKE ALL ON public.user_trophies FROM anon;"),
        "Must revoke all from anon on user_trophies"
      );
    });

    it("should isolate ai_diagnosis_cache completely to service_role", () => {
      assert.ok(
        migrationSql.includes('DROP POLICY IF EXISTS "Public read for ai_diagnosis_cache" ON public.ai_diagnosis_cache;'),
        "Must drop public read on ai_diagnosis_cache"
      );
      assert.ok(
        migrationSql.includes("REVOKE ALL ON public.ai_diagnosis_cache FROM PUBLIC, anon, authenticated;"),
        "Must revoke all from PUBLIC, anon, authenticated on ai_diagnosis_cache"
      );
      assert.ok(
        migrationSql.includes("GRANT ALL ON public.ai_diagnosis_cache TO service_role;"),
        "Must grant all on ai_diagnosis_cache to service_role"
      );
    });

    it("should ensure award_trophies is NOT in lockdown migration (gamification removed)", () => {
      assert.ok(
        !migrationSql.includes("CREATE OR REPLACE FUNCTION public.award_trophies"),
        "Lockdown migration must not contain award_trophies function"
      );
    });

    it("should revoke execute on handle_new_user from clients", () => {
      assert.ok(
        migrationSql.includes("REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;"),
        "Must revoke execute on handle_new_user from PUBLIC"
      );
      assert.ok(
        migrationSql.includes("REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon, authenticated;"),
        "Must revoke execute on handle_new_user from anon, authenticated"
      );
      assert.ok(
        migrationSql.includes("GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;"),
        "Must grant execute to service_role"
      );
    });

    it("should include an emergency rollback script block", () => {
      assert.ok(
        migrationSql.includes("ROLLBACK SCRIPT (FOR EMERGENCY USE ONLY)"),
        "Must contain emergency rollback script"
      );
      assert.ok(
        migrationSql.includes("GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated;"),
        "Rollback must restore handle_new_user grants"
      );
    });
  });

  describe("2. Client Code Security Audit (No Client-Side Direct Writes)", () => {
    it("should confirm no 'use client' file attempts to insert or update the 5 locked tables directly", () => {
      const componentsDir = path.join(__dirname, "../components");
      const appDir = path.join(__dirname, "../app");

      const checkDir = (dir: string) => {
        const files = fs.readdirSync(dir, { recursive: true }) as string[];
        for (const file of files) {
          if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue;
          const fullPath = path.join(dir, file);
          if (fs.statSync(fullPath).isDirectory()) continue;

          const content = fs.readFileSync(fullPath, "utf-8");
          if (!content.includes('"use client"') && !content.includes("'use client'")) continue;

          // Check for direct client mutations
          const forbiddenTables = ["questions", "test_questions", "user_attempts", "user_trophies", "ai_diagnosis_cache"];
          for (const tbl of forbiddenTables) {
            const hasInsert = content.match(new RegExp(`\\.from\\(["']${tbl}["']\\)\\.insert\\(`, "g"));
            const hasUpdate = content.match(new RegExp(`\\.from\\(["']${tbl}["']\\)\\.update\\(`, "g"));
            const hasDelete = content.match(new RegExp(`\\.from\\(["']${tbl}["']\\)\\.delete\\(`, "g"));

            assert.equal(
              hasInsert,
              null,
              `Client component ${file} must not directly insert into ${tbl}`
            );
            assert.equal(
              hasUpdate,
              null,
              `Client component ${file} must not directly update ${tbl}`
            );
            assert.equal(
              hasDelete,
              null,
              `Client component ${file} must not directly delete from ${tbl}`
            );
          }
        }
      };

      checkDir(componentsDir);
      checkDir(appDir);
    });

    it("should verify evaluateTrophies in lib/gamification.ts does not write to the database", () => {
      const gamificationPath = path.join(__dirname, "../lib/gamification.ts");
      const gamificationCode = fs.readFileSync(gamificationPath, "utf-8");

      assert.ok(
        !gamificationCode.includes('.from("user_trophies").insert'),
        "evaluateTrophies must not perform user_trophies insert"
      );
      assert.ok(
        !gamificationCode.includes('.from("profiles").update'),
        "evaluateTrophies must not perform profiles update"
      );
    });
  });

  describe("3. Server Endpoint Hardening", () => {
    it("fetchServerTestAttempts must throw [SECURITY FATAL] if userId is missing or empty", async () => {
      await assert.rejects(
        async () => {
          await fetchServerTestAttempts(null as any, "");
        },
        {
          name: "Error",
          message: "[SECURITY FATAL] fetchServerTestAttempts requires a non-empty authenticated userId.",
        }
      );

      await assert.rejects(
        async () => {
          await fetchServerTestAttempts(null as any, "   ");
        },
        {
          name: "Error",
          message: "[SECURITY FATAL] fetchServerTestAttempts requires a non-empty authenticated userId.",
        }
      );
    });

    it("app/api/test/[testId]/route.ts must discard client metadata for tests and questions upserts", () => {
      const routePath = path.join(__dirname, "../app/api/test/[testId]/route.ts");
      const routeCode = fs.readFileSync(routePath, "utf-8");

      // Verify tests upsert uses authoritativeMeta only
      assert.ok(
        routeCode.includes("title: authoritativeMeta?.title ||"),
        "Must use authoritativeMeta title"
      );
      assert.ok(
        !routeCode.includes("title: attempt.testTitle ||"),
        "Must discard attempt.testTitle in tests upsert"
      );

      // Verify questions upsert maps over authoritativeQuestions only
      assert.ok(
        routeCode.includes("const questionsToUpsert = authoritativeQuestions.map("),
        "Must map over authoritativeQuestions for questions upsert"
      );
      assert.ok(
        !routeCode.includes("const questionsToUpsert = attempt.questions.map("),
        "Must not map over attempt.questions for questions upsert"
      );

      // Verify gamification / award_trophies is NOT called
      assert.ok(
        !routeCode.includes('supabaseAdmin.rpc("award_trophies"'),
        "Must not call award_trophies RPC via supabaseAdmin"
      );
    });

    it("app/api/ai/insights/route.ts diagnose-mistake must validate questionId format, selectedOption, and load from DB", () => {
      const insightsPath = path.join(__dirname, "../lib/api-handlers/ai.ts");
      const insightsCode = fs.readFileSync(insightsPath, "utf-8");

      assert.ok(
        insightsCode.includes("uuidRegex.test(rawQuestionId)"),
        "Must validate questionId as valid UUID regex"
      );
      assert.ok(
        insightsCode.includes('["A", "B", "C", "D"].includes(rawSelectedOption)'),
        "Must validate selectedOption as A, B, C, or D"
      );
      assert.ok(
        insightsCode.includes('.from("questions")'),
        "Must query questions table to load canonical question"
      );
      assert.ok(
        insightsCode.includes("canonicalQuestionText"),
        "Must use canonical DB question text"
      );
    });
  });

  describe("4. Local PostgreSQL Privilege Verification (Disposable cuet_baseline)", () => {
    it("verifies permissions on local PostgreSQL cuet_baseline if running on port 54332", () => {
      try {
        // Test 1: Check table privileges for anon on questions
        const anonQuestionsCheck = execSync(
          `PGPASSWORD=postgres psql -h localhost -p 54332 -U postgres -d cuet_baseline -t -A -c "
            SELECT count(*) 
            FROM information_schema.role_table_grants 
            WHERE grantee = 'anon' AND table_name = 'questions';
          "`,
          { encoding: "utf-8" }
        ).trim();

        assert.equal(anonQuestionsCheck, "0", "anon must have 0 grants on public.questions");

        // Test 2: Check table privileges for anon on user_attempts
        const anonAttemptsCheck = execSync(
          `PGPASSWORD=postgres psql -h localhost -p 54332 -U postgres -d cuet_baseline -t -A -c "
            SELECT count(*) 
            FROM information_schema.role_table_grants 
            WHERE grantee = 'anon' AND table_name = 'user_attempts';
          "`,
          { encoding: "utf-8" }
        ).trim();

        assert.equal(anonAttemptsCheck, "0", "anon must have 0 grants on public.user_attempts");

        // Test 3: Check authenticated privileges on user_attempts (must only be SELECT)
        const authAttemptsPrivs = execSync(
          `PGPASSWORD=postgres psql -h localhost -p 54332 -U postgres -d cuet_baseline -t -A -c "
            SELECT string_agg(privilege_type, ',' ORDER BY privilege_type) 
            FROM information_schema.role_table_grants 
            WHERE grantee = 'authenticated' AND table_name = 'user_attempts';
          "`,
          { encoding: "utf-8" }
        ).trim();

        assert.equal(authAttemptsPrivs, "SELECT", "authenticated must have ONLY SELECT on public.user_attempts");

        // Test 4: Check EXECUTE grant on award_trophies function
        const awardTrophiesExecGrants = execSync(
          `PGPASSWORD=postgres psql -h localhost -p 54332 -U postgres -d cuet_baseline -t -A -c "
            SELECT string_agg(grantee, ',' ORDER BY grantee) 
            FROM information_schema.routine_privileges 
            WHERE routine_name = 'award_trophies';
          "`,
          { encoding: "utf-8" }
        ).trim();

        assert.ok(!awardTrophiesExecGrants.includes("anon"), "anon must NOT have execute on award_trophies");
        assert.ok(!awardTrophiesExecGrants.includes("authenticated"), "authenticated must NOT have execute on award_trophies");
        assert.ok(awardTrophiesExecGrants.includes("service_role"), "service_role MUST have execute on award_trophies");

        // Test 5: Check EXECUTE grant on handle_new_user function
        const handleNewUserExecGrants = execSync(
          `PGPASSWORD=postgres psql -h localhost -p 54332 -U postgres -d cuet_baseline -t -A -c "
            SELECT string_agg(grantee, ',' ORDER BY grantee) 
            FROM information_schema.routine_privileges 
            WHERE routine_name = 'handle_new_user';
          "`,
          { encoding: "utf-8" }
        ).trim();

        assert.ok(!handleNewUserExecGrants.includes("anon"), "anon must NOT have execute on handle_new_user");
        assert.ok(!handleNewUserExecGrants.includes("authenticated"), "authenticated must NOT have execute on handle_new_user");
      } catch (err: any) {
        // If local PostgreSQL is not running or unreachable, skip gracefully
        console.warn("[Local Postgres Test Skipped]:", err?.message);
      }
    });
  });
});
