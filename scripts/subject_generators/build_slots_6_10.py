import json, os, sys

CH_INST = "Social Institutions: Continuity and Change"

slots = {}

# Slot 6: Caste Purity, Pollution & Louis Dumont (20 Qs)
s6 = []
s6.append(("mcq", CH_INST, "Homo Hierarchicus Thesis",
    "In his classic treatise *Homo Hierarchicus*, French sociologist Louis Dumont argued that the Indian caste system is organized fundamentally around:",
    "A religious and ritual opposition between the pure and the impure (purity and pollution)",
    ["A secular struggle between technological engineers and rural peasant farmers",
     "A modern capitalist division of labour based strictly on monetary income and banking credit",
     "A temporary colonial administrative scheme created solely for military taxation"],
    "Louis Dumont argued that caste hierarchy is fundamentally rooted in religious values of ritual purity vs pollution.\nHence, Option {{CORR}} is correct.",
    "Identifies Louis Dumont's core thesis in *Homo Hierarchicus*."))

s6.append(("stmt", CH_INST, "Ritual Purity and Occupational Hierarchy",
    "In traditional caste ideology, occupations associated with sacred rituals and vegetarianism were ranked ritually pure.",
    "Occupations involving organic bodily waste, leather, and animal disposal were classified as polluting and assigned to untouchable castes.", 1,
    "Both statements are correct: Ritual purity determined social rank, assigning sanitary and leather labor to the lowest polluting strata.\nHence, Option {{CORR}} is correct.",
    "Explains ritual purity and occupational division in caste hierarchy."))

s6.append(("ar", CH_INST, "Commensality and Caste Boundaries",
    "Commensality rules in the traditional caste system dictated who could eat food or drink water together.",
    "Upper castes observed strict commensal taboos to avoid ritual contamination from lower castes.", 1,
    "Both (A) and (R) are true, and (R) correctly explains (A). Commensal restrictions maintained boundaries between pure and impure castes.\nHence, Option {{CORR}} is correct.",
    "Explains the logic of commensal taboos in maintaining caste purity."))

s6.append(("match", CH_INST, "Caste Characteristics and Theorists",
    "Match the caste concepts in List I with their descriptions in List II:",
    [("A", "Varna"), ("B", "Jati"), ("C", "Endogamy"), ("D", "Commensality")],
    [("I", "Thousands of localized, regional hereditary groups"),
     ("II", "Pan-Indian four-fold scriptural textual classification"),
     ("III", "Strict rule mandating marriage within one's own caste group"),
     ("IV", "Social rules governing who can share food and water together")],
    "A-II, B-I, C-III, D-IV",
    "Varna is four-fold; Jati is localized; Endogamy is marriage within caste; Commensality is food sharing.\nHence, Option {{CORR}} is correct.",
    "Matches foundational caste concepts to standardized definitions."))

s6.append(("seq", CH_INST, "Varna Hierarchy from Highest to Lowest",
     "Arrange the four classical Varnas in scriptural hierarchical order from highest to lowest ritual precedence:",
     [("A", "Brahmin (Priestly and intellectual class)"),
      ("B", "Kshatriya (Ruler and warrior class)"),
      ("C", "Vaishya (Merchant, agriculturalist, and trader class)"),
      ("D", "Shudra (Artisan and service provider class)")],
     "A, B, C, D",
     "The scriptural Varna hierarchy ranks Brahmin first, followed by Kshatriya, Vaishya, and Shudra.\nHence, Option {{CORR}} is correct.",
     "Sequences the classical Varna hierarchy."))

