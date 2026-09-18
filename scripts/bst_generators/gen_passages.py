import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.bst_generators.common import (
    make_question, rotate_options, normalize_text, get_pyq_normalized_set
)

questions = []
seen = set()
pyq_seen = get_pyq_normalized_set()

# Load all prior 12 units to ensure global uniqueness across all BST questions
for u in [f"unit{i}.json" for i in range(1, 13)]:
    p = f"mock/bst_units/{u}"
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            for q in json.load(f):
                seen.add(normalize_text(q["questionText"]))

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    if norm in pyq_seen:
        raise ValueError(f"Matches PYQ: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 40 Case-Study Passages (200 unique questions) for Business Studies...")

passages_data = []

# =================================================================================================
# PART A: PRINCIPLES AND FUNCTIONS OF MANAGEMENT (Passages 1 to 20)
# =================================================================================================

# Passage 1: Effectiveness vs Efficiency at Stellar Garments (Unit 1)
passages_data.append((
    "Nature and Significance of Management",
    "Management Effectiveness and Efficiency",
    (
        "Stellar Garments Ltd. is an export-oriented apparel manufacturing enterprise based in Tirupur. The production "
        "manager, Mr. Harish, was assigned a target to produce 10,000 designer polo shirts within 30 days for a European buyer "
        "at an estimated budgeted cost of Rs. 250 per shirt. To meet the rigid delivery deadline and avoid hefty cancellation "
        "penalties, Harish operated the manufacturing plant on double shifts and paid extensive overtime wages to textile "
        "workers. As a result, the 10,000 shirts were completed and dispatched exactly on the 29th day, satisfying the buyer. "
        "However, when the cost accountant audited the job expenses, the actual production cost turned out to be Rs. 320 per "
        "shirt due to excessive overtime payouts and expedited air cargo freight. The managing director commended Harish for "
        "delivering on time but reprimanded him for severely exceeding the cost budget, emphasizing that successful management "
        "requires a harmonious balance between being effective and being efficient."
    ),
    [
        (
            "In management terminology, Harish was 'effective' because he:",
            "Achieved the assigned production target of 10,000 shirts within the stipulated 30-day deadline",
            ["Minimized the cost per unit below the budgeted Rs. 250 limit", "Eliminated overtime wage expenditures completely", "Sold equity shares on the national stock exchange"],
            "A",
            "1. Effectiveness in management is concerned with doing the right task, completing activities, and achieving the final goals on time.\nHence, Option {{CORR}} is correct.",
            "Defines effectiveness as achieving goals on time."
        ),
        (
            "Why was Harish considered 'inefficient' despite meeting the delivery deadline?",
            "Because he produced the goods at a higher cost of Rs. 320 per unit instead of the budgeted Rs. 250",
            ["Because he refused to communicate with the European buyer directly", "Because he failed to obtain an ISI certification mark", "Because he did not register the company under the Factories Act"],
            "B",
            "1. Efficiency means doing the task correctly and with minimum cost. Producing at Rs. 320 instead of Rs. 250 indicates cost inefficiency.\nHence, Option {{CORR}} is correct.",
            "Explains inefficiency as failure to minimize cost."
        ),
        (
            "Management is defined as the process of getting things done with the aim of achieving goals:",
            "Effectively and efficiently",
            ["Purely at minimum cost regardless of completion time", "By delegating 100% of executive authority to shopfloor laborers", "Exclusively through automated robotic assembly lines"],
            "C",
            "1. Management is defined as the process of getting things done with the aim of achieving goals effectively and efficiently.\nHence, Option {{CORR}} is correct.",
            "States the standard NCERT definition of management."
        ),
        (
            "What happens if an organization focuses solely on efficiency while neglecting effectiveness?",
            "Goods may be produced at very low cost, but will fail to reach the market or meet customer delivery deadlines",
            ["The company automatically achieves record quarterly export profits", "The organization eliminates all market competition permanently", "Total corporate taxes drop to zero"],
            "D",
            "1. If a firm is efficient but ineffective, products might be made cheaply but miss deadlines or consumer demand windows, causing business failure.\nHence, Option {{CORR}} is correct.",
            "Analyzes danger of ignoring effectiveness."
        ),
        (
            "Which primary objective of management was compromised when manufacturing costs surged from Rs. 250 to Rs. 320?",
            "Organizational Objective of Profitability",
            ["Social Objective of Community Welfare", "Personal Objective of Employee Career Growth", "Statutory Objective of Trade Union Recognition"],
            "A",
            "1. Higher per-unit manufacturing costs reduce profit margins, compromising the core organizational objective of profitability and economic survival.\nHence, Option {{CORR}} is correct.",
            "Identifies organizational profitability objective."
        )
    ]
))

# Passage 2: Coordination as the Essence of Management at Zenith Electronics (Unit 1)
passages_data.append((
    "Nature and Significance of Management",
    "Coordination: The Essence of Management",
    (
        "Zenith Electronics Ltd. manufactures smart LED television panels. Last quarter, the marketing department launched an "
        "aggressive promotional campaign promising same-day delivery of a newly released 65-inch 4K OLED television model. "
        "Customer orders poured in by thousands. However, the production department had not been informed of the campaign and had "
        "scheduled factory maintenance, leaving assembly lines shut down. Simultaneously, the purchasing department had delayed "
        "procuring imported display driver chips to negotiate bulk trade discounts. When angry customers flooded customer service "
        "demanding refunds, the departments blamed one another: marketing blamed production for lack of stock, production blamed "
        "purchasing for missing components, and purchasing blamed finance for delayed letters of credit. The newly appointed General "
        "Manager realized that the chaos was not due to lack of individual competence, but due to the complete absence of 'Coordination', "
        "which synchronizes the efforts of different departments into unified action."
    ),
    [
        (
            "Which vital managerial force is described as the 'essence of management' that binds all other functions together?",
            "Coordination",
            ["Centralized Autocracy", "Informal Grapevine Communication", "Arbitrary Budget Reduction"],
            "A",
            "1. Coordination is not a separate function of management; it is the very essence of management that harmonizes planning, organizing, staffing, directing, and controlling.\nHence, Option {{CORR}} is correct.",
            "Identifies Coordination as essence of management."
        ),
        (
            "Coordination integrates departmental efforts to achieve which fundamental management purpose?",
            "Unity of Action in the pursuit of common organizational goals",
            ["Individual career advancement of department heads over company targets", "Complete elimination of all written communications between managers", "Independent monopolistic operations by functional silos"],
            "B",
            "1. The primary purpose of coordination is to secure unity of action in the realization of a common enterprise purpose.\nHence, Option {{CORR}} is correct.",
            "Identifies Unity of Action."
        ),
        (
            "At which levels of management is coordination required within an enterprise?",
            "At all levels of management (Top, Middle, and Lower/Supervisory)",
            ["Exclusively at the supervisory shopfloor level", "Solely by the Board of Directors at annual meetings", "Only in the finance and accounting department"],
            "C",
            "1. Coordination is an all-pervasive function required at all levels of management to ensure harmonious execution of activities.\nHence, Option {{CORR}} is correct.",
            "Identifies pervasive nature of coordination across all levels."
        ),
        (
            "Which feature of coordination ensures that it is not a one-time activity but an ongoing managerial commitment?",
            "Coordination is a Continuous Process",
            ["Coordination is a Deliberate Function only during annual audits", "Coordination is an Unplanned Spontaneous Coincidence", "Coordination is a Static Procedural Manual"],
            "D",
            "1. Coordination is not a one-shot event; it begins at the planning stage and continues through controlling in an uninterrupted continuous cycle.\nHence, Option {{CORR}} is correct.",
            "Identifies Coordination as a continuous process."
        ),
        (
            "Why did the departments at Zenith Electronics work at cross-purposes despite individual functional competence?",
            "Because each department operated as an isolated silo without deliberate synchronization of timings and targets",
            ["Because the company had zero working capital in its bank accounts", "Because the workers were uneducated daily wage contractors", "Because government price ceiling laws banned the sale of LED televisions"],
            "A",
            "1. In the absence of deliberate coordination, functional departments pursue their departmental interests independently, creating conflicts and cross-purposes.\nHence, Option {{CORR}} is correct.",
            "Explains conflict arising from lack of coordination."
        )
    ]
))

