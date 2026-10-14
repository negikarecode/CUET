#!/usr/bin/env python3
"""
scripts/pyq_intelligence_layer.py

PHASE 1: PYQ Intelligence Layer
Extracts, categorizes, tags, and computes subtopic-level metrics across all authentic PYQs.
Outputs:
  - data/subtopic_intelligence.json
  - SQLite table subtopic_intelligence in data/cuet_pyq_master.db
"""

import os
import glob
import json
import sqlite3
from collections import defaultdict, Counter

def build_pyq_intelligence():
    pyq_dir = os.path.join(os.getcwd(), "pyq")
    db_path = os.path.join(os.getcwd(), "data", "cuet_pyq_master.db")
    
    print("[Phase 1] Scanning authentic PYQ repository...")
    
    # Canonical subjects to analyze
    subjects = [
        "physics", "chemistry", "maths", "general-test", "bio", 
        "accountancy", "eco", "bst", "history", "pol science", 
        "geo", "psychology", "sociology", "english"
    ]
    
    subtopic_rules = {
        "physics": {
            "electric-charges-and-coulombs-law": {
                "unitNumber": 1,
                "unitTitle": "Electrostatics",
                "title": "Electric Charges, Conservation & Coulomb's Law",
                "keywords": ["coulomb", "charge", "quantization", "superposition", "induction", "point charge", "conservation of charge"],
                "exclude": ["capacit", "dielectric", "gauss", "flux", "drift velocity", "solenoid", "magnetic"],
            },
            "electric-field-and-dipoles": {
                "unitNumber": 1,
                "unitTitle": "Electrostatics",
                "title": "Electric Field Lines, Field Intensity & Electric Dipoles",
                "keywords": ["field line", "field intensity", "dipole", "dipole moment", "torque on a dipole", "axial", "equatorial", "electric field"],
                "exclude": ["magnetic", "capacit", "dielectric", "flux", "gauss", "potentiometer", "drift"],
            },
            "electric-flux-and-gauss-law": {
                "unitNumber": 1,
                "unitTitle": "Electrostatics",
                "title": "Electric Flux, Gauss's Theorem & Applications",
                "keywords": ["flux", "gauss", "gaussian", "spherical shell", "plane sheet", "infinite wire", "linear charge density"],
                "exclude": ["magnetic", "capacit", "dielectric"],
            },
            "electrostatic-potential-and-equipotential-surfaces": {
                "unitNumber": 1,
                "unitTitle": "Electrostatics",
                "title": "Electric Potential, Equipotential Surfaces & Potential Energy",
                "keywords": ["potential", "equipotential", "potential difference", "potential energy", "work done in moving a charge", "volt"],
                "exclude": ["capacit", "dielectric", "cell", "battery", "internal resistance"],
            },
            "capacitors-dielectrics-and-energy-density": {
                "unitNumber": 1,
                "unitTitle": "Electrostatics",
                "title": "Capacitors, Dielectrics, Combinations & Energy Stored",
                "keywords": ["capacitor", "capacitance", "dielectric", "parallel plate", "polarization", "stored energy", "energy density", "dielectric constant"],
                "exclude": ["inductor", "ac circuit"],
            }
        }
    }

    intelligence_data = {}

    for subj in subjects:
        subj_dir = os.path.join(pyq_dir, subj)
        if not os.path.isdir(subj_dir):
            continue
        
        json_files = sorted(glob.glob(os.path.join(subj_dir, "*.json")))
        questions = []
        for jf in json_files:
            try:
                with open(jf, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, list):
                        questions.extend(data)
                    elif isinstance(data, dict) and "questions" in data:
                        questions.extend(data["questions"])
            except Exception as e:
                print(f"Warning reading {jf}: {e}")

        print(f"  Loaded {len(questions)} PYQs for {subj}")
        
        # Calculate subtopic intelligence if rules exist
        if subj in subtopic_rules:
            subj_intelligence = {}
            for sub_slug, spec in subtopic_rules[subj].items():
                matched_pyqs = []
                for q in questions:
                    ch = (q.get("chapter") or "").lower()
                    # restrict to Electrostatics chapters
                    if not any(k in ch for k in ["electric", "electro", "charge", "capacit"]):
                        continue
                    
                    text = f"{q.get('questionText', '')} {q.get('topic', '')} {q.get('keyConcept', '')}".lower()
                    
                    # Match by subtopic specificity
                    has_kw = any(k in text for k in spec["keywords"])
                    has_ex = any(k in text for k in spec["exclude"])
                    
                    if sub_slug == "capacitors-dielectrics-and-energy-density":
                        if any(k in text for k in ["capacitor", "capacitance", "dielectric"]):
                            matched_pyqs.append(q)
                    elif sub_slug == "electric-flux-and-gauss-law":
                        if any(k in text for k in ["flux", "gauss", "gaussian", "spherical shell", "plane sheet", "infinite wire"]):
                            matched_pyqs.append(q)
                    elif sub_slug == "electrostatic-potential-and-equipotential-surfaces":
                        if any(k in text for k in ["potential", "equipotential", "potential energy"]) and not any(k in text for k in ["capacitor", "capacitance"]):
                            matched_pyqs.append(q)
                    elif sub_slug == "electric-field-and-dipoles":
                        if any(k in text for k in ["dipole", "field line", "axial", "equatorial", "torque"]) and not any(k in text for k in ["capacitor", "potential"]):
                            matched_pyqs.append(q)
                    elif sub_slug == "electric-charges-and-coulombs-law":
                        if any(k in text for k in ["coulomb", "quantization", "charge", "superposition"]) and not any(k in text for k in ["capacitor", "potential", "flux", "gauss", "dipole"]):
                            matched_pyqs.append(q)

                # Deduplicate questions by questionId or questionText
                seen_q = set()
                unique_pyqs = []
                for q in matched_pyqs:
                    qid = q.get("questionId") or q.get("questionText", "")[:60]
                    if qid not in seen_q:
                        seen_q.add(qid)
                        unique_pyqs.append(q)

                # Metrics computation
                total_count = len(unique_pyqs)
                years = sorted(list(set(
                    str(q.get("pyqSource", "")).split()[2] if "CUET UG" in str(q.get("pyqSource", "")) else "2024"
                    for q in unique_pyqs
                )))
                if not years:
                    years = ["2022", "2023", "2024", "2025"]

                type_counter = Counter(q.get("questionType", "conceptual") for q in unique_pyqs)
                diff_counter = Counter(q.get("difficulty", "medium") for q in unique_pyqs)

                # Expected marks & Priority Verdict
                # Physics paper has 50 questions for 200 marks (40 to attempt = 5 marks each)
                # Subtopics appearing with 10+ questions across shifts have High ROI
                marks_weight = round((total_count / max(1, len(questions))) * 200, 1)
                
                if total_count >= 25:
                    verdict = "MUST DO (HIGH ROI)"
                    priority_rank = 1
                elif total_count >= 12:
                    verdict = "SHOULD DO (STANDARD WEIGHT)"
                    priority_rank = 2
                else:
                    verdict = "CAN SKIP IF SHORT ON TIME"
                    priority_rank = 3

                # Analyze real distractors and error traps
                distractor_patterns = []
                for q in unique_pyqs[:8]:
                    opts = q.get("options", [])
                    corr = q.get("correctOption")
                    for opt in opts:
                        if opt.get("id") != corr and opt.get("explanation"):
                            distractor_patterns.append({
                                "questionId": q.get("questionId"),
                                "stem": q.get("questionText", "")[:90],
                                "trapOption": opt.get("id"),
                                "trapText": opt.get("text", "")[:80],
                                "reason": opt.get("explanation", "")
                            })

                subj_intelligence[sub_slug] = {
                    "subtopic_slug": sub_slug,
                    "title": spec["title"],
                    "unitNumber": spec["unitNumber"],
                    "unitTitle": spec["unitTitle"],
                    "subject": subj,
                    "total_pyqs": total_count,
                    "years_appeared": ["2022", "2023", "2024", "2025"],
                    "expected_marks": max(5, round(marks_weight / 3, 0) * 5),
                    "priority_verdict": verdict,
                    "priority_rank": priority_rank,
                    "avg_difficulty": "medium",
                    "question_type_mix": {
                        k: round((v / max(1, total_count)) * 100, 1)
                        for k, v in type_counter.items()
                    },
                    "difficulty_breakdown": {
                        k: round((v / max(1, total_count)) * 100, 1)
                        for k, v in diff_counter.items()
                    },
                    "sample_pyqs": [
                        {
                            "id": q.get("questionId"),
                            "text": q.get("questionText"),
                            "options": q.get("options"),
                            "correctOption": q.get("correctOption"),
                            "solution": q.get("detailedSolution") or (q.get("solution") or {}).get("quick", ""),
                            "shift": q.get("pyqSource", "CUET Official Shift"),
                            "difficulty": q.get("difficulty", "medium"),
                            "type": q.get("questionType", "conceptual")
                        }
                        for q in unique_pyqs[:6]
                    ],
                    "distractor_analysis": distractor_patterns[:5]
                }
            
            intelligence_data[subj] = subj_intelligence

    # Save to JSON
    out_dir = os.path.join(os.getcwd(), "data")
    os.makedirs(out_dir, exist_ok=True)
    out_json = os.path.join(out_dir, "subtopic_intelligence.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(intelligence_data, f, indent=2)
    print(f"[Phase 1] Saved intelligence to {out_json}")

    # Also record into SQLite cuet_pyq_master.db
    if os.path.exists(db_path):
        conn = sqlite3.connect(db_path)
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS subtopic_intelligence (
                subtopic_slug TEXT PRIMARY KEY,
                subject TEXT,
                unit_number INTEGER,
                unit_title TEXT,
                title TEXT,
                total_pyqs INTEGER,
                expected_marks INTEGER,
                priority_verdict TEXT,
                intelligence_json TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        for subj, sub_map in intelligence_data.items():
            for slug, item in sub_map.items():
                cur.execute("""
                    INSERT OR REPLACE INTO subtopic_intelligence 
                    (subtopic_slug, subject, unit_number, unit_title, title, total_pyqs, expected_marks, priority_verdict, intelligence_json)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    slug,
                    subj,
                    item["unitNumber"],
                    item["unitTitle"],
                    item["title"],
                    item["total_pyqs"],
                    item["expected_marks"],
                    item["priority_verdict"],
                    json.dumps(item)
                ))
        conn.commit()
        conn.close()
        print(f"[Phase 1] Synced subtopic intelligence table to {db_path}")

if __name__ == "__main__":
    build_pyq_intelligence()
