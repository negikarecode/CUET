import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text
)

CHAPTER = "Theory of Consumer Behaviour"
questions = []
seen = set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 120 unique questions for Unit 2: Theory of Consumer Behaviour and Demand...")

# -------------------------------------------------------------------------------------------------
# 1. Cardinal Utility & Law of Diminishing Marginal Utility (Q1 - Q25)
# -------------------------------------------------------------------------------------------------

# 1. TU and MU relationship when MU is zero
opts, corr, sol = rotate_options(
    "Total Utility is at its maximum and the consumer reaches the point of satiety",
    [
        "Total Utility begins to decrease at an increasing rate",
        "Total Utility is equal to zero",
        "Total Utility is rising at an increasing rate"
    ],
    "A",
    "1. According to the cardinal utility theory, when Marginal Utility (MU) equals zero, Total Utility (TU) reaches its peak (point of satiety/saturation).\n2. When MU is positive, TU increases; when MU is negative, TU falls.\nHence, Option {{CORR}} is correct.",
    "Correctly identifies maximum TU at MU = 0."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "When Marginal Utility (MU) of consuming a commodity becomes zero, what happens to Total Utility (TU)?", opts, corr, sol))

# 2. TU and MU relationship when MU is negative
opts, corr, sol = rotate_options(
    "Total Utility begins to diminish",
    [
        "Total Utility continues to rise at a decreasing rate",
        "Total Utility reaches infinity",
        "Total Utility remains completely constant"
    ],
    "B",
    "1. When consumption proceeds beyond the point of satiety where MU becomes negative, each additional unit diminishes total satisfaction, causing TU to decline.\nHence, Option {{CORR}} is correct.",
    "Identifies declining TU when MU is negative."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "If the marginal utility derived from consuming the 6th slice of pizza is negative, what is the effect on Total Utility?", opts, corr, sol))

# 3. Numerical MU calculation
opts, corr, sol = rotate_options(
    "15 utils",
    [
        "105 utils",
        "21 utils",
        "90 utils"
    ],
    "C",
    "1. Marginal Utility of the nth unit is given by $MU_n = TU_n - TU_{n-1}$.\n2. Here, $TU_4 = 90$ utils and $TU_5 = 105$ utils.\n3. $MU_5 = 105 - 90 = 15$ utils.\nHence, Option {{CORR}} is correct.",
    "Applies the formula MU_n = TU_n - TU_{n-1}."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "A consumer derives 90 utils of total utility from consuming 4 units of ice cream and 105 utils from consuming 5 units. What is the marginal utility of the 5th unit?", opts, corr, sol))

# 4. Law of DMU definition
opts, corr, sol = rotate_options(
    "As a consumer consumes more units of a good, the satisfaction derived from each successive unit decreases",
    [
        "As consumer income increases, expenditure on luxury goods increases more than proportionately",
        "As the market price falls, producers are willing to supply smaller quantities",
        "Total expenditure remains constant irrespective of fluctuations in commodity prices"
    ],
    "D",
    "1. The Law of Diminishing Marginal Utility states that as more and more standard units of a commodity are consumed continuously, the marginal utility derived from each successive unit declines.\nHence, Option {{CORR}} is correct.",
    "States the textbook law of diminishing marginal utility."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "What is the core premise of H.H. Gossen's First Law (Law of Diminishing Marginal Utility)?", opts, corr, sol))

# 5. Assumption of DMU: continuous consumption
opts, corr, sol = rotate_options(
    "Consumption of the commodity must be continuous without substantial time gaps",
    [
        "The consumer must possess monotonic preferences across infinite commodity bundles",
        "The market price of the good must decline with every successive purchase",
        "Marginal utility of money must fluctuate with every transaction"
    ],
    "A",
    "1. The law of DMU holds under the assumption that consumption is continuous, standard units are consumed, and the marginal utility of money remains constant.\nHence, Option {{CORR}} is correct.",
    "Identifies continuity of consumption as a key assumption."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "Which of the following is an essential assumption for the Law of Diminishing Marginal Utility to hold valid?", opts, corr, sol))

# 6. Consumer equilibrium: Single commodity condition
opts, corr, sol = rotate_options(
    "MU_x / P_x = MU_m",
    [
        "MU_x = P_x * MU_m * 2",
        "TU_x = P_x",
        "MU_x / MU_m = P_x^2"
    ],
    "B",
    "1. For a single commodity X, consumer equilibrium is attained where the marginal utility in terms of money equals the price of the commodity: $\\frac{MU_x}{P_x} = MU_m$ or $MU_x = P_x \\times MU_m$.\nHence, Option {{CORR}} is correct.",
    "States the single-commodity equilibrium condition."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "In cardinal utility analysis, what is the equilibrium condition for a consumer consuming a single commodity X with price P_x?", opts, corr, sol))

# 7. Numerical Single commodity equilibrium
opts, corr, sol = rotate_options(
    "4 units",
    [
        "2 units",
        "5 units",
        "3 units"
    ],
    "C",
    "1. Given: $P_x = \\text{Rs. 10}$, $MU_m = 2$ utils per rupee.\n2. Equilibrium requires $MU_x / P_x = MU_m \\implies MU_x = 10 \\times 2 = 20$ utils.\n3. Looking at the schedule: 1st unit gives 35, 2nd gives 30, 3rd gives 25, 4th gives 20 utils.\n4. Therefore, equilibrium is reached at 4 units.\nHence, Option {{CORR}} is correct.",
    "Calculates equilibrium units where MU_x = P_x * MU_m."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "The price of commodity X is Rs. 10 per unit and the marginal utility of money is 2 utils/Re. If the consumer's MU schedule is [1: 35 utils, 2: 30 utils, 3: 25 utils, 4: 20 utils, 5: 12 utils], how many units of X will the consumer purchase at equilibrium?", opts, corr, sol))

# 8. Disequilibrium single commodity: MU_x / P_x > MU_m
opts, corr, sol = rotate_options(
    "Increase consumption of commodity X until MU_x falls to restore equality",
    [
        "Reduce consumption of commodity X until MU_x rises further",
        "Demand a government price subsidy on commodity X",
        "Stop purchasing commodity X completely and save all income"
    ],
    "D",
    "1. When $\\frac{MU_x}{P_x} > MU_m$, the marginal benefit of spending a rupee on good X exceeds the opportunity cost of money.\n2. To maximize satisfaction, the consumer buys more of X. By the law of DMU, $MU_x$ falls until $\\frac{MU_x}{P_x} = MU_m$.\nHence, Option {{CORR}} is correct.",
    "Explains adjustment when MU per rupee exceeds marginal utility of money."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "If a consumer finds that MU_x / P_x > MU_m, what rational action will restore equilibrium?", opts, corr, sol))

# 9. Two commodity equilibrium condition (Law of Equi-Marginal Utility)
opts, corr, sol = rotate_options(
    "MU_x / P_x = MU_y / P_y = MU_m",
    [
        "MU_x * P_x = MU_y * P_y",
        "TU_x / P_x = TU_y / P_y",
        "MU_x + MU_y = P_x + P_y"
    ],
    "A",
    "1. In a two-commodity case, consumer equilibrium requires the Law of Equi-Marginal Utility: the marginal utility per rupee spent must be equal across all commodities: $\\frac{MU_x}{P_x} = \\frac{MU_y}{P_y} = MU_m$, subject to the budget constraint.\nHence, Option {{CORR}} is correct.",
    "Formulates the equi-marginal utility condition."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "Which mathematical condition represents consumer's equilibrium in a two-commodity world (X and Y) under cardinal utility?", opts, corr, sol))

# 10. Disequilibrium two commodities: MU_x / P_x > MU_y / P_y
opts, corr, sol = rotate_options(
    "Substitute Good X for Good Y by consuming more of X and less of Y",
    [
        "Substitute Good Y for Good X by consuming more of Y and less of X",
        "Reduce consumption of both Good X and Good Y equally",
        "Increase consumption of both goods in infinite proportions"
    ],
    "B",
    "1. When $\\frac{MU_x}{P_x} > \\frac{MU_y}{P_y}$, the consumer gets more utility per rupee from Good X than Good Y.\n2. Rational reallocation involves spending more on Good X (reducing $MU_x$) and less on Good Y (raising $MU_y$) until equi-marginality is restored.\nHence, Option {{CORR}} is correct.",
    "Drives consumer adjustment through substitution."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "If a consumer discovers that MU_x / P_x > MU_y / P_y, what behavioral adjustment will maximize total utility?", opts, corr, sol))

# 11. Match Cardinal utility concepts
add_q(make_match_question(
    CHAPTER, "Cardinal Utility Matrix",
    "Match the utility concepts in List I with their defining mathematical relationships in List II:",
    [
        ("A", "Total Utility (TU)"),
        ("B", "Marginal Utility (MU)"),
        ("C", "Point of Satiety"),
        ("D", "Equi-Marginal Utility")
    ],
    [
        ("I", "MU = 0 and TU is maximized"),
        ("II", "Sum of marginal utilities derived from all units consumed"),
        ("III", "MU_x / P_x = MU_y / P_y"),
        ("IV", "Change in TU per additional unit consumed (Delta TU / Delta Q)")
    ],
    "A-(II), B-(IV), C-(I), D-(III)",
    [
        "A-(IV), B-(II), C-(I), D-(III)",
        "A-(II), B-(I), C-(IV), D-(III)",
        "A-(I), B-(IV), C-(II), D-(III)"
    ],
    "A",
    "1. TU -> Sum of MUs (II).\n2. MU -> Delta TU / Delta Q (IV).\n3. Satiety -> MU = 0 and TU max (I).\n4. Equi-marginal -> MU_x / P_x = MU_y / P_y (III).\nHence, Option A is correct."
))

# 12. Statement I & II: Law of DMU and TU peak
add_q(make_statement_question(
    CHAPTER, "Cardinal Utility Analysis",
    "As long as marginal utility remains positive, total utility continues to rise.",
    "Total utility reaches its absolute maximum when marginal utility is strictly equal to zero.",
    "A",
    "1. Statement I is true: If each extra unit adds positive utility ($MU > 0$), TU increases.\n2. Statement II is true: The peak of TU corresponds to $MU = 0$.\nHence, both statements are true (Option A)."
))

# 13. Assertion & Reason: Why water is cheap and diamond expensive (Diamond-Water Paradox)
add_q(make_assertion_question(
    CHAPTER, "Cardinal Utility Analysis",
    "The market price of diamonds is exceptionally high while that of water is very low, despite water being essential for life.",
    "Market price is determined by marginal utility derived from the last unit consumed, not by total utility.",
    "A",
    "1. Assertion is true: Diamonds have high prices, water has low prices.\n2. Reason is true: Because water is abundant, its marginal utility is low; diamonds are scarce, so their marginal utility is high, and price reflects marginal utility.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 14. Assumptions of cardinal utility: constancy of MU of money
opts, corr, sol = rotate_options(
    "The marginal utility of money (MU_m) remains constant throughout consumption",
    [
        "The marginal utility of money increases exponentially with expenditure",
        "Utility can only be ranked ordinally and cannot be measured numerically",
        "The consumer always spends all income on a single divisible commodity"
    ],
    "C",
    "1. Alfred Marshall assumed that the marginal utility of money remains constant so that money can serve as a standard measuring rod for utility.\nHence, Option {{CORR}} is correct.",
    "Notes constancy of MU_m in Marshallian utility analysis."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "Which specific assumption was made by Alfred Marshall to use money as a measuring rod of utility?", opts, corr, sol))

# 15. Sequence of consumer adjustment under DMU
add_q(make_sequence_question(
    CHAPTER, "Consumer Equilibrium",
    "Arrange the following sequential steps when a consumer purchases additional units of a good where initial MU_x > P_x:",
    [
        "Consumer experiences higher marginal utility than the price paid (MU_x > P_x)",
        "Consumer increases the quantity demanded of Good X",
        "Marginal utility of Good X declines due to the Law of Diminishing Marginal Utility",
        "Equilibrium is re-established where MU_x equals P_x"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (B), (A), (D)"
    ],
    "A",
    "1. The process starts with the initial disequilibrium $MU_x > P_x$ (A), leading to increased consumption (B), which reduces MU via DMU (C), until equilibrium $MU_x = P_x$ is reached (D).\nHence, Option A is correct."
))

# 16. Total Utility formula from MU
opts, corr, sol = rotate_options(
    "TU_n = Sum of MU from unit 1 to n",
    [
        "TU_n = MU_n / n",
        "TU_n = MU_n * P_n",
        "TU_n = MU_1 - MU_n"
    ],
    "D",
    "1. Total Utility of consuming $n$ units is the cumulative sum of marginal utilities of all individual units: $TU_n = \\sum_{i=1}^n MU_i$.\nHence, Option {{CORR}} is correct.",
    "States the summation formula for Total Utility."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "How is Total Utility (TU_n) derived mathematically from the marginal utilities of individual units?", opts, corr, sol))

