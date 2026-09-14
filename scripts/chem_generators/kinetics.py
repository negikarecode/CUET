from scripts.chem_generators.common import make_question, normalize_text

def get_kinetics_questions(seen):
    qs = []
    
    def add(ch, top, text, opts, ans, sol):
        norm = normalize_text(text)
        assert norm not in seen, f"Duplicate detected in kinetics: {text[:50]}"
        seen.add(norm)
        qs.append(make_question(ch, top, text, opts, ans, sol))

    ch = "Chemical Kinetics"

    # 1-10: Reaction Rates & Stoichiometric Relations
    add(ch, "Rate of Reaction Stoichiometric Coefficients",
        "For the gaseous reaction $2N_2O_5(g) \\to 4NO_2(g) + O_2(g)$, the rate of disappearance of $N_2O_5$ is related to the rate of formation of $NO_2$ by the stoichiometric expression:",
        [
            "$-\\frac{1}{2}\\frac{d[N_2O_5]}{dt} = \\frac{1}{4}\\frac{d[NO_2]}{dt}$",
            "$-\\frac{d[N_2O_5]}{dt} = 2\\frac{d[NO_2]}{dt}$",
            "$-\\frac{1}{2}\\frac{d[N_2O_5]}{dt} = 4\\frac{d[NO_2]}{dt}$",
            "$-\\frac{d[N_2O_5]}{dt} = \\frac{1}{4}\\frac{d[NO_2]}{dt}$"
        ],
        "A",
        "By definition, the unique rate of reaction is given by dividing the rate of change of concentration of each reactant/product by its stoichiometric coefficient: $\\text{Rate} = -\\frac{1}{2}\\frac{d[N_2O_5]}{dt} = +\\frac{1}{4}\\frac{d[NO_2]}{dt} = +\\frac{d[O_2]}{dt}$."
    )

    add(ch, "Rate Calculation from Stoichiometry",
        "In the formation of ammonia, $N_2(g) + 3H_2(g) \\to 2NH_3(g)$, if the rate of disappearance of hydrogen is $-\\frac{d[H_2]}{dt} = 6.0 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$, what is the rate of formation of ammonia, $\\frac{d[NH_3]}{dt}$?",
        [
            "$4.0 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$",
            "$9.0 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$",
            "$3.0 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$",
            "$6.0 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$"
        ],
        "A",
        "From stoichiometry: $\\text{Rate} = -\\frac{1}{3}\\frac{d[H_2]}{dt} = \\frac{1}{2}\\frac{d[NH_3]}{dt}$.\n$\\frac{d[NH_3]}{dt} = \\frac{2}{3} \\left(-\\frac{d[H_2]}{dt}\\right) = \\frac{2}{3}(6.0 \\times 10^{-3}) = 4.0 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$."
    )

    add(ch, "Instantaneous vs Average Reaction Rate",
        "The instantaneous rate of a chemical reaction at time $t$ is determined graphically from a concentration versus time plot by:",
        [
            "Measuring the negative slope of the tangent drawn to the concentration-time curve of a reactant at time $t$",
            "Dividing the initial concentration by the total elapsed time",
            "Calculating the arithmetic mean of concentrations at $t=0$ and time $t$",
            "Integrating the area under the concentration-time curve up to time $t$"
        ],
        "A",
        "The instantaneous rate is defined as the derivative $-\\frac{d[R]}{dt}$ at that exact instant. Graphically, it equals the magnitude of the slope of the tangent line drawn to the reactant concentration $[R]$ vs time $t$ curve at time $t$."
    )

    add(ch, "Units of Rate Constant Formula",
        "The general formula for the units of the rate constant $k$ for an $n^{\\text{th}}$-order chemical reaction is:",
        [
            "$(\\text{mol L}^{-1})^{1-n} \\text{s}^{-1}$",
            "$(\\text{mol L}^{-1})^{n-1} \\text{s}^{-1}$",
            "$(\\text{L mol}^{-1})^{n} \\text{s}^{-1}$",
            "$\\text{mol}^{n} \\text{L}^{-n} \\text{s}^{-1}$"
        ],
        "A",
        "From Rate $= k [A]^n$, we have $[\\text{mol L}^{-1}\\text{ s}^{-1}] = [k] [\\text{mol L}^{-1}]^n \\implies [k] = (\\text{mol L}^{-1})^{1-n}\\text{ s}^{-1}$."
    )

    add(ch, "Units of Zero Order Rate Constant",
        "What are the dimensional units of the rate constant for a ZERO-order chemical reaction?",
        [
            "$\\text{mol L}^{-1}\\text{ s}^{-1}$",
            "$\\text{s}^{-1}$",
            "$\\text{L mol}^{-1}\\text{ s}^{-1}$",
            "$\\text{L}^2\\text{ mol}^{-2}\\text{ s}^{-1}$"
        ],
        "A",
        "For $n = 0$: Unit of $k = (\\text{mol L}^{-1})^{1-0}\\text{ s}^{-1} = \\text{mol L}^{-1}\\text{ s}^{-1}$, which is identical to the units of reaction rate itself."
    )

    add(ch, "Units of First Order Rate Constant",
        "The unit of the rate constant for a FIRST-order reaction is:",
        [
            "$\\text{s}^{-1}$ (or $\\text{time}^{-1}$)",
            "$\\text{mol L}^{-1}\\text{ s}^{-1}$",
            "$\\text{L mol}^{-1}\\text{ s}^{-1}$",
            "$\\text{mol}^{-1}\\text{ L s}^{-1}$"
        ],
        "A",
        "For $n = 1$: Unit of $k = (\\text{mol L}^{-1})^{1-1}\\text{ s}^{-1} = (\\text{mol L}^{-1})^0\\text{ s}^{-1} = \\text{s}^{-1}$. It is completely independent of concentration units."
    )

    add(ch, "Units of Second Order Rate Constant",
        "If a reaction has a rate constant $k = 2.5 \\times 10^{-2}\\text{ L mol}^{-1}\\text{ s}^{-1}$, what is the overall order of the reaction?",
        [
            "Second order",
            "First order",
            "Zero order",
            "Third order"
        ],
        "A",
        "Units $\\text{L mol}^{-1}\\text{ s}^{-1} = (\\text{mol L}^{-1})^{-1}\\text{ s}^{-1} = (\\text{mol L}^{-1})^{1-n}\\text{ s}^{-1} \\implies 1 - n = -1 \\implies n = 2$ (second order)."
    )

    add(ch, "Order vs Molecularity Differences",
        "Which of the following statements correctly distinguishes between the order and molecularity of a chemical reaction?",
        [
            "Order is an experimental quantity that can be zero, fractional, or negative, while molecularity is a theoretical whole number ($1, 2, \\text{or } 3$) applicable only to elementary steps",
            "Order is always an integer $\\ge 1$, whereas molecularity can be zero",
            "Molecularity applies to complex multistep reactions as a whole, while order applies only to elementary steps",
            "Order can never be equal to molecularity for an elementary reaction"
        ],
        "A",
        "Order of a reaction is determined strictly by experiment and can be zero, fractional, negative, or integer. Molecularity is the number of reacting species colliding simultaneously in an elementary step; it cannot be zero or fractional and is not defined for complex multistep reactions."
    )

    add(ch, "Why Molecularity Greater Than Three is Rare",
        "Why is a reaction with molecularity greater than three extremely rare in chemical kinetics?",
        [
            "The probability of more than three molecules colliding simultaneously with sufficient energy and proper orientation is exceedingly small",
            "Molecules having more than three collision partners undergo spontaneous radioactive decay",
            "Activation energy becomes zero for four-molecule collisions",
            "Reactions with molecularity $> 3$ violate the law of conservation of mass"
        ],
        "A",
        "For an elementary step to occur, all participating reactant molecules must collide simultaneously with threshold energy and correct mutual orientation. The statistical probability of four or more distinct particles colliding together at the exact same instant in space is negligibly small."
    )

    add(ch, "Order Determination Initial Rates Method",
        "For the reaction $A + B \\to C$, doubling the concentration of $A$ alone quadruples the rate of reaction. Doubling the concentration of $B$ alone doubles the rate. What is the overall order of the reaction?",
        [
            "3 (Order $= 2$ with respect to A, and $1$ with respect to B)",
            "2 (Order $= 1$ with respect to A, and $1$ with respect to B)",
            "4 (Order $= 2$ with respect to A, and $2$ with respect to B)",
            "1 (Order $= 0$ with respect to A, and $1$ with respect to B)"
        ],
        "A",
        "Rate $\\propto [A]^x [B]^y$.\nWhen $[A]$ is doubled: $(2)^x = 4 \\implies x = 2$.\nWhen $[B]$ is doubled: $(2)^y = 2 \\implies y = 1$.\nRate law: $\\text{Rate} = k [A]^2 [B]^1$. Overall order $= x + y = 2 + 1 = 3$."
    )

    # 11-20: Zero-Order Integrated Rate & Half-Life
    add(ch, "Zero Order Integrated Rate Law Equation",
        "The integrated rate law for a zero-order reaction $R \\to P$ with initial concentration $[R]_0$ is:",
        [
            "$[R] = [R]_0 - k t$",
            "$[R] = [R]_0 e^{-k t}$",
            "$\\ln [R] = \\ln [R]_0 - k t$",
            "$\\frac{1}{[R]} = \\frac{1}{[R]_0} + k t$"
        ],
        "A",
        "For a zero-order reaction, $-\\frac{d[R]}{dt} = k [R]^0 = k \\implies d[R] = -k dt$. Integrating with $[R] = [R]_0$ at $t = 0$ yields $[R] = [R]_0 - kt$."
    )

    add(ch, "Zero Order Reaction Half-Life Dependence",
        "How does the half-life ($t_{1/2}$) of a zero-order reaction depend on the initial concentration of reactant $[R]_0$?",
        [
            "$t_{1/2} = \\frac{[R]_0}{2k}$, directly proportional to $[R]_0$",
            "$t_{1/2} = \\frac{0.693}{k}$, independent of $[R]_0$",
            "$t_{1/2} = \\frac{1}{k [R]_0}$, inversely proportional to $[R]_0$",
            "$t_{1/2} = \\frac{k}{2[R]_0}$, inversely proportional to $[R]_0$"
        ],
        "A",
        "Setting $[R] = \\frac{[R]_0}{2}$ at $t = t_{1/2}$ into $[R] = [R]_0 - kt$ gives $\\frac{[R]_0}{2} = [R]_0 - k t_{1/2} \\implies k t_{1/2} = \\frac{[R]_0}{2} \\implies t_{1/2} = \\frac{[R]_0}{2k}$. Thus, half-life is directly proportional to initial concentration."
    )

    add(ch, "Zero Order Reaction Completion Time",
        "For a zero-order reaction with initial concentration $[R]_0$ and rate constant $k$, the total time ($t_{100\\%}$) required for the reaction to reach 100% completion is:",
        [
            "$t_{100\\%} = \\frac{[R]_0}{k} = 2 t_{1/2}$",
            "$t_{100\\%} = \\infty$ (it never completes)",
            "$t_{100\\%} = \\frac{2[R]_0}{k}$",
            "$t_{100\\%} = \\frac{[R]_0}{4k}$"
        ],
        "A",
        "At 100% completion, $[R] = 0$. From $[R] = [R]_0 - kt$, $0 = [R]_0 - k t_{100\\%} \\implies t_{100\\%} = \\frac{[R]_0}{k}$. Since $t_{1/2} = \\frac{[R]_0}{2k}$, $t_{100\\%} = 2 t_{1/2}$."
    )

    add(ch, "Zero Order Reaction Examples Surface Adsorption",
        "The catalytic decomposition of gaseous ammonia ($NH_3$) on a hot platinum surface at very HIGH pressure follows zero-order kinetics because:",
        [
            "At high pressure, the metal surface becomes fully saturated with adsorbed ammonia molecules, so further pressure increase cannot increase the reaction rate",
            "Platinum reacts chemically with nitrogen to form an inert alloy",
            "Ammonia molecules completely dissociate into elemental ions in the gas phase",
            "High pressure reduces the activation energy of the reaction to zero"
        ],
        "A",
        "At high pressure, the catalytic metal surface is completely saturated with a monolayer of adsorbed reactant molecules. The fraction of surface covered is $\\theta \\approx 1$. Any further increase in gas pressure cannot increase the rate of reaction, making the rate independent of $[NH_3]$, i.e., zero-order."
    )

    add(ch, "Zero Order Reaction Photochemical Example",
        "The photochemical combination of hydrogen and chlorine gases over water: $H_2(g) + Cl_2(g) \\xrightarrow{h\\nu} 2HCl(g)$ follows zero-order kinetics because:",
        [
            "The reaction rate is governed strictly by the intensity of light absorbed and not by the concentrations of $H_2$ and $Cl_2$",
            "Chlorine gas is completely insoluble in water",
            "The reaction requires a temperature of absolute zero",
            "Hydrogen gas acts as a homogeneous catalyst"
        ],
        "A",
        "Photochemical reactions depend on the intensity of light photons absorbed per unit time rather than the concentrations of reactants. As long as sufficient reactants are available to absorb the incoming light photons, the rate remains constant, obeying zero-order kinetics."
    )

    # 16-25: First-Order Integrated Rate & Half-Life
    add(ch, "First Order Integrated Rate Law Equation",
        "The integrated rate law for a first-order reaction $R \\to P$ with rate constant $k$ and initial concentration $[R]_0$ is expressed in base-10 logarithms as:",
        [
            "$k = \\frac{2.303}{t} \\log \\frac{[R]_0}{[R]}$",
            "$k = \\frac{1}{t} \\log \\frac{[R]}{[R]_0}$",
            "$k = \\frac{2.303}{t} \\ln \\frac{[R]_0}{[R]}$",
            "$k = \\frac{0.693}{t} \\log [R]$"
        ],
        "A",
        "For a first-order reaction: $-\\frac{d[R]}{dt} = k[R] \\implies \\frac{d[R]}{[R]} = -k dt$. Integrating gives $\\ln\\frac{[R]_0}{[R]} = kt \\implies k = \\frac{2.303}{t} \\log \\frac{[R]_0}{[R]}$."
    )

    add(ch, "First Order Half-Life Formula",
        "The half-life period ($t_{1/2}$) of a first-order reaction is given by:",
        [
            "$t_{1/2} = \\frac{0.693}{k}$, strictly independent of initial reactant concentration",
            "$t_{1/2} = \\frac{k}{0.693}$, directly proportional to $k$",
            "$t_{1/2} = \\frac{[R]_0}{2k}$, proportional to initial concentration",
            "$t_{1/2} = \\frac{1}{k [R]_0}$, inversely proportional to initial concentration"
        ],
        "A",
        "At $t = t_{1/2}$, $[R] = [R]_0 / 2$. Substituting into $k = \\frac{2.303}{t} \\log\\frac{[R]_0}{[R]}$ gives $t_{1/2} = \\frac{2.303 \\log(2)}{k} = \\frac{2.303 \\times 0.3010}{k} = \\frac{0.693}{k}$. It is completely independent of $[R]_0$."
    )

    add(ch, "First Order Reaction Rate Constant Calculation",
        "A first-order reaction has a rate constant $k = 6.93 \\times 10^{-3}\\text{ s}^{-1}$. What is the half-life ($t_{1/2}$) of the reaction?",
        [
            "$100\\text{ s}$",
            "$10\\text{ s}$",
            "$69.3\\text{ s}$",
            "$1000\\text{ s}$"
        ],
        "A",
        "$t_{1/2} = \\frac{0.693}{k} = \\frac{0.693}{6.93 \\times 10^{-3}\\text{ s}^{-1}} = 100\\text{ s}$."
    )

    add(ch, "First Order Reaction Fraction Remaining Calculation",
        "What fraction of the original reactant remains unreacted after 4 half-lives ($4 t_{1/2}$) in a first-order reaction?",
        [
            "$\\frac{1}{16}$ (or $6.25\\%$)",
            "$\\frac{1}{8}$ (or $12.5\\%$)",
            "$\\frac{1}{32}$ (or $3.125\\%$)",
            "$\\frac{1}{4}$ (or $25.0\\%$)"
        ],
        "A",
        "Amount remaining after $n$ half-lives is $[R] = [R]_0 \\left(\\frac{1}{2}\\right)^n$. For $n = 4$:\n$[R] = [R]_0 \\left(\\frac{1}{2}\\right)^4 = \\frac{[R]_0}{16} = 6.25\\%$."
    )

    add(ch, "First Order Reaction Time for 75 Percent Completion",
        "For a first-order chemical reaction, the time required for $75\\%$ completion ($t_{75\\%}$) is related to its half-life ($t_{50\\%}$) by:",
        [
            "$t_{75\\%} = 2 t_{50\\%}$",
            "$t_{75\\%} = 1.5 t_{50\\%}$",
            "$t_{75\\%} = 3 t_{50\\%}$",
            "$t_{75\\%} = 4 t_{50\\%}$"
        ],
        "A",
        "At $75\\%$ completion, $25\\%$ ($1/4$) of reactant remains. Since $1/4 = (1/2)^2$, this corresponds to exactly two half-lives: $t_{75\\%} = 2 t_{1/2}$."
    )

    add(ch, "First Order Reaction Time for 99.9 Percent Completion",
        "Show the relation between the time required for $99.9\\%$ completion ($t_{99.9\\%}$) and the half-life ($t_{1/2}$) of a first-order reaction:",
        [
            "$t_{99.9\\%} \\approx 10 t_{1/2}$",
            "$t_{99.9\\%} \\approx 5 t_{1/2}$",
            "$t_{99.9\\%} \\approx 3 t_{1/2}$",
            "$t_{99.9\\%} \\approx 20 t_{1/2}$"
        ],
        "A",
        "At $99.9\\%$ completion, $[R] = [R]_0 - 0.999[R]_0 = 0.001[R]_0 = 10^{-3}[R]_0$.\n$t_{99.9\\%} = \\frac{2.303}{k} \\log\\frac{[R]_0}{10^{-3}[R]_0} = \\frac{2.303 \\times 3}{k} = \\frac{6.909}{k}$.\nSince $t_{1/2} = \\frac{0.693}{k}$, we have $\\frac{t_{99.9\\%}}{t_{1/2}} = \\frac{6.909}{0.693} \\approx 10 \\implies t_{99.9\\%} \\approx 10 t_{1/2}$."
    )

    add(ch, "Pseudo First Order Reactions Definition",
        "A chemical reaction having molecularity of two or more that behaves kinetically as a first-order reaction is termed a:",
        [
            "Pseudo-first order reaction",
            "Zero order reaction",
            "Fractional order reaction",
            "Third order reaction"
        ],
        "A",
        "A pseudo-first order reaction is a bimolecular or higher-order reaction made to follow first-order kinetics by having all reactants except one present in large stoichiometric excess, so their concentrations remain practically constant throughout the reaction."
    )

    add(ch, "Pseudo First Order Reaction Acid Hydrolysis Ester",
        "The acid-catalyzed hydrolysis of ethyl acetate: $CH_3COOC_2H_5 + H_2O \\xrightarrow{H^+} CH_3COOH + C_2H_5OH$ is an experimental example of:",
        [
            "A pseudo-first order reaction because water is present in large excess",
            "A zero order reaction because the ester is insoluble in water",
            "A second order reaction with overall order $= 2$",
            "An elementary unimolecular reaction"
        ],
        "A",
        "In this reaction, water is present in such large excess that its concentration remains essentially constant during the reaction: Rate $= k' [CH_3COOC_2H_5][H_2O] = k [CH_3COOC_2H_5]$, where $k = k'[H_2O]$. Hence, it follows pseudo-first order kinetics."
    )

    add(ch, "Inversion of Cane Sugar Kinetics",
        "The hydrolysis of sucrose (cane sugar) in acidic aqueous solution: $C_{12}H_{22}O_{11} + H_2O \\xrightarrow{H^+} C_6H_{12}O_6(\\text{glucose}) + C_6H_{12}O_6(\\text{fructose})$ is monitored experimentally by measuring:",
        [
            "The optical rotation of the reaction mixture over time using a polarimeter",
            "The volume of carbon dioxide gas evolved in a gas burette",
            "The electrical conductance of the solution using platinized electrodes",
            "The vapor pressure lowering using a manometer"
        ],
        "A",
        "Sucrose is dextrorotatory ($+66.5^\\circ$), but upon hydrolysis it produces a mixture of dextrorotatory glucose ($+52.5^\\circ$) and strongly levorotatory fructose ($-92.4^\\circ$). The net rotation inverts to levorotatory. The kinetics of this pseudo-first order reaction is followed using a polarimeter."
    )

    add(ch, "Radioactive Decay Kinetics Law",
        "All natural and artificial radioactive disintegration series follow which order of chemical kinetics?",
        [
            "First-order kinetics strictly",
            "Zero-order kinetics",
            "Second-order kinetics",
            "Fractional order kinetics"
        ],
        "A",
        "Radioactive decay is a spontaneous nuclear phenomenon where the rate of disintegration is directly proportional to the number of radioactive nuclei present at that instant: $-\\frac{dN}{dt} = \\lambda N$, obeying first-order kinetics with decay constant $\\lambda$ and half-life $t_{1/2} = \\frac{0.693}{\\lambda}$."
    )

    # 26-40: Arrhenius Equation & Temperature Dependence
    add(ch, "Temperature Coefficient Rule of Thumb",
        "For most typical chemical reactions, for every $10^\\circ\\text{C}$ rise in temperature, the reaction rate:",
        [
            "Approximately doubles or triples",
            "Increases tenfold",
            "Decreases by half",
            "Remains completely unchanged"
        ],
        "A",
        "As a general empirical rule, the temperature coefficient $\\frac{k_{T+10}}{k_T}$ for most chemical reactions lies between 2 and 3, meaning the rate doubles or triples for each $10^\\circ\\text{C}$ rise in temperature."
    )

    add(ch, "Arrhenius Equation Mathematical Expression",
        "The mathematical formula for the Arrhenius equation relating rate constant $k$ to absolute temperature $T$ is:",
        [
            "$k = A e^{-E_a / R T}$",
            "$k = A e^{+E_a / R T}$",
            "$k = A \\ln\\left(\\frac{E_a}{R T}\\right)$",
            "$k = \\frac{A R T}{E_a}$"
        ],
        "A",
        "The Arrhenius equation is $k = A e^{-E_a/RT}$, where $A$ is the Arrhenius pre-exponential frequency factor, $E_a$ is the activation energy, $R$ is universal gas constant, and $T$ is absolute temperature."
    )

    add(ch, "Arrhenius Equation Graphical Slope",
        "When $\\ln k$ is plotted against $\\frac{1}{T}$ according to the Arrhenius equation, the resulting graph is a straight line with a slope equal to:",
        [
            "$-\\frac{E_a}{R}$",
            "$+\\frac{E_a}{R}$",
            "$-\\frac{E_a}{2.303 R}$",
            "$\\ln A$"
        ],
        "A",
        "Taking the natural logarithm: $\\ln k = \\ln A - \\frac{E_a}{R}\\left(\\frac{1}{T}\\right)$. This is of the form $y = c + mx$, where the slope $m = -\\frac{E_a}{R}$ and the y-intercept is $\\ln A$."
    )

    add(ch, "Arrhenius Log10 Form Slope",
        "When $\\log_{10} k$ is plotted against $\\frac{1}{T}$, the slope of the straight line is:",
        [
            "$-\\frac{E_a}{2.303 R}$",
            "$-\\frac{E_a}{R}$",
            "$+\\frac{E_a}{2.303 R}$",
            "$\\log_{10} A$"
        ],
        "A",
        "In common logarithm base-10: $\\log k = \\log A - \\frac{E_a}{2.303 R T}$. The slope of the plot of $\\log k$ versus $1/T$ is $-\\frac{E_a}{2.303 R}$."
    )

    add(ch, "Two Temperature Arrhenius Equation",
        "If the rate constants of a reaction are $k_1$ and $k_2$ at absolute temperatures $T_1$ and $T_2$ respectively, the activation energy $E_a$ is calculated from:",
        [
            "$\\log \\frac{k_2}{k_1} = \\frac{E_a}{2.303 R} \\left( \\frac{T_2 - T_1}{T_1 T_2} \\right)$",
            "$\\log \\frac{k_2}{k_1} = \\frac{E_a}{2.303 R} \\left( \\frac{T_1 - T_2}{T_1 T_2} \\right)$",
            "$\\log \\frac{k_2}{k_1} = \\frac{2.303 R}{E_a} \\left( \\frac{T_2 - T_1}{T_1 T_2} \\right)$",
            "$\\log \\frac{k_1}{k_2} = \\frac{E_a}{2.303 R} \\left( \\frac{T_2 - T_1}{T_1 T_2} \\right)$"
        ],
        "A",
        "Subtracting the two Arrhenius equations gives $\\log k_2 - \\log k_1 = \\frac{E_a}{2.303 R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$."
    )

    add(ch, "Activation Energy Definition",
        "The activation energy ($E_a$) of a chemical reaction is defined as:",
        [
            "The minimum excess kinetic energy that reacting molecules must acquire to cross the energy barrier and form the activated complex",
            "The total thermal energy stored in chemical bonds of products",
            "The difference in enthalpy between reactants and products ($\\Delta H$)",
            "The energy radiated by reactant molecules when they decompose"
        ],
        "A",
        "Activation energy is the additional kinetic energy over and above the average kinetic energy of the reactants required to reach the threshold energy level and form the transition state (activated complex): $E_a = E_{\\text{threshold}} - E_{\\text{reactants}}$."
    )

    add(ch, "Catalytic Decomposition of Hydrogen Peroxide Mechanism",
        "In the iodide-catalyzed decomposition of hydrogen peroxide:\nStep 1: $H_2O_2 + I^- \\to H_2O + IO^-$ (slow)\nStep 2: $H_2O_2 + IO^- \\to H_2O + I^- + O_2$ (fast)\nWhich species functions as a reaction intermediate, and which functions as the catalyst?",
        [
            "$IO^-$ is the reaction intermediate, and $I^-$ is the homogeneous catalyst",
            "$I^-$ is the reaction intermediate, and $IO^-$ is the homogeneous catalyst",
            "Both $I^-$ and $IO^-$ are homogeneous catalysts",
            "Both $I^-$ and $IO^-$ are reaction intermediates"
        ],
        "A",
        "$I^-$ is added initially, consumed in Step 1, and regenerated unchanged in Step 2, functioning as a catalyst. $IO^-$ is generated in Step 1 and consumed in Step 2, functioning as a transient reaction intermediate."
    )

    add(ch, "Catalyst Effect on Thermodynamic Parameters",
        "Which of the following thermodynamic quantities is ALTERED by the addition of a chemical catalyst?",
        [
            "Activation energy ($E_a$)",
            "Standard Gibbs free energy change ($\\Delta_r G^\\circ$)",
            "Standard enthalpy of reaction ($\\Delta_r H^\\circ$)",
            "Equilibrium constant ($K_c$)"
        ],
        "A",
        "A catalyst alters only the kinetics (speed of reaching equilibrium) by lowering activation energy $E_a$. It does NOT alter thermodynamic state functions such as $\\Delta G^\\circ$, $\\Delta H^\\circ$, or $\\Delta S^\\circ$, nor does it shift the equilibrium constant $K_c$ (it speeds up forward and reverse reactions equally)."
    )

    add(ch, "Boltzmann Distribution and Temperature Effect",
        "According to the Maxwell-Boltzmann energy distribution curve, why does a $10^\\circ\\text{C}$ rise in temperature dramatically increase the reaction rate?",
        [
            "The fraction of colliding molecules possessing kinetic energy greater than or equal to the activation energy ($E_a$) approximately doubles",
            "The average molecular velocity increases ten times",
            "The molecular volume of colliding particles expands significantly",
            "The total collision frequency $Z_{AB}$ doubles"
        ],
        "A",
        "While a $10^\\circ\\text{C}$ temperature rise increases total collision frequency by only about 1-2%, it broadens the Maxwell-Boltzmann distribution curve and shifts it to the right. The area under the curve corresponding to molecules having energy $\\ge E_a$ doubles, doubling the rate of effective collisions."
    )

    add(ch, "Collision Theory Effective Collisions Criteria",
        "According to the collision theory of chemical reactions, an encounter between reactant molecules leads to product formation ONLY IF the colliding molecules satisfy:",
        [
            "Both the energy barrier (energy $\\ge E_{\\text{threshold}}$) and the orientation barrier (proper spatial orientation)",
            "Only the energy barrier, irrespective of mutual orientation",
            "Only the orientation barrier, even with zero kinetic energy",
            "The requirement of having opposite electrostatic charges"
        ],
        "A",
        "For a collision to be effective and lead to chemical change, the colliding species must satisfy two conditions simultaneously: (1) Energy factor: kinetic energy $\\ge E_a$ (threshold energy), and (2) Steric / orientation factor: proper orientation to permit bond-breaking and bond-forming."
    )

    # 41-55: Kinetics Numericals & Complex Order Problems
    add(ch, "Steric Factor in Collision Theory",
        "In the modified collision theory expression $\\text{Rate} = P Z_{AB} e^{-E_a / R T}$, the factor $P$ is termed the:",
        [
            "Steric factor (or probability factor), accounting for proper geometric orientation of colliding species",
            "Partial pressure of inert spectator gas",
            "Planck's quantum action constant",
            "Permittivity of the dielectric solvent"
        ],
        "A",
        "The factor $P$ is the steric or probability factor. It accounts for the requirement that molecules must collide with proper spatial orientation so that reactive atoms can interact and form bonds."
    )

    add(ch, "Reaction Order from Half-Life Dependence",
        "If the half-life ($t_{1/2}$) of a reaction is found to be inversely proportional to the initial concentration of the reactant ($t_{1/2} \\propto \\frac{1}{[A]_0}$), what is the order of the reaction?",
        [
            "Second order",
            "First order",
            "Zero order",
            "Third order"
        ],
        "A",
        "The general relationship is $t_{1/2} \\propto [A]_0^{1-n}$.\nFor $t_{1/2} \\propto [A]_0^{-1}$, we have $1 - n = -1 \\implies n = 2$ (second order)."
    )

    add(ch, "Zero Order Half Life Calculation",
        "A zero-order reaction has a rate constant $k = 0.002\\text{ mol L}^{-1}\\text{ s}^{-1}$. If the initial concentration of the reactant is $0.20\\text{ M}$, what is its half-life?",
        [
            "$50\\text{ s}$",
            "$100\\text{ s}$",
            "$25\\text{ s}$",
            "$200\\text{ s}$"
        ],
        "A",
        "For zero-order: $t_{1/2} = \\frac{[A]_0}{2k} = \\frac{0.20\\text{ mol/L}}{2 \\times 0.002\\text{ mol L}^{-1}\\text{ s}^{-1}} = \\frac{0.20}{0.004} = 50\\text{ s}$."
    )

    add(ch, "First Order Reaction Percent Remaining after 2 Half-Lives",
        "What percentage of the initial amount of reactant is converted into products after 2 half-lives in a first-order reaction?",
        [
            "$75\\%$",
            "$25\\%$",
            "$50\\%$",
            "$87.5\\%$"
        ],
        "A",
        "After 1 half-life, $50\\%$ remains. After 2 half-lives, $25\\%$ remains. Therefore, the percentage converted into products is $100\\% - 25\\% = 75\\%$."
    )

    add(ch, "Activation Energy Calculation Zero Activation Energy",
        "If the rate constant of a reaction is independent of temperature, what is the value of its activation energy ($E_a$)?",
        [
            "$E_a = 0\\text{ J/mol}$",
            "$E_a = \\infty$",
            "$E_a = R T$",
            "$E_a = 100\\text{ kJ/mol}$"
        ],
        "A",
        "From the Arrhenius equation $\\frac{d\\ln k}{dT} = \\frac{E_a}{RT^2}$. If $k$ does not change with temperature, $\\frac{d\\ln k}{dT} = 0$, which requires $E_a = 0$. (Typical of radical recombination reactions)."
    )

    add(ch, "Fraction of Effective Collisions Formula",
        "According to the Arrhenius theory, the fraction of molecules having kinetic energy greater than or equal to the activation energy $E_a$ at temperature $T$ is given by:",
        [
            "$x = e^{-E_a / R T}$",
            "$x = e^{+E_a / R T}$",
            "$x = 1 - e^{-E_a / R T}$",
            "$x = \\frac{E_a}{R T}$"
        ],
        "A",
        "The Boltzmann factor $e^{-E_a/RT}$ represents the fraction of molecules whose kinetic energy exceeds the activation barrier $E_a$ at absolute temperature $T$."
    )

    add(ch, "First Order Gas Phase Reaction Total Pressure",
        "For a first-order gas-phase decomposition $A(g) \\to B(g) + C(g)$, if initial pressure is $P_0$ and total pressure at time $t$ is $P_t$, the rate constant $k$ is given by:",
        [
            "$k = \\frac{2.303}{t} \\log \\frac{P_0}{2P_0 - P_t}$",
            "$k = \\frac{2.303}{t} \\log \\frac{P_0}{P_t - P_0}$",
            "$k = \\frac{2.303}{t} \\log \\frac{P_0}{P_t}$",
            "$k = \\frac{2.303}{t} \\log \\frac{2P_0}{P_t}$"
        ],
        "A",
        "At time $t$: $p_A = P_0 - x$, $p_B = x$, $p_C = x$. Total pressure $P_t = P_0 - x + x + x = P_0 + x \\implies x = P_t - P_0$.\nPartial pressure of $A$: $p_A = P_0 - (P_t - P_0) = 2P_0 - P_t$.\nSubstituting into first-order equation: $k = \\frac{2.303}{t} \\log \\frac{P_0}{2P_0 - P_t}$."
    )

    add(ch, "Elementary Step and Reaction Intermediate",
        "In a multistep complex chemical mechanism, a chemical species that is formed in an earlier elementary step and consumed in a subsequent elementary step is called a:",
        [
            "Reaction intermediate",
            "Homogeneous catalyst",
            "Activated transition complex",
            "Rate-determining product"
        ],
        "A",
        "A reaction intermediate is a distinct molecular species (such as a free radical or carbocation) with finite lifetime that is produced in one elementary step and consumed in a later step, so it does not appear in the overall balanced chemical equation."
    )

    add(ch, "Rate Determining Step Principle",
        "In a complex chemical reaction proceeding via a sequence of elementary steps, the overall rate of the reaction is governed strictly by:",
        [
            "The slowest elementary step in the mechanism (the rate-determining step)",
            "The fastest elementary step in the mechanism",
            "The step with the lowest activation energy",
            "The step that forms the final stable products"
        ],
        "A",
        "The slowest elementary step acts as the bottleneck of the entire reaction sequence and is called the rate-determining step (RDS). The overall reaction rate cannot proceed faster than this bottleneck step."
    )

    add(ch, "Negative Order of Reaction",
        "In the decomposition of ozone: $2O_3(g) \\rightleftharpoons 3O_2(g)$, the rate law is found experimentally to be $\\text{Rate} = k \\frac{[O_3]^2}{[O_2]}$. The order of this reaction with respect to oxygen is:",
        [
            "$-1$ (negative order)",
            "$+1$",
            "$+2$",
            "Zero"
        ],
        "A",
        "Writing the rate law as $\\text{Rate} = k [O_3]^2 [O_2]^{-1}$, the power of $[O_2]$ is $-1$. This negative order indicates that oxygen acts as an inhibitor: increasing the concentration of $O_2$ slows down the rate of ozone decomposition."
    )

    # 51-65: Additional Specific Kinetics Questions
    add(ch, "First Order Reaction 50 Percent vs 90 Percent",
        "For a first-order reaction with rate constant $k$, the ratio of time taken for $90\\%$ completion ($t_{90\\%}$) to time taken for $50\\%$ completion ($t_{50\\%}$) is approximately:",
        [
            "$3.32$",
            "$1.80$",
            "$2.00$",
            "$4.50$"
        ],
        "A",
        "$t_{90\\%} = \\frac{2.303}{k} \\log \\frac{100}{10} = \\frac{2.303}{k} (1) = \\frac{2.303}{k}$.\n$t_{50\\%} = \\frac{2.303}{k} \\log(2) = \\frac{0.693}{k}$.\n$\\frac{t_{90\\%}}{t_{50\\%}} = \\frac{2.303}{0.693} \\approx 3.32$."
    )

    add(ch, "Dependence of Rate Constant on Concentration",
        "How does the specific reaction rate constant ($k$) change when the initial concentrations of all reactants are doubled?",
        [
            "It remains strictly unchanged because the rate constant depends only on temperature and catalyst",
            "It doubles",
            "It quadruples",
            "It decreases by half"
        ],
        "A",
        "The rate constant $k$ is an intrinsic kinetic property that depends exclusively on temperature, the presence of a catalyst, and the chemical nature of the reactants. It is completely independent of reactant concentrations."
    )

    add(ch, "Zero Order Linear Plot Variables",
        "For a zero-order reaction $A \\to \\text{Products}$, which plot yields a straight line with a negative slope?",
        [
            "$[A]$ versus $t$",
            "$\\ln [A]$ versus $t$",
            "$\\frac{1}{[A]}$ versus $t$",
            "$\\sqrt{[A]}$ versus $t$"
        ],
        "A",
        "From $[A] = [A]_0 - kt$, a plot of $[A]$ on the y-axis versus time $t$ on the x-axis yields a straight line with y-intercept $[A]_0$ and negative slope equal to $-k$."
    )

    add(ch, "First Order Linear Plot Variables",
        "For a first-order reaction $A \\to \\text{Products}$, which plot yields a straight line?",
        [
            "$\\ln [A]$ versus $t$",
            "$[A]$ versus $t$",
            "$\\frac{1}{[A]}$ versus $t$",
            "$[A]^2$ versus $t$"
        ],
        "A",
        "From $\\ln[A] = \\ln[A]_0 - kt$, plotting the natural logarithm of reactant concentration $\\ln[A]$ against time $t$ produces a straight line with slope $-k$ and y-intercept $\\ln[A]_0$."
    )

    add(ch, "Second Order Linear Plot Variables",
        "For a second-order reaction $2A \\to \\text{Products}$, which plot yields a straight line with a positive slope?",
        [
            "$\\frac{1}{[A]}$ versus $t$",
            "$\\ln [A]$ versus $t$",
            "$[A]$ versus $t$",
            "$\\frac{1}{[A]^2}$ versus $t$"
        ],
        "A",
        "The integrated rate law for second-order kinetics is $\\frac{1}{[A]} = \\frac{1}{[A]_0} + kt$. A plot of $\\frac{1}{[A]}$ versus $t$ gives a straight line with positive slope $+k$ and intercept $\\frac{1}{[A]_0}$."
    )

    add(ch, "Threshold Energy Definition and Formula",
        "The threshold energy ($E_{\\text{th}}$) of a chemical reaction is mathematically related to the average energy of reactant molecules ($E_R$) and activation energy ($E_a$) by:",
        [
            "$E_{\\text{th}} = E_R + E_a$",
            "$E_{\\text{th}} = E_a - E_R$",
            "$E_{\\text{th}} = E_R - E_a$",
            "$E_{\\text{th}} = E_R \\times E_a$"
        ],
        "A",
        "Threshold energy is the minimum total energy that reacting species must possess to undergo effective collision and form products: $E_{\\text{threshold}} = E_{\\text{reactants}} + E_a$."
    )

    add(ch, "Exothermic Reaction Activation Energies",
        "For an exothermic reaction with enthalpy change $\\Delta H < 0$, what is the relationship between the activation energy of the forward reaction ($E_{a,f}$) and that of the backward reaction ($E_{a,b}$)?",
        [
            "$E_{a,f} < E_{a,b}$",
            "$E_{a,f} > E_{a,b}$",
            "$E_{a,f} = E_{a,b}$",
            "$E_{a,f} = -E_{a,b}$"
        ],
        "A",
        "For an exothermic reaction: $\\Delta H = E_{a,f} - E_{a,b} < 0 \\implies E_{a,f} < E_{a,b}$. The forward activation energy is strictly less than the backward activation energy."
    )

    add(ch, "Endothermic Reaction Minimum Activation Energy",
        "For an endothermic reaction having positive enthalpy of reaction $\\Delta H$, the activation energy of the forward reaction ($E_a$) must be:",
        [
            "Strictly greater than $\\Delta H$",
            "Strictly less than $\\Delta H$",
            "Equal to zero",
            "Negative"
        ],
        "A",
        "Since $\\Delta H = E_{a,f} - E_{a,b} > 0$ and backward activation energy $E_{a,b} > 0$, we have $E_{a,f} = \\Delta H + E_{a,b} > \\Delta H$. The forward activation energy must always exceed the enthalpy of reaction."
    )

    add(ch, "Effect of Catalyst on Equilibrium Position",
        "When a catalyst is introduced into a reversible reaction at chemical equilibrium:",
        [
            "It does not change the equilibrium concentrations or the equilibrium constant $K_c$",
            "It increases the equilibrium yield of products",
            "It shifts equilibrium in the direction of the endothermic reaction",
            "It decreases the equilibrium constant $K_c$"
        ],
        "A",
        "A catalyst accelerates both forward and reverse reaction rates by the exact same factor by lowering the activation energy barrier equally in both directions. Therefore, it does not alter the equilibrium composition or the value of $K_c$."
    )

    add(ch, "Half-Life of First Order Radioactive Isotope",
        "A radioactive isotope has a half-life of $14\\text{ days}$. If you begin with $100\\text{ g}$ of the sample, how much remains undecayed after $42\\text{ days}$?",
        [
            "$12.5\\text{ g}$",
            "$25.0\\text{ g}$",
            "$6.25\\text{ g}$",
            "$50.0\\text{ g}$"
        ],
        "A",
        "Number of half-lives elapsed $n = \\frac{42}{14} = 3$.\nAmount remaining $= 100 \\times \\left(\\frac{1}{2}\\right)^3 = 100 \\times \\frac{1}{8} = 12.5\\text{ g}$."
    )

    add(ch, "Temperature Effect on Endothermic vs Exothermic Forward Rate",
        "When the temperature of a reaction mixture is raised, the rate of the forward reaction:",
        [
            "Increases for both endothermic and exothermic reactions",
            "Increases only for endothermic reactions and decreases for exothermic reactions",
            "Decreases for both types of reactions",
            "Remains constant for all reactions"
        ],
        "A",
        "According to the Arrhenius equation $k = A e^{-E_a/RT}$, increasing temperature increases the rate constant $k$ and hence the speed of the reaction, regardless of whether the reaction is endothermic or exothermic."
    )

    add(ch, "Differential Rate Law Expression",
        "For the reaction $2A + B \\to C$, if the reaction is first-order in $A$ and zero-order in $B$, the differential rate law is expressed as:",
        [
            "$-\\frac{d[A]}{dt} = 2k [A]$",
            "$-\\frac{d[A]}{dt} = k [A]^2 [B]$",
            "$-\\frac{d[A]}{dt} = k [A][B]$",
            "$-\\frac{d[A]}{dt} = k [B]$"
        ],
        "A",
        "Rate of reaction $= k [A]^1 [B]^0 = k [A]$. By definition, Rate $= -\\frac{1}{2}\\frac{d[A]}{dt} = k [A] \\implies -\\frac{d[A]}{dt} = 2k [A]$."
    )

    add(ch, "Effective Collision Frequency Calculation",
        "If a reaction has a total collision frequency $Z = 10^{30}\\text{ collisions L}^{-1}\\text{ s}^{-1}$ and the Boltzmann factor $e^{-E_a/RT} = 10^{-6}$, assuming steric factor $P = 1$, the rate of effective collisions is:",
        [
            "$10^{24}\\text{ collisions L}^{-1}\\text{ s}^{-1}$",
            "$10^{36}\\text{ collisions L}^{-1}\\text{ s}^{-1}$",
            "$10^{-6}\\text{ collisions L}^{-1}\\text{ s}^{-1}$",
            "$10^{30}\\text{ collisions L}^{-1}\\text{ s}^{-1}$"
        ],
        "A",
        "Rate of effective collisions $= Z \\cdot e^{-E_a/RT} = 10^{30} \\times 10^{-6} = 10^{24}\\text{ collisions L}^{-1}\\text{ s}^{-1}$."
    )

    add(ch, "Activation Energy from Two Rate Constants Ratio",
        "If the rate constant of a reaction doubles when temperature increases from $300\\text{ K}$ to $310\\text{ K}$, what is the activation energy $E_a$? (Take $R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$, $\\log 2 = 0.3010$)",
        [
            "$\\approx 53.6\\text{ kJ/mol}$",
            "$\\approx 26.8\\text{ kJ/mol}$",
            "$\\approx 107.2\\text{ kJ/mol}$",
            "$\\approx 12.4\\text{ kJ/mol}$"
        ],
        "A",
        "$\\log(2) = \\frac{E_a}{2.303 \\times 8.314} \\left(\\frac{310 - 300}{300 \\times 310}\\right)$.\n$0.3010 = \\frac{E_a}{19.147} \\left(\\frac{10}{93000}\\right) = \\frac{E_a}{19.147 \\times 9300}$.\n$E_a = 0.3010 \\times 19.147 \\times 9300 \\approx 53598\\text{ J/mol} \\approx 53.6\\text{ kJ/mol}$."
    )

    add(ch, "Order of Reaction from Concentration vs Time Data",
        "In an experiment, when the initial concentration of reactant was $0.1\\text{ M}$, the half-life was $20\\text{ minutes}$. When initial concentration was increased to $0.4\\text{ M}$, the half-life was still $20\\text{ minutes}$. The order of the reaction is:",
        [
            "1 (First order)",
            "0 (Zero order)",
            "2 (Second order)",
            "0.5 (Half order)"
        ],
        "A",
        "Since the half-life is completely independent of the initial concentration ($t_{1/2} = \\text{constant}$ when $[A]_0$ changes from $0.1\\text{ M}$ to $0.4\\text{ M}$), the reaction is strictly first-order."
    )

    add(ch, "Second Order Integrated Rate Law Expression",
        "For a simple second-order reaction of the type $2A \\to \\text{Products}$, what is the integrated rate equation expressing concentration $[A]$ as a function of time $t$?",
        [
            "$\\frac{1}{[A]} - \\frac{1}{[A]_0} = 2kt$",
            "$\\ln [A] - \\ln [A]_0 = -2kt$",
            "$[A] - [A]_0 = -2kt$",
            "$\\frac{1}{[A]^2} - \\frac{1}{[A]_0^2} = 2kt$"
        ],
        "A",
        "Differential rate law: $-\\frac{1}{2}\\frac{d[A]}{dt} = k[A]^2 \\implies -\\frac{d[A]}{[A]^2} = 2k dt$. Integrating between $0$ and $t$: $\\frac{1}{[A]} - \\frac{1}{[A]_0} = 2kt$."
    )

    add(ch, "Fractional Order Acetaldehyde Decomposition",
        "The thermal pyrolysis decomposition of acetaldehyde: $CH_3CHO(g) \\to CH_4(g) + CO(g)$ proceeds via a free-radical chain mechanism and exhibits an overall reaction order of:",
        [
            "$1.5$ (or $\\frac{3}{2}$ order)",
            "$1.0$ (first order)",
            "$2.0$ (second order)",
            "$0.5$ (half order)"
        ],
        "A",
        "The thermal decomposition of acetaldehyde follows the Rice-Herzfeld free-radical mechanism, yielding an experimental rate law $\\text{Rate} = k [CH_3CHO]^{3/2}$, which has a fractional order of $1.5$."
    )

    add(ch, "Zero Order Surface Reaction Catalyst Saturation",
        "In heterogeneous catalysis following Langmuir-Hinshelwood kinetics, why does the reaction order shift from first-order at very low gas pressures to zero-order at very high gas pressures?",
        [
            "At low pressure, fractional surface coverage $\\theta \\propto P$, while at high pressure the surface becomes fully saturated ($\\theta \\approx 1$)",
            "High pressure causes the gas molecules to undergo condensation into a liquid",
            "At low pressure, the catalyst functions homogeneously",
            "At high pressure, the activation energy increases exponentially"
        ],
        "A",
        "According to the Langmuir adsorption isotherm, surface coverage is $\\theta = \\frac{K P}{1 + K P}$. At low pressure ($K P \\ll 1$), $\\theta \\approx K P$ (first-order). At high pressure ($K P \\gg 1$), $\\theta \\approx 1$ (full saturation, zero-order)."
    )

    add(ch, "Collision Frequency Z Definition",
        "In the collision theory of chemical kinetics, the collision frequency ($Z_{AB}$) is defined as:",
        [
            "The total number of binary collisions between reactant molecules A and B per second per unit volume of the reaction mixture",
            "The fraction of colliding molecules possessing energy greater than threshold energy",
            "The probability of reacting species colliding with proper steric orientation",
            "The frequency of vibration of chemical bonds in the activated complex"
        ],
        "A",
        "Collision frequency $Z_{AB}$ represents the total count of collisions occurring between molecules of type A and type B per unit time (second) per unit volume ($\text{cm}^3$ or $\text{L}$) under the specified conditions."
    )

    add(ch, "Effect of Temperature on Frequency Factor A",
        "In the Arrhenius equation $k = A e^{-E_a/RT}$, over modest temperature intervals, the pre-exponential frequency factor $A$ is generally treated as:",
        [
            "Practically constant, because its weak $T^{1/2}$ temperature dependence is negligible compared to the exponential factor",
            "Inversely proportional to absolute temperature squared",
            "Directly proportional to the activation energy $E_a$",
            "Equal to zero at standard room temperature"
        ],
        "A",
        "Collision theory predicts that $A \\propto \\sqrt{T}$. Over ordinary experimental temperature intervals, the variation of $\\sqrt{T}$ is minuscule compared to the pronounced variation in the exponential factor $e^{-E_a/RT}$. Hence, $A$ is effectively treated as a temperature-independent constant."
    )

    return qs
