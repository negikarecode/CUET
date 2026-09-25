/**
 * CUET UG Master Question Paper Generator (v2) - Mandatory Numerical Math Verifier
 * Fulfills Section 10: External Code-Execution Verification for Numerical Questions.
 */

import { V2Question, NumericalVerificationResult, OptionId } from "./types";

export class MathVerifier {
  private tolerancePercent = 0.005; // 0.5% tolerance for floating point calculations

  /**
   * Safely evaluates an arithmetic expression in a sandbox.
   * Handles equations like "(120 * 0.15) / 2 = 9" by taking the left-hand side,
   * or direct expressions like "(500 * (1 / 0.20))".
   */
  public evaluateExpression(expr: string): { computedValue: number | null; error?: string } {
    if (!expr || expr.trim().length === 0) {
      return { computedValue: null, error: "Empty computation expression" };
    }

    let clean = expr.trim();

    // If expression contains '=', take the LHS expression (the computation)
    if (clean.includes("=")) {
      const parts = clean.split("=");
      clean = (parts[0] ?? clean).trim();
    }

    // Replace LaTeX or math symbols with standard JavaScript arithmetic
    clean = clean
      .replace(/\\times/g, "*")
      .replace(/\\cdot/g, "*")
      .replace(/\\div/g, "/")
      .replace(/\^/g, "**")
      .replace(/₹|Rs\.?|\$|km\/h|m\/s|cm|m|kg|g|%|crores|lakhs/gi, "")
      .trim();

    // Whitelist check: only allow numbers, basic math operators, parentheses, decimal points, scientific notation e/E, and Math functions
    const allowedPattern = /^[\d\s\+\-\*\/\(\)\.\,eE\^\%\(\)]+$/;
    // Allow basic Math functions
    const sanitized = clean.replace(/Math\.(sqrt|pow|abs|round|floor|ceil|log10|exp|PI)/g, "");

    if (!allowedPattern.test(sanitized)) {
      return {
        computedValue: null,
        error: `Expression contains disallowed characters or unsafe tokens: '${clean}'`,
      };
    }

    try {
      // Execute within restricted Function scope with Math object exposed
      const fn = new Function("Math", `"use strict"; return (${clean});`);
      const val = Number(fn(Math));
      if (isNaN(val) || !isFinite(val)) {
        return { computedValue: null, error: "Expression evaluated to NaN or non-finite number" };
      }
      return { computedValue: val };
    } catch (err: any) {
      return { computedValue: null, error: `Evaluation error: ${err.message}` };
    }
  }

  /**
   * Extracts the primary numerical value from an option text (stripping LaTeX, currency symbols, and units)
   */
  public extractNumericValue(text: string): number | null {
    if (!text) return null;
    // Match fractions e.g. \frac{1}{2} -> 0.5, \frac{2L}{3}
    const fracMatch = text.match(/\\frac\{(\d+(?:\.\d+)?)\}\{(\d+(?:\.\d+)?)\}/);
    if (fracMatch && fracMatch[1] && fracMatch[2]) {
      const num = parseFloat(fracMatch[1]);
      const den = parseFloat(fracMatch[2]);
      if (den !== 0) return num / den;
    }

    // Match standard numbers (with optional commas, decimals, signs, and scientific notation)
    const normalized = text.replace(/,/g, "");
    const match = normalized.match(/([-+]?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?)/);
    if (match && match[1]) {
      const val = parseFloat(match[1]);
      if (!isNaN(val)) return val;
    }
    return null;
  }

