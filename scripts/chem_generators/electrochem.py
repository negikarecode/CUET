from scripts.chem_generators.common import make_question, normalize_text

def get_electrochem_questions(seen):
    qs = []
    
    def add(ch, top, text, opts, ans, sol):
        norm = normalize_text(text)
        assert norm not in seen, f"Duplicate detected in electrochem: {text[:50]}"
        seen.add(norm)
        qs.append(make_question(ch, top, text, opts, ans, sol))

    ch = "Electrochemistry"

    # 1-10: Galvanic Cells, Electrodes & Salt Bridge
    add(ch, "Salt Bridge Functions in Galvanic Cells",
        "Which of the following statements correctly describes the essential functions of a salt bridge in a Daniell cell?",
        [
            "It completes the electrical circuit and maintains electrical neutrality in both half-cell solutions without allowing bulk mixing",
            "It accelerates the flow of electrons directly from the cathode to the anode",
            "It generates auxiliary emf by undergoing spontaneous oxidation",
            "It eliminates the standard reduction potential of the zinc half-cell"
        ],
        "A",
        "A salt bridge contains an inert electrolyte (such as $KCl$ or $KNO_3$ in agar-agar). It completes the internal electrical circuit by allowing ionic migration and maintains electrical neutrality in both half-cell compartments without permitting bulk hydrodynamic mixing of the two electrolytes."
    )

    add(ch, "Electrolyte Choice for Salt Bridge",
        "Why is potassium chloride ($KCl$) or potassium nitrate ($KNO_3$) specifically preferred as the electrolyte in a salt bridge?",
        [
            "The transport numbers and ionic mobilities of $K^+$ and $Cl^-$ (or $NO_3^-$) are almost identical, minimizing liquid junction potential",
            "Potassium chloride decomposes spontaneously into inert elemental gases",
            "Potassium ions have higher oxidation potential than zinc metal",
            "Chloride ions react irreversibly with metal electrodes to form conductive films"
        ],
        "A",
        "An electrolyte for a salt bridge must have almost equal ionic velocities (mobilities) for both cation and anion ($u_+ \\approx u_-$). This ensures that ions diffuse at equal rates into both compartments, preventing unequal charge buildup and eliminating liquid junction potentials."
    )

    add(ch, "Standard Hydrogen Electrode Potential",
        "The standard electrode potential of the Standard Hydrogen Electrode (SHE), $Pt(s) | H_2(g, 1\\text{ bar}) | H^+(aq, 1\\text{ M})$, is:",
        [
            "Arbitrarily assigned a value of exactly $0.00\\text{ V}$ at all temperatures",
            "Measured to be $+0.76\\text{ V}$ relative to absolute vacuum",
            "Dependent exclusively on the surface area of the platinized platinum foil",
            "Variable depending on the barometric pressure of dry argon gas"
        ],
        "A",
        "By international IUPAC convention, the Standard Hydrogen Electrode is defined as the universal reference electrode and is assigned a standard reduction potential of exactly $0.00\\text{ V}$ at all temperatures."
    )

    add(ch, "Electrochemical Series Oxidizing Strength",
        "Given the standard reduction potentials: $E^\\circ(F_2 / F^-) = +2.87\\text{ V}$, $E^\\circ(Cl_2 / Cl^-) = +1.36\\text{ V}$, $E^\\circ(Br_2 / Br^-) = +1.09\\text{ V}$, and $E^\\circ(I_2 / I^-) = +0.54\\text{ V}$. Which of the following species is the STRONGEST oxidizing agent under standard conditions?",
        [
            "$F_2$",
            "$I^-$",
            "$F^-$",
            "$Cl_2$"
        ],
        "A",
        "A higher (more positive) standard reduction potential indicates a greater tendency to gain electrons (undergo reduction). Since fluorine gas ($F_2$) has the highest positive $E^\\circ$ value ($+2.87\\text{ V}$), it is the strongest oxidizing agent."
    )

    add(ch, "Electrochemical Series Reducing Strength",
        "Given the standard reduction potentials: $E^\\circ(Li^+ / Li) = -3.05\\text{ V}$, $E^\\circ(K^+ / K) = -2.93\\text{ V}$, $E^\\circ(Na^+ / Na) = -2.71\\text{ V}$, and $E^\\circ(Mg^{2+} / Mg) = -2.37\\text{ V}$. Which element is the STRONGEST reducing agent in aqueous solution?",
        [
            "$Li$",
            "$Na$",
            "$Mg$",
            "$K$"
        ],
        "A",
        "A more negative standard reduction potential reflects a greater thermodynamic tendency to lose electrons (undergo oxidation). Lithium has the most negative $E^\\circ$ ($-3.05\\text{ V}$), primarily due to its exceptionally high hydration enthalpy ($\Delta_{\\text{hyd}}H$) owing to its tiny ionic radius, making metallic lithium the strongest reducing agent in aqueous media."
    )

    # 6-15: Standard Cell EMF & Nernst Equation
    add(ch, "Standard Cell Potential Calculation Daniell Cell",
        "For the Daniell cell reaction $Zn(s) + Cu^{2+}(aq) \\to Zn^{2+}(aq) + Cu(s)$, given that $E^\\circ(Zn^{2+}/Zn) = -0.76\\text{ V}$ and $E^\\circ(Cu^{2+}/Cu) = +0.34\\text{ V}$, what is the standard cell potential ($E^\\circ_{\\text{cell}}$)?",
        [
            "$+1.10\\text{ V}$",
            "$-1.10\\text{ V}$",
            "$+0.42\\text{ V}$",
            "$-0.42\\text{ V}$"
        ],
        "A",
        "$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = E^\\circ(Cu^{2+}/Cu) - E^\\circ(Zn^{2+}/Zn) = (+0.34\\text{ V}) - (-0.76\\text{ V}) = +1.10\\text{ V}$."
    )

    add(ch, "Daniell Cell Behavior with External Counter Potential",
        "In a Daniell cell ($E^\\circ_{\\text{cell}} = 1.10\\text{ V}$), what occurs when an external opposing potential $E_{\\text{ext}} > 1.10\\text{ V}$ is applied across the cell?",
        [
            "The cell functions as an electrolytic cell, current flows in the opposite direction, and zinc deposits on the zinc electrode while copper dissolves",
            "The cell completely stops functioning and no chemical reaction takes place",
            "Current continues flowing in the forward direction with increased intensity",
            "Both electrodes dissolve rapidly into solution"
        ],
        "A",
        "When $E_{\\text{ext}} < 1.10\\text{ V}$, the cell acts galvanically. At $E_{\\text{ext}} = 1.10\\text{ V}$, no current flows. When $E_{\\text{ext}} > 1.10\\text{ V}$, the reaction is forced in the reverse direction: it behaves as an electrolytic cell where electrons flow from copper to zinc, depositing zinc at the zinc electrode and dissolving copper."
    )

    add(ch, "Nernst Equation at 298 K Single Electrode",
        "The reduction potential for the half-cell $M^{n+}(aq) + n e^- \\to M(s)$ at $298\\text{ K}$ is given by the Nernst equation as:",
        [
            "$E(M^{n+}/M) = E^\\circ(M^{n+}/M) - \\frac{0.0591}{n} \\log \\frac{1}{[M^{n+}]}$",
            "$E(M^{n+}/M) = E^\\circ(M^{n+}/M) + \\frac{0.0591}{n} \\log \\frac{1}{[M^{n+}]}$",
            "$E(M^{n+}/M) = E^\\circ(M^{n+}/M) - \\frac{0.0591}{n} \\ln [M^{n+}]$",
            "$E(M^{n+}/M) = \\frac{0.0591}{n} \\log [M^{n+}]$"
        ],
        "A",
        "At $298\\text{ K}$, Nernst equation for reduction is $E = E^\\circ - \\frac{2.303 RT}{nF} \\log Q = E^\\circ - \\frac{0.0591}{n} \\log \\frac{[M(s)]}{[M^{n+}]}$. Since activity of pure solid $[M(s)] = 1$, $E = E^\\circ - \\frac{0.0591}{n} \\log \\frac{1}{[M^{n+}]}$."
    )

    add(ch, "Nernst Equation Cell Potential Calculation",
        "Calculate the cell potential at $298\\text{ K}$ for the cell: $Zn(s) | Zn^{2+}(0.1\\text{ M}) || Cu^{2+}(1.0\\text{ M}) | Cu(s)$. ($E^\\circ_{\\text{cell}} = 1.10\\text{ V}$, $\\frac{2.303 RT}{F} = 0.0591\\text{ V}$)",
        [
            "$+1.130\\text{ V}$",
            "$+1.070\\text{ V}$",
            "$+1.100\\text{ V}$",
            "$+1.159\\text{ V}$"
        ],
        "A",
        "Cell reaction: $Zn(s) + Cu^{2+}(aq) \\to Zn^{2+}(aq) + Cu(s)$, with $n = 2$.\n$Q = \\frac{[Zn^{2+}]}{[Cu^{2+}]} = \\frac{0.1}{1.0} = 10^{-1}$.\n$E_{\\text{cell}} = E^\\circ - \\frac{0.0591}{2} \\log(10^{-1}) = 1.10 - (0.02955)(-1) = 1.10 + 0.02955 \\approx 1.130\\text{ V}$."
    )

    add(ch, "Equilibrium Constant from Standard Cell Potential",
        "The standard electromotive force of a galvanic cell is related to the equilibrium constant $K_c$ of the cell reaction at $298\\text{ K}$ by:",
        [
            "$\\log K_c = \\frac{n E^\\circ_{\\text{cell}}}{0.0591}$",
            "$\\log K_c = \\frac{E^\\circ_{\\text{cell}}}{n \\times 0.0591}$",
            "$\\log K_c = \\frac{0.0591}{n E^\\circ_{\\text{cell}}}$",
            "$\\log K_c = -n F E^\\circ_{\\text{cell}}$"
        ],
        "A",
        "At dynamic equilibrium, $E_{\\text{cell}} = 0$ and $Q = K_c$. From the Nernst equation:\n$0 = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log K_c \\implies \\log K_c = \\frac{n E^\\circ_{\\text{cell}}}{0.0591}$."
    )

    # 11-20: Gibbs Free Energy & Spontaneity
    add(ch, "Gibbs Free Energy and Cell Spontaneity",
        "The standard Gibbs free energy change ($\\Delta_r G^\\circ$) of an electrochemical reaction is related to the standard cell potential ($E^\\circ_{\\text{cell}}$) by the fundamental thermodynamic equation:",
        [
            "$\\Delta_r G^\\circ = -n F E^\\circ_{\\text{cell}}$",
            "$\\Delta_r G^\\circ = +n F E^\\circ_{\\text{cell}}$",
            "$\\Delta_r G^\\circ = -\\frac{n F}{E^\\circ_{\\text{cell}}}$",
            "$\\Delta_r G^\\circ = -\\frac{R T}{n F} E^\\circ_{\\text{cell}}$"
        ],
        "A",
        "Electrical work done in one second is equal to electrical potential multiplied by total charge passed: $W_{\\text{elec}} = n F E_{\\text{cell}}$. Maximum reversible work equals decrease in Gibbs free energy: $\\Delta_r G^\\circ = -n F E^\\circ_{\\text{cell}}$. A reaction is spontaneous when $E^\\circ_{\\text{cell}} > 0$, making $\\Delta_r G^\\circ < 0$."
    )

    add(ch, "Gibbs Free Energy Calculation Daniell Cell",
        "For the Daniell cell reaction $Zn(s) + Cu^{2+}(aq) \\to Zn^{2+}(aq) + Cu(s)$, with $E^\\circ_{\\text{cell}} = 1.10\\text{ V}$ and $F = 96500\\text{ C/mol}$, what is the value of $\\Delta_r G^\\circ$?",
        [
            "$-212.3\\text{ kJ/mol}$",
            "$+212.3\\text{ kJ/mol}$",
            "$-106.15\\text{ kJ/mol}$",
            "$-424.6\\text{ kJ/mol}$"
        ],
        "A",
        "Here $n = 2$.\n$\\Delta_r G^\\circ = -n F E^\\circ_{\\text{cell}} = -2 \\times 96500\\text{ C/mol} \\times 1.10\\text{ V} = -212300\\text{ J/mol} = -212.3\\text{ kJ/mol}$."
    )

    add(ch, "Electrolytic Conductance Resistance Relationship",
        "The electrolytic conductivity $\\kappa$ (kappa) of an electrolyte solution in a conductivity cell is related to its resistance $R$ and cell constant $G^*$ by:",
        [
            "$\\kappa = \\frac{G^*}{R} = \\frac{1}{R} \\left(\\frac{l}{A}\\right)$",
            "$\\kappa = R \\cdot G^*$",
            "$\\kappa = \\frac{R}{G^*}$",
            "$\\kappa = \\frac{R \\cdot A}{l}$"
        ],
        "A",
        "Resistance is $R = \\rho \\frac{l}{A}$. Conductivity is $\\kappa = \\frac{1}{\\rho} = \\frac{1}{R}\\left(\\frac{l}{A}\\right) = \\frac{G^*}{R}$, where $G^* = l/A$ is the cell constant."
    )

    add(ch, "Cell Constant Calculation Conductivity Cell",
        "A conductivity cell filled with $0.1\\text{ M } KCl$ solution (conductivity $\\kappa = 1.29\\text{ S/m}$) has a resistance of $100\\ \\Omega$. What is the cell constant ($G^*$) of the cell?",
        [
            "$129\\text{ m}^{-1}$",
            "$1.29\\text{ m}^{-1}$",
            "$0.0129\\text{ m}^{-1}$",
            "$77.5\\text{ m}^{-1}$"
        ],
        "A",
        "Cell constant $G^* = \\kappa \\times R = (1.29\\text{ S/m}) \\times 100\\ \\Omega = 129\\text{ m}^{-1}$."
    )

    add(ch, "Molar Conductivity Units and Expression",
        "If conductivity $\\kappa$ is expressed in $\\text{S cm}^{-1}$ and molar concentration $M$ in $\\text{mol L}^{-1}$, what is the formula and unit of molar conductivity $\\Lambda_m$?",
        [
            "$\\Lambda_m = \\frac{\\kappa \\times 1000}{M}\\text{ in S cm}^2\\text{ mol}^{-1}$",
            "$\\Lambda_m = \\frac{\\kappa}{M \\times 1000}\\text{ in S cm}^{-1}\\text{ mol}$",
            "$\\Lambda_m = \\kappa \\cdot M \\times 1000\\text{ in S cm}^2$",
            "$\\Lambda_m = \\frac{M \\times 1000}{\\kappa}\\text{ in S}^{-1}\\text{ cm}^2\\text{ mol}$"
        ],
        "A",
        "Molar conductivity is the conductance of a volume of solution containing 1 mole of electrolyte: $\\Lambda_m = \\frac{\\kappa}{C}$. Expressing $C$ in $\\text{mol/L}$ and volume in $\\text{cm}^3$, $\\Lambda_m = \\frac{\\kappa (\\text{S cm}^{-1}) \\times 1000}{M (\\text{mol L}^{-1})}\\text{ S cm}^2\\text{ mol}^{-1}$."
    )

    # 16-25: Kohlrausch's Law & Dilution
    add(ch, "Conductivity Variation with Dilution",
        "Why does the specific conductivity ($\\kappa$) of an electrolytic solution always DECREASE with dilution?",
        [
            "The number of current-carrying ions present per unit volume of the solution decreases upon adding solvent",
            "The velocity and mobility of the ions decrease dramatically",
            "The degree of dissociation decreases with dilution according to Ostwald's law",
            "The solvent forms an insulating layer directly on the ions"
        ],
        "A",
        "Conductivity is the conductance of $1\\text{ cm}^3$ (unit volume) of solution. On dilution, although the total volume increases and total dissociation may increase, the actual number of ions present per unit volume decreases, leading to a decrease in $\\kappa$."
    )

    add(ch, "Molar Conductivity Variation with Dilution Strong Electrolytes",
        "For strong electrolytes, the variation of molar conductivity $\\Lambda_m$ with concentration $c$ is described by the Debye-Hückel-Onsager equation:",
        [
            "$\\Lambda_m = \\Lambda_m^\\circ - A\\sqrt{c}$",
            "$\\Lambda_m = \\Lambda_m^\\circ + A\\sqrt{c}$",
            "$\\Lambda_m = \\Lambda_m^\\circ - A c^2$",
            "$\\Lambda_m = \\frac{\\Lambda_m^\\circ}{\\sqrt{c}}$"
        ],
        "A",
        "For strong electrolytes, which are already completely dissociated, dilution separates the ions and decreases interionic electrostatic attractions. Molar conductivity increases linearly with $\\sqrt{c}$ according to $\\Lambda_m = \\Lambda_m^\\circ - A\\sqrt{c}$, where $A$ depends on the electrolyte stoichiometry and solvent temperature."
    )

    add(ch, "Kohlrausch's Law of Independent Migration",
        "Kohlrausch's law of independent migration of ions states that at infinite dilution:",
        [
            "Each ion makes a definite, independent contribution to the total molar conductivity of the electrolyte, regardless of the nature of the co-ion",
            "All cations migrate twice as fast as anions in an electric field",
            "The molar conductivity approaches zero as concentration approaches zero",
            "The degree of dissociation of strong electrolytes drops to zero"
        ],
        "A",
        "Kohlrausch's law states that limiting molar conductivity of an electrolyte can be represented as the sum of individual contributions of the anion and cation: $\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ$."
    )

    add(ch, "Kohlrausch's Law Application Acetic Acid",
        "Given the limiting molar conductivities at $298\\text{ K}$:\n$\\Lambda_m^\\circ(CH_3COONa) = 91.0\\text{ S cm}^2\\text{ mol}^{-1}$\n$\\Lambda_m^\\circ(HCl) = 426.0\\text{ S cm}^2\\text{ mol}^{-1}$\n$\\Lambda_m^\\circ(NaCl) = 126.0\\text{ S cm}^2\\text{ mol}^{-1}$\nWhat is the limiting molar conductivity of acetic acid, $\\Lambda_m^\\circ(CH_3COOH)$?",
        [
            "$391.0\\text{ S cm}^2\\text{ mol}^{-1}$",
            "$461.0\\text{ S cm}^2\\text{ mol}^{-1}$",
            "$643.0\\text{ S cm}^2\\text{ mol}^{-1}$",
            "$300.0\\text{ S cm}^2\\text{ mol}^{-1}$"
        ],
        "A",
        "By Kohlrausch's law:\n$\\Lambda_m^\\circ(CH_3COOH) = \\Lambda_m^\\circ(CH_3COONa) + \\Lambda_m^\\circ(HCl) - \\Lambda_m^\\circ(NaCl) = 91.0 + 426.0 - 126.0 = 517.0 - 126.0 = 391.0\\text{ S cm}^2\\text{ mol}^{-1}$."
    )

    add(ch, "Degree of Dissociation Weak Electrolyte",
        "If the molar conductivity of a $0.025\\text{ M}$ methanoic acid ($HCOOH$) solution is $46.1\\text{ S cm}^2\\text{ mol}^{-1}$ and its limiting molar conductivity $\\Lambda_m^\\circ = 405.0\\text{ S cm}^2\\text{ mol}^{-1}$, what is the degree of dissociation ($\\alpha$)?",
        [
            "$0.114$ (or $11.4\\%$)",
            "$0.228$ (or $22.8\\%$)",
            "$0.057$ (or $5.7\\%$)",
            "$0.500$ (or $50.0\\%$)"
        ],
        "A",
        "The degree of dissociation of a weak electrolyte is given by $\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ} = \\frac{46.1}{405.0} \\approx 0.1138 \\approx 0.114$ (or $11.4\\%$)."
    )

    # 21-35: Faraday's Laws & Electrolysis Products
    add(ch, "Faraday's First Law Electrolysis Mass Deposited",
        "According to Faraday's First Law of Electrolysis, the mass $m$ of a substance deposited or liberated at an electrode is mathematically expressed as:",
        [
            "$m = Z I t = \\frac{M}{n F} I t$",
            "$m = \\frac{n F}{M I t}$",
            "$m = \\frac{Z t}{I}$",
            "$m = \\frac{M I}{n F t}$"
        ],
        "A",
        "Faraday's first law states $m \\propto Q = I t \\implies m = Z I t$. The electrochemical equivalent $Z$ is the mass deposited by 1 Coulomb of charge: $Z = \\frac{\\text{Equivalent weight}}{F} = \\frac{M}{n F}$."
    )

    add(ch, "Faraday Constant Definition and Value",
        "The Faraday constant ($F$) represents the total electric charge carried by:",
        [
            "One mole of electrons ($N_A \\times e \\approx 96487\\text{ C/mol} \\approx 96500\\text{ C/mol}$)",
            "One individual electron ($1.602 \\times 10^{-19}\\text{ C}$)",
            "One gram of ionized hydrogen gas",
            "One mole of divalent metal cations"
        ],
        "A",
        "One Faraday is the charge of one mole of electrons: $F = N_A \\cdot e = (6.022 \\times 10^{23}\\text{ mol}^{-1}) \\times (1.6022 \\times 10^{-19}\\text{ C}) = 96487\\text{ C mol}^{-1} \\approx 96500\\text{ C mol}^{-1}$."
    )

    add(ch, "Faraday Law Electrolysis Silver Nitrate",
        "How much electric charge (in Coulombs) is required for the complete reduction of $1.0\\text{ mol}$ of $Ag^+$ ions to metallic silver? ($Ag^+ + e^- \\to Ag$)",
        [
            "$96500\\text{ C}$ ($1\\text{ F}$)",
            "$193000\\text{ C}$ ($2\\text{ F}$)",
            "$48250\\text{ C}$ ($0.5\\text{ F}$)",
            "$289500\\text{ C}$ ($3\\text{ F}$)"
        ],
        "A",
        "The reduction of 1 mole of monovalent $Ag^+$ requires 1 mole of electrons: $Q = 1\\text{ mol } e^- \\times 96500\\text{ C/mol} = 96500\\text{ C} = 1\\text{ F}$."
    )

    add(ch, "Faraday Law Copper Deposition Current",
        "A steady current of $1.5\\text{ A}$ was passed through a solution of $CuSO_4$ for $10\\text{ minutes}$. What mass of copper was deposited at the cathode? (Molar mass of $Cu = 63.5\\text{ g/mol}$, $F = 96500\\text{ C/mol}$)",
        [
            "$0.296\\text{ g}$",
            "$0.592\\text{ g}$",
            "$0.148\\text{ g}$",
            "$1.184\\text{ g}$"
        ],
        "A",
        "Time $t = 10 \\times 60 = 600\\text{ s}$. Total charge $Q = I t = 1.5 \\times 600 = 900\\text{ C}$.\nReaction: $Cu^{2+} + 2e^- \\to Cu \\implies n = 2$.\nMass deposited $m = \\frac{M}{n F} Q = \\frac{63.5}{2 \\times 96500} \\times 900 = \\frac{57150}{193000} \\approx 0.296\\text{ g}$."
    )

    add(ch, "Faraday Second Law Series Electrolysis",
        "Two electrolytic cells containing aqueous $AgNO_3$ and $CuSO_4$ are connected in series and the same quantity of electric current is passed through both. If $1.08\\text{ g}$ of silver is deposited in the first cell, what mass of copper is deposited in the second cell? ($M_{Ag} = 108\\text{ g/mol}, M_{Cu} = 63.5\\text{ g/mol}$)",
        [
            "$0.3175\\text{ g}$",
            "$0.635\\text{ g}$",
            "$0.159\\text{ g}$",
            "$1.270\\text{ g}$"
        ],
        "A",
        "By Faraday's Second Law: $\\frac{w_1}{E_1} = \\frac{w_2}{E_2}$.\nEquivalent weight of $Ag$: $E_1 = \\frac{108}{1} = 108\\text{ g/equiv}$.\nEquivalent weight of $Cu$: $E_2 = \\frac{63.5}{2} = 31.75\\text{ g/equiv}$.\n$\\frac{1.08}{108} = \\frac{w_{Cu}}{31.75} \\implies 0.01 = \\frac{w_{Cu}}{31.75} \\implies w_{Cu} = 0.3175\\text{ g}$."
    )

    add(ch, "Electrolysis of Aqueous Sodium Chloride Brine",
        "During the commercial electrolysis of concentrated aqueous sodium chloride solution (brine) using inert platinum electrodes, the products liberated at the cathode and anode respectively are:",
        [
            "$H_2(g)$ at cathode and $Cl_2(g)$ at anode",
            "$Na(s)$ at cathode and $Cl_2(g)$ at anode",
            "$H_2(g)$ at cathode and $O_2(g)$ at anode",
            "$Na(s)$ at cathode and $O_2(g)$ at anode"
        ],
        "A",
        "At the cathode, reduction of water ($2H_2O + 2e^- \\to H_2 + 2OH^-$, $E^\\circ = -0.83\\text{ V}$) occurs preferentially over reduction of $Na^+$ ($E^\\circ = -2.71\\text{ V}$). At the anode, although oxidation of water has lower standard potential, oxidation of $Cl^-$ ($2Cl^- \\to Cl_2 + 2e^-$) occurs preferentially due to the overpotential of oxygen."
    )

    add(ch, "Electrolysis of Molten Sodium Chloride",
        "What are the products of electrolysis when anhydrous MOLTEN $NaCl$ is electrolyzed using inert electrodes in a Downs cell?",
        [
            "$Na$ metal at cathode and $Cl_2(g)$ at anode",
            "$H_2(g)$ at cathode and $Cl_2(g)$ at anode",
            "$Na$ metal at cathode and $O_2(g)$ at anode",
            "$NaOH$ at cathode and $HCl$ at anode"
        ],
        "A",
        "In molten $NaCl$, no water is present. The only ions are $Na^+$ and $Cl^-$. Cathode reaction: $Na^+ + e^- \\to Na(l)$. Anode reaction: $2Cl^- \\to Cl_2(g) + 2e^-$."
    )

    add(ch, "Electrolysis of Aqueous Copper Sulphate Copper Electrodes",
        "When aqueous $CuSO_4$ solution is electrolyzed using COPPER electrodes (as in industrial copper refining):",
        [
            "Copper dissolves from the anode and an equivalent amount of copper deposits at the cathode",
            "Hydrogen gas evolves at the cathode and oxygen gas evolves at the anode",
            "Copper deposits at the cathode while oxygen gas evolves at the anode",
            "Sulphur dioxide gas evolves at both electrodes"
        ],
        "A",
        "When active copper electrodes are used, oxidation of copper at the impure anode ($Cu \\to Cu^{2+} + 2e^-$) requires lower energy than oxidation of water. Pure copper deposits at the cathode ($Cu^{2+} + 2e^- \\to Cu$), while the anode dissolves."
    )

    add(ch, "Electrolysis of Dilute Sulphuric Acid",
        "During the electrolysis of DILUTE sulphuric acid ($H_2SO_4$) using platinum electrodes, the gaseous products evolved at the cathode and anode are respectively:",
        [
            "$H_2(g)$ and $O_2(g)$",
            "$H_2(g)$ and $SO_2(g)$",
            "$SO_2(g)$ and $O_2(g)$",
            "$H_2(g)$ and $S_2O_8^{2-}$"
        ],
        "A",
        "In dilute $H_2SO_4$, water is electrolyzed. Cathode: $2H^+ + 2e^- \\to H_2(g)$. Anode: $2H_2O \\to O_2(g) + 4H^+ + 4e^-$. Thus, hydrogen evolves at the cathode and oxygen at the anode."
    )

    add(ch, "Electrolysis of Concentrated Sulphuric Acid",
        "When CONCENTRATED sulphuric acid is electrolyzed at high current density, the major product formed at the anode is:",
        [
            "Peroxodisulphate ion ($S_2O_8^{2-}$)",
            "Oxygen gas ($O_2$)",
            "Sulphur dioxide gas ($SO_2$)",
            "Ozone ($O_3$)"
        ],
        "A",
        "At high concentrations of $H_2SO_4$, oxidation of hydrogen sulphate ions dominates at the anode: $2HSO_4^- \\to S_2O_8^{2-} + 2H^+ + 2e^-$, forming peroxodisulphuric acid (Marshall's acid)."
    )

    # 31-45: Commercial Batteries, Fuel Cells & Corrosion
    add(ch, "Dry Cell Leclanché Battery Chemistry",
        "In a standard Leclanché dry cell, which substance acts as the depolarizer around the carbon cathode to prevent hydrogen gas accumulation?",
        [
            "Manganese dioxide ($MnO_2$) mixed with carbon black",
            "Zinc chloride ($ZnCl_2$) paste",
            "Ammonium chloride ($NH_4Cl$) solution",
            "Potassium hydroxide ($KOH$)"
        ],
        "A",
        "In a dry cell, the cathode is a carbon (graphite) rod surrounded by powdered manganese dioxide ($MnO_2$) and carbon. $MnO_2$ acts as a depolarizer by oxidizing the produced hydrogen, reducing itself from $Mn(IV)$ to $Mn(III)$ in $MnO(OH)$."
    )

    add(ch, "Mercury Cell Constant Potential Reason",
        "Why does a mercury cell provide an exceptionally steady and constant cell potential ($1.35\\text{ V}$) throughout its operational lifetime?",
        [
            "The overall chemical reaction involves only solids and liquids, with no dissolved ions in solution whose concentration could change",
            "Mercury metal has an infinite dielectric constant",
            "Zinc amalgam regenerates spontaneously by absorbing atmospheric oxygen",
            "The electrolyte contains a saturated buffer of ammonium nitrate"
        ],
        "A",
        "Overall reaction: $Zn(Hg) + HgO(s) \\to ZnO(s) + Hg(l)$. The overall reaction involves no ionic species in solution whose concentration can vary during discharge, keeping the cell potential constant at $1.35\\text{ V}$."
    )

    add(ch, "Lead Storage Battery Discharging Reactions",
        "During the discharging process of a commercial lead storage battery, which chemical compound is formed at BOTH the anode and the cathode?",
        [
            "Lead(II) sulphate ($PbSO_4$)",
            "Lead dioxide ($PbO_2$)",
            "Lead(II) oxide ($PbO$)",
            "Basic lead carbonate"
        ],
        "A",
        "Anode reaction during discharge: $Pb(s) + SO_4^{2-} \\to PbSO_4(s) + 2e^-$.\nCathode reaction during discharge: $PbO_2(s) + 4H^+ + SO_4^{2-} + 2e^- \\to PbSO_4(s) + 2H_2O$.\nOverall: $Pb + PbO_2 + 2H_2SO_4 \\to 2PbSO_4 + 2H_2O$. Insoluble $PbSO_4$ coats both plates."
    )

    add(ch, "Lead Storage Battery Electrolyte Density",
        "As a lead storage battery discharges during use, the density of the sulphuric acid electrolyte:",
        [
            "Decreases from about $1.30\\text{ g/cm}^3$ to below $1.20\\text{ g/cm}^3$ because sulphuric acid is consumed and water is produced",
            "Increases from $1.15\\text{ g/cm}^3$ to $1.84\\text{ g/cm}^3$ because water evaporates",
            "Remains strictly constant at $1.00\\text{ g/cm}^3$",
            "Decreases because lead ions precipitate as volatile gases"
        ],
        "A",
        "The overall discharge reaction $Pb + PbO_2 + 2H_2SO_4 \\to 2PbSO_4 + 2H_2O$ consumes $H_2SO_4$ and generates $H_2O$. Consequently, the concentration and density of the electrolyte drop from $1.30\\text{ g/cm}^3$ (fully charged) to below $1.20\\text{ g/cm}^3$ (discharged)."
    )

    add(ch, "Lead Storage Battery Recharging Process",
        "When a discharged lead storage battery is recharged by connecting it to an external direct current power source:",
        [
            "$PbSO_4$ on the anode is reduced back to $Pb$, and $PbSO_4$ on the cathode is oxidized back to $PbO_2$",
            "$Pb$ on the anode is converted into $PbO$",
            "Sulphuric acid is decomposed into hydrogen and sulphur dioxide gases",
            "The polarity of the electrodes is permanently reversed"
        ],
        "A",
        "During recharging, an external DC current forces the reverse reaction: Anode (connected to negative terminal): $PbSO_4 + 2e^- \\to Pb + SO_4^{2-}$. Cathode (connected to positive terminal): $PbSO_4 + 2H_2O \\to PbO_2 + SO_4^{2-} + 4H^+ + 2e^-$. Sulphuric acid is regenerated."
    )

    add(ch, "Nickel-Cadmium Secondary Cell Chemistry",
        "The overall reaction occurring during the discharge of a rechargeable nickel-cadmium (Ni-Cad) storage cell is:",
        [
            "$Cd(s) + 2Ni(OH)_3(s) \\to CdO(s) + 2Ni(OH)_2(s) + H_2O(l)$",
            "$Cd(s) + NiO_2(s) + 2H_2SO_4 \\to CdSO_4 + NiSO_4 + 2H_2O$",
            "$Cd(s) + 2Ni(s) + 2H_2O \\to Cd(OH)_2 + 2Ni$",
            "$CdO(s) + Ni(OH)_2(s) \\to Cd + Ni(OH)_3$"
        ],
        "A",
        "In a nickel-cadmium cell, the overall discharge reaction is $Cd(s) + 2Ni(OH)_3(s) \\to CdO(s) + 2Ni(OH)_2(s) + H_2O(l)$. It produces an emf of about $1.4\\text{ V}$ and has a longer service life than lead batteries."
    )

    add(ch, "Hydrogen-Oxygen Fuel Cell Efficiency",
        "In the Apollo space missions, the hydrogen-oxygen fuel cell was chosen over conventional generators primarily because:",
        [
            "It operates with high thermodynamic efficiency (around 70%), produces zero toxic emissions, and its reaction product is pure potable water",
            "It uses heavy nuclear radioactive decay to generate heat",
            "It generates alternating current directly without an inverter",
            "It operates exclusively at absolute zero temperature"
        ],
        "A",
        "The $H_2-O_2$ fuel cell converts chemical energy of combustion directly into electrical energy with $\\approx 70\\%$ thermodynamic efficiency (compared to $\\approx 40\\%$ for thermal plants). It produces pure water, which astronauts used for drinking."
    )

    add(ch, "Fuel Cell Cathode Half-Reaction",
        "In an alkaline hydrogen-oxygen fuel cell using concentrated aqueous $KOH$ electrolyte, what is the half-cell reaction taking place at the cathode?",
        [
            "$O_2(g) + 2H_2O(l) + 4e^- \\to 4OH^-(aq)$",
            "$2H_2(g) + 4OH^-(aq) \\to 4H_2O(l) + 4e^-$",
            "$O_2(g) + 4H^+(aq) + 4e^- \\to 2H_2O(l)$",
            "$2OH^-(aq) \\to H_2O(l) + \\frac{1}{2}O_2(g) + 2e^-$"
        ],
        "A",
        "In alkaline medium: At anode: $2H_2(g) + 4OH^-(aq) \\to 4H_2O(l) + 4e^-$. At cathode: $O_2(g) + 2H_2O(l) + 4e^- \\to 4OH^-(aq)$. Overall: $2H_2(g) + O_2(g) \\to 2H_2O(l)$."
    )

    add(ch, "Corrosion Mechanism Rust Formation",
        "Rusting of iron is fundamentally an electrochemical process. At the cathodic spot on the iron surface, which reduction reaction occurs in the presence of acidic moisture?",
        [
            "$O_2(g) + 4H^+(aq) + 4e^- \\to 2H_2O(l)$",
            "$Fe^{2+}(aq) + 2e^- \\to Fe(s)$",
            "$2H_2O(l) + 2e^- \\to H_2(g) + 2OH^-(aq)$",
            "$4OH^-(aq) \\to O_2(g) + 2H_2O(l) + 4e^-$"
        ],
        "A",
        "In corrosion: Anodic site: $2Fe(s) \\to 2Fe^{2+} + 4e^-$. Electrons migrate through the metal to a cathodic site where dissolved atmospheric oxygen is reduced in the presence of $H^+$ (from dissolved $CO_2$ forming $H_2CO_3$): $O_2 + 4H^+ + 4e^- \\to 2H_2O$."
    )

    add(ch, "Galvanization Sacrificial Protection Principle",
        "Galvanization prevents the rusting of iron by coating it with zinc because:",
        [
            "Zinc has a more negative standard reduction potential ($E^\\circ = -0.76\\text{ V}$) than iron ($E^\\circ = -0.44\\text{ V}$), so zinc oxidizes preferentially even if the coating is scratched",
            "Zinc forms an impermeable covalent bond with iron that prevents all electron movement",
            "Zinc is a noble metal with positive standard reduction potential",
            "Zinc reacts with oxygen to form a poisonous gas that inhibits moisture absorption"
        ],
        "A",
        "Since $E^\\circ(Zn^{2+}/Zn) = -0.76\\text{ V}$ is more negative than $E^\\circ(Fe^{2+}/Fe) = -0.44\\text{ V}$, zinc is more readily oxidized than iron. Even if the zinc surface layer is scratched, zinc acts as a sacrificial anode and corrodes in preference to iron."
    )

    # 41-55: Electrochemical Calculations & Theory
    add(ch, "Equilibrium Constant Daniell Cell Exact Value",
        "Calculate the equilibrium constant $K_c$ for the Daniell cell reaction $Zn(s) + Cu^{2+}(aq) \\rightleftharpoons Zn^{2+}(aq) + Cu(s)$ at $298\\text{ K}$, given $E^\\circ_{\\text{cell}} = 1.10\\text{ V}$. (Take $\\frac{2.303 RT}{F} = 0.0591\\text{ V}$)",
        [
            "$K_c \\approx 2 \\times 10^{37}$",
            "$K_c \\approx 1 \\times 10^{18}$",
            "$K_c \\approx 1.1 \\times 10^{10}$",
            "$K_c \\approx 4 \\times 10^{2}$"
        ],
        "A",
        "$\\log K_c = \\frac{n E^\\circ}{0.0591} = \\frac{2 \\times 1.10}{0.0591} = \\frac{2.20}{0.0591} \\approx 37.225$.\n$K_c = 10^{37.225} = 10^{0.225} \\times 10^{37} \\approx 1.68 \\times 10^{37} \\approx 2 \\times 10^{37}$."
    )

    add(ch, "Molar Charge for Deposition of Polyvalent Ions",
        "How many moles of electrons are required to deposit $27\\text{ g}$ of aluminium metal from molten alumina ($Al_2O_3$)? (Atomic mass of $Al = 27\\text{ u}$)",
        [
            "$3\\text{ moles of electrons}$ ($3\\text{ F}$)",
            "$1\\text{ mole of electrons}$ ($1\\text{ F}$)",
            "$2\\text{ moles of electrons}$ ($2\\text{ F}$)",
            "$6\\text{ moles of electrons}$ ($6\\text{ F}$)"
        ],
        "A",
        "Molar mass of $Al = 27\\text{ g/mol}$, so $27\\text{ g} = 1.0\\text{ mol}$ of $Al$.\nThe half-cell reaction is $Al^{3+} + 3e^- \\to Al(s)$.\nTherefore, 1 mole of $Al$ requires 3 moles of electrons ($3\\text{ F} = 3 \\times 96500\\text{ C}$)."
    )

    add(ch, "Conductivity of Pure Water",
        "The conductivity of pure water at $298\\text{ K}$ is very low ($\\kappa = 5.5 \\times 10^{-6}\\text{ S m}^{-1}$) because:",
        [
            "Water is an extremely weak electrolyte with very low degree of self-ionization ($[H^+] = [OH^-] = 10^{-7}\\text{ M}$)",
            "Water has zero dielectric constant",
            "Hydrogen bonds immobilize all proton transfers completely",
            "Water molecules undergo irreversible dimerization in liquid phase"
        ],
        "A",
        "Pure water self-ionizes only slightly: $2H_2O \\rightleftharpoons H_3O^+ + OH^-$, with ionic product $K_w = 10^{-14}$. The ion concentration is very low ($10^{-7}\\text{ mol/L}$ of $H^+$ and $OH^-$), resulting in minuscule conductivity."
    )

    add(ch, "Mercury Cell Anode and Cathode Materials",
        "In a miniature mercury button cell used in hearing aids and wristwatches, the anode and cathode materials are respectively:",
        [
            "Zinc-mercury amalgam ($Zn-Hg$) and a paste of mercuric oxide ($HgO$) with carbon",
            "Pure zinc and lead dioxide ($PbO_2$)",
            "Cadmium metal and nickel hydroxide ($Ni(OH)_3$)",
            "Lithium metal and manganese dioxide ($MnO_2$)"
        ],
        "A",
        "In a commercial mercury cell, the anode consists of zinc-mercury amalgam ($Zn-Hg$), and the cathode is a paste of mercury(II) oxide ($HgO$) and carbon. A moist paste of $KOH$ and $ZnO$ acts as electrolyte."
    )

    add(ch, "Corrosion Prevention by Cathodic Protection",
        "In cathodic protection of underground steel pipelines, a sacrificial anode of which metal is connected electrically to the pipeline?",
        [
            "Magnesium or Zinc",
            "Copper or Silver",
            "Tin or Lead",
            "Platinum or Gold"
        ],
        "A",
        "Magnesium ($E^\\circ = -2.37\\text{ V}$) and zinc ($E^\\circ = -0.76\\text{ V}$) have more negative reduction potentials than iron ($E^\\circ = -0.44\\text{ V}$). Connecting a block of magnesium to the pipeline makes the pipeline the cathode, while the magnesium sacrifices itself by oxidizing preferentially."
    )

    add(ch, "Limiting Molar Conductivity of Strong vs Weak Electrolyte Graph",
        "When $\\Lambda_m$ is plotted against $\\sqrt{c}$, which of the following electrolyte pairs corresponds respectively to a linear graph with gentle slope and a curve showing steep asymptotic increase at near-zero concentration?",
        [
            "$KCl$ (linear) and $CH_3COOH$ (steep asymptotic curve)",
            "$CH_3COOH$ (linear) and $KCl$ (steep asymptotic curve)",
            "Both $KCl$ and $CH_3COOH$ give identical straight lines",
            "Both $KCl$ and $CH_3COOH$ give identical rectangular hyperbolas"
        ],
        "A",
        "For a strong electrolyte ($KCl$), $\\Lambda_m$ increases slowly and linearly with $\\sqrt{c}$ according to $\\Lambda_m = \\Lambda_m^\\circ - A\\sqrt{c}$. For a weak electrolyte ($CH_3COOH$), dissociation increases exponentially at high dilution, causing a steep upward rise in $\\Lambda_m$ near $c \\to 0$."
    )

    add(ch, "Concentration Cell EMF Expression",
        "For a concentration cell consisting of two identical copper electrodes in $CuSO_4$ solutions of concentrations $c_1$ and $c_2$ ($c_2 > c_1$): $Cu(s) | Cu^{2+}(c_1) || Cu^{2+}(c_2) | Cu(s)$, the cell EMF at $298\\text{ K}$ is:",
        [
            "$E_{\\text{cell}} = \\frac{0.0591}{2} \\log \\frac{c_2}{c_1}$",
            "$E_{\\text{cell}} = \\frac{0.0591}{2} \\log \\frac{c_1}{c_2}$",
            "$E_{\\text{cell}} = 0.0591 \\log (c_1 c_2)$",
            "$E_{\\text{cell}} = 0\\text{ V}$ always, regardless of concentrations"
        ],
        "A",
        "Since both electrodes are identical, $E^\\circ_{\\text{cell}} = 0$. By the Nernst equation: $E_{\\text{cell}} = 0 - \\frac{0.0591}{2} \\log \\frac{c_1}{c_2} = \\frac{0.0591}{2} \\log \\frac{c_2}{c_1}$. Since $c_2 > c_1$, $E_{\\text{cell}} > 0$ (spontaneous)."
    )

    add(ch, "Ostwald Dilution Law Dissociation Constant",
        "For a weak monobasic acid $HA$ of concentration $c$ and degree of dissociation $\\alpha = \\Lambda_m / \\Lambda_m^\\circ$, the dissociation constant $K_a$ is expressed as:",
        [
            "$K_a = \\frac{c \\alpha^2}{1 - \\alpha} = \\frac{c \\Lambda_m^2}{\\Lambda_m^\\circ (\\Lambda_m^\\circ - \\Lambda_m)}$",
            "$K_a = \\frac{c \\Lambda_m}{\\Lambda_m^\\circ}$",
            "$K_a = \\frac{\\Lambda_m^\\circ - \\Lambda_m}{c \\Lambda_m^2}$",
            "$K_a = c^2 \\alpha$"
        ],
        "A",
        "From $HA \\rightleftharpoons H^+ + A^-$, $K_a = \\frac{c\\alpha^2}{1 - \\alpha}$. Substituting $\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ}$ yields $K_a = \\frac{c (\\Lambda_m/\\Lambda_m^\\circ)^2}{1 - \\Lambda_m/\\Lambda_m^\\circ} = \\frac{c \\Lambda_m^2}{\\Lambda_m^\\circ (\\Lambda_m^\\circ - \\Lambda_m)}$."
    )

    add(ch, "Relation Between Electrical Work and Enthalpy",
        "The temperature coefficient of cell potential, $\\left(\\frac{\\partial E}{\\partial T}\\right)_P$, is directly related to the entropy change ($\\Delta_r S$) of the cell reaction by:",
        [
            "$\\Delta_r S = n F \\left(\\frac{\\partial E}{\\partial T}\\right)_P$",
            "$\\Delta_r S = -n F \\left(\\frac{\\partial E}{\\partial T}\\right)_P$",
            "$\\Delta_r S = \\frac{n F}{T} E$",
            "$\\Delta_r S = n F T \\left(\\frac{\\partial E}{\\partial T}\\right)_P$"
        ],
        "A",
        "From thermodynamics, $\\left(\\frac{\\partial \\Delta G}{\\partial T}\\right)_P = -\\Delta S$. Substituting $\\Delta G = -n F E$ gives $\\frac{\\partial (-n F E)}{\\partial T} = -\\Delta S \\implies \\Delta S = n F \\left(\\frac{\\partial E}{\\partial T}\\right)_P$."
    )

    add(ch, "Current Efficiency in Electrolysis",
        "In an industrial electroplating bath, a current of $10.0\\text{ A}$ is passed for $965\\text{ seconds}$ to deposit nickel ($Ni^{2+} + 2e^- \\to Ni$). If $2.35\\text{ g}$ of nickel is actually deposited, what is the current efficiency? (Molar mass of $Ni = 58.7\\text{ g/mol}$)",
        [
            "$80.07\\%$",
            "$95.00\\%$",
            "$50.00\\%$",
            "$65.20\\%$"
        ],
        "A",
        "Total charge $Q = 10.0 \\times 965 = 9650\\text{ C} = 0.10\\text{ F}$.\nTheoretical mass deposited $m_{\\text{theo}} = \\frac{M}{n F} Q = \\frac{58.7}{2 \\times 96500} \\times 9650 = \\frac{58.7}{20} = 2.935\\text{ g}$.\n$\\text{Current efficiency} = \\frac{\\text{Actual mass}}{\\text{Theoretical mass}} \\times 100 = \\frac{2.35}{2.935} \\times 100 \\approx 80.07\\%$."
    )

    # 51-65: Additional Specific Electrochemistry Topics
    add(ch, "Electrolysis of Molten Alumina Cryolite Role",
        "In the Hall-Héroult electrolytic extraction of aluminium from molten alumina ($Al_2O_3$), cryolite ($Na_3AlF_6$) and fluorspar ($CaF_2$) are added primarily to:",
        [
            "Lower the melting point of alumina from $2323\\text{ K}$ to around $1173\\text{ K}$ and increase electrical conductivity",
            "Act as reducing agents to convert $Al^{3+}$ directly into liquid aluminium",
            "Form a protective gaseous shield of fluorine over the carbon anode",
            "Precipitate impurities like iron oxide and silica as slag"
        ],
        "A",
        "Pure $Al_2O_3$ has an exceedingly high melting point ($> 2050^\\circ\\text{C}$) and is a poor electrical conductor in molten state. Adding cryolite ($Na_3AlF_6$) and $CaF_2$ lowers the melting point to $\\approx 950^\\circ\\text{C}$ and drastically increases electrical conductivity."
    )

    add(ch, "Graphite Anode Consumption Hall-Heroult Process",
        "In the Hall-Héroult process for aluminium extraction, why must the carbon (graphite) anodes be replaced periodically?",
        [
            "Oxygen liberated at the anode reacts with carbon to form $CO$ and $CO_2$, gradually burning away the anodes",
            "Molten aluminium dissolves the carbon anodes forming aluminium carbide",
            "Cryolite chemically attacks the graphite lattice converting it into diamond",
            "The anodes undergo mechanical erosion due to electromagnetic stirring"
        ],
        "A",
        "During electrolysis, oxygen liberated at the anode reacts with the hot carbon anode: $C + O_2 \\to CO_2$ and $2C + O_2 \\to 2CO$. For every kilogram of aluminium produced, about $0.5\\text{ kg}$ of carbon anode is consumed."
    )

    add(ch, "Overpotential Phenomenon Definition",
        "The phenomenon of overpotential (overvoltage) in electrochemistry refers to:",
        [
            "The extra potential beyond the thermodynamically calculated equilibrium potential required to drive an electrode reaction at a measurable rate",
            "The potential drop across the salt bridge due to ion concentration differences",
            "The electrostatic repulsion between ions of identical sign at infinite dilution",
            "The voltage surge produced when a battery is short-circuited"
        ],
        "A",
        "Overpotential is the additional kinetic potential required above the thermodynamic reversible electrode potential to overcome activation energy barriers and drive an electrochemical reaction at a practical rate (e.g. overpotential for $O_2$ evolution enables $Cl_2$ discharge in brine electrolysis)."
    )

    add(ch, "Electromotive Force vs Potential Difference",
        "What is the fundamental distinction between the electromotive force (EMF) of a galvanic cell and its terminal potential difference?",
        [
            "EMF is the potential difference between electrodes when no current flows through the circuit, whereas terminal potential difference is measured when current is being drawn",
            "EMF is measured exclusively during battery charging",
            "Terminal potential difference is always strictly greater than EMF",
            "EMF depends only on external circuit resistance, while potential difference does not"
        ],
        "A",
        "Cell EMF is the maximum potential difference between the two electrodes of a galvanic cell when the circuit is open (zero current drawn). When current $I$ is drawn, terminal potential difference $V = \\text{EMF} - I r$, which is lower due to internal resistance $r$."
    )

    add(ch, "Molar Conductivity of Weak Electrolyte at Infinite Dilution",
        "Why CANNOT the limiting molar conductivity ($\\Lambda_m^\\circ$) of weak electrolytes like acetic acid be obtained by direct linear extrapolation of $\\Lambda_m$ vs $\\sqrt{c}$ plots to zero concentration?",
        [
            "At near-zero concentration, $\\Lambda_m$ increases exceedingly steeply (asymptotically) so the curve never intersects the y-axis linearly",
            "Weak electrolytes decompose into inert non-conductive gases at high dilution",
            "The conductivity of weak electrolytes becomes infinite at finite concentration",
            "The salt bridge precipitates at concentrations below $0.001\\text{ M}$"
        ],
        "A",
        "For weak electrolytes, the degree of dissociation $\\alpha$ increases steeply towards 1 as concentration approaches zero. This results in an asymptotic upward sweep of the curve near zero concentration, preventing accurate linear extrapolation to the y-axis. Kohlrausch's law must be used instead."
    )

    add(ch, "Fuel Cell Efficiency vs Carnot Efficiency",
        "Why can fuel cells exceed the theoretical Carnot thermodynamic efficiency limit that restricts conventional heat engines?",
        [
            "Fuel cells convert Gibbs free energy of reaction directly into electrical work without passing through an intermediate thermal cycle",
            "Fuel cells operate strictly at $0\\text{ K}$ where entropy is zero",
            "Fuel cells absorb heat from the surroundings and convert 100% of it into work",
            "Fuel cells produce nuclear fission energy rather than chemical energy"
        ],
        "A",
        "Conventional power plants burn fuel to produce heat, which runs a turbine subject to the Carnot efficiency limit $\\eta = 1 - T_C/T_H$. Fuel cells convert chemical Gibbs free energy directly into electrical energy via electrochemical reactions, bypassing the thermal cycle."
    )

    add(ch, "Lead Storage Battery Charging Anode Identity",
        "When recharging a lead-acid battery, the lead electrode that served as the anode during discharge is connected to:",
        [
            "The negative terminal of the external DC charger, functioning as a cathode during recharge",
            "The positive terminal of the external DC charger, functioning as an anode during recharge",
            "An alternating current power supply directly",
            "A ground earth line to neutralize stray charges"
        ],
        "A",
        "During recharging, the direction of electron flow is reversed. The negative plate (spongy lead) that served as the anode during discharge is connected to the negative terminal of the DC charger, where reduction of $PbSO_4$ to $Pb$ occurs, acting as a cathode during recharge."
    )

    add(ch, "Corrosion Prevention by Tinning vs Galvanizing",
        "Tin ($Sn$, $E^\\circ = -0.14\\text{ V}$) is used to coat iron ($Fe$, $E^\\circ = -0.44\\text{ V}$) in food cans. What happens if this tin coating is scratched?",
        [
            "Iron has a more negative reduction potential than tin, so iron oxidizes and rusts much faster than if tin were absent",
            "Tin oxidizes sacrificially to protect the iron underneath",
            "Both iron and tin become passivated by forming insoluble hydroxides",
            "The exposed iron reacts with food acids to form an impervious oxide film"
        ],
        "A",
        "Since $E^\\circ(Fe^{2+}/Fe) = -0.44\\text{ V}$ is more negative than $E^\\circ(Sn^{2+}/Sn) = -0.14\\text{ V}$, iron is more active than tin. Once the tin layer is breached, an electrochemical couple is set up where iron acts as the anode and corrodes rapidly. Unlike zinc, tin does not provide sacrificial protection."
    )

    add(ch, "Dry Cell Potential Decay",
        "Why does a standard Leclanché dry cell have a limited shelf-life even when it is not being used in an electrical circuit?",
        [
            "The acidic electrolyte ($NH_4Cl$) slowly corrodes the zinc container over time",
            "The graphite cathode rod oxidizes into gaseous carbon dioxide",
            "Manganese dioxide decomposes spontaneously into elemental manganese",
            "Atmospheric nitrogen diffuses through the zinc seal"
        ],
        "A",
        "The acidic nature of ammonium chloride ($NH_4Cl$) causes slow chemical corrosion of the zinc casing even on open circuit ($Zn + 2NH_4^+ \\to Zn^{2+} + 2NH_3 + H_2$). Consequently, dry cells cannot be stored indefinitely."
    )

    add(ch, "Conductivity Cell Constant Calibration Standard",
        "In experimental physical chemistry, conductivity cells are routinely calibrated using standardized solutions of:",
        [
            "Potassium chloride ($KCl$) of precisely known conductivities at various temperatures",
            "Sodium chloride ($NaCl$) saturated with chlorine gas",
            "Pure liquid mercury at its freezing point",
            "Dilute hydrochloric acid neutralized with sodium hydroxide"
        ],
        "A",
        "Direct measurement of the physical dimensions $l$ and $A$ of a conductivity cell is difficult and inaccurate. Instead, the cell constant is determined by measuring the resistance of standard $KCl$ solutions whose conductivity $\\kappa$ has been measured with extreme precision."
    )

    add(ch, "Standard Reduction Potential and Spontaneity",
        "Consider two half-reactions: $A^{2+} + 2e^- \\to A$ ($E^\\circ = +0.80\\text{ V}$) and $B^{2+} + 2e^- \\to B$ ($E^\\circ = -0.40\\text{ V}$). Under standard conditions, which spontaneous redox reaction will take place?",
        [
            "$B + A^{2+} \\to B^{2+} + A$, with $E^\\circ_{\\text{cell}} = +1.20\\text{ V}$",
            "$A + B^{2+} \\to A^{2+} + B$, with $E^\\circ_{\\text{cell}} = +1.20\\text{ V}$",
            "$B + A^{2+} \\to B^{2+} + A$, with $E^\\circ_{\\text{cell}} = +0.40\\text{ V}$",
            "$A + B^{2+} \\to A^{2+} + B$, with $E^\\circ_{\\text{cell}} = -1.20\\text{ V}$"
        ],
        "A",
        "Species with higher reduction potential ($A^{2+}$, $+0.80\\text{ V}$) undergoes reduction at the cathode. Species with lower reduction potential ($B$, $-0.40\\text{ V}$) undergoes oxidation at the anode.\nSpontaneous reaction: $B + A^{2+} \\to B^{2+} + A$.\n$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = (+0.80\\text{ V}) - (-0.40\\text{ V}) = +1.20\\text{ V} > 0$."
    )

    add(ch, "Lead Storage Battery Overall Reaction Direction",
        "In a lead-acid car battery, what is the stoichiometric consumption of sulphuric acid ($H_2SO_4$) per Faraday of electric charge discharged?",
        [
            "$1\\text{ mole of } H_2SO_4\\text{ per Faraday}$",
            "$2\\text{ moles of } H_2SO_4\\text{ per Faraday}$",
            "$0.5\\text{ mole of } H_2SO_4\\text{ per Faraday}$",
            "$4\\text{ moles of } H_2SO_4\\text{ per Faraday}$"
        ],
        "A",
        "Overall discharge reaction: $Pb + PbO_2 + 2H_2SO_4 \\to 2PbSO_4 + 2H_2O$. This reaction involves transfer of $n = 2$ electrons ($2\\text{ F}$ of electricity) for every 2 moles of $H_2SO_4$ consumed. Therefore, $\\frac{2\\text{ mol } H_2SO_4}{2\\text{ F}} = 1\\text{ mole of } H_2SO_4$ is consumed per Faraday of electricity."
    )

    add(ch, "Electrolytic Refining of Copper Slime",
        "During the electrolytic refining of blister copper, the insoluble anode mud (anode slime) deposited beneath the anode contains valuable recovery metals such as:",
        [
            "Gold, Silver, and Platinum",
            "Iron, Zinc, and Nickel",
            "Sodium, Potassium, and Calcium",
            "Aluminium and Magnesium"
        ],
        "A",
        "Less electropositive noble metals present in blister copper (such as $Ag, Au, Pt$) do not oxidize at the anode potential. As copper dissolves away, these noble metals drop to the bottom as anode mud / anode slime, which is recovered economically."
    )

    add(ch, "Faraday's Constant Relation to Avogadro Number",
        "If the elementary charge of a single electron is $e = 1.602 \\times 10^{-19}\\text{ C}$ and the Faraday constant is $F = 96485\\text{ C mol}^{-1}$, the calculated value of Avogadro's constant $N_A$ is:",
        [
            "$6.023 \\times 10^{23}\\text{ mol}^{-1}$",
            "$6.023 \\times 10^{22}\\text{ mol}^{-1}$",
            "$6.023 \\times 10^{24}\\text{ mol}^{-1}$",
            "$1.660 \\times 10^{-24}\\text{ mol}^{-1}$"
        ],
        "A",
        "$F = N_A \\cdot e \\implies N_A = \\frac{F}{e} = \\frac{96485\\text{ C mol}^{-1}}{1.602 \\times 10^{-19}\\text{ C}} \\approx 6.023 \\times 10^{23}\\text{ mol}^{-1}$."
    )

    add(ch, "Conductance vs Specific Conductivity Relation",
        "If the distance between two planar electrodes in a conductivity cell is $2.0\\text{ cm}$ and their cross-sectional area is $4.0\\text{ cm}^2$, the relationship between measured conductance ($G$) and conductivity ($\\kappa$) is:",
        [
            "$\\kappa = 0.50 \\times G$",
            "$\\kappa = 2.0 \\times G$",
            "$\\kappa = 8.0 \\times G$",
            "$\\kappa = G$"
        ],
        "A",
        "Cell constant $G^* = \\frac{l}{A} = \\frac{2.0\\text{ cm}}{4.0\\text{ cm}^2} = 0.50\\text{ cm}^{-1}$.\nConductivity $\\kappa = G \\cdot G^* = 0.50 \\times G$."
    )

    return qs