# Passage 3: Fayol's Principles of Management at Bharat Precision (Unit 2)
passages_data.append((
    "Principles of Management",
    "Fayol's Principles of Management",
    (
        "Bharat Precision Tools Ltd. manufactures high-grade industrial drill bits. Recently, the factory appointed a new plant "
        "head, Mr. Verma. During his initial operational review, Verma noted several organizational anomalies. First, workers on "
        "the assembly line received conflicting instructions from both the production manager (demanding high output speed) and "
        "the quality control manager (demanding multiple inspections that slowed output), causing severe confusion and friction "
        "('Violation of Unity of Command'). Second, each production line was performing all tasks haphazardly; Verma reorganized "
        "the plant by dividing work into specialized tasks where each machinist performed a specific repetitive operation, "
        "greatly increasing labor productivity ('Division of Work'). Third, Verma observed that workers were leaving their tools "
        "and materials in random corners of the workshop, resulting in wasted search time; he instituted designated racks for each "
        "tool and specific stations for raw materials, declaring 'A place for everything and everything in its place' ('Principle of Order')."
    ),
    [
        (
            "Which principle of Henri Fayol was violated when machinists received simultaneous conflicting orders from two different managers?",
            "Unity of Command",
            ["Unity of Direction", "Scalar Chain", "Espirit de Corps"],
            "A",
            "1. Unity of Command states that each subordinate should receive orders from and be accountable to only one superior to prevent confusion and dual subordination.\nHence, Option {{CORR}} is correct.",
            "Identifies violation of Unity of Command."
        ),
        (
            "Dividing work into smaller specialized tasks to build worker proficiency and enhance output efficiency represents:",
            "Division of Work",
            ["Centralization", "Subordination of Individual Interest", "Remuneration of Employees"],
            "B",
            "1. Division of work leads to specialization, which increases worker efficiency and output by ensuring tasks are performed by trained specialists.\nHence, Option {{CORR}} is correct.",
            "Defines Division of Work."
        ),
        (
            "The maxim 'A place for everything and everything in its place' directly embodies which Fayol principle?",
            "Principle of Order",
            ["Principle of Equity", "Principle of Initiative", "Principle of Stability of Tenure"],
            "C",
            "1. Fayol's Principle of Order states that there should be a designated place for every material and person, ensuring orderliness and eliminating wasted time.\nHence, Option {{CORR}} is correct.",
            "Identifies Principle of Order."
        ),
        (
            "What is the key structural difference between 'Unity of Command' and 'Unity of Direction'?",
            "Unity of Command prevents dual subordination of an employee, while Unity of Direction prevents overlapping of activities with a common objective",
            ["Unity of Command applies only to top executives, while Unity of Direction applies only to trade unions", "Unity of Command requires written contracts, while Unity of Direction is purely verbal", "Unity of Command was propounded by Taylor, while Unity of Direction was propounded by Fayol"],
            "D",
            "1. Unity of Command focuses on a single boss for each subordinate (preventing dual subordination); Unity of Direction requires 'one head and one plan' for a group of activities having the same objective.\nHence, Option {{CORR}} is correct.",
            "Contrasts Unity of Command with Unity of Direction."
        ),
        (
            "Fayol recommended that managers should encourage employees to suggest improvement plans and execute them, fostering a feeling of belonging. This is termed:",
            "Principle of Initiative",
            ["Principle of Discipline", "Principle of Authority and Responsibility", "Principle of Subordination of General Interest"],
            "A",
            "1. Initiative means taking the first step with self-motivation. Fayol suggested that employees should be encouraged to conceive and carry out their plans.\nHence, Option {{CORR}} is correct.",
            "Defines Principle of Initiative."
        )
    ]
))

# Passage 4: Taylor's Scientific Management & Functional Foremanship (Unit 2)
passages_data.append((
    "Principles of Management",
    "Taylor's Scientific Techniques",
    (
        "Metro Automotives Ltd. produces precision gearboxes for commercial tractors. To eliminate worker soldiering and optimize "
        "shopfloor operations, the factory director implemented F.W. Taylor's Scientific Management principles. The traditional "
        "single foreman was replaced with Taylor's 'Functional Foremanship', separating the planning and execution functions. "
        "Under the Planning Incharge, four specialists were appointed: Instruction Card Clerk (drafting operational instructions), "
        "Route Clerk (specifying the sequence of operations), Time and Cost Clerk (preparing schedules and cost sheets), and the "
        "Shop Disciplinarian. Under the Production Incharge, four operational foremen were deployed: Speed Boss (ensuring timely and "
        "accurate machine speed), Gang Boss (keeping machines, tools, and materials ready for work), Repair Boss (ensuring proper "
        "maintenance of machinery), and the Inspector (checking product quality standards). Furthermore, an industrial engineer "
        "conducted rigorous 'Motion Study' using video cameras to eliminate unnecessary bodily movements during gear assembly."
    ),
    [
        (
            "Functional Foremanship developed by F.W. Taylor is a direct extension of which classical management principle to the shopfloor level?",
            "Division of Work and Specialization",
            ["Unity of Command", "Decentralization of Strategic Policy", "Scalar Chain Hierarchy"],
            "A",
            "1. Functional foremanship extends the principle of division of work and specialization to the lowest operating level by deploying eight specialized supervisors.\nHence, Option {{CORR}} is correct.",
            "Identifies Functional Foremanship as extension of Division of Work."
        ),
        (
            "Which specialist under the Planning Department is responsible for specifying the exact physical sequence of operations for completing a job?",
            "Route Clerk",
            ["Instruction Card Clerk", "Time and Cost Clerk", "Shop Disciplinarian"],
            "B",
            "1. The Route Clerk specifies the exact route and chronological sequence through which raw materials and parts must travel on the factory floor.\nHence, Option {{CORR}} is correct.",
            "Identifies role of Route Clerk."
        ),
        (
            "Which foreman under the Production Department is tasked with keeping machines, tools, jigs, and materials ready for immediate operation by workers?",
            "Gang Boss",
            ["Speed Boss", "Repair Boss", "Inspector"],
            "C",
            "1. The Gang Boss is responsible for setting up machines, tools, and materials so that workers can begin their tasks without delays.\nHence, Option {{CORR}} is correct.",
            "Identifies role of Gang Boss."
        ),
        (
            "Functional Foremanship openly violates which fundamental principle of Henri Fayol?",
            "Unity of Command (since each worker receives orders from eight specialized bosses)",
            ["Division of Work", "Remuneration of Employees", "Principle of Order"],
            "D",
            "1. Under functional foremanship, each worker is supervised by eight different foremen, directly violating Fayol's Unity of Command.\nHence, Option {{CORR}} is correct.",
            "Identifies violation of Unity of Command under Functional Foremanship."
        ),
        (
            "What was the primary objective of conducting a 'Motion Study' at Metro Automotives?",
            "To detect and eliminate useless, unproductive movements of workers to minimize fatigue and execution time",
            ["To determine standard rest pauses during working hours", "To calculate the contractual piece wage rate per hour", "To determine the absolute sales price of gearboxes in wholesale markets"],
            "A",
            "1. Motion study is the study of movements like lifting, putting objects, sitting, and changing positions to identify and eliminate unproductive movements.\nHence, Option {{CORR}} is correct.",
            "Identifies objective of Motion Study."
        )
    ]
))

# Passage 5: Differential Piece Wage System & Mental Revolution (Unit 2)
passages_data.append((
    "Principles of Management",
    "Differential Piece Wage System and Mental Revolution",
    (
        "Surya Engineering Tools Ltd. implemented F.W. Taylor's Differential Piece Wage System to motivate shopfloor machinists. "
        "Through rigorous Time and Motion study, the industrial engineering department fixed the standard daily output at 20 units "
        "per worker during an eight-hour shift. The management instituted two distinct wage rates: a higher piece rate of Rs. 50 "
        "per unit for workers who produce standard output or more, and a lower piece rate of Rs. 40 per unit for workers who produce "
        "less than standard output. On Monday, worker Ramesh produced 22 units, earning Rs. 1,100 (22 × Rs. 50), while worker Suresh "
        "produced 18 units, earning Rs. 720 (18 × Rs. 40). The difference of Rs. 380 for a mere shortfall of 4 units served as an "
        "immense financial incentive for Suresh to improve. Management also initiated a 'Mental Revolution', fostering mutual trust "
        "where workers realized that higher productivity directly increased their personal earnings, while management shared the "
        "gains of increased surplus with laborers instead of engaging in hostile wage cuts."
    ),
    [
        (
            "What was the primary objective of Taylor's Differential Piece Wage System?",
            "To differentiate between efficient and inefficient workers and financially reward the efficient ones",
            ["To pay equal wages to all employees regardless of effort or output", "To penalize trade union leaders through discretionary wage deductions", "To eliminate the need for supervisory quality inspection"],
            "A",
            "1. The differential piece wage system rewards efficient workers with higher piece rates and motivates inefficient workers to achieve standard performance.\nHence, Option {{CORR}} is correct.",
            "Identifies objective of Differential Piece Wage System."
        ),
        (
            "How much did Suresh lose in monetary terms by falling short of standard output by just 2 units (producing 18 instead of 20)?",
            "Rs. 280 (Earnings of Rs. 720 vs potential Rs. 1,000 at standard rate)",
            ["Rs. 80", "Rs. 400", "Rs. 150"],
            "B",
            "1. At standard output (20 units), earnings = 20 × Rs. 50 = Rs. 1,000. At 18 units, earnings = 18 × Rs. 40 = Rs. 720. Difference = Rs. 1,000 - Rs. 720 = Rs. 280.\nHence, Option {{CORR}} is correct.",
            "Calculates financial penalty under differential piece wage system."
        ),
        (
            "What does Taylor's concept of 'Mental Revolution' signify?",
            "A complete change of mindset and mutual attitude between workers and management from conflict to cooperation",
            ["A violent overthrow of factory ownership by shopfloor trade unions", "The psychological screening of executive applicants using polygraph machines", "The complete elimination of monetary wages in exchange for company equity"],
            "C",
            "1. Mental revolution involves a complete transformation in the outlook of both workers and management towards each other, replacing suspicion with mutual cooperation.\nHence, Option {{CORR}} is correct.",
            "Defines Taylor's Mental Revolution."
        ),
        (
            "Which Taylor technique determines the standard time taken by a worker of reasonable skill and efficiency to perform a well-defined job?",
            "Time Study",
            ["Fatigue Study", "Method Study", "Motion Study"],
            "D",
            "1. Time study determines the standard time taken to perform a well-defined job using time measuring devices like stopwatches.\nHence, Option {{CORR}} is correct.",
            "Identifies Time Study."
        ),
        (
            "Which study aims at finding out one best way of doing the job to minimize production costs and maximize quality?",
            "Method Study",
            ["Motion Study", "Time Study", "Fatigue Study"],
            "A",
            "1. The objective of method study is to find out one best way of doing the job, right from procurement of raw materials till final delivery.\nHence, Option {{CORR}} is correct.",
            "Defines Method Study."
        )
    ]
))

