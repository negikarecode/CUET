import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Nature and Significance of Management"
questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches PYQ: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 60 unique questions for Unit 1: Nature and Significance of Management...")

# =================================================================================================
# 1. Management Concept, Effectiveness vs Efficiency (Q1 - Q15)
# =================================================================================================

# 1. Definition of Management
opts, corr, sol = rotate_options(
    "A process of getting things done with the aim of achieving goals effectively and efficiently",
    [
        "A rigid system of statutory legal rules to punish corporate workers",
        "The mechanical operation of factory assembly line robotics",
        "An informal social gathering of company shareholders"
    ],
    "A",
    "1. Management is defined as the process of planning, organizing, directing, and controlling resources to get things done with the objective of achieving organizational goals effectively and efficiently.\nHence, Option {{CORR}} is correct.",
    "Defines management as process of achieving goals effectively and efficiently."
)
add_q(make_question(CHAPTER, "Concept of Management", "What is the comprehensive definition of 'Management' according to modern organizational theory?", opts, corr, sol))

# 2. Effectiveness vs Efficiency: Effectiveness
opts, corr, sol = rotate_options(
    "Completing activities and achieving target goals within the specified timeframe, regardless of cost",
    [
        "Minimizing production expenditure by compromising on final product quality",
        "Conducting theoretical scientific research in university laboratories",
        "Purchasing raw materials at the lowest auction bid"
    ],
    "B",
    "1. 'Effectiveness' in management is concerned with doing the right task, completing activities, and achieving end results on time (it focuses on the end objective).\nHence, Option {{CORR}} is correct.",
    "Defines effectiveness as achieving goals on time."
)
add_q(make_question(CHAPTER, "Effectiveness and Efficiency", "What does 'Effectiveness' in management primarily focus on?", opts, corr, sol))

# 3. Effectiveness vs Efficiency: Efficiency
opts, corr, sol = rotate_options(
    "Doing the task correctly with minimum cost and optimum utilization of resources",
    [
        "Achieving target output at any cost even if expenses double",
        "Drafting legal contracts for corporate mergers",
        "Authorizing bank loans without collateral security"
    ],
    "C",
    "1. 'Efficiency' means doing the task correctly and with minimum cost. It focuses on the input-output relationship, aiming to produce maximum output using minimum inputs (resources).\nHence, Option {{CORR}} is correct.",
    "Defines efficiency as minimizing costs and resource wastage."
)
add_q(make_question(CHAPTER, "Effectiveness and Efficiency", "What is the core focus of 'Efficiency' in managerial operations?", opts, corr, sol))

# 4. Case: High efficiency but low effectiveness
opts, corr, sol = rotate_options(
    "The manager was efficient (produced at low cost) but ineffective (failed to achieve the target on time)",
    [
        "The manager was both effective and efficient",
        "The manager was effective but inefficient",
        "The manager was neither effective nor efficient"
    ],
    "D",
    "1. Target: 1,000 units in 10 days at ₹100/unit. Actual: 800 units in 10 days at ₹85/unit.\n2. The manager reduced unit cost below budget (efficient), but failed to hit the output target (ineffective).\nHence, Option {{CORR}} is correct.",
    "Distinguishes efficient but ineffective performance."
)
add_q(make_question(CHAPTER, "Effectiveness and Efficiency", "A production manager was assigned to produce 1,000 shirts in 10 days at a cost of ₹100 per shirt. The manager produced 800 shirts in 10 days at ₹85 per shirt. How should the manager's performance be evaluated?", opts, corr, sol))

# 5. Case: High effectiveness but low efficiency
opts, corr, sol = rotate_options(
    "Effective but inefficient",
    [
        "Efficient but ineffective",
        "Both effective and efficient",
        "Neither effective nor efficient"
    ],
    "A",
    "1. The manager completed the targeted order on schedule (effective), but operated extra shifts at double wage rates, exceeding the cost budget (inefficient).\nHence, Option {{CORR}} is correct.",
    "Identifies effective but inefficient scenario."
)
add_q(make_question(CHAPTER, "Effectiveness and Efficiency", "To meet an urgent export order deadline, a plant supervisor operated the factory on double overtime shifts, successfully delivering the goods on time but incurring 40% higher production costs. The supervisor was:", opts, corr, sol))

# 6. Characteristics: Multidimensional nature of management
opts, corr, sol = rotate_options(
    "Management of Work, Management of People, and Management of Operations",
    [
        "Management of Land, Management of Buildings, and Management of Vehicles",
        "Management of Cash, Management of Gold, and Management of Foreign Currency",
        "Management of Politics, Management of Religion, and Management of Sports"
    ],
    "B",
    "1. Management is multidimensional and comprises three primary dimensions:\n   (i) Management of Work: translating goals into tasks.\n   (ii) Management of People: dealing with employees as individuals and groups.\n   (iii) Management of Operations: linking work and people through the production cycle.\nHence, Option {{CORR}} is correct.",
    "Lists the three dimensions of management: Work, People, Operations."
)
add_q(make_question(CHAPTER, "Characteristics of Management", "Management is described as a 'Multidimensional' activity. What are its three main dimensions?", opts, corr, sol))

# 7. Characteristics: All Pervasive
opts, corr, sol = rotate_options(
    "It is required in all types of organizations—economic, social, or political—and at all levels",
    [
        "It applies exclusively to private joint-stock corporations",
        "It is restricted only to manufacturing factories with more than 500 workers",
        "It operates only during periods of international wartime crisis"
    ],
    "C",
    "1. Management is 'Pervasive' because managerial activities are universally required across all organizations (hospitals, schools, clubs, army, government) and across all geographical territories.\nHence, Option {{CORR}} is correct.",
    "Defines pervasive nature of management."
)
add_q(make_question(CHAPTER, "Characteristics of Management", "Why is management characterized as being 'All Pervasive'?", opts, corr, sol))

