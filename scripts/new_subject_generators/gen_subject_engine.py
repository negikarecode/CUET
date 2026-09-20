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

def assemble_subject_mocks(subject_key, subject_prefix, units_pool, passages_pool, out_dir):
    """
    units_pool: list of (unit_questions_list, q_per_mock)
    passages_pool: list of 40 passages, each having (passage_header, [5 question_specs])
    """
    total_q_per_mock = sum(q_per_mock for _, q_per_mock in units_pool) + 10
    assert total_q_per_mock == 50, f"Expected 50 Qs per mock, got {total_q_per_mock}"
    
    # Verify pool sizes
    for idx, (data, q_per_mock) in enumerate(units_pool):
        expected = q_per_mock * 20
        assert len(data) >= expected, f"Unit {idx+1} needs {expected} questions, but only has {len(data)}"
        
    assert len(passages_pool) >= 40, f"Expected at least 40 passages, got {len(passages_pool)}"
    
    os.makedirs(out_dir, exist_ok=True)
    global_seen = set()
    
    print(f"\n==========================================")
    print(f"Assembling 20 Mocks for {subject_key.upper()} ({subject_prefix})")
    print(f"==========================================")
    
    for m in range(1, 21):
        target_keys = get_balanced_target_keys(seed=300 + m, count=50)
        mock_raw = []
        
        # 1. Slice core unit questions
        for data, q_per_mock in units_pool:
            start_i = (m - 1) * q_per_mock
            end_i = m * q_per_mock
            mock_raw.extend(data[start_i:end_i])
            
        # 2. Slice 2 passages (5 Qs each = 10 Qs)
        p_idx1 = (m - 1) * 2
        p_idx2 = (m - 1) * 2 + 1
        
        for p_idx in [p_idx1, p_idx2]:
            p_header, p_qs = passages_pool[p_idx]
            assert len(p_qs) == 5, f"Passage {p_idx} must have 5 questions"
            for q_spec in p_qs:
                ch, top, prompt, corr_t, wrongs, sol, mist = q_spec
                mock_raw.append(("case", ch, top, p_header, prompt, corr_t, wrongs, sol, mist))
                
        assert len(mock_raw) == 50, f"Mock {m} has {len(mock_raw)} questions instead of 50"
        
        # 3. Instantiate questions with balanced target keys
        final_questions = []
        for q_num, raw in enumerate(mock_raw, start=1):
            target_opt = target_keys[q_num - 1]
            q_type = raw[0]
            
            if q_type == "mcq":
                _, ch, top, stem, corr_t, wrongs, sol, mist = raw
                q = make_mcq_question(subject_prefix, m, q_num, ch, top, stem, corr_t, wrongs, target_opt, sol, mist)
                q["questionType"] = "conceptual"
                q["difficulty"] = 2
            elif q_type == "stmt":
                _, ch, top, st1, st2, corr_rel, sol, mist = raw
                q = make_statement_question(subject_prefix, m, q_num, ch, top, st1, st2, corr_rel, target_opt, sol, mist)
                q["questionType"] = "multi-statement"
                q["difficulty"] = 3
            elif q_type == "ar":
                _, ch, top, ass, rea, corr_rel, sol, mist = raw
                q = make_assertion_question(subject_prefix, m, q_num, ch, top, ass, rea, corr_rel, target_opt, sol, mist)
                q["questionType"] = "assertion-reasoning"
                q["difficulty"] = 3
            elif q_type == "match":
                _, ch, top, stem, l1, l2, corr_pair, sol, mist = raw
                q = make_match_question(subject_prefix, m, q_num, ch, top, stem, l1, l2, corr_pair, target_opt, sol, mist)
                q["questionType"] = "match-the-following"
                q["difficulty"] = 3
            elif q_type == "seq":
                _, ch, top, stem, items, corr_seq, sol, mist = raw
                q = make_sequence_question(subject_prefix, m, q_num, ch, top, stem, items, corr_seq, target_opt, sol, mist)
                q["questionType"] = "chronological-sequence"
                q["difficulty"] = 3
            elif q_type == "case":
                _, ch, top, pass_hdr, prompt, corr_t, wrongs, sol, mist = raw
                q = make_case_question(subject_prefix, m, q_num, ch, top, pass_hdr, prompt, corr_t, wrongs, target_opt, sol, mist)
                q["questionType"] = "case-based"
                q["difficulty"] = 4
            else:
                raise ValueError(f"Unknown question type: {q_type}")

            # Production QA metadata
            q["questionId"] = q["id"]
            safe_ch = "".join(c for c in ch.lower().replace(" ", "_") if c.isalnum() or c == "_")[:20]
            q["conceptId"] = f"{subject_prefix}.{safe_ch}"
            q["difficultyLevel"] = q["difficulty"]
            time_map = {1: 40, 2: 50, 3: 65, 4: 80}
            q["estimatedTimeSeconds"] = time_map.get(q["difficulty"], 60)
            q["confidenceStatus"] = "approved"
            q["confidenceScore"] = 98
            q["validationFlags"] = []
            
            final_questions.append(q)
            
        # Verify and save
        verify_and_save_mock(final_questions, out_dir, m, global_seen, subject_prefix)

    print(f"\n[SUCCESS] All 20 Mocks for {subject_key.upper()} generated successfully!")
    print(f"Total Unique Questions: {len(global_seen)}")
    assert len(global_seen) == 1000, f"Expected 1000 unique questions, got {len(global_seen)}"
