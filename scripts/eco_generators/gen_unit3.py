import json
import os
import sys

sys.path.insert(0, os.getcwd())
from scripts.eco_generators.common import (
    make_question, make_match_question, make_sequence_question,
    make_statement_question, make_assertion_question, rotate_options, normalize_text
)

CHAPTER = "Production and Costs"
questions = []
seen = set()

def add_q(q):
    norm = normalize_text(q["questionText"])
    if norm in seen:
        raise ValueError(f"Duplicate question detected: {q['questionText'][:80]}")
    seen.add(norm)
    questions.append(q)

print("Generating 120 unique questions for Unit 3: Production and Costs...")

# -------------------------------------------------------------------------------------------------
# 1. Production Function, Short Run vs Long Run, TP, AP, MP (Q1 - Q30)
# -------------------------------------------------------------------------------------------------

# 1. Production function definition
opts, corr, sol = rotate_options(
    "The technical and mathematical relationship between physical inputs and physical output",
    [
        "The relationship between total revenue and total variable cost",
        "The schedule showing consumer willingness to pay at various price levels",
        "The financial statement showing net profit after corporate taxes"
    ],
    "A",
    "1. A production function $q = f(x_1, x_2)$ specifies the maximum physical output that can be produced with given quantities of physical inputs under a given state of technology.\nHence, Option {{CORR}} is correct.",
    "Defines the production function."
)
add_q(make_question(CHAPTER, "Production Function", "What is a Production Function in microeconomic theory?", opts, corr, sol))

# 2. Short run vs Long run distinction
opts, corr, sol = rotate_options(
    "In the short run at least one factor is fixed, whereas in the long run all factors are variable",
    [
        "The short run lasts less than one calendar year while the long run exceeds five years",
        "In the short run all factor inputs are variable while in the long run all factors are fixed",
        "The short run applies only to agriculture while the long run applies to manufacturing"
    ],
    "B",
    "1. In economics, the distinction between short run and long run is operational rather than chronological: in the short run, at least one input (e.g. capital/plant) is fixed, whereas in the long run, all inputs can be adjusted.\nHence, Option {{CORR}} is correct.",
    "Distinguishes short run from long run via factor fixity."
)
add_q(make_question(CHAPTER, "Production Function", "How is the Short Run distinguished from the Long Run in production theory?", opts, corr, sol))

# 3. Average Product formula
opts, corr, sol = rotate_options(
    "AP_L = Total Product / Units of Labour (TP / L)",
    [
        "AP_L = Delta TP / Delta L",
        "AP_L = Total Cost / Output",
        "AP_L = TP * Units of Labour"
    ],
    "C",
    "1. Average Product of a variable factor (Labour) is defined as output per unit of variable factor: $AP_L = \\frac{TP}{L}$.\nHence, Option {{CORR}} is correct.",
    "Identifies formula for Average Product."
)
add_q(make_question(CHAPTER, "Production Function", "What is the formula for calculating the Average Product (AP) of the variable factor labour?", opts, corr, sol))

# 4. Marginal Product formula
opts, corr, sol = rotate_options(
    "MP_L = Delta TP / Delta L = TP_n - TP_{n-1}",
    [
        "MP_L = TP / L",
        "MP_L = Total Revenue / Units of Labour",
        "MP_L = Delta L / Delta TP"
    ],
    "D",
    "1. Marginal Product (MP) is the change in total output resulting from the employment of one additional unit of the variable input: $MP = \\frac{\\Delta TP}{\\Delta L} = TP_n - TP_{n-1}$.\nHence, Option {{CORR}} is correct.",
    "States the formula for Marginal Product."
)
add_q(make_question(CHAPTER, "Production Function", "How is the Marginal Product (MP) of labour defined mathematically?", opts, corr, sol))

# 5. Numerical MP calculation
opts, corr, sol = rotate_options(
    "12 units of output",
    [
        "60 units of output",
        "10 units of output",
        "72 units of output"
    ],
    "A",
    "1. With 5 workers, $TP_5 = 60$ units.\n2. With 6 workers, $TP_6 = 72$ units.\n3. $MP_6 = TP_6 - TP_5 = 72 - 60 = 12$ units.\nHence, Option {{CORR}} is correct.",
    "Calculates MP = TP_6 - TP_5."
)
add_q(make_question(CHAPTER, "Production Function", "A factory employs 5 workers to produce 60 chairs per day. When a 6th worker is hired, total daily production rises to 72 chairs. What is the Marginal Product of the 6th worker?", opts, corr, sol))

# 6. Numerical AP calculation
opts, corr, sol = rotate_options(
    "15 units per worker",
    [
        "20 units per worker",
        "12 units per worker",
        "60 units per worker"
    ],
    "B",
    "1. Given: Total Product $TP = 60$ units, Units of labour $L = 4$.\n2. $AP = TP / L = 60 / 4 = 15$ units per worker.\nHence, Option {{CORR}} is correct.",
    "Calculates AP = TP / L."
)
add_q(make_question(CHAPTER, "Production Function", "When 4 units of the variable factor are employed, the total product is 60 units. What is the Average Product of the variable factor?", opts, corr, sol))

# 7. Relationship between AP and MP: AP maximum
opts, corr, sol = rotate_options(
    "MP is equal to AP, and the MP curve cuts the AP curve from above at its maximum point",
    [
        "MP is equal to zero while AP is at its lowest point",
        "MP is less than AP and both curves are downward sloping",
        "Total Product reaches its absolute peak"
    ],
    "C",
    "1. When Average Product (AP) reaches its maximum, Marginal Product (MP) is exactly equal to AP ($MP = AP$). The MP curve cuts the AP curve at its highest point from above.\nHence, Option {{CORR}} is correct.",
    "Identifies MP = AP at max AP."
)
add_q(make_question(CHAPTER, "Production Function", "What is the relationship between Average Product (AP) and Marginal Product (MP) when AP reaches its maximum point?", opts, corr, sol))

# 8. Relationship between AP and MP: AP rising
opts, corr, sol = rotate_options(
    "Marginal Product is greater than Average Product (MP > AP)",
    [
        "Marginal Product is strictly less than Average Product (MP < AP)",
        "Marginal Product is equal to zero",
        "Marginal Product is negative"
    ],
    "D",
    "1. Whenever Marginal Product lies above Average Product ($MP > AP$), it pulls the average up, so Average Product rises.\nHence, Option {{CORR}} is correct.",
    "Recognizes MP > AP when AP is rising."
)
add_q(make_question(CHAPTER, "Production Function", "As long as Average Product (AP) is increasing with output, what is the relative position of Marginal Product (MP)?", opts, corr, sol))

# 9. Relationship between AP and MP: AP falling
opts, corr, sol = rotate_options(
    "Marginal Product is less than Average Product (MP < AP)",
    [
        "Marginal Product is greater than Average Product (MP > AP)",
        "Marginal Product must be negative",
        "Total Product must be declining"
    ],
    "A",
    "1. When $MP < AP$, the additional unit contributes less than the current average, pulling the average down. Note that MP can still be positive while AP is falling.\nHence, Option {{CORR}} is correct.",
    "Recognizes MP < AP when AP is falling."
)
add_q(make_question(CHAPTER, "Production Function", "When Average Product (AP) is declining, which condition must hold true between MP and AP?", opts, corr, sol))

# 10. Relationship between TP and MP: TP maximum
opts, corr, sol = rotate_options(
    "Marginal Product is equal to zero (MP = 0)",
    [
        "Marginal Product is at its maximum peak",
        "Average Product is equal to zero",
        "Marginal Product is equal to Total Product"
    ],
    "B",
    "1. Total Product reaches its maximum level when the Marginal Product of the variable factor becomes zero ($MP = 0$). After this point, further increases in labour cause MP to turn negative, reducing TP.\nHence, Option {{CORR}} is correct.",
    "Identifies TP peak at MP = 0."
)
add_q(make_question(CHAPTER, "Law of Variable Proportions", "At what value of Marginal Product (MP) does Total Product (TP) achieve its maximum level?", opts, corr, sol))

# 11. Relationship between TP and MP: TP increasing at increasing rate
opts, corr, sol = rotate_options(
    "Marginal Product is increasing",
    [
        "Marginal Product is diminishing but positive",
        "Marginal Product is equal to zero",
        "Marginal Product is negative"
    ],
    "C",
    "1. When TP increases at an increasing rate, each additional unit of variable input adds more output than the previous unit, meaning Marginal Product is rising.\nHence, Option {{CORR}} is correct.",
    "Links increasing TP slope to rising MP."
)
add_q(make_question(CHAPTER, "Law of Variable Proportions", "When Total Product (TP) is increasing at an increasing rate, what is happening to Marginal Product (MP)?", opts, corr, sol))

# 12. Point of Inflexion on TP curve
opts, corr, sol = rotate_options(
    "The point where TP stops increasing at an increasing rate and begins increasing at a decreasing rate, corresponding to maximum MP",
    [
        "The point where Total Product reaches its absolute maximum and MP is zero",
        "The point where Average Product intersects the horizontal axis",
        "The point where total fixed cost equals total variable cost"
    ],
    "D",
    "1. The Point of Inflexion on the TP curve marks the transition from increasing marginal returns to diminishing marginal returns. At this point, the curvature changes from convex to concave, and MP reaches its peak.\nHence, Option {{CORR}} is correct.",
    "Defines the point of inflexion and peak MP."
)
add_q(make_question(CHAPTER, "Law of Variable Proportions", "What does the 'Point of Inflexion' on the Total Product curve represent?", opts, corr, sol))

# 13. Three stages of Law of Variable Proportions
opts, corr, sol = rotate_options(
    "Stage I: Increasing returns, Stage II: Diminishing returns, Stage III: Negative returns",
    [
        "Stage I: Constant returns, Stage II: Increasing returns, Stage III: Zero returns",
        "Stage I: Diminishing returns, Stage II: Negative returns, Stage III: Infinite returns",
        "Stage I: Negative returns, Stage II: Constant returns, Stage III: Diminishing returns"
    ],
    "A",
    "1. The Law of Variable Proportions exhibits three distinct phases:\n   - Stage I: Stage of Increasing Returns (from origin to max AP).\n   - Stage II: Stage of Diminishing Returns (from max AP to where $MP = 0$ / max TP).\n   - Stage III: Stage of Negative Returns (where $MP < 0$ and TP declines).\nHence, Option {{CORR}} is correct.",
    "Lists the three stages of variable proportions in order."
)
add_q(make_question(CHAPTER, "Law of Variable Proportions", "What are the three stages of the Law of Variable Proportions in chronological order of factor employment?", opts, corr, sol))

# 14. Rational stage of operation
opts, corr, sol = rotate_options(
    "Stage II (Stage of Diminishing Returns), because both AP and MP are declining but MP remains positive",
    [
        "Stage I, because total output is still small",
        "Stage III, because more workers can be employed at zero wage",
        "Any stage, because costs do not depend on production stages"
    ],
    "B",
    "1. A rational producer will never produce in Stage I (because fixed factors are underutilized and expanding output increases AP and efficiency) nor in Stage III (where MP is negative and hiring more labor reduces output). Hence, the rational stage of production is Stage II.\nHence, Option {{CORR}} is correct.",
    "Identifies Stage II as the rational economic stage."
)
add_q(make_question(CHAPTER, "Law of Variable Proportions", "In which stage of the Law of Variable Proportions will a rational, profit-maximizing producer choose to operate?", opts, corr, sol))

# 15. Cause of Stage I (Increasing Returns to Factor)
opts, corr, sol = rotate_options(
    "Better utilization of the fixed factor and increased division of labour/specialization",
    [
        "Excessive overcrowding of workers on a small fixed land plot",
        "Shortage of raw materials in international commodity exchanges",
        "Depletion of fixed capital assets due to wear and tear"
    ],
    "C",
    "1. Increasing returns to a factor occur initially because the fixed factor is underutilized. Adding variable factors allows effective division of labor, specialization, and optimal factor combinations.\nHence, Option {{CORR}} is correct.",
    "Attributes Stage I to fixed factor utilization and specialization."
)
add_q(make_question(CHAPTER, "Law of Variable Proportions", "What is the primary economic reason for the occurrence of Stage I (Increasing Returns to a Factor)?", opts, corr, sol))