# 8. Characteristics: Dynamic function
opts, corr, sol = rotate_options(
    "It must continually adapt its goals, strategies, and operations to the changing external business environment",
    [
        "It relies exclusively on rigid mathematical formulas that never change",
        "It requires daily replacement of all senior managerial personnel",
        "It operates independently of any consumer market demands"
    ],
    "D",
    "1. Management is a 'Dynamic Function' because an enterprise operates in an ever-changing environment (technological, social, political, economic) and must constantly modify its policies to survive and prosper (e.g., McDonald's adapting its menu to Indian tastes).\nHence, Option {{CORR}} is correct.",
    "Explains dynamic nature of management adapting to environment."
)
add_q(make_question(CHAPTER, "Characteristics of Management", "What is meant by the statement that 'Management is a Dynamic Function'?", opts, corr, sol))

# 9. Characteristics: Intangible force
opts, corr, sol = rotate_options(
    "It cannot be physically seen or touched, but its presence is felt in the orderly functioning and successful results of an enterprise",
    [
        "It operates entirely through telepathic communication",
        "It consists of invisible software algorithms running on corporate mainframes",
        "It requires zero documentation and zero accounting records"
    ],
    "A",
    "1. Management is an 'Intangible Force' because its presence cannot be physically seen, but its effect is clearly noticeable when targets are met, employees are satisfied, and there is orderliness instead of chaos.\nHence, Option {{CORR}} is correct.",
    "Explains management as an intangible force."
)
add_q(make_question(CHAPTER, "Characteristics of Management", "Why is management referred to as an 'Intangible Force'?", opts, corr, sol))

# 10. Characteristics: Continuous process
opts, corr, sol = rotate_options(
    "It consists of a series of composite, interrelated functions (planning, organizing, staffing, directing, controlling) performed simultaneously and perpetually by all managers",
    [
        "It requires factory machinery to run 24 hours a day without maintenance",
        "It is executed only once at the founding of a business firm",
        "It is practiced exclusively during the fourth quarter of the financial year"
    ],
    "B",
    "1. Management is a continuous process because the functions of planning, organizing, staffing, directing, and controlling are ongoing, ongoingly performed by managers simultaneously.\nHence, Option {{CORR}} is correct.",
    "Defines management as a continuous process."
)
add_q(make_question(CHAPTER, "Characteristics of Management", "Why is management considered a 'Continuous Process'?", opts, corr, sol))

# 11. Objectives of Management: Organizational Objectives hierarchy
opts, corr, sol = rotate_options(
    "Survival -> Profit -> Growth",
    [
        "Growth -> Survival -> Speculation",
        "Profit -> Liquidation -> Expansion",
        "Philanthropy -> Monopoly -> Survival"
    ],
    "C",
    "1. Organizational objectives follow a clear logical hierarchy:\n   (i) Survival: earning enough revenue to cover costs.\n   (ii) Profit: earning an adequate margin to cover costs and risks.\n   (iii) Growth: expanding business scale, sales volume, and workforce.\nHence, Option {{CORR}} is correct.",
    "Identifies hierarchy of organizational objectives: Survival, Profit, Growth."
)
add_q(make_question(CHAPTER, "Objectives of Management", "What is the correct logical progression of the 'Organizational Objectives' of management?", opts, corr, sol))

# 12. Objectives of Management: Social Objectives
opts, corr, sol = rotate_options(
    "Using eco-friendly manufacturing methods, generating employment for disadvantaged sections, and providing quality goods at fair prices",
    [
        "Maximizing short-term dividend payouts to company directors",
        "Avoiding corporate tax liabilities through offshore shell entities",
        "Extracting overtime labor without compensating factory staff"
    ],
    "D",
    "1. Social objectives involve creating benefits for society: environmental protection, community welfare, generating employment for underprivileged groups, and producing quality goods at reasonable prices.\nHence, Option {{CORR}} is correct.",
    "Identifies social objectives of management."
)
add_q(make_question(CHAPTER, "Objectives of Management", "Which of the following actions best exemplifies the 'Social Objectives' of management?", opts, corr, sol))

# 13. Objectives of Management: Personal/Individual Objectives
opts, corr, sol = rotate_options(
    "Providing competitive compensation, peer recognition, personal growth, and fair working conditions to employees",
    [
        "Ensuring the business captures 100% of national market share",
        "Funding political campaigns of municipal councilors",
        "Maximizing total retained earnings in corporate reserves"
    ],
    "A",
    "1. Personal objectives pertain to satisfying the diverse individual needs of employees: financial incentives, social status, recognition, self-development, and a safe working environment.\nHence, Option {{CORR}} is correct.",
    "Identifies personal/individual objectives of management."
)
add_q(make_question(CHAPTER, "Objectives of Management", "What do the 'Personal Objectives' of management focus on?", opts, corr, sol))

# 14. Match Question: Management Objectives
add_q(make_match_question(
    CHAPTER,
    "Objectives of Management",
    "Match the corporate initiatives in List I with their corresponding managerial objectives in List II:",
    [
        ("A", "Expanding production capacity by opening three new regional branches"),
        ("B", "Setting up free daycare creches for children of female factory workers"),
        ("C", "Providing merit-based performance bonuses and career advancement paths"),
        ("D", "Generating sufficient sales revenue to cover operational costs in year one")
    ],
    [
        ("(I)", "Personal / Individual Objective"),
        ("(II)", "Organizational Objective: Growth"),
        ("(III)", "Organizational Objective: Survival"),
        ("(IV)", "Social Objective")
    ],
    "A-(II), B-(IV), C-(I), D-(III)",
    [
        "A-(IV), B-(II), C-(I), D-(III)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(III), B-(IV), C-(I), D-(II)"
    ],
    "A",
    "1. Branch expansion -> Growth -> A-(II)\n2. Daycare creches -> Social objective -> B-(IV)\n3. Bonuses & career paths -> Personal objective -> C-(I)\n4. Revenue covering costs -> Survival -> D-(III)\nHence, Option A is correct."
))

