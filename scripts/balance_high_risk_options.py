import os
import json

repairs = [
    {
        "file": "mock/history/12.json",
        "qId": "HIST-M12-Q17",
        "corrId": "B",
        "updates": {
            "A": "Autonomous Commercial Cities",
            "B": "Camp Towns (court-dependent imperial centres)",
            "C": "Temple Towns (sacred pilgrimage centres)",
            "D": "Monastic Towns (educational monastic enclaves)"
        }
    },
    {
        "file": "mock/history/20.json",
        "qId": "HIST-M20-Q13",
        "corrId": "A",
        "updates": {
            "A": "Hinayana (Theravadins: Path of the Elders)",
            "B": "Vajrayana (Vehicle of the Thunderbolt)",
            "C": "Tantrayana (Vehicle of Magic and Spells)",
            "D": "Navayana (Modern Reconstructed Vehicle)"
        }
    },
    {
        "file": "mock/pol science/13.json",
        "qId": "POL-M13-Q09",
        "corrId": "C",
        "updates": {
            "A": "Buddhist Tamils and Christian Tamils",
            "B": "Urban Coastal Tamils and Desert Tamils",
            "C": "Sri Lankan Tamils and Indian Tamils",
            "D": "Sinhala Tamils and Burgher Tamils"
        }
    },
    {
        "file": "mock/geo/9.json",
        "qId": "GEO-M09-Q29",
        "corrId": "C",
        "updates": {
            "A": "Assam, accounting for major national tea cultivation",
            "B": "Kerala, accounting for major national rubber cultivation",
            "C": "Karnataka, accounting for over 70% of national coffee production",
            "D": "Maharashtra, accounting for major national cotton cultivation"
        }
    },
    {
        "file": "mock/geo/10.json",
        "qId": "GEO-M10-Q39",
        "corrId": "B",
        "updates": {
            "A": "Kerala coast, handling regional timber, spices, and coir",
            "B": "Tamil Nadu coast, handling coal, salt, and trade with Sri Lanka",
            "C": "Goa coast, handling iron ore and regional mining exports",
            "D": "Gujarat coast, handling petroleum, petrochemicals, and crude"
        }
    },
    {
        "file": "mock/geo/11.json",
        "qId": "GEO-M11-Q32",
        "corrId": "B",
        "updates": {
            "A": "Rajasthan, harvesting seasonal runoff in arid desert basins",
            "B": "Meghalaya, tapping spring streams for betel leaf crops",
            "C": "Gujarat, utilizing coastal brackish waters in saline tracts",
            "D": "Maharashtra, storing monsoon rainfall in rocky black soil pits"
        }
    },
    {
        "file": "mock/geo/11.json",
        "qId": "GEO-M11-Q40",
        "corrId": "A",
        "updates": {
            "A": "Odisha coast, primarily designed to export iron ore",
            "B": "Kolkata riverine bank, primarily handling inland jute cargo",
            "C": "Goa coastline, primarily handling offshore naval defense",
            "D": "Gujarat coastline, primarily processing coastal sea salt"
        }
    },
    {
        "file": "mock/geo/18.json",
        "qId": "GEO-M18-Q03",
        "corrId": "D",
        "updates": {
            "A": "Fertile alluvial delta plains and river valleys",
            "B": "Densely populated coastal agricultural lowlands",
            "C": "Intensively cultivated volcanic island plateaus",
            "D": "Hyper-arid hot deserts and frozen polar ice caps"
        }
    },
    {
        "file": "mock/psychology/1.json",
        "qId": "PSY-M01-Q29",
        "corrId": "D",
        "updates": {
            "A": "Aptitude, Behaviour, and Conditioning components",
            "B": "Alarm, Barrier, and Conflict components",
            "C": "Anxiety, Bipolarity, and Catatonia components",
            "D": "Affective, Behavioural, and Cognitive components"
        }
    },
    {
        "file": "mock/psychology/3.json",
        "qId": "PSY-M03-Q26",
        "corrId": "A",
        "updates": {
            "A": "Antecedents, Behaviour, and Consequences",
            "B": "Aptitude, Beliefs, and Creativity",
            "C": "Anxiety, Bipolarity, and Conversion",
            "D": "Affect, Body build, and Consciousness"
        }
    }
]

for r in repairs:
    path = r["file"]
    with open(path, "r", encoding="utf-8") as fp:
        data = json.load(fp)
    
    for q in data:
        if q.get("questionId") == r["qId"]:
            for o in q.get("options", []):
                opt_id = o.get("id")
                if opt_id in r["updates"]:
                    o["text"] = r["updates"][opt_id]
            print(f"Balanced options for {r['qId']} in {path}")
            break
    
    with open(path, "w", encoding="utf-8") as fp:
        json.dump(data, fp, indent=2)

print("All 10 high-risk length bias questions successfully balanced!")
