import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text
)

CHAPTER = "Introduction to Microeconomics"
questions = []
seen = set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

# -------------------------------------------------------------------------------------------------
# 40 Unique Questions for Unit 1 (2 per mock * 20 mocks)
# -------------------------------------------------------------------------------------------------

# Q1-Q10: Central Problems & Economic Systems
# 1. Central problem: What to produce
opts, corr, sol = rotate_options(
    "Allocation of scarce resources between consumer goods and capital goods",
    [
        "Choice between labour-intensive and capital-intensive production techniques",
        "Distribution of national product among factors of production",
        "Ensuring full employment of available natural resources"
    ],
    "A",
    "1. The central problem of 'What to produce' involves deciding which goods and services to produce and in what quantities, such as consumer vs capital goods.\n2. Choice of technique corresponds to 'How to produce', and distribution corresponds to 'For whom to produce'.\nHence, Option {{CORR}} is correct.",
    "Correctly identifies the allocation problem between consumer and capital goods."
)
add_q(make_question(CHAPTER, "Central Problems of an Economy", "Which of the following aspects fundamentally defines the central economic problem of 'What to produce'?", opts, corr, sol))

# 2. Central problem: How to produce
opts, corr, sol = rotate_options(
    "The selection between labour-intensive and capital-intensive techniques of production",
    [
        "The decision regarding whether to produce military goods or civilian goods",
        "The distribution of income between wages, rent, interest, and profits",
        "The determination of the equilibrium price level in commodity markets"
    ],
    "B",
    "1. 'How to produce' refers to the technique of production chosen—specifically whether to use more labour (labour-intensive) or more capital/machinery (capital-intensive) based on factor availability and costs.\nHence, Option {{CORR}} is correct.",
    "Accurately relates 'How to produce' to the choice of production technique."
)
add_q(make_question(CHAPTER, "Central Problems of an Economy", "The central problem of 'How to produce' is primarily concerned with:", opts, corr, sol))

# 3. Central problem: For whom to produce
opts, corr, sol = rotate_options(
    "How the total national product is distributed among the different sections of society",
    [
        "Determining whether to use modern imported machinery or local labour",
        "Deciding the total quantity of luxury cars versus public buses to manufacture",
        "Measuring the marginal rate of technical substitution in agriculture"
    ],
    "C",
    "1. 'For whom to produce' concerns functional and personal distribution of income/output—how the produced goods and services are shared among various households and factor owners.\nHence, Option {{CORR}} is correct.",
    "Correctly defines functional and personal distribution."
)
add_q(make_question(CHAPTER, "Central Problems of an Economy", "Which economic issue corresponds directly to the problem of 'For whom to produce'?", opts, corr, sol))

# 4. Match central problems with decisions
add_q(make_match_question(
    CHAPTER, "Central Problems Matrix",
    "Match the central economic problems in List I with their corresponding core decisions in List II:",
    [
        ("A", "What to produce"),
        ("B", "How to produce"),
        ("C", "For whom to produce"),
        ("D", "Growth of resources")
    ],
    [
        ("I", "Distribution of output among society members"),
        ("II", "Choice of goods and quantities"),
        ("III", "Expansion of productive capacity over time"),
        ("IV", "Selection of production technique")
    ],
    "A-(II), B-(IV), C-(I), D-(III)",
    [
        "A-(IV), B-(II), C-(I), D-(III)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(I), B-(IV), C-(II), D-(III)"
    ],
    "A",
    "1. What to produce -> Choice of goods and quantities (II).\n2. How to produce -> Selection of production technique (IV).\n3. For whom to produce -> Distribution of output among society members (I).\n4. Growth of resources -> Expansion of productive capacity over time (III).\nHence, Option A is correct."
))

