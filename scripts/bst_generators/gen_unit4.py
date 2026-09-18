import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text,
    get_pyq_normalized_set
)

CHAPTER = "Planning"
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

print("Generating 60 unique questions for Unit 4: Planning...")

# =================================================================================================
# 1. Concept, Importance & Limitations of Planning (Q1 - Q12)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Deciding in advance what to do, how to do it, when to do it, and who is to do it",
    [
        "Supervising daily factory assembly lines with stopwatches",
        "Conducting statutory financial audits at the end of the fiscal year",
        "Arbitrarily penalizing shop-floor employees for production delays"
    ],
    "A",
    "1. Planning is deciding in advance what to do, how to do it, when to do it, and who is to do it. It bridges the gap between where we are and where we want to go.\nHence, Option {{CORR}} is correct.",
    "Defines planning as deciding in advance."
)
add_q(make_question(CHAPTER, "Concept of Planning", "Which phrase encapsulates the core meaning of 'Planning' in management?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning bridges the gap between where we are and where we want to be",
    [
        "Planning completely eliminates all market competition permanently",
        "Planning guarantees 100% financial profit irrespective of management competence",
        "Planning replaces the necessity for organizing, directing, and controlling"
    ],
    "B",
    "1. Planning bridges the gap between current state and desired future destination, making it possible for things to occur which would not otherwise happen.\nHence, Option {{CORR}} is correct.",
    "Highlights planning bridging the gap to desired future."
)
add_q(make_question(CHAPTER, "Concept of Planning", "In organizational management, the primary purpose of planning is best described as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning provides directions",
    [
        "Planning eliminates legal liability",
        "Planning guarantees monopoly profits",
        "Planning replaces human personnel"
    ],
    "C",
    "1. By stating in advance how work is to be done, planning provides direction for action, ensuring employees and departments work towards common goals.\nHence, Option {{CORR}} is correct.",
    "Identifies providing direction as a key importance."
)
add_q(make_question(CHAPTER, "Importance of Planning", "By stating in advance what is to be done and how work is to be performed, planning guides employee action. Which importance is this?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning reduces the risks of uncertainty",
    [
        "Planning increases production bottlenecks",
        "Planning forces organizations to remain static",
        "Planning abolishes financial taxation"
    ],
    "D",
    "1. By anticipating changes and developing managerial responses to unforeseen contingencies, planning reduces the risks of uncertainty.\nHence, Option {{CORR}} is correct.",
    "Highlights reducing risks of uncertainty."
)
add_q(make_question(CHAPTER, "Importance of Planning", "By looking ahead and anticipating changes, planning allows a manager to respond effectively to potential market disruptions. This shows:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning reduces overlapping and wasteful activities",
    [
        "Planning fosters random departmental conflict",
        "Planning eliminates the need for formal communication",
        "Planning mandates duplicate record-keeping"
    ],
    "A",
    "1. Planning coordinates the efforts of different divisions and individuals, eliminating useless and redundant activities.\nHence, Option {{CORR}} is correct.",
    "Highlights reducing overlapping and wasteful activities."
)
add_q(make_question(CHAPTER, "Importance of Planning", "Serving as the basis for coordinating the activities and efforts of different divisions and individuals, planning avoids chaos by:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning promotes innovative ideas",
    [
        "Planning encourages mechanical repetition",
        "Planning stifles executive critical thinking",
        "Planning enforces bureaucratic stagnation"
    ],
    "B",
    "1. Since it is the first function of management, new ideas can take the shape of concrete plans, encouraging intellectual creativity and innovation.\nHence, Option {{CORR}} is correct.",
    "Highlights promoting innovative ideas."
)
add_q(make_question(CHAPTER, "Importance of Planning", "As the primary intellectual function of management, planning stimulates creative thinking and formulation of novel strategies. This illustrates:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning establishes standards for controlling",
    [
        "Planning replaces physical machinery",
        "Planning abolishes hierarchical authority",
        "Planning eliminates accounting reconciliation"
    ],
    "C",
    "1. Planning provides the benchmarks and performance standards against which actual performance is evaluated and corrected under the controlling function.\nHence, Option {{CORR}} is correct.",
    "Connects planning benchmarks with controlling."
)
add_q(make_question(CHAPTER, "Importance of Planning", "In the absence of predetermined plans, a manager has no benchmark against which to evaluate actual employee performance. This shows that:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning leads to rigidity",
    [
        "Planning increases excessive adaptability",
        "Planning dissolves corporate hierarchy",
        "Planning eliminates managerial accountability"
    ],
    "D",
    "1. In an organization, a well-defined plan drawn up with specific goals must be adhered to strictly, which often prevents managers from making flexible adjustments, leading to rigidity.\nHence, Option {{CORR}} is correct.",
    "Identifies rigidity as an internal limitation of planning."
)
add_q(make_question(CHAPTER, "Limitations of Planning", "When managers are forced to strictly follow predetermined courses of action even when circumstances demand tactical adjustments, planning causes:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning may not work in a dynamic environment",
    [
        "Planning is always infallible during hyperinflation",
        "Planning eliminates all external competition",
        "Planning operates best in chaotic civil wars"
    ],
    "A",
    "1. The business environment consists of continuously shifting economic, political, and technological forces, making long-range forecasting inaccurate and rendering plans obsolete.\nHence, Option {{CORR}} is correct.",
    "Recognizes limitations in dynamic environments."
)
add_q(make_question(CHAPTER, "Limitations of Planning", "Rapid shifts in consumer fashion, government foreign trade regulations, and competitive technology can disrupt rigid business plans. This illustrates:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning reduces creativity",
    [
        "Planning maximizes spontaneous operational strikes",
        "Planning expands unmonitored executive perks",
        "Planning eliminates the division of labor"
    ],
    "B",
    "1. Planning is usually carried out by top management while middle and lower levels merely execute orders, reducing initiative and creative problem-solving at operating levels.\nHence, Option {{CORR}} is correct.",
    "Explains how planning dampens lower-level creativity."
)
add_q(make_question(CHAPTER, "Limitations of Planning", "Middle-level managers and supervisors are often confined strictly to implementing plans formulated by top executives without discretion to alter methods. This limitation is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning involves huge costs and is a time-consuming process",
    [
        "Planning is zero-cost and executes spontaneously",
        "Planning reduces the need for corporate market research",
        "Planning operates without collecting factual data"
    ],
    "C",
    "1. Formulating plans requires extensive data gathering, professional boardroom meetings, market surveys, and expert consulting fees, consuming substantial time and financial capital.\nHence, Option {{CORR}} is correct.",
    "Highlights huge costs and time consumption."
)
add_q(make_question(CHAPTER, "Limitations of Planning", "Conducting elaborate consumer surveys, engaging strategy consultants, and holding prolonged executive retreats before plan finalization demonstrates that:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Planning does not guarantee success",
    [
        "Planning ensures 100% market dominance in all industries",
        "Planning provides absolute immunity from economic recessions",
        "Planning completely removes operational production risks"
    ],
    "D",
    "1. A previously tested successful plan may fail under new environmental conditions. Merely drafting an elaborate plan does not guarantee operational success unless effectively implemented.\nHence, Option {{CORR}} is correct.",
    "Affirms that planning does not guarantee success."
)
add_q(make_question(CHAPTER, "Limitations of Planning", "Relying blindly on a previously successful strategic plan in a altered market landscape often results in corporate failure because:", opts, corr, sol))

# =================================================================================================
# 2. Planning Process (Q13 - Q24)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Setting Objectives",
    [
        "Evaluating Alternatives",
        "Developing Premises",
        "Implementing the Plan"
    ],
    "A",
    "1. The first and foremost step in the planning process is setting objectives, which specify what the organization wants to achieve.\nHence, Option {{CORR}} is correct.",
    "Identifies Setting Objectives as the initial step in planning."
)
add_q(make_question(CHAPTER, "Planning Process", "What is the initial, foundational step in the standardized managerial planning process?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Developing Premises",
    [
        "Selecting an Alternative",
        "Follow-up Action",
        "Division of Work"
    ],
    "B",
    "1. Planning premises are assumptions about the future (forecasts regarding demand, policy, interest rates) upon which plans are formulated.\nHence, Option {{CORR}} is correct.",
    "Identifies Developing Premises as making future assumptions."
)
add_q(make_question(CHAPTER, "Planning Process", "Formulating baseline assumptions and forecasts regarding future market trends, tax rates, and raw material availability is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Assumptions about the future upon which plans are grounded",
    [
        "The physical office buildings owned by a corporation",
        "The legal contracts signed with labor unions",
        "The machinery blueprints drawn by production engineers"
    ],
    "C",
    "1. In the planning process, 'premises' are assumptions about the expected future environment (market conditions, inflation, technology) serving as the bedrock for planning.\nHence, Option {{CORR}} is correct.",
    "Defines planning premises."
)
add_q(make_question(CHAPTER, "Planning Process", "In managerial planning, what does the term 'Planning Premises' specifically denote?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Identifying alternative courses of action",
    [
        "Implementing the plan immediately without analysis",
        "Establishing controlling standards",
        "Appraising worker biological fatigue"
    ],
    "D",
    "1. Once objectives are established and premises developed, the next logical step is to identify all available alternative courses of action to achieve those goals.\nHence, Option {{CORR}} is correct.",
    "Identifies discovering alternative courses of action."
)
add_q(make_question(CHAPTER, "Planning Process", "After developing premises, what step must managers undertake to uncover various feasible ways of achieving established objectives?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Evaluating alternative courses against criteria of profitability, feasibility, and consequences",
    [
        "Selecting the first alternative that comes to mind without assessment",
        "Dismissing all alternative proposals to preserve cash reserves",
        "Delegating the final decision to entry-level clerical staff"
    ],
    "A",
    "1. Evaluating alternatives involves weighing the pros and cons of each alternative against organizational objectives, considering financial returns, risk, and feasibility.\nHence, Option {{CORR}} is correct.",
    "Defines evaluating alternatives."
)
add_q(make_question(CHAPTER, "Planning Process", "What is the focus of the managerial step 'Evaluating Alternative Courses'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Selecting an alternative",
    [
        "Setting objectives",
        "Developing premises",
        "Follow-up action"
    ],
    "B",
    "1. Selecting an alternative is the real point of decision making, where the best, most feasible and profitable plan is chosen.\nHence, Option {{CORR}} is correct.",
    "Identifies selecting an alternative as the point of decision making."
)
add_q(make_question(CHAPTER, "Planning Process", "The actual point of decision-making where a manager adopts the most feasible, profitable, and viable plan is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Implementing the plan",
    [
        "Setting objectives",
        "Evaluating alternatives",
        "Developing premises"
    ],
    "C",
    "1. Implementing the plan is putting the plan into action (e.g., allocating resources, communicating plans to operatives, organizing machinery).\nHence, Option {{CORR}} is correct.",
    "Defines implementing the plan."
)
add_q(make_question(CHAPTER, "Planning Process", "Translating theoretical strategic blueprints into physical operations by organizing resources and issuing operational directives is:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Follow-up action",
    [
        "Developing premises",
        "Setting objectives",
        "Selecting an alternative"
    ],
    "D",
    "1. Follow-up action involves monitoring plans to see whether premises are holding true and activities are being executed according to schedule.\nHence, Option {{CORR}} is correct.",
    "Identifies follow-up action."
)
add_q(make_question(CHAPTER, "Planning Process", "Monitoring the implementation of plans and verifying whether assumptions hold true in reality represents which concluding step?", opts, corr, sol))

add_q(make_sequence_question(
    CHAPTER, "Planning Process",
    "Arrange the following initial steps of the planning process in their correct chronological sequence:",
    [
        "Developing premises",
        "Setting objectives",
        "Identifying alternative courses of action",
        "Evaluating alternative courses"
    ],
    "(B), (A), (C), (D)",
    [
        "(A), (B), (C), (D)",
        "(B), (C), (A), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. The correct chronological sequence is:\n(B) Setting objectives -> (A) Developing premises -> (C) Identifying alternative courses -> (D) Evaluating alternative courses.\nHence, Option A is correct."
))

add_q(make_sequence_question(
    CHAPTER, "Planning Process",
    "Arrange the final operational stages of the planning process in the correct order:",
    [
        "Evaluating alternative courses",
        "Selecting an alternative",
        "Implementing the plan",
        "Follow-up action"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(C), (A), (B), (D)",
        "(D), (C), (B), (A)"
    ],
    "B",
    "1. The subsequent sequence is:\n(A) Evaluating alternative courses -> (B) Selecting an alternative -> (C) Implementing the plan -> (D) Follow-up action.\nHence, Option B is correct."
))

opts, corr, sol = rotate_options(
    "Forecasting",
    [
        "Accounting",
        "Auditing",
        "Arbitration"
    ],
    "C",
    "1. Developing premises relies heavily on forecasting future market conditions, technological disruptions, and macroeconomic trends.\nHence, Option {{CORR}} is correct.",
    "Identifies forecasting as the core technique for developing premises."
)
add_q(make_question(CHAPTER, "Planning Process", "Which fundamental managerial technique is indispensable for 'Developing Premises' in the planning process?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "The plan is abandoned permanently and the enterprise enters liquidation",
    [
        "Modifications and corrective interventions are introduced via follow-up action",
        "The board of directors is legally dissolved by court injunction",
        "Supervisors are exempted from submitting further progress reports"
    ],
    "B",
    "1. When follow-up monitoring reveals that premises have changed or performance is deviating, managers adjust and modify plans promptly to keep them viable.\nHence, Option {{CORR}} is correct.",
    "Shows adaptation during follow-up monitoring."
)
add_q(make_question(CHAPTER, "Planning Process", "During 'Follow-up Action', what happens if monitoring indicates that market premises deviate drastically from original assumptions?", opts, corr, sol))

# =================================================================================================
# 3. Types of Plans (Q25 - Q44)
# =================================================================================================

opts, corr, sol = rotate_options(
    "Single-use plans are developed for one-time events, whereas standing plans provide guidelines for recurring activities",
    [
        "Single-use plans are drafted by factory foremen, standing plans by the Supreme Court",
        "Single-use plans last for 50 years, standing plans expire in 24 hours",
        "Single-use plans are unwritten folklore, standing plans are audited ledgers"
    ],
    "A",
    "1. Single-use plans (e.g., programmes, budgets) are designed for a non-recurring specific situation, while standing plans (e.g., policies, procedures, rules) guide recurring situations over time.\nHence, Option {{CORR}} is correct.",
    "Distinguishes single-use plans from standing plans."
)
add_q(make_question(CHAPTER, "Types of Plans", "What is the primary distinction between 'Single-Use Plans' and 'Standing Plans'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Programme and Budget",
    [
        "Policy and Procedure",
        "Rule and Method",
        "Objective and Strategy"
    ],
    "B",
    "1. Programmes and Budgets are single-use plans created for specific non-recurring projects or financial periods.\nHence, Option {{CORR}} is correct.",
    "Identifies single-use plans."
)
add_q(make_question(CHAPTER, "Types of Plans", "Which pair consists strictly of 'Single-Use Plans'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Policy, Procedure, Rule, and Method",
    [
        "Budget and Annual Balance Sheet",
        "One-time Marketing Event Programme",
        "Corporate Liquidation Plan"
    ],
    "C",
    "1. Standing plans are formulated to guide recurring corporate activities and include Policies, Procedures, Rules, and Methods.\nHence, Option {{CORR}} is correct.",
    "Lists standing plans."
)
add_q(make_question(CHAPTER, "Types of Plans", "Which of the following sets consists exclusively of 'Standing Plans'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Neither a single-use nor a standing plan",
    [
        "A strict single-use plan",
        "A routine operating procedure",
        "A punitive factory rule"
    ],
    "D",
    "1. In NCERT Business Studies, Objectives and Strategies are broad overarching plans that do not strictly classify as single-use or standing plans.\nHence, Option {{CORR}} is correct.",
    "Classifies Objectives and Strategy as neither single-use nor standing."
)
add_q(make_question(CHAPTER, "Types of Plans", "According to NCERT classification, 'Objectives' and 'Strategy' are categorized as:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Objectives",
    [
        "Rules",
        "Methods",
        "Procedures"
    ],
    "A",
    "1. Objectives are the desired future end results toward which all organizational activities and managerial efforts are directed.\nHence, Option {{CORR}} is correct.",
    "Defines Objectives as end results."
)
add_q(make_question(CHAPTER, "Types of Plans", "The end results toward which all organizational activities, planning, and efforts are directed are called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Increasing company annual sales revenue by 20% within the next financial year",
    [
        "No smoking permitted on factory manufacturing premises",
        "Deduction of one day's casual leave for unexcused absenteeism",
        "Reconciling supplier invoices before issuing bank cheques"
    ],
    "B",
    "1. Objectives must be quantitative, measurable, and time-bound (e.g., increasing sales by 20% in the next financial year).\nHence, Option {{CORR}} is correct.",
    "Identifies a quantitative, measurable organizational objective."
)
add_q(make_question(CHAPTER, "Types of Plans", "Which of the following statements represents a clearly articulated 'Objective'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Strategy",
    [
        "Rule",
        "Method",
        "Budget"
    ],
    "C",
    "1. A Strategy is a comprehensive plan for achieving organizational objectives, encompassing: determining long-term goals, adopting courses of action, and allocating necessary resources.\nHence, Option {{CORR}} is correct.",
    "Defines Strategy as a comprehensive plan."
)
add_q(make_question(CHAPTER, "Types of Plans", "A comprehensive plan that defines long-term corporate direction, specifies competitive maneuvers, and allocates resources is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Policy",
    [
        "Procedure",
        "Rule",
        "Programme"
    ],
    "D",
    "1. Policies are general statements or understandings that guide or channel thinking in decision making, defining the broad parameters for managerial discretion.\nHence, Option {{CORR}} is correct.",
    "Defines Policy as general guide to thinking."
)
add_q(make_question(CHAPTER, "Types of Plans", "General statements or understandings that guide or channel managerial thinking and decision-making within broad parameters are:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A company's credit policy deciding to sell goods exclusively against cash or bank guarantee",
    [
        "A stopwatch recording assembly cycle times",
        "A spreadsheet calculating monthly corporate travel expense totals",
        "A legal lawsuit filed against an unauthorized copyright infringer"
    ],
    "A",
    "1. A company deciding whether to extend credit or restrict transactions to cash represents an organizational 'Policy'.\nHence, Option {{CORR}} is correct.",
    "Identifies Credit Policy as an example of Policy."
)
add_q(make_question(CHAPTER, "Types of Plans", "Which of the following serves as a classic practical example of a corporate 'Policy'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Procedure",
    [
        "Rule",
        "Strategy",
        "Objective"
    ],
    "B",
    "1. Procedures are routine steps on how to carry out activities in exact chronological sequence (e.g., procedure for requisitioning raw materials or processing refunds).\nHence, Option {{CORR}} is correct.",
    "Defines Procedure as chronological steps for executing tasks."
)
add_q(make_question(CHAPTER, "Types of Plans", "Routine steps specifying the exact chronological sequence in which tasks must be performed are called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rule",
    [
        "Policy",
        "Method",
        "Strategy"
    ],
    "C",
    "1. Rules are specific statements that inform what is to be done and what not to be done. They allow zero managerial discretion and enforce strict penalties for non-compliance.\nHence, Option {{CORR}} is correct.",
    "Defines Rule as strict statement allowing no discretion."
)
add_q(make_question(CHAPTER, "Types of Plans", "Specific statements that clearly prescribe what is to be done or not done, allowing zero managerial discretion and carrying disciplinary penalties, are:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "'No smoking inside factory premises; violators will be fined ₹1,000'",
    [
        "'We aim to achieve higher customer satisfaction through quality service'",
        "'Goods will be dispatched within 48 hours of invoice generation'",
        "'Capital budget allocated for factory expansion is ₹50 Crores'"
    ],
    "D",
    "1. 'No smoking inside factory premises' is a strict rule that demands absolute adherence without discretion.\nHence, Option {{CORR}} is correct.",
    "Identifies a strict disciplinary rule."
)
add_q(make_question(CHAPTER, "Types of Plans", "Which of the following represents a clear example of a 'Rule' in an industrial workplace?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Method",
    [
        "Procedure",
        "Programme",
        "Objective"
    ],
    "A",
    "1. Method provides the prescribed ways or manner in which a specific task has to be performed, standardizing execution and training.\nHence, Option {{CORR}} is correct.",
    "Defines Method as prescribed way of performing a step."
)
add_q(make_question(CHAPTER, "Types of Plans", "The prescribed formal way or manner in which a specific operational step of a procedure is to be executed is called:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Programme",
    [
        "Method",
        "Rule",
        "Budget"
    ],
    "B",
    "1. A Programme is a detailed statement about a project which outlines objectives, policies, procedures, rules, tasks, physical and financial resources required.\nHence, Option {{CORR}} is correct.",
    "Defines Programme as comprehensive single-use project plan."
)
add_q(make_question(CHAPTER, "Types of Plans", "A comprehensive detailed statement outlining objectives, policies, procedures, rules, task assignments, and resources for an entire project is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Budget",
    [
        "Policy",
        "Method",
        "Strategy"
    ],
    "C",
    "1. A Budget is a statement of expected results expressed in numerical terms for a definite period in the future, acting as a control device.\nHence, Option {{CORR}} is correct.",
    "Defines Budget as expected results in numerical terms."
)
add_q(make_question(CHAPTER, "Types of Plans", "A statement of expected results expressed quantitatively in numerical terms for a specified future period is a:", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Cash Budget estimating monthly inflows, outflows, and net cash balances",
    [
        "Disciplinary code of conduct posted on notice boards",
        "Corporate vision and mission statement on company website",
        "Standard operating procedure for handling customer returns"
    ],
    "D",
    "1. A Cash Budget forecasts monthly financial receipts and disbursements in numerical rupees, functioning as a vital planning and control budget.\nHence, Option {{CORR}} is correct.",
    "Identifies Cash Budget as a numerical plan."
)
add_q(make_question(CHAPTER, "Types of Plans", "Which of the following exemplifies a financial 'Budget'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Policy guides thinking in decision-making, whereas Procedure guides operational action steps",
    [
        "Policy is always numerical, whereas Procedure is purely verbal folklore",
        "Policy is single-use, whereas Procedure is an unalterable rule",
        "Policy is drawn by supervisors, whereas Procedure is enacted by Parliament"
    ],
    "A",
    "1. Policy channels managerial thinking and provides discretionary decision boundaries, whereas procedure lays down sequential action steps.\nHence, Option {{CORR}} is correct.",
    "Contrasts Policy and Procedure."
)
add_q(make_question(CHAPTER, "Types of Plans", "What is the primary difference between a 'Policy' and a 'Procedure'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Rules allow zero discretion, whereas Policies allow flexibility within stated boundaries",
    [
        "Rules are formulated by marketing staff, whereas Policies are drafted by clerks",
        "Rules are expressed in financial rupees, whereas Policies are recorded in hours",
        "Rules are single-use plans, whereas Policies expire daily"
    ],
    "B",
    "1. Rules are rigid statements that permit no leeway or discretion, while policies guide thinking and grant discretion within defined limits.\nHence, Option {{CORR}} is correct.",
    "Contrasts Rules and Policies."
)
add_q(make_question(CHAPTER, "Types of Plans", "How does a 'Rule' differ fundamentally from a 'Policy'?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "Budget",
    [
        "Procedure",
        "Strategy",
        "Policy"
    ],
    "C",
    "1. Since a budget is quantified in numerical figures (sales volume, cash, labor hours), it serves simultaneously as an essential planning tool and an exact controlling standard.\nHence, Option {{CORR}} is correct.",
    "Identifies Budget as both a planning and controlling instrument."
)
add_q(make_question(CHAPTER, "Types of Plans", "Which type of plan serves dual managerial functions by acting as a forward-looking plan and an exact metric for controlling?", opts, corr, sol))

opts, corr, sol = rotate_options(
    "A Method deals with a single step, whereas a Procedure consists of a chronological series of multiple steps",
    [
        "A Method is drafted by trade unions, whereas a Procedure is drafted by government",
        "A Method is a punitive rule, whereas a Procedure is an overarching corporate objective",
        "A Method is expressed in monetary terms, whereas a Procedure is expressed in units"
    ],
    "D",
    "1. Method specifies the exact standardized way to perform one particular operational step, whereas procedure comprises the broader sequential chain of steps.\nHence, Option {{CORR}} is correct.",
    "Contrasts Method and Procedure."
)
add_q(make_question(CHAPTER, "Types of Plans", "What distinguishes a 'Method' from a 'Procedure'?", opts, corr, sol))

# =================================================================================================
# 4. Statement I & Statement II Questions (Q45 - Q52)
# =================================================================================================

add_q(make_statement_question(
    CHAPTER, "Planning Process",
    "Setting objectives is the first step in the managerial planning process.",
    "Objectives must be formulated in vague, generalized qualitative terms without numerical targets.",
    "C",
    "1. Statement I is true: Setting objectives is the foundational first step of planning.\n2. Statement II is false: Objectives should be specific, clear, measurable, and stated in quantitative terms.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Planning Premises",
    "Planning premises represent factual historical accounting ledgers from past decades.",
    "Premises are future-oriented assumptions and forecasts upon which current plans are formulated.",
    "D",
    "1. Statement I is false: Premises are not historical accounting archives; they are forward-looking assumptions.\n2. Statement II is true: Premises are assumptions about expected future conditions.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Single-use vs Standing Plans",
    "A budget is a standing plan designed to guide repetitive daily activities over multiple years.",
    "A policy is a standing plan that channelizes managerial thinking in recurring decision scenarios.",
    "D",
    "1. Statement I is false: A budget is a single-use plan formulated for a specific period or non-recurring project.\n2. Statement II is true: Policy is a standing plan guiding recurring decision-making.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Planning and Controlling",
    "Planning establishes the baseline performance standards against which actual output is evaluated.",
    "Controlling can be executed effectively even when no prior plans or benchmarks exist.",
    "C",
    "1. Statement I is true: Planning provides the benchmark standards for controlling.\n2. Statement II is false: In the absence of predetermined plans, controlling is meaningless because there are no standards to compare against.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Rules and Policies",
    "Rules allow substantial managerial discretion and can be modified arbitrarily by individual workers.",
    "Policies provide general guidelines that channel thinking while allowing flexibility within defined boundaries.",
    "D",
    "1. Statement I is false: Rules allow zero discretion and demand strict obedience.\n2. Statement II is true: Policies provide general decision parameters with built-in flexibility.\nHence, Option D is correct."
))

add_q(make_statement_question(
    CHAPTER, "Limitations of Planning",
    "Planning reduces creativity when middle managers are restricted strictly to executing plans handed down from above.",
    "Planning guarantees business success under all dynamic economic circumstances.",
    "C",
    "1. Statement I is true: Top-down planning often dampens initiative and creativity at operating levels.\n2. Statement II is false: Planning does not guarantee success, especially in dynamic and volatile environments.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Types of Plans",
    "A strategy is a comprehensive plan encompassing determination of long-term goals and resource allocation.",
    "Objectives and strategy are strictly categorized as routine single-use plans.",
    "C",
    "1. Statement I is true: Strategy is a comprehensive blueprint for long-term direction and resources.\n2. Statement II is false: Objectives and strategies are broad plans classified as neither single-use nor standing plans.\nHence, Option C is correct."
))

add_q(make_statement_question(
    CHAPTER, "Planning Process",
    "The actual point of decision-making in the planning process occurs when an alternative is selected.",
    "Evaluating alternative courses involves assessing only the positive benefits while ignoring potential risks and costs.",
    "C",
    "1. Statement I is true: Selecting an alternative is the real decision-making step.\n2. Statement II is false: Evaluating alternatives requires weighing both pros and cons, costs, risks, and feasibility.\nHence, Option C is correct."
))

# =================================================================================================
# 5. Assertion & Reason Questions (Q53 - Q60)
# =================================================================================================

add_q(make_assertion_question(
    CHAPTER, "Planning and Controlling",
    "Planning and controlling are inseparable twins of management.",
    "Planning provides the benchmark standards, and controlling verifies whether actual performance adheres to those standards.",
    "A",
    "1. Assertion (A) is true: Planning and controlling are deeply interrelated and interdependent.\n2. Reason (R) is true and directly explains (A): Without plans, there are no controlling standards; without controlling, plans remain mere paper wishes.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Limitations of Planning",
    "Planning leads to organizational rigidity.",
    "Plans are formulated with predetermined courses of action that managers may not have the discretion to alter when conditions change.",
    "A",
    "1. Assertion (A) is true: Rigidity is a well-known limitation of formal planning.\n2. Reason (R) is true and explains (A): Adherence to preset schedules and targets restricts flexibility when tactical deviations are needed.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Planning Process",
    "Follow-up action is an essential step in the planning process.",
    "Monitoring execution ensures that activities conform to schedule and alerts management if environmental premises become invalid.",
    "A",
    "1. Assertion (A) is true: Follow-up is critical to maintain plan vitality.\n2. Reason (R) is true and provides the causal explanation for (A): Continuous monitoring detects deviations and outmoded assumptions.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Types of Plans",
    "A budget is classified as a single-use plan.",
    "A budget is formulated for a specific definite period and must be freshly drafted for subsequent periods.",
    "A",
    "1. Assertion (A) is true: Budgets are single-use plans.\n2. Reason (R) is true and explains (A): Because it relates to a specific financial timeframe and non-recurring requirements, it is retired once that period ends.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Types of Plans",
    "Rules permit complete discretion and personal interpretation by factory workers.",
    "Rules are specific statements that clearly inform what must or must not be done in a given situation.",
    "D",
    "1. Assertion (A) is false: Rules allow no personal discretion or flexibility.\n2. Reason (R) is true: Rules clearly specify what is permitted and what is prohibited.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Importance of Planning",
    "Planning reduces overlapping and wasteful activities in an organization.",
    "Planning coordinates the efforts of various departments and individuals towards unified objectives, eliminating confusion.",
    "A",
    "1. Assertion (A) is true: Planning eliminates redundant and overlapping work.\n2. Reason (R) is true and directly explains (A): Clear allocation of duties and synchronization of efforts prevent duplicate work.\nHence, Option A is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Limitations of Planning",
    "Formulating an elaborate business plan guarantees business success.",
    "A plan can only succeed if it is realistically translated into action and adapts to dynamic environmental shifts.",
    "D",
    "1. Assertion (A) is false: Planning does not guarantee success.\n2. Reason (R) is true: Success depends on proper implementation, operational agility, and environmental adaptation.\nHence, Option D is correct."
))

add_q(make_assertion_question(
    CHAPTER, "Types of Plans",
    "Policies provide the exact chronological sequence of operational steps for carrying out factory tasks.",
    "Procedures specify the step-by-step chronological order in which recurring work activities are to be executed.",
    "D",
    "1. Assertion (A) is false: Policies provide broad guidelines to thinking, not chronological action steps.\n2. Reason (R) is true: Procedures lay down the exact chronological sequence of performing activities.\nHence, Option D is correct."
))

# Verify length and output
print(f"Successfully generated {len(questions)} unique questions for Unit 4!")
assert len(questions) == 60, f"Expected 60 questions, got {len(questions)}"

os.makedirs("mock/bst_units", exist_ok=True)
out_path = "mock/bst_units/unit4.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
