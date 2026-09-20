import json, os, sys

CH_DEMO = "The Demographic Structure of the Indian Society"
CH_INST = "Social Institutions: Continuity and Change"

slots = {}

# Slot 5: Population Policies & Census History
s5 = []
# 20 distinct questions on population policies
s5.append(("mcq", CH_DEMO, "First National Family Planning Programme",
    "Which country was the first in the world to launch an official state-sponsored National Family Planning Programme in 1952?",
    "India", ["China", "United States", "Japan"],
    "India launched the world's first official National Family Planning Programme in 1952.\nHence, Option {{CORR}} is correct.",
    "Recalls India's historic priority in national family planning."))

s5.append(("mcq", CH_DEMO, "National Population Policy 2000 Focus",
    "What is the central guiding principle of the National Population Policy (NPP) 2000?",
    "Target-free voluntary approach focusing on reproductive health, maternal care, and informed contraception choice",
    ["Compulsory sterilization of all citizens with more than two children enforced by state police",
     "A complete statutory ban on female education to increase rural fertility rates",
     "Mandatory deportation of rural migrant families to foreign agricultural colonies"],
    "NPP 2000 affirmed a voluntary, target-free approach prioritizing comprehensive reproductive and child health.\nHence, Option {{CORR}} is correct.",
    "Identifies NPP 2000 target-free paradigm."))

s5.append(("stmt", CH_DEMO, "Emergency Family Planning Coercion",
     "During the 1975-1977 National Emergency, sterilization targets were aggressively enforced through administrative coercion.",
     "The public backlash against Emergency sterilization abuses led to a political rout of the ruling party in the 1977 elections.", 1,
     "Both statements are correct: Coercive mass vasectomy drives caused severe public outrage, contributing to the 1977 electoral defeat.\nHence, Option {{CORR}} is correct.",
     "Analyzes political consequences of Emergency sterilization drives."))

s5.append(("ar", CH_DEMO, "Renaming of Family Planning Programme",
     "In 1977, the Ministry of Health and Family Planning was renamed the Ministry of Health and Family Welfare.",
     "The government sought to distance the national programme from the coercive excesses of the Emergency and emphasize broader family welfare.", 1,
     "Both (A) and (R) are true, and (R) correctly explains (A). The shift to 'Family Welfare' signaled a holistic, non-coercive approach.\nHence, Option {{CORR}} is correct.",
     "Explains the rationale for renaming Family Planning to Family Welfare."))

s5.append(("match", CH_DEMO, "Historical Population Policy Milestones",
     "Match the population policy milestones in List I with their corresponding years in List II:",
     [("A", "Launch of National Family Planning Programme"), ("B", "National Emergency sterilization drives"), ("C", "Enactment of PCPNDT Act"), ("D", "Adoption of National Population Policy (NPP)")],
     [("I", "1952"), ("II", "1975-1977"), ("III", "1994"), ("IV", "2000")],
     "A-I, B-II, C-III, D-IV",
     "Family Planning launched in 1952; Emergency drives in 1975-77; PCPNDT enacted in 1994; NPP adopted in 2000.\nHence, Option {{CORR}} is correct.",
     "Matches policy milestones to historical years."))

s5.append(("seq", CH_DEMO, "Evolution of Population Planning in India",
     "Arrange the historical phases of population policy in India in chronological order:",
     [("A", "Launch of clinical-approach family planning programme"),
      ("B", "Target-oriented extension approach and camp vasectomy drives"),
      ("C", "Coercive mass sterilization quotas during the National Emergency"),
      ("D", "Adoption of target-free Reproductive and Child Health (RCH) approach under NPP 2000")],
     "A, B, C, D",
     "Policy evolved from clinical (1950s) to extension/camps (1960s), coercive Emergency (1975-77), and voluntary RCH (2000).\nHence, Option {{CORR}} is correct.",
     "Sequences historical phases of population planning."))

