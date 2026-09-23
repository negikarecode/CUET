/**
 * Mistake Diagnostic Bridge
 * Re-exports the production Gemini 2.0 Flash diagnostic engine from lib/ai/gemini-diagnostics.ts
 */
export * from "@/lib/ai/gemini-diagnostics";
export { diagnoseMistake as default } from "@/lib/ai/gemini-diagnostics";