# 16. Cause of Stage III (Negative Returns to Factor)
opts, corr, sol = rotate_options(
    "Severe overcrowding of the variable factor leading to management friction and factor over-utilization",
    [
        "A decrease in the market wage rate paid to variable labor",
        "Technological breakthrough that doubles machine efficiency",
        "Government restrictions on retail prices of final goods"
    ],
    "D",
    "1. In Stage III, the variable factor becomes so excessive relative to the fixed factor that workers get in each other's way, leading to organizational chaos, coordination failure, and negative marginal productivity.\nHence, Option {{CORR}} is correct.",
    "Explains factor overcrowding and negative MP in Stage III."
)
add_q(make_question(CHAPTER, "Law of Variable Proportions", "What causes Marginal Product to become negative in Stage III of the Law of Variable Proportions?", opts, corr, sol))

# 17. Match Stages of Production
add_q(make_match_question(
    CHAPTER, "Law of Variable Proportions",
    "Match the stages of production in List I with their defining characteristics in List II:",
    [
        ("A", "Stage I (Increasing Returns)"),
        ("B", "Boundary of Stage I and Stage II"),
        ("C", "Stage II (Diminishing Returns)"),
        ("D", "Stage III (Negative Returns)")
    ],
    [
        ("I", "AP is at its maximum and MP = AP"),
        ("II", "MP is negative and TP is declining"),
        ("III", "AP is rising and MP > AP"),
        ("IV", "Both AP and MP are falling, MP > 0, ending where MP = 0")
    ],
    "A-(III), B-(I), C-(IV), D-(II)",
    [
        "A-(I), B-(III), C-(IV), D-(II)",
        "A-(III), B-(IV), C-(I), D-(II)",
        "A-(IV), B-(I), C-(II), D-(III)"
    ],
    "A",
    "1. Stage I -> AP rising, MP > AP (III).\n2. Boundary -> AP max, MP = AP (I).\n3. Stage II -> AP & MP falling, MP > 0 (IV).\n4. Stage III -> MP negative, TP falling (II).\nHence, Option A is correct."
))

# 18. Statement I & II: Law of Variable Proportions
add_q(make_statement_question(
    CHAPTER, "Law of Variable Proportions",
    "The Law of Variable Proportions operates under short-run conditions where factor proportions alter as more variable input is applied to a fixed input.",
    "The law assumes that the state of technology remains constant and factors of production are imperfect substitutes for one another.",
    "A",
    "1. Statement I is true: The law examines changes in output when variable input changes while other inputs are fixed (changing factor proportions).\n2. Statement II is true: Technology constancy and imperfect factor substitutability are fundamental assumptions.\nHence, both statements are true (Option A)."
))

