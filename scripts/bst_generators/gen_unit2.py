import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Principles of Management"
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

print("Generating 80 unique questions for Unit 2: Principles of Management...")

# =================================================================================================
# 1. Nature & Significance of Principles of Management (Q1 - Q12)
# =================================================================================================

opts, corr, sol = rotate_options(
    "They are applicable to all types of organizations across various levels of management",
    [
        "They are rigidly enforced statutory mandates with penal consequences",
        "They apply exclusively to multinational software engineering corporations",
        "They are purely mathematical equations with zero behavioral variance"
    ],
    "A",
    "1. Management principles have universal applicability (pervasive nature), meaning they apply to all types, sizes, and levels of organizations.\nHence, Option {{CORR}} is correct.",
    "Correctly describes universal applicability of management principles."
)
add_q(make_question(CHAPTER, "Nature of Principles", "What is meant by the 'Universal Applicability' of management principles?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "General guidelines to action, but do not provide ready-made straitjacket solutions to all problems",
    [
        "Absolute biological axioms that guarantee infallible corporate outcomes",
        "Static and unalterable rules that can never be modified by managers",
        "Purely discretionary poetic maxims with zero professional relevance"
    ],
    "B",
    "1. Principles of management are general guidelines to managerial action because business situations are complex and dynamic; they do not offer ready-made straitjacket solutions.\nHence, Option {{CORR}} is correct.",
    "Recognizes management principles as general guidelines rather than rigid solutions."
)
add_q(make_question(CHAPTER, "Nature of Principles", "Why are management principles characterized as 'General Guidelines'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Formed by practice, observation, and repeated experimentation in diverse workplace conditions",
    [
        "Drafted overnight by government legislative bodies as labor statutes",
        "Arbitrarily derived from folklore without empirical managerial testing",
        "Dictated solely by financial accounting software algorithms"
    ],
    "C",
    "1. Management principles are formed by practice and experimentation based on collective experience and research of managers over decades.\nHence, Option {{CORR}} is correct.",
    "Affirms that principles are developed empirically through experimentation and practice."
)
add_q(make_question(CHAPTER, "Nature of Principles", "How are principles of management derived and formulated according to administrative theory?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They can be modified and adapted by the manager according to the demands of the situation",
    [
        "They can never be altered regardless of technological or market changes",
        "They dictate the exact physical movement of every employee down to the millisecond",
        "They must be legally registered with the Registrar of Companies before adoption"
    ],
    "D",
    "1. Management principles are flexible and not rigid prescriptions. They can be modified by the practicing manager as per situational demands.\nHence, Option {{CORR}} is correct.",
    "Highlights the flexible and adaptable nature of management principles."
)
add_q(make_question(CHAPTER, "Nature of Principles", "What does the 'Flexible' characteristic of management principles signify?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mainly behavioural",
    [
        "Purely mathematical",
        "Statutory and penal",
        "Mechanistic and lifeless"
    ],
    "A",
    "1. Since management principles aim at influencing complex human behavior at work, they are 'mainly behavioural' in character.\nHence, Option {{CORR}} is correct.",
    "Identifies that management principles are mainly behavioral in nature."
)
add_q(make_question(CHAPTER, "Nature of Principles", "Which characteristic of management principles emphasizes their primary concern with influencing human conduct in an organization?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cause and effect relationship",
    [
        "Absolute physical determinism",
        "Uncontrolled stochastic randomness",
        "Exclusive legal accountability"
    ],
    "B",
    "1. Management principles establish a cause and effect relationship so that they can be used in similar situations to predict organizational outcomes.\nHence, Option {{CORR}} is correct.",
    "Identifies the establishment of cause and effect relationships as a key feature."
)
add_q(make_question(CHAPTER, "Nature of Principles", "The principle indicates that if a particular managerial action is taken in a given situation, a similar result is likely to occur. Which feature does this reflect?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Contingent",
    [
        "Absolute",
        "Invariable",
        "Constitutional"
    ],
    "C",
    "1. The application of management principles is contingent or dependent upon the prevailing conditions at a particular point in time.\nHence, Option {{CORR}} is correct.",
    "Defines the contingent nature of management principles."
)
add_q(make_question(CHAPTER, "Nature of Principles", "The application of management principles depends upon the prevailing organizational situation at a particular point in time. This illustrates that principles are:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Optimum utilization of resources and effective administration",
    [
        "Complete elimination of business competition through administrative monopolies",
        "Abolition of all wages and compensation to maximize corporate retained surplus",
        "Guaranteeing zero tax liability across international financial borders"
    ],
    "D",
    "1. A major significance of management principles is enabling optimum utilization of scarce physical, financial, and human resources while facilitating effective administration.\nHence, Option {{CORR}} is correct.",
    "Identifies optimal resource utilization and effective administration as core significance."
)
add_q(make_question(CHAPTER, "Significance of Principles", "Which of the following is a major practical significance of understanding principles of management for practicing executives?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Providing managers with useful insights into reality",
    [
        "Providing unconditional legal immunity to company board directors",
        "Replacing the need for any human judgment in corporate decision-making",
        "Automating all customer service calls without human involvement"
    ],
    "A",
    "1. Principles of management provide managers with useful insights into real-world business situations, improving managerial efficiency over time.\nHence, Option {{CORR}} is correct.",
    "Recognizes principles as providing useful insights into real business situations."
)
add_q(make_question(CHAPTER, "Significance of Principles", "Adherence to management principles enriches managerial knowledge and ability to handle recurring organizational challenges. This reflects which significance?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Scientific decisions free from bias and prejudice",
    [
        "Decisions based purely on arbitrary personal whims and intuition of senior bosses",
        "Decisions dictated strictly by astrological forecasts and supernatural beliefs",
        "Decisions made solely to minimize tax audits without operational viability"
    ],
    "B",
    "1. Management principles facilitate scientific and objective decision-making, emphasizing facts, logic, and realistic assessment rather than rule-of-thumb or blind guesswork.\nHence, Option {{CORR}} is correct.",
    "Emphasizes scientific, objective, and unbiased decision making."
)
add_q(make_question(CHAPTER, "Significance of Principles", "How do management principles assist managers in making 'Scientific Decisions'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Meeting changing environment requirements",
    [
        "Promoting administrative stagnation in legacy industrial setups",
        "Restricting product exports to preserve domestic consumer goods",
        "Eliminating consumer choice through uniform state-mandated packaging"
    ],
    "C",
    "1. Principles are dynamic and flexible, enabling organizations to modify operational processes to meet the demands of a changing business environment.\nHence, Option {{CORR}} is correct.",
    "Recognizes adaptation to dynamic business environments."
)
add_q(make_question(CHAPTER, "Significance of Principles", "Principles of management are modified by managers to align with evolving market trends and technological shifts. Which significance does this highlight?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Fulfilling social responsibility and management training/education",
    [
        "Evading workplace safety laws to maximize short-term factory throughput",
        "Imposing punitive fines on consumers who register product warranty complaints",
        "Enforcing secret price-fixing cartels among market oligopolies"
    ],
    "D",
    "1. Modern management principles guide businesses in fulfilling corporate social responsibilities (e.g., fair remuneration, equity) and form the bedrock of management training and education.\nHence, Option {{CORR}} is correct.",
    "Identifies social responsibility and management training as crucial benefits."
)
add_q(make_question(CHAPTER, "Significance of Principles", "Which of the following modern dimensions of management significance is directly promoted through principles like 'Remuneration' and 'Equity'?", opts, corr, sol))

# =================================================================================================
# 2. Fayol's 14 Principles of Management (Q13 - Q30)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Division of Work",
    [
        "Unity of Command",
        "Order",
        "Esprit de Corps"
    ],
    "A",
    "1. Division of work involves dividing complex tasks into smaller, specialized jobs, which leads to specialization, higher efficiency, and greater output.\nHence, Option {{CORR}} is correct.",
    "Identifies Division of Work as leading to job specialization."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "Dividing work into compact specialized jobs so that each worker performs a repetitive portion leading to mastery is known as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Authority and Responsibility",
    [
        "Scalar Chain",
        "Discipline",
        "Centralization"
    ],
    "B",
    "1. Parity between authority (right to give orders) and responsibility (obligation to perform assigned duties) is essential. Authority without responsibility leads to misuse, and responsibility without authority causes frustration.\nHence, Option {{CORR}} is correct.",
    "Highlights balance between authority and responsibility."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "Which principle states that there must be a requisite balance between the official right to command and the commensurate obligation to perform?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Discipline",
    [
        "Subordination of Individual Interest",
        "Equity",
        "Initiative"
    ],
    "C",
    "1. Discipline implies obedience to organizational rules, employment agreements, respectful conduct, and judicious application of penalties by fair supervisors.\nHence, Option {{CORR}} is correct.",
    "Defines Discipline as obedience to organizational rules and agreements."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "Obedience to company regulations, respectful conduct towards superiors, and honoring contractual commitments without evasion reflects which Fayol principle?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Unity of Command",
    [
        "Unity of Direction",
        "Scalar Chain",
        "Order"
    ],
    "D",
    "1. Unity of Command states that an employee should receive orders from and be accountable to only one superior to prevent confusion and dual subordination.\nHence, Option {{CORR}} is correct.",
    "Defines Unity of Command as having a single superior."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "If an employee receives conflicting operational instructions from two different departmental heads simultaneously, which principle is violated?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Unity of Direction",
    [
        "Unity of Command",
        "Division of Work",
        "Remuneration of Employees"
    ],
    "A",
    "1. Unity of Direction implies 'One head and one plan' for a group of activities having the same objective, ensuring unified focus across departments.\nHence, Option {{CORR}} is correct.",
    "Identifies Unity of Direction as 'One head and one plan'."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "The maxim 'One unit, one plan' advocating that all activities with the same objective must be directed under a single leader and unified plan corresponds to:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Subordination of Individual Interest to General Interest",
    [
        "Remuneration of Employees",
        "Centralization and Decentralization",
        "Stability of Personnel"
    ],
    "B",
    "1. The principle of Subordination of Individual Interest to General Interest demands that the goals of the organization must supersede the personal interests of any single individual.\nHence, Option {{CORR}} is correct.",
    "Prioritizes organizational goals over individual interests."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "When a plant manager sacrifices an advantageous vendor deal for his personal relative to secure the lowest cost for the company, he is upholding:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Remuneration of Employees",
    [
        "Scalar Chain",
        "Discipline",
        "Authority and Responsibility"
    ],
    "C",
    "1. The principle of Remuneration of Employees dictates that overall pay and compensation should be fair, equitable, and provide a reasonable standard of living to workers within the firm's paying capacity.\nHence, Option {{CORR}} is correct.",
    "Upholds fair and equitable compensation for employees."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "Compensation should be fair to both employees and the employer, providing a decent living standard while remaining within the paying capacity of the business. This refers to:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Centralization and Decentralization",
    [
        "Order",
        "Unity of Command",
        "Division of Work"
    ],
    "D",
    "1. Fayol advocated an optimum balance between centralization (concentration of decision-making authority) and decentralization (dispersal of authority across organizational levels).\nHence, Option {{CORR}} is correct.",
    "Balances concentration and dispersal of decision-making authority."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "The concentration of core strategic decision-making authority at the top level while delegating routine operational authority to subordinates represents an optimal balance of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Scalar Chain",
    [
        "Espirit de Corps",
        "Equity",
        "Initiative"
    ],
    "A",
    "1. Scalar Chain is the formal line of authority and communication running from highest executive to lowest ranks, which must be followed sequentially under normal circumstances.\nHence, Option {{CORR}} is correct.",
    "Defines the unbroken formal hierarchy of authority and communication."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "The formal hierarchical line of authority running sequentially from the top executive down to the lowest operative worker is termed as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gang Plank",
    [
        "Scalar Bridge",
        "Lateral Gateway",
        "Functional By-pass"
    ],
    "B",
    "1. A Gang Plank is a direct contact route between two employees at the same hierarchical level in an emergency to avoid communication delays along the scalar chain.\nHence, Option {{CORR}} is correct.",
    "Identifies Gang Plank as the emergency horizontal communication mechanism."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "To prevent delays in an emergency, Fayol suggested a shorter lateral communication channel between colleagues of identical rank without violating hierarchy. This is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Order",
    [
        "Discipline",
        "Equity",
        "Initiative"
    ],
    "C",
    "1. The principle of Order states: 'A place for everything (everyone) and everything (everyone) in its (his/her) place', ensuring systemic arrangement of materials and personnel.\nHence, Option {{CORR}} is correct.",
    "Identifies Order as having a dedicated place for every material and person."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "The managerial principle that emphasizes 'a place for everything and everyone, and everything and everyone in its assigned place' to avoid wasted search time is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Equity",
    [
        "Centralization",
        "Unity of Command",
        "Scalar Chain"
    ],
    "D",
    "1. Equity emphasizes kindliness, justice, and impartiality in managers' behavior toward subordinates, with zero discrimination on religion, caste, sex, or nationality.\nHence, Option {{CORR}} is correct.",
    "Recognizes Equity as fair, kind, and non-discriminatory treatment."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "Treating all employees with justice, kindness, and impartiality, without religious, gender, or regional prejudices, is the core of which Fayol principle?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Stability of Personnel",
    [
        "Division of Work",
        "Remuneration",
        "Order"
    ],
    "A",
    "1. Stability of Personnel advocates that employees should not be shifted from positions frequently and should be given a stable tenure to show results and reduce recruitment costs.\nHence, Option {{CORR}} is correct.",
    "Highlights tenure security and minimizing employee turnover."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "Minimizing employee turnover by providing a secure tenure and sufficient time for workers to demonstrate performance aligns with:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Initiative",
    [
        "Discipline",
        "Unity of Direction",
        "Authority and Responsibility"
    ],
    "B",
    "1. Initiative means taking the first step with self-motivation. Fayol advised encouraging workers to formulate and execute ideas to foster creative commitment.\nHence, Option {{CORR}} is correct.",
    "Defines Initiative as encouraging voluntary first steps and suggestions."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "Encouraging subordinates to formulate and carry out their creative plans and improvement suggestions with freedom is the application of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Esprit de Corps",
    [
        "Gang Plank",
        "Functional Foremanship",
        "Subordination of Interest"
    ],
    "C",
    "1. Esprit de Corps means team spirit and mutual harmony among workers. Managers should replace 'I' with 'We' to foster camaraderie and organizational unity.\nHence, Option {{CORR}} is correct.",
    "Identifies Esprit de Corps as promoting team spirit and substituting 'I' with 'We'."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "Which principle encourages management to promote team spirit, mutual trust, and belongingness by consciously substituting 'I' with 'We' in conversations?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Unity of Command prevents dual subordination; Unity of Direction prevents overlapping activities",
    [
        "Unity of Command relates to departments; Unity of Direction relates only to top managers",
        "Unity of Command was propounded by Taylor; Unity of Direction was propounded by Weber",
        "Unity of Command encourages multiple bosses; Unity of Direction enforces a single boss"
    ],
    "D",
    "1. Unity of command avoids dual subordination of an individual worker, whereas unity of direction prevents overlapping of organizational functions across departments.\nHence, Option {{CORR}} is correct.",
    "Clarifies the precise distinction between Unity of Command and Unity of Direction."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "What is the primary difference between Fayol's 'Unity of Command' and 'Unity of Direction'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Mining Engineer / Administrative Management Theorist",
    [
        "Mechanical Engineer / Scientific Shop-floor Theorist",
        "Constitutional Lawyer / Bureaucratic Rule Theorist",
        "Clinical Psychologist / Behavioral Motivation Theorist"
    ],
    "A",
    "1. Henri Fayol was a French mining engineer and management theorist known as the 'Father of General Management', focusing on top-level administrative functions.\nHence, Option {{CORR}} is correct.",
    "Identifies Henri Fayol's professional background and theoretical focus."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "Henri Fayol, known as the 'Father of General Management', developed his administrative perspective from his background as a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Administration Industrielle et Générale (1916)",
    [
        "The Principles of Scientific Management (1911)",
        "The Wealth of Nations (1776)",
        "General Theory of Employment, Interest and Money (1936)"
    ],
    "B",
    "1. Henri Fayol published his pioneering 14 principles in his seminal French work 'Administration Industrielle et Générale' in 1916.\nHence, Option {{CORR}} is correct.",
    "Identifies Fayol's classic book."
)
add_q(make_question(CHAPTER, "Fayol's Principles", "In which renowned treatise did Henri Fayol originally publish his 14 universal principles of administrative management?", opts, corr, sol))

# =================================================================================================
# 3. Taylor's Scientific Management: Principles (Q31 - Q40)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Science, not Rule of Thumb",
    [
        "Harmony, not Discord",
        "Cooperation, not Individualism",
        "Development of each person to greatest efficiency"
    ],
    "C",
    "1. 'Science, not Rule of Thumb' advocates replacing trial-and-error personal judgment with rigorous scientific investigation of work methods to identify the one best way.\nHence, Option {{CORR}} is correct.",
    "Identifies Science, not Rule of Thumb as replacing trial-and-error intuition."
)
add_q(make_question(CHAPTER, "Taylor's Scientific Management", "Replacing trial-and-error guesswork and personal intuition with objective inquiry to determine the 'one best way' of doing a job represents which principle?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Harmony, not Discord",
    [
        "Science, not Rule of Thumb",
        "Division of Work",
        "Scalar Chain"
    ],
    "D",
    "1. 'Harmony, not Discord' emphasizes complete harmony between management and workers through a complete mental revolution, recognizing that mutual prosperity is interdependent.\nHence, Option {{CORR}} is correct.",
    "Defines Harmony, not Discord as mutual prosperity and eliminating class conflict."
)
add_q(make_question(CHAPTER, "Taylor's Scientific Management", "Which principle of scientific management asserts that management and workers should cultivate complete mutual understanding and eradicate class conflict?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A total psychological change of outlook between management and workers regarding their mutual responsibilities and profit sharing",
    [
        "A political rebellion organized by factory trade unions against private capital",
        "A mental health psychotherapy session conducted annually for senior managers",
        "A computer programming shift from manual ledgers to database servers"
    ],
    "A",
    "1. A 'Mental Revolution' involves a complete transformation in the mental attitude of both workers and management from fighting over surplus to cooperating in expanding the surplus.\nHence, Option {{CORR}} is correct.",
    "Defines Taylor's concept of Mental Revolution."
)
add_q(make_question(CHAPTER, "Taylor's Scientific Management", "What did F.W. Taylor signify by the term 'Mental Revolution'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cooperation, not Individualism",
    [
        "Science, not Rule of Thumb",
        "Order",
        "Centralization"
    ],
    "B",
    "1. 'Cooperation, not Individualism' is an extension of 'Harmony, not Discord'. It mandates management to welcome constructive worker suggestions and involve them in setting standards.\nHence, Option {{CORR}} is correct.",
    "Identifies Cooperation, not Individualism as an extension of Harmony."
)
add_q(make_question(CHAPTER, "Taylor's Scientific Management", "Which principle is considered an explicit extension of 'Harmony, not Discord', emphasizing mutual consultation in setting work standards?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Development of each and every person to his or her greatest efficiency and prosperity",
    [
        "Subordination of Individual Interest to General Interest",
        "Remuneration of Employees",
        "Standardization of Equipment"
    ],
    "C",
    "1. This principle requires scientific selection of workers, tailoring jobs to their physical/intellectual capabilities, and continuously upgrading skills through modern training.\nHence, Option {{CORR}} is correct.",
    "Highlights systematic selection, skill upgrading, and employee prosperity."
)
add_q(make_question(CHAPTER, "Taylor's Scientific Management", "Carefully selecting employees based on scientific tests and continuously upgrading their technical competencies through training reflects:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "F.W. Taylor focused on the shop floor/operational level, whereas Henri Fayol focused on the overall administrative top level",
    [
        "Taylor developed 14 principles, whereas Fayol formulated Functional Foremanship",
        "Taylor was a French mining executive, whereas Fayol was an American mechanical apprentice",
        "Taylor rejected differential piece wages, whereas Fayol strictly enforced it on all clerks"
    ],
    "D",
    "1. Taylor's scientific management focused from the shop floor (bottom-up) upward, whereas Fayol's administrative theory took an executive top-down approach.\nHence, Option {{CORR}} is correct.",
    "Captures the key structural difference between Taylor and Fayol's perspectives."
)
add_q(make_question(CHAPTER, "Taylor vs Fayol", "Which of the following fundamentally differentiates F.W. Taylor's perspective from Henri Fayol's approach?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Functional Foremanship violates Fayol's Unity of Command",
    [
        "Functional Foremanship is completely identical to Fayol's Unity of Direction",
        "Functional Foremanship enforces a single boss for each factory operative",
        "Functional Foremanship was discarded by Taylor in favor of Scalar Chain"
    ],
    "A",
    "1. Taylor's Functional Foremanship involves 8 specialized bosses commanding a single operative worker, directly violating Fayol's principle of Unity of Command (one boss per worker).\nHence, Option {{CORR}} is correct.",
    "Identifies how Functional Foremanship directly violates Unity of Command."
)
add_q(make_question(CHAPTER, "Taylor vs Fayol", "How does F.W. Taylor's technique of 'Functional Foremanship' correlate with Henri Fayol's 14 principles?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Father of Scientific Management",
    [
        "Father of Human Relations Movement",
        "Father of Modern Macroeconomics",
        "Father of Classical Bureaucracy"
    ],
    "B",
    "1. Frederick Winslow Taylor (F.W. Taylor) is universally acclaimed as the 'Father of Scientific Management' for applying engineering techniques to shop-floor productivity.\nHence, Option {{CORR}} is correct.",
    "Acknowledges Taylor as the Father of Scientific Management."
)
add_q(make_question(CHAPTER, "Taylor's Scientific Management", "Due to his pioneering shop-floor experiments at Bethlehem Steel and Midvale Steel, F.W. Taylor is known as the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Paternalistic style involving benevolent autocratic care",
    [
        "Taylor's Scientific Management",
        "Fayol's Administrative Theory",
        "Weber's Legal-Rational Model"
    ],
    "C",
    "1. In Japanese business culture, the concept of complete mental revolution is mirrored in 'Paternalistic management', where workers do not strike and work extra hours to express grievances without hurting output.\nHence, Option {{CORR}} is correct.",
    "Relates Taylor's harmony concept to Japanese paternalistic management."
)
add_q(make_question(CHAPTER, "Taylor's Scientific Management", "The complete mental harmony between Japanese factory workers and management, where workers pin black badges and work overtime during disputes, exemplifies:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Management and workers sharing responsibilities almost equally",
    [
        "Workers carrying 100% of physical and planning burden alone",
        "Management functioning purely as supervisory onlookers with zero work design",
        "Trade unions appointing company board directors unilaterally"
    ],
    "D",
    "1. Under scientific management, there is an almost equal division of work and responsibility between workers and management, with management handling planning and workers handling execution.\nHence, Option {{CORR}} is correct.",
    "Highlights equal division of responsibility between management and workers."
)
add_q(make_question(CHAPTER, "Taylor's Scientific Management", "Under scientific management, what is the envisioned division of responsibility between management and workers?", opts, corr, sol))

# =================================================================================================
# 4. Taylor's Techniques: Functional Foremanship & Work Study (Q41 - Q56)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Instruction Card Clerk, Route Clerk, Time and Cost Clerk, Disciplinarian",
    [
        "Speed Boss, Gang Boss, Repair Boss, Inspector",
        "General Manager, Marketing Head, Plant Superintendent, Supervisor",
        "Cashier, Auditor, Chief Accountant, Tax Consultant"
    ],
    "A",
    "1. Under the Planning Incharge in Functional Foremanship, the four specialists are: Instruction Card Clerk, Route Clerk, Time and Cost Clerk, and Disciplinarian.\nHence, Option {{CORR}} is correct.",
    "Lists the four foremen under the Planning Incharge."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Which group of four foremen operates strictly under the 'Planning Incharge' in Taylor's Functional Foremanship?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Speed Boss, Gang Boss, Repair Boss, Inspector",
    [
        "Instruction Card Clerk, Route Clerk, Time and Cost Clerk, Disciplinarian",
        "Draftsman, Designer, Tool Keeper, Pattern Maker",
        "Purchasing Officer, Storekeeper, Dispatch Clerk, Logistics Driver"
    ],
    "B",
    "1. Under the Production/Execution Incharge, the four functional bosses are: Speed Boss, Gang Boss, Repair Boss, and Inspector.\nHence, Option {{CORR}} is correct.",
    "Lists the four foremen under the Production Incharge."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Which four specialists supervise workers directly under the 'Production Incharge' in Functional Foremanship?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Drafting detailed operational instructions for workers outlining machine settings and procedures",
    [
        "Fixing the sequence and trajectory of factory production operations",
        "Maintaining machine tools and keeping them in working order",
        "Checking and certifying the quality of finished manufactured items"
    ],
    "C",
    "1. The Instruction Card Clerk is responsible for drafting clear, detailed operational instructions for workers outlining task procedures and guidelines.\nHence, Option {{CORR}} is correct.",
    "Defines the role of the Instruction Card Clerk."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "What is the specific duty assigned to the 'Instruction Card Clerk' in Functional Foremanship?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Determining the exact chronological route and sequence of factory manufacturing operations",
    [
        "Calculating the daily wages and cost sheets for factory workers",
        "Enforcing discipline and issuing penalties for late attendance",
        "Keeping all tools, machines, and materials assembled ready for workers"
    ],
    "D",
    "1. The Route Clerk specifies the exact sequence and step-by-step path of production operations through which materials must flow.\nHence, Option {{CORR}} is correct.",
    "Defines the duty of the Route Clerk."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Which foreman is responsible for specifying the exact step-by-step mechanical path and sequence of work?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Time and Cost Clerk",
    [
        "Disciplinarian",
        "Gang Boss",
        "Repair Boss"
    ],
    "A",
    "1. The Time and Cost Clerk prepares time schedules for starting and finishing jobs and records production costs on detailed cost sheets.\nHence, Option {{CORR}} is correct.",
    "Identifies the Time and Cost Clerk."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Preparing the official factory timetable for job completion and calculating operational labor cost sheets is the role of the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Disciplinarian",
    [
        "Inspector",
        "Speed Boss",
        "Route Clerk"
    ],
    "B",
    "1. The Disciplinarian ensures systematic, orderly performance of work according to organizational workplace rules and codes of conduct.\nHence, Option {{CORR}} is correct.",
    "Identifies the Disciplinarian foreman."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Which functional specialist ensures that factory regulations are respected and systematic discipline is maintained among workers?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Gang Boss",
    [
        "Instruction Card Clerk",
        "Speed Boss",
        "Inspector"
    ],
    "C",
    "1. The Gang Boss ensures that machines, tools, materials, and equipment are arranged and ready for immediate operation by the workers.\nHence, Option {{CORR}} is correct.",
    "Identifies the Gang Boss as keeping machines and tools ready."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Keeping all machines, tools, jigs, fixtures, and raw materials ready and assembled for immediate use by workers is the function of the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Speed Boss",
    [
        "Repair Boss",
        "Route Clerk",
        "Disciplinarian"
    ],
    "D",
    "1. The Speed Boss ensures timely and accurate completion of assigned jobs by supervising worker operating pace and machine speeds.\nHence, Option {{CORR}} is correct.",
    "Identifies the Speed Boss ensuring timely completion."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "The functional foreman responsible for ensuring that jobs are completed on time at the designated operational speed is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Repair Boss",
    [
        "Gang Boss",
        "Inspector",
        "Instruction Card Clerk"
    ],
    "A",
    "1. The Repair Boss is tasked with maintaining machines and mechanical equipment in proper working condition, preventing breakdowns.\nHence, Option {{CORR}} is correct.",
    "Identifies the Repair Boss maintaining machinery."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Ensuring proper maintenance, routine servicing, and upkeep of factory machinery and tools is the specific duty of the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Inspector",
    [
        "Route Clerk",
        "Speed Boss",
        "Time and Cost Clerk"
    ],
    "B",
    "1. The Inspector checks and certifies that the quality of manufactured goods strictly conforms to established engineering standards.\nHence, Option {{CORR}} is correct.",
    "Identifies the Inspector verifying product quality."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Checking the precision, tolerance, and quality standards of finished output against established technical benchmarks is handled by the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Standardization and Simplification of Work",
    [
        "Method Study",
        "Motion Study",
        "Fatigue Study"
    ],
    "C",
    "1. Standardization establishes benchmarks for sizes, types, and quality, while Simplification eliminates unnecessary varieties, sizes, and dimensions to reduce tool and inventory costs.\nHence, Option {{CORR}} is correct.",
    "Defines Standardization and Simplification of Work."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Establishing uniform benchmarks for products and eliminating superfluous varieties, sizes, and product dimensions is known as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Method Study",
    [
        "Time Study",
        "Motion Study",
        "Fatigue Study"
    ],
    "D",
    "1. Method Study aims to find the 'one best way' of doing a job from raw material procurement to final customer delivery to minimize costs and maximize quality.\nHence, Option {{CORR}} is correct.",
    "Defines Method Study as identifying the one best way."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "The objective of finding the 'one best way' of performing an entire industrial manufacturing operation from start to finish is achieved through:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Motion Study",
    [
        "Fatigue Study",
        "Differential Piece Wage System",
        "Standardization"
    ],
    "A",
    "1. Motion Study studies worker bodily movements (lifting, putting, sitting) to identify and eliminate unproductive and wasteful motions.\nHence, Option {{CORR}} is correct.",
    "Defines Motion Study as eliminating wasteful body movements."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Studying physical movements of workers like lifting, bending, and reaching to eliminate unnecessary and wasteful movements uses:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Time Study",
    [
        "Method Study",
        "Fatigue Study",
        "Simplification"
    ],
    "B",
    "1. Time Study uses a stopwatch to measure the standard time taken by an average worker to perform a well-defined job, setting standard output per day.\nHence, Option {{CORR}} is correct.",
    "Defines Time Study using a stopwatch to establish standard time."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Using a stopwatch to determine the standard time required by an average operative to execute a specified task is termed:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Fatigue Study",
    [
        "Motion Study",
        "Method Study",
        "Functional Foremanship"
    ],
    "C",
    "1. Fatigue Study determines the amount and frequency of rest intervals required by workers to regain stamina and avoid physical exhaustion.\nHence, Option {{CORR}} is correct.",
    "Defines Fatigue Study for determining rest intervals."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Determining the optimum frequency and duration of rest pauses required for factory workers to replenish physical energy is the objective of:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Differential Piece Wage System",
    [
        "Uniform Hourly Rate System",
        "Profit-Sharing Stock Option System",
        "Fixed Monthly Salary System"
    ],
    "D",
    "1. Differential Piece Wage System rewards efficient workers who meet/exceed standard output with a higher piece rate and penalizes inefficient workers with a lower piece rate.\nHence, Option {{CORR}} is correct.",
    "Defines Differential Piece Wage System."
)
add_q(make_question(CHAPTER, "Taylor's Techniques", "Paying a higher piece-rate to workers who achieve or exceed the standard quota and a lower piece-rate to those who fall below it is the hallmark of:", opts, corr, sol))

# =================================================================================================
# 5. Statement I & Statement II Questions (Q57 - Q68)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Fayol vs Taylor",
    "Henri Fayol's principles are applicable at top-level management, whereas F.W. Taylor's principles apply primarily to the shop-floor operational level.",
    "Fayol's administrative theory is formed through personal experience, whereas Taylor's scientific principles were formulated through observation and scientific experimentation.",
    "A",
    "1. Statement I is true: Fayol developed a top-down administrative model, whereas Taylor focused bottom-up at the shop-floor.\n2. Statement II is true: Fayol synthesized his ideas from extensive executive experience, while Taylor conducted rigorous laboratory and shop-floor experiments.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Fayol's Principles",
    "Unity of Command advocates that an employee should receive orders from multiple superiors to ensure cross-departmental coordination.",
    "Unity of Direction mandates that each group of activities having the same objective must have one head and one plan.",
    "D",
    "1. Statement I is false: Unity of command strictly prohibits multiple bosses and states an employee should have only one superior.\n2. Statement II is true: Unity of direction mandates 'one head and one plan' for activities with the same objective.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Taylor's Techniques",
    "Taylor's technique of Functional Foremanship is a direct application of the principle of Division of Work and specialization at the supervisory level.",
    "Functional Foremanship strictly adheres to Fayol's principle of Unity of Command by assigning one supervisor per operative.",
    "C",
    "1. Statement I is true: Functional foremanship applies division of work by splitting supervision into 8 specialized functions.\n2. Statement II is false: Functional foremanship assigns 8 supervisors to each worker, directly violating unity of command.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Scalar Chain and Gang Plank",
    "Under normal circumstances, the formal chain of communication running from top executive to lowest worker must be strictly followed.",
    "Gang Plank allows direct lateral communication only between workers of identical rank in emergencies to avoid dangerous delays.",
    "A",
    "1. Statement I is true: Scalar chain represents the mandatory formal path of communication.\n2. Statement II is true: Gang plank is an emergency exception between equals to eliminate administrative lag.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Differential Piece Wage System",
    "Under Taylor's Differential Piece Wage System, standard output is determined using Time Study.",
    "The differential piece rate scheme pays all workers the identical flat piece rate irrespective of whether they meet the standard quota.",
    "C",
    "1. Statement I is true: The baseline standard quota is scientifically set via time study.\n2. Statement II is false: It pays differentiated rates (higher rate for standard achievers, lower for underperformers).\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Management Principles",
    "Management principles are rigid mathematical formulas that must be applied identically in all corporate situations.",
    "Management principles are formed through repeated workplace observations and controlled experimentation.",
    "D",
    "1. Statement I is false: Management principles are flexible guidelines, not rigid mathematical formulas.\n2. Statement II is true: They are developed empirically through sustained observation and experimentation.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Work Study Techniques",
    "Motion study is conducted using a stopwatch to calculate standard daily work volume.",
    "Fatigue study is designed to measure the amount and frequency of rest intervals required during physical tasks.",
    "D",
    "1. Statement I is false: Time study uses a stopwatch to calculate standard volume; motion study uses film cameras to examine body motions.\n2. Statement II is true: Fatigue study determines the frequency and duration of rest pauses.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Fayol's Principles",
    "The principle of 'Order' implies that employees should strictly obey military orders and never voice any complaints.",
    "The principle of 'Equity' implies that managers should treat subordinates with justice, fairness, and absence of discrimination.",
    "D",
    "1. Statement I is false: 'Order' refers to physical and social order ('a place for everything and everyone'), not military obedience (which is 'Discipline').\n2. Statement II is true: 'Equity' means kindness, fairness, and non-discrimination.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Mental Revolution",
    "F.W. Taylor argued that mental revolution eliminates the conflict between capital and labor over division of profits.",
    "Mental revolution encourages management to corner the entire financial surplus without sharing gains with productive workers.",
    "C",
    "1. Statement I is true: Mental revolution shifts focus from dividing the surplus to increasing the surplus through mutual cooperation.\n2. Statement II is false: Taylor explicitly demanded that management share higher productivity gains with workers via higher wages.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Esprit de Corps",
    "Esprit de Corps suggests that managers should foster individualism and pit workers against one another to maximize rivalry.",
    "A manager should substitute 'I' with 'We' in conversational interactions to cultivate a team spirit.",
    "D",
    "1. Statement I is false: Esprit de corps promotes collective team spirit and harmony, rejecting hostile interpersonal rivalry.\n2. Statement II is true: Replacing 'I' with 'We' builds team cohesion.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Simplification vs Standardization",
    "Simplification aims at eliminating superfluous varieties, sizes, and dimensions of manufactured products.",
    "Standardization aims at increasing the arbitrary variety of shapes and sizes to confuse competitors.",
    "C",
    "1. Statement I is true: Simplification strips away redundant product sizes and variants.\n2. Statement II is false: Standardization establishes uniform benchmarks and interchangeability, not arbitrary variety.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Authority and Responsibility",
    "Authority refers to the official right of a manager to issue commands and exact obedience.",
    "Giving a manager responsibility without commensurate authority leads to high operational effectiveness and prompt task delivery.",
    "C",
    "1. Statement I is true: Authority is the right to give orders and enforce compliance.\n2. Statement II is false: Assigning responsibility without adequate authority renders the executive ineffective and helpless.\nHence, Option C is correct."
))

# =================================================================================================
# 6. Assertion & Reason Questions (Q69 - Q80)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Fayol's Principles",
    "Henri Fayol advocated the principle of Unity of Command.",
    "Dual subordination creates confusion, undermines discipline, and leads to conflicting loyalty among subordinates.",
    "A",
    "1. Assertion (A) is true: Fayol strictly insisted on Unity of Command.\n2. Reason (R) is true and correctly explains (A): Receiving orders from multiple bosses creates chaos, conflict, and administrative breakdown, which Unity of Command prevents.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Taylor's Techniques",
    "Functional Foremanship splits the supervision of workers into eight specialized foremen.",
    "F.W. Taylor believed that a single foreman cannot possess all the necessary technical, intellectual, and physical qualities required for effective supervision.",
    "A",
    "1. Assertion (A) is true: Taylor introduced 8 foremen (4 for planning, 4 for execution).\n2. Reason (R) is true and explains (A): Taylor observed that qualities like intelligence, judgment, dexterity, and energy cannot be found in a single individual, necessitating specialization.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Nature of Principles",
    "Management principles cannot be applied blindly as rigid mathematical formulas.",
    "Management deals with human behavior and dynamic business environments, requiring contingent adaptation.",
    "A",
    "1. Assertion (A) is true: Management principles are flexible guidelines, not rigid formulas.\n2. Reason (R) is true and correctly explains (A): Since organizations involve complex human beings and unpredictable market environments, principles must be adapted contingently.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Taylor's Scientific Management",
    "Taylor's Differential Piece Wage System acts as a powerful financial motivator for factory workers.",
    "It rewards efficient workers with a higher wage rate per unit while penalizing inefficient workers who fail to achieve the daily benchmark with a lower rate.",
    "A",
    "1. Assertion (A) is true: The differential system strongly incentivizes workers to attain high output.\n2. Reason (R) is true and explains (A): The stark income difference between the higher and lower piece rates motivates underperformers to reach standard output.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Fayol's Principles",
    "Fayol recommended the use of a 'Gang Plank' in emergencies.",
    "A Gang Plank permanently abolishes the scalar chain hierarchy across all regular corporate operations.",
    "C",
    "1. Assertion (A) is true: Fayol provided the Gang Plank as a safety valve for urgent communication.\n2. Reason (R) is false: Gang Plank does not abolish the scalar chain; it is strictly an emergency exception between equals while keeping superiors informed.\nHence, Option C is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Fayol's Principles",
    "Stability of tenure of personnel is emphasized by Henri Fayol.",
    "High employee turnover increases recruitment, selection, and training costs while diminishing operational efficiency.",
    "A",
    "1. Assertion (A) is true: Fayol highlighted stability of personnel.\n2. Reason (R) is true and correctly explains (A): Frequent dismissals and hiring cycles inflate corporate overhead and disrupt organizational learning.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Fayol's Principles",
    "The principle of 'Order' in management refers to maintaining strict silence and military commands in an office.",
    "Order ensures that there is a defined place for every material and person, minimizing time wasted searching for tools or colleagues.",
    "D",
    "1. Assertion (A) is false: 'Order' in Fayol's framework does not mean giving commands or enforcing silence; it means orderly systematic arrangement of physical and human resources.\n2. Reason (R) is true: Fayol's Order specifies 'a place for everything and everyone in its place'.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Work Study",
    "Method study aims to minimize production costs and maximize consumer satisfaction.",
    "Method study identifies the 'one best way' of executing each manufacturing stage from raw materials to final distribution.",
    "A",
    "1. Assertion (A) is true: Minimizing costs and raising customer satisfaction is the central goal of method study.\n2. Reason (R) is true and provides the exact mechanism (identifying the one best way) explaining (A).\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Fayol vs Taylor",
    "Taylor's principles are described as having universal administrative applicability across all organizations.",
    "Taylor's scientific techniques were designed primarily for assembly lines and shop-floor manufacturing conditions.",
    "D",
    "1. Assertion (A) is false: Fayol's principles have universal administrative applicability; Taylor's techniques apply mainly to specialized shop-floor industrial environments.\n2. Reason (R) is true: Taylor's work was rooted in factory and workshop conditions.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Remuneration",
    "Remuneration of employees should always match the highest compensation packages paid anywhere in the global economy.",
    "The remuneration principle dictates that wages should be fair to workers and within the paying capacity of the business enterprise.",
    "D",
    "1. Assertion (A) is false: Fayol did not advocate unfeasible astronomical salaries, but fair wages within the enterprise's paying capacity.\n2. Reason (R) is true: Remuneration balances fair employee living standards with the firm's financial capacity.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Motion Study",
    "Motion study differentiates between productive, incidental, and unproductive movements of workers.",
    "Eliminating unproductive movements reduces physical fatigue and accelerates job execution.",
    "A",
    "1. Assertion (A) is true: Motion study classifies bodily actions into productive, incidental, and wasteful.\n2. Reason (R) is true and directly explains why motion study is conducted (to eliminate waste and curtail worker fatigue).\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Subordination of Interest",
    "An organization's overarching interest must supersede individual employees' private ambitions.",
    "The primary purpose of an industrial enterprise is to maximize personal wealth for individual employees regardless of company solvency.",
    "C",
    "1. Assertion (A) is true: Fayol's principle prioritizes organizational general interest over private individual desires.\n2. Reason (R) is false: The primary purpose is fulfilling the collective corporate mission profitably and sustainably, not serving isolated private enrichment.\nHence, Option C is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 2!")
assert len(questions) == 80, f"Expected 80 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit2.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