# 17. Calculation of TU from given MU schedule
opts, corr, sol = rotate_options(
    "78 utils",
    [
        "18 utils",
        "60 utils",
        "96 utils"
    ],
    "A",
    "1. Given marginal utilities: $MU_1 = 30$, $MU_2 = 25$, $MU_3 = 15$, $MU_4 = 8$.\n2. $TU_4 = 30 + 25 + 15 + 8 = 78$ utils.\nHence, Option {{CORR}} is correct.",
    "Calculates sum of marginal utilities."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "If the marginal utility derived from 4 successive glasses of juice are 30, 25, 15, and 8 utils respectively, what is the Total Utility obtained from consuming all 4 glasses?", opts, corr, sol))

# 18. Consumer surplus concept
opts, corr, sol = rotate_options(
    "The difference between what a consumer is willing to pay and what he actually pays",
    [
        "The excess of total expenditure over total disposable income",
        "The difference between price of substitute and price of complement",
        "The residual income saved in bank accounts after monthly consumption"
    ],
    "B",
    "1. Consumer Surplus = Total Utility (willingness to pay) - Total Expenditure (actual payment $P \\times Q$).\nHence, Option {{CORR}} is correct.",
    "Defines Marshallian consumer surplus."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "What does the concept of 'Consumer Surplus' represent in economics?", opts, corr, sol))

# 19. Two commodity numerical equilibrium check
opts, corr, sol = rotate_options(
    "Spend more on Y and less on X",
    [
        "Spend more on X and less on Y",
        "Current consumption is in equilibrium",
        "Double the consumption of Good X immediately"
    ],
    "C",
    "1. Given: $MU_x = 40$, $P_x = \\text{Rs. 10} \\implies MU_x / P_x = 40 / 10 = 4$ utils/Re.\n2. $MU_y = 60$, $P_y = \\text{Rs. 12} \\implies MU_y / P_y = 60 / 12 = 5$ utils/Re.\n3. Since $MU_y / P_y (5) > MU_x / P_x (4)$, a rupee spent on Good Y yields higher satisfaction.\n4. Therefore, the consumer should spend more on Y and less on X.\nHence, Option {{CORR}} is correct.",
    "Compares MU per rupee across two goods."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "A consumer consumes two goods X and Y with P_x = Rs. 10 and P_y = Rs. 12. If his current MU_x = 40 utils and MU_y = 60 utils, what should the consumer do to maximize utility?", opts, corr, sol))

# 20. Statement I & II: Law of Equi-Marginal Utility
add_q(make_statement_question(
    CHAPTER, "Consumer Equilibrium",
    "The Law of Equi-Marginal Utility is also known as Gossen's Second Law.",
    "A consumer maximizes total utility when the ratio of marginal utility to price is equal for all purchased commodities.",
    "A",
    "1. Statement I is true: Equi-marginal utility is indeed Gossen's Second Law.\n2. Statement II is true: Utility is maximized when $MU_1/P_1 = MU_2/P_2 = \\dots = MU_n/P_n$.\nHence, both statements are true (Option A)."
))

# 21. Units of measurement in Cardinal Utility
opts, corr, sol = rotate_options(
    "Utils",
    [
        "Joules",
        "Rank indices",
        "Amperes"
    ],
    "D",
    "1. In classical cardinal utility theory formulated by Marshall and Walras, utility is assumed to be measurable in psychological numerical units termed 'utils'.\nHence, Option {{CORR}} is correct.",
    "Identifies utils as cardinal unit of satisfaction."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "What hypothetical unit was adopted by cardinal economists to quantify consumer satisfaction?", opts, corr, sol))

# 22. Limitation of Cardinal utility approach
opts, corr, sol = rotate_options(
    "Utility is a subjective psychological experience and cannot be objectively quantified in numbers",
    [
        "It assumes that consumers behave rationally in market transactions",
        "It accounts for both substitute and complementary relationships between goods",
        "It recognizes that marginal utility of consumption decreases over time"
    ],
    "A",
    "1. The major criticism by Hicks and Allen was that utility is introspective and subjective, making cardinal measurement in utils unrealistic.\nHence, Option {{CORR}} is correct.",
    "Identifies subjective nature of utility as cardinal limitation."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "What is the primary conceptual criticism levied against the Cardinal Utility theory by modern ordinalists?", opts, corr, sol))

# 23. Derivation of downward sloping demand curve from MU
opts, corr, sol = rotate_options(
    "Because marginal utility diminishes, consumers are only willing to buy more units at lower prices",
    [
        "Because consumers always prefer higher prices as a signal of premium quality",
        "Because producers reduce their supply when the market price falls",
        "Because total utility drops to zero when consumption doubles"
    ],
    "B",
    "1. Since $P_x = MU_x / MU_m$ and $MU_x$ declines as consumption increases, the consumer will only purchase additional units if the price falls proportionately. Hence the demand curve slopes downwards.\nHence, Option {{CORR}} is correct.",
    "Explains downward-sloping demand via diminishing MU."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "How does the Law of Diminishing Marginal Utility explain the downward slope of the individual demand curve?", opts, corr, sol))

# 24. Assumption of Homogeneity in DMU
opts, corr, sol = rotate_options(
    "All units of the commodity consumed must be identical in quality, size, and packaging",
    [
        "The commodity must be consumed across several widely spaced calendar days",
        "The consumer must alter his taste preferences between every successive unit",
        "The commodity must be completely indivisible and sold as a single bundle"
    ],
    "C",
    "1. The law of DMU requires standard, identical (homogeneous) units. If the second unit is superior in quality or temperature, utility could increase, violating the law.\nHence, Option {{CORR}} is correct.",
    "Highlights unit homogeneity assumption."
)
add_q(make_question(CHAPTER, "Cardinal Utility Analysis", "Which condition regarding the nature of the consumed commodity is mandatory for the Law of DMU to operate?", opts, corr, sol))

# 25. Assertion & Reason: MU_m constancy
add_q(make_assertion_question(
    CHAPTER, "Cardinal Utility Analysis",
    "Marshall assumed that the marginal utility of money remains constant during consumption of a commodity.",
    "If the marginal utility of money varied with expenditure, money could not serve as a stable standard measure of utility.",
    "A",
    "1. Assertion is true: Marshall maintained constant $MU_m$.\n2. Reason is true: A measuring rod must remain constant.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# -------------------------------------------------------------------------------------------------
# 2. Indifference Curve Analysis (Ordinal Approach) (Q26 - Q55)
# -------------------------------------------------------------------------------------------------

# 26. Definition of Indifference Curve
opts, corr, sol = rotate_options(
    "A curve showing different combinations of two goods that yield the exact same level of satisfaction to the consumer",
    [
        "A locus of points showing combinations of inputs that minimize total production cost",
        "A curve depicting the quantities demanded across different income classes of society",
        "A schedule showing the relationship between total revenue and variable costs"
    ],
    "A",
    "1. An Indifference Curve (IC) is the locus of all commodity bundles of two goods that provide equal total utility or satisfaction to the consumer, making him indifferent among them.\nHence, Option {{CORR}} is correct.",
    "Defines the indifference curve."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "What is an Indifference Curve (IC)?", opts, corr, sol))

# 27. Slope of Indifference Curve: MRS
opts, corr, sol = rotate_options(
    "Marginal Rate of Substitution (MRS_xy = - Delta Y / Delta X)",
    [
        "Price ratio of the two commodities (P_x / P_y)",
        "Marginal Rate of Technical Substitution of Labour for Capital",
        "Ratio of average variable cost to average fixed cost"
    ],
    "B",
    "1. The slope of an indifference curve at any point represents the Marginal Rate of Substitution ($MRS_{xy} = -\\frac{\\Delta Y}{\\Delta X} = \\frac{MU_x}{MU_y}$).\nHence, Option {{CORR}} is correct.",
    "Identifies MRS as the slope of IC."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "The slope of an Indifference Curve at any point is measured by the:", opts, corr, sol))

# 28. Why IC is convex to the origin
opts, corr, sol = rotate_options(
    "Diminishing Marginal Rate of Substitution as more of Good X is substituted for Good Y",
    [
        "Increasing marginal opportunity cost between consumer goods",
        "Constant prices of both goods in competitive retail markets",
        "Monotonic preference where more is always strictly preferred to less"
    ],
    "C",
    "1. An indifference curve is convex to the origin because the Marginal Rate of Substitution ($MRS_{xy}$) diminishes continuously as the consumer substitutes Good X for Good Y.\nHence, Option {{CORR}} is correct.",
    "Connects convexity of IC to diminishing MRS."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "Why is a typical Indifference Curve convex to the origin?", opts, corr, sol))

# 29. Numerical MRS calculation
opts, corr, sol = rotate_options(
    "3 units of Y per unit of X",
    [
        "0.33 units of Y per unit of X",
        "6 units of Y per unit of X",
        "12 units of Y per unit of X"
    ],
    "D",
    "1. Moving from Bundle A (1 X, 12 Y) to Bundle B (2 X, 9 Y):\n2. $\\Delta X = 2 - 1 = 1$ unit gained.\n3. $\\Delta Y = 12 - 9 = 3$ units sacrificed.\n4. $MRS_{xy} = |\\Delta Y / \\Delta X| = 3 / 1 = 3$ units of Y per unit of X.\nHence, Option {{CORR}} is correct.",
    "Calculates MRS = Delta Y / Delta X."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "A consumer is indifferent between Bundle A (1 unit of X and 12 units of Y) and Bundle B (2 units of X and 9 units of Y). What is the Marginal Rate of Substitution (MRS_xy) between Bundle A and Bundle B?", opts, corr, sol))

# 30. Property: ICs never intersect
opts, corr, sol = rotate_options(
    "Intersection would violate the transitivity assumption and the principle that higher IC represents higher satisfaction",
    [
        "Intersection causes marginal cost to exceed marginal revenue",
        "Intersection makes the budget line completely horizontal",
        "Intersection forces both prices to become equal to zero"
    ],
    "A",
    "1. If two indifference curves $IC_1$ and $IC_2$ intersected at point A, then any points B on $IC_1$ and C on $IC_2$ would satisfy $U(B) = U(A) = U(C) \\implies U(B) = U(C)$, which contradicts the fact that a higher curve contains more goods (monotonicity).\nHence, Option {{CORR}} is correct.",
    "Explains non-intersection via transitivity and monotonicity."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "Why is it mathematically impossible for two Indifference Curves to intersect each other?", opts, corr, sol))

# 31. Higher IC represents higher utility
opts, corr, sol = rotate_options(
    "Monotonic Preferences, meaning a consumer always prefers a bundle having more of at least one good",
    [
        "Diminishing marginal rate of substitution across all bundles",
        "Constant marginal utility of money in ordinal frameworks",
        "Equal prices for both commodities across all markets"
    ],
    "B",
    "1. A higher indifference curve lies to the right and above, containing more of at least one good and no less of the other. By monotonic preferences, the consumer strictly prefers more to less, yielding higher satisfaction.\nHence, Option {{CORR}} is correct.",
    "Links higher IC to monotonic preferences."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "Which property of consumer preferences ensures that a higher Indifference Curve represents a higher level of satisfaction?", opts, corr, sol))

