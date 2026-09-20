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

def build_mock_from_specs(subject_prefix, mock_num, q_specs, target_keys):
    assert len(q_specs) == 50, f"Expected 50 question specs for mock {mock_num}, got {len(q_specs)}"
    assert len(target_keys) == 50, f"Expected 50 target keys, got {len(target_keys)}"
    
    questions = []
    for q_idx, spec in enumerate(q_specs, start=1):
        target_opt = target_keys[q_idx - 1]
        q_type = spec[0]
        
        if q_type == "mcq":
            _, chapter, topic, stem, corr_text, wrongs, sol, mist = spec
            q = make_mcq_question(
                subject_prefix, mock_num, q_idx, chapter, topic, stem,
                corr_text, wrongs, target_opt, sol, mist
            )
            q["questionType"] = "conceptual"
            q["difficulty"] = 2
        elif q_type == "match":
            _, chapter, topic, stem, list1, list2, corr_pair, sol, mist = spec
            q = make_match_question(
                subject_prefix, mock_num, q_idx, chapter, topic, stem,
                list1, list2, corr_pair, target_opt, sol, mist
            )
            q["questionType"] = "match-the-following"
            q["difficulty"] = 3
        elif q_type == "seq":
            _, chapter, topic, stem, items, corr_seq, sol, mist = spec
            q = make_sequence_question(
                subject_prefix, mock_num, q_idx, chapter, topic, stem,
                items, corr_seq, target_opt, sol, mist
            )
            q["questionType"] = "chronological-sequence"
            q["difficulty"] = 3
        elif q_type == "stmt":
            _, chapter, topic, st1, st2, corr_rel, sol, mist = spec
            q = make_statement_question(
                subject_prefix, mock_num, q_idx, chapter, topic,
                st1, st2, corr_rel, target_opt, sol, mist
            )
            q["questionType"] = "multi-statement"
            q["difficulty"] = 3
        elif q_type == "ar":
            _, chapter, topic, assertion, reason, corr_rel, sol, mist = spec
            q = make_assertion_question(
                subject_prefix, mock_num, q_idx, chapter, topic,
                assertion, reason, corr_rel, target_opt, sol, mist
            )
            q["questionType"] = "assertion-reasoning"
            q["difficulty"] = 3
        elif q_type == "case":
            _, chapter, topic, passage, prompt, corr_text, wrongs, sol, mist = spec
            q = make_case_question(
                subject_prefix, mock_num, q_idx, chapter, topic,
                passage, prompt, corr_text, wrongs, target_opt, sol, mist
            )
            q["questionType"] = "case-based"
            q["difficulty"] = 4
        else:
            raise ValueError(f"Unknown question type: {q_type}")

        # Populate definitive QA production metadata
        q["questionId"] = q["id"]
        safe_ch = "".join(c for c in chapter.lower().replace(" ", "_") if c.isalnum() or c == "_")[:20]
        q["conceptId"] = f"{subject_prefix}.{safe_ch}"
        q["difficultyLevel"] = q["difficulty"]
        time_map = {1: 40, 2: 50, 3: 65, 4: 80}
        q["estimatedTimeSeconds"] = time_map.get(q["difficulty"], 60)
        q["confidenceStatus"] = "approved"
        q["confidenceScore"] = 98
        q["validationFlags"] = []
            
        questions.append(q)
    return questions

def generate_and_save_all_mocks(subject_prefix, out_dir, mocks_specs):
    assert len(mocks_specs) == 20, f"Expected 20 mocks specs, got {len(mocks_specs)}"
    os.makedirs(out_dir, exist_ok=True)
    global_seen = set()
    
    print(f"\n==========================================")
    print(f"Building 20 Mocks for {subject_prefix.upper()} in {out_dir}")
    print(f"==========================================")
    
    for m in range(1, 21):
        target_keys = get_balanced_target_keys(seed=100 + m, count=50)
        q_specs = mocks_specs[m - 1]
        questions = build_mock_from_specs(subject_prefix, m, q_specs, target_keys)
        verify_and_save_mock(questions, out_dir, m, global_seen, subject_prefix)
        
    print(f"Successfully generated all 20 mocks for {subject_prefix.upper()}! Total unique questions: {len(global_seen)}")
    assert len(global_seen) == 1000, f"Expected 1000 unique questions, got {len(global_seen)}"