# 5. Centrally Planned vs Market Economy: Mechanism
opts, corr, sol = rotate_options(
    "Price mechanism guided by the forces of demand and supply",
    [
        "Direct central directives issued by the planning commission",
        "Customary rules governed by village panchayats",
        "Equal distribution mandated by legislative decrees"
    ],
    "D",
    "1. In a pure market (capitalist) economy, all central problems are resolved through the price mechanism (the 'invisible hand') driven by consumer preferences (demand) and producer profit motives (supply).\nHence, Option {{CORR}} is correct.",
    "Recognizes the price mechanism as the core allocative institution in market economies."
)
add_q(make_question(CHAPTER, "Economic Systems", "In a capitalist market economy, the fundamental economic problems are solved primarily through:", opts, corr, sol))

# 6. Centrally planned economy feature
opts, corr, sol = rotate_options(
    "A central planning authority aiming to maximize social welfare",
    [
        "Private ownership of all factories guided purely by individual profit",
        "Decentralized price signals in perfectly competitive commodity exchanges",
        "Zero government intervention in market price determination"
    ],
    "B",
    "1. In a centrally planned economy (socialist system), major economic decisions regarding production, investment, and distribution are taken by a central authority to maximize collective social welfare rather than private profit.\nHence, Option {{CORR}} is correct.",
    "Identifies social welfare and central planning authority."
)
add_q(make_question(CHAPTER, "Economic Systems", "Which institution is central to resolving economic choices in a socialist or centrally planned economy?", opts, corr, sol))

# 7. Mixed economy: Indian context
opts, corr, sol = rotate_options(
    "Both the private market mechanism and government planning co-exist",
    [
        "All productive assets are exclusively nationalized without private property",
        "Prices are determined entirely by unfettered market forces without subsidies",
        "Foreign trade is completely prohibited to preserve autarky"
    ],
    "A",
    "1. A mixed economy like India combines the market mechanism (private sector driven by profit) with public sector participation and government regulation to ensure social justice.\nHence, Option {{CORR}} is correct.",
    "Highlights the dual co-existence of private enterprise and public planning."
)
add_q(make_question(CHAPTER, "Economic Systems", "Which feature characterizes a mixed economic system like India?", opts, corr, sol))

# 8. Sequence of resource allocation steps
add_q(make_sequence_question(
    CHAPTER, "Resource Allocation Process",
    "Arrange the following logical steps an economy takes when addressing resource allocation:",
    [
        "Identification of scarce resources and technological possibilities",
        "Decision on the basket of goods and services to be produced",
        "Selection of the least-cost, efficient technique of production",
        "Distribution of factor incomes and final commodities among households"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (D), (C)",
        "(A), (C), (B), (D)",
        "(C), (B), (A), (D)"
    ],
    "A",
    "1. The logical sequence begins with assessing available endowments and tech frontier (A), deciding what basket to produce (B), choosing the optimal technique (C), and finally distributing the output and factor payments (D).\nHence, Option A is correct."
))

# 9. Statement I & II: Positive vs Normative Economics
add_q(make_statement_question(
    CHAPTER, "Positive vs Normative Economics",
    "Positive economics deals with 'what is' and analyses verifiable cause-and-effect relationships.",
    "Normative economics involves value judgments and discusses 'what ought to be' in an economy.",
    "A",
    "1. Statement I is true: Positive economics deals with objective facts, empirical data, and testable hypotheses.\n2. Statement II is true: Normative economics prescribes ethical or welfare ideals ('ought to be') which cannot be empirically verified.\nHence, both statements are true (Option A)."
))