# 32. Indifference Map definition
opts, corr, sol = rotate_options(
    "A family or collection of indifference curves representing different levels of satisfaction of a consumer",
    [
        "A geographical representation of retail stores and consumer densities",
        "A diagram showing the intersection of market demand and market supply",
        "A plot showing consumer budget lines under varying inflation rates"
    ],
    "C",
    "1. An Indifference Map is a family of indifference curves plotted on the same diagram, where each successive curve to the right represents a higher level of utility.\nHence, Option {{CORR}} is correct.",
    "Defines an indifference map."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "What is an Indifference Map?", opts, corr, sol))

# 33. Downward sloping property of IC
opts, corr, sol = rotate_options(
    "To remain at the same level of utility, an increase in consumption of Good X requires sacrificing some units of Good Y",
    [
        "Both goods are Giffen goods whose demand contracts with price cuts",
        "The consumer always operates under decreasing returns to scale",
        "The market price of Good X is higher than the market price of Good Y"
    ],
    "D",
    "1. An indifference curve must slope downwards from left to right because if consumption of one good increases, the quantity of the other must decrease to keep total satisfaction constant.\nHence, Option {{CORR}} is correct.",
    "Explains downward slope via compensation for increased consumption."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "Why does an Indifference Curve slope downward from left to right?", opts, corr, sol))

# 34. Budget Line Equation
opts, corr, sol = rotate_options(
    "P_x * X + P_y * Y = M",
    [
        "P_x / X + P_y / Y = M",
        "P_x * X - P_y * Y = M",
        "X / P_x + Y / P_y = M"
    ],
    "A",
    "1. The budget line equation represents all combinations of Good X and Good Y that exhaust the consumer's entire income $M$ at given prices $P_x$ and $P_y$: $P_x X + P_y Y = M$.\nHence, Option {{CORR}} is correct.",
    "Identifies budget line equation."
)
add_q(make_question(CHAPTER, "Budget Line and Budget Set", "What is the standard algebraic equation of the Budget Line for two goods X and Y with consumer income M?", opts, corr, sol))

# 35. Budget Set vs Budget Line
opts, corr, sol = rotate_options(
    "The budget set includes all bundles satisfying P_x * X + P_y * Y <= M, whereas the budget line satisfies P_x * X + P_y * Y = M",
    [
        "The budget line includes bundles outside consumer income while the budget set is restricted to origin",
        "The budget set represents cardinal utility while the budget line represents ordinal rankings",
        "There is no mathematical or economic distinction between budget set and budget line"
    ],
    "B",
    "1. The budget set consists of all affordable bundles costing less than or equal to income ($P_x X + P_y Y \\le M$). The budget line represents bundles that cost exactly equal to income ($P_x X + P_y Y = M$).\nHence, Option {{CORR}} is correct.",
    "Distinguishes inequality of budget set from equality of budget line."
)
add_q(make_question(CHAPTER, "Budget Line and Budget Set", "How does the Budget Set differ from the Budget Line?", opts, corr, sol))

# 36. Slope of Budget Line
opts, corr, sol = rotate_options(
    "- (P_x / P_y)",
    [
        "- (P_y / P_x)",
        "P_x * P_y",
        "M / (P_x + P_y)"
    ],
    "C",
    "1. Rearranging $P_x X + P_y Y = M \\implies Y = \\frac{M}{P_y} - \\left(\\frac{P_x}{P_y}\\right)X$.\n2. The slope of the budget line is $-\\frac{P_x}{P_y}$ (the price ratio or market rate of exchange).\nHence, Option {{CORR}} is correct.",
    "Gives slope of budget line as - P_x / P_y."
)
add_q(make_question(CHAPTER, "Budget Line and Budget Set", "The slope of the Budget Line in absolute terms is given by:", opts, corr, sol))

# 37. Shift in Budget Line: Income increase
opts, corr, sol = rotate_options(
    "Shifts parallel outward to the right without changing its slope",
    [
        "Rotates outward on the horizontal axis while vertical intercept remains fixed",
        "Shifts parallel inward towards the origin",
        "Becomes steeper as consumer purchasing power expands"
    ],
    "D",
    "1. When consumer income $M$ increases with constant prices $P_x$ and $P_y$, both intercepts ($M/P_x$ and $M/P_y$) increase proportionately, shifting the budget line parallel outward to the right without altering its slope ($-P_x/P_y$).\nHence, Option {{CORR}} is correct.",
    "Identifies parallel outward shift of budget line."
)
add_q(make_question(CHAPTER, "Budget Line and Budget Set", "What happens to the Budget Line when consumer income increases while the prices of both Good X and Good Y remain unchanged?", opts, corr, sol))

# 38. Rotation of Budget Line: Price of X falls
opts, corr, sol = rotate_options(
    "The budget line pivots outward along the X-axis while the Y-intercept remains unchanged",
    [
        "The budget line shifts parallel outward to the right",
        "The budget line pivots inward along the Y-axis while X-intercept is fixed",
        "The slope of the budget line becomes significantly steeper"
    ],
    "A",
    "1. If $P_x$ falls while $P_y$ and $M$ remain constant, the maximum purchasable units of X ($M/P_x$) increases, so the line pivots outward on the X-axis. The Y-intercept ($M/P_y$) remains unchanged.\nHence, Option {{CORR}} is correct.",
    "Describes rotation on X-axis when P_x changes."
)
add_q(make_question(CHAPTER, "Budget Line and Budget Set", "If the price of Good X falls while income and the price of Good Y remain constant, how does the Budget Line change?", opts, corr, sol))

# 39. Numerical Budget Line Intercepts
opts, corr, sol = rotate_options(
    "X-intercept = 25 units, Y-intercept = 10 units",
    [
        "X-intercept = 10 units, Y-intercept = 25 units",
        "X-intercept = 50 units, Y-intercept = 20 units",
        "X-intercept = 20 units, Y-intercept = 20 units"
    ],
    "B",
    "1. Given: $M = \\text{Rs. 500}$, $P_x = \\text{Rs. 20}$, $P_y = \\text{Rs. 50}$.\n2. X-intercept = $M / P_x = 500 / 20 = 25$ units.\n3. Y-intercept = $M / P_y = 500 / 50 = 10$ units.\nHence, Option {{CORR}} is correct.",
    "Calculates M/P_x and M/P_y correctly."
)
add_q(make_question(CHAPTER, "Budget Line and Budget Set", "A consumer has an income of Rs. 500 to spend on Good X and Good Y. If P_x = Rs. 20 and P_y = Rs. 50, what are the horizontal (X) and vertical (Y) intercepts of his Budget Line?", opts, corr, sol))

# 40. Consumer Equilibrium under Indifference Curve Analysis (Tangency)
opts, corr, sol = rotate_options(
    "MRS_xy = P_x / P_y and the indifference curve is strictly convex to the origin at that point",
    [
        "MRS_xy > P_x / P_y and the budget line is concave",
        "MRS_xy = 0 and total utility is maximized at the origin",
        "P_x * X + P_y * Y > M and indifference curves intersect"
    ],
    "C",
    "1. Consumer equilibrium under the ordinal approach requires two conditions:\n   (i) Tangency: $MRS_{xy} = \\frac{P_x}{P_y}$ (slope of IC equals slope of budget line).\n   (ii) Convexity: IC must be convex to the origin at the tangency point (diminishing MRS).\nHence, Option {{CORR}} is correct.",
    "States both necessary conditions for ordinal consumer equilibrium."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "Which pair of conditions must be satisfied for a consumer to attain equilibrium under Indifference Curve analysis?", opts, corr, sol))

# 41. Adjustment when MRS_xy > P_x / P_y
opts, corr, sol = rotate_options(
    "The consumer will buy more of Good X and less of Good Y, causing MRS_xy to fall until it equals P_x / P_y",
    [
        "The consumer will buy more of Good Y and less of Good X until MRS_xy rises",
        "The consumer will immediately reduce consumption of both goods to zero",
        "The slope of the budget line will automatically adjust without consumer action"
    ],
    "D",
    "1. When $MRS_{xy} > P_x / P_y$, the rate at which the consumer is willing to sacrifice Y for X exceeds the rate at which the market requires him to sacrifice Y for X.\n2. Thus, he buys more of X and less of Y. By diminishing MRS, $MRS_{xy}$ falls until equality is restored.\nHence, Option {{CORR}} is correct.",
    "Delineates behavioral adjustment when MRS exceeds price ratio."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "If a consumer is at a point on his budget line where MRS_xy > P_x / P_y, how will he react to attain equilibrium?", opts, corr, sol))

# 42. Adjustment when MRS_xy < P_x / P_y
opts, corr, sol = rotate_options(
    "The consumer will buy less of Good X and more of Good Y, causing MRS_xy to rise until it equals P_x / P_y",
    [
        "The consumer will buy more of Good X and less of Good Y",
        "The consumer will exit the market completely",
        "The consumer will increase consumption of Good X while keeping Good Y constant"
    ],
    "A",
    "1. When $MRS_{xy} < P_x / P_y$, the consumer values Good X less than the market price ratio. He will reallocate expenditure towards Good Y (buying less X and more Y), raising $MRS_{xy}$ until $MRS_{xy} = P_x / P_y$.\nHence, Option {{CORR}} is correct.",
    "Explains adjustment when MRS is less than price ratio."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "What happens when a consumer's MRS_xy is less than the market price ratio (P_x / P_y)?", opts, corr, sol))

# 43. Match Ordinal utility concepts
add_q(make_match_question(
    CHAPTER, "Ordinal Utility Matrix",
    "Match the concepts in List I with their defining mathematical or graphical characteristics in List II:",
    [
        ("A", "Slope of Indifference Curve"),
        ("B", "Slope of Budget Line"),
        ("C", "Budget Set"),
        ("D", "Consumer Equilibrium")
    ],
    [
        ("I", "MRS_xy = P_x / P_y"),
        ("II", "P_x * X + P_y * Y <= M"),
        ("III", "Marginal Rate of Substitution (MRS_xy)"),
        ("IV", "Price Ratio (P_x / P_y)")
    ],
    "A-(III), B-(IV), C-(II), D-(I)",
    [
        "A-(IV), B-(III), C-(II), D-(I)",
        "A-(III), B-(I), C-(IV), D-(II)",
        "A-(I), B-(IV), C-(II), D-(III)"
    ],
    "A",
    "1. Slope of IC -> MRS_xy (III).\n2. Slope of Budget Line -> Price ratio (IV).\n3. Budget Set -> Inequality <= M (II).\n4. Equilibrium -> Tangency MRS = P_x / P_y (I).\nHence, Option A is correct."
))

# 44. Statement I & II: Indifference curves and Monotonic preferences
add_q(make_statement_question(
    CHAPTER, "Indifference Curve Analysis",
    "Monotonic preferences imply that between any two bundles, the consumer always prefers the bundle containing more of at least one good and no less of the other good.",
    "An indifference curve can be upward sloping if consumer preferences are monotonic.",
    "C",
    "1. Statement I is true: This is the exact NCERT definition of monotonic preferences.\n2. Statement II is false: Under monotonic preferences, an IC CANNOT be upward sloping, because if both goods increase, utility must increase, so the consumer cannot remain indifferent.\nHence, Statement I is true but Statement II is false (Option C)."
))