# 15. Statement Question: Effectiveness vs Efficiency
add_q(make_statement_question(
    CHAPTER,
    "Effectiveness and Efficiency",
    "For an organization to be successful, management must achieve both effectiveness and efficiency simultaneously.",
    "High efficiency with low effectiveness is undesirable because completing tasks at low cost is futile if target deadlines and goals are missed.",
    "A",
    "1. Statement I is TRUE: Management must balance effectiveness (achieving goals) with efficiency (minimizing costs).\n2. Statement II is TRUE: Producing cheap products that fail to meet delivery deadlines or consumer specs leads to business failure.\nHence, Both Statement I and Statement II are true (Option A)."
))

# =================================================================================================
# 2. Nature of Management: Art, Science, Profession (Q16 - Q30)
# =================================================================================================

# 16. Management as an Art: Criteria
opts, corr, sol = rotate_options(
    "Existence of theoretical knowledge, personalized application, and based on continuous practice and creativity",
    [
        "Strict adherence to universal physical laws like gravity",
        "Mandatory statutory licensing required by the Supreme Court",
        "Complete freedom from evaluating worker productivity"
    ],
    "B",
    "1. Art is the skillful and personalized application of existing knowledge to achieve desired results. Management satisfies all three features of art:\n   (i) Theoretical knowledge exists.\n   (ii) Personalized application (each manager has their own unique style).\n   (iii) Based on regular practice and creative innovation.\nHence, Option {{CORR}} is correct.",
    "Lists features proving management is an art."
)
add_q(make_question(CHAPTER, "Nature of Management", "Which set of features validates that 'Management is an Art'?", opts, corr, sol))

# 17. Personalized Application in Management
opts, corr, sol = rotate_options(
    "Two managers who study the same management textbooks apply their knowledge completely differently based on their personal style, intuition, and experience",
    [
        "Managers must personally operate factory assembly equipment",
        "Managers must design customized payroll spreadsheets for each worker",
        "Managers are legally prohibited from consulting subordinates"
    ],
    "C",
    "1. Just as two actors or dancers interpret a script differently, two managers apply identical management theories in uniquely personalized manners, demonstrating that management is an art.\nHence, Option {{CORR}} is correct.",
    "Explains personalized application feature of management as an art."
)
add_q(make_question(CHAPTER, "Nature of Management", "Why is management said to have 'Personalized Application', reflecting its artistic nature?", opts, corr, sol))

# 18. Management as a Science: Systematized body of knowledge
opts, corr, sol = rotate_options(
    "It possesses its own organized body of theories, concepts, and principles developed over decades of research",
    [
        "It uses laboratory beakers and chemical test tubes in corporate offices",
        "Its principles yield identical mathematical precision under all conditions",
        "It can only be taught by professors of quantum physics"
    ],
    "D",
    "1. Like science, management has a systematized body of knowledge with its own vocabulary, concepts, and principles developed through systematic observation and analysis.\nHence, Option {{CORR}} is correct.",
    "Explains management has a systematized body of knowledge."
)
add_q(make_question(CHAPTER, "Nature of Management", "In what respect does management satisfy the criteria of being a 'Science'?", opts, corr, sol))

# 19. Why Management is an INEXACT Science (Soft Science)
opts, corr, sol = rotate_options(
    "Because management deals with human beings whose behavior is complex and unpredictable, so management principles cannot be tested with rigid laboratory precision",
    [
        "Because management textbooks are printed without mathematical equations",
        "Because management was invented before modern chemical physics",
        "Because managers refuse to record experimental data"
    ],
    "A",
    "1. Unlike pure sciences (physics, chemistry) where principles have universal mathematical rigidity, management deals with human behavior, which is dynamic and variable. Therefore, management principles are flexible guidelines, making management an 'inexact' or 'social' science.\nHence, Option {{CORR}} is correct.",
    "Explains why management is an inexact / soft science."
)
add_q(make_question(CHAPTER, "Nature of Management", "Why is management classified as an 'Inexact Science' (or Social Science) rather than an exact pure science?", opts, corr, sol))

# 20. Universal Validity of Management Principles
opts, corr, sol = rotate_options(
    "They do not have absolute universal validity like physical sciences; they must be modified to suit specific situational contexts",
    [
        "They apply identically in every country without any alteration",
        "They are mathematically proven by statutory law",
        "They cease to function during periods of economic expansion"
    ],
    "B",
    "1. Principles of management are not immutable laws of nature; they are contingent and situational, requiring modification based on organization size, culture, and environmental conditions.\nHence, Option {{CORR}} is correct.",
    "Explains management principles lack rigid universal validity."
)
add_q(make_question(CHAPTER, "Nature of Management", "How does the 'Universal Validity' of management principles differ from that of pure scientific laws?", opts, corr, sol))

# 21. Management as a Profession: Restricted Entry status
opts, corr, sol = rotate_options(
    "Entry into management is not legally restricted; anyone can be designated as a manager irrespective of formal educational degrees",
    [
        "Only licensed doctors of medicine are permitted to manage companies",
        "Management requires passing a compulsory bar council exam",
        "Anyone who does not hold an MBA is legally jailed for managing a firm"
    ],
    "C",
    "1. In professions like medicine (MBBS) or law (LLB), entry is restricted through examination or degree. In management, there is no statutory requirement; anyone can become a manager, though formal degrees (MBA) are preferred. Thus, management does not strictly satisfy restricted entry.\nHence, Option {{CORR}} is correct.",
    "Explains management does not strictly fulfill restricted entry criterion."
)
add_q(make_question(CHAPTER, "Nature of Management", "Does management satisfy the professional criterion of 'Restricted Entry' in India?", opts, corr, sol))

# 22. Professional Association in Management: AIMA
opts, corr, sol = rotate_options(
    "A professional body (All India Management Association - AIMA) exists, but membership is not legally compulsory to practice management",
    [
        "Membership in AIMA is mandated by the Supreme Court of India",
        "AIMA has the legal authority to revoke the voting rights of company directors",
        "No management associations exist anywhere in the world"
    ],
    "D",
    "1. While professional associations like AIMA exist, managers are not legally mandated to register with them to practice, unlike the Medical Council of India or Bar Council of India.\nHence, Option {{CORR}} is correct.",
    "Notes membership in management association is voluntary, not legally compulsory."
)
add_q(make_question(CHAPTER, "Nature of Management", "What is the legal status regarding membership in professional associations (such as AIMA) for corporate managers in India?", opts, corr, sol))

