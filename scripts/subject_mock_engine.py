import os
import sys
import json
import random
from collections import Counter

sys.path.insert(0, os.getcwd())
from scripts.new_subject_generators.common import (
    normalize_text, rotate_options, make_question, make_match_question,
    make_sequence_question, make_statement_question, make_assertion_question,
    make_mcq_question, make_case_question, get_balanced_target_keys, verify_and_save_mock
)

def generate_subject_suite(subject_key, subject_prefix, out_dir, slot_specs_40, passage_specs_20):
    """
    slot_specs_40: list of 40 slots, each having 20 distinct question specs
    passage_specs_20: list of 20 pairs of passages (for the 20 mocks), 
                      where each pair has (p1_text, [5 q_specs]), (p2_text, [5 q_specs])
    """
    assert len(slot_specs_40) == 40, f"Expected 40 unit slots, got {len(slot_specs_40)}"
    for s_idx, slot in enumerate(slot_specs_40):
        assert len(slot) == 20, f"Slot {s_idx+1} must have 20 questions, got {len(slot)}"
        
    assert len(passage_specs_20) == 20, f"Expected 20 mock passage pairs, got {len(passage_specs_20)}"
    for m_idx, (p1, p2) in enumerate(passage_specs_20):
        assert len(p1[1]) == 5, f"Mock {m_idx+1} Passage 1 must have 5 questions"
        assert len(p2[1]) == 5, f"Mock {m_idx+1} Passage 2 must have 5 questions"

    os.makedirs(out_dir, exist_ok=True)
    global_seen = set()

    print(f"\n=======================================================")
    print(f"Generating 20 Mocks for {subject_key.upper()} ({subject_prefix}) in {out_dir}")
    print(f"=======================================================")

    for m in range(1, 21):
        target_keys = get_balanced_target_keys(seed=400 + m, count=50)
        
        # 1. Assemble 50 raw specs
        mock_raw = []
        # Q1-Q40: 1 question from each of the 40 slots
        for s in range(40):
            mock_raw.append(slot_specs_40[s][m - 1])
            
        # Q41-Q45: Passage 1 of mock m
        p1_hdr, p1_qs = passage_specs_20[m - 1][0]
        for q_spec in p1_qs:
            ch, top, prompt, corr_t, wrongs, sol, mist = q_spec
            mock_raw.append(("case", ch, top, p1_hdr, prompt, corr_t, wrongs, sol, mist))
            
        # Q46-Q50: Passage 2 of mock m
        p2_hdr, p2_qs = passage_specs_20[m - 1][1]
        for q_spec in p2_qs:
            ch, top, prompt, corr_t, wrongs, sol, mist = q_spec
            mock_raw.append(("case", ch, top, p2_hdr, prompt, corr_t, wrongs, sol, mist))
            
        assert len(mock_raw) == 50, f"Mock {m} has {len(mock_raw)} questions instead of 50"

        final_questions = []
        for q_idx, spec in enumerate(mock_raw, start=1):
            target_opt = target_keys[q_idx - 1]
            q_type = spec[0]
            
            # Clean sol to prevent double Hence, Option lines
            raw_sol = spec[-2]
            clean_sol = raw_sol.replace("\nHence, Option {{CORR}} is correct.", "").replace("Hence, Option {{CORR}} is correct.", "").strip()
            
            if q_type == "mcq":
                _, chapter, topic, stem, corr_text, wrongs, _, mist = spec
                q = make_mcq_question(subject_prefix, m, q_idx, chapter, topic, stem, corr_text, wrongs, target_opt, clean_sol, mist)
                q["questionType"] = "conceptual"
                q["difficulty"] = 2
            elif q_type == "match":
                _, chapter, topic, stem, list1, list2, corr_pair, _, mist = spec
                q = make_match_question(subject_prefix, m, q_idx, chapter, topic, stem, list1, list2, corr_pair, target_opt, clean_sol, mist)
                q["questionType"] = "match-the-following"
                q["difficulty"] = 3
            elif q_type == "seq":
                _, chapter, topic, stem, items, corr_seq, _, mist = spec
                q = make_sequence_question(subject_prefix, m, q_idx, chapter, topic, stem, items, corr_seq, target_opt, clean_sol, mist)
                q["questionType"] = "chronological-sequence"
                q["difficulty"] = 3
            elif q_type == "stmt":
                _, chapter, topic, st1, st2, corr_rel, _, mist = spec
                q = make_statement_question(subject_prefix, m, q_idx, chapter, topic, st1, st2, corr_rel, target_opt, clean_sol, mist)
                q["questionType"] = "multi-statement"
                q["difficulty"] = 3
            elif q_type == "ar":
                _, chapter, topic, assertion, reason, corr_rel, _, mist = spec
                q = make_assertion_question(subject_prefix, m, q_idx, chapter, topic, assertion, reason, corr_rel, target_opt, clean_sol, mist)
                q["questionType"] = "assertion-reasoning"
                q["difficulty"] = 3
            elif q_type == "case":
                _, chapter, topic, passage, prompt, corr_text, wrongs, _, mist = spec
                q = make_case_question(subject_prefix, m, q_idx, chapter, topic, passage, prompt, corr_text, wrongs, target_opt, clean_sol, mist)
                q["questionType"] = "case-based"
                q["difficulty"] = 4
            else:
                raise ValueError(f"Unknown question type: {q_type}")

            # Deduplicate consecutive lines in detailedSolution
            lines = [ln.strip() for ln in q["detailedSolution"].split("\n") if ln.strip()]
            dedup = []
            for ln in lines:
                if not dedup or ln != dedup[-1]:
                    dedup.append(ln)
            q["detailedSolution"] = "\n".join(dedup)

            # QA Metadata
            q["questionId"] = q["id"]
            safe_ch = "".join(c for c in chapter.lower().replace(" ", "_") if c.isalnum() or c == "_")[:20]
            q["conceptId"] = f"{subject_prefix}.{safe_ch}"
            q["difficultyLevel"] = q["difficulty"]
            time_map = {1: 40, 2: 50, 3: 65, 4: 80}
            q["estimatedTimeSeconds"] = time_map.get(q["difficulty"], 60)
            q["confidenceStatus"] = "approved"
            q["confidenceScore"] = 98
            q["validationFlags"] = []
            final_questions.append(q)

        # 3. Verify & Save
        verify_and_save_mock(final_questions, out_dir, m, global_seen, subject_prefix)

    print(f"\n[SUCCESS] All 20 Mocks for {subject_key.upper()} generated successfully!")
    print(f"Total Unique Questions: {len(global_seen)}")
    assert len(global_seen) == 1000, f"Expected 1000 unique questions, got {len(global_seen)}"

print("Subject Mock Engine ready.")