# Passage 6: Dimensions of Business Environment at EcoPack Solutions (Unit 3)
passages_data.append((
    "Business Environment",
    "Dimensions of Business Environment",
    (
        "EcoPack Solutions Ltd. manufactures biodegradable food packaging containers from agricultural crop residues. Over the "
        "past three years, the company experienced major business disruptions caused by external forces. First, the Ministry of "
        "Environment enacted the Plastic Waste Management Amendment Rules, legally prohibiting single-use plastic cutlery nationwide "
        "('Legal Dimension'). Second, a substantial rise in urban consumer health consciousness and eco-friendly lifestyle preferences "
        "led households to demand sustainable packaging ('Social Dimension'). Third, rapid advancements in automated bio-resin molding "
        "technology reduced per-unit production costs by 35% ('Technological Dimension'). Fourth, the Reserve Bank of India reduced "
        "benchmark repo rates, facilitating low-interest bank loans for green manufacturing enterprises ('Economic Dimension'). "
        "Finally, state elections brought a new administration committed to providing industrial power subsidies for rural startups "
        "('Political Dimension'). By scanning these environmental dimensions proactively, EcoPack captured a commanding 40% market share."
    ),
    [
        (
            "The statutory ban imposed on single-use plastics under the Plastic Waste Management Amendment Rules exemplifies which business environment dimension?",
            "Legal Dimension",
            ["Economic Dimension", "Technological Dimension", "Social Dimension"],
            "A",
            "1. Legislation passed by government authorities, court judgments, and administrative orders constitute the Legal Dimension of business environment.\nHence, Option {{CORR}} is correct.",
            "Identifies Legal Dimension."
        ),
        (
            "Changing customer values towards sustainable living, healthy dining, and environmental conservation represents the:",
            "Social Dimension",
            ["Political Dimension", "Technological Dimension", "Legal Dimension"],
            "B",
            "1. Customs, traditions, values, social trends, and lifestyle preferences of society constitute the Social Dimension of business environment.\nHence, Option {{CORR}} is correct.",
            "Identifies Social Dimension."
        ),
        (
            "The Reserve Bank's monetary policy action altering repo rates and bank borrowing interest rates belongs to the:",
            "Economic Dimension",
            ["Political Dimension", "Social Dimension", "Legal Dimension"],
            "C",
            "1. Interest rates, inflation rates, changes in disposable income of people, and monetary policies are core elements of the Economic Dimension.\nHence, Option {{CORR}} is correct.",
            "Identifies Economic Dimension."
        ),
        (
            "The ideology of the governing political party and state government commitments regarding industrial subsidies reflect the:",
            "Political Dimension",
            ["Technological Dimension", "Legal Dimension", "Social Dimension"],
            "D",
            "1. Political stability, government ideology, and administrative attitudes toward business constitute the Political Dimension.\nHence, Option {{CORR}} is correct.",
            "Identifies Political Dimension."
        ),
        (
            "Why is Environmental Scanning considered an indispensable strategic exercise for corporate leadership?",
            "It helps identify emerging opportunities and threats early, enabling the enterprise to take first-mover advantage",
            ["It eliminates the need to pay corporate income taxes", "It guarantees that competitor firms will legally dissolve within one year", "It converts all debt debentures into sovereign currency reserves"],
            "A",
            "1. Environmental scanning enables firms to identify market opportunities to reap first-mover advantage and detect early warning signals of emerging threats.\nHence, Option {{CORR}} is correct.",
            "States importance of Environmental Scanning."
        )
    ]
))

# Passage 7: Demonetization & Digital Currency Transformation (Unit 3)
passages_data.append((
    "Business Environment",
    "Demonetization and Economic Policy Impact",
    (
        "On 8 November 2016, the Government of India announced the historic Demonetization of all Rs. 500 and Rs. 1,000 denomination "
        "banknotes, stripping 86% of the country's circulating currency of legal tender status overnight. The stated strategic "
        "objectives of this bold economic measure were: curtailing black money accumulated through undisclosed income, eliminating "
        "counterfeit currency used for cross-border terror financing, broadening the formal income tax base, and accelerating the "
        "transition towards a digitized, less-cash economy. While cash-intensive retail trade, real estate, and unorganized mandi "
        "markets experienced acute short-term contraction due to currency shortages, fintech companies operating digital payment "
        "wallets, Unified Payments Interface (UPI) gateways, and mobile banking applications witnessed astronomical growth. Bank "
        "deposits surged, liquidity expanded across commercial banking institutions, and formal tax compliance increased sharply."
    ),
    [
        (
            "What proportion of the total currency value in circulation was demonetized on 8 November 2016?",
            "Approximately 86%",
            ["Approximately 25%", "Approximately 50%", "Exactly 100%"],
            "A",
            "1. The demonetization of Rs. 500 and Rs. 1,000 currency notes invalidated approximately 86% of the total cash value in circulation in India.\nHence, Option {{CORR}} is correct.",
            "Identifies 86% of circulating currency demonetized."
        ),
        (
            "Which of the following was a primary explicit objective of the Demonetization exercise?",
            "Channeling savings into the formal financial system and curbing corruption and black money",
            ["Permanently banning all electronic digital payments in rural India", "Forcing all commercial banks to convert into non-profit charities", "Abolishing corporate income taxation for multinational corporations"],
            "B",
            "1. The key aims of demonetization were curbing corruption, checking counterfeit currency, penalizing black money, and integrating cash into formal bank channels.\nHence, Option {{CORR}} is correct.",
            "States primary objectives of demonetization."
        ),
        (
            "Which business sector witnessed exponential immediate market expansion as a direct fallout of demonetization?",
            "Digital Payments, FinTech Wallets, and Electronic Banking Services",
            ["Unregulated cash-only unorganized produce mandis", "Luxury brick-and-mortar cash jewelry showrooms", "Physical printed ledger paper manufacturers"],
            "C",
            "1. Cash shortages compelled consumers and merchants to adopt digital payment mechanisms like UPI and digital wallets, driving rapid FinTech growth.\nHence, Option {{CORR}} is correct.",
            "Identifies FinTech and digital payments as major beneficiaries."
        ),
        (
            "Demonetization led to a significant increase in financial savings because:",
            "Households deposited idle cash currency into formal bank savings and current accounts",
            ["Citizens stopped purchasing essential food grains and medicines", "Commercial banks eliminated all deposit withdrawal rights", "The Reserve Bank confiscated all gold reserves"],
            "D",
            "1. Citizens deposited cash holdings into commercial banks, leading to huge deposit inflows and expanding institutional credit capacity.\nHence, Option {{CORR}} is correct.",
            "Explains rise in banking liquidity post-demonetization."
        ),
        (
            "The Demonetization initiative represents a major intervention belonging primarily to which business environment dimension?",
            "Economic Dimension (and Political / Policy Dimension)",
            ["Technological Dimension exclusively", "International Diplomatic Dimension", "Natural Physical Geography Dimension"],
            "A",
            "1. Demonetization was a major macroeconomic and monetary policy intervention impacting money supply, liquidity, and financial transactions across the economy.\nHence, Option {{CORR}} is correct.",
            "Classifies demonetization under Economic and Policy dimension."
        )
    ]
))

# Passage 8: Planning Process & Formulating Strategies at Apex Retail (Unit 4)
passages_data.append((
    "Planning",
    "Planning Process",
    (
        "Apex Retail Ltd. operates a nationwide supermarket chain. To respond to the rising threat of 10-minute quick-commerce "
        "grocery delivery apps, the board initiated a comprehensive Planning Process to launch its own dark-store delivery network. "
        "First, the CEO clearly defined the target objective: achieving 50,000 daily deliveries across 10 metro cities within 12 "
        "months ('Setting Objectives'). Next, the planning team made critical assumptions regarding future consumer smartphone "
        "adoption, fuel costs, and municipal commercial zoning laws ('Developing Premises'). Third, the team identified various "
        "alternative courses of action: acquiring an existing quick-commerce startup, partnering with local kirana shops, or building "
        "independent micro-warehouses ('Identifying Alternatives'). After evaluating each alternative in terms of capital cost, "
        "feasibility, and operational risk ('Evaluating Alternatives'), the board selected the hybrid dark-store model ('Selecting an "
        "Alternative'). Finally, secondary plans for hiring riders, acquiring electric scooters, and building mobile app software "
        "were formulated ('Derivative Plans'), followed by execution and rigorous monthly progress monitoring ('Follow-up Action')."
    ),
    [
        (
            "What is the first and foundational step in the formal Planning Process?",
            "Setting Objectives",
            ["Developing Premises", "Identifying Alternative Courses of Action", "Formulating Derivative Plans"],
            "A",
            "1. Setting objectives is the first step in planning, specifying what the organization wants to achieve and giving direction to all activities.\nHence, Option {{CORR}} is correct.",
            "Identifies Setting Objectives as first step in planning."
        ),
        (
            "Making forecasts and assumptions about future economic conditions, competitor behaviors, and government policies is called:",
            "Developing Premises",
            ["Formulating Operating Budgets", "Executing Directing Campaigns", "Span of Management Assessment"],
            "B",
            "1. Premises are the assumptions about the future on the basis of which plans are drawn. Developing premises is the second step of planning.\nHence, Option {{CORR}} is correct.",
            "Defines Developing Premises."
        ),
        (
            "Why is 'Follow-up Action' considered vital in the planning cycle?",
            "To monitor whether plans are being implemented properly and activities are performed according to schedule",
            ["To immediately liquidate all company physical assets upon completion of planning", "To dismiss all operational department heads after plan approval", "To guarantee that external market conditions will remain static"],
            "C",
            "1. Follow-up action ensures that implementation proceeds as scheduled and corrective actions are taken if deviations occur.\nHence, Option {{CORR}} is correct.",
            "Explains purpose of Follow-up Action."
        ),
        (
            "Plans formulated to support and implement the basic master organizational plan (such as hiring delivery riders and acquiring EV scooters) are known as:",
            "Derivative Plans",
            ["Contingent Strike Plans", "Statutory Liquidation Plans", "Unilateral Disciplinary Decrees"],
            "D",
            "1. Derivative plans are secondary or supportive plans formulated to assist in the execution of the primary organizational plan.\nHence, Option {{CORR}} is correct.",
            "Defines Derivative Plans."
        ),
        (
            "Planning is termed a 'futuristic' management function because:",
            "It involves looking ahead, analyzing future opportunities and challenges, and preparing for them in advance",
            ["It focuses exclusively on recording historical financial book entries", "It requires managers to travel into the future via virtual reality", "It cannot be altered once documented under criminal penalty"],
            "A",
            "1. Planning is futuristic because it involves looking ahead, forecasting future events, and preparing the organization to meet them effectively.\nHence, Option {{CORR}} is correct.",
            "Explains futuristic nature of planning."
        )
    ]
))

