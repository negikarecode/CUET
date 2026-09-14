#!/usr/bin/env python3
import json

questions_data = [
    {
        "questionNumber": 2,
        "chapter": "Vector Algebra",
        "topic": "Area of Parallelogram Using Diagonals",
        "questionText": "The area of a parallelogram whose diagonals are represented by the vectors $\\vec{d}_{1} = 3\\hat{i} + \\hat{j} - 2\\hat{k}$ and $\\vec{d}_{2} = \\hat{i} - 3\\hat{j} + 4\\hat{k}$ is (in sq. units):",
        "hasDiagram": False,
        "diagramDescription": None,
        "options": [
            {
                "id": "A",
                "text": "$10\\sqrt{3}$",
                "isCorrect": False,
                "studentSelectionTrap": "Omitting One-Half Diagonal Factor",
                "mistakeAnalysis": "Aspirants compute $|\\vec{d}_1 \\times \\vec{d}_2|$ without multiplying by $1/2$."
            },
            {
                "id": "B",
                "text": "$5\\sqrt{3}$",
                "isCorrect": True,
                "studentSelectionTrap": None,
                "mistakeAnalysis": "Correct answer. Area $= \\frac{1}{2}|\\vec{d}_1 \\times \\vec{d}_2| = \\frac{1}{2}|-2\\hat{i} - 14\\hat{j} - 10\\hat{k}| = \\frac{1}{2}\\sqrt{4 + 196 + 100} = \\frac{1}{2}\\sqrt{300} = 5\\sqrt{3}$."
            },
            {
                "id": "C",
                "text": "$15\\sqrt{2}$",
                "isCorrect": False,
                "studentSelectionTrap": "Cross Product Determinant Sign Error",
                "mistakeAnalysis": "Aspirants make sign errors in the cross product determinant."
            },
            {
                "id": "D",
                "text": "$5\\sqrt{6}$",
                "isCorrect": False,
                "studentSelectionTrap": "Radical Simplification Error",
                "mistakeAnalysis": "Aspirants incorrectly simplify $\\sqrt{300}$."
            }
        ],
        "correctOption": "B",
        "detailedSolution": "For a parallelogram with diagonals $\\vec{d}_1$ and $\\vec{d}_2$, the area is given by $\\text{Area} = \\frac{1}{2}|\\vec{d}_1 \\times \\vec{d}_2|$.\nCalculate $\\vec{d}_1 \\times \\vec{d}_2$:\n$\\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 3 & 1 & -2 \\\\ 1 & -3 & 4 \\end{vmatrix} = \\hat{i}(4 - 6) - \\hat{j}(12 - (-2)) + \\hat{k}(-9 - 1) = -2\\hat{i} - 14\\hat{j} - 10\\hat{k}$.\nMagnitude:\n$|\\vec{d}_1 \\times \\vec{d}_2| = \\sqrt{(-2)^2 + (-14)^2 + (-10)^2} = \\sqrt{4 + 196 + 100} = \\sqrt{300} = 10\\sqrt{3}$.\nTherefore, $\\text{Area} = \\frac{1}{2}(10\\sqrt{3}) = 5\\sqrt{3}$ sq. units."
    },
    {
        "questionNumber": 3,
        "chapter": "Probability",
        "topic": "Conditional Probability with Dice",
        "questionText": "A pair of fair dice is thrown. If it is known that the sum of the numbers appearing on the dice is 7, then the probability that the number 2 has appeared at least once is:",
        "hasDiagram": False,
        "diagramDescription": None,
        "options": [
            {
                "id": "A",
                "text": "$\\frac{1}{3}$",
                "isCorrect": True,
                "studentSelectionTrap": None,
                "mistakeAnalysis": "Correct answer. Event $B$ (sum = 7) has 6 outcomes: {(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)}. Event $A$ (2 appears) within $B$ has 2 outcomes: {(2,5), (5,2)}. $P(A|B) = 2/6 = 1/3$."
            },
            {
                "id": "B",
                "text": "$\\frac{1}{6}$",
                "isCorrect": False,
                "studentSelectionTrap": "Ordered Pair Counting Incompleteness",
                "mistakeAnalysis": "Aspirants count only (2,5) and miss (5,2)."
            },
            {
                "id": "C",
                "text": "$\\frac{2}{7}$",
                "isCorrect": False,
                "studentSelectionTrap": "Sum Denominator Fallacy",
                "mistakeAnalysis": "Aspirants place sum 7 in denominator."
            },
            {
                "id": "D",
                "text": "$\\frac{11}{36}$",
                "isCorrect": False,
                "studentSelectionTrap": "Unconditional Probability Selection",
                "mistakeAnalysis": "Aspirants compute the unconditional probability of getting a 2 on a pair of dice."
            }
        ],
        "correctOption": "A",
        "detailedSolution": "Let $B$ be the event that the sum of numbers is 7:\n$B = \\{(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)\\} \\implies n(B) = 6$.\nLet $A$ be the event that 2 appears at least once.\nThe intersection $A \\cap B$ contains pairs where sum is 7 and 2 is present:\n$A \\cap B = \\{(2,5), (5,2)\\} \\implies n(A \\cap B) = 2$.\nBy definition of conditional probability:\n$P(A|B) = \\frac{n(A \\cap B)}{n(B)} = \\frac{2}{6} = \\frac{1}{3}$."
    },
    {
        "questionNumber": 4,
        "chapter": "Differential Equations",
        "topic": "Linear Differential Equations",
        "questionText": "The particular solution of the differential equation $\\frac{dy}{dx} + 2y = e^{-x}$, given that $y = 1$ when $x = 0$, is:",
        "hasDiagram": False,
        "diagramDescription": None,
        "options": [
            {
                "id": "A",
                "text": "$y = e^{-x}$",
                "isCorrect": True,
                "studentSelectionTrap": None,
                "mistakeAnalysis": "Correct answer. $IF = e^{2x}$. $y e^{2x} = \\int e^x dx = e^x + C$. With $y(0) = 1$, $1 = 1 + C \\implies C = 0$, giving $y = e^{-x}$."
            },
            {
                "id": "B",
                "text": "$y = e^{-x} + e^{-2x}$",
                "isCorrect": False,
                "studentSelectionTrap": "Integration Constant Non-Zero Assumption",
                "mistakeAnalysis": "Aspirants mistakenly set $C = 1$ instead of $0$."
            },
            {
                "id": "C",
                "text": "$y = 2e^{-x} - e^{-2x}$",
                "isCorrect": False,
                "studentSelectionTrap": "Integrating Factor Inversion",
                "mistakeAnalysis": "Aspirants evaluate integrating factor with incorrect sign."
            },
            {
                "id": "D",
                "text": "$y = e^{x}$",
                "isCorrect": False,
                "studentSelectionTrap": "Direct Division Error",
                "mistakeAnalysis": "Aspirants divide by integrating factor incorrectly."
            }
        ],
        "correctOption": "A",
        "detailedSolution": "The equation is linear of the form $\\frac{dy}{dx} + Py = Q$ with $P = 2$ and $Q = e^{-x}$.\nIntegrating Factor $IF = e^{\\int 2\\,dx} = e^{2x}$.\nThe general solution is:\n$y \\cdot e^{2x} = \\int e^{-x} \\cdot e^{2x}\\,dx + C = \\int e^{x}\\,dx + C = e^{x} + C$.\nDivide by $e^{2x}$:\n$y = e^{-x} + C e^{-2x}$.\nGiven $y = 1$ when $x = 0$:\n$1 = e^{0} + C e^{0} = 1 + C \\implies C = 0$.\nTherefore, the particular solution is $y = e^{-x}$."
    },
    {
        "questionNumber": 5,
        "chapter": "Linear Programming",
        "topic": "Maximization with Linear Constraints",
        "questionText": "The maximum value of the objective function $Z = 3x + 2y$ subject to the constraints $x + 2y \\le 10,\\; 3x + y \\le 15,\\; x \\ge 0,\\; y \\ge 0$ is:",
        "hasDiagram": False,
        "diagramDescription": None,
        "options": [
            {
                "id": "A",
                "text": "$15$",
                "isCorrect": False,
                "studentSelectionTrap": "Axis Intercept Fallacy",
                "mistakeAnalysis": "Aspirants test only $(5,0)$ and stop."
            },
            {
                "id": "B",
                "text": "$18$",
                "isCorrect": True,
                "studentSelectionTrap": None,
                "mistakeAnalysis": "Correct answer. The intersection of boundary lines is $(4, 3)$. Evaluating $Z(4,3) = 3(4) + 2(3) = 18$ gives the global maximum."
            },
            {
                "id": "C",
                "text": "$20$",
                "isCorrect": False,
                "studentSelectionTrap": "Infeasible Point Evaluation",
                "mistakeAnalysis": "Aspirants evaluate $Z$ at an infeasible point $(4, 4)$."
            },
            {
                "id": "D",
                "text": "$10$",
                "isCorrect": False,
                "studentSelectionTrap": "Minimum Selection Slip",
                "mistakeAnalysis": "Aspirants choose value at $(0, 5)$."
            }
        ],
        "correctOption": "B",
        "detailedSolution": "The corner points of the feasible region bounded by $x \\ge 0, y \\ge 0, x + 2y \\le 10, 3x + y \\le 15$ are:\n1. Origin $(0, 0)$: $Z = 0$.\n2. $(5, 0)$: $Z = 3(5) + 2(0) = 15$.\n3. $(0, 5)$: $Z = 3(0) + 2(5) = 10$.\n4. Intersection of $x + 2y = 10$ and $3x + y = 15$:\nFrom the second equation, $y = 15 - 3x$. Substitute into first: $x + 2(15 - 3x) = 10 \\implies -5x = -20 \\implies x = 4, y = 3$.\nAt $(4, 3)$: $Z = 3(4) + 2(3) = 12 + 6 = 18$.\nComparing values, maximum $Z = 18$ at $(4, 3)$."
    },
    {
        "questionNumber": 6,
        "chapter": "Application of Derivatives",
        "topic": "Local Extrema of Polynomial Functions",
        "questionText": "The function $f(x) = 2x^{3} - 9x^{2} + 12x + 5$ attains its local minimum at $x = $:",
        "hasDiagram": False,
        "diagramDescription": None,
        "options": [
            {
                "id": "A",
                "text": "$1$",
                "isCorrect": False,
                "studentSelectionTrap": "Local Maximum Inversion",
                "mistakeAnalysis": "Aspirants identify $x = 1$ which is the point of local maximum ($f''(1) = -6 < 0$)."
            },
            {
                "id": "B",
                "text": "$2$",
                "isCorrect": True,
                "studentSelectionTrap": None,
                "mistakeAnalysis": "Correct answer. $f'(x) = 6(x-1)(x-2) = 0$. $f''(2) = 12(2) - 18 = 6 > 0$, so $x = 2$ is the point of local minimum."
            },
            {
                "id": "C",
                "text": "$3$",
                "isCorrect": False,
                "studentSelectionTrap": "Factor Arithmetic Error",
                "mistakeAnalysis": "Aspirants factor $6x^2-18x+12$ as $(x-1)(x-3)$."
            },
            {
                "id": "D",
                "text": "$0$",
                "isCorrect": False,
                "studentSelectionTrap": "Origin Guess",
                "mistakeAnalysis": "Aspirants evaluate $f(0)$ instead of derivative critical points."
            }
        ],
        "correctOption": "B",
        "detailedSolution": "Differentiate $f(x)$ with respect to $x$:\n$f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2)$.\nSetting $f'(x) = 0$ yields critical points $x = 1$ and $x = 2$.\nSecond derivative:\n$f''(x) = 12x - 18$.\nAt $x = 1$: $f''(1) = 12(1) - 18 = -6 < 0 \\implies$ local maximum.\nAt $x = 2$: $f''(2) = 12(2) - 18 = 6 > 0 \\implies$ local minimum.\nHence, local minimum is attained at $x = 2$."
    }
]

# Load Mock 12
with open("./mock/maths/12.json", "r", encoding="utf-8") as f:
    m12 = json.load(f)

# Update first 4 questions
for q in questions_data:
    idx = q["questionNumber"] - 1
    m12[idx] = q
    print(f"Updated Mock 12 Q{q['questionNumber']}")

with open("./mock/maths/12.json", "w", encoding="utf-8") as f:
    json.dump(m12, f, indent=2, ensure_ascii=False)
print("Saved partial update.")
