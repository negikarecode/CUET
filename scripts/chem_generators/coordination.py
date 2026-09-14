from scripts.chem_generators.common import make_question, normalize_text

def get_coordination_questions(seen):
    qs = []
    
    def add(ch, top, text, opts, ans, sol):
        norm = normalize_text(text)
        assert norm not in seen, f"Duplicate detected in coordination: {text[:50]}"
        seen.add(norm)
        qs.append(make_question(ch, top, text, opts, ans, sol))

    ch = "Coordination Compounds"

    # 1-6: Werner's Theory of Coordination Compounds
    add(ch, "Primary vs Secondary Valencies in Werner's Theory",
        "According to Alfred Werner's coordination theory, which statement correctly distinguishes between primary and secondary valencies of a central metal atom?",
        [
            "Primary valency is ionizable, non-directional, and corresponds to oxidation state; secondary valency is non-ionizable, directional, and corresponds to coordination number",
            "Primary valency is non-ionizable and directional; secondary valency is ionizable and non-directional",
            "Both primary and secondary valencies are ionizable and satisfied exclusively by neutral molecules",
            "Primary valency determines the spatial geometry while secondary valency determines the charge of the complex"
        ],
        "A",
        "In Werner's theory: (1) Primary valency corresponds to the oxidation state of the metal; it is ionizable, non-directional, and satisfied by negative ions. (2) Secondary valency corresponds to the coordination number; it is non-ionizable, directional in space (governing stereochemistry), and satisfied by neutral molecules or negative ions."
    )

    add(ch, "Werner Formulation and Silver Chloride Precipitation of CoCl3.6NH3",
        "When one mole of cobalt chloride-ammonia complex $CoCl_3 \\cdot 6NH_3$ reacts with excess aqueous silver nitrate ($AgNO_3$), three moles of silver chloride ($AgCl$) precipitate immediately. What is the correct coordination formula of this compound?",
        [
            "$[Co(NH_3)_6]Cl_3$",
            "$[Co(NH_3)_5Cl]Cl_2 \\cdot NH_3$",
            "$[Co(NH_3)_4Cl_2]Cl \\cdot 2NH_3$",
            "$[Co(NH_3)_3Cl_3] \\cdot 3NH_3$"
        ],
        "A",
        "Because 3 moles of $AgCl$ precipitate per mole of the complex, all three chloride ions reside outside the coordination sphere as ionizable counter-ions. The six ammonia molecules satisfy the secondary valency of 6 inside the coordination sphere. Hence, the formula is $[Co(NH_3)_6]Cl_3$."
    )

    add(ch, "Werner Formulation of CoCl3.5NH3",
        "One mole of $CoCl_3 \\cdot 5NH_3$ reacts with excess silver nitrate to precipitate two moles of $AgCl$. What is the coordination formula, coordination number of cobalt, and number of ions produced per formula unit?",
        [
            "Formula: $[Co(NH_3)_5Cl]Cl_2$; Coordination number: $6$; Ions produced: $3$",
            "Formula: $[Co(NH_3)_5]Cl_3$; Coordination number: $5$; Ions produced: $4$",
            "Formula: $[Co(NH_3)_4Cl_2]Cl$; Coordination number: $6$; Ions produced: $2$",
            "Formula: $[Co(NH_3)_5Cl_2]Cl$; Coordination number: $7$; Ions produced: $2$"
        ],
        "A",
        "Since 2 moles of $AgCl$ are precipitated per mole of complex, two chloride ions are in the ionization sphere (outer sphere) while one chloride ion and five ammonia molecules are coordinated to cobalt in the inner coordination sphere: $[Co(NH_3)_5Cl]Cl_2 \\to [Co(NH_3)_5Cl]^{2+} + 2Cl^-$. The coordination number of cobalt is 6, and it produces a total of 3 ions (1 complex cation and 2 chloride anions) in solution."
    )

    add(ch, "Werner Formulation and Silver Nitrate Reaction of CoCl3.4NH3",
        "How many moles of $AgCl$ precipitate when one mole of $CoCl_3 \\cdot 4NH_3$ (which exists as green and violet isomers) is treated with excess aqueous silver nitrate solution?",
        [
            "$1\\text{ mole of } AgCl$",
            "$2\\text{ moles of } AgCl$",
            "$3\\text{ moles of } AgCl$",
            "$0\\text{ moles of } AgCl$"
        ],
        "A",
        "The complex $CoCl_3 \\cdot 4NH_3$ is formulated as $[Co(NH_3)_4Cl_2]Cl$. Two chloride ions and four ammonia molecules satisfy the secondary valency of 6 inside the coordination sphere. Only the single chloride ion in the ionization sphere is precipitated as $AgCl$ upon addition of $AgNO_3$."
    )

    add(ch, "Electrolytic Conductivity Order of Cobalt Ammine Complexes",
        "Which of the following represents the correct decreasing order of electrical conductivity in $0.01\\text{ M}$ aqueous solutions of cobalt(III) ammine complexes?",
        [
            "$[Co(NH_3)_6]Cl_3 > [Co(NH_3)_5Cl]Cl_2 > [Co(NH_3)_4Cl_2]Cl > [Co(NH_3)_3Cl_3]$",
            "$[Co(NH_3)_3Cl_3] > [Co(NH_3)_4Cl_2]Cl > [Co(NH_3)_5Cl]Cl_2 > [Co(NH_3)_6]Cl_3$",
            "$[Co(NH_3)_5Cl]Cl_2 > [Co(NH_3)_6]Cl_3 > [Co(NH_3)_4Cl_2]Cl > [Co(NH_3)_3Cl_3]$",
            "$[Co(NH_3)_4Cl_2]Cl > [Co(NH_3)_5Cl]Cl_2 > [Co(NH_3)_6]Cl_3 > [Co(NH_3)_3Cl_3]$"
        ],
        "A",
        "Electrical conductivity of an electrolyte depends on the number of ions produced per formula unit in solution. $[Co(NH_3)_6]Cl_3$ produces 4 ions (1:3 electrolyte), $[Co(NH_3)_5Cl]Cl_2$ produces 3 ions (1:2 electrolyte), $[Co(NH_3)_4Cl_2]Cl$ produces 2 ions (1:1 electrolyte), and $[Co(NH_3)_3Cl_3]$ is a non-electrolyte producing zero ions."
    )

    add(ch, "Directional Character of Secondary Valency",
        "How did Alfred Werner explain the definite three-dimensional geometries (such as octahedral, tetrahedral, and square planar) of coordination compounds?",
        [
            "Secondary valencies are directed toward fixed positions in space around the central metal atom",
            "Primary valencies oscillate symmetrically between ligands",
            "The ionic cloud of counter-ions exerts electrostatic repulsion forcing geometry",
            "Solvent molecules compress the coordination sphere into symmetric shapes"
        ],
        "A",
        "Werner postulated that secondary valencies have spatial orientations directed towards fixed positions in space around the central atom, which determines the stereochemistry (e.g., 6 secondary valencies point towards vertices of a regular octahedron, 4 point towards corners of a tetrahedron or square planar corners)."
    )

    # 7-13: Ligands, Denticity & Chelation
    add(ch, "Definition and Examples of Monodentate Ligands",
        "What is a monodentate (unidentate) ligand, and which of the following is an example of a neutral monodentate ligand?",
        [
            "A ligand that coordinates to the metal ion through a single donor atom; example: $H_2O$",
            "A ligand that coordinates through two donor atoms simultaneously; example: $en$",
            "A ligand that donates four electron pairs simultaneously; example: $EDTA^{4-}$",
            "A ligand that cannot bind to metal ions in aqueous solution; example: $CH_4$"
        ],
        "A",
        "A monodentate (or unidentate) ligand binds to the central metal ion through only one donor atom at a time. Water ($H_2O$, aqua) coordinates through its single oxygen atom (donating one lone pair), and ammonia ($NH_3$, ammine) coordinates through nitrogen."
    )

    add(ch, "Bidentate Ligands: Oxalate and Ethylenediamine",
        "Which pair represents typical symmetrical bidentate (didentate) ligands, one being anionic and the other neutral?",
        [
            "Oxalate ion ($ox^{2-}$ or $C_2O_4^{2-}$) and ethane-1,2-diamine ($en$ or $H_2NCH_2CH_2NH_2$)",
            "Chloride ($Cl^-$) and water ($H_2O$)",
            "Cyanide ($CN^-$) and carbon monoxide ($CO$)",
            "Nitrite ($NO_2^-$) and pyridine ($py$)"
        ],
        "A",
        "Oxalate ($C_2O_4^{2-}$) coordinates via two negative oxygen atoms, acting as a dianionic bidentate ligand. Ethane-1,2-diamine ($en$) coordinates via two neutral nitrogen atoms, acting as a neutral bidentate ligand."
    )

    add(ch, "Denticity and Donor Atoms of EDTA",
        "What is the denticity and donor atom composition of the ethylenediaminetetraacetate ion ($[EDTA]^{4-}$)?",
        [
            "Hexadentate ligand with two nitrogen and four oxygen donor atoms",
            "Tetradentate ligand with four nitrogen donor atoms",
            "Bidentate ligand with two oxygen donor atoms",
            "Octadentate ligand with four nitrogen and four oxygen donor atoms"
        ],
        "A",
        "The ethylenediaminetetraacetate ion ($[EDTA]^{4-}$) contains two tertiary amine nitrogen atoms and four carboxylate oxygen atoms ($COO^-$). It coordinates simultaneously through all six atoms, forming five chelate rings around a single metal cation as a hexadentate ligand."
    )

    add(ch, "Ambidentate Ligands and Linkage Modes",
        "Which of the following ligands is classified as an ambidentate ligand capable of coordinating through two different donor atoms?",
        [
            "Nitrito ($NO_2^-$) coordinating via nitrogen ($-NO_2$) or oxygen ($-ONO$)",
            "Water ($H_2O$) coordinating via hydrogen or oxygen",
            "Ammonia ($NH_3$) coordinating via nitrogen or hydrogen",
            "Carbonate ($CO_3^{2-}$) coordinating via carbon or oxygen"
        ],
        "A",
        "An ambidentate ligand possesses two different donor atoms but can coordinate through only one of them at a time to a given metal ion. For example, $NO_2^-$ can coordinate via N (nitro, $-NO_2$) or via O (nitrito, $-ONO$). Similarly, thiocyanate ($SCN^-$) can bind via S (thiocyanato) or via N (isothiocyanato)."
    )

    add(ch, "Chelate Effect and Thermodynamic Stability",
        "Why is the complex $[Ni(en)_3]^{2+}$ thermodynamically significantly more stable than $[Ni(NH_3)_6]^{2+}$, even though both contain six nickel-nitrogen coordinate bonds?",
        [
            "Chelate effect: displacement of monodentate ligands by polydentate chelating ligands increases the total number of particles, resulting in a large positive entropy change ($\\Delta S^\\circ > 0$)",
            "The $Ni-N$ bond length is half as long in $[Ni(en)_3]^{2+}$",
            "Ethylenediamine forms purely ionic bonds with nickel",
            "Enthalpy of hydration of $[Ni(NH_3)_6]^{2+}$ is positive"
        ],
        "A",
        "When a bidentate ligand like $en$ replaces two monodentate ligands like $NH_3$ ($[Ni(NH_3)_6]^{2+} + 3en \\rightleftharpoons [Ni(en)_3]^{2+} + 6NH_3$), the total number of free solute species increases from 4 to 7. This leads to a substantial increase in translational entropy ($\\Delta S^\\circ > 0$), making $\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ$ more negative. This enhanced stability is termed the Chelate Effect."
    )

    add(ch, "Coordination Sphere vs Ionization Sphere",
        "In the coordination compound $[Co(NH_3)_5(SO_4)]Br$, which species are part of the coordination sphere and which reside in the ionization sphere?",
        [
            "Coordination sphere: $[Co(NH_3)_5(SO_4)]^+$; Ionization sphere: $Br^-$",
            "Coordination sphere: $Br^-$; Ionization sphere: $[Co(NH_3)_5(SO_4)]^+$",
            "Coordination sphere: $[Co(NH_3)_5]^{3+}$; Ionization sphere: $SO_4^{2-}$ and $Br^-$",
            "Coordination sphere: $Co^{3+}$ and $Br^-$; Ionization sphere: $NH_3$ and $SO_4^{2-}$"
        ],
        "A",
        "The central atom and the ligands directly bonded to it enclosed inside square brackets ($[Co(NH_3)_5(SO_4)]^+$) constitute the non-ionizable coordination sphere. The counter-ion outside the brackets ($Br^-$) constitutes the ionizable outer sphere (ionization sphere)."
    )

    add(ch, "Coordination Number and Oxidation State Calculation",
        "What are the coordination number and oxidation state of chromium in the complex $[Cr(en)_2(ox)]^+$ (where $en$ is ethane-1,2-diamine and $ox$ is oxalate)?",
        [
            "Coordination number $= 6$; Oxidation state $= +3$",
            "Coordination number $= 3$; Oxidation state $= +3$",
            "Coordination number $= 4$; Oxidation state $= +1$",
            "Coordination number $= 6$; Oxidation state $= +2$"
        ],
        "A",
        "Both $en$ and $ox^{2-}$ are bidentate ligands. The coordination number is the total number of ligand donor atoms bonded to the central atom: $2 \\times 2 (\\text{from } en) + 1 \\times 2 (\\text{from } ox) = 4 + 2 = 6$. The charge of the complex is $+1$: $x + 2(0) + (-2) = +1 \\implies x - 2 = +1 \\implies x = +3$."
    )

    # 14-20: IUPAC Nomenclature of Coordination Compounds
    add(ch, "IUPAC Naming of Cationic Carbonato Complex",
        "What is the correct IUPAC name of the coordination compound $[Co(NH_3)_5(CO_3)]Cl$?",
        [
            "Pentaamminecarbonatocobalt(III) chloride",
            "Pentaamminecarbonatocobalt(II) chloride",
            "Pentaamminechloridocobalt(III) carbonate",
            "Carbonatopentamminecobaltate(III) chloride"
        ],
        "A",
        "Ligands are named alphabetically: 'ammine' before 'carbonato'. There are 5 ammines (pentaammine) and 1 carbonato group ($CO_3^{2-}$). Since the complex ion is cationic, the metal retains its standard name 'cobalt'. Cobalt's oxidation state: $x + 5(0) + (-2) + (-1) = 0 \\implies x = +3$. Counter-ion is chloride. Thus: pentaamminecarbonatocobalt(III) chloride."
    )

    add(ch, "IUPAC Naming of Anionic Cyano Complex",
        "What is the correct IUPAC name of the complex $K_3[Fe(CN)_6]$?",
        [
            "Potassium hexacyanidoferrate(III)",
            "Potassium hexacyanoiron(III)",
            "Tripotassium hexacyanoferrate(II)",
            "Potassium hexacyanidoiron(II)"
        ],
        "A",
        "The cation is named first: potassium. The complex ion $[Fe(CN)_6]^{3-}$ is anionic, so the metal name ends with suffix '-ate' using the Latin root: 'ferrate'. Cyanide ligand is named 'cyanido'. The oxidation state of iron is $3(+1) + x + 6(-1) = 0 \\implies x = +3$. Therefore: potassium hexacyanidoferrate(III)."
    )

    add(ch, "IUPAC Naming of Neutral Metal Carbonyl",
        "What is the systematic IUPAC name and oxidation state of nickel in $[Ni(CO)_4]$?",
        [
            "Tetracarbonylnickel(0); oxidation state $0$",
            "Tetracarbonylnickelate(II); oxidation state $+2$",
            "Tetracarbonylnickel(II); oxidation state $+2$",
            "Carbonylnickelate(0); oxidation state $0$"
        ],
        "A",
        "In $[Ni(CO)_4]$, the ligand is neutral carbon monoxide, named 'carbonyl'. There are 4 carbonyls, giving 'tetracarbonyl'. Because the complex is neutral, the metal name remains 'nickel'. The oxidation state of nickel is 0 ($x + 4(0) = 0$). Hence: tetracarbonylnickel(0)."
    )

    add(ch, "IUPAC Naming with Polydentate Ligand Using Bis/Tris",
        "What is the correct IUPAC name of the coordination compound $[Co(en)_3]_2(SO_4)_3$?",
        [
            "Tris(ethane-1,2-diamine)cobalt(III) sulphate",
            "Tri(ethylenediamine)cobalt(II) sulphate",
            "Hexa(ethane-1,2-diamine)dicobalt(III) trisulphate",
            "Tris(ethylenediamine)cobaltate(III) sulphate"
        ],
        "A",
        "When the name of a ligand already contains a numerical prefix (like ethane-1,2-diamine), prefixes 'bis', 'tris', 'tetrakis' are used. Here, 3 $en$ ligands give 'tris(ethane-1,2-diamine)'. The complex cation is cationic, so the metal is 'cobalt'. Cobalt oxidation state: $2x + 3(-2) = 0 \\implies x = +3$. Counter-ion is sulphate. Thus: tris(ethane-1,2-diamine)cobalt(III) sulphate."
    )

    add(ch, "IUPAC Naming of Ambidentate Nitrito-O Complex",
        "What is the IUPAC name of the red linkage isomer $[Co(NH_3)_5(ONO)]Cl_2$?",
        [
            "Pentaamminenitrito-O-cobalt(III) chloride",
            "Pentaamminenitrocobalt(III) chloride",
            "Pentaamminenitrito-N-cobalt(II) chloride",
            "Pentaamminenitrito-O-cobaltate(III) chloride"
        ],
        "A",
        "The ligand $-ONO$ coordinates via oxygen and is named 'nitrito-O' (or simply nitrito). Cationic complex retains metal name 'cobalt'. Oxidation state: $x + 5(0) + (-1) + 2(-1) = 0 \\implies x = +3$. Counter anion is chloride. Hence: pentaamminenitrito-O-cobalt(III) chloride."
    )

    add(ch, "IUPAC Naming of Binuclear Complex with Complex Cation and Anion",
        "What is the correct IUPAC name for the coordination compound $[Cr(NH_3)_6][Co(CN)_6]$?",
        [
            "Hexaamminechromium(III) hexacyanidocobaltate(III)",
            "Hexaamminechromium(II) hexacyanidocobaltate(IV)",
            "Hexacyanidocobalt(III) hexaamminechromate(III)",
            "Hexaamminechromate(III) hexacyanidocobalt(III)"
        ],
        "A",
        "The cationic complex $[Cr(NH_3)_6]^{3+}$ is named first: hexaamminechromium(III). The anionic complex $[Co(CN)_6]^{3-}$ is named second with '-ate': hexacyanidocobaltate(III). Both metals are in $+3$ oxidation state."
    )

    add(ch, "Formulating Chemical Formula from IUPAC Name",
        "What is the correct chemical formula corresponding to the IUPAC name: potassium tetrahydroxidozincate(II)?",
        [
            "$K_2[Zn(OH)_4]$",
            "$K[Zn(OH)_4]$",
            "$K_4[Zn(OH)_2]$",
            "$K_2[Zn(OH)_6]$"
        ],
        "A",
        "The complex anion tetrahydroxidozincate(II) consists of $Zn^{2+}$ coordinated to four hydroxide ($OH^-$) ions: $[Zn(OH)_4]^{2-}$. To balance the $-2$ charge, two potassium cations ($K^+$) are required: $K_2[Zn(OH)_4]$."
    )

    # 21-26: Structural Isomerism
    add(ch, "Ionization Isomerism in Cobalt Complexes",
        "The pair of coordination compounds $[Co(NH_3)_5(SO_4)]Br$ (red) and $[Co(NH_3)_5Br]SO_4$ (red-violet) are examples of which type of isomerism, and how can they be chemically distinguished?",
        [
            "Ionization isomerism; the first gives a pale cream precipitate with $AgNO_3$, while the second gives a white precipitate with $BaCl_2$",
            "Linkage isomerism; the first gives a white precipitate with $AgNO_3$, while the second gives no precipitate",
            "Coordination isomerism; distinguished by boiling point determination",
            "Hydrate isomerism; distinguished by dehydration over concentrated $H_2SO_4$"
        ],
        "A",
        "Ionization isomerism arises when counter-ions in the ionization sphere displace ligands in the coordination sphere. $[Co(NH_3)_5(SO_4)]Br$ ionizes to yield free $Br^-$, giving a pale yellow/cream precipitate of $AgBr$ with $AgNO_3$ (and no ppt with $BaCl_2$). $[Co(NH_3)_5Br]SO_4$ yields free $SO_4^{2-}$, giving a white precipitate of $BaSO_4$ with $BaCl_2$ (and no ppt with $AgNO_3$)."
    )

    add(ch, "Solvate (Hydrate) Isomerism in Chromium Chloride",
        "Chromium(III) chloride hexahydrate exhibits hydrate (solvate) isomerism. Which of the following formulas represents the dark green isomer that loses two moles of water when treated with concentrated sulphuric acid?",
        [
            "$[Cr(H_2O)_4Cl_2]Cl \\cdot 2H_2O$",
            "$[Cr(H_2O)_6]Cl_3$",
            "$[Cr(H_2O)_5Cl]Cl_2 \\cdot H_2O$",
            "$[Cr(H_2O)_3Cl_3] \\cdot 3H_2O$"
        ],
        "A",
        "Solvate isomerism involves water acting either as a coordinated ligand or as crystalline lattice water. $[Cr(H_2O)_4Cl_2]Cl \\cdot 2H_2O$ is dark green; its two water molecules outside the coordination sphere are weakly held as water of crystallization and are readily removed by dehydrating agents like conc. $H_2SO_4$."
    )

    add(ch, "Linkage Isomerism in Ambidentate Complexes",
        "Which of the following pairs of coordination compounds represents linkage isomers?",
        [
            "$[Co(NH_3)_5(NO_2)]Cl_2$ (yellow) and $[Co(NH_3)_5(ONO)]Cl_2$ (red)",
            "$[Pt(NH_3)_4Cl_2]Br_2$ and $[Pt(NH_3)_4Br_2]Cl_2$",
            "$[Co(NH_3)_6][Cr(CN)_6]$ and $[Cr(NH_3)_6][Co(CN)_6]$",
            "$[Cr(H_2O)_6]Cl_3$ and $[Cr(H_2O)_5Cl]Cl_2 \\cdot H_2O$"
        ],
        "A",
        "Linkage isomerism arises in complexes containing an ambidentate ligand that can coordinate through two different atoms. In $[Co(NH_3)_5(NO_2)]Cl_2$, the nitrite ligand binds through nitrogen (nitro isomer, yellow), whereas in $[Co(NH_3)_5(ONO)]Cl_2$, it binds through oxygen (nitrito isomer, red)."
    )

    add(ch, "Coordination Isomerism in Binuclear Complexes",
        "What type of isomerism is demonstrated by the pair $[Co(NH_3)_6][Cr(CN)_6]$ and $[Cr(NH_3)_6][Co(CN)_6]$?",
        [
            "Coordination isomerism",
            "Ionization isomerism",
            "Linkage isomerism",
            "Solvate isomerism"
        ],
        "A",
        "Coordination isomerism arises in compounds containing both complex cation and complex anion, through the interchange of ligands between the two metal centers (here $Co$ and $Cr$ exchange $NH_3$ and $CN^-$ ligands)."
    )

    add(ch, "Distinguishing Coordination Isomers Chemically",
        "A student is given two violet and green coordination compounds with identical formula $CrCl_3 \\cdot 6H_2O$. One reacts with excess $AgNO_3$ to precipitate 3 equivalents of $AgCl$, while the other precipitates only 1 equivalent of $AgCl$. What are their respective formulations?",
        [
            "$[Cr(H_2O)_6]Cl_3$ and $[Cr(H_2O)_4Cl_2]Cl \\cdot 2H_2O$",
            "$[Cr(H_2O)_5Cl]Cl_2 \\cdot H_2O$ and $[Cr(H_2O)_6]Cl_3$",
            "$[Cr(H_2O)_3Cl_3] \\cdot 3H_2O$ and $[Cr(H_2O)_6]Cl_3$",
            "$[Cr(H_2O)_6]Cl_3$ and $[Cr(H_2O)_5Cl]Cl_2 \\cdot H_2O$"
        ],
        "A",
        "Precipitation of 3 moles of $AgCl$ indicates 3 ionizable $Cl^-$ ions outside the coordination sphere: $[Cr(H_2O)_6]Cl_3$ (violet). Precipitation of 1 mole of $AgCl$ indicates only 1 ionizable $Cl^-$ ion outside: $[Cr(H_2O)_4Cl_2]Cl \\cdot 2H_2O$ (green)."
    )

    add(ch, "Multiple Structural Isomerism for a Given Formula",
        "The coordination compound $[Co(NH_3)_5(NO_2)]SO_4$ can exhibit which of the following combinations of structural isomerism?",
        [
            "Both Linkage isomerism and Ionization isomerism",
            "Only Coordination isomerism",
            "Only Solvate isomerism",
            "Neither Linkage nor Ionization isomerism"
        ],
        "A",
        "The complex has the ambidentate ligand $NO_2^-$, so it shows Linkage isomerism ($[Co(NH_3)_5(NO_2)]SO_4$ and $[Co(NH_3)_5(ONO)]SO_4$). It also has exchangeable anionic ligands inside and outside the coordination sphere ($NO_2^-$ vs $SO_4^{2-}$), so it shows Ionization isomerism ($[Co(NH_3)_5(NO_2)]SO_4$ and $[Co(NH_3)_5(SO_4)]NO_2$)."
    )

    # 27-33: Stereoisomerism (Geometrical & Optical Isomerism)
    add(ch, "Geometrical Isomerism in Square Planar Complexes",
        "Why do square planar complexes of the formula $[Ma_2b_2]$ (such as $[Pt(NH_3)_2Cl_2]$) exhibit geometrical isomerism, whereas $[Ma_4]$ and $[Ma_3b]$ do not?",
        [
            "In $[Ma_2b_2]$, the two identical ligands can occupy either adjacent positions ($90^\\circ$, cis) or opposite positions ($180^\\circ$, trans)",
            "In $[Ma_2b_2]$, the ligands rotate freely about double bonds",
            "In $[Ma_4]$, the coordination number is 4 while in $[Ma_2b_2]$ it is 6",
            "Square planar complexes undergo rapid tautomerization"
        ],
        "A",
        "In square planar $[Ma_2b_2]$ complexes, when the two similar ligands reside adjacent to each other (bond angle $90^\\circ$), it is the cis-isomer. When they reside opposite to each other (bond angle $180^\\circ$), it is the trans-isomer. In $[Ma_4]$ and $[Ma_3b]$, all spatial arrangements are geometrically identical."
    )

    add(ch, "Geometrical Isomers of Square Planar [Mabcd]",
        "How many geometrical isomers are possible for a square planar complex of the type $[Mabcd]$ (such as $[Pt(NH_3)(py)(Cl)(Br)]$)?",
        [
            "$3$ geometrical isomers",
            "$2$ geometrical isomers",
            "$4$ geometrical isomers",
            "$6$ geometrical isomers"
        ],
        "A",
        "For a square planar complex of the type $[Mabcd]$, fixing one ligand (say $a$) at position 1 allows the remaining three ligands ($b, c, d$) to be placed trans to $a$ in three distinct spatial arrangements. Hence, exactly 3 geometrical isomers exist (two of which are cis and one trans relative to any pair)."
    )

    add(ch, "Absence of Geometrical Isomerism in Tetrahedral Complexes",
        "Why do regular tetrahedral complexes of the formula $[Ma_2b_2]$ (such as $[NiCl_2(PPh_3)_2]$) fail to exhibit geometrical (cis-trans) isomerism?",
        [
            "All four coordination positions in a regular tetrahedron are adjacent and equidistant to one another (bond angles are all $109.5^\\circ$)",
            "Tetrahedral complexes lack d-electrons in the valence shell",
            "Tetrahedral complexes are always paramagnetic",
            "Ligands dissociate spontaneously in tetrahedral geometry"
        ],
        "A",
        "In a regular tetrahedral geometry, all four corners are equidistant from one another with identical bond angles of $109.5^\\circ$. There are no distinct 'adjacent' ($90^\\circ$) versus 'opposite' ($180^\\circ$) positions; every position is adjacent to all other three positions. Thus, cis-trans isomerism is impossible."
    )

    add(ch, "Geometrical Isomerism in Octahedral [Ma4b2] Complexes",
        "The octahedral complex ion $[Co(NH_3)_4Cl_2]^+$ exists as two distinct geometrical isomers. What are their geometric designations and characteristic colors?",
        [
            "Cis-isomer is violet (chlorido ligands at $90^\\circ$); Trans-isomer is green (chlorido ligands at $180^\\circ$)",
            "Cis-isomer is green; Trans-isomer is violet",
            "Both cis and trans isomers are colorless",
            "Cis-isomer is yellow; Trans-isomer is red"
        ],
        "A",
        "In octahedral $[Ma_4b_2]$, when the two $b$ ligands (here $Cl^-$) occupy adjacent octahedral vertices ($90^\\circ$), it is the cis-isomer, which is violet. When the two $b$ ligands occupy opposite vertices ($180^\\circ$), it is the trans-isomer, which is green."
    )

    add(ch, "Facial (fac) and Meridional (mer) Isomerism",
        "Octahedral complexes of the type $[Ma_3b_3]$ (such as $[Co(NH_3)_3(NO_2)_3]$) exhibit geometrical isomerism known as facial ($fac$) and meridional ($mer$). What defines the $fac$-isomer?",
        [
            "Three identical donor atoms occupy the corners of the same triangular face of the octahedron (all mutually cis, $90^\\circ$)",
            "Three identical donor atoms lie in a plane passing through the metal center (meridian of the octahedron)",
            "Two identical donor atoms are trans ($180^\\circ$) while the third is cis",
            "All six ligands form a planar hexagon"
        ],
        "A",
        "In an octahedral $[Ma_3b_3]$ complex: (1) In the facial ($fac$) isomer, three identical ligands occupy the corners of the same octahedral triangular face (they are mutually adjacent/cis at $90^\\circ$ to each other). (2) In the meridional ($mer$) isomer, three identical ligands lie around the meridian (in a plane passing through the central metal atom), such that one pair is trans ($180^\\circ$)."
    )

    add(ch, "Optical Isomerism in Octahedral Tris-Chelate Complexes",
        "Why does the coordination complex $[Co(en)_3]^{3+}$ exhibit optical isomerism (enantiomerism)?",
        [
            "It lacks a plane of symmetry and center of inversion, existing as non-superimposable dextro ($d$) and laevo ($l$) mirror images",
            "It contains an asymmetric carbon atom in the ethylenediamine backbone",
            "It possesses an inversion center at the cobalt nucleus",
            "It rapidly hydrolyzes to form chiral hydroxyl complexes"
        ],
        "A",
        "Octahedral complexes containing three symmetrical bidentate ligands ($[M(AA)_3]$ like $[Co(en)_3]^{3+}$) have $D_3$ symmetry. They lack any plane of symmetry or center of inversion; hence they are chiral and exist as a pair of non-superimposable enantiomers ($d$ and $l$ isomers)."
    )

    add(ch, "Stereoisomerism in [M(AA)2b2] Type Complexes",
        "How many total stereoisomers (geometrical + optical) exist for the complex ion $[Co(en)_2Cl_2]^+$, and which isomer is optically active?",
        [
            "$3$ stereoisomers: trans-isomer (optically inactive) and cis-isomer (optically active, existing as a pair of enantiomers)",
            "$2$ stereoisomers: trans-isomer is optically active, cis-isomer is optically inactive",
            "$4$ stereoisomers: two trans enantiomers and two cis enantiomers",
            "$1$ unique stereoisomer with no isomers"
        ],
        "A",
        "$[Co(en)_2Cl_2]^+$ exists as two geometrical isomers: cis and trans. The trans-isomer possesses a plane of symmetry and an inversion center, making it achiral and optically inactive. The cis-isomer lacks a plane of symmetry, is chiral, and resolves into two non-superimposable enantiomers ($d$ and $l$). Thus, there are 3 stereoisomers in total."
    )

    # 34-40: Valence Bond Theory (VBT)
    add(ch, "Valence Bond Theory: Inner vs Outer Orbital Complexes",
        "According to Valence Bond Theory (VBT), what distinguishes an inner orbital complex from an outer orbital complex in octahedral coordination?",
        [
            "Inner orbital complexes utilize $(n-1)d$ orbitals ($d^2sp^3$ hybridization); outer orbital complexes utilize $nd$ orbitals ($sp^3d^2$ hybridization)",
            "Inner orbital complexes have coordination number 4; outer orbital complexes have coordination number 6",
            "Inner orbital complexes are always paramagnetic; outer orbital complexes are always diamagnetic",
            "Inner orbital complexes contain only monodentate ligands"
        ],
        "A",
        "In octahedral complexes, if the metal utilizes its inner $(n-1)d$ orbitals along with $ns$ and $np$ orbitals, the hybridization is $d^2sp^3$, forming an 'inner orbital' (low-spin) complex. If it utilizes outer $nd$ orbitals alongside $ns$ and $np$, the hybridization is $sp^3d^2$, forming an 'outer orbital' (high-spin) complex."
    )

    add(ch, "VBT Analysis of [Fe(CN)6]3-",
        "Based on Valence Bond Theory, what is the hybridization, geometry, and magnetic property of the hexacyanidoferrate(III) ion, $[Fe(CN)_6]^{3-}$?",
        [
            "$d^2sp^3$ hybridization; octahedral geometry; paramagnetic with $1$ unpaired electron",
            "$sp^3d^2$ hybridization; octahedral geometry; paramagnetic with $5$ unpaired electrons",
            "$d^2sp^3$ hybridization; octahedral geometry; diamagnetic",
            "$sp^3d^2$ hybridization; square planar geometry; diamagnetic"
        ],
        "A",
        "In $[Fe(CN)_6]^{3-}$, iron is in $+3$ state ($3d^5$). Cyanide ($CN^-$) is a strong field ligand that forces pairing of four $3d$ electrons into two orbitals, leaving two vacant $3d$ orbitals and one unpaired electron ($n = 1$). These two vacant $3d$, one $4s$, and three $4p$ orbitals hybridize to form $d^2sp^3$ inner orbital octahedral complex, paramagnetic with $\\mu = \\sqrt{1(3)} \\approx 1.73\\text{ BM}$."
    )

    add(ch, "VBT Analysis of [FeF6]3-",
        "Based on Valence Bond Theory, what is the hybridization, geometry, and magnetic moment of $[FeF_6]^{3-}$?",
        [
            "$sp^3d^2$ hybridization; octahedral geometry; paramagnetic with $5$ unpaired electrons ($\\mu \\approx 5.92\\text{ BM}$)",
            "$d^2sp^3$ hybridization; octahedral geometry; paramagnetic with $1$ unpaired electron",
            "$sp^3d$ hybridization; trigonal bipyramidal geometry; diamagnetic",
            "$dsp^2$ hybridization; square planar geometry; diamagnetic"
        ],
        "A",
        "In $[FeF_6]^{3-}$, iron is in $+3$ state ($3d^5$). Fluoride ($F^-$) is a weak field ligand and cannot force electron pairing in the $3d$ subshell. The five $3d$ electrons remain unpaired ($n = 5$). The complex uses outer $4s, 4p,$ and $4d$ orbitals ($sp^3d^2$ hybridization, outer orbital octahedral), giving $\\mu = \\sqrt{5(7)} \\approx 5.92\\text{ BM}$."
    )

    add(ch, "Geometry and Magnetism of [Ni(CO)4] vs [Ni(CN)4]2-",
        "Both $[Ni(CO)_4]$ and $[Ni(CN)_4]^{2-}$ are diamagnetic. What are their respective geometries and hybridizations according to VBT?",
        [
            "$[Ni(CO)_4]$ is tetrahedral ($sp^3$); $[Ni(CN)_4]^{2-}$ is square planar ($dsp^2$)",
            "$[Ni(CO)_4]$ is square planar ($dsp^2$); $[Ni(CN)_4]^{2-}$ is tetrahedral ($sp^3$)",
            "Both are tetrahedral ($sp^3$)",
            "Both are square planar ($dsp^2$)"
        ],
        "A",
        "In $[Ni(CO)_4]$, nickel is $Ni^0$ ($3d^8 4s^2$). Strong ligand $CO$ causes both $4s$ electrons to pair up into the $3d$ subshell, filling it completely ($3d^{10}$). The vacant $4s$ and three $4p$ orbitals undergo $sp^3$ hybridization, resulting in tetrahedral geometry (diamagnetic). In $[Ni(CN)_4]^{2-}$, nickel is $Ni^{2+}$ ($3d^8$). Strong ligand $CN^-$ pairs up the two unpaired $3d$ electrons, leaving one inner $3d$ orbital vacant. This vacant $3d$, one $4s$, and two $4p$ orbitals hybridize to form $dsp^2$ square planar geometry (diamagnetic)."
    )

    add(ch, "VBT Analysis of Tetrachloridonickelate(II) [NiCl4]2-",
        "What is the hybridization, geometry, and magnetic behavior of $[NiCl_4]^{2-}$?",
        [
            "$sp^3$ hybridization; tetrahedral geometry; paramagnetic with $2$ unpaired electrons",
            "$dsp^2$ hybridization; square planar geometry; diamagnetic",
            "$d^2sp^3$ hybridization; octahedral geometry; diamagnetic",
            "$sp^3d$ hybridization; trigonal bipyramidal; paramagnetic"
        ],
        "A",
        "In $[NiCl_4]^{2-}$, nickel is in $+2$ state ($3d^8$). Chloride ($Cl^-$) is a weak field ligand and cannot force pairing of the two unpaired $3d$ electrons. One $4s$ and three $4p$ orbitals hybridize to form $sp^3$ tetrahedral complex. With 2 unpaired electrons ($n=2$), it is paramagnetic ($\\mu \\approx 2.84\\text{ BM}$)."
    )

    add(ch, "VBT Analysis of [Co(NH3)6]3+",
        "Why is the hexaamminecobalt(III) complex ion, $[Co(NH_3)_6]^{3+}$, diamagnetic and classified as an inner orbital complex?",
        [
            "The high $+3$ charge on cobalt causes sufficient crystal field splitting to pair all six 3d electrons into three orbitals, enabling $d^2sp^3$ hybridization",
            "Cobalt is in a zero oxidation state with fully filled 4s subshell",
            "Ammonia donates protons to reduce cobalt to $Co^+$",
            "The complex adopts a regular tetrahedral geometry"
        ],
        "A",
        "In $[Co(NH_3)_6]^{3+}$, cobalt is in the $+3$ oxidation state ($3d^6$). Despite ammonia being an intermediate ligand in the spectrochemical series, the high $+3$ nuclear charge of cobalt causes substantial orbital splitting, forcing all 6 electrons to pair up in three $3d$ orbitals. This leaves two inner $3d$ orbitals vacant, giving $d^2sp^3$ hybridization (diamagnetic, inner orbital octahedral complex)."
    )

    add(ch, "Limitations of Valence Bond Theory",
        "Which of the following is a major limitation of Valence Bond Theory (VBT) in explaining coordination compounds?",
        [
            "It does not provide a quantitative interpretation of magnetic data, cannot explain spectra/colors, and does not distinguish between weak and strong field ligands",
            "It incorrectly predicts that all transition metal complexes are linear",
            "It cannot calculate the oxidation state of the metal ion",
            "It assumes that all bonds in complexes are $100\\%$ ionic"
        ],
        "A",
        "Limitations of VBT according to NCERT: (1) It involves numerous assumptions, (2) It does not explain the color and absorption spectra of complexes, (3) It cannot give a quantitative interpretation of thermodynamic or kinetic stabilities, (4) It does not make a clear distinction between weak and strong field ligands, and (5) It fails to predict tetrahedral vs square planar geometries quantitatively."
    )

    # 41-47: Crystal Field Theory (CFT) - Octahedral Complexes
    add(ch, "Basic Postulates of Crystal Field Theory",
        "Crystal Field Theory (CFT) treats the interaction between the central transition metal ion and surrounding ligands as:",
        [
            "Purely electrostatic (crystal field) interaction between positive metal core and point negative charges or dipoles",
            "Pure covalent $\\sigma$-overlap of metal and ligand atomic orbitals",
            "Delocalized metallic bonding with electron pooling",
            "Van der Waals dispersion forces exclusively"
        ],
        "A",
        "CFT is an electrostatic model that considers the metal-ligand bond to be purely ionic, arising from electrostatic interactions between the positively charged metal cation and ligands regarded as point negative charges (anions) or point dipoles (neutral molecules like $H_2O, NH_3$)."
    )

    add(ch, "Octahedral Crystal Field Splitting of d-Orbitals",
        "In an octahedral crystal field, how do the five degenerate d-orbitals split, and what are their respective energy changes relative to the barycenter?",
        [
            "Splits into lower triply degenerate $t_{2g}$ set (lowered by $-0.4\\Delta_o$) and higher doubly degenerate $e_g$ set (raised by $+0.6\\Delta_o$)",
            "Splits into lower doubly degenerate $e_g$ set (lowered by $-0.6\\Delta_o$) and higher triply degenerate $t_{2g}$ set (raised by $+0.4\\Delta_o$)",
            "Splits into four lower orbitals and one higher orbital",
            "All five d-orbitals remain completely degenerate"
        ],
        "A",
        "In an octahedral complex, ligands approach along the $x, y,$ and $z$ Cartesian axes. The $e_g$ orbitals ($d_{x^2-y^2}, d_{z^2}$) point directly at the ligands, experiencing strong repulsion and rising in energy by $+0.6\\Delta_o$ ($+\\frac{3}{5}\\Delta_o$). The $t_{2g}$ orbitals ($d_{xy}, d_{yz}, d_{zx}$) point between the axes, experiencing less repulsion and falling in energy by $-0.4\\Delta_o$ ($-\\frac{2}{5}\\Delta_o$)."
    )

    add(ch, "The Spectrochemical Series",
        "Which sequence correctly reflects the order of increasing field strength of ligands in the Spectrochemical Series according to NCERT?",
        [
            "$I^- < Br^- < SCN^- < Cl^- < F^- < OH^- < C_2O_4^{2-} < H_2O < NCS^- < edta^{4-} < NH_3 < en < CN^- < CO$",
            "$CO < CN^- < en < NH_3 < edta^{4-} < NCS^- < H_2O < C_2O_4^{2-} < OH^- < F^- < Cl^- < SCN^- < Br^- < I^-$",
            "$H_2O < NH_3 < CN^- < I^- < Br^- < Cl^- < F^- < CO < en < edta^{4-}$",
            "$OH^- < F^- < Cl^- < Br^- < I^- < CO < CN^- < en < NH_3 < H_2O$"
        ],
        "A",
        "The spectrochemical series is an empirically determined series arranging ligands in order of increasing crystal field splitting $\\Delta$: $I^- < Br^- < SCN^- < Cl^- < S^{2-} < F^- < OH^- < C_2O_4^{2-} < H_2O < NCS^- < edta^{4-} < NH_3 < en < CN^- < CO$."
    )

    add(ch, "CFSE Calculation for d4 High-Spin Octahedral Complex",
        "What is the Crystal Field Stabilization Energy (CFSE) and electronic configuration for a $d^4$ octahedral metal ion in a weak crystal field (where $\\Delta_o < P$, high-spin)?",
        [
            "Configuration: $t_{2g}^3\\,e_g^1$ ; $\\text{CFSE} = -0.6\\Delta_o$",
            "Configuration: $t_{2g}^4\\,e_g^0$ ; $\\text{CFSE} = -1.6\\Delta_o + P$",
            "Configuration: $t_{2g}^2\\,e_g^2$ ; $\\text{CFSE} = -0.4\\Delta_o$",
            "Configuration: $t_{2g}^3\\,e_g^1$ ; $\\text{CFSE} = -1.2\\Delta_o$"
        ],
        "A",
        "When $\\Delta_o < P$ (weak field), pairing is unfavorable, so the fourth electron enters the $e_g$ level: $t_{2g}^3\\,e_g^1$. $\\text{CFSE} = [3 \\times (-0.4\\Delta_o)] + [1 \\times (+0.6\\Delta_o)] = -1.2\\Delta_o + 0.6\\Delta_o = -0.6\\Delta_o$."
    )

    add(ch, "CFSE Calculation for d4 Low-Spin Octahedral Complex",
        "What is the Crystal Field Stabilization Energy (CFSE) and electronic configuration for a $d^4$ octahedral metal ion in a strong crystal field (where $\\Delta_o > P$, low-spin)?",
        [
            "Configuration: $t_{2g}^4\\,e_g^0$ ; $\\text{CFSE} = -1.6\\Delta_o + P$",
            "Configuration: $t_{2g}^3\\,e_g^1$ ; $\\text{CFSE} = -0.6\\Delta_o$",
            "Configuration: $t_{2g}^4\\,e_g^0$ ; $\\text{CFSE} = -1.6\\Delta_o$",
            "Configuration: $t_{2g}^2\\,e_g^2$ ; $\\text{CFSE} = 0.0\\Delta_o$"
        ],
        "A",
        "When $\\Delta_o > P$ (strong field), the energy penalty to excite to $e_g$ is greater than the pairing energy $P$. Thus, the 4th electron pairs up in $t_{2g}$: $t_{2g}^4\\,e_g^0$. $\\text{CFSE} = [4 \\times (-0.4\\Delta_o)] + P = -1.6\\Delta_o + P$."
    )

    add(ch, "High-Spin vs Low-Spin Criteria in d5 and d6 Octahedral Complexes",
        "Under what conditions will an octahedral complex of a $d^5$ or $d^6$ transition metal ion form a low-spin (spin-paired) complex rather than a high-spin complex?",
        [
            "When crystal field splitting energy is greater than pairing energy ($\\Delta_o > P$)",
            "When pairing energy is greater than crystal field splitting energy ($P > \\Delta_o$)",
            "When $\\Delta_o = 0$",
            "When the metal cation has an oxidation state of $0$"
        ],
        "A",
        "If $\\Delta_o > P$, the energy required to promote an electron into the higher $e_g$ level is greater than the pairing energy $P$. Consequently, electrons pair up in the lower $t_{2g}$ set first, yielding a low-spin complex (e.g., $d^5: t_{2g}^5$, $d^6: t_{2g}^6$). If $\\Delta_o < P$, electrons occupy $e_g$ before pairing, yielding a high-spin complex."
    )

    add(ch, "Factors Influencing Crystal Field Splitting Magnitude",
        "Which of the following modifications will result in an INCREASE in the crystal field splitting energy ($\\Delta_o$) of an octahedral complex?",
        [
            "Increasing the oxidation state of the metal from $+2$ to $+3$, and descending from a 3d to a 4d or 5d series metal",
            "Decreasing the oxidation state of the central metal cation",
            "Replacing a strong-field ligand like $CN^-$ with a weak-field ligand like $Cl^-$",
            "Decreasing the coordination number from 6 to 4"
        ],
        "A",
        "Factors increasing $\\Delta_o$: (1) Higher oxidation state of metal ($M^{3+} > M^{2+}$) draws ligands closer, increasing electrostatic field; (2) Descending a transition group ($5d > 4d > 3d$) increases orbital overlap and crystal field splitting; (3) Stronger field ligands higher in the spectrochemical series."
    )

    # 48-53: CFT - Tetrahedral Complexes & Color
    add(ch, "Tetrahedral Crystal Field Splitting Pattern",
        "In a tetrahedral crystal field, how do the five d-orbitals split in energy relative to the barycenter?",
        [
            "Inverted splitting: lower doubly degenerate $e$ set ($d_{x^2-y^2}, d_{z^2}$) and higher triply degenerate $t_2$ set ($d_{xy}, d_{yz}, d_{zx}$)",
            "Identical to octahedral splitting: lower $t_{2g}$ set and higher $e_g$ set",
            "Single lower orbital and four degenerate upper orbitals",
            "No splitting occurs in tetrahedral symmetry"
        ],
        "A",
        "In tetrahedral symmetry, the four ligands approach between the axes rather than along the Cartesian axes. Hence, the $d_{xy}, d_{yz}, d_{zx}$ orbitals ($t_2$) experience greater electrostatic repulsion and are raised in energy, while $d_{x^2-y^2}, d_{z^2}$ ($e$) experience less repulsion and are lowered. (Subscript 'g' is omitted because tetrahedral geometry lacks an inversion center)."
    )

    add(ch, "Relationship Between Tetrahedral and Octahedral Splitting",
        "What is the mathematical relationship between the crystal field splitting in a tetrahedral field ($\\Delta_t$) and that in an octahedral field ($\\Delta_o$) for the same metal ion and ligands?",
        [
            "$\\Delta_t = \\frac{4}{9}\\Delta_o$",
            "$\\Delta_t = \\frac{9}{4}\\Delta_o$",
            "$\\Delta_t = \\frac{1}{2}\\Delta_o$",
            "$\\Delta_t = \\frac{2}{3}\\Delta_o$"
        ],
        "A",
        "Because there are only 4 ligands in a tetrahedral complex instead of 6 in an octahedral complex (ratio $\\frac{4}{6}$), and because the tetrahedral directions do not point directly at any d-orbital (reducing field strength by factor $\\frac{2}{3}$), the net splitting is: $\\Delta_t = \\frac{4}{6} \\times \\frac{2}{3} \\Delta_o = \\frac{4}{9}\\Delta_o$."
    )

    add(ch, "Why Tetrahedral Complexes Are High-Spin",
        "Why are low-spin tetrahedral complexes extremely rare, with almost all tetrahedral complexes being high-spin?",
        [
            "Because tetrahedral splitting is small ($\\Delta_t = \\frac{4}{9}\\Delta_o$) and rarely exceeds the pairing energy ($\\Delta_t < P$)",
            "Because tetrahedral complexes contain only $d^{10}$ metal ions",
            "Because tetrahedral geometry repels paired electrons out of the atom",
            "Because pairing energy is always zero in tetrahedral complexes"
        ],
        "A",
        "Because $\\Delta_t$ is less than half of $\\Delta_o$ ($\\Delta_t = \\frac{4}{9}\\Delta_o$), the crystal field splitting energy is almost always smaller than the pairing energy ($\\Delta_t < P$). Thus, it is energetically more favorable for electrons to occupy the higher $t_2$ orbitals than to pair up in the lower $e$ orbitals, resulting in high-spin configurations."
    )

    add(ch, "Origin of Color and d-d Transition in CFT",
        "According to Crystal Field Theory, what occurs when a transition metal complex absorbs visible light?",
        [
            "An electron is excited from a lower energy d-orbital ($t_{2g}$) to a higher energy vacant/partially filled d-orbital ($e_g$)",
            "An electron is ejected completely from the metal atom into the solvent",
            "A ligand dissociates spontaneously from the coordination sphere",
            "A proton transfers from water to the metal nucleus"
        ],
        "A",
        "When white light passes through a complex solution, the complex absorbs photons whose energy matches the crystal field splitting ($h\\nu = \\Delta_o$). This promotes an electron from the lower energy $t_{2g}$ set to the higher energy $e_g$ set (d-d transition). The transmitted light is complementary to the absorbed wavelength."
    )

    add(ch, "Ligand Effect on Color of Nickel Complexes",
        "When ethylenediamine is progressively added to an aqueous solution of $[Ni(H_2O)_6]^{2+}$ (green), the color changes to pale blue ($[Ni(H_2O)_4(en)]^{2+}$), then blue/purple ($[Ni(H_2O)_2(en)_2]^{2+}$), and finally violet ($[Ni(en)_3]^{2+}$). Why does this color shift occur?",
        [
            "Ethylenediamine is a stronger field ligand than water, causing larger $\\Delta_o$ and shifting light absorption towards shorter wavelengths (higher frequencies)",
            "Ethylenediamine oxidizes nickel from $+2$ to $+4$",
            "Water molecules emit green light upon displacement",
            "Ethylenediamine acts as a reducing agent converting nickel to metallic colloid"
        ],
        "A",
        "As stronger-field $en$ ligands replace weaker-field $H_2O$ ligands, the crystal field splitting $\\Delta_o$ increases. A larger $\\Delta_o$ means higher energy (shorter wavelength) photons are absorbed (moving from red towards yellow/green), causing the transmitted complementary color to shift towards blue and violet."
    )

    add(ch, "Color of Anhydrous vs Hydrated Copper Sulphate",
        "Why is anhydrous copper sulphate ($CuSO_4$) white, whereas hydrated copper sulphate ($CuSO_4 \\cdot 5H_2O$) is deep blue?",
        [
            "In the absence of water ligands, there is no crystal field splitting of d-orbitals, so d-d transitions cannot occur",
            "Anhydrous $CuSO_4$ has a $3d^0$ configuration while hydrated has $3d^9$",
            "Water molecules in the crystal undergo fluorescence",
            "Hydration oxidizes copper from $Cu^+$ to $Cu^{2+}$"
        ],
        "A",
        "In anhydrous $CuSO_4$, copper is not coordinated to ligands in a way that creates crystal field splitting of the d-orbitals; the d-orbitals remain degenerate, making d-d transitions impossible, so it is white. In hydrated $CuSO_4 \\cdot 5H_2O$, coordinated water molecules split the d-orbitals, enabling d-d electron transitions which absorb red light and transmit blue."
    )

    # 54-59: Metal Carbonyls & Synergic Bonding
    add(ch, "Synergic Bonding Mechanism in Metal Carbonyls",
        "What is the nature of synergic bonding in homoleptic metal carbonyls?",
        [
            "$\\sigma$-donation of a lone pair from carbonyl carbon into a vacant metal d-orbital, reinforced by $\\pi$-backdonation from filled metal d-orbitals into vacant antibonding $\\pi^*$ orbitals of $CO$",
            "Pure ionic transfer of two electrons from metal to carbonyl ligand",
            "Electrostatic dipole-dipole attraction with no orbital overlap",
            "$\\sigma$-donation from oxygen lone pair into metal s-orbital exclusively"
        ],
        "A",
        "In metal carbonyls: (1) A $M-C$ $\\sigma$-bond is formed by donation of the lone pair of electrons on the carbonyl carbon into a vacant d-orbital of the metal. (2) A $M-C$ $\\pi$-bond is formed by back-donation of electron density from filled metal d-orbitals into empty $\\pi^*$ antibonding orbitals of $CO$. This mutual reinforcement is called synergic bonding."
    )

    add(ch, "Consequences of Synergic Bonding on Bond Strengths",
        "What effect does synergic back-donation have on the $M-C$ bond and the $C-O$ bond in a metal carbonyl complex?",
        [
            "Strengthens the $M-C$ bond (higher bond order) and weakens the $C-O$ bond (longer bond length, lower stretching frequency $\\nu_{CO}$)",
            "Weakens both the $M-C$ bond and the $C-O$ bond",
            "Strengthens both the $M-C$ bond and the $C-O$ bond",
            "Lengthens the $M-C$ bond and increases the $C-O$ bond order"
        ],
        "A",
        "Back-donation transfers electron density from the metal into the antibonding $\\pi^*$ orbitals of $CO$. Populating an antibonding orbital reduces the $C-O$ bond order (weakening and lengthening the $C-O$ bond, lowering its stretching frequency $\\nu_{CO}$) while increasing the $M-C$ bond order (strengthening and shortening the $M-C$ bond)."
    )

    add(ch, "CO Stretching Frequency Trend in Isoelectronic Carbonyls",
        "Among the isoelectronic hexacarbonyl species $[V(CO)_6]^-$, $[Cr(CO)_6]$, and $[Mn(CO)_6]^+$, which has the lowest $C-O$ stretching frequency (and thus weakest $C-O$ bond)?",
        [
            "$[V(CO)_6]^-$ because the negative charge increases $\\pi$-backdonation from the metal into $CO$ $\\pi^*$ orbitals",
            "$[Mn(CO)_6]^+$ because positive charge pulls electrons towards manganese",
            "$[Cr(CO)_6]$ because chromium has half-filled d-subshell",
            "All three have identical $C-O$ stretching frequencies"
        ],
        "A",
        "The anion $[V(CO)_6]^-$ has the highest electron density on the metal due to its negative charge. Greater electron density facilitates greater $\\pi$-backdonation into the antibonding $\\pi^*$ orbitals of $CO$, which significantly weakens the $C-O$ bond, yielding the longest $C-O$ bond length and lowest $C-O$ stretching frequency $\\nu_{CO}$."
    )

    add(ch, "Structures of Homoleptic Metal Carbonyls",
        "What are the geometries of $[Ni(CO)_4]$, $[Fe(CO)_5]$, and $[Cr(CO)_6]$, respectively?",
        [
            "$[Ni(CO)_4]$ is tetrahedral; $[Fe(CO)_5]$ is trigonal bipyramidal; $[Cr(CO)_6]$ is octahedral",
            "$[Ni(CO)_4]$ is square planar; $[Fe(CO)_5]$ is square pyramidal; $[Cr(CO)_6]$ is octahedral",
            "$[Ni(CO)_4]$ is tetrahedral; $[Fe(CO)_5]$ is octahedral; $[Cr(CO)_6]$ is tetrahedral",
            "$[Ni(CO)_4]$ is linear; $[Fe(CO)_5]$ is trigonal planar; $[Cr(CO)_6]$ is octahedral"
        ],
        "A",
        "According to NCERT: (1) $[Ni(CO)_4]$ has 4 carbonyl ligands and is tetrahedral; (2) $[Fe(CO)_5]$ has 5 carbonyl ligands and is trigonal bipyramidal; (3) $[Cr(CO)_6]$ has 6 carbonyl ligands and is octahedral."
    )

    add(ch, "Structure of Binuclear Metal Carbonyls",
        "Which statement correctly describes the structure and bonding in the binuclear carbonyl $[Mn_2(CO)_{10}]$?",
        [
            "It consists of two square pyramidal $Mn(CO)_5$ units joined together by a direct $Mn-Mn$ single bond, without bridging carbonyls",
            "It contains three bridging carbonyl ligands and no direct $Mn-Mn$ bond",
            "It has a planar structure with ionic bonds between manganese atoms",
            "It forms a cyclic ring with alternating manganese and oxygen atoms"
        ],
        "A",
        "In $[Mn_2(CO)_{10}]$, each manganese atom is coordinated to five terminal $CO$ ligands in a distorted octahedral environment, completed by a direct $Mn-Mn$ single bond ($d_{Mn-Mn} = 292\\text{ pm}$). There are no bridging $CO$ ligands in $[Mn_2(CO)_{10}]$."
    )

    add(ch, "Oxidation State of Metal in Neutral Carbonyls",
        "What is the formal oxidation state of the central transition metal in $[Ni(CO)_4]$, $[Fe(CO)_5]$, and $[Cr(CO)_6]$?",
        [
            "$0$ in all three complexes",
            "$+2, +3, \\text{ and } +6$ respectively",
            "$+4, +5, \\text{ and } +6$ respectively",
            "$-1$ in all three complexes"
        ],
        "A",
        "Carbon monoxide ($CO$) is a neutral ligand with a formal charge of 0. Because these metal carbonyl complexes carry no net ionic charge, the central metal atoms ($Ni, Fe, Cr$) possess a formal oxidation state of 0."
    )

    # 60-65: Applications of Coordination Compounds
    add(ch, "Cisplatin in Cancer Chemotherapy",
        "Cisplatin, $cis-[Pt(NH_3)_2Cl_2]$, is widely utilized in medical oncology as an anticancer agent. Why is the trans-isomer ($trans-[Pt(NH_3)_2Cl_2]$) clinically ineffective?",
        [
            "Only the cis-isomer has adjacent chlorido leaving groups ($90^\\circ$) that cross-link adjacent purine bases in cellular DNA, inhibiting tumor replication",
            "The trans-isomer cannot dissolve in water or biological fluids",
            "The trans-isomer decomposes into elemental platinum immediately upon entering blood",
            "The trans-isomer has an oxidation state of $+4$ rather than $+2$"
        ],
        "A",
        "In cisplatin ($cis-[Pt(NH_3)_2Cl_2]$), the two chlorido ligands are cis ($90^\\circ$ apart). In cells, hydrolysis replaces these chlorides, allowing the platinum center to cross-link adjacent guanine bases on DNA strands, blocking DNA replication and inducing apoptosis in cancer cells. In the trans-isomer ($180^\\circ$), geometric positioning prevents intra-strand cross-linking, rendering it therapeutically ineffective."
    )

    add(ch, "EDTA in Treatment of Heavy Metal Poisoning",
        "Why is calcium disodium EDTA ($CaNa_2EDTA$) administered in the clinical treatment of lead ($Pb^{2+}$) poisoning instead of free $Na_4EDTA$?",
        [
            "$Pb^{2+}$ displaces $Ca^{2+}$ because the lead-EDTA chelate is thermodynamically more stable, while administering $CaNa_2EDTA$ prevents hypocalcemia (depletion of body calcium)",
            "Free $Na_4EDTA$ cannot bind lead ions in blood",
            "Calcium ions reduce toxic $Pb^{2+}$ to insoluble lead metal",
            "Free $Na_4EDTA$ is a volatile toxic liquid"
        ],
        "A",
        "The stability constant of $[Pb(EDTA)]^{2-}$ is much higher than that of $[Ca(EDTA)]^{2-}$. When $CaNa_2EDTA$ is infused, lead displaces calcium to form the soluble, stable lead-EDTA chelate, which is excreted safely in urine. Using calcium disodium salt ensures that body calcium is not stripped from blood and bones, avoiding fatal hypocalcemia."
    )

    add(ch, "Cyanide Leaching in Gold and Silver Extraction",
        "In the metallurgical extraction of gold ($Au$) and silver ($Ag$) via cyanide leaching (MacArthur-Forrest process), what soluble coordination complex is initially formed, and which metal is used to displace the precious metal?",
        [
            "$[Au(CN)_2]^-$ or $[Ag(CN)_2]^-$ is formed, and Zinc ($Zn$) is used for displacement",
            "$[Au(CN)_4]^{3-}$ is formed, and Copper ($Cu$) is used for displacement",
            "$[Ag(CN)_6]^{4-}$ is formed, and Iron ($Fe$) is used for displacement",
            "$[Au(CO)_4]^-$ is formed, and Lead ($Pb$) is used for displacement"
        ],
        "A",
        "Gold and silver are leached with dilute sodium cyanide solution in the presence of atmospheric oxygen: $4Au + 8CN^- + 2H_2O + O_2 \\to 4[Au(CN)_2]^- + 4OH^-$. The precious metal is then recovered by displacement using scrap zinc powder: $2[Au(CN)_2]^- + Zn \\to [Zn(CN)_4]^{2-} + 2Au$."
    )

    add(ch, "Wilkinson's Catalyst for Alkene Hydrogenation",
        "What is the chemical identity, geometry, and catalytic application of Wilkinson's catalyst?",
        [
            "$[(PPh_3)_3RhCl]$, square planar rhodium(I) complex, used for homogeneous hydrogenation of alkenes",
            "$[(PPh_3)_3PtCl]$, tetrahedral platinum(II) complex, used for cracking petroleum",
            "$[Ni(CO)_4]$, tetrahedral nickel(0) complex, used for polymerization of alkynes",
            "$[Co_2(CO)_8]$, binuclear cobalt complex, used for Haber ammonia synthesis"
        ],
        "A",
        "Wilkinson's catalyst is chloridotris(triphenylphosphine)rhodium(I), $[(PPh_3)_3RhCl]$. It is a 16-electron square planar complex of Rh(I) widely used as a homogeneous catalyst for the selective hydrogenation of alkenes to alkanes under mild conditions."
    )

    add(ch, "Biological Coordination Compounds: Chlorophyll, Hemoglobin, and Vitamin B12",
        "Which metal ions serve as the central coordination centers in Chlorophyll, Hemoglobin, and Vitamin $B_{12}$, respectively?",
        [
            "Magnesium ($Mg^{2+}$), Iron ($Fe^{2+}$), and Cobalt ($Co^{3+}$)",
            "Iron ($Fe^{2+}$), Magnesium ($Mg^{2+}$), and Copper ($Cu^{2+}$)",
            "Zinc ($Zn^{2+}$), Iron ($Fe^{3+}$), and Manganese ($Mn^{2+}$)",
            "Calcium ($Ca^{2+}$), Cobalt ($Co^{2+}$), and Iron ($Fe^{2+}$)"
        ],
        "A",
        "Chlorophyll is a magnesium ($Mg^{2+}$) porphyrin coordination complex responsible for plant photosynthesis. Hemoglobin is an iron ($Fe^{2+}$) heme coordination complex that transports oxygen in blood. Vitamin $B_{12}$ (cyanocobalamin) is a cobalt ($Co^{3+}$) corrin ring complex essential for neurological function and erythrocyte production."
    )

    add(ch, "Qualitative Detection of Ni(II) with Dimethylglyoxime (DMG)",
        "In qualitative inorganic analysis, nickel ($Ni^{2+}$) is detected by adding dimethylglyoxime (DMG) in ammoniacal solution. What is the color and stabilizing structural feature of the resulting $[Ni(dmg)_2]$ complex precipitate?",
        [
            "Rosy red precipitate, stabilized by intramolecular hydrogen bonding forming five- and six-membered chelate rings",
            "White gelatinous precipitate, stabilized by ionic lattice forces",
            "Deep blue solution, stabilized by outer sphere solvent cages",
            "Bright yellow precipitate, stabilized by covalent carbon-nickel $\\sigma$-bonds"
        ],
        "A",
        "When DMG is added to an ammoniacal solution of $Ni^{2+}$, a characteristic brilliant rosy red precipitate of bis(dimethylglyoximato)nickel(II), $[Ni(dmg)_2]$, is formed. The complex has a square planar geometry stabilized by two symmetrical intramolecular $O-H\\cdots O$ hydrogen bonds, which form stable pseudo-six-membered rings in addition to the five-membered chelate rings."
    )

    return qs
