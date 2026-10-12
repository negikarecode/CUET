#!/usr/bin/env python3
"""
scripts/generate_pyq_chapter_manifest.py

Generates lib/data/pyq_chapters.json which maps each canonical subject to its
NCERT chapter-wise division, weightage, difficulty distribution, and authentic questions.
"""

import os
import json
import glob
from collections import defaultdict

SUBJECT_NAMES = {
    "physics": "Physics",
    "chemistry": "Chemistry",
    "maths": "Mathematics",
    "bio": "Biology",
    "accountancy": "Accountancy",
    "bst": "Business Studies",
    "eco": "Economics",
    "history": "History",
    "pol science": "Political Science",
    "geo": "Geography",
    "psychology": "Psychology",
    "sociology": "Sociology",
    "english": "English",
    "general-test": "General Aptitude Test"
}

SUBJECT_ALIASES = {
    "mathematics": "maths",
    "math": "maths",
    "biology": "bio",
    "accounts": "accountancy",
    "accs": "accountancy",
    "business-studies": "bst",
    "business_studies": "bst",
    "economics": "eco",
    "geography": "geo",
    "political-science": "pol science",
    "political_science": "pol science",
    "polscience": "pol science",
    "gat": "general-test",
    "general_aptitude_test": "general-test",
}

def main():
    pyq_dir = os.path.join(os.getcwd(), "pyq")
    canonical_subjects = list(SUBJECT_NAMES.keys())

    manifest = {}

    for sub in canonical_subjects:
        sub_path = os.path.join(pyq_dir, sub)
        if not os.path.exists(sub_path):
            continue

        files = sorted(f for f in os.listdir(sub_path) if f.endswith(".json") and not f.startswith("."))
        
        total_questions = 0
        chapter_dict = defaultdict(lambda: {
            "name": "",
            "questionCount": 0,
            "easy": 0,
            "medium": 0,
            "hard": 0,
            "topics": set(),
            "questions": []
        })

        for fname in files:
            fpath = os.path.join(sub_path, fname)
            paper_num = fname.replace(".json", "")
            with open(fpath, "r", encoding="utf-8") as fp:
                questions = json.load(fp)

            for q in questions:
                total_questions += 1
                ch = q.get("chapter") or "Core Domain Syllabus"
                top = q.get("topic") or ch
                diff = q.get("difficulty") or "medium"
                
                entry = chapter_dict[ch]
                entry["name"] = ch
                entry["questionCount"] += 1
                if diff in ["easy", "medium", "hard"]:
                    entry[diff] += 1
                else:
                    entry["medium"] += 1
                
                if top:
                    entry["topics"].add(top)
                
                # Keep top 8 sample questions per chapter for instant practice/review
                if len(entry["questions"]) < 8:
                    entry["questions"].append({
                        "id": q.get("id") or f"{sub}_{paper_num}_{q.get('questionNumber', 1)}",
                        "questionNumber": q.get("questionNumber", 1),
                        "paperNumber": paper_num,
                        "paperLabel": f"Paper {paper_num}",
                        "questionText": q.get("questionText", ""),
                        "options": q.get("options", []),
                        "correctOption": q.get("correctOption", "A"),
                        "difficulty": diff,
                        "difficultyLevel": q.get("difficultyLevel", 2),
                        "topic": top,
                        "detailedSolution": q.get("detailedSolution", "")
                    })

        chapters_list = []
        for ch_name, data in chapter_dict.items():
            pct = round((data["questionCount"] / max(1, total_questions)) * 100, 1)
            chapters_list.append({
                "chapterName": ch_name,
                "questionCount": data["questionCount"],
                "weightagePercent": pct,
                "difficultyCounts": {
                    "easy": data["easy"],
                    "medium": data["medium"],
                    "hard": data["hard"]
                },
                "topics": sorted(list(data["topics"]))[:15],
                "questions": data["questions"]
            })

        # Sort chapters descending by question count (highest weightage first)
        chapters_list.sort(key=lambda x: x["questionCount"], reverse=True)

        manifest[sub] = {
            "subjectSlug": sub,
            "subjectName": SUBJECT_NAMES[sub],
            "totalPapers": len(files),
            "totalQuestions": total_questions,
            "chaptersCount": len(chapters_list),
            "chapters": chapters_list
        }

    # Add aliases so looking up "mathematics", "business-studies", etc. works out-of-the-box
    for alias, canon in SUBJECT_ALIASES.items():
        if canon in manifest:
            manifest[alias] = manifest[canon]

    out_file = os.path.join(os.getcwd(), "lib/data/pyq_chapters.json")
    with open(out_file, "w", encoding="utf-8") as fp:
        json.dump(manifest, fp, indent=2, ensure_ascii=False)

    print(f"Successfully generated {out_file} with {len(manifest)} subjects/aliases.")
    for sub in canonical_subjects:
        info = manifest[sub]
        print(f"  - {info['subjectName']:22}: {info['totalPapers']} papers, {info['totalQuestions']} Qs, {info['chaptersCount']} chapters")

if __name__ == "__main__":
    main()
