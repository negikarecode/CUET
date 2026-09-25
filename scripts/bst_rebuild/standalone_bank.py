"""
CUET UG Master Question Paper Rebuild - Standalone Questions Bank
Generates 40 distinct standalone questions (Q01 to Q40) for each mock from Mock 1 to Mock 20.
Guarantees 100% stem uniqueness across all 800 standalone questions, matching the exact NCERT Class 12 syllabus blueprint.
"""

def generate_standalone_questions_for_mock(m):
    """
    Returns exactly 40 standalone questions for Mock `m` (1 <= m <= 20).
    Every single question stem across all 20 mocks is unique.
    """
    qs = []

    # Distinct company context per mock
    companies = [
        "AuraTech Logistics", "GreenLife Organics", "Bhartiya Textiles", "Suryodaya Renewables",
        "Vanguard Robotics", "Pinnacle Pharmaceuticals", "UrbanCraft Furnishings", "Kavya FMCG",
        "Apex Automotive", "Titanium Engineering", "Nectar Beverages", "Starlight Media",
        "BioHealth Diagnostics", "SwiftCargo Express", "Heritage Handlooms", "Quantum Software",
        "Crown Departmental Stores", "TerraCotta Ceramics", "Indus Agro-Processing", "Horizon FinTech"
    ]
    co = companies[m - 1]

    # ─────────────────────────────────────────────────────────────────────────────
    # Q01: Effectiveness vs Efficiency (Unique numerical parameters and contexts)
    # ─────────────────────────────────────────────────────────────────────────────
    target_units = 3000 + m * 750
    budget_cost = 40 + m * 6
    actual_cost = round(budget_cost * 1.28, 1)
    qs.append({
        "qNum": 1,
        "chapter": "Nature and Significance of Management",
        "topic": "Management: Concept and Characteristics",
        "subtopic": "Effectiveness vs Efficiency",
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"In {co}, the operations division completed the production quota of {target_units:,} units two days before the customer deadline. However, due to emergency machinery repairs and air-freight dispatch, the actual cost incurred was Rs. {actual_cost} Lakh against the budgeted Rs. {budget_cost} Lakh. How should the performance of the operations team be appraised?",
        "options": [
            ("A", "The management was effective but inefficient.", True, "None - goal achieved on time (effective) but exceeded budgeted cost (inefficient)."),
            ("B", "The management was efficient but ineffective.", False, "The delivery deadline was achieved, proving it was effective, not ineffective."),
            ("C", "The management achieved optimum effectiveness and optimum efficiency.", False, "Exceeding cost budget compromises efficiency."),
            ("D", "The management was neither effective nor efficient.", False, "Deadlines and production quotas were met, so effectiveness was intact.")
        ],
        "sol": "Effectiveness is concerned with completing the given task and achieving the end result on time. Efficiency means doing the task correctly with minimum cost. Since the output was delivered on time but at a higher cost, the team was effective but inefficient."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q02: Characteristics & Objectives of Management (20 distinct NCERT syllabus facets)
    # ─────────────────────────────────────────────────────────────────────────────
    char_data = [
        # M01
        ("Management is a goal-oriented process", "an enterprise unites the diverse efforts of different individuals towards the achievement of pre-determined organizational goals", "Goal-oriented"),
        # M02
        ("Management is all-pervasive", "managerial activities are common to all enterprises whether economic, social, or political, across petrol pumps, hospitals, or schools", "All-pervasive"),
        # M03
        ("Management of Work", "all organizations exist for the performance of some basic work, such as producing garments, treating patients, or constructing buildings", "Multidimensional: Management of Work"),
        # M04
        ("Management of People", "handling human resources both as individual employees with diverse needs and as collective workgroups", "Multidimensional: Management of People"),
        # M05
        ("Management of Operations", "transforming input resources and technology into desired final outputs through a continuous production cycle", "Multidimensional: Management of Operations"),
        # M06
        ("Management is a continuous process", "the functions of planning, organising, staffing, directing, and controlling are performed simultaneously by all managers all the time", "Continuous process"),
        # M07
        ("Management is a group activity", "an enterprise is a collection of diverse individuals whose separate efforts must be channeled into a common direction through team work", "Group activity"),
        # M08
        ("Management is a dynamic function", "an organization must adapt its goals, products, and operational strategies to survive in an ever-changing external environment", "Dynamic function"),
        # M09
        ("Management is an intangible force", "management cannot be seen physically, but its presence is felt where orderliness replaces chaos and targets are met happily", "Intangible force"),
        # M10
        ("Organisational Objectives: Survival", "earning enough revenues to cover total operating costs so that the enterprise remains a going concern", "Organizational Objective: Survival"),
        # M11
        ("Social Objectives of Management", "using eco-friendly production methods, generating employment for underprivileged sections, and providing schools or creches", "Social Objectives"),
        # M12
        ("Personal / Individual Objectives", "providing competitive salaries, personal growth opportunities, peer recognition, and healthy working conditions for employees", "Personal Objectives"),
        # M13
        ("Management as an Art", "personalized application of theoretical knowledge combined with continuous practice, creativity, and personal style", "Management as an Art"),
        # M14
        ("Management as a Science", "systematised body of knowledge explaining general truths, based on observation and repeated experimentation", "Management as a Science"),
        # M15
        ("Management as an Inexact / Social Science", "principles deal with unpredictable human behavior and therefore outcomes cannot be tested with mathematical precision like physics", "Inexact Science"),
        # M16
        ("Importance: Management helps in achieving group goals", "giving a common direction to individual efforts and aligning sectional ambitions towards corporate objectives", "Achieving group goals"),
        # M17
        ("Importance: Management increases efficiency", "reducing costs and increasing productivity through better planning, organizing, directing, and controlling of resources", "Increasing efficiency"),
        # M18
        ("Importance: Management creates a dynamic organization", "helping employees overcome resistance to change and adapt smoothly to environmental shifts", "Creating dynamic organization"),
        # M19
        ("Importance: Management helps in the development of society", "providing good quality products, adopting new technology, generating employment, and fostering economic growth", "Development of society"),
        # M20
        ("Management as an emerging Profession", "possesses a well-defined body of knowledge, though universal statutory licensing and mandatory ethical codes are not yet legally compulsory", "Management as a Profession")
    ]
    cd = char_data[m - 1]
    qs.append({
        "qNum": 2,
        "chapter": "Nature and Significance of Management",
        "topic": "Management: Concept and Characteristics",
        "subtopic": cd[2],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"According to NCERT Class 12, when a business analyst notes that: '{cd[1]}', which specific feature or objective of management is being highlighted?",
        "options": [
            ("A", cd[0], True, f"None - exact NCERT tenet: {cd[0]}."),
            ("B", "Taylor's Functional Foremanship Mandate", False, "Functional foremanship is a shop-floor supervision technique, not a fundamental management characteristic."),
            ("C", "Statutory Corporate Governance Law", False, "Legal requirement, not a core characteristic of management."),
            ("D", "Informal Grapevine Communication Channel", False, "Grapevine is an informal communication network.")
        ],
        "sol": f"The scenario explicitly describes '{cd[0]}', a fundamental tenet outlined in NCERT Class 12 Business Studies."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q03: Levels of Management (20 distinct executive positions and functions)
    # ─────────────────────────────────────────────────────────────────────────────
    levels_data = [
        ("Chief Executive Officer (CEO) and Board of Directors", "Top Level Management", "formulating overall enterprise goals, framing broad policies, and maintaining external stakeholder relations"),
        ("Plant Superintendent and Divisional Head", "Middle Level Management", "interpreting corporate policies, ensuring departmental coordination, and assigning operational tasks"),
        ("Shop-Floor Foreman and First-Line Supervisor", "Operational / Lower Level Management", "directly overseeing factory workers, ensuring safety standards, and minimizing material wastage"),
        ("Chief Financial Officer (CFO)", "Top Level Management", "overseeing enterprise capital structure, long-term financing, and corporate solvency"),
        ("Regional Sales Manager", "Middle Level Management", "translating marketing strategies into regional quotas and motivating sales representatives"),
        ("Section In-Charge and Head Clerk", "Operational / Lower Level Management", "maintaining daily attendance, shop discipline, and reporting worker grievances"),
        ("Vice-President of Human Resources", "Top Level Management", "framing nationwide recruitment, promotion, and employee welfare strategies"),
        ("Factory Production Manager", "Middle Level Management", "procuring necessary raw materials and coordinating batch schedules across assembly bays"),
        ("Quality Assurance Inspector", "Operational / Lower Level Management", "conducting physical sampling of finished goods against standard tolerances on the conveyor"),
        ("Managing Director (MD)", "Top Level Management", "bearing ultimate responsibility for the survival, growth, and societal impact of the enterprise"),
        ("Marketing Division Head", "Middle Level Management", "allocating regional advertising budgets and reviewing promotional campaign performance"),
        ("Assembly Shift Supervisor", "Operational / Lower Level Management", "instructing operators on machinery handling and ensuring tool availability"),
        ("Chief Technology Officer (CTO)", "Top Level Management", "guiding long-term R&D investments and technological innovation roadmap"),
        ("Supply Chain & Logistics Manager", "Middle Level Management", "synchronizing transit schedules between central warehouses and retail stockists"),
        ("Maintenance Supervisor", "Operational / Lower Level Management", "supervising preventative lubrication and emergency repair of factory machines"),
        ("Chief Sustainability Officer", "Top Level Management", "establishing enterprise carbon reduction targets and ESG compliance policies"),
        ("Branch General Manager", "Middle Level Management", "managing localized branch operations and executing central directives"),
        ("Dispatch Superintendent", "Operational / Lower Level Management", "monitoring dock loading, packaging integrity, and delivery truck manifests"),
        ("President of Corporate Strategy", "Top Level Management", "evaluating mergers, acquisitions, and multi-year market expansions"),
        ("Departmental Training In-Charge", "Middle Level Management", "identifying departmental skill deficits and organizing technical workshops")
    ]
    ld = levels_data[m - 1]
    qs.append({
        "qNum": 3,
        "chapter": "Nature and Significance of Management",
        "topic": "Levels of Management",
        "subtopic": "Hierarchical Roles and Responsibilities",
        "archetype": "conceptual-application",
        "difficulty": 1,
        "skillTested": "Recall",
        "stem": f"In a modern corporate enterprise, executives holding the title of '{ld[0]}' belong to which hierarchical level of management and carry out what primary function?",
        "options": [
            ("A", f"{ld[1]}, responsible for {ld[2]}.", True, f"None - exact classification of {ld[1]}."),
            ("B", "Advisory Council, responsible solely for political lobbying.", False, "Advisory councils are not an executive level of management."),
            ("C", "Statutory Grievance Committee, operating outside the formal chain of command.", False, "Executive roles operate within the formal managerial hierarchy."),
            ("D", "External Regulatory Agency, auditing financial statements.", False, "External agencies are independent external overseers.")
        ],
        "sol": f"{ld[0]} belong to {ld[1]} whose core function is {ld[2]}."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q04: Coordination - The Essence of Management (20 distinct aspects)
    # ─────────────────────────────────────────────────────────────────────────────
    coord_data = [
        ("Coordination is the essence of management", "it is not a separate function of management, but rather the force that binds all other functions together into a harmonious whole"),
        ("Integrates group effort", "unifying diverse interests and reconciling conflicting departmental viewpoints into purposeful work activity"),
        ("Ensures unity of action", "acting as the binding force between departments to ensure all actions pull in the same corporate direction"),
        ("Continuous process", "coordination is not a one-time event; it begins at planning and continues unceasingly through controlling"),
        ("All-pervasive function", "required at all levels of management and across all functional departments due to interdependence of activities"),
        ("Responsibility of all managers", "top managers coordinate with external environment, middle managers coordinate departments, and supervisors coordinate worker efforts"),
        ("Deliberate function", "a manager has to coordinate the efforts of different people in a conscious and deliberate manner, rather than relying on spontaneous cooperation"),
        ("Importance: Growth in size", "as organizations expand and recruit hundreds of employees with diverse backgrounds, coordination harmonizes individual goals with corporate goals"),
        ("Importance: Functional differentiation", "specialized departments often develop conflicting sectional priorities, requiring coordination to link their activities together"),
        ("Importance: Specialisation", "modern firms employ high-level specialists who often believe they alone are qualified, making coordination essential to reconcile their perspectives"),
        ("Coordination without cooperation", "leads to employee dissatisfaction and resentment, while cooperation without coordination produces wasted and duplicated effort"),
        ("Coordination in Planning", "harmonizing sales forecasts, production capacity, raw material procurement budgets, and cash flow projections"),
        ("Coordination in Organising", "aligning departmental authority-responsibility structures to ensure seamless hand-offs of work"),
        ("Coordination in Staffing", "ensuring that the skills and competencies of hired personnel precisely match the requirements of defined job positions"),
        ("Coordination in Directing", "integrating individual motivation schemes, leadership guidance, and communication networks so that workers strive happily toward company goals"),
        ("Coordination in Controlling", "comparing actual achievements against planned benchmarks across all departments to provide integrated feedback for future planning"),
        ("Resolving functional silos", "overcoming narrow departmental outlooks where production, marketing, and finance work at cross-purposes"),
        ("Horizontal coordination", "linking activities across parallel departments of equal rank, such as sales and production"),
        ("Vertical coordination", "synchronizing activities and authority relationships across different levels from top management down to first-line supervisors"),
        ("Deliberate vs Accidental effort", "coordination must be actively planned and administered, as good intentions alone do not guarantee synchronized operations")
    ]
    c_dat = coord_data[m - 1]
    qs.append({
        "qNum": 4,
        "chapter": "Nature and Significance of Management",
        "topic": "Coordination",
        "subtopic": "Coordination Principles",
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": f"In an executive review meeting, the Chief Operating Officer remarks: '{c_dat[1]}'. Which fundamental tenet of Coordination is illustrated here?",
        "options": [
            ("A", c_dat[0], True, f"None - exact NCERT concept: {c_dat[0]}."),
            ("B", "Scalar Chain Discontinuity", False, "Scalar chain concerns formal communication lines."),
            ("C", "Complete Abdication of Top Management", False, "Decentralisation/coordination is not abdication."),
            ("D", "Enforcement of Strict Functional Empires", False, "Functional empires are the antithesis of effective coordination.")
        ],
        "sol": f"The scenario highlights '{c_dat[0]}', a core dimension of coordination detailed in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q05: Fayol's Principles of Management (20 distinct principles/applications)
    # ─────────────────────────────────────────────────────────────────────────────
    fayol_p1 = [
        ("Unity of Command", "an employee should receive orders from one and only one superior, preventing dual subordination, confusion, and divided loyalty"),
        ("Division of Work", "work is divided into small specialized tasks performed by trained specialists, leading to specialization and increased output"),
        ("Authority and Responsibility", "there must be a parity between authority granted and responsibility entrusted; authority without responsibility breeds irresponsibility"),
        ("Discipline", "obedience, respect for authority, adherence to organizational rules, and fair agreements with judicious application of penalties"),
        ("Unity of Direction", "each group of activities having the same objective must have one head and one plan, preventing overlapping of corporate efforts"),
        ("Subordination of Individual Interest to General Interest", "the interests of an enterprise should take precedence over the personal interests of any individual employee or group"),
        ("Remuneration of Employees", "overall compensation and wages should be fair to both employees (providing reasonable living standard) and employer (within capacity to pay)"),
        ("Centralisation and Decentralisation", "an optimal balance between concentrating decision-making authority at the top and dispersing it down to operating levels"),
        ("Scalar Chain", "the formal line of authority and communication running from top to bottom, which should normally not be broken except via Gang Plank in emergency"),
        ("Order (Material and Social)", "a place for everything (everyone) and everything (everyone) in its (their) place, minimizing wasteful search time"),
        ("Equity", "fair, just, and kind treatment towards all subordinates without discrimination based on sex, religion, caste, or personal bias"),
        ("Stability of Tenure of Personnel", "employees should be selected and kept in their positions for a reasonable tenure to minimize turnover and build organizational expertise"),
        ("Initiative", "encouraging workers to conceive, formulate, and execute new plans, providing satisfaction and creative drive within discipline"),
        ("Esprit de Corps", "promoting team spirit, unity, and mutual trust by replacing 'I' with 'We' in all management conversations"),
        ("Gang Plank", "a direct communication shortcut between two employees of equal level in different scalar lines permitted during emergencies with prior notice"),
        ("Dual Subordination Hazard", "violating Unity of Command causes indiscipline, undermines authority, creates operational chaos, and invites blame-shifting"),
        ("Preventing Overlapping Activities", "ensuring all related marketing activities report to one marketing head under Unity of Direction"),
        ("Parity Rule in Delegation", "giving a sales manager responsibility to achieve Rs. 1 Crore sales while denying them authority to approve standard trade discounts violates Fayol's principle"),
        ("Remuneration Capacity Constraint", "wages must provide a fair living standard but must remain strictly within the paying capacity of the business enterprise"),
        ("Social Order on the Shop Floor", "ensuring that the right person is assigned to the right desk or workstation without favoritism")
    ]
    fp = fayol_p1[m - 1]
    qs.append({
        "qNum": 5,
        "chapter": "Principles of Management",
        "topic": "Fayol's Principles of Management",
        "subtopic": fp[0],
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": f"Consider the following workplace policy observed in an organization: '{fp[1]}'. Which of Henri Fayol's 14 principles of management is directly illustrated?",
        "options": [
            ("A", fp[0], True, f"None - exact application of Fayol's principle: {fp[0]}."),
            ("B", "Taylor's Differential Piece Wage Incentive", False, "Taylor's technique, not Fayol's administrative principle."),
            ("C", "Critical Point Control Standard", False, "Controlling technique, not a principle of management."),
            ("D", "Informal Grapevine Transmission", False, "Informal communication pattern.")
        ],
        "sol": f"The policy directly reflects Fayol's principle of '{fp[0]}' as defined in NCERT."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q06: Principles of Management - Nature and Significance (20 distinct aspects)
    # ─────────────────────────────────────────────────────────────────────────────
    nature_sig = [
        ("Universal Applicability", "principles of management apply to all types of organizations whether large or small, manufacturing or services, public or private sector"),
        ("General Guidelines", "they are general guides to action and do not provide ready-made straitjacket solutions to all complex managerial problems"),
        ("Formed by Practice and Experimentation", "principles are developed through cumulative practitioner experience and disciplined observation over decades"),
        ("Flexible", "principles are not rigid prescriptions like laws of physics; they can be adapted and modified by managers according to situational demands"),
        ("Mainly Behavioral", "they aim primarily at influencing human behavior and interpersonal relationships at the workplace"),
        ("Cause and Effect Relationships", "they indicate what result will likely follow when a particular action or principle is applied in a given situation"),
        ("Contingent", "their application depends upon the prevailing conditions, organizational size, nature of business, and cultural climate at a given point in time"),
        ("Providing managers with useful insights into reality", "improving managerial understanding of situational problems and helping them learn from past experience"),
        ("Optimum utilization of resources and effective administration", "minimizing wastage of physical, financial, and human resources through systematic administrative guidelines"),
        ("Scientific decisions", "decisions based on management principles are objective, realistic, free from personal bias, and based on objective facts"),
        ("Meeting changing environment requirements", "principles provide the foundational flexibility that allows enterprises to adapt to dynamic commercial environments"),
        ("Fulfilling social responsibility", "guiding businesses to satisfy societal expectations, fair wages, customer safety, and environmental protection"),
        ("Management training, education, and research", "acting as the core conceptual curriculum taught in business schools and professional executive programs"),
        ("Distinction from Pure Science", "principles of pure science are rigid and verifiable in labs, while management principles deal with unpredictable human behavior"),
        ("Distinction from Techniques", "techniques are sequential procedures or methods of action, whereas principles are fundamental guidelines governing decision-making"),
        ("Distinction from Values", "values are moral and social rules accepted by society, whereas principles are guidelines formed for managerial efficiency"),
        ("Subjectivity and Human Discretion", "applying principles requires situational judgment rather than blind dogmatic adherence"),
        ("Contingent application of Wage Systems", "a piece-rate wage system suitable in a manual foundry may be entirely unsuited in an automated research lab"),
        ("Insights preventing trial-and-error blunders", "following established principles saves organizations from costly trial-and-error experimentation"),
        ("Dynamic evolution over time", "management principles continuously evolve in response to technological, social, and economic transformations")
    ]
    ns = nature_sig[m - 1]
    qs.append({
        "qNum": 6,
        "chapter": "Principles of Management",
        "topic": "Principles of Management: Nature and Significance",
        "subtopic": ns[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"When a management theorist notes that: '{ns[1]}', which characteristic or significance of management principles is being described?",
        "options": [
            ("A", ns[0], True, f"None - exact NCERT characteristic/significance: {ns[0]}."),
            ("B", "Rigid Dogmatic Law of Mathematics", False, "Management principles are flexible, not rigid mathematical laws."),
            ("C", "Statutory Penal Code Regulation", False, "Management principles are guidelines, not criminal statutes."),
            ("D", "Sole Discretion of External Trade Unions", False, "Distractor.")
        ],
        "sol": f"The statement describes '{ns[0]}', a core feature or significance of management principles in NCERT."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q07: Taylor's Scientific Techniques (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    taylor_tech = [
        ("Time Study", "determining the standard time taken by a worker of average capability to perform a well-defined job using a stopwatch"),
        ("Motion Study", "observing worker body movements to identify and eliminate unproductive, unnecessary, and wasteful motions"),
        ("Fatigue Study", "determining the amount, frequency, and duration of rest intervals required for workers to regain stamina"),
        ("Method Study", "identifying the 'One Best Way' of performing a job from procurement to delivery to minimize production costs and maximize quality"),
        ("Standardization of Work", "establishing standards for tools, machines, raw materials, and working conditions to ensure uniform quality"),
        ("Simplification of Work", "eliminating superfluous varieties, sizes, and dimensions of manufactured products to reduce inventory costs"),
        ("Functional Foremanship: Instruction Card Clerk", "drafting detailed operating instructions and step-by-step task sequences for workers"),
        ("Functional Foremanship: Route Clerk", "specifying the exact chronological sequence and physical path of production through the shop floor"),
        ("Functional Foremanship: Time and Cost Clerk", "preparing wage sheets and calculating standard unit costs of production"),
        ("Functional Foremanship: Disciplinarian", "enforcing shop discipline, orderly behavior, and adherence to company factory rules"),
        ("Functional Foremanship: Speed Boss", "ensuring that machines and operators work at the prescribed standard speed"),
        ("Functional Foremanship: Gang Boss", "keeping all machines, tools, jigs, fixtures, and raw materials ready for immediate worker use"),
        ("Functional Foremanship: Repair Boss", "ensuring the proper upkeep, preventative maintenance, and prompt repair of factory machinery"),
        ("Functional Foremanship: Inspector", "checking the physical quality and tolerances of finished products against engineering specifications"),
        ("Mental Revolution", "a complete change of mental outlook on the part of both workers and management from conflict to mutual cooperation"),
        ("Separation of Planning from Execution", "freeing shop workers from mental planning by placing specialized clerks in the planning department"),
        ("Science, Not Rule of Thumb", "replacing intuition and personal judgment with scientific investigation of every element of work"),
        ("Harmony, Not Discord", "management sharing prosperity with workers, and workers dedicating their highest productivity to the firm"),
        ("Cooperation, Not Individualism", "management involving workers in setting standards, and workers refraining from strikes"),
        ("Development of Each Person to Greatest Efficiency", "systematic training, scientific selection, and allocating jobs matching physical and intellectual capabilities")
    ]
    tt = taylor_tech[m - 1]
    qs.append({
        "qNum": 7,
        "chapter": "Principles of Management",
        "topic": "Taylor's Scientific Management",
        "subtopic": tt[0],
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": f"In a scientific manufacturing audit, an industrial engineer implements the technique of: '{tt[1]}'. Which of F.W. Taylor's scientific techniques or principles is being applied?",
        "options": [
            ("A", tt[0], True, f"None - exact NCERT Taylor technique: {tt[0]}."),
            ("B", "Fayol's Esprit de Corps Initiative", False, "Fayol's principle, not Taylor's scientific technique."),
            ("C", "Decentralisation of Corporate Governance", False, "Macro corporate policy, not shop-floor scientific management."),
            ("D", "SEBI Demat Share Custody Procedure", False, "Financial market process.")
        ],
        "sol": f"The scenario highlights '{tt[0]}', a key scientific technique pioneered by F.W. Taylor."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q08: Taylor's Differential Piece Wage System (20 distinct numerical scenarios)
    # ─────────────────────────────────────────────────────────────────────────────
    # Standard output, rates, worker outputs
    base_calc_data = [
        (50, 15.0, 12.0, 55, 45), (100, 20.0, 16.0, 110, 90), (40, 25.0, 20.0, 44, 36),
        (80, 10.0, 8.0, 85, 75), (60, 18.0, 14.0, 65, 55), (120, 30.0, 24.0, 125, 115),
        (30, 50.0, 40.0, 32, 28), (75, 16.0, 12.0, 80, 70), (90, 22.0, 18.0, 95, 85),
        (200, 5.0, 4.0, 210, 190), (150, 12.0, 9.0, 160, 140), (45, 35.0, 28.0, 48, 42),
        (70, 25.0, 20.0, 75, 65), (85, 14.0, 11.0, 90, 80), (110, 18.0, 14.0, 115, 105),
        (65, 30.0, 24.0, 70, 60), (95, 20.0, 16.0, 100, 90), (130, 15.0, 12.0, 135, 125),
        (35, 60.0, 48.0, 38, 32), (140, 10.0, 8.0, 150, 130)
    ]
    std, hr, lr, w1, w2 = base_calc_data[m - 1]
    w1_pay = w1 * hr
    w2_pay = w2 * lr
    diff_pay = w1_pay - w2_pay
    qs.append({
        "qNum": 8,
        "chapter": "Principles of Management",
        "topic": "Taylor's Scientific Management",
        "subtopic": "Differential Piece Wage System",
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Application",
        "stem": f"Under Taylor's Differential Piece Wage System in {co}, standard daily output is fixed at {std} units. Workers producing at or above standard are paid Rs. {hr:.1f} per unit; those producing below standard are paid Rs. {lr:.1f} per unit. On a given day, Worker X produced {w1} units and Worker Y produced {w2} units. What is the difference in daily earnings between Worker X and Worker Y?",
        "options": [
            ("A", f"Rs. {diff_pay:.1f}", True, f"None - Worker X earns {w1} * {hr:.1f} = Rs. {w1_pay:.1f}; Worker Y earns {w2} * {lr:.1f} = Rs. {w2_pay:.1f}. Difference = Rs. {diff_pay:.1f}."),
            ("B", f"Rs. {(w1 - w2) * lr:.1f}", False, "Calculating difference using only the lower piece rate for both workers."),
            ("C", f"Rs. {(w1 - w2) * hr:.1f}", False, "Calculating difference using only the higher piece rate for both workers."),
            ("D", f"Rs. {w1 * lr - w2 * lr:.1f}", False, "Ignoring the higher differential rate completely.")
        ],
        "sol": f"Worker X reached/exceeded standard: {w1} units * Rs. {hr:.1f} = Rs. {w1_pay:.1f}. Worker Y fell below standard: {w2} units * Rs. {lr:.1f} = Rs. {w2_pay:.1f}. Difference = Rs. {w1_pay:.1f} - Rs. {w2_pay:.1f} = Rs. {diff_pay:.1f}."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q09: Taylor vs Fayol - Comparative Evaluation (20 distinct comparative angles)
    # ─────────────────────────────────────────────────────────────────────────────
    comp_tf = [
        ("Perspective", "Taylor's principles and techniques start from the shop floor and operational levels upwards, while Fayol's principles begin from the top management executive level downwards."),
        ("Unity of Command", "Taylor advocated Functional Foremanship where a worker reports to 8 specialized bosses (violating unity of command), whereas Fayol strictly insisted on Unity of Command."),
        ("Applicability", "Taylor's techniques apply mainly to specialized manufacturing shop floors, whereas Fayol's administrative principles are universally applicable across all organizations."),
        ("Basis of Formation", "Taylor formulated his principles through scientific observation and controlled physical experiments, while Fayol synthesized his from personal executive experience."),
        ("Focus", "Taylor's focus was on increasing worker productivity and eliminating wasteful motions, whereas Fayol's focus was on improving overall administrative governance and enterprise efficiency."),
        ("Personality", "Taylor was an industrial engineer and research scientist, while Henri Fayol was a mining engineer and practicing top corporate executive."),
        ("Expression", "Taylor expressed his contributions under the title 'Scientific Management', whereas Fayol termed his work the 'General Theory of Administration'."),
        ("Wage Systems", "Taylor advocated a harsh differential piece wage system penalizing inefficiency, whereas Fayol advocated fair living remuneration based on firm capacity."),
        ("Approach to Workers", "Taylor viewed workers through physical efficiency and economic motivation, whereas Fayol emphasized human equity, esprit de corps, and initiative."),
        ("Role of Foremen", "Taylor divided supervision among 8 specialized functional foremen, while Fayol maintained a single line of scalar command."),
        ("Flexibility", "Taylor's techniques prescribe exact scientific methods, whereas Fayol's principles are flexible guidelines to be adapted to circumstances."),
        ("Supervisory Hierarchy", "Taylor separated planning completely from execution on the factory floor, while Fayol integrated planning and organizing across all executive levels."),
        ("Standardisation", "Taylor insisted on standardizing tools, machines, and times, whereas Fayol emphasized standardizing organizational relationships and reporting lines."),
        ("Worker Initiative", "Fayol championed worker initiative within organizational discipline, whereas Taylor required strict adherence to instruction cards."),
        ("Mental Revolution vs Esprit de Corps", "Taylor called for a mental revolution to align labor and capital, while Fayol fostered team spirit through 'Esprit de Corps'."),
        ("Historical Legacy", "Taylor is revered as the Father of Scientific Management, while Fayol is celebrated as the Father of General Management."),
        ("Application to Service Sector", "Fayol's principles transfer seamlessly to hospitals, banks, and schools, whereas Taylor's time-motion studies require industrial assembly settings."),
        ("Disciplinary Penalties", "Fayol advocated judicious, fair penalties with clear agreements, whereas Taylor relied on economic wage differentials to enforce output."),
        ("Division of Labor Scope", "Taylor divided minute tasks on the shop floor, whereas Fayol applied division of labor to entire enterprise functions like finance and accounting."),
        ("Complementary Nature", "Taylor and Fayol do not contradict each other but complement one another: Taylor improves shop-floor productivity while Fayol stabilizes administrative leadership.")
    ]
    ct = comp_tf[m - 1]
    qs.append({
        "qNum": 9,
        "chapter": "Principles of Management",
        "topic": "Principles of Management",
        "subtopic": f"Taylor vs Fayol: {ct[0]}",
        "archetype": "conceptual-application",
        "difficulty": 3,
        "skillTested": "Understanding",
        "stem": f"In a comparative analysis of classical management theories, the statement: '{ct[1]}' illustrates which point of difference or synthesis between F.W. Taylor and Henri Fayol?",
        "options": [
            ("A", f"Difference based on {ct[0]}.", True, f"None - exact NCERT distinction: {ct[0]}."),
            ("B", "Taylor and Fayol held 100% identical views on this dimension.", False, "Taylor and Fayol have distinct conceptual bases."),
            ("C", "Fayol's principles were entirely derived from Taylor's experiments.", False, "Fayol developed his principles independently from practitioner experience."),
            ("D", "Taylor rejected the concept of division of work completely.", False, "Taylor strongly utilized division of work.")
        ],
        "sol": f"This comparative analysis reflects the dimension of '{ct[0]}' in NCERT's comparison table between Taylor and Fayol."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q10: Dimensions of Business Environment (20 distinct real-world scenarios)
    # ─────────────────────────────────────────────────────────────────────────────
    pestle_cases = [
        ("Technological Environment", "adoption of artificial intelligence algorithms and automated robotic conveyor sorting in express logistics hubs"),
        ("Social Environment", "surging consumer preference for organic gluten-free millet products and chemical-free cosmetics"),
        ("Political Environment", "a new government taking office and announcing stable foreign direct investment (FDI) guidelines"),
        ("Legal Environment", "the Supreme Court mandating child-proof safety caps and statutory health warnings on liquid detergents"),
        ("Economic Environment", "the Reserve Bank of India raising the repo rate by 50 basis points to curb headline inflation"),
        ("Technological Environment", "shift from physical copper telecommunication cables to high-speed fiber-optic 5G networks"),
        ("Social Environment", "rapid urbanization and increasing proportion of working women fueling demand for packaged ready-to-eat meals"),
        ("Legal Environment", "the National Consumer Commission imposing heavy monetary penalties on deceptive celebrity endorsements"),
        ("Political Environment", "state government offering a 10-year capital subsidy and subsidized land for semiconductor fabrication units"),
        ("Economic Environment", "depreciation of the Indian Rupee against the US Dollar boosting software exporter earnings while increasing imported crude oil costs"),
        ("Technological Environment", "introduction of blockchain-based smart contracts for automated ocean shipping document verification"),
        ("Social Environment", "widespread nationwide celebration of festivals driving seasonal retail booms in consumer electronics and apparel"),
        ("Legal Environment", "statutory packaging laws making it mandatory to print FSSAI license numbers and nutritional facts on food items"),
        ("Political Environment", "the central cabinet approving a multi-billion dollar national green hydrogen subsidy mission"),
        ("Economic Environment", "growth in per capita disposable income among middle-class households triggering record sales of premium passenger vehicles"),
        ("Technological Environment", "metal 3D-printing replacing traditional casting and machining in aerospace component prototyping"),
        ("Social Environment", "growing environmental awareness among Gen-Z consumers demanding biodegradable paper straws over plastic"),
        ("Legal Environment", "statutory regulations prohibiting tobacco and liquor advertisements on television and digital streaming platforms"),
        ("Political Environment", "cross-border trade agreements between neighboring nations simplifying customs clearance at land borders"),
        ("Economic Environment", "a sharp rise in raw material commodity prices in global markets squeezing operating margins of steel re-rollers")
    ]
    pc = pestle_cases[m - 1]
    qs.append({
        "qNum": 10,
        "chapter": "Business Environment",
        "topic": "Dimensions of Business Environment",
        "subtopic": pc[0],
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"An enterprise is evaluating external factors and observes: '{pc[1]}'. Which dimension of the business environment is directly illustrated?",
        "options": [
            ("A", pc[0], True, f"None - exact NCERT dimension: {pc[0]}."),
            ("B", "Internal Cultural Environment", False, "Internal culture is internal to the firm, not an external macro environmental dimension."),
            ("C", "Taylor's Functional Foremanship Dimension", False, "Functional foremanship is a shop-floor management technique."),
            ("D", "Shareholder Voting Proxy Environment", False, "Irrelevant distractor.")
        ],
        "sol": f"The scenario directly exemplifies the {pc[0]} of the business environment."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q11: Features & Importance of Business Environment (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    be_features = [
        ("Totality of external forces", "business environment is aggregative in nature because it includes the sum total of all individuals, institutions, and forces outside the enterprise"),
        ("Specific and general forces", "investors, customers, competitors, and suppliers affect individual firms directly, while economic, social, political, and legal conditions affect all firms"),
        ("Inter-relatedness", "different elements of business environment are closely linked; for example, increased health awareness raises demand for health foods and fitness services"),
        ("Dynamic nature", "the environment is constantly changing, whether in terms of technological improvements, shifts in consumer preferences, or new competition"),
        ("Uncertainty", "it is very difficult to predict future happenings, particularly when environment changes occur rapidly as in IT or fashion industries"),
        ("Complexity", "business environment consists of numerous interrelated forces which makes it easy to understand in parts, but difficult to grasp in totality"),
        ("Relativity", "business environment is a relative concept since it differs from country to country and even region to region (e.g. demand for sarees in India vs UK)"),
        ("First Mover Advantage", "early environmental scanning allows an enterprise to identify opportunities and reap benefits before competitors (e.g. Maruti entering small cars)"),
        ("Early Warning Signals", "identifying environmental threats in advance gives a firm time to make adjustments before suffering market losses"),
        ("Tapping Useful Resources", "a business scans the environment to procure inputs (finance, machines, raw materials, labor) and supply outputs (goods, services, taxes)"),
        ("Coping with Rapid Changes", "continuous monitoring of dynamic market trends enables managers to adapt operational strategies swiftly"),
        ("Assisting in Planning and Policy Formulation", "environmental scanning provides the objective intelligence and premises on which future plans and policies are formulated"),
        ("Improving Performance", "enterprises that continuously monitor and adapt to external changes achieve superior longevity and market leadership"),
        ("Demonetisation (November 2016) - Tax Administration", "demonetisation was viewed as a tax administration measure to channel cash hoards into formal banking and curb black money"),
        ("Demonetisation - Promotion of Digital Economy", "shifting financial transactions from cash to formal banking channels and digital payment methods like UPI"),
        ("Impact of Liberalisation", "abolishing industrial licensing, removing restrictions on expansion, reducing tariffs, and facilitating ease of doing business"),
        ("Impact of Privatisation", "reducing the role of the public sector, initiating strategic disinvestment, and encouraging private enterprise participation"),
        ("Impact of Globalisation", "integrating the domestic economy with the world economy through free flow of goods, services, capital, and technology"),
        ("Managerial Response to Environmental Changes", "diversification, brand building, customer-oriented marketing, technology upgradation, and flexible employment policies"),
        ("Scanning as a Continuous Prerequisite", "environmental scanning is not a one-time exercise; it is an ongoing strategic surveillance prerequisite for corporate survival")
    ]
    bf = be_features[m - 1]
    qs.append({
        "qNum": 11,
        "chapter": "Business Environment",
        "topic": "Business Environment: Features and Importance",
        "subtopic": bf[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"When a strategic management journal states that: '{bf[1]}', which recognized feature or significance of the Business Environment is highlighted?",
        "options": [
            ("A", bf[0], True, f"None - exact NCERT feature/importance: {bf[0]}."),
            ("B", "Static and Rigid Structural Stability", False, "The business environment is dynamic and uncertain, never static."),
            ("C", "Absolute Immunity from Technological Shifts", False, "No enterprise has immunity from external shifts."),
            ("D", "Complete Absence of Competitor Forces", False, "Competitors are direct specific forces in the environment.")
        ],
        "sol": f"The scenario directly describes '{bf[0]}', a fundamental feature or importance of the business environment."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q12: Types of Plans (20 distinct Match the Columns / Comparative questions)
    # ─────────────────────────────────────────────────────────────────────────────
    plan_types = [
        ("Policy", "general statements that channelize thinking towards a particular direction and provide guidance in managerial decision-making"),
        ("Procedure", "routine steps on how to carry out activities, detailing the exact chronological sequence of operations to be followed"),
        ("Rule", "specific statements specifying what must or must not be done in a given situation, allowing no discretion or compromise"),
        ("Budget", "a statement of expected results expressed in numerical terms for a future specified period"),
        ("Method", "the prescribed way or manner in which a particular task has to be performed, considering objective, time, cost, and fatigue"),
        ("Objective", "the end results towards which all organizational activities are directed, expressed in measurable quantitative terms with a time limit"),
        ("Strategy", "a comprehensive plan for accomplishing organizational objectives, encompassing long-term scope, adopting courses of action, and allocating resources"),
        ("Programme", "detailed statements about a project outlining objectives, policies, procedures, rules, tasks, and budgets required to implement a course of action"),
        ("Single-Use Plan", "plans developed for a one-time event or project that is not repeated in the future (e.g. budgets and programmes)"),
        ("Standing Plan", "plans used for activities that occur regularly over a period of time, providing operational stability (e.g. policies, procedures, rules)"),
        ("Policy vs Rule", "a policy provides discretion within broad parameters, whereas a rule allows no discretion and enforces strict compliance"),
        ("Procedure vs Method", "a procedure involves a series of chronological steps across departments, whereas a method deals with a single step in the procedure"),
        ("Objective vs Strategy", "objectives are desired end states, whereas strategy is the comprehensive operational pathway to achieve those objectives against competition"),
        ("Budget as a Control Standard", "because budgets express plans in numerical figures, they serve as benchmarks against which actual performance is measured"),
        ("No Smoking on the Factory Floor", "this represents a Rule, as it specifies what must not be done and carries rigid disciplinary penalties with no discretion"),
        ("Purchase policy of inviting minimum 3 competitive tenders", "this represents a Policy, guiding the purchasing manager's decision-making across all major procurements"),
        ("Sequence of steps for processing an employee leave application", "this represents a Procedure, detailing the chronological routing of leave forms from supervisor to HR"),
        ("Annual cash flow forecast detailing month-wise inflows and outflows", "this represents a Cash Budget, quantifying future liquidity expectations in numerical terms"),
        ("Comprehensive plan for launching a new satellite television channel", "this represents a Programme, integrating multiple single-use sub-plans, budgets, and milestones"),
        ("Standard operating procedure for calibrating a laboratory microscope", "this represents a Method, defining the exact mechanical technique of performing a specific job")
    ]
    pt = plan_types[m - 1]
    qs.append({
        "qNum": 12,
        "chapter": "Planning",
        "topic": "Types of Plans",
        "subtopic": pt[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In {co}, the management issued a formal document stating: '{pt[1]}'. This managerial document is classified under which type of Plan according to NCERT?",
        "options": [
            ("A", pt[0], True, f"None - exact NCERT definition: {pt[0]}."),
            ("B", "Informal Social Agreement", False, "These are formal administrative plans."),
            ("C", "SEBI Statutory Listing Agreement", False, "Capital market listing agreement."),
            ("D", "Taylor's Time-Study Stopwatch Card", False, "Production measurement card.")
        ],
        "sol": f"The document represents a '{pt[0]}', one of the recognized types of plans detailed in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q13: Planning Process (20 distinct sequence & step evaluation questions)
    # ─────────────────────────────────────────────────────────────────────────────
    plan_steps = [
        ("Setting Objectives", "the first step in planning where the organization specifies what it wants to achieve, providing direction to all departments"),
        ("Developing Premises", "making assumptions about the future environment, market trends, policies, and costs on which plans will be constructed"),
        ("Identifying Alternative Courses of Action", "discovering and listing all possible pathways and strategies through which pre-set objectives may be achieved"),
        ("Evaluating Alternative Courses", "weighing the pros and cons of each alternative against criteria such as feasibility, profitability, and risk"),
        ("Selecting an Alternative", "the real point of decision making where the most feasible, profitable, and adaptable plan is finalized"),
        ("Formulating Derivative Plans", "drafting secondary supportive plans (such as recruitment plans, purchasing budgets, machine maintenance schedules) to support the main plan"),
        ("Implementing the Plan", "putting the plan into actual operation by allocating resources, issuing directives, and activating operational departments"),
        ("Follow-up Action", "monitoring whether the plans are being implemented properly and whether activities are performing as per schedule"),
        ("Logical Sequence of Steps", "Objectives -> Premises -> Identifying Alternatives -> Evaluating Alternatives -> Selecting Alternative -> Implementation -> Follow-up"),
        ("Premises as Forecasts", "premises are not mere guesses; they are disciplined forecasts regarding economic trends, tax policies, and competitor actions"),
        ("Feasibility Screening", "eliminating unviable alternatives early to focus deep quantitative evaluation on genuine contenders"),
        ("Derivative Plans in Manufacturing", "a master production plan requires derivative plans for raw material purchase, tooling, and labor shift scheduling"),
        ("Follow-up as Link to Controlling", "follow-up action in planning monitors real progress and feeds actual variance data into the controlling process"),
        ("Quantifying Objectives", "objectives should be clear and specific, such as 'increasing sales volume by 15% in the next financial year' rather than vague hopes"),
        ("Evaluating Alternatives under Risk", "evaluating projects using calculations of capital outlay, payback period, and internal rate of return"),
        ("Flexibility in Alternative Selection", "managers often prepare contingency alternatives to switch plans if future premises change drastically"),
        ("Role of Middle Management in Implementation", "middle managers translate strategic master plans into departmental schedules and ensure worker participation"),
        ("Revising Premises During Implementation", "if external assumptions fail due to sudden government embargoes, premises must be promptly revised"),
        ("Deriving Budgets from Main Plan", "numerical financial budgets are formulated as derivative plans to finance the execution of chosen strategies"),
        ("Closing the Planning Cycle", "follow-up action provides feedback that initiates the next cycle of goal setting and planning")
    ]
    ps = plan_steps[m - 1]
    qs.append({
        "qNum": 13,
        "chapter": "Planning",
        "topic": "Planning Process",
        "subtopic": ps[0],
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": f"During a strategic planning retreat, the executive committee engages in: '{ps[1]}'. Which stage or tenet of the Planning Process is being executed?",
        "options": [
            ("A", ps[0], True, f"None - exact stage in NCERT planning process: {ps[0]}."),
            ("B", "Taylor's Functional Foremanship Scheduling", False, "Shop-floor foremanship technique."),
            ("C", "Consumer Dispute Pecuniary Valuation", False, "Consumer court topic."),
            ("D", "Demat Settlement of Securities", False, "Stock exchange trading procedure.")
        ],
        "sol": f"This activity corresponds to '{ps[0]}' in the official NCERT Planning Process."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q14: Importance & Limitations of Planning (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    plan_lim_imp = [
        ("Planning leads to rigidity", "following a pre-determined course of action when sudden external market conditions fluctuate drastically prevents managers from taking necessary emergency initiatives"),
        ("Planning may not work in a dynamic environment", "rapid technological obsolescence and shifting consumer habits make long-term future assumptions obsolete"),
        ("Planning reduces creativity", "middle managers and operatives merely follow pre-established guidelines without exercising personal ingenuity or innovation"),
        ("Planning involves huge costs", "extensive collection of market intelligence, boardroom consultations, and statistical projections consume substantial financial resources"),
        ("Planning is a time-consuming process", "elaborate forecasting and consensus-building cause delays that may lead to missed commercial opportunities"),
        ("Planning does not guarantee success", "managers often rely complacently on previously successful plans that fail when applied in changed market contexts"),
        ("Planning provides direction", "by stating in advance how work is to be done, planning provides direction for action so employees know what they are working towards"),
        ("Planning reduces risks of uncertainty", "by anticipating changes and developing managerial responses, planning reduces unpredictable risks"),
        ("Planning reduces overlapping and wasteful activities", "coordinating activities across departments eliminates chaos, duplication of effort, and resource waste"),
        ("Planning promotes innovative ideas", "since planning is thinking in advance, it stimulates creative minds to discover newer, better methods of operation"),
        ("Planning facilitates decision making", "by evaluating alternatives against predetermined criteria, planning helps managers make rational, objective decisions"),
        ("Planning establishes standards for controlling", "without planned targets, there are no benchmarks against which actual performance can be measured and evaluated"),
        ("False sense of security", "managers assume that because a comprehensive plan has been drafted, future success is guaranteed automatically"),
        ("Environmental turbulence disrupting plans", "unforeseen natural disasters, wars, or sudden legal bans making meticulous five-year plans invalid"),
        ("Top-down planning stifling initiative", "when plans are dictated strictly from headquarters, branch managers lose enthusiasm and act merely as mechanical executors"),
        ("Excessive cost of professional consultants", "spending crores on external strategy consulting firms for long-range forecasts that prove inaccurate"),
        ("Planning overcoming departmental friction", "aligning marketing and manufacturing targets in advance to eliminate inter-departmental finger-pointing"),
        ("Anticipating raw material shortages", "forecasting supply bottlenecks and arranging alternate vendor contracts to prevent assembly line stoppages"),
        ("Systematic vs Intuitive decision making", "planning replaces hasty trial-and-error decisions with disciplined analysis of alternatives"),
        ("Prerequisite for managerial controlling", "controlling is blind without planning standards, just as planning is meaningless without controlling feedback")
    ]
    pli = plan_lim_imp[m - 1]
    qs.append({
        "qNum": 14,
        "chapter": "Planning",
        "topic": "Planning: Importance and Limitations",
        "subtopic": pli[0],
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"In a corporate retrospective review at {co}, a senior director notes: '{pli[1]}'. Which recognized limitation or importance of Planning is illustrated?",
        "options": [
            ("A", pli[0], True, f"None - exact NCERT importance/limitation: {pli[0]}."),
            ("B", "Statutory Requirement under CPA 2019", False, "Irrelevant law."),
            ("C", "Taylor's Differential Piece Rate Bonus", False, "Taylor's wage system."),
            ("D", "Informal Grapevine Resistance", False, "Informal communication concept.")
        ],
        "sol": f"The scenario highlights '{pli[0]}', a key behavioral and organizational aspect of planning in NCERT."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q15: Elements of Delegation (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    del_elements = [
        ("Principle of Absoluteness of Accountability", "a manager can delegate authority and entrust responsibility to a subordinate, but the manager remains completely answerable to their own superior for the final outcome"),
        ("Parity of Authority and Responsibility", "an employee entrusted with a responsibility must be granted adequate authority to carry it out; responsibility without authority causes frustration, while authority without responsibility causes misuse"),
        ("Authority flows downwards", "authority originates at the top level of management and flows downward from superior to subordinate through the scalar chain"),
        ("Responsibility flows upwards", "responsibility is an obligation to perform the assigned task and flows upwards from subordinate to superior"),
        ("Accountability flows upwards", "accountability is being answerable for the final result and flows strictly upwards from subordinate to superior"),
        ("Authority can be delegated, but accountability cannot", "while a marketing director can delegate sales calls to field officers, the director remains legally and managerially accountable to the CEO for meeting total targets"),
        ("Delegation as an operational necessity", "no individual can perform all the work required in an expanding organization, making delegation a vital administrative tool"),
        ("Scope of delegation", "delegation has a narrow scope because it is a process between two individuals (superior and subordinate)"),
        ("Delegation leads to subordinate development", "giving subordinates authority to handle tasks develops their skills, initiative, and decision-making judgment"),
        ("Delegation provides relief to top executives", "by delegating routine operational chores to subordinates, executives can focus on strategic enterprise planning"),
        ("Delegation facilitates organizational growth", "having a reserve of experienced subordinates who have exercised authority enables the firm to expand into new ventures smoothly"),
        ("Delegation establishes formal hierarchy", "the flow of authority and responsibility defines who reports to whom and creates the structural backbone of the organization"),
        ("Delegation motivates employees", "entrusting authority and responsibility fulfills psychological esteem needs and improves worker commitment"),
        ("Accountability cannot be abdicated", "a superior who blames their subordinate for a botched corporate presentation remains fully accountable to the board"),
        ("Authority is legitimate and formal", "authority is the right to give orders and the power to exact obedience derived from the formal position in the organization"),
        ("Responsibility arises from authority", "when a subordinate accepts authority to deploy company funds, they simultaneously incur an obligation to perform the task"),
        ("Limits of delegated authority", "delegated authority is not absolute; it is bounded by written job descriptions, rules, and spending thresholds"),
        ("Hesitation to delegate due to fear", "a manager who refuses to delegate due to fear that subordinates may outperform them damages managerial efficiency"),
        ("Parity violation causing operational standstill", "instructing a site engineer to complete construction in 30 days while denying authority to procure cement locally"),
        ("Delegation vs Decentralisation", "delegation is an individual process of sharing authority, whereas decentralisation is a company-wide philosophy of dispersing authority throughout all levels")
    ]
    de = del_elements[m - 1]
    qs.append({
        "qNum": 15,
        "chapter": "Organising",
        "topic": "Delegation",
        "subtopic": de[0],
        "archetype": "conceptual-application",
        "difficulty": 3,
        "skillTested": "Understanding",
        "stem": f"Which fundamental tenet regarding the Elements of Delegation is highlighted by the statement: '{de[1]}'?",
        "options": [
            ("A", de[0], True, f"None - exact NCERT delegation tenet: {de[0]}."),
            ("B", "Complete Legal Immunity of Superiors", False, "Accountability is absolute; superiors cannot claim immunity from subordinate failures."),
            ("C", "Taylor's Functional Foremanship Division", False, "Shop-floor supervisory technique."),
            ("D", "Statutory Dissolution of Formal Authority", False, "Absurd distractor.")
        ],
        "sol": f"The scenario illustrates '{de[0]}', a cornerstone principle of delegation in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q16: Span of Management & Organizational Structure (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    span_data = [
        ("Span of Management", "the number of subordinates that can be effectively managed and supervised by a superior"),
        ("Span determines organizational levels", "a narrow span of control creates a tall organizational structure with many hierarchical levels, while a wide span creates a flat structure"),
        ("Narrow Span: Increased overhead cost", "having very few subordinates per manager requires hiring numerous middle managers, inflating administrative payroll costs"),
        ("Wide Span: Faster communication", "a flat structure with fewer levels reduces bureaucratic filters and speeds up upward and downward communication"),
        ("Functional Departmentalisation", "grouping jobs of similar nature under major enterprise functions like production, marketing, finance, and HR"),
        ("Divisional Departmentalisation", "grouping activities into self-contained units based on separate product lines (e.g. cosmetics, textiles, pharmaceuticals)"),
        ("Territorial / Geographic Departmentalisation", "grouping departments according to geographical territories (e.g. Northern Zone, Western Zone, Southern Zone)"),
        ("Customer Departmentalisation", "structuring departments around customer classes (e.g. wholesale, retail, institutional, government buyers)"),
        ("Process Departmentalisation", "grouping activities based on physical production processes (e.g. spinning, weaving, dyeing, printing, packaging)"),
        ("Factors determining Span: Competence of subordinates", "highly trained, experienced subordinates require less direct supervision, allowing a wider span of management"),
        ("Factors determining Span: Nature of work", "routine, standardized, repetitive tasks permit a wide span, whereas complex, novel, specialized tasks require a narrow span"),
        ("Factors determining Span: Quality of planning", "clear standing policies, procedures, and rules reduce the need for frequent supervisory guidance, facilitating a wider span"),
        ("Tall structure communication distortion", "messages traveling through 8 levels of hierarchy suffer severe distortion, filtering, and delay"),
        ("Flat structure managerial overload", "a manager supervising 25 subordinates may become overwhelmed with operational consultations, neglecting strategic planning"),
        ("Divisional structure suitability", "most suitable for large organizations with diversified multi-product lines requiring product specialization"),
        ("Functional structure suitability", "most suitable for single-product or homogeneous enterprises requiring deep occupational specialization"),
        ("Divisional structure profit accountability", "clear accountability can be fixed on each division head for their product line's revenues and costs"),
        ("Functional structure inter-departmental silos", "functional heads may focus on departmental prestige rather than corporate objectives"),
        ("Duplication of physical facilities in divisional structure", "each product division maintains its own separate R&D, marketing, and accounting units, increasing total overhead"),
        ("Structural evolution from Functional to Divisional", "as a single-product enterprise expands and diversifies into unrelated product lines, it must transition from functional to divisional structure")
    ]
    sd = span_data[m - 1]
    qs.append({
        "qNum": 16,
        "chapter": "Organising",
        "topic": "Organising: Structure and Span of Management",
        "subtopic": sd[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In evaluating organizational design, an administrative consultant notes: '{sd[1]}'. Which structural concept or consequence is being described?",
        "options": [
            ("A", sd[0], True, f"None - exact NCERT structural tenet: {sd[0]}."),
            ("B", "Informal Grapevine Network", False, "Grapevine is informal communication."),
            ("C", "Taylor's Differential Piece Rate Bonus", False, "Taylor's incentive system."),
            ("D", "SEBI Demat Delivery Instruction", False, "Financial market procedure.")
        ],
        "sol": f"This statement directly examines '{sd[0]}' from NCERT Class 12 Organising chapter."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q17: Formal vs Informal Organisation (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    form_inform = [
        ("Informal Organisation: Origin", "arises spontaneously within the formal enterprise due to personal social interactions, common interests, and friendships among employees"),
        ("Formal Organisation: Origin", "deliberately created by top management to accomplish specified organizational objectives through official rules and procedures"),
        ("Authority flow in Informal Organisation", "authority arises out of personal qualities, social prestige, and peer acceptance, flowing horizontally or diagonally rather than scalar lines"),
        ("Authority flow in Formal Organisation", "authority arises strictly by virtue of position in the organizational hierarchy and flows vertically downwards"),
        ("Behavior in Informal Organisation", "there are no rigid written rules; behavioral norms emerge through mutual social consensus and peer culture"),
        ("Behavior in Formal Organisation", "individual behavior is governed by written rules, job descriptions, procedures, and official policies"),
        ("Communication in Informal Organisation: Grapevine", "communication does not follow scalar lines; it moves rapidly in all directions across the informal grapevine"),
        ("Communication in Formal Organisation", "communication follows official scalar chains and pre-determined reporting lines"),
        ("Leadership in Informal Organisation", "leaders are chosen spontaneously by group members based on social influence rather than official rank"),
        ("Leadership in Formal Organisation", "managers are appointed formally by higher authority and possess formal positional power"),
        ("Advantage of Informal Organisation: Psychological satisfaction", "provides a sense of belonging, reduces workplace boredom, and satisfies social and affiliation needs"),
        ("Advantage of Informal Organisation: Speed of communication", "information travels much faster through the grapevine than through formal scalar memos"),
        ("Limitation of Informal Organisation: Spreading rumors", "unverified rumors and misinformation can spread rapidly, damaging employee morale and productivity"),
        ("Limitation of Informal Organisation: Resistance to change", "informal groups may resist management initiatives (such as automation) if perceived as threats to social norms"),
        ("Limitation of Informal Organisation: Conformity pressure", "informal groups can pressure individual members to conform to group output norms, restricting productivity"),
        ("Integrating Formal and Informal Networks", "smart managers do not suppress informal groups; they align them constructively with organizational goals"),
        ("Grapevine Network: Single Strand Chain", "information passes from one person to another in a single sequential line"),
        ("Grapevine Network: Gossip Chain", "one individual communicates information non-selectively to everyone else in the group"),
        ("Grapevine Network: Probability Chain", "an individual randomly communicates information to anyone, and those individuals pass it on randomly"),
        ("Grapevine Network: Cluster Chain", "an individual shares information with selected trusted confidants, who in turn share it with their own trusted confidants (most common)")
    ]
    fi = form_inform[m - 1]
    qs.append({
        "qNum": 17,
        "chapter": "Organising",
        "topic": "Formal and Informal Organisation",
        "subtopic": fi[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"Consider the following workplace observation: '{fi[1]}'. This characteristic or phenomenon belongs to which aspect of organizational sociology according to NCERT?",
        "options": [
            ("A", fi[0], True, f"None - exact NCERT concept: {fi[0]}."),
            ("B", "SEBI Primary Market Prospectus Verification", False, "Capital market regulatory rule."),
            ("C", "Taylor's Functional Foremanship Scheduling", False, "Factory floor technique."),
            ("D", "Consumer Protection Pecuniary Ceiling", False, "Consumer court topic.")
        ],
        "sol": f"This observation directly analyzes '{fi[0]}' under NCERT Class 12 Organising."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q18: Recruitment Sources & Process (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    rec_sources = [
        ("Internal Source: Transfers", "shifting an employee from one job to another, or from one department to another, without a significant change in responsibilities or pay"),
        ("Internal Source: Promotions", "shifting an employee to a higher position carrying greater responsibilities, prestige, facilities, and higher pay"),
        ("Merit of Internal Recruitment: Motivation", "promotions motivate employees to improve performance and enhance loyalty towards the enterprise"),
        ("Merit of Internal Recruitment: Cheaper and simpler", "selection and onboarding costs are minimal, and the employee's track record is already verified"),
        ("Demerit of Internal Recruitment: Inbreeding", "infusion of fresh talent and outside ideas is blocked when all vacancies are filled exclusively from within"),
        ("Demerit of Internal Recruitment: Lethargy", "employees become complacent when promotions are based strictly on seniority rather than merit"),
        ("External Source: Direct Recruitment", "placing a notice on the factory noticeboard specifying vacancies, attracting casual or unskilled workers gathered outside"),
        ("External Source: Casual Callers", "maintaining a database of unsolicited walk-in job seekers and contacting them when vacancies arise"),
        ("External Source: Media Advertising", "advertising vacancies in national newspapers, technical trade journals, and professional magazines to attract a wide pool of qualified applicants"),
        ("External Source: Employment Exchange", "government-run employment exchanges matching unskilled and skilled job seekers with private and public sector vacancies"),
        ("External Source: Placement Agencies & Management Consultants", "specialized private firms that nationwide screen and recruit middle and top-level executive talent for corporate clients"),
        ("External Source: Campus Recruitment", "recruiting technical and managerial graduates directly from universities, engineering colleges, and management institutes"),
        ("External Source: Recommendations of Employees", "recruiting applicants recommended by existing staff, ensuring background reliability and social alignment"),
        ("External Source: Labour Contractors", "contractors who recruit and supply specialized contract labor to industrial construction and infrastructure projects"),
        ("External Source: Web Publishing", "using specialized internet job portals (e.g. Naukri, LinkedIn) to post vacancies and receive digital candidate profiles"),
        ("Merit of External Recruitment: Fresh Talent", "brings in new perspectives, modern specialized skills, and innovative approaches from the wider market"),
        ("Merit of External Recruitment: Wider Choice", "generates a large applicant pool, giving the enterprise a wide selection of qualified candidates"),
        ("Demerit of External Recruitment: Dissatisfaction among existing staff", "existing employees feel aggrieved and demoralized when leadership roles are awarded to outsiders"),
        ("Demerit of External Recruitment: Lengthy and expensive", "advertising, screening, aptitude testing, and interviewing require substantial expenditure and time"),
        ("Recruitment vs Selection", "Recruitment is a positive search process of creating an applicant pool, whereas Selection is a negative process of eliminating unqualified applicants")
    ]
    rs = rec_sources[m - 1]
    qs.append({
        "qNum": 18,
        "chapter": "Staffing",
        "topic": "Recruitment",
        "subtopic": rs[0],
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"When {co} seeks to fill operational vacancies, the HR team uses the following practice: '{rs[1]}'. Which recruitment source or tenet is represented?",
        "options": [
            ("A", rs[0], True, f"None - exact NCERT recruitment source: {rs[0]}."),
            ("B", "Informal Grapevine Recruitment", False, "Grapevine is an informal communication network, not a formal recruitment channel."),
            ("C", "Taylor's Differential Wage Scale", False, "Taylor's compensation system."),
            ("D", "Consumer Protection Redressal", False, "Consumer court topic.")
        ],
        "sol": f"The scenario highlights '{rs[0]}', one of the recognized recruitment sources in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q19: Selection Process & Selection Tests (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    sel_tests = [
        ("Intelligence Test", "measures the candidate's level of intelligence quotient (IQ), memory, reasoning power, and capacity to learn new concepts"),
        ("Aptitude Test", "measures the candidate's potential and latent capacity for learning new skills and developing future competencies"),
        ("Personality Test", "probes the candidate's emotional balance, maturity, temperament, attitudes, and interpersonal value systems"),
        ("Trade Test", "measures the existing technical knowledge, practical proficiency, and job skills already possessed by the candidate"),
        ("Interest Test", "identifies the candidate's specific areas of interest, occupational hobbies, and personal vocational fascinations"),
        ("Preliminary Screening", "filtering out unqualified or unfit applicants based on basic details provided in application forms"),
        ("Employment Interview", "a formal, in-depth conversation between candidate and interview panel to judge suitability and answer queries"),
        ("Reference and Background Checks", "contacting previous employers, university professors, and professional referees to verify character and past conduct"),
        ("Selection Decision", "making the final choice among candidates who passed tests, interviews, and reference checks with inputs from departmental managers"),
        ("Medical Examination", "ensuring the candidate is physically and mentally fit to perform job duties before the appointment is finalized"),
        ("Job Offer", "issuing a formal letter of appointment specifying the reporting date, terms, and initial joining instructions"),
        ("Contract of Employment", "drafting a formal legal document containing job title, duties, remuneration, leave rules, disciplinary code, and termination clauses"),
        ("Selection as a Negative Process", "because at each stage of the process, unqualified candidates are eliminated, leaving only the best candidates at the end"),
        ("Trade Test vs Aptitude Test", "a Trade Test measures current existing technical skill, whereas an Aptitude Test measures future capacity to learn new skills"),
        ("Personality Test complexity", "personality tests are difficult to design and score objectively because human emotions cannot be evaluated in rigid quantitative terms"),
        ("Sequential order of Selection", "Preliminary Screening -> Selection Tests -> Employment Interview -> References -> Selection Decision -> Medical -> Job Offer -> Contract"),
        ("Reference Check Legal Importance", "verifying that candidate has no pending criminal investigations or fake educational degrees"),
        ("Medical fitness in hazardous industries", "ensuring chemical factory operators have no respiratory or cardiovascular ailments"),
        ("Structured vs Unstructured Interviews", "structured interviews use standardized questions to avoid interviewer bias and ensure fair evaluation"),
        ("Attracting talent through professional selection", "a transparent, objective selection process enhances the employer's reputation in the corporate talent market")
    ]
    st = sel_tests[m - 1]
    qs.append({
        "qNum": 19,
        "chapter": "Staffing",
        "topic": "Selection",
        "subtopic": st[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In a corporate staffing process, an evaluation instrument or step is described as: '{st[1]}'. Which selection test or stage in the selection process is this?",
        "options": [
            ("A", st[0], True, f"None - exact NCERT selection concept: {st[0]}."),
            ("B", "Taylor's Time-Study Standard", False, "Work measurement technique."),
            ("C", "Fayol's Centralisation Principle", False, "Administrative principle."),
            ("D", "SEBI Demat Custody Transfer", False, "Financial market procedure.")
        ],
        "sol": f"This procedure corresponds to '{st[0]}' under the Selection Process in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q20: Training & Development Methods (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    train_methods = [
        ("Vestibule Training", "an off-the-job training method where trainees learn on identical duplicate machines in a simulated workshop away from the actual factory floor to avoid damaging expensive equipment"),
        ("Apprenticeship Training", "an on-the-job method where a trainee works under direct guidance of a master craftsman for a prescribed period to master technical trades (e.g. electricians, plumbers)"),
        ("Internship Training", "a cooperative educational arrangement where educational institutes partner with business enterprises to provide practical field experience alongside classroom theory"),
        ("Job Rotation", "systematically shifting a trainee from one department or job to another to provide broad multi-functional experience and end-to-end operational understanding"),
        ("Induction / Orientation Training", "introducing newly hired employees to the organization, company culture, colleagues, physical facilities, and corporate rules"),
        ("Coaching and Mentoring", "a senior manager guides, counsels, and provides ongoing operational feedback to a junior executive to develop leadership competencies"),
        ("Classroom Lectures and Conferences", "an off-the-job method utilizing structured lectures, audiovisuals, and seminars to convey complex theoretical concepts to large groups"),
        ("Case Study Method", "trainees analyze simulated real-world business problems, debate strategic options, and present managerial solutions"),
        ("Computer Modelling", "simulating work environments on computers to train operators in handling complex risk scenarios (e.g. flight simulators)"),
        ("In-Basket Exercise", "trainees are given an incoming basket of urgent memos, emails, and phone messages to prioritize and resolve within a strict time limit"),
        ("Training vs Development", "Training is a process of learning specific skills for current job efficiency, whereas Development is an ongoing process of holistic personal and managerial career growth"),
        ("Benefits of Training to Organization: Higher productivity", "trained workers produce higher quantity and superior quality output, minimizing machine breakdowns and scrap"),
        ("Benefits of Training to Organization: Reduces absenteeism", "improves employee job satisfaction and morale, leading to lower turnover and reduced absenteeism"),
        ("Benefits of Training to Organization: Effective response to change", "equips existing staff to adapt smoothly to new technologies and modern methods"),
        ("Benefits of Training to Employee: Improved earning capacity", "higher skills and productivity enable workers to earn higher piece-rate wages and bonuses"),
        ("Benefits of Training to Employee: Safety and accident prevention", "understanding machine operations thoroughly reduces workplace accidents and physical injuries"),
        ("Benefits of Training to Employee: Career advancement", "acquiring advanced competencies qualifies workers for promotions to supervisory and managerial roles"),
        ("Simulated Flight Simulator Training", "this is an example of Vestibule / Computer Simulation training, allowing pilots to practice emergencies without risking passenger lives"),
        ("Understudy Assignment", "a trainee is designated as the assistant to a senior manager to absorb decision-making skills before taking over full responsibilities"),
        ("Continuous Skill Upgradation", "rapid technological evolution makes training an ongoing lifelong investment rather than a one-time onboarding chore")
    ]
    tm = train_methods[m - 1]
    qs.append({
        "qNum": 20,
        "chapter": "Staffing",
        "topic": "Training and Development",
        "subtopic": tm[0],
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"When human resource development in {co} implements the practice of: '{tm[1]}', which training method, distinction, or benefit is being highlighted?",
        "options": [
            ("A", tm[0], True, f"None - exact NCERT training concept: {tm[0]}."),
            ("B", "Taylor's Differential Piece Wage Deduction", False, "Taylor's wage system."),
            ("C", "Consumer Commission Summary Trial", False, "Consumer court legal procedure."),
            ("D", "Statutory Annual General Meeting Protocol", False, "Corporate law governance.")
        ],
        "sol": f"This program represents '{tm[0]}', a recognized training concept in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q21: Leadership Styles (20 distinct scenarios & concepts)
    # ─────────────────────────────────────────────────────────────────────────────
    lead_styles = [
        ("Autocratic / Authoritarian Leadership", "the leader gives orders and insists that they are obeyed without subordinate consultation, centralizing all decision-making authority"),
        ("Democratic / Participative Leadership", "the leader consults subordinates, encourages participation in decision-making, and respects group consensus while maintaining guidance"),
        ("Laissez-faire / Free-rein Leadership", "the leader gives complete autonomy and decision-making freedom to subordinates, acting mainly as a liaison to supply needed resources"),
        ("Autocratic: Suitability in Emergency", "most effective during urgent crisis situations where immediate, decisive action is required without time for group debates"),
        ("Democratic: High Morale and Commitment", "involving workers in formulating work schedules boosts employee motivation, job satisfaction, and ownership of results"),
        ("Laissez-faire: Suitability for R&D Specialists", "most suitable when managing highly specialized scientists, software architects, or artists who thrive on complete professional freedom"),
        ("Autocratic: Risk of Low Subordinate Morale", "leads to frustration, fear, lack of initiative, and high employee turnover due to strict one-way command"),
        ("Democratic: Slower Decision-Making", "consultation and consensus building across multiple team members can delay execution in fast-moving market situations"),
        ("Laissez-faire: Risk of Chaos without Self-Discipline", "if subordinates lack self-discipline or competence, complete detachment from the leader produces directionless confusion"),
        ("Paternalistic Leadership", "the leader acts as a parental figure, guiding subordinates kindly while expecting total personal loyalty"),
        ("Leadership vs Management", "management relies on formal positional authority and administrative control, whereas leadership is the ability to influence others voluntarily towards goals"),
        ("Qualities of an Effective Leader: Empathy", "understanding subordinate perspectives, emotional needs, and personal aspirations to inspire genuine loyalty"),
        ("Qualities of an Effective Leader: Decisiveness", "the capacity to make firm, objective decisions without vacillation once facts have been analyzed"),
        ("Qualities of an Effective Leader: Communication skills", "the ability to clearly articulate a compelling vision and listen patiently to subordinate feedback"),
        ("Situational Leadership", "an effective leader does not stick rigidly to one style; they adapt between autocratic, democratic, and free-rein based on task complexity and follower maturity"),
        ("Communication Flow in Autocratic Leadership", "strictly one-way downward communication with negligible upward feedback"),
        ("Communication Flow in Democratic Leadership", "two-way interactive communication with healthy upward suggestions and open dialogue"),
        ("Communication Flow in Laissez-faire Leadership", "free horizontal and diagonal communication among group members with minimal supervisory intervention"),
        ("Transformational Vision in Leadership", "inspiring workers to transcend personal self-interest for the noble vision of transforming the enterprise and society"),
        ("Building Trust through Integrity", "leaders gain enduring moral authority when their personal conduct aligns transparently with their stated ethical standards")
    ]
    ls = lead_styles[m - 1]
    qs.append({
        "qNum": 21,
        "chapter": "Directing",
        "topic": "Leadership",
        "subtopic": ls[0],
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"In {co}, a project director's leadership approach is observed as: '{ls[1]}'. Which leadership style, characteristic, or tenet is demonstrated?",
        "options": [
            ("A", ls[0], True, f"None - exact NCERT leadership concept: {ls[0]}."),
            ("B", "Taylor's Functional Foremanship Supervision", False, "Taylor's factory supervisory system."),
            ("C", "Statutory Corporate Directorship Mandate", False, "Companies Act requirement."),
            ("D", "SEBI Primary Market Underwriting Protocol", False, "Financial market procedure.")
        ],
        "sol": f"The scenario portrays '{ls[0]}', a recognized leadership dimension in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q22: Communication Process & Barriers (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    comm_barriers = [
        ("Semantic Barrier: Badly expressed message", "inadequate vocabulary, usage of wrong words, omission of necessary terms, or awkward sentence structure"),
        ("Semantic Barrier: Symbols with different meanings", "a single word having multiple connotations misinterpreted by the receiver (e.g. 'value' as price vs moral principle)"),
        ("Semantic Barrier: Faulty translations", "drafting a technical manual in English and translating it poorly into regional languages, altering operative instructions"),
        ("Semantic Barrier: Unclarified assumptions", "a message having implicit assumptions that the sender assumes the receiver knows, causing divergent actions"),
        ("Semantic Barrier: Technical jargon", "specialists using complex technical acronyms and engineering terms that common operatives cannot understand"),
        ("Semantic Barrier: Body language and gesture decoding", "incongruence between spoken words and facial expressions, creating confusion regarding the sender's true intent"),
        ("Psychological Barrier: Premature evaluation", "evaluating the meaning of a message before the sender completes transmission due to preconceived bias or prejudice"),
        ("Psychological Barrier: Lack of attention", "preoccupied mind of the receiver failing to absorb spoken instructions (e.g. an employee worried over illness)"),
        ("Psychological Barrier: Loss by transmission and poor retention", "messages passing through multiple human channels losing accuracy; employees retaining only a fraction of verbal instructions"),
        ("Psychological Barrier: Distrust", "mutual suspicion between superior and subordinate causing both parties to read hidden ulterior motives into messages"),
        ("Organisational Barrier: Organisational policy", "an explicit policy that does not support free and open communication, stifling the upward flow of operational feedback"),
        ("Organisational Barrier: Rules and regulations", "rigid formal procedural rules requiring all communication to move through prescribed multi-tier scalar channels, causing delays"),
        ("Organisational Barrier: Status difference", "status consciousness of a superior creating a psychological distance that intimidates subordinates from expressing candid views"),
        ("Organisational Barrier: Complex organizational structure", "having too many administrative tiers filters and delays information, diluting the essence of the message"),
        ("Organisational Barrier: Lack of organizational facilities", "absence of suggestion boxes, complaint cells, open forums, or social gatherings to facilitate upward communication"),
        ("Personal Barrier of Superior: Fear of challenge to authority", "a superior withholding communication or feedback out of fear of exposing their own operational ignorance"),
        ("Personal Barrier of Superior: Lack of confidence in subordinates", "superiors believing subordinates lack capability, ignoring their operational advice and suggestions"),
        ("Personal Barrier of Subordinate: Unwillingness to communicate", "subordinates deliberately concealing bad news or defects out of fear of disciplinary retribution"),
        ("Personal Barrier of Subordinate: Lack of proper incentive", "subordinates not sharing innovative ideas because the organization provides no reward or recognition for suggestions"),
        ("Measure to Overcome Barriers: Active Listening", "a manager being a patient, empathetic listener to absorb employee perspectives before framing managerial responses")
    ]
    cb = comm_barriers[m - 1]
    qs.append({
        "qNum": 22,
        "chapter": "Directing",
        "topic": "Communication",
        "subtopic": cb[0],
        "archetype": "conceptual-application",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": f"In a corporate operational audit, a communication breakdown is traced to: '{cb[1]}'. This impediment is classified under which category of Communication Barriers in NCERT?",
        "options": [
            ("A", cb[0], True, f"None - exact NCERT classification: {cb[0]}."),
            ("B", "Taylor's Shop-Floor Inefficiency Metric", False, "Taylor's work measurement concept."),
            ("C", "Statutory Consumer Dispute Jurisdictional Bar", False, "Consumer court law."),
            ("D", "Capital Structure Flotation Friction", False, "Financial management concept.")
        ],
        "sol": f"This impediment is officially categorized under '{cb[0]}' in NCERT Class 12 Directing chapter."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q23: Motivation & Maslow's Need Hierarchy (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    maslow_needs = [
        ("Physiological Needs", "basic survival needs including food, clothing, shelter, water, and sleep; fulfilled in business through fair basic pay and working conditions"),
        ("Safety / Security Needs", "protection from physical hazards, economic threats, job security, stability of income, pension plans, and insurance"),
        ("Affiliation / Belongingness Needs", "social affection, acceptance, friendship, and cordial relationships with work colleagues and peer groups"),
        ("Esteem Needs", "self-respect, autonomy, status, recognition, prestige, and appreciation from superiors and society"),
        ("Self-Actualisation Needs", "the drive to become what one is capable of becoming, personal growth, creative self-fulfillment, and realizing full potential"),
        ("Maslow's Assumption: Hierarchy of Needs", "human needs follow a definite hierarchy, starting from physiological and moving upwards to self-actualisation"),
        ("Maslow's Assumption: Satisfied Need ceases to motivate", "a satisfied need no longer motivates behavior; only the next higher-level unsatisfied need motivates the individual"),
        ("Maslow's Assumption: Sequence of Satisfaction", "an individual moves up the hierarchy only after the lower-level need is reasonably satisfied"),
        ("Financial Incentive: Profit Sharing", "allocating a predetermined percentage of corporate net profits to employees to build partnership and loyalty"),
        ("Financial Incentive: Co-partnership / Stock Option", "allotting company equity shares at a price below current market price (ESOP) to create ownership pride"),
        ("Financial Incentive: Productivity-Linked Wage Incentive", "linking worker wage payments directly to individual or group production output"),
        ("Financial Incentive: Retirement Benefits", "provident fund, gratuity, and pension schemes offering financial security post-retirement"),
        ("Financial Incentive: Perquisites", "fringe benefits such as company car, free housing, medical allowances, and children education allowances"),
        ("Non-Financial Incentive: Status", "conferring managerial rank, prestigious designations, authority, and exclusive office privileges"),
        ("Non-Financial Incentive: Organisational Climate", "fostering employee autonomy, reward orientation, mutual trust, and risk-taking environment"),
        ("Non-Financial Incentive: Career Advancement Opportunity", "providing promotional pathways, technical skill upgrading, and executive career milestones"),
        ("Non-Financial Incentive: Job Enrichment", "designing jobs with greater variety of content, higher responsibility, and meaningful challenge"),
        ("Non-Financial Incentive: Employee Recognition Programmes", "publicly commending high performance, presenting certificates, awards, and employee-of-the-month honors"),
        ("Non-Financial Incentive: Job Security", "guaranteeing permanent tenure and stable employment, though excessive security may breed complacency"),
        ("Non-Financial Incentive: Employee Empowerment", "granting autonomy and decision-making power to subordinates, making them feel valued contributors")
    ]
    mn = maslow_needs[m - 1]
    qs.append({
        "qNum": 23,
        "chapter": "Directing",
        "topic": "Motivation",
        "subtopic": mn[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In an employee motivational analysis, an incentive or psychological need is described as: '{mn[1]}'. How is this classified under NCERT Class 12 motivation theories?",
        "options": [
            ("A", mn[0], True, f"None - exact classification: {mn[0]}."),
            ("B", "Taylor's Functional Foremanship Mandate", False, "Taylor's supervisory system."),
            ("C", "Statutory Consumer Redressal Relief", False, "Consumer court topic."),
            ("D", "SEBI Primary Market Underwriting Fee", False, "Financial market concept.")
        ],
        "sol": f"This corresponds to '{mn[0]}' in NCERT Class 12 Directing (Motivation)."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q24: Principles of Directing (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    dir_principles = [
        ("Maximum Individual Contribution", "directing techniques should inspire every employee to contribute their maximum potential towards organizational goals"),
        ("Harmony of Objectives", "integrating individual employee goals with organizational objectives so that fulfilling corporate goals satisfies personal aspirations"),
        ("Unity of Command", "an employee should receive directions and orders from only one superior to prevent dual subordination, confusion, and blame-shifting"),
        ("Appropriateness of Direction Technique", "matching motivational schemes, leadership styles, and communication channels to the specific needs and maturity of workers"),
        ("Managerial Communication", "effective two-way communication across all levels ensures instructions are clearly understood and operational feedback is absorbed"),
        ("Use of Informal Organisation", "management should recognize and constructively leverage informal groups and networks to support formal directives"),
        ("Follow Through", "directing does not end with issuing orders; managers must monitor execution, verify compliance, and provide ongoing guidance"),
        ("Direct Supervision", "personal face-to-face contact between supervisor and workers boosts morale and enables immediate resolution of doubts"),
        ("Pervasiveness of Directing", "directing takes place wherever superior-subordinate relationships exist, from the CEO down to shop-floor supervisors"),
        ("Directing initiates action", "while planning, organising, and staffing prepare the organizational stage, directing activates real physical work"),
        ("Integrating Diverse Workers", "directing harmonizes employees of different skill levels, backgrounds, and motivations into a unified operational force"),
        ("Overcoming Resistance to Change", "through effective leadership and communication, directing guides employees to accept technological and organizational transitions"),
        ("Stability and Balance in Organization", "directing maintains structural equilibrium by resolving interpersonal friction and aligning conflicting goals"),
        ("Heart of Management Function", "directing is often termed the heart of management because it deals directly with guiding, motivating, and leading human beings"),
        ("Human Factor in Directing", "unlike physical machines, human beings possess emotions, perceptions, and unpredictable reactions requiring empathetic direction"),
        ("Continuous Guidance", "directing is an ongoing continuous function; managers must guide and motivate workers throughout the enterprise lifecycle"),
        ("Leadership as Core of Directing", "without effective leadership, elaborate plans and structural charts remain lifeless pieces of paper"),
        ("Motivation as Internal Drive", "directing harnesses internal psychological drives to energize employees to exert sustained effort"),
        ("Supervisory Coaching on the Floor", "supervisors act as friends, philosophers, and guides to shop-floor workers, maintaining factory order"),
        ("Effective Feedback Loops", "ensuring that directives issued from top management are calibrated against frontline operational reality")
    ]
    dp = dir_principles[m - 1]
    qs.append({
        "qNum": 24,
        "chapter": "Directing",
        "topic": "Directing: Principles and Characteristics",
        "subtopic": dp[0],
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Understanding",
        "stem": f"A management manual at {co} articulates the following guideline: '{dp[1]}'. Which recognized principle or characteristic of Directing is emphasized?",
        "options": [
            ("A", dp[0], True, f"None - exact NCERT directing principle/feature: {dp[0]}."),
            ("B", "Taylor's Functional Foremanship Routing", False, "Taylor's shop-floor technique."),
            ("C", "CPA 2019 Pecuniary Threshold Rule", False, "Consumer court law."),
            ("D", "SEBI Demat Delivery Instruction", False, "Financial market procedure.")
        ],
        "sol": f"This guideline represents '{dp[0]}', a key principle of directing in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q25: Controlling - Deviation Analysis: CPC vs MBE (20 distinct scenarios)
    # ─────────────────────────────────────────────────────────────────────────────
    cpc_mbe = [
        ("Critical Point Control (CPC)", "focusing control efforts on Key Result Areas (KRAs) that are critical to the overall success of the enterprise"),
        ("Management by Exception (MBE)", "bringing only significant deviations that exceed predefined tolerance limits to the notice of top management"),
        ("Controlling everything ends in controlling nothing", "a fundamental tenet of deviation analysis asserting that attempting to control every minor detail dissipates managerial energy"),
        ("KRA: A 5% increase in labor cost vs 15% increase in stationery", "management focuses on labor cost because it represents a Key Result Area impacting overall profitability, illustrating CPC"),
        ("Tolerance Limit: Output deviation within +/- 2% permitted", "minor output fluctuations within 2% are handled by supervisors; deviations beyond 2% are reported to the GM, illustrating MBE"),
        ("Saves managerial time and effort", "a primary advantage of Management by Exception, freeing top executives to concentrate on strategic crises"),
        ("Focuses attention on critical profit drivers", "a primary advantage of Critical Point Control, ensuring high-value expenditures are rigorously audited"),
        ("Delegation of operational variance handling", "MBE enables middle managers to take routine corrective steps without seeking top-level clearances"),
        ("Materiality of deviation", "a deviation of Rs. 50,000 in raw material steel is far more critical than Rs. 50,000 in postage stamps"),
        ("Pre-established acceptable range of deviations", "setting clear tolerance limits so that normal operational variations do not trigger unnecessary alarms"),
        ("Analysing Causes of Deviations: Faulty standards", "if almost all workers fail to achieve standard output, the deviation cause may be an unrealistic standard rather than worker inefficiency"),
        ("Analysing Causes of Deviations: Machine defect", "if deviation occurs suddenly in a single bay, the cause may be machinery wear rather than human fault"),
        ("Analysing Causes of Deviations: Material defect", "substandard raw materials from a new vendor causing excessive scrap during machining"),
        ("Analysing Causes of Deviations: Defective process", "an outdated assembly line sequence causing unnecessary handling delays"),
        ("Analysing Causes of Deviations: Environmental factors", "sudden transport strikes or power grid failures halting production"),
        ("Corrective Action: Overhauling machinery", "repairing or upgrading worn-out equipment when deviation analysis identifies mechanical failure"),
        ("Corrective Action: Providing worker retraining", "organizing technical workshops when deviation analysis reveals operational skill deficits"),
        ("Corrective Action: Modifying standards", "lowering or raising benchmarks when external economic shifts make initial standards obsolete"),
        ("Distinguishing CPC and MBE", "CPC focuses on which specific operational areas are monitored, while MBE focuses on which magnitude of deviation is escalated"),
        ("Exception Reporting in Modern MIS", "automated ERP systems flagging red alerts only when key metrics breach predefined upper and lower control limits")
    ]
    cm = cpc_mbe[m - 1]
    qs.append({
        "qNum": 25,
        "chapter": "Controlling",
        "topic": "Controlling Process",
        "subtopic": cm[0],
        "archetype": "conceptual-scenario",
        "difficulty": 3,
        "skillTested": "Analysis",
        "stem": f"In {co}, the managerial control system operates according to the principle: '{cm[1]}'. Which concept or advantage of Deviation Analysis in Controlling is illustrated?",
        "options": [
            ("A", cm[0], True, f"None - exact NCERT deviation analysis concept: {cm[0]}."),
            ("B", "Taylor's Functional Foremanship Routing", False, "Taylor's shop-floor system."),
            ("C", "Statutory Auditor Discretionary Exemption", False, "Auditing legal standard."),
            ("D", "SEBI Demat Trading Freeze", False, "Stock market regulation.")
        ],
        "sol": f"This management approach directly illustrates '{cm[0]}' under NCERT Controlling Process."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q26: Controlling Process Steps (20 distinct sequence & step evaluation questions)
    # ─────────────────────────────────────────────────────────────────────────────
    ctl_steps = [
        ("Step 1: Setting Performance Standards", "establishing quantitative and qualitative benchmarks against which actual operational performance will be measured"),
        ("Step 2: Measurement of Actual Performance", "measuring real operational work achievements objectively using sample checks, personal observation, and performance reports"),
        ("Step 3: Comparison of Actual Performance with Standards", "comparing measured actual performance against pre-set standards to identify positive, zero, or negative deviations"),
        ("Step 4: Analysing Deviations", "investigating the causes and significance of deviations using Critical Point Control and Management by Exception"),
        ("Step 5: Taking Corrective Action", "initiating managerial actions to rectify deviations, modify standards, retrain staff, or repair equipment to ensure goals are met"),
        ("Correct Sequential Order of Controlling", "Setting Standards -> Measuring Performance -> Comparing Actual with Standards -> Analysing Deviations -> Taking Corrective Action"),
        ("Setting Quantitative Standards", "standards expressed in numerical figures (e.g. producing 500 units per day at Rs. 20 per unit) allowing precise comparison"),
        ("Setting Qualitative Standards", "standards for subjective factors (e.g. employee morale, customer goodwill) measured via customer satisfaction surveys"),
        ("Measurement Technique: Sample Checking", "inspecting randomly selected product units from production batches rather than examining 100% of units"),
        ("Measurement Technique: Personal Observation", "supervisors walking the shop floor to gain firsthand impression of worker discipline and machine operations"),
        ("Measurement Timing: During Operations vs Post-Action", "measuring progress while work is underway enables timely intervention before total batch failure"),
        ("Comparison reveals Zero Deviation", "when actual performance exactly matches standards, confirming that operations are running perfectly as planned"),
        ("Comparison reveals Positive Deviation", "when actual performance exceeds standards (e.g. sales of 12,000 units against target of 10,000 units)"),
        ("Comparison reveals Negative Deviation", "when actual performance falls below standards (e.g. producing 8,000 units against target of 10,000 units)"),
        ("Corrective Action not required", "when deviations are within acceptable tolerance limits, no corrective action is necessary"),
        ("Corrective Action required immediately", "when major deviations in Key Result Areas occur, urgent corrective action must be deployed"),
        ("Revising Standards Upward", "when workers consistently exceed standards easily, standards may need upward revision to reflect true capacity"),
        ("Forward-Looking Nature of Corrective Action", "taking corrective action prevents recurrence of errors in future operating cycles"),
        ("Closed-Loop Feedback in Controlling", "controlling data feeds back into the planning process to formulate more realistic future standards"),
        ("Role of Middle Managers in Controlling Process", "middle managers measure departmental output, compare variances, and enforce corrective training")
    ]
    cs = ctl_steps[m - 1]
    qs.append({
        "qNum": 26,
        "chapter": "Controlling",
        "topic": "Controlling Process",
        "subtopic": cs[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Recall",
        "stem": f"In an operational audit of a manufacturing plant, managers are engaged in: '{cs[1]}'. Which stage or tenet of the Controlling Process is being performed?",
        "options": [
            ("A", cs[0], True, f"None - exact step in NCERT controlling process: {cs[0]}."),
            ("B", "Planning Derivative Premises Formulation", False, "Planning step."),
            ("C", "Recruitment Advertising Media Selection", False, "Staffing step."),
            ("D", "SEBI IPO Prospectus Verification", False, "Capital market step.")
        ],
        "sol": f"This activity corresponds to '{cs[0]}' in the official NCERT Controlling Process."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q27: Planning and Controlling Relationship (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    plan_ctrl_rel = [
        ("Planning and Controlling are Inseparable Twins", "they are interdependent and interlinked; planning without controlling is meaningless, and controlling without planning is blind"),
        ("Controlling is blind without Planning", "if prior standards, targets, and benchmarks are not established through planning, a manager has nothing to compare actual performance against"),
        ("Planning is meaningless without Controlling", "if controlling does not measure actual achievements, plans remain mere academic exercises without execution assurance"),
        ("Planning is forward-looking, but also backward-looking", "planning looks forward to chart future paths, but looks backward to review historical performance data provided by controlling"),
        ("Controlling is backward-looking, but also forward-looking", "controlling looks backward to compare actual performance with past standards, but looks forward to guide future corrective actions"),
        ("Planning provides the standards for Controlling", "the objectives and budgets formulated during planning serve as the foundational benchmarks for controlling"),
        ("Controlling provides feedback for future Planning", "analysing deviations in controlling identifies flaws in planning premises, enabling more accurate future plans"),
        ("Prescriptive vs Evaluative Nature", "planning is prescriptive because it specifies what ought to be done, while controlling is evaluative because it assesses what was actually achieved"),
        ("Siamese Twins of Management", "a classic managerial metaphor highlighting that neither planning nor controlling can survive or function effectively in isolation"),
        ("Reinforcing Managerial Efficiency", "together, planning and controlling ensure that organizational resources are deployed purposefully and accounted for rigorously"),
        ("Dynamic Interplay during Crisis", "when controlling reveals sudden operational breakdowns, emergency planning must formulate revised courses of action immediately"),
        ("Strategic Alignment of Enterprise Goals", "planning aligns departmental targets; controlling audits whether departments maintain that alignment over time"),
        ("Eliminating Complacency", "regular controlling checks prevent employees from assuming that planning alone guarantees success"),
        ("Continuous Closed-Loop Management", "the managerial journey begins with planning, proceeds through execution, evaluates via controlling, and returns to revised planning"),
        ("Operational Standards as Yardsticks", "without planning yardsticks, controlling descends into arbitrary subjective policing"),
        ("Controlling validating Planning Premises", "controlling verifies whether economic and market forecasts assumed in planning actually held true"),
        ("Correcting Unrealistic Planning Standards", "when controlling reveals that every single branch failed targets, it signals that planning set unrealistic benchmarks"),
        ("Mutual Dependence across Management Tiers", "top managers plan corporate strategies and control solvency; middle managers plan departmental quotas and control variances"),
        ("Harmonizing Resources and Performance", "planning allocates resources; controlling ensures those resources generate the targeted returns"),
        ("Synchronized Management Control Systems", "modern enterprises integrate enterprise resource planning (ERP) with real-time controlling dashboards")
    ]
    pcr = plan_ctrl_rel[m - 1]
    qs.append({
        "qNum": 27,
        "chapter": "Controlling",
        "topic": "Controlling",
        "subtopic": pcr[0],
        "archetype": "conceptual-application",
        "difficulty": 3,
        "skillTested": "Understanding",
        "stem": f"Which fundamental principle governing the relationship between Planning and Controlling is highlighted by the statement: '{pcr[1]}'?",
        "options": [
            ("A", pcr[0], True, f"None - exact NCERT planning-controlling relationship: {pcr[0]}."),
            ("B", "Complete Independence of Planning from Controlling", False, "Planning and controlling are deeply interdependent."),
            ("C", "Controlling replaces Planning in Modern Automation", False, "Controlling cannot exist without planning standards."),
            ("D", "Taylor's Functional Foremanship Supremacy", False, "Irrelevant distractor.")
        ],
        "sol": f"This statement directly illustrates '{pcr[0]}', a core conceptual relationship in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q28: Importance & Limitations of Controlling (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    ctl_imp_lim = [
        ("Difficulty in setting quantitative standards", "it is extremely difficult to establish objective quantitative standards for qualitative aspects like employee morale, job satisfaction, and human behavior"),
        ("Little control over external environmental forces", "an enterprise cannot control external forces such as changes in government policies, technological disruptions, competitor moves, or market recessions"),
        ("Resistance from employees", "employees often resist control systems (such as CCTV surveillance, biometric time-tracking, or daily call quotas) perceiving them as restrictions on personal freedom"),
        ("Costly affair", "installing and maintaining elaborate control systems involves substantial financial expenditure on equipment, audit staff, and paperwork, which small firms cannot afford"),
        ("Accomplishing organizational goals", "controlling guides operational activities towards planned targets and brings deviations to light so corrective action can be taken"),
        ("Judging accuracy of standards", "an efficient control system enables managers to review whether initially established standards are accurate and realistic"),
        ("Making efficient use of resources", "controlling minimizes wastage, spoilage, and theft of materials, ensuring resources are utilized in the most efficient manner"),
        ("Improving employee motivation", "when employees know in advance what standards they are expected to hit and how they will be evaluated, their motivation and performance improve"),
        ("Ensuring order and discipline", "controlling creates an organizational atmosphere of order, reduces dishonesty, and curbs fraud through regular checks"),
        ("Facilitating coordination in action", "controlling coordinates departments by providing unified standards and ensuring each department performs in harmony with company goals"),
        ("Over-controlling dangers", "excessive microscopic supervision stifles subordinate initiative, damages creativity, and increases turnover"),
        ("Cost-Benefit test in control system design", "the cost of installing a control mechanism must not exceed the financial benefit derived from the control"),
        ("Surveillance vs Trust balance", "management must balance monitoring systems with mutual trust to avoid demoralizing skilled professionals"),
        ("Uncontrollability of statutory legal changes", "a sudden Supreme Court ban on single-use plastics cannot be prevented by internal factory quality controls"),
        ("Measuring Customer Goodwill", "customer brand perception is qualitative and resists simple daily quantitative measurement"),
        ("Behavioral resistance to biometric clocking", "workers striking against digital biometric check-ins illustrates employee resistance to new controls"),
        ("Small scale enterprise limitation", "a small bakery cannot afford full-time internal quality assurance auditors due to excessive payroll costs"),
        ("Maintaining factory discipline via sample checks", "regular random gate passes and inventory counts curb internal shop pilferage"),
        ("Early identification of flawed standards", "when 95% of machine operators fail standard targets, controlling prompts immediate review of standard accuracy"),
        ("Aligning operating units towards corporate mission", "controlling ensures that regional branches do not drift away from corporate strategic goals")
    ]
    cil = ctl_imp_lim[m - 1]
    qs.append({
        "qNum": 28,
        "chapter": "Controlling",
        "topic": "Controlling: Importance and Limitations",
        "subtopic": cil[0],
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In evaluating organizational control systems, {co}'s management notes: '{cil[1]}'. Which recognized limitation or importance of Controlling is highlighted?",
        "options": [
            ("A", cil[0], True, f"None - exact NCERT controlling importance/limitation: {cil[0]}."),
            ("B", "Taylor's Motion Study Standard", False, "Taylor's technique."),
            ("C", "Statutory Demat Custody Transfer", False, "Financial market process."),
            ("D", "CPA 2019 Mediation Mandate", False, "Consumer court rule.")
        ],
        "sol": f"The scenario highlights '{cil[0]}', a recognized importance or limitation of controlling in NCERT."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q29: Financial Decisions - Factors (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    fin_dec_factors = [
        ("Investment Decision: Cash Flows of the project", "evaluating the magnitude and timing of future cash inflows generated by an asset against the initial capital outlay"),
        ("Investment Decision: Rate of Return", "comparing expected percentage return of competing projects against the company's minimum required hurdle rate"),
        ("Investment Decision: Investment criteria involved", "performing calculations regarding payback period, net present value, and tax benefits on depreciation"),
        ("Financing Decision: Cost of capital", "debt is generally cheaper than equity due to lower lender risk and tax deductibility of interest"),
        ("Financing Decision: Financial Risk", "debt carries fixed contractual interest payments and principal repayment, increasing financial risk of default"),
        ("Financing Decision: Floatation Costs", "costs incurred in raising funds (underwriting, prospectus, brokerage) which are higher for public equity issues than debt"),
        ("Financing Decision: Cash Flow Position", "a company with strong, stable operating cash flows can comfortably service debt; weak cash flows favor equity"),
        ("Financing Decision: Fixed Operating Costs", "firms with high fixed operational expenses (rent, executive salaries) should avoid high debt to prevent excessive total financial risk"),
        ("Financing Decision: Control Consideration", "issuing new equity shares may dilute existing shareholder voting control, whereas debt involves zero voting dilution"),
        ("Financing Decision: State of Capital Market", "during a bullish stock market, investors eagerly buy equity shares; during a bearish market, raising equity is difficult"),
        ("Dividend Decision: Amount of Earnings", "dividends are paid out of current and past earnings; higher earnings enable higher potential dividends"),
        ("Dividend Decision: Stability of Earnings", "companies with stable, predictable earnings can declare higher and consistent dividends than firms with erratic earnings"),
        ("Dividend Decision: Stability of Dividends", "maintaining a steady dividend per share satisfies institutional investors and boosts share price stability"),
        ("Dividend Decision: Growth Opportunities", "firms with viable expansion projects retain larger profits and pay lower dividends to fund growth internally"),
        ("Dividend Decision: Cash Flow Position", "paying cash dividends requires liquid bank balances; profitable firms with cash tied up in debtors must conserve cash"),
        ("Dividend Decision: Shareholder Preference", "retired or middle-class shareholders often prefer regular cash income, influencing dividend payout ratios"),
        ("Dividend Decision: Taxation Policy", "dividend decisions are influenced by prevailing corporate tax rates and capital gains tax rules"),
        ("Dividend Decision: Stock Market Reaction", "investors view dividend increases as positive signals of corporate health, lifting market share prices"),
        ("Dividend Decision: Access to Capital Market", "large, established firms with easy access to capital markets can pay higher dividends as they can raise external funds easily"),
        ("Dividend Decision: Legal and Contractual Constraints", "Companies Act restrictions on dividend sources and restrictive loan covenants imposed by lenders")
    ]
    fdf = fin_dec_factors[m - 1]
    qs.append({
        "qNum": 29,
        "chapter": "Financial Management",
        "topic": "Financial Decisions",
        "subtopic": fdf[0],
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"In formulating long-term financial strategy, {co}'s CFO reviews: '{fdf[1]}'. Which recognized factor affecting Financial Decisions is illustrated?",
        "options": [
            ("A", fdf[0], True, f"None - exact NCERT financial decision factor: {fdf[0]}."),
            ("B", "Taylor's Functional Foremanship Routing", False, "Production supervision technique."),
            ("C", "Statutory Trademark Registration Clause", False, "Intellectual property law."),
            ("D", "Informal Grapevine Network", False, "Informal communication concept.")
        ],
        "sol": f"This situation analyzes '{fdf[0]}', a key determinant of corporate financial decisions in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q30: Fixed & Working Capital Determinants (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    cap_determinants = [
        ("Fixed Capital Determinant: Nature of Business", "a manufacturing enterprise requires heavy investment in land, building, and machinery, needing more fixed capital than a trading business"),
        ("Fixed Capital Determinant: Scale of Operations", "large-scale industrial operations require larger production capacities and heavier fixed asset investments"),
        ("Fixed Capital Determinant: Choice of Technique", "a capital-intensive manufacturing technique requires heavy machinery, demanding more fixed capital than a labor-intensive technique"),
        ("Fixed Capital Determinant: Technology Upgradation", "industries with rapid technological obsolescence (like semiconductors or electronics) require frequent fixed asset replacements"),
        ("Fixed Capital Determinant: Growth Prospects", "firms with high growth potential invest heavily in creating higher future production capacity"),
        ("Fixed Capital Determinant: Diversification", "diversifying from textiles into steel manufacturing requires establishing new factories and heavy plant assets"),
        ("Fixed Capital Determinant: Financing Alternatives (Leasing)", "availability of leasing facilities allows using assets by paying periodic rentals, reducing upfront fixed capital needs"),
        ("Fixed Capital Determinant: Collaboration", "sharing manufacturing facilities (e.g. telecom towers shared among operators) reduces fixed capital investment"),
        ("Working Capital Determinant: Length of Operating Cycle", "a longer operating cycle from raw material procurement to finished goods cash realization demands higher working capital"),
        ("Working Capital Determinant: Nature of Business (Trading vs Manufacturing)", "trading firms require smaller working capital since they hold inventory without processing, whereas manufacturing firms have longer cycles"),
        ("Working Capital Determinant: Scale of Operations", "larger scale requires maintaining larger inventories of raw materials and finished goods, increasing working capital"),
        ("Working Capital Determinant: Business Cycle (Boom vs Depression)", "during economic boom, sales surge requiring higher working capital; during depression, sales decline reducing inventory needs"),
        ("Working Capital Determinant: Seasonal Factors", "seasonal agricultural procurement requires heavy liquid funds during peak harvest months"),
        ("Working Capital Determinant: Credit Allowed to Customers", "a liberal credit policy allowing 90 days to buyers increases accounts receivable, requiring higher working capital"),
        ("Working Capital Determinant: Credit Availed from Suppliers", "securing liberal credit terms from raw material suppliers reduces the firm's need for liquid working capital"),
        ("Working Capital Determinant: Operating Efficiency", "efficient inventory turnover and prompt debtor collection compresses working capital requirements"),
        ("Working Capital Determinant: Availability of Raw Materials", "if raw materials are difficult to obtain, firms must maintain large safety stockpiles, locking up working capital"),
        ("Working Capital Determinant: Growth Prospects", "rapidly growing sales turnover requires expanding working capital to fund higher inventories and receivables"),
        ("Working Capital Determinant: Level of Competition", "intense competition forces firms to offer generous credit terms and maintain larger finished goods stocks to avoid stock-outs"),
        ("Working Capital Determinant: Inflation Impact", "rising raw material and labor costs force the firm to commit higher funds to maintain the same physical inventory volume")
    ]
    cdet = cap_determinants[m - 1]
    qs.append({
        "qNum": 30,
        "chapter": "Financial Management",
        "topic": "Fixed and Working Capital",
        "subtopic": cdet[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In capital planning, financial analysts at {co} evaluate: '{cdet[1]}'. Which factor determining Fixed or Working Capital requirements is illustrated?",
        "options": [
            ("A", cdet[0], True, f"None - exact NCERT capital determinant: {cdet[0]}."),
            ("B", "Taylor's Fatigue Study Interval", False, "Shop-floor work study technique."),
            ("C", "Consumer Commission Pecuniary Ceiling", False, "Consumer court law."),
            ("D", "SEBI Primary Market Prospectus Underwriting", False, "Financial market procedure.")
        ],
        "sol": f"This situation exemplifies '{cdet[0]}', a recognized determinant of capital requirements in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q31: Marketing Philosophies (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    mkt_phil = [
        ("Production Concept", "focuses on large-scale production, lowering unit costs, and making goods widely available at inexpensive prices"),
        ("Product Concept", "believes consumers favor products offering superior quality, high performance, and innovative features, focusing on continuous product improvements"),
        ("Selling Concept", "believes consumers will not buy enough goods unless the enterprise undertakes aggressive salesmanship, advertising, and promotional persuasion"),
        ("Marketing Concept", "focuses on identifying target customer needs first and delivering desired satisfaction better than competitors at a profit"),
        ("Societal Marketing Concept", "balances customer satisfaction with long-term consumer welfare, environmental protection, and societal wellbeing"),
        ("Production Concept Limitation", "assumes customers buy solely based on cheap price, neglecting consumer quality preferences"),
        ("Product Concept Limitation", "leads to 'marketing myopia' where engineers build superior features that customers may not actually want or need"),
        ("Selling Concept Limitation", "focuses on selling what the factory makes rather than what the customer wants, creating customer dissatisfaction"),
        ("Marketing Concept: Customer Orientation", "the customer is the kingpin; all business activities from design to post-sales support revolve around customer satisfaction"),
        ("Societal Marketing: Eco-Friendly Packaging", "using biodegradable packaging and energy-efficient manufacturing to protect the planet while satisfying consumers"),
        ("Starting Point: Factory vs Market", "Selling concept starts in the factory; Marketing concept starts in the target market"),
        ("Focus: Product vs Customer Needs", "Selling concept focuses on existing products; Marketing concept focuses on customer needs"),
        ("Means: Promotional Persuasion vs Integrated Marketing", "Selling concept relies on aggressive promotion; Marketing concept relies on integrated marketing mix"),
        ("Ends: Sales Volume vs Customer Satisfaction", "Selling concept aims at profits through sales volume; Marketing concept aims at profits through customer satisfaction"),
        ("Marketing Myopia Example", "railway companies losing traffic to airlines because they defined their business as 'running trains' rather than 'satisfying transportation needs'"),
        ("Consumer Sovereignty in Modern Markets", "enterprises surviving only by continuously listening to buyer feedback and adapting product lines"),
        ("Ethical Marketing and Societal Welfare", "refusing to sell harmful chemicals or cigarettes despite high consumer demand, fulfilling societal marketing"),
        ("Integrated Marketing Coordination", "harmonizing product design, pricing, distribution, and promotion to deliver unified customer value"),
        ("Customer Delight vs Mere Satisfaction", "exceeding customer expectations to build lifelong brand advocacy and repeat purchases"),
        ("Evolution of Marketing Thought", "historical progression from Production -> Product -> Selling -> Marketing -> Societal Marketing")
    ]
    mph = mkt_phil[m - 1]
    qs.append({
        "qNum": 31,
        "chapter": "Marketing Management",
        "topic": "Marketing Philosophies",
        "subtopic": mph[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"An enterprise operating under the philosophy: '{mph[1]}' is executing which marketing orientation or principle according to NCERT?",
        "options": [
            ("A", mph[0], True, f"None - exact NCERT marketing philosophy/concept: {mph[0]}."),
            ("B", "Taylor's Functional Foremanship Routing", False, "Taylor's shop-floor system."),
            ("C", "Statutory Trademark Renewal Protocol", False, "IPR law."),
            ("D", "SEBI Demat Delivery Instruction", False, "Financial market procedure.")
        ],
        "sol": f"This orientation embodies '{mph[0]}', one of the five core marketing philosophies in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q32: Promotion Mix Elements (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    promo_mix = [
        ("Advertising", "a paid form of non-personal presentation and promotion of ideas, goods, or services by an identified sponsor"),
        ("Personal Selling", "personal, face-to-face oral communication with prospective buyers for the purpose of making sales and building relationships"),
        ("Sales Promotion: Short-Term Incentives", "short-term incentives designed to encourage immediate trial, purchase, or dealer push of products (e.g. discounts, coupons)"),
        ("Public Relations", "managing communication channels to build corporate goodwill, manage crisis publicity, and foster positive relations with stakeholders"),
        ("Advertising: Mass Reach and Economy", "ability to reach millions of geographically dispersed consumers simultaneously at a low cost per contact"),
        ("Advertising: Impersonal Nature", "lacks direct two-way personal interaction and feedback compared to personal selling"),
        ("Sales Promotion Tool: Rebate", "offering products at special reduced prices to clear excess inventory (e.g. Rs. 10,000 off on festive car purchases)"),
        ("Sales Promotion Tool: Discount", "offering a percentage deduction off list price (e.g. 'Flat 20% off on all garments')"),
        ("Sales Promotion Tool: Refunds", "refunding a part of purchase price on presenting proof of purchase (e.g. return wrapper for Rs. 5 refund)"),
        ("Sales Promotion Tool: Product Combinations", "offering an extra related product free or cheap with the main product (e.g. toothbrush free with toothpaste)"),
        ("Sales Promotion Tool: Quantity Gift", "offering extra quantity of the same product free (e.g. 'Buy 2 Get 1 Free' or '25% Extra')"),
        ("Sales Promotion Tool: Instant Draws and Contests", "scratch cards offering instant prizes or lucky draw coupons on purchase"),
        ("Sales Promotion Tool: Full Finance @ 0%", "allowing consumers to purchase expensive consumer durables through interest-free installments"),
        ("Objection to Advertising: Adds to Cost", "critics argue that massive advertising expenditures unnecessarily inflate final retail prices borne by consumers"),
        ("Objection to Advertising: Undermines Social Values", "critics argue advertising promotes consumerism, materialism, and feelings of inadequacy"),
        ("Objection to Advertising: Confuses the Buyers", "competing brands making similar exaggerated claims leave buyers perplexed rather than enlightened"),
        ("Public Relations Tool: Press Release", "issuing news stories to media journalists regarding new factory openings, CSR achievements, or product launches"),
        ("Public Relations Tool: Event Sponsorship", "sponsoring sports tournaments or cultural festivals to enhance brand prestige and goodwill"),
        ("Personal Selling: Direct Immediate Feedback", "enables sales representatives to adjust their presentation instantly to counter buyer hesitation"),
        ("Push vs Pull Strategy in Promotion", "Push strategy uses sales promotion and dealer incentives to push goods through channels; Pull strategy uses heavy advertising to pull consumers into stores")
    ]
    pm = promo_mix[m - 1]
    qs.append({
        "qNum": 32,
        "chapter": "Marketing Management",
        "topic": "Promotion Mix",
        "subtopic": pm[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In formulating its promotional campaign, {co} executes: '{pm[1]}'. Which element or tool of the Promotion Mix is illustrated?",
        "options": [
            ("A", pm[0], True, f"None - exact NCERT promotion mix element/tool: {pm[0]}."),
            ("B", "Taylor's Time-Study Standard", False, "Production study technique."),
            ("C", "Statutory Factory Pollution Clearance", False, "Environmental regulation."),
            ("D", "SEBI Primary Market Demat Underwriting", False, "Financial market procedure.")
        ],
        "sol": f"This promotional activity illustrates '{pm[0]}' from NCERT Class 12 Marketing Management."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q33: Channels of Distribution (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    channel_dist = [
        ("Zero-Level Channel (Direct Channel)", "manufacturer sells directly to final consumers without any intermediaries (e.g. company retail showrooms, mail order, e-commerce website)"),
        ("One-Level Channel", "manufacturer sells through one intermediary, typically large retailers (e.g. manufacturer -> large supermarket -> consumer)"),
        ("Two-Level Channel", "traditional channel involving wholesalers and retailers (e.g. manufacturer -> wholesaler -> retailer -> consumer)"),
        ("Three-Level Channel", "involves mercantile agents who distribute to wholesalers, who sell to retailers, who sell to consumers (useful for wide regional dispersal)"),
        ("Channel Choice: Product Perishability", "highly perishable goods (fresh milk, bread, fruits) require short or direct channels to reach consumers before spoiling"),
        ("Channel Choice: Unit Value of Product", "high unit value industrial machinery (turbines, aircraft) uses direct channels, whereas low unit value soaps use multi-tier indirect channels"),
        ("Channel Choice: Technical Complexity", "complex products requiring installation, demonstration, and after-sales service use direct manufacturer sales forces"),
        ("Channel Choice: Financial Strength of Company", "financially strong firms can afford their own retail outlets and sales forces, whereas weaker firms rely on established wholesalers"),
        ("Channel Choice: Degree of Control Desired", "companies desiring tight control over retail prices, brand image, and customer service prefer direct channels"),
        ("Channel Choice: Market Size and Geographical Dispersion", "when buyers are scattered widely across thousands of towns, long multi-tier channels are essential"),
        ("Channel Choice: Order Size", "institutional buyers placing large bulk orders are served directly; small retail customers buying single units are served through retail stores"),
        ("Component of Physical Distribution: Order Processing", "the rapid, accurate transmission and processing of customer purchase orders from booking to billing"),
        ("Component of Physical Distribution: Transportation", "the physical movement of goods from manufacturing plants to markets, creating place utility"),
        ("Component of Physical Distribution: Warehousing", "storing goods between manufacturing and final sale to bridge time lag and preserve quality, creating time utility"),
        ("Component of Physical Distribution: Inventory Control", "maintaining an optimal balance between holding sufficient inventory to prevent stock-outs and minimizing holding costs"),
        ("Economic Order Quantity (EOQ)", "balancing inventory carrying costs with order processing costs to determine the most economical replenishment batch"),
        ("Trade-off between Customer Service and Distribution Cost", "higher customer service (same-day delivery) requires more warehouses and safety stocks, increasing total logistics cost"),
        ("Intensive vs Selective Distribution", "intensive distribution places convenience goods in maximum retail outlets; selective distribution uses chosen authorized dealers for specialty goods"),
        ("Exclusive Distribution", "granting exclusive territory rights to a single distributor (e.g. luxury sports cars) to maintain high brand prestige"),
        ("Multi-Channel Retailing (Omnichannel)", "combining brick-and-mortar retail stores with online e-commerce platforms to provide seamless customer purchasing")
    ]
    cdist = channel_dist[m - 1]
    qs.append({
        "qNum": 33,
        "chapter": "Marketing Management",
        "topic": "Channels of Distribution and Physical Distribution",
        "subtopic": cdist[0],
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"In designing distribution logistics, {co} evaluates the following operational parameter: '{cdist[1]}'. Which channel level or physical distribution component is being addressed?",
        "options": [
            ("A", cdist[0], True, f"None - exact NCERT distribution concept: {cdist[0]}."),
            ("B", "Taylor's Functional Foremanship Routing", False, "Shop-floor production routing."),
            ("C", "Statutory Consumer Redressal Pecuniary Limit", False, "Consumer court law."),
            ("D", "SEBI Demat Share Freeze", False, "Financial market procedure.")
        ],
        "sol": f"This situation analyzes '{cdist[0]}' under Channels and Physical Distribution in NCERT Class 12."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q34: Price Determination Factors (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    price_factors = [
        ("Product Cost: Price Floor", "the total cost of production, distribution, and selling sets the minimum floor price below which a firm cannot sell in the long run"),
        ("Utility and Customer Demand: Price Ceiling", "the utility perceived by the buyer and their willingness to pay sets the upper limit (ceiling) above which no product can be priced"),
        ("Price Elasticity of Demand", "if demand is price-inelastic, the firm can fix higher prices; if demand is elastic, even small price hikes cause severe volume drops"),
        ("Degree of Competition in the Market", "in highly competitive markets with close substitutes, prices must be fixed close to competitors; in monopoly, higher freedom exists"),
        ("Government and Legal Regulations", "government price controls and mandatory maximum retail prices (MRP) on essential drugs and goods restrict arbitrary pricing"),
        ("Pricing Objective: Profit Maximisation in the Short Run", "charging maximum feasible prices when product has high novelty or temporary monopoly"),
        ("Pricing Objective: Market Share Leadership", "setting relatively low penetration prices to capture maximum market share and establish dominant market presence"),
        ("Pricing Objective: Surviving in a Competitive Market", "offering discounts and price cuts to cover variable costs and survive intense competitive price wars"),
        ("Pricing Objective: Product Quality Leadership", "charging premium prices to signal superior engineering, luxury prestige, and heavy R&D investment"),
        ("Marketing Methods Used", "heavy expenditure on celebrity advertising, premium packaging, and luxury retail displays allows fixing higher prices"),
        ("Break-Even Pricing", "fixing price at a point where total revenues exactly equal total costs, generating neither profit nor loss"),
        ("Cost-Plus Pricing", "calculating total unit cost of production and adding a predetermined percentage markup profit margin"),
        ("Price Penetration Strategy", "launching a new product at an artificially low price to attract mass customers and discourage competitor entry"),
        ("Price Skimming Strategy", "launching an innovative high-tech product at a premium price to skim revenues from early adopters before lowering prices later"),
        ("Mandatory Maximum Retail Price (MRP)", "under Indian legal metrology, no retailer can charge a price higher than the printed MRP inclusive of all taxes"),
        ("Discounts and Allowances", "offering cash discounts for prompt payment, trade discounts to wholesalers, and seasonal discounts off-season"),
        ("Fixed vs Variable Costs in Pricing", "fixed costs do not change with output; variable costs vary directly; price must cover both in the long run"),
        ("Geographical Pricing", "adjusting prices based on freight costs to different shipping destinations (e.g. FOB pricing, uniform delivered pricing)"),
        ("Psychological Pricing", "pricing goods at Rs. 99 or Rs. 999 instead of round figures to make products appear substantially cheaper to consumers"),
        ("Value-Based Pricing", "pricing products based on customer perceived value rather than purely adding a markup over historical accounting costs")
    ]
    pf = price_factors[m - 1]
    qs.append({
        "qNum": 34,
        "chapter": "Marketing Management",
        "topic": "Price Mix",
        "subtopic": pf[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In determining the retail price for a new product line, {co}'s pricing committee analyzes: '{pf[1]}'. Which factor or strategy governing Price Determination is illustrated?",
        "options": [
            ("A", pf[0], True, f"None - exact NCERT pricing factor/strategy: {pf[0]}."),
            ("B", "Taylor's Differential Piece Rate Bonus", False, "Taylor's shop-floor wage scale."),
            ("C", "Statutory Consumer Dispute Pecuniary Valuation", False, "Consumer court law."),
            ("D", "SEBI Primary Market Underwriting Commission", False, "Financial market procedure.")
        ],
        "sol": f"This analysis directly applies '{pf[0]}' from NCERT Class 12 Price Mix."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q35: Product Mix, Branding & Packaging (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    prod_mix = [
        ("Brand Name vs Brand Mark", "a Brand Name is the verbal part that can be spoken (e.g. Nike, Tata), while a Brand Mark is the visual symbol, design, or distinctive coloring (e.g. Swoosh logo)"),
        ("Trade Mark", "a brand name or brand mark that is given legal protection under trademark law, granting exclusive legal rights to the enterprise"),
        ("Characteristics of a Good Brand Name", "it should be short, easy to pronounce, spell, and remember; suggestive of product benefits; distinctive; and adaptable to packaging"),
        ("Packaging Level: Primary Package", "the immediate container in which the product is housed throughout its life (e.g. toothpaste tube, cough syrup bottle)"),
        ("Packaging Level: Secondary Package", "additional layer of protection discarded when the product is ready for use (e.g. cardboard carton holding toothpaste tube)"),
        ("Packaging Level: Transportation Package", "outer packaging used for storage, identification, and shipping protection (e.g. corrugated cardboard boxes containing 50 cartons)"),
        ("Function of Packaging: Product Protection", "shielding product contents from breakage, leakage, spoilage, contamination, moisture, and temperature fluctuations"),
        ("Function of Packaging: Product Identification", "distinctive shapes, colors, and graphics helping consumers locate and recognize the brand instantly on retail shelves"),
        ("Function of Packaging: Facilitating Product Use", "packaging designed for consumer convenience in pouring, spraying, opening, and closing (e.g. pump dispenser, flip cap)"),
        ("Function of Packaging: Product Promotion ('Silent Salesman')", "attractive, premium packaging catching buyer attention in self-service stores and stimulating impulse purchasing"),
        ("Importance of Packaging: Rising Standards of Health and Sanitation", "packaged goods are preferred by consumers because they ensure tamper-evident hygiene and freedom from adulteration"),
        ("Importance of Packaging: Self-Service Outlets", "in modern supermarkets where salespersons are absent, packaging acts as the primary communicator to persuade buyers"),
        ("Importance of Packaging: Innovational Opportunity", "packaging innovations creating new market categories (e.g. sachet packaging of shampoo, Tetra Paks for juices)"),
        ("Importance of Packaging: Product Differentiation", "color and material of packaging creating a distinct personality that sets the brand apart from generic competitors"),
        ("Labelling Function: Describe Product and Specify Contents", "providing essential information on ingredients, nutritional values, usage directions, and safety warnings"),
        ("Labelling Function: Identification of Product or Brand", "prominently displaying the brand name, logo, manufacturer name, and customer care contact"),
        ("Labelling Function: Grading of Products", "assigning quality grades (e.g. Green Label tea, Yellow Label tea) to denote different product quality tiers"),
        ("Labelling Function: Providing Information Required by Law", "printing statutory mandatory warnings (e.g. expiry date, batch number, FSSAI logo, MRP, net weight)"),
        ("Brand Equity and Consumer Loyalty", "a strong brand builds enduring trust, enabling the firm to charge premium prices and introduce brand extensions smoothly"),
        ("Packaging Sustainability and Eco-Friendly Materials", "modern consumer brands switching from non-recyclable multi-layered plastics to compostable paper cartons")
    ]
    prm = prod_mix[m - 1]
    qs.append({
        "qNum": 35,
        "chapter": "Marketing Management",
        "topic": "Product Mix: Branding, Packaging, Labelling",
        "subtopic": prm[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In designing its product offering, {co}'s marketing team implements the following feature: '{prm[1]}'. Which concept or function of Product Mix, Branding, Packaging, or Labelling is demonstrated?",
        "options": [
            ("A", prm[0], True, f"None - exact NCERT product mix concept: {prm[0]}."),
            ("B", "Taylor's Functional Foremanship Routing", False, "Taylor's shop-floor system."),
            ("C", "Statutory Factory Pollution Inspection", False, "Environmental regulation."),
            ("D", "SEBI Demat Delivery Instruction", False, "Financial market procedure.")
        ],
        "sol": f"This feature represents '{prm[0]}' in NCERT Class 12 Product Mix."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q36: Three-Tier Consumer Redressal Machinery (CPA 2019) (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    cpa_machinery = [
        ("District Commission Pecuniary Jurisdiction", "under the Consumer Protection Act 2019, District Commissions entertain complaints where value of goods or services paid does not exceed Rs. 50 Lakh (or up to Rs. 1 Crore under early rules)"),
        ("State Commission Pecuniary Jurisdiction", "entertains complaints where value of goods or services paid exceeds Rs. 50 Lakh / 1 Crore but does not exceed Rs. 2 Crore / 10 Crore"),
        ("National Commission Pecuniary Jurisdiction", "entertains complaints where value of goods or services paid exceeds Rs. 2 Crore / 10 Crore"),
        ("Appellate Route: District to State Commission", "an appeal against an order of the District Commission can be filed before the State Commission within 45 days from the date of the order"),
        ("Appellate Route: State to National Commission", "an appeal against an original order of the State Commission can be filed before the National Commission within 30 days"),
        ("Appellate Route: National Commission to Supreme Court", "an appeal against an original order of the National Commission can be filed before the Supreme Court of India within 30 days"),
        ("Jurisdiction based on Value Paid, not Compensation Claimed", "a major reform in CPA 2019: pecuniary jurisdiction is determined strictly by the actual consideration paid for goods/services, not the inflated compensation claimed"),
        ("Central Consumer Protection Authority (CCPA)", "a regulatory authority established under CPA 2019 to protect consumer rights, recall unsafe goods, and penalize misleading advertisements"),
        ("Product Liability under CPA 2019", "a manufacturer, service provider, or seller is held legally liable to compensate a consumer for harm caused by defective products or deficient services"),
        ("Mediation Cells under CPA 2019", "consumer commissions can refer consumer disputes to attached mediation cells for speedy, amicable settlement with mutual consent"),
        ("E-Commerce brought under Consumer Protection", "CPA 2019 explicitly covers digital transactions, e-commerce platforms, and direct selling under consumer jurisdiction"),
        ("Who can file a complaint: Individual Consumer", "any person who buys goods or hires services for personal use against consideration paid or promised"),
        ("Who can file a complaint: Voluntary Consumer Association", "any consumer association registered under Companies Act or Societies Registration Act, representing public interest"),
        ("Who can file a complaint: Central or State Government", "government authorities can file complaints on behalf of the public against hazardous or unfair practices"),
        ("Who cannot file a complaint: Commercial Buyer", "a person who obtains goods for resale or for commercial profit-making purposes is excluded from the definition of a consumer"),
        ("Remedy: Removal of Defects", "the consumer commission can order the manufacturer to remove defects from the product free of charge"),
        ("Remedy: Replacement of Goods", "ordering replacement of defective goods with new goods of similar description free from defects"),
        ("Remedy: Refund of Price", "ordering return of the purchase price paid along with reasonable interest to the aggrieved consumer"),
        ("Remedy: Punitive Damages and Ceasing Unfair Practice", "directing the company to discontinue unfair trade practices, withdraw hazardous goods, or pay punitive damages into Consumer Welfare Fund"),
        ("Corrective Advertising Order", "ordering an advertiser to issue corrective advertisements at their own expense to neutralize the effect of misleading claims")
    ]
    cmach = cpa_machinery[m - 1]
    qs.append({
        "qNum": 36,
        "chapter": "Consumer Protection",
        "topic": "Consumer Protection Act, 2019",
        "subtopic": cmach[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Recall",
        "stem": f"Under the provisions of the Consumer Protection Act, 2019, which legal forum, rule, or remedy applies to the following situation: '{cmach[1]}'?",
        "options": [
            ("A", cmach[0], True, f"None - exact CPA 2019 provision: {cmach[0]}."),
            ("B", "Taylor's Functional Foremanship Arbitration", False, "Taylor's shop-floor system."),
            ("C", "SEBI Primary Market Demat Freezing Clause", False, "Financial market regulation."),
            ("D", "Industrial Disputes Tribunal Wage Conciliation", False, "Labor law forum.")
        ],
        "sol": f"This situation is governed by '{cmach[0]}' under the Consumer Protection Act, 2019."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q37: Consumer Rights & Responsibilities (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    c_rights = [
        ("Right to Safety", "the right to be protected against goods and services that are hazardous to human life, health, and property (e.g. defective electrical irons, adulterated drugs)"),
        ("Right to be Informed", "the right to be informed about quality, quantity, potency, purity, standard, and price of goods to protect against unfair trade practices"),
        ("Right to Choose", "the right to be assured access to a variety of goods and services at competitive prices without forced bundling or monopolistic coercion"),
        ("Right to be Heard", "the right to receive due consideration in appropriate consumer forums and government policy-making bodies"),
        ("Right to Seek Redressal", "the right to seek legal remedies, repairs, replacements, or monetary compensation against unfair trade practices or exploitation"),
        ("Right to Consumer Education", "the right to acquire knowledge, legal awareness, and skills to act as an informed, vigilant consumer throughout life"),
        ("Consumer Responsibility: Ask for Cash Memo", "demanding a cash memo on purchase, as it acts as indispensable documentary proof of purchase in consumer court"),
        ("Consumer Responsibility: Buy Standardized Goods", "checking for certified quality marks like ISI on electrical goods, AGMARK on food grains, and Hallmark on gold"),
        ("Consumer Responsibility: Read Labels Carefully", "reading manufacturing date, expiry date, chemical ingredients, warnings, and net weight before purchase"),
        ("Consumer Responsibility: Follow Manufacturer Instructions", "learning the safe use of products and following operating instructions to prevent self-inflicted accidents"),
        ("Consumer Responsibility: Assert Yourself", "demanding fair trade, reporting defective goods, and asserting legal rights rather than passively tolerating exploitation"),
        ("Consumer Responsibility: File Genuine Complaints", "filing honest complaints for genuine grievances rather than making frivolous or exaggerated claims"),
        ("Consumer Responsibility: Form Consumer Societies", "forming consumer associations to actively educate communities and represent consumer grievances"),
        ("Consumer Responsibility: Environmental Protection", "avoiding littering, discouraging plastic waste, and patronizing eco-friendly products"),
        ("Violation of Right to Safety Scenario", "a hospital patient suffering burns from a non-standard heating pad manufactured with uninsulated wiring"),
        ("Violation of Right to be Informed Scenario", "a packaged juice brand concealing artificial sweeteners and chemical preservatives on its label"),
        ("Violation of Right to Choose Scenario", "a school forcing parents to buy uniforms and stationery exclusively from a single designated vendor at inflated prices"),
        ("Exercising Right to be Heard Scenario", "consumer representatives participating in regulatory hearings to oppose steep electricity tariff hikes"),
        ("Exercising Right to Seek Redressal Scenario", "a consumer filing a complaint against an automaker for delivering a brand-new car with a cracked engine block"),
        ("Jago Grahak Jago Initiative", "nationwide consumer education campaign launched by the Ministry of Consumer Affairs to promote consumer vigilance")
    ]
    crr = c_rights[m - 1]
    qs.append({
        "qNum": 37,
        "chapter": "Consumer Protection",
        "topic": "Consumer Rights and Responsibilities",
        "subtopic": crr[0],
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"Consider the following consumer scenario: '{crr[1]}'. Which Consumer Right or Consumer Responsibility under CPA 2019 is directly involved?",
        "options": [
            ("A", crr[0], True, f"None - exact consumer right/responsibility: {crr[0]}."),
            ("B", "Taylor's Differential Piece Rate Bonus", False, "Taylor's shop-floor wage scale."),
            ("C", "Fayol's Centralisation Principle", False, "Administrative management principle."),
            ("D", "SEBI Demat Delivery Instruction", False, "Financial market procedure.")
        ],
        "sol": f"The scenario portrays '{crr[0]}' as defined in NCERT Class 12 Consumer Protection."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q38: Quality Certification Marks & Reliefs (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    cert_marks = [
        ("ISI Mark (Bureau of Indian Standards)", "mandatory certification mark for industrial and electrical equipment like electric irons, pressure cookers, and cement"),
        ("AGMARK", "certification mark issued by the Directorate of Marketing and Inspection for agricultural commodities like edible oils, pulses, and honey"),
        ("Hallmark", "certification mark guaranteeing purity and fineness of gold and silver jewellery in India"),
        ("FPO Mark (Fruit Products Order)", "mandatory certification mark on processed fruit products like jams, packaged juices, pickles, and canned fruits"),
        ("Eco-Mark", "label issued by Bureau of Indian Standards for products that conform to environmental standards and cause least environmental damage"),
        ("VOICE (Voluntary Organisation in Interest of Consumer Education)", "a prominent consumer NGO in Delhi that carries out independent lab testing of consumer products and publishes findings"),
        ("CUTS (Consumer Unity and Trust Society)", "an influential Indian consumer organisation working internationally for consumer empowerment, trade governance, and competition policy"),
        ("Role of Consumer NGOs: Comparative Product Testing", "conducting independent laboratory testing of consumer brands to verify manufacturer claims and publishing reports"),
        ("Role of Consumer NGOs: Providing Legal Aid", "providing legal advice, drafting petitions, and representing consumers before consumer dispute redressal commissions"),
        ("Role of Consumer NGOs: Filing Public Interest Litigation", "filing complaints on behalf of the general public against hazardous products or unfair trade practices affecting mass consumers"),
        ("Bureau of Indian Standards Act", "establishes mandatory standards and administers the National Standards Body of India"),
        ("Food Safety and Standards Authority of India (FSSAI)", "statutory body governing food safety standards, licensing food business operators, and enforcing hygiene regulations"),
        ("National Consumer Helpline (NCH)", "toll-free consumer assistance portal established by the Central Government for quick grievance redressal"),
        ("Redressal: Ceasing Manufacturing of Hazardous Goods", "ordering a chemical factory to halt production of toxic baby toys containing lead-based paints"),
        ("Redressal: Withdrawing Hazardous Goods from Market", "ordering an automaker to recall 50,000 cars with defective airbag deployment sensors"),
        ("Redressal: Payment of Punitive Damages", "ordering a pharmaceutical company to pay Rs. 50 Lakh into the Consumer Welfare Fund for circulating spurious medicines"),
        ("Mandatory Hallmarking of Gold Jewellery", "protects buyers from adulterated gold by certifying caratage (e.g. 22K 916 purity) with unique HUID laser engraving"),
        ("Vegetarian / Non-Vegetarian Food Logos", "green dot in a square for vegetarian food and brown dot in a square for non-vegetarian food printed on packages"),
        ("Consumer Awareness Periodicals", "NGOs publishing magazines (e.g. 'Consumer Voice') to educate citizens regarding consumer rights and redressal methods"),
        ("Consumer Protection Councils", "advisory councils set up at central, state, and district levels to promote and protect consumer rights across the nation")
    ]
    cmk = cert_marks[m - 1]
    qs.append({
        "qNum": 38,
        "chapter": "Consumer Protection",
        "topic": "Standardization Marks and Consumer Organisations",
        "subtopic": cmk[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In Indian consumer administration, a quality certification mark, NGO role, or legal safeguard is described as: '{cmk[1]}'. Which entity or standard is this?",
        "options": [
            ("A", cmk[0], True, f"None - exact NCERT quality/redressal concept: {cmk[0]}."),
            ("B", "Taylor's Time-Study Benchmarking Tool", False, "Taylor's work measurement tool."),
            ("C", "SEBI Primary Market Green-Shoe Option", False, "Stock market IPO underwriting term."),
            ("D", "Industrial Disputes Tribunal Conciliation", False, "Labor relations process.")
        ],
        "sol": f"This describes '{cmk[0]}' from NCERT Class 12 Consumer Protection."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q39: Entrepreneurial Competencies (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    ent_comp = [
        ("Initiative", "acting before being forced by events, anticipating market demands, and pioneering new product categories ahead of others"),
        ("Systematic Planning", "breaking large commercial goals into chronological milestones, allocating budgets, and formulating contingency strategies"),
        ("Problem Solving", "discovering creative alternative pathways and innovative solutions when unexpected obstacles or supply disruptions arise"),
        ("Information Seeking", "personally consulting technical experts, visiting customer facilities, and studying trade data before taking decisions"),
        ("Persistence", "taking repeated action and sustained effort to overcome severe hurdles and commercial roadblocks rather than giving up"),
        ("Persuasion", "convincing investors, customers, key employees, and suppliers to believe in the venture's vision and commit resources"),
        ("Self-Confidence", "possessing a strong belief in one's personal capability to succeed and handle commercial adversity"),
        ("Assertiveness", "conveying decisions clearly and standing up firmly for enterprise rights when dealing with contractors and clients"),
        ("Monitoring", "personally verifying that work is carried out according to quality standards and schedules"),
        ("Concern for High Quality", "striving continuously to meet or beat existing standards of excellence and rejecting substandard outputs"),
        ("Commitment to Work Contract", "placing client deliverables and promised deadlines above personal comfort and making personal sacrifices to honor commitments"),
        ("Efficiency Orientation", "always looking for ways to do things faster, with fewer resources, and at lower operational cost"),
        ("Calculated Risk-Taking", "evaluating risks rationally, calculating probabilities of success, and choosing moderate calculated risks over reckless gambling"),
        ("Use of Influence Strategies", "developing business networks, using influential contacts, and structuring mutually beneficial alliances to achieve goals"),
        ("Seeing and Acting on Opportunities", "identifying unmet consumer needs and seizing business opportunities in areas where others see only chaos"),
        ("Creative Problem Solving during Supply Shock", "when a foreign embargo blocked microchips, the founder redesigned circuits using locally available alternatives"),
        ("Tenacity in Regulatory Approvals", "spending 18 months persisting through complex licensing protocols without abandoning the clean energy project"),
        ("Seeking Deep Customer Feedback", "the founder personally sitting in customer call centers for 30 days to observe user pain points firsthand"),
        ("Inspiring Talent to Leave High-Paying Jobs", "persuading top software architects to join an unfunded startup through infectious vision and equity grants"),
        ("Operational Excellence in Zero-Defect Manufacturing", "refusing to ship 10,000 sensors because of a 0.1% defect rate, protecting enterprise reputation")
    ]
    ec = ent_comp[m - 1]
    qs.append({
        "qNum": 39,
        "chapter": "Entrepreneurship Development",
        "topic": "Entrepreneurial Competencies",
        "subtopic": ec[0],
        "archetype": "conceptual-scenario",
        "difficulty": 2,
        "skillTested": "Application",
        "stem": f"An entrepreneur in {co} exhibits the following characteristic behavior: '{ec[1]}'. Which recognized Entrepreneurial Competency is demonstrated?",
        "options": [
            ("A", ec[0], True, f"None - exact NCERT entrepreneurial competency: {ec[0]}."),
            ("B", "Taylor's Functional Foremanship Scheduling", False, "Taylor's shop-floor technique."),
            ("C", "Statutory Corporate Liquidation Procedure", False, "Insolvency legal procedure."),
            ("D", "SEBI Demat Delivery Instruction", False, "Stock market transaction procedure.")
        ],
        "sol": f"This behavior directly illustrates the entrepreneurial competency of '{ec[0]}' in NCERT."
    })

    # ─────────────────────────────────────────────────────────────────────────────
    # Q40: Concept, Characteristics & Process of Entrepreneurship (20 distinct questions)
    # ─────────────────────────────────────────────────────────────────────────────
    ent_char = [
        ("Systematic, purposeful, and creative activity", "entrepreneurship is not a gamble or accidental event; it is a systematic, continuous process of creating value"),
        ("Dynamic risk-taking in uncertain environments", "entrepreneurship involves undertaking calculated financial, psychological, and social risks in pursuit of uncertain future rewards"),
        ("Innovation as the specific instrument of entrepreneurship", "introducing a new product, a new method of production, opening a new market, or reorganizing an industry"),
        ("Economic development catalyst", "entrepreneurship drives capital formation, employment generation, backward-area industrialization, and GDP expansion"),
        ("Start-up India Scheme: Tax Exemptions", "government initiative providing 3-year tax holidays and capital gains exemptions to recognized eligible startups"),
        ("Start-up India Scheme: Simplified Patent Examination", "offering fast-track patent processing and 80% rebate on patent filing fees to foster innovation"),
        ("Intellectual Property Rights: Patents", "statutory exclusive rights granted for 20 years to an inventor for a novel, non-obvious, and industrially applicable invention"),
        ("Intellectual Property Rights: Trademarks", "protecting distinctive brand names, logos, slogans, and symbols that distinguish goods from competitors"),
        ("Intellectual Property Rights: Copyrights", "granting exclusive legal rights to creators of original literary, musical, dramatic, and artistic works for lifetime plus 60 years"),
        ("Intellectual Property Rights: Trade Secrets", "confidential business formulas, algorithms, or client lists protected through non-disclosure agreements"),
        ("Intrapreneurship vs Entrepreneurship", "an intrapreneur is an innovative employee acting like an entrepreneur within an existing large corporation without bearing personal financial risk"),
        ("Process of Entrepreneurship: Opportunity Identification", "scanning market trends, recognizing consumer frustrations, and identifying viable commercial opportunities"),
        ("Process of Entrepreneurship: Business Plan Formulation", "drafting a comprehensive roadmap covering marketing strategy, operational design, financial budgets, and risk contingencies"),
        ("Process of Entrepreneurship: Resource Mobilisation", "raising initial seed capital, leasing equipment, hiring key talent, and securing supplier contracts"),
        ("Venture Capital Financing", "institutional investment firms providing equity capital and mentorship to high-growth, high-risk early-stage startups"),
        ("Angel Investors", "affluent individuals who invest their personal funds in very early-stage seed ventures in exchange for convertible debt or equity"),
        ("Incubators and Accelerators", "organizations that support startup survival by providing subsidized office space, mentoring, technical labs, and networking"),
        ("Social Entrepreneurship", "launching sustainable business models aimed primarily at solving pressing societal, environmental, or healthcare problems"),
        ("MSME Classification Criteria", "composite criteria based on investment in plant & machinery and annual turnover for micro, small, and medium enterprises"),
        ("Digital Entrepreneurship and Startup Ecosystem", "leveraging cloud infrastructure, mobile networks, and digital payments to scale tech ventures globally at low initial capital cost")
    ]
    ech = ent_char[m - 1]
    qs.append({
        "qNum": 40,
        "chapter": "Entrepreneurship Development",
        "topic": "Entrepreneurship: Concept and Process",
        "subtopic": ech[0],
        "archetype": "conceptual-application",
        "difficulty": 2,
        "skillTested": "Understanding",
        "stem": f"In the study of business creation, the phenomenon described as: '{ech[1]}' highlights which core concept or process of Entrepreneurship Development?",
        "options": [
            ("A", ech[0], True, f"None - exact NCERT entrepreneurship concept: {ech[0]}."),
            ("B", "Taylor's Differential Piece Wage Mandate", False, "Taylor's shop-floor wage system."),
            ("C", "Statutory Consumer Dispute Pecuniary Valuation", False, "Consumer court law."),
            ("D", "SEBI Primary Market Underwriting Fee", False, "Financial market procedure.")
        ],
        "sol": f"This describes '{ech[0]}' under NCERT Class 12 Entrepreneurship Development."
    })

    return qs