# Remaining 14 distinct items for Slot 5
s5_extras = [
    ("First synchronous Census of India", "In which year was the first synchronous, all-India decennial Census conducted under British rule?",
     "1881", ["1857", "1901", "1947"], "The first complete synchronous Census across British India occurred in 1881 under W.C. Plowden."),
    ("Census Authority in Independent India", "Under which ministry of the Government of India does the Office of the Registrar General and Census Commissioner operate?",
     "Ministry of Home Affairs", ["Ministry of Finance", "Ministry of External Affairs", "Ministry of Agriculture"], "The Census Commissioner functions under the Ministry of Home Affairs."),
    ("National Rural Health Mission (NRHM)", "The National Rural Health Mission launched in 2005 introduced which community health activist at the village level?",
     "Accredited Social Health Activist (ASHA)", ["Gram Panchayat Police Officer", "Private Insurance Broker", "Block Revenue Collector"], "ASHAs serve as female community health activists linking villages to primary healthcare."),
    ("Total Fertility Rate in NFHS-5", "According to the National Family Health Survey-5 (2019-21), India's Total Fertility Rate (TFR) has reached:",
     "2.0 (below replacement level)", ["3.5", "4.2", "1.2"], "NFHS-5 recorded a national TFR of 2.0, dropping below replacement level of 2.1 for the first time."),
    ("Janani Suraksha Yojana Objective", "What is the primary operational objective of the Janani Suraksha Yojana (JSY)?",
     "To promote institutional deliveries among poor pregnant women through conditional cash transfers", ["To build multi-lane expressways between rural hospitals", "To export pharmaceutical drugs to overseas markets", "To mandate home deliveries without trained doctors"], "JSY provides cash incentives to reduce maternal and neonatal mortality via institutional delivery."),
    ("Pre-1881 Census Operations", "The first attempt at a nationwide population count in India was initiated under Lord Mayo in which period?",
     "1867-1872", ["1813-1815", "1921-1925", "1945-1950"], "The non-synchronous first Census was taken between 1867 and 1872 under Viceroy Lord Mayo."),
    ("Population Stabilization Fund", "What is the Hindi name of the autonomous National Population Stabilization Fund established by the Government of India?",
     "Jansankhya Sthirata Kosh (JSK)", ["Pradhan Mantri Gram Sadak Yojana", "Rashtriya Mahila Kosh", "Antyodaya Anna Yojana"], "Jansankhya Sthirata Kosh is the National Population Stabilization Fund promoting family welfare."),
    ("Census Act 1948", "Which statutory legislation provides the permanent legal framework for conducting the decennial Census in independent India?",
     "The Census Act, 1948", ["The Indian Penal Code, 1860", "The Representation of the People Act, 1951", "The Disaster Management Act, 2005"], "The Census Act 1948, piloted by Sardar Vallabhbhai Patel, governs decennial censuses."),
    ("SRS Mechanism", "What is the full form and function of the 'SRS' used by the Registrar General to measure annual vital rates in India?",
     "Sample Registration System (SRS) which provides dual-record annual estimates of birth and death rates", ["Standard Railway Service", "Secondary Revenue Source", "State Rehabilitation Scheme"], "SRS is a dual-record system providing reliable annual fertility and mortality data."),
    ("Two-Child Norm in Local Elections", "In sociological debates, why has the 'two-child norm' for contesting local Panchayat elections been criticized?",
     "It disproportionately disqualifies women, Dalits, and poorer citizens who have less reproductive autonomy", ["It forces village sarpanches to abandon agriculture", "It bans all male candidates from entering municipal buildings", "It requires all elected leaders to hold foreign university degrees"], "The two-child norm in local polls often leads to desertion of wives or female foeticide to maintain political eligibility."),
    ("Socio-Economic and Caste Census 2011", "How did the Socio-Economic and Caste Census (SECC) 2011 fundamentally differ from the regular decennial Census?",
     "SECC was an open enumeration to identify beneficiary households for welfare entitlements, unlike the confidential statutory Census", ["SECC was conducted exclusively in foreign embassies", "SECC counted only domestic animals and pets", "SECC had zero government funding"], "SECC 2011 collected non-confidential socio-economic data used for ranking welfare beneficiaries."),
    ("Hum Do Hamare Do Slogan", "During the 1960s and 1970s, which popular slogan accompanied the red inverted triangle symbol of India's family planning campaign?",
     "'Hum Do, Hamare Do' (We Two, Our Two)", ["'Jai Jawan, Jai Kisan'", "'Garibi Hatao'", "'Satyameva Jayate'"], "'Hum Do, Hamare Do' and the inverted red triangle symbolized the two-child family norm."),
    ("Demographic Goal of NPP 2000", "What long-term demographic goal was set by the National Population Policy 2000 for achieving a stable population?",
     "Achieving a stable population by the year 2045", ["Doubling the population every ten years", "Zero total births nationwide by 2010", "Mandatory emigration of five million citizens annually"], "NPP 2000 targeted population stabilization at replacement level by 2045."),
    ("Caste Enumeration History in Census", "When was the last time complete caste-wise data for all social groups was published in the British Indian Census?",
     "1931 Census", ["1951 Census", "1971 Census", "2001 Census"], "The 1931 Census under J.H. Hutton was the last to publish comprehensive caste-wise enumeration for all communities.")
]
for item in s5_extras:
    top, stem, corr, wrongs, sol = item
    s5.append(("mcq", CH_DEMO, top, stem, corr, wrongs, sol + "\nHence, Option {{CORR}} is correct.", f"Accurately recalls {top}."))

assert len(s5) == 20
slots[5] = s5
print(f"Slot 5 created with {len(s5)} items.")