  /**
   * Verifies a single question's numerical computation against correctOption and distractors.
   */
  public verifyQuestion(q: V2Question): NumericalVerificationResult {
    const isNumerical =
      q.verification?.applicableForNumericalOnly ||
      q.archetype === "Calculation Trap" ||
      q.skillTested === "Numerical Reasoning" ||
      (q.verification?.computation !== null && q.verification?.computation !== undefined);

    if (!isNumerical) {
      return {
        questionNumber: q.questionNumber,
        applicable: false,
        passed: true,
        formula: null,
        computationExpression: null,
        computedValue: null,
        expectedValue: null,
        correctOptionText: "",
        distractorTrapMatch: null,
      };
    }

    const compExpr = q.verification?.computation || "";
    const correctOpt = q.options.find((o) => o.id === q.correctOption || o.isCorrect);
    const correctText = correctOpt ? correctOpt.text : "";
    const expectedVal = this.extractNumericValue(correctText);

    if (!compExpr || compExpr.trim().length === 0) {
      return {
        questionNumber: q.questionNumber,
        applicable: true,
        passed: false,
        formula: q.verification?.formula || null,
        computationExpression: null,
        computedValue: null,
        expectedValue: expectedVal,
        correctOptionText: correctText,
        distractorTrapMatch: null,
        discrepancyNote: "Mandatory verification computation string was missing or empty.",
      };
    }

    const evalResult = this.evaluateExpression(compExpr);
    if (evalResult.error || evalResult.computedValue === null) {
      return {
        questionNumber: q.questionNumber,
        applicable: true,
        passed: false,
        formula: q.verification?.formula || null,
        computationExpression: compExpr,
        computedValue: null,
        expectedValue: expectedVal,
        correctOptionText: correctText,
        distractorTrapMatch: null,
        discrepancyNote: `Evaluation failed: ${evalResult.error}`,
      };
    }

    const computed = evalResult.computedValue;

    // Check if expected value was extractable
    if (expectedVal === null) {
      return {
        questionNumber: q.questionNumber,
        applicable: true,
        passed: false,
        formula: q.verification?.formula || null,
        computationExpression: compExpr,
        computedValue: computed,
        expectedValue: null,
        correctOptionText: correctText,
        distractorTrapMatch: null,
        discrepancyNote: `Could not parse target numerical value from correct option text: '${correctText}'`,
      };
    }

    // Check numerical equality within tolerance
    const diff = Math.abs(computed - expectedVal);
    const maxVal = Math.max(Math.abs(computed), Math.abs(expectedVal), 1.0);
    const passed = diff / maxVal <= this.tolerancePercent || diff < 1e-4;

    // Check if computed value matches any of the distractors (inverted answer key trap)
    let distractorTrapMatch: OptionId | null = null;
    for (const opt of q.options) {
      if (opt.id !== q.correctOption && !opt.isCorrect) {
        const distVal = this.extractNumericValue(opt.text);
        if (distVal !== null) {
          const distDiff = Math.abs(computed - distVal);
          const distMax = Math.max(Math.abs(computed), Math.abs(distVal), 1.0);
          if (distDiff / distMax <= this.tolerancePercent || distDiff < 1e-4) {
            distractorTrapMatch = opt.id;
            break;
          }
        }
      }
    }

    let discrepancyNote: string | undefined = undefined;
    if (!passed) {
      if (distractorTrapMatch) {
        discrepancyNote = `FATAL MISMATCH: Computation evaluated to ${computed}, which matches distractor option (${distractorTrapMatch}) rather than correct option (${q.correctOption}=${expectedVal})! Answer key or computation is inverted.`;
      } else {
        discrepancyNote = `Arithmetic mismatch: computed ${computed} != correct option value ${expectedVal} (expression: '${compExpr}')`;
      }
    }

    return {
      questionNumber: q.questionNumber,
      applicable: true,
      passed,
      formula: q.verification?.formula || null,
      computationExpression: compExpr,
      computedValue: computed,
      expectedValue: expectedVal,
      correctOptionText: correctText,
      distractorTrapMatch,
      discrepancyNote,
    };
  }

  /**
   * Applies verification to an entire array of questions and updates reviewFlags accordingly.
   */
  public verifyAndAuditBatch(questions: V2Question[]): {
    questions: V2Question[];
    results: NumericalVerificationResult[];
    passedCount: number;
    failedCount: number;
  } {
    const results: NumericalVerificationResult[] = [];
    let passedCount = 0;
    let failedCount = 0;

    for (const q of questions) {
      const res = this.verifyQuestion(q);
      results.push(res);

      if (res.applicable) {
        if (res.passed) {
          passedCount++;
          // If previously flagged for numerical review, we can safely clear it or keep it true if confidenceNote was manual
          if (!q.reviewFlags.confidenceNote) {
            q.reviewFlags.needsNumericalReview = false;
          }
        } else {
          failedCount++;
          q.reviewFlags.needsNumericalReview = true;
          q.reviewFlags.confidenceNote = res.discrepancyNote || "Numerical sandbox check failed.";
        }
      }
    }

    return { questions, results, passedCount, failedCount };
  }
}

export const globalMathVerifier = new MathVerifier();