# Passage 9: Types of Plans at Crown Confectionery (Unit 4)
passages_data.append((
    "Planning",
    "Types of Plans: Standing vs Single-Use Plans",
    (
        "Crown Confectionery Ltd. manufactures gourmet chocolates and baked desserts. The management employs both single-use "
        "and standing plans to govern factory and commercial operations. The overarching end result the company seeks to achieve is "
        "to capture a 15% share of the premium dark chocolate market within two years ('Objective'). To accomplish this, the board "
        "crafted a broad, comprehensive roadmap detailing resource allocation, marketing campaigns, and retail tie-ups ('Strategy'). "
        "The human resources department established a clear organizational guide stating 'We provide equal employment opportunities "
        "and never hire child labor' ('Policy'). For factory safety, a strict managerial directive was posted at the entrance: "
        "'Smoking inside the production facility is strictly prohibited; violators will be dismissed immediately' ('Rule'). For a "
        "special Christmas gift hamper launch, the brand manager designed a non-recurring plan detailing activities, milestones, "
        "and a financial outlay of Rs. 45 Lakhs ('Programme' and 'Budget')."
    ),
    [
        (
            "The specific end target of capturing a 15% market share in premium dark chocolates within two years represents an:",
            "Objective",
            ["Rule", "Procedure", "Method"],
            "A",
            "1. Objectives are the ends toward which activities are directed; they are quantifiable targets to be achieved within a given timeframe.\nHence, Option {{CORR}} is correct.",
            "Identifies Objective."
        ),
        (
            "A strict managerial statement that allows no discretion and mandates specific action or non-action (such as 'No smoking inside the factory') is classified as a:",
            "Rule",
            ["Policy", "Strategy", "Budget"],
            "B",
            "1. A Rule is a specific statement that informs what is to be done or not done, permitting no managerial discretion and carrying definite penalties.\nHence, Option {{CORR}} is correct.",
            "Defines Rule."
        ),
        (
            "How does a 'Policy' differ fundamentally from a 'Rule'?",
            "A Policy provides a broad general guide for managerial decision-making, whereas a Rule permits zero discretion",
            ["A Policy is always unwritten, while a Rule is strictly published in the official government gazette", "A Policy is decided by laborers, while a Rule is decided by suppliers", "A Policy applies only during economic recessions"],
            "C",
            "1. Policies are general statements that guide thinking or channel energies toward decision-making within broad parameters, unlike rules which are rigid.\nHence, Option {{CORR}} is correct.",
            "Contrasts Policy and Rule."
        ),
        (
            "A single-use plan comprising detailed steps, policies, rules, task assignments, and physical/financial resources required for a specific non-recurring project is a:",
            "Programme",
            ["Standing Policy", "Scalar Chain", "Method"],
            "D",
            "1. A Programme is a single-use comprehensive plan covering a relatively large scope of activities, including goals, policies, procedures, rules, and task allocations.\nHence, Option {{CORR}} is correct.",
            "Defines Programme."
        ),
        (
            "A statement of expected results expressed in numerical, quantitative terms for a definite future period is a:",
            "Budget",
            ["Strategy", "Procedure", "Objective"],
            "A",
            "1. A Budget is a statement of expected future results expressed in numerical terms, acting as a control device as well as a plan.\nHence, Option {{CORR}} is correct.",
            "Defines Budget."
        )
    ]
))

# Passage 10: Limitations of Planning at SkyHigh Airlines (Unit 4)
passages_data.append((
    "Planning",
    "Limitations of Planning",
    (
        "SkyHigh Airlines Ltd. spent six months and Rs. 5 Crore on external management consulting to formulate a rigid 5-year "
        "global expansion plan. The detailed plan prescribed flight routes, crew hiring, and long-term jet fuel procurement "
        "contracts. However, two unforeseen external shocks struck simultaneously: global crude oil prices surged by 80% due to "
        "geopolitical warfare, and a foreign exchange currency crisis depreciated the home currency, escalating aircraft lease costs. "
        "When regional route managers noticed passenger demand collapsing on international sectors, they requested permission to "
        "re-route aircraft to lucrative domestic tier-2 routes. The executive committee refused, insisting that operational managers "
        "must adhere strictly to the approved 5-year master document ('Planning leads to rigidity'). Furthermore, lower-level managers "
        "stopped thinking creatively, waiting mechanically for head-office instructions ('Planning reduces creativity'). The airline "
        "suffered huge quarterly losses, vividly illustrating that planning cannot guarantee success in a dynamic, turbulent environment."
    ),
    [
        (
            "Which major limitation of planning was demonstrated when the executive committee prohibited route managers from modifying flight schedules in response to fuel price surges?",
            "Planning leads to Rigidity",
            ["Planning guarantees 100% Commercial Success", "Planning eliminates all Operating Expenditures", "Planning promotes Total Democratic Anarchy"],
            "A",
            "1. Once plans are drawn up in detail, managers may not be in a position to change them in response to changed circumstances, leading to operational rigidity.\nHence, Option {{CORR}} is correct.",
            "Identifies 'Planning leads to rigidity'."
        ),
        (
            "Why did lower-level operational managers stop initiating innovative solutions and wait mechanically for head-office orders?",
            "Planning reduces creativity (since middle and lower managers merely carry out orders formulated by top management)",
            ["Because lower-level employees were illiterate daily wage laborers", "Because labor laws forbid airline employees from speaking during work hours", "Because computers had replaced all human decision-making"],
            "B",
            "1. Planning is often initiated by top management; middle and lower managers tend to blindly follow instructions without exercising personal initiative and creativity.\nHence, Option {{CORR}} is correct.",
            "Explains 'Planning reduces creativity'."
        ),
        (
            "The inability of SkyHigh's 5-year plan to handle sudden geopolitical warfare and crude oil price surges highlights that:",
            "Planning may not work in a dynamic and turbulent environment",
            ["Planning is completely unnecessary for commercial aviation", "External economic forces always conform perfectly to corporate blueprints", "Airlines should never prepare flight schedules"],
            "C",
            "1. The business environment is dynamic and turbulent. Planning cannot foresee every contingency, so plans may fail when environmental disruptions occur.\nHence, Option {{CORR}} is correct.",
            "Identifies limitation that planning may not work in dynamic environment."
        ),
        (
            "Spending six months of executive time and Rs. 5 Crore on consulting fees illustrates which inherent drawback of formal planning?",
            "Planning involves huge costs and is a time-consuming process",
            ["Planning reduces total company share capital", "Planning violates SEBI listing regulations", "Planning forces corporate insolvency"],
            "D",
            "1. Formulation of elaborate plans involves collection of data, hiring experts, board meetings, and high expenditure of time and money.\nHence, Option {{CORR}} is correct.",
            "Identifies cost and time limitations of planning."
        ),
        (
            "Why is it said that 'Planning does not guarantee success'?",
            "Because a plan that worked successfully in the past may fail if blindly applied to changed future conditions",
            ["Because successful companies never formulate any plans", "Because planning is legally prohibited under the Companies Act", "Because commercial banks reject companies that prepare plans"],
            "A",
            "1. Managers often fall into the trap of assuming that because a plan worked previously, it will automatically succeed again, creating a false sense of security.\nHence, Option {{CORR}} is correct.",
            "Explains why planning does not guarantee success."
        )
    ]
))

