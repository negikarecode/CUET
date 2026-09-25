#!/usr/bin/env python3
"""
CUET UG Master Question Paper Generator (v2) - External Numerical Sandbox
Mandatory Code-Execution Verification (Section 10).
Evaluates `verification.computation` using a secure Python AST evaluator.
"""

import sys
import json
import re
import ast
import operator
import math

# Safe operator mapping for AST evaluation
SAFE_OPERATORS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.FloorDiv: operator.floordiv,
    ast.Mod: operator.mod,
    ast.Pow: operator.pow,
    ast.USub: operator.neg,
    ast.UAdd: operator.pos,
}

SAFE_FUNCTIONS = {
    "sqrt": math.sqrt,
    "log10": math.log10,
    "exp": math.exp,
    "abs": abs,
    "round": round,
    "pi": math.pi,
}

def safe_eval(node):
    """Safely evaluates an AST expression containing only arithmetic and math functions."""
    if isinstance(node, ast.Constant): # Python 3.8+ (numbers, strings, booleans)
        if isinstance(node.value, (int, float)):
            return float(node.value)
        raise ValueError(f"Disallowed constant type: {type(node.value)}")
    elif isinstance(node, ast.BinOp):
        left = safe_eval(node.left)
        right = safe_eval(node.right)
        op_type = type(node.op)
        if op_type in SAFE_OPERATORS:
            return SAFE_OPERATORS[op_type](left, right)
        raise ValueError(f"Disallowed binary operator: {op_type}")
    elif isinstance(node, ast.UnaryOp):
        operand = safe_eval(node.operand)
        op_type = type(node.op)
        if op_type in SAFE_OPERATORS:
            return SAFE_OPERATORS[op_type](operand)
        raise ValueError(f"Disallowed unary operator: {op_type}")
    elif isinstance(node, ast.Call):
        func_name = getattr(node.func, "id", None)
        if func_name in SAFE_FUNCTIONS:
            args = [safe_eval(arg) for arg in node.args]
            return float(SAFE_FUNCTIONS[func_name](*args))
        raise ValueError(f"Disallowed function call: {func_name}")
    elif isinstance(node, ast.Name):
        if node.id == "pi":
            return math.pi
        raise ValueError(f"Unknown variable: {node.id}")
    else:
        raise ValueError(f"Disallowed AST node: {type(node)}")

def clean_computation_expression(expr: str) -> str:
    """Pre-processes plain algebraic/arithmetic computation string."""
    clean = expr.strip()
    if "=" in clean:
        clean = clean.split("=")[0].strip()
    
    # Replace symbols
    clean = clean.replace(r"\times", "*")
    clean = clean.replace(r"\cdot", "*")
    clean = clean.replace(r"\div", "/")
    clean = clean.replace("^", "**")
    # Strip currency, units, percent
    clean = re.sub(r'[₹$]|Rs\.?|km/h|m/s|cm|m|kg|g|%|crores|lakhs', '', clean, flags=re.IGNORECASE).strip()
    return clean

def extract_numeric_value(text: str):
    """Extracts first valid numerical value from text."""
    if not text:
        return None
    # Fractions like \frac{a}{b}
    frac = re.search(r'\\frac\{(\d+(?:\.\d+)?)\}\{(\d+(?:\.\d+)?)\}', text)
    if frac:
        num, den = float(frac.group(1)), float(frac.group(2))
        if den != 0:
            return num / den

    # Regular float/int
    cleaned = text.replace(",", "")
    match = re.search(r'([-+]?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?)', cleaned)
    if match:
        try:
            return float(match.group(1))
        except ValueError:
            return None
    return None

def verify_single_question(q):
    q_num = q.get("questionNumber")
    verification = q.get("verification") or {}
    archetype = q.get("archetype", "")
    skill = q.get("skillTested", "")
    
    is_numerical = (
        verification.get("applicableForNumericalOnly") is True
        or archetype == "Calculation Trap"
        or skill == "Numerical Reasoning"
        or verification.get("computation") is not None
    )

    if not is_numerical:
        return {
            "questionNumber": q_num,
            "applicable": False,
            "passed": True,
            "discrepancy": None
        }

    raw_comp = verification.get("computation") or ""
    if not raw_comp.strip():
        return {
            "questionNumber": q_num,
            "applicable": True,
            "passed": False,
            "discrepancy": "Missing required verification computation expression"
        }

    clean_expr = clean_computation_expression(raw_comp)
    try:
        parsed_ast = ast.parse(clean_expr, mode='eval')
        computed = safe_eval(parsed_ast.body)
    except Exception as e:
        return {
            "questionNumber": q_num,
            "applicable": True,
            "passed": False,
            "discrepancy": f"Failed AST evaluation: {str(e)}"
        }

    options = q.get("options", [])
    correct_id = q.get("correctOption")
    target_opt = next((o for o in options if o.get("id") == correct_id or o.get("isCorrect")), None)
    
    if not target_opt:
        return {
            "questionNumber": q_num,
            "applicable": True,
            "passed": False,
            "discrepancy": f"No correct option matching ID '{correct_id}'"
        }

    expected_val = extract_numeric_value(target_opt.get("text", ""))
    if expected_val is None:
        return {
            "questionNumber": q_num,
            "applicable": True,
            "passed": False,
            "discrepancy": f"Cannot extract numeric target from correct option '{target_opt.get('text')}'"
        }

    diff = abs(computed - expected_val)
    max_val = max(abs(computed), abs(expected_val), 1.0)
    passed = (diff / max_val <= 0.005) or (diff < 1e-4)

    # Check distractor trap match
    distractor_match = None
    for opt in options:
        if opt.get("id") != correct_id and not opt.get("isCorrect"):
            dist_val = extract_numeric_value(opt.get("text", ""))
            if dist_val is not None:
                d_diff = abs(computed - dist_val)
                d_max = max(abs(computed), abs(dist_val), 1.0)
                if (d_diff / d_max <= 0.005) or (d_diff < 1e-4):
                    distractor_match = opt.get("id")
                    break

    discrepancy = None
    if not passed:
        if distractor_match:
            discrepancy = f"FATAL: Computed {computed} matches distractor ({distractor_match}) instead of correct option ({correct_id}={expected_val})"
        else:
            discrepancy = f"Mismatch: computed {computed} != expected {expected_val} (diff={diff})"

    return {
        "questionNumber": q_num,
        "applicable": True,
        "passed": passed,
        "computedValue": computed,
        "expectedValue": expected_val,
        "distractorTrapMatch": distractor_match,
        "discrepancy": discrepancy
    }

def main():
    if len(sys.argv) > 1 and sys.argv[1] != "-":
        with open(sys.argv[1], "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = json.load(sys.stdin)

    questions = data.get("questions") if isinstance(data, dict) and "questions" in data else data
    if not isinstance(questions, list):
        print(json.dumps({"error": "Input must be a JSON array of questions or an object with 'questions'"}))
        sys.exit(1)

    results = []
    passed_count = 0
    failed_count = 0
    for q in questions:
        r = verify_single_question(q)
        results.append(r)
        if r["applicable"]:
            if r["passed"]:
                passed_count += 1
            else:
                failed_count += 1

    output = {
        "totalEvaluated": len(questions),
        "numericalQuestionsCount": passed_count + failed_count,
        "passed": passed_count,
        "failed": failed_count,
        "results": results
    }
    print(json.dumps(output, indent=2))
    if failed_count > 0:
        sys.exit(2)
    sys.exit(0)

if __name__ == "__main__":
    main()
