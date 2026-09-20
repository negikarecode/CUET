import os, sys

fpath = "scripts/generators/soc/slots_1_10.py"

slot1_code = '''
# ==============================================================================
# SLOT 1: Malthusian Theory & Demographic Transition Model (20 Questions)
# ==============================================================================
SLOTS[1] = [
    ("mcq", CH_DEMO, "Malthusian Theory",
     "In his famous 1798 essay on population, Thomas Robert Malthus stated that:",
     "Population grows geometrically (1, 2, 4, 8, 16...) while food production increases arithmetically (1, 2, 3, 4, 5...)",
     ["Population increases arithmetically while agricultural food production increases geometrically",
      "Both human population and food output grow at an identical linear rate",
      "Food production grows exponentially while human population remains static"],
     "Malthus argued that unchecked human population expands geometrically whereas agricultural output expands only arithmetically.\\nHence, Option {{CORR}} is correct.",
     "Identifies geometric vs arithmetic growth rates in Malthusian theory."),

    ("mcq", CH_DEMO, "Demographic Transition Stage 1",
     "Which demographic profile uniquely characterizes Stage 1 of the Demographic Transition Model?",
     "High birth rates and high death rates resulting in a low and fluctuating population growth rate",
     ["Low birth rates and low death rates in an advanced industrialized urban nation",
      "A rapid fall in mortality while birth rates double in a single calendar decade",
      "Zero infant mortality coupled with an average life expectancy exceeding eighty years"],
     "In Stage 1 (pre-industrial), high birth rates are balanced by high death rates from famines and epidemics, keeping growth minimal.\\nHence, Option {{CORR}} is correct.",
     "Identifies high-fertility high-mortality equilibrium in Stage 1."),

    ("mcq", CH_DEMO, "Demographic Transition Stage 2",
     "Why is Stage 2 of the Demographic Transition Model referred to as the 'population explosion' stage?",
     "Mortality rates fall sharply due to disease control and sanitation, while birth rates remain stubbornly high",
     ["Birth rates suddenly double due to state subsidies while death rates remain completely constant",
      "Massive immigration from foreign countries doubles the national population in five years",
      "The working-age population drops to zero while child fertility rises exponentially"],
     "Stage 2 brings rapid mortality reduction through public health interventions while cultural reproductive norms take decades to adjust.\\nHence, Option {{CORR}} is correct.",
     "Explains the cause of population explosion in Stage 2."),

    ("mcq", CH_DEMO, "Demographic Transition Stage 3",
     "What demographic pattern characterizes Stage 3 of demographic transition in fully developed economies?",
     "Low birth rates and low death rates leading to a stable or very slow-growing population",
     ["Extremely high birth rates and rising mortality due to widespread epidemic outbreaks",
      "A population pyramid with an extremely broad base of infants under five years old",
      "A total collapse of adult life expectancy due to heavy industrial air pollution"],
     "In Stage 3, urbanization and female education lead to low fertility, matching low mortality for a stable low-growth population.\\nHence, Option {{CORR}} is correct.",
     "Identifies characteristics of Stage 3 demographic transition."),

    ("stmt", CH_DEMO, "Malthusian Checks",
     "Malthus classified famines, epidemics, and wars as 'positive checks' imposed by nature to restore balance.",
     "Malthus advocated that the state should provide generous financial doles to the poor to eradicate positive checks.",
     3,
     "Statement I is correct because Malthus identified famines, wars, and disease as positive checks. Statement II is incorrect because Malthus opposed state welfare subsidies, arguing they encourage irresponsible reproduction.\\nHence, Option {{CORR}} is correct.",
     "Differentiates Malthusian positive checks from his stance on welfare."),

    ("stmt", CH_DEMO, "Demographic Transition Lag",
     "Mortality rates in developing countries were lowered relatively rapidly through external technological transfers of medicine and sanitation.",
     "Birth rates in these societies adjusted immediately because cultural beliefs regarding childbearing change instantly with new technology.",
     3,
     "Statement I is correct as public health reduces deaths quickly. Statement II is incorrect because cultural values regarding fertility lag behind technological changes.\\nHence, Option {{CORR}} is correct.",
     "Understands cultural lag in reproductive behavior."),

    ("ar", CH_DEMO, "Marxist Critique of Malthus",
     "Marxist theorists rejected Malthus's claim that poverty is caused by natural population growth outstripping food supply.",
     "Poverty and starvation in capitalist and colonial economies are caused by unequal distribution of resources and structural exploitation.",
     1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Marx and Engels argued that poverty stems from capitalist ownership rather than natural population limits.\\nHence, Option {{CORR}} is correct.",
     "Explains Marxist theoretical rebuttal to Malthusian doctrine."),

    ("ar", CH_DEMO, "Demographic Great Divide",
     "The year 1921 is designated as the 'Year of the Great Divide' in the demographic history of India.",
     "Prior to 1921, India's population growth was erratic and experienced negative growth during 1911-1921 due to the 1918 Influenza pandemic.",
     1,
     "Both (A) and (R) are true, and (R) correctly explains (A). After 1921, mortality began to decline systematically, ensuring continuous positive population growth.\\nHence, Option {{CORR}} is correct.",
     "Explains the significance of the 1921 demographic divide."),

    ("match", CH_DEMO, "Demographic Transition Stages",
     "Match the demographic transition stages in List I with their descriptions in List II:",
     [("A", "Stage 1 (Pre-industrial)"), ("B", "Stage 2 (Transitional)"), ("C", "Stage 3 (Industrialized)"), ("D", "Stage 4 (Post-industrial)")],
     [("I", "Low birth rate and low death rate, stable population"),
      ("II", "High birth rate and high death rate, fluctuating population"),
      ("III", "Falling death rate with persistently high birth rate, population boom"),
      ("IV", "Sub-replacement fertility and aging population structure")],
     "A-II, B-III, C-I, D-IV",
     "Stage 1 is high-high; Stage 2 is falling mortality with high fertility; Stage 3 is low-low; Stage 4 is sub-replacement aging.\\nHence, Option {{CORR}} is correct.",
     "Matches stages of demographic transition to population dynamics."),

    ("seq", CH_DEMO, "Demographic Transition Phases",
     "Arrange the stages of demographic transition in chronological order of a developing society's progression:",
     [("A", "High birth and death rates in an agrarian subsistence economy"),
      ("B", "Sharp decline in mortality due to public health interventions while fertility stays high"),
      ("C", "Fertility rates begin dropping due to urbanization, female literacy, and contraception"),
      ("D", "Birth and death rates reach low equilibrium with potential population aging")],
     "A, B, C, D",
     "Society progresses sequentially from pre-industrial high-high balance, through transitional mortality decline, to fertility drop, and final low-equilibrium.\\nHence, Option {{CORR}} is correct.",
     "Sequences the chronological progression of demographic transition."),

    ("mcq", CH_DEMO, "Malthusian Preventive Checks",
     "Which of the following did Thomas Malthus classify under 'Preventive Checks' to population growth?",
     "Postponing marriage, moral restraint, and voluntary celibacy",
     ["Famines and agricultural crop failures",
      "Outbreaks of cholera, plague, and smallpox",
      "Military wars and territorial conflicts between empires"],
     "Preventive checks represent voluntary human actions to limit family size, such as late marriage and celibacy, unlike positive natural disasters.\\nHence, Option {{CORR}} is correct.",
     "Distinguishes preventive checks from positive checks in Malthus."),

    ("stmt", CH_DEMO, "Agricultural Revolution vs Malthus",
     "The historical experience of 19th and 20th century Europe disproved Malthus's prediction of inevitable mass starvation.",
     "Technological innovations in agriculture and the opening of new global trade routes dramatically increased food productivity.",
     1,
     "Both statements are correct: Agricultural productivity grew exponentially due to scientific breeding, mechanization, and trade, falsifying Malthusian arithmetic ceilings.\\nHence, Option {{CORR}} is correct.",
     "Analyzes historical falsification of Malthusian agricultural limits."),

    ("ar", CH_DEMO, "Natural Increase Rate",
     "The rate of natural increase of a population is calculated as the crude birth rate minus the crude death rate.",
     "International migration has no influence whatsoever on the overall national population size of any sovereign country.",
     3,
     "(A) is true as natural increase equals CBR minus CDR. (R) is false because net international migration significantly influences total national population size.\\nHence, Option {{CORR}} is correct.",
     "Defines rate of natural increase and notes migration impacts."),

    ("mcq", CH_DEMO, "Amartya Sen on Famines",
     "In his seminal study *Poverty and Famines*, what primary cause did Amartya Sen demonstrate for catastrophic famines such as the 1943 Bengal Famine?",
     "Failure of food entitlement and collapse of purchasing power rather than absolute physical lack of food availability",
     ["A complete physical absence of any edible grain across the entire Asian continent",
      "A statutory ban enacted by the United Nations on planting rice crops",
      "A volcanic ash cloud that eliminated sunlight and halted all plant photosynthesis"],
     "Amartya Sen proved that the 1943 Bengal famine was caused by a failure of exchange entitlements (inflation and speculation) rather than absolute food scarcity.\\nHence, Option {{CORR}} is correct.",
     "Identifies Amartya Sen's entitlement approach to famines."),

    ("stmt", CH_DEMO, "Epidemiological Transition",
     "The Epidemiological Transition refers to the shift in disease patterns from infectious, communicative plagues to non-communicable, lifestyle-related degenerative ailments.",
     "India has completely eradicated all infectious diseases and now suffers exclusively from heart ailments.",
     3,
     "Statement I is correct as epidemiological transition describes the shift from infectious to chronic diseases. Statement II is incorrect as India faces a 'dual disease burden'.\\nHence, Option {{CORR}} is correct.",
     "Defines epidemiological transition and dual disease burden."),

    ("ar", CH_DEMO, "Pre-1921 Mortality Swings",
     "The population of India declined between the 1911 and 1921 Censuses.",
     "The catastrophic 1918 Influenza epidemic (Spanish Flu) killed an estimated 12.5 million Indians, or roughly 5% of the total population.",
     1,
     "Both (A) and (R) are true, and (R) correctly explains (A). The 1918 pandemic caused a massive spike in mortality, resulting in a negative decadal growth rate (-0.03%).\\nHence, Option {{CORR}} is correct.",
     "Explains mortality causes of 1911-1921 population contraction in India."),

    ("match", CH_DEMO, "Demographic Theorists and Concepts",
     "Match the demographic theorists in List I with their foundational concepts in List II:",
     [("A", "Thomas Robert Malthus"), ("B", "Amartya Sen"), ("C", "Kingsley Davis"), ("D", "Warren Thompson")],
     [("I", "Entitlement approach to famine analysis"),
      ("II", "Original formulation of Demographic Transition Model"),
      ("III", "Geometric vs Arithmetic growth disparity"),
      ("IV", "Sociological analysis of population and modernization")],
     "A-III, B-I, C-IV, D-II",
     "Malthus proposed geometric/arithmetic ratio; Sen developed entitlement approach; Davis analyzed sociological demography; Thompson framed demographic transition.\\nHence, Option {{CORR}} is correct.",
     "Matches leading demographic thinkers to their key contributions."),

    ("seq", CH_DEMO, "Key Milestones in Demographic Theory",
     "Arrange the following theoretical milestones in demographic history in chronological order:",
     [("A", "Publication of Thomas Malthus's *Essay on the Principle of Population*"),
      ("B", "First synchronous decennial Census conducted across British India"),
      ("C", "Warren Thompson's initial formulation of the Demographic Transition Model"),
      ("D", "Amartya Sen's publication of *Poverty and Famines: An Essay on Entitlement and Deprivation*")],
     "A, B, C, D",
     "Malthus published in 1798, British Indian Census in 1881, Thompson formulated transition in 1929, Sen published entitlements in 1981.\\nHence, Option {{CORR}} is correct.",
     "Orders historical publications in demographic science chronologically."),

    ("mcq", CH_DEMO, "Demographic Balance Sheet",
     "Which mathematical equation correctly expresses the demographic balancing equation for calculating a region's population change over time?",
     "P(t) = P(0) + (Births - Deaths) + (Immigrants - Emigrants)",
     ["P(t) = P(0) * (Births / Deaths) - (Immigrants * Emigrants)",
      "P(t) = P(0) + (Births + Deaths) - (Immigrants + Emigrants)",
      "P(t) = P(0) - (Births - Deaths) * (Immigrants / Emigrants)"],
     "The demographic balance equation adds natural increase (Births - Deaths) and net migration (Immigration - Emigration) to initial population.\\nHence, Option {{CORR}} is correct.",
     "Identifies standard demographic balancing equation."),

    ("ar", CH_DEMO, "Sub-Replacement Fertility in Peninsular India",
     "Several southern Indian states (Kerala, Tamil Nadu, Andhra Pradesh) have already attained Total Fertility Rates well below the replacement level of 2.1.",
     "Socio-economic factors such as high female literacy, delayed marriage, and improved primary healthcare drove early fertility transitions in southern India.",
     1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Southern states reduced fertility early due to female literacy and social development.\\nHence, Option {{CORR}} is correct.",
     "Explains socio-developmental drivers of southern Indian fertility decline.")
]
assert len(SLOTS[1]) == 20, f"Slot 1 has {len(SLOTS[1])} items"
'''

with open(fpath, "a", encoding="utf-8") as f:
    f.write(slot1_code)

print("Slot 1 appended successfully.")
