import json, os, sys
sys.path.insert(0, os.getcwd())
from scripts.generators.concept_factory import raw_mcq, raw_stmt, raw_ar, raw_match, raw_seq

CH_DEMO = "The Demographic Structure of the Indian Society"
qs = []

# Concept 1: Malthusian Theory
qs.append(raw_mcq(CH_DEMO, "Malthusian Theory",
    "According to Thomas Robert Malthus in his 1798 Essay on Population, at what rates do human population and food supply grow?",
    "Population grows geometrically (1, 2, 4, 8, 16...) while food production grows arithmetically (1, 2, 3, 4, 5...)",
    ["Population grows arithmetically while agricultural food production increases geometrically",
     "Both human population and food output expand at an identical exponential trajectory",
     "Food production expands exponentially while human population remains stationary over centuries"],
    "Malthus argued that unchecked population grows geometrically while food subsistence increases only arithmetically, leading to catastrophic imbalances.",
    "Correctly identifies Malthusian geometric vs arithmetic growth rates."))

qs.append(raw_stmt(CH_DEMO, "Malthusian Theory Checks",
    "Malthus classified famine, war, and epidemics as 'positive checks' that nature imposes when population outstrips food supply.",
    "Malthus advocated that the state must distribute unlimited cash subsidies to prevent natural checks from operating.",
    3,
    "Statement I is correct because Malthus identified famines, wars, and disease outbreaks as positive checks. Statement II is incorrect because Malthus opposed state welfare subsidies, arguing they would worsen population growth.",
    "Recognizes Malthus's distinction between positive checks and welfare critiques."))

qs.append(raw_ar(CH_DEMO, "Malthusian Premise Critique",
    "Marxist and liberal social theorists fundamentally criticized Malthus's theory of population.",
    "Historical developments demonstrated that agricultural technology and equitable distribution could increase food output faster than population growth.",
    1,
    "Both (A) and (R) are true, and (R) correctly explains (A). Critics proved that famines were caused by unequal distribution and colonial poverty rather than absolute lack of food production.",
    "Understands the critical rebuttals to Malthusian population theory."))

qs.append(raw_seq(CH_DEMO, "Malthusian Cycle",
    "Arrange the stages of the classic Malthusian catastrophe cycle in logical sequence:",
    [("A", "Rapid geometric population growth exceeds available food production"),
     ("B", "Emergence of severe food scarcity, famine, and widespread epidemic disease"),
     ("C", "Sharp contraction of population back to subsistence level via positive checks"),
     ("D", "Temporary agricultural abundance and low mortality sparking population rebound")],
    "D, A, B, C",
    "The Malthusian cycle begins with abundance, followed by geometric growth outstripping food, triggering positive checks (scarcity/epidemics), which forcibly resets population.",
    "Correctly sequences the Malthusian cyclical process."))

print(f"Generated {len(qs)} questions for Concept 1.")
