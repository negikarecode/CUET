import os

code = '''import sys, os
sys.path.insert(0, os.getcwd())
from scripts.subject_generators.slot_helpers import mcq, stmt, ar, match, seq

def build_slot(ch, items):
    res = []
    for itm in items:
        qtype = itm[0]
        if qtype == "mcq":
            _, top, stem, corr, wrongs, expl = itm
            res.append(mcq(ch, top, stem, corr, wrongs, expl))
        elif qtype == "stmt":
            _, top, s1, s2, rel, expl = itm
            res.append(stmt(ch, top, s1, s2, rel, expl))
        elif qtype == "ar":
            _, top, a, r, rel, expl = itm
            res.append(ar(ch, top, a, r, rel, expl))
        elif qtype == "match":
            _, top, stem, l1, l2, pair, expl = itm
            res.append(match(ch, top, stem, l1, l2, pair, expl))
        elif qtype == "seq":
            _, top, stem, items_list, order_str, expl = itm
            res.append(seq(ch, top, stem, items_list, order_str, expl))
    assert len(res) == 20, f"Slot has {len(res)} items instead of 20"
    return res

CH_NATURE = "Human Beings and Nature"
CH_POP_ECOL = "Population Ecology"
CH_BIODIV = "Biodiversity and Conservation"

# ==============================================================================
# Slot 1: Modern Schools of Ecological Thought
# ==============================================================================
s1_raw = [
    ("mcq", "Deep Ecology Philosophy",
     "Who coined the term 'Deep Ecology' in 1973, advocating an ecocentric worldview that recognizes the intrinsic value of all living beings regardless of their utility to humans?",
     "Arne Naess",
     ["Murray Bookchin", "Vandana Shiva", "Garrett Hardin"],
     "Norwegian philosopher Arne Naess coined 'Deep Ecology' in 1973, contrasting it with shallow, anthropocentric environmentalism."),
    ("stmt", "Deep vs Shallow Ecology",
     "Deep Ecology rejects anthropocentrism and views human beings as an equal, interconnected component of the broader biosphere.",
     "Shallow Ecology focuses primarily on resource conservation and pollution control to sustain human health and high standards of living.", 1,
     "Both Statement I and Statement II are correct. Deep ecology is biocentric/ecocentric, whereas shallow ecology is anthropocentric and reformist."),
    ("ar", "Social Ecology and Hierarchies",
     "Social Ecology asserts that present-day ecological crises stem fundamentally from deep-seated social hierarchies and human domination over other humans.",
     "Murray Bookchin argued that human domination of nature cannot be overcome without completely dismantling social, economic, and political hierarchies.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Social ecology, pioneered by Murray Bookchin, links environmental devastation to social oppression and inequality."),
    ("match", "Ecological Thought Schools and Pioneers",
     "Match the ecological philosophical school in List I with its key theorist in List II:",
     [("A", "Deep Ecology"),
      ("B", "Social Ecology"),
      ("C", "Ecofeminism"),
      ("D", "Tragedy of the Commons")],
     [("I", "Arne Naess"),
      ("II", "Murray Bookchin"),
      ("III", "Vandana Shiva"),
      ("IV", "Garrett Hardin")],
     "A-I, B-II, C-III, D-IV",
     "Deep ecology was founded by Arne Naess, social ecology by Murray Bookchin, ecofeminism notably articulated by Vandana Shiva in India, and Tragedy of the Commons by Garrett Hardin."),
    ("mcq", "Ecofeminism Core Concept",
     "According to the school of Ecofeminism, which interconnected domination is identified as the root of ecological destruction?",
     "The parallel patriarchal domination of women and the exploitation of nature",
     ["The conflict between agriculturalists and nomadic pastoralists", "The confrontation between solar technology and fossil fuel extraction", "The technological race between developed and developing nations"],
     "Ecofeminism examines the conceptual and structural connections between the patriarchal oppression of women and the exploitation of nature."),
    ("mcq", "Biocentrism Definition",
     "The ethical paradigm that asserts that all life forms possess inherent moral worth and have an equal right to exist and thrive is known as:",
     "Biocentric egalitarianism",
     ["Technocentrism", "Anthropocentric utilitarianism", "Economic reductionism"],
     "Biocentric egalitarianism, central to deep ecology, posits that all living beings have intrinsic value independent of their usefulness to humankind."),
    ("stmt", "Anthropocentrism and Technocentrism",
     "Anthropocentrism posits that human beings are the central and most significant entities in the universe.",
     "Technocentrism reflects supreme faith in technological innovation and scientific engineering to manage and solve all environmental problems.", 1,
     "Both Statement I and Statement II are correct. Anthropocentrism places humans at the center, while technocentrism relies on technical fixes for ecological limits."),
    ("seq", "Spectrum of Environmental Worldviews",
     "Arrange the environmental paradigms along the philosophical continuum from most human-centered (anthropocentric) to most nature-centered (ecocentric):",
     ["Technocentric / Cornucopian worldview", "Shallow Environmentalism / Resource Conservation", "Social Ecology", "Deep Ecology / Biocentrism"],
     "I -> II -> III -> IV",
     "The environmental continuum progresses from technocentrism to shallow reformist conservationism, social ecology, and finally ecocentric deep ecology."),
    ("mcq", "Vandana Shiva Chipko Connection",
     "In which celebrated work did Indian ecofeminist Vandana Shiva document the traditional ecological knowledge of rural women and their historic resistance in the Chipko movement?",
     "Staying Alive: Women, Ecology and Development",
     ["Silent Spring", "Our Common Future", "The Population Bomb"],
     "Vandana Shiva authored 'Staying Alive: Women, Ecology and Development' (1988), emphasizing Indian women's organic links to biodiversity preservation."),
    ("ar", "Anthropocentric Resource Conservation",
     "Shallow ecology advocates combating climate change and pollution primarily through market incentives and technological efficiency.",
     "Shallow ecology aims to protect the biosphere solely to ensure continued economic growth and human material well-being.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Shallow ecology seeks to maintain human living standards through reformist technocratic interventions."),
    ("mcq", "Ecosophy Concept",
     "Arne Naess introduced the term 'Ecosophy T' to represent which personal environmental philosophy?",
     "A personal philosophy of ecological harmony and equilibrium",
     ["A mathematical model measuring atmospheric greenhouse concentrations", "A corporate carbon-trading accounting methodology", "A legal framework for establishing national parks"],
     "Arne Naess coined 'Ecosophy' (from oikos and sophia) to signify an individual's personal philosophy of ecological wisdom, harmony, and non-violence."),
    ("mcq", "Ecological Self-Realization",
     "In Deep Ecology, the expansion of individual human identity to encompass all living entities and ecological processes is termed:",
     "Self-realization or Ecological Self",
     ["Technological assimilation", "Ego-defense mechanism", "Social stratification"],
     "Deep Ecology teaches that mature self-realization involves identifying oneself with all living beings and natural ecosystems."),
    ("match", "Environmental Worldviews and Axioms",
     "Match the environmental philosophy in List I with its core tenet in List II:",
     [("A", "Anthropocentrism"),
      ("B", "Biocentrism"),
      ("C", "Ecocentrism"),
      ("D", "Technocentrism")],
     [("I", "Humans possess sole intrinsic moral worth and nature exists as a resource pool"),
      ("II", "All individual living organisms have equal inherent worth regardless of sentience"),
      ("III", "Whole ecosystems, species, and abiotic processes possess intrinsic value"),
      ("IV", "Human ingenuity and scientific advancement will overcome all resource limits")],
     "A-I, B-II, C-III, D-IV",
     "Anthropocentrism prioritizes humans, biocentrism respects all living individuals, ecocentrism values holistic ecosystems, and technocentrism trusts human technology."),
    ("mcq", "Chipko Hug the Trees Philosophy",
     "The women of the Chipko movement clung to forest trees in Uttarakhand to oppose commercial logging primarily because they recognized that the forest provides:",
     "Soil, water, and pure air, which form the basis of rural subsistence",
     ["Commercial timber exports for industrial paper mills", "Raw materials for high-speed urban highway expansion", "Speculative carbon credits for international corporations"],
     "Chipko women famously chanted: 'What do the forests bear? Soil, water and pure air! Soil, water and pure air are the basis of life.'"),
    ("mcq", "Rachel Carson Environmental Milestone",
     "Which monumental 1962 book by marine biologist Rachel Carson catalyzed the modern environmental movement by exposing the bioaccumulation of synthetic pesticides like DDT?",
     "Silent Spring",
     ["The Limits to Growth", "Small is Beautiful", "Earth in the Balance"],
     "Rachel Carson published 'Silent Spring' in 1962, alerting the world to the devastating ecological impacts and food-chain biomagnification of synthetic pesticides."),
    ("stmt", "Barry Commoner Laws of Ecology",
     "Biologist Barry Commoner famously formulated four basic informal laws of ecology in his 1971 work 'The Closing Circle'.",
     "One of Commoner's central axioms is 'Everything is connected to everything else' and 'Nature knows best'.", 1,
     "Both Statement I and Statement II are correct. Barry Commoner's laws: Everything is connected to everything else; Everything must go somewhere; Nature knows best; There is no such thing as a free lunch."),
    ("mcq", "Aldo Leopold Land Ethic",
     "Aldo Leopold, in 'A Sand County Almanac' (1949), formulated the Land Ethic which asserts that a thing is right when it tends to:",
     "Preserve the integrity, stability, and beauty of the biotic community",
     ["Maximize immediate industrial yield per acre of agricultural land", "Generate maximum tax revenue for municipal corporations", "Subdue wild nature for urban recreation"],
     "Aldo Leopold's Land Ethic states: 'A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community. It is wrong when it tends otherwise.'"),
    ("seq", "Evolution of Modern Environmental Thought",
     "Arrange these landmark environmental milestones in chronological order of their publication or origin:",
     ["Aldo Leopold publishes 'A Sand County Almanac' formulating the Land Ethic", "Rachel Carson publishes 'Silent Spring' exposing DDT impacts", "Arne Naess introduces the philosophy of 'Deep Ecology'", "Vandana Shiva publishes 'Staying Alive' pioneering Indian ecofeminism"],
     "I -> II -> III -> IV",
     "Land Ethic was published in 1949, Silent Spring in 1962, Deep Ecology articulated in 1973, and Staying Alive published in 1988."),
    ("mcq", "Radical Environmental Activism",
     "Direct action movements that prioritize non-violent civil disobedience and ecocentric sabotage to defend old-growth wilderness ecosystems are historically rooted in:",
     "Deep Ecology",
     ["Cornucopian economics", "Neoliberal market deregulation", "Classical anthropocentrism"],
     "Deep Ecology's insistence on the equal rights of nature provided the philosophical foundation for radical wilderness preservation campaigns."),
    ("mcq", "Instrumental vs Intrinsic Value",
     "In environmental ethics, the value an entity possesses as an instrument or tool to satisfy human goals is termed:",
     "Instrumental value",
     ["Intrinsic value", "Inherent worth", "Ecocentric value"],
     "Instrumental value refers to an object's utility as a means to an end (usually human benefit), distinct from intrinsic value which exists in its own right.")
]

# ==============================================================================
# Slot 2: Human Population Dynamics, Malthusian Theory & Demographic Transition
# ==============================================================================
s2_raw = [
    ("mcq", "Malthusian Principle of Population",
     "In his 1798 'Essay on the Principle of Population', Thomas Robert Malthus argued that human population grows exponentially while food production increases:",
     "Arithmetically",
     ["Geometricially", "Exponentially", "Logarithmically"],
     "Malthus argued that population increases in a geometric/exponential ratio (1, 2, 4, 8, 16...) whereas food production grows arithmetically (1, 2, 3, 4, 5...)."),
    ("stmt", "Malthusian Preventive and Positive Checks",
     "Malthus classified preventive checks as voluntary human actions such as moral restraint, delayed marriage, and celibacy to lower birth rates.",
     "Positive checks refer to natural and involuntary events like famines, epidemics, pestilence, and wars that sharply increase mortality rates.", 1,
     "Both Statement I and Statement II are correct. Malthus divided population checks into preventive checks (reducing births) and positive checks (increasing deaths)."),
    ("ar", "Demographic Transition Stage II",
     "Stage II of the Demographic Transition Model is characterized by rapid population growth commonly referred to as a 'population explosion'.",
     "In Stage II, death rates plummet rapidly due to improved sanitation, medical technology, and food supplies, while birth rates remain stubbornly high.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). The mortality decline unmatched by immediate birth rate decline generates explosive natural increase."),
    ("match", "Demographic Transition Stages and Characteristics",
     "Match the Demographic Transition Stage in List I with its demographic hallmark in List II:",
     [("A", "Stage I (Pre-industrial)"),
      ("B", "Stage II (Early Transitional)"),
      ("C", "Stage III (Late Transitional)"),
      ("D", "Stage IV (Industrial / Post-industrial)")],
     [("I", "High birth rate and high fluctuating death rate; low and stable population"),
      ("II", "High birth rate and rapidly falling death rate; rapid population expansion"),
      ("III", "Falling birth rate and low death rate; decelerating population growth"),
      ("IV", "Low birth rate and low death rate; stable or near-zero population growth")],
     "A-I, B-II, C-III, D-IV",
     "Stage I has high birth and death rates; Stage II sees death rates fall; Stage III birth rates fall; Stage IV achieves low birth and death balance."),
    ("mcq", "Total Fertility Rate Replacement Level",
     "What is the generally accepted numerical value of the Replacement-Level Total Fertility Rate (TFR) in populations with low infant mortality?",
     "2.1 children per woman",
     ["1.5 children per woman", "2.8 children per woman", "3.2 children per woman"],
     "Replacement-level TFR is approximately 2.1 children per woman, accounting for infant and child mortality to replace both parents."),
    ("mcq", "Doubling Time Rule of 70",
     "If a nation's population grows at a steady annual rate of 2%, approximately how many years will it take for the population to double using the 'Rule of 70'?",
     "35 years",
     ["70 years", "20 years", "140 years"],
     "By the Rule of 70, doubling time = 70 / annual growth rate percentage = 70 / 2 = 35 years."),
    ("stmt", "Crude Birth Rate and Crude Death Rate",
     "Crude Birth Rate (CBR) measures the number of live births per 1,000 individuals in a population per year.",
     "Crude Death Rate (CDR) measures the number of deaths per 1,000 individuals in a population per year.", 1,
     "Both Statement I and Statement II are correct. CBR and CDR are standardized per 1,000 people per year."),
    ("seq", "Stages of Demographic Transition",
     "Arrange the stages of the classical Demographic Transition Model in sequential evolutionary order:",
     ["High birth rate balanced by high death rate (Pre-modern equilibrium)", "Death rate plummets while birth rate remains elevated (Transitional expansion)", "Birth rate declines substantially towards low death rate (Social adjustment)", "Low birth rate balances low death rate (Modern stationary state)"],
     "I -> II -> III -> IV",
     "Demographic transition follows the sequence of pre-transition balance, mortality decline expansion, fertility decline, and post-transition balance."),
    ("mcq", "Demographic Dividend Meaning",
     "The economic growth potential that results from shifts in a population's age structure, specifically when the working-age population (15–64) exceeds the dependent population, is called:",
     "Demographic dividend",
     ["Demographic trap", "Malthusian catastrophe", "Carrying capacity collapse"],
     "The demographic dividend arises when falling birth rates reduce child dependency ratios while the working-age cohort reaches its maximum size."),
    ("ar", "Demographic Momentum Phenomenon",
     "Even after a country attains replacement-level fertility (TFR = 2.1), its total population continues to grow for several decades.",
     "Demographic momentum occurs because a large historical base of young people enters their reproductive years, keeping absolute births high.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). Population momentum keeps growth positive until the youthful age cohort completes reproduction."),
    ("mcq", "Neo-Malthusian Thinkers",
     "Which 1968 publication by Paul R. Ehrlich popularized Neo-Malthusian alarms regarding global ecological breakdown triggered by overpopulation?",
     "The Population Bomb",
     ["The Wealth of Nations", "Capital in the Twenty-First Century", "Silent Spring"],
     "Paul Ehrlich published 'The Population Bomb' in 1968, arguing that unbridled population growth would cause mass starvation and resource exhaustion."),
    ("mcq", "Infant Mortality Rate Definition",
     "Infant Mortality Rate (IMR) is formally defined as the number of deaths of infants under one year of age per:",
     "1,000 live births in a given year",
     ["100 live births in a given year", "10,000 total population", "1,000 women of reproductive age"],
     "IMR is the number of deaths of children under one year of age per 1,000 live births in that year."),
    ("match", "Demographic Measures and Definitions",
     "Match the demographic indicator in List I with its metric description in List II:",
     [("A", "Total Fertility Rate (TFR)"),
      ("B", "Natural Increase Rate (NIR)"),
      ("C", "Dependency Ratio"),
      ("D", "Life Expectancy at Birth")],
     [("I", "Average number of children a woman would bear over her reproductive lifespan"),
      ("II", "Difference between crude birth rate and crude death rate expressed as a percentage"),
      ("III", "Ratio of dependent ages (0-14 and 65+) to the working-age population (15-64)"),
      ("IV", "Average number of years a newborn infant is expected to live under current mortality patterns")],
     "A-I, B-II, C-III, D-IV",
     "TFR reflects lifetime fertility, NIR measures birth minus death rate, Dependency Ratio compares dependents to workers, and Life Expectancy projects average lifespan."),
    ("mcq", "Sex Ratio in Census of India",
     "In the official Census of India, how is the Sex Ratio defined and calculated?",
     "Number of females per 1,000 males",
     ["Number of males per 1,000 females", "Percentage of females in total population", "Number of females per 100 males"],
     "In India, Sex Ratio is officially defined as the number of females per 1,000 males in the population."),
    ("mcq", "Child Sex Ratio Age Group",
     "In Indian demography, the Child Sex Ratio (CSR) specifically measures the number of girls per 1,000 boys in which age group?",
     "0 to 6 years",
     ["0 to 1 year", "0 to 14 years", "10 to 19 years"],
     "Child Sex Ratio in the Indian Census evaluates the sex distribution of children aged 0 to 6 years."),
    ("stmt", "Cornucopian Perspective on Population",
     "The Cornucopian or Boserupian economic school views human population growth not as a catastrophe, but as an ultimate resource generating innovation.",
     "Ester Boserup argued that agricultural intensification and technological breakthroughs are directly stimulated by rising population densities.", 1,
     "Both Statement I and Statement II are correct. Ester Boserup and Julian Simon posited that human ingenuity expands productive capacity in response to population pressure."),
    ("mcq", "Demographic Trap Phenomenon",
     "A developing nation is said to be caught in a 'Demographic Trap' when:",
     "It experiences falling mortality in Stage II but cannot transition to Stage III because fertility remains high and economic gains are consumed by population growth",
     ["Its population drops below replacement levels causing acute labor shortages", "Its death rate exceeds its birth rate due to aging demographics", "Its urban population exceeds 95% of total citizens"],
     "The demographic trap occurs when high fertility persists alongside lower mortality, trapping the society in rapid growth that overwhelms infrastructure."),
    ("seq", "Population Milestone Approximations",
     "Arrange the estimated global population milestones in chronological order of their attainment:",
     ["Global population reaches 1 billion (circa 1804)", "Global population crosses 2 billion (circa 1927)", "Global population crosses 4 billion (circa 1974)", "Global population crosses 8 billion (November 2022)"],
     "I -> II -> III -> IV",
     "World population hit 1B in ~1804, 2B in 1927, 4B in 1974, and officially crossed 8B in November 2022."),
    ("mcq", "Cairo ICPD Conference 1994",
     "The 1994 International Conference on Population and Development (ICPD) in Cairo marked a historic paradigm shift by emphasizing:",
     "Women's reproductive health, bodily autonomy, and female education rather than coercive demographic targets",
     ["Mandatory numerical birth quotas for all developing economies", "Exclusive reliance on industrial synthetic food supplements", "The complete cessation of international rural-urban migration"],
     "Cairo ICPD 1994 shifted population policy from top-down demographic quotas to human rights, women's empowerment, and reproductive healthcare."),
    ("mcq", "India National Population Policy 2000",
     "The long-term objective of the National Population Policy (NPP) 2000 adopted by the Government of India was to:",
     "Achieve a stable population by 2045 at a level consistent with sustainable economic growth and environmental protection",
     ["Enact a mandatory two-child legal mandate with punitive measures", "Reduce India's absolute population by 50% through assisted emigration", "Freeze all rural healthcare investments to incentivize urban relocation"],
     "NPP 2000 established the long-term target of stabilizing India's population by 2045 through voluntary reproductive choice and comprehensive primary health services.")
]

SLOTS_1_10 = {
    1: build_slot(CH_NATURE, s1_raw),
    2: build_slot(CH_POP_ECOL, s2_raw),
}
print("EVS Slots 1 and 2 ready.")
'''

with open('scripts/subject_generators/make_evs_s1_10.py', 'w') as f:
    f.write(code)

print("make_evs_s1_10.py template written.")