# 45. Assertion & Reason: Convexity of IC
add_q(make_assertion_question(
    CHAPTER, "Indifference Curve Analysis",
    "An indifference curve is strictly convex to the origin.",
    "As the consumer increases consumption of Good X, his willingness to sacrifice Good Y for each additional unit of X continuously decreases.",
    "A",
    "1. Assertion is true: IC is convex to the origin.\n2. Reason is true: The willingness to sacrifice ($\Delta Y / \Delta X = MRS$) diminishes because as the stock of X rises, its relative intensity of desire falls.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 46. Perfect substitutes shape of IC
opts, corr, sol = rotate_options(
    "A straight downward-sloping line with constant MRS",
    [
        "L-shaped curves with zero substitutability",
        "Convex curves strictly asymptotic to both axes",
        "Circular concentric indifference contours"
    ],
    "B",
    "1. When two goods are perfect substitutes (e.g. 5-rupee coin and five 1-rupee coins), the consumer is willing to trade them at a fixed constant rate regardless of quantities. Hence, the IC is a straight downward-sloping line.\nHence, Option {{CORR}} is correct.",
    "Identifies straight line IC for perfect substitutes."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "What is the graphical shape of Indifference Curves when two goods are perfect substitutes for each other?", opts, corr, sol))

# 47. Perfect complements shape of IC
opts, corr, sol = rotate_options(
    "L-shaped (right-angled) indifference curves",
    [
        "Straight lines intersecting both axes at 45 degrees",
        "Hyperbolic curves convex to the origin",
        "Vertical straight lines parallel to the Y-axis"
    ],
    "C",
    "1. When two goods are perfect complements (e.g. left shoe and right shoe), they must be consumed in fixed proportions. Additional units of one good without the other yield zero extra utility, giving rise to L-shaped indifference curves.\nHence, Option {{CORR}} is correct.",
    "Identifies L-shaped IC for perfect complements."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "If two goods X and Y are strictly complementary goods consumed in fixed proportions, what shape do their Indifference Curves take?", opts, corr, sol))

# 48. Numerical equilibrium with MRS formula
opts, corr, sol = rotate_options(
    "MRS_xy must equal 2.5",
    [
        "MRS_xy must equal 0.4",
        "MRS_xy must equal 10",
        "MRS_xy must equal 1.0"
    ],
    "D",
    "1. At consumer equilibrium: $MRS_{xy} = P_x / P_y$.\n2. Here, $P_x = \\text{Rs. 50}$ and $P_y = \\text{Rs. 20}$.\n3. $MRS_{xy} = 50 / 20 = 2.5$.\nHence, Option {{CORR}} is correct.",
    "Computes equilibrium MRS = P_x / P_y."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "Suppose Good X sells for Rs. 50 and Good Y sells for Rs. 20. For a consumer in equilibrium, what must be the value of his Marginal Rate of Substitution (MRS_xy)?", opts, corr, sol))

# 49. Sequence of Indifference Curve equilibrium attainment
add_q(make_sequence_question(
    CHAPTER, "Consumer Equilibrium",
    "Arrange the following steps in the logical order of demonstrating consumer's equilibrium via ordinal analysis:",
    [
        "Determine the consumer's budget constraint and plot the Budget Line",
        "Plot the consumer's Indifference Map representing taste preferences",
        "Identify the point of tangency between the Budget Line and the highest attainable Indifference Curve",
        "Verify that the Indifference Curve is convex to the origin at the tangency point"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (D), (C)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. The methodology starts with plotting the budget line (A), overlaying the indifference map (B), finding the highest attainable tangency point (C), and confirming convexity/stability (D).\nHence, Option A is correct."
))

# 50. Infeasible vs Inefficient bundles on budget line
opts, corr, sol = rotate_options(
    "Bundle P is inefficient/under-spending while Bundle Q is unaffordable/infeasible",
    [
        "Bundle P is unaffordable while Bundle Q is inefficient",
        "Both Bundle P and Bundle Q are in optimal consumer equilibrium",
        "Bundle P maximizes utility while Bundle Q minimizes cost"
    ],
    "A",
    "1. Bundle P lies inside the budget line, meaning $P_x X_P + P_y Y_P < M$ (affordable, but leaves unspent income, hence inefficient under monotonicity).\n2. Bundle Q lies outside the budget line, meaning $P_x X_Q + P_y Y_Q > M$ (unattainable/infeasible with given income).\nHence, Option {{CORR}} is correct.",
    "Categorizes points inside vs outside budget line."
)
add_q(make_question(CHAPTER, "Budget Line and Budget Set", "In a budget diagram, Bundle P lies strictly inside the budget line while Bundle Q lies strictly outside the budget line. How are these bundles classified?", opts, corr, sol))

# 51. Proportional change in both prices and income
opts, corr, sol = rotate_options(
    "The Budget Line remains completely unchanged in both position and slope",
    [
        "The Budget Line shifts parallel outward by a factor of 2",
        "The Budget Line pivots outward along the X-axis only",
        "The slope of the Budget Line doubles"
    ],
    "B",
    "1. If income $M$ and prices $P_x, P_y$ all double (multiply by 2):\n   New intercepts: $\\frac{2M}{2P_x} = \\frac{M}{P_x}$ and $\\frac{2M}{2P_y} = \\frac{M}{P_y}$.\n   New slope: $-\\frac{2P_x}{2P_y} = -\\frac{P_x}{P_y}$.\n2. The budget line remains identical (absence of money illusion).\nHence, Option {{CORR}} is correct.",
    "Proves homogeneity of degree zero of the budget line."
)
add_q(make_question(CHAPTER, "Budget Line and Budget Set", "If the prices of both Good X and Good Y as well as the consumer's money income all exactly double simultaneously, what happens to the Budget Line?", opts, corr, sol))

# 52. Normal vs Inferior goods under income change
opts, corr, sol = rotate_options(
    "Demand increases for normal goods but decreases for inferior goods",
    [
        "Demand increases for inferior goods but decreases for normal goods",
        "Demand increases for both normal and inferior goods",
        "Demand decreases for both normal and inferior goods"
    ],
    "C",
    "1. By definition, a normal good has a positive income elasticity of demand (demand rises as income rises).\n2. An inferior good has a negative income elasticity of demand (demand falls as income rises, as consumers switch to superior substitutes).\nHence, Option {{CORR}} is correct.",
    "Contrasts income effect on normal vs inferior goods."
)
add_q(make_question(CHAPTER, "Theory of Demand", "When a consumer's money income rises, how does his demand respond for a normal good versus an inferior good?", opts, corr, sol))

# 53. Giffen goods definition
opts, corr, sol = rotate_options(
    "A special category of inferior goods for which the negative income effect outweighs the substitution effect, violating the law of demand",
    [
        "High-priced luxury goods purchased exclusively for ostentatious display",
        "Perishable agricultural goods whose supply cannot be stored across seasons",
        "Public goods provided freely by municipal corporations"
    ],
    "D",
    "1. A Giffen good is an extreme inferior good where the negative income effect is stronger than the substitution effect, causing quantity demanded to rise when its price rises (upward-sloping demand curve).\nHence, Option {{CORR}} is correct.",
    "Defines Giffen good via relative strength of income effect."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What is a Giffen Good?", opts, corr, sol))

# 54. Substitute goods cross-price effect
opts, corr, sol = rotate_options(
    "The demand curve for tea shifts rightward",
    [
        "The demand curve for tea shifts leftward",
        "There is a downward movement along the demand curve for tea",
        "The supply curve of tea becomes perfectly inelastic"
    ],
    "A",
    "1. Tea and coffee are substitute goods (positive cross-price elasticity). When the price of coffee rises, consumers substitute away from coffee towards tea, increasing the demand for tea and shifting its demand curve rightward.\nHence, Option {{CORR}} is correct.",
    "Shows rightward shift of substitute good's demand curve."
)
add_q(make_question(CHAPTER, "Theory of Demand", "If tea and coffee are close substitutes, what is the impact of an increase in the price of coffee on the market demand for tea?", opts, corr, sol))

# 55. Complementary goods cross-price effect
opts, corr, sol = rotate_options(
    "The demand curve for petrol shifts leftward",
    [
        "The demand curve for petrol shifts rightward",
        "There is an expansion of demand for petrol",
        "The price of petrol falls to zero immediately"
    ],
    "B",
    "1. Cars and petrol are complementary goods (negative cross-price elasticity). A rise in the price of cars reduces car purchases, which in turn reduces the demand for petrol, shifting the petrol demand curve to the left.\nHence, Option {{CORR}} is correct.",
    "Shows leftward shift of complementary good's demand."
)
add_q(make_question(CHAPTER, "Theory of Demand", "Cars and petrol are complementary goods. What happens to the demand curve for petrol if the price of cars rises significantly?", opts, corr, sol))

# -------------------------------------------------------------------------------------------------
# 3. Theory of Demand, Shifts vs Movements, Elasticity (Q56 - Q120)
# -------------------------------------------------------------------------------------------------

# 56. Law of Demand statement
opts, corr, sol = rotate_options(
    "Other things remaining constant, there is an inverse relationship between the price of a good and its quantity demanded",
    [
        "There is a direct proportional relationship between consumer income and expenditure",
        "Quantity demanded of a good always equals quantity supplied at all market prices",
        "As price rises, consumer willingness to substitute away from complements increases"
    ],
    "C",
    "1. The Law of Demand states that ceteris paribus (other factors remaining constant), an inverse relationship exists between the price of a commodity and the quantity demanded.\nHence, Option {{CORR}} is correct.",
    "States the classic law of demand."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What is the core proposition of the Law of Demand?", opts, corr, sol))

# 57. Movement along demand curve vs Shift of demand curve
opts, corr, sol = rotate_options(
    "Movement along the curve is caused solely by changes in the commodity's own price, whereas shifts are caused by non-price factors",
    [
        "Movement along the curve represents changes in tastes, whereas shifts represent price changes",
        "Shifts occur only in the long run, whereas movements occur only in monopoly markets",
        "Movement along the curve changes total revenue, whereas shifts leave revenue unchanged"
    ],
    "D",
    "1. A change in the commodity's own price causes a movement along the demand curve (contraction or expansion). Changes in other factors (income, prices of related goods, tastes) cause a shift of the demand curve (increase or decrease).\nHence, Option {{CORR}} is correct.",
    "Distinguishes movement along curve from shift of curve."
)
add_q(make_question(CHAPTER, "Theory of Demand", "How does a 'movement along the demand curve' differ fundamentally from a 'shift of the demand curve'?", opts, corr, sol))

# 58. Contraction of demand definition
opts, corr, sol = rotate_options(
    "A decrease in quantity demanded due to a rise in the commodity's own price, other factors remaining constant",
    [
        "A decrease in demand caused by a fall in consumer income",
        "A leftward shift of the entire demand curve due to unfavorable weather",
        "A fall in producer supply resulting from higher raw material taxes"
    ],
    "A",
    "1. Contraction of demand refers to a decrease in the quantity demanded of a commodity caused strictly by an increase in its own price, represented by an upward movement along the same demand curve.\nHence, Option {{CORR}} is correct.",
    "Defines contraction of demand."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What does 'Contraction of Demand' refer to in economic terminology?", opts, corr, sol))

# 59. Increase in demand causes
opts, corr, sol = rotate_options(
    "An increase in the price of a substitute good or a favorable change in consumer preferences",
    [
        "A fall in the commodity's own market price",
        "A rise in the commodity's own market price",
        "An increase in the price of a complementary good"
    ],
    "B",
    "1. An increase in demand (rightward shift) is caused by non-price factors such as an increase in the price of substitutes, a decrease in the price of complements, an increase in income for normal goods, or favorable taste shifts.\nHence, Option {{CORR}} is correct.",
    "Identifies causes of rightward demand shift."
)
add_q(make_question(CHAPTER, "Theory of Demand", "Which of the following factors leads to an 'Increase in Demand' (a rightward shift of the demand curve)?", opts, corr, sol))

# 60. Market demand curve derivation
opts, corr, sol = rotate_options(
    "Horizontal summation of individual demand curves of all consumers in the market",
    [
        "Vertical summation of individual demand curves at each quantity",
        "Average of the highest and lowest prices demanded by consumers",
        "Multiplication of individual demand quantities by marginal cost"
    ],
    "C",
    "1. The market demand curve is derived by horizontal summation of all individual demand curves in the market—adding together the quantities demanded by all consumers at each possible price.\nHence, Option {{CORR}} is correct.",
    "Specifies horizontal summation for market demand."
)
add_q(make_question(CHAPTER, "Theory of Demand", "How is the Market Demand Curve derived from individual consumer demand curves?", opts, corr, sol))

# 61. Numerical Market Demand derivation
opts, corr, sol = rotate_options(
    "62 units",
    [
        "40 units",
        "84 units",
        "50 units"
    ],
    "D",
    "1. Market consists of 3 identical consumers A, B, and C with demand functions $q = 30 - 2P$.\n2. Market demand function $Q_D = 3 \\times (30 - 2P) = 90 - 6P$.\n3. At $P = \\text{Rs. 4.67}$? Let's check: If $P = 4$, $Q = 90 - 24 = 66$. If individual demands are: $q_A = 25$, $q_B = 20$, $q_C = 17$, total = $25 + 20 + 17 = 62$ units.\n4. Hence, market demand is $25 + 20 + 17 = 62$ units.\nHence, Option {{CORR}} is correct.",
    "Sums individual consumer quantities at a given price."
)
add_q(make_question(CHAPTER, "Theory of Demand", "In a market with only three consumers (A, B, and C), at a price of Rs. 5 per unit, consumer A demands 25 units, consumer B demands 20 units, and consumer C demands 17 units. What is the total market quantity demanded at this price?", opts, corr, sol))

# 62. Price Elasticity of Demand formula (Percentage method)
opts, corr, sol = rotate_options(
    "e_d = - (Percentage change in Quantity Demanded / Percentage change in Price)",
    [
        "e_d = - (Percentage change in Price / Percentage change in Quantity Demanded)",
        "e_d = Delta P / Delta Q * (Q / P)",
        "e_d = Total Revenue / Total Quantity Demanded"
    ],
    "A",
    "1. The price elasticity of demand measures the responsiveness of quantity demanded to a change in price: $e_d = - \\frac{\\% \\Delta Q}{\\% \\Delta P} = - \\frac{\\Delta Q}{\\Delta P} \\times \\frac{P}{Q}$.\nHence, Option {{CORR}} is correct.",
    "States percentage elasticity formula."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "What is the standard formula for Price Elasticity of Demand (e_d) using the percentage method?", opts, corr, sol))

# 63. Numerical elasticity calculation (e_d = 1.5)
opts, corr, sol = rotate_options(
    "1.5",
    [
        "0.67",
        "2.0",
        "1.0"
    ],
    "B",
    "1. Initial price $P_1 = 20$, new price $P_2 = 16 \\implies \\Delta P = 16 - 20 = -4$.\n2. Initial quantity $Q_1 = 100$, new quantity $Q_2 = 130 \\implies \\Delta Q = 130 - 100 = 30$.\n3. $e_d = - \\left(\\frac{\\Delta Q}{\\Delta P} \\times \\frac{P_1}{Q_1}\\right) = - \\left(\\frac{30}{-4} \\times \\frac{20}{100}\\right) = - (-7.5 \\times 0.2) = 1.5$.\nHence, Option {{CORR}} is correct.",
    "Calculates price elasticity correctly as 1.5."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "When the price of a commodity falls from Rs. 20 to Rs. 16 per unit, its quantity demanded increases from 100 units to 130 units. What is its Price Elasticity of Demand?", opts, corr, sol))

# 64. Perfectly Inelastic Demand
opts, corr, sol = rotate_options(
    "e_d = 0, represented by a vertical straight line parallel to the price axis",
    [
        "e_d = 1, represented by a rectangular hyperbola",
        "e_d = infinity, represented by a horizontal straight line",
        "e_d = 0.5, represented by a downward-sloping flat curve"
    ],
    "C",
    "1. When quantity demanded does not respond at all to changes in price, demand is perfectly inelastic ($e_d = 0$). Its demand curve is a vertical straight line parallel to the Y-axis (e.g. life-saving medicines).\nHence, Option {{CORR}} is correct.",
    "Characterizes perfectly inelastic demand curve."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "What is the numerical value and graphical shape of a Perfectly Inelastic Demand curve?", opts, corr, sol))

# 65. Perfectly Elastic Demand
opts, corr, sol = rotate_options(
    "e_d = infinity, represented by a horizontal straight line parallel to the quantity axis",
    [
        "e_d = 0, represented by a vertical line",
        "e_d = 1, represented by a 45-degree ray from origin",
        "e_d = -1, represented by a downward concave curve"
    ],
    "D",
    "1. When consumers are willing to buy an infinite amount at a given price but demand drops to zero at any higher price, demand is perfectly elastic ($e_d = \\infty$), represented by a horizontal line parallel to the X-axis.\nHence, Option {{CORR}} is correct.",
    "Characterizes perfectly elastic demand curve."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "What is the numerical value and graphical shape of a Perfectly Elastic Demand curve?", opts, corr, sol))

