import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Directing"
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

print("Generating 80 unique questions for Unit 7: Directing...")

# =================================================================================================
# 1. Concept, Importance, Principles & Elements of Directing (Q1 - Q14)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Instructing, guiding, counseling, motivating, and leading people in the organization to achieve its objectives",
    [
        "Purchasing raw materials and storing them in factory stockrooms",
        "Writing balance sheet ledgers for quarterly shareholder presentations",
        "Conducting statutory tax audits on corporate depreciation schedules"
    ],
    "A",
    "1. Directing refers to the process of instructing, guiding, counseling, motivating, and leading people in the organization to achieve its objectives.\nHence, Option {{CORR}} is correct.",
    "Defines the directing function."
)
add_q(make_question(CHAPTER, "Concept of Directing", "Which statement accurately defines the managerial function of 'Directing'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Directing initiates action",
    [
        "Directing is completely static",
        "Directing deals exclusively with inert physical machines",
        "Directing only operates after company liquidation"
    ],
    "B",
    "1. While other functions prepare the setting for action, directing initiates action in the organization by getting people to perform work.\nHence, Option {{CORR}} is correct.",
    "Highlights directing initiates action."
)
add_q(make_question(CHAPTER, "Importance of Directing", "While planning, organizing, and staffing set the operational stage, which function actually initiates action in an enterprise?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Directing integrates employees' efforts",
    [
        "Directing promotes inter-departmental fragmentation",
        "Directing forces workers into permanent isolation",
        "Directing eliminates the need for organizational objectives"
    ],
    "C",
    "1. Directing integrates employee efforts in such a way that every individual's contribution contributes to organizational performance and team unity.\nHence, Option {{CORR}} is correct.",
    "Emphasizes integrating employee efforts."
)
add_q(make_question(CHAPTER, "Importance of Directing", "Ensuring that individual employee activities are coordinated and directed towards common organizational objectives highlights that:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Facilitates introduction of needed changes by reducing employee resistance",
    [
        "Forces employees to submit to wage reductions without consultation",
        "Abolishes all technological innovations in factory production",
        "Prevents employees from communicating with department heads"
    ],
    "D",
    "1. Through effective communication, motivation, and leadership, directing helps management introduce changes smoothly by reducing workers' resistance and fear.\nHence, Option {{CORR}} is correct.",
    "Highlights facilitating change through directing."
)
add_q(make_question(CHAPTER, "Importance of Directing", "When management introduces computerization in a traditional office, directing helps overcome employee resistance through:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Directing brings stability and balance in the organization",
    [
        "Directing promotes corporate insolvency",
        "Directing destroys working relationships",
        "Directing eliminates the chain of command"
    ],
    "A",
    "1. Effective directing fosters cooperation and commitment among people, helping create balance among various groups, activities, and departments.\nHence, Option {{CORR}} is correct.",
    "Shows directing brings organizational stability and balance."
)
add_q(make_question(CHAPTER, "Importance of Directing", "Fostering mutual cooperation and reconciling conflicting interests among individuals and departments demonstrates that:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Maximum Individual Contribution",
    [
        "Scalar Chain",
        "Order",
        "Remuneration"
    ],
    "B",
    "1. This principle emphasizes that directing techniques should motivate employees to contribute to their maximum potential towards organizational objectives.\nHence, Option {{CORR}} is correct.",
    "Defines principle of Maximum Individual Contribution."
)
add_q(make_question(CHAPTER, "Principles of Directing", "Which directing principle emphasizes motivating every worker to harness their maximum potential capability?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Harmony of Objectives",
    [
        "Maximum Individual Contribution",
        "Unity of Command",
        "Leadership"
    ],
    "C",
    "1. Harmony of objectives requires management to align individual employee goals (good salary, career) with organizational goals (higher efficiency, profit).\nHence, Option {{CORR}} is correct.",
    "Defines principle of Harmony of Objectives."
)
add_q(make_question(CHAPTER, "Principles of Directing", "Reconciling an individual's desire for higher wages with the organization's goal of increased profitability reflects the principle of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Unity of Command",
    [
        "Harmony of Objectives",
        "Division of Work",
        "Centralization"
    ],
    "D",
    "1. The principle of Unity of Command states that a subordinate should receive instructions and be accountable to only one superior at a time to prevent confusion.\nHence, Option {{CORR}} is correct.",
    "States Unity of Command in directing."
)
add_q(make_question(CHAPTER, "Principles of Directing", "A subordinate should receive operational instructions from only one superior at a time during directing. This upholds:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Follow Through",
    [
        "Unity of Command",
        "Harmony of Objectives",
        "Division of Work"
    ],
    "A",
    "1. Merely issuing orders is not sufficient; a manager must continuously monitor and follow through to ensure that instructions are being carried out properly.\nHence, Option {{CORR}} is correct.",
    "Defines principle of Follow Through."
)
add_q(make_question(CHAPTER, "Principles of Directing", "Continuously observing and supervising subordinates to ensure that issued directives are implemented effectively embodies the principle of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Supervision, Motivation, Leadership, and Communication",
    [
        "Planning, Organizing, Staffing, and Controlling",
        "Authority, Responsibility, Accountability, and Autonomy",
        "Recruitment, Selection, Training, and Development"
    ],
    "B",
    "1. Directing comprises four essential elements: Supervision, Motivation, Leadership, and Communication.\nHence, Option {{CORR}} is correct.",
    "Lists the four elements of directing."
)
add_q(make_question(CHAPTER, "Elements of Directing", "What are the four foundational elements that constitute the managerial function of 'Directing'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Directing flows downwards from superior to subordinate throughout the hierarchy",
    [
        "Directing flows exclusively upwards from workers to executives",
        "Directing takes place only at the top board of directors level",
        "Directing is a one-time activity completed upon business incorporation"
    ],
    "C",
    "1. Directing is a continuous process that flows downwards from top executives to operational workers across every level of management.\nHence, Option {{CORR}} is correct.",
    "States downward and continuous flow of directing."
)
add_q(make_question(CHAPTER, "Features of Directing", "Which of the following is a key characteristic of the 'Directing' function?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Supervision",
    [
        "Motivation",
        "Communication",
        "Planning"
    ],
    "D",
    "1. Supervision involves overseeing what is being done by subordinates and giving instructions to ensure optimum utilization of resources.\nHence, Option {{CORR}} is correct.",
    "Defines Supervision."
)
add_q(make_question(CHAPTER, "Elements of Directing", "Overseeing the work of subordinates while they perform tasks and providing immediate on-the-spot guidance is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Managerial Communication",
    [
        "Scalar Stagnation",
        "Autocratic Isolation",
        "Decentralization"
    ],
    "A",
    "1. The principle of Managerial Communication states that effective two-way communication across all levels ensures that instructions are understood and feedback received.\nHence, Option {{CORR}} is correct.",
    "Highlights principle of Managerial Communication."
)
add_q(make_question(CHAPTER, "Principles of Directing", "Ensuring clear, unambiguous two-way information flow between superiors and subordinates corresponds to which directing principle?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Directing takes place at every level of management where superior-subordinate relations exist",
    [
        "Directing is confined exclusively to the Chief Executive Officer",
        "Directing occurs only in non-profit charitable trusts",
        "Directing is performed solely by external strategy consultants"
    ],
    "B",
    "1. Directing is pervasive; every manager—from the Managing Director down to the shop-floor supervisor—performs directing for their respective subordinates.\nHence, Option {{CORR}} is correct.",
    "Highlights pervasive nature of directing across all levels."
)
add_q(make_question(CHAPTER, "Features of Directing", "The pervasive nature of directing signifies that:", opts, corr, sol))

# =================================================================================================
# 2. Motivation: Maslow's Hierarchy & Incentives (Q15 - Q32)
# =================================================================================================

opts, corr, sol = rotate_options(
    "The process of stimulating people to action to accomplish desired goals",
    [
        "A formal legal contract governing corporate debenture redemption",
        "The mechanical operation of factory hydraulic machinery",
        "The calculated computation of corporate income tax surcharges"
    ],
    "C",
    "1. Motivation means the process of stimulating people to action to accomplish desired organizational goals through internal and external incentives.\nHence, Option {{CORR}} is correct.",
    "Defines Motivation."
)
add_q(make_question(CHAPTER, "Motivation", "Which of the following best defines the psychological concept of 'Motivation'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Motive is an inner state that energizes; Motivator is the incentive technique; Motivation is the overall process",
    [
        "Motive is a legal statute; Motivator is a supervisor; Motivation is a financial penalty",
        "Motive is an external machine; Motivator is an engine; Motivation is mechanical power",
        "All three terms are completely synonymous and interchangeable without distinction"
    ],
    "D",
    "1. Motive is an inner psychological drive; Motivator is the technique (pay, praise) used to motivate people; Motivation is the comprehensive process of inspiring action.\nHence, Option {{CORR}} is correct.",
    "Contrasts Motive, Motivator, and Motivation."
)
add_q(make_question(CHAPTER, "Motivation", "What is the distinction between 'Motive', 'Motivator', and 'Motivation'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Motivation is an internal feeling and produces goal-directed behavior",
    [
        "Motivation is a physical surgical procedure",
        "Motivation is an invariable linear mathematical constant",
        "Motivation can only be applied through penal imprisonment"
    ],
    "A",
    "1. Key features of motivation are: it is an internal psychological feeling, it produces goal-directed behavior, and it can be positive or negative.\nHence, Option {{CORR}} is correct.",
    "Lists fundamental features of motivation."
)
add_q(make_question(CHAPTER, "Motivation", "Which of the following is an intrinsic characteristic of 'Motivation'?", opts, corr, sol))

add_q(make_sequence_question(
    CHAPTER, "Motivation Process",
    "Arrange the stages of the Motivation Process in their correct psychological sequence:",
    [
        "Drives",
        "Unsatisfied Need",
        "Search Behavior",
        "Tension",
        "Satisfied Need"
    ],
    "(B), (D), (A), (C), (E)",
    [
        "(A), (B), (C), (D), (E)",
        "(B), (A), (D), (C), (E)",
        "(C), (B), (D), (A), (E)"
    ],
    "B",
    "1. The standardized motivation process sequence is:\n(B) Unsatisfied Need -> (D) Tension -> (A) Drives -> (C) Search Behavior -> (E) Satisfied Need -> (Reduction of Tension).\nHence, Option B is correct."
))

opts, corr, sol = rotate_options(
    "Basic Physiological Needs",
    [
        "Safety and Security Needs",
        "Affiliation and Belonging Needs",
        "Self-Actualization Needs"
    ],
    "C",
    "1. According to Abraham Maslow, Basic Physiological Needs (hunger, thirst, shelter, sleep) form the foundational baseline of human needs.\nHence, Option {{CORR}} is correct.",
    "Identifies Basic Physiological Needs at base of Maslow's hierarchy."
)
add_q(make_question(CHAPTER, "Maslow's Need Hierarchy", "Which level forms the foundational primary base in Abraham Maslow's Need Hierarchy Theory?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Safety and Security Needs",
    [
        "Esteem Needs",
        "Self-Actualization Needs",
        "Basic Physiological Needs"
    ],
    "D",
    "1. Job security, stability of income, pension plans, and safe working conditions satisfy an individual's Safety and Security needs.\nHence, Option {{CORR}} is correct.",
    "Defines Safety and Security Needs."
)
add_q(make_question(CHAPTER, "Maslow's Need Hierarchy", "In Maslow's hierarchy, providing job security, provident funds, and personal safety protection satisfies which need level?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Affiliation / Belonging Needs",
    [
        "Esteem Needs",
        "Self-Actualization Needs",
        "Basic Physiological Needs"
    ],
    "A",
    "1. Affiliation or social needs refer to affection, sense of belongingness, acceptance, and friendship at the workplace.\nHence, Option {{CORR}} is correct.",
    "Defines Affiliation and Belonging Needs."
)
add_q(make_question(CHAPTER, "Maslow's Need Hierarchy", "An employee's longing for cordial workplace friendships, collegial acceptance, and team belongingness addresses:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Esteem Needs",
    [
        "Safety Needs",
        "Basic Physiological Needs",
        "Affiliation Needs"
    ],
    "B",
    "1. Esteem needs include self-respect, autonomy status, recognition, prestige, and executive job titles.\nHence, Option {{CORR}} is correct.",
    "Defines Esteem Needs."
)
add_q(make_question(CHAPTER, "Maslow's Need Hierarchy", "Conferring a prestigious executive designation, private corner office, and public recognition awards satisfies:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Self-Actualization Needs",
    [
        "Safety and Security Needs",
        "Basic Physiological Needs",
        "Affiliation Needs"
    ],
    "C",
    "1. Self-actualization represents the highest level in Maslow's hierarchy, referring to the drive to realize one's full potential and personal self-fulfillment.\nHence, Option {{CORR}} is correct.",
    "Defines Self-Actualization Needs."
)
add_q(make_question(CHAPTER, "Maslow's Need Hierarchy", "The highest psychological drive to become everything that an individual is capable of becoming is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A satisfied need can no longer motivate a person; only next higher level need motivates",
    [
        "People satisfy all five needs simultaneously without any hierarchy",
        "Physiological needs emerge only after self-actualization is achieved",
        "Human behavior is completely unaffected by internal needs"
    ],
    "D",
    "1. A core assumption of Maslow's theory is that a satisfied need no longer motivates a person; only the next higher level need in the hierarchy can motivate them.\nHence, Option {{CORR}} is correct.",
    "States core assumption that satisfied need ceases to motivate."
)
add_q(make_question(CHAPTER, "Maslow's Need Hierarchy", "Which of the following is a foundational assumption of Abraham Maslow's Need Hierarchy Theory?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Financial incentives are measurable in monetary terms; Non-financial incentives satisfy psychological/emotional needs",
    [
        "Financial incentives are illegal; Non-financial incentives are legally required",
        "Financial incentives are for senior executives; Non-financial incentives are for factory machines",
        "Financial incentives are one-time; Non-financial incentives expire daily"
    ],
    "A",
    "1. Financial incentives refer to monetary rewards (bonus, commission, profit sharing). Non-financial incentives focus on psychological, social, and emotional satisfaction (status, praise).\nHence, Option {{CORR}} is correct.",
    "Contrasts financial and non-financial incentives."
)
add_q(make_question(CHAPTER, "Incentives", "What is the primary difference between 'Financial Incentives' and 'Non-Financial Incentives'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Profit sharing and Co-partnership / Stock options",
    [
        "Job enrichment and Employee empowerment",
        "Status and Organizational climate",
        "Employee recognition and Job security"
    ],
    "B",
    "1. Profit sharing and Co-partnership (issuing shares at discounted prices/ESOPs) are direct financial incentives measurable in monetary units.\nHence, Option {{CORR}} is correct.",
    "Identifies financial incentives."
)
add_q(make_question(CHAPTER, "Financial Incentives", "Which of the following pairs represents 'Financial Incentives'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Co-partnership / Stock Option (ESOP)",
    [
        "Job Enrichment",
        "Status",
        "Employee Empowerment"
    ],
    "C",
    "1. Under co-partnership or employee stock option schemes, employees are offered company shares at a set price lower than the market price, creating ownership feeling.\nHence, Option {{CORR}} is correct.",
    "Defines Co-partnership and Stock Options."
)
add_q(make_question(CHAPTER, "Financial Incentives", "Offering company equity shares to employees at a discounted price below the prevailing market price is known as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Perquisites (Perks)",
    [
        "Basic Minimum Wage",
        "Overtime Allowance",
        "Statutory Bonus"
    ],
    "D",
    "1. Perquisites (perks) refer to fringe benefits such as company-provided car, rent-free housing, medical facilities, and children's education allowances.\nHence, Option {{CORR}} is correct.",
    "Defines Perquisites."
)
add_q(make_question(CHAPTER, "Financial Incentives", "Providing executives with rent-free furnished accommodation, a chauffeured vehicle, and paid medical allowances exemplifies:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Job Enrichment",
    [
        "Job Rotation",
        "Co-partnership",
        "Productivity Wage Incentive"
    ],
    "A",
    "1. Job enrichment is concerned with designing jobs that include greater variety of work content, higher knowledge requirements, autonomy, and personal growth opportunities.\nHence, Option {{CORR}} is correct.",
    "Defines Job Enrichment."
)
add_q(make_question(CHAPTER, "Non-Financial Incentives", "Designing a job to incorporate greater operational autonomy, diverse tasks, and intellectual challenge is termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Employee Recognition Programmes",
    [
        "Productivity Wage Scheme",
        "Retirement Pension Fund",
        "Quarterly Cash Bonus"
    ],
    "B",
    "1. Acknowledging good performance through praise, displaying names on bulletin boards, certificates of merit, or presenting mementos represents employee recognition.\nHence, Option {{CORR}} is correct.",
    "Defines Employee Recognition Programmes."
)
add_q(make_question(CHAPTER, "Non-Financial Incentives", "Presenting a 'Best Worker of the Month' trophy and displaying the winner's photograph on the central notice board is an example of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Employee Empowerment",
    [
        "Retirement Benefits",
        "Co-partnership",
        "Direct Recruitment"
    ],
    "C",
    "1. Employee empowerment means giving more autonomy, decision-making authority, and discretion to subordinates, making them feel that their work is vital.\nHence, Option {{CORR}} is correct.",
    "Defines Employee Empowerment."
)
add_q(make_question(CHAPTER, "Non-Financial Incentives", "Granting frontline customer executives the authority to resolve customer complaints up to ₹10,000 on the spot represents:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Status",
    [
        "Profit Sharing",
        "Productivity Bonus",
        "Pension"
    ],
    "D",
    "1. In an organizational context, status refers to the ranking of positions, authority, prestige, and privileges accorded to a job holder.\nHence, Option {{CORR}} is correct.",
    "Defines Status."
)
add_q(make_question(CHAPTER, "Non-Financial Incentives", "The formal ranking of managerial positions along with associated authority, prestige, and executive privileges represents:", opts, corr, sol))

# =================================================================================================
# 3. Leadership: Concept, Qualities & 3 Styles (Q33 - Q46)
# =================================================================================================

opts, corr, sol = rotate_options(
    "The process of influencing the behavior of people by making them strive willingly toward organizational goals",
    [
        "Enforcing criminal legal statutes on factory shop-floor workers",
        "Signing commercial bank cheques for corporate debt repayments",
        "Conducting routine inventory audits in stockroom warehouses"
    ],
    "A",
    "1. Leadership is the process of influencing people so that they strive willingly and enthusiastically toward the achievement of group goals.\nHence, Option {{CORR}} is correct.",
    "Defines Leadership."
)
add_q(make_question(CHAPTER, "Leadership", "Which statement best defines 'Leadership' in organizational management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Autocratic or Authoritarian Leadership",
    [
        "Democratic or Participative Leadership",
        "Laissez-faire or Free-rein Leadership",
        "Paternalistic Shared Leadership"
    ],
    "B",
    "1. An autocratic leader gives orders and expects subordinates to obey without question. Authority is centralized, and communication is one-way downwards.\nHence, Option {{CORR}} is correct.",
    "Defines Autocratic Leadership."
)
add_q(make_question(CHAPTER, "Leadership Styles", "A leadership style characterized by centralized decision-making, dogmatic commands, and one-way downward communication is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Urgent crisis situations where quick decisions are needed without time for consultation",
    [
        "Highly educated creative software engineers conducting exploratory research",
        "Collaborative academic university curriculum design committees",
        "Social volunteer clubs planning recreational weekend outings"
    ],
    "C",
    "1. Autocratic leadership is effective in emergencies or crisis scenarios where swift, decisive action is critical and subordinates lack expertise.\nHence, Option {{CORR}} is correct.",
    "Identifies suitability of Autocratic style in crises."
)
add_q(make_question(CHAPTER, "Leadership Styles", "Under which circumstance is an 'Autocratic Leadership Style' most practically justified?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Democratic or Participative Leadership",
    [
        "Autocratic Leadership",
        "Laissez-faire Leadership",
        "Dictatorial Hierarchy"
    ],
    "D",
    "1. A democratic leader develops action plans and makes decisions in consultation with subordinates, encouraging group participation and two-way communication.\nHence, Option {{CORR}} is correct.",
    "Defines Democratic Leadership."
)
add_q(make_question(CHAPTER, "Leadership Styles", "A leader who encourages subordinate suggestions, consults the team before taking decisions, and fosters two-way communication exhibits:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Higher employee morale, greater initiative, and strong commitment to decisions",
    [
        "Rapid instantaneous decisions during immediate fire emergencies",
        "Elimination of all meetings and discussions across departments",
        "Absolute concentration of executive power in a single person"
    ],
    "A",
    "1. Democratic leadership enhances subordinate morale, sparks creative initiative, and ensures sincere execution because employees participated in decision-making.\nHence, Option {{CORR}} is correct.",
    "Highlights benefits of Democratic Leadership."
)
add_q(make_question(CHAPTER, "Leadership Styles", "What is a prominent organizational benefit of adopting a 'Democratic Leadership Style'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Laissez-faire or Free-rein Leadership",
    [
        "Autocratic Leadership",
        "Democratic Leadership",
        "Bureaucratic Command"
    ],
    "B",
    "1. In a laissez-faire (free-rein) style, the leader gives complete freedom to subordinates to establish their own goals and resolve problems, acting only as a resource contact.\nHence, Option {{CORR}} is correct.",
    "Defines Laissez-faire Leadership."
)
add_q(make_question(CHAPTER, "Leadership Styles", "A leadership approach where the manager grants complete operational freedom to subordinates and provides support only when requested is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Highly trained, independent, and self-motivated professional experts",
    [
        "Unskilled manual laborers operating hazardous punch presses",
        "Inexperienced high school summer interns on their first day",
        "Security guards patrolling sensitive nuclear installations"
    ],
    "C",
    "1. Laissez-faire leadership succeeds best when subordinates are highly skilled, experienced, self-motivated professionals capable of working independently (e.g., scientists, software architects).\nHence, Option {{CORR}} is correct.",
    "Identifies suitability for Laissez-faire style."
)
add_q(make_question(CHAPTER, "Leadership Styles", "For which type of workforce is a 'Laissez-faire (Free-rein)' leadership style most suitable?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Autocratic is leader-centered; Democratic is group-centered; Free-rein is individual-centered",
    [
        "Autocratic is group-centered; Democratic is individual; Free-rein is leader",
        "Autocratic is zero-power; Democratic is total-power; Free-rein is state-power",
        "All three styles follow identical communication paths without variance"
    ],
    "D",
    "1. Autocratic is leader-centered (leader decides alone); Democratic is group-centered (consultative decision); Free-rein is subordinate/individual-centered (complete autonomy).\nHence, Option {{CORR}} is correct.",
    "Contrasts the three leadership styles by operational focus."
)
add_q(make_question(CHAPTER, "Leadership Styles", "How do the three leadership styles compare in terms of their operational focus?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Physical fitness, knowledge, integrity, initiative, communication skills, and empathy",
    [
        "Aggressive intimidating temper, personal arrogance, and punitive vindictiveness",
        "Blind adherence to outdated dogmas and absolute refusal to listen to advice",
        "Accumulation of astronomical private wealth through tax avoidance"
    ],
    "A",
    "1. Core qualities of a good leader include physical stamina, sound knowledge, personal integrity, initiative, high communication competency, and social empathy.\nHence, Option {{CORR}} is correct.",
    "Lists essential qualities of a good leader."
)
add_q(make_question(CHAPTER, "Leadership Qualities", "Which set of attributes exemplifies the qualities of an effective business leader?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Initiative",
    [
        "Physical stamina",
        "Defensive silence",
        "Rigid dogmatism"
    ],
    "B",
    "1. A leader should have initiative—the courage to grab opportunities and take the first bold step rather than waiting for instructions.\nHence, Option {{CORR}} is correct.",
    "Defines Initiative in leadership."
)
add_q(make_question(CHAPTER, "Leadership Qualities", "The quality of a leader to courageously seize positive opportunities and take the first decisive step is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Integrity",
    [
        "Technical jargon",
        "Formal status",
        "External authority"
    ],
    "C",
    "1. A leader should possess high integrity and honesty, serving as a role model to subordinates in terms of ethics and workplace values.\nHence, Option {{CORR}} is correct.",
    "Defines Integrity in leadership."
)
add_q(make_question(CHAPTER, "Leadership Qualities", "Practicing high personal ethics, professional honesty, and consistency between words and deeds reflects a leader's:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Empathy and Human Relations Skills",
    [
        "Physical Aggressiveness",
        "Bureaucratic Dogmatism",
        "Statutory Secrecy"
    ],
    "D",
    "1. Good leaders understand the feelings, personal problems, and aspirations of their subordinates, demonstrating empathy and warmth.\nHence, Option {{CORR}} is correct.",
    "Defines Empathy and Human Relations Skills."
)
add_q(make_question(CHAPTER, "Leadership Qualities", "Understanding the emotional feelings, personal challenges, and motivations of subordinates demonstrates a leader's:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Situational Leadership (adapting style to situational demands and follower maturity)",
    [
        "Rigid Autocracy applied identically across all scenarios",
        "Permanent Free-rein applied indiscriminately to all employees",
        "Complete abdication of all managerial responsibilities"
    ],
    "A",
    "1. Effective modern managers practice situational leadership, adapting their style (autocratic, democratic, or free-rein) depending on the urgency, task complexity, and team maturity.\nHence, Option {{CORR}} is correct.",
    "Explains situational adaptability in leadership."
)
add_q(make_question(CHAPTER, "Leadership Styles", "An effective manager shifts between democratic consultation during project planning and autocratic speed during a factory crisis. This illustrates:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "One-way downward communication in Autocratic; Two-way communication in Democratic",
    [
        "Two-way in Autocratic; Zero communication in Democratic",
        "Upward only in Autocratic; Horizontal only in Democratic",
        "Both rely exclusively on informal rumors"
    ],
    "B",
    "1. Autocratic leadership relies strictly on one-way downward communication (orders). Democratic leadership is founded on active two-way communication.\nHence, Option {{CORR}} is correct.",
    "Contrasts communication flow in Autocratic and Democratic styles."
)
add_q(make_question(CHAPTER, "Leadership Styles", "How does communication flow differ between Autocratic and Democratic leadership styles?", opts, corr, sol))

# =================================================================================================
# 4. Communication: Process, Barriers & Measures (Q47 - Q62)
# =================================================================================================

opts, corr, sol = rotate_options(
    "The process of exchange of information, ideas, views, and understanding between two or more persons",
    [
        "The unilateral issuance of disciplinary court orders",
        "The mechanical repair of office computer printing machines",
        "The filing of statutory annual corporate balance sheets"
    ],
    "C",
    "1. Communication is defined as the exchange of facts, ideas, opinions, or emotions by two or more persons to create common understanding.\nHence, Option {{CORR}} is correct.",
    "Defines Communication."
)
add_q(make_question(CHAPTER, "Communication", "Which statement accurately defines 'Communication' in organizational management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Encoding",
    [
        "Decoding",
        "Media",
        "Feedback"
    ],
    "D",
    "1. Encoding is the process of converting the message into communication symbols such as words, pictures, gestures, or diagrams by the sender.\nHence, Option {{CORR}} is correct.",
    "Defines Encoding in communication process."
)
add_q(make_question(CHAPTER, "Communication Process", "The process of translating thoughts and ideas into communicative symbols, words, or gestures by the sender is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Decoding",
    [
        "Encoding",
        "Noise",
        "Media"
    ],
    "A",
    "1. Decoding is the process of converting encoded symbols of the sender into understandable meaning by the receiver.\nHence, Option {{CORR}} is correct.",
    "Defines Decoding in communication process."
)
add_q(make_question(CHAPTER, "Communication Process", "The process by which the receiver interprets and converts received symbols back into understandable meaning is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Noise",
    [
        "Feedback",
        "Media",
        "Channel"
    ],
    "B",
    "1. Noise refers to any obstruction, interruption, or hindrance to communication at any stage (e.g., poor telephone line, faulty decoding, loud factory hum).\nHence, Option {{CORR}} is correct.",
    "Defines Noise in communication."
)
add_q(make_question(CHAPTER, "Communication Process", "Any disruption, static, or hindrance that hampers the transmission and understanding of a message is termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Feedback",
    [
        "Noise",
        "Encoding",
        "Medium"
    ],
    "C",
    "1. Feedback comprises all actions and responses of the receiver indicating that they have received and understood the sender's message.\nHence, Option {{CORR}} is correct.",
    "Defines Feedback."
)
add_q(make_question(CHAPTER, "Communication Process", "The response or reaction communicated by the receiver confirming receipt and comprehension of the message is:", opts, corr, sol))

add_q(make_sequence_question(
    CHAPTER, "Communication Process",
    "Arrange the core elements of the Communication Process in their correct sequence:",
    [
        "Media / Channel",
        "Sender",
        "Encoding",
        "Message",
        "Receiver"
    ],
    "(B), (D), (C), (A), (E)",
    [
        "(A), (B), (C), (D), (E)",
        "(B), (C), (D), (A), (E)",
        "(D), (B), (C), (A), (E)"
    ],
    "A",
    "1. The correct sequence is:\n(B) Sender -> (D) Message -> (C) Encoding -> (A) Media -> (E) Receiver (followed by Decoding and Feedback).\nHence, Option A is correct."
))

opts, corr, sol = rotate_options(
    "Semantic Barriers",
    [
        "Psychological Barriers",
        "Organizational Barriers",
        "Personal Barriers"
    ],
    "B",
    "1. Semantic barriers are concerned with problems and obstructions in the process of encoding and decoding of message into words or impressions (linguistic issues).\nHence, Option {{CORR}} is correct.",
    "Defines Semantic Barriers."
)
add_q(make_question(CHAPTER, "Barriers to Communication", "Communication barriers arising from difficulties in linguistic formulation, symbols with diverse meanings, and technical jargon are:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Technical Jargon",
    [
        "Premature Evaluation",
        "Distrust",
        "Fear of Challenge to Authority"
    ],
    "C",
    "1. Using specialized technical vocabulary that ordinary workers cannot comprehend is a classic Semantic Barrier.\nHence, Option {{CORR}} is correct.",
    "Identifies Technical Jargon as a Semantic Barrier."
)
add_q(make_question(CHAPTER, "Barriers to Communication", "When an IT specialist uses complex programming acronyms that confuse sales staff, which barrier occurs?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Psychological or Emotional Barriers",
    [
        "Semantic Barriers",
        "Organizational Structure Barriers",
        "Linguistic Translation Barriers"
    ],
    "D",
    "1. Psychological or emotional states (anger, anxiety, preconceived prejudices) act as psychological barriers (e.g., premature evaluation, lack of attention).\nHence, Option {{CORR}} is correct.",
    "Defines Psychological Barriers."
)
add_q(make_question(CHAPTER, "Barriers to Communication", "Barriers arising from the mental state, prejudices, and emotional agitation of the sender or receiver are:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Premature Evaluation",
    [
        "Faulty Translation",
        "Technical Jargon",
        "Organizational Policy"
    ],
    "A",
    "1. Premature evaluation occurs when a receiver forms an opinion or judgment before listening to the complete message, blocking receptive communication.\nHence, Option {{CORR}} is correct.",
    "Defines Premature Evaluation."
)
add_q(make_question(CHAPTER, "Barriers to Communication", "Evaluating and forming a biased conclusion about a proposal before hearing the complete presentation is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Lack of attention and preoccupation of mind",
    [
        "Unclarified assumptions",
        "Badly expressed message",
        "Symbols with multiple meanings"
    ],
    "B",
    "1. When an employee is mentally preoccupied with personal worries, they fail to pay attention to instructions, representing a Psychological Barrier.\nHence, Option {{CORR}} is correct.",
    "Identifies lack of attention as a psychological barrier."
)
add_q(make_question(CHAPTER, "Barriers to Communication", "A subordinate is deeply worried about a family medical emergency and misses verbal safety instructions. This illustrates:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Organizational Barriers",
    [
        "Semantic Barriers",
        "Psychological Barriers",
        "Personal Barriers"
    ],
    "C",
    "1. Organizational policy, rigid rules, multi-tier tall hierarchy, and status distances constitute Organizational Barriers.\nHence, Option {{CORR}} is correct.",
    "Defines Organizational Barriers."
)
add_q(make_question(CHAPTER, "Barriers to Communication", "Barriers related to organizational structure, rigid rules, scalar chain length, and status consciousness are:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Personal Barriers",
    [
        "Semantic Barriers",
        "Technical Jargon",
        "Linguistic Barriers"
    ],
    "D",
    "1. Personal factors of superiors (fear of challenge to authority, lack of confidence in subordinates) and subordinates (unwillingness to communicate) are Personal Barriers.\nHence, Option {{CORR}} is correct.",
    "Defines Personal Barriers."
)
add_q(make_question(CHAPTER, "Barriers to Communication", "A superior concealing vital operational data because of a fear that it may diminish their personal authority exemplifies:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Clarify ideas before communication and consult others in planning communication",
    [
        "Use highly complex vocabulary to intimidate subordinates into obedience",
        "Discourage feedback so that orders remain unquestioned",
        "Send messages exclusively when angry to show executive passion"
    ],
    "A",
    "1. Effective communication requires the sender to clarify ideas before communicating, consult others, use clear language, and ensure proper feedback.\nHence, Option {{CORR}} is correct.",
    "Highlights measures to improve communication."
)
add_q(make_question(CHAPTER, "Improving Communication", "Which of the following is a recommended managerial measure to overcome communication barriers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ensure proper feedback and be a good listener",
    [
        "Cut off all contact with informal employee groups",
        "Abolish written communication entirely in favor of whispers",
        "Penalize subordinates who ask clarifying questions"
    ],
    "B",
    "1. Ensuring proper feedback confirms whether the message was received as intended, and active listening resolves misunderstandings.\nHence, Option {{CORR}} is correct.",
    "Emphasizes feedback and active listening."
)
add_q(make_question(CHAPTER, "Improving Communication", "To verify whether instructions have been understood accurately, what critical practice must managers follow?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Semantic barrier: Symbols with different meanings",
    [
        "Psychological barrier: Distrust",
        "Organizational barrier: Rules and regulations",
        "Personal barrier: Lack of proper incentive"
    ],
    "C",
    "1. When words have multiple meanings (such as 'value' meaning price vs ethics) and the receiver misinterprets it, it is a Semantic Barrier.\nHence, Option {{CORR}} is correct.",
    "Identifies symbols with different meanings as semantic barrier."
)
add_q(make_question(CHAPTER, "Barriers to Communication", "A manager uses the word 'Value' intending ethical standards, but the accountant interprets it as monetary price. This is a:", opts, corr, sol))

# =================================================================================================
# 5. Statement I & Statement II Questions (Q63 - Q71)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Elements of Directing",
    "Directing comprises four core elements: Supervision, Motivation, Leadership, and Communication.",
    "Directing is a one-time activity performed only during the establishment of a business enterprise.",
    "C",
    "1. Statement I is true: The four elements of directing are supervision, motivation, leadership, and communication.\n2. Statement II is false: Directing is a continuous ongoing function throughout the life of the organization.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Maslow's Need Hierarchy",
    "According to Maslow, physiological needs include hunger, thirst, shelter, and sleep.",
    "A satisfied need continues to serve as an active motivator indefinitely.",
    "C",
    "1. Statement I is true: Physiological needs are fundamental survival needs.\n2. Statement II is false: Maslow posited that once a need is satisfied, it ceases to motivate behavior.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Leadership Styles",
    "An autocratic leader centralizes decision-making authority and commands strict obedience without consultation.",
    "A democratic leader makes decisions collaboratively by consulting with subordinates and encouraging participation.",
    "A",
    "1. Statement I is true: Autocratic leaders command dogmatically with centralized authority.\n2. Statement II is true: Democratic leaders involve team members through consultation.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Financial and Non-Financial Incentives",
    "Employee Stock Option Plans (ESOPs) are classified as non-financial incentives.",
    "Job enrichment involves designing jobs with greater variety, autonomy, and intellectual challenge.",
    "D",
    "1. Statement I is false: ESOPs are co-partnership schemes and represent financial incentives.\n2. Statement II is true: Job enrichment enhances psychological satisfaction through task autonomy.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Communication Process",
    "Encoding is the process of translating thoughts and ideas into communicative symbols.",
    "Decoding is performed by the sender before transmitting the message through a medium.",
    "C",
    "1. Statement I is true: Sender encodes message into symbols.\n2. Statement II is false: Decoding is performed by the receiver to interpret the received symbols.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Barriers to Communication",
    "Technical jargon and symbols with multiple meanings are classified as Semantic Barriers.",
    "Premature evaluation and lack of attention are classified as Organizational Barriers.",
    "C",
    "1. Statement I is true: Linguistic issues and jargon are semantic barriers.\n2. Statement II is false: Premature evaluation and lack of attention are Psychological/Emotional barriers.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Laissez-faire Leadership",
    "Under laissez-faire leadership, the manager makes all decisions unilaterally and strictly polices subordinates.",
    "Laissez-faire leadership is highly effective when followers are self-motivated, highly trained professional experts.",
    "D",
    "1. Statement I is false: Laissez-faire leaders grant complete freedom to subordinates rather than making unilateral decisions.\n2. Statement II is true: It works exceptionally well with competent, autonomous experts.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Directing Principles",
    "The principle of Harmony of Objectives states that individual employee goals should be aligned with organizational goals.",
    "The principle of Unity of Command encourages subordinates to receive orders simultaneously from multiple superiors.",
    "C",
    "1. Statement I is true: Harmony of objectives reconciles individual and enterprise goals.\n2. Statement II is false: Unity of command insists on having only one superior per subordinate.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Motivation Features",
    "Motivation is an internal psychological feeling that produces goal-directed behavior.",
    "Motivation can only be positive (rewards) and can never be negative (penalties or fear).",
    "C",
    "1. Statement I is true: Motivation is internal and goal-directed.\n2. Statement II is false: Motivation can be positive (promotions, praise) or negative (fines, threats of demotion).\nHence, Option C is correct."
))

# =================================================================================================
# 6. Assertion & Reason Questions (Q72 - Q80)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Directing Importance",
    "Directing initiates action in an organization.",
    "While other managerial functions create the framework, directing activates people to begin operational work.",
    "A",
    "1. Assertion (A) is true: Directing is the initiator of organizational action.\n2. Reason (R) is true and explains (A): Planning, organizing, and staffing prepare resources, but directing actually triggers human action.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Maslow's Need Hierarchy",
    "A manager must identify the unsatisfied need level of an employee to motivate them effectively.",
    "A need that has already been satisfied ceases to serve as an active motivator of human behavior.",
    "A",
    "1. Assertion (A) is true: Managers must target unsatisfied needs.\n2. Reason (R) is true and explains (A): According to Maslow, satisfied needs lose motivating power; only unsatisfied higher needs drive action.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Democratic Leadership",
    "A democratic leadership style fosters high employee commitment and job satisfaction.",
    "Subordinates feel respected and valued when they actively participate in operational decision-making.",
    "A",
    "1. Assertion (A) is true: Democratic leadership boosts commitment.\n2. Reason (R) is true and provides the psychological explanation for (A): Involving employees creates a sense of ownership over decisions.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Semantic Barriers",
    "Specialists who use technical jargon often fail to communicate effectively with general workers.",
    "Technical terms and specialist acronyms are easily understood by every layperson without any prior technical training.",
    "C",
    "1. Assertion (A) is true: Technical jargon creates semantic barriers.\n2. Reason (R) is false: Non-specialists cannot understand complex technical terminology without background knowledge.\nHence, Option C is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Non-Financial Incentives",
    "Job enrichment satisfies the higher-order esteem and self-actualization needs of employees.",
    "Job enrichment designs work to provide greater variety, challenge, autonomy, and personal growth opportunities.",
    "A",
    "1. Assertion (A) is true: Job enrichment fulfills higher-level psychological needs.\n2. Reason (R) is true and explains (A): Autonomy and challenge directly foster self-esteem and self-realization.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Communication Feedback",
    "Feedback is an indispensable element of the communication process.",
    "Feedback confirms to the sender whether the message has been accurately decoded and understood by the receiver.",
    "A",
    "1. Assertion (A) is true: Feedback completes the communication loop.\n2. Reason (R) is true and explains (A): Without feedback, the sender cannot know if the message achieved intended comprehension.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Autocratic Leadership",
    "Autocratic leadership style is suitable for all modern creative design studios.",
    "Autocratic leadership relies on centralized decision-making and one-way downward communication without subordinate consultation.",
    "D",
    "1. Assertion (A) is false: Autocratic style stifles creativity and is unsuitable for creative studios.\n2. Reason (R) is true: It relies on centralized authority and one-way directives.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Psychological Barriers",
    "Premature evaluation hinders effective organizational communication.",
    "A receiver who judges a message beforehand projects personal biases and fails to absorb the objective information.",
    "A",
    "1. Assertion (A) is true: Premature evaluation obstructs communication.\n2. Reason (R) is true and explains (A): Preconceived judgment closes the receiver's mind to the incoming message.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Principles of Directing",
    "Harmony of Objectives requires management to eliminate all wage payments to employees.",
    "Harmony of Objectives guides management to integrate employee personal goals with organizational objectives.",
    "D",
    "1. Assertion (A) is false: Harmony of objectives does not eliminate wages; it harmonizes fair wages with company goals.\n2. Reason (R) is true: It seeks alignment between employee aspirations and organizational efficiency.\nHence, Option D is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 7!")
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit7.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
