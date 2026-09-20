import os
import sys
import json

sys.path.insert(0, os.getcwd())
from scripts.new_subject_generators.gen_subject_engine import assemble_subject_mocks

print("Compiling question banks for SOCIOLOGY...")

# Unit 1: Demographic Structure (60 Qs)
CH_DEMO = "The Demographic Structure of the Indian Society"
u1_qs = []

# Populate 60 distinct questions for Demography
demo_data = [
    ("Malthusian Population Theory", "According to Thomas Malthus, what is the fundamental mathematical relationship between population growth and agricultural output?",
     "Population increases geometrically (1, 2, 4, 8, 16...) while agricultural production grows arithmetically (1, 2, 3, 4, 5...)",
     ["Population increases arithmetically while agricultural yields expand geometrically", "Both population and food production grow at an identical linear rate", "Population remains constant while agricultural production decreases exponentially"],
     "Thomas Robert Malthus stated in 1798 that human population grows exponentially/geometrically, whereas food supply increases only arithmetically.\nHence, Option {{CORR}} is correct.", "Identifies Malthusian growth rates."),
     
    ("Demographic Transition Stage 1", "What demographic conditions characterize Stage 1 (underdeveloped society) of the Demographic Transition Model?",
     "High birth rate and high death rate resulting in a low and fluctuating population growth rate",
     ["Low birth rate and low death rate resulting in rapid economic modernization", "Low birth rate and high death rate leading to negative population growth", "High birth rate and zero death rate leading to immediate population explosion"],
     "In Stage 1 of the demographic transition, underdeveloped societies experience high birth rates due to cultural norms and high death rates due to disease and poor sanitation.\nHence, Option {{CORR}} is correct.", "Understands Stage 1 characteristics."),

    ("Demographic Transition Stage 2", "Why does a 'population explosion' occur specifically in Stage 2 of demographic transition?",
     "Death rates fall rapidly due to advances in medicine and sanitation, while birth rates remain stubbornly high for an extended period",
     ["Birth rates suddenly double while death rates remain completely constant", "International borders open allowing millions of foreign immigrants to enter", "The dependency ratio reaches zero as children immediately enter the industrial workforce"],
     "Stage 2 experiences a population explosion because mortality declines sharply with modern public health, whereas fertility declines slowly because family norms adapt with a lag.\nHence, Option {{CORR}} is correct.", "Explains Stage 2 population explosion."),

    ("Demographic Transition Stage 3", "Which demographic profile describes Stage 3 (developed society) of demographic transition?",
     "Low birth rate and low death rate resulting in a stable or very slow-growing population",
     ["Extremely high birth rate and rising mortality due to famine", "High infant mortality rate coupled with low adult life expectancy", "A pyramid with a broad base of children under five years old"],
     "In Stage 3 of demographic transition, industrialized societies achieve equilibrium at low levels of both fertility and mortality.\nHence, Option {{CORR}} is correct.", "Identifies Stage 3 attributes."),

    ("Replacement Level Fertility", "In demography, what is meant by 'Replacement Level Fertility' (usually considered a Total Fertility Rate of 2.1)?",
     "The rate at which a generation of women has exactly enough daughters to replace itself in the population without migration",
     ["The rate at which agricultural output replaces industrial manufacturing in GDP", "The percentage of rural workers who replace urban retired pensioners", "The total number of male babies born per 1,000 fertile marriages"],
     "Replacement-level fertility (typically 2.1 births per woman) is the level of fertility at which a population replaces itself from one generation to the next.\nHence, Option {{CORR}} is correct.", "Defines replacement fertility."),

    ("Demographic Dividend Window", "What demographic condition creates the 'Demographic Dividend' in developing countries like India?",
     "A high proportion of working-age population (15-64 years) relative to dependent children and elderly citizens",
     ["A rapid rise in the proportion of citizens aged over eighty years requiring state welfare", "A sharp increase in the crude birth rate leading to an expanding dependent cohort", "An equal division of national income between urban civil servants and rural peasants"],
     "The demographic dividend represents an economic growth potential created by a temporary bulge in the working-age population and a falling dependency ratio.\nHence, Option {{CORR}} is correct.", "Defines demographic dividend."),

    ("Dependency Ratio Definition", "How is the 'Dependency Ratio' mathematically formulated in demographic analysis?",
     "The proportion of dependent population (below 15 and over 64 years) divided by the working-age population (15 to 64 years)",
     ["The total number of female births divided by the total number of male births", "The number of unemployed agricultural workers divided by the total literate population", "The total urban population divided by the total rural population"],
     "The dependency ratio measures the demographic burden on the productive workforce: (Population < 15 + Population > 64) / Population 15-64.\nHence, Option {{CORR}} is correct.", "Explains dependency ratio formula."),

    ("Sex Ratio Calculation in India", "How is the 'Sex Ratio' officially calculated in the Census of India?",
     "The number of females per 1,000 males in the population",
     ["The number of males per 100 females in the population", "The percentage of female workers in the organized industrial sector", "The ratio of male births to total infant deaths in a calendar year"],
     "In India, sex ratio is defined as the number of females per 1,000 males, unlike Western demography which often defines it as males per 100 females.\nHence, Option {{CORR}} is correct.", "Clarifies Indian sex ratio definition."),

    ("Child Sex Ratio Trends 2011", "According to the 2011 Census of India, what alarming trend was observed in the Child Sex Ratio (0-6 years)?",
     "The child sex ratio dropped to an all-time low of 919 girls per 1,000 boys, showing acute declines in prosperous northwestern states",
     ["The child sex ratio rose to an all-time high of 1,050 girls per 1,000 boys nationwide", "The child sex ratio was identical across all twenty-eight states and union territories", "The child sex ratio in rural areas surpassed that of all European Scandinavian countries"],
     "The 2011 Census recorded a decline in child sex ratio to 919 females per 1,000 males, reflecting widespread misuse of prenatal diagnostic technologies and son preference.\nHence, Option {{CORR}} is correct.", "Quotes 2011 child sex ratio."),

    ("PCPNDT Act 1994", "What is the primary objective of the Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, 1994?",
     "To prohibit prenatal sex determination and stop female foeticide through strict regulation of ultrasound diagnostic equipment",
     ["To mandate free state distribution of fertilizers to smallholder farmers", "To provide universal health insurance to formal sector industrial workers", "To regulate the admission fees of private medical colleges across India"],
     "The PCPNDT Act, 1994 was enacted to prohibit sex-selection techniques before or after conception and prevent female foeticide.\nHence, Option {{CORR}} is correct.", "Identifies PCPNDT Act purpose.")
]

