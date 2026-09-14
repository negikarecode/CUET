import json, re

def normalize_text(text):
    if not text: return ""
    t = text.lower()
    t = re.sub(r"\[cite:[^\]]+\]", "", t)
    t = re.sub(r"\\[a-zA-Z]+", "", t)
    t = re.sub(r"[\$\\\{\}\(\)\[\]_^\s\.,;:\-\+=\*\/<>]+", "", t)
    return t

seen = set()
for m in range(1, 21):
    if m == 12: continue
    with open(f"mock/maths/{m}.json") as f:
        for q in json.load(f):
            seen.add(normalize_text(q["questionText"]))

with open("mock/maths/12.json") as f:
    m12 = json.load(f)

# Also add Q1, Q36, Q37 from m12 to seen
for idx in [0, 35, 36]:
    seen.add(normalize_text(m12[idx]["questionText"]))

def make_q(qn, chapter, topic, text, opts, correct, sol):
    return {
        "questionNumber": qn,
        "chapter": chapter,
        "topic": topic,
        "questionText": text,
        "hasDiagram": False,
        "diagramDescription": "",
        "options": [
            {
                "id": opt_id,
                "text": opt_text,
                "isCorrect": (opt_id == correct),
                "studentSelectionTrap": f"Option {opt_id} misconception trap." if opt_id != correct else "Correctly applied formula.",
                "mistakeAnalysis": f"Student evaluated incorrectly for {opt_id}." if opt_id != correct else "Accurate step-by-step reasoning."
            }
            for opt_id, opt_text in zip(["A", "B", "C", "D"], opts)
        ],
        "correctOption": correct,
        "detailedSolution": sol
    }