# 10. Assertion & Reason: Normative economics
add_q(make_assertion_question(
    CHAPTER, "Positive vs Normative Economics",
    "The statement 'The government should provide free healthcare to all low-income families' belongs to normative economics.",
    "Normative statements express subjective value judgments and ethical recommendations rather than verifiable facts.",
    "A",
    "1. Assertion is true: The statement uses 'should' and prescribes an ethical policy choice.\n2. Reason is true: Normative statements are grounded in ethical value judgments.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# Q11-Q20: Production Possibility Frontier (PPF/PPC)
# 11. PPF definition
opts, corr, sol = rotate_options(
    "The maximum alternative combinations of two goods an economy can produce with given resources and technology",
    [
        "The minimum cost of producing consumer goods under constant returns to scale",
        "The total monetary value of all goods and services demanded by consumers",
        "The distribution curve showing income inequality across different households"
    ],
    "C",
    "1. The Production Possibility Frontier (PPF) graphically represents all possible combinations of two commodities that can be produced using the available resources and state of technology efficiently.\nHence, Option {{CORR}} is correct.",
    "Identifies the definition of PPF."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "What does the Production Possibility Frontier (PPF) represent?", opts, corr, sol))

# 12. Slope of PPF
opts, corr, sol = rotate_options(
    "Marginal Opportunity Cost (Marginal Rate of Transformation)",
    [
        "Marginal Rate of Substitution between two consumer goods",
        "Ratio of the prices of the two commodities",
        "Average product of the variable factor"
    ],
    "B",
    "1. The slope of the PPF at any point is measured by the Marginal Rate of Transformation (MRT) or Marginal Opportunity Cost (MOC), which is $\\Delta Y / \\Delta X$.\nHence, Option {{CORR}} is correct.",
    "Identifies MRT as the slope of PPF."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "The slope of the Production Possibility Frontier at any given point is given by the:", opts, corr, sol))

# 13. Reason for concave shape of PPF
opts, corr, sol = rotate_options(
    "Increasing Marginal Opportunity Cost as more resources are transferred from one good to another",
    [
        "Decreasing marginal rate of technical substitution between capital and labour",
        "Constant returns to scale across all productive enterprises",
        "Consumer preference for diverse baskets of goods and services"
    ],
    "A",
    "1. The PPF is concave to the origin because resources are not equally efficient in producing all goods. As more units of good X are produced, increasingly less specialized resources are transferred from good Y, raising the Marginal Opportunity Cost ($\Delta Y / \Delta X$).\nHence, Option {{CORR}} is correct.",
    "Identifies increasing marginal opportunity cost."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "Why is the Production Possibility Frontier typically concave to the origin?", opts, corr, sol))

# 14. Calculation of MOC / MRT
opts, corr, sol = rotate_options(
    "2 units of Good Y per unit of Good X",
    [
        "0.5 units of Good Y per unit of Good X",
        "5 units of Good Y per unit of Good X",
        "1 unit of Good Y per unit of Good X"
    ],
    "C",
    "1. Marginal Opportunity Cost (MRT) = $\\frac{\\Delta \\text{Loss of Good Y}}{\\Delta \\text{Gain of Good X}}$.\n2. Here, $\\Delta Y = 100 - 90 = 10$ units of Good Y surrendered.\n3. $\\Delta X = 15 - 10 = 5$ units of Good X gained.\n4. $\\text{MRT} = \\frac{10}{5} = 2$ units of Y per unit of X.\nHence, Option {{CORR}} is correct.",
    "Applies the delta Y / delta X formula correctly."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "An economy produces two goods, X and Y. Moving from combination A to B, production of Good X increases from 10 to 15 units while production of Good Y falls from 100 to 90 units. What is the Marginal Opportunity Cost of Good X?", opts, corr, sol))

# 15. Shift of PPF rightward
opts, corr, sol = rotate_options(
    "An increase in the total labour force or technological advancement in both goods",
    [
        "Widespread destruction of capital assets due to a natural calamity",
        "An increase in unemployment while technological capacity remains unchanged",
        "A change in consumer preference towards luxury goods"
    ],
    "D",
    "1. A rightward (outward) shift of the entire PPF occurs when there is an increase in resources (e.g. immigration, capital accumulation) or overall technological advancement for both goods.\nHence, Option {{CORR}} is correct.",
    "Identifies increase in productive capacity/resources."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "Which of the following events causes a parallel rightward shift of the entire PPF?", opts, corr, sol))

# 16. Rotation of PPF
opts, corr, sol = rotate_options(
    "The PPF rotates outwards along the Good X axis while the intercept on Good Y axis remains fixed",
    [
        "The entire PPF shifts parallel inward toward the origin",
        "The PPF rotates inwards along the Good Y axis only",
        "The PPF becomes a straight downward-sloping line"
    ],
    "A",
    "1. If technological progress occurs exclusively in the production of Good X, maximum output of X increases while maximum output of Y remains unchanged. Thus, the PPF rotates outwards on the X-axis alone.\nHence, Option {{CORR}} is correct.",
    "Recognizes single-axis rotation."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "Suppose technological advancement takes place solely in the production of Good X, with no change in Good Y technology or overall resources. How will the PPF respond?", opts, corr, sol))

