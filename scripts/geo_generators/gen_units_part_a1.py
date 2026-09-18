import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.geo_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, make_multi_statement_question,
    rotate_options, normalize_text, get_pyq_normalized_set
)

pyq_seen = get_pyq_normalized_set()
global_seen = set()

def validate_and_collect(q_list, target_seen):
    for q in q_list:
        norm = normalize_text(q["questionText"])
        if norm in target_seen:
            raise ValueError(f"Duplicate within unit: {q['questionText'][:80]}")
        if norm in global_seen:
            raise ValueError(f"Cross-unit duplicate: {q['questionText'][:80]}")
        if norm in pyq_seen:
            raise ValueError(f"PYQ duplicate: {q['questionText'][:80]}")
        target_seen.add(norm)
        global_seen.add(norm)
        assert len(q["options"]) == 4
        assert q["correctOption"] in ["A", "B", "C", "D"]
        assert any(opt["id"] == q["correctOption"] and opt["isCorrect"] for opt in q["options"])
        assert q["detailedSolution"]

# =================================================================================================
# UNIT 1: Human Geography: Nature and Scope (40 Questions)
# =================================================================================================
CHAPTER_U1 = "Human Geography: Nature and Scope"
u1_qs = []
u1_seen = set()

def add_u1(q):
    u1_qs.append(q)

# Q1: Definition by Ratzel
opts, c, s = rotate_options(
    "Friedrich Ratzel",
    ["Ellen C. Semple", "Paul Vidal de la Blache", "Griffith Taylor"],
    "A",
    "Friedrich Ratzel, known as the father of modern human geography, defined it as: 'Human geography is the synthetic study of relationship between human societies and earth’s surface.' Synthesis was given emphasis in his definition.\nHence, Option {{CORR}} is correct.",
    "Correctly identifies Friedrich Ratzel's synthetic definition of human geography."
)
add_u1(make_question(CHAPTER_U1, "Definitions of Human Geography", "Who defined human geography as 'the synthetic study of relationship between human societies and earth’s surface'?", opts, c, s))

# Q2: Definition by Ellen Semple
opts, c, s = rotate_options(
    "Ellen C. Semple",
    ["Friedrich Ratzel", "Paul Vidal de la Blache", "Alexander von Humboldt"],
    "B",
    "Ellen C. Semple, an American geographer and student of Ratzel, defined human geography dynamically: 'Human geography is the study of the changing relationship between the unresting man and the unstable earth.' Dynamism in the relationship is the keyword in her definition.\nHence, Option {{CORR}} is correct.",
    "Correctly attributes the dynamic definition of human geography to Ellen C. Semple."
)
add_u1(make_question(CHAPTER_U1, "Definitions of Human Geography", "The definition 'Human geography is the study of the changing relationship between the unresting man and the unstable earth' was propounded by which geographer?", opts, c, s))

# Q3: Definition by Vidal de la Blache
opts, c, s = rotate_options(
    "Paul Vidal de la Blache",
    ["Carl Sauer", "Richard Hartshorne", "Griffith Taylor"],
    "C",
    "French geographer Paul Vidal de la Blache conceived human geography as offering a new conception: 'Conception resulting from a more synthetic knowledge of the physical laws governing our earth and of the relations between the living beings which inhabit it.'\nHence, Option {{CORR}} is correct.",
    "Identifies Paul Vidal de la Blache as the proponent of the conception highlighting synthetic knowledge of physical laws and living beings."
)
add_u1(make_question(CHAPTER_U1, "Definitions of Human Geography", "Who offered the concept of human geography resulting from 'a more synthetic knowledge of the physical laws governing our earth and of the relations between the living beings which inhabit it'?", opts, c, s))

# Q4: Environmental Determinism
opts, c, s = rotate_options(
    "Human beings are completely passive agents adapted to the dictates of nature with low level of technological development",
    ["Humans actively modify nature using advanced technology without any ecological constraints", "Nature and humans exist in complete isolation without any interaction", "Humans possess infinite power to alter weather and landforms at will"],
    "D",
    "In the stage of primitive human society, human technology was very basic and human beings listened to nature, were afraid of its fury, and worshipped it. This state of absolute necessity and passive adaptation is termed Environmental Determinism.\nHence, Option {{CORR}} is correct.",
    "Accurately explains the core premise of Environmental Determinism in early human society."
)
add_u1(make_question(CHAPTER_U1, "Environmental Determinism", "Which of the following statements best describes the concept of 'Environmental Determinism' in human geography?", opts, c, s))

# Q5: Possibilism
opts, c, s = rotate_options(
    "Nature provides opportunities and humans make use of these as they develop technology and culture",
    ["Nature dictates all human actions and cultural choices strictly", "Humans can operate in complete defiance of physical laws without any consequence", "Human society cannot survive outside sub-tropical rainforest ecosystems"],
    "A",
    "With social and cultural development, humans develop better and more efficient technology. They move from a state of necessity to a state of freedom, creating possibilities with the resources obtained from nature. Nature gets humanised, which is called Possibilism.\nHence, Option {{CORR}} is correct.",
    "Identifies Possibilism where nature provides opportunities and humans create possibilities."
)
add_u1(make_question(CHAPTER_U1, "Possibilism", "The concept of 'Possibilism' in human geography posits that:", opts, c, s))

# Q6: Neo-determinism / Stop and Go Determinism
opts, c, s = rotate_options(
    "Griffith Taylor",
    ["Halford Mackinder", "Carl Ritter", "W.M. Davis"],
    "B",
    "Griffith Taylor introduced the concept of Neo-determinism or 'Stop and Go Determinism'. It reflects a middle path between environmental determinism and possibilism, asserting that humans can conquer nature only by obeying her laws.\nHence, Option {{CORR}} is correct.",
    "Identifies Griffith Taylor as the creator of Neo-determinism."
)
add_u1(make_question(CHAPTER_U1, "Neo-Determinism", "The concept of 'Neo-Determinism' or 'Stop-and-Go Determinism' was introduced by which eminent geographer?", opts, c, s))

# Q7: Traffic light analogy in Neo-determinism
opts, c, s = rotate_options(
    "Red light signifies stop, amber/yellow signifies get ready, and green light signifies go",
    ["Red signifies accelerate, yellow signifies complete halt, green signifies reverse", "Signals represent random political borders rather than ecological thresholds", "Green signifies unconditional unlimited resource extraction without halt"],
    "C",
    "Griffith Taylor explained Neo-determinism using city traffic lights: Red means stop, Amber means get ready, and Green means go. It signifies that possibilities can be created within limits which do not damage the environment, avoiding reckless greenhouse warming or ozone depletion.\nHence, Option {{CORR}} is correct.",
    "Explains Taylor's traffic signal metaphor representing sustainable environmental boundaries."
)
add_u1(make_question(CHAPTER_U1, "Neo-Determinism", "In Griffith Taylor's 'Stop and Go Determinism', what does the traffic signal analogy demonstrate?", opts, c, s))

# Q8: Welfare or Humanistic School
opts, c, s = rotate_options(
    "Social well-being of the people, including aspects like housing, health, and education",
    ["Exploitation of mineral reserves strictly for military conquest", "Purely statistical quantitative modeling of spatial geometry", "The total negation of human consciousness in regional mapping"],
    "D",
    "Welfare or humanistic school of thought in human geography was mainly concerned with the different aspects of social well-being of the people, including housing, healthcare, and education.\nHence, Option {{CORR}} is correct.",
    "Correctly highlights social well-being (housing, health, education) as the welfare school focus."
)
add_u1(make_question(CHAPTER_U1, "Schools of Thought", "The 'Welfare or Humanistic School' of thought in human geography is primarily concerned with which dimension?", opts, c, s))

# Q9: Radical School
opts, c, s = rotate_options(
    "Marxian theory to explain basic causes of poverty, deprivation, and social inequality",
    ["Classical Keynesian macroeconomic monetary intervention", "Darwinian natural selection applied directly to urban planning", "Mercantile balance of trade surplus accumulation"],
    "A",
    "Radical school of thought employed Marxian theory to explain the basic cause of poverty, deprivation, and social inequality. Contemporary social problems were related to the development of capitalism.\nHence, Option {{CORR}} is correct.",
    "Identifies Marxian theory as the foundational basis of the Radical School."
)
add_u1(make_question(CHAPTER_U1, "Schools of Thought", "The 'Radical School' of thought in human geography employed which theoretical framework to explain poverty and inequality?", opts, c, s))

# Q10: Behavioural School
opts, c, s = rotate_options(
    "Lived experience and perception of space by social categories based on ethnicity, race, and religion",
    ["Strict deterministic climate control over human brain volume", "Macroeconomic input-output econometric matrix optimization", "Automated satellite remote sensing algorithms exclusively"],
    "B",
    "Behavioural school of thought laid great emphasis on lived experience and also on the perception of space by social categories based on ethnicity, race, religion, etc.\nHence, Option {{CORR}} is correct.",
    "Identifies lived experience and perception of space in the Behavioural School."
)
add_u1(make_question(CHAPTER_U1, "Schools of Thought", "What was the central focus of the 'Behavioural School' of thought in human geography during the 1970s?", opts, c, s))

# Q11: Quantitative Revolution
opts, c, s = rotate_options(
    "Late 1950s to the late 1960s",
    ["Early colonial period (15th century)", "Inter-war period of 1930s", "Post-1990s post-modern era"],
    "C",
    "During the late 1950s to the late 1960s, the application of computers and sophisticated statistical tools led to the Quantitative Revolution, emphasizing spatial analysis and physics laws applied to map human patterns.\nHence, Option {{CORR}} is correct.",
    "Identifies late 1950s to late 1960s as the period of the Quantitative Revolution."
)
add_u1(make_question(CHAPTER_U1, "Quantitative Revolution", "During which period did the 'Quantitative Revolution' in geography take place, characterized by extensive use of statistical tools and spatial analysis?", opts, c, s))

# Q12: Areal Differentiation
opts, c, s = rotate_options(
    "Focuses on identifying the uniqueness of any region and understanding how and why it is different from others",
    ["Treats all global spaces as uniform homogeneous isotropic plains", "Eliminates all study of physical landscape variations", "Maps only international maritime shipping traffic"],
    "D",
    "Areal differentiation, prominent during the inter-war period (1930s), focuses on understanding the uniqueness of any region, explaining why and how one particular area differs from another.\nHence, Option {{CORR}} is correct.",
    "Defines Areal Differentiation as the study of the uniqueness of specific regions."
)
add_u1(make_question(CHAPTER_U1, "Approaches in Geography", "What is the primary objective of the 'Areal Differentiation' approach in human geography?", opts, c, s))

# Q13: Match Schools of Thought with Core Ideology
add_u1(make_match_question(
    CHAPTER_U1, "Schools of Thought",
    "Match List I (School of Thought) with List II (Central Focus / Theory):",
    [("A", "Welfare / Humanistic School"), ("B", "Radical School"), ("C", "Behavioural School"), ("D", "Neo-Determinism")],
    [("I", "Marxian theory addressing poverty and capitalism"), ("II", "Social well-being: housing, health, and education"), ("III", "Middle path between absolute necessity and absolute freedom"), ("IV", "Lived experience and perception of space based on social identity")],
    "A-II, B-I, C-IV, D-III", "A",
    "Welfare school emphasizes social well-being (II); Radical school uses Marxian theory to address inequalities of capitalism (I); Behavioural school analyzes lived perception of space (IV); Neo-determinism provides a balanced middle path (III).",
    "Correctly matches human geography schools to their core frameworks."
))

# Q14: Match Geographers with Statements/Approaches
add_u1(make_match_question(
    CHAPTER_U1, "Foundational Thinkers",
    "Match List I (Geographers) with List II (Concepts / Contributions):",
    [("A", "Friedrich Ratzel"), ("B", "Ellen C. Semple"), ("C", "Paul Vidal de la Blache"), ("D", "Griffith Taylor")],
    [("I", "Changing relationship between unresting man and unstable earth"), ("II", "Stop-and-go determinism / Neo-determinism"), ("III", "Synthetic study of relationship between human societies and earth's surface"), ("IV", "Possibilism and synthetic knowledge of earth's physical laws")],
    "A-III, B-I, C-IV, D-II", "B",
    "Ratzel provided the synthetic definition (III); Semple highlighted unresting man and unstable earth (I); Vidal de la Blache was the father of possibilism (IV); Taylor propounded Stop-and-Go determinism (II).",
    "Correctly matches famous geographers with their foundational definitions."
))

# Q15: Statement Question on Environmental Determinism vs Possibilism
add_u1(make_statement_question(
    CHAPTER_U1, "Theoretical Paradigms",
    "Environmental determinism characterizes societies where human technology is at a very low level and nature is worshipped as a formidable force.",
    "Possibilism suggests that humans move from a state of freedom back to an inescapable state of natural necessity.",
    3, "C",
    "Statement I is correct as environmental determinism depicts low technological development and reverence/fear of nature. Statement II is incorrect because possibilism describes the transition from a state of necessity to a state of freedom where possibilities are carved out.",
    "Correctly evaluates the definitions of environmental determinism and possibilism."
))

