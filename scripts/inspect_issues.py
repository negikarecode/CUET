import json
import glob

for subj, folder in [("maths", "mock/maths"), ("accs", "mock/accs")]:
    for fpath in glob.glob(folder + "/*.json"):
        with open(fpath, "r", encoding="utf-8") as f:
            data = json.load(f)
        for q in data:
            texts = [o.get("text", "").strip() for o in q.get("options", [])]
            qnum = q.get("questionNumber")
            if len(set(texts)) < len(texts):
                print(f"[DUPLICATE OPTION] {subj} {fpath} Q{qnum}: {texts}")
            corr = q.get("correctOption")
            for o in q.get("options", []):
                oid = o.get("id")
                is_c = o.get("isCorrect")
                if oid == corr and is_c is False:
                    print(f"[MISMATCH] {subj} {fpath} Q{qnum}: corr={corr} but opt {oid} has isCorrect=False")
                if oid != corr and is_c is True:
                    print(f"[MISMATCH] {subj} {fpath} Q{qnum}: opt {oid} has isCorrect=True but corr={corr}")