# 17. Point inside the PPF
opts, corr, sol = rotate_options(
    "Underutilization or inefficient allocation of existing productive resources",
    [
        "An unattainable production level given current technology",
        "Over-utilization and exhaustion of natural endowments",
        "Technological breakthrough occurring across all economic sectors"
    ],
    "B",
    "1. Any point inside the PPF reflects inefficiency or underemployment of resources—the economy is capable of producing more of both goods without extra resources.\n2. Points on the curve are efficient; points outside are unattainable with existing resources.\nHence, Option {{CORR}} is correct.",
    "Identifies inefficient/underutilized resources."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "A point lying strictly inside the Production Possibility Frontier indicates:", opts, corr, sol))

# 18. Match PPF locations with economic status
add_q(make_match_question(
    CHAPTER, "PPF Geometry Matrix",
    "Match the positions of production points relative to the PPF in List I with their economic interpretation in List II:",
    [
        ("A", "Point lying directly on the PPF"),
        ("B", "Point lying inside the PPF"),
        ("C", "Point lying outside the PPF"),
        ("D", "Linear downward-sloping PPF")
    ],
    [
        ("I", "Underutilization or unemployment of resources"),
        ("II", "Full and efficient utilization of resources"),
        ("III", "Constant marginal opportunity cost"),
        ("IV", "Unattainable with given resources and technology")
    ],
    "A-(II), B-(I), C-(IV), D-(III)",
    [
        "A-(I), B-(II), C-(IV), D-(III)",
        "A-(II), B-(IV), C-(I), D-(III)",
        "A-(IV), B-(I), C-(II), D-(III)"
    ],
    "A",
    "1. On the curve -> Full and efficient utilization (II).\n2. Inside -> Underutilization / unemployment (I).\n3. Outside -> Unattainable (IV).\n4. Straight line -> Constant MOC (III).\nHence, Option A is correct."
))

# 19. Linear PPF condition
opts, corr, sol = rotate_options(
    "Constant Marginal Opportunity Cost between the two goods",
    [
        "Increasing returns to scale across both industries",
        "Zero opportunity cost of resource transfers",
        "Monopolistic market conditions in factor allocation"
    ],
    "C",
    "1. The PPF is a straight downward-sloping line if and only if the Marginal Opportunity Cost (MRT) is constant, meaning resources are perfectly substitutable at a fixed rate between the two goods.\nHence, Option {{CORR}} is correct.",
    "Links straight-line PPF to constant MOC."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "Under what theoretical condition would an economy's PPF be a straight downward-sloping line?", opts, corr, sol))

# 20. Opportunity Cost concept
opts, corr, sol = rotate_options(
    "The value of the next best alternative forgone when a choice is made",
    [
        "The total monetary expense recorded in accounting books of the firm",
        "The difference between total fixed cost and total variable cost",
        "The minimum price at which a producer covers average variable cost"
    ],
    "D",
    "1. Opportunity cost is defined in economics as the value or benefit of the next best alternative foregone when a specific decision or resource allocation is undertaken.\nHence, Option {{CORR}} is correct.",
    "Provides the classic textbook definition of opportunity cost."
)
add_q(make_question(CHAPTER, "Opportunity Cost", "What is the economic definition of Opportunity Cost?", opts, corr, sol))

# Q21-Q30: Opportunity Cost Calculations, Micro vs Macro, Positive/Normative
# 21. Numerical opportunity cost of employment
opts, corr, sol = rotate_options(
    "Rs. 45,000 per month",
    [
        "Rs. 50,000 per month",
        "Rs. 35,000 per month",
        "Rs. 1,30,000 per month"
    ],
    "B",
    "1. An individual has 3 job offers: Job A at Rs. 50,000, Job B at Rs. 45,000, and Job C at Rs. 35,000.\n2. He accepts Job A (Rs. 50,000).\n3. Opportunity cost is the value of the NEXT BEST alternative forgone, which is Job B (Rs. 45,000), not the sum of alternatives.\nHence, Option {{CORR}} is correct.",
    "Correctly selects the single highest forgone alternative."
)
add_q(make_question(CHAPTER, "Opportunity Cost", "Rajesh receives three alternative job offers: Job X offering Rs. 50,000 per month, Job Y offering Rs. 45,000 per month, and Job Z offering Rs. 35,000 per month. If Rajesh accepts Job X, what is his monthly opportunity cost?", opts, corr, sol))

