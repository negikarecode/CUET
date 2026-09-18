import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Controlling"
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

print("Generating 60 unique questions for Unit 8: Controlling...")

# =================================================================================================
# 1. Concept, Importance & Limitations of Controlling (Q1 - Q14)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Evaluating actual performance against standards, measuring deviations, and taking corrective actions",
    [
        "Hiring new employees through campus placement drives across universities",
        "Formulating long-range vision and mission statements for five decades",
        "Issuing corporate debentures to commercial financial institutions"
    ],
    "A",
    "1. Controlling is the managerial function of ensuring that activities in an organization are performed as per the plans, comparing actual performance with standards, and taking corrective actions.\nHence, Option {{CORR}} is correct.",
    "Defines the controlling function."
)
add_q(make_question(CHAPTER, "Concept of Controlling", "Which of the following encapsulates the core definition of the 'Controlling' function?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Accomplishing organizational goals",
    [
        "Maximizing inventory holding costs",
        "Abolishing statutory board meetings",
        "Eliminating corporate accounting procedures"
    ],
    "B",
    "1. The controlling function measures progress towards organizational goals and brings to light deviations, indicating corrective paths to accomplish goals.\nHence, Option {{CORR}} is correct.",
    "Highlights accomplishing organizational goals."
)
add_q(make_question(CHAPTER, "Importance of Controlling", "By continuously measuring operational progress towards targets and correcting deviations, controlling facilitates:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Judging accuracy of standards",
    [
        "Eliminating product marketing",
        "Encouraging unmonitored employee absence",
        "Abolishing all written organizational rules"
    ],
    "C",
    "1. An efficient control system helps managers verify whether preset standards are accurate, objective, and realistic in light of changing circumstances.\nHence, Option {{CORR}} is correct.",
    "Highlights judging accuracy of standards."
)
add_q(make_question(CHAPTER, "Importance of Controlling", "An efficient control system enables a manager to review and revise performance standards to ensure they remain realistic. This reflects:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Making efficient use of resources",
    [
        "Promoting wasteful production scrap",
        "Increasing redundant clerical staff",
        "Maximizing idle machinery downtime"
    ],
    "D",
    "1. By exercising control, a manager seeks to reduce wastage and spoilage of resources, ensuring that each activity is performed according to predetermined standards.\nHence, Option {{CORR}} is correct.",
    "Highlights making efficient use of resources."
)
add_q(make_question(CHAPTER, "Importance of Controlling", "Curtailing material wastage, preventing machine spoilage, and eliminating employee idling demonstrates that controlling achieves:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Improving employee motivation",
    [
        "Fostering administrative confusion",
        "Eliminating worker appraisal criteria",
        "Encouraging random arbitrary punishments"
    ],
    "A",
    "1. A good control system ensures that employees know well in advance what they are expected to do and the standards of performance on which they will be judged, improving motivation.\nHence, Option {{CORR}} is correct.",
    "Highlights improving employee motivation."
)
add_q(make_question(CHAPTER, "Importance of Controlling", "When workers clearly know upfront what performance standards are expected and how their output will be evaluated, controlling serves to:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Ensuring order and discipline",
    [
        "Maximizing shop-floor friction",
        "Eliminating the supervisor role",
        "Dissolving corporate bylaws"
    ],
    "B",
    "1. Controlling creates an atmosphere of order and discipline in the organization by minimizing dishonest behavior, fraud, theft, and carelessness through systematic checks.\nHence, Option {{CORR}} is correct.",
    "Highlights ensuring order and discipline."
)
add_q(make_question(CHAPTER, "Importance of Controlling", "Minimizing pilferage, workplace dishonesty, and careless production through regular monitoring achieves:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Facilitating coordination in action",
    [
        "Fostering inter-departmental rivalry",
        "Isolating divisions into water-tight silos",
        "Preventing communication between executives"
    ],
    "C",
    "1. Controlling provides direction to all activities and efforts by anchoring each department's performance to overarching standards, facilitating coordination.\nHence, Option {{CORR}} is correct.",
    "Highlights facilitating coordination in action."
)
add_q(make_question(CHAPTER, "Importance of Controlling", "Anchoring the performance of each separate department to unified organizational standards and targets helps in:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Difficulty in setting quantitative standards",
    [
        "Inability to purchase factory machinery",
        "Lack of formal corporate bank accounts",
        "Overabundance of skilled engineers"
    ],
    "D",
    "1. It is very difficult to establish exact quantitative standards for qualitative aspects like employee morale, job satisfaction, and public relations, representing a limitation.\nHence, Option {{CORR}} is correct.",
    "Highlights difficulty in setting quantitative standards as a limitation."
)
add_q(make_question(CHAPTER, "Limitations of Controlling", "Setting exact numerical benchmarks for qualitative parameters like worker morale and customer satisfaction is challenging. This illustrates:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Little control on external factors",
    [
        "Complete control over global oil prices",
        "Absolute mastery over consumer preferences",
        "Statutory immunity from judicial verdicts"
    ],
    "A",
    "1. An enterprise cannot control external environmental forces like government policy shifts, technological breakthroughs, or competitive rivalry.\nHence, Option {{CORR}} is correct.",
    "Highlights little control on external factors."
)
add_q(make_question(CHAPTER, "Limitations of Controlling", "An enterprise cannot control macroeconomic changes such as sudden tax hikes or foreign import restrictions. This limitation is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Resistance from employees",
    [
        "Difficulty in calculating financial profit",
        "High cost of inventory storage",
        "Lack of qualified job applicants"
    ],
    "B",
    "1. Employees often oppose and resist control mechanisms (such as monitoring through CCTV cameras or biometric attendance tracking), perceiving them as a restriction on freedom.\nHence, Option {{CORR}} is correct.",
    "Highlights resistance from employees."
)
add_q(make_question(CHAPTER, "Limitations of Controlling", "Workers protesting against the installation of closed-circuit television cameras (CCTV) on the shop-floor illustrates which limitation?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Costly affair involving substantial expenditure of time, money, and effort",
    [
        "Zero-cost spontaneous administrative procedure",
        "Decreasing the need for managerial supervision",
        "Automatically expanding corporate sales volume"
    ],
    "C",
    "1. Controlling involves substantial costs on monitoring systems, variance analysis, and reporting, which small business enterprises may find difficult to afford.\nHence, Option {{CORR}} is correct.",
    "Highlights costly affair."
)
add_q(make_question(CHAPTER, "Limitations of Controlling", "Maintaining sophisticated electronic monitoring systems, variance accounting software, and performance auditors demonstrates that controlling:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Controlling without planning is blind, and planning without controlling is meaningless",
    [
        "Controlling completely replaces the need for any corporate planning",
        "Planning is executed solely after company liquidation is completed",
        "Both functions are mutually destructive and should never co-exist"
    ],
    "D",
    "1. Controlling evaluates actual performance against plans (without planning, controlling is blind), and planning targets are checked via controlling (without controlling, plans are meaningless).\nHence, Option {{CORR}} is correct.",
    "States the classic interrelationship between planning and controlling."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "Which classic managerial aphorism accurately describes the relationship between Planning and Controlling?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Difficulty in setting quantitative standards, Little control on external factors, Employee resistance, Costly affair",
    [
        "Excessive profit margins, Lack of competition, Surplus liquidity, Low tax rates",
        "Rapid market expansion, Unlimited resource availability, Zero labor turnover",
        "Absolute operational certainty, Permanent consumer brand loyalty"
    ],
    "A",
    "1. The four standard limitations of controlling listed in NCERT are: Difficulty in setting quantitative standards, Little control on external factors, Resistance from employees, and Costly affair.\nHence, Option {{CORR}} is correct.",
    "Lists the four major limitations of controlling."
)
add_q(make_question(CHAPTER, "Limitations of Controlling", "Which of the following groups comprises recognized limitations of the controlling function?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Small enterprises with limited financial budgets",
    [
        "Giant multinational conglomerates with diversified global factories",
        "Public sector defense production units",
        "Large commercial banks with thousands of branches"
    ],
    "B",
    "1. Small business enterprises often cannot afford expensive control mechanisms and performance audit systems due to financial constraints.\nHence, Option {{CORR}} is correct.",
    "Identifies small firms finding controlling expensive."
)
add_q(make_question(CHAPTER, "Limitations of Controlling", "For which type of business enterprise can establishing an elaborate control system prove prohibitively expensive?", opts, corr, sol))

# =================================================================================================
# 2. Relationship between Planning and Controlling (Q15 - Q26)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Planning provides the benchmark standards, and controlling measures actual performance against those standards",
    [
        "Planning checks historical vouchers; controlling drafts marketing slogans",
        "Planning takes place after controlling is permanently completed",
        "Both functions are performed exclusively by lower-level factory mechanics"
    ],
    "C",
    "1. Planning creates the baseline performance goals and standards, while controlling provides the operational verification to see whether those standards are being achieved.\nHence, Option {{CORR}} is correct.",
    "Explains how planning feeds standards to controlling."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "How does Planning directly serve as the prerequisite foundation for Controlling?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "There are no predetermined standards or benchmarks against which actual performance can be evaluated",
    [
        "The company is immediately declared legally bankrupt",
        "Employees automatically receive double salaries",
        "The physical factory machinery ceases to rotate"
    ],
    "D",
    "1. In the absence of planning, controlling is blind because there are no predetermined standards against which actual output can be measured or compared.\nHence, Option {{CORR}} is correct.",
    "Explains why controlling without planning is blind."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "Why is Controlling described as 'blind' in the absence of a comprehensive Plan?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Without controlling, managers cannot determine whether plans are being implemented effectively or failing",
    [
        "Without controlling, plans automatically achieve 100% perfection",
        "Without controlling, competitors cease to manufacture rival goods",
        "Without controlling, corporate taxation is waived by the government"
    ],
    "A",
    "1. Planning without controlling is meaningless because without control, management cannot verify whether planned activities were actually completed or targets achieved.\nHence, Option {{CORR}} is correct.",
    "Explains why planning without controlling is meaningless."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "Why is Planning characterized as 'meaningless' without an active Controlling mechanism?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Both Planning and Controlling are forward-looking as well as backward-looking",
    [
        "Planning looks only backward; Controlling looks only forward",
        "Both functions look exclusively backward into historical past archives",
        "Neither function has any temporal dimension in management"
    ],
    "B",
    "1. Planning is forward-looking (forecasting future) and backward-looking (guided by past performance). Controlling is backward-looking (comparing past performance) and forward-looking (guiding future corrective actions).\nHence, Option {{CORR}} is correct.",
    "Highlights both functions being forward and backward looking."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "Which statement accurately captures the temporal orientation of Planning and Controlling?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "It evaluates past actual performance against predetermined standards to uncover deviations",
    [
        "It forecasts macroeconomic events for the next fifty years",
        "It hires new college graduates for upcoming factories",
        "It purchases future crude oil delivery contracts"
    ],
    "C",
    "1. Controlling is backward-looking like a post-mortem examination because it assesses completed past actions against predetermined standards.\nHence, Option {{CORR}} is correct.",
    "Explains backward-looking nature of controlling."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "In what sense is Controlling described as a 'backward-looking' function?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The corrective actions taken and deviations identified guide future planning and improve future performance",
    [
        "It completely alters past recorded financial balance sheets",
        "It reverses completed historical physical factory output",
        "It refunds customer money spent three decades ago"
    ],
    "D",
    "1. Controlling is forward-looking because the corrective measures initiated by control prevent recurrence of deviations and provide baseline intelligence for future plans.\nHence, Option {{CORR}} is correct.",
    "Explains forward-looking nature of controlling."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "How is Controlling simultaneously a 'forward-looking' function?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning is based on past experience and controlling feedback to avoid past mistakes in future plans",
    [
        "Planning deals only with events that happened centuries ago",
        "Planning requires memorizing historical textbooks",
        "Planning is executed exclusively after firm liquidation"
    ],
    "A",
    "1. Planning is backward-looking because future plans are guided and refined by past experiences and insights derived from controlling reports.\nHence, Option {{CORR}} is correct.",
    "Explains backward-looking nature of planning."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "In what sense can Planning also be considered 'backward-looking'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "They are interdependent, interlinked, and mutually reinforce each other",
    [
        "They are completely independent and operate in isolated corporate silos",
        "They are contradictory and work against each other's success",
        "They are statutory options that firms rarely implement"
    ],
    "B",
    "1. Planning and controlling are inseparable twins of management; they are deeply interlinked and reinforce each other in a continuous managerial cycle.\nHence, Option {{CORR}} is correct.",
    "Affirms planning and controlling are interdependent and interlinked."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "What is the true structural relationship between Planning and Controlling in management practice?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A continuous circular loop where controlling feedback feeds into new planning",
    [
        "A one-way linear path ending permanently after the first month",
        "A disconnected random scatter of unmonitored executive memos",
        "A static blueprint sealed in a legal bank vault"
    ],
    "C",
    "1. Planning and controlling form a continuous cycle: Planning sets standards -> Execution occurs -> Controlling evaluates performance -> Feedback guides revised planning.\nHence, Option {{CORR}} is correct.",
    "Describes the continuous planning-controlling feedback loop."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "The ongoing operational interaction between Planning and Controlling is best visualized as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning is the first function; Controlling is the concluding function that completes the cycle",
    [
        "Controlling is the first function; Planning is the final post-mortem step",
        "Both functions must be performed simultaneously on day one and then stopped",
        "Planning is done by supervisors; Controlling is done by shareholders"
    ],
    "D",
    "1. In the traditional sequence of managerial functions, planning is the initial starting point while controlling is the concluding function that closes the loop.\nHence, Option {{CORR}} is correct.",
    "Contrasts sequence of planning and controlling in management cycle."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "Regarding sequential hierarchy in the management cycle, how do Planning and Controlling compare?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Controlling reveals that actual sales reached only 80% of targets, prompting management to revise marketing plans",
    [
        "Management pays all workers their contractual overtime wages",
        "The board of directors adopts the annual audited financial report",
        "The purchasing manager orders raw cotton from a domestic vendor"
    ],
    "A",
    "1. When controlling reveals an operational shortfall (80% achieved), this feedback directly triggers corrective interventions in future planning.\nHence, Option {{CORR}} is correct.",
    "Illustrates controlling feedback shaping new planning."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "Which scenario demonstrates controlling feedback actively refining the future planning process?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Standards are the criteria against which actual performance is measured",
    [
        "Standards are poetic corporate mottos with zero measurement utility",
        "Standards are arbitrary numbers invented to punish workers",
        "Standards are statutory mandates dictated by the Ministry of Finance"
    ],
    "B",
    "1. Standards serve as the critical bridge linking planning with controlling, representing the predetermined benchmarks against which performance is compared.\nHence, Option {{CORR}} is correct.",
    "Identifies standards as the bridge between planning and controlling."
)
add_q(make_question(CHAPTER, "Planning and Controlling", "What role do 'Standards' play in connecting Planning with Controlling?", opts, corr, sol))

# =================================================================================================
# 3. Controlling Process: CPC, MBE & Corrective Action (Q27 - Q44)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Setting Performance Standards",
    [
        "Measurement of Actual Performance",
        "Analyzing Deviations",
        "Taking Corrective Action"
    ],
    "C",
    "1. The initial step in the controlling process is setting performance standards, which serve as the criteria against which actual performance is evaluated.\nHence, Option {{CORR}} is correct.",
    "Identifies Setting Performance Standards as step 1."
)
add_q(make_question(CHAPTER, "Controlling Process", "What is the foundational first step in the standardized managerial controlling process?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Measurement of Actual Performance",
    [
        "Setting Performance Standards",
        "Analyzing Deviations",
        "Taking Corrective Action"
    ],
    "D",
    "1. Once standards are set, the next step is measuring actual performance using methods like personal observation, sample checking, and performance reports.\nHence, Option {{CORR}} is correct.",
    "Identifies Measurement of Actual Performance as step 2."
)
add_q(make_question(CHAPTER, "Controlling Process", "Evaluating actual operational output through personal observation, sample checking, and objective metrics represents:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Personal observation, sample checking, and objective performance reports",
    [
        "Unverified gossip heard in lunchroom corridors",
        "Astrological horoscopes of machine operators",
        "Filing criminal complaints against trade union representatives"
    ],
    "A",
    "1. Reliable techniques for measuring actual performance include personal observation by supervisors, sample checking of output, and standardized performance reports.\nHence, Option {{CORR}} is correct.",
    "Lists techniques for measuring actual performance."
)
add_q(make_question(CHAPTER, "Controlling Process", "Which of the following represents an objective method for measuring actual operational performance?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Comparing Actual Performance with Standards",
    [
        "Setting Performance Standards",
        "Formulating Corporate Vision",
        "Decentralizing Authority"
    ],
    "B",
    "1. Comparing actual performance with predetermined standards uncovers the extent and nature of deviations between intended and actual results.\nHence, Option {{CORR}} is correct.",
    "Defines Comparing Actual Performance with Standards."
)
add_q(make_question(CHAPTER, "Controlling Process", "Juxtaposing measured actual output against predetermined target benchmarks to discover gaps is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Analyzing Deviations",
    [
        "Departmentalisation",
        "Preliminary Screening",
        "Workforce Analysis"
    ],
    "C",
    "1. After deviations are discovered, managers must analyze them to identify root causes using Critical Point Control and Management by Exception.\nHence, Option {{CORR}} is correct.",
    "Defines Analyzing Deviations."
)
add_q(make_question(CHAPTER, "Controlling Process", "Examining discovered gaps between targets and actual results using Critical Point Control and Management by Exception is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Critical Point Control and Management by Exception",
    [
        "Time Study and Motion Study",
        "Scalar Chain and Gang Plank",
        "Recruitment and Selection"
    ],
    "D",
    "1. The two foundational principles utilized during deviation analysis in controlling are Critical Point Control (CPC) and Management by Exception (MBE).\nHence, Option {{CORR}} is correct.",
    "Identifies CPC and MBE as tools for analyzing deviations."
)
add_q(make_question(CHAPTER, "Controlling Process", "Which pair of modern management techniques is specifically employed to 'Analyze Deviations'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Critical Point Control (CPC)",
    [
        "Management by Exception",
        "Differential Piece Wage",
        "Vestibule Training"
    ],
    "A",
    "1. Critical Point Control focuses on Key Result Areas (KRAs) critical to the success of an enterprise, recognizing that if anything goes wrong at critical points, the whole organization suffers.\nHence, Option {{CORR}} is correct.",
    "Defines Critical Point Control."
)
add_q(make_question(CHAPTER, "Critical Point Control", "Focusing managerial control primarily on Key Result Areas (KRAs) that are critical to organizational success is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Key Result Areas (KRAs)",
    [
        "Minor Clerical Details",
        "Peripheral Routine Incidents",
        "Informal Lunchtime Chats"
    ],
    "B",
    "1. Under Critical Point Control, control is anchored around Key Result Areas (KRAs) that determine the strategic health and viability of the enterprise.\nHence, Option {{CORR}} is correct.",
    "Identifies Key Result Areas in CPC."
)
add_q(make_question(CHAPTER, "Critical Point Control", "In Critical Point Control, what specific operational points receive concentrated supervisory attention?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A 5% increase in labor manufacturing cost is critical, whereas a 15% increase in postal stamps is minor",
    [
        "Management should spend 100 hours investigating a ₹10 stationery variance",
        "Labor cost increases can be ignored while postage increases demand CEO meetings",
        "Both variances are equally catastrophic and require factory closure"
    ],
    "C",
    "1. Under CPC, a 5% increase in core labor cost affects profitability vastly more than a 15% increase in minor postal charges, warranting focused managerial attention on labor.\nHence, Option {{CORR}} is correct.",
    "Illustrates CPC with labor cost vs postal charges example."
)
add_q(make_question(CHAPTER, "Critical Point Control", "Which scenario exemplifies the practical application of 'Critical Point Control'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Management by Exception (MBE) / Control by Exception",
    [
        "Critical Point Control",
        "Scalar Chain",
        "Job Enrichment"
    ],
    "D",
    "1. Management by Exception is based on the belief that 'an attempt to control everything results in controlling nothing'; only significant deviations beyond tolerance limits are brought to top management.\nHence, Option {{CORR}} is correct.",
    "Defines Management by Exception."
)
add_q(make_question(CHAPTER, "Management by Exception", "The management principle asserting that 'an attempt to control everything results in controlling nothing' is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Only major, significant deviations that exceed predetermined acceptable tolerance limits",
    [
        "Every single trivial deviation regardless of magnitude",
        "Only positive achievements that earn bonuses",
        "Routine daily operations that conform 100% to standards"
    ],
    "A",
    "1. Under Management by Exception, routine minor variations within acceptable limits are handled by subordinates; only significant exceptions crossing tolerance boundaries are escalated to top executives.\nHence, Option {{CORR}} is correct.",
    "Explains what deviations are escalated under MBE."
)
add_q(make_question(CHAPTER, "Management by Exception", "Under 'Management by Exception', which operational deviations must be reported to top management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Acceptable Range of Deviation / Tolerance Limit",
    [
        "Absolute Variance Metric",
        "Arbitrary Penalty Scale",
        "Static Boundary Constant"
    ],
    "B",
    "1. The permissible margin within which deviations do not require managerial intervention is termed the 'Acceptable Range of Deviation' or tolerance limit.\nHence, Option {{CORR}} is correct.",
    "Defines Acceptable Range of Deviation."
)
add_q(make_question(CHAPTER, "Management by Exception", "The permissible boundary within which actual output may fluctuate without requiring top management intervention is the:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Saves valuable executive time and effort by focusing top attention on critical problems",
    [
        "Eliminates the necessity for subordinate supervisors",
        "Abolishes financial accounting departments",
        "Guarantees that workers never commit any operational mistakes"
    ],
    "C",
    "1. The major advantage of Management by Exception is that it conserves top management's time and energy, directing attention to critical strategic issues.\nHence, Option {{CORR}} is correct.",
    "Highlights major advantage of MBE."
)
add_q(make_question(CHAPTER, "Management by Exception", "What is the primary operational advantage of implementing 'Management by Exception'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Taking Corrective Action",
    [
        "Setting Performance Standards",
        "Measuring Actual Performance",
        "Developing Premises"
    ],
    "D",
    "1. The final, decisive step in the controlling process is Taking Corrective Action to eliminate causes of negative deviations and restore operations to standard.\nHence, Option {{CORR}} is correct.",
    "Identifies Taking Corrective Action as the final step."
)
add_q(make_question(CHAPTER, "Controlling Process", "What is the concluding, actionable step in the standardized controlling process?", opts, corr, sol))

add_q(make_sequence_question(
    CHAPTER, "Controlling Process",
    "Arrange the five steps of the Controlling Process in their correct chronological sequence:",
    [
        "Analyzing Deviations",
        "Measurement of Actual Performance",
        "Setting Performance Standards",
        "Taking Corrective Action",
        "Comparing Actual Performance with Standards"
    ],
    "(C), (B), (E), (A), (D)",
    [
        "(A), (B), (C), (D), (E)",
        "(C), (A), (B), (E), (D)",
        "(B), (C), (E), (A), (D)"
    ],
    "A",
    "1. The correct chronological sequence of controlling is:\n(C) Setting Standards -> (B) Measurement of Actual Performance -> (E) Comparing Performance with Standards -> (A) Analyzing Deviations -> (D) Taking Corrective Action.\nHence, Option A is correct."
))

opts, corr, sol = rotate_options(
    "No corrective action is required; operations proceed normally",
    [
        "The entire factory assembly line is immediately dismantled",
        "All workers involved are summarily terminated without notice",
        "The company issues an emergency public bankruptcy filing"
    ],
    "B",
    "1. When actual performance falls within the acceptable range of deviation, no corrective action is necessary and operations proceed as planned.\nHence, Option {{CORR}} is correct.",
    "States action when deviation is within tolerance limits."
)
add_q(make_question(CHAPTER, "Controlling Process", "What managerial intervention is required when actual performance falls strictly within the acceptable tolerance range?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Providing training to machine operators and undertaking preventive machine repair",
    [
        "Permanently closing the manufacturing facility",
        "Doubling product retail selling prices to punish customers",
        "Refusing to accept raw material shipments from suppliers"
    ],
    "C",
    "1. When defective output exceeds acceptable limits, corrective action addresses root causes—such as repairing faulty machines or providing training to workers.\nHence, Option {{CORR}} is correct.",
    "Illustrates corrective action for defective output."
)
add_q(make_question(CHAPTER, "Controlling Process", "If deviation analysis reveals that defective finished goods stem from worker incompetence and machine wear, what corrective action is appropriate?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Critical Point Control focuses on critical activities; Management by Exception focuses on the magnitude of deviation",
    [
        "Critical Point Control is for clerks; Management by Exception is for factory laborers",
        "Critical Point Control looks forward; Management by Exception looks backward",
        "Both techniques are completely identical without any conceptual distinction"
    ],
    "D",
    "1. Critical Point Control is focused on WHICH areas matter most (Key Result Areas). Management by Exception is focused on HOW MUCH the deviation deviates (tolerance boundaries).\nHence, Option {{CORR}} is correct.",
    "Contrasts CPC and MBE."
)
add_q(make_question(CHAPTER, "CPC vs MBE", "What is the primary difference between 'Critical Point Control' and 'Management by Exception'?", opts, corr, sol))

# =================================================================================================
# 4. Statement I & Statement II Questions (Q45 - Q52)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Planning and Controlling",
    "Planning is looking ahead, whereas controlling is looking back.",
    "Controlling is also looking forward because corrective actions guide future planning.",
    "A",
    "1. Statement I is true: Traditionally planning looks ahead to set goals, while controlling looks back to evaluate past performance.\n2. Statement II is true: Controlling is forward-looking because it provides actionable feedback to refine future operations.\nHence, Option A is correct."
))

add_q(make_statement_question(
    CHAPTER, "Controlling Limitations",
    "It is very easy to establish precise quantitative standards for employee morale and job satisfaction.",
    "An organization possesses total, complete control over all external environmental factors.",
    "B",
    "1. Statement I is false: Qualitative attributes like employee morale and satisfaction are notoriously difficult to quantify precisely.\n2. Statement II is false: Organizations have little or no control over external environmental forces (government regulations, inflation, technology).\nBoth statements are false.\nHence, Option B is correct."
))

add_q(make_statement_question(
    CHAPTER, "Management by Exception",
    "Management by Exception is based on the principle that an attempt to control everything results in controlling nothing.",
    "Under Management by Exception, every minor trivial deviation must be reported directly to the Chief Executive Officer.",
    "C",
    "1. Statement I is true: MBE asserts that attempting to control everything dilutes control over what truly matters.\n2. Statement II is false: Minor deviations within tolerance limits are handled at lower levels; only significant exceptions are escalated.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Critical Point Control",
    "Critical Point Control requires managers to focus on Key Result Areas (KRAs) critical to the success of an organization.",
    "Under Critical Point Control, a 5% increase in core labor cost and a 15% increase in postage expenses receive equal supervisory attention.",
    "C",
    "1. Statement I is true: CPC concentrates on Key Result Areas.\n2. Statement II is false: A 5% labor cost increase has massive financial implications compared to petty postage, so it receives primary attention.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Controlling Process",
    "Setting performance standards is the initial step in the standardized controlling process.",
    "Taking corrective action is required even when actual performance matches predetermined standards exactly.",
    "C",
    "1. Statement I is true: Setting standards is the starting point of control.\n2. Statement II is false: No corrective action is required when actual performance conforms to standards.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Controlling Importance",
    "Controlling helps judge the accuracy and realism of predetermined performance standards.",
    "Controlling motivates employees by keeping them completely ignorant of performance appraisal benchmarks.",
    "C",
    "1. Statement I is true: Reviewing performance helps assess whether standards are realistic.\n2. Statement II is false: Controlling motivates employees by making standards known upfront, not by keeping them ignorant.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Planning and Controlling",
    "Controlling can be executed effectively in an organization even if no prior planning was ever conducted.",
    "Planning without controlling is meaningless because there is no mechanism to verify goal achievement.",
    "D",
    "1. Statement I is false: Controlling without planning is blind because there are no benchmark standards to compare against.\n2. Statement II is true: Planning without controlling is meaningless.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Controlling Limitations",
    "Employees may resist controlling mechanisms like biometric attendance and video surveillance cameras.",
    "Controlling is an inexpensive managerial function that requires zero financial expenditure or executive time.",
    "C",
    "1. Statement I is true: Employees often view monitoring systems as restrictive, leading to resistance.\n2. Statement II is false: Establishing control systems involves substantial expenditure of time, effort, and money.\nHence, Option C is correct."
))

# =================================================================================================
# 5. Assertion & Reason Questions (Q53 - Q60)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Planning and Controlling",
    "Planning and controlling are inseparable twins of management.",
    "Planning sets the standards against which actual performance is measured, and controlling verifies adherence to those standards.",
    "A",
    "1. Assertion (A) is true: Planning and controlling are deeply interdependent twins.\n2. Reason (R) is true and directly explains (A): Each depends upon the other for functional vitality; standards come from planning and verification comes from controlling.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Management by Exception",
    "Management by Exception conserves valuable managerial time and executive energy.",
    "It filters out routine operational variations within tolerance limits, bringing only critical deviations to top management's notice.",
    "A",
    "1. Assertion (A) is true: MBE saves executive time and effort.\n2. Reason (R) is true and explains (A): Preventing senior executives from getting bogged down in minor details frees them to tackle strategic crises.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Critical Point Control",
    "Critical Point Control dictates that control should focus primarily on Key Result Areas (KRAs).",
    "If anything goes wrong at critical points, the entire organization suffers serious adverse consequences.",
    "A",
    "1. Assertion (A) is true: CPC focuses on Key Result Areas.\n2. Reason (R) is true and explains (A): Because failure at critical nodes jeopardizes the whole enterprise, concentrated monitoring is essential.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Controlling Importance",
    "An effective control system helps minimize dishonest behavior and fraud among employees.",
    "Systematic performance checks, sample audits, and supervisory oversight create an atmosphere of order and discipline.",
    "A",
    "1. Assertion (A) is true: Control discourages workplace dishonesty and pilferage.\n2. Reason (R) is true and explains (A): The certainty of detection through regular audits fosters disciplined conduct.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Controlling Process",
    "Corrective action must be initiated immediately even if operational deviation is well within acceptable tolerance limits.",
    "Acceptable range of deviation represents the permissible fluctuation within which no managerial intervention is warranted.",
    "D",
    "1. Assertion (A) is false: When deviation is within tolerance limits, no corrective action is necessary.\n2. Reason (R) is true: Tolerance limits define the acceptable buffer zone where performance is considered normal.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Controlling Limitations",
    "Controlling can eliminate all external risks arising from changing government taxation policies.",
    "An enterprise operates within an open external environment over which management has little or no direct control.",
    "D",
    "1. Assertion (A) is false: Controlling cannot eliminate external macroeconomic or policy risks.\n2. Reason (R) is true: External environmental forces are outside the direct control of the firm.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Controlling Nature",
    "Controlling is exclusively a backward-looking exercise with zero forward relevance.",
    "The analysis of deviations and corrective actions initiated in controlling guide future planning and improve subsequent performance.",
    "D",
    "1. Assertion (A) is false: Controlling is both backward-looking and forward-looking.\n2. Reason (R) is true: Corrective actions and variance insights feed forward into future planning.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Controlling Process",
    "Setting performance standards in quantitative terms facilitates objective measurement and comparison.",
    "Standards expressed in numerical metrics eliminate ambiguity and enable precise calculation of operational deviations.",
    "A",
    "1. Assertion (A) is true: Quantitative standards simplify objective appraisal.\n2. Reason (R) is true and explains (A): Numerical benchmarks provide clear, measurable metrics that leave no room for subjective dispute.\nHence, Option A is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 8!")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit8.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
