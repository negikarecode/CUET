from scripts.chem_generators.common import make_question, normalize_text

def get_solutions_questions(seen):
    qs = []
    
    def add(ch, top, text, opts, ans, sol):
        norm = normalize_text(text)
        assert norm not in seen, f"Duplicate detected in solutions: {text[:50]}"
        seen.add(norm)
        qs.append(make_question(ch, top, text, opts, ans, sol))

    ch = "Solutions"

    # 1-10: Henry's Law & Gas Solubility
    add(ch, "Henry's Law and Temperature Dependence",
        "How does the Henry's law constant ($K_H$) for a gas in a liquid solvent typically vary with increasing temperature, and what effect does this have on gas solubility?",
        [
            "$K_H$ increases with increasing temperature, leading to decreased gas solubility",
            "$K_H$ decreases with increasing temperature, leading to increased gas solubility",
            "$K_H$ remains constant with temperature, while solubility always increases",
            "$K_H$ increases with increasing temperature, leading to increased gas solubility"
        ],
        "A",
        "Dissolution of most gases in liquids is an exothermic process ($\\Delta H_{\\text{solution}} < 0$). In accordance with Le Chatelier's principle, solubility decreases with an increase in temperature. From Henry's law $p = K_H x$, at a given pressure, a lower solubility (lower mole fraction $x$) corresponds to a higher $K_H$ value. Thus, $K_H$ increases with increasing temperature."
    )

    add(ch, "Henry's Law Scuba Diving Application",
        "Why do deep-sea scuba divers breathe air diluted with helium (11.7% He, 56.2% N₂, 32.1% O₂) rather than normal atmospheric air?",
        [
            "Helium has very low solubility in blood even at high underwater pressures, preventing painful bends upon ascent",
            "Helium actively increases the metabolic rate of divers underwater",
            "Helium chemically reacts with nitrogen to form inert, non-toxic complexes in blood",
            "Helium lowers blood pressure to prevent oxygen toxicity"
        ],
        "A",
        "At high underwater pressures, atmospheric nitrogen dissolves extensively in the diver's blood. When the diver ascends, pressure decreases, causing dissolved nitrogen to release as bubbles in blood capillaries, causing painful and dangerous 'bends'. Diluting air with helium (which has extremely low solubility in blood) prevents this condition."
    )

    add(ch, "Henry's Law High Altitude Anoxia",
        "People living at high altitudes or mountain climbers often experience weakness and impaired thinking capacity known as anoxia. This physiological condition is caused by:",
        [
            "Lower partial pressure of atmospheric oxygen, leading to lower dissolved oxygen concentrations in blood and tissues",
            "Higher partial pressure of atmospheric nitrogen competing with oxygen uptake",
            "Increased Henry's law constant for carbon dioxide causing acidosis",
            "Excessive osmotic pressure in brain capillaries due to cold air"
        ],
        "A",
        "At high altitudes, atmospheric pressure is considerably lower than at sea level. According to Henry's law ($p = K_H x$), the lower partial pressure of oxygen results in lower concentrations of dissolved oxygen in the blood and bodily tissues, causing anoxia."
    )

    add(ch, "Henry's Law Carbonated Beverages",
        "In the commercial packaging of carbonated soft drinks, why are the bottles sealed under high pressure of carbon dioxide ($CO_2$)?",
        [
            "To increase the solubility of $CO_2$ in the soft drink according to Henry's law",
            "To prevent the soda from freezing at low temperatures",
            "To decrease the vapor pressure of water and prevent syrup crystallization",
            "To neutralize acidic preservatives present in the beverage"
        ],
        "A",
        "According to Henry's law ($p = K_H x$), the solubility of a gas in a liquid is directly proportional to the partial pressure of the gas above the liquid. Sealing bottles under high $CO_2$ pressure increases the quantity of dissolved $CO_2$."
    )

    add(ch, "Henry's Law Aquatic Life Behavior",
        "Why are aquatic species such as trout generally more comfortable and active in cold water streams compared to warm water lakes?",
        [
            "Oxygen has greater solubility in water at lower temperatures because gas dissolution is exothermic",
            "Cold water has a higher vapor pressure that facilitates fish respiration",
            "Henry's law constant for oxygen increases at lower temperatures",
            "Cold water decreases the osmotic pressure of fish cell membranes"
        ],
        "A",
        "The dissolution of oxygen in water is an exothermic process. As temperature decreases, Le Chatelier's principle dictates that oxygen solubility increases. Thus, cold water contains a higher concentration of dissolved oxygen."
    )

    # 6-15: Concentration Terms & Conversions
    add(ch, "Concentration Terms Temperature Invariance",
        "Which of the following concentration units is strictly INDEPENDENT of temperature fluctuations?",
        [
            "Molality and Mole Fraction",
            "Molarity and Normality",
            "Molarity and Formality",
            "Volume percentage and Molarity"
        ],
        "A",
        "Molality ($m = \\frac{\\text{moles of solute}}{\\text{mass of solvent in kg}}$) and mole fraction ($x$) involve masses, which do not change with temperature. In contrast, molarity and normality depend on solution volume, which expands or contracts with temperature changes."
    )

    add(ch, "Concentration Calculations Molality of Aqueous Solution",
        "What is the molality of an aqueous solution containing $18\\text{ g}$ of glucose ($C_6H_{12}O_6$, molar mass $= 180\\text{ g/mol}$) dissolved in $500\\text{ g}$ of water?",
        [
            "$0.2\\text{ mol/kg}$",
            "$0.1\\text{ mol/kg}$",
            "$0.4\\text{ mol/kg}$",
            "$0.02\\text{ mol/kg}$"
        ],
        "A",
        "Moles of glucose = $\\frac{18\\text{ g}}{180\\text{ g/mol}} = 0.1\\text{ mol}$.\nMass of solvent = $500\\text{ g} = 0.5\\text{ kg}$.\nMolality $m = \\frac{0.1\\text{ mol}}{0.5\\text{ kg}} = 0.2\\text{ mol/kg}$."
    )

    add(ch, "Concentration Calculations Mole Fraction Binary Mixture",
        "A solution is prepared by mixing $23\\text{ g}$ of ethanol ($C_2H_5OH$, molar mass $= 46\\text{ g/mol}$) with $54\\text{ g}$ of water ($H_2O$, molar mass $= 18\\text{ g/mol}$). What is the mole fraction of ethanol in this solution?",
        [
            "$\\frac{1}{7} \\approx 0.143$",
            "$\\frac{1}{6} \\approx 0.167$",
            "$\\frac{23}{77} \\approx 0.299$",
            "$\\frac{1}{3} \\approx 0.333$"
        ],
        "A",
        "Moles of ethanol $n_{\\text{eth}} = \\frac{23}{46} = 0.5\\text{ mol}$.\nMoles of water $n_{\\text{water}} = \\frac{54}{18} = 3.0\\text{ mol}$.\nTotal moles = $0.5 + 3.0 = 3.5\\text{ mol}$.\nMole fraction of ethanol $x_{\\text{eth}} = \\frac{0.5}{3.5} = \\frac{1}{7} \\approx 0.143$."
    )

    add(ch, "Concentration Terms Parts Per Million",
        "A sample of drinking water was found to be contaminated with chloroform ($CHCl_3$). The level of contamination was determined to be $15\\text{ ppm}$ by mass. What is the mass percentage of chloroform in this sample?",
        [
            "$1.5 \\times 10^{-3}\\%$",
            "$1.5 \\times 10^{-4}\\%$",
            "$1.5 \\times 10^{-2}\\%$",
            "$0.15\\%$"
        ],
        "A",
        "$15\\text{ ppm}$ means $15\\text{ g}$ of chloroform per $10^6\\text{ g}$ of solution.\nMass percentage = $\\frac{15}{10^6} \\times 100 = 15 \\times 10^{-4}\\% = 1.5 \\times 10^{-3}\\%$."
    )

    add(ch, "Concentration Calculations Molarity Dilution",
        "To what volume must $250\\text{ mL}$ of a $0.80\\text{ M } HCl$ solution be diluted with distilled water to obtain a $0.20\\text{ M } HCl$ solution?",
        [
            "$1000\\text{ mL}$",
            "$750\\text{ mL}$",
            "$500\\text{ mL}$",
            "$1250\\text{ mL}$"
        ],
        "A",
        "Using the dilution equation $M_1 V_1 = M_2 V_2$:\n$(0.80)(250) = (0.20) V_2 \\implies V_2 = \\frac{200}{0.20} = 1000\\text{ mL}$."
    )

    # 11-20: Raoult's Law & Ideal Solutions
    add(ch, "Ideal Solutions Thermodynamic Criteria",
        "Which set of thermodynamic conditions uniquely characterizes an ideal solution formed by mixing two volatile liquids A and B?",
        [
            "$\\Delta H_{\\text{mixing}} = 0$, $\\Delta V_{\\text{mixing}} = 0$, and $\\Delta S_{\\text{mixing}} > 0$",
            "$\\Delta H_{\\text{mixing}} < 0$, $\\Delta V_{\\text{mixing}} < 0$, and $\\Delta S_{\\text{mixing}} = 0$",
            "$\\Delta H_{\\text{mixing}} > 0$, $\\Delta V_{\\text{mixing}} > 0$, and $\\Delta G_{\\text{mixing}} = 0$",
            "$\\Delta H_{\\text{mixing}} = 0$, $\\Delta V_{\\text{mixing}} = 0$, and $\\Delta S_{\\text{mixing}} < 0$"
        ],
        "A",
        "For an ideal solution, intermolecular forces between A-B are identical to those between A-A and B-B. Hence, $\\Delta H_{\\text{mix}} = 0$ and $\\Delta V_{\\text{mix}} = 0$. Since mixing is always spontaneous and increases randomness, $\\Delta S_{\\text{mix}} > 0$ and $\\Delta G_{\\text{mix}} < 0$."
    )

    add(ch, "Ideal Solution Binary Liquid Pair",
        "Which of the following pairs of volatile organic liquids behaves almost as an ideal solution across all composition ranges?",
        [
            "n-Hexane and n-heptane",
            "Ethanol and acetone",
            "Chloroform and acetone",
            "Phenol and aniline"
        ],
        "A",
        "n-Hexane and n-heptane have virtually identical molecular sizes, polarities, and London dispersion forces, making intermolecular interactions between hexane-heptane identical to pure components, resulting in ideal behavior."
    )

    add(ch, "Raoult's Law Volatile Liquid Binary Vapor Pressure",
        "At $300\\text{ K}$, the vapor pressure of pure liquid A is $400\\text{ mm Hg}$ and that of pure liquid B is $600\\text{ mm Hg}$. What is the total vapor pressure of an ideal mixture containing $0.4\\text{ mol}$ of A and $0.6\\text{ mol}$ of B?",
        [
            "$520\\text{ mm Hg}$",
            "$480\\text{ mm Hg}$",
            "$500\\text{ mm Hg}$",
            "$550\\text{ mm Hg}$"
        ],
        "A",
        "Mole fraction of A: $x_A = \\frac{0.4}{0.4 + 0.6} = 0.4$, and $x_B = 0.6$.\nBy Raoult's law:\n$p_A = x_A p_A^\\circ = 0.4 \\times 400 = 160\\text{ mm Hg}$.\n$p_B = x_B p_B^\\circ = 0.6 \\times 600 = 360\\text{ mm Hg}$.\n$P_{\\text{total}} = p_A + p_B = 160 + 360 = 520\\text{ mm Hg}$."
    )

    add(ch, "Raoult's Law Vapor Phase Mole Fraction",
        "For a binary ideal solution of liquids A and B, the partial vapor pressures are $p_A = 150\\text{ mm Hg}$ and $p_B = 350\\text{ mm Hg}$. What is the mole fraction of component A in the vapor phase in equilibrium with the solution?",
        [
            "$0.30$",
            "$0.43$",
            "$0.70$",
            "$0.25$"
        ],
        "A",
        "Total vapor pressure $P_{\\text{total}} = p_A + p_B = 150 + 350 = 500\\text{ mm Hg}$.\nThe mole fraction of A in the vapor phase is $y_A = \\frac{p_A}{P_{\\text{total}}} = \\frac{150}{500} = 0.30$."
    )

    # 15-25: Non-Ideal Solutions & Azeotropes
    add(ch, "Non-Ideal Solutions Positive Deviation Mechanism",
        "Why does an ethanol-acetone binary mixture exhibit a pronounced POSITIVE deviation from Raoult's law?",
        [
            "Acetone molecules get between ethanol molecules, breaking ethanol's intermolecular hydrogen bonds and increasing escaping tendency",
            "Acetone forms strong dipole-induced dipole forces with ethanol that release heat",
            "Ethanol reacts chemically with acetone to form a volatile hemiketal",
            "Ethanol undergoes extensive dimerization in acetone"
        ],
        "A",
        "In pure ethanol, molecules are held together by strong hydrogen bonding. When acetone is added, its molecules insert between ethanol molecules, disrupting hydrogen bonds. As ethanol-acetone interactions are weaker than ethanol-ethanol interactions, the escaping tendency increases, producing positive deviation ($\\Delta H_{\\text{mix}} > 0, \\Delta V_{\\text{mix}} > 0$)."
    )

    add(ch, "Non-Ideal Solutions Negative Deviation Example",
        "Which of the following binary liquid mixtures exhibits NEGATIVE deviation from Raoult's law accompanied by heat evolution ($\\Delta H_{\\text{mix}} < 0$)?",
        [
            "Chloroform and acetone",
            "Carbon disulphide and acetone",
            "Ethanol and water",
            "Benzene and toluene"
        ],
        "A",
        "Chloroform forms a new intermolecular hydrogen bond with the carbonyl oxygen of acetone: $Cl_3C-H \\cdots O=C(CH_3)_2$. The solute-solvent interactions are stronger than pure component interactions, leading to negative deviation with $\\Delta H_{\\text{mix}} < 0$ and $\\Delta V_{\\text{mix}} < 0$."
    )

    add(ch, "Azeotropes Minimum Boiling Nature",
        "A binary mixture of two liquids displaying large positive deviations from Raoult's law forms a:",
        [
            "Minimum boiling azeotrope at a specific composition",
            "Maximum boiling azeotrope at a specific composition",
            "Zeotropic mixture that boils over a wide continuous temperature range",
            "Completely immiscible two-phase system"
        ],
        "A",
        "Solutions showing large positive deviations from Raoult's law have vapor pressures higher than expected, meaning the mixture reaches atmospheric pressure at a lower temperature. Hence, it forms a minimum boiling azeotrope (e.g., 95% ethanol and 5% water by volume)."
    )

    add(ch, "Azeotropes Maximum Boiling Characteristic",
        "Which of the following liquid pairs forms a MAXIMUM boiling azeotrope?",
        [
            "Nitric acid (68%) and water (32%) by mass",
            "Ethanol (95.5%) and water (4.5%) by volume",
            "Acetone and carbon disulphide",
            "n-Hexane and n-heptane"
        ],
        "A",
        "Nitric acid and water exhibit large negative deviations from Raoult's law due to strong acid-water hydration interactions. The resulting lower vapor pressure leads to a maximum boiling azeotrope at 68% $HNO_3$ and 32% $H_2O$ (boiling point $393.5\\text{ K}$)."
    )

    add(ch, "Relative Lowering of Vapor Pressure Non-Volatile Solute",
        "When $5.0\\text{ g}$ of a non-volatile organic solute is dissolved in $100\\text{ g}$ of benzene, the vapor pressure of benzene decreases from $0.850\\text{ bar}$ to $0.840\\text{ bar}$. If the molar mass of benzene ($C_6H_6$) is $78\\text{ g/mol}$, what is the molar mass of the solute?",
        [
            "$331.5\\text{ g/mol}$",
            "$170.0\\text{ g/mol}$",
            "$256.2\\text{ g/mol}$",
            "$420.0\\text{ g/mol}$"
        ],
        "A",
        "By Raoult's law for dilute solutions: $\\frac{p_1^\\circ - p_1}{p_1^\\circ} = \\frac{w_2 M_1}{M_2 w_1}$.\n$\\frac{0.850 - 0.840}{0.850} = \\frac{0.010}{0.850} = \\frac{5.0 \\times 78}{M_2 \\times 100}$.\n$\\frac{1}{85} = \\frac{390}{100 M_2} = \\frac{3.9}{M_2} \\implies M_2 = 3.9 \\times 85 = 331.5\\text{ g/mol}$."
    )

    add(ch, "Elevation of Boiling Point Constant Units",
        "What are the SI/metric units of the molal elevation constant (ebullioscopic constant, $K_b$)?",
        [
            "$\\text{K kg mol}^{-1}$",
            "$\\text{kg mol K}^{-1}$",
            "$\\text{K mol kg}^{-1}$",
            "$\\text{J K}^{-1}\\text{ mol}^{-1}$"
        ],
        "A",
        "From $\\Delta T_b = K_b \\cdot m$, we have $K_b = \\frac{\\Delta T_b}{m} = \\frac{\\text{K}}{\\text{mol/kg}} = \\text{K kg mol}^{-1}$."
    )

    # 21-35: Colligative Properties Numericals & Concepts
    add(ch, "Elevation of Boiling Point Calculation",
        "What is the boiling point of a solution prepared by dissolving $12.0\\text{ g}$ of urea ($NH_2CONH_2$, molar mass $= 60\\text{ g/mol}$) in $250\\text{ g}$ of water? ($K_b$ of water $= 0.52\\text{ K kg mol}^{-1}$, normal boiling point of water $= 100.00^\\circ\\text{C}$)",
        [
            "$100.416^\\circ\\text{C}$",
            "$100.208^\\circ\\text{C}$",
            "$100.832^\\circ\\text{C}$",
            "$101.040^\\circ\\text{C}$"
        ],
        "A",
        "Moles of urea $n = \\frac{12.0}{60} = 0.2\\text{ mol}$.\nMass of water = $250\\text{ g} = 0.25\\text{ kg}$.\nMolality $m = \\frac{0.2}{0.25} = 0.8\\text{ mol/kg}$.\n$\\Delta T_b = K_b m = 0.52 \\times 0.8 = 0.416^\\circ\\text{C}$.\n$T_b = 100.00 + 0.416 = 100.416^\\circ\\text{C}$."
    )

    add(ch, "Depression of Freezing Point Antifreeze Application",
        "Ethylene glycol ($C_2H_6O_2$, molar mass $= 62\\text{ g/mol}$) is widely added to automobile radiator water in sub-zero climates as an antifreeze because:",
        [
            "It lowers the freezing point of water by disrupting the crystal lattice formation of ice",
            "It increases the chemical reactivity of coolant corrosion inhibitors",
            "It reacts with water to form an exothermic solid hydrate",
            "It selectively increases the vapor pressure of water above atmospheric pressure"
        ],
        "A",
        "Adding non-volatile ethylene glycol lowers the chemical potential and vapor pressure of liquid water, resulting in a depression of the freezing point ($\\Delta T_f = K_f m$) below $0^\\circ\\text{C}$, preventing the radiator fluid from freezing solid in cold weather."
    )

    add(ch, "Depression of Freezing Point Calculation",
        "A solution containing $1.80\\text{ g}$ of a non-electrolyte solute dissolved in $90.0\\text{ g}$ of benzene freezes at $5.12^\\circ\\text{C}$. If pure benzene freezes at $5.50^\\circ\\text{C}$ and its $K_f = 5.12\\text{ K kg mol}^{-1}$, what is the molar mass of the solute?",
        [
            "$270\\text{ g/mol}$",
            "$180\\text{ g/mol}$",
            "$135\\text{ g/mol}$",
            "$360\\text{ g/mol}$"
        ],
        "A",
        "$\\Delta T_f = 5.50 - 5.12 = 0.38\\text{ K}$.\nUsing $\\Delta T_f = K_f \\frac{w_2 \\times 1000}{M_2 \\times w_1}$:\n$0.38 = 5.12 \\times \\frac{1.80 \\times 1000}{M_2 \\times 90.0} = 5.12 \\times \\frac{20}{M_2} = \\frac{102.4}{M_2}$.\n$M_2 = \\frac{102.4}{0.38} \\approx 269.5\\text{ g/mol} \\approx 270\\text{ g/mol}$."
    )

    add(ch, "Cryoscopic Constant Solvent Dependence",
        "The value of the cryoscopic constant ($K_f$) for a solution depends strictly upon:",
        [
            "The nature of the solvent only",
            "The chemical identity of the solute only",
            "The molar concentration of the dissolved solute particles",
            "The atmospheric pressure surrounding the open system"
        ],
        "A",
        "The cryoscopic constant $K_f = \\frac{R M_1 T_f^2}{1000 \\Delta_{\\text{fus}}H}$ depends exclusively on the properties of the solvent (its molar mass $M_1$, normal freezing point $T_f$, and enthalpy of fusion $\\Delta_{\\text{fus}}H$)."
    )

    add(ch, "Osmotic Pressure Formula Definition",
        "The osmotic pressure ($\\Pi$) of a dilute solution containing non-electrolyte solute is described by the van 't Hoff equation:",
        [
            "$\\Pi = C R T = \\frac{n_2}{V} R T$",
            "$\\Pi = \\frac{C R}{T}$",
            "$\\Pi = \\frac{V}{n_2 R T}$",
            "$\\Pi = C R T^2$"
        ],
        "A",
        "For dilute solutions, van 't Hoff established that osmotic pressure obeys $\\Pi = C R T = \\left(\\frac{n_2}{V}\\right) R T$, where $C$ is molarity, $R$ is gas constant, and $T$ is absolute temperature."
    )

    add(ch, "Osmotic Pressure Polymer Molar Mass Determination",
        "Why is osmotic pressure universally preferred over freezing point depression or boiling point elevation for determining the molar masses of biomolecules (proteins, enzymes) and synthetic polymers?",
        [
            "Biomolecules are thermally unstable at high boiling points, and their low molarity produces easily measurable osmotic pressures at room temperature",
            "Osmotic pressure does not depend on the gas constant $R$",
            "Biomolecules associate completely into dimers during freezing point experiments",
            "Semipermeable membranes selectively digest low-molar-mass impurities"
        ],
        "A",
        "Biomolecules and macromolecules have very large molar masses, yielding minuscule molarities in dilute solution where $\\Delta T_b$ or $\\Delta T_f$ are too small to measure accurately. Additionally, biomolecules denature at boiling temperatures. Osmotic pressure measurements are executed at room temperature and produce substantial, easily measurable hydrostatic heads."
    )

    add(ch, "Osmotic Pressure Calculation Glucose Solution",
        "What is the osmotic pressure of an aqueous solution of glucose ($C_6H_{12}O_6$) containing $9.0\\text{ g}$ in $500\\text{ mL}$ of solution at $300\\text{ K}$? ($R = 0.0821\\text{ L atm K}^{-1}\\text{ mol}^{-1}$, molar mass of glucose $= 180\\text{ g/mol}$)",
        [
            "$2.46\\text{ atm}$",
            "$4.92\\text{ atm}$",
            "$1.23\\text{ atm}$",
            "$0.82\\text{ atm}$"
        ],
        "A",
        "Moles of glucose = $\\frac{9.0}{180} = 0.05\\text{ mol}$.\nVolume of solution = $500\\text{ mL} = 0.50\\text{ L}$.\nMolarity $C = \\frac{0.05}{0.50} = 0.10\\text{ M}$.\n$\\Pi = C R T = (0.10)(0.0821)(300) = 2.463\\text{ atm} \\approx 2.46\\text{ atm}$."
    )

    add(ch, "Osmosis Red Blood Cell Hemolysis",
        "What happens when fresh human red blood cells (RBCs) are immersed in a hypotonic saline solution containing less than $0.9\\%$ (m/V) $NaCl$?",
        [
            "Water molecules flow into the red blood cells via osmosis, causing them to swell and burst (hemolysis)",
            "Water flows out of the red blood cells, causing them to shrink and shrivel (plasmolysis)",
            "Sodium ions actively diffuse into the cells until dynamic crystallization occurs",
            "The red blood cells maintain exactly their original shape and size"
        ],
        "A",
        "Blood plasma is isotonic with $0.9\\%$ (m/V) $NaCl$ solution. When placed in a hypotonic solution (lower osmotic pressure outside), water flows into the RBCs through their semipermeable membrane, causing them to swell and burst (hemolysis)."
    )

    add(ch, "Osmosis Red Blood Cell Plasmolysis",
        "When fresh human red blood cells are placed into a hypertonic salt solution having $NaCl$ concentration greater than $0.9\\%$ (m/V), the cells:",
        [
            "Shrink and shrivel due to exosmosis of water",
            "Swell and rupture due to endosmosis of water",
            "Precipitate hemoglobin into insoluble microcrystals",
            "Undergo no morphological change"
        ],
        "A",
        "In a hypertonic environment, the external osmotic pressure is higher than inside the cell. Water flows out of the cell via exosmosis into the surrounding salt solution, causing the cell to shrink (crenation/plasmolysis)."
    )

    add(ch, "Reverse Osmosis Desalination Mechanism",
        "In the industrial desalination of seawater by reverse osmosis, the direction of natural solvent flow is reversed across the semipermeable membrane by:",
        [
            "Applying a mechanical pressure greater than the osmotic pressure on the saline solution side",
            "Cooling the seawater to freeze out pure ice crystals",
            "Applying an electric field to electrophoretically drive sodium and chloride ions",
            "Heating the seawater above its normal boiling point under high vacuum"
        ],
        "A",
        "If an external hydrostatic pressure greater than the solution's osmotic pressure is exerted on the concentrated seawater side, pure water molecules are forced backward through the semipermeable membrane into the pure water reservoir, achieving desalination."
    )

    add(ch, "Reverse Osmosis Semipermeable Membrane Material",
        "Which polymer film supported on a porous sheet is most widely used as the semipermeable membrane in commercial reverse osmosis desalination plants?",
        [
            "Cellulose acetate",
            "Polytetrafluoroethylene (Teflon)",
            "Vulcanized natural rubber",
            "Polyethylene terephthalate"
        ],
        "A",
        "Cellulose acetate polymer film is permeable to water molecules while impervious to dissolved salt ions and organic contaminants, making it the industrial standard membrane for reverse osmosis."
    )

    # 32-45: van 't Hoff Factor & Electrolyte Colligative Properties
    add(ch, "van 't Hoff Factor Definition Ratios",
        "Which of the following mathematical expressions correctly defines the van 't Hoff factor ($i$)?",
        [
            "$i = \\frac{\\text{Observed colligative property}}{\\text{Calculated colligative property assuming no association/dissociation}}$",
            "$i = \\frac{\\text{Calculated colligative property}}{\\text{Observed colligative property}}$",
            "$i = \\frac{\\text{Normal molar mass}}{\\text{Theoretical mass of solvent}}$",
            "$i = \\frac{\\text{Moles before association}}{\\text{Moles after association}}$"
        ],
        "A",
        "The van 't Hoff factor $i$ is defined as $i = \\frac{\\text{Observed value of colligative property}}{\\text{Normal/calculated value of colligative property}} = \\frac{\\text{Normal molar mass}}{\\text{Abnormal observed molar mass}} = \\frac{\\text{Total moles of particles after association/dissociation}}{\\text{Number of moles of formula units dissolved}}$."
    )

    add(ch, "van 't Hoff Factor Strong Electrolyte Salts",
        "Assuming complete electrolytic dissociation in very dilute aqueous solution, what is the theoretical van 't Hoff factor ($i$) for aluminium sulphate, $Al_2(SO_4)_3$?",
        [
            "$5$",
            "$3$",
            "$4$",
            "$2$"
        ],
        "A",
        "$Al_2(SO_4)_3$ dissociates as: $Al_2(SO_4)_3 \\to 2Al^{3+} + 3SO_4^{2-}$. Total ions produced per formula unit $n = 2 + 3 = 5$. For complete dissociation, $i = 5$."
    )

    add(ch, "van 't Hoff Factor Potassium Ferrocyanide",
        "In infinitely dilute aqueous solution, what is the expected van 't Hoff factor ($i$) for the coordination compound potassium ferrocyanide, $K_4[Fe(CN)_6]$?",
        [
            "$5$",
            "$6$",
            "$4$",
            "$1$"
        ],
        "A",
        "$K_4[Fe(CN)_6]$ dissociates into four potassium ions and one complex ferrocyanide anion: $K_4[Fe(CN)_6] \\to 4K^+ + [Fe(CN)_6]^{4-}$. Thus, $n = 4 + 1 = 5$ ions, giving $i = 5$."
    )

    add(ch, "van 't Hoff Factor Carboxylic Acid Dimerization",
        "When benzoic acid ($C_6H_5COOH$) is dissolved in benzene, it undergoes complete dimerization due to intermolecular hydrogen bonding. What is the value of the van 't Hoff factor ($i$) for this solution?",
        [
            "$0.5$",
            "$1.0$",
            "$2.0$",
            "$0.25$"
        ],
        "A",
        "Dimerization reaction: $2C_6H_5COOH \\rightleftharpoons (C_6H_5COOH)_2$. For complete association of pairs of molecules into single dimer units, 2 moles become 1 mole. Hence $i = 1/2 = 0.5$."
    )

    add(ch, "Degree of Dissociation from van 't Hoff Factor",
        "A $0.1\\text{ M}$ aqueous solution of an electrolyte $AB_2$ exhibits a van 't Hoff factor of $i = 2.60$. What is the percentage degree of dissociation ($\\alpha$) of this electrolyte?",
        [
            "$80\\%$",
            "$60\\%$",
            "$40\\%$",
            "$90\\%$"
        ],
        "A",
        "For $AB_2 \\to A^{2+} + 2B^-$, the number of ions per formula unit is $n = 3$.\nThe formula relating degree of dissociation to $i$ is:\n$\\alpha = \\frac{i - 1}{n - 1} = \\frac{2.60 - 1}{3 - 1} = \\frac{1.60}{2} = 0.80 = 80\\%$."
    )

    add(ch, "Degree of Association from van 't Hoff Factor",
        "Acetic acid undergoes dimerization in benzene according to $2CH_3COOH \\rightleftharpoons (CH_3COOH)_2$. If the observed van 't Hoff factor is $i = 0.60$, what is the degree of association ($\\alpha$)?",
        [
            "$0.80$ (or $80\\%$)",
            "$0.40$ (or $40\\%$)",
            "$0.60$ (or $60\\%$)",
            "$0.20$ (or $20\\%$)"
        ],
        "A",
        "For association with $n = 2$:\n$\\alpha = \\frac{1 - i}{1 - 1/n} = \\frac{1 - 0.60}{1 - 1/2} = \\frac{0.40}{0.50} = 0.80 = 80\\%$."
    )

    add(ch, "Colligative Properties Comparative Boiling Points",
        "Which of the following $0.10\\text{ M}$ aqueous solutions will exhibit the HIGHEST boiling point at $1\\text{ atm}$ atmospheric pressure?",
        [
            "$0.10\\text{ M } FeCl_3$",
            "$0.10\\text{ M } BaCl_2$",
            "$0.10\\text{ M } NaCl$",
            "$0.10\\text{ M } Glucose$"
        ],
        "A",
        "Elevation in boiling point is $\\Delta T_b = i K_b m$. Assuming complete dissociation:\nGlucose: $i = 1 \\implies i \\cdot m = 0.10$\n$NaCl$: $i = 2 \\implies i \\cdot m = 0.20$\n$BaCl_2$: $i = 3 \\implies i \\cdot m = 0.30$\n$FeCl_3$: $i = 4 \\implies i \\cdot m = 0.40$\n$FeCl_3$ produces the greatest effective particle concentration and therefore the highest boiling point."
    )

    add(ch, "Colligative Properties Comparative Freezing Points",
        "Which of the following $0.05\\text{ M}$ aqueous solutions will exhibit the LOWEST freezing point?",
        [
            "$0.05\\text{ M } Al_2(SO_4)_3$",
            "$0.05\\text{ M } K_2SO_4$",
            "$0.05\\text{ M } KCl$",
            "$0.05\\text{ M } Urea$"
        ],
        "A",
        "Freezing point depression is $\\Delta T_f = i K_f m$, and Freezing Point = $0^\\circ\\text{C} - \\Delta T_f$. The lowest freezing point corresponds to the greatest depression $\\Delta T_f$ (largest $i \\cdot m$ product).\n$Al_2(SO_4)_3$ has $i = 5$, giving $i \\cdot m = 5 \\times 0.05 = 0.25$, which is higher than $K_2SO_4$ ($i=3, 0.15$), $KCl$ ($i=2, 0.10$), and urea ($i=1, 0.05$)."
    )

    add(ch, "Isotonic Solutions Equimolar Osmotic Balance",
        "A $5\\%$ (m/V) solution of cane sugar (sucrose, molar mass $= 342\\text{ g/mol}$) is isotonic with a $0.877\\%$ (m/V) solution of an unknown organic substance X. What is the molar mass of X?",
        [
            "$60\\text{ g/mol}$",
            "$180\\text{ g/mol}$",
            "$120\\text{ g/mol}$",
            "$90\\text{ g/mol}$"
        ],
        "A",
        "Isotonic solutions have equal molar concentrations: $C_1 = C_2$.\n$\\frac{w_1}{M_1 V_1} = \\frac{w_2}{M_2 V_2} \\implies \\frac{5\\text{ g}}{342} = \\frac{0.877\\text{ g}}{M_2} \\implies M_2 = \\frac{0.877 \\times 342}{5} = \\frac{299.9}{5} \\approx 60\\text{ g/mol}$ (corresponding to urea)."
    )

    # 41-55: Advanced Colligative & Solution Properties
    add(ch, "Ebullioscopic Constant Thermodynamic Formula",
        "The molal elevation constant $K_b$ of a solvent is related to its enthalpy of vaporization $\\Delta_{\\text{vap}}H$ and normal boiling point $T_b$ by the expression:",
        [
            "$K_b = \\frac{R M_1 T_b^2}{1000 \\Delta_{\\text{vap}}H}$",
            "$K_b = \\frac{1000 R T_b}{M_1 \\Delta_{\\text{vap}}H}$",
            "$K_b = \\frac{\\Delta_{\\text{vap}}H}{1000 R M_1 T_b^2}$",
            "$K_b = \\frac{R M_1 \\Delta_{\\text{vap}}H}{1000 T_b^2}$"
        ],
        "A",
        "Thermodynamically, $K_b$ is derived from the Clapeyron-Clausius equation as $K_b = \\frac{R M_1 T_b^2}{1000 \\Delta_{\\text{vap}}H}$, where $M_1$ is the molar mass of the solvent."
    )

    add(ch, "Cryoscopic Constant Enthalpy of Fusion Relation",
        "For water ($M_1 = 18\\text{ g/mol}$), the cryoscopic constant $K_f = 1.86\\text{ K kg mol}^{-1}$. If a solvent has a higher enthalpy of fusion $\\Delta_{\\text{fus}}H$ while having similar molar mass and freezing point, its $K_f$ will be:",
        [
            "Smaller, because $K_f$ is inversely proportional to $\\Delta_{\\text{fus}}H$",
            "Larger, because $K_f$ is directly proportional to $\\Delta_{\\text{fus}}H$",
            "Unchanged, because $K_f$ depends solely on the universal gas constant",
            "Zero, because high enthalpy of fusion prevents freezing point depression"
        ],
        "A",
        "From $K_f = \\frac{R M_1 T_f^2}{1000 \\Delta_{\\text{fus}}H}$, $K_f$ is inversely proportional to the molar enthalpy of fusion $\\Delta_{\\text{fus}}H$ of the solvent."
    )

    add(ch, "Solute Molar Mass from Relative Lowering of Vapor Pressure",
        "The vapor pressure of pure water at $298\\text{ K}$ is $23.8\\text{ mm Hg}$. What is the vapor pressure of an aqueous solution containing $30\\text{ g}$ of urea ($NH_2CONH_2$, molar mass $= 60\\text{ g/mol}$) dissolved in $900\\text{ g}$ of water?",
        [
            "$23.56\\text{ mm Hg}$",
            "$22.61\\text{ mm Hg}$",
            "$24.04\\text{ mm Hg}$",
            "$21.42\\text{ mm Hg}$"
        ],
        "A",
        "Moles of urea $n_2 = \\frac{30}{60} = 0.5\\text{ mol}$.\nMoles of water $n_1 = \\frac{900}{18} = 50\\text{ mol}$.\nMole fraction of solvent $x_1 = \\frac{50}{50 + 0.5} = \\frac{50}{50.5} \\approx 0.9901$.\n$p_1 = x_1 p_1^\\circ = (0.9901)(23.8) \\approx 23.56\\text{ mm Hg}$."
    )

    add(ch, "Freezing Point Depression Electrolyte Dissociation Calculation",
        "What is the freezing point of a $0.01\\text{ m}$ aqueous solution of $CaCl_2$, assuming complete electrolytic ionization? ($K_f$ for water $= 1.86\\text{ K kg mol}^{-1}$)",
        [
            "$-0.0558^\\circ\\text{C}$",
            "$-0.0186^\\circ\\text{C}$",
            "$-0.0372^\\circ\\text{C}$",
            "$+0.0558^\\circ\\text{C}$"
        ],
        "A",
        "$CaCl_2 \\to Ca^{2+} + 2Cl^- \\implies i = 3$.\n$\\Delta T_f = i K_f m = 3 \\times 1.86 \\times 0.01 = 0.0558^\\circ\\text{C}$.\n$T_f = 0 - 0.0558 = -0.0558^\\circ\\text{C}$."
    )

    add(ch, "Colligative Properties Physical Basis",
        "Colligative properties of dilute solutions depend strictly on:",
        [
            "The total number of solute particles relative to solvent molecules, regardless of their chemical identity or nature",
            "The chemical structure and reactivity of the dissolved solute molecules",
            "The surface tension and viscosity of the solvent liquid",
            "The dielectric constant and polarity of the solvent molecules"
        ],
        "A",
        "By definition, colligative properties (relative lowering of vapor pressure, boiling point elevation, freezing point depression, osmotic pressure) depend solely on the ratio of the number of solute particles to the total number of particles in solution, independent of their chemical identity."
    )

    add(ch, "Semipermeable Membrane Definition",
        "A semipermeable membrane (SPM) is a thin barrier that:",
        [
            "Allows the passage of small solvent molecules while blocking larger solute particles",
            "Allows the passage of solute molecules while completely blocking solvent molecules",
            "Permits equal passage of both solute and solvent particles under all conditions",
            "Selectively neutralizes ionic charges of dissolved salts"
        ],
        "A",
        "A semipermeable membrane contains submicroscopic pores that allow small solvent molecules (such as water) to pass through freely while preventing the migration of larger solute ions or molecules."
    )

    add(ch, "Equimolar Aqueous Solution Freezing Order",
        "Arrange the following $0.1\\text{ M}$ aqueous solutions in order of INCREASING freezing point (lowest freezing point first):\n(I) $0.1\\text{ M } Al_2(SO_4)_3$\n(II) $0.1\\text{ M } BaCl_2$\n(III) $0.1\\text{ M } NaCl$\n(IV) $0.1\\text{ M } Urea$",
        [
            "(I) < (II) < (III) < (IV)",
            "(IV) < (III) < (II) < (I)",
            "(I) < (III) < (II) < (IV)",
            "(II) < (I) < (III) < (IV)"
        ],
        "A",
        "Freezing point depression is $\\Delta T_f = i K_f m$. The larger the value of $i$, the larger the depression $\\Delta T_f$, and hence the LOWER the actual freezing point ($T_f = 0 - \\Delta T_f$).\n$i(Al_2(SO_4)_3) = 5 \\implies$ lowest $T_f$.\n$i(BaCl_2) = 3$.\n$i(NaCl) = 2$.\n$i(\\text{Urea}) = 1 \\implies$ highest $T_f$.\nTherefore, order of increasing freezing point is (I) < (II) < (III) < (IV)."
    )

    add(ch, "Raoult's Law as a Special Case of Henry's Law",
        "Raoult's law can be considered a special limiting case of Henry's law in which:",
        [
            "Henry's law constant $K_H$ becomes equal to the vapor pressure of the pure solvent $p_1^\\circ$",
            "Henry's law constant $K_H$ drops to zero",
            "The mole fraction of the solute equals unity",
            "The atmospheric pressure equals the standard boiling pressure"
        ],
        "A",
        "Henry's law states $p = K_H x$. Raoult's law states $p_1 = x_1 p_1^\\circ$. If we compare both relations, when the proportionality constant $K_H$ equals the saturation vapor pressure of the pure component $p_1^\\circ$, Henry's law becomes Raoult's law."
    )

    add(ch, "Vapor Pressure of Solid-Liquid Solutions",
        "When a non-volatile solid solute is dissolved in a pure liquid solvent, the vapor pressure of the solvent decreases because:",
        [
            "Solute particles occupy a portion of the surface area, decreasing the fraction of surface occupied by volatile solvent molecules",
            "Solute particles accelerate the rate of condensation from the vapor phase",
            "The kinetic energy of the solvent molecules is converted into ionic bonding energy",
            "The non-volatile solute molecules evaporate preferentially"
        ],
        "A",
        "In a pure liquid, the entire liquid surface is occupied by volatile solvent molecules. When a non-volatile solute is added, solute particles occupy part of the surface layer. As a result, the fraction of surface area available for solvent evaporation decreases, lowering the equilibrium vapor pressure."
    )

    add(ch, "Molal Depression Constant for Camphor",
        "Camphor is often employed as a solvent for Rast's molecular weight determination method because:",
        [
            "It has an exceptionally large cryoscopic constant ($K_f \\approx 40\\text{ K kg mol}^{-1}$), causing very large, easily measurable freezing point depressions",
            "It boils without decomposition at room temperature",
            "It forms an ideal solution with all inorganic salts",
            "It acts as a strong electrolyte upon fusion"
        ],
        "A",
        "Camphor has an unusually high cryoscopic constant ($K_f \\approx 39.7-40\\text{ K kg mol}^{-1}$). Even small quantities of dissolved solute produce large freezing point depressions ($5-20^\\circ\\text{C}$), which can be measured accurately with an ordinary laboratory thermometer."
    )

    # 51-65: Additional Specific Solutions Topics
    add(ch, "Aqueous Solution Boiling Elevation Urea Comparison",
        "If a $0.50\\text{ molal}$ aqueous solution of urea boils at $100.26^\\circ\\text{C}$ at $1\\text{ atm}$, at what temperature will a $0.50\\text{ molal}$ aqueous solution of potassium nitrate ($KNO_3$, assuming complete dissociation) boil?",
        [
            "$100.52^\\circ\\text{C}$",
            "$100.26^\\circ\\text{C}$",
            "$100.78^\\circ\\text{C}$",
            "$101.04^\\circ\\text{C}$"
        ],
        "A",
        "Urea is a non-electrolyte ($i = 1$), giving $\\Delta T_b = 100.26 - 100.00 = 0.26^\\circ\\text{C}$.\nFor $KNO_3 \\to K^+ + NO_3^-$, $i = 2$.\n$\\Delta T_b(KNO_3) = i \\times \\Delta T_b(\\text{urea}) = 2 \\times 0.26 = 0.52^\\circ\\text{C}$.\nBoiling point = $100.00 + 0.52 = 100.52^\\circ\\text{C}$."
    )

    add(ch, "Osmotic Pressure Glucose vs Urea",
        "At $298\\text{ K}$, an aqueous solution containing $1.8\\text{ g}$ of glucose in $100\\text{ mL}$ of water has an osmotic pressure $\\Pi_1$. An aqueous solution containing $0.6\\text{ g}$ of urea in $100\\text{ mL}$ of water at the same temperature has an osmotic pressure $\\Pi_2$. The relationship between $\\Pi_1$ and $\\Pi_2$ is:",
        [
            "$\\Pi_1 = \\Pi_2$",
            "$\\Pi_1 = 3 \\Pi_2$",
            "$\\Pi_2 = 3 \\Pi_1$",
            "$\\Pi_1 = 2 \\Pi_2$"
        ],
        "A",
        "Moles of glucose = $\\frac{1.8}{180} = 0.01\\text{ mol}$ in $100\\text{ mL} \\implies C_1 = 0.1\\text{ M}$.\nMoles of urea = $\\frac{0.6}{60} = 0.01\\text{ mol}$ in $100\\text{ mL} \\implies C_2 = 0.1\\text{ M}$.\nSince both solutions have identical molarity ($0.1\\text{ M}$) and neither associates or dissociates ($i = 1$), their osmotic pressures are equal: $\\Pi_1 = \\Pi_2$."
    )

    add(ch, "Solvent Enthalpy of Mixing Ideal Solution",
        "When $100\\text{ mL}$ of liquid benzene is mixed with $100\\text{ mL}$ of liquid toluene at $25^\\circ\\text{C}$, the final volume of the mixture and temperature change are:",
        [
            "Total volume $= 200\\text{ mL}$, and $\\Delta T = 0$ (no temperature change)",
            "Total volume $> 200\\text{ mL}$, and temperature increases",
            "Total volume $< 200\\text{ mL}$, and temperature decreases",
            "Total volume $= 200\\text{ mL}$, and temperature decreases significantly"
        ],
        "A",
        "Benzene and toluene form an ideal solution where $\\Delta V_{\\text{mix}} = 0$ and $\\Delta H_{\\text{mix}} = 0$. Hence, volume is additive ($100 + 100 = 200\\text{ mL}$) and no heat is absorbed or released ($\\Delta T = 0$)."
    )

    add(ch, "Negative Deviation Enthalpy and Volume Effects",
        "When chloroform is mixed with acetone, which of the following observations is correct?",
        [
            "The solution becomes warm ($\\Delta H_{\\text{mix}} < 0$) and the total volume is less than the sum of individual volumes ($\\Delta V_{\\text{mix}} < 0$)",
            "The solution cools down ($\\Delta H_{\\text{mix}} > 0$) and the total volume expands ($\\Delta V_{\\text{mix}} > 0$)",
            "No heat is exchanged ($\\Delta H_{\\text{mix}} = 0$) and total volume is exactly conserved",
            "Vapor pressure increases above the Raoult's law prediction"
        ],
        "A",
        "Formation of intermolecular hydrogen bonds between chloroform and acetone releases energy (exothermic, $\\Delta H_{\\text{mix}} < 0$, warming the mixture) and pulls molecules closer together, contracting the volume ($\\Delta V_{\\text{mix}} < 0$)."
    )

    add(ch, "Mole Fraction of Solvent from Relative Lowering",
        "If the relative lowering of vapor pressure of a dilute aqueous solution containing a non-volatile solute is $0.02$, what is the mole fraction of the solvent in the solution?",
        [
            "$0.98$",
            "$0.02$",
            "$0.50$",
            "$0.96$"
        ],
        "A",
        "By Raoult's law: $\\frac{p_1^\\circ - p_1}{p_1^\\circ} = x_2 = 0.02$.\nSince $x_1 + x_2 = 1$, the mole fraction of the solvent is $x_1 = 1 - 0.02 = 0.98$."
    )

    add(ch, "van 't Hoff Factor Barium Hydroxide",
        "What is the theoretical van 't Hoff factor ($i$) for a dilute aqueous solution of barium hydroxide, $Ba(OH)_2$, assuming complete dissociation?",
        [
            "$3$",
            "$2$",
            "$1$",
            "$4$"
        ],
        "A",
        "$Ba(OH)_2$ completely dissociates in water into one barium cation and two hydroxide anions: $Ba(OH)_2 \\to Ba^{2+} + 2OH^-$. Thus, $n = 1 + 2 = 3$, giving $i = 3$."
    )

    add(ch, "Osmotic Pressure Temperature Dependence",
        "If the absolute temperature of an ideal dilute solution is doubled while keeping its volume constant, its osmotic pressure will:",
        [
            "Double",
            "Halve",
            "Quadruple",
            "Remain unchanged"
        ],
        "A",
        "According to the van 't Hoff equation $\\Pi = C R T$, osmotic pressure is directly proportional to absolute temperature $T$ at constant concentration $C$. Doubling $T$ doubles $\\Pi$."
    )

    add(ch, "Molarity Calculation Sodium Chloride Solution",
        "What is the molarity of a solution prepared by dissolving $5.85\\text{ g}$ of $NaCl$ (molar mass $= 58.5\\text{ g/mol}$) in distilled water to make exactly $250\\text{ mL}$ of solution?",
        [
            "$0.40\\text{ M}$",
            "$0.20\\text{ M}$",
            "$0.10\\text{ M}$",
            "$1.00\\text{ M}$"
        ],
        "A",
        "Moles of $NaCl = \\frac{5.85\\text{ g}}{58.5\\text{ g/mol}} = 0.10\\text{ mol}$.\nVolume of solution $= 250\\text{ mL} = 0.250\\text{ L}$.\nMolarity $M = \\frac{0.10\\text{ mol}}{0.250\\text{ L}} = 0.40\\text{ M}$."
    )

    add(ch, "Molality of Pure Water",
        "What is the molality of pure liquid water at standard ambient temperature? (Density of water $= 1.0\\text{ g/mL}$, molar mass of water $= 18.0\\text{ g/mol}$)",
        [
            "$55.55\\text{ mol/kg}$",
            "$18.00\\text{ mol/kg}$",
            "$1.00\\text{ mol/kg}$",
            "$100.0\\text{ mol/kg}$"
        ],
        "A",
        "Consider $1000\\text{ g}$ ($1\\text{ kg}$) of water.\nMoles of water in $1\\text{ kg} = \\frac{1000\\text{ g}}{18.02\\text{ g/mol}} \\approx 55.55\\text{ mol}$.\nMolality $m = \\frac{55.55\\text{ mol}}{1\\text{ kg}} = 55.55\\text{ mol/kg}$."
    )

    add(ch, "Minimum Boiling Azeotrope Example",
        "A solution of ethanol and water containing $95.6\\%$ ethanol by mass forms a minimum boiling azeotrope that boils at $351.15\\text{ K}$. It cannot be separated further into pure ethanol by fractional distillation because:",
        [
            "The liquid and vapor phases have identical compositions at the azeotropic boiling point",
            "Ethanol decomposes chemically at this boiling point",
            "Water and ethanol become completely immiscible at this temperature",
            "The vapor pressure drops to zero at the azeotropic point"
        ],
        "A",
        "At the azeotropic composition, the composition of the vapor phase is identical to the composition of the liquid phase ($x_i = y_i$). Therefore, boiling produces vapor of the exact same composition, making separation by simple or fractional distillation impossible."
    )

    add(ch, "Colligative Property Determination of Association Extent",
        "When an organic acid $RCOOH$ dissolves in a non-polar solvent and partially associates into dimers, the experimentally observed molar mass is:",
        [
            "Higher than the theoretical normal molar mass",
            "Lower than the theoretical normal molar mass",
            "Identical to the theoretical normal molar mass",
            "Zero"
        ],
        "A",
        "Dimerization decreases the total number of solute particles in solution. Colligative properties (which are proportional to particle number) decrease. Since molar mass is inversely proportional to colligative properties ($M \\propto 1/\\Delta T$), the observed molar mass is higher than the normal monomer mass."
    )

    add(ch, "Osmosis Direction and Equilibrium",
        "During natural osmosis through a semipermeable membrane separating pure water from an aqueous sucrose solution, solvent flow continues until:",
        [
            "The hydrostatic pressure of the solution column equals the osmotic pressure of the solution",
            "All water molecules from the pure water side evaporate",
            "The concentration of sucrose becomes zero on the solution side",
            "Sucrose molecules diffuse completely into the pure water reservoir"
        ],
        "A",
        "Natural osmosis proceeds until the excess hydrostatic pressure developed on the solution side builds up to a level equal to the osmotic pressure $\\Pi$, establishing thermodynamic equilibrium where the net flow of water across the membrane becomes zero."
    )

    add(ch, "Azeotrope Definition in NCERT",
        "Azeotropes are formally defined as:",
        [
            "Binary liquid mixtures having identical composition in both liquid and vapor phases and boiling at a constant temperature",
            "Mixtures of solids that melt at a single sharp eutectic temperature",
            "Colloidal dispersions that exhibit Brownian motion and Tyndall effect",
            "Saturated solutions in dynamic equilibrium with undissolved solute crystals"
        ],
        "A",
        "An azeotrope is a constant-boiling binary liquid mixture whose vapor phase has the same chemical composition as its liquid phase, so it boils at a constant temperature without any change in composition."
    )

    add(ch, "Boiling Point Elevation Constant from Latent Heat",
        "If the latent heat of vaporization of water is $l_v = 540\\text{ cal/g}$ ($2260\\text{ J/g}$) and its boiling point is $373.15\\text{ K}$, what is the value of $K_b$ for water? ($R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
        [
            "$0.52\\text{ K kg mol}^{-1}$",
            "$1.86\\text{ K kg mol}^{-1}$",
            "$0.052\\text{ K kg mol}^{-1}$",
            "$5.12\\text{ K kg mol}^{-1}$"
        ],
        "A",
        "Using $K_b = \\frac{R M_1 T_b^2}{1000 \\Delta_{\\text{vap}}H} = \\frac{R T_b^2}{1000 l_v} = \\frac{8.314 \\times (373.15)^2}{1000 \\times 2260} \\approx 0.512 \\approx 0.52\\text{ K kg mol}^{-1}$."
    )

    add(ch, "Total Vapor Pressure Calculation from Mole Fractions",
        "Two volatile liquids X (vapor pressure $p_X^\\circ = 100\\text{ mm Hg}$) and Y (vapor pressure $p_Y^\\circ = 200\\text{ mm Hg}$) form an ideal solution. What is the mole fraction of X in the liquid solution if the total equilibrium vapor pressure above the solution is $140\\text{ mm Hg}$?",
        [
            "$0.60$",
            "$0.40$",
            "$0.50$",
            "$0.30$"
        ],
        "A",
        "$P_{\\text{total}} = x_X p_X^\\circ + (1 - x_X) p_Y^\\circ$.\n$140 = 100 x_X + 200(1 - x_X) = 200 - 100 x_X$.\n$100 x_X = 60 \\implies x_X = 0.60$."
    )

    return qs
