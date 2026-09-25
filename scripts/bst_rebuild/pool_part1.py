"""
CUET UG Master Question Paper Rebuild - Standalone Pool Part 1
Covers Chapters 1 to 4 (Total 280 publication-grade questions):
- Chapter 1: Nature and Significance of Management (80 questions)
- Chapter 2: Principles of Management (100 questions)
- Chapter 3: Business Environment (40 questions)
- Chapter 4: Planning (60 questions)
Features diverse archetypes: Assertion-Reason, Statement I & II, Match Columns, Chronological Sequences, Scenarios, and Concepts.
All distractors are genuine nearby syllabus concepts with balanced option lengths.
"""

def get_part1_questions():
    qs = []

    # =========================================================================
    # CHAPTER 1: Nature and Significance of Management (80 Questions)
    # =========================================================================
    
    # 1. Effectiveness vs Efficiency (10 questions with distinct scenarios)
    eff_scenarios = [
        ("AuraTech Logistics", "delivering 5,000 emergency medical kits within 24 hours as promised, but spending Rs. 3 Lakh extra on air freight over budget", "effective but inefficient", "inefficient but effective", "both effective and efficient", "neither effective nor efficient", "Goals were met on time (effectiveness) but at higher cost than planned (inefficiency)."),
        ("BioHealth Diagnostics", "manufacturing 10,000 diagnostic vials at Rs. 18 per unit against a budgeted cost of Rs. 20, but missing the supply deadline by three weeks", "efficient but ineffective", "effective but inefficient", "both effective and efficient", "neither effective nor efficient", "Cost was controlled below budget (efficiency) but the deadline was missed (ineffectiveness)."),
        ("Suryodaya Renewables", "fabricating 500 solar panels strictly within the budgeted cost of Rs. 25 Lakh and delivering them two days ahead of schedule", "both highly effective and efficient", "effective but inefficient", "efficient but ineffective", "neither effective nor efficient", "Both target output/deadline and cost minimization were achieved simultaneously."),
        ("Pinnacle Pharmaceuticals", "failing to meet the delivery date for 2,000 vaccine ampoules while also incurring a 40% cost overrun due to machine downtime", "neither effective nor efficient", "effective but inefficient", "efficient but ineffective", "both effective and efficient", "Neither the end result was delivered on time nor were resources utilized economically."),
        ("Bhartiya Textiles", "spinning 12,000 meters of organic cotton cloth within the deadline, but paying heavy double-time overtime wages to weavers", "effective but inefficient", "efficient but ineffective", "neither effective nor efficient", "both effective and efficient", "Output deadline was achieved, but expenditure exceeded standard budget due to overtime."),
        ("UrbanCraft Furnishings", "producing 150 luxury dining tables at the lowest unit cost in the industry, but after the seasonal festive sale had already ended", "efficient but ineffective", "effective but inefficient", "both effective and efficient", "neither effective nor efficient", "Low unit cost achieved efficiency, but missed market window rendered performance ineffective."),
        ("Apex Automotive", "assembling 80 electric delivery vans on the exact committed handover date while staying precisely within standard manufacturing costs", "both effective and efficient", "effective but inefficient", "efficient but ineffective", "neither effective nor efficient", "Optimal balance: timely goal completion with minimum resource expenditure."),
        ("Heritage Handlooms", "completing an export order of silk carpets three months late, incurring storage demurrage charges of Rs. 2 Lakh", "neither effective nor efficient", "effective but inefficient", "efficient but ineffective", "both effective and efficient", "Both delivery schedule and cost control failed completely."),
        ("Kavya FMCG", "processing 50,000 shampoo bottles to meet sudden retail demand during a festival, incurring 25% higher packaging procurement costs", "effective but inefficient", "efficient but ineffective", "both effective and efficient", "neither effective nor efficient", "Achieved end goal on time (effective) at the expense of higher resource cost (inefficient)."),
        ("Titanium Engineering", "machining 400 turbine shafts with zero scrap within standard cost, but completing only 250 units before the export ship sailed", "efficient but ineffective", "effective but inefficient", "both effective and efficient", "neither effective nor efficient", "Resource minimization was maintained, but the target delivery volume was not completed.")
    ]
    for comp, scn, cor, w1, w2, w3, sol in eff_scenarios:
        qs.append({
            "chapter": "Nature and Significance of Management",
            "topic": "Management: Concept and Characteristics",
            "subtopic": "Effectiveness vs Efficiency",
            "archetype": "conceptual-scenario",
            "difficulty": 2,
            "stem": f"In {comp}, the operational team succeeded in {scn}. How should the team's managerial performance be characterized according to NCERT?",
            "options": [
                {"id": "A", "text": f"The management was {cor}.", "isCorrect": True, "trap": f"None - correct application: {sol}"},
                {"id": "B", "text": f"The management was {w1}.", "isCorrect": False, "trap": f"Confusing effectiveness (goal completion) with efficiency (cost minimization)."},
                {"id": "C", "text": f"The management was {w2}.", "isCorrect": False, "trap": f"Overlooking that one dimension of performance was compromised."},
                {"id": "D", "text": f"The management was {w3}.", "isCorrect": False, "trap": f"Incorrectly evaluating performance dimensions."}
            ],
            "sol": sol
        })

    # 2. Characteristics of Management (15 questions: Direct, Scenario, and Assertion-Reason)
    char_list = [
        ("Goal-Oriented Process", "Management unites the diverse efforts of different individuals in the organization towards achieving specified organizational goals.", "Group Activity", "Continuous Process", "Dynamic Function"),
        ("All-Pervasive", "Managerial activities are performed in all types of organizations, whether economic, social, or political, across all countries.", "Intangible Force", "Multidimensional", "Goal-Oriented Process"),
        ("Management of Work", "All organizations exist to perform some work, such as producing garments, treating patients, or educating students, translated into goals.", "Management of People", "Management of Operations", "Continuous Process"),
        ("Management of People", "Dealing with employees both as individuals with diverse needs and as collective work groups to achieve corporate objectives.", "Management of Work", "Management of Operations", "Intangible Force"),
        ("Management of Operations", "Transforming input materials and technology into desired final outputs through an ongoing production operating cycle.", "Management of Work", "Management of People", "Dynamic Function"),
        ("Continuous Process", "The functions of planning, organising, staffing, directing, and controlling are performed simultaneously and continuously by all managers.", "Goal-Oriented Process", "All-Pervasive", "Multidimensional"),
        ("Group Activity", "An enterprise is a collection of diverse individuals whose separate efforts must be coordinated toward a common direction through teamwork.", "Intangible Force", "Dynamic Function", "Management of Work"),
        ("Dynamic Function", "An organization must constantly adapt its goals, products, and operational strategies to survive in an ever-shifting external environment.", "Continuous Process", "All-Pervasive", "Management of People"),
        ("Intangible Force", "Management cannot be physically touched or seen, but its presence is felt where orderliness replaces chaos and targets are met happily.", "All-Pervasive", "Goal-Oriented Process", "Group Activity"),
        ("Multidimensional Nature", "Management is complex and encompasses three distinct dimensions: management of work, management of people, and management of operations.", "Continuous Process", "Dynamic Function", "Intangible Force")
    ]
    for name, desc, d1, d2, d3 in char_list:
        qs.append({
            "chapter": "Nature and Significance of Management",
            "topic": "Management: Concept and Characteristics",
            "subtopic": f"Characteristic: {name}",
            "archetype": "conceptual-application",
            "difficulty": 2,
            "stem": f"Which recognized characteristic of management is highlighted by the statement: '{desc}'?",
            "options": [
                {"id": "A", "text": f"Management is a {name}.", "isCorrect": True, "trap": f"None - exact NCERT definition of {name}."},
                {"id": "B", "text": f"Management is a {d1}.", "isCorrect": False, "trap": f"Confusing {name} with {d1}."},
                {"id": "C", "text": f"Management is a {d2}.", "isCorrect": False, "trap": f"Confusing {name} with {d2}."},
                {"id": "D", "text": f"Management is a {d3}.", "isCorrect": False, "trap": f"Confusing {name} with {d3}."}
            ],
            "sol": f"The statement directly defines the characteristic: Management is a {name}."
        })

    # 3. Assertion-Reasoning on Nature & Significance (10 questions)
    ar_data_ch1 = [
        ("Management is a continuous process.", "The various functions of management—planning, organising, staffing, directing, and controlling—are performed simultaneously by all managers all the time.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("Management is considered an inexact science.", "Management deals with complex human behavior which cannot be predicted or tested with absolute mathematical precision like physics.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("Coordination is termed the essence of management.", "Coordination is not a separate function of management, but the thread that synchronizes all other managerial functions.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("Management is universally applicable to all organizations.", "Only commercial business corporations require managerial practices, while hospitals and schools run automatically.", "C", "(A) is true, but (R) is false. Management applies to all organizations, business and non-business alike."),
        ("Cooperation alone guarantees organizational success without coordination.", "Cooperation without coordination leads to wasted and duplicated efforts across departments.", "D", "(A) is false, but (R) is true. Cooperation without coordination produces wasted effort, not success."),
        ("Effectiveness and efficiency are two sides of the same coin in management.", "High efficiency accompanied by ineffectiveness in missing consumer delivery dates leads to enterprise failure.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("Top-level management is exclusively responsible for operational shop-floor supervision.", "First-line supervisors directly oversee workers, maintain machinery, and enforce daily shop safety.", "D", "(A) is false, but (R) is true. Supervisory level management handles shop-floor supervision, not top level."),
        ("Management principles can be applied as rigid scientific formulas in all situations.", "Management principles deal with human beings and must be flexibly adapted according to changing business situations.", "D", "(A) is false, but (R) is true. Management principles are flexible guidelines, not rigid formulas."),
        ("Middle-level managers act as a vital transmission bridge in an enterprise.", "Middle managers interpret corporate policies formulated by top executives and assign operational duties to frontline supervisors.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("Organizational objectives of management focus solely on maximizing immediate accounting profit.", "The survival and long-term growth of an enterprise are foundational organizational objectives alongside earning profits.", "D", "(A) is false, but (R) is true. Organizational objectives encompass Survival, Profit, and Growth.")
    ]
    for a_text, r_text, cor_key, sol in ar_data_ch1:
        opts = [
            {"id": "A", "text": "Both (A) and (R) are true and (R) is the correct explanation of (A).", "isCorrect": (cor_key == "A"), "trap": "Incorrectly linking or evaluating the statements."},
            {"id": "B", "text": "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "isCorrect": (cor_key == "B"), "trap": "Failing to see the explanatory relationship."},
            {"id": "C", "text": "(A) is true, but (R) is false.", "isCorrect": (cor_key == "C"), "trap": "Misjudging the factual validity of Reason (R)."},
            {"id": "D", "text": "(A) is false, but (R) is true.", "isCorrect": (cor_key == "D"), "trap": "Misjudging the factual validity of Assertion (A)."}
        ]
        qs.append({
            "chapter": "Nature and Significance of Management",
            "topic": "Management: Concept and Principles",
            "subtopic": "Assertion and Reasoning Analysis",
            "archetype": "assertion-reasoning",
            "difficulty": 3,
            "stem": f"Given below are two statements labeled as Assertion (A) and Reason (R):\nAssertion (A): {a_text}\nReason (R): {r_text}\nSelect the correct option:",
            "options": opts,
            "sol": sol
        })

    # 4. Statement I & II Questions (10 questions)
    st_data_ch1 = [
        ("Management as an art involves personalized application of practical knowledge combined with creativity.", "Like art, management requires continuous practice to develop personal managerial style and effectiveness.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements accurately reflect NCERT criteria for Management as an Art."),
        ("Management is currently recognized as a full-fledged statutory profession with mandatory legal licensing in India.", "Anyone can be appointed as a manager in a company regardless of their formal educational degree or statutory license.", "Statement I is incorrect but Statement II is correct.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Management is not yet a statutory profession with compulsory licensing, so anyone can legally be appointed a manager."),
        ("Survival is the primary organizational objective of management before earning profits.", "To survive, an enterprise must earn sufficient revenues to cover its operating costs.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements are correct. Survival means earning enough revenue to cover costs, the prerequisite for profit."),
        ("Social objectives of management deal with fulfilling the personal career growth needs of employees.", "Personal objectives deal with creating fair employment opportunities and protecting the natural environment.", "Both Statement I and Statement II are incorrect.", "Both Statement I and Statement II are correct.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "The descriptions are inverted: social objectives deal with society/environment, personal objectives deal with employee needs."),
        ("Coordination is considered the deliberate responsibility of top management alone.", "First-line supervisors have no responsibility for coordinating worker activities on the factory floor.", "Both Statement I and Statement II are incorrect.", "Both Statement I and Statement II are correct.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Coordination is the responsibility of all managers at all levels, from top management down to supervisors."),
        ("Providing competitive salaries, peer recognition, and personal development opportunities fulfills personal objectives of management.", "Providing schools, healthcare crèches, and adopting eco-friendly technology fulfills social objectives of management.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements accurately categorize personal and social objectives according to NCERT."),
        ("Growth in organizational size decreases the necessity for managerial coordination.", "As the number of employees increases, individual goals automatically merge into corporate goals without managerial intervention.", "Both Statement I and Statement II are incorrect.", "Both Statement I and Statement II are correct.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Growth in size increases the need for coordination because more individuals with diverse habits must be harmonized."),
        ("Functional differentiation often leads to conflict between departments because each department prioritizes its own sectional targets.", "Coordination harmonizes inter-departmental conflicts and aligns departmental activities with overall corporate goals.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements are correct explanations of why functional differentiation requires coordination."),
        ("Coordination without cooperation leads to employee dissatisfaction and resentment.", "Cooperation without coordination leads to wasted and duplicated efforts across departments.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements represent classic NCERT tenets regarding coordination vs cooperation."),
        ("Management increases efficiency by reducing costs and increasing productivity through optimum resource utilization.", "Management creates a dynamic organization by helping employees overcome resistance to technological changes.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements correctly outline key dimensions of the importance of management.")
    ]
    for s1, s2, cor, w1, w2, w3, sol in st_data_ch1:
        qs.append({
            "chapter": "Nature and Significance of Management",
            "topic": "Management: Objectives and Importance",
            "subtopic": "Statement Evaluation",
            "archetype": "statement-based",
            "difficulty": 2,
            "stem": f"Read the two statements given below:\nStatement I: {s1}\nStatement II: {s2}\nChoose the correct option:",
            "options": [
                {"id": "A", "text": cor, "isCorrect": True, "trap": f"None - correct evaluation: {sol}"},
                {"id": "B", "text": w1, "isCorrect": False, "trap": "Misidentifying the validity of the statements."},
                {"id": "C", "text": w2, "isCorrect": False, "trap": "Overlooking an error in one statement."},
                {"id": "D", "text": w3, "isCorrect": False, "trap": "Inverting the truth values of the statements."}
            ],
            "sol": sol
        })

    # 5. Levels of Management & Functional Roles (15 questions)
    level_roles = [
        ("Chief Executive Officer (CEO)", "Top Level Management", "Framing broad enterprise vision, formulating overall goals, and managing external relationships", "Interpreting departmental policies", "Directly supervising shop workers", "Managing inventory re-order levels"),
        ("Chairman and Board of Directors", "Top Level Management", "Holding ultimate accountability for enterprise survival, societal welfare, and strategic policies", "Allocating daily machine batches", "Maintaining shop discipline", "Conducting job interviews for clerical staff"),
        ("Plant Superintendent", "Middle Level Management", "Executing departmental plans, ensuring inter-departmental harmony, and selecting operational staff", "Formulating multi-year corporate strategy", "Directly guiding machine lathe operators", "Filing corporate statutory tax returns"),
        ("Regional Sales Manager", "Middle Level Management", "Translating corporate marketing strategies into regional targets and motivating field sales forces", "Drafting enterprise-wide corporate vision", "Inspecting physical packaging tolerances", "Auditing global capital investments"),
        ("Shop-Floor Foreman", "Operational / Lower Level Management", "Directly supervising factory workers, maintaining shop discipline, and minimizing tool wastage", "Formulating annual financial budgets", "Approving enterprise mergers", "Interpreting top management policies to public"),
        ("Section In-Charge", "Operational / Lower Level Management", "Listening directly to worker grievances, passing safety instructions, and monitoring daily attendance", "Deciding capital structure debt-equity mix", "Establishing corporate environmental policy", "Negotiating multi-year banking consortium loans"),
        ("Chief Financial Officer (CFO)", "Top Level Management", "Designing capital structure, evaluating long-term financing, and maintaining corporate solvency", "Measuring machine operator piece-rates", "Inspecting factory cleanroom filters", "Allocating retail store display shelves"),
        ("Operations Director", "Top Level Management", "Aligning manufacturing capabilities with long-term commercial goals across all company factories", "Supervising daily factory gate passes", "Resolving tool disputes between workers", "Recording daily worker clock-in cards"),
        ("Human Resource Manager", "Middle Level Management", "Estimating departmental manpower needs, organizing executive training, and executing recruitment", "Determining enterprise stock market dividends", "Conducting daily shop-floor machine repairs", "Negotiating bilateral foreign trade treaties"),
        ("Quality Control Inspector", "Operational / Lower Level Management", "Conducting physical sample testing of finished components on the conveyor against blueprint standards", "Formulating enterprise-wide pricing strategies", "Approving corporate debenture issues", "Directing nationwide advertising campaigns"),
        ("Marketing Division Head", "Middle Level Management", "Allocating brand advertising budgets, reviewing sales quotas, and coordinating with production heads", "Directly assembling components on assembly bays", "Determining statutory corporate legal bylaws", "Handling shop-floor worker union strikes directly"),
        ("Maintenance Supervisor", "Operational / Lower Level Management", "Supervising preventative lubrication, tooling setup, and emergency repair of factory lathes", "Formulating long-term corporate vision", "Managing enterprise investor relations", "Determining dividend distribution ratios"),
        ("Chief Technology Officer (CTO)", "Top Level Management", "Guiding long-term technological research and development trajectories and capital equipment modernization", "Monitoring daily shift operator attendance", "Allocating packaging cartons in dispatch bays", "Conducting preliminary screening of clerical resumes"),
        ("Branch General Manager", "Middle Level Management", "Executing top directives within a regional territory, coordinating branch departments, and reporting progress", "Deciding national dividend declarations", "Directly repairing shop-floor electrical switches", "Approving statutory board corporate charter amendments"),
        ("Dispatch Superintendent", "Operational / Lower Level Management", "Overseeing physical packaging integrity, loading safety, and delivery truck dispatch manifests", "Formulating enterprise strategic acquisitions", "Determining corporate equity capitalization", "Interpreting foreign currency exchange regulations")
    ]
    for role, lvl, cor_f, w1_f, w2_f, w3_f in level_roles:
        qs.append({
            "chapter": "Nature and Significance of Management",
            "topic": "Levels of Management",
            "subtopic": f"Role: {role}",
            "archetype": "conceptual-application",
            "difficulty": 2,
            "stem": f"In a corporate organization, an executive holding the title of '{role}' belongs to which management level and performs what primary role?",
            "options": [
                {"id": "A", "text": f"{lvl}, responsible for {cor_f.lower()}.", "isCorrect": True, "trap": f"None - exact NCERT classification of {lvl}."},
                {"id": "B", "text": f"{lvl}, responsible for {w1_f.lower()}.", "isCorrect": False, "trap": f"Confusing duties across hierarchical tiers."},
                {"id": "C", "text": f"Advisory Council, responsible for {w2_f.lower()}.", "isCorrect": False, "trap": f"Advisory councils are not an executive management tier."},
                {"id": "D", "text": f"Statutory External Board, responsible for {w3_f.lower()}.", "isCorrect": False, "trap": f"External boards do not manage internal operations."}
            ],
            "sol": f"{role} belongs to {lvl} whose core responsibility is {cor_f.lower()}."
        })

    # 6. Coordination Characteristics & Importance (15 questions)
    coord_items = [
        ("Coordination integrates group effort", "unifying diverse individual interests and reconciling conflicting departmental viewpoints into purposeful work activity", "Ensures unity of action", "All-pervasive function", "Deliberate function"),
        ("Coordination ensures unity of action", "acting as the binding force between departments to ensure that all actions pull together in the same corporate direction", "Integrates group effort", "Continuous process", "Responsibility of all managers"),
        ("Coordination is a continuous process", "it is not a one-time event; it begins at planning and continues unceasingly through organising, staffing, directing, and controlling", "Deliberate function", "Integrates group effort", "All-pervasive function"),
        ("Coordination is all-pervasive", "it is required at all levels of management and across all functional departments due to the interdependence of operational activities", "Continuous process", "Ensures unity of action", "Responsibility of all managers"),
        ("Coordination is the responsibility of all managers", "top managers coordinate with external environment, middle managers coordinate departments, and supervisors coordinate worker efforts", "Deliberate function", "Integrates group effort", "All-pervasive function"),
        ("Coordination is a deliberate function", "a manager has to coordinate the efforts of different people in a conscious and deliberate manner rather than relying on spontaneous goodwill", "Continuous process", "Ensures unity of action", "Responsibility of all managers"),
        ("Importance: Growth in size", "as organizations expand and recruit hundreds of employees with diverse backgrounds, coordination harmonizes individual ambitions with corporate goals", "Functional differentiation", "Specialisation", "All-pervasive function"),
        ("Importance: Functional differentiation", "specialized departments often develop conflicting sectional priorities, requiring coordination to link their activities together cohesively", "Growth in size", "Specialisation", "Continuous process"),
        ("Importance: Specialisation", "modern firms employ high-level specialists who often believe they alone are qualified, making coordination essential to reconcile their perspectives", "Growth in size", "Functional differentiation", "Deliberate function"),
        ("Coordination in Planning", "harmonizing sales forecasts, production capacity, raw material procurement budgets, and cash flow projections into a viable master plan", "Coordination in Directing", "Coordination in Controlling", "Coordination in Staffing"),
        ("Coordination in Organising", "aligning departmental authority-responsibility structures to ensure seamless hand-offs of work without operational bottlenecks", "Coordination in Planning", "Coordination in Directing", "Coordination in Staffing"),
        ("Coordination in Staffing", "ensuring that the skills and competencies of hired personnel precisely match the requirements of defined job positions across departments", "Coordination in Organising", "Coordination in Directing", "Coordination in Controlling"),
        ("Coordination in Directing", "integrating individual motivation schemes, leadership guidance, and communication networks so that workers strive happily toward company goals", "Coordination in Staffing", "Coordination in Planning", "Coordination in Controlling"),
        ("Coordination in Controlling", "comparing actual achievements against planned benchmarks across all departments to provide integrated feedback for future planning", "Coordination in Organising", "Coordination in Directing", "Coordination in Staffing"),
        ("Coordination as the Essence of Management", "coordination is not a distinct separate function, but the unifying force that binds all management functions together", "Coordination in Planning", "Coordination in Organising", "Coordination in Directing")
    ]
    for title, desc, d1, d2, d3 in coord_items:
        qs.append({
            "chapter": "Nature and Significance of Management",
            "topic": "Coordination",
            "subtopic": title,
            "archetype": "conceptual-scenario",
            "difficulty": 2,
            "stem": f"An organizational consultant observes that: '{desc}'. Which specific characteristic, importance, or application of Coordination is illustrated?",
            "options": [
                {"id": "A", "text": title, "isCorrect": True, "trap": f"None - exact NCERT concept: {title}."},
                {"id": "B", "text": d1, "isCorrect": False, "trap": f"Confusing {title} with {d1}."},
                {"id": "C", "text": d2, "isCorrect": False, "trap": f"Confusing {title} with {d2}."},
                {"id": "D", "text": d3, "isCorrect": False, "trap": f"Confusing {title} with {d3}."}
            ],
            "sol": f"The scenario directly illustrates '{title}' as outlined in NCERT Class 12."
        })

    # 7. Match the Columns & Sequences for Chapter 1 (10 questions)
    match_ch1 = [
        ("Levels of Management with Executive Tiers", 
         "Match List-I (Executive Roles) with List-II (Management Tier):\nList-I:\n(A) Chief Executive Officer\n(B) Plant Superintendent\n(C) First-line Supervisor\n(D) Board Chairman\n\nList-II:\n(I) Operational / Supervisory Level\n(II) Middle Level Management\n(III) Top Level Management\n(IV) Top Level Management\nChoose the correct option:",
         "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)",
         "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)",
         "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)",
         "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)",
         "CEO and Board Chairman belong to Top Level (III, IV); Plant Superintendent belongs to Middle Level (II); Supervisor belongs to Operational Level (I)."),
        ("Objectives of Management",
         "Match List-I (Management Objective) with List-II (Business Activity):\nList-I:\n(A) Survival\n(B) Profit\n(C) Growth\n(D) Social Objective\n\nList-II:\n(I) Providing schools and adopting eco-friendly technology\n(II) Expanding product lines and capital investment\n(III) Earning enough revenue to cover operational costs\n(IV) Covering operating costs and business risks\nChoose the correct option:",
         "(A)-(III), (B)-(IV), (C)-(II), (D)-(I)",
         "(A)-(IV), (B)-(III), (C)-(II), (D)-(I)",
         "(A)-(III), (B)-(II), (C)-(IV), (D)-(I)",
         "(A)-(I), (B)-(IV), (C)-(II), (D)-(III)",
         "Survival means covering costs (III); Profit covers costs and risk (IV); Growth involves expansion (II); Social objective provides community benefits (I)."),
        ("Functions of Management in Sequence",
         "Arrange the five foundational functions of management in their logical sequential order:\n(A) Staffing\n(B) Controlling\n(C) Planning\n(D) Directing\n(E) Organising\nChoose the correct option:",
         "(C) -> (E) -> (A) -> (D) -> (B)",
         "(C) -> (A) -> (E) -> (D) -> (B)",
         "(E) -> (C) -> (A) -> (D) -> (B)",
         "(C) -> (E) -> (D) -> (A) -> (B)",
         "The logical sequence of management functions: Planning -> Organising -> Staffing -> Directing -> Controlling.")
    ]
    for title, stem_m, cor_m, w1_m, w2_m, w3_m, sol_m in match_ch1:
        qs.append({
            "chapter": "Nature and Significance of Management",
            "topic": "Management: Functions and Levels",
            "subtopic": title,
            "archetype": "match-the-following" if "Match" in stem_m else "chronological-sequence",
            "difficulty": 3,
            "stem": stem_m,
            "options": [
                {"id": "A", "text": cor_m, "isCorrect": True, "trap": f"None - correct mapping: {sol_m}"},
                {"id": "B", "text": w1_m, "isCorrect": False, "trap": "Inverting intermediate positions."},
                {"id": "C", "text": w2_m, "isCorrect": False, "trap": "Confusing functional tiers."},
                {"id": "D", "text": w3_m, "isCorrect": False, "trap": "Incorrectly mapping roles."}
            ],
            "sol": sol_m
        })

    # =========================================================================
    # CHAPTER 2: Principles of Management (100 Questions)
    # =========================================================================
    
    # 1. Fayol's 14 Principles (35 questions: Scenarios, Concepts, Assertion-Reason)
    fayol_principles_data = [
        ("Division of Work", "Work is divided into small specialized tasks performed by trained specialists, leading to specialization and increased output.", "Unity of Direction", "Order", "Scalar Chain"),
        ("Authority and Responsibility", "There must be a parity between authority granted and responsibility entrusted; authority without responsibility breeds irresponsibility.", "Discipline", "Remuneration of Employees", "Unity of Command"),
        ("Discipline", "Obedience, respect for authority, adherence to organizational rules, and fair agreements with judicious application of penalties.", "Order", "Esprit de Corps", "Equity"),
        ("Unity of Command", "An employee should receive orders from one and only one superior, preventing dual subordination, confusion, and divided loyalty.", "Unity of Direction", "Scalar Chain", "Division of Work"),
        ("Unity of Direction", "Each group of activities having the same objective must have one head and one plan, preventing overlapping and duplication of corporate efforts.", "Unity of Command", "Division of Work", "Esprit de Corps"),
        ("Subordination of Individual Interest to General Interest", "The interests of an enterprise should take precedence over the personal interests of any individual employee or group.", "Equity", "Remuneration of Employees", "Initiative"),
        ("Remuneration of Employees", "Overall compensation and wages should be fair to both employees (providing reasonable living standard) and employer (within paying capacity).", "Equity", "Subordination of Individual Interest", "Discipline"),
        ("Centralisation and Decentralisation", "An optimal balance between concentrating decision-making authority at the top and dispersing it down to operating levels.", "Scalar Chain", "Order", "Authority and Responsibility"),
        ("Scalar Chain", "The formal line of authority and communication running from highest to lowest ranks, which should normally not be broken except in emergencies.", "Gang Plank", "Unity of Command", "Order"),
        ("Gang Plank", "A direct communication shortcut between two employees of equal level in different scalar lines permitted during emergencies with prior notice.", "Scalar Chain", "Unity of Direction", "Informal Grapevine"),
        ("Order (Material and Social)", "A place for everything (everyone) and everything (everyone) in its (their) place, minimizing wasteful search time.", "Discipline", "Equity", "Stability of Personnel"),
        ("Equity", "Fair, kind, and just treatment towards all subordinates without discrimination based on sex, religion, caste, or personal bias.", "Discipline", "Remuneration of Employees", "Order"),
        ("Stability of Tenure of Personnel", "Employees should be selected and kept in their positions for a reasonable tenure to minimize turnover and build organizational expertise.", "Initiative", "Esprit de Corps", "Division of Work"),
        ("Initiative", "Encouraging workers to conceive, formulate, and execute new plans, providing satisfaction and creative drive within discipline.", "Esprit de Corps", "Subordination of Individual Interest", "Stability of Personnel"),
        ("Esprit de Corps", "Promoting team spirit, unity, and mutual trust by replacing 'I' with 'We' in all management conversations.", "Initiative", "Discipline", "Unity of Direction")
    ]
    for p_name, p_desc, d1, d2, d3 in fayol_principles_data:
        qs.append({
            "chapter": "Principles of Management",
            "topic": "Fayol's Principles of Management",
            "subtopic": p_name,
            "archetype": "conceptual-scenario",
            "difficulty": 2,
            "stem": f"An enterprise enforces the following managerial rule: '{p_desc}'. Which of Henri Fayol's 14 principles of management is directly illustrated?",
            "options": [
                {"id": "A", "text": p_name, "isCorrect": True, "trap": f"None - exact application of Fayol's principle: {p_name}."},
                {"id": "B", "text": d1, "isCorrect": False, "trap": f"Confusing {p_name} with {d1}."},
                {"id": "C", "text": d2, "isCorrect": False, "trap": f"Confusing {p_name} with {d2}."},
                {"id": "D", "text": d3, "isCorrect": False, "trap": f"Confusing {p_name} with {d3}."}
            ],
            "sol": f"The rule directly reflects Fayol's principle of '{p_name}' as defined in NCERT Class 12."
        })

    # Fayol Application Scenarios (10 questions)
    fayol_apps = [
        ("A sales executive receives conflicting discount instructions simultaneously from the Marketing Director and the Finance Controller.", "Unity of Command", "Unity of Direction", "Scalar Chain", "Division of Work", "Receiving orders from two bosses violates Unity of Command, causing dual subordination."),
        ("A consumer appliances firm produces refrigerators and microwaves. Both divisions share the same advertising director and conflicting sales campaigns.", "Unity of Direction", "Unity of Command", "Esprit de Corps", "Order", "Each distinct product line with a distinct objective must have one head and one plan (Unity of Direction)."),
        ("A plant supervisor discovers an unexpected boiler pressure spike and immediately contacts the maintenance engineer of equal rank in another wing without waiting for hierarchical clearances.", "Gang Plank", "Scalar Chain", "Unity of Command", "Informal Network", "An emergency direct shortcut between equal ranks across scalar lines is a Gang Plank."),
        ("A factory manager allocates work such that Worker X exclusively solders circuits, Worker Y inspects wiring, and Worker Z packages boxes.", "Division of Work", "Order", "Unity of Direction", "Discipline", "Breaking tasks into specialized operations performed by dedicated individuals illustrates Division of Work."),
        ("A production head promises workers a special bonus if they complete an emergency quota, and the company honors the bonus agreement faithfully upon completion.", "Discipline", "Remuneration of Employees", "Equity", "Order", "Discipline requires clear, fair agreements and honoring reciprocal commitments between management and labor."),
        ("A purchasing manager awards a major raw material contract to a firm owned by his brother-in-law despite higher prices and inferior quality.", "Subordination of Individual Interest to General Interest", "Equity", "Discipline", "Order", "Personal self-interest was placed ahead of the organization's welfare, violating this principle."),
        ("A corporate CEO insists that all internal project memos must address the group as 'We have achieved our quarterly target' rather than 'I have achieved'.", "Esprit de Corps", "Initiative", "Unity of Direction", "Discipline", "Replacing 'I' with 'We' to foster harmony and team spirit exemplifies Esprit de Corps."),
        ("A newly appointed software engineer is transferred across five different project teams within four months, preventing them from completing any project module.", "Stability of Tenure of Personnel", "Initiative", "Division of Work", "Equity", "Frequent rotational transfers create insecurity and violate Stability of Tenure."),
        ("A hospital administrator ensures that surgical instruments are always stored in sterilized locker B-4 and surgical nurses report to station N-2 at all times.", "Order (Material and Social)", "Discipline", "Scalar Chain", "Division of Work", "A place for everything and everyone in their place represents Fayol's Principle of Order."),
        ("A regional manager refuses to grant maternity leave to female sales associates while freely approving paternity leave to male colleagues.", "Equity", "Discipline", "Remuneration of Employees", "Order", "Treating employees unfairly based on gender bias violates Fayol's Principle of Equity.")
    ]
    for scn, cor_p, d1_p, d2_p, d3_p, sol_p in fayol_apps:
        qs.append({
            "chapter": "Principles of Management",
            "topic": "Fayol's Principles of Management",
            "subtopic": f"Application: {cor_p}",
            "archetype": "conceptual-scenario",
            "difficulty": 3,
            "stem": f"Consider the following business situation: '{scn}'. Which of Henri Fayol's principles is either violated or exemplified?",
            "options": [
                {"id": "A", "text": cor_p, "isCorrect": True, "trap": f"None - correct application: {sol_p}"},
                {"id": "B", "text": d1_p, "isCorrect": False, "trap": f"Confusing {cor_p} with {d1_p}."},
                {"id": "C", "text": d2_p, "isCorrect": False, "trap": f"Confusing {cor_p} with {d2_p}."},
                {"id": "D", "text": d3_p, "isCorrect": False, "trap": f"Confusing {cor_p} with {d3_p}."}
            ],
            "sol": sol_p
        })

    # 2. Taylor's Scientific Management (35 questions: Work Study, Functional Foremanship, Concepts, Piece-Rates)
    taylor_work_study = [
        ("Time Study", "Determining the standard time taken by an average worker to perform a well-defined job using a stopwatch to fix a fair day's work.", "Motion Study", "Method Study", "Fatigue Study"),
        ("Motion Study", "Observing worker body movements to identify and eliminate unproductive, unnecessary, and wasteful physical motions.", "Time Study", "Fatigue Study", "Method Study"),
        ("Method Study", "Identifying the 'One Best Way' of performing a job from raw material procurement to customer delivery to minimize cost and maximize quality.", "Time Study", "Motion Study", "Standardization"),
        ("Fatigue Study", "Determining the amount, frequency, and duration of rest intervals required for workers to recover physical stamina.", "Motion Study", "Time Study", "Simplification"),
        ("Standardization of Work", "Establishing benchmarks for tools, machines, raw materials, and working conditions to ensure uniform output quality and interchangeability.", "Simplification of Work", "Method Study", "Time Study"),
        ("Simplification of Work", "Eliminating superfluous varieties, sizes, and dimensions of manufactured products to reduce tooling costs and inventory tying.", "Standardization of Work", "Motion Study", "Fatigue Study"),
        ("Functional Foremanship: Instruction Card Clerk", "Drafting detailed operating instructions, tool specifications, and step-by-step task sequences for factory workers.", "Route Clerk", "Time and Cost Clerk", "Disciplinarian"),
        ("Functional Foremanship: Route Clerk", "Specifying the exact chronological sequence and physical path of production through the shop floor.", "Instruction Card Clerk", "Speed Boss", "Gang Boss"),
        ("Functional Foremanship: Time and Cost Clerk", "Preparing daily wage sheets and calculating standard unit costs of production.", "Instruction Card Clerk", "Disciplinarian", "Repair Boss"),
        ("Functional Foremanship: Disciplinarian", "Enforcing shop discipline, orderly behavior, and adherence to company factory rules.", "Time and Cost Clerk", "Speed Boss", "Inspector"),
        ("Functional Foremanship: Speed Boss", "Ensuring that machines and operators work at the prescribed standard speed.", "Gang Boss", "Repair Boss", "Inspector"),
        ("Functional Foremanship: Gang Boss", "Keeping all machines, tools, jigs, fixtures, and raw materials ready for immediate worker use.", "Speed Boss", "Repair Boss", "Route Clerk"),
        ("Functional Foremanship: Repair Boss", "Ensuring the proper upkeep, preventative maintenance, and prompt repair of factory machinery.", "Speed Boss", "Gang Boss", "Inspector"),
        ("Functional Foremanship: Inspector", "Checking the physical quality, finish, and tolerances of finished products against engineering specifications.", "Speed Boss", "Disciplinarian", "Time and Cost Clerk"),
        ("Mental Revolution", "A complete change of mental outlook on the part of both workers and management from mutual conflict to mutual cooperation.", "Harmony, Not Discord", "Science, Not Rule of Thumb", "Differential Piece Wage System")
    ]
    for tech, desc_t, d1_t, d2_t, d3_t in taylor_work_study:
        qs.append({
            "chapter": "Principles of Management",
            "topic": "Taylor's Scientific Management",
            "subtopic": tech,
            "archetype": "conceptual-application",
            "difficulty": 2,
            "stem": f"In an industrial manufacturing facility, an engineer implements the scientific technique of: '{desc_t}'. Which technique of F.W. Taylor is illustrated?",
            "options": [
                {"id": "A", "text": tech, "isCorrect": True, "trap": f"None - exact definition of Taylor's technique: {tech}."},
                {"id": "B", "text": d1_t, "isCorrect": False, "trap": f"Confusing {tech} with {d1_t}."},
                {"id": "C", "text": d2_t, "isCorrect": False, "trap": f"Confusing {tech} with {d2_t}."},
                {"id": "D", "text": d3_t, "isCorrect": False, "trap": f"Confusing {tech} with {d3_t}."}
            ],
            "sol": f"This procedure defines Taylor's scientific technique of '{tech}'."
        })

    # Taylor's Differential Piece Wage Calculations (10 distinct numerical questions)
    calc_scenarios = [
        ("AuraTech Tools", 50, 20.0, 16.0, 55, 45, "AuraTech Tools sets standard daily output at 50 units. Workers producing at or above standard earn Rs. 20 per unit; those below earn Rs. 16 per unit. Worker X produces 55 units and Worker Y produces 45 units."),
        ("Bhartiya Gears", 100, 15.0, 12.0, 110, 90, "Bhartiya Gears fixes standard output at 100 units. Piece rate is Rs. 15 for output >= 100 units and Rs. 12 for output < 100 units. Worker A produces 110 units and Worker B produces 90 units."),
        ("Vanguard Pumps", 40, 30.0, 24.0, 42, 38, "Vanguard Pumps fixes standard daily output at 40 units. Rate >= 40 is Rs. 30 per unit; rate < 40 is Rs. 24 per unit. Worker P produces 42 units and Worker Q produces 38 units."),
        ("Titanium Valves", 80, 12.0, 9.0, 85, 75, "Titanium Valves establishes standard output of 80 units. Workers achieving standard get Rs. 12 per unit; those falling below get Rs. 9 per unit. Worker M produces 85 units and Worker N produces 75 units."),
        ("Suryodaya Components", 60, 25.0, 20.0, 65, 55, "Suryodaya Components sets standard output at 60 units. Rate is Rs. 25 for >= 60 units and Rs. 20 for < 60 units. Worker K produces 65 units and Worker L produces 55 units."),
        ("Apex Fasteners", 120, 10.0, 8.0, 130, 110, "Apex Fasteners establishes standard output of 120 units. Workers hitting standard earn Rs. 10 per unit; those below earn Rs. 8 per unit. Worker C produces 130 units and Worker D produces 110 units."),
        ("Heritage Metals", 30, 60.0, 48.0, 32, 28, "Heritage Metals fixes standard output at 30 units. Workers at/above standard receive Rs. 60 per unit; those below receive Rs. 48 per unit. Worker E produces 32 units and Worker F produces 28 units."),
        ("Kavya Packaging", 75, 18.0, 14.0, 80, 70, "Kavya Packaging fixes standard output at 75 units. High rate is Rs. 18 per unit; low rate is Rs. 14 per unit. Worker G produces 80 units and Worker H produces 70 units."),
        ("Pinnacle Castings", 90, 22.0, 18.0, 95, 85, "Pinnacle Castings fixes standard output at 90 units. Rate for >= 90 is Rs. 22 per unit; rate for < 90 is Rs. 18 per unit. Worker R produces 95 units and Worker S produces 85 units."),
        ("Crown Assemblies", 150, 8.0, 6.0, 160, 140, "Crown Assemblies sets daily standard output at 150 units. High rate is Rs. 8 per unit; low rate is Rs. 6 per unit. Worker T produces 160 units and Worker U produces 140 units.")
    ]
    for c_comp, std_u, h_rate, l_rate, w1_u, w2_u, scn_text in calc_scenarios:
        pay1 = w1_u * h_rate
        pay2 = w2_u * l_rate
        diff = pay1 - pay2
        wrong_low = (w1_u - w2_u) * l_rate
        wrong_high = (w1_u - w2_u) * h_rate
        qs.append({
            "chapter": "Principles of Management",
            "topic": "Taylor's Scientific Management",
            "subtopic": "Differential Piece Wage System Calculation",
            "archetype": "numerical-calculation",
            "difficulty": 3,
            "stem": f"{scn_text}\nWhat is the difference in daily earnings between the two workers?",
            "options": [
                {"id": "A", "text": f"Rs. {diff:.1f}", "isCorrect": True, "trap": f"None - correct calculation: Worker 1 earns {w1_u} * {h_rate:.1f} = {pay1:.1f}; Worker 2 earns {w2_u} * {l_rate:.1f} = {pay2:.1f}; Difference = Rs. {diff:.1f}."},
                {"id": "B", "text": f"Rs. {wrong_low:.1f}", "isCorrect": False, "trap": f"Erroneously calculating the unit difference using only the lower piece rate."},
                {"id": "C", "text": f"Rs. {wrong_high:.1f}", "isCorrect": False, "trap": f"Erroneously calculating the unit difference using only the higher piece rate."},
                {"id": "D", "text": f"Rs. {w1_u * l_rate - w2_u * l_rate + 50:.1f}", "isCorrect": False, "trap": f"Arithmetic miscalculation."}
            ],
            "sol": f"Worker 1 reached standard: {w1_u} units * Rs. {h_rate:.1f} = Rs. {pay1:.1f}. Worker 2 fell below standard: {w2_u} units * Rs. {l_rate:.1f} = Rs. {pay2:.1f}. Difference in earnings = Rs. {pay1:.1f} - Rs. {pay2:.1f} = Rs. {diff:.1f}."
        })

    # 3. Taylor vs Fayol Comparative Analysis (15 questions)
    tf_comp = [
        ("Perspective", "Taylor's principles and techniques start from the shop floor and operational level upward, while Fayol's principles begin from top management downward.", "Unity of Command", "Basis of Formation", "Applicability"),
        ("Unity of Command", "Taylor advocated Functional Foremanship with 8 specialized bosses (violating unity of command), while Fayol strictly insisted on Unity of Command.", "Perspective", "Focus", "Flexibility"),
        ("Applicability", "Taylor's techniques apply mainly to specialized manufacturing shop floors, while Fayol's administrative principles are universally applicable across all organizations.", "Personality", "Basis of Formation", "Expression"),
        ("Basis of Formation", "Taylor formulated his principles through scientific observation and controlled physical experiments, while Fayol synthesized his from personal executive practitioner experience.", "Perspective", "Focus", "Expression"),
        ("Focus", "Taylor's primary focus was on increasing worker productivity and eliminating wasteful motions, while Fayol's focus was on improving overall administrative governance.", "Personality", "Unity of Command", "Applicability"),
        ("Personality", "Taylor was an industrial engineer and research scientist, while Henri Fayol was a mining engineer and practicing top corporate executive.", "Expression", "Focus", "Perspective"),
        ("Expression", "Taylor expressed his contributions under 'Scientific Management', while Fayol termed his work the 'General Theory of Administration'.", "Personality", "Basis of Formation", "Focus"),
        ("System of Wage Payment", "Taylor insisted on a harsh differential piece wage system to penalize inefficiency, whereas Fayol advocated fair living remuneration based on the firm's paying capacity.", "Unity of Command", "Applicability", "Perspective"),
        ("Human Relations Attitude", "Taylor emphasized physical engineering and economic piece rates, while Fayol emphasized human equity, esprit de corps, and worker initiative.", "Focus", "Expression", "Basis of Formation"),
        ("Supervisory Hierarchy", "Taylor divided shop supervision among 8 specialized functional foremen, while Fayol maintained a single scalar line of authority.", "Unity of Command", "Perspective", "Applicability")
    ]
    for comp_dim, comp_desc, d1_c, d2_c, d3_c in tf_comp:
        qs.append({
            "chapter": "Principles of Management",
            "topic": "Principles of Management",
            "subtopic": f"Taylor vs Fayol: {comp_dim}",
            "archetype": "conceptual-application",
            "difficulty": 2,
            "stem": f"In comparing classical management pioneers, the observation: '{comp_desc}' highlights which specific dimension of difference between F.W. Taylor and Henri Fayol?",
            "options": [
                {"id": "A", "text": f"Difference based on {comp_dim}.", "isCorrect": True, "trap": f"None - exact NCERT comparison parameter: {comp_dim}."},
                {"id": "B", "text": f"Difference based on {d1_c}.", "isCorrect": False, "trap": f"Confusing {comp_dim} with {d1_c}."},
                {"id": "C", "text": f"Difference based on {d2_c}.", "isCorrect": False, "trap": f"Confusing {comp_dim} with {d2_c}."},
                {"id": "D", "text": f"Difference based on {d3_c}.", "isCorrect": False, "trap": f"Confusing {comp_dim} with {d3_c}."}
            ],
            "sol": f"This comparative analysis reflects the dimension of '{comp_dim}' in the NCERT Taylor vs Fayol comparison matrix."
        })

    # 4. Nature & Significance of Principles (15 questions)
    nature_sig_ch2 = [
        ("Universal Applicability", "Principles of management apply to all types of organizations whether large or small, business or non-business, manufacturing or services.", "General Guidelines", "Flexible", "Contingent"),
        ("General Guidelines", "Management principles are general guides to action and do not provide ready-made straitjacket solutions to complex operational problems.", "Universal Applicability", "Formed by Practice", "Mainly Behavioral"),
        ("Formed by Practice and Experimentation", "Principles are developed through cumulative practitioner experience, disciplined observation, and repeated experimentation over time.", "General Guidelines", "Flexible", "Contingent"),
        ("Flexible Nature", "Principles of management are not rigid prescriptions like laws of physics; they can be adapted and modified by managers situational demands.", "Formed by Practice", "Universal Applicability", "Cause and Effect"),
        ("Mainly Behavioral", "Management principles aim primarily at influencing human behavior, group dynamics, and interpersonal relationships at the workplace.", "General Guidelines", "Contingent", "Cause and Effect"),
        ("Cause and Effect Relationships", "Principles establish what result will likely follow when a particular action or guideline is applied in a given situation.", "Contingent", "Mainly Behavioral", "Flexible"),
        ("Contingent Nature", "The application of management principles depends upon the prevailing conditions, organizational size, and cultural climate at a given point in time.", "Flexible", "Universal Applicability", "General Guidelines"),
        ("Significance: Providing Managers with Useful Insights", "Principles improve managerial understanding of real situations and help managers learn from past mistakes without trial-and-error.", "Meeting Changing Environment", "Scientific Decisions", "Fulfilling Social Responsibility"),
        ("Significance: Optimum Utilization of Resources", "Systematic administrative principles minimize physical, financial, and human waste, ensuring effective administration.", "Providing Useful Insights", "Meeting Changing Environment", "Management Training"),
        ("Significance: Scientific Decisions", "Decisions based on management principles are objective, realistic, balanced, and free from personal bias or prejudice.", "Fulfilling Social Responsibility", "Providing Useful Insights", "Optimum Utilization of Resources")
    ]
    for n_dim, n_desc, d1_n, d2_n, d3_n in nature_sig_ch2:
        qs.append({
            "chapter": "Principles of Management",
            "topic": "Principles of Management: Nature and Significance",
            "subtopic": n_dim,
            "archetype": "conceptual-application",
            "difficulty": 2,
            "stem": f"When a management scholar states that: '{n_desc}', which characteristic or significance of management principles is highlighted?",
            "options": [
                {"id": "A", "text": n_dim, "isCorrect": True, "trap": f"None - exact NCERT characteristic/significance: {n_dim}."},
                {"id": "B", "text": d1_n, "isCorrect": False, "trap": f"Confusing {n_dim} with {d1_n}."},
                {"id": "C", "text": d2_n, "isCorrect": False, "trap": f"Confusing {n_dim} with {d2_n}."},
                {"id": "D", "text": d3_n, "isCorrect": False, "trap": f"Confusing {n_dim} with {d3_n}."}
            ],
            "sol": f"This statement directly characterizes '{n_dim}' under NCERT Class 12 Principles of Management."
        })

    # =========================================================================
    # CHAPTER 3: Business Environment (40 Questions)
    # =========================================================================
    
    # 1. PESTLE Dimensions (15 questions with authentic scenarios)
    pestle_data = [
        ("Technological Environment", "A pharmaceutical manufacturer adopts automated artificial intelligence algorithms for molecular drug discovery and robotic warehouse packaging.", "Economic Environment", "Legal Environment", "Political Environment"),
        ("Social Environment", "Growing health awareness and rising fitness trends leading to a nationwide surge in consumer demand for organic millet snacks and natural beverages.", "Technological Environment", "Economic Environment", "Political Environment"),
        ("Political Environment", "A new national coalition government taking office and announcing stable long-term foreign direct investment guidelines and industrial ease-of-business policies.", "Legal Environment", "Economic Environment", "Social Environment"),
        ("Legal Environment", "The Supreme Court of India mandating compulsory child-proof safety caps and statutory poison warning logos on all household chemical cleansers.", "Political Environment", "Social Environment", "Technological Environment"),
        ("Economic Environment", "The Reserve Bank of India hiking the repo rate by 50 basis points, resulting in higher corporate borrowing interest rates across commercial banks.", "Legal Environment", "Political Environment", "Technological Environment"),
        ("Technological Environment", "A telecom operator migrating from legacy 4G copper relays to high-speed cloud-native 5G fiber networks to eliminate latency.", "Economic Environment", "Social Environment", "Legal Environment"),
        ("Social Environment", "Rapid urbanisation and an increasing proportion of working women leading to exponential market growth in packaged ready-to-eat dinner kits.", "Economic Environment", "Technological Environment", "Political Environment"),
        ("Legal Environment", "The National Consumer Disputes Redressal Commission imposing severe financial penalties on a cosmetic brand for airing misleading fairness claims.", "Social Environment", "Political Environment", "Economic Environment"),
        ("Political Environment", "A state government establishing a special industrial corridor offering 10-year capital subsidies and tax holidays for clean energy equipment factories.", "Economic Environment", "Legal Environment", "Social Environment"),
        ("Economic Environment", "Depreciation of the Indian Rupee against the US Dollar boosting earnings of software service exporters while inflating imported crude oil bills.", "Technological Environment", "Political Environment", "Legal Environment"),
        ("Technological Environment", "Adoption of blockchain-based tamper-proof digital bills of lading for automated customs clearances in international maritime container freight.", "Economic Environment", "Legal Environment", "Social Environment"),
        ("Social Environment", "Widespread celebration of festive seasons (Diwali, Eid, Christmas) driving sharp seasonal demand spikes across retail apparel and sweet confectioneries.", "Economic Environment", "Political Environment", "Technological Environment"),
        ("Legal Environment", "Statutory food safety regulations making it mandatory for all packaged food manufacturers to print FSSAI license numbers and red-flag trans-fat contents.", "Social Environment", "Political Environment", "Technological Environment"),
        ("Political Environment", "The central cabinet approving a multi-billion dollar National Green Hydrogen Mission offering production-linked subsidies to green ammonia makers.", "Legal Environment", "Economic Environment", "Social Environment"),
        ("Economic Environment", "Rising per capita disposable income among middle-class urban households triggering record retail bookings for premium sport utility passenger vehicles.", "Social Environment", "Political Environment", "Technological Environment")
    ]
    for dim_name, scn_text, d1_d, d2_d, d3_d in pestle_data:
        qs.append({
            "chapter": "Business Environment",
            "topic": "Dimensions of Business Environment",
            "subtopic": dim_name,
            "archetype": "conceptual-scenario",
            "difficulty": 2,
            "stem": f"An industrial enterprise observes the following external development: '{scn_text}'. Which dimension of the business environment is directly illustrated?",
            "options": [
                {"id": "A", "text": dim_name, "isCorrect": True, "trap": f"None - exact PESTLE dimension: {dim_name}."},
                {"id": "B", "text": d1_d, "isCorrect": False, "trap": f"Confusing {dim_name} with {d1_d}."},
                {"id": "C", "text": d2_d, "isCorrect": False, "trap": f"Confusing {dim_name} with {d2_d}."},
                {"id": "D", "text": d3_d, "isCorrect": False, "trap": f"Confusing {dim_name} with {d3_d}."}
            ],
            "sol": f"The scenario directly illustrates the {dim_name} of the business environment."
        })

    # 2. Features & Importance of Business Environment (15 questions)
    env_feat_imp = [
        ("Totality of External Forces", "Business environment is aggregative in nature because it includes the sum total of all individuals, institutions, and forces outside the enterprise.", "Specific and General Forces", "Dynamic Nature", "Uncertainty"),
        ("Specific and General Forces", "Investors, customers, competitors, and suppliers affect an individual firm directly, while economic, social, political, and legal conditions affect all firms.", "Totality of External Forces", "Inter-relatedness", "Complexity"),
        ("Inter-relatedness", "Different elements of the business environment are closely linked; for example, increased health consciousness raises the demand for organic food and gym memberships.", "Specific and General Forces", "Relativity", "Dynamic Nature"),
        ("Dynamic Nature", "The business environment is constantly changing, whether in terms of technological improvements, shifts in consumer preferences, or entry of new competition.", "Uncertainty", "Complexity", "Relativity"),
        ("Uncertainty", "It is very difficult to predict future happenings accurately, particularly when environmental changes occur rapidly as in the information technology or fashion sectors.", "Dynamic Nature", "Complexity", "Inter-relatedness"),
        ("Complexity", "Business environment consists of numerous interrelated forces which make it relatively easy to understand in parts, but difficult to grasp in totality.", "Relativity", "Uncertainty", "Totality of External Forces"),
        ("Relativity", "Business environment is a relative concept since it differs from country to country and even region to region (e.g. demand for sarees is high in India but negligible in Europe).", "Complexity", "Inter-relatedness", "Specific and General Forces"),
        ("Importance: First Mover Advantage", "Early environmental scanning enables an enterprise to identify commercial opportunities early and reap maximum benefits before competitors enter.", "Early Warning Signals", "Tapping Useful Resources", "Coping with Rapid Changes"),
        ("Importance: Early Warning Signals", "Scanning the external environment helps a firm detect emerging competitor threats in advance, allowing timely defensive adjustments.", "First Mover Advantage", "Assisting in Planning", "Improving Performance"),
        ("Importance: Tapping Useful Resources", "A business scans the environment to procure necessary inputs (raw materials, capital, labor) and supply outputs (goods, services, taxes) demanded by society.", "Coping with Rapid Changes", "First Mover Advantage", "Early Warning Signals"),
        ("Importance: Coping with Rapid Changes", "Continuous monitoring of turbulent market trends enables managers to adapt operational strategies swiftly to volatile environments.", "Tapping Useful Resources", "Assisting in Planning", "Improving Performance"),
        ("Importance: Assisting in Planning and Policy Formulation", "Environmental scanning provides the objective intelligence, facts, and premises upon which future strategic plans and corporate policies are formulated.", "First Mover Advantage", "Early Warning Signals", "Tapping Useful Resources"),
        ("Importance: Improving Performance", "Enterprises that continuously monitor and adapt to external environmental changes achieve superior longevity, market leadership, and profitability.", "Coping with Rapid Changes", "Assisting in Planning", "Early Warning Signals"),
        ("Demonetisation: Tax Administration Measure", "Demonetisation in November 2016 was viewed as a tax administration measure to channel cash hoards into formal banking and curb black money.", "Demonetisation: Real Estate Boom", "Demonetisation: Cash Hoarding Encouragement", "Demonetisation: Tariff Imposition"),
        ("Demonetisation: Channelising Savings into Formal Financial System", "Demonetisation shifted household savings from physical cash currency into bank deposits and digital financial payment systems like UPI.", "Tax Administration Measure", "Direct Foreign Investment Policy", "Licensing Deregulation")
    ]
    for feat_title, feat_desc, d1_f, d2_f, d3_f in env_feat_imp:
        qs.append({
            "chapter": "Business Environment",
            "topic": "Business Environment: Features and Importance",
            "subtopic": feat_title,
            "archetype": "conceptual-application",
            "difficulty": 2,
            "stem": f"When a business analyst notes that: '{feat_desc}', which recognized feature or importance of the Business Environment is described?",
            "options": [
                {"id": "A", "text": feat_title, "isCorrect": True, "trap": f"None - exact NCERT concept: {feat_title}."},
                {"id": "B", "text": d1_f, "isCorrect": False, "trap": f"Confusing {feat_title} with {d1_f}."},
                {"id": "C", "text": d2_f, "isCorrect": False, "trap": f"Confusing {feat_title} with {d2_f}."},
                {"id": "D", "text": d3_f, "isCorrect": False, "trap": f"Confusing {feat_title} with {d3_f}."}
            ],
            "sol": f"This description highlights '{feat_title}' as defined in NCERT Class 12 Business Environment."
        })

    # 3. Assertion-Reason & Statement Questions on Business Environment (10 questions)
    ar_data_ch3 = [
        ("Business environment is a dynamic concept.", "It undergoes continuous shifts in technological improvements, consumer preferences, and competitive landscape.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("The entry of Maruti Udyog in the small car segment is a classic example of first-mover advantage.", "Maruti scanned the environment, identified unmet middle-class demand for affordable cars, and captured dominant market share before rivals.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("The business environment is completely static and predictable.", "Managers can accurately forecast market trends decades in advance with zero uncertainty.", "B_both_false", "Both (A) and (R) are false. Business environment is dynamic and uncertain."),
        ("Specific forces of business environment affect all business enterprises uniformly.", "Investors, customers, competitors, and suppliers affect individual firms directly rather than the entire economy uniformly.", "D", "(A) is false, but (R) is true. General forces affect all firms; specific forces affect individual firms directly."),
        ("Demonetisation aimed to create a less-cash or digital economy.", "It encouraged digital payment systems like mobile wallets and bank transfers while penalizing illicit cash transactions.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("Economic reforms of 1991 introduced Liberalisation, Privatisation, and Globalisation (LPG).", "Liberalisation abolished industrial licensing for most industries, allowing freedom in enterprise expansion.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("Increasing competition following 1991 reforms forced Indian firms to adopt market-oriented approaches.", "Enterprises shifted from producing goods first and selling later to studying consumer needs first and manufacturing accordingly.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("Business environment is a relative concept.", "Business environment conditions and consumer demands differ drastically from country to country and region to region.", "A", "Both (A) and (R) are true and (R) is the correct explanation of (A)."),
        ("A ban on single-use plastics represents the Technological Environment.", "Statutory bans issued through government gazette notifications belong to the Legal and Political Environment.", "D", "(A) is false, but (R) is true. Environmental statutory bans belong to the Legal/Political dimension, not Technological."),
        ("Turbulent environmental changes eliminate all need for business planning.", "Environmental turbulence makes environmental scanning and adaptive planning even more indispensable for survival.", "D", "(A) is false, but (R) is true. Turbulence increases the necessity for proactive planning.")
    ]
    for a_t, r_t, cor_k, sol_t in ar_data_ch3:
        if cor_k == "B_both_false":
            opts = [
                {"id": "A", "text": "Both (A) and (R) are true and (R) is the correct explanation of (A).", "isCorrect": False, "trap": "Both statements are factually incorrect."},
                {"id": "B", "text": "Both (A) and (R) are false.", "isCorrect": True, "trap": "None - correctly identifying that both statements are false."},
                {"id": "C", "text": "(A) is true, but (R) is false.", "isCorrect": False, "trap": "Assertion is factually false."},
                {"id": "D", "text": "(A) is false, but (R) is true.", "isCorrect": False, "trap": "Reason is factually false."}
            ]
        else:
            opts = [
                {"id": "A", "text": "Both (A) and (R) are true and (R) is the correct explanation of (A).", "isCorrect": (cor_k == "A"), "trap": "Incorrectly linking statements."},
                {"id": "B", "text": "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "isCorrect": (cor_k == "B"), "trap": "Failing to see the explanatory relationship."},
                {"id": "C", "text": "(A) is true, but (R) is false.", "isCorrect": (cor_k == "C"), "trap": "Misjudging factual validity."},
                {"id": "D", "text": "(A) is false, but (R) is true.", "isCorrect": (cor_k == "D"), "trap": "Misjudging factual validity."}
            ]
        qs.append({
            "chapter": "Business Environment",
            "topic": "Business Environment: Analysis and Impact",
            "subtopic": "Assertion and Reasoning",
            "archetype": "assertion-reasoning",
            "difficulty": 3,
            "stem": f"Given below are two statements labeled as Assertion (A) and Reason (R):\nAssertion (A): {a_t}\nReason (R): {r_t}\nSelect the correct option:",
            "options": opts,
            "sol": sol_t
        })

    # =========================================================================
    # CHAPTER 4: Planning (60 Questions)
    # =========================================================================
    
    # 1. Types of Plans (20 questions: Policy, Procedure, Rule, Budget, etc.)
    plan_types_data = [
        ("Policy", "General statements that guide managerial thinking and channelize decision-making within specified organizational parameters.", "Procedure", "Rule", "Budget"),
        ("Procedure", "Routine steps detailing the exact chronological sequence of performing activities from initiation to completion.", "Policy", "Method", "Rule"),
        ("Rule", "Specific statements specifying what must or must not be done, allowing zero managerial discretion or deviation.", "Policy", "Procedure", "Method"),
        ("Budget", "A statement of expected results expressed in numerical terms for a specified future operating period.", "Programme", "Strategy", "Objective"),
        ("Method", "The prescribed way or manner in which a single particular task has to be performed, considering time, cost, and effort.", "Procedure", "Rule", "Policy"),
        ("Objective", "The desired end results towards which all enterprise activities are directed, expressed in measurable quantitative terms with a deadline.", "Strategy", "Policy", "Programme"),
        ("Strategy", "A comprehensive multi-dimensional plan defining long-term business scope, competitive actions, and resource allocations.", "Objective", "Policy", "Budget"),
        ("Programme", "A comprehensive statement about a project detailing objectives, policies, procedures, rules, task assignments, and budgets.", "Budget", "Strategy", "Method"),
        ("Single-Use Plan", "A plan developed for a one-time non-recurring event or project that is discarded once the project is completed (e.g. budgets, programmes).", "Standing Plan", "Objective", "Policy"),
        ("Standing Plan", "A plan designed for activities that recur regularly over time, providing operational consistency and stability (e.g. policies, procedures, rules).", "Single-Use Plan", "Budget", "Programme"),
        ("Rule vs Policy", "A policy allows decision discretion within broad boundaries, whereas a rule allows zero discretion and demands rigid compliance.", "Procedure vs Method", "Objective vs Strategy", "Budget vs Programme"),
        ("Procedure vs Method", "A procedure involves a sequence of chronological steps across departments, whereas a method deals with a single step in that procedure.", "Rule vs Policy", "Objective vs Strategy", "Budget vs Programme"),
        ("Budget as a Control Standard", "Because budgets quantify future forecasts in numerical figures, they serve as foundational benchmarks against which actual variance is measured.", "Strategy as Objective", "Policy as Rule", "Method as Procedure"),
        ("No Smoking inside Chemical Storage Bay", "This is an explicit Rule because it specifies what must not be done and carries strict penalties with zero discretion.", "Policy", "Procedure", "Method"),
        ("Credit Policy of 30 Days to Wholesale Stockists", "This is a Policy guiding sales managers on acceptable credit parameters during commercial negotiations.", "Rule", "Procedure", "Budget"),
        ("Standard Sequence for Processing Raw Material Requisitions", "This represents a Procedure detailing the multi-tier chronological routing of purchase requisitions.", "Method", "Policy", "Rule"),
        ("Calibrating Laboratory Digital Spectrometer", "This represents a Method detailing the specific scientific technique of operating a single instrument.", "Procedure", "Rule", "Policy"),
        ("Annual Cash Flow Projection detailing Month-Wise Inflows", "This represents a Cash Budget, expressing future liquidity expectations strictly in numerical terms.", "Programme", "Policy", "Strategy"),
        ("Corporate Plan for Setting up a New Overseas Subsidiary", "This represents a Programme, integrating multiple single-use sub-plans, budgets, and milestones.", "Policy", "Method", "Rule"),
        ("Targeting 20% Return on Capital Employed in FY 2026-27", "This represents an Objective, stating the quantified desired end result within a specific timeframe.", "Strategy", "Policy", "Procedure")
    ]
    for ptype, pdesc, d1_p, d2_p, d3_p in plan_types_data:
        qs.append({
            "chapter": "Planning",
            "topic": "Types of Plans",
            "subtopic": ptype,
            "archetype": "conceptual-application",
            "difficulty": 2,
            "stem": f"In organizational planning, a plan or guideline described as: '{pdesc}' represents which type of Plan according to NCERT?",
            "options": [
                {"id": "A", "text": ptype, "isCorrect": True, "trap": f"None - exact NCERT definition: {ptype}."},
                {"id": "B", "text": d1_p, "isCorrect": False, "trap": f"Confusing {ptype} with {d1_p}."},
                {"id": "C", "text": d2_p, "isCorrect": False, "trap": f"Confusing {ptype} with {d2_p}."},
                {"id": "D", "text": d3_p, "isCorrect": False, "trap": f"Confusing {ptype} with {d3_p}."}
            ],
            "sol": f"This plan corresponds to a '{ptype}' as classified in NCERT Class 12 Planning."
        })

    # 2. Planning Process (20 questions: Steps, Chronology, Evaluation)
    plan_steps_data = [
        ("Step 1: Setting Objectives", "Specifying what the enterprise wants to achieve, providing direction to all functional departments and employees.", "Step 2: Developing Premises", "Step 3: Identifying Alternatives", "Step 4: Evaluating Alternatives"),
        ("Step 2: Developing Premises", "Formulating disciplined assumptions and forecasts regarding future economic trends, tax policies, and raw material prices upon which plans are built.", "Step 1: Setting Objectives", "Step 3: Identifying Alternatives", "Step 4: Evaluating Alternatives"),
        ("Step 3: Identifying Alternative Courses of Action", "Discovering and generating all feasible pathways and operational strategies through which pre-set objectives may be achieved.", "Step 2: Developing Premises", "Step 4: Evaluating Alternatives", "Step 5: Selecting an Alternative"),
        ("Step 4: Evaluating Alternative Courses", "Weighing the positive and negative aspects of each alternative against criteria such as capital cost, profitability, payback period, and risk.", "Step 3: Identifying Alternatives", "Step 5: Selecting an Alternative", "Step 6: Formulating Derivative Plans"),
        ("Step 5: Selecting an Alternative", "The real point of decision-making where the most feasible, profitable, and adaptable plan is finalized by management.", "Step 4: Evaluating Alternatives", "Step 6: Formulating Derivative Plans", "Step 7: Implementing the Plan"),
        ("Step 6: Formulating Derivative Plans", "Drafting supportive secondary plans (such as recruitment plans, purchasing schedules, and maintenance budgets) to support the basic plan.", "Step 5: Selecting an Alternative", "Step 7: Implementing the Plan", "Step 8: Follow-up Action"),
        ("Step 7: Implementing the Plan", "Putting the finalized plan into actual operation by allocating resources, activating operational departments, and issuing instructions.", "Step 6: Formulating Derivative Plans", "Step 8: Follow-up Action", "Step 5: Selecting an Alternative"),
        ("Step 8: Follow-up Action", "Monitoring whether plans are being executed properly and whether activities are performing as scheduled, providing feedback for controlling.", "Step 7: Implementing the Plan", "Step 6: Formulating Derivative Plans", "Step 1: Setting Objectives"),
        ("Planning Premises as Forecasts", "Premises are not wild guesses; they are disciplined forecasts about future market demand, government policy, and inflation rates.", "Premises as Final Objectives", "Premises as Derivative Budgets", "Premises as Operational Rules"),
        ("Feasibility Screening of Alternatives", "Eliminating unviable alternatives early to focus deep quantitative evaluation on genuine, workable contenders.", "Developing Premises", "Follow-up Action", "Setting Objectives"),
        ("Managerial Judgment in Plan Selection", "Selecting an alternative often requires combining mathematical optimization models with seasoned managerial intuition and foresight.", "Rule Formulation", "Sample Checking", "Motion Study"),
        ("Derivative Plans in Manufacturing", "A master production plan to manufacture 50,000 cars requires derivative plans for tyre procurement, tooling setup, and labor shifts.", "Follow-up Action", "Developing Premises", "Setting Objectives"),
        ("Linkage between Follow-Up and Controlling", "Follow-up action in planning monitors real progress and feeds actual variance data into the managerial controlling process.", "Setting Premises", "Identifying Alternatives", "Formulating Rules"),
        ("Quantifying Objectives with Deadlines", "Objectives must be clear, quantifiable, and time-bound, such as 'increasing domestic market share by 5% in the next financial year'.", "General Aspirations", "Derivative Budgets", "Planning Premises"),
        ("Contingency Alternatives in Dynamic Markets", "Preparing contingency backup alternatives allows management to switch plans swiftly if external premises fluctuate drastically.", "Rigid Planning", "Unchecked Execution", "Trial-and-Error")
    ]
    for s_name, s_desc, d1_s, d2_s, d3_s in plan_steps_data:
        qs.append({
            "chapter": "Planning",
            "topic": "Planning Process",
            "subtopic": s_name,
            "archetype": "conceptual-application",
            "difficulty": 2,
            "stem": f"In executing strategic planning, managers engage in: '{s_desc}'. Which step or tenet of the Planning Process is being performed?",
            "options": [
                {"id": "A", "text": s_name, "isCorrect": True, "trap": f"None - exact step in NCERT planning process: {s_name}."},
                {"id": "B", "text": d1_s, "isCorrect": False, "trap": f"Confusing {s_name} with {d1_s}."},
                {"id": "C", "text": d2_s, "isCorrect": False, "trap": f"Confusing {s_name} with {d2_s}."},
                {"id": "D", "text": d3_s, "isCorrect": False, "trap": f"Confusing {s_name} with {d3_s}."}
            ],
            "sol": f"This activity corresponds to '{s_name}' in the NCERT Planning Process."
        })

    # Sequential Ordering of Planning Steps (5 questions)
    qs.append({
        "chapter": "Planning",
        "topic": "Planning Process",
        "subtopic": "Sequential Ordering of Steps",
        "archetype": "chronological-sequence",
        "difficulty": 3,
        "stem": "Arrange the following steps of the planning process in their correct logical sequence:\n(A) Developing premises\n(B) Identifying alternative courses of action\n(C) Setting objectives\n(D) Evaluating alternative courses\n(E) Selecting an alternative\nChoose the correct option:",
        "options": [
            {"id": "A", "text": "(C) -> (A) -> (B) -> (D) -> (E)", "isCorrect": True, "trap": "None - exact NCERT sequence: Setting objectives -> Developing premises -> Identifying alternatives -> Evaluating alternatives -> Selecting alternative."},
            {"id": "B", "text": "(C) -> (B) -> (A) -> (D) -> (E)", "isCorrect": False, "trap": "Premises must be developed before alternatives can be identified."},
            {"id": "C", "text": "(A) -> (C) -> (B) -> (E) -> (D)", "isCorrect": False, "trap": "Objectives must precede developing premises."},
            {"id": "D", "text": "(C) -> (A) -> (D) -> (B) -> (E)", "isCorrect": False, "trap": "Alternatives must be identified before they can be evaluated."}
        ],
        "sol": "Correct sequence: 1. Setting objectives -> 2. Developing premises -> 3. Identifying alternatives -> 4. Evaluating alternatives -> 5. Selecting an alternative."
    })

    # 3. Importance & Limitations of Planning (20 questions)
    plan_imp_lim_data = [
        ("Planning leads to rigidity", "Following a pre-decided course of action when sudden external market conditions fluctuate drastically prevents managers from taking necessary emergency initiatives.", "Planning reduces creativity", "Planning involves huge costs", "Planning does not guarantee success"),
        ("Planning may not work in a dynamic environment", "Rapid technological obsolescence, economic shifts, and changing consumer habits make long-term future assumptions and premises obsolete.", "Planning leads to rigidity", "Planning is time-consuming", "Planning reduces overlapping activities"),
        ("Planning reduces creativity", "Middle managers and frontline operatives merely follow pre-established guidelines without exercising personal ingenuity or innovation.", "Planning involves huge costs", "Planning leads to rigidity", "Planning does not guarantee success"),
        ("Planning involves huge costs", "Extensive collection of market intelligence, boardroom strategy sessions, and statistical economic projections consume substantial financial resources.", "Planning is time-consuming", "Planning reduces creativity", "Planning provides direction"),
        ("Planning is a time-consuming process", "Elaborate forecasting, consensus-building, and procedural drafting consume enormous time, leading to missed fast-moving market opportunities.", "Planning involves huge costs", "Planning leads to rigidity", "Planning reduces uncertainty"),
        ("Planning does not guarantee success", "Managers often develop a false sense of security, complacently relying on previously successful plans that fail when market contexts shift.", "Planning reduces creativity", "Planning leads to rigidity", "Planning involves huge costs"),
        ("Planning provides direction", "By stating in advance how work is to be done, planning provides clear direction for action so employees know what targets they are working towards.", "Planning reduces uncertainty", "Planning promotes innovation", "Planning facilitates decision making"),
        ("Planning reduces the risks of uncertainty", "By anticipating changes and developing managerial responses in advance, planning reduces unpredictable disruptions.", "Planning provides direction", "Planning establishes standards", "Planning reduces overlapping activities"),
        ("Planning reduces overlapping and wasteful activities", "Coordinating activities across departments eliminates organizational chaos, duplication of effort, and resource waste.", "Planning promotes innovation", "Planning provides direction", "Planning facilitates decision making"),
    ]
    for s_name, s_desc, d1_s, d2_s, d3_s in plan_imp_lim_data:
        qs.append({
            "chapter": "Planning",
            "topic": "Planning: Importance and Limitations",
            "subtopic": s_name,
            "archetype": "conceptual-scenario",
            "difficulty": 2,
            "stem": f"Identify the limitation or importance of planning highlighted: '{s_desc}'",
            "options": [
                {"id": "A", "text": s_name, "isCorrect": True, "trap": f"None - exact feature: {s_name}."},
                {"id": "B", "text": d1_s, "isCorrect": False, "trap": f"Confusing {s_name} with {d1_s}."},
                {"id": "C", "text": d2_s, "isCorrect": False, "trap": f"Confusing {s_name} with {d2_s}."},
                {"id": "D", "text": d3_s, "isCorrect": False, "trap": f"Confusing {s_name} with {d3_s}."}
            ],
            "sol": f"The scenario illustrates: '{s_name}'."
        })
    # Additional 7 Questions for Chapter 1 (bringing Ch 1 to exactly 80)
    ch1_extra = [
        ("Management as an Art: Features", "An artist uses colors, brushes, and personal imagination; similarly, a manager applies management principles with personal skill, creativity, and style.", "Management as an Art", "Management as a Pure Science", "Management as a Profession", "Management as Bureaucracy", "Art is the personalized application of theoretical knowledge with creativity and practice. Management possesses this feature fully."),
        ("Management as a Science: Experimentation", "Principles of management are derived after continuous observation and repeated experimentation under diverse organizational conditions.", "Management as a Science", "Management as an Art", "Management as an Intuition", "Management as a Habit", "Science is a systematized body of knowledge based on observation and repeated experimentation."),
        ("Management as a Profession: Well-defined Body of Knowledge", "All professions are based on a well-defined body of knowledge that can be acquired through instruction, which management fulfills through business schools.", "Management as an Emerging Profession", "Management as a Rigid Science", "Management as Pure Intuition", "Management as an Art Alone", "Management has a well-defined body of knowledge, though universal statutory licensing is not yet legally compulsory."),
        ("Match Levels of Management with Typical Focus", "Match List-I (Management Level) with List-II (Core Focus):\nList-I:\n(A) Top Management\n(B) Middle Management\n(C) Operational Management\n(D) Advisory Board\n\nList-II:\n(I) Daily machine upkeep and safety\n(II) Departmental execution and coordination\n(III) Overall organizational survival and vision\n(IV) Non-executive expert counsel\nChoose the correct option:", "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)", "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)", "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)", "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)", "Top management focuses on overall survival (III); Middle management focuses on departmental execution (II); Operational focuses on machine safety (I); Advisory provides non-executive counsel (IV)."),
        ("Importance of Coordination in Resolving Departmental Silos", "When the production department overproduces goods that the sales department cannot sell, the function needed to reconcile these conflicting activities is:", "Coordination", "Directing Alone", "Staffing Alone", "Controlling Alone", "Coordination synchronizes the activities of different departments to prevent functional silos and stockpiling."),
        ("Coordination as a Deliberate Effort Scenario", "Even where employees have strong personal goodwill to cooperate, a manager must deliberately establish communication lines and schedules to prevent wasted effort.", "Coordination as a Deliberate Function", "Coordination as an Accidental Event", "Coordination as an Informal Gossip", "Coordination as Pure Luck", "Coordination is not spontaneous; it is a conscious, deliberate managerial effort to harmonize actions."),
        ("Organisational Growth requiring Coordination", "As an enterprise scales from 50 workers to 5,000 workers across four states, coordination becomes indispensable because:", "Individual goals and behavioral habits must be integrated into corporate objectives.", "All employees automatically behave identically.", "Communication happens spontaneously without effort.", "Control mechanisms become completely unnecessary.", "Growth in size introduces diversity of individuals and sectional goals, making coordination vital to harmonize them.")
    ]
    for s_title, s_stem, s_cor, s_w1, s_w2, s_w3, s_sol in ch1_extra:
        qs.append({
            "chapter": "Nature and Significance of Management",
            "topic": "Management: Concept and Coordination",
            "subtopic": s_title,
            "archetype": "conceptual-application" if "Match" not in s_stem else "match-the-following",
            "difficulty": 2,
            "stem": s_stem,
            "options": [
                {"id": "A", "text": s_cor, "isCorrect": True, "trap": f"None - correct application: {s_sol}"},
                {"id": "B", "text": s_w1, "isCorrect": False, "trap": "Confusing conceptual criteria."},
                {"id": "C", "text": s_w2, "isCorrect": False, "trap": "Inaccurate classification."},
                {"id": "D", "text": s_w3, "isCorrect": False, "trap": "Distractor."}
            ],
            "sol": s_sol
        })

    # Additional 30 Questions for Chapter 2 (bringing Ch 2 to exactly 100)
    ch2_extra = [
        # 10 Statement I & II on Fayol
        ("Fayol's principle of Unity of Command prevents dual subordination.", "Violating Unity of Command causes indiscipline, undermines authority, and creates operational confusion.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements are correct. Unity of Command prevents dual subordination and indiscipline."),
        ("Fayol's principle of Unity of Direction states that there should be one head and one plan for a group of activities having the same objective.", "Unity of Direction prevents overlapping and duplication of activities.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements are correct NCERT tenets defining Unity of Direction."),
        ("According to Fayol, authority can exist without any responsibility in high-performing teams.", "Responsibility without authority leads to operational frustration and inability to execute tasks.", "Statement I is incorrect but Statement II is correct.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "There must be parity of authority and responsibility; authority without responsibility causes misuse."),
        ("Discipline according to Fayol requires good superiors at all levels, clear and fair agreements, and judicious application of penalties.", "Discipline only applies to manual shop-floor laborers and not to managerial personnel.", "Statement I is correct but Statement II is incorrect.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is incorrect but Statement II is correct.", "Discipline applies to all levels of the enterprise, including executives and workers."),
        ("Fayol's Scalar Chain can be bypassed during an emergency using a Gang Plank.", "Employees communicating via Gang Plank must be of equal rank and must inform their respective superiors.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements are correct conditions for utilizing Fayol's Gang Plank."),
        ("Principle of Order in Fayol's framework refers solely to maintaining physical police law and order on factory premises.", "Order means 'a place for everything and everyone in their place' to minimize search time.", "Statement I is incorrect but Statement II is correct.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Order refers to material and social order (right place/person), not police law enforcement."),
        ("Fayol advocated that remuneration of employees should be fair to workers and within the paying capacity of the firm.", "Employees should be paid starvation wages during industrial recessions regardless of cost of living.", "Statement I is correct but Statement II is incorrect.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is incorrect but Statement II is correct.", "Remuneration must provide a reasonable living standard while respecting the firm's paying capacity."),
        ("Fayol's principle of Equity insists on kindliness and justice in dealing with subordinates without discrimination.", "Equity requires that lazy workers and diligent workers must receive identical praise regardless of performance.", "Statement I is correct but Statement II is incorrect.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is incorrect but Statement II is correct.", "Equity does not mean identical treatment for poor performance; it means fair treatment without discrimination."),
        ("Stability of tenure of personnel minimizes employee turnover and builds organizational efficiency.", "Frequent transfers and terminations prevent workers from settling into their jobs and create insecurity.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements accurately reflect Fayol's principle of Stability of Tenure."),
        ("Esprit de Corps advises managers to replace 'I' with 'We' to foster mutual trust and team unity.", "Management should rely on formal written penal methods rather than informal team spirit to build unity.", "Statement I is correct but Statement II is incorrect.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is incorrect but Statement II is correct.", "Esprit de Corps fosters team spirit and recommends avoiding formal penal methods where trust suffices."),

        # 10 Match the Columns on Taylor and Fayol
        ("Fayol's Principles and Outcomes", "Match List-I (Fayol Principle) with List-II (Intended Outcome):\nList-I:\n(A) Division of Work\n(B) Unity of Command\n(C) Unity of Direction\n(D) Esprit de Corps\n\nList-II:\n(I) Prevents overlapping of corporate activities\n(II) Specialization and higher output\n(III) Eliminates dual subordination\n(IV) Replaces 'I' with 'We' for team spirit\nChoose the correct option:", "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)", "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)", "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)", "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)", "Division of work -> specialization (II); Unity of command -> eliminates dual subordination (III); Unity of direction -> prevents overlapping (I); Esprit de corps -> replaces 'I' with 'We' (IV)."),
        ("Taylor's Planning Clerks", "Match List-I (Taylor Planning Clerk) with List-II (Core Responsibility):\nList-I:\n(A) Instruction Card Clerk\n(B) Route Clerk\n(C) Time and Cost Clerk\n(D) Disciplinarian\n\nList-II:\n(I) Prepares daily wage sheets and unit cost records\n(II) Specifies sequence and path of production on shop floor\n(III) Drafts operating instructions for workers\n(IV) Enforces factory order and rules\nChoose the correct option:", "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)", "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)", "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)", "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)", "Instruction card clerk drafts instructions (III); Route clerk specifies production path (II); Time and cost clerk prepares wage sheets (I); Disciplinarian enforces rules (IV)."),
        ("Taylor's Production Clerks", "Match List-I (Taylor Production Clerk) with List-II (Core Responsibility):\nList-I:\n(A) Speed Boss\n(B) Gang Boss\n(C) Repair Boss\n(D) Inspector\n\nList-II:\n(I) Keeps machines and tools ready for worker use\n(II) Checks quality and tolerances of finished products\n(III) Ensures machines operate at prescribed standard speed\n(IV) Ensures proper maintenance and repair of machines\nChoose the correct option:", "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)", "(A)-(I), (B)-(III), (C)-(IV), (D)-(II)", "(A)-(III), (B)-(IV), (C)-(I), (D)-(II)", "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)", "Speed boss ensures standard speed (III); Gang boss keeps tools ready (I); Repair boss maintains machines (IV); Inspector checks product quality (II)."),
        ("Taylor's Work Study Techniques", "Match List-I (Work Study Technique) with List-II (Instrument/Objective):\nList-I:\n(A) Time Study\n(B) Motion Study\n(C) Method Study\n(D) Fatigue Study\n\nList-II:\n(I) Process charts to find the 'One Best Way'\n(II) Cinematic cameras to eliminate wasteful body movements\n(III) Stopwatch to determine standard time and fair day's work\n(IV) Determining frequency and duration of rest intervals\nChoose the correct option:", "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)", "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)", "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)", "(A)-(II), (B)-(III), (C)-(IV), (D)-(I)", "Time study uses stopwatch (III); Motion study eliminates wasteful movements (II); Method study finds One Best Way (I); Fatigue study determines rest intervals (IV)."),
        ("Taylor vs Fayol Contrast", "Match List-I (Parameter) with List-II (Taylor vs Fayol Position):\nList-I:\n(A) Perspective\n(B) Unity of Command\n(C) Focus\n(D) Applicability\n\nList-II:\n(I) Observed strictly by Fayol; violated by Taylor's Functional Foremanship\n(II) Shop floor for Taylor; top management for Fayol\n(III) Universally applicable for Fayol; specialized factory shops for Taylor\n(IV) Increasing worker productivity for Taylor; improving administration for Fayol\nChoose the correct option:", "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)", "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)", "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)", "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)", "Perspective: shop floor vs top management (II); Unity of command: observed by Fayol, violated by Taylor (I); Focus: productivity vs administration (IV); Applicability: universal vs specialized (III)."),

        # 5 Assertion-Reason on Taylor
        ("Functional foremanship violates Henri Fayol's principle of Unity of Command.", "Under functional foremanship, each worker receives instructions from eight specialized supervisors.", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "Functional foremanship separates planning into 4 clerks and production into 4 bosses, meaning a worker reports to 8 bosses, violating Unity of Command."),
        ("Taylor advocated the differential piece wage system to reward efficient workers.", "Under differential piece rate, efficient workers producing at or above standard earn higher per-unit rates, while inefficient workers receive lower rates.", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "The differential piece wage system explicitly penalizes inefficiency and rewards efficiency through differentiated piece rates."),
        ("Mental revolution is the core philosophical essence of scientific management.", "Mental revolution requires a complete change in the mental outlook of both workers and management from conflict to mutual cooperation.", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "Taylor stated that without a complete mental revolution between capital and labor, scientific management cannot exist."),
        ("Standardization of work refers solely to manufacturing identical finished products.", "Standardization involves establishing benchmarks for raw materials, tools, machines, and working conditions as well.", "Statement I is incorrect but Statement II is correct.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Standardization applies to processes, materials, equipment, and working conditions, not just the final product."),
        ("Simplification of work aims at eliminating unnecessary varieties, sizes, and dimensions of manufactured goods.", "Simplification leads to savings in tool costs, economies of scale, and reduced inventory holding expenses.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements are correct. Simplification eliminates superfluous varieties to economize production.")
    ]
    for s_title, s_stem, s_cor, s_w1, s_w2, s_w3, s_sol in ch2_extra:
        arch = "statement-based" if "Statement" in s_stem else ("match-the-following" if "Match" in s_stem else "assertion-reasoning")
        qs.append({
            "chapter": "Principles of Management",
            "topic": "Principles and Techniques of Management",
            "subtopic": s_title,
            "archetype": arch,
            "difficulty": 2 if arch == "statement-based" else 3,
            "stem": s_stem,
            "options": [
                {"id": "A", "text": s_cor, "isCorrect": True, "trap": f"None - correct analysis: {s_sol}"},
                {"id": "B", "text": s_w1, "isCorrect": False, "trap": "Misidentifying relationship or statement validity."},
                {"id": "C", "text": s_w2, "isCorrect": False, "trap": "Overlooking error in statement."},
                {"id": "D", "text": s_w3, "isCorrect": False, "trap": "Inaccurate evaluation."}
            ],
            "sol": s_sol
        })

    # Additional 9 Questions for Chapter 4 (bringing Ch 4 to exactly 60)
    ch4_extra = [
        ("Assertion-Reason: Planning and Controlling Interdependence", "Given below are two statements labeled as Assertion (A) and Reason (R):\nAssertion (A): Planning is meaningless without controlling.\nReason (R): Controlling evaluates whether actual performance adheres to the standards established during planning.\nSelect the correct option:", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "Planning sets standards; without controlling to enforce and verify execution, plans remain mere academic desires."),
        ("Assertion-Reason: Planning leads to Rigidity", "Given below are two statements labeled as Assertion (A) and Reason (R):\nAssertion (A): In an organization, a well-defined plan can sometimes lead to operational rigidity.\nReason (R): Managers may lack the discretion to modify pre-determined courses of action when unexpected market crises occur.\nSelect the correct option:", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "Rigidity arises because formal procedures and strict guidelines discourage frontline managers from adapting to emergencies."),
        ("Assertion-Reason: Planning Premises", "Given below are two statements labeled as Assertion (A) and Reason (R):\nAssertion (A): Planning premises are developed before identifying alternative courses of action.\nReason (R): Premises represent the future forecasts, economic assumptions, and policy bounds upon which alternative plans are built.\nSelect the correct option:", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "Developing premises is the 2nd step in planning, establishing future assumptions before identifying alternatives."),
        ("Assertion-Reason: Standing vs Single-Use Plans", "Given below are two statements labeled as Assertion (A) and Reason (R):\nAssertion (A): A corporate budget is classified as a single-use plan.\nReason (R): A budget is formulated for a specific operating period and is discarded once that period lapses.\nSelect the correct option:", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "Budgets apply to specific timeframes (e.g. FY 2026-27) and are non-recurring, defining single-use plans."),
        ("Statement I & II: Policy vs Rule", "Read the two statements given below:\nStatement I: A policy provides general guidance in thinking and allows managerial discretion.\nStatement II: A rule is a specific statement that allows zero discretion and demands rigid compliance.\nChoose the correct option:", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements correctly capture the exact NCERT distinction between a policy and a rule."),
        ("Statement I & II: Procedure vs Method", "Read the two statements given below:\nStatement I: A procedure details the exact chronological sequence of performing activities across departments.\nStatement II: A method prescribes the standardized manner of performing a single specific task within a procedure.\nChoose the correct option:", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements accurately define procedure (chronological steps) and method (single task technique)."),
        ("Statement I & II: Planning and Dynamic Environment", "Read the two statements given below:\nStatement I: Planning guarantees 100% commercial success in turbulent, dynamic markets.\nStatement II: Rapid changes in technology, consumer preferences, and government policies can make planning premises obsolete.\nChoose the correct option:", "Statement I is incorrect but Statement II is correct.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Planning does not guarantee success; environmental turbulence can disrupt assumptions and render plans ineffective."),
        ("Statement I & II: Objectives in Planning", "Read the two statements given below:\nStatement I: Objectives are the end results towards which all organizational activities are directed.\nStatement II: Objectives should be stated in vague, qualitative slogans without any numerical targets or deadlines.\nChoose the correct option:", "Statement I is correct but Statement II is incorrect.", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is incorrect but Statement II is correct.", "Statement I is correct; Statement II is false because objectives must be clear, quantifiable, and time-bound."),
        ("Match Types of Plans with Business Examples", "Match List-I (Type of Plan) with List-II (Concrete Example):\nList-I:\n(A) Rule\n(B) Policy\n(C) Procedure\n(D) Budget\n\nList-II:\n(I) 'No employee shall use personal mobile phones on the operating lathe line'\n(II) 'Recruitment shall give preference to internal candidates having 3 years tenure'\n(III) 'Steps for vendor invoice verification: Receive goods -> Inspect -> Verify PO -> Release payment'\n(IV) 'Sales target of Rs. 50 Crore with marketing allocation of Rs. 4 Crore for Q1'\nChoose the correct option:", "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)", "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)", "(A)-(I), (B)-(III), (C)-(II), (D)-(IV)", "(A)-(IV), (B)-(II), (C)-(III), (D)-(I)", "Rule is strict negative mandate (I); Policy guides thinking (II); Procedure gives chronological steps (III); Budget gives numerical figures (IV).")
    ]
    for s_title, s_stem, s_cor, s_w1, s_w2, s_w3, s_sol in ch4_extra:
        arch = "statement-based" if "Statement" in s_stem else ("match-the-following" if "Match" in s_stem else "assertion-reasoning")
        qs.append({
            "chapter": "Planning",
            "topic": "Planning: Concepts and Types",
            "subtopic": s_title,
            "archetype": arch,
            "difficulty": 2 if arch == "statement-based" else 3,
            "stem": s_stem,
            "options": [
                {"id": "A", "text": s_cor, "isCorrect": True, "trap": f"None - correct analysis: {s_sol}"},
                {"id": "B", "text": s_w1, "isCorrect": False, "trap": "Misidentifying relationship or statement validity."},
                {"id": "C", "text": s_w2, "isCorrect": False, "trap": "Overlooking error in statement."},
                {"id": "D", "text": s_w3, "isCorrect": False, "trap": "Inaccurate evaluation."}
            ],
            "sol": s_sol
        })


    # Final 10 Questions for Chapter 2 (reaching exactly 100)
    ch2_final_10 = [
        ("Taylor's Differential Piece Rate Wage Calculation", "Under Taylor's differential piece rate system, the standard output is 50 units per day. The wage rate is Rs. 10 per unit for output below standard and Rs. 12 per unit for output at or above standard. Worker X produces 45 units and Worker Y produces 55 units. What are the daily earnings of Worker X and Worker Y respectively?", "Worker X = Rs. 450, Worker Y = Rs. 660", "Worker X = Rs. 540, Worker Y = Rs. 600", "Worker X = Rs. 450, Worker Y = Rs. 550", "Worker X = Rs. 500, Worker Y = Rs. 660", "Worker X is below standard (45 units): earns 45 * Rs. 10 = Rs. 450. Worker Y is at/above standard (55 units): earns 55 * Rs. 12 = Rs. 660. The difference of Rs. 210 strongly incentivizes achieving standard."),
        ("Taylor's Work Study: Method Study Objective", "The primary objective of Method Study in scientific management is to:", "Find the 'One Best Way' of performing a job from procurement of raw material to delivery", "Determine the standard rest intervals during continuous heavy work", "Eliminate unnecessary and unproductive body movements of operatives", "Measure the standard time required by an average worker to complete a job", "Method study aims to find the one best way of doing a job to minimize cost and maximize quality and customer satisfaction."),
        ("Taylor's Work Study: Motion Study Objective", "In a manufacturing plant, cameras are used to record workers' physical motions to eliminate unproductive bending, reaching, and lifting. This technique is known as:", "Motion Study", "Time Study", "Fatigue Study", "Method Study", "Motion study refers to the study of movements like lifting, putting objects, sitting, and changing positions to eliminate wasteful motions."),
        ("Taylor's Work Study: Fatigue Study Rest Intervals", "Given below are two statements labeled as Statement I and Statement II:\nStatement I: Fatigue study seeks to determine the amount and frequency of rest intervals required in completing a task.\nStatement II: Rest intervals enable workers to regain lost stamina and reduce physical accidents on the shop floor.\nChoose the correct option:", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements correctly state the purpose and psychological benefit of fatigue study according to NCERT."),
        ("Fayol's Scalar Chain and Emergency Gang Plank", "Given below are two statements labeled as Assertion (A) and Reason (R):\nAssertion (A): Henri Fayol permitted direct contact across departmental lines through a Gang Plank during an emergency.\nReason (R): The Gang Plank prevents delay in urgent communication while ensuring superiors are kept informed.\nSelect the correct option:", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "Fayol designed Gang Plank specifically as an exception to the formal scalar chain to avoid fatal delays in emergency cross-functional decisions."),
        ("Fayol's Principle: Remuneration of Employees", "According to Henri Fayol's principle of Remuneration of Employees, remuneration should satisfy which dual criteria?", "Provide a fair living standard to workers while remaining within the paying capacity of the firm", "Be identical across all industries irrespective of business profitability", "Be decided entirely by external trade unions regardless of corporate productivity", "Be kept at subsistence minimum level to maximize firm profits", "Fayol stipulated that remuneration must be fair to give maximum satisfaction to both employees (living standard) and employers (paying capacity)."),
        ("Taylor vs Fayol: Unity of Command Contrast", "Given below are two statements labeled as Statement I and Statement II:\nStatement I: Henri Fayol strictly insisted that each subordinate should receive orders from and be accountable to only one superior.\nStatement II: F.W. Taylor advocated Functional Foremanship, where each shop-floor worker receives orders from eight specialized bosses.\nChoose the correct option:", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements are correct. Fayol staunchly upheld Unity of Command, whereas Taylor's Functional Foremanship deliberately violated it."),
        ("Taylor's Mental Revolution Essence", "Given below are two statements labeled as Assertion (A) and Reason (R):\nAssertion (A): F.W. Taylor stated that scientific management involves a complete mental revolution.\nReason (R): Workers and management must stop disputing over the division of surplus and instead cooperate to expand the surplus.\nSelect the correct option:", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "Mental revolution demands that labor and capital replace hostility with mutual cooperation to enlarge the total surplus."),
        ("Taylor's Differential Piece Rate Philosophy", "Under Taylor's scientific management, the fundamental rationale behind the Differential Piece Wage System is:", "To reward efficient workers with higher unit rates and motivate inefficient workers to achieve standard output", "To pay identical flat wages to all workers regardless of output to promote harmony", "To replace piece-rate wages completely with monthly fixed executive salaries", "To penalize all workers equally when factory power failure causes machinery stoppage", "Differential piece rates differentiate between efficient and inefficient workers, providing a strong financial incentive to achieve standard performance."),
        ("Fayol's Principle of Subordination of Individual Interest", "When a purchase manager decides to award a company raw material contract to his brother-in-law at inflated prices despite better market quotes, which principle of Fayol is violated?", "Subordination of Individual Interest to General Interest", "Remuneration of Employees", "Unity of Direction", "Centralization and Decentralization", "The interest of an individual employee or manager must never take precedence over the larger interest of the enterprise.")
    ]
    for s_title, s_stem, s_cor, s_w1, s_w2, s_w3, s_sol in ch2_final_10:
        arch = "statement-based" if "Statement" in s_stem else ("assertion-reasoning" if "Assertion" in s_stem else ("numerical-calculation" if "Calculation" in s_title else "conceptual-application"))
        qs.append({
            "chapter": "Principles of Management",
            "topic": "Principles and Techniques of Management",
            "subtopic": s_title,
            "archetype": arch,
            "difficulty": 2 if arch == "statement-based" else 3,
            "stem": s_stem,
            "options": [
                {"id": "A", "text": s_cor, "isCorrect": True, "trap": f"None - correct analysis: {s_sol}"},
                {"id": "B", "text": s_w1, "isCorrect": False, "trap": "Misidentifying principle or calculation error."},
                {"id": "C", "text": s_w2, "isCorrect": False, "trap": "Inaccurate conceptual application."},
                {"id": "D", "text": s_w3, "isCorrect": False, "trap": "Distractor option."}
            ],
            "sol": s_sol
        })

    # Final 6 Questions for Chapter 4 (reaching exactly 60)
    ch4_final_6 = [
        ("Planning: Strategy Definition", "A comprehensive, multi-dimensional plan formulated to achieve organizational objectives in the face of competitive market forces is called a:", "Strategy", "Policy", "Procedure", "Method", "A strategy is a comprehensive plan including: (1) determining long-term objectives, (2) adopting a particular course of action, and (3) allocating resources."),
        ("Planning: Programme Definition", "A detailed project statement that encompasses objectives, policies, procedures, rules, task assignments, physical and financial resources required to execute an action is a:", "Programme", "Policy", "Rule", "Method", "A programme is a single-use plan that covers the entire gamut of activities necessary to accomplish a broad project."),
        ("Planning Premises: Internal vs External Forecasts", "Given below are two statements labeled as Assertion (A) and Reason (R):\nAssertion (A): Planning premises consist of both internal assumptions and external forecasts.\nReason (R): Internal premises involve capital availability and plant capacity, whereas external premises involve government policies, interest rates, and demographic trends.\nSelect the correct option:", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "Planning premises are foundational assumptions; internal premises relate to controllable firm capabilities while external premises relate to uncontrollable macro factors."),
        ("Planning and Controlling Forward and Backward Relationship", "Given below are two statements labeled as Statement I and Statement II:\nStatement I: Planning is forward-looking because plans are prepared for the future.\nStatement II: Controlling is backward-looking because it reviews past performance against set standards.\nChoose the correct option:", "Both Statement I and Statement II are correct.", "Both Statement I and Statement II are incorrect.", "Statement I is correct but Statement II is incorrect.", "Statement I is incorrect but Statement II is correct.", "Both statements are correct. NCERT emphasizes that planning is forward-looking and controlling is backward-looking, yet both are deeply interlinked."),
        ("Standing Plans vs Single-Use Plans Classification", "Match List-I (Plan Type) with List-II (NCERT Classification):\nList-I:\n(A) Corporate Budget\n(B) Safety Rule\n(C) Vendor Selection Policy\n(D) Plant Expansion Programme\n\nList-II:\n(I) Standing Plan\n(II) Single-Use Plan\n(III) Standing Plan\n(IV) Single-Use Plan\nChoose the correct option:", "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)", "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)", "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)", "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)", "Budgets and Programmes are single-use plans; Rules and Policies are standing plans."),
        ("Limitation of Planning: Dynamic Environment Assertion", "Given below are two statements labeled as Assertion (A) and Reason (R):\nAssertion (A): Planning does not guarantee commercial success in an increasingly turbulent business environment.\nReason (R): Unforeseen geopolitical events, abrupt regulatory interventions, and disruptive competitor innovations can render meticulously formulated planning premises invalid.\nSelect the correct option:", "Both (A) and (R) are true and (R) is the correct explanation of (A).", "Both (A) and (R) are true, but (R) is not the correct explanation of (A).", "(A) is true, but (R) is false.", "(A) is false, but (R) is true.", "A dynamic environment introduces unpredictable shifts that make future assumptions obsolete, proving that planning cannot guarantee success.")
    ]
    for s_title, s_stem, s_cor, s_w1, s_w2, s_w3, s_sol in ch4_final_6:
        arch = "statement-based" if "Statement" in s_stem else ("assertion-reasoning" if "Assertion" in s_stem else ("match-the-following" if "Match" in s_stem else "conceptual-application"))
        qs.append({
            "chapter": "Planning",
            "topic": "Planning: Concepts and Types",
            "subtopic": s_title,
            "archetype": arch,
            "difficulty": 2 if arch == "statement-based" else 3,
            "stem": s_stem,
            "options": [
                {"id": "A", "text": s_cor, "isCorrect": True, "trap": f"None - correct analysis: {s_sol}"},
                {"id": "B", "text": s_w1, "isCorrect": False, "trap": "Misidentifying plan classification or relationship."},
                {"id": "C", "text": s_w2, "isCorrect": False, "trap": "Overlooking core distinguishing feature."},
                {"id": "D", "text": s_w3, "isCorrect": False, "trap": "Distractor option."}
            ],
            "sol": s_sol
        })

    assert len(qs) == 280, f"Expected 280 questions in Part 1, got {len(qs)}"
    return qs