# Passage 11: Functional vs Divisional Structure at Orient Conglomerate (Unit 5)
passages_data.append((
    "Organising",
    "Organisational Structure: Functional vs Divisional",
    (
        "Orient Enterprises Ltd. originally operated as a single-product enterprise manufacturing consumer cosmetics. Its "
        "organization was structured on a 'Functional' basis, grouping jobs into specialized departments: Production, Marketing, "
        "Finance, and Human Resources. This functional structure fostered high occupational specialization and cost efficiency. "
        "However, over the subsequent decade, Orient diversified rapidly into multiple distinct product lines: Pharmaceuticals, "
        "Packaged Organic Foods, and Industrial Electronics. As operations grew, top management became overwhelmed by coordination "
        "bottlenecks. Department heads prioritized their functional silos over overall product success; for instance, the marketing "
        "department could not give adequate attention to pharma sales while pushing cosmetics. Recognizing the crisis, the board "
        "restructured Orient into a 'Divisional Structure'. Independent product divisions were created for Cosmetics, Foods, and "
        "Pharma, each headed by a Divisional Manager with full operational autonomy and its own dedicated production, sales, and "
        "finance units, holding each division accountable for its own profits and losses."
    ),
    [
        (
            "When an enterprise manufactures a single line of goods or provides specialized services, which organizational structure is most economical and appropriate?",
            "Functional Structure",
            ["Divisional Structure", "Matrix Project Network", "Informal Grapevine Structure"],
            "A",
            "1. A Functional Structure is most suitable when the enterprise has a single main product line, grouping activities on the basis of functions like production, sales, and finance.\nHence, Option {{CORR}} is correct.",
            "Identifies Functional Structure for single product enterprise."
        ),
        (
            "Why did Orient Enterprises transition to a 'Divisional Structure' after diversifying into Cosmetics, Foods, and Pharma?",
            "Because a multi-product enterprise requires product specialization, independent accountability, and rapid decision-making per division",
            ["Because the Companies Act strictly bans functional departments in private companies", "Because divisional structure completely eliminates the need for middle managers", "Because functional structures cannot employ more than 10 total workers"],
            "B",
            "1. When an enterprise diversifies into multiple diverse product lines, divisional structure provides dedicated focus, flexibility, and distinct profit-center accountability.\nHence, Option {{CORR}} is correct.",
            "Explains rationale for Divisional Structure in multi-product firm."
        ),
        (
            "What is a major administrative advantage of establishing independent product divisions?",
            "Fixing clear accountability for revenues, costs, and profit performance on each divisional manager",
            ["Complete elimination of all corporate income tax liabilities", "Zero duplication of physical facilities and staff across divisions", "Preventing employees from ever requesting wage increments"],
            "C",
            "1. In a divisional structure, each division operates as an autonomous profit center, making performance measurement and individual accountability straightforward.\nHence, Option {{CORR}} is correct.",
            "Identifies accountability as advantage of divisional structure."
        ),
        (
            "What is a prominent disadvantage or cost limitation associated with a Divisional Structure?",
            "Duplication of functional departments and resources across multiple divisions, increasing operating overhead costs",
            ["Extreme over-centralization of petty daily decisions at the board level", "Total inability to assess which product line is profitable", "Destruction of all worker specialization"],
            "D",
            "1. Each product division maintains its own production, marketing, and finance departments, leading to duplication of physical facilities and personnel, increasing expenses.\nHence, Option {{CORR}} is correct.",
            "Identifies resource duplication as disadvantage of divisional structure."
        ),
        (
            "In a functional structure, employees develop narrow loyalty toward their functional departments rather than the overall enterprise. This drawback is known as:",
            "Functional Silo Mentality / Conflict of Functional Interests",
            ["Unity of Command Violation", "Scalar Chain Disruption", "Decentralization Overreach"],
            "A",
            "1. Functional structures often lead to departmental empire-building, where department heads place functional goals above overarching enterprise objectives.\nHence, Option {{CORR}} is correct.",
            "Identifies functional silo drawback."
        )
    ]
))

# Passage 12: Delegation: Authority, Responsibility, Accountability (Unit 5)
passages_data.append((
    "Organising",
    "Elements of Delegation",
    (
        "Sunrise Garments Ltd. is experiencing rapid expansion, doubling its wholesale retail accounts across Northern India. "
        "The Chief Marketing Officer (CMO), Mr. Vikram, found himself buried under routine administrative paperwork, approving minor "
        "expense vouchers and answering basic vendor queries, leaving him zero time for strategic market expansion. Vikram decided "
        "to practice 'Delegation'. He assigned the duty of handling North-Zone retailer relations and closing orders up to Rs. 10 Lakhs "
        "to his capable deputy sales manager, Rajesh ('Responsibility'). To enable Rajesh to perform these duties effectively, Vikram "
        "granted him formal powers to sign sales contracts, authorize 5% trade discounts, and deploy field sales agents ('Authority'). "
        "However, when a major institutional client order was botched due to delivery errors by Rajesh's team, the Managing Director "
        "called Vikram to explain the failure. Vikram attempted to deflect the blame onto Rajesh. The Managing Director firmly reminded "
        "Vikram of the fundamental management principle: 'Authority can be delegated, responsibility can be shared, but absolute "
        "accountability can never be delegated away'."
    ),
    [
        (
            "The right of an individual to command subordinates, utilize company resources, and take necessary operational actions within defined limits is termed:",
            "Authority",
            ["Responsibility", "Accountability", "Informal Influence"],
            "A",
            "1. Authority is the formal right to give orders, utilize resources, and make decisions in an organizational role.\nHence, Option {{CORR}} is correct.",
            "Defines Authority."
        ),
        (
            "The obligation of a subordinate to properly perform the assigned duty or task to the best of their ability is termed:",
            "Responsibility",
            ["Authority", "Accountability", "Decentralization"],
            "B",
            "1. Responsibility is the obligation of a subordinate to properly perform the assigned duty; it arises from a superior-subordinate relationship.\nHence, Option {{CORR}} is correct.",
            "Defines Responsibility."
        ),
        (
            "What does the principle of 'Absoluteness of Accountability' dictate in managerial delegation?",
            "A delegator remains ultimately answerable to their own superior for the final outcome, regardless of delegation to subordinates",
            ["A superior can completely escape responsibility by shifting 100% blame onto subordinates", "Accountability flows laterally between peer employees of equal rank", "Subordinates must face criminal prosecution for any operational shortfall"],
            "C",
            "1. Accountability is absolute and cannot be delegated; a superior remains ultimately answerable to higher authority for tasks delegated to subordinates.\nHence, Option {{CORR}} is correct.",
            "Explains Absoluteness of Accountability."
        ),
        (
            "From the perspective of organizational hierarchy, in which direction does Authority flow, and in which direction does Accountability flow?",
            "Authority flows downward from superior to subordinate; Accountability flows upward from subordinate to superior",
            ["Authority flows upward; Accountability flows downward", "Both Authority and Accountability flow strictly horizontally", "Both Authority and Accountability flow diagonally across informal networks"],
            "D",
            "1. Authority flows downwards from superior to subordinate as rights are delegated; Accountability flows upwards as the subordinate is answerable to the superior.\nHence, Option {{CORR}} is correct.",
            "Identifies directions of Authority and Accountability flows."
        ),
        (
            "How does effective delegation benefit the delegating manager like Mr. Vikram?",
            "It relieves the executive from routine work, allowing them to focus on high-priority strategic activities",
            ["It eliminates all need to pay salaries to junior staff members", "It allows the manager to take permanent leaves of absence without notice", "It dissolves the formal corporate structure completely"],
            "A",
            "1. Delegation reduces the executive's routine burden, freeing up valuable managerial time to concentrate on strategic growth and critical issues.\nHence, Option {{CORR}} is correct.",
            "States benefit of delegation to superiors."
        )
    ]
))

# Passage 13: Decentralization Policy & Autonomy at Global Pharma (Unit 5)
passages_data.append((
    "Organising",
    "Decentralization: Importance and Philosophy",
    (
        "Global Pharma Ltd. is a transnational pharmaceutical corporation operating manufacturing plants and sales networks "
        "across five continents. Originally, the corporate headquarters in Mumbai practiced extreme Centralization: every price "
        "adjustment, local supply contract, and sales hiring decision required written clearance from the executive committee in Mumbai. "
        "This led to severe operational paralysis: branch managers in Brazil and Japan missed tender bidding deadlines due to time-zone "
        "delays, local customer complaints went unaddressed for weeks, and top executives were drowning in petty operational details. "
        "To revive agility, the new CEO instituted systematic 'Decentralization'. Decision-making authority was dispersed downward "
        "to the lowest appropriate operating levels. Country heads were empowered to set regional product pricing within broad "
        "parameters, recruit local sales teams, and negotiate supply agreements up to Rs. 5 Crore without head-office sign-off. "
        "Top management retained control only over overarching strategic policies, capital budgeting, and core research patents."
    ),
    [
        (
            "Decentralization is best described in management terminology as:",
            "A systematic, deliberate dispersal of decision-making authority down to the lowest appropriate operating levels",
            ["An accidental abdication of managerial leadership to trade unions", "The physical relocation of corporate headquarters from cities to rural villages", "The legal liquidation of subsidiary companies into private partnerships"],
            "A",
            "1. Decentralization refers to the systematic and even dispersal of decision-making authority throughout all levels of the organization.\nHence, Option {{CORR}} is correct.",
            "Defines Decentralization."
        ),
        (
            "How does Decentralization differ fundamentally from simple Delegation?",
            "Delegation is a two-person transfer of authority from superior to subordinate, whereas Decentralization is an organization-wide philosophy of authority dispersal",
            ["Delegation is legally mandatory under the Factories Act, while Decentralization is unconstitutional", "Delegation applies only to finance, while Decentralization applies only to factory laborers", "Delegation has a wide scope, whereas Decentralization has a narrow scope"],
            "B",
            "1. Delegation is a necessary operational process between two individuals to get work done, while decentralization is an optional organization-wide strategic philosophy.\nHence, Option {{CORR}} is correct.",
            "Contrasts Delegation and Decentralization."
        ),
        (
            "Which major benefit of decentralization is highlighted by regional managers responding swiftly to local tenders in Brazil and Japan?",
            "Facilitates quick and flexible decision-making tailored to local market conditions",
            ["Eliminates all corporate income taxes across overseas subsidiaries", "Prevents foreign governments from imposing import tariffs", "Guarantees zero defective pharmaceutical products permanently"],
            "C",
            "1. Since decisions are made at points close to action by managers with direct on-the-ground knowledge, decentralization enables rapid, agile responses.\nHence, Option {{CORR}} is correct.",
            "Identifies quick decision-making as benefit of decentralization."
        ),
        (
            "Under a sound policy of decentralization, which decisions are strictly retained by top management?",
            "Overarching strategic policies, capital structuring, major investments, and corporate coordination",
            ["Daily approval of factory floor lunch break timings", "Purchasing routine office stationery like paper clips and pens", "Daily scheduling of factory security guard shifts"],
            "D",
            "1. An enterprise cannot be 100% decentralized; top management must retain control over core corporate policies, capital allocation, and enterprise goals.\nHence, Option {{CORR}} is correct.",
            "Identifies functions retained by top management under decentralization."
        ),
        (
            "How does decentralization contribute to the long-term leadership pipeline of an enterprise?",
            "It develops managerial talent for the future by giving junior managers autonomy and experience in solving problems",
            ["It forces all junior managers to sit for annual civil service examinations", "It automatically promotes employees based strictly on biological age", "It eliminates the requirement for executive management training programs"],
            "A",
            "1. Decentralization gives junior managers opportunities to take independent decisions, building their confidence, competence, and readiness for executive leadership.\nHence, Option {{CORR}} is correct.",
            "Explains leadership development benefit of decentralization."
        )
    ]
))