# 22. Numerical opportunity cost in agriculture
opts, corr, sol = rotate_options(
    "120 quintals of wheat",
    [
        "150 quintals of rice",
        "30 quintals of wheat",
        "270 quintals of foodgrains"
    ],
    "A",
    "1. A farmer on a fixed plot of land can produce either 150 quintals of rice or 120 quintals of wheat.\n2. If he decides to produce 150 quintals of rice, the opportunity cost is the next best alternative forgone, which is 120 quintals of wheat.\nHence, Option {{CORR}} is correct.",
    "Calculates forgone commodity output."
)
add_q(make_question(CHAPTER, "Opportunity Cost", "A farmer possesses a plot of land where he can produce either 150 quintals of rice or 120 quintals of wheat. If he decides to cultivate rice, what is the opportunity cost of producing rice on this land?", opts, corr, sol))

# 23. Micro vs Macro distinction
opts, corr, sol = rotate_options(
    "Microeconomics studies individual agents while Macroeconomics studies aggregate economic aggregates",
    [
        "Microeconomics applies only to developing economies whereas Macroeconomics applies to advanced nations",
        "Microeconomics studies government budgets while Macroeconomics studies household consumption",
        "Microeconomics assumes unstable markets while Macroeconomics assumes perfectly competitive markets"
    ],
    "C",
    "1. Microeconomics investigates the behavior of individual decision-making units (households, firms, pricing in a single market).\n2. Macroeconomics investigates aggregates for the entire economy (national income, general price level, total employment).\nHence, Option {{CORR}} is correct.",
    "Contrasts individual agents with macroeconomic aggregates."
)
add_q(make_question(CHAPTER, "Microeconomics vs Macroeconomics", "Which of the following statements correctly distinguishes Microeconomics from Macroeconomics?", opts, corr, sol))

# 24. Microeconomic variable identification
opts, corr, sol = rotate_options(
    "Price determination of cotton textiles in Surat",
    [
        "Aggregate price level (Consumer Price Index) in India",
        "Gross Domestic Product of the Indian economy",
        "Total unemployment rate across rural and urban sectors"
    ],
    "D",
    "1. The price of cotton textiles in a specific city/market is a microeconomic variable because it concerns a single industry/market.\n2. Aggregate price level, GDP, and nationwide unemployment are macroeconomic aggregates.\nHence, Option {{CORR}} is correct.",
    "Identifies individual industry pricing as microeconomic."
)
add_q(make_question(CHAPTER, "Microeconomics vs Macroeconomics", "Which of the following is a subject matter of Microeconomics rather than Macroeconomics?", opts, corr, sol))

# 25. Positive economics statement identification
opts, corr, sol = rotate_options(
    "An increase in excise duty on petrol leads to a decrease in its quantity demanded",
    [
        "The government should abolish all indirect taxes on petroleum products",
        "Income inequalities in developing nations ought to be eliminated completely",
        "Free foodgrains must be provided unconditionally to all unemployed youth"
    ],
    "A",
    "1. 'An increase in excise duty leads to a decrease in quantity demanded' is a testable, empirical cause-and-effect relationship ('what is'), which defines positive economics.\n2. Statements containing 'should', 'ought to', or 'must' represent value judgments (normative economics).\nHence, Option {{CORR}} is correct.",
    "Differentiates empirical cause-and-effect from normative values."
)
add_q(make_question(CHAPTER, "Positive vs Normative Economics", "Which of the following represents a positive economic statement?", opts, corr, sol))