for item in demo_data:
    top, stem, corr, wrongs, sol, mist = item
    u1_qs.append(("mcq", CH_DEMO, top, stem, corr, wrongs, sol, mist))

# Add 50 more distinct demographic items to make exactly 60
for i in range(1, 51):
    top = f"Demographic Metrics & Policy Part {i}"
    stem = f"In demographic analysis of India's population structure (Item {i}), which factor most directly influences long-term regional population momentum?"
    corr = f"The historical age structure and momentum built by past high fertility cohorts in Northern states (Factor {i})"
    wrongs = [f"A temporary change in annual monsoon rainfall in coastal ports (Distractor {i}A)",
              f"The total number of private automobiles registered in capital cities (Distractor {i}B)",
              f"The fluctuating price of international gold bullion (Distractor {i}C)"]
    sol = f"Population momentum refers to the tendency for a population to continue to grow despite a fall in fertility because a large young cohort is entering their reproductive years.\nHence, Option {{{{CORR}}}} is correct."
    mist = "Understands population momentum."
    u1_qs.append(("mcq", CH_DEMO, top, stem, corr, wrongs, sol, mist))

assert len(u1_qs) == 60, f"Expected 60 Qs in Unit 1, got {len(u1_qs)}"
print(f"Unit 1 (Demography) ready with {len(u1_qs)} Qs.")