# Q16: Assertion-Reason on Neo-Determinism
add_u1(make_assertion_question(
    CHAPTER_U1, "Neo-Determinism",
    "Griffith Taylor's concept of Neo-determinism rejects both absolute environmental determinism and reckless possibilism.",
    "Neo-determinism asserts that human beings can conquer nature only by obeying its ecological limits and physical laws.",
    1, "A",
    "Assertion is true: Neo-determinism charts a middle path between fatalistic determinism and careless possibilism. Reason is true and correctly explains the assertion: humanity cannot bypass nature's laws without catastrophic consequences like global warming or desertification.",
    "Recognizes Neo-determinism as an ecologically sound middle path."
))

# Q17: Sequence of Historical Approaches
add_u1(make_sequence_question(
    CHAPTER_U1, "Evolution of Human Geography",
    "Arrange the following approaches to human geography in chronological sequence of their emergence:",
    [("A", "Spatial Organisation and Quantitative Revolution"), ("B", "Exploration and Description"), ("C", "Post-Modernism in Geography"), ("D", "Areal Differentiation")],
    "B, D, A, C", "D",
    "1. Exploration and description was dominant in the early colonial period (B).\n2. Areal differentiation developed in the inter-war 1930s (D).\n3. Spatial organisation and quantitative revolution peaked in late 1950s-1960s (A).\n4. Post-modernism emerged in the 1990s (C).",
    "Orders the historical approaches of human geography chronologically."
))

# Q18: Benda's Story / Primitive Society
opts, c, s = rotate_options(
    "Abujhmarh area of central India",
    ["Thar Desert of Rajasthan", "Sundarbans delta of West Bengal", "Rann of Kuchchh in Gujarat"],
    "A",
    "In NCERT, Benda lives in the wilds of the Abujhmarh area of central India. His tribe practices shifting agriculture (penda) using forest produce, epitomizing direct harmony with nature under environmental determinism.\nHence, Option {{CORR}} is correct.",
    "Identifies the Abujhmarh region of central India associated with Benda's narrative."
)
add_u1(make_question(CHAPTER_U1, "Humanisation of Nature and Naturalisation of Humans", "In the NCERT case study illustrating 'Naturalisation of Humans', in which forest region does Benda live?", opts, c, s))

# Q19: Kari's Narrative / Technology
opts, c, s = rotate_options(
    "Trondheim, Norway",
    ["Zurich, Switzerland", "Stockholm, Sweden", "Reykjavik, Iceland"],
    "B",
    "Kari lives in the city of Trondheim in Norway. Despite fierce sub-arctic winter winds, glass skylights, central heating, and artificial greenhouses allow normal life, showcasing possibilism and the humanisation of nature.\nHence, Option {{CORR}} is correct.",
    "Identifies Trondheim, Norway in Kari's case study of possibilism."
)
add_u1(make_question(CHAPTER_U1, "Possibilism", "In the NCERT illustration of 'Humanisation of Nature', Kari resides in which sub-arctic city using advanced comfort technologies?", opts, c, s))