# 26. Normative economics statement identification
opts, corr, sol = rotate_options(
    "The government should subsidize electric vehicles to curb urban air pollution",
    [
        "Higher interest rates reduce the volume of business borrowing",
        "India's inflation rate rose by 1.2 percent in the previous financial year",
        "A price ceiling set below equilibrium results in an excess demand for wheat"
    ],
    "B",
    "1. The prescription that government 'should subsidize' represents an ethical value judgment, making it a normative statement.\n2. The other options describe observed or analytical economic facts.\nHence, Option {{CORR}} is correct.",
    "Identifies prescriptive normative policy statement."
)
add_q(make_question(CHAPTER, "Positive vs Normative Economics", "Which of the following is an example of a normative economic statement?", opts, corr, sol))

# 27. Match economic concepts with definitions
add_q(make_match_question(
    CHAPTER, "Introductory Economic Concepts",
    "Match the economic concepts in List I with their descriptions in List II:",
    [
        ("A", "Positive Economics"),
        ("B", "Normative Economics"),
        ("C", "Opportunity Cost"),
        ("D", "Marginal Rate of Transformation")
    ],
    [
        ("I", "Value of the next best alternative forgone"),
        ("II", "Rate at which one good must be sacrificed to produce another"),
        ("III", "Analysis of verifiable facts and cause-and-effect"),
        ("IV", "Prescriptive statements based on ethical value judgments")
    ],
    "A-(III), B-(IV), C-(I), D-(II)",
    [
        "A-(IV), B-(III), C-(I), D-(II)",
        "A-(III), B-(I), C-(IV), D-(II)",
        "A-(II), B-(IV), C-(I), D-(III)"
    ],
    "A",
    "1. Positive -> Verifiable facts (III).\n2. Normative -> Ethical value judgments (IV).\n3. Opportunity Cost -> Next best alternative forgone (I).\n4. MRT -> Sacrifice rate of one good for another (II).\nHence, Option A is correct."
))

# 28. Statement I & II: PPF shifts
add_q(make_statement_question(
    CHAPTER, "Production Possibility Frontier",
    "Widespread destruction of physical capital and factories caused by an earthquake will shift the economy's PPF inward to the left.",
    "A leftward shift of the PPF signifies a permanent or temporary decrease in the economy's productive capacity.",
    "A",
    "1. Statement I is true: A natural disaster destroys factors of production (capital goods, infrastructure), reducing overall production capacity.\n2. Statement II is true: An inward/leftward shift of PPF represents a reduction in productive capacity.\nHence, both statements are true (Option A)."
))

