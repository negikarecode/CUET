import os
import json

repairs = [
    {
        "file": "mock/eco/18.json",
        "qNum": 24,
        "optId": "B",
        "oldSubstring": "digital computer simulations",
        "newText": "A year experiencing severe economic hyperinflation or external war shocks",
        "newAnalysis": "Incorrect. A base year must be a normal economic year free from extreme economic disturbances, natural calamities, or severe hyperinflation."
    },
    {
        "file": "mock/pol science/9.json",
        "qNum": 12,
        "optId": "A",
        "oldSubstring": "mercenary contractors",
        "newText": "Drafting legally binding international covenants under direct UN General Assembly mandate",
        "newAnalysis": "Incorrect. Only sovereign states vote on and ratify legally binding treaties in the UN; HRW is an independent NGO."
    },
    {
        "file": "mock/pol science/9.json",
        "qNum": 12,
        "optId": "B",
        "oldSubstring": "counterfeit currencies",
        "newText": "Managing international peacekeeping operations and military deployments",
        "newAnalysis": "Incorrect. Peacekeeping operations are authorized exclusively by the UN Security Council."
    },
    {
        "file": "mock/pol science/9.json",
        "qNum": 12,
        "optId": "D",
        "oldSubstring": "drilling platforms",
        "newText": "Imposing mandatory economic sanctions on non-compliant member states",
        "newAnalysis": "Incorrect. Economic sanctions are geopolitical policy instruments deployed by sovereign nations and the UN."
    },
    {
        "file": "mock/pol science/12.json",
        "qNum": 15,
        "optId": "D",
        "oldSubstring": "auctioned to private",
        "newText": "Territorial sovereignty was permanently awarded based on geographical proximity to South American coastlines",
        "newAnalysis": "Incorrect. Article IV of the Antarctic Treaty freezes all territorial claims rather than recognizing proximity-based claims."
    },
    {
        "file": "mock/pol science/6.json",
        "qNum": 15,
        "optId": "B",
        "oldSubstring": "Penguins from inhabiting",
        "newText": "Atmospheric weather monitoring and scientific research experiments",
        "newAnalysis": "Incorrect. Scientific research and meteorological studies are actively encouraged under the treaty; only commercial mining is banned."
    },
    {
        "file": "mock/geo/9.json",
        "qNum": 32,
        "optId": "D",
        "oldSubstring": "bottled mineral water",
        "newText": "The Environment (Protection) Act (which was passed later in 1986)",
        "newAnalysis": "Incorrect. The 1974 Act specifically targeted water pollution (Water Act); the comprehensive Environment Protection Act was enacted in 1986."
    },
    {
        "file": "mock/geo/1.json",
        "qNum": 16,
        "optId": "A",
        "oldSubstring": "armed forces",
        "newText": "Retail trading is exclusively restricted to government ration depots",
        "newAnalysis": "Incorrect. Retail trading takes place across all private commercial outlets, supermarkets, street stalls, and consumer stores."
    },
    {
        "file": "mock/geo/1.json",
        "qNum": 23,
        "optId": "A",
        "oldSubstring": "Igloos, Tepees",
        "newText": "Linear, Rectangular, Circular, and Star-shaped geometrical patterns",
        "newAnalysis": "Incorrect. Linear, rectangular, and circular patterns describe spatial geometric layouts, whereas the four primary structural categories based on physical clustering are Clustered, Semi-clustered, Hamleted, and Dispersed."
    },
    {
        "file": "mock/geo/1.json",
        "qNum": 23,
        "optId": "B",
        "oldSubstring": "Skyscrapers, Penthouse",
        "newText": "Metropolitan, Megacity, Conurbation, and Suburban urban classes",
        "newAnalysis": "Incorrect. These are hierarchical classifications of urban agglomerations, not rural settlement types."
    },
    {
        "file": "mock/geo/1.json",
        "qNum": 30,
        "optId": "A",
        "oldSubstring": "bottled mineral water",
        "newText": "4,000 cubic km total precipitation, of which 3,000 cubic km is lost immediately to ocean runoff",
        "newAnalysis": "Incorrect. India's annual precipitation is ~4,000 cubic km, but the annual river basin flow is estimated at 1,869 cubic km with 690 cubic km utilizable."
    },
    {
        "file": "mock/geo/1.json",
        "qNum": 30,
        "optId": "B",
        "oldSubstring": "Antarctica",
        "newText": "2,500 cubic km total flow, of which 1,800 cubic km is stored in multi-purpose reservoirs",
        "newAnalysis": "Incorrect. Does not match NCERT official water resources data."
    },
    {
        "file": "mock/geo/1.json",
        "qNum": 30,
        "optId": "D",
        "oldSubstring": "completely dry",
        "newText": "1,123 cubic km total flow, of which 433 cubic km is stored in surface water bodies",
        "newAnalysis": "Incorrect. 433 BCM refers to replenishable groundwater resources, not total river flow."
    },
    {
        "file": "mock/geo/19.json",
        "qNum": 35,
        "optId": "B",
        "oldSubstring": "railway tracks",
        "newText": "National Mission for Sustainable Agriculture (NMSA)",
        "newAnalysis": "Incorrect. NMSA is a separate mission under the National Action Plan on Climate Change (NAPCC)."
    },
    {
        "file": "mock/geo/19.json",
        "qNum": 35,
        "optId": "D",
        "oldSubstring": "roofs black",
        "newText": "National Energy Conservation and Renewable Energy Mandate of 2003",
        "newAnalysis": "Incorrect. The National Solar Mission (Jawaharlal Nehru National Solar Mission) was launched under the NAPCC in 2010."
    },
    {
        "file": "mock/geo/19.json",
        "qNum": 39,
        "optId": "A",
        "oldSubstring": "500 new airports",
        "newText": "A program to construct 4-lane national expressways connecting all state capitals",
        "newAnalysis": "Incorrect. Expressway construction falls under the Bharatmala Pariyojana / NHAI mandate."
    },
    {
        "file": "mock/geo/19.json",
        "qNum": 39,
        "optId": "B",
        "oldSubstring": "garbage to Antarctica",
        "newText": "A national initiative to install rooftop rainwater harvesting across all urban residences",
        "newAnalysis": "Incorrect. Urban rainwater harvesting is managed under Jal Jeevan Mission and municipal bylaws."
    },
    {
        "file": "mock/geo/19.json",
        "qNum": 39,
        "optId": "C",
        "oldSubstring": "manufacture of soap",
        "newText": "A welfare scheme providing subsidized LPG connections to rural households (Pradhan Mantri Ujjwala Yojana)",
        "newAnalysis": "Incorrect. Ujjwala Yojana provides clean cooking fuel, not sanitation facilities."
    },
    {
        "file": "mock/geo/14.json",
        "qNum": 12,
        "optId": "C",
        "oldSubstring": "stopped wearing clothes",
        "newText": "Shifted towards high-cost European centres due to full robotic automation",
        "newAnalysis": "Incorrect. The global cotton textile industry shifted towards low-cost developing countries in Asia (China, India, Bangladesh, Vietnam) due to abundant low-cost labour and raw cotton access."
    }
]

fixed_count = 0
for r in repairs:
    path = r["file"]
    if not os.path.exists(path):
        print(f"Warning: file {path} not found")
        continue
    with open(path, "r") as f:
        data = json.load(f)
    
    modified = False
    for q in data:
        if q.get("questionNumber") == r["qNum"]:
            for o in q.get("options", []):
                if o.get("id") == r["optId"] and r["oldSubstring"].lower() in o.get("text", "").lower():
                    o["text"] = r["newText"]
                    if "newAnalysis" in r:
                        o["mistakeAnalysis"] = r["newAnalysis"]
                    modified = True
                    fixed_count += 1
                    print(f"Fixed {path} Q{r['qNum']} Opt {r['optId']} -> {r['newText'][:60]}...")
    
    if modified:
        with open(path, "w") as f:
            json.dump(data, f, indent=2)

print(f"\nSuccessfully repaired {fixed_count} absurd distractors with rigorous academic alternatives.")