# Passage 14: Staffing Process & Human Resource Management at Alpha Infotech (Unit 6)
passages_data.append((
    "Staffing",
    "Staffing Process and HRM",
    (
        "Alpha Infotech Ltd. is a fast-scaling cloud software development enterprise. After securing a multi-million-dollar AI "
        "contract, the Chief Technology Officer estimated that the firm would require 150 software engineers, 20 project managers, "
        "and 10 UX designers over the coming 6 months ('Estimating Manpower Requirements'). The HR department conducted a rigorous "
        "workforce analysis (examining current staff capabilities) and workload analysis (determining the number and type of human "
        "resources required to complete the project on time). Next, the company initiated 'Recruitment', advertising job openings on "
        "professional networking portals and visiting premier engineering campuses. Over 3,000 resumes were received. The HR team "
        "conducted rigorous preliminary screenings, technical programming tests, psychological aptitude assessments, and personal "
        "interviews to select the best 180 candidates ('Selection'). Following selection, newly appointed engineers underwent formal "
        "induction to familiarize them with company culture, values, and colleagues ('Placement and Orientation'), followed by a "
        "6-week bootcamp on advanced cloud security protocols ('Training and Development')."
    ),
    [
        (
            "What is the first step in the Staffing Process executed by Alpha Infotech?",
            "Estimating the Manpower Requirements (through Workload and Workforce Analysis)",
            ["Directing the trade union to accept overtime contracts", "Distributing annual bonus shares to prospective applicants", "Executing compulsory retirement of existing senior employees"],
            "A",
            "1. Estimating manpower requirements is the first step in staffing, involving workload analysis (staff needed) and workforce analysis (staff available).\nHence, Option {{CORR}} is correct.",
            "Identifies Estimating Manpower Requirements as first step."
        ),
        (
            "What is the specific purpose of conducting a 'Workload Analysis' in human resource planning?",
            "To determine the number and types of personnel required to perform various jobs and meet objectives",
            ["To count the existing number of personnel currently employed in the company", "To calculate the statutory annual income tax of factory workers", "To assess the financial net worth of board directors"],
            "B",
            "1. Workload analysis reveals the number and diverse types of human resources necessary to execute various organizational jobs.\nHence, Option {{CORR}} is correct.",
            "Defines Workload Analysis."
        ),
        (
            "The process of introducing the selected employee to other employees, familiarizing them with rules and policies of the organization, is known as:",
            "Orientation (Induction)",
            ["Recruitment", "Selection", "Performance Appraisal"],
            "C",
            "1. Orientation or induction is the process of introducing the new employee to the existing staff, physical workplace, and organizational culture and policies.\nHence, Option {{CORR}} is correct.",
            "Defines Orientation."
        ),
        (
            "Why is 'Recruitment' technically called a 'positive process' while 'Selection' is called a 'negative process'?",
            "Recruitment aims at attracting a large pool of applicants, whereas Selection rejects unsuitable candidates to pick the few best",
            ["Recruitment creates legal liabilities, while Selection removes them", "Recruitment involves paying cash bonuses, while Selection deducts taxes", "Recruitment is conducted by courts, while Selection is conducted by police"],
            "D",
            "1. Recruitment is positive because it stimulates candidates to apply, creating a large pool; Selection is negative because it screens out and rejects candidates.\nHence, Option {{CORR}} is correct.",
            "Contrasts positive recruitment with negative selection."
        ),
        (
            "Which step of the staffing process focuses on improving the current job-specific skills and competencies of employees for their current job?",
            "Training",
            ["Promotion", "Transfer", "Workforce Audit"],
            "A",
            "1. Training is a process of learning a sequence of programmed behavior to increase knowledge and skills for doing a specific job.\nHence, Option {{CORR}} is correct.",
            "Defines Training."
        )
    ]
))

# Passage 15: Internal vs External Sources of Recruitment (Unit 6)
passages_data.append((
    "Staffing",
    "Sources of Recruitment: Internal vs External",
    (
        "Prime Retail Ltd. operates a nationwide chain of lifestyle department stores. With the opening of ten new flagship "
        "hypermarkets, the company faced significant staffing requirements. The human resource director proposed filling all store "
        "manager vacancies through 'Internal Sources'—specifically, promoting experienced assistant managers from existing stores "
        "('Promotion') and transferring supervisors across regional zones ('Transfer'). The director argued that internal recruitment "
        "is economical, motivates existing employees to perform better for career advancement, requires no induction training, and "
        "ensures proven loyalty. However, the managing director pointed out serious limitations of relying exclusively on internal "
        "recruitment: it blocks the infusion of fresh blood and innovative talent ('Inbreeding'), creates employee lethargy when "
        "promotions become time-bound rather than merit-based, and is entirely unviable for recruiting hundreds of entry-level cashiers "
        "and visual merchandisers. Consequently, the company adopted a balanced approach, recruiting store heads internally while "
        "using Campus Recruitment, Web Portals, and Placement Agencies (External Sources) for entry-level and technical roles."
    ),
    [
        (
            "A horizontal shifting of an employee from one job or department to another without a significant change in pay, status, or responsibility is termed a:",
            "Transfer",
            ["Promotion", "Demotion", "Layoff"],
            "A",
            "1. Transfer involves shifting an employee from one job to another, one department to another, or one shift to another, without major changes in status or pay.\nHence, Option {{CORR}} is correct.",
            "Defines Transfer."
        ),
        (
            "A vertical movement of an employee to a higher post carrying greater prestige, higher pay, and increased responsibilities is termed a:",
            "Promotion",
            ["Transfer", "Orientation", "Apprenticeship"],
            "B",
            "1. Promotion involves shifting an employee to a higher position, carrying higher responsibilities, facilities, status, and pay, serving as a powerful motivator.\nHence, Option {{CORR}} is correct.",
            "Defines Promotion."
        ),
        (
            "Which serious limitation of relying exclusively on internal sources of recruitment was highlighted by the managing director?",
            "Danger of 'Inbreeding' of ideas and blocking the induction of fresh external talent and perspective",
            ["High monetary costs of advertising in national newspapers", "Prolonged onboarding delays lasting up to five years", "Immediate disqualification of company shares on stock exchanges"],
            "C",
            "1. Exclusive reliance on internal recruitment leads to inbreeding of ideas, denying the organization the benefit of fresh external talent and new perspectives.\nHence, Option {{CORR}} is correct.",
            "Identifies danger of inbreeding in internal recruitment."
        ),
        (
            "Which external source of recruitment is particularly popular for recruiting fresh engineering and management graduates directly from technical universities?",
            "Campus Recruitment",
            ["Casual Callers", "Labor Contractors", "Direct Factory-gate Recruitment"],
            "D",
            "1. Campus recruitment involves visiting educational and professional institutions like colleges and universities to recruit fresh talent.\nHence, Option {{CORR}} is correct.",
            "Identifies Campus Recruitment."
        ),
        (
            "Why is internal recruitment considered unviable for a brand-new enterprise or greenfield manufacturing plant?",
            "Because a new enterprise does not possess any existing internal workforce from which to draw candidates",
            ["Because new enterprises are legally prohibited from paying salaries", "Because internal recruitment requires approval from the United Nations", "Because all new enterprises must employ robots exclusively"],
            "A",
            "1. A new enterprise cannot use internal sources of recruitment because it has no existing employees; it must recruit entirely from external sources.\nHence, Option {{CORR}} is correct.",
            "Explains unviability of internal recruitment for new firms."
        )
    ]
))

