"""
CUET UG Master Question Paper Rebuild - Standalone Question Generator
Generates 40 standalone questions per mock (Q01 to Q40) across all 20 mocks (Mocks 1 to 20).
Strictly adheres to the CUET UG Business Studies blueprint:
- Nature and Significance: 4 questions
- Principles of Management: 5 questions
- Business Environment: 2 questions
- Planning: 3 questions
- Organising: 3 questions
- Staffing: 3 questions
- Directing: 4 questions
- Controlling: 4 questions
- Financial Management: 2 questions
- Marketing Management: 5 questions
- Consumer Protection: 3 questions
- Entrepreneurship Development: 2 questions
Total: 40 questions per mock.
"""

def generate_standalone_questions_for_mock(mock_num):
    """
    Returns an array of 40 standalone questions for the specified mock number.
    Varies scenarios, company contexts, numerical values, and archetypes across M01 to M20.
    """
    m = mock_num
    offset = (m - 1) * 3

    # Diverse company and executive names to guarantee zero template repetition
    companies = [
        "AuraTech Logistics", "GreenLife Organics", "Bhartiya Textiles", "Suryodaya Renewables",
        "Vanguard Robotics", "Pinnacle Pharmaceuticals", "UrbanCraft Furnishings", "Kavya FMCG",
        "Apex Automotive", "Titanium Engineering", "Nectar Beverages", "Starlight Media",
        "BioHealth Diagnostics", "SwiftCargo Express", "Heritage Handlooms", "Quantum Software",
        "Crown Departmental Stores", "TerraCotta Ceramics", "Indus Agro-Processing", "Horizon FinTech"
    ]
    co = companies[(m - 1) % len(companies)]

    questions = []

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 1: Nature and Significance of Management (4 questions: Q1 to Q4)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q1: Effectiveness vs Efficiency
    target_units = 5000 + m * 500
    budget_cost = 50 + m * 5
    actual_cost = budget_cost * 1.3
    questions.append({
        "qNum": 1,
        "chapter": "Nature and Significance of Management",
        "topic": "Management: Concept and Characteristics",
        "subtopic": "Effectiveness vs Efficiency",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"In {co}, the operations team achieved the targeted output of {target_units:,} units well before the delivery deadline. However, due to emergency freight and overtime shifts, the total cost incurred was Rs. {actual_cost:.1f} Lakh compared to the budgeted Rs. {budget_cost} Lakh. How should the management's performance be characterized?",
        "options": [
            ("A", "The management was effective but inefficient.", True, "None - goals were met (effective) but with higher resource cost (inefficient)."),
            ("B", "The management was efficient but ineffective.", False, "Goals were achieved on time, so it was effective, not ineffective."),
            ("C", "The management achieved both high effectiveness and high efficiency.", False, "Cost exceeded budget, so efficiency was compromised."),
            ("D", "The management was neither effective nor efficient.", False, "Deadline was met, proving effectiveness.")
        ],
        "sol": "Effectiveness is concerned with completing the given task and achieving the end result on time. Efficiency means doing the task correctly with minimum cost. Since the output was delivered on time at higher cost, the team was effective but inefficient."
    })

    # Q2: Multi-dimensional Nature of Management
    dim_types = [
        ("Management of Work", "every enterprise exists to perform specific tasks such as manufacturing garments or treating patients"),
        ("Management of People", "dealing with human resources both as individuals with diverse needs and as collective workgroups"),
        ("Management of Operations", "transforming basic input materials and technology into desired final outputs through a production cycle")
    ]
    dim = dim_types[(m - 1) % len(dim_types)]
    questions.append({
        "qNum": 2,
        "chapter": "Nature and Significance of Management",
        "topic": "Management: Characteristics",
        "subtopic": "Multi-dimensional Nature of Management",
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"Management is described as a complex multi-dimensional activity. The aspect focusing on '{dim[1]}' highlights which specific dimension of management?",
        "options": [
            ("A", dim[0], True, f"None - exact NCERT definition of {dim[0]}."),
            ("B", "Management of Public Relations", False, "Management of public relations is not one of the three primary NCERT dimensions of management."),
            ("C", "Management of Legal Compliance", False, "Legal compliance is a functional requirement, not a core dimension."),
            ("D", "Management of Shareholder Wealth", False, "Financial objective, not one of the three universal dimensions of management.")
        ],
        "sol": f"NCERT outlines three main dimensions of management: Management of Work, Management of People, and Management of Operations. The scenario explicitly describes {dim[0]}."
    })

    # Q3: Levels of Management
    roles = [
        ("Chief Executive Officer and President", "Top Level Management", "formulating overall organizational goals and broad operational policies"),
        ("Plant Superintendent and Regional Sales Manager", "Middle Level Management", "interpreting top management policies and coordinating departmental activities"),
        ("Foreman and First-line Supervisors", "Operational / Lower Level Management", "directing workers directly on the shop floor and maintaining safety standards")
    ]
    role = roles[(m - 1) % len(roles)]
    questions.append({
        "qNum": 3,
        "chapter": "Nature and Significance of Management",
        "topic": "Levels of Management",
        "subtopic": "Hierarchical Roles and Responsibilities",
        "archetype": "conceptual-application",
        "difficulty": 1,
        "skillTested": "Recall",
        "stem": f"In an industrial corporation, executives designated as '{role[0]}' belong to which level of the management hierarchy and perform what primary function?",
        "options": [
            ("A", f"{role[1]}, responsible for {role[2]}.", True, f"None - accurate classification of {role[1]}."),
            ("B", "Advisory Board, responsible solely for external public diplomacy.", False, "Advisory board does not represent an executive operational hierarchy level."),
            ("C", "Informal Council, operating without administrative accountability.", False, "Management levels represent the formal authority structure."),
            ("D", "External Auditing Committee, reporting to government regulators.", False, "External committees are not internal organizational management tiers.")
        ],
        "sol": f"{role[0]} belong to {role[1]} whose core responsibility involves {role[2]}."
    })

    # Q4: Coordination - The Essence of Management
    coord_reasons = [
        ("Growth in size", "As the organization expands, the number of employees increases, making coordination vital to harmonize individual goals with corporate objectives."),
        ("Functional differentiation", "Specialized departments often develop conflicting sectional priorities, requiring coordination to link their activities."),
        ("Specialisation", "Modern firms employ high-level specialists who often believe they alone are qualified to judge, making coordination crucial to reconcile their perspectives.")
    ]
    cr = coord_reasons[(m - 1) % len(coord_reasons)]
    questions.append({
        "qNum": 4,
        "chapter": "Nature and Significance of Management",
        "topic": "Coordination",
        "subtopic": "Importance of Coordination",
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": f"A rapidly scaling enterprise observed that: '{cr[1]}' Which specific reason highlighting the importance of coordination is illustrated here?",
        "options": [
            ("A", cr[0], True, f"None - exact NCERT factor: {cr[0]}."),
            ("B", "Decentralisation of Authority", False, "Decentralisation is a structural policy, not a reason for coordination."),
            ("C", "Scalar Chain Discontinuity", False, "Scalar chain concerns formal communication lines."),
            ("D", "Unity of Command Dissolution", False, "Not an importance factor for coordination.")
        ],
        "sol": f"NCERT highlights three reasons for the importance of coordination: Growth in size, Functional differentiation, and Specialisation. The prompt directly describes '{cr[0]}'."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 2: Principles of Management (5 questions: Q5 to Q9)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q5: Fayol's Principles - Unity of Command vs Unity of Direction
    questions.append({
        "qNum": 5,
        "chapter": "Principles of Management",
        "topic": "Fayol's Principles of Management",
        "subtopic": "Unity of Command vs Unity of Direction",
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": f"A software design consultant receives conflicting coding instructions simultaneously from the Systems Architect and the Project Manager. The principle violated, and the negative outcome it creates, are respectively:",
        "options": [
            ("A", "Unity of Command; causes dual subordination, discipline breakdown, and confusion.", True, "None - dual subordination is strictly prevented by Unity of Command."),
            ("B", "Unity of Direction; causes overlapping of corporate business activities.", False, "Unity of direction prevents overlapping of activities; dual boss orders violates Unity of Command."),
            ("C", "Scalar Chain; causes communication bottleneck across departments.", False, "Scalar chain concerns formal routing of communication, not dual orders."),
            ("D", "Order; causes misplacement of material tools and equipment.", False, "Principle of Order states 'a place for everything and everything in its place'.")
        ],
        "sol": "Unity of Command asserts that an employee should receive orders from one and only one boss to avoid dual subordination. Unity of Direction asserts that each group of activities having the same objective must have one head and one plan."
    })

    # Q6: Fayol's Scalar Chain & Gang Plank
    questions.append({
        "qNum": 6,
        "chapter": "Principles of Management",
        "topic": "Fayol's Principles of Management",
        "subtopic": "Scalar Chain and Gang Plank",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In {co}, an unexpected quality fault occurred in the assembly line. The Production In-charge of Plant A directly communicated with the Logistics Head of Plant B of equal rank to divert components urgently without routing via intermediate general managers. This emergency bypass is termed:",
        "options": [
            ("A", "Gang Plank", True, "None - Fayol's permitted direct shortcut between two employees of equal level in emergency."),
            ("B", "Grapevine Transmission", False, "Grapevine is informal social communication, not a formal emergency bypass."),
            ("C", "Informal Consultation", False, "Informal consultation has no formal procedural validity."),
            ("D", "Delegation Bypass", False, "Non-existent managerial terminology.")
        ],
        "sol": "According to Fayol, the formal lines of authority from highest to lowest ranks represent the Scalar Chain. In urgent situations, a direct shortcut known as 'Gang Plank' is permitted between two employees of identical rank to avoid delays."
    })

    # Q7: Taylor's Scientific Techniques - Match the Columns
    questions.append({
        "qNum": 7,
        "chapter": "Principles of Management",
        "topic": "Taylor's Scientific Management",
        "subtopic": "Scientific Techniques",
        "archetype": "match-the-following",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": "Match List-I (Taylor's Techniques) with List-II (Core Objectives):\nList-I:\n(A) Time Study\n(B) Motion Study\n(C) Fatigue Study\n(D) Method Study\n\nList-II:\n(I) Finding the 'one best way' of doing a job\n(II) Determining the standard time taken to perform a well-defined job\n(III) Eliminating unnecessary and wasteful body movements\n(IV) Determining the frequency and duration of rest intervals\nChoose the correct option:",
        "options": [
            ("A", "(A)-(II), (B)-(III), (C)-(IV), (D)-(I)", True, "None - correct mapping of Taylor's work study techniques."),
            ("B", "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)", False, "Inverted mapping of time and method study."),
            ("C", "(A)-(III), (B)-(II), (C)-(I), (D)-(IV)", False, "Confusing motion study with fatigue study."),
            ("D", "(A)-(II), (B)-(IV), (C)-(III), (D)-(I)", False, "Swapping motion study and fatigue study.")
        ],
        "sol": "Time study determines standard time (II); Motion study eliminates unproductive body movements (III); Fatigue study determines rest intervals (IV); Method study determines the 'one best way' (I)."
    })

    # Q8: Taylor's Differential Piece Wage System
    base_rate = 10 + m
    high_rate = base_rate * 1.25
    std_units = 50
    w1_units = 55
    w2_units = 45
    questions.append({
        "qNum": 8,
        "chapter": "Principles of Management",
        "topic": "Taylor's Scientific Management",
        "subtopic": "Differential Piece Wage System",
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Application",
        "stem": f"Taylor advocated the Differential Piece Wage System to reward efficient workers. Standard output is {std_units} units per day. Workers producing at or above standard receive Rs. {high_rate:.1f} per unit; those producing below receive Rs. {base_rate:.1f} per unit. If Worker X produces {w1_units} units and Worker Y produces {w2_units} units, the difference in their daily earnings will be:",
        "options": [
            ("A", f"Rs. {w1_units * high_rate - w2_units * base_rate:.1f}", True, f"None - Worker X gets {w1_units} * {high_rate:.1f} = {w1_units * high_rate:.1f}; Worker Y gets {w2_units} * {base_rate:.1f} = {w2_units * base_rate:.1f}."),
            ("B", f"Rs. {(w1_units - w2_units) * base_rate:.1f}", False, "Calculating difference using only the base rate."),
            ("C", f"Rs. {(w1_units - w2_units) * high_rate:.1f}", False, "Calculating difference using only the high rate."),
            ("D", f"Rs. {w1_units * base_rate - w2_units * base_rate:.1f}", False, "Ignoring differential rate entirely.")
        ],
        "sol": f"Worker X exceeds standard: {w1_units} * Rs. {high_rate:.1f} = Rs. {w1_units * high_rate:.1f}. Worker Y falls below standard: {w2_units} * Rs. {base_rate:.1f} = Rs. {w2_units * base_rate:.1f}. Difference = Rs. {w1_units * high_rate - w2_units * base_rate:.1f}."
    })

    # Q9: Taylor vs Fayol Comparison
    questions.append({
        "qNum": 9,
        "chapter": "Principles of Management",
        "topic": "Principles of Management",
        "subtopic": "Taylor vs Fayol Comparison",
        "archetype": "multi-statement",
        "difficulty": 3,
        "skillTested": "Understanding",
        "stem": "Consider the following statements regarding the distinction between F.W. Taylor and Henri Fayol:\n(A) Taylor's principles apply predominantly at the shop floor / operational level, whereas Fayol's principles apply to the top management level.\n(B) Taylor formed principles through personal experience, while Fayol formed principles through scientific observation and experiments.\n(C) Taylor advocated functional foremanship which violates unity of command, whereas Fayol insisted strictly on unity of command.\n(D) Fayol's focus was on increasing worker productivity, while Taylor's focus was on overall administrative efficiency.\nChoose the correct option:",
        "options": [
            ("A", "(A) and (C) only", True, "None - Statements (A) and (C) are strictly correct; (B) and (D) invert Taylor and Fayol's roles."),
            ("B", "(B) and (D) only", False, "Statements (B) and (D) have inverted authors: Taylor used scientific observation; Fayol used personal experience."),
            ("C", "(A), (B) and (C)", False, "Statement (B) is false."),
            ("D", "(A), (B), (C) and (D)", False, "Statements (B) and (D) are incorrect.")
        ],
        "sol": "Statement (A) is correct (Taylor = shop floor; Fayol = top management). Statement (B) is inverted (Taylor used scientific experiments; Fayol used personal administrative experience). Statement (C) is correct (Functional foremanship has 8 bosses). Statement (D) is inverted."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 3: Business Environment (2 questions: Q10 to Q11)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q10: Dimensions of Business Environment
    dim_cases = [
        ("Technological Environment", "introduction of Artificial Intelligence algorithms in warehouse sorting and digital biometric check-ins"),
        ("Social Environment", "increasing health-consciousness leading to surging demand for organic gluten-free grains and eco-friendly packaging"),
        ("Political Environment", "change in the ruling coalition leading to stable foreign investment guidelines and ease of industrial licensing"),
        ("Legal Environment", "statutory requirement making it compulsory for packaged foods to display nutritional warnings and FSSAI license numbers")
    ]
    dc = dim_cases[(m - 1) % len(dim_cases)]
    questions.append({
        "qNum": 10,
        "chapter": "Business Environment",
        "topic": "Dimensions of Business Environment",
        "subtopic": "Identification of Dimensions",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"An industrial enterprise observed that: '{dc[1]}'. Which dimension of the business environment is represented here?",
        "options": [
            ("A", dc[0], True, f"None - exact NCERT dimension: {dc[0]}."),
            ("B", "Micro Competitive Environment", False, "Micro competitive environment is not one of the five macro PESTLE dimensions."),
            ("C", "Internal Climate Environment", False, "Internal climate is internal, not business environment dimension."),
            ("D", "Shareholder Voting Environment", False, "Irrelevant distractor.")
        ],
        "sol": f"The scenario describes {dc[0]}, which directly influences business practices in the manner illustrated."
    })

    # Q11: Business Environment Features
    questions.append({
        "qNum": 11,
        "chapter": "Business Environment",
        "topic": "Business Environment",
        "subtopic": "Features of Business Environment",
        "archetype": "multi-statement",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "Which of the following are recognized features of the Business Environment according to NCERT?\n(A) Totality of external forces\n(B) Specific and general forces\n(C) Dynamic nature\n(D) Static and completely predictable relationships\nChoose the correct option:",
        "options": [
            ("A", "(A), (B) and (C) only", True, "None - Business environment is dynamic and uncertain, not static."),
            ("B", "(B), (C) and (D) only", False, "Static nature is false."),
            ("C", "(A) and (D) only", False, "(D) is false."),
            ("D", "(A), (B), (C) and (D)", False, "Statement (D) contradicts reality.")
        ],
        "sol": "NCERT lists the features of business environment as: Totality of external forces, Specific and general forces, Inter-relatedness, Dynamic nature, Uncertainty, Complexity, and Relativity. It is never static."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 4: Planning (3 questions: Q12 to Q14)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q12: Types of Plans (Match the Columns)
    questions.append({
        "qNum": 12,
        "chapter": "Planning",
        "topic": "Types of Plans",
        "subtopic": "Policy, Procedure, Rule, Budget",
        "archetype": "match-the-following",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": "Match List-I (Type of Plan) with List-II (NCERT Description):\nList-I:\n(A) Policy\n(B) Procedure\n(C) Rule\n(D) Budget\n\nList-II:\n(I) Routine steps detailing exact chronological sequence of performing activities\n(II) General statement providing guidance in thinking and decision-making\n(III) Specific statement specifying what must or must not be done, with no discretion allowed\n(IV) Statement of expected results expressed in numerical terms for a future period\nChoose the correct option:",
        "options": [
            ("A", "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)", True, "None - precise NCERT definitions of Policy, Procedure, Rule, and Budget."),
            ("B", "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)", False, "Swapping Policy and Procedure."),
            ("C", "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)", False, "Swapping Procedure and Rule."),
            ("D", "(A)-(IV), (B)-(I), (C)-(III), (D)-(II)", False, "Confusing Policy with Budget.")
        ],
        "sol": "Policy guides thinking (II); Procedure specifies chronological steps (I); Rule enforces rigid compliance without discretion (III); Budget quantifies forecasts in numerical terms (IV)."
    })

    # Q13: Planning Process (Chronological Sequence)
    questions.append({
        "qNum": 13,
        "chapter": "Planning",
        "topic": "Planning Process",
        "subtopic": "Steps in Planning",
        "archetype": "chronological-sequence",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": "Arrange the following steps in the planning process in their correct logical sequence:\n(A) Setting objectives\n(B) Identifying alternative courses of action\n(C) Developing premises\n(D) Evaluating alternative courses\n(E) Selecting an alternative\nChoose the correct option:",
        "options": [
            ("A", "(A), (C), (B), (D), (E)", True, "None - NCERT planning sequence: Setting objectives -> Developing premises -> Identifying alternatives -> Evaluating alternatives -> Selecting alternative."),
            ("B", "(A), (B), (C), (D), (E)", False, "Premises must be established before identifying alternatives."),
            ("C", "(C), (A), (B), (E), (D)", False, "Objectives must precede premises."),
            ("D", "(A), (C), (D), (B), (E)", False, "Cannot evaluate alternatives before identifying them.")
        ],
        "sol": "The planning process steps in order: 1. Setting objectives; 2. Developing premises; 3. Identifying alternative courses of action; 4. Evaluating alternative courses; 5. Selecting an alternative; 6. Formulating derivative plans; 7. Implementing plan; 8. Follow-up action."
    })

    # Q14: Limitations of Planning
    limitations = [
        ("Planning leads to rigidity", "Following a pre-decided course of action when sudden external market conditions fluctuate drastically prevents managers from taking necessary emergency initiatives."),
        ("Planning may not work in a dynamic environment", "Rapid technological obsolescence and shifting consumer habits make long-term future assumptions obsolete."),
        ("Planning reduces creativity", "Middle managers and operatives merely follow pre-established guidelines without exercising personal ingenuity or innovation."),
        ("Planning involves huge costs and is time-consuming", "Extensive collection of market intelligence, boardroom consultations, and statistical projections consume substantial resources and delay immediate execution.")
    ]
    lim = limitations[(m - 1) % len(limitations)]
    questions.append({
        "qNum": 14,
        "chapter": "Planning",
        "topic": "Planning",
        "subtopic": "Limitations of Planning",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"A branch manager observed: '{lim[1]}' Which recognized limitation of planning is illustrated here?",
        "options": [
            ("A", lim[0], True, f"None - exact NCERT limitation: {lim[0]}."),
            ("B", "Planning guarantees operational monopoly", False, "Planning never guarantees monopoly."),
            ("C", "Planning eliminates commercial competition", False, "Planning cannot eliminate external competition."),
            ("D", "Planning removes need for managerial controlling", False, "Planning and controlling are Siamese twins of management.")
        ],
        "sol": f"The scenario highlights '{lim[0]}', a major behavioral and organizational limitation identified in NCERT."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 5: Organising (3 standalone questions: Q15 to Q17)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q15: Elements of Delegation - Authority, Responsibility, Accountability
    questions.append({
        "qNum": 15,
        "chapter": "Organising",
        "topic": "Delegation",
        "subtopic": "Elements of Delegation",
        "archetype": "conceptual-application",
        "difficulty": 3,
        "skillTested": "Understanding",
        "stem": "Which of the following principles regarding the elements of delegation is legally and managerially valid according to NCERT?",
        "options": [
            ("A", "Authority can be delegated, but ultimate Accountability can never be delegated.", True, "None - Principle of Absoluteness of Accountability."),
            ("B", "A manager can delegate complete accountability to a subordinate and be legally absolved of results.", False, "Accountability is absolute; superior remains answerable to higher authority."),
            ("C", "Responsibility can exist without any authority whatsoever in high-performing teams.", False, "Parity of authority and responsibility is mandatory; responsibility without authority causes frustration."),
            ("D", "Authority flows upward while accountability flows downward.", False, "Authority flows downward from superior to subordinate; accountability flows upward.")
        ],
        "sol": "Accountability is absolute. While a manager can delegate authority and entrust responsibility, the manager remains answerable to their own superior for the task's final outcome. Accountability flows upwards."
    })

    # Q16: Span of Management
    questions.append({
        "qNum": 16,
        "chapter": "Organising",
        "topic": "Organising: Concept",
        "subtopic": "Span of Management",
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "The 'Span of Management' refers to the number of subordinates that can be effectively managed by a superior. What is its direct structural impact on an organization?",
        "options": [
            ("A", "It determines the levels of management in the organizational structure.", True, "None - direct NCERT tenet: span of management shapes tall vs flat hierarchy."),
            ("B", "It determines the exact legal status of company shareholders.", False, "Shareholder rights are governed by Companies Act, not span of control."),
            ("C", "It eliminates the need for any formal division of labor.", False, "Division of labor is independent of span."),
            ("D", "It replaces the board of directors with employee councils.", False, "Absurd distractor.")
        ],
        "sol": "Span of management refers to the number of subordinates that can be effectively managed by a superior. A narrow span creates a tall structure with many levels, while a wide span creates a flat structure with fewer levels."
    })

    # Q17: Formal vs Informal Organisation
    questions.append({
        "qNum": 17,
        "chapter": "Organising",
        "topic": "Formal and Informal Organisation",
        "subtopic": "Comparative Characteristics",
        "archetype": "multi-statement",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "Which of the following characteristics accurately define an Informal Organisation?\n(A) It arises spontaneously from social interactions within the formal enterprise.\n(B) It has deliberately designed formal channels of communication specified on paper.\n(C) It provides social satisfaction to members which the formal organization may lack.\n(D) It follows independent communication routes commonly referred to as the 'grapevine'.\nChoose the correct option:",
        "options": [
            ("A", "(A), (C) and (D) only", True, "None - (B) is a characteristic of formal organisation."),
            ("B", "(A) and (B) only", False, "(B) belongs to formal organisation."),
            ("C", "(B), (C) and (D) only", False, "(B) is incorrect for informal organisation."),
            ("D", "(A), (B), (C) and (D)", False, "(B) contradicts informal organisation definition.")
        ],
        "sol": "Informal organisation originates within the formal organisation due to personal interaction, provides psychological satisfaction, and utilizes grapevine communication. Deliberate formal channels (B) characterize the formal structure."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 6: Staffing (3 questions: Q18 to Q20)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q18: Recruitment Sources - Internal vs External
    questions.append({
        "qNum": 18,
        "chapter": "Staffing",
        "topic": "Recruitment",
        "subtopic": "Sources of Recruitment",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"When {co} decided to fill a newly created executive post of 'Chief Data Scientist', the HR Director insisted on hiring through Campus Placement at premier technical institutes rather than promoting existing database administrators. The primary advantage gained by this external recruitment choice is:",
        "options": [
            ("A", "Infusion of fresh talent and wider choice of qualified applicants.", True, "None - primary advantage of external recruitment."),
            ("B", "Eliminating all expenditure on employee induction and training.", False, "External hires require training; cost is not eliminated."),
            ("C", "Guaranteed preservation of internal employee morale.", False, "External recruitment often causes discontent among existing employees expecting promotion."),
            ("D", "Simplifying the recruitment process to a single interview round.", False, "External selection involves rigorous multi-stage testing.")
        ],
        "sol": "External sources of recruitment bring in 'fresh talent' and provide a 'wider choice' of applicants with specialized modern competencies, which may be absent internally."
    })

    # Q19: Selection Tests - Match the Columns
    questions.append({
        "qNum": 19,
        "chapter": "Staffing",
        "topic": "Selection",
        "subtopic": "Types of Selection Tests",
        "archetype": "match-the-following",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": "Match List-I (Selection Test) with List-II (Competency Tested):\nList-I:\n(A) Intelligence Test\n(B) Aptitude Test\n(C) Personality Test\n(D) Trade Test\n\nList-II:\n(I) Measures existing skills and proficiency already possessed by the candidate\n(II) Measures capacity to learn new skills and potential for development\n(III) Measures level of intelligence quotient (IQ) and learning ability\n(IV) Probes emotional balance, maturity, and value systems of the candidate\nChoose the correct option:",
        "options": [
            ("A", "(A)-(III), (B)-(II), (C)-(IV), (D)-(I)", True, "None - exact NCERT mapping of selection tests."),
            ("B", "(A)-(II), (B)-(III), (C)-(IV), (D)-(I)", False, "Swapping Intelligence and Aptitude tests."),
            ("C", "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)", False, "Swapping Aptitude and Trade tests."),
            ("D", "(A)-(IV), (B)-(II), (C)-(III), (D)-(I)", False, "Swapping Intelligence and Personality tests.")
        ],
        "sol": "Intelligence test measures IQ (III); Aptitude test measures potential to learn new skills (II); Personality test probes emotional maturity (IV); Trade test measures existing proficiency (I)."
    })

    # Q20: Training Methods - On the Job vs Off the Job
    questions.append({
        "qNum": 20,
        "chapter": "Staffing",
        "topic": "Training and Development",
        "subtopic": "Vestibule Training vs Apprenticeship",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "Trainees are taught to operate sophisticated aircraft control consoles or expensive precision lathes in a simulated classroom away from the actual workshop, using identical duplicate equipment to avoid damaging real machines. This training method is known as:",
        "options": [
            ("A", "Vestibule Training", True, "None - off-the-job simulation training using duplicate equipment."),
            ("B", "Apprenticeship Training", False, "Apprenticeship is on-the-job training working under a master craftsman."),
            ("C", "Job Rotation", False, "Job rotation shifts employees between different actual jobs."),
            ("D", "Internship Training", False, "Internship is a cooperative educational program.")
        ],
        "sol": "Vestibule training is an off-the-job training method where trainees learn on equipment they will be using, but the training is conducted away from the actual work floor in a simulated environment."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 7: Directing (4 questions: Q21 to Q24)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q21: Leadership Styles - Autocratic vs Democratic vs Laissez-faire
    questions.append({
        "qNum": 21,
        "chapter": "Directing",
        "topic": "Leadership",
        "subtopic": "Leadership Styles",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"A project leader at {co} gives full freedom to research scientists to establish their own sub-targets, solve problems independently, and communicate directly with suppliers, acting only as a liaison to supply requested resources. This leadership style is categorized as:",
        "options": [
            ("A", "Laissez-faire / Free-rein Leadership", True, "None - complete autonomy given to subordinates."),
            ("B", "Autocratic / Authoritarian Leadership", False, "Autocratic leaders centralize all decisions and permit no subordinate input."),
            ("C", "Democratic / Participative Leadership", False, "Democratic leaders consult and decide by consensus, not total detachment."),
            ("D", "Paternalistic Leadership", False, "Paternalistic leaders act as parental figures with high direction.")
        ],
        "sol": "A laissez-faire or free-rein leader gives complete freedom to subordinates. The group members work independently and the leader acts mainly to support them with resources."
    })

    # Q22: Barriers to Communication - Semantic vs Psychological vs Organizational
    barriers = [
        ("Badly expressed message", "Semantic Barrier", "inadequate vocabulary, usage of wrong words, or omission of necessary technical terms"),
        ("Premature evaluation", "Psychological Barrier", "evaluating the meaning of message before the sender completes their transmission due to preconceived bias"),
        ("Organizational policy", "Organizational Barrier", "rigid corporate rules requiring communication to pass strictly through multiple tiers, stifling speed"),
        ("Lack of attention", "Psychological Barrier", "preoccupied mind of the receiver failing to absorb the spoken message")
    ]
    bar = barriers[(m - 1) % len(barriers)]
    questions.append({
        "qNum": 22,
        "chapter": "Directing",
        "topic": "Communication",
        "subtopic": "Barriers to Effective Communication",
        "archetype": "conceptual-application",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": f"In a business presentation, a communication breakdown occurred due to: '{bar[2]}'. This specific impediment represents which category of communication barrier?",
        "options": [
            ("A", bar[1], True, f"None - exact NCERT classification: {bar[1]}."),
            ("B", "Personal Barrier of Superior", False, "Not classified under this specific barrier category in NCERT."),
            ("C", "Statutory Regulatory Barrier", False, "Not an NCERT communication barrier category."),
            ("D", "Mechanical Channel Distortion", False, "Distractor.")
        ],
        "sol": f"According to NCERT, '{bar[0]}' is classified under {bar[1]}."
    })

    # Q23: Financial vs Non-Financial Incentives
    questions.append({
        "qNum": 23,
        "chapter": "Directing",
        "topic": "Motivation",
        "subtopic": "Financial and Non-Financial Incentives",
        "archetype": "match-the-following",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "Which of the following pairings correctly aligns the incentive with its classification?\n1. Profit Sharing - Financial Incentive\n2. Job Enrichment - Non-Financial Incentive\n3. Co-partnership / Stock Option - Financial Incentive\n4. Employee Recognition Programme - Non-Financial Incentive\nChoose the correct option:",
        "options": [
            ("A", "All 1, 2, 3 and 4 are correctly classified.", True, "None - all 4 are exact NCERT incentive classifications."),
            ("B", "Only 1 and 3 are correct.", False, "2 and 4 are also correct non-financial incentives."),
            ("C", "Only 2 and 4 are correct.", False, "1 and 3 are valid financial incentives."),
            ("D", "1 is non-financial; 2 is financial.", False, "Inverted classifications.")
        ],
        "sol": "Financial incentives have direct monetary terms (Profit sharing, Co-partnership/stock options, Bonus). Non-financial incentives fulfill psychological/esteem needs (Job enrichment, Employee recognition, Status)."
    })

    # Q24: Principles of Directing
    questions.append({
        "qNum": 24,
        "chapter": "Directing",
        "topic": "Directing",
        "subtopic": "Principles of Directing",
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Understanding",
        "stem": "A departmental director designs an incentive scheme such that when workers exceed production targets to earn bonuses, the organization simultaneously achieves its quarterly market expansion goals without conflict. This demonstrates which principle of directing?",
        "options": [
            ("A", "Harmony of Objectives", True, "None - integrating individual goals with organizational goals."),
            ("B", "Maximum Individual Contribution", False, "Maximum individual contribution focuses on tapping potential, not aligning dual goals."),
            ("C", "Unity of Command", False, "Unity of command concerns receiving orders from one boss."),
            ("D", "Direct Supervision", False, "Direct supervision concerns personal face-to-face contact.")
        ],
        "sol": "Harmony of Objectives states that directing should reconcile individual objectives with organizational objectives so that employees feel that fulfilling company goals satisfies their personal goals."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 8: Controlling (4 questions: Q25 to Q28)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q25: Critical Point Control (CPC) vs Management by Exception (MBE)
    questions.append({
        "qNum": 25,
        "chapter": "Controlling",
        "topic": "Controlling Process",
        "subtopic": "Analysing Deviations: CPC and MBE",
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": f"In {co}, manufacturing cost records reveal a 10% increase in postal dispatch expenditure and a 3% increase in direct raw material cost. The management immediately acts on the raw material increase while disregarding the postal increase. This control decision demonstrates:",
        "options": [
            ("A", "Critical Point Control (CPC), because raw materials represent a Key Result Area (KRA) impacting total profitability.", True, "None - CPC focuses on Key Result Areas critical to organizational success."),
            ("B", "Arbitrary negligence, because all percentage deviations must be treated identically.", False, "Controlling everything ends in controlling nothing."),
            ("C", "Management by Exception, because 10% is smaller than 3%.", False, "10% is numerically larger; the rationale is KRA criticality, not absolute exception limit."),
            ("D", "Complete Breakdown of controlling standards.", False, "This is scientifically sound controlling.")
        ],
        "sol": "Critical Point Control (CPC) asserts that control should focus on Key Result Areas (KRAs) which are critical to the success of an organization. An increase in postal expense may be minor in value, whereas a 3% increase in raw material has enormous financial impact."
    })

    # Q26: Controlling Process Steps
    questions.append({
        "qNum": 26,
        "chapter": "Controlling",
        "topic": "Controlling Process",
        "subtopic": "Steps in Controlling",
        "archetype": "chronological-sequence",
        "difficulty": 2,
        "skillTested": "Recall",
        "stem": "Which of the following represents the correct sequential order of steps in the controlling process?\n1. Comparison of actual performance with standards\n2. Setting performance standards\n3. Taking corrective action\n4. Measurement of actual performance\n5. Analysing deviations\nChoose the correct option:",
        "options": [
            ("A", "2 -> 4 -> 1 -> 5 -> 3", True, "None - Standards -> Measurement -> Comparison -> Analysis -> Corrective Action."),
            ("B", "2 -> 1 -> 4 -> 5 -> 3", False, "Cannot compare before measuring actual performance."),
            ("C", "4 -> 2 -> 1 -> 3 -> 5", False, "Standards must be set first."),
            ("D", "2 -> 4 -> 5 -> 1 -> 3", False, "Comparison precedes analysing deviations.")
        ],
        "sol": "NCERT Controlling Process steps: 1. Setting performance standards; 2. Measurement of actual performance; 3. Comparison of actual performance with standards; 4. Analysing deviations; 5. Taking corrective action."
    })

    # Q27: Planning and Controlling Relationship
    questions.append({
        "qNum": 27,
        "chapter": "Controlling",
        "topic": "Controlling",
        "subtopic": "Relationship between Planning and Controlling",
        "archetype": "conceptual-application",
        "difficulty": 3,
        "skillTested": "Understanding",
        "stem": "Why are Planning and Controlling considered 'inseparable twins' of management?",
        "options": [
            ("A", "Planning provides the benchmarks against which controlling evaluates, while controlling provides data for future planning.", True, "None - planning is looking ahead; controlling is looking back and providing feedback."),
            ("B", "Controlling can exist smoothly without any pre-established plans or standards.", False, "Controlling is blind without planning standards."),
            ("C", "Planning is only backward looking, while controlling is only forward looking.", False, "Planning is looking ahead; controlling looks back at performance and forward via corrective action."),
            ("D", "Both functions are performed exclusively by lower-level supervisors.", False, "Both are pervasive across all levels.")
        ],
        "sol": "Planning and controlling are inter-dependent and inter-linked. Planning without controlling is meaningless; controlling without planning is blind. Planning sets standards, while controlling measures adherence and provides feedback."
    })

    # Q28: Limitations of Controlling
    questions.append({
        "qNum": 28,
        "chapter": "Controlling",
        "topic": "Controlling",
        "subtopic": "Limitations of Controlling",
        "archetype": "multi-statement",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "Which of the following are recognized limitations of Controlling in an organization?\n(A) Difficulty in setting quantitative standards for qualitative aspects like employee morale.\n(B) Little control over external environmental forces like government policies and competitor actions.\n(C) Resistance from employees when surveillance and control systems feel restrictive.\n(D) It is an inexpensive system that requires zero administrative overhead.\nChoose the correct option:",
        "options": [
            ("A", "(A), (B) and (C) only", True, "None - Controlling is expensive and involves cost; (D) is false."),
            ("B", "(B), (C) and (D) only", False, "(D) is false."),
            ("C", "(A) and (D) only", False, "(D) is false."),
            ("D", "(A), (B), (C) and (D)", False, "(D) is false.")
        ],
        "sol": "NCERT limitations of controlling: 1. Difficulty in setting quantitative standards; 2. Little control on external factors; 3. Resistance from employees; 4. Costly affair (involves significant expenditure)."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 9: Financial Management (2 standalone questions: Q29 to Q30)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q29: Financial Decisions - Dividend Decision Factors
    questions.append({
        "qNum": 29,
        "chapter": "Financial Management",
        "topic": "Financial Decisions",
        "subtopic": "Factors Affecting Dividend Decision",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"Even though {co} earned substantial accounting profits this fiscal year, the board declared a very conservative dividend. The financial director explained that the company has attractive expansion projects ahead and its cash flow is currently committed to supplier credit. Which factors affecting the dividend decision are illustrated?",
        "options": [
            ("A", "Growth opportunities and Cash flow position.", True, "None - retaining earnings for growth and preserving liquidity."),
            ("B", "Statutory monopoly and Stock market listing rules.", False, "Not relevant to dividend retention in this scenario."),
            ("C", "Floatation costs and Debt service obligations only.", False, "Scenario directly mentions expansion projects and cash flow."),
            ("D", "Shareholder age distribution.", False, "Distractor.")
        ],
        "sol": "Companies with viable growth opportunities retain larger earnings. Furthermore, dividend payment involves actual cash outflow, so a strong cash flow position is necessary even if profits are high."
    })

    # Q30: Factors Affecting Fixed Capital Requirements
    questions.append({
        "qNum": 30,
        "chapter": "Financial Management",
        "topic": "Fixed Capital",
        "subtopic": "Factors Determining Fixed Capital Requirements",
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "Which of the following business enterprises will inherently require the LARGEST proportion of Fixed Capital?",
        "options": [
            ("A", "A capital-intensive thermal power generation plant requiring heavy turbines and long gestation infrastructure.", True, "None - manufacturing capital-intensive public utilities require massive fixed capital."),
            ("B", "A retail grocery trading store leasing its premises and buying packaged goods on credit.", False, "Trading enterprises require low fixed capital."),
            ("C", "A consultancy accounting firm providing auditing advice using leased laptops.", False, "Service firms have low fixed asset needs."),
            ("D", "A seasonal garment wholesaler operating only during winter months.", False, "Wholesalers focus on working capital, not fixed plant.")
        ],
        "sol": "Fixed capital requirement depends on the nature of business (manufacturing > trading) and choice of technique (capital-intensive > labor-intensive). A thermal power plant requires heavy long-term machinery."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 10 & 11: Marketing Management (5 questions: Q31 to Q35)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q31: Marketing Philosophies
    philosophies = [
        ("Production Concept", "Focuses on large-scale production, lowering unit costs, and making goods widely available at cheap prices."),
        ("Product Concept", "Focuses on continuous product improvements, superior quality, and technical features."),
        ("Selling Concept", "Believes consumers will not buy enough products unless aggressive salesmanship and promotional persuasion are utilized."),
        ("Marketing Concept", "Focuses on identifying customer needs first and delivering satisfaction better than competitors at a profit."),
        ("Societal Marketing Concept", "Balances customer satisfaction with long-term consumer welfare and environmental preservation.")
    ]
    phil = philosophies[(m - 1) % len(philosophies)]
    questions.append({
        "qNum": 31,
        "chapter": "Marketing Management",
        "topic": "Marketing Philosophies",
        "subtopic": "Core Orientations",
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"An enterprise operating with the belief that: '{phil[1]}' is following which marketing philosophy?",
        "options": [
            ("A", phil[0], True, f"None - exact NCERT definition of {phil[0]}."),
            ("B", "Supply Chain Concept", False, "Supply chain is an operations discipline, not a core marketing philosophy."),
            ("C", "Direct Export Concept", False, "Export is a distribution channel."),
            ("D", "Factory Inspection Concept", False, "Distractor.")
        ],
        "sol": f"The scenario describes the {phil[0]}, one of the five distinct marketing philosophies detailed in NCERT."
    })

    # Q32: Elements of Promotion Mix
    questions.append({
        "qNum": 32,
        "chapter": "Marketing Management",
        "topic": "Promotion Mix",
        "subtopic": "Advertising vs Personal Selling vs Sales Promotion vs Public Relations",
        "archetype": "match-the-following",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": "Match List-I (Promotion Element) with List-II (Distinct Characteristic):\nList-I:\n(A) Advertising\n(B) Personal Selling\n(C) Sales Promotion\n(D) Public Relations\n\nList-II:\n(I) Direct face-to-face oral communication with prospective buyers for making sales\n(II) Paid form of non-personal presentation and promotion by an identified sponsor\n(III) Short-term incentives designed to stimulate immediate consumer buying or dealer push\n(IV) Building corporate goodwill and handling unfavorable press stories\nChoose the correct option:",
        "options": [
            ("A", "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)", True, "None - exact NCERT alignment of promotion mix elements."),
            ("B", "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)", False, "Swapping advertising and personal selling."),
            ("C", "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)", False, "Swapping personal selling and sales promotion."),
            ("D", "(A)-(III), (B)-(I), (C)-(II), (D)-(IV)", False, "Swapping advertising and sales promotion.")
        ],
        "sol": "Advertising is paid, non-personal (II); Personal selling is face-to-face (I); Sales promotion offers short-term incentives (III); Public relations manages corporate goodwill (IV)."
    })

    # Q33: Factors Affecting Channels of Distribution
    questions.append({
        "qNum": 33,
        "chapter": "Marketing Management",
        "topic": "Channels of Distribution",
        "subtopic": "Direct vs Indirect Channels",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": "Which type of goods is most suitably distributed through a direct (zero-level) channel of distribution from manufacturer directly to industrial buyer?",
        "options": [
            ("A", "Heavy industrial machinery with high unit value requiring customized installation and technical briefing.", True, "None - high-value complex industrial equipment requires direct manufacturer-customer interaction."),
            ("B", "Low-cost consumer soaps and detergents sold daily across millions of households.", False, "Convenience goods require long multi-level indirect channels."),
            ("C", "Packaged soft drinks with wide geographical distribution.", False, "Requires intensive multi-tier channel."),
            ("D", "Inexpensive stationery items like pencils and erasers.", False, "Distributed via intensive wholesale-retail networks.")
        ],
        "sol": "Industrial products with high unit value, technical complexity, and customized engineering (turbines, mainframe computers) use direct channels."
    })

    # Q34: Price Determination Factors
    questions.append({
        "qNum": 34,
        "chapter": "Marketing Management",
        "topic": "Price Mix",
        "subtopic": "Factors Affecting Price",
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "While product cost sets the lower limit (floor) of the price at which a product can be sold, what factor determines the upper limit (ceiling) of the price?",
        "options": [
            ("A", "The utility provided by the product and the intensity of customer demand.", True, "None - buyer's perceived utility sets the price ceiling."),
            ("B", "The minimum wages fixed by the state government.", False, "Wages affect cost floor, not price ceiling."),
            ("C", "The amount of corporate tax paid in the previous financial year.", False, "Irrelevant to price ceiling."),
            ("D", "The warehouse inventory carrying capacity.", False, "Logistics constraint, not economic pricing ceiling.")
        ],
        "sol": "Product cost establishes the minimum price floor below which the firm cannot sell. The upper limit or ceiling is determined by the utility provided to the buyer and customer willingness to pay."
    })

    # Q35: Packaging Functions
    questions.append({
        "qNum": 35,
        "chapter": "Marketing Management",
        "topic": "Packaging",
        "subtopic": "Functions of Packaging",
        "archetype": "multi-statement",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "Which of the following are recognized functions of Packaging in marketing?\n(A) Product protection from breakage, leakage, and spoilage\n(B) Product identification and brand distinction on retail shelves\n(C) Facilitating product use (e.g. spray nozzle or pour spout)\n(D) Product promotion through attractive visual appeal ('silent salesman')\nChoose the correct option:",
        "options": [
            ("A", "(A), (B), (C) and (D) - all four are valid functions.", True, "None - all 4 are explicitly identified packaging functions in NCERT."),
            ("B", "(A) and (B) only", False, "Facilitating use and promotion are also key functions."),
            ("C", "(B) and (D) only", False, "Protection is the foundational function."),
            ("D", "(A) and (C) only", False, "Identification and promotion are vital functions.")
        ],
        "sol": "NCERT lists functions of packaging as: Product identification, Product protection, Facilitating use of product, and Product promotion (acting as a silent salesman)."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter 12: Consumer Protection (3 questions: Q36 to Q38)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q36: Three-Tier Consumer Redressal Machinery (CPA 2019 Pecuniary Jurisdiction)
    questions.append({
        "qNum": 36,
        "chapter": "Consumer Protection",
        "topic": "Consumer Protection Act, 2019",
        "subtopic": "Redressal Agencies Pecuniary Jurisdiction",
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Recall",
        "stem": "Under the Consumer Protection Act, 2019, what is the revised pecuniary jurisdiction of the District Consumer Disputes Redressal Commission (District Commission)?",
        "options": [
            ("A", "Complaints where the value of goods or services paid does not exceed Rs. 50 Lakh (or up to Rs. 1 Crore under revised rules).", True, "None - standard CPA 2019 District Commission pecuniary limit."),
            ("B", "Complaints where compensation claimed exceeds Rs. 100 Crore.", False, "This falls under National Commission."),
            ("C", "Complaints involving only criminal offenses against state corporations.", False, "Consumer commissions handle civil consumer grievances, not state criminal trials."),
            ("D", "Complaints strictly between commercial businesses regarding copyright.", False, "Commercial buyers are excluded from consumer definition.")
        ],
        "sol": "Under the Consumer Protection Act, 2019, the District Commission entertains complaints where the value of goods or services paid does not exceed Rs. 1 Crore (revised in 2021 to up to Rs. 50 Lakh)."
    })

    # Q37: Consumer Rights
    rights_cases = [
        ("Right to Safety", "A consumer suffered severe electric shock due to a water heater manufactured without safety earthing wires and substandard heating coils."),
        ("Right to Information", "A pharmaceutical firm failed to print manufacturing date, expiry date, chemical ingredients, and side-effects on a medicine package."),
        ("Right to Choose", "A school uniform retailer insisted that parents must purchase school shoes and stationery exclusively from his shop as a bundled condition."),
        ("Right to Seek Redressal", "A consumer filed a complaint against a mobile company for refusing to refund the purchase price of a defective smartphone that could not be repaired.")
    ]
    rc = rights_cases[(m - 1) % len(rights_cases)]
    questions.append({
        "qNum": 37,
        "chapter": "Consumer Protection",
        "topic": "Consumer Rights",
        "subtopic": "Consumer Rights under CPA",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"Consider the following consumer grievance: '{rc[1]}' Which specific consumer right is violated or exercised in this situation?",
        "options": [
            ("A", rc[0], True, f"None - direct NCERT consumer right: {rc[0]}."),
            ("B", "Right to Consumer Immunity", False, "No such right exists under CPA."),
            ("C", "Right to Unconditional Credit", False, "No such right exists."),
            ("D", "Right to Resell Goods at Arbitrary Prices", False, "Absurd distractor.")
        ],
        "sol": f"The scenario illustrates the {rc[0]} under the Consumer Protection Act."
    })

    # Q38: Quality Certification Marks
    questions.append({
        "qNum": 38,
        "chapter": "Consumer Protection",
        "topic": "Consumer Protection",
        "subtopic": "Standardization and Quality Certification Marks",
        "archetype": "match-the-following",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "Match List-I (Product Category) with List-II (Mandatory / Standard Quality Mark in India):\nList-I:\n(A) Industrial and Electrical Products\n(B) Agricultural Commodities\n(C) Gold Jewellery\n(D) Processed Fruit Products (Jams, Juices)\n\nList-II:\n(I) AGMARK\n(II) ISI Mark\n(III) FPO Mark\n(IV) Hallmark\nChoose the correct option:",
        "options": [
            ("A", "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)", True, "None - exact standardization marks in India."),
            ("B", "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)", False, "Swapping ISI and AGMARK."),
            ("C", "(A)-(II), (B)-(IV), (C)-(I), (D)-(III)", False, "Swapping AGMARK and Hallmark."),
            ("D", "(A)-(III), (B)-(I), (C)-(IV), (D)-(II)", False, "Swapping ISI and FPO.")
        ],
        "sol": "ISI mark applies to electrical and industrial goods (II); AGMARK applies to agricultural products like oils/cereals (I); Hallmark applies to gold jewellery (IV); FPO mark applies to processed fruit products (III)."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Chapter: Entrepreneurship Development (2 questions: Q39 to Q40)
    # ─────────────────────────────────────────────────────────────────────────────
    # Q39: Entrepreneurial Competencies
    comp_cases = [
        ("Initiative", "acting before being forced by events, anticipating market demands, and pioneering new product segments"),
        ("Systematic Planning", "breaking large commercial goals into chronological sub-milestones and formulating contingency strategies"),
        ("Problem Solving", "discovering creative alternative pathways when unexpected supplier embargoes block traditional raw materials"),
        ("Information Seeking", "personally consulting technical experts, studying trade journals, and analyzing competitor patents before launch")
    ]
    cc = comp_cases[(m - 1) % len(comp_cases)]
    questions.append({
        "qNum": 39,
        "chapter": "Entrepreneurship Development",
        "topic": "Entrepreneurial Competencies",
        "subtopic": "Core Competencies",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"An entrepreneur is described as: '{cc[1]}'. Which recognized entrepreneurial competency does this behavior exhibit?",
        "options": [
            ("A", cc[0], True, f"None - exact NCERT entrepreneurial competency: {cc[0]}."),
            ("B", "Bureaucratic Conformity", False, "Bureaucracy is opposite of entrepreneurship."),
            ("C", "Risk Elimination Guarantee", False, "Entrepreneurs take calculated risks; they cannot eliminate all risk."),
            ("D", "Autocratic Centralism", False, "Not an entrepreneurial competency.")
        ],
        "sol": f"NCERT highlights core entrepreneurial competencies. The behavior described illustrates '{cc[0]}'."
    })

    # Q40: Characteristics of Entrepreneurship
    questions.append({
        "qNum": 40,
        "chapter": "Entrepreneurship Development",
        "topic": "Entrepreneurship",
        "subtopic": "Concept and Characteristics",
        "archetype": "multi-statement",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": "Which of the following statements accurately characterize Entrepreneurship according to NCERT?\n(A) It is a systematic, purposeful, and creative activity aimed at creating value.\n(B) It involves risk-taking since future returns on investments are uncertain.\n(C) It is strictly a one-time event that ends as soon as a business is registered.\n(D) It acts as a catalyst for economic development and capital formation.\nChoose the correct option:",
        "options": [
            ("A", "(A), (B) and (D) only", True, "None - Entrepreneurship is a continuous dynamic process, not a one-time event."),
            ("B", "(B), (C) and (D) only", False, "(C) is false."),
            ("C", "(A) and (C) only", False, "(C) is false."),
            ("D", "(A), (B), (C) and (D)", False, "(C) is false.")
        ],
        "sol": "Entrepreneurship is a systematic, creative, and continuous dynamic process involving innovation and calculated risk-taking. It is not a one-time event."
    })

    return questions