# Q20: Multi-statement on Technology and Nature
add_u1(make_multi_statement_question(
    CHAPTER_U1, "Nature and Technology",
    "Which of the following statements regarding the interaction between technology and nature are correct?",
    [
        ("A", "Technology indicates the level of cultural development of society."),
        ("B", "Understanding the secrets of DNA and genetics enabled humans to conquer many infectious diseases."),
        ("C", "Friction and heat concepts helped humans discover fire."),
        ("D", "Human beings can create advanced technology without understanding natural laws.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B), (C) and (D) only", "(A), (B), (C) and (D)"],
    "C",
    "Statements A, B, and C are correct according to NCERT. Statement D is false because humans can develop technology only after they understand natural laws (e.g. laws of aerodynamics help fly planes).",
    "Identifies the fundamental link between understanding natural laws and technological innovation."
))

# Q21: Sub-fields of Social Geography
opts, c, s = rotate_options(
    "Behavioral Geography, Geography of Social Well-being, and Historical Geography",
    ["Military Geography and Electoral Geography", "Agricultural Geography and Marketing Geography", "Hydrology and Geomorphology"],
    "D",
    "Social Geography includes sub-fields such as Behavioral Geography, Geography of Social Well-being, Geography of Leisure, Cultural Geography, Gender Geography, and Historical Geography.\nHence, Option {{CORR}} is correct.",
    "Identifies sub-fields belonging to Social Geography."
)
add_u1(make_question(CHAPTER_U1, "Fields and Sub-fields", "Which of the following sub-fields belong specifically to the broader domain of 'Social Geography'?", opts, c, s))

# Q22: Sub-fields of Political Geography
opts, c, s = rotate_options(
    "Electoral Geography and Military Geography",
    ["Geography of Tourism and Geography of Resources", "Pedology and Oceanography", "Plant Geography and Zoo Geography"],
    "A",
    "Political Geography encompasses Electoral Geography and Military Geography as its two specialized sub-fields.\nHence, Option {{CORR}} is correct.",
    "Correctly categorizes Electoral and Military Geography under Political Geography."
)
add_u1(make_question(CHAPTER_U1, "Fields and Sub-fields", "What are the two prominent sub-fields of 'Political Geography' listed in NCERT?", opts, c, s))

# Q23: Sub-fields of Economic Geography
opts, c, s = rotate_options(
    "Geography of Agriculture, Industries, Marketing, Tourism, and International Trade",
    ["Historical Geography and Demography", "Electoral Geography and Urban Planning", "Biogeography and Climatology"],
    "B",
    "Economic Geography interfaces with Economics and includes Geography of Resources, Agriculture, Industries, Marketing, Tourism, and International Trade.\nHence, Option {{CORR}} is correct.",
    "Identifies sub-fields of Economic Geography."
)
add_u1(make_question(CHAPTER_U1, "Fields and Sub-fields", "Which of the following constitute the sub-fields of 'Economic Geography'?", opts, c, s))

# Q24: Dichotomy in Geography
opts, c, s = rotate_options(
    "Systematic geography versus Regional geography",
    ["Only maritime cartography versus aerial photography", "Pre-historic archaeology versus palaeontology", "Astrophysics versus molecular biochemistry"],
    "C",
    "A major intellectual dichotomy in geography has been between Systematic (nomothetic/law-making) Geography and Regional (idiographic/descriptive) Geography, as well as between physical and human aspects.\nHence, Option {{CORR}} is correct.",
    "Identifies the systematic vs regional dichotomy in geography."
)
add_u1(make_question(CHAPTER_U1, "Nature of Geography", "Which of the following represents a classic dichotomy that characterized the evolution of geographic discipline?", opts, c, s))

# Q25: Nomothetic vs Idiographic
opts, c, s = rotate_options(
    "Nomothetic refers to law-making/universal principles, while Idiographic refers to individual descriptive case studies",
    ["Nomothetic refers exclusively to marine mapping, while Idiographic refers to desert soils", "Nomothetic is purely historical, while Idiographic is exclusively future projection", "Both terms are identical and refer to computer-based GIS software"],
    "D",
    "In geographical methodology, nomothetic refers to formulating universal laws and general propositions, whereas idiographic focuses on the unique and descriptive study of specific places or regions.\nHence, Option {{CORR}} is correct.",
    "Accurately distinguishes between nomothetic (law-making) and idiographic (descriptive) approaches."
)
add_u1(make_question(CHAPTER_U1, "Methodology", "What is the distinction between 'Nomothetic' and 'Idiographic' approaches in the study of geography?", opts, c, s))

# Q26: Post-modernism in Geography
opts, c, s = rotate_options(
    "Questioned grand generalizations and universal theories, emphasizing local context and plural perspectives",
    ["Advocated strict Newtonian mathematical laws for all human behavior", "Banned all regional fieldwork and ethnographic documentation", "Asserted that climate completely governs human economic income"],
    "A",
    "Post-modernism in geography, arising in the 1990s, was characterized by questioning the grand generalizations and universal claims of modern science, highlighting the relevance of local contexts and historical contingencies.\nHence, Option {{CORR}} is correct.",
    "Explains post-modernism's skepticism toward grand universal theories in geography."
)
add_u1(make_question(CHAPTER_U1, "Recent Trends", "What was the distinguishing hallmark of 'Post-Modernism' in human geography during the 1990s?", opts, c, s))

# Q27: Statement on Griffith Taylor's Philosophy
add_u1(make_statement_question(
    CHAPTER_U1, "Neo-Determinism",
    "Griffith Taylor argued that humans can accelerate, slow down, or stop the pace of a country's development, but cannot deviate from the direction dictated by the physical environment.",
    "Neo-determinism claims that nature has no control whatsoever over human agricultural or industrial productivity.",
    3, "B",
    "Statement I is correct: Taylor's famous analogy compares man to a traffic controller who can alter the pace but not the direction of nature's constraints. Statement II is incorrect: Neo-determinism explicitly recognizes natural limits.",
    "Analyzes Griffith Taylor's premise of man altering pace but obeying nature's direction."
))

# Q28: Spatial Organisation Approach
opts, c, s = rotate_options(
    "Marked by the use of computers, quantitative tools, and physics laws to map spatial patterns",
    ["Characterized by descriptive travelogue accounts of early European sailors", "Focuses exclusively on poetic romanticism of nature", "Replaced all mathematical concepts with religious scriptures"],
    "C",
    "The spatial organisation phase (late 1950s to late 1960s) used computers, statistical methods, and spatial models to map patterns of human activities and settlements.\nHence, Option {{CORR}} is correct.",
    "Identifies the key features of the spatial organisation approach."
)
add_u1(make_question(CHAPTER_U1, "Spatial Organisation", "What were the primary analytical tools utilized during the 'Spatial Organisation' phase of geography?", opts, c, s))

# Q29: Match Fields with Sister Social Science Disciplines
add_u1(make_match_question(
    CHAPTER_U1, "Interdisciplinary Interfaces",
    "Match List I (Field of Human Geography) with List II (Sister Social Science Discipline):",
    [("A", "Cultural Geography"), ("B", "Electoral Geography"), ("C", "Demography / Population Geography"), ("D", "Geography of Resources")],
    [("I", "Psephology / Political Science"), ("II", "Anthropology"), ("III", "Resource Economics"), ("IV", "Demography")],
    "A-II, B-I, C-IV, D-III", "D",
    "Cultural Geography interfaces with Anthropology; Electoral Geography interfaces with Psephology; Population Geography interfaces with Demography; Geography of Resources interfaces with Resource Economics.",
    "Correctly links geographic sub-disciplines with their sister social sciences."
))

# Q30: Assertion-Reason on Technology
add_u1(make_assertion_question(
    CHAPTER_U1, "Technology and Nature",
    "Human beings were able to develop technology only after they developed a better understanding of natural laws.",
    "The understanding of the laws of aerodynamics helped humans develop faster aircraft.",
    1, "A",
    "Both Assertion and Reason are true. The understanding of natural laws is the prerequisite for technological inventions, exemplified by aerodynamics leading to high-speed planes.",
    "Validates the causal relationship between natural laws and technological invention."
))

# Q31: Naturalisation of Humans
opts, c, s = rotate_options(
    "Direct dependence of primitive human societies on nature for resources and survival",
    ["Conversion of all natural forests into urban commercial malls", "Total freedom of human beings from all biological needs", "Complete extermination of wild animal species"],
    "B",
    "The 'Naturalisation of Humans' refers to the state where human beings, with minimal technology, live in direct, primitive adaptation to nature, listening to nature and submitting to its dictates.\nHence, Option {{CORR}} is correct.",
    "Defines the naturalisation of humans as primitive ecological dependence."
)
add_u1(make_question(CHAPTER_U1, "Naturalisation of Humans", "What is meant by the phrase 'Naturalisation of Humans' in early human geography?", opts, c, s))

# Q32: Humanisation of Nature
opts, c, s = rotate_options(
    "The imprinting of human cultural, technological, and agricultural works on the physical landscape",
    ["The total abandonment of cities by human populations to live in caves", "The submergence of all continents under polar ice sheets", "The extinction of human speech and written communication"],
    "C",
    "The 'Humanisation of Nature' refers to how humans, armed with technology, imprint their presence across nature—creating health resorts on highlands, ports on coasts, satellites in the sky, and farmlands across plains.\nHence, Option {{CORR}} is correct.",
    "Defines humanisation of nature as the creation of cultural landscapes."
)
add_u1(make_question(CHAPTER_U1, "Humanisation of Nature", "The term 'Humanisation of Nature' is best described as:", opts, c, s))

# Q33: Regional Analysis Approach
opts, c, s = rotate_options(
    "Elaborate description of all aspects of a region, considering it as a part of the whole earth",
    ["Measuring only the depth of oceanic trenches", "Exclusive study of capital city stock exchanges", "Studying only single individuals without any spatial mapping"],
    "D",
    "During the early colonial and later colonial periods, regional analysis assumed that all regions were parts of the whole earth; studying all aspects of a region would lead to an understanding of the whole.\nHence, Option {{CORR}} is correct.",
    "Describes the regional analysis approach of viewing regions as components of the whole earth."
)
add_u1(make_question(CHAPTER_U1, "Approaches", "What was the fundamental premise of the 'Regional Analysis' approach during the colonial period?", opts, c, s))

# Q34: Emergence of Humanistic, Radical and Behavioural Schools
opts, c, s = rotate_options(
    "1970s",
    ["1930s", "1950s", "1990s"],
    "A",
    "In the 1970s, discontent with the dehumanized quantitative and statistical models led to the emergence of three new schools of thought: Humanistic/Welfare, Radical, and Behavioural schools.\nHence, Option {{CORR}} is correct.",
    "Identifies the 1970s as the decade when Welfare, Radical, and Behavioural schools emerged."
)
add_u1(make_question(CHAPTER_U1, "Evolution of Geography", "In which decade did discontent with the quantitative revolution give rise to the Humanistic, Radical, and Behavioural schools of human geography?", opts, c, s))

# Q35: Statement on Free Environment vs Determinism
add_u1(make_statement_question(
    CHAPTER_U1, "Environmental Determinism",
    "In societies undergoing environmental determinism, nature is seen as an active provider of limitless economic profits.",
    "In possibilist frameworks, humans carve out possibilities and create health resorts on highlands and vast urban settlements.",
    4, "B",
    "Statement I is false: under environmental determinism, nature is a feared, powerful force to which humans passively adapt. Statement II is true: possibilism emphasizes human cultural creations such as resorts, farmlands, and ports.",
    "Contrasts passive adaptation under determinism with creative humanisation under possibilism."
))

# Q36: Geomorphology and Climatology in Human Geography
opts, c, s = rotate_options(
    "Physical Geography",
    ["Human Geography", "Economic Geography", "Political Geography"],
    "C",
    "Geomorphology, Climatology, Oceanography, and Biogeography are core branches of Physical Geography, whereas Human Geography focuses on anthropogenic spatial phenomena.\nHence, Option {{CORR}} is correct.",
    "Differentiates physical geography disciplines from human geography."
)
add_u1(make_question(CHAPTER_U1, "Fields of Geography", "Geomorphology, Climatology, and Oceanography are traditional sub-fields of which major branch of geography?", opts, c, s))

# Q37: Historical Geography
opts, c, s = rotate_options(
    "How historical processes and temporal changes shape the spatial organisation of societies",
    ["Predicting volcanic eruptions using seismographs exclusively", "Designing underwater high-speed hyperloop corridors", "Calculating astronomical distances to distant galaxies"],
    "D",
    "Historical Geography examines how geographical features, spatial organisations, and human interactions have evolved over time through historical processes.\nHence, Option {{CORR}} is correct.",
    "Defines Historical Geography as the spatial analysis of temporal and historical processes."
)
add_u1(make_question(CHAPTER_U1, "Sub-fields", "What is the primary subject matter of 'Historical Geography'?", opts, c, s))

# Q38: Multi-statement on Griffith Taylor's Middle Path
add_u1(make_multi_statement_question(
    CHAPTER_U1, "Neo-Determinism",
    "Consider the following statements regarding Griffith Taylor's 'Neo-Determinism':",
    [
        ("A", "It asserts that there is neither a situation of absolute necessity nor a condition of absolute freedom."),
        ("B", "It shows that human beings can conquer nature by obeying it."),
        ("C", "It warns that indiscriminate development leads to greenhouse effect, ozone depletion, and global warming."),
        ("D", "It completely rejects all ideas of sustainable development.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "A",
    "Statements A, B, and C accurately reflect Griffith Taylor's Neo-determinism. Statement D is false because Neo-determinism is fundamentally aligned with the concept of sustainable development.",
    "Evaluates the principles of Neo-determinism and sustainable environmental stewardship."
))

# Q39: Ratzel's Seminal Work
opts, c, s = rotate_options(
    "Anthropogeographie",
    ["Origin of Species", "Kosmos", "The Geographical Pivot of History"],
    "B",
    "Friedrich Ratzel authored the foundational treatise 'Anthropogeographie', in which he systematically formulated the principles of human geography.\nHence, Option {{CORR}} is correct.",
    "Identifies Anthropogeographie as Friedrich Ratzel's monumental work."
)
add_u1(make_question(CHAPTER_U1, "Key Publications", "Which classic foundational book was authored by Friedrich Ratzel, laying the groundwork for systematic human geography?", opts, c, s))

# Q40: Synthesis in Human Geography
opts, c, s = rotate_options(
    "It integrates physical environment with human socio-cultural elements dynamically across space and time",
    ["It excludes all physical phenomena and only focuses on literature", "It studies outer space without examining earth's surface", "It isolates humans completely from terrestrial interactions"],
    "C",
    "Human geography is inherently an integrative, synthetic discipline that bridges the natural physical environment with human cultural and economic phenomena dynamically over space and time.\nHence, Option {{CORR}} is correct.",
    "Emphasizes the synthetic, integrative character of human geography."
)
add_u1(make_question(CHAPTER_U1, "Nature of Human Geography", "Why is human geography characterized as an 'integrative' and 'synthetic' discipline?", opts, c, s))

validate_and_collect(u1_qs, u1_seen)
assert len(u1_qs) == 40
with open("mock/geo_units/unit1.json", "w", encoding="utf-8") as f:
    json.dump(u1_qs, f, indent=2, ensure_ascii=False)
print("Unit 1 generated: 40 questions")

# =================================================================================================
# UNIT 2: The World Population: Distribution, Density, Growth & Composition (60 Questions)
# =================================================================================================
CHAPTER_U2 = "The World Population: Distribution, Density and Growth"
u2_qs = []
u2_seen = set()

def add_u2(q):
    u2_qs.append(q)

# Q1: 90% in 10% land
opts, c, s = rotate_options(
    "About 90 percent of the world population lives in about 10 percent of its land area",
    ["About 50 percent of the world population lives on 50 percent of the land area", "About 10 percent of the world population lives in 90 percent of the land area", "World population is evenly distributed across all land surfaces"],
    "A",
    "George B. Cressey remarked on Asia that 'Asia has many places where people are few and few places where people are very many'. Globally, roughly 90 percent of the world's population lives in about 10 percent of its land area.\nHence, Option {{CORR}} is correct.",
    "Identifies the striking unevenness of global population distribution: 90% on 10% of land."
)
add_u2(make_question(CHAPTER_U2, "Population Distribution", "Which of the following statements accurately describes the global pattern of population distribution?", opts, c, s))

# Q2: Top 10 countries population share
opts, c, s = rotate_options(
    "About 60 percent of the world's population",
    ["About 25 percent of the world's population", "About 90 percent of the world's population", "About 40 percent of the world's population"],
    "B",
    "The 10 most populous countries of the world contribute about 60 percent of the world's population. Of these 10 countries, 6 are located in Asia.\nHence, Option {{CORR}} is correct.",
    "Identifies that the top 10 populous countries account for roughly 60% of the world's people."
)
add_u2(make_question(CHAPTER_U2, "Most Populous Countries", "The 10 most populous countries in the world together contribute approximately what percentage of the global population?", opts, c, s))

# Q3: Number of Asian countries in top 10
opts, c, s = rotate_options(
    "6 countries",
    ["2 countries", "4 countries", "8 countries"],
    "C",
    "Of the world's 10 most populous countries, six are located in Asia: China, India, Indonesia, Pakistan, Bangladesh, and Russia (partly in Asia).\nHence, Option {{CORR}} is correct.",
    "Identifies that 6 of the top 10 most populous countries are located in Asia."
)
add_u2(make_question(CHAPTER_U2, "Most Populous Countries", "How many of the world's ten most populous countries are located in Asia?", opts, c, s))

# Q4: Population Density formula
opts, c, s = rotate_options(
    "Population Density = Total Population / Total Area",
    ["Population Density = Total Area / Total Population", "Population Density = Total Births / Total Deaths", "Population Density = Total Cultivated Land / Agricultural Laborers"],
    "D",
    "Density of population is calculated as the ratio between the number of people to the size of land: Density = Population / Area (usually expressed as persons per sq km).\nHence, Option {{CORR}} is correct.",
    "Correctly states the formula for density of population."
)
add_u2(make_question(CHAPTER_U2, "Density of Population", "How is the 'Density of Population' mathematically calculated?", opts, c, s))

# Q5: High density regions
opts, c, s = rotate_options(
    "North-Eastern part of USA, North-Western part of Europe, and South, South-East and East Asia",
    ["Polar ice-caps of Greenland and Antarctica", "Sahara, Kalahari, and Atacama deserts", "Amazon and Congo equatorial rainforest basins"],
    "A",
    "Densely populated parts of the world with more than 200 persons per sq km are: North-Eastern part of USA, North-Western part of Europe, and South, South-East, and East Asia.\nHence, Option {{CORR}} is correct.",
    "Identifies the world's major densely populated regions."
)
add_u2(make_question(CHAPTER_U2, "Density Zones", "Which of the following clusters represents the most densely populated regions of the world (exceeding 200 persons per sq km)?", opts, c, s))

# Q6: Geographical factors: Water
opts, c, s = rotate_options(
    "River valleys are among the most densely populated areas in the world because water is essential for drinking, agriculture, and industries",
    ["Humans prefer extremely arid sand dunes to avoid humidity", "People settle exclusively on mountain peaks above 6000 metres for pure air", "Water availability has no impact on human settlement decisions"],
    "B",
    "Water is the most crucial factor for life. People prefer to live where fresh water is easily available for drinking, cattle, crops, and industries. Thus, river valleys are the most densely populated areas.\nHence, Option {{CORR}} is correct.",
    "Explains why river valleys have historically been densely settled."
)
add_u2(make_question(CHAPTER_U2, "Factors Influencing Distribution", "Why are river valleys historically among the most densely populated regions on Earth?", opts, c, s))

# Q7: Kobe-Osaka region
opts, c, s = rotate_options(
    "Industrial development providing numerous employment opportunities",
    ["Vast reserves of crude petroleum and natural gas", "Extensive perennial wheat farming on flat river floodplains", "Religious pilgrimage sites established in antiquity"],
    "C",
    "The Kobe-Osaka region of Japan is thickly populated because of the presence of a vast number of industries providing diverse job opportunities and attracting thousands of workers.\nHence, Option {{CORR}} is correct.",
    "Identifies industrial development as the primary reason for dense population in Kobe-Osaka."
)
add_u2(make_question(CHAPTER_U2, "Economic Factors", "What is the primary factor responsible for the high population density in the Kobe-Osaka region of Japan?", opts, c, s))

# Q8: Katanga-Zambia Copper Belt
opts, c, s = rotate_options(
    "Rich mineral deposits of copper attracting skilled and unskilled labor",
    ["Temperate alpine pleasant climate throughout the year", "Extensive Mediterranean citrus orchards", "Major global financial and banking headquarters"],
    "D",
    "The Katanga-Zambia copper belt in Africa is a prominent example of a densely populated area primarily attracted by rich mineral deposits of copper requiring extensive mining and industrial labor.\nHence, Option {{CORR}} is correct.",
    "Identifies rich mineral resources as the driver of settlement in Katanga-Zambia."
)
add_u2(make_question(CHAPTER_U2, "Mineral Factors", "The Katanga-Zambia belt in Africa is an eminent example of high population settlement driven by which resource?", opts, c, s))

# Q9: Mediterranean region
opts, c, s = rotate_options(
    "Pleasant climate with warm, dry summers and mild, wet winters",
    ["Continuous sub-zero freezing temperatures", "Vast dense equatorial rainforest canopy", "Violent daily monsoonal flooding"],
    "A",
    "Areas with a comfortable climate where there is not much seasonal variation attract more people. The Mediterranean regions have been inhabited from early periods in history due to their pleasant climate.\nHence, Option {{CORR}} is correct.",
    "Identifies pleasant climate as the attraction for settlement in the Mediterranean."
)
add_u2(make_question(CHAPTER_U2, "Climatic Factors", "Why has the Mediterranean region been densely inhabited since early historic periods?", opts, c, s))

# Q10: Components of Population Change
opts, c, s = rotate_options(
    "Births, Deaths, and Migration",
    ["Income, Taxes, and Subsidies", "Rainfall, Humidity, and Sunshine", "Imports, Exports, and Tariffs"],
    "B",
    "There are three fundamental components of population change: Births, Deaths, and Migration. Natural growth is births minus deaths, while actual growth also accounts for in-migration and out-migration.\nHence, Option {{CORR}} is correct.",
    "Identifies Births, Deaths, and Migration as the three components of population change."
)
add_u2(make_question(CHAPTER_U2, "Population Change", "What are the three core components that determine population change in any geographical area?", opts, c, s))

# Q11: Crude Birth Rate (CBR) formula
opts, c, s = rotate_options(
    "CBR = (Bi / P) * 1000, where Bi is live births and P is estimated mid-year population",
    ["CBR = (Total Deaths / Total Area) * 100", "CBR = (Total Births / Total Married Women) * 10", "CBR = (Total Population / Live Births) * 1000"],
    "C",
    "Crude Birth Rate (CBR) is expressed as number of live births in a year per thousand of population: CBR = (Bi / P) * 1000, where Bi = live births during the year, and P = mid-year population.\nHence, Option {{CORR}} is correct.",
    "Accurately specifies the formula for Crude Birth Rate (CBR)."
)
add_u2(make_question(CHAPTER_U2, "Demographic Formulas", "How is the Crude Birth Rate (CBR) mathematically calculated?", opts, c, s))

# Q12: Crude Death Rate (CDR) formula
opts, c, s = rotate_options(
    "CDR = (D / P) * 1000, where D is total deaths during the year and P is mid-year population",
    ["CDR = (D / Total Births) * 100", "CDR = (Total Area / D) * 1000", "CDR = (D / Total Infant Births) * 100"],
    "D",
    "Crude Death Rate (CDR) is expressed in terms of number of deaths in a particular year per thousand of population in a particular region: CDR = (D / P) * 1000.\nHence, Option {{CORR}} is correct.",
    "Specifies the mathematical formula for Crude Death Rate (CDR)."
)
add_u2(make_question(CHAPTER_U2, "Demographic Formulas", "What is the formula used to calculate the Crude Death Rate (CDR)?", opts, c, s))

# Q13: Natural Growth of Population
opts, c, s = rotate_options(
    "Births minus Deaths",
    ["Births plus In-migration", "Deaths minus Out-migration", "Total Population divided by Total Land Area"],
    "A",
    "Natural Growth of population is the population increased by difference between births and deaths in a particular region between two points of time: Natural Growth = Births - Deaths.\nHence, Option {{CORR}} is correct.",
    "Defines Natural Growth of Population as Births minus Deaths."
)
add_u2(make_question(CHAPTER_U2, "Population Growth", "What is the formula to calculate the 'Natural Growth' of population?", opts, c, s))

# Q14: Actual Growth of Population
opts, c, s = rotate_options(
    "Births - Deaths + In-migration - Out-migration",
    ["Births + Deaths + In-migration + Out-migration", "Births / Deaths * 100", "Total Population * Density of Land"],
    "B",
    "Actual Growth of population takes migration into account: Actual Growth = Births - Deaths + In-migration - Out-migration.\nHence, Option {{CORR}} is correct.",
    "Defines Actual Growth of Population incorporating net migration."
)
add_u2(make_question(CHAPTER_U2, "Population Growth", "Which formula represents the 'Actual Growth' of population in a region?", opts, c, s))

# Q15: Push Factors vs Pull Factors
opts, c, s = rotate_options(
    "Push factors make the place of origin seem less attractive, while Pull factors make the place of destination seem more attractive",
    ["Push factors always refer to international immigration, while Pull factors refer to rural farming", "Push factors attract high-income professionals, while Pull factors force refugees into exile", "Both Push and Pull factors act exclusively within coastal tourist resorts"],
    "C",
    "Push factors make the place of origin seem less attractive due to unemployment, poor living conditions, political turmoil, etc. Pull factors make the place of destination seem more attractive due to better jobs, peace, and pleasant climate.\nHence, Option {{CORR}} is correct.",
    "Distinguishes Push factors (origin repellents) from Pull factors (destination attractions)."
)
add_u2(make_question(CHAPTER_U2, "Migration Drivers", "What is the fundamental difference between 'Push Factors' and 'Pull Factors' in migration?", opts, c, s))

# Q16: Push Factors examples
opts, c, s = rotate_options(
    "Unemployment, poor living conditions, political turmoil, unpleasant climate, natural disasters, and epidemics",
    ["High wages, luxury housing, high political stability, and leisure facilities", "Peace, pleasant Mediterranean sunshine, and abundant free arable land", "Booming software industrial parks and advanced metropolitan universities"],
    "D",
    "Push factors include unemployment, poor living conditions, political turmoil, unpleasant climate, natural disasters, epidemics, and socio-economic backwardness that force people to migrate out.\nHence, Option {{CORR}} is correct.",
    "Lists authentic push factors that compel out-migration."
)
add_u2(make_question(CHAPTER_U2, "Migration Drivers", "Which of the following groups contains only 'Push Factors' of migration?", opts, c, s))

# Q17: Pull Factors examples
opts, c, s = rotate_options(
    "Better job opportunities, better living conditions, peace and stability, and security of life and property",
    ["Severe famines, volcanic eruptions, and political purges", "Frequent civil wars, cholera outbreaks, and chronic rural debt", "Desertification, saline drinking water, and lack of healthcare"],
    "A",
    "Pull factors make the destination attractive: better job opportunities, higher wages, reliable civic services, security of life and property, and pleasant climate.\nHence, Option {{CORR}} is correct.",
    "Identifies genuine pull factors attracting in-migrants."
)
add_u2(make_question(CHAPTER_U2, "Migration Drivers", "Which of the following sets consists entirely of 'Pull Factors' of migration?", opts, c, s))

# Q18: Demographic Transition Theory: Stage I
opts, c, s = rotate_options(
    "High fertility and high mortality, slow population growth, and predominantly agrarian society with low technology",
    ["Rapidly declining fertility and zero mortality with automated industrial robotics", "Low fertility, low mortality, highly urbanized and literate population", "Negative population growth with total collapse of urban centers"],
    "B",
    "In Stage I of Demographic Transition Theory, fertility and mortality are both high because people reproduce more to compensate for deaths from epidemics and food shortages. Society is agrarian with low life expectancy.\nHence, Option {{CORR}} is correct.",
    "Describes Stage I of demographic transition: high fertility, high mortality, slow growth."
)
add_u2(make_question(CHAPTER_U2, "Demographic Transition Theory", "What are the defining demographic characteristics of 'Stage I' in the Demographic Transition Theory?", opts, c, s))

# Q19: Demographic Transition Theory: Stage II
opts, c, s = rotate_options(
    "Fertility remains high initially but declines over time, mortality drops sharply due to improved sanitation and healthcare, resulting in high net population increase",
    ["Mortality increases exponentially while births completely cease", "Both fertility and mortality remain at rock-bottom levels with zero growth", "Population doubles every six months due to mass cloning"],
    "C",
    "In Stage II, fertility remains high at the beginning but declines over time. Improvements in sanitation and health lead to a sharp decline in mortality. The large gap between births and deaths creates rapid population expansion.\nHence, Option {{CORR}} is correct.",
    "Explains Stage II of demographic transition: mortality plunges, births remain high, explosion occurs."
)
add_u2(make_question(CHAPTER_U2, "Demographic Transition Theory", "Why does a massive population expansion occur during 'Stage II' of the Demographic Transition?", opts, c, s))

# Q20: Demographic Transition Theory: Stage III
opts, c, s = rotate_options(
    "Both fertility and mortality decline considerably; the population becomes urbanised, literate, technologically advanced, and growth becomes slow or stable",
    ["Birth rates rise to historic highs while deaths plummet to zero", "Society abandons technology and reverts to primitive hunting-gathering", "Mortality exceeds birth rates tenfold due to lack of medical knowledge"],
    "D",
    "In Stage III, both fertility and mortality decline considerably. The population becomes urbanised, literate, technologically adept, and deliberately controls family size. Population growth stabilizes or grows very slowly.\nHence, Option {{CORR}} is correct.",
    "Describes Stage III of demographic transition: low births, low deaths, stable urbanized population."
)
add_u2(make_question(CHAPTER_U2, "Demographic Transition Theory", "What characterizes the final 'Stage III' of the Demographic Transition Theory?", opts, c, s))

# Q21: Malthusian Theory
opts, c, s = rotate_options(
    "Thomas Malthus (1798)",
    ["Adam Smith (1776)", "David Ricardo (1817)", "Karl Marx (1867)"],
    "A",
    "Thomas Malthus stated in his theory (1798) that the number of people would increase faster than the food supply. Any further increase would result in population crash caused by famine, disease, and war (Malthusian positive checks).\nHence, Option {{CORR}} is correct.",
    "Attributes the 1798 population-food supply imbalance theory to Thomas Malthus."
)
add_u2(make_question(CHAPTER_U2, "Population Theories", "Who proposed the theory in 1798 stating that human population grows faster than food supply, leading to inevitable famine and disease?", opts, c, s))

# Q22: World population reaching 6 billion
opts, c, s = rotate_options(
    "1999",
    ["1950", "1974", "1985"],
    "B",
    "World population reached 1 billion around 1830, 2 billion in 1930, 3 billion in 1960, 4 billion in 1974, 5 billion in 1987, and 6 billion in 1999 (taking just 12 years to add the sixth billion).\nHence, Option {{CORR}} is correct.",
    "Identifies 1999 as the year world population reached 6 billion."
)
add_u2(make_question(CHAPTER_U2, "Doubling of Population", "In which year did the global human population hit the 6 billion mark?", opts, c, s))

# Q23: Match Demographic Transition Stages with Countries
add_u2(make_match_question(
    CHAPTER_U2, "Demographic Transition",
    "Match List I (Stage of Demographic Transition) with List II (Representative Countries/Societies):",
    [("A", "Stage I (High birth, high death)"), ("B", "Stage II early phase"), ("C", "Stage II late phase"), ("D", "Stage III (Low birth, low death)")],
    [("I", "Kenya and Peru"), ("II", "Rainforest tribes / primitive isolated groups"), ("III", "Japan, Canada, and USA"), ("IV", "Sri Lanka and Kenya")],
    "A-II, B-I, C-IV, D-III", "C",
    "Stage I represents primitive isolated societies; Stage II early includes developing countries with falling death rates; Stage II late includes transitioning developing nations; Stage III includes post-industrial countries like Japan and USA.",
    "Correctly matches stages of demographic transition with country examples."
))

# Q24: Match Population Density Categories
add_u2(make_match_question(
    CHAPTER_U2, "Density Categories",
    "Match List I (Density Category) with List II (Persons per Sq Km / Global Regions):",
    [("A", "High Density (>200 persons/sq km)"), ("B", "Medium Density (11-50 persons/sq km)"), ("C", "Low Density (<1 person/sq km)"), ("D", "Very High Urban Densities")],
    [("I", "Western China, Southern India, Eastern Europe"), ("II", "Polar regions, hot deserts, and high altitudes"), ("III", "Monsoon Asia, North-Eastern USA, NW Europe"), ("IV", "Tokyo, Delhi, and Shanghai metropolises")],
    "A-III, B-I, C-II, D-IV", "D",
    "High density corresponds to Monsoon Asia, NE USA, NW Europe (III); Medium density corresponds to Western China, Southern India (I); Low density corresponds to polar regions and deserts (II); Megacities have extreme urban density (IV).",
    "Matches population density tiers with respective global territories."
))

# Q25: Statement Question on Natural vs Actual Growth
add_u2(make_statement_question(
    CHAPTER_U2, "Population Growth",
    "Natural growth of population includes both net migration and natural increase.",
    "Actual population growth considers births, deaths, in-migration, and out-migration.",
    4, "A",
    "Statement I is incorrect: Natural growth accounts only for births minus deaths. Statement II is correct: Actual growth incorporates the balance of in-migration and out-migration.",
    "Distinguishes between natural population growth and actual growth."
))

# Q26: Assertion-Reason on Population Density
add_u2(make_assertion_question(
    CHAPTER_U2, "Population Distribution",
    "Plains with rich alluvial soils are the most densely populated regions across the globe.",
    "Alluvial plains provide flat land suitable for intensive agriculture, transport construction, and industrialization.",
    1, "B",
    "Both Assertion and Reason are true, and Reason is the correct explanation. Fertile alluvial soil and gentle topography maximize agricultural productivity and facilitate dense urban settlement.",
    "Explains why flat alluvial plains attract the densest global populations."
))

# Q27: Sequence of Population Growth Milestones
add_u2(make_sequence_question(
    CHAPTER_U2, "Global Population Milestones",
    "Arrange the following milestones in global population growth in chronological order:",
    [("A", "World population hits 5 billion"), ("B", "World population reaches 1 billion"), ("C", "World population reaches 6 billion"), ("D", "World population reaches 3 billion")],
    "B, D, A, C", "C",
    "1. 1 billion was reached around 1830 (B).\n2. 3 billion was reached in 1960 (D).\n3. 5 billion was reached in 1987 (A).\n4. 6 billion was reached in 1999 (C).",
    "Sequences global population landmark milestones chronologically."
))

# Q28: Sex Ratio calculation internationally (UN)
opts, c, s = rotate_options(
    "Male population / Female population * 1000 (or Number of males per 100 females)",
    ["Female population / Male population * 1000", "Total Births / Total Deaths * 100", "Infant Females / Adult Males * 10"],
    "D",
    "In many countries and in United Nations reports, sex ratio is expressed as the number of males per 1000 females: (Male population / Female population) * 1000, or number of males per 100 females. In India, it is females per 1000 males.\nHence, Option {{CORR}} is correct.",
    "Identifies the UN and international method of calculating sex ratio (males per 100/1000 females)."
)
add_u2(make_question(CHAPTER_U2, "Population Composition: Sex Ratio", "How is the 'Sex Ratio' calculated according to the international standard used by the United Nations?", opts, c, s))

# Q29: Sex Ratio in India
opts, c, s = rotate_options(
    "(Female population / Male population) * 1000",
    ["(Male population / Female population) * 1000", "(Total Population / Female population) * 100", "(Live Female Births / Total Area) * 1000"],
    "A",
    "In India, the sex ratio is calculated using the formula: Sex Ratio = (Female population / Male population) * 1000, representing the number of females per 1000 males.\nHence, Option {{CORR}} is correct.",
    "Accurately states the Indian census formula for Sex Ratio."
)
add_u2(make_question(CHAPTER_U2, "Population Composition: Sex Ratio", "In India, what formula is used by the Census to determine the 'Sex Ratio'?", opts, c, s))

# Q30: Highest Sex Ratio in the World
opts, c, s = rotate_options(
    "Latvia",
    ["Qatar", "United Arab Emirates", "India"],
    "B",
    "The world's highest sex ratio (favourable to females) is recorded in Latvia, where there are 85 males per 100 females (or 1,180 females per 1,000 males). Qatar has the lowest sex ratio (311 females per 1000 males).\nHence, Option {{CORR}} is correct.",
    "Identifies Latvia as having the world's highest sex ratio favourable to females."
)
add_u2(make_question(CHAPTER_U2, "Global Sex Ratio", "Which country in the world has recorded the highest sex ratio (most favorable to females)?", opts, c, s))

# Q31: Lowest Sex Ratio in the World
opts, c, s = rotate_options(
    "Qatar",
    ["Norway", "Latvia", "Australia"],
    "C",
    "The lowest sex ratio in the world is recorded in Qatar, where there are only around 311 females per 1000 males, largely driven by massive immigration of male foreign construction workers.\nHence, Option {{CORR}} is correct.",
    "Identifies Qatar as having the world's lowest female-to-male sex ratio due to migrant labor."
)
add_u2(make_question(CHAPTER_U2, "Global Sex Ratio", "Which country has recorded the lowest sex ratio in the world, primarily due to male-selective labor immigration?", opts, c, s))

# Q32: Age-Sex Pyramid: Expanding Population (Nigeria)
opts, c, s = rotate_options(
    "Triangular shaped pyramid with a broad base, typical of less developed countries with high birth rates",
    ["Bell shaped pyramid tapering toward the base", "Urn shaped pyramid with narrow base and top", "Perfect rectangular column from age 0 to 80"],
    "D",
    "The age-sex pyramid of Nigeria is a triangular shaped pyramid with a wide base, typical of less developed countries. These have large populations in lower age groups due to high birth rates (e.g. Bangladesh, Mexico, Nigeria).\nHence, Option {{CORR}} is correct.",
    "Describes the expanding population pyramid (triangular with broad base)."
)
add_u2(make_question(CHAPTER_U2, "Age-Sex Pyramid", "What does a 'Triangular Shaped Age-Sex Pyramid with a Broad Base' (such as that of Nigeria) indicate?", opts, c, s))

# Q33: Age-Sex Pyramid: Constant Population (Australia)
opts, c, s = rotate_options(
    "Bell shaped and tapered towards the top, showing birth and death rates are almost equal",
    ["Broad triangular base showing high infant mortality", "Narrow bottom and narrow top with bulging middle", "Hourglass shaped with no working age cohort"],
    "A",
    "Australia's age-sex pyramid is bell shaped and tapered towards the top. This shows that birth and death rates are almost equal, leading to a nearly constant or stable population.\nHence, Option {{CORR}} is correct.",
    "Describes Australia's bell-shaped pyramid representing a constant population."
)
add_u2(make_question(CHAPTER_U2, "Age-Sex Pyramid", "The age-sex pyramid of Australia is bell-shaped and tapered at the top. What does this shape represent?", opts, c, s))

# Q34: Age-Sex Pyramid: Declining Population (Japan)
opts, c, s = rotate_options(
    "Narrow base and a tapered top, indicating low birth and death rates with zero or negative growth",
    ["Extremely broad base indicating rapid child explosion", "Triangular base with steep vertical slopes", "Inverted pyramid with 90% below age 5"],
    "B",
    "The Japan pyramid has a narrow base and a tapered top. This shows low birth and death rates. The population growth in developed countries is usually zero or negative, resulting in an aging population.\nHence, Option {{CORR}} is correct.",
    "Describes Japan's contracting pyramid with narrow base reflecting negative growth."
)
add_u2(make_question(CHAPTER_U2, "Age-Sex Pyramid", "What does an 'Urn-Shaped Age-Sex Pyramid with a Narrow Base' (such as Japan's) indicate?", opts, c, s))

# Q35: Aging Population definition
opts, c, s = rotate_options(
    "Process by which the share of the older population (aged 60+ or 65+) becomes proportionally larger",
    ["Rapid growth in the number of primary school entrants", "Migration of youth from rural to metropolitan suburbs", "Shift from agricultural farming to deep-sea fishing"],
    "C",
    "Population aging is the process by which the share of the older population becomes proportionally larger. In most developed countries of the world, population in higher age groups has increased due to increased life expectancy.\nHence, Option {{CORR}} is correct.",
    "Defines population aging as the increasing proportion of elderly cohorts."
)
add_u2(make_question(CHAPTER_U2, "Aging Population", "In demographic studies, what does the term 'Aging Population' designate?", opts, c, s))

# Q36: Rural-Urban Composition in Western Europe vs Asia
opts, c, s = rotate_options(
    "In Western European countries, females outnumber males in urban areas, whereas in Asian cities like India, males outnumber females",
    ["In both regions, females are completely absent from cities", "In Asian cities, females outnumber males by 4 to 1 due to female farming", "In Western Europe, males outnumber females in cities due to mining camp housing"],
    "D",
    "In Western countries, farming is highly mechanized and remains largely a male occupation in rural areas, while women migrate to cities for tertiary jobs. In developing Asian countries, rural-urban migration is predominantly male due to lack of urban housing and security for females.\nHence, Option {{CORR}} is correct.",
    "Accurately contrasts rural-urban gender balance between Western and Asian nations."
)
add_u2(make_question(CHAPTER_U2, "Rural-Urban Composition", "How does the gender composition of urban settlements in Western European nations differ from that in developing Asian countries like India?", opts, c, s))

# Q37: Literacy definition in India
opts, c, s = rotate_options(
    "Percentage of population aged 7 years and above who can read and write with understanding and do simple arithmetic",
    ["Any person who can sign their name irrespective of age", "Any person holding a university postgraduate degree", "Children aged 3 years who attend pre-primary daycare"],
    "A",
    "In India, literacy rate denotes the percentage of population above 7 years of age, who is able to read, write and have the ability to do arithmetic calculations with understanding.\nHence, Option {{CORR}} is correct.",
    "States the Indian Census definition of literacy: aged 7+, reading/writing with understanding."
)
add_u2(make_question(CHAPTER_U2, "Literacy", "According to the Census of India, who is classified as a 'Literate' person?", opts, c, s))

# Q38: Occupational Structure 4 sectors
opts, c, s = rotate_options(
    "Primary (agriculture/mining), Secondary (manufacturing), Tertiary (services), and Quaternary (research/ideas)",
    ["Domestic, Foreign, Coastal, and Desert", "Manual, Mechanical, Digital, and Virtual", "Private, Corporate, Cooperative, and Philanthropic"],
    "B",
    "The working population (aged 15 to 59) takes part in various occupations ranging from agriculture, forestry, fishing, manufacturing, transport, services to research. These are categorized into Primary, Secondary, Tertiary, and Quaternary sectors.\nHence, Option {{CORR}} is correct.",
    "Lists the four standard economic sectors of occupational structure."
)
add_u2(make_question(CHAPTER_U2, "Occupational Structure", "Into which four broad sectors is the working population (aged 15 to 59) classified in geography?", opts, c, s))

# Q39: Working Age Population Cohort
opts, c, s = rotate_options(
    "15 to 59 years",
    ["0 to 14 years", "60 to 80 years", "25 to 40 years"],
    "C",
    "The working population refers to the population in the age group of 15 to 59 years. This group bears the dependency burden of children (0-14) and the elderly (60+).\nHence, Option {{CORR}} is correct.",
    "Identifies 15 to 59 years as the productive working age cohort."
)
add_u2(make_question(CHAPTER_U2, "Age Structure", "Which age bracket is officially recognized as the productive 'Working Age Population' in demographic analysis?", opts, c, s))

# Q40: High Proportion of Youth (0-14)
opts, c, s = rotate_options(
    "High dependency ratio requiring extensive expenditure on education and child healthcare",
    ["Immediate abundance of retired pension funds", "Instant reduction in birth rates to zero", "Total elimination of poverty within 2 years"],
    "D",
    "A large size of population in the age group of 0-14 years indicates high birth rates and means that the country has a high dependency ratio, requiring major public investments in schooling, immunization, and child nutrition.\nHence, Option {{CORR}} is correct.",
    "Identifies high youth population with high young-age dependency burden."
)
add_u2(make_question(CHAPTER_U2, "Age Structure", "What does a high proportion of population in the 0-14 age cohort imply for a developing economy?", opts, c, s))

# Q41: Statement on Demographic Transition in Japan
add_u2(make_statement_question(
    CHAPTER_U2, "Demographic Transition",
    "Japan is currently placed in Stage I of the Demographic Transition Theory.",
    "In Stage III of demographic transition, deliberate family planning and widespread literacy keep fertility low.",
    4, "A",
    "Statement I is false: Japan is in Stage III (advanced stage with contracting population, low birth/death rates). Statement II is true: high literacy and deliberate birth control characterize Stage III.",
    "Evaluates Japan's stage in the demographic transition model."
))

# Q42: Multi-statement on Sex Ratio Factors
add_u2(make_multi_statement_question(
    CHAPTER_U2, "Sex Ratio Drivers",
    "Which of the following factors contribute to an unfavorable sex ratio for females in several Asian countries?",
    [
        ("A", "Female foeticide and female infanticide"),
        ("B", "Domestic violence and lower socio-economic status of women"),
        ("C", "Higher male biological longevity compared to females under identical conditions"),
        ("D", "Male-dominated out-migration from rural areas leaving fewer males in villages")
    ],
    "(A) and (B) only",
    ["(A), (B) and (C) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "B",
    "Statements A and B are the principal historical drivers of poor sex ratio against females. Statement C is false because biologically female babies are more resilient than male babies. Statement D actually increases the female ratio in rural source villages, not makes it unfavourable.",
    "Identifies social practices creating adverse female sex ratios."
))

# Q43: Doubling Time of World Population
opts, c, s = rotate_options(
    "It took hundreds of thousands of years to reach 1 billion, but only 12 years to grow from 5 billion to 6 billion",
    ["Population doubling time has steadily increased from 10 years to 500 years", "World population has doubled every 3 years since 1800", "World population has remained constant without doubling"],
    "C",
    "Human population took more than a million years to attain the one billion mark. But it took only 12 years (1987 to 1999) to rise from 5 billion to 6 billion, demonstrating rapid reduction in doubling time.\nHence, Option {{CORR}} is correct.",
    "Contrasts ancient sluggish growth with dramatic modern population doubling speed."
)
add_u2(make_question(CHAPTER_U2, "Doubling Time", "Which statement accurately describes the historical trend in the 'Doubling Time' of world population?", opts, c, s))

# Q44: Annual Population Growth Rate
opts, c, s = rotate_options(
    "Around 1.1 to 1.2 percent per year",
    ["10.5 percent per year", "0.01 percent per year", "5.8 percent per year"],
    "D",
    "At present, the annual population growth rate of the world is approximately 1.2 percent, having declined from its peak of over 2.0 percent in the late 1960s.\nHence, Option {{CORR}} is correct.",
    "Identifies the current global population annual growth rate (~1.2%)."
)
add_u2(make_question(CHAPTER_U2, "Growth Rates", "What is the approximate current annual growth rate of global human population?", opts, c, s))

# Q45: Continent with Highest Population Growth Rate
opts, c, s = rotate_options(
    "Africa",
    ["Europe", "North America", "Oceania"],
    "A",
    "Africa has the highest population growth rate among all continents (over 2.4% per annum), while Europe has the lowest (nearly zero or negative in several countries).\nHence, Option {{CORR}} is correct.",
    "Identifies Africa as the continent with the highest population growth rate."
)
add_u2(make_question(CHAPTER_U2, "Regional Variations", "Which continent currently records the highest population growth rate in the world?", opts, c, s))

# Q46: Continent with Lowest Population Growth Rate
opts, c, s = rotate_options(
    "Europe",
    ["Asia", "South America", "Africa"],
    "B",
    "Europe records the lowest population growth rate, with several countries experiencing natural decrease (deaths exceeding births) and aging workforces.\nHence, Option {{CORR}} is correct.",
    "Identifies Europe as having the lowest continental population growth rate."
)
add_u2(make_question(CHAPTER_U2, "Regional Variations", "Which continent currently exhibits the lowest population growth rate, with several countries facing demographic decline?", opts, c, s))

# Q47: Match Countries with Age-Sex Pyramid Shapes
add_u2(make_match_question(
    CHAPTER_U2, "Age-Sex Pyramids",
    "Match List I (Country) with List II (Age-Sex Pyramid Characteristic):",
    [("A", "Nigeria"), ("B", "Australia"), ("C", "Japan"), ("D", "Mexico")],
    [("I", "Bell-shaped, tapering at top (stable population)"), ("II", "Urn-shaped, narrow base (contracting population)"), ("III", "Broad triangular base (high fertility expanding population)"), ("IV", "Triangular base with rapid youth growth")],
    "A-III, B-I, C-II, D-IV", "C",
    "Nigeria and Mexico have triangular pyramids with wide bases (expanding); Australia has bell-shaped (stable); Japan has urn-shaped with narrow base (contracting).",
    "Correctly links countries with their characteristic population pyramids."
))

# Q48: Assertion-Reason on Urban-Rural Migration in Western Nations
add_u2(make_assertion_question(
    CHAPTER_U2, "Rural-Urban Composition",
    "In Western European countries, females outnumber males in urban areas.",
    "Agricultural farming in Western Europe is highly mechanized and remains largely a male-dominated rural enterprise, while females move to cities for service jobs.",
    1, "A",
    "Both Assertion and Reason are true, and Reason is the correct explanation. Highly mechanized commercial farming keeps rural male numbers higher, while urban service employment attracts women.",
    "Explains the female predominance in Western European urban centers."
))

# Q49: Population Change definition
opts, c, s = rotate_options(
    "Change in the number of inhabitants of a territory during a specific period of time (can be positive or negative)",
    ["Only the net overseas tourist arrivals in a city", "Total count of registered motor vehicles", "The physical expansion of administrative district borders"],
    "B",
    "Population growth or population change refers to the change in number of inhabitants of a territory during a specific period of time. This change may be positive or negative, expressed in absolute numbers or percentage.\nHence, Option {{CORR}} is correct.",
    "Defines population change as temporal change in inhabitant numbers."
)
add_u2(make_question(CHAPTER_U2, "Concepts", "How is 'Population Change' formally defined in human geography?", opts, c, s))

# Q50: Induced Abortion and Family Planning
opts, c, s = rotate_options(
    "Spacing or preventing the birth of children to improve women's health and control population growth",
    ["Enforcing compulsory international relocation of elderly citizens", "Banning all medical clinics in rural settlements", "Compulsory military conscription of all teenagers"],
    "C",
    "Family planning is the spacing or preventing the birth of children. Access to family planning services is a significant factor in limiting population growth and improving maternal health.\nHence, Option {{CORR}} is correct.",
    "Defines family planning and its role in fertility management."
)
add_u2(make_question(CHAPTER_U2, "Family Planning", "What is the primary objective of 'Family Planning' programs in demographic policy?", opts, c, s))

# Q51: Sequence of Continents by Population Share
add_u2(make_sequence_question(
    CHAPTER_U2, "Global Population Shares",
    "Arrange the following continents in descending order of their total population size:",
    [("A", "Africa"), ("B", "Asia"), ("C", "Europe"), ("D", "North America")],
    "B, A, C, D", "D",
    "1. Asia is largest (~60% of world population) (B).\n2. Africa is second (~17%) (A).\n3. Europe is third (~10%) (C).\n4. North America is fourth (~5%) (D).",
    "Ranks world continents by total population size in descending order."
))

# Q52: Sparse Population Regions
opts, c, s = rotate_options(
    "Extremely cold polar regions like Greenland, hyper-arid deserts like Sahara, and equatorial rainforests with dense canopies",
    ["Great Northern European Plains", "Ganga-Brahmaputra Delta", "Java Island of Indonesia"],
    "A",
    "Sparsely populated regions (less than 1 person per sq km) include polar regions like Antarctica and Greenland, high-altitude cold deserts, hyper-arid hot deserts (Sahara), and dense equatorial rainforests.\nHence, Option {{CORR}} is correct.",
    "Identifies harsh physical environments causing sparse population distribution."
)
add_u2(make_question(CHAPTER_U2, "Sparsely Populated Zones", "Which of the following environments are characterized by sparse human populations of less than 1 person per square kilometer?", opts, c, s))

# Q53: Land-locked Sahelian African Countries
opts, c, s = rotate_options(
    "Niger, Chad, and Mali",
    ["Egypt, Morocco, and Tunisia", "South Africa, Namibia, and Mozambique", "Ghana, Ivory Coast, and Senegal"],
    "B",
    "Niger, Chad, and Mali are land-locked Sahelian nations characterized by desert conditions, high fertility rates, and low population densities outside river basins.\nHence, Option {{CORR}} is correct.",
    "Identifies Sahelian landlocked countries with challenging demographic environments."
)
add_u2(make_question(CHAPTER_U2, "Regional Geography", "Which of the following groups consists of landlocked Sahelian African nations characterized by high birth rates and arid constraints?", opts, c, s))

# Q54: Industrial Revolution Population Explosion
opts, c, s = rotate_options(
    "Mid-eighteenth century (around 1750)",
    ["Early fourteenth century (1300)", "Late twentieth century (1990)", "First century CE (1 CE)"],
    "C",
    "The explosive expansion of world population began in the mid-eighteenth century (1750) with the Industrial Revolution, when technological advances in sanitation and mechanized agriculture lowered mortality.\nHence, Option {{CORR}} is correct.",
    "Dates the start of global population explosion to the 1750 Industrial Revolution."
)
add_u2(make_question(CHAPTER_U2, "Historical Growth", "In which period did the modern rapid explosion of world population begin, propelled by technological, medical, and industrial advances?", opts, c, s))

# Q55: Life Expectancy definition
opts, c, s = rotate_options(
    "The average number of years a newborn infant can expect to live if current mortality patterns persist",
    ["The total age of the oldest citizen in a country", "The age at which citizens are eligible to vote", "The average retirement age for civil service officers"],
    "D",
    "Life expectancy at birth is the average number of years a newborn infant is expected to live if prevailing patterns of mortality at the time of its birth remain constant throughout its life.\nHence, Option {{CORR}} is correct.",
    "Defines Life Expectancy at birth accurately."
)
add_u2(make_question(CHAPTER_U2, "Demographic Metrics", "What does the demographic indicator 'Life Expectancy at Birth' measure?", opts, c, s))

# Q56: Thomas Malthus Negative vs Positive Checks
opts, c, s = rotate_options(
    "Preventive checks (late marriage, moral restraint) and Positive checks (famine, disease, war)",
    ["Export subsidies and tariff barriers", "Vaccination drives and dietary supplements", "Urban highway zoning and real estate taxes"],
    "A",
    "Malthus distinguished between Preventive checks (controlled by humans: moral restraint, delayed marriage) and Positive checks (imposed by nature: famine, misery, pestilence, and war).\nHence, Option {{CORR}} is correct.",
    "Explains Malthus's distinction between preventive and positive checks."
)
add_u2(make_question(CHAPTER_U2, "Malthusian Concepts", "What distinction did Thomas Malthus draw regarding the mechanisms that control human population size?", opts, c, s))

# Q57: Out-migration vs In-migration
opts, c, s = rotate_options(
    "Emigrants are people who move out of a place, while Immigrants are people who move into a new place",
    ["Emigrants move exclusively for tourism, while Immigrants are deported convicts", "Emigrants move only within rural villages, while Immigrants move across oceans", "Both terms are identical and refer to international airline pilots"],
    "B",
    "Immigrants are migrants who move into a new place, adding to its population. Emigrants are migrants who move out of a place, reducing its population.\nHence, Option {{CORR}} is correct.",
    "Distinguishes clearly between Immigrants (entering) and Emigrants (leaving)."
)
add_u2(make_question(CHAPTER_U2, "Migration Terminology", "What is the technical difference between an 'Immigrant' and an 'Emigrant'?", opts, c, s))

# Q58: Place of Origin vs Place of Destination
opts, c, s = rotate_options(
    "Place of origin loses population and experiences decline in pressure on resources, while place of destination gains population",
    ["Both places gain population simultaneously without any births", "Place of origin gains revenue while place of destination ceases to exist", "Neither place experiences any demographic or environmental change"],
    "C",
    "When people migrate from one place to another, the place they move from is called the Place of Origin, and the place they move to is called the Place of Destination. The origin loses population and destination gains.\nHence, Option {{CORR}} is correct.",
    "Describes the demographic impact on place of origin and place of destination."
)
add_u2(make_question(CHAPTER_U2, "Migration Concepts", "What demographic impact occurs when people migrate from a 'Place of Origin' to a 'Place of Destination'?", opts, c, s))

# Q59: Multi-statement on High Population Density Regions
add_u2(make_multi_statement_question(
    CHAPTER_U2, "Density Drivers",
    "Which of the following geographical characteristics explain the dense population concentration in East and South Asia?",
    [
        ("A", "Fertile deltaic and riverine alluvial plains suitable for wet paddy cultivation"),
        ("B", "Favorable monsoonal climate with adequate rainfall and warm growing seasons"),
        ("C", "Long history of continuous agrarian settlement and civilization"),
        ("D", "Presence of perennial ice glaciers covering 90% of lowland territory")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "D",
    "Statements A, B, and C are valid geographical and historical explanations for dense settlement in Monsoon Asia. Statement D is absurd as permanent ice caps prevent agriculture and human habitation.",
    "Explains the physical and historical reasons for heavy population clustering in Monsoon Asia."
))

# Q60: Demographic Dividend
opts, c, s = rotate_options(
    "Economic growth potential that results when the share of the working-age population is larger than the non-working-age share",
    ["Mandatory dividend payments distributed by the national central bank to all newborns", "The doubling of infant mortality rates during famines", "The automatic migration of retirees to seaside resorts"],
    "A",
    "Demographic dividend is the economic growth potential that can result from shifts in a population's age structure, mainly when the share of the working-age population (15 to 59) is larger than the non-working-age share of the population.\nHence, Option {{CORR}} is correct.",
    "Defines the demographic dividend as economic potential of a bulging working-age cohort."
)
add_u2(make_question(CHAPTER_U2, "Demographic Dividend", "What is meant by the demographic concept of 'Demographic Dividend'?", opts, c, s))

validate_and_collect(u2_qs, u2_seen)
assert len(u2_qs) == 60
with open("mock/geo_units/unit2.json", "w", encoding="utf-8") as f:
    json.dump(u2_qs, f, indent=2, ensure_ascii=False)
print("Unit 2 generated: 60 questions")

# =================================================================================================
# UNIT 3: Human Development (40 Questions)
# =================================================================================================
CHAPTER_U3 = "Human Development"
u3_qs = []
u3_seen = set()

def add_u3(q):
    u3_qs.append(q)

# Q1: Dr. Mahbub-ul-Haq
opts, c, s = rotate_options(
    "Dr. Mahbub-ul-Haq",
    ["Dr. Amartya Sen", "Muhammad Yunus", "Manmohan Singh"],
    "A",
    "The concept of human development was introduced by Dr. Mahbub-ul-Haq, a Pakistani economist. He created the Human Development Index (HDI) in 1990 for the United Nations Development Programme (UNDP).\nHence, Option {{CORR}} is correct.",
    "Attributes the introduction of the Human Development concept in 1990 to Dr. Mahbub-ul-Haq."
)
add_u3(make_question(CHAPTER_U3, "Pioneers of Human Development", "Who introduced the concept of 'Human Development' and formulated the Human Development Index (HDI) in 1990?", opts, c, s))

# Q2: Dr. Haq's definition
opts, c, s = rotate_options(
    "Development that enlarges people's choices and improves their lives, with people at the centre of development",
    ["Maximizing industrial steel output and gross military expenditure", "Automating all agriculture to eliminate manual rural employment", "Accumulating foreign currency reserves in offshore bank vaults"],
    "B",
    "Dr. Mahbub-ul-Haq described human development as development that enlarges people's choices and improves their lives. People are central to all development, and choices are not fixed but keep changing.\nHence, Option {{CORR}} is correct.",
    "Defines human development according to Dr. Mahbub-ul-Haq: enlarging people's choices."
)
add_u3(make_question(CHAPTER_U3, "Core Concept", "According to Dr. Mahbub-ul-Haq, what is the central essence of 'Human Development'?", opts, c, s))

# Q3: Growth vs Development
opts, c, s = rotate_options(
    "Growth is quantitative and value neutral, while Development is qualitative and positive in value",
    ["Growth is always positive, while Development is always negative", "Growth refers to social harmony, while Development refers to plant biomass", "Both terms are identical and mean the rise in per capita gross domestic product"],
    "C",
    "Both growth and development refer to changes over a period of time. Growth is quantitative and value neutral—it may have a positive or a negative sign. Development means a qualitative change which is always value positive.\nHence, Option {{CORR}} is correct.",
    "Accurately distinguishes quantitative growth (value neutral) from qualitative development (value positive)."
)
add_u3(make_question(CHAPTER_U3, "Growth vs Development", "What is the crucial conceptual difference between 'Growth' and 'Development' in human geography?", opts, c, s))

# Q4: Four Pillars of Human Development
opts, c, s = rotate_options(
    "Equity, Sustainability, Productivity, and Empowerment",
    ["Income, Wealth, Trade, and Investment", "Land, Labor, Capital, and Enterprise", "Liberty, Equality, Fraternity, and Justice"],
    "D",
    "Human development rests on four foundational pillars: Equity (equal access to opportunities), Sustainability (continuity in availability of opportunities), Productivity (human labor productivity through capability building), and Empowerment (power to make choices).\nHence, Option {{CORR}} is correct.",
    "Lists the four pillars of human development: Equity, Sustainability, Productivity, Empowerment."
)
add_u3(make_question(CHAPTER_U3, "Four Pillars", "What are the 'Four Pillars' upon which the human development paradigm is constructed?", opts, c, s))

# Q5: Equity Pillar
opts, c, s = rotate_options(
    "Making equal access to opportunities available to everybody irrespective of gender, race, income, or caste",
    ["Ensuring every citizen receives identical monetary salaries", "Confiscating all private agricultural farms", "Banning international trade between sovereign states"],
    "A",
    "Equity refers to making equal access to opportunities available to everybody. The opportunities available to people must be equal irrespective of their gender, race, income, and in the Indian case, caste.\nHence, Option {{CORR}} is correct.",
    "Explains the Equity pillar as equal access to opportunities regardless of social background."
)
add_u3(make_question(CHAPTER_U3, "Pillars: Equity", "In human development theory, what does the pillar of 'Equity' signify?", opts, c, s))

# Q6: Sustainability Pillar
opts, c, s = rotate_options(
    "Continuity in the availability of opportunities across generations without exhausting environmental or financial resources",
    ["Operating thermal power plants at maximum capacity 24 hours a day", "Maintaining constant high inflation in consumer goods", "Preventing all young people from attending universities"],
    "B",
    "Sustainability means continuity in the availability of opportunities. To have sustainable human development, each generation must have the same opportunities. All environmental, financial, and human resources must be used keeping in mind the future.\nHence, Option {{CORR}} is correct.",
    "Defines the Sustainability pillar as intergenerational continuity of opportunities."
)
add_u3(make_question(CHAPTER_U3, "Pillars: Sustainability", "What is meant by the pillar of 'Sustainability' in the context of human development?", opts, c, s))

# Q7: Productivity Pillar
opts, c, s = rotate_options(
    "Human labor productivity or productivity in terms of human work, enhanced through capabilities building, health, and education",
    ["The total tonnage of coal mined per square kilometer", "The number of automated machines manufactured in a factory", "The speed of freight railway trains across transcontinental tracks"],
    "C",
    "Productivity here means human labor productivity or productivity in terms of human work. Such productivity must be constantly enriched by building capabilities in people through health, education, and skills.\nHence, Option {{CORR}} is correct.",
    "Explains Productivity in human development as investing in human capability and health."
)
add_u3(make_question(CHAPTER_U3, "Pillars: Productivity", "How is the pillar of 'Productivity' understood within human development discourse?", opts, c, s))

# Q8: Empowerment Pillar
opts, c, s = rotate_options(
    "Having the power to make choices, stemming from increasing freedom, capability, and good governance",
    ["Authoritarian centralized command over all media channels", "Complete deregulation of financial monopolies without consumer laws", "Compulsory state assignment of occupations to university graduates"],
    "D",
    "Empowerment means to have the power to make choices. Such power comes from increasing freedom and capability. Good governance and people-oriented policies are required to empower people, especially marginalized groups.\nHence, Option {{CORR}} is correct.",
    "Defines Empowerment as gaining the power and freedom to make meaningful choices."
)
add_u3(make_question(CHAPTER_U3, "Pillars: Empowerment", "What is the core meaning of 'Empowerment' as a pillar of human development?", opts, c, s))

# Q9: Amartya Sen's Capability Approach
opts, c, s = rotate_options(
    "Prof. Amartya Sen",
    ["Milton Friedman", "Joseph Stiglitz", "Paul Krugman"],
    "A",
    "The Capability Approach is associated with Prof. Amartya Sen. Building human capabilities in health, education, and access to resources is the key to increasing human development and enlarging human freedoms.\nHence, Option {{CORR}} is correct.",
    "Associates the Capability Approach to human development with Nobel laureate Amartya Sen."
)
add_u3(make_question(CHAPTER_U3, "Approaches to Human Development", "The 'Capability Approach' to human development, emphasizing the enhancement of human freedoms through capabilities, was propounded by:", opts, c, s))

# Q10: Four Approaches to Human Development
opts, c, s = rotate_options(
    "Income Approach, Welfare Approach, Basic Needs Approach, and Capability Approach",
    ["Mercantile Approach, Physiocratic Approach, Monetarist Approach, and Supply-side Approach", "Command Approach, Laissez-faire Approach, Feudal Approach, and Anarchist Approach", "Military Approach, Religious Approach, Diplomatic Approach, and Colonial Approach"],
    "B",
    "There are four major approaches to human development: (1) Income Approach, (2) Welfare Approach, (3) Basic Needs Approach (ILO), and (4) Capability Approach (Amartya Sen).\nHence, Option {{CORR}} is correct.",
    "Identifies the four historical approaches to human development."
)
add_u3(make_question(CHAPTER_U3, "Approaches", "Which of the following sets correctly lists the 'Four Approaches' to human development?", opts, c, s))

# Q11: Basic Needs Approach (ILO)
opts, c, s = rotate_options(
    "International Labour Organisation (ILO)",
    ["World Bank", "International Monetary Fund (IMF)", "World Health Organization (WHO)"],
    "C",
    "The Basic Needs Approach was initially proposed by the International Labour Organisation (ILO). Six basic needs were identified: health, education, food, water supply, sanitation, and housing.\nHence, Option {{CORR}} is correct.",
    "Identifies the International Labour Organisation (ILO) as proposer of Basic Needs Approach."
)
add_u3(make_question(CHAPTER_U3, "Approaches", "The 'Basic Needs Approach' to human development, identifying six essential human needs, was initially proposed by which international agency?", opts, c, s))

# Q12: Six Basic Needs of ILO
opts, c, s = rotate_options(
    "Health, education, food, water supply, sanitation, and housing",
    ["Television, mobile phones, internet, automobiles, flights, and cosmetics", "Gold, silver, diamonds, stocks, bonds, and mutual funds", "Weapons, ammunition, uniforms, radar, satellites, and barracks"],
    "D",
    "The International Labour Organisation (ILO) identified six basic needs: Health, Education, Food, Water supply, Sanitation, and Housing. The question of human choices is ignored in this approach.\nHence, Option {{CORR}} is correct.",
    "Lists the six basic needs formulated by the ILO."
)
add_u3(make_question(CHAPTER_U3, "Basic Needs Approach", "Which six basic human needs were identified under the ILO's 'Basic Needs Approach'?", opts, c, s))

# Q13: Income Approach
opts, c, s = rotate_options(
    "One of the oldest approaches, linking human development directly to the level of income",
    ["A radical post-modern approach eliminating paper currency", "Focuses exclusively on barter trade in tribal markets", "Measures development strictly by calorie consumption"],
    "A",
    "The Income Approach is one of the oldest approaches. It links human development directly to income: the higher the level of income, the higher is the level of human development.\nHence, Option {{CORR}} is correct.",
    "Characterizes the Income Approach as one of the oldest, linking development to income level."
)
add_u3(make_question(CHAPTER_U3, "Approaches: Income", "What is the defining premise of the 'Income Approach' to human development?", opts, c, s))

# Q14: Welfare Approach
opts, c, s = rotate_options(
    "Looks at human beings as beneficiaries or targets of development, arguing for higher government expenditure on education, health, and amenities",
    ["Requires citizens to pay 100% tax on all income to fund military expansion", "Prohibits the state from providing any social security benefits", "Asserts that only private corporations should run hospitals and schools"],
    "B",
    "The Welfare Approach looks at human beings as beneficiaries of all development activities. It argues for higher government expenditure on education, health, social secondary, and amenities without people being active participants.\nHence, Option {{CORR}} is correct.",
    "Defines the Welfare Approach as viewing people as passive beneficiaries of state social spending."
)
add_u3(make_question(CHAPTER_U3, "Approaches: Welfare", "How does the 'Welfare Approach' conceptualize human beings in the development process?", opts, c, s))

# Q15: Three Dimensions of HDI
opts, c, s = rotate_options(
    "Health (life expectancy), Education (literacy/schooling), and Access to Resources (purchasing power)",
    ["Military strength, Nuclear warheads, and Naval fleet size", "Total land area, Forest cover percentage, and Length of coastline", "Annual rainfall, Average temperature, and Mineral export volume"],
    "C",
    "The Human Development Index (HDI) measures attainments in three key areas of human development: Health (life expectancy at birth), Education (adult literacy and gross enrolment ratio), and Access to resources (purchasing power in US dollars).\nHence, Option {{CORR}} is correct.",
    "Specifies the three key dimensions of the Human Development Index: health, education, access to resources."
)
add_u3(make_question(CHAPTER_U3, "HDI Measurement", "What are the three core dimensions evaluated by the Human Development Index (HDI)?", opts, c, s))

# Q16: Weightage of dimensions in HDI
opts, c, s = rotate_options(
    "Each of the three dimensions is given an equal weightage of 1/3",
    ["Health gets 80%, while Education and Income get 10% each", "Income gets 90%, while Health gets 10%", "Weightages change every week based on stock market fluctuations"],
    "D",
    "In calculating the HDI, each of these three dimensions (health, education, access to resources) is given a weightage of 1/3, resulting in a composite score between 0 and 1.\nHence, Option {{CORR}} is correct.",
    "Identifies that each of the three HDI dimensions receives an equal 1/3 weight."
)
add_u3(make_question(CHAPTER_U3, "HDI Calculation", "What weightage is assigned to each of the three dimensions when computing the composite Human Development Index score?", opts, c, s))

# Q17: HDI Score Range
opts, c, s = rotate_options(
    "Between 0 and 1, where closer to 1 represents higher human development",
    ["Between -100 and +100, where zero is perfect equality", "Between 1 and 1000, where 1 represents maximum development", "Between 0 and 100 percent"],
    "A",
    "The Human Development Index assigns a score between 0 and 1. The closer a score is to 1, the greater is the level of human development (e.g. 0.983 is very high, while 0.268 is very low).\nHence, Option {{CORR}} is correct.",
    "Identifies the 0 to 1 score range of the Human Development Index."
)
add_u3(make_question(CHAPTER_U3, "HDI Scale", "On what numerical scale is the Human Development Index (HDI) scored?", opts, c, s))

# Q18: Human Poverty Index (HPI)
opts, c, s = rotate_options(
    "Measures the shortfall in human development, focusing on non-income deprivations like probability of not surviving to age 40 and adult illiteracy",
    ["Calculates only the national foreign debt in Swiss Francs", "Measures the number of luxury vehicles owned per capita", "Measures the annual budget deficit of municipal city councils"],
    "B",
    "The Human Poverty Index (HPI) measures the shortfall in human development. It is a non-income measure looking at probability of not surviving to age 40, adult illiteracy rate, number of people lacking clean water, and underweight children.\nHence, Option {{CORR}} is correct.",
    "Explains Human Poverty Index (HPI) as a measure of shortfalls and non-income deprivations."
)
add_u3(make_question(CHAPTER_U3, "Human Poverty Index", "What is the primary conceptual focus of the 'Human Poverty Index' (HPI) introduced alongside the HDI?", opts, c, s))

# Q19: Gross National Happiness (GNH)
opts, c, s = rotate_options(
    "Bhutan",
    ["Nepal", "Sri Lanka", "Myanmar"],
    "C",
    "Bhutan is the only country in the world to officially proclaim the Gross National Happiness (GNH) as the measure of the country's progress. Material progress cannot come at the cost of spiritual and environmental harmony.\nHence, Option {{CORR}} is correct.",
    "Identifies Bhutan as the pioneer of Gross National Happiness (GNH)."
)
add_u3(make_question(CHAPTER_U3, "Gross National Happiness", "Which country is unique in the world for officially adopting 'Gross National Happiness' (GNH) as the premier measure of its national progress?", opts, c, s))

# Q20: Four Tiers of Human Development
opts, c, s = rotate_options(
    "Very High (0.800 and above), High (0.700 to 0.799), Medium (0.550 to 0.699), and Low (below 0.550)",
    ["Grade A (over 90%), Grade B (75-89%), Grade C (50-74%), Grade D (below 50%)", "Level 1 (over $50,000), Level 2 ($20,000-$49,999), Level 3 ($5,000-$19,999), Level 4 (<$5,000)", "Tier 1 to Tier 10 based on Olympic gold medals won"],
    "D",
    "Countries are classified into four groups on the basis of human development scores: Very High (above 0.800), High (between 0.700 and 0.799), Medium (between 0.550 and 0.699), and Low (below 0.550).\nHence, Option {{CORR}} is correct.",
    "Details the four standard score brackets of human development levels."
)
add_u3(make_question(CHAPTER_U3, "Classification Tiers", "According to UNDP classification benchmarks, what are the four tiers of human development scores?", opts, c, s))

# Q21: Country with Rank 1 in HDI historically
opts, c, s = rotate_options(
    "Norway",
    ["United States of America", "Japan", "United Kingdom"],
    "A",
    "Norway has frequently topped the global Human Development Index rankings, characterized by very high life expectancy, high public investment in social welfare, universal education, and gender equality.\nHence, Option {{CORR}} is correct.",
    "Identifies Norway as a perennial top-ranked nation in the Human Development Index."
)
add_u3(make_question(CHAPTER_U3, "Global Rankings", "Which country has frequently held the Rank 1 position in the UNDP global Human Development Index?", opts, c, s))

# Q22: Common trait of Top HDI Countries
opts, c, s = rotate_options(
    "High social sector investments in healthcare and education, combined with political stability and gender empowerment",
    ["Massive stockpiles of nuclear weapons and imperial colonies", "Enormous military defence budgets exceeding 50% of GDP", "Total privatization of water, primary schooling, and roads"],
    "B",
    "Countries with very high human development scores consistently invest heavily in the social sectors (education and health) and are characterized by good governance, high female empowerment, and political freedom.\nHence, Option {{CORR}} is correct.",
    "Highlights social sector investment, education, and good governance in top HDI nations."
)
add_u3(make_question(CHAPTER_U3, "High HDI Drivers", "What common characteristic is shared by countries with 'Very High Human Development' scores?", opts, c, s))

# Q23: Reason for Low HDI in Low Tier Countries
opts, c, s = rotate_options(
    "Political turmoil, civil war, famines, high incidence of diseases, and low investment in social sectors",
    ["Excessive spending on public universities and free healthcare clinics", "Over-consumption of organic food and renewable solar energy", "Strict environmental protection laws halting all mining"],
    "C",
    "Countries with low human development levels often suffer from political instability, civil war, social instability, famine, defense spending over social sectors, and high incidence of infectious diseases.\nHence, Option {{CORR}} is correct.",
    "Identifies civil strife, disease, and poor social spending as causes of low HDI."
)
add_u3(make_question(CHAPTER_U3, "Low HDI Drivers", "What are the primary factors contributing to low human development scores in countries ranked at the bottom of the HDI table?", opts, c, s))

# Q24: Match Approaches with Proponents/Characteristics
add_u3(make_match_question(
    CHAPTER_U3, "Approaches Comparison",
    "Match List I (Approach to Human Development) with List II (Key Proponent / Distinct Feature):",
    [("A", "Income Approach"), ("B", "Welfare Approach"), ("C", "Basic Needs Approach"), ("D", "Capability Approach")],
    [("I", "International Labour Organisation (ILO)"), ("II", "Prof. Amartya Sen"), ("III", "Oldest approach linking development directly to money income"), ("IV", "State spending on health and education viewing humans as beneficiaries")],
    "A-III, B-IV, C-I, D-II", "D",
    "Income approach is the oldest (III); Welfare approach focuses on state expenditure on beneficiaries (IV); Basic Needs was proposed by ILO (I); Capability approach was created by Amartya Sen (II).",
    "Matches human development approaches to their proponents and hallmarks."
))

# Q25: Match Pillars of Human Development
add_u3(make_match_question(
    CHAPTER_U3, "Four Pillars",
    "Match List I (Pillar of Human Development) with List II (Guiding Principle):",
    [("A", "Equity"), ("B", "Sustainability"), ("C", "Productivity"), ("D", "Empowerment")],
    [("I", "Building human capabilities through health, knowledge, and labor skills"), ("II", "Equal access to opportunities regardless of gender, race, or caste"), ("III", "Power to make choices through increasing freedom and good governance"), ("IV", "Continuity of opportunities for present and future generations")],
    "A-II, B-IV, C-I, D-III", "A",
    "Equity is equal access to opportunities (II); Sustainability is continuity across generations (IV); Productivity is capability building in people (I); Empowerment is the freedom and power to make choices (III).",
    "Correctly links each pillar of human development to its operative principle."
))

# Q26: Statement Question on HDI vs HPI
add_u3(make_statement_question(
    CHAPTER_U3, "Measurement Indices",
    "The Human Development Index (HDI) measures attainments in human development.",
    "The Human Poverty Index (HPI) measures the shortfall in human development.",
    1, "B",
    "Both statements are correct. HDI reflects achievements in key dimensions of human development, while HPI reflects the shortfalls and deprivations in those same areas.",
    "Affirms that HDI measures attainments while HPI measures shortfalls."
))

# Q27: Assertion-Reason on GNH in Bhutan
add_u3(make_assertion_question(
    CHAPTER_U3, "Gross National Happiness",
    "Bhutan officially measures its national progress using Gross National Happiness (GNH) rather than purely Gross Domestic Product.",
    "Material progress and technological advancements must not come at the expense of spiritual well-being and natural environment harmony.",
    1, "C",
    "Both Assertion and Reason are true, and Reason is the correct explanation. Bhutan's philosophy recognizes that economic expansion without spiritual harmony and ecological preservation degrades true human welfare.",
    "Explains Bhutan's philosophy of balancing material progress with spiritual and ecological health."
))

# Q28: Access to Resources Indicator
opts, c, s = rotate_options(
    "Purchasing power in US dollars (Gross National Income per capita in PPP $)",
    ["Total tons of gold held in the national central bank", "Per capita consumption of electricity in kilowatt hours", "Number of ATM cards issued per thousand households"],
    "D",
    "Access to resources is measured by purchasing power in US dollars, specifically Gross National Income (GNI) per capita adjusted for Purchasing Power Parity (PPP $).\nHence, Option {{CORR}} is correct.",
    "Identifies Purchasing Power Parity in US dollars (GNI per capita) as resource access metric."
)
add_u3(make_question(CHAPTER_U3, "HDI Indicators", "In the calculation of the Human Development Index, how is 'Access to Resources' evaluated?", opts, c, s))

# Q29: Educational Attainment Indicator in HDI
opts, c, s = rotate_options(
    "Expected years of schooling for school-age children and Mean years of schooling for adults aged 25+",
    ["Number of school buildings constructed in rural districts", "Total expenditure on sports equipment in secondary schools", "Percentage of students who pass competitive civil service exams"],
    "A",
    "Educational attainment in the modern HDI is measured by two indicators: Mean years of schooling for adults aged 25 and older, and Expected years of schooling for children of school-entering age.\nHence, Option {{CORR}} is correct.",
    "Accurately specifies the two educational indicators: mean and expected years of schooling."
)
add_u3(make_question(CHAPTER_U3, "HDI Indicators", "Which indicators are used by the UNDP to assess the education dimension in the Human Development Index?", opts, c, s))

# Q30: Health Dimension Indicator in HDI
opts, c, s = rotate_options(
    "Life expectancy at birth",
    ["Number of multi-speciality private hospital beds per city", "Per capita consumption of pharmaceutical drugs", "Number of registered dental clinics per district"],
    "B",
    "The health dimension is assessed by Life Expectancy at Birth, which reflects the overall health, longevity, and disease environment of a population.\nHence, Option {{CORR}} is correct.",
    "Identifies Life Expectancy at Birth as the sole health indicator in HDI."
)
add_u3(make_question(CHAPTER_U3, "HDI Indicators", "What single primary indicator is used to evaluate the health dimension in the Human Development Index?", opts, c, s))

# Q31: Multi-statement on Reasons for High Development Scores
add_u3(make_multi_statement_question(
    CHAPTER_U3, "High Human Development",
    "Which of the following characteristics are commonly observed in countries with 'High' and 'Very High' human development scores?",
    [
        ("A", "Most of them are located in Europe and represent industrialized Western economies."),
        ("B", "They dedicate a significant proportion of public revenue to healthcare and education rather than defense."),
        ("C", "They have achieved substantial gender parity and low maternal mortality."),
        ("D", "They rely exclusively on nomadic pastoralism without modern civic infrastructure.")
    ],
    "(A), (B) and (C) only",
    ["(A) and (D) only", "(B) and (D) only", "(A), (B), (C) and (D)"],
    "C",
    "Statements A, B, and C are correct attributes of high HDI countries. Statement D is false because high HDI countries are highly industrialized and urbanized with advanced infrastructure.",
    "Identifies common institutional and social attributes of high HDI nations."
))

# Q32: Medium Human Development Group size
opts, c, s = rotate_options(
    "Countries that emerged after World War II or were former colonies, actively improving social infrastructure (e.g. India)",
    ["Countries with continuous negative economic growth since 1800", "Small island nations that have eliminated all trade relations", "Nations with 100% illiteracy and zero hospital facilities"],
    "D",
    "Countries in the medium human development group are the largest group, many of which emerged after the Second World War as newly independent nations. Many are rapidly expanding investments in social welfare and infrastructure (like India).\nHence, Option {{CORR}} is correct.",
    "Describes the characteristics of the medium human development group."
)
add_u3(make_question(CHAPTER_U3, "Medium HDI Tier", "Which description best fits the majority of countries classified in the 'Medium Human Development' tier?", opts, c, s))

# Q33: Size of economy vs Human Development
opts, c, s = rotate_options(
    "Relatively smaller economies like Sri Lanka and Kerala (in India) can have higher human development ranks than much larger economic giants",
    ["Only nations with the world's largest GDP can ever achieve high human development", "Human development is mathematically identical to total military tank inventory", "Smaller nations are permanently barred from scoring above 0.500 in HDI"],
    "A",
    "Size of the territory and per capita income are not directly correlated with human development. Often smaller economies have done better than their larger neighbours (e.g. Sri Lanka, Trinidad and Tobago have higher ranks than India; Kerala outperforms richer Indian states).\nHence, Option {{CORR}} is correct.",
    "Points out that human development is independent of mere geographical or GDP size."
)
add_u3(make_question(CHAPTER_U3, "Economics and HDI", "What is an important finding regarding the relationship between the physical/economic size of a country and its Human Development rank?", opts, c, s))

# Q34: Human Development Report publication
opts, c, s = rotate_options(
    "United Nations Development Programme (UNDP) annually since 1990",
    ["World Trade Organization (WTO) bi-annually since 1995", "World Economic Forum (WEF) every five years since 1971", "International Red Cross annually since 1919"],
    "B",
    "The Human Development Report has been published annually by the United Nations Development Programme (UNDP) since 1990.\nHence, Option {{CORR}} is correct.",
    "Identifies UNDP as publisher of the Human Development Report annually since 1990."
)
add_u3(make_question(CHAPTER_U3, "Publishing Authority", "Which organization publishes the annual 'Human Development Report' containing global HDI rankings?", opts, c, s))

# Q35: Meaning of Freedom in Human Development
opts, c, s = rotate_options(
    "Freedom to lead a long, healthy life, to be educated, and to have access to resources for a decent standard of living",
    ["Freedom to evade domestic income taxes without legal penalty", "Freedom to engage in industrial pollution without environmental filters", "Freedom to ignore all highway traffic regulations"],
    "C",
    "In human development, leading a long and healthy life, being able to gain knowledge, and having enough means to be able to live a decent life are the most important aspects of human freedom.\nHence, Option {{CORR}} is correct.",
    "Defines authentic human freedom in the human development paradigm."
)
add_u3(make_question(CHAPTER_U3, "Foundational Values", "In the philosophy of human development, what constitutes genuine 'human freedom'?", opts, c, s))

# Q36: Statement on Gender and Human Development
add_u3(make_statement_question(
    CHAPTER_U3, "Gender Dimensions",
    "Human development is impossible without gender equity and the empowerment of women.",
    "Empowerment means providing equal access to opportunities only to male workers in heavy manufacturing.",
    3, "D",
    "Statement I is correct: sustainable human development requires full inclusion and empowerment of women. Statement II is false: empowerment explicitly targets marginalized groups, particularly women and disadvantaged social categories.",
    "Analyzes the centrality of gender equity in human development."
))

# Q37: Capability Building and Freedom
opts, c, s = rotate_options(
    "Increases people's choices and enables them to lead lives they have reason to value",
    ["Forces all individuals into identical administrative desk jobs", "Eliminates all differences in regional cultural arts and languages", "Decreases the life expectancy of older citizens"],
    "A",
    "Building capabilities in people—through education, healthcare, and skill development—expands their real choices and empowers them to lead lives they value.\nHence, Option {{CORR}} is correct.",
    "Explains how capability building expands meaningful human choices."
)
add_u3(make_question(CHAPTER_U3, "Capability Approach", "According to Amartya Sen, how does building human capabilities influence people's lives?", opts, c, s))

# Q38: Pre-requisite for Human Development
opts, c, s = rotate_options(
    "Good governance, peaceful civil society, and people-oriented public policies",
    ["Continuous civil warfare and military border skirmishes", "Monopoly control of all agricultural farmland by foreign syndicates", "Elimination of public education and closing of primary schools"],
    "B",
    "Good governance, social peace, political freedom, and people-centered public policies are the essential prerequisites for advancing human development.\nHence, Option {{CORR}} is correct.",
    "Identifies good governance and people-oriented policies as essential prerequisites."
)
add_u3(make_question(CHAPTER_U3, "Prerequisites", "Which of the following conditions is an indispensable prerequisite for achieving sustained human development in a nation?", opts, c, s))

# Q39: Assertion-Reason on Human Development vs Economic Growth
add_u3(make_assertion_question(
    CHAPTER_U3, "Growth vs Development",
    "Economic growth does not automatically lead to human development.",
    "Economic growth may remain concentrated among a small elite, while social spending on public health and basic education is neglected.",
    1, "C",
    "Both Assertion and Reason are true, and Reason correctly explains the Assertion. High GDP growth can coexist with widespread poverty, malnutrition, and illiteracy if wealth is not invested in human capabilities.",
    "Explains why GDP growth does not guarantee human development."
))

# Q40: Ultimate Goal of Development
opts, c, s = rotate_options(
    "Creating an enabling environment for people to enjoy long, healthy, and creative lives",
    ["Building the maximum number of skyscrapers in the national capital", "Exhausting all national mineral reserves within ten years", "Achieving global supremacy in heavy industrial exports alone"],
    "D",
    "The basic goal of development is to create conditions where people can live a meaningful life—a life with some purpose, where people develop their talents, participate in society, and are free to achieve their goals.\nHence, Option {{CORR}} is correct.",
    "States the ultimate objective of human development: enabling people to lead long, healthy, meaningful lives."
)
add_u3(make_question(CHAPTER_U3, "Philosophy", "What is the ultimate, overarching objective of the human development paradigm?", opts, c, s))

validate_and_collect(u3_qs, u3_seen)
assert len(u3_qs) == 40
with open("mock/geo_units/unit3.json", "w", encoding="utf-8") as f:
    json.dump(u3_qs, f, indent=2, ensure_ascii=False)
print("Unit 3 generated: 40 questions")
print("Total questions in part_a1:", len(u1_qs) + len(u2_qs) + len(u3_qs))