# Passage 16: Selection Process, Employment Tests & Interviews (Unit 6)
passages_data.append((
    "Staffing",
    "Selection Process and Employment Tests",
    (
        "BlueChip Analytics Ltd. is hiring 20 Senior Data Scientists. To ensure that only exceptional analytical talent is "
        "selected, the recruitment panel established a multi-stage Selection Process. First, the preliminary screening eliminated "
        "unqualified applicants. Next, short-listed candidates underwent a series of scientific Employment Tests: (1) an 'Intelligence "
        "Test' measuring an individual's IQ and learning ability; (2) an 'Aptitude Test' measuring their potential for acquiring "
        "new algorithmic coding skills; (3) a 'Trade Test' (Proficiency Test) assessing their actual existing programming mastery in "
        "Python and SQL; and (4) a 'Personality Test' evaluating emotional stability, maturity, and interpersonal teamwork traits. "
        "Candidates clearing the testing battery were invited to a rigorous 'Employment Interview' conducted by a panel of Chief Data "
        "Scientists to evaluate communication skills and problem-solving composure. Following reference and background checks, medical "
        "examinations were conducted before extending formal Job Offers and issuing Employment Contracts."
    ),
    [
        (
            "Which employment test measures an individual's capacity to learn new skills and indicates their future development potential?",
            "Aptitude Test",
            ["Trade Test", "Personality Test", "Physical Endurance Test"],
            "A",
            "1. An Aptitude Test measures an individual's potential for learning new skills and their capacity for future training.\nHence, Option {{CORR}} is correct.",
            "Defines Aptitude Test."
        ),
        (
            "How does a 'Trade Test' (Proficiency Test) differ fundamentally from an 'Aptitude Test'?",
            "A Trade Test measures existing practical skills and professional knowledge already possessed, whereas an Aptitude Test measures potential to learn",
            ["A Trade Test measures psychological IQ, while an Aptitude Test measures physical height", "A Trade Test is written by hand, while an Aptitude Test is purely verbal", "A Trade Test is conducted only after retirement"],
            "B",
            "1. A Trade Test measures the actual current technical skills and professional proficiency possessed by the candidate, unlike an aptitude test which measures potential.\nHence, Option {{CORR}} is correct.",
            "Contrasts Trade Test with Aptitude Test."
        ),
        (
            "Which test is designed to measure an applicant's emotional balance, maturity, temperament, and value systems?",
            "Personality Test",
            ["Intelligence Test", "Dexterity Test", "Graphic Design Test"],
            "C",
            "1. Personality tests provide clues to a person's emotions, reactions, maturity, and value systems, which are critical for assessing overall team fit.\nHence, Option {{CORR}} is correct.",
            "Defines Personality Test."
        ),
        (
            "What is the primary function of checking 'References and Background' during the employee selection process?",
            "To verify the authenticity of credentials, past employment track record, and character from independent professional referees",
            ["To determine the candidate's personal astrological horoscope", "To force the candidate's former employer to pay compensation", "To inspect the candidate's ancestral agricultural land titles"],
            "D",
            "1. Reference checks verify the candidate's background, past employment record, character, and integrity through referees named in the application.\nHence, Option {{CORR}} is correct.",
            "Explains role of Reference and Background checks."
        ),
        (
            "What formal document is executed after an applicant accepts the Job Offer, specifying salary, working hours, leave rules, and job responsibilities?",
            "Contract of Employment",
            ["Preliminary Screening Slip", "Job Rejection Notice", "Subordinated Debenture Warrant"],
            "A",
            "1. Once the job offer is accepted, a formal Contract of Employment is executed detailing job title, duties, pay scale, leave rules, disciplinary procedures, etc.\nHence, Option {{CORR}} is correct.",
            "Identifies Contract of Employment."
        )
    ]
))

# Passage 17: Motivation, Maslow's Hierarchy & Incentives at Radiant Tech (Unit 7)
passages_data.append((
    "Directing",
    "Motivation and Incentives (Maslow's Hierarchy)",
    (
        "Radiant Technologies Ltd. is a telecommunications hardware provider. The engineering division was experiencing low "
        "morale and high employee attrition. The HR director analyzed the workforce needs through the lens of Abraham Maslow's Need "
        "Hierarchy. She observed that junior assembly line technicians were struggling with inadequate wages and unstable contract "
        "terms, leaving their basic physiological and safety/security needs unsatisfied. The company revised their base pay and "
        "provided provident fund benefits and medical insurance ('Financial Incentives'). For middle-tier software architects whose "
        "basic and social needs were satisfied, monetary hikes produced diminishing motivational returns. To satisfy their 'Esteem "
        "Needs' and 'Self-Actualization Needs', Radiant introduced powerful Non-Financial Incentives: Employee Recognition Programs "
        "honoring innovators at annual galas, job enrichment offering autonomy over complex AI projects, and fast-track career "
        "advancement opportunities. Worker productivity rebounded by 45%, proving that human motivation requires addressing "
        "hierarchical needs sequentially."
    ),
    [
        (
            "According to Abraham Maslow's Need Hierarchy Theory, which needs form the foundational base of human motivation?",
            "Basic Physiological Needs (Food, shelter, clothing, basic survival)",
            ["Self-Actualization Needs", "Esteem Needs", "Social / Affiliation Needs"],
            "A",
            "1. Maslow's hierarchy begins with basic physiological needs at the base, followed by safety, social, esteem, and self-actualization needs.\nHence, Option {{CORR}} is correct.",
            "Identifies Basic Physiological Needs as base of hierarchy."
        ),
        (
            "Providing job security, provident fund contributions, and health insurance plans directly satisfies which level of human needs in Maslow's framework?",
            "Safety and Security Needs",
            ["Self-Actualization Needs", "Prestige and Esteem Needs", "Aesthetic Needs"],
            "B",
            "1. Safety and security needs provide security and protection from physical and emotional harm, economic security, and stability of employment.\nHence, Option {{CORR}} is correct.",
            "Identifies Safety and Security Needs."
        ),
        (
            "Offering autonomy on complex projects, challenging job assignments, and opportunities for personal growth caters to which peak need?",
            "Self-Actualization Needs",
            ["Physiological Needs", "Basic Subsistence Needs", "Financial Liquidity Needs"],
            "C",
            "1. Self-actualization represents the highest level of need in the hierarchy, referring to the drive to become what one is capable of becoming and achieving growth.\nHence, Option {{CORR}} is correct.",
            "Identifies Self-Actualization Needs."
        ),
        (
            "Which of the following is classified as a 'Non-Financial Incentive' in organizational management?",
            "Job Enrichment, Status, and Employee Recognition Programmes",
            ["Productivity-linked Cash Wage Bonus", "Stock Option (ESOP) at discount", "Retirement Gratuity Payout"],
            "D",
            "1. Non-financial incentives focus on psychological and emotional satisfaction such as status, job enrichment, career advancement, and recognition.\nHence, Option {{CORR}} is correct.",
            "Identifies Non-Financial Incentives."
        ),
        (
            "A core behavioral assumption underlying Maslow's motivation theory is that:",
            "A satisfied need no longer motivates behavior; only the next higher-level need acts as a motivator",
            ["Human needs are completely random and have zero sequential order", "Monetary bonuses motivate all humans identically across all life stages", "Workers never care about social or emotional recognition"],
            "A",
            "1. A fundamental premise of Maslow's theory is that once a lower need is satisfied, it ceases to be a motivator, and the individual moves to the next higher level.\nHence, Option {{CORR}} is correct.",
            "States fundamental assumption of Maslow's theory."
        )
    ]
))

# Passage 18: Leadership Styles & Communication Barriers at Dynamic Motors (Unit 7)
passages_data.append((
    "Directing",
    "Leadership Styles and Communication Barriers",
    (
        "Dynamic Motors Ltd. operates two heavy truck assembly plants. In Plant A, the general manager, Mr. Khanna, practices "
        "an 'Autocratic Leadership Style': he issues centralized unilateral commands, permits zero subordinate consultation, expects "
        "blind obedience, and centralizes all decision-making power. Consequently, worker resentment is high, initiative is crushed, "
        "and turnover is severe. In Plant B, the manager, Ms. Ananya, adopts a 'Democratic (Participative) Leadership Style': she "
        "regularly consults shopfloor supervisors before finalizing production targets, respects constructive feedback, and encourages "
        "collective decision-making, generating high team morale. However, both plants suffered from severe 'Communication Barriers'. "
        "In the design department, engineers used dense technical jargon that shopfloor mechanics could not understand ('Semantic "
        "Barrier'). Across organizational levels, rigid bureaucratic filtering and status consciousness caused workers to withhold "
        "unfavorable feedback from senior managers ('Organizational and Psychological Barriers')."
    ),
    [
        (
            "Which leadership style is characterized by a leader who centralizes decision-making, gives orders, and expects subordinates to perform without consultation?",
            "Autocratic (Authoritarian) Leadership Style",
            ["Democratic Leadership Style", "Laissez-Faire (Free-rein) Leadership Style", "Paternalistic Charismatic Style"],
            "A",
            "1. An autocratic leader centralizes authority, gives orders, and insists that decisions be accepted without question or discussion.\nHence, Option {{CORR}} is correct.",
            "Defines Autocratic Leadership Style."
        ),
        (
            "What is a defining feature of the 'Democratic (Participative) Leadership Style' practiced by Ms. Ananya in Plant B?",
            "The leader consults subordinates, encourages participation, and makes decisions with mutual team consensus",
            ["The leader completely abdicates all responsibility and leaves workers unsupervised", "The leader enforces decisions using physical disciplinary sanctions", "The leader reports daily to shopfloor trade unions"],
            "B",
            "1. A democratic leader develops action plans and makes decisions in consultation with subordinates, encouraging participation and teamwork.\nHence, Option {{CORR}} is correct.",
            "Defines Democratic Leadership Style."
        ),
        (
            "Communication breakdowns arising from the use of technical jargon, faulty translations, or ambiguous symbols belong to which barrier category?",
            "Semantic Barriers",
            ["Psychological Barriers", "Personal Barriers", "Physical Environmental Barriers"],
            "C",
            "1. Semantic barriers are concerned with the problems and obstructions in the process of encoding and decoding messages into words, symbols, or jargon.\nHence, Option {{CORR}} is correct.",
            "Identifies Semantic Barriers."
        ),
        (
            "When a subordinate conceals vital operational failures from top managers due to fear of authority and status consciousness, it illustrates an:",
            "Organizational / Personal Barrier to Communication",
            ["Open Democratic Channel", "Effective Grapevine Feedback", "Active Listening Mechanism"],
            "D",
            "1. Fear of challenge to authority, status consciousness, and lack of confidence in subordinates are personal and organizational barriers to communication.\nHence, Option {{CORR}} is correct.",
            "Identifies organizational/personal barrier."
        ),
        (
            "A leadership style where the leader gives complete freedom to subordinates to establish their own goals and resolve problems independently is termed:",
            "Laissez-Faire (Free-Rein) Leadership Style",
            ["Autocratic Leadership Style", "Democratic Leadership Style", "Bureaucratic Command Style"],
            "A",
            "1. In a Laissez-Faire (Free-rein) leadership style, the leader gives full freedom to subordinates, serving merely as a facilitator without direct interference.\nHence, Option {{CORR}} is correct.",
            "Defines Laissez-Faire Leadership."
        )
    ]
))