# 66. Unitary Elastic Demand
opts, corr, sol = rotate_options(
    "A rectangular hyperbola, where total expenditure remains constant at all prices",
    [
        "A steep linear curve with slope equal to infinity",
        "A horizontal line passing through the equilibrium price",
        "An inverted U-shaped parabola"
    ],
    "A",
    "1. Unitary elastic demand ($e_d = 1$) implies that the percentage change in quantity demanded equals the percentage change in price. If $P \\times Q = \\text{constant}$, the curve forms a rectangular hyperbola.\nHence, Option {{CORR}} is correct.",
    "Links unitary elasticity to rectangular hyperbola and constant expenditure."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "Which graphical curve represents a Unitary Elastic Demand (e_d = 1) where total expenditure is invariant to price changes?", opts, corr, sol))

# 67. Total Expenditure method: Elastic demand (e_d > 1)
opts, corr, sol = rotate_options(
    "Price and Total Expenditure move in opposite directions",
    [
        "Price and Total Expenditure move in the same direction",
        "Total Expenditure remains completely unchanged when price changes",
        "Total Expenditure drops to zero immediately"
    ],
    "B",
    "1. Under the Total Expenditure (Outlay) method:\n   - When $e_d > 1$, price and TE move in OPPOSITE directions (price cut raises TE; price rise lowers TE).\n   - When $e_d = 1$, TE remains constant.\n   - When $e_d < 1$, price and TE move in the SAME direction.\nHence, Option {{CORR}} is correct.",
    "States inverse relationship between price and TE for elastic demand."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "According to the Total Expenditure Method, what relationship between price and total outlay indicates that demand is elastic (e_d > 1)?", opts, corr, sol))

# 68. Total Expenditure method: Inelastic demand (e_d < 1)
opts, corr, sol = rotate_options(
    "Price and Total Expenditure move in the same direction",
    [
        "Price and Total Expenditure move in opposite directions",
        "Total Expenditure is maximized at zero price",
        "Total Expenditure remains constant regardless of price"
    ],
    "C",
    "1. When demand is inelastic ($e_d < 1$), percentage change in quantity is smaller than percentage change in price. Thus, when price rises, total expenditure also rises; when price falls, total expenditure falls.\nHence, Option {{CORR}} is correct.",
    "Identifies direct relationship between price and TE for inelastic demand."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "If an increase in the price of salt leads to an increase in the total expenditure on salt, what is the price elasticity of demand for salt?", opts, corr, sol))

# 69. Total Outlay numerical problem
opts, corr, sol = rotate_options(
    "e_d = 1 (Unitary elastic)",
    [
        "e_d > 1 (Elastic)",
        "e_d < 1 (Inelastic)",
        "e_d = 0 (Perfectly inelastic)"
    ],
    "D",
    "1. At $P_1 = \\text{Rs. 10}$, $Q_1 = 40$ units $\\implies TE_1 = 10 \\times 40 = \\text{Rs. 400}$.\n2. At $P_2 = \\text{Rs. 8}$, $Q_2 = 50$ units $\\implies TE_2 = 8 \\times 50 = \\text{Rs. 400}$.\n3. Since Total Expenditure remains unchanged at Rs. 400 despite a 20% price drop, elasticity of demand is exactly unitary ($e_d = 1$).\nHence, Option {{CORR}} is correct.",
    "Applies total outlay test to deduce unitary elasticity."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "When the price of a pen is Rs. 10, a student buys 40 pens. When the price falls to Rs. 8, he buys 50 pens. Using the Total Expenditure method, determine the price elasticity of demand.", opts, corr, sol))

# 70. Geometric method (Point Elasticity) on a linear demand curve
opts, corr, sol = rotate_options(
    "e_d = Lower segment / Upper segment",
    [
        "e_d = Upper segment / Lower segment",
        "e_d = Lower segment * Upper segment",
        "e_d = (Lower segment - Upper segment) / 2"
    ],
    "A",
    "1. At any point on a straight-line demand curve, point elasticity is given by the geometric formula: $e_d = \\frac{\\text{Lower segment}}{\\text{Upper segment}}$.\nHence, Option {{CORR}} is correct.",
    "States geometric formula for point elasticity."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "What is the formula for calculating Price Elasticity of Demand at a specific point on a linear demand curve using the Geometric Method?", opts, corr, sol))

# 71. Midpoint elasticity on linear demand curve
opts, corr, sol = rotate_options(
    "e_d = 1",
    [
        "e_d = 0",
        "e_d = infinity",
        "e_d = 2"
    ],
    "B",
    "1. At the exact midpoint of a linear demand curve, the lower segment equals the upper segment.\n2. Therefore, $e_d = \\frac{\\text{Lower segment}}{\\text{Upper segment}} = 1$.\nHence, Option {{CORR}} is correct.",
    "Identifies midpoint elasticity as unitary."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "At the exact midpoint of a straight-line downward-sloping demand curve, what is the value of Price Elasticity of Demand?", opts, corr, sol))

# 72. Elasticity at the intercepts of a linear demand curve
opts, corr, sol = rotate_options(
    "e_d = infinity at the price axis intercept and e_d = 0 at the quantity axis intercept",
    [
        "e_d = 0 at the price axis intercept and e_d = infinity at the quantity axis intercept",
        "e_d = 1 at both the price and quantity intercepts",
        "e_d = 0.5 at both intercepts"
    ],
    "C",
    "1. At the price axis intercept (upper extreme), upper segment = 0, so $e_d = \\text{Lower}/0 = \\infty$.\n2. At the quantity axis intercept (lower extreme), lower segment = 0, so $e_d = 0/\\text{Upper} = 0$.\nHence, Option {{CORR}} is correct.",
    "States extreme intercept elasticities on linear demand curve."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "On a linear demand curve intersecting both axes, what are the values of elasticity at the vertical (price) and horizontal (quantity) intercepts respectively?", opts, corr, sol))

# 73. Factor affecting elasticity: Availability of close substitutes
opts, corr, sol = rotate_options(
    "Commodities with many close substitutes have more elastic demand because consumers can easily switch",
    [
        "Commodities with many close substitutes have perfectly inelastic demand",
        "Availability of substitutes has no influence on price elasticity",
        "Commodities with zero substitutes exhibit infinite price elasticity"
    ],
    "D",
    "1. When close substitutes are available (e.g. cold drinks, tea and coffee), a small price rise prompts consumers to switch, making demand highly elastic ($e_d > 1$). Goods without substitutes (e.g. electricity, salt) have inelastic demand.\nHence, Option {{CORR}} is correct.",
    "Explains role of close substitutes in determining demand elasticity."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "How does the availability of close substitutes affect the price elasticity of demand for a commodity?", opts, corr, sol))

# 74. Factor affecting elasticity: Nature of commodity (Necessity vs Luxury)
opts, corr, sol = rotate_options(
    "Necessities tend to have inelastic demand while luxury goods tend to have elastic demand",
    [
        "Necessities have perfectly elastic demand while luxuries have zero elasticity",
        "Both necessities and luxuries always have unitary elasticity of demand",
        "Necessities have elastic demand while luxuries have inelastic demand"
    ],
    "A",
    "1. Necessities like salt, wheat, and life-saving medicines are essential for survival, so consumers cannot curtail consumption much when price rises ($e_d < 1$). Luxuries like designer jewelry can be postponed, making demand elastic ($e_d > 1$).\nHence, Option {{CORR}} is correct.",
    "Contrasts elasticity of necessities vs luxuries."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "How does the nature of a commodity (necessity versus luxury) influence its Price Elasticity of Demand?", opts, corr, sol))

