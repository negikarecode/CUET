import os
import json
import re
import random
from scripts.duplicate_detection import get_structural_fingerprint, get_exact_fingerprint

def slugify(text):
    if not text:
        return "general-concept"
    s = text.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s if s else "general-concept"

def get_balanced_target_keys(seed, count=50):
    rng = random.Random(seed)
    keys = (['A'] * 13) + (['B'] * 13) + (['C'] * 12) + (['D'] * 12)
    rng.shuffle(keys)
    return keys[:count]

def rotate_and_format_options(correct_text, wrong_texts, target_opt):
    opt_ids = ['A', 'B', 'C', 'D']
    assert target_opt in opt_ids, f"Invalid target_opt: {target_opt}"
    
    # Ensure wrong_texts has at least 3 distinct options
    wrongs = []
    for w in wrong_texts:
        w_str = str(w).strip()
        if w_str and w_str != str(correct_text).strip() and w_str not in wrongs:
            wrongs.append(w_str)
            
    # Fallback if insufficient wrong options provided
    fallbacks = [
        "None of the above criteria are satisfied",
        "Data provided is insufficient to establish relation",
        "Remains unchanged under invariant conditions"
    ]
    fb_idx = 0
    while len(wrongs) < 3:
        cand = fallbacks[fb_idx % len(fallbacks)]
        if cand not in wrongs and cand != str(correct_text).strip():
            wrongs.append(cand)
        fb_idx += 1
        
    wrongs = wrongs[:3]
    
    target_idx = opt_ids.index(target_opt)
    options = []
    w_idx = 0
    for i, oid in enumerate(opt_ids):
        if i == target_idx:
            options.append({
                'id': oid,
                'text': str(correct_text).strip(),
                'isCorrect': True
            })
        else:
            options.append({
                'id': oid,
                'text': wrongs[w_idx],
                'isCorrect': False
            })
            w_idx += 1
            
    return options

def make_question(
    sub_id,
    folder,
    prefix,
    mock_num,
    q_num,
    chapter,
    topic,
    stem,
    correct_text,
    wrong_texts,
    target_opt,
    detailed_solution,
    question_type="conceptual",
    difficulty=2,
    estimated_time=60
):
    options = rotate_and_format_options(correct_text, wrong_texts, target_opt)
    qid = f"{prefix}-M{mock_num:02d}-Q{q_num:02d}"
    concept_id = f"{slugify(sub_id)}-{slugify(chapter)}-{slugify(topic)}"
    
    det_sol = detailed_solution.strip()
    if not det_sol.startswith("Detailed Solution:"):
        det_sol = f"Detailed Solution:\nAccording to NCERT Class 12 {sub_id.title()} ({chapter} - {topic}):\n{det_sol}\n\nHence, Option ({target_opt}) is the correct answer."
    elif f"Option ({target_opt}) is the correct answer" not in det_sol:
        det_sol += f"\n\nHence, Option ({target_opt}) is the correct answer."
        
    complete_sol = {
        'quick': f"Option ({target_opt}) is correct.",
        'concept': f"{chapter}: {topic}",
        'detailed': det_sol
    }
    
    return {
        'questionNumber': q_num,
        'chapter': chapter,
        'topic': topic,
        'questionText': stem.strip(),
        'hasDiagram': False,
        'diagramDescription': None,
        'options': options,
        'correctOption': target_opt,
        'detailedSolution': det_sol,
        'questionId': qid,
        'conceptId': concept_id,
        'questionType': question_type,
        'difficulty': difficulty,
        'difficultyLevel': difficulty,
        'estimatedTimeSeconds': estimated_time,
        'solution': complete_sol,
        'keyConcept': f"{chapter}: {topic}",
        'tags': ["CUET UG 2026", sub_id, chapter],
        'testNumber': mock_num,
        'subjectFolder': folder,
        'provenance': "ai_ncert_synthesis"
    }

def validate_and_save_mock(sub_id, folder, prefix, mock_num, questions):
    assert len(questions) == 50, f"Mock {mock_num} for {sub_id} has {len(questions)} questions, expected 50"
    
    keys_count = {'A': 0, 'B': 0, 'C': 0, 'D': 0}
    chapters = set()
    seen_ids = set()
    seen_struct_fps = {}
    
    for idx, q in enumerate(questions, 1):
        assert q['questionNumber'] == idx, f"Mismatch questionNumber at {idx}: {q['questionNumber']}"
        expected_qid = f"{prefix}-M{mock_num:02d}-Q{idx:02d}"
        assert q['questionId'] == expected_qid, f"Expected QID {expected_qid}, got {q['questionId']}"
        assert q['questionId'] not in seen_ids, f"Duplicate QID: {q['questionId']}"
        seen_ids.add(q['questionId'])
        
        # Enforce intra-mock duplicate prevention (Level A & Level B)
        fp = get_structural_fingerprint(q)
        assert fp not in seen_struct_fps, (
            f"Intra-mock duplicate detected in {sub_id} mock {mock_num}: "
            f"Q{idx} duplicates Q{seen_struct_fps[fp]}! Stem: {q.get('questionText')}"
        )
        seen_struct_fps[fp] = idx
        
        # Check options
        opts = q['options']
        assert len(opts) == 4, f"Options != 4 in {q['questionId']}"
        opt_texts = [o['text'] for o in opts]
        assert len(set(opt_texts)) == 4, f"Duplicate option text in {q['questionId']}: {opt_texts}"
        
        corr_opts = [o['id'] for o in opts if o['isCorrect']]
        assert len(corr_opts) == 1, f"Options with isCorrect != 1 in {q['questionId']}: {corr_opts}"
        assert corr_opts[0] == q['correctOption'], f"correctOption mismatch in {q['questionId']}: {corr_opts[0]} vs {q['correctOption']}"
        
        keys_count[q['correctOption']] += 1
        chapters.add(q['chapter'])
        
    # Check chapter coverage
    min_ch_required = 3 if sub_id == 'general-test' else (5 if sub_id in ['accountancy', 'environmental_studies', 'psychology', 'computer_science', 'fine_arts', 'english'] else 8)
    assert len(chapters) >= min_ch_required, f"Broad coverage violation: only {len(chapters)} chapters in mock {mock_num} of {sub_id} (required: {min_ch_required})"
    for k, cnt in keys_count.items():
        assert 9 <= cnt <= 16, f"Key bias violation for key {k}: {cnt} in mock {mock_num} of {sub_id}"
        
    out_dir = os.path.join('mock', folder)
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f"{mock_num}.json")
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)
        
    return out_path