# 23. Professional Ethical Code of Conduct in Management
opts, corr, sol = rotate_options(
    "AIMA has formulated an ethical code of conduct, but its enforcement is not legally binding on all practicing managers",
    [
        "Violating corporate codes carries mandatory lifetime imprisonment",
        "Corporate managers are legally exempt from all moral codes",
        "All corporate managers take a statutory oath in Parliament"
    ],
    "A",
    "1. Unlike doctors who take the Hippocratic oath or lawyers bound by statutory ethical codes, the ethical code for managers is advisory rather than statutorily enforceable.\nHence, Option {{CORR}} is correct.",
    "Explains advisory nature of ethical code of conduct in management."
)
add_q(make_question(CHAPTER, "Nature of Management", "What is the status of the 'Ethical Code of Conduct' in the managerial profession?", opts, corr, sol))

# 24. Conclusion on Management as a Profession
opts, corr, sol = rotate_options(
    "Management exhibits several characteristics of a profession, but it is an 'emerging profession' rather than a fully-fledged statutory profession",
    [
        "Management is an ancient statutory profession identical to medicine and law",
        "Management has zero relationship with any professional standards",
        "Management has been officially abolished as a corporate practice"
    ],
    "B",
    "1. Management has a well-defined body of knowledge, but lacks statutory restricted entry, compulsory professional membership, and enforceable codes. Hence, it is an emerging profession.\nHence, Option {{CORR}} is correct.",
    "Concludes management is an emerging profession."
)
add_q(make_question(CHAPTER, "Nature of Management", "How do contemporary management scholars evaluate the claim that 'Management is a Profession'?", opts, corr, sol))