# Remaining 15 items for Slot 6
s6_extras = [
    ("Ascription Principle", "In sociology, the principle of 'ascriptive status' in caste implies that status is determined strictly by:",
     "Accident of birth into a specific caste lineage, unalterable by personal achievement",
     ["Competitive civil service examinations taken at age eighteen", "The total monetary balance in an individual's commercial savings account", "The number of scientific patents registered by an individual"],
     "Caste status is purely ascriptive: an individual is born into a caste and cannot change it by individual achievement."),
    ("Bouglé's Caste Triad", "French sociologist Célestin Bouglé identified which three foundational principles characterizing the caste system?",
     "Hereditary specialization, hierarchical ranking, and mutual repulsion (separation through endogamy and contact taboos)",
     ["Universal democracy, free intermarriage, and state socialism", "Technological innovation, corporate mergers, and international stock trading", "Atheism, secular education, and military conscription"],
     "Célestin Bouglé defined caste by hereditary specialization, hierarchy, and mutual repulsion/separation."),
    ("Kaccha vs Pakka Food", "In traditional North Indian commensal sociology, what is the key distinction between 'Kaccha' and 'Pakka' food?",
     "Kaccha food (cooked in water) is subject to strict commensal taboos, while Pakka food (fried in ghee) is more widely acceptable across castes",
     ["Kaccha food is cooked by British chefs, while Pakka food is imported from China", "Kaccha food is strictly vegetarian, while Pakka food contains wild game", "Kaccha food is served only to infants, while Pakka food is served only to monks"],
     "Water-cooked (Kaccha) food transmits ritual pollution easily, whereas ghee-cooked (Pakka) food has greater cross-caste acceptability."),
    ("Jajmani System Definition", "In village sociology, the traditional 'Jajmani system' was essentially:",
     "An institutionalized non-market system of reciprocal economic and ritual services between landed patrons (Jajmans) and occupational service castes (Kamins)",
     ["A competitive corporate auction for purchasing agricultural harvesting combines", "An international maritime barter network operating across the Indian Ocean", "A municipal council mechanism for electing district court judges"],
     "The Jajmani system was a hereditary patron-client relationship exchanging goods and agricultural grain for ritual and craft services."),
    ("Decline of Jajmani System", "What modern structural factor contributed most decisively to the dissolution of the traditional Jajmani system in rural India?",
     "The penetration of the money economy, market competition, and cheap manufactured factory substitutes for village handicrafts",
     ["A constitutional amendment banning all agricultural farming in northern India", "The complete physical drying up of all major rivers across the Indian subcontinent", "A sudden decision by all Indian farmers to emigrate to Canada in the 1950s"],
     "Monetisation, market alternatives, and factory consumer goods broke the hereditary dependencies of the Jajmani system."),
    ("G.S. Ghurye on Caste Features", "In his authoritative 1932 study *Caste and Race in India*, sociologist G.S. Ghurye formulated how many core features of caste?",
     "Six foundational features (segmental division, hierarchy, commensal restrictions, religious disabilities, lack of occupation choice, endogamy)",
     ["Twenty-four international economic laws", "Two administrative corporate guidelines", "Fifty-two military defense protocols"],
     "G.S. Ghurye identified six classic structural features of caste in *Caste and Race in India*."),
    ("Caste and Spatial Segregation", "How did traditional spatial organization in Indian villages reflect caste hierarchy?",
     "Untouchable and lower service castes were segregated into separate hamlets (Cheris/Bastis) located on the periphery or downwind of the main village",
     ["All households were assigned identical apartments in high-rise concrete skyscrapers", "Upper castes resided permanently in underground bunkers during monsoon seasons", "Village housing was redistributed by a computer lottery every five years"],
     "Spatial segregation relegated Dalits to the village outskirts to prevent physical shadow pollution and enforce subordination."),
    ("Shadow Pollution Practice", "In extreme historical forms of untouchability in pre-colonial Kerala (Travancore), 'distance pollution' required:",
     "Certain oppressed castes (like Nayadis and Pulayans) to maintain a prescribed distance of thirty to sixty paces from upper-caste Namboodiris to avoid polluting them",
     ["Upper castes to bow respectfully whenever a lower-caste farmer entered the marketplace", "Every village resident to carry a colored umbrella to identify their university degree", "All agricultural land to be vacated whenever a British merchant ship arrived"],
     "Distance pollution (or shadow pollution) forced Dalits to maintain specified physical distances from high-caste persons."),
    ("Caste and Colonial Census 1901", "The 1901 Census directed by Sir Herbert Risley attempted to rank castes based on:",
     "'Social precedence as recognized by native public opinion', which provoked competitive assertions of status by hundreds of caste associations",
     ["The exact speed at which caste members could run a marathon", "The total number of private aircraft owned by caste leaders", "The amount of gold deposited in the Bank of England"],
     "Risley's attempt to rank castes by social precedence codified status and catalyzed caste sabha mobilization."),
    ("Sub-caste / Upajati Concept", "In everyday rural social practice, what is the effective, operational unit of marriage and endogamy?",
     "The sub-caste (Upajati or sub-division of Jati), rather than the broad Varna category",
     ["The entire national linguistic province", "The membership of an all-India political party", "The alumni association of an agricultural high school"],
     "The effective unit of social interaction, commensality, and endogamy in Indian society is the localized sub-caste."),
    ("Hierarchy vs Stratification Distinction", "In Louis Dumont's comparative sociology, how does traditional Indian 'Hierarchy' differ from Western 'Stratification'?",
     "Hierarchy is based on holistic religious values of pure and impure, whereas Western stratification is based on individualistic economic and political power",
     ["Hierarchy applies strictly to feudal European monarchies, while stratification applies to Asian tribes", "Hierarchy is determined by university degrees, while stratification is determined by athletic medals", "There is zero sociological difference between the two concepts"],
     "Dumont contrasted homo hierarchicus (holistic religious hierarchy) with homo aequalis (individualistic Western equality/stratification)."),
    ("Commensality: Pakka Food Exceptions", "Why was 'Pakka' food (cooked in clarified butter/ghee) allowed across broader caste lines than 'Kaccha' food?",
     "Ghee (clarified butter) is a sacred dairy product of the holy cow, believed to possess powerful ritual purifying qualities that protect against pollution",
     ["Ghee was imported from foreign colonial kingdoms and lacked Indian religious classification", "Pakka food was consumed exclusively during secret political rebellion meetings", "Pakka food had zero caloric nutritional value and was not considered real food"],
     "The purifying properties of ghee (derived from the sacred cow) shielded Pakka food from ritual contamination."),
    ("Endogamy as Caste Fortress", "Sociologists consider endogamy (marriage within the group) to be the 'crucial fortress' of caste because:",
     "It strictly regulates female sexuality and prevents the biological and social mingling of caste lineages",
     ["It guarantees that all children born in the village will become professional computer programmers", "It forces all married couples to live in state-owned government hostels", "It prohibits husbands and wives from speaking the same regional dialect"],
     "Endogamy preserves purity, maintains lineage boundaries, and controls female sexuality to reproduce the caste system."),
    ("Untouchability as Extreme Asymmetry", "In sociological terms, untouchability is not merely ritual distance, but a structural system of:",
     "Extreme exploitation, denial of basic human rights, forced unpaid labour (begar), and ritual humiliation",
     ["Voluntary religious asceticism chosen by individuals seeking spiritual enlightenment", "An affirmative welfare benefit designed to exempt workers from government taxes", "A temporary educational apprenticeship for training future village headmen"],
     "Untouchability combines economic exploitation (begar/landlessness) with ritual humiliation and civic exclusion."),
    ("Hypergamy (Anuloma) in Caste", "In traditional scriptural caste jurisprudence, an 'Anuloma' (hypergamous) marriage occurs when:",
     "A man of a higher Varna/caste marries a woman of a lower Varna/caste",
     ["A woman of a higher Varna marries a man of a lower Varna", "Two individuals of identical Gotra marry each other in secret", "A Brahmin marries a foreign merchant without performing any religious rites"],
     "Anuloma is hypergamy (higher man, lower woman), whereas Pratiloma (higher woman, lower man) was strictly condemned.")
]
for item in s6_extras:
    top, stem, corr, wrongs, sol = item
    s6.append(("mcq", CH_INST, top, stem, corr, wrongs, sol + "\nHence, Option {{CORR}} is correct.", f"Accurately analyzes {top}."))

assert len(s6) == 20
slots[6] = s6
print("Slot 6 created with 20 items.")