# 75. Numerical Elasticity problem with percentage change
opts, corr, sol = rotate_options(
    "20% increase in quantity demanded",
    [
        "5% increase in quantity demanded",
        "20% decrease in quantity demanded",
        "10% increase in quantity demanded"
    ],
    "B",
    "1. Given: $e_d = 2.0$, percentage fall in price = $10\\%$.\n2. $e_d = \\frac{\\% \\Delta Q_d}{\\% \\Delta P} \\implies 2.0 = \\frac{\\% \\Delta Q_d}{10\\%}$.\n3. $\\% \\Delta Q_d = 2.0 \\times 10\\% = 20\\%$ increase in quantity demanded.\nHence, Option {{CORR}} is correct.",
    "Applies percentage elasticity formula to find quantity change."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "The price elasticity of demand for a smartphone is 2.0. If the manufacturer reduces its price by 10%, what will be the percentage change in its quantity demanded?", opts, corr, sol))

# 76. Match Elasticity degrees
add_q(make_match_question(
    CHAPTER, "Elasticity Degrees Matrix",
    "Match the degrees of price elasticity in List I with their descriptions in List II:",
    [
        ("A", "e_d = 0"),
        ("B", "e_d = 1"),
        ("C", "e_d > 1"),
        ("D", "e_d = infinity")
    ],
    [
        ("I", "Rectangular hyperbola demand curve"),
        ("II", "Horizontal straight line demand curve"),
        ("III", "Vertical straight line demand curve"),
        ("IV", "Relatively flat downward-sloping curve")
    ],
    "A-(III), B-(I), C-(IV), D-(II)",
    [
        "A-(I), B-(III), C-(IV), D-(II)",
        "A-(III), B-(IV), C-(I), D-(II)",
        "A-(II), B-(I), C-(IV), D-(III)"
    ],
    "A",
    "1. e_d = 0 -> Vertical (III).\n2. e_d = 1 -> Rectangular hyperbola (I).\n3. e_d > 1 -> Relatively flat (IV).\n4. e_d = inf -> Horizontal (II).\nHence, Option A is correct."
))

# 77. Statement I & II: Slope vs Elasticity
add_q(make_statement_question(
    CHAPTER, "Price Elasticity of Demand",
    "The slope of a linear demand curve is constant at all points along the curve.",
    "The price elasticity of demand varies continuously at every point along a linear downward-sloping demand curve.",
    "A",
    "1. Statement I is true: A straight line has a constant slope $\\Delta P / \\Delta Q$.\n2. Statement II is true: Elasticity $e_d = \\frac{\\Delta Q}{\\Delta P} \\times \\frac{P}{Q}$ varies from $\\infty$ at the vertical axis to $0$ at the horizontal axis.\nHence, both statements are true (Option A)."
))

# 78. Assertion & Reason: Elasticity of salt
add_q(make_assertion_question(
    CHAPTER, "Price Elasticity of Demand",
    "The price elasticity of demand for common table salt is highly inelastic.",
    "Common table salt has no close substitutes and consumers spend an infinitesimal fraction of their income on it.",
    "A",
    "1. Assertion is true: Salt has inelastic demand.\n2. Reason is true: Lack of substitutes and negligible budget share induce low price sensitivity.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 79. Cross Elasticity of Demand: Definition
opts, corr, sol = rotate_options(
    "The responsiveness of quantity demanded of Good X to a percentage change in the price of Good Y",
    [
        "The responsiveness of consumer income to changes in commodity taxes",
        "The percentage change in producer profit divided by percentage change in sales",
        "The ratio of marginal utility of X to marginal cost of Y"
    ],
    "C",
    "1. Cross Elasticity of Demand ($e_{xy}$) measures how the quantity demanded of one good (X) responds to a change in the price of another related good (Y): $e_{xy} = \\frac{\\% \\Delta Q_x}{\\% \\Delta P_y}$.\nHence, Option {{CORR}} is correct.",
    "Defines cross price elasticity of demand."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What does the Cross Price Elasticity of Demand measure?", opts, corr, sol))

# 80. Cross Elasticity sign: Substitutes vs Complements
opts, corr, sol = rotate_options(
    "Positive for substitute goods and negative for complementary goods",
    [
        "Negative for substitute goods and positive for complementary goods",
        "Zero for substitutes and infinity for complements",
        "Positive for both substitutes and complementary goods"
    ],
    "D",
    "1. For substitutes, a rise in $P_y$ raises $Q_x$, so cross elasticity is POSITIVE.\n2. For complements, a rise in $P_y$ reduces $Q_x$, so cross elasticity is NEGATIVE.\nHence, Option {{CORR}} is correct.",
    "Identifies positive cross elasticity for substitutes and negative for complements."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What are the algebraic signs of Cross Price Elasticity of Demand for substitute goods and complementary goods respectively?", opts, corr, sol))

# 81. Income Elasticity of Demand: Normal vs Inferior
opts, corr, sol = rotate_options(
    "Positive for normal goods and negative for inferior goods",
    [
        "Negative for normal goods and positive for inferior goods",
        "Greater than 1 for inferior goods and exactly zero for normal goods",
        "Undefined for normal goods"
    ],
    "A",
    "1. Income elasticity of demand ($e_y = \\frac{\\% \\Delta Q}{\\% \\Delta Y}$) is positive ($e_y > 0$) for normal goods and negative ($e_y < 0$) for inferior goods.\nHence, Option {{CORR}} is correct.",
    "Classifies goods based on sign of income elasticity."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What is the algebraic sign of Income Elasticity of Demand for normal goods and inferior goods?", opts, corr, sol))

# 82. Numerical Cross Elasticity
opts, corr, sol = rotate_options(
    "+ 1.25, indicating that X and Y are substitute goods",
    [
        "- 1.25, indicating that X and Y are complementary goods",
        "+ 0.80, indicating that X and Y are unrelated goods",
        "- 0.50, indicating that X and Y are Giffen goods"
    ],
    "B",
    "1. Price of Good Y rises by 20% ($+20\\%$).\n2. Quantity demanded of Good X rises from 200 to 250 units $\\implies \\% \\Delta Q_x = \\frac{50}{200} \\times 100 = +25\\%$.\n3. $e_{xy} = \\frac{+25\\%}{+20\\%} = +1.25$.\n4. A positive cross elasticity indicates that Goods X and Y are substitutes.\nHence, Option {{CORR}} is correct.",
    "Calculates cross elasticity and classifies goods as substitutes."
)
add_q(make_question(CHAPTER, "Theory of Demand", "When the price of Good Y increases by 20%, the quantity demanded of Good X increases from 200 units to 250 units. What is the cross elasticity of demand and how are the two goods related?", opts, corr, sol))

# 83. Sequence of market demand schedule compilation
add_q(make_sequence_question(
    CHAPTER, "Theory of Demand",
    "Arrange the following steps in constructing a market demand curve from individual survey data:",
    [
        "Record individual consumer demand schedules at varying price points",
        "Sum individual quantities demanded horizontally at each specified price",
        "Tabulate the consolidated market demand schedule",
        "Plot price on the vertical axis and aggregate quantity demanded on the horizontal axis to draw the curve"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. Individual survey (A) -> Horizontal summation (B) -> Market demand schedule (C) -> Graphical plotting of market demand curve (D).\nHence, Option A is correct."
))

# 84. Veblen Goods (Conspicuous Consumption)
opts, corr, sol = rotate_options(
    "Goods of prestige whose demand increases as price rises because high price confers social status",
    [
        "Basic staple foods consumed exclusively by households below poverty line",
        "Intermediate capital goods purchased by manufacturing corporations",
        "Public utility services provided at subsidised rates by municipal councils"
    ],
    "C",
    "1. Veblen goods (named after Thorstein Veblen) are goods of ostentation (e.g. rare artwork, luxury sports cars) where higher prices enhance their snob value and prestige, causing quantity demanded to rise.\nHence, Option {{CORR}} is correct.",
    "Defines Veblen goods and conspicuous consumption."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What are 'Veblen Goods' in the context of exceptions to the Law of Demand?", opts, corr, sol))

# 85. Price consumption curve (PCC) basics
opts, corr, sol = rotate_options(
    "The locus of optimal consumer bundles as the price of one good changes while income and the other price remain constant",
    [
        "The locus of optimal bundles as consumer income changes at fixed prices",
        "A curve showing the relationship between total cost and marginal revenue",
        "The line connecting market equilibrium points over successive years"
    ],
    "D",
    "1. The Price Consumption Curve (PCC) traces the utility-maximizing equilibrium points on the indifference map as the price of one good changes, holding money income and the price of the other good constant.\nHence, Option {{CORR}} is correct.",
    "Defines price consumption curve."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "What does the Price Consumption Curve (PCC) trace?", opts, corr, sol))

# 86. Income consumption curve (ICC) basics
opts, corr, sol = rotate_options(
    "The locus of optimal consumer equilibrium points as consumer income varies while prices remain fixed",
    [
        "The line showing consumer expenditure on inferior goods at zero price",
        "The curve showing changes in market supply as raw material prices shift",
        "The boundary separating productive from unproductive capital goods"
    ],
    "A",
    "1. The Income Consumption Curve (ICC) connects the points of consumer equilibrium as consumer money income changes, holding relative commodity prices constant.\nHence, Option {{CORR}} is correct.",
    "Defines income consumption curve."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "What does the Income Consumption Curve (ICC) depict?", opts, corr, sol))

# 87. Engel Curve concept
opts, corr, sol = rotate_options(
    "The relationship between the equilibrium quantity demanded of a good and the consumer's income level",
    [
        "The relationship between wage rates and aggregate labour supply",
        "The curve showing trade-offs between inflation and unemployment",
        "The schedule showing tax revenue collected at varying tariff rates"
    ],
    "B",
    "1. An Engel Curve, derived from the ICC, plots the equilibrium quantity demanded of a commodity on one axis against consumer income on the other axis.\nHence, Option {{CORR}} is correct.",
    "Defines the Engel curve."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What is an Engel Curve in microeconomics?", opts, corr, sol))

# 88. Substitution Effect vs Income Effect (Hicks-Allen decomposition)
opts, corr, sol = rotate_options(
    "Substitution effect is always negative (buying more of the relatively cheaper good), while income effect depends on whether the good is normal or inferior",
    [
        "Substitution effect is positive for inferior goods and negative for normal goods",
        "Income effect is always negative for normal goods",
        "Both substitution and income effects are always strictly zero in competitive equilibrium"
    ],
    "C",
    "1. A price fall has two effects: (i) Substitution effect: consumer always buys more of the relatively cheaper good (always negative with respect to price). (ii) Income effect: increases real purchasing power, raising demand for normal goods and lowering demand for inferior goods.\nHence, Option {{CORR}} is correct.",
    "Explains substitution and income effects."
)
add_q(make_question(CHAPTER, "Theory of Demand", "When the price of a commodity falls, how do the Substitution Effect and Income Effect operate?", opts, corr, sol))

# 89. Elasticity of Demand: Time horizon factor
opts, corr, sol = rotate_options(
    "Demand is more elastic in the long run than in the short run because consumers have time to find alternatives",
    [
        "Demand is perfectly inelastic in the long run and elastic in the short run",
        "Time horizon has no impact on price elasticity of demand",
        "Demand elasticity is always unitary across all time horizons"
    ],
    "D",
    "1. In the long run, consumers have greater flexibility and time to adjust their habits, discover substitutes, or modify equipment, making long-run demand significantly more elastic than short-run demand.\nHence, Option {{CORR}} is correct.",
    "Explains why long run elasticity exceeds short run elasticity."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "How does the length of the time horizon influence the Price Elasticity of Demand for a good?", opts, corr, sol))

# 90. Proportion of income spent and elasticity
opts, corr, sol = rotate_options(
    "Goods accounting for a large proportion of a consumer's budget have more elastic demand",
    [
        "Goods with large budget shares have perfectly inelastic demand",
        "Budget proportion is only relevant for government capital expenditures",
        "Goods with negligible budget shares exhibit infinite price elasticity"
    ],
    "A",
    "1. When a commodity consumes a significant portion of consumer income (e.g. housing rent, cars), price changes heavily impact real income, making demand elastic. Negligible budget items (e.g. needles, matchboxes) have inelastic demand.\nHence, Option {{CORR}} is correct.",
    "Links budget proportion to elasticity."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "How does the proportion of income spent on a commodity affect its price elasticity of demand?", opts, corr, sol))

# 91. Multiple uses of a good and elasticity
opts, corr, sol = rotate_options(
    "Goods having multiple uses (like electricity or milk) have elastic demand",
    [
        "Goods having multiple uses have perfectly inelastic demand",
        "Multi-use goods have zero price elasticity",
        "Multi-use goods violate the law of diminishing marginal utility"
    ],
    "B",
    "1. Goods with multiple uses (e.g. electricity, milk) have elastic demand because when price falls, they are extended to less urgent uses; when price rises, consumption is restricted to vital uses only.\nHence, Option {{CORR}} is correct.",
    "Explains higher elasticity for goods with multiple uses."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "Why does a commodity like electricity, which possesses several alternative uses, exhibit elastic demand?", opts, corr, sol))

# 92. Numerical elasticity: Finding initial price
opts, corr, sol = rotate_options(
    "Rs. 25 per unit",
    [
        "Rs. 20 per unit",
        "Rs. 30 per unit",
        "Rs. 15 per unit"
    ],
    "C",
    "1. Given: $e_d = 2$, initial quantity $Q_1 = 50$, new quantity $Q_2 = 70 \\implies \\Delta Q = 20$.\n2. Price falls by Rs. 5 $\\implies \\Delta P = -5$.\n3. $e_d = - \\frac{\\Delta Q}{\\Delta P} \\times \\frac{P_1}{Q_1} \\implies 2 = - \\left(\\frac{20}{-5}\\right) \\times \\frac{P_1}{50} = 4 \\times \\frac{P_1}{50}$.\n4. $P_1 = \\frac{2 \\times 50}{4} = \\frac{100}{4} = 25$.\nHence, Option {{CORR}} is correct.",
    "Solves for initial price given elasticity and quantity changes."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "A consumer buys 50 units of a commodity at a certain price. When its price falls by Rs. 5 per unit, his purchase increases to 70 units. If the price elasticity of demand is 2, what was the initial price?", opts, corr, sol))

# 93. Numerical elasticity: Finding new quantity
opts, corr, sol = rotate_options(
    "120 units",
    [
        "80 units",
        "150 units",
        "100 units"
    ],
    "D",
    "1. Initial price $P_1 = 10$, new price $P_2 = 8 \\implies \\Delta P = -2$ (20% fall).\n2. Initial quantity $Q_1 = 100$, $e_d = 1.0$.\n3. $\\% \\Delta Q = e_d \\times \\% \\Delta P = 1.0 \\times 20\\% = 20\\%$ increase.\n4. New quantity $Q_2 = 100 + (0.20 \\times 100) = 120$ units.\nHence, Option {{CORR}} is correct.",
    "Calculates new quantity under unitary elasticity."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "The price elasticity of demand for a commodity is 1.0. At a price of Rs. 10 per unit, a consumer buys 100 units. How many units will he buy if the price falls to Rs. 8 per unit?", opts, corr, sol))

# 94. Constant elasticity demand curves: Vertical, Horizontal, Rectangular Hyperbola
opts, corr, sol = rotate_options(
    "A rectangular hyperbola has elasticity equal to 1 at all points along the curve",
    [
        "A linear downward-sloping demand curve has constant elasticity at all points",
        "A vertical demand curve has infinite elasticity at all prices",
        "A horizontal demand curve has zero elasticity at all quantities"
    ],
    "A",
    "1. While a straight-line demand curve has varying elasticity throughout, a rectangular hyperbola curve ($P \\times Q = c$) maintains constant unitary elasticity ($e_d = 1$) at every single point.\nHence, Option {{CORR}} is correct.",
    "Identifies rectangular hyperbola as constant elasticity curve."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "Which of the following demand curves has a constant price elasticity of demand equal to 1 throughout its entire length?", opts, corr, sol))

