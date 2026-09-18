import json
import re
from fractions import Fraction

with open("qa-flags.json") as f:
    flags = json.load(f)

num_flags = [x for x in flags if "POTENTIAL_OVERLAPPING_NUMERICAL_OPTIONS" in x.get("qaFlags", [])]
print(f"Total numerical flags to audit: {len(num_flags)}")

# Load all questions
q_map = {}
for item in num_flags:
    s = item["subject"]
    m = item["mockId"]
    qid = item["questionId"]
    if qid not in q_map:
        with open(f"mock/{s}/{m}.json", "r", encoding="utf-8") as fp:
            data = json.load(fp)
        for q in data:
            q_map[q.get("questionId")] = (s, m, q)

passed_count = 0
review_count = 0
failed_count = 0

detailed_audit_results = []

for item in num_flags:
    qid = item["questionId"]
    s, m, q = q_map[qid]
    options = q.get("options", [])
    texts = [o.get("text", "").strip() for o in options]
    corr_opt = q.get("correctOption") or q.get("correctOptionId")
    
    issues = []
    
    # 1. 4 options present
    if len(options) != 4:
        issues.append("OPTION_COUNT_NOT_4")
        
    # 2. String uniqueness
    if len(set(texts)) != 4:
        issues.append("DUPLICATE_OPTION_STRING")
        
    # Normalized uniqueness (ignoring spaces and dollar signs)
    norm_texts = [re.sub(r'[\s\$]', '', t) for t in texts]
    if len(set(norm_texts)) != 4:
        issues.append("DUPLICATE_NORMALIZED_STRING")
        
    # 3. Balanced braces and dollars
    for idx, t in enumerate(texts):
        if t.count("{") != t.count("}"):
            issues.append(f"UNBALANCED_BRACES_IN_OPT_{chr(65+idx)}")
        if t.count("$") % 2 != 0:
            issues.append(f"UNBALANCED_DOLLARS_IN_OPT_{chr(65+idx)}")
            
    # 4. Pure numeric equivalence (e.g. 0.5 vs 1/2 or identical floats)
    parsed_nums = []
    pure_num = True
    for t in texts:
        clean = re.sub(r'[\$\s]', '', t)
        # Try simple float
        try:
            val = float(clean)
            parsed_nums.append(val)
        except ValueError:
            # Try simple fraction a/b
            frac_match = re.match(r'^([-+]?\d+)/([-+]?\d+)$', clean)
            if frac_match:
                val = float(Fraction(int(frac_match.group(1)), int(frac_match.group(2))))
                parsed_nums.append(val)
            else:
                pure_num = False
                break
                
    if pure_num and len(parsed_nums) == 4:
        if len(set(parsed_nums)) != 4:
            issues.append("NUMERICALLY_EQUIVALENT_OPTIONS")
            
    # 5. Answer key integrity
    corr_objs = [o for o in options if o.get("isCorrect") is True]
    if len(corr_objs) != 1:
        issues.append("MULTIPLE_OR_NO_CORRECT_OPTIONS")
    elif corr_objs[0].get("id") != corr_opt:
        issues.append(f"DECLARED_CORRECT_{corr_opt}_MISMATCH_ISCORRECT_{corr_objs[0].get('id')}")
        
    # 6. Explanation agreement check
    sol = q.get("detailedSolution") or ""
    quick = (q.get("solution") or {}).get("quick", "")
    conc = (q.get("solution") or {}).get("concept", "")
    det = (q.get("solution") or {}).get("detailed", "")
    full_explanation = f"{sol} {quick} {conc} {det}"
    
    # Check for contradictory letters
    concl_matches = re.finditer(r'(?:Hence,?\s+(?:Option\s+)?|Therefore,?\s+(?:Option\s+)?|Thus,?\s+(?:Option\s+)?|Correct\s+option\s+is\s+|In\s+option\s+)([A-D])\b', full_explanation, re.IGNORECASE)
    for cm in concl_matches:
        mentioned = cm.group(1).upper()
        snip = full_explanation[max(0, cm.start()-15):min(len(full_explanation), cm.end()+35)].replace('\n', ' ')
        if any(w in snip.lower() for w in ["incorrect", "wrong", "false", "cannot be", "rejected"]):
            continue
        if "is correct" in snip.lower() or "in option" in snip.lower():
            if mentioned != corr_opt:
                issues.append(f"EXPLANATION_CONTRADICTION_MENTIONS_{mentioned}_KEY_IS_{corr_opt}")
                break

    status = "PASS"
    if issues:
        if any("DUPLICATE" in iss or "EQUIVALENT" in iss or "CONTRADICTION" in iss or "MISMATCH" in iss for iss in issues):
            status = "FAIL"
            failed_count += 1
        else:
            status = "REVIEW"
            review_count += 1
    else:
        status = "PASS"
        passed_count += 1
        
    detailed_audit_results.append({
        "questionId": qid,
        "subject": s,
        "mockId": m,
        "status": status,
        "issues": issues,
        "options": texts,
        "correctOption": corr_opt
    })

print("\n--- AUDIT RESULTS FOR 684 NUMERICAL FLAGS ---")
print(f"COMPUTATIONALLY PASSED: {passed_count}")
print(f"COMPUTATIONALLY REVIEW: {review_count}")
print(f"COMPUTATIONALLY FAILED: {failed_count}")

if review_count > 0 or failed_count > 0:
    print("\nSample issues found:")
    for res in detailed_audit_results:
        if res["status"] != "PASS":
            print(f"[{res['questionId']}] {res['status']}: {res['issues']}")

with open("qa-numerical-audit-results.json", "w", encoding="utf-8") as out:
    json.dump(detailed_audit_results, out, indent=2)
print("Wrote results to qa-numerical-audit-results.json")