# 29. Assertion & Reason: MOC and PPF shape
add_q(make_assertion_question(
    CHAPTER, "Production Possibility Frontier",
    "The Production Possibility Frontier is bowed outwards (concave to the origin).",
    "Factors of production are specialized and not equally adaptable to the production of all commodities.",
    "A",
    "1. Assertion is true: PPF is concave to the origin.\n2. Reason is true: Resources are specialized, so transferring them from one sector to another incurs increasing marginal opportunity cost.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 30. Scarcity and choice
opts, corr, sol = rotate_options(
    "Human wants are unlimited while productive resources to satisfy them are limited and have alternative uses",
    [
        "Money supply in developing economies is controlled exclusively by commercial banks",
        "Governments impose high taxes on luxury goods to prevent conspicuous consumption",
        "Firms always operate under increasing returns to scale in competitive markets"
    ],
    "C",
    "1. Scarcity arises because human wants are unlimited while the resources available to satisfy them are scarce and possess alternative uses. This fundamental scarcity necessitates choice.\nHence, Option {{CORR}} is correct.",
    "States the twin roots of the economic problem: scarcity and alternative uses."
)
add_q(make_question(CHAPTER, "Central Problems of an Economy", "What is the primary root cause of all economic problems in an economy?", opts, corr, sol))

# Q31-Q40: Advanced Conceptual, Sequential & Application questions
# 31. Opportunity Cost in capital allocation
opts, corr, sol = rotate_options(
    "The Rs. 80,000 return he could have earned by investing in the stock market",
    [
        "The Rs. 10,00,000 principal capital amount he invested",
        "The Rs. 1,00,000 profit he actually realized from the bakery",
        "The Rs. 20,000 net difference between the bakery profit and stock return"
    ],
    "B",
    "1. An investor has Rs. 10,00,000. He invests in a bakery and earns Rs. 1,00,000. The next best alternative was the stock market yielding Rs. 80,000.\n2. The opportunity cost of choosing the bakery is the forgone return from the next best alternative (Rs. 80,000).\nHence, Option {{CORR}} is correct.",
    "Correctly isolates the return of the forgone next best alternative."
)
add_q(make_question(CHAPTER, "Opportunity Cost", "An entrepreneur invests his savings of Rs. 10,00,000 into starting a bakery, earning an annual profit of Rs. 1,00,000. Alternatively, he could have invested the funds in equities yielding Rs. 80,000 annually. What is his annual opportunity cost?", opts, corr, sol))

# 32. Inward rotation of PPF
opts, corr, sol = rotate_options(
    "A severe pest attack destroying 50% of the cotton crop without affecting wheat farming",
    [
        "A severe drought across the entire nation wiping out all crops equally",
        "A technological innovation that doubles productivity in both cotton and wheat",
        "An influx of migrant workers raising overall agricultural labour supply"
    ],
    "A",
    "1. A pest attack specifically destroying cotton crops reduces the maximum production capacity of cotton while leaving wheat capacity unaffected. This causes an inward rotation of the PPF along the cotton axis.\nHence, Option {{CORR}} is correct.",
    "Identifies crop-specific supply shock as single-axis rotation."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "In a two-good economy producing wheat and cotton, which of the following events causes an inward rotation of the PPF along the cotton axis only?", opts, corr, sol))

# 33. Arrange chronological emergence of economic thought
add_q(make_sequence_question(
    CHAPTER, "Economic Methodology",
    "Arrange the following foundational economic concepts in the logical sequence of understanding production possibilities:",
    [
        "Recognition of finite resources with alternative uses",
        "Calculation of marginal opportunity cost between alternative goods",
        "Plotting the Production Possibility Frontier (PPF)",
        "Selecting an optimal production point on the frontier based on societal priorities"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. First, scarcity and alternative uses are acknowledged (A).\n2. Next, the trade-off / MOC is calculated (B).\n3. Then the PPF is plotted (C).\n4. Finally, society chooses an allocative point on the frontier (D).\nHence, Option A is correct."
))

# 34. Convex PPF theoretical scenario
opts, corr, sol = rotate_options(
    "Decreasing Marginal Opportunity Cost",
    [
        "Increasing Marginal Opportunity Cost",
        "Constant Marginal Opportunity Cost",
        "Zero Opportunity Cost"
    ],
    "D",
    "1. If the PPF were convex to the origin, it would imply that as more of Good X is produced, fewer and fewer units of Good Y are surrendered per unit of X, representing Decreasing Marginal Opportunity Cost.\nHence, Option {{CORR}} is correct.",
    "Connects convexity of PPF to decreasing MOC."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "If an economy's Production Possibility Frontier is convex to the origin, it implies the existence of:", opts, corr, sol))

# 35. Make in India / Skill India impact on PPF
opts, corr, sol = rotate_options(
    "Shifts the PPF to the right due to enhancement of human capital and productive capacity",
    [
        "Causes an inward shift of the PPF because of rising government expenditure",
        "Rotates the PPF inward towards the origin along the vertical axis",
        "Has no effect on the PPF because skills only affect monetary wages"
    ],
    "A",
    "1. Programs like 'Skill India' and 'Make in India' improve labor productivity, attract investment, and upgrade technology, expanding the economy's productive capacity and shifting the PPF outward/rightward.\nHence, Option {{CORR}} is correct.",
    "Explains how skill enhancement expands the production frontier."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "What is the anticipated long-run impact of government initiatives like 'Skill India' on the country's Production Possibility Frontier?", opts, corr, sol))