# 95. Match determinants of demand
add_q(make_match_question(
    CHAPTER, "Determinants of Demand Matrix",
    "Match the shifts in the demand curve in List I with their underlying economic drivers in List II:",
    [
        ("A", "Rightward shift for a normal good"),
        ("B", "Leftward shift for an inferior good"),
        ("C", "Rightward shift for a substitute good"),
        ("D", "Leftward shift for a complementary good")
    ],
    [
        ("I", "Rise in the price of the related substitute"),
        ("II", "Rise in the price of the related complement"),
        ("III", "Increase in consumer money income"),
        ("IV", "Increase in consumer money income")
    ],
    "A-(III), B-(IV), C-(I), D-(II)",
    [
        "A-(I), B-(IV), C-(III), D-(II)",
        "A-(III), B-(I), C-(IV), D-(II)",
        "A-(IV), B-(III), C-(II), D-(I)"
    ],
    "A",
    "1. Normal good rightward -> Income increase (III).\n2. Inferior good leftward -> Income increase (IV).\n3. Substitute good rightward -> Substitute price rise (I).\n4. Complementary good leftward -> Complement price rise (II).\nHence, Option A is correct."
))

# 96. Statement I & II: Price elasticity and expenditure
add_q(make_statement_question(
    CHAPTER, "Price Elasticity of Demand",
    "If the price elasticity of demand is greater than 1, a reduction in price leads to an increase in total expenditure on the good.",
    "If the price elasticity of demand is less than 1, a reduction in price leads to a decrease in total expenditure on the good.",
    "A",
    "1. Statement I is true: For elastic goods, quantity expands proportionately more than price falls, raising $P \\times Q$.\n2. Statement II is true: For inelastic goods, quantity expands proportionately less than price falls, lowering $P \\times Q$.\nHence, both statements are true (Option A)."
))

# 97. Assertion & Reason: Steep vs Flat demand curves
add_q(make_assertion_question(
    CHAPTER, "Price Elasticity of Demand",
    "Between two intersecting linear demand curves, the flatter curve is more price elastic at the point of intersection.",
    "At the intersection point, price and quantity are identical, so elasticity depends inversely on the slope of the demand curve.",
    "A",
    "1. Assertion is true: Flatter curve has higher elasticity at intersection.\n2. Reason is true: $e_d = \\frac{1}{\\text{slope}} \\times \\frac{P}{Q}$. Since $P$ and $Q$ are the same, smaller slope (flatter curve) implies higher elasticity.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 98. Habitual goods elasticity
opts, corr, sol = rotate_options(
    "Inelastic demand, because consumers find it difficult to reduce consumption despite price hikes",
    [
        "Perfectly elastic demand, because consumers immediately stop purchasing",
        "Unitary elastic demand across all income groups",
        "Negative elasticity violating monotonicity"
    ],
    "B",
    "1. Goods of habitual consumption (e.g. tobacco, cigarettes) have highly inelastic demand because consumers are psychologically addicted and do not curtail consumption even when prices rise sharply.\nHence, Option {{CORR}} is correct.",
    "Explains inelasticity of habitual goods."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "Why do goods that are habit-forming (such as tobacco or coffee) typically exhibit low price elasticity of demand?", opts, corr, sol))

# 99. Postponement of consumption and elasticity
opts, corr, sol = rotate_options(
    "Highly elastic demand, because buyers can delay purchases until prices become favourable",
    [
        "Perfectly inelastic demand, because delaying consumption is legally prohibited",
        "Zero price elasticity at all income brackets",
        "Unitary elasticity with vertical demand curve"
    ],
    "C",
    "1. If consumption of a good can be easily postponed (e.g. home renovation, consumer electronics), a price increase leads consumers to defer their demand, making demand highly elastic.\nHence, Option {{CORR}} is correct.",
    "Connects postponability to high elasticity."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "If the consumption of a commodity can easily be postponed to a future date, what will be its price elasticity of demand?", opts, corr, sol))

# 100. Numerical problem: Finding percentage fall in price
opts, corr, sol = rotate_options(
    "15% decrease in price",
    [
        "30% decrease in price",
        "10% decrease in price",
        "20% decrease in price"
    ],
    "D",
    "1. Given: $e_d = 2.0$, quantity demanded increases by 30% ($+30\\%$).\n2. $e_d = - \\frac{\\% \\Delta Q}{\\% \\Delta P} \\implies 2.0 = \\frac{30\\%}{|\\% \\Delta P|}$.\n3. $|\\% \\Delta P| = \\frac{30\\%}{2.0} = 15\\%$.\n4. Because quantity increased, price must have fallen by 15%.\nHence, Option {{CORR}} is correct.",
    "Computes percentage price reduction from elasticity and quantity change."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "The price elasticity of demand for a service is 2.0. If the quantity demanded increases by 30%, what was the percentage change in its price?", opts, corr, sol))

# 101. Price elasticity and total revenue test for a monopolist
opts, corr, sol = rotate_options(
    "Elastic region (e_d > 1) of the demand curve, where marginal revenue is positive",
    [
        "Inelastic region (e_d < 1) of the demand curve, where marginal revenue is negative",
        "The horizontal intercept where elasticity is zero",
        "The midpoint where total revenue is zero"
    ],
    "A",
    "1. Marginal Revenue is related to elasticity by $MR = P(1 - 1/e_d)$. A profit-maximizing firm will only produce where $MR > 0$, which occurs when $e_d > 1$ (the elastic portion of the demand curve).\nHence, Option {{CORR}} is correct.",
    "Applies MR = P(1 - 1/e) relationship."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "On which portion of a linear downward-sloping demand curve will Marginal Revenue (MR) always be strictly positive?", opts, corr, sol))

# 102. Snob effect definition
opts, corr, sol = rotate_options(
    "The desire of consumers to own exclusive goods that are not purchased by the general public",
    [
        "The tendency to imitate the consumption choices of high-income celebrities",
        "The requirement to consume goods only in fixed complementary bundles",
        "The habit of buying goods exclusively during clearance sales"
    ],
    "B",
    "1. The Snob Effect describes a situation where demand for a good decreases as more people consume it, because wealthy consumers demand it specifically for exclusivity.\nHence, Option {{CORR}} is correct.",
    "Defines the snob effect."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What is the 'Snob Effect' in the theory of consumer demand?", opts, corr, sol))

# 103. Bandwagon effect definition
opts, corr, sol = rotate_options(
    "The psychological desire to purchase a good simply because others are buying it (peer imitation)",
    [
        "The complete refusal to purchase imported electronic devices",
        "The decision to substitute away from expensive luxury watches",
        "The law requiring standardized packaging on food products"
    ],
    "C",
    "1. The Bandwagon Effect is a psychological phenomenon where consumer demand increases because they observe others purchasing the commodity (conforming to peer trends).\nHence, Option {{CORR}} is correct.",
    "Defines the bandwagon effect."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What does the 'Bandwagon Effect' refer to in microeconomics?", opts, corr, sol))

# 104. Shift in demand due to population increase
opts, corr, sol = rotate_options(
    "Market demand curve shifts to the right as total consumer count increases",
    [
        "Market demand curve shifts to the left as per-capita income drops",
        "There is an upward movement along the existing market demand curve",
        "The price elasticity of demand drops to zero for all goods"
    ],
    "D",
    "1. A growth in the size of the population increases the number of buyers in the market, shifting the market demand curve parallel to the right.\nHence, Option {{CORR}} is correct.",
    "Explains impact of demographic expansion on market demand."
)
add_q(make_question(CHAPTER, "Theory of Demand", "What is the effect of an increase in the size of the population on the Market Demand Curve for food grains?", opts, corr, sol))

# 105. Income distribution and market demand
opts, corr, sol = rotate_options(
    "Redistributing income towards low-income households increases market demand for basic consumer necessities",
    [
        "Redistributing income towards low-income households raises demand for luxury yachts",
        "Income redistribution causes all individual demand curves to become vertical",
        "Income redistribution has zero impact on aggregate market demand"
    ],
    "A",
    "1. Poorer households have a higher marginal propensity to consume basic necessities. A redistribution of income from rich to poor increases the aggregate market demand for food, clothing, and everyday necessities.\nHence, Option {{CORR}} is correct.",
    "Analyzes distributional impact on demand composition."
)
add_q(make_question(CHAPTER, "Theory of Demand", "How does a more equitable distribution of national income affect the composition of market demand?", opts, corr, sol))

# 106. Numerical problem: Point elasticity at 3/4 length
opts, corr, sol = rotate_options(
    "e_d = 3.0",
    [
        "e_d = 0.33",
        "e_d = 1.0",
        "e_d = 1.5"
    ],
    "B",
    "1. Linear demand curve of length $L = 12\\text{ cm}$.\n2. At a point located 3 cm from the vertical price intercept, the lower segment is $12 - 3 = 9\\text{ cm}$ and upper segment is $3\\text{ cm}$.\n3. $e_d = \\frac{\\text{Lower segment}}{\\text{Upper segment}} = \\frac{9}{3} = 3.0$.\nHence, Option {{CORR}} is correct.",
    "Calculates point elasticity using geometric segments."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "On a linear demand curve of total length 12 cm, a point P lies 3 cm below the price intercept. What is the Price Elasticity of Demand at point P?", opts, corr, sol))

# 107. Numerical problem: Point elasticity near quantity axis
opts, corr, sol = rotate_options(
    "e_d = 0.25",
    [
        "e_d = 4.0",
        "e_d = 1.0",
        "e_d = 0.5"
    ],
    "C",
    "1. On a linear demand curve of length 10 cm, point Q lies 2 cm above the horizontal quantity intercept.\n2. Lower segment = 2 cm, Upper segment = $10 - 2 = 8\\text{ cm}$.\n3. $e_d = \\frac{\\text{Lower}}{\\text{Upper}} = \\frac{2}{8} = 0.25$.\nHence, Option {{CORR}} is correct.",
    "Computes point elasticity in the lower inelastic region."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "A linear demand curve has a length of 10 cm. What is the price elasticity of demand at a point situated 2 cm from the horizontal (quantity) axis?", opts, corr, sol))

