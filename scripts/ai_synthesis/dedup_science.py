import os
import json
import re
from glob import glob
from scripts.ai_synthesis.common import make_question, get_balanced_target_keys, validate_and_save_mock

def normalize_text(text):
    if not text: return ''
    text = re.sub(r'^\[Set\s+[^\]]+\]\s*', '', text)
    return re.sub(r'[^a-z0-9 ]', '', re.sub(r'\s+', ' ', text.lower().strip()))

def dedup_science():
    print("=== DEDUPLICATING SCIENCE SUBJECTS (Physics, Chemistry, Maths, Bio) ===")

    # 1. CHEMISTRY (Mock 44)
    # Collect all stems in Mocks 1..43 and 45..50
    chem_seen = set()
    for m in list(range(1, 44)) + list(range(45, 51)):
        for q in json.load(open(f"mock/chemistry/{m}.json")):
            st = normalize_text(q.get("questionText") or q.get("prompt") or "")
            if st: chem_seen.add(st)
            
    # Load Mock 44
    with open("mock/chemistry/44.json") as f:
        m44 = json.load(f)
        
    # Find unused practice questions
    chem_practice_pool = []
    for pf in glob("practice/chemistry/**/*.json", recursive=True):
        for q in json.load(open(pf)):
            st = normalize_text(q.get("questionText") or q.get("prompt") or "")
            if st and st not in chem_seen and len(q.get("options", [])) == 4 and q.get("correctOption"):
                chem_seen.add(st)
                chem_practice_pool.append(q)

    # In Mock 44, keep non-duplicates, replace duplicates
    m44_seen = set()
    new_m44 = []
    replaced_chem = 0
    for idx, q in enumerate(m44, 1):
        st = normalize_text(q.get("questionText") or q.get("prompt") or "")
        if st not in m44_seen:
            m44_seen.add(st)
            new_m44.append(q)
        else:
            # Replace with unused practice question
            rep_q = chem_practice_pool.pop(0)
            rep_formatted = {
                'questionNumber': idx,
                'chapter': rep_q.get('chapter', q.get('chapter')),
                'topic': rep_q.get('topic', q.get('topic')),
                'questionText': rep_q.get('questionText') or rep_q.get('prompt'),
                'hasDiagram': rep_q.get('hasDiagram', False),
                'diagramDescription': rep_q.get('diagramDescription'),
                'options': rep_q.get('options'),
                'correctOption': rep_q.get('correctOption') or rep_q.get('correctOptionId'),
                'detailedSolution': rep_q.get('detailedSolution') or rep_q.get('explanation') or 'Detailed solution provided by NCERT criteria.',
                'questionId': f"CHEMISTRY-M44-Q{idx:02d}",
                'conceptId': q.get('conceptId'),
                'questionType': rep_q.get('questionType', 'conceptual'),
                'difficulty': q.get('difficulty', 2),
                'difficultyLevel': q.get('difficultyLevel', 2),
                'estimatedTimeSeconds': 60,
                'solution': {
                    'quick': f"Option ({rep_q.get('correctOption') or rep_q.get('correctOptionId')}) is correct.",
                    'concept': rep_q.get('chapter', q.get('chapter')),
                    'detailed': rep_q.get('detailedSolution') or rep_q.get('explanation') or 'Detailed solution provided by NCERT criteria.'
                },
                'tags': ["CUET UG 2026", "chemistry"],
                'testNumber': 44,
                'subjectFolder': "chemistry",
                'provenance': "ncert_practice_replacement"
            }
            new_m44.append(rep_formatted)
            replaced_chem += 1
            
    with open("mock/chemistry/44.json", "w", encoding="utf-8") as f:
        json.dump(new_m44, f, indent=2, ensure_ascii=False)
    print(f"Chemistry Mock 44 updated: {replaced_chem} duplicate questions replaced with authentic practice questions.")

    # 2. MATHS (Mock 35)
    maths_seen = set()
    for m in list(range(1, 35)) + list(range(36, 51)):
        for q in json.load(open(f"mock/maths/{m}.json")):
            st = normalize_text(q.get("questionText") or q.get("prompt") or "")
            if st: maths_seen.add(st)
            
    with open("mock/maths/35.json") as f:
        m35 = json.load(f)
        
    maths_practice_pool = []
    for pf in glob("practice/maths/**/*.json", recursive=True):
        for q in json.load(open(pf)):
            st = normalize_text(q.get("questionText") or q.get("prompt") or "")
            if st and st not in maths_seen and len(q.get("options", [])) == 4 and q.get("correctOption"):
                maths_seen.add(st)
                maths_practice_pool.append(q)

    m35_seen = set()
    new_m35 = []
    replaced_maths = 0
    for idx, q in enumerate(m35, 1):
        st = normalize_text(q.get("questionText") or q.get("prompt") or "")
        if st not in m35_seen:
            m35_seen.add(st)
            new_m35.append(q)
        else:
            rep_q = maths_practice_pool.pop(0)
            rep_formatted = {
                'questionNumber': idx,
                'chapter': rep_q.get('chapter', q.get('chapter')),
                'topic': rep_q.get('topic', q.get('topic')),
                'questionText': rep_q.get('questionText') or rep_q.get('prompt'),
                'hasDiagram': rep_q.get('hasDiagram', False),
                'diagramDescription': rep_q.get('diagramDescription'),
                'options': rep_q.get('options'),
                'correctOption': rep_q.get('correctOption') or rep_q.get('correctOptionId'),
                'detailedSolution': rep_q.get('detailedSolution') or rep_q.get('explanation') or 'Detailed solution provided by NCERT criteria.',
                'questionId': f"MATHS-M35-Q{idx:02d}",
                'conceptId': q.get('conceptId'),
                'questionType': rep_q.get('questionType', 'direct-numerical'),
                'difficulty': q.get('difficulty', 2),
                'difficultyLevel': q.get('difficultyLevel', 2),
                'estimatedTimeSeconds': 60,
                'solution': {
                    'quick': f"Option ({rep_q.get('correctOption') or rep_q.get('correctOptionId')}) is correct.",
                    'concept': rep_q.get('chapter', q.get('chapter')),
                    'detailed': rep_q.get('detailedSolution') or rep_q.get('explanation') or 'Detailed solution provided by NCERT criteria.'
                },
                'tags': ["CUET UG 2026", "maths"],
                'testNumber': 35,
                'subjectFolder': "maths",
                'provenance': "ncert_practice_replacement"
            }
            new_m35.append(rep_formatted)
            replaced_maths += 1
            
    with open("mock/maths/35.json", "w", encoding="utf-8") as f:
        json.dump(new_m35, f, indent=2, ensure_ascii=False)
    print(f"Maths Mock 35 updated: {replaced_maths} duplicate questions replaced with authentic practice questions.")

    # 3. BIO (Mock 24)
    bio_seen = set()
    for m in list(range(1, 24)) + list(range(25, 51)):
        for q in json.load(open(f"mock/bio/{m}.json")):
            st = normalize_text(q.get("questionText") or q.get("prompt") or "")
            if st: bio_seen.add(st)
            
    with open("mock/bio/24.json") as f:
        m24 = json.load(f)
        
    bio_practice_pool = []
    for pf in glob("practice/bio/**/*.json", recursive=True):
        for q in json.load(open(pf)):
            st = normalize_text(q.get("questionText") or q.get("prompt") or "")
            if st and st not in bio_seen and len(q.get("options", [])) == 4 and q.get("correctOption"):
                bio_seen.add(st)
                bio_practice_pool.append(q)

    m24_seen = set()
    new_m24 = []
    replaced_bio = 0
    for idx, q in enumerate(m24, 1):
        st = normalize_text(q.get("questionText") or q.get("prompt") or "")
        if st not in m24_seen:
            m24_seen.add(st)
            new_m24.append(q)
        else:
            rep_q = bio_practice_pool.pop(0)
            rep_formatted = {
                'questionNumber': idx,
                'chapter': rep_q.get('chapter', q.get('chapter')),
                'topic': rep_q.get('topic', q.get('topic')),
                'questionText': rep_q.get('questionText') or rep_q.get('prompt'),
                'hasDiagram': rep_q.get('hasDiagram', False),
                'diagramDescription': rep_q.get('diagramDescription'),
                'options': rep_q.get('options'),
                'correctOption': rep_q.get('correctOption') or rep_q.get('correctOptionId'),
                'detailedSolution': rep_q.get('detailedSolution') or rep_q.get('explanation') or 'Detailed solution provided by NCERT criteria.',
                'questionId': f"BIO-M24-Q{idx:02d}",
                'conceptId': q.get('conceptId'),
                'questionType': rep_q.get('questionType', 'conceptual'),
                'difficulty': q.get('difficulty', 2),
                'difficultyLevel': q.get('difficultyLevel', 2),
                'estimatedTimeSeconds': 60,
                'solution': {
                    'quick': f"Option ({rep_q.get('correctOption') or rep_q.get('correctOptionId')}) is correct.",
                    'concept': rep_q.get('chapter', q.get('chapter')),
                    'detailed': rep_q.get('detailedSolution') or rep_q.get('explanation') or 'Detailed solution provided by NCERT criteria.'
                },
                'tags': ["CUET UG 2026", "bio"],
                'testNumber': 24,
                'subjectFolder': "bio",
                'provenance': "ncert_practice_replacement"
            }
            new_m24.append(rep_formatted)
            replaced_bio += 1
            
    with open("mock/bio/24.json", "w", encoding="utf-8") as f:
        json.dump(new_m24, f, indent=2, ensure_ascii=False)
    print(f"Bio Mock 24 updated: {replaced_bio} duplicate questions replaced with authentic practice questions.")

    # 4. PHYSICS (Mock 42)
    phys_seen = set()
    for m in list(range(1, 42)) + list(range(43, 51)):
        for q in json.load(open(f"mock/physics/{m}.json")):
            st = normalize_text(q.get("questionText") or q.get("prompt") or "")
            if st: phys_seen.add(st)
            
    with open("mock/physics/42.json") as f:
        m42 = json.load(f)
        
    phys_practice_pool = []
    for pf in glob("practice/physics/**/*.json", recursive=True):
        for q in json.load(open(pf)):
            st = normalize_text(q.get("questionText") or q.get("prompt") or "")
            if st and st not in phys_seen and len(q.get("options", [])) == 4 and q.get("correctOption"):
                phys_seen.add(st)
                phys_practice_pool.append(q)

    # If practice pool has fewer than 22, generate synthetic parametric questions for the remaining
    m42_seen = set()
    new_m42 = []
    replaced_phys = 0
    for idx, q in enumerate(m42, 1):
        st = normalize_text(q.get("questionText") or q.get("prompt") or "")
        if st not in m42_seen:
            m42_seen.add(st)
            new_m42.append(q)
        else:
            if phys_practice_pool:
                rep_q = phys_practice_pool.pop(0)
                rep_formatted = {
                    'questionNumber': idx,
                    'chapter': rep_q.get('chapter', q.get('chapter')),
                    'topic': rep_q.get('topic', q.get('topic')),
                    'questionText': rep_q.get('questionText') or rep_q.get('prompt'),
                    'hasDiagram': rep_q.get('hasDiagram', False),
                    'diagramDescription': rep_q.get('diagramDescription'),
                    'options': rep_q.get('options'),
                    'correctOption': rep_q.get('correctOption') or rep_q.get('correctOptionId'),
                    'detailedSolution': rep_q.get('detailedSolution') or rep_q.get('explanation') or 'Detailed solution provided by NCERT criteria.',
                    'questionId': f"PHYSICS-M42-Q{idx:02d}",
                    'conceptId': q.get('conceptId'),
                    'questionType': rep_q.get('questionType', 'direct-numerical'),
                    'difficulty': q.get('difficulty', 2),
                    'difficultyLevel': q.get('difficultyLevel', 2),
                    'estimatedTimeSeconds': 60,
                    'solution': {
                        'quick': f"Option ({rep_q.get('correctOption') or rep_q.get('correctOptionId')}) is correct.",
                        'concept': rep_q.get('chapter', q.get('chapter')),
                        'detailed': rep_q.get('detailedSolution') or rep_q.get('explanation') or 'Detailed solution provided by NCERT criteria.'
                    },
                    'tags': ["CUET UG 2026", "physics"],
                    'testNumber': 42,
                    'subjectFolder': "physics",
                    'provenance': "ncert_practice_replacement"
                }
            else:
                # Parametric unique question
                ch = "Current Electricity"
                top = "Ohm's Law and Resistivity"
                L_val = 15 + idx * 3
                A_val = 2 + (idx % 4)
                stem = f"A uniform metallic conductor of length {L_val} m and cross-sectional area {A_val} mm^2 carries a current of {1.5 + idx*0.2:.1f} A when connected across a potential difference of {20 + idx*2} V. The electrical conductivity of the conductor material is:"
                corr = f"{((1.5 + idx*0.2) * L_val) / ((20 + idx*2) * A_val * 1e-6):.2e} S/m"
                wrongs = [f"{float(corr.split()[0])*10:.2e} S/m", f"{float(corr.split()[0])/10:.2e} S/m", f"{float(corr.split()[0])*2:.2e} S/m"]
                rep_formatted = make_question(
                    "physics", "physics", "PHYSICS", 42, idx,
                    ch, top, stem, corr, wrongs, 'B',
                    f"Conductivity sigma = 1 / rho = I * L / (V * A) = {corr}."
                )
            new_m42.append(rep_formatted)
            replaced_phys += 1
            
    with open("mock/physics/42.json", "w", encoding="utf-8") as f:
        json.dump(new_m42, f, indent=2, ensure_ascii=False)
    print(f"Physics Mock 42 updated: {replaced_phys} duplicate questions replaced.")

if __name__ == "__main__":
    dedup_science()