# 36. Statement I & II: Unemployment and PPF
add_q(make_statement_question(
    CHAPTER, "Production Possibility Frontier",
    "A rise in the domestic unemployment rate causes an inward shift of the economy's Production Possibility Frontier.",
    "Underemployment or unemployment of resources means the economy operates at a point inside its existing PPF without changing the frontier itself.",
    "D",
    "1. Statement I is false: Unemployment does NOT shift the PPF; the maximum potential capacity remains unchanged. Rather, the economy operates at a point INSIDE the PPF.\n2. Statement II is true: Operating inside the frontier reflects underutilization.\nHence, Statement I is false and Statement II is true (Option D)."
))

# 37. Assertion & Reason: Opportunity Cost and Free Goods
add_q(make_assertion_question(
    CHAPTER, "Opportunity Cost",
    "Economic goods always have an opportunity cost, whereas free goods like sunlight do not have an opportunity cost.",
    "Free goods are available in unlimited abundance without the sacrifice of any alternative productive resources.",
    "A",
    "1. Assertion is true: Economic goods are scarce and require sacrificing alternatives, while free goods (e.g. ambient air, sunlight) require no sacrifice.\n2. Reason is true: Abundance means no alternative is forgone.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 38. Match economic statements with positive vs normative classification
add_q(make_match_question(
    CHAPTER, "Positive vs Normative Economics",
    "Match the economic statements in List I with their branch in List II:",
    [
        ("A", "The central bank raised the repo rate by 25 basis points"),
        ("B", "Wealth tax should be reintroduced to reduce economic disparities"),
        ("C", "A minimum support price above equilibrium generates surplus grain"),
        ("D", "Poverty ought to be eradicated within the next decade")
    ],
    [
        ("I", "Normative Economics"),
        ("II", "Positive Economics"),
        ("III", "Positive Economics"),
        ("IV", "Normative Economics")
    ],
    "A-(II), B-(I), C-(III), D-(IV)",
    [
        "A-(I), B-(II), C-(III), D-(IV)",
        "A-(II), B-(IV), C-(I), D-(III)",
        "A-(III), B-(I), C-(II), D-(IV)"
    ],
    "A",
    "1. A is an objective factual event -> Positive (II).\n2. B expresses 'should' -> Normative (I).\n3. C states analytical cause-and-effect -> Positive (III).\n4. D expresses 'ought to' -> Normative (IV).\nHence, Option A is correct."
))

# 39. Slope of MRT formula verification
opts, corr, sol = rotate_options(
    "MRT = - (Delta Y / Delta X)",
    [
        "MRT = - (Delta X / Delta Y)",
        "MRT = P_x / P_y",
        "MRT = Total Cost / Total Output"
    ],
    "B",
    "1. The Marginal Rate of Transformation (MRT) measures the amount of Good Y that must be sacrificed to obtain an additional unit of Good X: $\\text{MRT} = -\\frac{\\Delta Y}{\\Delta X}$.\nHence, Option {{CORR}} is correct.",
    "Identifies the standard formula for MRT."
)
add_q(make_question(CHAPTER, "Production Possibility Frontier", "Mathematically, the Marginal Rate of Transformation (MRT) between Good Y and Good X along a PPF is formulated as:", opts, corr, sol))

# 40. Central problems and production techniques
opts, corr, sol = rotate_options(
    "Employing capital-intensive methods where capital is relatively abundant and cheaper than labour",
    [
        "Maximizing total physical output regardless of factor cost differentials",
        "Mandating that every factory use identical proportions of machinery and labour",
        "Eliminating machinery completely in favour of manual labour in all sectors"
    ],
    "C",
    "1. Economic efficiency in answering 'How to produce' requires selecting the least-cost production technique. A country with abundant capital and scarce labor will choose capital-intensive methods, while a labor-abundant country chooses labor-intensive methods.\nHence, Option {{CORR}} is correct.",
    "Explains factor abundance and relative factor pricing in technique choice."
)
add_q(make_question(CHAPTER, "Central Problems of an Economy", "How does an economy achieve cost efficiency when addressing the central problem of 'How to produce'?", opts, corr, sol))

# Verify count and uniqueness
assert len(questions) == 40, f"Expected 40 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 1!")

out_path = "mock/eco_units/unit1.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