# 19. Assertion & Reason: Shape of MP curve
add_q(make_assertion_question(
    CHAPTER, "Production Function",
    "In the short run, the Marginal Product (MP) curve initially rises, reaches a maximum, and then declines, resembling an inverted U-shape.",
    "The Law of Variable Proportions dictates that initial factor specialization gives way to diminishing returns due to factor fixity.",
    "A",
    "1. Assertion is true: MP curve is inverted U-shaped.\n2. Reason is true: Specialization raises MP initially, but fixed factor constraints inevitably set in.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 20. Returns to Scale definition (Long run)
opts, corr, sol = rotate_options(
    "The responsiveness of total output when all factor inputs are increased simultaneously in the same proportion",
    [
        "The change in output when only one variable factor is increased while others are fixed",
        "The difference between total accounting profit and economic profit",
        "The change in price when consumer demand shifts outward"
    ],
    "B",
    "1. Returns to Scale refers to the long-run behavior of output when ALL factor inputs are altered simultaneously in a fixed proportion.\nHence, Option {{CORR}} is correct.",
    "Defines long run returns to scale."
)
add_q(make_question(CHAPTER, "Returns to Scale", "What does the concept of 'Returns to Scale' study in production economics?", opts, corr, sol))

# 21. Constant Returns to Scale (CRS)
opts, corr, sol = rotate_options(
    "Output increases by exactly 100% (doubles)",
    [
        "Output increases by more than 100%",
        "Output increases by less than 100%",
        "Output remains completely unchanged"
    ],
    "C",
    "1. Under Constant Returns to Scale (CRS), a proportional increase in all inputs leads to an identical proportional increase in output. If inputs are doubled (+100%), output also doubles (+100%).\nHence, Option {{CORR}} is correct.",
    "Identifies proportional output response under CRS."
)
add_q(make_question(CHAPTER, "Returns to Scale", "If a production function exhibits Constant Returns to Scale (CRS) and all inputs are doubled, what happens to total output?", opts, corr, sol))

# 22. Increasing Returns to Scale (IRS)
opts, corr, sol = rotate_options(
    "Output increases by more than 20% (e.g. 25%)",
    [
        "Output increases by exactly 20%",
        "Output increases by less than 20%",
        "Output falls by 20%"
    ],
    "D",
    "1. Increasing Returns to Scale (IRS) occurs when the percentage change in output is greater than the percentage change in all inputs. If inputs rise by 20%, output rises by more than 20%.\nHence, Option {{CORR}} is correct.",
    "Identifies super-proportional output response under IRS."
)
add_q(make_question(CHAPTER, "Returns to Scale", "When all productive inputs are scaled up by 20% and total output expands by 28%, what type of returns to scale is the firm experiencing?", opts, corr, sol))

# 23. Cobb-Douglas Production Function degrees
opts, corr, sol = rotate_options(
    "Increasing returns to scale if alpha + beta > 1, and constant returns if alpha + beta = 1",
    [
        "Decreasing returns to scale if alpha + beta > 1",
        "Constant returns to scale if alpha + beta = 0",
        "Zero returns to scale if alpha + beta = 1"
    ],
    "A",
    "1. For a Cobb-Douglas production function $q = A L^\\alpha K^\\beta$:\n   - $\\alpha + \\beta > 1 \\implies$ Increasing Returns to Scale (IRS).\n   - $\\alpha + \\beta = 1 \\implies$ Constant Returns to Scale (CRS).\n   - $\\alpha + \\beta < 1 \\implies$ Decreasing Returns to Scale (DRS).\nHence, Option {{CORR}} is correct.",
    "Evaluates alpha + beta in Cobb-Douglas production function."
)
add_q(make_question(CHAPTER, "Returns to Scale", "In a Cobb-Douglas production function q = A * L^alpha * K^beta, what determines whether the technology exhibits increasing, constant, or decreasing returns to scale?", opts, corr, sol))

# 24. Numerical Cobb-Douglas returns check
opts, corr, sol = rotate_options(
    "Increasing Returns to Scale, because alpha + beta = 0.6 + 0.6 = 1.2 > 1",
    [
        "Constant Returns to Scale, because alpha + beta = 1.0",
        "Decreasing Returns to Scale, because each exponent is less than 1",
        "Negative Returns to Scale, because technology parameter A is constant"
    ],
    "B",
    "1. Function: $q = 5 L^{0.6} K^{0.6}$.\n2. Sum of factor exponents: $\\alpha + \\beta = 0.6 + 0.6 = 1.2$.\n3. Since $1.2 > 1$, scaling up $L$ and $K$ by $\\lambda$ yields $\\lambda^{1.2} q > \\lambda q$, representing Increasing Returns to Scale (IRS).\nHence, Option {{CORR}} is correct.",
    "Computes sum of exponents 0.6 + 0.6 = 1.2 > 1."
)
add_q(make_question(CHAPTER, "Returns to Scale", "A manufacturing enterprise operates under the production function q = 5 * L^0.6 * K^0.6. What type of returns to scale does this production technology reflect?", opts, corr, sol))

# 25. Isoquant concept (Microeconomics appendix)
opts, corr, sol = rotate_options(
    "A curve showing all possible combinations of two inputs that produce the same physical level of output",
    [
        "A curve showing all combinations of two goods that give equal consumer utility",
        "A schedule showing various levels of profit at different tax rates",
        "The locus of cost-minimizing output levels over calendar years"
    ],
    "C",
    "1. An Isoquant (or Equal-Product Curve) is the producer's counterpart of an indifference curve, representing all combinations of two factor inputs (Labour and Capital) that yield a constant total output.\nHence, Option {{CORR}} is correct.",
    "Defines an isoquant."
)
add_q(make_question(CHAPTER, "Production Function", "What is an 'Isoquant' in producer theory?", opts, corr, sol))

# 26. Marginal Rate of Technical Substitution (MRTS)
opts, corr, sol = rotate_options(
    "MRTS_LK = - Delta K / Delta L = MP_L / MP_K",
    [
        "MRTS_LK = P_L / P_K",
        "MRTS_LK = Total Cost / Output",
        "MRTS_LK = AP_L / AP_K"
    ],
    "D",
    "1. The slope of an isoquant is the Marginal Rate of Technical Substitution ($MRTS_{LK} = -\\frac{\\Delta K}{\\Delta L} = \\frac{MP_L}{MP_K}$), measuring the rate at which capital can be replaced by labour while keeping output unchanged.\nHence, Option {{CORR}} is correct.",
    "Identifies MRTS formula."
)
add_q(make_question(CHAPTER, "Production Function", "The slope of an Isoquant is measured by which economic concept?", opts, corr, sol))

# 27. Total Product schedule: finding TP from MP
opts, corr, sol = rotate_options(
    "48 units",
    [
        "12 units",
        "36 units",
        "60 units"
    ],
    "A",
    "1. Given marginal products: $MP_1 = 10$, $MP_2 = 14$, $MP_3 = 16$, $MP_4 = 8$.\n2. Total Product $TP_4 = \\sum MP = 10 + 14 + 16 + 8 = 48$ units.\nHence, Option {{CORR}} is correct.",
    "Calculates cumulative TP from MP schedule."
)
add_q(make_question(CHAPTER, "Production Function", "If the marginal products of employing 1, 2, 3, and 4 workers are 10, 14, 16, and 8 units respectively, what is the Total Product when 4 workers are employed?", opts, corr, sol))

# 28. Sequence of TP, MP, AP milestones
add_q(make_sequence_question(
    CHAPTER, "Production Function",
    "Arrange the following milestones in the order they are reached as employment of the variable input expands:",
    [
        "Marginal Product (MP) attains its maximum peak (Point of Inflexion)",
        "Average Product (AP) attains its maximum peak (MP = AP)",
        "Total Product (TP) attains its maximum peak (MP = 0)",
        "Marginal Product (MP) becomes strictly negative"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. As variable input increases, MP peaks first (Point of Inflexion, A), then AP peaks where $MP = AP$ (B), then TP peaks where $MP = 0$ (C), and finally MP enters negative values in Stage III (D).\nHence, Option A is correct."
))

# 29. Statement I & II: Short run production
add_q(make_statement_question(
    CHAPTER, "Production Function",
    "Average Product can never be negative as long as physical output is positive.",
    "Marginal Product can become zero or negative in Stage III of the Law of Variable Proportions.",
    "A",
    "1. Statement I is true: $AP = TP / L$. Since $TP \\ge 0$ and $L > 0$, AP is always positive.\n2. Statement II is true: In Stage III, hiring an extra worker reduces total output, making $MP < 0$.\nHence, both statements are true (Option A)."
))

# 30. Assertion & Reason: Why MP cuts AP at max AP
add_q(make_assertion_question(
    CHAPTER, "Production Function",
    "The Marginal Product (MP) curve intersects the Average Product (AP) curve at the highest point of the AP curve.",
    "When MP exceeds AP, AP rises, and when MP is less than AP, AP falls; therefore, AP stops rising and reaches its peak exactly when MP equals AP.",
    "A",
    "1. Assertion is true: MP intersects AP at max AP.\n2. Reason is true: The mathematical relationship between marginal and average values guarantees that the average is stationary when marginal equals average.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# -------------------------------------------------------------------------------------------------
# 2. Theory of Costs: Explicit, Implicit, TFC, TVC, TC, AFC, AVC, SAC, MC (Q31 - Q80)
# -------------------------------------------------------------------------------------------------

# 31. Explicit vs Implicit Cost
opts, corr, sol = rotate_options(
    "Explicit costs involve actual out-of-pocket cash payments to outsiders, whereas implicit costs are imputed values of self-owned resources",
    [
        "Explicit costs include depreciation while implicit costs include interest paid to banks",
        "Explicit costs vary with output while implicit costs are strictly fixed at zero",
        "Explicit costs are ignored by accountants while implicit costs are recorded in balance sheets"
    ],
    "B",
    "1. Explicit costs are direct monetary payments made to external suppliers (wages, raw materials, rent paid). Implicit costs are imputed opportunity costs of resources owned and used by the firm itself (interest on own capital, rent of own building, salary of owner-manager).\nHence, Option {{CORR}} is correct.",
    "Contrasts explicit cash outflows with implicit imputed costs."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What is the fundamental distinction between Explicit Cost and Implicit Cost?", opts, corr, sol))

# 32. Economic Cost vs Accounting Cost
opts, corr, sol = rotate_options(
    "Economic Cost = Explicit Cost + Implicit Cost, whereas Accounting Cost includes only Explicit Cost",
    [
        "Economic Cost includes only fixed cost while Accounting Cost includes total revenue",
        "Economic Cost is always strictly less than Accounting Cost",
        "Accounting Cost includes normal profit while Economic Cost ignores opportunity cost"
    ],
    "C",
    "1. In economics, total cost includes both explicit payments and implicit costs (including normal profit). Accounting cost records only explicit, contractual out-of-pocket transactions.\nHence, Option {{CORR}} is correct.",
    "States Economic Cost = Explicit + Implicit."
)
add_q(make_question(CHAPTER, "Theory of Cost", "How does Economic Cost differ from Accounting Cost?", opts, corr, sol))

# 33. Numerical Economic Profit
opts, corr, sol = rotate_options(
    "Rs. 2,00,000",
    [
        "Rs. 5,00,000",
        "Rs. 3,00,000",
        "Rs. 10,00,000"
    ],
    "D",
    "1. Total Revenue = Rs. 10,00,000.\n2. Explicit Costs = Rs. 5,00,000 (accounting cost).\n3. Accounting Profit = $10,00,000 - 5,00,000 = \\text{Rs. 5,00,000}$.\n4. Implicit Cost = imputed salary of owner (Rs. 3,00,000).\n5. Economic Profit = Total Revenue - (Explicit + Implicit) = $10,00,000 - (5,00,000 + 3,00,000) = 10,00,000 - 8,00,000 = \\text{Rs. 2,00,000}$.\nHence, Option {{CORR}} is correct.",
    "Calculates economic profit subtracting explicit and implicit costs."
)
add_q(make_question(CHAPTER, "Theory of Cost", "An entrepreneur's total sales revenue is Rs. 10,00,000. He incurs explicit contractual costs of Rs. 5,00,000 on raw materials and wages. If the imputed value of his own managerial services and foregone salary is Rs. 3,00,000, what is his Economic Profit?", opts, corr, sol))

# 34. Total Fixed Cost (TFC) definition
opts, corr, sol = rotate_options(
    "Costs that do not vary with the level of output and must be incurred even when output is zero",
    [
        "Costs that fluctuate directly and proportionately with units produced",
        "Payments made exclusively to temporary daily-wage laborers",
        "The cost incurred in purchasing additional raw materials"
    ],
    "A",
    "1. Total Fixed Cost (TFC) refers to expenses on fixed factors of production (e.g. factory rent, machinery depreciation, permanent staff salary) that remain constant regardless of the volume of output, and are positive even at zero output.\nHence, Option {{CORR}} is correct.",
    "Defines TFC and its presence at zero output."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What is Total Fixed Cost (TFC)?", opts, corr, sol))

# 35. Total Variable Cost (TVC) definition
opts, corr, sol = rotate_options(
    "Costs that change directly with changes in the level of output, being zero at zero output",
    [
        "Contractual payments that remain invariant across all output ranges",
        "The market value of capital equipment installed in the factory",
        "The difference between total revenue and economic profit"
    ],
    "B",
    "1. Total Variable Cost (TVC) refers to costs incurred on variable inputs (raw materials, power, hourly wages) that increase as output increases and are exactly zero when production is zero.\nHence, Option {{CORR}} is correct.",
    "Defines TVC as varying directly with output."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Which characteristic accurately describes Total Variable Cost (TVC)?", opts, corr, sol))

# 36. Total Cost formula
opts, corr, sol = rotate_options(
    "TC = TFC + TVC",
    [
        "TC = TFC * TVC",
        "TC = TFC - TVC",
        "TC = TVC / TFC"
    ],
    "C",
    "1. Total Cost is the sum of total fixed cost and total variable cost at each output level: $TC = TFC + TVC$.\nHence, Option {{CORR}} is correct.",
    "States TC = TFC + TVC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What is the relationship between Total Cost (TC), Total Fixed Cost (TFC), and Total Variable Cost (TVC)?", opts, corr, sol))

# 37. Shape of TFC curve
opts, corr, sol = rotate_options(
    "A horizontal straight line parallel to the output axis",
    [
        "A vertical straight line parallel to the cost axis",
        "A rectangular hyperbola asymptotic to both axes",
        "An inverted U-shaped curve starting from the origin"
    ],
    "D",
    "1. Because Total Fixed Cost remains constant at all levels of output, its graphical plot is a horizontal straight line parallel to the horizontal (output) axis.\nHence, Option {{CORR}} is correct.",
    "Identifies horizontal line for TFC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What is the graphical shape of the Total Fixed Cost (TFC) curve?", opts, corr, sol))

# 38. Shape of TVC curve
opts, corr, sol = rotate_options(
    "An inverse S-shaped curve starting from the origin, initially concave and then convex",
    [
        "A downward-sloping linear line from the vertical axis",
        "A rectangular hyperbola asymptotic to the quantity axis",
        "A horizontal line parallel to the X-axis"
    ],
    "A",
    "1. Due to the Law of Variable Proportions, TVC initially increases at a decreasing rate (concave) and then increases at an increasing rate (convex), forming an inverse S-shape originating from $(0,0)$.\nHence, Option {{CORR}} is correct.",
    "Identifies inverse S-shape of TVC curve."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Why does the Total Variable Cost (TVC) curve exhibit an inverse S-shape?", opts, corr, sol))

# 39. Vertical distance between TC and TVC
opts, corr, sol = rotate_options(
    "Remains constant at all output levels and is equal to Total Fixed Cost (TFC)",
    [
        "Increases continuously as output expands",
        "Decreases continuously and approaches zero at large outputs",
        "Equals Marginal Cost at every level of production"
    ],
    "B",
    "1. Since $TC = TFC + TVC \\implies TC - TVC = TFC$. Because TFC is constant, the vertical distance between the TC curve and the TVC curve is constant at every level of output.\nHence, Option {{CORR}} is correct.",
    "Shows constant vertical gap equal to TFC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What happens to the vertical distance between the Total Cost (TC) curve and the Total Variable Cost (TVC) curve as output increases?", opts, corr, sol))

# 40. Average Fixed Cost (AFC) shape
opts, corr, sol = rotate_options(
    "A rectangular hyperbola that declines continuously but never touches either axis",
    [
        "A U-shaped curve reaching a minimum at medium output",
        "A horizontal straight line parallel to the quantity axis",
        "An inverted U-shaped curve peaking at zero output"
    ],
    "C",
    "1. Average Fixed Cost is $AFC = TFC / q$. Since $TFC = AFC \\times q = \\text{constant}$, the curve forms a rectangular hyperbola. It asymptotically approaches both axes but never touches them because TFC > 0 and output cannot be infinite.\nHence, Option {{CORR}} is correct.",
    "Characterizes AFC as rectangular hyperbola."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What is the graphical shape and geometric property of the Average Fixed Cost (AFC) curve?", opts, corr, sol))

# 41. Numerical AFC calculation
opts, corr, sol = rotate_options(
    "Rs. 25 per unit",
    [
        "Rs. 50 per unit",
        "Rs. 10 per unit",
        "Rs. 200 per unit"
    ],
    "D",
    "1. If fixed cost at zero output is Rs. 200, then $TFC = \\text{Rs. 200}$ across all output levels.\n2. At an output of 8 units: $AFC = TFC / q = 200 / 8 = \\text{Rs. 25}$.\nHence, Option {{CORR}} is correct.",
    "Calculates AFC = TFC / q."
)
add_q(make_question(CHAPTER, "Theory of Cost", "A firm incurs a total cost of Rs. 200 even when output is zero. When the firm produces 8 units of output, what is its Average Fixed Cost?", opts, corr, sol))

# 42. Average Variable Cost (AVC) formula and shape
opts, corr, sol = rotate_options(
    "AVC = TVC / q, and it is U-shaped due to the Law of Variable Proportions",
    [
        "AVC = TC / q, and it is a rectangular hyperbola",
        "AVC = Delta TC / Delta q, and it is a horizontal line",
        "AVC = TFC / q, and it declines continuously"
    ],
    "A",
    "1. Average Variable Cost is variable cost per unit of output: $AVC = \\frac{TVC}{q}$. It is U-shaped because as output increases, variable factor efficiency initially increases (AVC falls) and then diminishes (AVC rises).\nHence, Option {{CORR}} is correct.",
    "States formula and U-shape of AVC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "How is Average Variable Cost (AVC) defined and what is its characteristic curve shape?", opts, corr, sol))

# 43. Short-run Average Cost (SAC / AC) formula
opts, corr, sol = rotate_options(
    "AC = TC / q = AFC + AVC",
    [
        "AC = TFC - AVC",
        "AC = Delta TC / Delta q",
        "AC = AFC * AVC"
    ],
    "B",
    "1. Short-run Average Cost is total cost per unit of output: $AC = \\frac{TC}{q} = \\frac{TFC + TVC}{q} = AFC + AVC$.\nHence, Option {{CORR}} is correct.",
    "States AC = AFC + AVC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Which mathematical expression correctly defines Short-run Average Cost (AC)?", opts, corr, sol))

# 44. Why AC and AVC curves never touch each other
opts, corr, sol = rotate_options(
    "The vertical gap between AC and AVC is AFC, and AFC is always positive and never reaches zero",
    [
        "Both curves have identical marginal costs at all output levels",
        "Government regulations mandate a minimum price gap between cost curves",
        "Marginal cost cuts both curves at their respective maximum points"
    ],
    "C",
    "1. Since $AC - AVC = AFC$, and $AFC = TFC/q > 0$ for all finite outputs, AFC continuously decreases but never becomes zero. Hence, AC and AVC get closer and closer but never intersect.\nHence, Option {{CORR}} is correct.",
    "Explains non-intersection of AC and AVC via positive AFC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Why do the Average Cost (AC) and Average Variable Cost (AVC) curves get closer as output increases but never intersect?", opts, corr, sol))

# 45. Relative minimum points of AC and AVC
opts, corr, sol = rotate_options(
    "The minimum point of AVC occurs at a lower level of output than the minimum point of AC",
    [
        "The minimum point of AC occurs at a lower level of output than the minimum point of AVC",
        "Both AC and AVC achieve their minimum points at the exact same output level",
        "Neither AC nor AVC has a minimum point in short-run production"
    ],
    "D",
    "1. Even after AVC reaches its minimum and begins to rise slowly, AFC continues to decline rapidly. For a certain range, the decline in AFC outweighs the rise in AVC, causing AC to keep falling. Thus, AC reaches its minimum at a higher output than AVC.\nHence, Option {{CORR}} is correct.",
    "Identifies that AVC reaches minimum before AC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "At what relative output levels do the Average Cost (AC) curve and Average Variable Cost (AVC) curve reach their respective minimum points?", opts, corr, sol))

# 46. Marginal Cost definition and independence from fixed cost
opts, corr, sol = rotate_options(
    "MC = Delta TVC / Delta q = Delta TC / Delta q, and it is completely independent of Total Fixed Cost",
    [
        "MC = TFC / q, and it depends solely on overhead machinery expenses",
        "MC = TC / q, and it is directly proportional to fixed capital",
        "MC = Delta TFC / Delta q, and it is zero at all positive output levels"
    ],
    "A",
    "1. Marginal Cost is the addition to total cost from producing one extra unit: $MC = \\frac{\\Delta TC}{\\Delta q} = \\frac{\\Delta (TFC + TVC)}{\\Delta q} = \\frac{\\Delta TVC}{\\Delta q}$. Because TFC is constant, $\\Delta TFC = 0$, so MC depends solely on variable cost and is independent of fixed cost.\nHence, Option {{CORR}} is correct.",
    "Proves MC depends only on TVC, independent of TFC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "How is Marginal Cost (MC) related to Total Fixed Cost and Total Variable Cost?", opts, corr, sol))

# 47. Numerical MC calculation from TC schedule
opts, corr, sol = rotate_options(
    "Rs. 20",
    [
        "Rs. 15",
        "Rs. 23",
        "Rs. 115"
    ],
    "B",
    "1. Given: $TC_3 = \\text{Rs. 80}$, $TC_4 = \\text{Rs. 95}$, $TC_5 = \\text{Rs. 115}$.\n2. Marginal cost of the 5th unit: $MC_5 = TC_5 - TC_4 = 115 - 95 = \\text{Rs. 20}$.\nHence, Option {{CORR}} is correct.",
    "Calculates MC_5 = TC_5 - TC_4."
)
add_q(make_question(CHAPTER, "Theory of Cost", "The total cost of a firm is Rs. 80 for 3 units of output, Rs. 95 for 4 units, and Rs. 115 for 5 units. What is the Marginal Cost of producing the 5th unit of output?", opts, corr, sol))

# 48. Numerical MC from non-consecutive output jumps
opts, corr, sol = rotate_options(
    "Rs. 180 per unit",
    [
        "Rs. 540 per unit",
        "Rs. 270 per unit",
        "Rs. 50 per unit"
    ],
    "C",
    "1. Total cost of 5 units = Rs. 310; total cost of 8 units = Rs. 850.\n2. $\\Delta TC = 850 - 310 = \\text{Rs. 540}$.\n3. $\\Delta q = 8 - 5 = 3$ units.\n4. $MC = \\frac{\\Delta TC}{\\Delta q} = \\frac{540}{3} = \\text{Rs. 180}$ per unit.\nHence, Option {{CORR}} is correct.",
    "Applies MC = Delta TC / Delta q for multiple unit increase."
)
add_q(make_question(CHAPTER, "Theory of Cost", "For a firm with fixed cost of Rs. 50, the total cost of producing 5 units is Rs. 310 and that of producing 8 units is Rs. 850. What is the average marginal cost per unit between the 5th and 8th units?", opts, corr, sol))

# 49. Relationship between AC and MC: MC cuts AC at minimum
opts, corr, sol = rotate_options(
    "When MC < AC, AC falls; when MC = AC, AC is at its minimum; when MC > AC, AC rises",
    [
        "When MC < AC, AC rises; when MC = AC, AC is at its maximum; when MC > AC, AC falls",
        "MC cuts AC at the highest point of the AC curve",
        "AC is always strictly greater than MC across all output levels"
    ],
    "D",
    "1. The textbook relationship between AC and MC states:\n   - When $MC < AC$, AC declines.\n   - When $MC = AC$, AC is at its minimum point (MC cuts AC from below at its lowest point).\n   - When $MC > AC$, AC increases.\nHence, Option {{CORR}} is correct.",
    "Summarizes the three-stage relationship between AC and MC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Which statement accurately describes the mathematical relationship between Average Cost (AC) and Marginal Cost (MC)?", opts, corr, sol))

# 50. Relationship between AVC and MC
opts, corr, sol = rotate_options(
    "MC cuts AVC from below at the lowest (minimum) point of the AVC curve",
    [
        "MC cuts AVC from above at the highest point of the AVC curve",
        "MC and AVC curves are parallel and never intersect",
        "AVC is always strictly less than MC at zero output"
    ],
    "A",
    "1. Just like AC, the Marginal Cost curve cuts the Average Variable Cost (AVC) curve at its minimum point from below.\nHence, Option {{CORR}} is correct.",
    "Identifies MC cutting AVC at its minimum."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Where does the Marginal Cost (MC) curve intersect the Average Variable Cost (AVC) curve?", opts, corr, sol))

# 51. Numerical Average Cost calculation
opts, corr, sol = rotate_options(
    "10.55",
    [
        "9.55",
        "11.00",
        "10.00"
    ],
    "B",
    "1. Given: Total Cost $TC = 95$ with $q = 9$ units of output.\n2. $AC = TC / q = 95 / 9 = 10.555... \\approx 10.55$.\nHence, Option {{CORR}} is correct.",
    "Calculates AC = 95 / 9 = 10.55."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Calculate the Short-run Average Cost when the total cost is Rs. 95 for producing 9 units of output.", opts, corr, sol))

# 52. Area under the Marginal Cost curve
opts, corr, sol = rotate_options(
    "Total Variable Cost (TVC) of producing that level of output",
    [
        "Total Fixed Cost (TFC)",
        "Short-run Average Cost (SAC)",
        "Economic Profit"
    ],
    "C",
    "1. Since $MC = \\frac{dTVC}{dq}$, the integral $\\int_0^Q MC \\, dq = TVC(Q) - TVC(0) = TVC(Q)$. The area under the MC curve up to output $Q$ equals Total Variable Cost.\nHence, Option {{CORR}} is correct.",
    "Identifies area under MC as TVC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "The total area lying beneath the Marginal Cost (MC) curve from zero output up to a given output level Q represents:", opts, corr, sol))

# 53. Match Cost Curves and Shapes
add_q(make_match_question(
    CHAPTER, "Cost Curves Matrix",
    "Match the cost curves in List I with their characteristic geometric shapes in List II:",
    [
        ("A", "Total Fixed Cost (TFC)"),
        ("B", "Average Fixed Cost (AFC)"),
        ("C", "Total Variable Cost (TVC)"),
        ("D", "Short-run Marginal Cost (SMC)")
    ],
    [
        ("I", "Rectangular hyperbola"),
        ("II", "Inverse S-shaped originating at (0,0)"),
        ("III", "Horizontal line parallel to quantity axis"),
        ("IV", "U-shaped curve cutting AC at its lowest point")
    ],
    "A-(III), B-(I), C-(II), D-(IV)",
    [
        "A-(I), B-(III), C-(II), D-(IV)",
        "A-(III), B-(IV), C-(I), D-(II)",
        "A-(IV), B-(I), C-(II), D-(III)"
    ],
    "A",
    "1. TFC -> Horizontal line (III).\n2. AFC -> Rectangular hyperbola (I).\n3. TVC -> Inverse S-shaped (II).\n4. SMC -> U-shaped (IV).\nHence, Option A is correct."
))

# 54. Statement I & II: Fixed cost and Marginal cost
add_q(make_statement_question(
    CHAPTER, "Theory of Cost",
    "An increase in Total Fixed Cost (such as factory rent) causes the Average Cost curve to shift upward.",
    "An increase in Total Fixed Cost has zero effect on the Marginal Cost curve.",
    "A",
    "1. Statement I is true: $AC = (TFC + TVC)/q$. Higher TFC shifts AC upwards.\n2. Statement II is true: $MC = \\Delta TVC / \\Delta q$. Since fixed costs do not change with output, MC remains identical.\nHence, both statements are true (Option A)."
))

# 55. Assertion & Reason: AFC rectangular hyperbola
add_q(make_assertion_question(
    CHAPTER, "Theory of Cost",
    "The Average Fixed Cost curve is a rectangular hyperbola.",
    "The product of Average Fixed Cost and output (AFC * q) is always constant and equal to Total Fixed Cost.",
    "A",
    "1. Assertion is true: AFC curve is a rectangular hyperbola.\n2. Reason is true: By definition, $AFC \\times q = TFC = \\text{constant}$. For any point on the curve, the area of the rectangle under it is invariant.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 56. Shutdown Point in the short run
opts, corr, sol = rotate_options(
    "Price equals the minimum of Average Variable Cost (P = min AVC)",
    [
        "Price equals the minimum of Average Total Cost (P = min AC)",
        "Price equals Average Fixed Cost (P = AFC)",
        "Total Revenue equals zero"
    ],
    "B",
    "1. In the short run, a firm will continue producing as long as price covers its variable costs ($P \\ge AVC$). If price falls below minimum AVC ($P < AVC$), the firm cannot even cover operational costs and shuts down. Thus, the shutdown point is $P = \\min AVC$.\nHence, Option {{CORR}} is correct.",
    "Identifies shutdown point as P = min AVC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "In short-run microeconomics, what condition defines the 'Shutdown Point' of a firm?", opts, corr, sol))

# 57. Break-even Point definition
opts, corr, sol = rotate_options(
    "Price equals the minimum of Average Total Cost (P = min AC), where economic profit is zero (normal profit)",
    [
        "Price equals minimum Average Variable Cost",
        "Marginal Cost equals Total Fixed Cost",
        "Total Revenue is at its maximum"
    ],
    "C",
    "1. At the break-even point, price covers all costs including implicit costs: $P = AC \\implies TR = TC$. Economic profit is zero (earning normal profit). Hence, $P = \\min AC$.\nHence, Option {{CORR}} is correct.",
    "Identifies break-even point as P = min AC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What condition characterizes the 'Break-even Point' for a competitive firm?", opts, corr, sol))

# 58. Sunk Cost concept
opts, corr, sol = rotate_options(
    "Costs that have already been incurred in the past and cannot be recovered by any current or future decision",
    [
        "Variable costs that change with current factory production",
        "Future maintenance costs budgeted for next year",
        "Taxes paid on corporate export revenues"
    ],
    "D",
    "1. Sunk costs are historical expenditures that cannot be retrieved or altered by any future choice (e.g. customized non-resellable software). Rational economic decisions ignore sunk costs.\nHence, Option {{CORR}} is correct.",
    "Defines sunk costs."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What is a 'Sunk Cost' in economic analysis?", opts, corr, sol))

# 59. Long-run Average Cost (LAC) curve: Envelope curve
opts, corr, sol = rotate_options(
    "An envelope curve that wraps around and is tangent to various Short-run Average Cost (SAC) curves",
    [
        "A horizontal line representing fixed plant size",
        "A curve strictly steeper than all short-run cost curves",
        "An inverted parabolic schedule peaking at capacity output"
    ],
    "A",
    "1. In the long run, the firm can choose among various plant sizes. The Long-run Average Cost (LAC) curve envelopes the short-run average cost curves (SACs), being tangent to each SAC at some output level.\nHence, Option {{CORR}} is correct.",
    "Describes LAC as an envelope curve of SACs."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Why is the Long-run Average Cost (LAC) curve known as the 'Envelope Curve'?", opts, corr, sol))

# 60. Economies and Diseconomies of Scale on LAC shape
opts, corr, sol = rotate_options(
    "LAC initially falls due to economies of scale and eventually rises due to diseconomies of scale",
    [
        "LAC is U-shaped due to the Law of Variable Proportions with fixed factors",
        "LAC is U-shaped because fixed costs double every quarter",
        "LAC is horizontal because long-run factors are free goods"
    ],
    "B",
    "1. The U-shape of the Long-run Average Cost curve is explained by Economies of Scale (internal and external economies reducing per-unit cost) followed by Diseconomies of Scale (managerial inefficiencies, coordination bottlenecks raising cost). Note: It is NOT caused by law of variable proportions because all factors are variable in the long run!\nHence, Option {{CORR}} is correct.",
    "Explains LAC shape via economies and diseconomies of scale."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What explains the U-shape of the Long-run Average Cost (LAC) curve?", opts, corr, sol))

# 61. Numerical Complete Cost Table: Finding TVC from TC and TFC
opts, corr, sol = rotate_options(
    "TVC = Rs. 160",
    [
        "TVC = Rs. 260",
        "TVC = Rs. 60",
        "TVC = Rs. 210"
    ],
    "C",
    "1. Total Cost at 4 units = Rs. 210.\n2. Fixed Cost at 0 units = Rs. 50 $\\implies TFC = \\text{Rs. 50}$.\n3. $TVC = TC - TFC = 210 - 50 = \\text{Rs. 160}$.\nHence, Option {{CORR}} is correct.",
    "Calculates TVC = TC - TFC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "A firm's total cost is Rs. 50 when output is zero. If the total cost of producing 4 units is Rs. 210, what is the Total Variable Cost (TVC) at 4 units?", opts, corr, sol))

# 62. Numerical AVC from TVC
opts, corr, sol = rotate_options(
    "Rs. 40 per unit",
    [
        "Rs. 52.5 per unit",
        "Rs. 160 per unit",
        "Rs. 12.5 per unit"
    ],
    "D",
    "1. From the previous data, $TVC = \\text{Rs. 160}$ at $q = 4$ units.\n2. $AVC = TVC / q = 160 / 4 = \\text{Rs. 40}$ per unit.\nHence, Option {{CORR}} is correct.",
    "Computes AVC = 160 / 4 = 40."
)
add_q(make_question(CHAPTER, "Theory of Cost", "If Total Variable Cost for producing 4 units of a commodity is Rs. 160, what is the Average Variable Cost?", opts, corr, sol))

# 63. MC at zero output
opts, corr, sol = rotate_options(
    "Marginal Cost cannot be defined for zero units of output",
    [
        "Marginal Cost is equal to Total Fixed Cost",
        "Marginal Cost is exactly zero",
        "Marginal Cost is equal to Average Cost"
    ],
    "A",
    "1. Marginal Cost represents the addition to total cost from producing an extra unit ($q \\to q+1$). At zero output, no units have been produced, so MC is undefined.\nHence, Option {{CORR}} is correct.",
    "Notes that MC is undefined at zero output."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What is the value of Marginal Cost (MC) at zero units of output?", opts, corr, sol))

# 64. Capacity Output definition
opts, corr, sol = rotate_options(
    "The output level at which Short-run Average Cost (SAC) is at its minimum",
    [
        "The absolute maximum physical output a plant can produce before breaking down",
        "The output where total fixed cost equals total revenue",
        "The output level where marginal product is negative"
    ],
    "B",
    "1. In economics, the 'capacity output' (or optimum plant capacity) is the output level at which short-run per-unit cost of production is minimized (i.e. minimum of SAC).\nHence, Option {{CORR}} is correct.",
    "Defines capacity output as minimum of SAC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "In microeconomic terminology, what does 'Capacity Output' of a firm refer to?", opts, corr, sol))

# 65. Planning Curve
opts, corr, sol = rotate_options(
    "Long-run Average Cost (LAC) curve, because it guides the firm's long-term decision regarding plant size expansion",
    [
        "Short-run Marginal Cost curve",
        "Total Fixed Cost horizontal line",
        "Average Fixed Cost rectangular hyperbola"
    ],
    "C",
    "1. The Long-run Average Cost (LAC) curve is known as the 'Planning Curve' because an entrepreneur uses it to plan which specific plant size (SAC) to construct for a desired target output.\nHence, Option {{CORR}} is correct.",
    "Identifies LAC as planning curve."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Which cost curve is traditionally referred to as the 'Planning Curve' of a business enterprise?", opts, corr, sol))

# 66. Prime Costs vs Supplementary Costs
opts, corr, sol = rotate_options(
    "Prime costs are variable costs while supplementary costs are fixed overhead costs",
    [
        "Prime costs are fixed costs while supplementary costs are variable costs",
        "Prime costs represent taxes while supplementary costs represent subsidies",
        "Prime costs apply to agriculture while supplementary costs apply to software"
    ],
    "D",
    "1. In Marshallian terminology, Variable Costs are called 'Prime Costs' (or direct costs) because they are directly tied to production, whereas Fixed Costs are called 'Supplementary Costs' (or indirect/overhead costs).\nHence, Option {{CORR}} is correct.",
    "Classifies Prime = Variable and Supplementary = Fixed."
)
add_q(make_question(CHAPTER, "Theory of Cost", "In cost accounting and economics, how are 'Prime Costs' and 'Supplementary Costs' defined?", opts, corr, sol))

# 67. Sequence of cost curve minimums
add_q(make_sequence_question(
    CHAPTER, "Theory of Cost",
    "Arrange the following cost curve turning points in the order of output levels at which they occur (from lowest to highest output):",
    [
        "Marginal Cost (MC) reaches its minimum point",
        "Average Variable Cost (AVC) reaches its minimum point",
        "Short-run Average Cost (SAC) reaches its minimum point",
        "Average Fixed Cost (AFC) reaches its minimum point (approaches zero asymptotically)"
    ],
    "(A), (B), (C), (D)",
    [
        "(B), (A), (C), (D)",
        "(A), (C), (B), (D)",
        "(C), (A), (B), (D)"
    ],
    "A",
    "1. As output expands, MC reaches its minimum first (A), then AVC reaches its minimum where $MC = AVC$ (B), then AC reaches its minimum where $MC = AC$ (C), and AFC falls continuously (D).\nHence, Option A is correct."
))

# 68. Statement I & II: Shape of MC and MP
add_q(make_statement_question(
    CHAPTER, "Theory of Cost",
    "The Marginal Cost (MC) curve is the reciprocal mirror image of the Marginal Product (MP) curve.",
    "When Marginal Product is at its maximum, Marginal Cost is at its minimum.",
    "A",
    "1. Statement I is true: $MC = w / MP_L$. As MP rises, MC falls; when MP falls, MC rises.\n2. Statement II is true: Peak MP corresponds directly to trough MC.\nHence, both statements are true (Option A)."
))

# 69. Assertion & Reason: Why MC cuts AC from below
add_q(make_assertion_question(
    CHAPTER, "Theory of Cost",
    "The Marginal Cost (MC) curve always intersects the Average Cost (AC) curve from below at its minimum point.",
    "As long as MC is below AC, it pulls AC down, and when MC rises above AC, it pulls AC up.",
    "A",
    "1. Assertion is true: MC cuts AC from below at min AC.\n2. Reason is true: The average falls while marginal is below it, and rises when marginal is above it, necessitating intersection at the minimum.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 70. Normal Profit as a cost component
opts, corr, sol = rotate_options(
    "Normal profit is an implicit cost included in total economic cost as the minimum reward needed to keep the entrepreneur in business",
    [
        "Normal profit is an explicit cash outflow recorded on the balance sheet",
        "Normal profit is excluded from all economic calculations",
        "Normal profit exists only when pure economic profit is infinite"
    ],
    "B",
    "1. In economics, normal profit is the minimum return required to prevent an entrepreneur from switching to another business. It is treated as an implicit factor cost and is included in the firm's Average Cost curve.\nHence, Option {{CORR}} is correct.",
    "Explains normal profit as an implicit cost element."
)
add_q(make_question(CHAPTER, "Theory of Cost", "How is 'Normal Profit' treated in the economic theory of costs?", opts, corr, sol))

# 71. Numerical TVC from MC schedule
opts, corr, sol = rotate_options(
    "Rs. 92",
    [
        "Rs. 30",
        "Rs. 122",
        "Rs. 62"
    ],
    "C",
    "1. Given marginal costs: $MC_1 = 30$, $MC_2 = 22$, $MC_3 = 18$, $MC_4 = 22$.\n2. $TVC_4 = \\sum MC = 30 + 22 + 18 + 22 = \\text{Rs. 92}$.\nHence, Option {{CORR}} is correct.",
    "Calculates cumulative TVC from MC schedule."
)
add_q(make_question(CHAPTER, "Theory of Cost", "If the marginal costs of producing the 1st, 2nd, 3rd, and 4th units of a good are Rs. 30, Rs. 22, Rs. 18, and Rs. 22 respectively, what is the Total Variable Cost of producing 4 units?", opts, corr, sol))

# 72. Numerical finding TC when TFC = 50 and MC given
opts, corr, sol = rotate_options(
    "Rs. 142",
    [
        "Rs. 92",
        "Rs. 192",
        "Rs. 50"
    ],
    "D",
    "1. From previous problem: $TVC_4 = \\text{Rs. 92}$.\n2. Given: $TFC = \\text{Rs. 50}$.\n3. $TC_4 = TFC + TVC_4 = 50 + 92 = \\text{Rs. 142}$.\nHence, Option {{CORR}} is correct.",
    "Computes TC = TFC + TVC = 50 + 92 = 142."
)
add_q(make_question(CHAPTER, "Theory of Cost", "A firm's Total Fixed Cost is Rs. 50. If the marginal costs of producing 4 successive units are Rs. 30, Rs. 22, Rs. 18, and Rs. 22, what is the Total Cost of producing 4 units?", opts, corr, sol))

# 73. Why MC is U-shaped
opts, corr, sol = rotate_options(
    "Due to the Law of Variable Proportions, reflecting increasing marginal returns followed by diminishing marginal returns",
    [
        "Due to changing government sales tax rates across quarters",
        "Because fixed capital machinery depreciates linearly",
        "Because consumer demand curves are downward sloping"
    ],
    "A",
    "1. The U-shape of the MC curve reflects the Law of Variable Proportions: as variable factor is employed, MP initially increases (driving MC down), and after reaching peak MP, diminishing returns set in (driving MC up).\nHence, Option {{CORR}} is correct.",
    "Links U-shaped MC to variable proportions."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Why does the Short-run Marginal Cost (SMC) curve have a U-shape?", opts, corr, sol))

# 74. Relationship between AVC and AP
opts, corr, sol = rotate_options(
    "AVC = w / AP_L, meaning AVC is the reciprocal of AP multiplied by the wage rate",
    [
        "AVC = w * AP_L",
        "AVC = AP_L / w",
        "AVC and AP_L are completely unrelated"
    ],
    "B",
    "1. $TVC = w \\times L$. Therefore, $AVC = \\frac{TVC}{q} = \\frac{w \\times L}{q} = w \\times \\left(\\frac{L}{q}\\right) = \\frac{w}{AP_L}$.\n2. Hence, AVC is inversely related to AP: when AP rises, AVC falls; when AP is maximized, AVC is minimized.\nHence, Option {{CORR}} is correct.",
    "Derives AVC = w / AP."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What is the algebraic relationship between Average Variable Cost (AVC) and Average Product of labour (AP_L)?", opts, corr, sol))

# 75. Minimum point of AC condition
opts, corr, sol = rotate_options(
    "MC = AC",
    [
        "MC = AVC",
        "MC = AFC",
        "AC = 0"
    ],
    "C",
    "1. When Average Cost is at its minimum, the slope of AC is zero, which mathematically requires $MC = AC$.\nHence, Option {{CORR}} is correct.",
    "States MC = AC at minimum AC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "Which condition mathematically identifies the minimum point on the Short-run Average Cost curve?", opts, corr, sol))

# 76. Difference between AC and AVC at high outputs
opts, corr, sol = rotate_options(
    "The difference continuously diminishes because AFC approaches zero as output expands",
    [
        "The difference continuously widens because TFC grows exponentially",
        "The difference remains strictly constant at all output levels",
        "The difference becomes negative at very large output levels"
    ],
    "D",
    "1. Since $AC - AVC = AFC = TFC / q$, as $q \\to \\infty$, $AFC \\to 0$. Thus, the vertical distance between AC and AVC narrows continuously.\nHence, Option {{CORR}} is correct.",
    "Explains narrowing gap between AC and AVC."
)
add_q(make_question(CHAPTER, "Theory of Cost", "How does the numerical difference between Average Cost (AC) and Average Variable Cost (AVC) behave as output increases to very large quantities?", opts, corr, sol))

# 77. Match Cost formulas
add_q(make_match_question(
    CHAPTER, "Cost Formulas Matrix",
    "Match the cost concepts in List I with their defining mathematical formulas in List II:",
    [
        ("A", "Average Fixed Cost"),
        ("B", "Marginal Cost"),
        ("C", "Total Cost"),
        ("D", "Average Variable Cost")
    ],
    [
        ("I", "Delta TC / Delta q"),
        ("II", "TVC / q"),
        ("III", "TFC / q"),
        ("IV", "TFC + TVC")
    ],
    "A-(III), B-(I), C-(IV), D-(II)",
    [
        "A-(I), B-(III), C-(IV), D-(II)",
        "A-(III), B-(IV), C-(I), D-(II)",
        "A-(IV), B-(I), C-(II), D-(III)"
    ],
    "A",
    "1. AFC -> TFC / q (III).\n2. MC -> Delta TC / Delta q (I).\n3. TC -> TFC + TVC (IV).\n4. AVC -> TVC / q (II).\nHence, Option A is correct."
))

# 78. Statement I & II: Implicit costs
add_q(make_statement_question(
    CHAPTER, "Theory of Cost",
    "Implicit costs are not recorded in financial accounting ledgers but are integral to economic decision-making.",
    "If economic profit is zero, the firm is still earning positive accounting profit equal to its implicit costs.",
    "A",
    "1. Statement I is true: Accounting ignores implicit opportunity costs.\n2. Statement II is true: Zero economic profit means $TR = \\text{Explicit} + \\text{Implicit}$. Thus Accounting Profit ($TR - \\text{Explicit}$) = Implicit Cost $> 0$.\nHence, both statements are true (Option A)."
))

# 79. Assertion & Reason: AFC never touches axes
add_q(make_assertion_question(
    CHAPTER, "Theory of Cost",
    "The Average Fixed Cost curve never intersects either the vertical cost axis or the horizontal output axis.",
    "Total Fixed Cost is strictly positive, so AFC cannot be zero at any finite output, and output cannot be zero when calculating average cost.",
    "A",
    "1. Assertion is true: AFC never touches axes.\n2. Reason is true: $AFC = TFC/q$. For $AFC=0$, $q$ must be infinite; at $q=0$, $AFC$ is undefined.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 80. Fixed factor lumpiness
opts, corr, sol = rotate_options(
    "Indivisibility of fixed capital inputs like heavy machinery and factory premises",
    [
        "Continuous divisibility of raw materials into micro-units",
        "Government price ceilings on industrial fuels",
        "Fluctuating international exchange rates"
    ],
    "B",
    "1. Fixed factors like buildings, power plants, and machinery are 'lumpy' or indivisible—they cannot be hired in minute fractional quantities, which is why fixed costs arise even for minimal initial output.\nHence, Option {{CORR}} is correct.",
    "Explains factor indivisibility as source of fixed costs."
)
add_q(make_question(CHAPTER, "Theory of Cost", "What physical property of capital goods gives rise to fixed overhead costs in the short run?", opts, corr, sol))

# -------------------------------------------------------------------------------------------------
# 3. Revenue Concepts & Advanced Cost-Production Synthesis (Q81 - Q120)
# -------------------------------------------------------------------------------------------------

# 81. Total Revenue definition
opts, corr, sol = rotate_options(
    "TR = Price * Quantity Sold (P * Q)",
    [
        "TR = Price / Quantity Sold",
        "TR = Marginal Revenue / Total Cost",
        "TR = Profit - Variable Cost"
    ],
    "A",
    "1. Total Revenue (TR) is the total money receipts of a firm from the sale of a given quantity of output: $TR = P \\times Q$.\nHence, Option {{CORR}} is correct.",
    "Defines Total Revenue."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "How is Total Revenue (TR) formulated mathematically?", opts, corr, sol))

# 82. Average Revenue definition and relationship with Price
opts, corr, sol = rotate_options(
    "AR = TR / Q = (P * Q) / Q = P, meaning Average Revenue is always identically equal to market price",
    [
        "AR is equal to Marginal Revenue only when demand is downward sloping",
        "AR is equal to Total Cost divided by Price",
        "AR is strictly zero when marginal revenue is negative"
    ],
    "B",
    "1. Average Revenue is revenue per unit of output: $AR = \\frac{TR}{Q} = \\frac{P \\times Q}{Q} = P$. Thus, the Average Revenue curve of a firm is simply its demand curve.\nHence, Option {{CORR}} is correct.",
    "Proves AR = Price universally."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "What is the relationship between Average Revenue (AR) and the price of the commodity?", opts, corr, sol))

# 83. Marginal Revenue definition
opts, corr, sol = rotate_options(
    "MR = Delta TR / Delta Q = TR_n - TR_{n-1}",
    [
        "MR = TR / Q",
        "MR = Price * Quantity",
        "MR = Delta TC / Delta Q"
    ],
    "C",
    "1. Marginal Revenue (MR) is the change in total revenue from selling one additional unit of output: $MR = \\frac{\\Delta TR}{\\Delta Q} = TR_n - TR_{n-1}$.\nHence, Option {{CORR}} is correct.",
    "States formula for Marginal Revenue."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "How is Marginal Revenue (MR) formulated?", opts, corr, sol))

# 84. AR and MR under Perfect Competition
opts, corr, sol = rotate_options(
    "AR and MR are equal and represented by a single horizontal straight line parallel to the output axis at market price",
    [
        "MR curve is downward sloping while AR curve is horizontal",
        "AR curve slopes downward and MR curve lies above AR",
        "MR is twice as steep as AR and slopes upward"
    ],
    "D",
    "1. Under perfect competition, the firm is a price taker. It can sell any quantity at the prevailing market price $P$. Therefore, $AR = MR = P$, represented by a horizontal line.\nHence, Option {{CORR}} is correct.",
    "Identifies horizontal AR = MR curve in perfect competition."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "What is the relationship between Average Revenue (AR) and Marginal Revenue (MR) under Perfect Competition?", opts, corr, sol))

# 85. AR and MR under Monopoly / Monopolistic Competition
opts, corr, sol = rotate_options(
    "Both AR and MR slope downwards, and MR lies below AR (MR < AR)",
    [
        "Both curves are horizontal parallel lines",
        "MR curve lies above AR curve (MR > AR)",
        "AR curve slopes downward while MR curve is a vertical straight line"
    ],
    "A",
    "1. To sell more units in non-competitive markets, the firm must lower the price on all units. Thus, the extra revenue from the additional unit ($MR$) is less than the price ($AR$), so $MR < AR$ and MR falls at twice the rate of AR for a linear demand curve.\nHence, Option {{CORR}} is correct.",
    "Shows downward sloping AR and MR with MR < AR."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "When a firm can sell more output only by lowering its price (as in monopoly), how do the AR and MR curves relate?", opts, corr, sol))

# 86. Slope relationship between linear AR and MR
opts, corr, sol = rotate_options(
    "The slope of the MR curve is twice the slope of the AR curve",
    [
        "The slope of the AR curve is twice the slope of the MR curve",
        "Both curves have identical slopes",
        "The slope of MR is half the slope of AR"
    ],
    "B",
    "1. If demand is linear $P = a - bQ$, then $TR = aQ - bQ^2$, and $MR = a - 2bQ$. The slope of $AR$ is $-b$ and the slope of $MR$ is $-2b$. Thus, MR is twice as steep as AR.\nHence, Option {{CORR}} is correct.",
    "Identifies MR slope as twice AR slope."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "For a straight-line downward-sloping demand curve, how does the slope of the Marginal Revenue curve compare to the slope of the Average Revenue curve?", opts, corr, sol))

# 87. Relationship between TR and MR: MR = 0
opts, corr, sol = rotate_options(
    "Total Revenue is at its maximum point",
    [
        "Total Revenue is equal to zero",
        "Total Revenue is rising at an increasing rate",
        "Total Revenue equals total variable cost"
    ],
    "C",
    "1. Since $MR = \\frac{dTR}{dQ}$, when $MR = 0$, the first derivative of TR is zero, indicating that Total Revenue has reached its absolute peak.\nHence, Option {{CORR}} is correct.",
    "Identifies TR maximum when MR = 0."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "When Marginal Revenue (MR) is equal to zero, what is the status of Total Revenue (TR)?", opts, corr, sol))

# 88. Relationship between TR and MR: MR negative
opts, corr, sol = rotate_options(
    "Total Revenue begins to decline",
    [
        "Total Revenue continues to increase at a diminishing rate",
        "Total Revenue becomes negative immediately",
        "Total Revenue remains constant"
    ],
    "D",
    "1. When $MR < 0$, each additional unit sold reduces total revenue, causing Total Revenue to decrease.\nHence, Option {{CORR}} is correct.",
    "Shows TR falls when MR is negative."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "What happens to Total Revenue when Marginal Revenue becomes negative?", opts, corr, sol))

# 89. Numerical TR and MR calculation
opts, corr, sol = rotate_options(
    "Rs. 40",
    [
        "Rs. 240",
        "Rs. 200",
        "Rs. 48"
    ],
    "A",
    "1. Selling 4 units at Rs. 50 $\\implies TR_4 = 4 \\times 50 = \\text{Rs. 200}$.\n2. Selling 5 units at Rs. 48 $\\implies TR_5 = 5 \\times 48 = \\text{Rs. 240}$.\n3. $MR_5 = TR_5 - TR_4 = 240 - 200 = \\text{Rs. 40}$.\nHence, Option {{CORR}} is correct.",
    "Calculates MR_5 = TR_5 - TR_4."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "A firm sells 4 units of output at Rs. 50 per unit. To sell 5 units, it must reduce the price to Rs. 48 per unit. What is the Marginal Revenue of the 5th unit?", opts, corr, sol))

# 90. MR formula with price elasticity
opts, corr, sol = rotate_options(
    "MR = P * (1 - 1 / e_d)",
    [
        "MR = P * (1 + 1 / e_d)",
        "MR = P / e_d",
        "MR = e_d / P"
    ],
    "B",
    "1. The Amoroso-Robinson formula links Marginal Revenue, Price ($AR$), and Price Elasticity of Demand: $MR = P \\left(1 - \\frac{1}{e_d}\\right)$.\nHence, Option {{CORR}} is correct.",
    "States Amoroso-Robinson formula MR = P(1 - 1/e)."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "Which mathematical formula correctly relates Marginal Revenue (MR), Price (P), and Price Elasticity of Demand (e_d)?", opts, corr, sol))

# 91. Numerical MR from elasticity
opts, corr, sol = rotate_options(
    "Rs. 15",
    [
        "Rs. 20",
        "Rs. 5",
        "Rs. 25"
    ],
    "C",
    "1. Given: $P = \\text{Rs. 20}$, $e_d = 4.0$.\n2. $MR = P \\left(1 - \\frac{1}{e_d}\\right) = 20 \\left(1 - \\frac{1}{4}\\right) = 20 \\times 0.75 = \\text{Rs. 15}$.\nHence, Option {{CORR}} is correct.",
    "Computes MR = 20 * (1 - 1/4) = 15."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "If the market price of a product is Rs. 20 and the price elasticity of demand is 4.0, what is the Marginal Revenue?", opts, corr, sol))

# 92. Value of MR when e_d = 1
opts, corr, sol = rotate_options(
    "MR = 0",
    [
        "MR = P",
        "MR = infinity",
        "MR = 1"
    ],
    "D",
    "1. Using $MR = P(1 - 1/e_d)$: when $e_d = 1$, $MR = P(1 - 1/1) = P(0) = 0$. This corresponds to the midpoint of a linear demand curve where TR is maximized.\nHence, Option {{CORR}} is correct.",
    "Identifies MR = 0 when elasticity is unitary."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "What is the value of Marginal Revenue (MR) at that point on the demand curve where price elasticity of demand is exactly unitary (e_d = 1)?", opts, corr, sol))

# 93. Value of MR when e_d < 1
opts, corr, sol = rotate_options(
    "Marginal Revenue is negative (MR < 0)",
    [
        "Marginal Revenue is strictly positive (MR > 0)",
        "Marginal Revenue equals the market price",
        "Marginal Revenue is infinite"
    ],
    "A",
    "1. When $e_d < 1$, $1/e_d > 1$, which makes $(1 - 1/e_d)$ negative. Thus, $MR = P(1 - 1/e_d) < 0$.\nHence, Option {{CORR}} is correct.",
    "Shows MR is negative when demand is inelastic."
)
add_q(make_question(CHAPTER, "Theory of Revenue", "When a firm operates in the inelastic region of its demand curve (e_d < 1), what is the sign of Marginal Revenue?", opts, corr, sol))

# 94. Producer Equilibrium: MR-MC Approach conditions
opts, corr, sol = rotate_options(
    "(i) MR = MC, and (ii) MC must be rising at the point of equilibrium (MC cuts MR from below)",
    [
        "(i) TR = TC, and (ii) AC must be falling",
        "(i) MR > MC, and (ii) AFC must be equal to zero",
        "(i) AR = AC, and (ii) MC must cut MR from above"
    ],
    "B",
    "1. Producer's equilibrium under the MR-MC approach requires two conditions:\n   (i) First order condition: $MR = MC$.\n   (ii) Second order condition: MC must cut MR from below (i.e. MC must be rising).\nHence, Option {{CORR}} is correct.",
    "States both necessary conditions for producer equilibrium."
)
add_q(make_question(CHAPTER, "Producer Equilibrium", "Which two conditions are necessary for a profit-maximizing producer to achieve equilibrium?", opts, corr, sol))

# 95. Why MC must cut MR from below
opts, corr, sol = rotate_options(
    "If MC cuts MR from above, producing beyond that point yields MR > MC, which increases total profit further",
    [
        "If MC cuts MR from above, the firm's fixed costs become negative",
        "If MC cuts MR from above, consumer demand drops to zero",
        "If MC cuts MR from below, total cost exceeds total revenue"
    ],
    "C",
    "1. If $MR = MC$ while MC is falling (cutting from above), expanding output beyond that point makes $MR > MC$, adding to profit. Thus, it is a point of minimum profit (or maximum loss). Maximum profit requires MC to cut MR from below.\nHence, Option {{CORR}} is correct.",
    "Explains second-order condition for profit maximization."
)
add_q(make_question(CHAPTER, "Producer Equilibrium", "Why is MR = MC not a sufficient condition on its own for producer's equilibrium?", opts, corr, sol))

# 96. Numerical Producer Equilibrium in Perfect Competition
opts, corr, sol = rotate_options(
    "5 units of output",
    [
        "2 units of output",
        "3 units of output",
        "6 units of output"
    ],
    "D",
    "1. Given: Price $P = \\text{Rs. 12}$ (so $MR = 12$).\n2. Schedule: [q=1, MC=15], [q=2, MC=12], [q=3, MC=10], [q=4, MC=11], [q=5, MC=12], [q=6, MC=14].\n3. $MR = MC = 12$ occurs at $q = 2$ and $q = 5$.\n4. At $q = 2$, MC is falling ($15 \\to 12 \\to 10$). At $q = 5$, MC is rising ($11 \\to 12 \\to 14$).\n5. Therefore, equilibrium is at $q = 5$ units.\nHence, Option {{CORR}} is correct.",
    "Selects the rising MC intersection point."
)
add_q(make_question(CHAPTER, "Producer Equilibrium", "A competitive firm faces a constant market price of Rs. 12 per unit. Its MC schedule is: [q=1: 15, q=2: 12, q=3: 10, q=4: 11, q=5: 12, q=6: 14]. At which level of output does the firm attain equilibrium?", opts, corr, sol))

# 97. Supernormal Profit condition in short run
opts, corr, sol = rotate_options(
    "Price is greater than Average Cost (AR > AC)",
    [
        "Price equals Average Variable Cost (AR = AVC)",
        "Price is strictly less than Average Cost (AR < AC)",
        "Marginal Revenue equals Average Fixed Cost"
    ],
    "A",
    "1. A firm earns supernormal (abnormal) profit when Average Revenue exceeds Average Cost ($AR > AC$) at the equilibrium output, yielding positive economic profit ($TR - TC > 0$).\nHence, Option {{CORR}} is correct.",
    "Identifies supernormal profit when AR > AC."
)
add_q(make_question(CHAPTER, "Producer Equilibrium", "Under what cost-revenue condition does a firm earn 'Supernormal Profit' in the short run?", opts, corr, sol))

# 98. Normal Profit condition
opts, corr, sol = rotate_options(
    "Average Revenue equals Average Cost (AR = AC)",
    [
        "Average Revenue is greater than Total Revenue",
        "Average Revenue is less than Average Variable Cost",
        "Marginal Cost is equal to zero"
    ],
    "B",
    "1. When $AR = AC$, Total Revenue equals Total Cost ($TR = TC$), meaning economic profit is zero. The firm earns exactly normal profit.\nHence, Option {{CORR}} is correct.",
    "Identifies normal profit when AR = AC."
)
add_q(make_question(CHAPTER, "Producer Equilibrium", "Which condition indicates that a firm is earning only 'Normal Profit'?", opts, corr, sol))

# 99. Loss minimizing condition in short run
opts, corr, sol = rotate_options(
    "AVC <= P < AC, where the firm covers all variable costs and a portion of fixed costs",
    [
        "P < AVC, where the firm cannot cover variable costs",
        "P > AC, where the firm earns supernormal profit",
        "P = 0, where the firm shuts down production"
    ],
    "C",
    "1. In the short run, if $AVC \\le P < AC$, the firm incurs an economic loss ($P < AC$), but continuing production is better than shutting down because revenue covers all variable costs and contributes towards fixed costs.\nHence, Option {{CORR}} is correct.",
    "Defines short run operating loss condition."
)
add_q(make_question(CHAPTER, "Producer Equilibrium", "Under what market condition will a rational firm decide to continue operating at a loss in the short run?", opts, corr, sol))

# 100. Supply curve of a competitive firm in the short run
opts, corr, sol = rotate_options(
    "The rising portion of its Short-run Marginal Cost (SMC) curve lying on and above the minimum Average Variable Cost (AVC)",
    [
        "The entire Average Variable Cost curve",
        "The horizontal Average Revenue straight line",
        "The downward-sloping portion of the Marginal Cost curve"
    ],
    "D",
    "1. Since a competitive firm produces where $P = SMC$ as long as $P \\ge \\min AVC$, its short-run supply curve is precisely that portion of the SMC curve that lies on or above the minimum point of AVC.\nHence, Option {{CORR}} is correct.",
    "Identifies competitive supply curve as SMC above min AVC."
)
add_q(make_question(CHAPTER, "Theory of Supply", "What constitutes the Short-Run Supply Curve of an individual firm in a perfectly competitive industry?", opts, corr, sol))

# 101. Long-run supply curve of a competitive firm
opts, corr, sol = rotate_options(
    "The rising portion of its Long-run Marginal Cost (LMC) curve lying on and above the minimum Long-run Average Cost (LAC)",
    [
        "The horizontal Total Fixed Cost line",
        "The entire downward-sloping segment of LAC",
        "The Average Revenue line at all output levels"
    ],
    "A",
    "1. In the long run, all costs are variable and free entry/exit ensures firms earn normal profit ($P \\ge LAC$). Thus, the long-run supply curve is the rising portion of LMC lying on or above the minimum of LAC.\nHence, Option {{CORR}} is correct.",
    "Identifies long run supply curve as LMC above min LAC."
)
add_q(make_question(CHAPTER, "Theory of Supply", "What constitutes the Long-Run Supply Curve of a competitive firm?", opts, corr, sol))

# 102. Law of Supply statement
opts, corr, sol = rotate_options(
    "Other factors remaining constant, there is a direct (positive) relationship between price and quantity supplied",
    [
        "There is an inverse relationship between commodity price and production cost",
        "Quantity supplied always equals consumer demand at all market prices",
        "As input prices rise, supply expands proportionately"
    ],
    "B",
    "1. The Law of Supply states that ceteris paribus (technology and input prices held constant), as the market price of a good rises, producers are willing to supply more, yielding an upward-sloping supply curve.\nHence, Option {{CORR}} is correct.",
    "States the law of supply."
)
add_q(make_question(CHAPTER, "Theory of Supply", "What is the core proposition of the Law of Supply?", opts, corr, sol))

# 103. Movement along supply curve vs Shift in supply curve
opts, corr, sol = rotate_options(
    "Movement along the curve is caused by a change in own price, while a shift is caused by changes in technology, input prices, or excise taxes",
    [
        "Movement along the curve occurs only in the long run while shifts occur daily",
        "Shifts in supply curve are caused solely by changes in commodity own price",
        "There is no distinction between movements and shifts in supply theory"
    ],
    "C",
    "1. Expansion or contraction of supply (movement along the curve) is caused exclusively by changes in own price. Increase or decrease in supply (shifts) is caused by non-price factors (wages, raw material costs, technology, taxes).\nHence, Option {{CORR}} is correct.",
    "Differentiates movement along vs shift of supply curve."
)
add_q(make_question(CHAPTER, "Theory of Supply", "How does a 'movement along the supply curve' differ from a 'shift of the supply curve'?", opts, corr, sol))

# 104. Rightward shift of supply curve causes
opts, corr, sol = rotate_options(
    "Technological advancement reducing production cost or a fall in the price of factor inputs",
    [
        "An increase in the commodity's own market price",
        "An increase in excise taxes levied on production",
        "A sharp rise in industrial electricity tariffs"
    ],
    "D",
    "1. An increase in supply (rightward shift) occurs when marginal cost falls at all output levels, which happens due to technological innovations, cheaper raw materials, lower input prices, or government production subsidies.\nHence, Option {{CORR}} is correct.",
    "Identifies drivers of rightward supply shift."
)
add_q(make_question(CHAPTER, "Theory of Supply", "Which of the following factors causes a rightward shift of the market supply curve?", opts, corr, sol))

# 105. Price Elasticity of Supply (e_s) formula
opts, corr, sol = rotate_options(
    "e_s = (Percentage change in Quantity Supplied) / (Percentage change in Price)",
    [
        "e_s = - (Percentage change in Quantity Demanded) / (Percentage change in Price)",
        "e_s = Total Revenue / Total Fixed Cost",
        "e_s = Delta P / Delta Q * (Q / P)"
    ],
    "A",
    "1. Price Elasticity of Supply ($e_s$) measures the responsiveness of quantity supplied to changes in price: $e_s = \\frac{\\% \\Delta Q_s}{\\% \\Delta P} = \\frac{\\Delta Q_s}{\\Delta P} \\times \\frac{P}{Q_s}$.\nHence, Option {{CORR}} is correct.",
    "States formula for price elasticity of supply."
)
add_q(make_question(CHAPTER, "Price Elasticity of Supply", "What is the formula for calculating the Price Elasticity of Supply (e_s)?", opts, corr, sol))

# 106. Numerical Elasticity of Supply
opts, corr, sol = rotate_options(
    "1.25",
    [
        "0.80",
        "1.00",
        "2.00"
    ],
    "B",
    "1. Initial $P_1 = 10$, new $P_2 = 12 \\implies \\Delta P = 2$ (20% increase).\n2. Initial $Q_1 = 100$, new $Q_2 = 125 \\implies \\Delta Q = 25$ (25% increase).\n3. $e_s = \\frac{\\% \\Delta Q}{\\% \\Delta P} = \\frac{25\\%}{20\\%} = 1.25$.\nHence, Option {{CORR}} is correct.",
    "Calculates price elasticity of supply as 1.25."
)
add_q(make_question(CHAPTER, "Price Elasticity of Supply", "When the market price of a commodity increases from Rs. 10 to Rs. 12 per unit, the quantity supplied rises from 100 units to 125 units. What is the Price Elasticity of Supply?", opts, corr, sol))

# 107. Geometric method: Straight-line supply curve passing through origin
opts, corr, sol = rotate_options(
    "e_s = 1 (Unitary elastic) at all points along the curve, regardless of its angle of inclination",
    [
        "e_s > 1 at all points",
        "e_s < 1 at all points",
        "e_s = 0 at the origin"
    ],
    "C",
    "1. By the geometric property of straight-line supply curves, any straight supply curve passing through the origin $(0,0)$ has an elasticity of supply equal to 1 ($e_s = 1$) at every single point, whether it is steep or flat.\nHence, Option {{CORR}} is correct.",
    "Proves unitary elasticity for supply curve through origin."
)
add_q(make_question(CHAPTER, "Price Elasticity of Supply", "What is the price elasticity of supply for any linear supply curve that passes directly through the origin?", opts, corr, sol))

# 108. Geometric method: Supply curve intersecting price (vertical) axis
opts, corr, sol = rotate_options(
    "e_s > 1 (Elastic) at all points on the curve",
    [
        "e_s < 1 (Inelastic) at all points",
        "e_s = 1 at all points",
        "e_s = 0 at the intercept"
    ],
    "D",
    "1. A straight-line supply curve that intercepts the vertical (price) axis has an intercept on the negative quantity axis, meaning $e_s = \\frac{Q - (-c)}{Q} = \\frac{Q + c}{Q} > 1$. Hence, supply is elastic ($e_s > 1$).\nHence, Option {{CORR}} is correct.",
    "Identifies e_s > 1 when supply intercepts price axis."
)
add_q(make_question(CHAPTER, "Price Elasticity of Supply", "If a linear supply curve intercepts the vertical price axis (Y-axis), what is the degree of price elasticity of supply?", opts, corr, sol))

# 109. Geometric method: Supply curve intersecting quantity (horizontal) axis
opts, corr, sol = rotate_options(
    "e_s < 1 (Inelastic) at all points on the curve",
    [
        "e_s > 1 at all points",
        "e_s = 1 at all points",
        "e_s = infinity at all points"
    ],
    "A",
    "1. A straight-line supply curve that intercepts the horizontal (quantity) axis has a positive intercept $c$, giving $e_s = \\frac{Q - c}{Q} < 1$. Thus, supply is inelastic ($e_s < 1$).\nHence, Option {{CORR}} is correct.",
    "Identifies e_s < 1 when supply intercepts quantity axis."
)
add_q(make_question(CHAPTER, "Price Elasticity of Supply", "If a straight-line upward-sloping supply curve intersects the horizontal quantity axis (X-axis), what is its price elasticity of supply?", opts, corr, sol))

# 110. Perfectly Inelastic Supply Curve
opts, corr, sol = rotate_options(
    "A vertical straight line parallel to the price axis with e_s = 0",
    [
        "A horizontal straight line parallel to the quantity axis with e_s = infinity",
        "A 45-degree ray passing through the origin",
        "A rectangular hyperbola asymptotic to both axes"
    ],
    "B",
    "1. When quantity supplied is fixed and cannot respond to price changes (e.g. perishable fish at end of day, rare antique paintings), the supply curve is a vertical straight line parallel to the price axis ($e_s = 0$).\nHence, Option {{CORR}} is correct.",
    "Identifies vertical supply curve with e_s = 0."
)
add_q(make_question(CHAPTER, "Price Elasticity of Supply", "What is the graphical shape and elasticity value of a Perfectly Inelastic Supply curve?", opts, corr, sol))

# 111. Perfectly Elastic Supply Curve
opts, corr, sol = rotate_options(
    "A horizontal straight line parallel to the quantity axis with e_s = infinity",
    [
        "A vertical straight line parallel to the price axis with e_s = 0",
        "A curve starting from origin with slope equal to 1",
        "A downward-sloping linear curve"
    ],
    "C",
    "1. When producers are willing to supply any quantity at a prevailing price but supply falls to zero at any lower price, the supply curve is a horizontal straight line parallel to the X-axis ($e_s = \\infty$).\nHence, Option {{CORR}} is correct.",
    "Identifies horizontal supply curve with e_s = infinity."
)
add_q(make_question(CHAPTER, "Price Elasticity of Supply", "What is the graphical representation and elasticity value of a Perfectly Elastic Supply curve?", opts, corr, sol))

# 112. Factor affecting elasticity of supply: Time period
opts, corr, sol = rotate_options(
    "Supply is more elastic in the long run because firms can adjust plant capacity and new firms can enter",
    [
        "Supply is perfectly inelastic in the long run and elastic in the market period",
        "Time horizon has zero influence on producer supply flexibility",
        "Supply elasticity decreases over time due to machine depreciation"
    ],
    "D",
    "1. In the very short run (market period), supply is fixed/inelastic. In the short run, variable inputs can adjust (more elastic). In the long run, all factors can expand and firms can enter/exit, making long-run supply highly elastic.\nHence, Option {{CORR}} is correct.",
    "Explains that supply elasticity increases with time horizon."
)
add_q(make_question(CHAPTER, "Price Elasticity of Supply", "How does the length of the time horizon affect the Price Elasticity of Supply?", opts, corr, sol))

# 113. Perishability of commodity and supply elasticity
opts, corr, sol = rotate_options(
    "Perishable goods have low elasticity of supply because they cannot be stored for future price rises",
    [
        "Perishable goods have infinite elasticity of supply",
        "Durable goods have lower elasticity than perishable goods",
        "Perishability has no effect on supply responsiveness"
    ],
    "A",
    "1. Perishable commodities (vegetables, milk, fish) cannot be stored and must be sold off quickly, making their supply inelastic. Durable goods can be held in warehouses, making their supply elastic.\nHence, Option {{CORR}} is correct.",
    "Links perishability to inelastic supply."
)
add_q(make_question(CHAPTER, "Price Elasticity of Supply", "How does the perishability of a good influence its Price Elasticity of Supply?", opts, corr, sol))

# 114. Match Supply Curve intercepts with elasticity
add_q(make_match_question(
    CHAPTER, "Supply Elasticity Matrix",
    "Match the straight-line supply curve intercepts in List I with their corresponding price elasticities in List II:",
    [
        ("A", "Passes through the origin (0,0)"),
        ("B", "Intercepts the vertical Price axis"),
        ("C", "Intercepts the horizontal Quantity axis"),
        ("D", "Vertical straight line parallel to price axis")
    ],
    [
        ("I", "e_s > 1 (Elastic)"),
        ("II", "e_s = 0 (Perfectly inelastic)"),
        ("III", "e_s = 1 (Unitary elastic)"),
        ("IV", "e_s < 1 (Inelastic)")
    ],
    "A-(III), B-(I), C-(IV), D-(II)",
    [
        "A-(I), B-(III), C-(IV), D-(II)",
        "A-(III), B-(IV), C-(I), D-(II)",
        "A-(IV), B-(I), C-(II), D-(III)"
    ],
    "A",
    "1. Origin -> e_s = 1 (III).\n2. Price axis intercept -> e_s > 1 (I).\n3. Quantity axis intercept -> e_s < 1 (IV).\n4. Vertical line -> e_s = 0 (II).\nHence, Option A is correct."
))

# 115. Statement I & II: Technology and Supply
add_q(make_statement_question(
    CHAPTER, "Theory of Supply",
    "Technological advancement reduces marginal cost of production, shifting the firm's supply curve rightward.",
    "An increase in unit excise duty shifts the marginal cost curve upward and the supply curve leftward.",
    "A",
    "1. Statement I is true: Better technology lowers cost, shifting supply rightward.\n2. Statement II is true: Unit tax raises marginal cost, shifting supply leftward.\nHence, both statements are true (Option A)."
))

# 116. Assertion & Reason: Why supply curve slopes upward
add_q(make_assertion_question(
    CHAPTER, "Theory of Supply",
    "The short-run supply curve of a competitive firm slopes upward to the right.",
    "Due to the Law of Diminishing Marginal Product, producing extra output incurs rising Marginal Cost, requiring higher prices to induce more production.",
    "A",
    "1. Assertion is true: Competitive supply curve slopes upward.\n2. Reason is true: The supply curve is the MC curve. Diminishing returns make MC rise, so higher output requires a higher price.\n3. Reason correctly explains Assertion.\nHence, Option A is correct."
))

# 117. Numerical Supply Elasticity: Finding percentage change in quantity
opts, corr, sol = rotate_options(
    "30% increase in quantity supplied",
    [
        "15% increase in quantity supplied",
        "7.5% increase in quantity supplied",
        "20% increase in quantity supplied"
    ],
    "B",
    "1. Given: $e_s = 2.0$, percentage rise in price = $15\\%$.\n2. $e_s = \\frac{\\% \\Delta Q_s}{\\% \\Delta P} \\implies 2.0 = \\frac{\\% \\Delta Q_s}{15\\%}$.\n3. $\\% \\Delta Q_s = 2.0 \\times 15\\% = 30\\%$ expansion in quantity supplied.\nHence, Option {{CORR}} is correct.",
    "Computes percentage quantity change from supply elasticity."
)
add_q(make_question(CHAPTER, "Price Elasticity of Supply", "The price elasticity of supply for a manufacturing firm is 2.0. If the market price increases by 15%, what will be the percentage change in quantity supplied?", opts, corr, sol))

# 118. Excise tax impact on producer equilibrium
opts, corr, sol = rotate_options(
    "Shifts the MC curve upward, reducing the equilibrium output supplied by the firm",
    [
        "Shifts the MC curve downward, increasing equilibrium output",
        "Leaves the MC curve unchanged while shifting the AR curve upward",
        "Forces the firm to permanently shut down production"
    ],
    "C",
    "1. A per-unit excise tax raises the marginal cost at every output level ($MC' = MC + t$), shifting the MC curve upward. With constant price $P$, the intersection $MR = MC'$ occurs at a smaller output.\nHence, Option {{CORR}} is correct.",
    "Analyzes tax incidence on MC and supply reduction."
)
add_q(make_question(CHAPTER, "Theory of Supply", "What is the economic impact of imposing a per-unit tax (t) on the production of a competitive firm?", opts, corr, sol))

# 119. Production subsidy impact on producer equilibrium
opts, corr, sol = rotate_options(
    "Shifts the MC curve downward, increasing the equilibrium output supplied",
    [
        "Shifts the MC curve upward, decreasing equilibrium output",
        "Shifts the demand curve leftward without affecting cost",
        "Causes price elasticity of supply to drop to zero"
    ],
    "D",
    "1. A per-unit subsidy reduces effective marginal cost ($MC' = MC - s$), shifting the MC curve downward. The intersection $MR = MC'$ moves to a higher output level, expanding supply.\nHence, Option {{CORR}} is correct.",
    "Shows subsidy lowers MC and expands supply."
)
add_q(make_question(CHAPTER, "Theory of Supply", "How does a government per-unit production subsidy affect a competitive firm's Marginal Cost curve and supply output?", opts, corr, sol))

# 120. Input price increase impact on market supply
opts, corr, sol = rotate_options(
    "Increases marginal costs and shifts the market supply curve leftward (decrease in supply)",
    [
        "Decreases marginal costs and shifts the supply curve rightward",
        "Causes an expansion along the existing market supply curve",
        "Has no effect because input prices only affect accounting profit"
    ],
    "A",
    "1. When factor prices (such as agricultural wages or fuel tariffs) rise, production becomes more expensive, raising marginal cost and shifting the market supply curve leftward.\nHence, Option {{CORR}} is correct.",
    "Traces input price hike to leftward supply shift."
)
add_q(make_question(CHAPTER, "Theory of Supply", "If the market price of crude oil rises, how does this input shock impact the market supply curve for synthetic textiles?", opts, corr, sol))

# Verify count and uniqueness
assert len(questions) == 120, f"Expected 120 questions, got {len(questions)}"
print(f"Successfully generated {len(questions)} unique questions for Unit 3!")

out_path = "mock/eco_units/unit3.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)
print(f"Saved to {out_path}")