# 25. Assertion Reason: Management as an Art
add_q(make_assertion_question(
    CHAPTER,
    "Nature of Management",
    "Management is considered a full-fledged art.",
    "A manager applies acquired theoretical principles in a personalized, creative manner through continuous practice to achieve goals.",
    "A",
    "1. Assertion (A) is TRUE: Management satisfies all conditions of art (theoretical knowledge, personal skill, practice, creativity).\n2. Reason (R) is TRUE and correctly explains (A): Managing is an art because success depends on the personal creativity and regular application of the manager.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# 26. Statement Question: Management Art and Science
add_q(make_statement_question(
    CHAPTER,
    "Nature of Management",
    "Management is both an art and a science.",
    "The practice of management is an art, while the underlying organized body of knowledge on which it is based is a science.",
    "A",
    "1. Statement I is TRUE: Management combines scientific principles with artistic application.\n2. Statement II is TRUE: Science provides knowledge, while art involves the application of knowledge.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 27. Match Question: Science vs Art vs Profession
add_q(make_match_question(
    CHAPTER,
    "Nature of Management",
    "Match the dimensions of management in List I with their core attributes in List II:",
    [
        ("A", "Management as a Science"),
        ("B", "Management as an Art"),
        ("C", "Management as a Profession"),
        ("D", "Management as an Inexact Science")
    ],
    [
        ("(I)", "Personalized application and creative practice"),
        ("(II)", "Systematized body of knowledge based on observation"),
        ("(III)", "Principles deal with unpredictable human behavior"),
        ("(IV)", "Emerging field with specialized knowledge and voluntary associations")
    ],
    "A-(II), B-(I), C-(IV), D-(III)",
    [
        "A-(I), B-(II), C-(IV), D-(III)",
        "A-(II), B-(IV), C-(I), D-(III)",
        "A-(III), B-(I), C-(II), D-(IV)"
    ],
    "A",
    "1. Science -> Systematized body of knowledge -> A-(II)\n2. Art -> Personalized application -> B-(I)\n3. Profession -> Emerging field with voluntary bodies -> C-(IV)\n4. Inexact Science -> Deals with human behavior -> D-(III)\nHence, Option A is correct."
))

# 28. Importance of Management: Increases efficiency
opts, corr, sol = rotate_options(
    "By reducing costs and increasing output through the optimal planning, organizing, staffing, directing, and controlling of resources",
    [
        "By replacing all human workers with mechanical time-clocks",
        "By refusing to pay statutory minimum wages to apprentices",
        "By eliminating all corporate marketing communications"
    ],
    "B",
    "1. Management increases efficiency by reducing costs and increasing productivity through the optimal deployment of physical, financial, and human resources.\nHence, Option {{CORR}} is correct.",
    "Explains how management increases organizational efficiency."
)
add_q(make_question(CHAPTER, "Importance of Management", "How does management contribute to 'Increasing Efficiency' in an enterprise?", opts, corr, sol))

# 29. Importance of Management: Creates a dynamic organization
opts, corr, sol = rotate_options(
    "By helping employees adapt smoothly to competitive changes in the business environment, overcoming resistance to change",
    [
        "By relocating the corporate headquarters to a different nation every quarter",
        "By firing employees who propose innovative production ideas",
        "By avoiding all modern technological computer systems"
    ],
    "C",
    "1. People naturally resist change. Efficient management persuades and motivates staff to adapt to environmental changes, maintaining organizational competitiveness.\nHence, Option {{CORR}} is correct.",
    "Explains role of management in creating a dynamic organization."
)
add_q(make_question(CHAPTER, "Importance of Management", "How does management help in creating a 'Dynamic Organization'?", opts, corr, sol))

# 30. Importance of Management: Development of society
opts, corr, sol = rotate_options(
    "By providing quality goods and services, adopting eco-friendly technology, and creating employment opportunities",
    [
        "By maximizing short-term dividend payouts while ignoring factory safety",
        "By hoarding essential consumer commodities during natural droughts",
        "By establishing industrial monopolies that fix market prices"
    ],
    "D",
    "1. Management aids societal development by producing superior goods, generating employment, fostering technological innovation, and engaging in social welfare.\nHence, Option {{CORR}} is correct.",
    "Identifies how management contributes to societal development."
)
add_q(make_question(CHAPTER, "Importance of Management", "In what way does effective management contribute directly to the 'Development of Society'?", opts, corr, sol))

# =================================================================================================
# 3. Levels of Management & Managerial Functions (Q31 - Q45)
# =================================================================================================

# 31. Top Level Management roles
opts, corr, sol = rotate_options(
    "Board of Directors, Chief Executive Officer (CEO), Chairman, Managing Director, and President",
    [
        "Plant Superintendent, Production Manager, and Sales Manager",
        "Foreman, Supervisor, and Section Officer",
        "Machinists, Assembly Line Workers, and Clerks"
    ],
    "A",
    "1. Top Level Management comprises senior-most executives: CEO, COO, President, Chairman, and Board of Directors.\nHence, Option {{CORR}} is correct.",
    "Identifies designated titles of Top Level Management."
)
add_q(make_question(CHAPTER, "Levels of Management", "Which executive designations represent 'Top Level Management' in an organization?", opts, corr, sol))

# 32. Key function of Top Management
opts, corr, sol = rotate_options(
    "Formulating overall organizational goals, strategic long-term policies, and managing relationships with the external environment",
    [
        "Overseeing day-to-day machine maintenance on the factory floor",
        "Directly resolving disputes between assembly line workers",
        "Purchasing office stationery supplies for departmental staff"
    ],
    "B",
    "1. Top management is responsible for the survival and welfare of the enterprise, defining strategic vision, business plans, and external stakeholder relations.\nHence, Option {{CORR}} is correct.",
    "Identifies core functions of Top Level Management."
)
add_q(make_question(CHAPTER, "Levels of Management", "What is the primary operational responsibility of 'Top Level Management'?", opts, corr, sol))

# 33. Middle Level Management roles
opts, corr, sol = rotate_options(
    "Departmental heads such as Finance Manager, Marketing Manager, Production Manager, and Human Resource Manager",
    [
        "Chief Executive Officer and Chief Financial Officer",
        "Shop-floor Supervisors, Foremen, and Chargehands",
        "Retail Store Sales Clerks and Cashiers"
    ],
    "C",
    "1. Middle level management consists of departmental and divisional heads who serve as the link between top management and supervisory personnel.\nHence, Option {{CORR}} is correct.",
    "Identifies titles representing Middle Level Management."
)
add_q(make_question(CHAPTER, "Levels of Management", "Who constitutes 'Middle Level Management' in a corporate enterprise?", opts, corr, sol))

# 34. Key function of Middle Management
opts, corr, sol = rotate_options(
    "Interpreting top management policies, assigning departmental duties, motivating personnel, and ensuring inter-departmental cooperation",
    [
        "Representing the company at international sovereign treaty conferences",
        "Directly inspecting factory worker safety gloves and goggles",
        "Voting on the final declaration of shareholder annual dividends"
    ],
    "D",
    "1. Middle managers interpret strategic plans of top executives into operational departmental tasks, motivate subordinates, and maintain inter-unit coordination.\nHence, Option {{CORR}} is correct.",
    "Identifies key functions of Middle Level Management."
)
add_q(make_question(CHAPTER, "Levels of Management", "What is the primary function performed by 'Middle Level Management'?", opts, corr, sol))

# 35. Supervisory / Operational Level Management roles
opts, corr, sol = rotate_options(
    "Supervisors, Foremen, Section Officers, and Superintendents who directly oversee the operative workforce",
    [
        "Board of Directors and Managing Directors",
        "Branch General Managers and Corporate Controllers",
        "Corporate Legal Advisers and External Auditors"
    ],
    "A",
    "1. Supervisory/Operational (First-line) management directly oversees shop-floor employees and factory labor: Foremen, Supervisors, Section Officers.\nHence, Option {{CORR}} is correct.",
    "Identifies roles in Supervisory / First-line Management."
)
add_q(make_question(CHAPTER, "Levels of Management", "Which job titles represent 'Supervisory or Operational Level Management'?", opts, corr, sol))

# 36. Key function of Supervisory Management
opts, corr, sol = rotate_options(
    "Directly overseeing the operative workforce, maintaining work discipline, ensuring product quality, and minimizing material wastage",
    [
        "Formulating corporate merger strategies with international rivals",
        "Negotiating long-term syndicated foreign currency bank loans",
        "Deciding annual corporate dividend distribution ratios"
    ],
    "B",
    "1. Supervisory managers interact directly with the actual workforce, ensuring safety, maintaining discipline, controlling quality, and communicating worker grievances upward.\nHence, Option {{CORR}} is correct.",
    "Identifies core functions of Supervisory / Operational Management."
)
add_q(make_question(CHAPTER, "Levels of Management", "What is the critical operational role performed by 'Supervisory Level Management'?", opts, corr, sol))

# 37. Match Question: Levels of Management
add_q(make_match_question(
    CHAPTER,
    "Levels of Management",
    "Match the managerial designations in List I with their corresponding management levels in List II:",
    [
        ("A", "Chief Operating Officer (COO)"),
        ("B", "Plant Superintendent / Marketing Head"),
        ("C", "Shop-Floor Foreman"),
        ("D", "Chairman of the Board of Directors")
    ],
    [
        ("(I)", "Operational / Supervisory Level"),
        ("(II)", "Top Level Management"),
        ("(III)", "Middle Level Management"),
        ("(IV)", "Top Level Management")
    ],
    "A-(IV), B-(III), C-(I), D-(II)",
    [
        "A-(I), B-(III), C-(IV), D-(II)",
        "A-(II), B-(I), C-(III), D-(IV)",
        "A-(III), B-(IV), C-(I), D-(II)"
    ],
    "A",
    "1. COO -> Top level -> A-(IV)\n2. Plant Superintendent -> Middle level -> B-(III)\n3. Shop-Floor Foreman -> Operational level -> C-(I)\n4. Chairman -> Top level -> D-(II)\nHence, Option A is correct."
))

# 38. Five Functions of Management sequence
opts, corr, sol = rotate_options(
    "Planning -> Organizing -> Staffing -> Directing -> Controlling",
    [
        "Directing -> Planning -> Controlling -> Staffing -> Organizing",
        "Organizing -> Staffing -> Planning -> Controlling -> Directing",
        "Controlling -> Directing -> Staffing -> Organizing -> Planning"
    ],
    "C",
    "1. The five fundamental managerial functions follow the logical order: Planning (deciding in advance) -> Organizing (structuring resources) -> Staffing (manning positions) -> Directing (guiding and motivating) -> Controlling (measuring performance).\nHence, Option {{CORR}} is correct.",
    "Identifies the sequential order of the five management functions."
)
add_q(make_question(CHAPTER, "Functions of Management", "What is the logical chronological sequence of the five primary Functions of Management?", opts, corr, sol))

# 39. Planning function definition
opts, corr, sol = rotate_options(
    "Determining in advance what is to be done, how it is to be done, when it is to be done, and who is to do it, bridging the gap between where we are and where we want to be",
    [
        "Evaluating worker grievances through disciplinary hearings",
        "Assigning physical desks and computing terminals to administrative clerks",
        "Inspecting manufactured electronic parts under microscope magnification"
    ],
    "D",
    "1. Planning is the foundational function of determining objectives in advance and formulating courses of action to achieve them, bridging the gap from where we are to where we want to go.\nHence, Option {{CORR}} is correct.",
    "Defines Planning as bridging the gap between current state and desired future."
)
add_q(make_question(CHAPTER, "Functions of Management", "How is the 'Planning' function of management defined?", opts, corr, sol))

# 40. Organizing function definition
opts, corr, sol = rotate_options(
    "Identifying and grouping the activities to be performed, assigning duties, delegating authority, and establishing reporting relationships",
    [
        "Interviewing job applicants for open employment vacancies",
        "Comparing actual monthly revenue against budgeted revenue",
        "Motivating retail salespeople through motivational speeches"
    ],
    "A",
    "1. Organizing involves establishing an organizational structure: grouping work, assigning responsibilities, granting authority, and defining reporting hierarchies.\nHence, Option {{CORR}} is correct.",
    "Defines Organizing function."
)
add_q(make_question(CHAPTER, "Functions of Management", "What does the 'Organizing' function of management entail?", opts, corr, sol))

# 41. Staffing function definition
opts, corr, sol = rotate_options(
    "Recruiting, selecting, placing, training, and developing competent personnel to fill the roles designed into the organizational structure",
    [
        "Fixing selling prices of consumer goods in competitive retail markets",
        "Drafting corporate articles of association for registration with ROC",
        "Calculating the weighted average cost of capital for bond issuances"
    ],
    "B",
    "1. Staffing is 'putting people to jobs'—ensuring that the organization has the right number and right kind of people at the right place and time.\nHence, Option {{CORR}} is correct.",
    "Defines Staffing function as putting people to jobs."
)
add_q(make_question(CHAPTER, "Functions of Management", "What is the primary essence of the 'Staffing' function of management?", opts, corr, sol))

# 42. Directing function definition
opts, corr, sol = rotate_options(
    "Leading, influencing, guiding, and motivating employees to perform designated tasks willingly and enthusiastically to achieve organizational goals",
    [
        "Setting numerical production targets for the subsequent calendar year",
        "Auditing commercial bank accounts to verify physical currency deposits",
        "Designing the organizational chart and departmental division of labor"
    ],
    "C",
    "1. Directing involves guiding, supervising, motivating, leading, and communicating with subordinates to achieve targets (it initiates action in the enterprise).\nHence, Option {{CORR}} is correct.",
    "Defines Directing function as guiding and motivating action."
)
add_q(make_question(CHAPTER, "Functions of Management", "Which management function is responsible for initiating action by guiding, leading, and motivating employees?", opts, corr, sol))

# 43. Controlling function definition
opts, corr, sol = rotate_options(
    "Monitoring organizational performance toward the attainment of organizational goals, measuring deviations, and taking corrective actions",
    [
        "Imposing legal fines on employees who arrive five minutes late",
        "Formulating the fundamental mission statement of the corporation",
        "Recruiting skilled engineers through university campus drives"
    ],
    "D",
    "1. Controlling is the measurement of actual performance against established standards, analyzing deviations, and implementing corrective steps.\nHence, Option {{CORR}} is correct.",
    "Defines Controlling function."
)
add_q(make_question(CHAPTER, "Functions of Management", "What does the 'Controlling' function of management primarily involve?", opts, corr, sol))

# 44. Sequence Question: Management Functions cycle
add_q(make_sequence_question(
    CHAPTER,
    "Functions of Management",
    "Arrange the management functions in the correct procedural cycle as executed in an ongoing enterprise:",
    [
        "Establishing organizational goals and defining action plans to achieve them.",
        "Grouping tasks into departments and establishing reporting authority structures.",
        "Recruiting, selecting, and placing qualified personnel into organizational posts.",
        "Guiding, motivating, and leading employees to execute designated tasks.",
        "Comparing actual achievements with planned standards and taking corrective measures."
    ],
    "(A) -> (B) -> (C) -> (D) -> (E)",
    [
        "(B) -> (A) -> (C) -> (E) -> (D)",
        "(A) -> (C) -> (B) -> (E) -> (D)",
        "(C) -> (B) -> (A) -> (D) -> (E)"
    ],
    "A",
    "1. The procedural cycle follows: Planning (A) -> Organizing (B) -> Staffing (C) -> Directing (D) -> Controlling (E).\nHence, Option A is correct."
))

# 45. Assertion Reason: Top Management and Stress
add_q(make_assertion_question(
    CHAPTER,
    "Levels of Management",
    "Top management positions are intellectually demanding, complex, and stress-intensive.",
    "Top level managers bear the ultimate accountability and legal responsibility for the survival, welfare, and strategic direction of the entire enterprise.",
    "A",
    "1. Assertion (A) is TRUE: Top executives work long hours with heavy pressure.\n2. Reason (R) is TRUE and correctly explains (A): Because the entire organization's survival, stakeholder reputation, and strategic success rest on their decisions, the role is inherently stressful.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# =================================================================================================
# 4. Coordination — The Essence of Management (Q46 - Q60)
# =================================================================================================

# 46. Definition of Coordination
opts, corr, sol = rotate_options(
    "The process of harmonizing, synchronizing, and unifying the efforts of different departments to achieve common organizational objectives",
    [
        "A formal legal contract between business owners and labor unions",
        "The computer algorithm allocating cloud server bandwidth",
        "A financial ledger balancing company debit and credit entries"
    ],
    "A",
    "1. Coordination is the orderly arrangement of group efforts to provide unity of action in pursuit of a common purpose.\nHence, Option {{CORR}} is correct.",
    "Defines Coordination."
)
add_q(make_question(CHAPTER, "Coordination", "What is the definition of 'Coordination' in management?", opts, corr, sol))

# 47. Why Coordination is the 'Essence of Management'
opts, corr, sol = rotate_options(
    "Because it is not a separate function, but an intrinsic thread that binds and integrates all five functions of management at every stage",
    [
        "Because it is practiced exclusively by the Chief Executive Officer",
        "Because it requires zero financial or human resources to implement",
        "Because it replaces all need for planning and controlling"
    ],
    "B",
    "1. Coordination is termed the 'Essence of Management' because it is not a distinct separate function; rather, it is required in planning, organizing, staffing, directing, and controlling at every level.\nHence, Option {{CORR}} is correct.",
    "Explains why Coordination is the essence of management."
)
add_q(make_question(CHAPTER, "Coordination", "Why is Coordination universally described as the 'Essence of Management' rather than merely a sixth function?", opts, corr, sol))

# 48. Coordination in Planning
opts, corr, sol = rotate_options(
    "By ensuring that the plans of individual functional departments (production, sales, finance) harmonize with the master organizational plan",
    [
        "By allowing each department to set contradictory sales goals",
        "By enforcing identical color schemes for all departmental documents",
        "By eliminating the need to estimate future market demand"
    ],
    "C",
    "1. During planning, coordination ensures that departmental sub-plans (e.g., sales forecast and production targets) align with each other and fit the master plan.\nHence, Option {{CORR}} is correct.",
    "Describes coordination in the planning function."
)
add_q(make_question(CHAPTER, "Coordination", "How is coordination manifested in the 'Planning' function of management?", opts, corr, sol))

# 49. Characteristics of Coordination: Unity of Action
opts, corr, sol = rotate_options(
    "It acts as a binding force between departments, ensuring that diverse activities are directed toward the common organizational goal",
    [
        "It forces all employees to wear identical uniforms on Fridays",
        "It mandates that all decisions be made by majority vote of workers",
        "It requires all departments to spend equal operational budgets"
    ],
    "D",
    "1. Coordination unifies actions across departments (e.g., sales and production coordinating so sales promises match factory output), avoiding conflicting pursuits.\nHence, Option {{CORR}} is correct.",
    "Explains unity of action in coordination."
)
add_q(make_question(CHAPTER, "Characteristics of Coordination", "What does the characteristic 'Coordination Ensures Unity of Action' signify?", opts, corr, sol))

# 50. Characteristics of Coordination: Continuous Process
opts, corr, sol = rotate_options(
    "It is not a one-time event; it begins at the planning stage and continues perpetually through all operational stages until goals are achieved",
    [
        "It operates only during statutory labor union elections",
        "It is conducted exclusively on the first day of the fiscal year",
        "It is outsourced completely to third-party management consultants"
    ],
    "A",
    "1. Coordination is not a one-shot activity. It starts with planning and continues through controlling in an ongoing, uninterrupted stream.\nHence, Option {{CORR}} is correct.",
    "Explains coordination is a continuous process."
)
add_q(make_question(CHAPTER, "Characteristics of Coordination", "Why is coordination characterized as a 'Continuous Process'?", opts, corr, sol))

# 51. Characteristics of Coordination: Responsibility of ALL Managers
opts, corr, sol = rotate_options(
    "Top managers coordinate overall policies, middle managers coordinate departmental teams, and first-line supervisors coordinate workers' daily efforts",
    [
        "Coordination is the exclusive legal duty of the Chief Financial Officer",
        "Coordination is performed exclusively by external management auditors",
        "Supervisory managers have zero responsibility for coordination"
    ],
    "B",
    "1. Coordination is an all-pervasive responsibility shared across all managerial tiers: Top management coordinates strategy, middle managers coordinate departments, and supervisors coordinate workers.\nHence, Option {{CORR}} is correct.",
    "Explains coordination is the responsibility of all managers."
)
add_q(make_question(CHAPTER, "Characteristics of Coordination", "How is coordination distributed across the hierarchy of management?", opts, corr, sol))

# 52. Characteristics of Coordination: Deliberate Function
opts, corr, sol = rotate_options(
    "A manager must coordinate the efforts of diverse individuals in a conscious, intentional, and planned manner, rather than leaving it to chance",
    [
        "Coordination occurs spontaneously without any managerial intervention",
        "Coordination is enforced strictly through physical factory sirens",
        "Coordination applies only to automated assembly line robots"
    ],
    "C",
    "1. Even where employees are willing to cooperate, coordination does not occur automatically. A manager must deliberately and consciously synchronize efforts to avoid chaos.\nHence, Option {{CORR}} is correct.",
    "Explains coordination is a deliberate function."
)
add_q(make_question(CHAPTER, "Characteristics of Coordination", "Why is coordination described as a 'Deliberate Function'?", opts, corr, sol))

# 53. Cooperation without Coordination outcome
opts, corr, sol = rotate_options(
    "Wasted effort, confusion, and frustration, because goodwill without structured synchronization leads to misdirected actions",
    [
        "Instantaneous achievement of record supernormal profits",
        "Automatic elimination of all corporate operational expenses",
        "A perfectly harmonious zero-defect assembly line"
    ],
    "D",
    "1. Cooperation is voluntary willingness to work. If workers cooperate enthusiastically but lack coordination, their efforts may overlap or conflict, resulting in wasted effort and confusion.\nHence, Option {{CORR}} is correct.",
    "Explains outcome of cooperation without coordination: wasted effort."
)
add_q(make_question(CHAPTER, "Coordination vs Cooperation", "What is the organizational result when 'Cooperation exists without Coordination'?", opts, corr, sol))

# 54. Coordination without Cooperation outcome
opts, corr, sol = rotate_options(
    "Dissatisfaction and employee resentment, because structured procedures forced upon unwilling workers dampen morale",
    [
        "Total company liquidation within 48 hours",
        "Automatic doubling of worker base pay",
        "Complete freedom from managerial oversight"
    ],
    "A",
    "1. If managers impose rigid coordinated workflows on staff who lack the willingness to cooperate, workers feel coerced and dissatisfied, hurting organizational morale.\nHence, Option {{CORR}} is correct.",
    "Explains outcome of coordination without cooperation: dissatisfaction."
)
add_q(make_question(CHAPTER, "Coordination vs Cooperation", "What happens in an organization when 'Coordination exists without Cooperation'?", opts, corr, sol))

# 55. Need for Coordination: Growth in Size
opts, corr, sol = rotate_options(
    "As an organization expands in size, hiring thousands of employees with diverse backgrounds, coordinating their individual goals with organizational goals becomes vital",
    [
        "As firms grow larger, all management functions are legally transferred to banks",
        "Larger firms require zero coordination because employees automatically agree",
        "Growth in size reduces the number of departments to zero"
    ],
    "B",
    "1. Growth in size means more people with varied habits, motives, and views. Harmonizing their divergent individual behaviors toward shared organizational objectives demands active coordination.\nHence, Option {{CORR}} is correct.",
    "Explains need for coordination due to growth in size."
)
add_q(make_question(CHAPTER, "Need for Coordination", "Why does 'Growth in Size' of an organization increase the necessity of coordination?", opts, corr, sol))

# 56. Need for Coordination: Functional Differentiation
opts, corr, sol = rotate_options(
    "Departments (marketing, finance, production) tend to prioritize their own departmental interests, creating conflicts that require coordination to align with corporate goals",
    [
        "All departments perform identical physical tasks simultaneously",
        "Functional departments operate in complete legal isolation without sharing funds",
        "Functional differentiation eliminates the need for human resource managers"
    ],
    "C",
    "1. Departments often build departmental silos (functional differentiation), viewing their own department as an empire. Coordination bridges these silos, linking diverse functional goals to corporate mission.\nHence, Option {{CORR}} is correct.",
    "Explains need for coordination due to functional differentiation."
)
add_q(make_question(CHAPTER, "Need for Coordination", "How does 'Functional Differentiation' create the imperative for coordination in a modern corporation?", opts, corr, sol))

# 57. Need for Coordination: Specialization
opts, corr, sol = rotate_options(
    "Specialists tend to think they alone know what is best and resent advice, necessitating coordination to reconcile diverse specialist views into a unified plan",
    [
        "Specialists possess zero technical knowledge of their respective fields",
        "Specialists work only four hours per month under statutory labor rules",
        "Specialists report directly to the Ministry of Corporate Affairs"
    ],
    "D",
    "1. Modern business relies on technical specialists. Specialists often display professional arrogance and dispute with other specialists. Coordination reconciles their differences for organizational cohesion.\nHence, Option {{CORR}} is correct.",
    "Explains need for coordination to harmonize specialists."
)
add_q(make_question(CHAPTER, "Need for Coordination", "Why does the employment of technical 'Specialists' create a pressing need for coordination?", opts, corr, sol))

# 58. Statement Question: Coordination and Management Functions
add_q(make_statement_question(
    CHAPTER,
    "Coordination",
    "Coordination is the thread that runs through all functions of management.",
    "Without coordination, management functions become disjointed, leading to chaotic overlap and operational failure.",
    "A",
    "1. Statement I is TRUE: Coordination integrates planning, organizing, staffing, directing, and controlling into an interconnected system.\n2. Statement II is TRUE: Absence of coordination leads to inter-departmental conflicts and failure.\nHence, Both Statement I and Statement II are true (Option A)."
))

# 59. Assertion Reason: Coordination is Deliberate
add_q(make_assertion_question(
    CHAPTER,
    "Characteristics of Coordination",
    "Coordination is a deliberate and conscious managerial activity.",
    "Even when individuals are enthusiastic and willing to cooperate, coordination does not occur automatically without structured managerial effort.",
    "A",
    "1. Assertion (A) is TRUE: Coordination requires proactive effort; it is not accidental.\n2. Reason (R) is TRUE and correctly explains (A): Mere willingness to cooperate without synchronized direction results in chaos, proving that coordination must be planned deliberately.\nHence, Both (A) and (R) are true and (R) is the correct explanation of (A) (Option A)."
))

# 60. Match Question: Reasons for Coordination
add_q(make_match_question(
    CHAPTER,
    "Need for Coordination",
    "Match the organizational phenomena in List I with their corresponding coordination drivers in List II:",
    [
        ("A", "Hiring 5,000 new workers from diverse states and backgrounds"),
        ("B", "Marketing department promising 2-day delivery while production requires 5 days"),
        ("C", "IT data scientists and financial chartered accountants clashing over system design"),
        ("D", "Aligning individual worker compensation desires with corporate profitability")
    ],
    [
        ("(I)", "Functional Differentiation"),
        ("(II)", "Growth in Size"),
        ("(III)", "Harmonizing Individual & Organizational Goals"),
        ("(IV)", "Specialization")
    ],
    "A-(II), B-(I), C-(IV), D-(III)",
    [
        "A-(I), B-(II), C-(IV), D-(III)",
        "A-(II), B-(IV), C-(I), D-(III)",
        "A-(III), B-(I), C-(II), D-(IV)"
    ],
    "A",
    "1. Hiring 5,000 workers -> Growth in size -> A-(II)\n2. Marketing vs production delivery gap -> Functional differentiation -> B-(I)\n3. Specialists clashing -> Specialization -> C-(IV)\n4. Individual vs corporate goals -> Harmonizing goals -> D-(III)\nHence, Option A is correct."
))

# Verify count and uniqueness
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 1!")

out_path = "mock/bst_units/unit1.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
