import os, json, re

seen_texts = set()
total_qs = 0

for m in range(1, 21):
    path = f'mock/mass_media/{m}.json'
    assert os.path.exists(path), f'Missing {path}'
    with open(path, 'r', encoding='utf-8') as f:
        questions = json.load(f)
    
    assert len(questions) == 50, f'Mock {m} has {len(questions)} Qs instead of 50'
    key_counts = {'A': 0, 'B': 0, 'C': 0, 'D': 0}
    
    for q in questions:
        total_qs += 1
        qnum = q["questionNumber"]
        qid = q["id"]
        # ID check
        assert qid == f'mmc-mock{m}-q{qnum}', f'Bad ID: {qid}'
        assert q['questionId'] == f'mmc-mock{m}-q{qnum}', f'Bad questionId: {qid}'
        
        # QA Metadata
        cid = q['conceptId']
        assert cid.startswith('mmc.'), f'Bad conceptId: {cid}'
        qtype = q['questionType']
        assert qtype in ['conceptual', 'match-the-following', 'chronological-sequence', 'multi-statement', 'assertion-reasoning', 'case-based'], f'Invalid type: {qtype}'
        diff = q['difficultyLevel']
        assert diff in [1, 2, 3, 4], f'Invalid difficulty: {diff}'
        assert q['confidenceStatus'] == 'approved', f'Bad confidenceStatus: {qid}'
        assert q['confidenceScore'] == 98, f'Bad confidenceScore: {qid}'
        assert q['validationFlags'] == [], f'Bad validationFlags: {qid}'
        
        # Options check
        assert len(q['options']) == 4, f'Mock {m} Q{qnum} does not have 4 options'
        assert [o['id'] for o in q['options']] == ['A', 'B', 'C', 'D'], f'Options IDs not A, B, C, D in Mock {m} Q{qnum}'
        opt_texts = [o['text'] for o in q['options']]
        assert len(set(opt_texts)) == 4, f'Duplicate options in {qid}: {opt_texts}'
        
        # Correct Option
        corr = q['correctOption']
        assert corr in ['A', 'B', 'C', 'D'], f'Bad correctOption: {corr}'
        key_counts[corr] += 1
        
        # Option isCorrect flag consistency
        for opt in q['options']:
            if opt['id'] == corr:
                assert opt['isCorrect'] is True, f'isCorrect mismatch for {corr} in {qid}'
            else:
                assert opt['isCorrect'] is False, f'isCorrect should be False for {opt["id"]} in {qid}'
        
        # Solution ending check
        expected_ending = f'Hence, Option {corr} is correct.'
        sol = q['detailedSolution'].strip()
        assert sol.endswith(expected_ending), f'Solution does not end properly in {qid}: {sol[-50:]}'
        assert sol.count('Hence, Option') == 1, f'Multiple Hence lines in {qid}'
        
        # Uniqueness check on normalized stem
        stem = q.get('questionText', q.get('question', ''))
        assert stem, f'Empty stem in Mock {m} Q{qnum}'
        norm = re.sub(r'\s+', ' ', stem).strip().lower()
        assert norm not in seen_texts, f'Duplicate stem found in Mock {m} Q{qnum}: {norm[:60]}'
        seen_texts.add(norm)
        
    # Check key balance
    for k, v in key_counts.items():
        assert 10 <= v <= 15, f'Mock {m} key {k} out of balance: {v}'

print('ALL AUDITS PASSED PERFECTLY!')
print('Total Mock Files: 20')
print(f'Total Questions Verified: {total_qs}')
print(f'Total Unique Questions: {len(seen_texts)}')