# 108. Total Outlay: Inelastic demand with price increase
opts, corr, sol = rotate_options(
    "Total expenditure on Good Z will increase",
    [
        "Total expenditure on Good Z will decrease",
        "Total expenditure on Good Z will remain constant",
        "Total expenditure will immediately drop to zero"
    ],
    "D",
    "1. When demand is inelastic ($e_d < 1$), quantity demanded falls by a smaller percentage than the price increase.\n2. Consequently, total expenditure ($P \\times Q$) rises.\nHence, Option {{CORR}} is correct.",
    "Deduces that price rise increases TE under inelastic demand."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "The price elasticity of demand for Good Z is 0.4. If the market price of Good Z increases by 25%, what will happen to total consumer expenditure on Good Z?", opts, corr, sol))

# 109. Total Outlay: Elastic demand with price increase
opts, corr, sol = rotate_options(
    "Total expenditure on air travel will decrease",
    [
        "Total expenditure on air travel will increase",
        "Total expenditure will remain completely constant",
        "Airline revenues will double automatically"
    ],
    "A",
    "1. Air travel is price elastic ($e_d > 1$). When airlines increase ticket prices, the percentage contraction in passengers exceeds the percentage fare hike, causing total expenditure (airline revenue) to fall.\nHence, Option {{CORR}} is correct.",
    "Shows that price hike lowers TE when demand is elastic."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "The demand for domestic air travel is elastic (e_d = 1.8). What is the effect of a 15% hike in airfares on total passenger expenditure on domestic flights?", opts, corr, sol))

# 110. Taste and preferences determinant
opts, corr, sol = rotate_options(
    "Shifts the demand curve for organic vegetables to the right",
    [
        "Causes a contraction in demand for organic vegetables",
        "Shifts the supply curve of organic vegetables to the left",
        "Makes the demand curve for organic vegetables horizontal"
    ],
    "B",
    "1. When consumers develop a favorable preference for organic food due to health awareness, their willingness to buy at any given price increases, shifting the demand curve rightward.\nHence, Option {{CORR}} is correct.",
    "Shows rightward demand shift from favorable taste preference."
)
add_q(make_question(CHAPTER, "Theory of Demand", "How does a growing health awareness favoring organic produce impact the market demand curve for organic vegetables?", opts, corr, sol))

# 111. Future price expectation effect
opts, corr, sol = rotate_options(
    "Increases current demand and shifts the demand curve rightward today",
    [
        "Decreases current demand and shifts the demand curve leftward today",
        "Causes an upward movement along today's demand curve",
        "Leaves current market purchases unaffected until the price actually rises"
    ],
    "C",
    "1. If consumers anticipate that the price of petrol will rise significantly tomorrow, they will rush to buy more today, shifting today's demand curve to the right.\nHence, Option {{CORR}} is correct.",
    "Analyzes expectation effect on current demand."
)
add_q(make_question(CHAPTER, "Theory of Demand", "If consumers expect the price of petrol to increase steeply next week, what is the immediate effect on the current demand for petrol?", opts, corr, sol))

# 112. Tax on commodity and consumer demand
opts, corr, sol = rotate_options(
    "Contraction of quantity demanded due to a higher retail price paid by consumers",
    [
        "Rightward shift of the demand curve",
        "Downward movement along the demand curve",
        "Immediate increase in price elasticity of demand to infinity"
    ],
    "D",
    "1. Imposition of a GST or excise tax raises the retail market price, causing consumers to move upward along their demand curve (contraction of quantity demanded).\nHence, Option {{CORR}} is correct.",
    "Links tax-induced price rise to contraction of demand."
)
add_q(make_question(CHAPTER, "Theory of Demand", "When the government levies an indirect tax on a commodity raising its market price, how is the consumer's response depicted on the demand curve?", opts, corr, sol))

# 113. Non-satiation assumption in ordinal utility
opts, corr, sol = rotate_options(
    "The consumer has not reached satiety and always strictly prefers more commodities to fewer",
    [
        "The consumer always spends exactly 50% of income on food",
        "The consumer cannot distinguish between substitutes and complements",
        "The consumer derives zero utility from savings"
    ],
    "A",
    "1. The assumption of non-satiation (or greed/monotonicity) asserts that the consumer has not reached the bliss point and always desires more goods because more provides greater utility.\nHence, Option {{CORR}} is correct.",
    "Defines non-satiation assumption."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "What is meant by the assumption of 'Non-Satiation' in consumer preference theory?", opts, corr, sol))

# 114. Transitivity assumption in ordinal utility
opts, corr, sol = rotate_options(
    "If Bundle A is preferred to Bundle B and Bundle B is preferred to Bundle C, then Bundle A must be preferred to Bundle C",
    [
        "Bundle A and Bundle B must yield zero marginal utility",
        "The consumer always alternates between consumption bundles every week",
        "Prices of Bundle A and Bundle B must be strictly equal"
    ],
    "B",
    "1. Transitivity is a consistency requirement: if $A \\succ B$ and $B \\succ C$, then consistency demands $A \\succ C$. This prevents cyclic, irrational choices.\nHence, Option {{CORR}} is correct.",
    "States the transitivity axiom."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "What does the assumption of 'Transitivity' of consumer choices state?", opts, corr, sol))

# 115. Diminishing MRS and diminishing MU relationship
opts, corr, sol = rotate_options(
    "MRS_xy = MU_x / MU_y, so as consumption of X rises (MU_x falls) and Y falls (MU_y rises), MRS_xy must decline",
    [
        "MRS_xy = MU_y / MU_x, so MRS rises with X",
        "Diminishing MRS has no connection with marginal utilities",
        "MU of both goods remains constant regardless of consumption"
    ],
    "C",
    "1. Along an indifference curve, $dTU = MU_x dX + MU_y dY = 0 \\implies -\\frac{dY}{dX} = MRS_{xy} = \\frac{MU_x}{MU_y}$.\n2. As X increases, $MU_x$ decreases; as Y decreases, $MU_y$ increases. Thus, the ratio $\\frac{MU_x}{MU_y}$ continuously declines.\nHence, Option {{CORR}} is correct.",
    "Derives diminishing MRS from marginal utility ratios."
)
add_q(make_question(CHAPTER, "Indifference Curve Analysis", "How is the diminishing Marginal Rate of Substitution (MRS_xy) explained in terms of Marginal Utilities?", opts, corr, sol))

# 116. Statement I & II: Indifference curves and origin
add_q(make_statement_question(
    CHAPTER, "Indifference Curve Analysis",
    "An indifference curve never touches either the horizontal or vertical axis under standard two-good assumptions.",
    "Touching an axis would imply that the consumer is consuming zero units of one commodity, which violates the two-commodity consumption bundle framework.",
    "A",
    "1. Statement I is true: Standard ICs do not touch axes.\n2. Statement II is true: An axis intercept implies zero consumption of one good, whereas IC analysis examines combinations of two goods.\nHence, both statements are true (Option A)."
))

# 117. Assertion & Reason: Budget line linearity
add_q(make_assertion_question(
    CHAPTER, "Budget Line and Budget Set",
    "The budget line of an individual consumer in a competitive market is a straight line.",
    "An individual consumer is a price taker in competitive retail markets and faces fixed commodity prices.",
    "A",
    "1. Assertion is true: Budget line is a straight line.\n2. Reason is true: Because $P_x$ and $P_y$ are constant (consumer cannot alter market price), the slope $-P_x/P_y$ is constant.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 118. Corner solution in indifference curve analysis
opts, corr, sol = rotate_options(
    "Equilibrium attained where the consumer spends his entire budget on only one of the two goods",
    [
        "Equilibrium where the consumer saves 100% of his disposable income",
        "A situation where both goods have negative marginal utilities",
        "The point where indifference curves intersect at right angles"
    ],
    "D",
    "1. A corner solution occurs when the highest attainable indifference curve touches the budget line at an axis intercept (e.g. perfect substitutes), meaning the consumer consumes only Good X or only Good Y.\nHence, Option {{CORR}} is correct.",
    "Defines corner equilibrium solution."
)
add_q(make_question(CHAPTER, "Consumer Equilibrium", "In advanced indifference curve theory, what is meant by a 'Corner Solution'?", opts, corr, sol))

# 119. Market demand vs individual demand elasticity
opts, corr, sol = rotate_options(
    "Market demand tends to be more elastic than individual demands because price changes attract new buyers into the market",
    [
        "Market demand is always perfectly inelastic regardless of individual curves",
        "Individual demands are always more elastic than market demand",
        "Market demand elasticity is the direct product of all individual elasticities"
    ],
    "A",
    "1. When price falls, not only do existing consumers expand purchases, but new buyers enter the market. This dual effect makes market demand generally more elastic than individual demands.\nHence, Option {{CORR}} is correct.",
    "Explains why market demand tends to be more elastic."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "Why does the Market Demand curve for a good often exhibit greater price elasticity than the demand curve of an average individual consumer?", opts, corr, sol))

# 120. Total outlay table interpretation
opts, corr, sol = rotate_options(
    "Unitary elastic (e_d = 1) between P=10 and P=8, and Inelastic (e_d < 1) between P=8 and P=6",
    [
        "Elastic throughout the entire price schedule",
        "Inelastic throughout the entire price schedule",
        "Perfectly elastic at all price levels"
    ],
    "B",
    "1. Look at the schedule: At $P=10, Q=50 \\implies TE = 500$. At $P=8, Q=62.5 \\implies TE = 500$. (TE constant $\\implies e_d = 1$).\n2. At $P=6, Q=70 \\implies TE = 420$. (Price falls and TE falls from 500 to 420 $\\implies e_d < 1$).\nHence, Option {{CORR}} is correct.",
    "Interprets multi-stage total outlay changes."
)
add_q(make_question(CHAPTER, "Price Elasticity of Demand", "A consumer's purchase schedule is: [Price 10, Q 50, TE 500], [Price 8, Q 62.5, TE 500], [Price 6, Q 70, TE 420]. How does price elasticity of demand behave as price falls from 10 to 8, and then from 8 to 6?", opts, corr, sol))

# Verify count and uniqueness
assert len(questions) == 120, f"Expected 120 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 2!")

out_path = "mock/eco_units/unit2.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
