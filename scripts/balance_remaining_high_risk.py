import json
import os
import re

# High risk balancing definitions
# Mapping questionId -> cleaned correct option text
REPAIRS = {
    "CHEM-M09-Q34": "Invertase and Zymase",
    "CHEM-M15-Q12": "It remains unchanged",
    "CHEM-M18-Q21": "The lead-EDTA chelate is thermodynamically more stable than the calcium chelate",
    "BIO-M02-Q21": "Karl Ernst von Baer",
    "ECO-M16-Q42": "The Fallacy of Composition",
    "ECO-M18-Q13": "$e_s = 1$ (Unitary elastic)",
    "BST-M02-Q49": "Unity of Command",
    "BST-M10-Q32": "T+1 Rolling Settlement",
    "BST-M12-Q39": "Between ₹1 Crore and ₹10 Crores",
    "BST-M14-Q50": "NSDL and CDSL",
    "HIST-M02-Q17": "Ancient Persian society",
    "HIST-M02-Q36": "Ahmedabad textile mill strike of 1918",
    "HIST-M03-Q16": "Antyaja",
    "HIST-M03-Q39": "Indo-Saracenic style",
    "HIST-M04-Q15": "Hebrew and Syriac",
    "HIST-M04-Q39": "Shimla",
    "HIST-M07-Q17": "Tarababad",
    "HIST-M10-Q16": "Prince Dara Shukoh and Danishmand Khan",
    "HIST-M12-Q16": "Montesquieu and Karl Marx",
    "HIST-M12-Q39": "Hindustani",
    "HIST-M13-Q45": "The ancient rule of 'damdupat'",
    "HIST-M16-Q36": "Vallabhbhai Patel",
    "HIST-M19-Q13": "Toranas",
    "HIST-M20-Q11": "Gajalakshmi or Maya",
    "POL-M10-Q22": "Punjab, Haryana, and Himachal Pradesh",
    "GEO-M04-Q36": "Fort Gloster in 1818; Mumbai in 1854",
    "GEO-M05-Q30": "Tamil Nadu",
    "GEO-M05-Q31": "Ganga and Yamuna",
    "GEO-M06-Q33": "Digboi in Assam",
    "GEO-M08-Q33": "Phalodi / Jodhpur district of Rajasthan",
    "GEO-M09-Q27": "Assam",
    "GEO-M09-Q39": "Karnataka coast, exporting iron ore concentrates from Kudremukh",
    "GEO-M12-Q40": "Petroleum, crude, and petroleum products",
    "GEO-M13-Q26": "Maharashtra",
    "GEO-M13-Q40": "United States of America and China",
    "GEO-M16-Q39": "Sulfur dioxide, Nitrogen oxides, Carbon monoxide, and Particulate Matter",
    "GEO-M17-Q35": "Magnetite has up to 70% iron content; Hematite has 60-70% iron content",
    "GEO-M18-Q35": "Kadapa (YSR) district of Andhra Pradesh",
    "GEO-M19-Q38": "Chennai, due to automobile assembly plants and component manufacturing",
    "PSY-M01-Q31": "Valence, Extremeness, Simplicity/Complexity, and Centrality",
    "PSY-M04-Q08": "Sattva, Rajas, and Tamas",
    "PSY-M06-Q06": "Extraversion, Neuroticism, and Psychoticism",
    "PSY-M06-Q43": "Rationalization",
    "PSY-M07-Q12": "Problem-focused coping and Emotion-focused coping",
    "PSY-M07-Q35": "Compliance, Identification, and Internalization",
    "PSY-M13-Q45": "Global Self-Rating / Self-Downing",
    "PSY-M15-Q28": "Consensus, Consistency, and Distinctiveness",
    "PSY-M16-Q06": "Extrapunitive, Intropunitive, and Impunitive"
}

with open("qa-flags.json") as f:
    flags = json.load(f)

# Find subject and mockId for each
repaired_count = 0
for item in flags:
    qid = item.get("questionId")
    if qid in REPAIRS:
        s = item["subject"]
        m = item["mockId"]
        fpath = f"mock/{s}/{m}.json"
        with open(fpath, "r", encoding="utf-8") as fp:
            questions = json.load(fp)
            
        modified = False
        for q in questions:
            if q.get("questionId") == qid:
                corr_opt = q.get("correctOption") or q.get("correctOptionId")
                new_text = REPAIRS[qid]
                
                # Update option text while preserving original text in solution if needed
                for o in q.get("options", []):
                    if o.get("id") == corr_opt:
                        old_text = o.get("text")
                        o["text"] = new_text
                        modified = True
                        
                        # Ensure detailedSolution preserves the educational explanation
                        if old_text not in q.get("detailedSolution", ""):
                            q["detailedSolution"] = f"{q.get('detailedSolution', '')} (Note: {old_text})"
                break
                
        if modified:
            with open(fpath, "w", encoding="utf-8") as fp:
                json.dump(questions, fp, indent=2, ensure_ascii=False)
            repaired_count += 1
            print(f"Repaired {qid} in {fpath}")

print(f"\nTotal high risk items repaired: {repaired_count} / {len(REPAIRS)}")