replacements = {
    2: make_q(
        2, "Vector Algebra", "Area of Parallelogram Using Cross Product",
        "The diagonals of a parallelogram are represented by the vectors $\\vec{d_1} = 3\\hat{i} + \\hat{j} - 2\\hat{k}$ and $\\vec{d_2} = \\hat{i} - 3\\hat{j} + 4\\hat{k}$. What is the area (in square units) of the parallelogram?",
        ["$5\\sqrt{3}$", "$10\\sqrt{3}$", "$15\\sqrt{3}$", "$20\\sqrt{3}$"],
        "A",
        "The area of a parallelogram with diagonals $\\vec{d_1}$ and $\\vec{d_2}$ is given by $\\frac{1}{2} |\\vec{d_1} \\times \\vec{d_2}|$.\n\nFirst calculate $\\vec{d_1} \\times \\vec{d_2}$:\n$$\\vec{d_1} \\times \\vec{d_2} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 3 & 1 & -2 \\\\ 1 & -3 & 4 \\end{vmatrix} = \\hat{i}(4 - 6) - \\hat{j}(12 - (-2)) + \\hat{k}(-9 - 1) = -2\\hat{i} - 14\\hat{j} - 10\\hat{k}$$\n\nNow, find the magnitude:\n$$|\\vec{d_1} \\times \\vec{d_2}| = \\sqrt{(-2)^2 + (-14)^2 + (-10)^2} = \\sqrt{4 + 196 + 100} = \\sqrt{300} = 10\\sqrt{3}$$\n\nTherefore, Area = $\\frac{1}{2} (10\\sqrt{3}) = 5\\sqrt{3}$ sq. units."
    ),
    3: make_q(
        3, "Probability", "Conditional Probability",
        "An urn contains 6 red and 4 black balls. Two balls are drawn at random one after another without replacement. If the second ball drawn is known to be red, what is the conditional probability that the first ball drawn was also red?",
        ["$\\frac{5}{9}$", "$\\frac{1}{3}$", "$\\frac{2}{5}$", "$\\frac{1}{2}$"],
        "A",
        "Let $R_1$ be the event that the first ball is red, and $R_2$ be the event that the second ball is red.\n$P(R_1) = \\frac{6}{10} = \\frac{3}{5}$, $P(B_1) = \\frac{4}{10} = \\frac{2}{5}$.\n$P(R_2 | R_1) = \\frac{5}{9}$, $P(R_2 | B_1) = \\frac{6}{9}$.\nTotal probability of $R_2$:\n$$P(R_2) = P(R_1)P(R_2|R_1) + P(B_1)P(R_2|B_1) = \\frac{6}{10}\\cdot\\frac{5}{9} + \\frac{4}{10}\\cdot\\frac{6}{9} = \\frac{30 + 24}{90} = \\frac{54}{90} = \\frac{3}{5}$$\nBy Bayes theorem:\n$$P(R_1 | R_2) = \\frac{P(R_1 \\cap R_2)}{P(R_2)} = \\frac{\\frac{30}{90}}{\\frac{54}{90}} = \\frac{30}{54} = \\frac{5}{9}$$"
    ),
    4: make_q(
        4, "Differential Equations", "Particular Solution of Separable Differential Equations",
        "Find the particular solution of the differential equation $\\frac{dy}{dx} = \\frac{1 + y^2}{1 + x^2}$, given that $y(0) = 1$.",
        ["$y = \\frac{1+x}{1-x}$", "$y = \\frac{1-x}{1+x}$", "$y = \\frac{x-1}{x+1}$", "$y = 1 + x$"],
        "A",
        "Separating the variables:\n$$\\frac{dy}{1 + y^2} = \\frac{dx}{1 + x^2}$$\nIntegrating both sides:\n$$\\tan^{-1} y = \\tan^{-1} x + C$$\nUsing the initial condition $y(0) = 1$:\n$$\\tan^{-1}(1) = \\tan^{-1}(0) + C \\implies \\frac{\\pi}{4} = 0 + C \\implies C = \\frac{\\pi}{4}$$\nThus:\n$$\\tan^{-1} y - \\tan^{-1} x = \\frac{\\pi}{4} \\implies \\tan^{-1}\\left(\\frac{y - x}{1 + xy}\\right) = \\frac{\\pi}{4}$$\nTaking tangent on both sides:\n$$\\frac{y - x}{1 + xy} = 1 \\implies y - x = 1 + xy \\implies y(1 - x) = 1 + x \\implies y = \\frac{1 + x}{1 - x}$$"
    ),
    5: make_q(
        5, "Linear Programming", "Fundamental Theorem of Linear Programming",
        "In a linear programming problem, if the objective function $Z = ax + by$ takes the same maximum value at two distinct corner points $(2, 5)$ and $(4, 1)$ of the feasible region, then the relation between $a$ and $b$ is:",
        ["$a = 2b$", "$2a = b$", "$a + 2b = 0$", "$a = b$"],
        "A",
        "Since the objective function $Z$ attains the same value at both corner points $(2, 5)$ and $(4, 1)$:\n$$Z(2, 5) = 2a + 5b$$\n$$Z(4, 1) = 4a + b$$\nEquating them:\n$$2a + 5b = 4a + b \\implies 5b - b = 4a - 2a \\implies 4b = 2a \\implies a = 2b$$"
    ),
    6: make_q(
        6, "Application of Derivatives", "Local Extrema of Polynomial Functions",
        "Find the point of local minimum for the function $f(x) = 2x^3 - 9x^2 + 12x + 5$.",
        ["$x = 2$", "$x = 1$", "$x = 3$", "$x = 0$"],
        "A",
        "Differentiating $f(x)$ with respect to $x$:\n$$f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2)$$\nSetting $f'(x) = 0$ gives critical points $x = 1$ and $x = 2$.\nSecond derivative:\n$$f''(x) = 12x - 18$$\nAt $x = 1$: $f''(1) = 12(1) - 18 = -6 < 0$ (Local maximum).\nAt $x = 2$: $f''(2) = 12(2) - 18 = 6 > 0$ (Local minimum).\nTherefore, $x = 2$ is the point of local minimum."
    ),
    7: make_q(
        7, "Financial Mathematics", "Book Value under Straight Line Depreciation",
        "A company purchases equipment for Rs. 80,000 with an estimated useful life of 6 years and a scrap value of Rs. 8,000. Under the straight-line method, what is the book value of the equipment at the end of 4 years?",
        ["Rs. 32,000", "Rs. 44,000", "Rs. 28,000", "Rs. 36,000"],
        "A",
        "Annual depreciation $D$ under the straight line method is:\n$$D = \\frac{\\text{Cost} - \\text{Scrap Value}}{\\text{Useful Life}} = \\frac{80000 - 8000}{6} = \\frac{72000}{6} = \\text{Rs. } 12,000$$\nAccumulated depreciation after 4 years:\n$$4 \\times 12,000 = \\text{Rs. } 48,000$$\nBook Value at the end of 4 years:\n$$\\text{Book Value} = \\text{Cost} - \\text{Accumulated Depreciation} = 80,000 - 48,000 = \\text{Rs. } 32,000$$"
    ),
    8: make_q(
        8, "Financial Mathematics", "Effective Rate of Interest",
        "What is the effective annual rate of interest corresponding to a nominal rate of 8% per annum compounded quarterly? (Use $(1.02)^4 = 1.0824$)",
        ["8.24%", "8.16%", "8.00%", "8.32%"],
        "A",
        "The effective annual rate of interest $r_{eff}$ is given by:\n$$r_{eff} = \\left(1 + \\frac{r}{m}\\right)^m - 1$$\nHere, $r = 0.08$ and $m = 4$ (quarterly compounding):\n$$r_{eff} = \\left(1 + \\frac{0.08}{4}\\right)^4 - 1 = (1.02)^4 - 1 = 1.0824 - 1 = 0.0824 = 8.24\\%$$"
    ),
    9: make_q(
        9, "Probability Distributions", "Poisson Distribution Applications",
        "A call center receives phone calls according to a Poisson distribution with an average of 3 calls per minute. What is the probability that no calls are received in a randomly chosen minute? (Given $e^{-3} \\approx 0.0498$)",
        ["0.0498", "0.0183", "0.1494", "0.2240"],
        "A",
        "For a Poisson distribution with parameter $\\lambda$:\n$$P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$$\nHere $\\lambda = 3$ and $k = 0$:\n$$P(X = 0) = \\frac{e^{-3} \\cdot 3^0}{0!} = e^{-3} \\approx 0.0498$$"
    ),
    10: make_q(
        10, "Continuity and Differentiability", "Second Order Derivatives and Proportionality Constant",
        "If $y = A \\sin(3x) + B \\cos(3x)$, where $A$ and $B$ are constants, then the second derivative satisfies $\\frac{d^2y}{dx^2} + k y = 0$ for $k$ equal to:",
        ["9", "-9", "3", "-3"],
        "A",
        "First derivative:\n$$\\frac{dy}{dx} = 3A \\cos(3x) - 3B \\sin(3x)$$\nSecond derivative:\n$$\\frac{d^2y}{dx^2} = -9A \\sin(3x) - 9B \\cos(3x) = -9(A \\sin(3x) + B \\cos(3x)) = -9y$$\nTherefore:\n$$\\frac{d^2y}{dx^2} + 9y = 0$$\nThus $k = 9$."
    ),
    11: make_q(
        11, "Inferential Statistics", "Point Estimation of Population Mean",
        "A random sample of size $n = 64$ is drawn from a normal population with standard deviation $\\sigma = 16$. If the sample mean is $\\bar{x} = 75$, what is the standard error of the sample mean?",
        ["2", "4", "0.25", "1.5"],
        "A",
        "The standard error (SE) of the sample mean is given by:\n$$\\text{SE} = \\frac{\\sigma}{\\sqrt{n}}$$\nGiven $\\sigma = 16$ and $n = 64$:\n$$\\text{SE} = \\frac{16}{\\sqrt{64}} = \\frac{16}{8} = 2$$"
    ),
    12: make_q(
        12, "Probability Distributions", "Discrete Probability Distribution Normalization",
        "A discrete random variable $X$ has the probability distribution given by $P(X = x) = k(x + 1)$ for $x = 0, 1, 2, 3$, and $P(X = x) = 0$ otherwise. Find the value of constant $k$.",
        ["0.1", "0.2", "0.05", "0.25"],
        "A",
        "Since the sum of all probabilities in a probability distribution must equal 1:\n$$\\sum_{x=0}^3 P(X = x) = k(0 + 1) + k(1 + 1) + k(2 + 1) + k(3 + 1) = 1$$\n$$k(1 + 2 + 3 + 4) = 1 \\implies 10k = 1 \\implies k = \\frac{1}{10} = 0.1$$"
    ),
    13: make_q(
        13, "Time Series Analysis", "Moving Average Period Determination",
        "For the annual production figures (in metric tons) over 5 consecutive years: 24, 28, 32, 36, 40, what is the 3-year moving average centered at the third year?",
        ["32", "30", "34", "28"],
        "A",
        "The 3-year moving average for the third year uses the values of year 2, year 3, and year 4:\n$$\\text{Moving Average} = \\frac{28 + 32 + 36}{3} = \\frac{96}{3} = 32$$"
    ),
    14: make_q(
        14, "Matrices", "Symmetric Matrix System of Equations",
        "If the matrix $A = \\begin{bmatrix} 2 & a - 2b & 5 \\\\ 3 & 4 & b + 1 \\\\ 5 & 7 & 6 \\end{bmatrix}$ is a symmetric matrix, then the values of $a$ and $b$ are respectively:",
        ["$a = 15, b = 6$", "$a = 9, b = 6$", "$a = 12, b = 3$", "$a = 15, b = 7$"],
        "A",
        "For a matrix $A$ to be symmetric, $A = A^T$, meaning $a_{ij} = a_{ji}$ for all $i, j$.\nFrom $a_{23} = a_{32}$:\n$$b + 1 = 7 \\implies b = 6$$\nFrom $a_{12} = a_{21}$:\n$$a - 2b = 3 \\implies a - 2(6) = 3 \\implies a - 12 = 3 \\implies a = 15$$\nThus $a = 15$ and $b = 6$."
    ),
    15: make_q(
        15, "Financial Mathematics", "Equated Monthly Installments (EMI) Calculation",
        "Under the flat rate method, a loan of Rs. 1,20,000 is to be repaid in 12 equal monthly installments at 10% annual simple interest. What is the equated monthly installment (EMI)?",
        ["Rs. 11,000", "Rs. 10,000", "Rs. 11,500", "Rs. 12,000"],
        "A",
        "Under the flat rate method:\nSimple Interest $I = \\frac{P \\times r \\times t}{100} = \\frac{120000 \\times 10 \\times 1}{100} = \\text{Rs. } 12,000$.\nTotal repayment amount = $P + I = 1,20,000 + 12,000 = \\text{Rs. } 1,32,000$.\nNumber of monthly installments $n = 12$.\n$$\\text{EMI} = \\frac{1,32,000}{12} = \\text{Rs. } 11,000$$"
    ),
    16: make_q(
        16, "Inferential Statistics", "Confidence Intervals for Population Mean",
        "For a large random sample of size $n = 100$ with sample mean $\\bar{x} = 50$ from a population with known standard deviation $\\sigma = 10$, what is the 95% confidence interval for the population mean $\\mu$? (Use $z_{0.025} = 1.96$)",
        ["$[48.04, 51.96]$", "$[47.50, 52.50]$", "$[49.02, 50.98]$", "$[46.08, 53.92]$"],
        "A",
        "The $95\\%$ confidence interval for $\\mu$ is given by:\n$$\\bar{x} \\pm z_{\\alpha/2} \\cdot \\frac{\\sigma}{\\sqrt{n}}$$\nHere $\\bar{x} = 50$, $\\sigma = 10$, $n = 100$, and $z_{\\alpha/2} = 1.96$:\n$$\\text{Margin of Error} = 1.96 \\times \\frac{10}{\\sqrt{100}} = 1.96 \\times 1 = 1.96$$\nLower limit = $50 - 1.96 = 48.04$\nUpper limit = $50 + 1.96 = 51.96$\nHence, the interval is $[48.04, 51.96]$."
    ),
    17: make_q(
        17, "Financial Mathematics", "Financial Accounts and Cash Flow Instruments",
        "Which of the following best defines a 'Perpetuity' in financial mathematics?",
        [
            "An annuity where cash flows continue indefinitely with no fixed termination date",
            "An annuity with payments made only at the beginning of each year for a fixed term of 10 years",
            "A sinking fund established to pay off a single lump-sum debt after 5 years",
            "A loan repayment schedule based strictly on the reducing balance method"
        ],
        "A",
        "A perpetuity is an infinite series of periodic cash flows of equal magnitude that continue forever without an end date. The present value of a standard perpetuity is given by $PV = \\frac{R}{i}$."
    ),
    18: make_q(
        18, "Determinants", "Evaluation of Determinants Using Row Operations",
        "Evaluate the value of the determinant $\\begin{vmatrix} 1 & a & b+c \\\\ 1 & b & c+a \\\\ 1 & c & a+b \\end{vmatrix}$.",
        ["0", "$a+b+c$", "$(a-b)(b-c)(c-a)$", "1"],
        "A",
        "Applying the elementary column operation $C_3 \\to C_3 + C_2$:\n$$\\begin{vmatrix} 1 & a & a+b+c \\\\ 1 & b & a+b+c \\\\ 1 & c & a+b+c \\end{vmatrix}$$\nFactoring out $(a+b+c)$ from column 3:\n$$(a+b+c) \\begin{vmatrix} 1 & a & 1 \\\\ 1 & b & 1 \\\\ 1 & c & 1 \\end{vmatrix}$$\nSince column 1 and column 3 are identical, the value of the determinant is $(a+b+c) \\times 0 = 0$."
    ),
    19: make_q(
        19, "Financial Mathematics", "Compound Annual Growth Rate",
        "An initial investment of Rs. 10,000 grows to Rs. 14,400 in 2 years. What is the Compound Annual Growth Rate (CAGR)?",
        ["20%", "22%", "44%", "14.4%"],
        "A",
        "The formula for Compound Annual Growth Rate is:\n$$\\text{CAGR} = \\left(\\frac{V_{\\text{final}}}{V_{\\text{begin}}}\\right)^{1/n} - 1$$\nHere $V_{\\text{final}} = 14400$, $V_{\\text{begin}} = 10000$, and $n = 2$:\n$$\\text{CAGR} = \\left(\\frac{14400}{10000}\\right)^{1/2} - 1 = (1.44)^{0.5} - 1 = 1.20 - 1 = 0.20 = 20\\%$$"
    ),
    20: make_q(
        20, "Application of Derivatives", "Intervals of Increase and Decrease for Cubic Polynomials",
        "Find the open interval in which the function $f(x) = x^3 - 12x + 7$ is strictly increasing.",
        ["$(-\\infty, -2) \\cup (2, \\infty)$", "$(-2, 2)$", "$[-2, 2]$", "$(0, \\infty)$"],
        "A",
        "Differentiating $f(x)$:\n$$f'(x) = 3x^2 - 12 = 3(x^2 - 4) = 3(x - 2)(x + 2)$$\nFor strictly increasing, $f'(x) > 0$:\n$$(x - 2)(x + 2) > 0 \\implies x < -2 \\text{ or } x > 2$$\nIn interval notation, this corresponds to $(-\\infty, -2) \\cup (2, \\infty)$."
    ),
    21: make_q(
        21, "Linear Programming", "Graphical Feasible Region Maximization",
        "The corner points of the feasible region determined by a system of linear inequalities are $(0, 0), (0, 4), (3, 3),$ and $(5, 0)$. For the objective function $Z = 4x + 3y$, what is the maximum value of $Z$?",
        ["21", "20", "12", "25"],
        "A",
        "Evaluate the objective function $Z = 4x + 3y$ at each corner point:\nAt $(0, 0)$: $Z = 4(0) + 3(0) = 0$\nAt $(0, 4)$: $Z = 4(0) + 3(4) = 12$\nAt $(3, 3)$: $Z = 4(3) + 3(3) = 12 + 9 = 21$\nAt $(5, 0)$: $Z = 4(5) + 3(0) = 20$\nThe maximum value is 21, which occurs at the corner point $(3, 3)$."
    ),
    22: make_q(
        22, "Probability Distributions", "Binomial Distribution Parameter Recovery",
        "In a binomial distribution, the mean is 4 and the variance is 3. What is the total number of trials $n$?",
        ["16", "12", "20", "8"],
        "A",
        "For a binomial distribution:\n$$\\text{Mean} = np = 4$$\n$$\\text{Variance} = npq = 3$$\nDividing variance by mean gives:\n$$q = \\frac{npq}{np} = \\frac{3}{4}$$\nSince $p + q = 1$:\n$$p = 1 - \\frac{3}{4} = \\frac{1}{4}$$\nNow, substitute $p$ into the mean formula:\n$$n \\left(\\frac{1}{4}\\right) = 4 \\implies n = 16$$"
    ),
    23: make_q(
        23, "Time Series Analysis", "Rate of Trend Change (Slope Parameter)",
        "The linear trend line fitted to annual time series data is given by $Y_t = 45 + 3.2 t$, where $t$ is time in years with origin $t = 0$ in the year 2020. What is the estimated trend value for the year 2025?",
        ["61.0", "58.2", "64.2", "60.0"],
        "A",
        "For the year 2025, the value of $t$ is:\n$$t = 2025 - 2020 = 5$$\nSubstituting $t = 5$ into the trend equation:\n$$Y_5 = 45 + 3.2(5) = 45 + 16.0 = 61.0$$"
    ),
    24: make_q(
        24, "Determinants", "Properties of Matrix Determinants and Adjoints",
        "If $A$ is a square matrix of order $3 \\times 3$ with determinant $|A| = 4$, what is the value of $|\\text{adj}(A)|$?",
        ["16", "64", "4", "8"],
        "A",
        "For an $n \\times n$ square matrix $A$, the determinant of its adjoint is given by the property:\n$$|\\text{adj}(A)| = |A|^{n-1}$$\nHere order $n = 3$ and $|A| = 4$:\n$$|\\text{adj}(A)| = 4^{3-1} = 4^2 = 16$$"
    ),
    25: make_q(
        25, "Linear Programming", "Core Components of Linear Programming Problems",
        "Which of the following conditions represents the non-negativity restrictions in standard linear programming models with decision variables $x_1$ and $x_2$?",
        ["$x_1 \\ge 0, x_2 \\ge 0$", "$x_1 + x_2 \\le 0$", "$x_1 > 0, x_2 < 0$", "$x_1 \\le 0, x_2 \\le 0$"],
        "A",
        "In linear programming formulations, decision variables represent physical quantities (like units produced, hours spent) which cannot take negative values. Hence, standard non-negativity restrictions are stated as $x_1 \\ge 0, x_2 \\ge 0$."
    ),
    26: make_q(
        26, "Determinants", "Homogeneous System Non-Trivial Solution",
        "For what positive value of $k$ does the homogeneous system of linear equations $x + 2y + 3z = 0$, $2x + ky + 6z = 0$, $3x + y + 4z = 0$ have a non-trivial solution?",
        ["4", "2", "-4", "6"],
        "A",
        "A homogeneous system has non-trivial solutions if and only if the determinant of the coefficient matrix is zero:\n$$\\begin{vmatrix} 1 & 2 & 3 \\\\ 2 & k & 6 \\\\ 3 & 1 & 4 \\end{vmatrix} = 0$$\nExpanding along row 1:\n$$1(4k - 6) - 2(8 - 18) + 3(2 - 3k) = 0$$\n$$4k - 6 - 2(-10) + 6 - 9k = 0$$\n$$4k - 9k - 6 + 20 + 6 = 0$$\n$$-5k + 20 = 0 \\implies 5k = 20 \\implies k = 4$$"
    ),
    27: make_q(
        27, "Financial Mathematics", "Sinking Fund Annual Deposit Calculation",
        "A company creates a sinking fund to accumulate Rs. 1,00,000 at the end of 5 years at an interest rate of 10% compounded annually. Given that $\\frac{(1.10)^5 - 1}{0.10} \\approx 6.1051$, what is the equal annual deposit $R$ made at the end of each year?",
        ["Rs. 16,380", "Rs. 20,000", "Rs. 14,500", "Rs. 18,200"],
        "A",
        "The accumulated amount $A$ of an ordinary annuity sinking fund is:\n$$A = R \\left[\\frac{(1 + i)^n - 1}{i}\\right]$$\nSubstituting $A = 1,00,000$ and $s_{\\overline{5}|0.10} = 6.1051$:\n$$1,00,000 = R \\times 6.1051 \\implies R = \\frac{1,00,000}{6.1051} \\approx \\text{Rs. } 16,379.75 \\approx \\text{Rs. } 16,380$$"
    ),
    28: make_q(
        28, "Inferential Statistics", "One-Sample Student's t-Test Hypothesis Testing",
        "When performing a one-sample Student's $t$-test with a random sample of size $n = 16$ from a normal distribution with unknown variance, what are the degrees of freedom for the test statistic?",
        ["15", "16", "14", "30"],
        "A",
        "For a one-sample Student's $t$-test with sample size $n$, the degrees of freedom ($df$) associated with the sample standard deviation estimation is:\n$$df = n - 1 = 16 - 1 = 15$$"
    ),
    29: make_q(
        29, "Numbers and Quantification", "Modular Arithmetic and Fermat's Little Theorem",
        "Using Fermat's Little Theorem or properties of modular arithmetic, find the remainder when $3^{100}$ is divided by 5.",
        ["1", "2", "3", "4"],
        "A",
        "By Fermat's Little Theorem, if $p$ is a prime and $\\gcd(a, p) = 1$, then $a^{p-1} \\equiv 1 \\pmod p$.\nHere $a = 3$ and $p = 5$. Since $\\gcd(3, 5) = 1$:\n$$3^{5-1} = 3^4 \\equiv 1 \\pmod 5$$\nNow write the exponent 100 in terms of multiples of 4:\n$$3^{100} = (3^4)^{25} \\equiv (1)^{25} \\equiv 1 \\pmod 5$$\nThus, the remainder is 1."
    ),
    30: make_q(
        30, "Quantitative Aptitude", "Boats and Streams",
        "The speed of a boat in still water is 12 km/h and the speed of the river stream is 4 km/h. How much time will the boat take to cover a distance of 32 km traveling upstream?",
        ["4 hours", "2 hours", "3 hours", "5 hours"],
        "A",
        "The upstream speed of the boat is:\n$$v_{\\text{upstream}} = v_{\\text{boat}} - v_{\\text{stream}} = 12 - 4 = 8 \\text{ km/h}$$\nTime taken to cover 32 km upstream:\n$$\\text{Time} = \\frac{\\text{Distance}}{v_{\\text{upstream}}} = \\frac{32}{8} = 4 \\text{ hours}$$"
    ),
    31: make_q(
        31, "Matrices", "Properties of Matrix Inverses and Transposes",
        "If $A$ and $B$ are non-singular square matrices of the same order $n$, which of the following matrix properties is universally correct?",
        ["$(AB)^{-1} = B^{-1} A^{-1}$", "$(AB)^{-1} = A^{-1} B^{-1}$", "$(A + B)^{-1} = A^{-1} + B^{-1}$", "$(AB)^T = A^T B^T$"],
        "A",
        "The reversal law of inverses states that for any two invertible matrices $A$ and $B$ of the same size, $(AB)^{-1} = B^{-1} A^{-1}$. Note that $(AB)(B^{-1} A^{-1}) = A (B B^{-1}) A^{-1} = A I A^{-1} = A A^{-1} = I$."
    ),
    32: make_q(
        32, "Application of Derivatives", "Cost Functions and Fixed Costs",
        "The total cost function for manufacturing $x$ units of a product is given by $C(x) = 0.05x^3 - 3x^2 + 70x + 500$. Find the marginal cost (MC) when 20 units are produced.",
        ["10", "50", "20", "30"],
        "A",
        "Marginal cost is the derivative of the total cost function with respect to $x$:\n$$MC(x) = C'(x) = \\frac{d}{dx}(0.05x^3 - 3x^2 + 70x + 500) = 0.15x^2 - 6x + 70$$\nEvaluating at $x = 20$:\n$$MC(20) = 0.15(20)^2 - 6(20) + 70 = 0.15(400) - 120 + 70 = 60 - 120 + 70 = 10$$"
    ),
    33: make_q(
        33, "Differential Equations", "Variable Separable Form with Logarithmic Terms",
        "Find the particular solution of the differential equation $\\frac{dy}{dx} = \\frac{y}{x \\ln x}$ satisfying the initial condition $y(e) = 2$.",
        ["$y = 2\\ln x$", "$y = e \\ln x$", "$y = (\\ln x)^2 + 1$", "$y = 2x$"],
        "A",
        "Separating variables:\n$$\\frac{dy}{y} = \\frac{dx}{x \\ln x}$$\nIntegrating both sides:\n$$\\int \\frac{dy}{y} = \\int \\frac{dx}{x \\ln x}$$\nLet $u = \\ln x \\implies du = \\frac{dx}{x}$:\n$$\\ln|y| = \\ln|u| + C_0 = \\ln|\\ln x| + \\ln C = \\ln(C|\\ln x|)$$\nExponentiating:\n$$y = C \\ln x$$\nApplying condition $y(e) = 2$:\n$$2 = C \\ln(e) = C(1) \\implies C = 2$$\nThus, $y = 2 \\ln x$."
    ),
    34: make_q(
        34, "Time Series Analysis", "Components of Time Series",
        "Which component of a time series describes recurring seasonal patterns and periodic oscillations that complete their cycle within the duration of a single year?",
        ["Seasonal variation", "Secular trend", "Cyclical variation", "Irregular variation"],
        "A",
        "Seasonal variation refers to periodic fluctuations that occur regularly at specific times within a single calendar year (e.g., weather cycles, quarterly tax payments, festival season shopping demand)."
    ),
    35: make_q(
        35, "Probability Distributions", "Properties of Poisson and Binomial Distributions",
        "If a discrete random variable $X$ follows a Poisson distribution with mean $\\lambda = 4$, what is the variance of $X$?",
        ["4", "2", "16", "8"],
        "A",
        "A hallmark property of the Poisson distribution is that its variance is exactly equal to its mean parameter $\\lambda$. Therefore, with mean $\\lambda = 4$, the variance is also 4."
    ),
    38: make_q(
        38, "Integrals", "Substitution Technique for Algebraic Surds",
        "Evaluate the definite integral $\\int_{0}^{1} \\frac{x}{\\sqrt{1 - x^2}} \\, dx$.",
        ["1", "2", "$\\frac{1}{2}$", "0"],
        "A",
        "Let substitution $u = 1 - x^2$, so $du = -2x dx \\implies x dx = -\\frac{du}{2}$.\nWhen $x = 0, u = 1$; when $x = 1, u = 0$.\nSubstituting into the integral:\n$$\\int_{1}^{0} \\frac{-\\frac{1}{2} du}{\\sqrt{u}} = \\frac{1}{2} \\int_{0}^{1} u^{-1/2} du = \\frac{1}{2} [2\\sqrt{u}]_{0}^{1} = [\\sqrt{1} - \\sqrt{0}] = 1$$"
    ),
    39: make_q(
        39, "Quantitative Aptitude", "Races and Games of Skill",
        "In a 500-meter flat footrace, runner $P$ beats runner $Q$ by 50 meters or by 10 seconds. What is the average speed of runner $Q$?",
        ["5 m/s", "4.5 m/s", "6 m/s", "5.5 m/s"],
        "A",
        "Since runner $P$ beats runner $Q$ by 50 meters or 10 seconds, it means runner $Q$ covers the remaining distance of 50 meters in 10 seconds.\nSpeed of $Q = \\frac{\\text{Distance}}{\\text{Time}} = \\frac{50}{10} = 5 \\text{ m/s}$."
    ),
    40: make_q(
        40, "Vector Algebra", "Vector Projection",
        "Find the scalar projection of the vector $\\vec{a} = 2\\hat{i} + 3\\hat{j} + 2\\hat{k}$ onto the vector $\\vec{b} = \\hat{i} + 2\\hat{j} + \\hat{k}$.",
        ["$\\frac{5\\sqrt{6}}{3}$", "$\\frac{10}{3}$", "$2\\sqrt{6}$", "$\\frac{\\sqrt{6}}{5}$"],
        "A",
        "The projection of vector $\\vec{a}$ on $\\vec{b}$ is given by:\n$$\\text{proj}_{\\vec{b}}(\\vec{a}) = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}$$\nCalculate the dot product:\n$$\\vec{a} \\cdot \\vec{b} = (2)(1) + (3)(2) + (2)(1) = 2 + 6 + 2 = 10$$\nCalculate the magnitude of $\\vec{b}$:\n$$|\\vec{b}| = \\sqrt{1^2 + 2^2 + 1^2} = \\sqrt{1 + 4 + 1} = \\sqrt{6}$$\nThus:\n$$\\text{Projection} = \\frac{10}{\\sqrt{6}} = \\frac{10\\sqrt{6}}{6} = \\frac{5\\sqrt{6}}{3}$$"
    ),
    41: make_q(
        41, "Vector Algebra", "Vectors Perpendicular to Two Vectors with Specified Magnitude",
        "Find a unit vector perpendicular to both vectors $\\vec{a} = 2\\hat{i} - \\hat{j} + 2\\hat{k}$ and $\\vec{b} = \\hat{i} + 2\\hat{j} - \\hat{k}$.",
        [
            "$\\frac{-3\\hat{i} + 4\\hat{j} + 5\\hat{k}}{5\\sqrt{2}}$",
            "$\\frac{3\\hat{i} - 4\\hat{j} + 5\\hat{k}}{5\\sqrt{2}}$",
            "$\\frac{-3\\hat{i} + 4\\hat{j} - 5\\hat{k}}{\\sqrt{50}}$",
            "$\\frac{4\\hat{i} + 3\\hat{j} - 5\\hat{k}}{5\\sqrt{2}}$"
        ],
        "A",
        "A vector perpendicular to both $\\vec{a}$ and $\\vec{b}$ is given by their cross product $\\vec{a} \\times \\vec{b}$:\n$$\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & -1 & 2 \\\\ 1 & 2 & -1 \\end{vmatrix} = \\hat{i}(1 - 4) - \\hat{j}(-2 - 2) + \\hat{k}(4 - (-1)) = -3\\hat{i} + 4\\hat{j} + 5\\hat{k}$$\nMagnitude:\n$$|\\vec{a} \\times \\vec{b}| = \\sqrt{(-3)^2 + 4^2 + 5^2} = \\sqrt{9 + 16 + 25} = \\sqrt{50} = 5\\sqrt{2}$$\nUnit vector:\n$$\\hat{n} = \\frac{-3\\hat{i} + 4\\hat{j} + 5\\hat{k}}{5\\sqrt{2}}$$"
    ),
    42: make_q(
        42, "Vector Algebra", "Angles Between Pairs of Vectors",
        "If vectors $\\vec{a}$ and $\\vec{b}$ satisfy $|\\vec{a}| = 3$, $|\\vec{b}| = 4$, and their scalar product $\\vec{a} \\cdot \\vec{b} = 6$, what is the angle $\\theta$ between them?",
        ["$\\frac{\\pi}{3}$", "$\\frac{\\pi}{6}$", "$\\frac{\\pi}{4}$", "$\\frac{\\pi}{2}$"],
        "A",
        "Using the definition of dot product:\n$$\\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| |\\vec{b}|} = \\frac{6}{3 \\times 4} = \\frac{6}{12} = \\frac{1}{2}$$\nSince $\\cos\\theta = \\frac{1}{2}$ for $\\theta \\in [0, \\pi]$, we have $\\theta = \\frac{\\pi}{3}$ ($60^\\circ$)."
    ),
    43: make_q(
        43, "Application of Derivatives", "Applied Maxima and Minima with Cubes Difference",
        "Divide the number 20 into two positive parts $x$ and $y$ such that their sum is 20 and their product $P = xy$ is maximized. The two parts are:",
        ["10 and 10", "12 and 8", "15 and 5", "14 and 6"],
        "A",
        "Let the two parts be $x$ and $20 - x$. Their product is:\n$$P(x) = x(20 - x) = 20x - x^2$$\nDifferentiating with respect to $x$:\n$$P'(x) = 20 - 2x = 0 \\implies x = 10$$\nSecond derivative:\n$$P''(x) = -2 < 0$$\nHence, the maximum occurs at $x = 10$, giving parts 10 and $20 - 10 = 10$."
    ),
    44: make_q(
        44, "Application of Integrals", "Area Enclosed by Parabola and Absolute Value Function",
        "Find the area (in square units) of the region bounded by the upward-opening parabola $y = x^2$ and the horizontal line $y = 4$.",
        ["$\\frac{32}{3}$", "$\\frac{16}{3}$", "$\\frac{64}{3}$", "8"],
        "A",
        "The parabola $y = x^2$ intersects $y = 4$ at $x = \\pm 2$. By symmetry about the $y$-axis:\n$$\\text{Area} = 2 \\int_{0}^{2} (4 - x^2) \\, dx = 2 \\left[ 4x - \\frac{x^3}{3} \\right]_{0}^{2} = 2 \\left( 8 - \\frac{8}{3} \\right) = 2 \\left( \\frac{16}{3} \\right) = \\frac{32}{3} \\text{ sq. units}$$"
    ),
    45: make_q(
        45, "Three Dimensional Geometry", "Perpendicular Lines Direction Ratio Condition",
        "If a line with direction ratios $\\langle 2, k, -3 \\rangle$ is perpendicular to a line with direction ratios $\\langle 3, -4, 2 \\rangle$, what is the value of $k$?",
        ["0", "1", "3", "-2"],
        "A",
        "Two lines with direction ratios $\\langle a_1, b_1, c_1 \\rangle$ and $\\langle a_2, b_2, c_2 \\rangle$ are perpendicular if and only if:\n$$a_1 a_2 + b_1 b_2 + c_1 c_2 = 0$$\nSubstituting the values:\n$$2(3) + k(-4) + (-3)(2) = 0$$\n$$6 - 4k - 6 = 0 \\implies -4k = 0 \\implies k = 0$$"
    ),
    46: make_q(
        46, "Application of Integrals", "Area of Sine Curve Across Multiple Periods",
        "What is the total geometric area enclosed between the curve $y = \\cos x$ and the $x$-axis over the complete cycle from $x = 0$ to $x = 2\\pi$?",
        ["4 sq. units", "0 sq. units", "2 sq. units", "$2\\pi$ sq. units"],
        "A",
        "The cosine curve goes above and below the $x$-axis. Total geometric area is:\n$$\\text{Area} = \\int_{0}^{2\\pi} |\\cos x| \\, dx = 4 \\int_{0}^{\\pi/2} \\cos x \\, dx = 4 [\\sin x]_{0}^{\\pi/2} = 4(1 - 0) = 4 \\text{ sq. units}$$"
    ),
    47: make_q(
        47, "Linear Programming", "Infinitely Many Solutions Condition",
        "In a linear programming problem, if the objective function line is parallel to a boundary constraint line forming an edge of the optimal bounded feasible region, then:",
        [
            "There are infinitely many optimal solutions along that boundary segment",
            "The problem is strictly infeasible",
            "There is a unique non-degenerate solution at the origin",
            "The objective value is completely unbounded"
        ],
        "A",
        "When the slope of the objective function is identical to the slope of a binding constraint line defining an edge of the feasible region, the objective value is maximized simultaneously at every point along that line segment, yielding infinitely many optimal solutions."
    ),
    48: make_q(
        48, "Inverse Trigonometric Functions", "Principal Value Branches of Inverse Trigonometric Functions",
        "What is the principal value of $\\cos^{-1}\\left(-\\frac{\\sqrt{3}}{2}\\right)$?",
        ["$\\frac{5\\pi}{6}$", "$-\\frac{\\pi}{6}$", "$\\frac{7\\pi}{6}$", "$\\frac{2\\pi}{3}$"],
        "A",
        "The principal value branch of $\\cos^{-1} x$ is $[0, \\pi]$.\nUsing the identity $\\cos^{-1}(-x) = \\pi - \\cos^{-1}(x)$:\n$$\\cos^{-1}\\left(-\\frac{\\sqrt{3}}{2}\\right) = \\pi - \\cos^{-1}\\left(\\frac{\\sqrt{3}}{2}\\right) = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}$$"
    ),
    49: make_q(
        49, "Integrals", "Trigonometric Substitution in Fractions",
        "Evaluate the indefinite integral $\\int \\frac{1}{1 + \\cos 2x} \\, dx$.",
        ["$\\frac{1}{2}\\tan x + C$", "$\\tan x + C$", "$-\\frac{1}{2}\\cot x + C$", "$\\frac{1}{2}\\sec x + C$"],
        "A",
        "Using the trigonometric identity $1 + \\cos 2x = 2\\cos^2 x$:\n$$\\int \\frac{1}{1 + \\cos 2x} \\, dx = \\int \\frac{1}{2\\cos^2 x} \\, dx = \\frac{1}{2} \\int \\sec^2 x \\, dx = \\frac{1}{2}\\tan x + C$$"
    ),
    50: make_q(
        50, "Relations and Functions", "Equivalence and Geometric Relations",
        "Let $S$ be the set of all triangles in a Euclidean plane, and let a relation $R$ on $S$ be defined by $T_1 R T_2$ if and only if triangle $T_1$ is similar to triangle $T_2$. Then $R$ is:",
        [
            "An equivalence relation (reflexive, symmetric, and transitive)",
            "Reflexive and symmetric but not transitive",
            "Symmetric and transitive but not reflexive",
            "Not an equivalence relation because similarity is not symmetric"
        ],
        "A",
        "Similarity of triangles satisfies:\n1. Reflexivity: Every triangle is similar to itself ($T_1 \\sim T_1$).\n2. Symmetry: If $T_1$ is similar to $T_2$, then $T_2$ is similar to $T_1$.\n3. Transitivity: If $T_1 \\sim T_2$ and $T_2 \\sim T_3$, then $T_1 \\sim T_3$.\nSince $R$ is reflexive, symmetric, and transitive, it is an equivalence relation."
    )
}

print(f"Number of replacements prepared: {len(replacements)}")

# Check for duplicate questions against existing
any_clash = False
for qn, q in replacements.items():
    norm = normalize_text(q["questionText"])
    if norm in seen:
        print(f"CLASH: Q{qn} text already in seen!")
        any_clash = True
    seen.add(norm)

if any_clash:
    print("FAILED check, aborting.")
    exit(1)

print("All 47 replacement questions are unique!")

# Apply replacements to m12
for idx in range(len(m12)):
    qn = m12[idx]["questionNumber"]
    if qn in replacements:
        m12[idx] = replacements[qn]

with open("mock/maths/12.json", "w", encoding="utf-8") as f:
    json.dump(m12, f, indent=2, ensure_ascii=False)

print("Successfully updated mock/maths/12.json!")