# Passage 19: Controlling Process & Setting Standards at Heritage Textiles (Unit 8)
passages_data.append((
    "Controlling",
    "Controlling Process",
    (
        "Heritage Textiles Ltd. manufactures premium handloom silk sarees for export. To ensure flawless quality and contain "
        "mounting fabric rejections, the newly appointed chief operations officer instituted a formal Controlling Process. "
        "First, precise performance benchmarks were established: each master weaver was expected to produce 25 meters of defect-free "
        "silk fabric per week with a maximum allowable yarn defect rate of 1.5% ('Setting Performance Standards'). Second, actual "
        "output was recorded daily using automated electronic loom sensors and weekly fabric batch audits ('Measurement of Actual "
        "Performance'). Third, the actual weekly production was compared against the standard: Weaver Raman produced 26 meters with "
        "1.2% defects (positive performance), while Weaver Shyam produced only 18 meters with 4.8% defects ('Comparing Actual "
        "Performance with Standards'). Fourth, the engineering supervisor analyzed the root cause of Shyam's deviation, discovering "
        "worn-out tension spools on his loom ('Analyzing Deviations'). Finally, the maintenance team replaced the spools and arranged "
        "refresher training for Shyam ('Taking Corrective Action')."
    ),
    [
        (
            "What is the first step in the Controlling Process undertaken by Heritage Textiles?",
            "Setting Performance Standards",
            ["Measuring Actual Performance", "Analyzing Deviations", "Taking Corrective Action"],
            "A",
            "1. The first step in the controlling process is setting performance standards against which actual performance can be evaluated.\nHence, Option {{CORR}} is correct.",
            "Identifies Setting Performance Standards as first step."
        ),
        (
            "Why is it essential that performance standards be set in quantitative terms whenever possible?",
            "Because quantitative benchmarks make objective measurement and precise comparison with actual results straightforward",
            ["Because quantitative standards prevent trade unions from filing civil lawsuits", "Because labor laws forbid qualitative assessments under all circumstances", "Because commercial banks mandate numerical standards for deposit accounts"],
            "B",
            "1. Whenever possible, standards should be stated in quantitative terms so that actual performance can be easily and objectively compared against them.\nHence, Option {{CORR}} is correct.",
            "Explains rationale for quantitative standards."
        ),
        (
            "What is the core purpose of the third step in the controlling process—'Comparing Actual Performance with Standards'?",
            "To detect deviations between standard and actual results and evaluate the magnitude of variance",
            ["To immediately dismiss any employee whose performance fluctuates by 0.1%", "To liquidate factory plant machinery to recover variable costs", "To draft new corporate Articles of Association"],
            "C",
            "1. Comparison of actual performance with planned standards reveals whether there is a deviation and the extent of such deviation.\nHence, Option {{CORR}} is correct.",
            "Explains purpose of comparing performance with standards."
        ),
        (
            "Replacing the worn-out tension spools on Shyam's loom and retraining the weaver represents which final controlling step?",
            "Taking Corrective Action",
            ["Setting New Performance Targets", "Developing Organizational Premises", "Conducting External Audit"],
            "D",
            "1. The final step in controlling is taking corrective action to remedy identified causes of deviations and prevent their recurrence in future.\nHence, Option {{CORR}} is correct.",
            "Identifies Taking Corrective Action."
        ),
        (
            "Planning and Controlling are described as two inseparable twins of management because:",
            "Planning provides the benchmarks against which Controlling measures, while Controlling reveals how far Plans were realized",
            ["Planning is executed by workers, while Controlling is executed by government regulators", "Planning applies only to marketing, while Controlling applies only to accounting", "Both functions are legally abolished under modern corporate governance"],
            "A",
            "1. Planning is prescriptive (sets standards) and forward-looking; controlling is evaluative and brings the cycle back to planning, making them mutually interdependent.\nHence, Option {{CORR}} is correct.",
            "Explains inseparable relationship between Planning and Controlling."
        )
    ]
))

# Passage 20: Critical Point Control & Management by Exception at Veloce Bicycles (Unit 8)
passages_data.append((
    "Controlling",
    "Critical Point Control and Management by Exception",
    (
        "Veloce Bicycles Ltd. manufactures high-performance mountain bicycles producing 50,000 units monthly. The managing director "
        "observed that senior production executives were constantly exhausted, attempting to micromanage every minuscule variation "
        "across thousands of tiny parts—from minor Rs. 2 fluctuations in bicycle chain lubricator costs to minor paint shade variations. "
        "To restore managerial focus, the director instituted two foundational principles of deviation analysis: 'Critical Point "
        "Control (CPC)' and 'Management by Exception (MBE)'. Under Critical Point Control, management identified Key Result Areas (KRAs) "
        "critical to enterprise profitability—namely, aluminum frame structural integrity, carbon fiber fork procurement costs, "
        "and final braking safety. Variations in non-critical stationery or minor packaging costs were delegated to junior clerks. "
        "Under Management by Exception, a tolerance band of ±3% was fixed for raw material expenses; only deviations exceeding this "
        "acceptable limit were brought to the notice of senior management, recognizing the classic adage: 'An attempt to control "
        "everything results in controlling nothing'."
    ),
    [
        (
            "Focusing managerial control on Key Result Areas (KRAs) critical to the overall success of the enterprise is known as:",
            "Critical Point Control (CPC)",
            ["Management by Exception", "Total Centralized Surveillance", "Span of Bureaucratic Oversight"],
            "A",
            "1. Critical Point Control focuses on Key Result Areas (KRAs) that are critical to the performance of an organization, as deviations in KRAs cause major damage.\nHence, Option {{CORR}} is correct.",
            "Defines Critical Point Control."
        ),
        (
            "The principle of 'Management by Exception' (MBE) dictates that:",
            "Only significant, exceptional deviations going beyond permissible tolerance limits should be brought to top management's attention",
            ["Managers should report every single microscopic irregularity directly to the Board of Directors", "Exceptional managers should receive 100% equity dividends every month", "Subordinates are exempted from all factory safety and quality rules"],
            "B",
            "1. Management by Exception holds that an attempt to control everything results in controlling nothing; only significant deviations exceeding tolerance limits should be reported.\nHence, Option {{CORR}} is correct.",
            "Defines Management by Exception."
        ),
        (
            "What is the management philosophy behind the famous maxim: 'An attempt to control everything results in controlling nothing'?",
            "Spreading attention across trivial details dilutes focus from critical strategic areas, wasting scarce executive time and energy",
            ["Organizations operate best when there are zero rules, standards, or inspections", "Managers should let laborers run the factory without any managerial guidance", "All control functions should be outsourced to external municipal auditors"],
            "C",
            "1. Trying to micromanage every trivial operational detail exhausts executive time and distracts management from addressing critical strategic problems.\nHence, Option {{CORR}} is correct.",
            "Explains 'controlling everything results in controlling nothing'."
        ),
        (
            "If postal postage expenses increase by 15% (monetary impact Rs. 300), while manufacturing labor costs rise by 5% (monetary impact Rs. 5,00,000), which deviation requires top management's immediate intervention under Critical Point Control?",
            "The 5% rise in labor cost (monetary impact Rs. 5,00,000), because it represents a Key Result Area with massive financial impact",
            ["The 15% increase in postal postage because 15% is numerically larger than 5%", "Neither deviation requires any attention", "Both deviations should be referred to the Central Government"],
            "D",
            "1. Under Critical Point Control, labor cost is a Key Result Area with high financial significance, requiring immediate action over minor postage variances.\nHence, Option {{CORR}} is correct.",
            "Applies Critical Point Control to cost variance scenario."
        ),
        (
            "What is the primary operational advantage of establishing an 'Acceptable Range of Deviations' under Management by Exception?",
            "It empowers operational supervisors to manage routine variances locally, preserving top management time for exceptional crises",
            ["It legalizes the production of 100% defective merchandise without penalty", "It guarantees that company stock prices will never drop on secondary exchanges", "It eliminates the requirement for keeping financial accounting ledgers"],
            "A",
            "1. Defining tolerance ranges allows routine operational deviations to be resolved at lower levels, saving top management's time for major strategic issues.\nHence, Option {{CORR}} is correct.",
            "Identifies advantage of acceptable range of deviations."
        )
    ]
))

# =================================================================================================
# PART B: BUSINESS FINANCE AND MARKETING (Passages 21 to 40)
# =================================================================================================

# Import Part B Passages (Passages 21 to 40)
from scripts.bst_generators.part2_passages import part2_passages_data
assert len(part2_passages_data) == 20, f"Expected 20 part2 passages, got {len(part2_passages_data)}"
passages_data.extend(part2_passages_data)

print(f"Total passages aggregated: {len(passages_data)}")
assert len(passages_data) == 40, f"Expected 40 passages, got {len(passages_data)}"

# Now expand all 40 passages into 5 questions each = 200 questions
for p_idx, (p_ch, p_top, p_text, q_list) in enumerate(passages_data):
    pass_header = f"Read the following passage carefully and answer the questions that follow:\n\n{p_text}\n\n"
    assert len(q_list) == 5, f"Passage {p_idx+1} does not have 5 questions"
    for q_stem, corr_text, wrong_texts, target_id, sol_template, mist_correct in q_list:
        full_stem = pass_header + q_stem
        opts, corr, sol = rotate_options(corr_text, wrong_texts, target_id, sol_template, mist_correct)
        add_q(make_question(p_ch, p_top, full_stem, opts, corr, sol))

print(f"Total Passage questions generated: {len(questions)}")
assert len(questions) == 200, f"Expected 200 questions, got {len(questions)}"

out_path = "mock/bst_units/passages.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved {len(questions)} passage questions to {out_path}!")
