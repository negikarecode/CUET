from scripts.chem_generators.common import make_question, normalize_text

def get_haloalkanes_questions(seen):
    qs = []
    
    def add(ch, top, text, opts, ans, sol):
        norm = normalize_text(text)
        assert norm not in seen, f"Duplicate detected in haloalkanes: {text[:50]}"
        seen.add(norm)
        qs.append(make_question(ch, top, text, opts, ans, sol))

    ch = "Haloalkanes and Haloarenes"

    # 1-5: Classification and Nomenclature
    add(ch, "Classification of Allylic Halides",
        "In organic chemistry, which of the following compounds is classified as an allylic halide?",
        [
            "$CH_2=CH-CH_2-Cl$ (3-chloroprop-1-ene)",
            "$CH_2=CH-Cl$ (chloroethene)",
            "$C_6H_5-Cl$ (chlorobenzene)",
            "$CH_3-CH_2-CH_2-Cl$ (1-chloropropane)"
        ],
        "A",
        "Allylic halides are compounds in which the halogen atom is bonded to an $sp^3$-hybridized carbon atom adjacent to a carbon-carbon double bond ($C=C-C-X$). In 3-chloroprop-1-ene ($CH_2=CH-CH_2Cl$), the chlorine is attached to an $sp^3$ allylic carbon. In contrast, chloroethene is a vinylic halide and chlorobenzene is an aryl halide."
    )

    add(ch, "Classification of Benzylic Halides",
        "Which of the following structures correctly represents a primary ($1^\\circ$) benzylic halide?",
        [
            "$C_6H_5-CH_2-Br$ (benzyl bromide)",
            "$C_6H_5-Br$ (bromobenzene)",
            "$C_6H_5-CH_2-CH_2-Br$ (2-phenylethyl bromide)",
            "$C_6H_5-CH(Br)-CH_3$ (1-phenylethyl bromide)"
        ],
        "A",
        "Benzylic halides are compounds in which the halogen atom is bonded to an $sp^3$-hybridized carbon atom directly attached to an aromatic ring ($Ar-CH_2-X$). Benzyl bromide ($C_6H_5CH_2Br$) is a primary benzylic halide. Bromobenzene is an aryl halide, 2-phenylethyl bromide has the halogen at a homobenzylic position, and 1-phenylethyl bromide is a secondary ($2^\\circ$) benzylic halide."
    )

    add(ch, "Classification of Vinylic Halides",
        "A vinylic halide is characterized by which of the following structural arrangements?",
        [
            "The halogen atom is bonded directly to an $sp^2$-hybridized carbon atom of an aliphatic carbon-carbon double bond",
            "The halogen atom is bonded to an $sp^3$-hybridized carbon atom adjacent to a carbon-carbon double bond",
            "The halogen atom is bonded directly to an $sp^2$-hybridized aromatic ring carbon",
            "The halogen atom is bonded to an $sp^3$-hybridized carbon atom adjacent to an aromatic ring"
        ],
        "A",
        "Vinylic halides are compounds in which the halogen atom is bonded directly to an $sp^2$-hybridized carbon atom of a carbon-carbon double bond ($>C=C-X$). For example, vinyl chloride ($CH_2=CH-Cl$). If attached to an adjacent $sp^3$ carbon, it is allylic. If attached directly to an aromatic ring, it is an aryl halide."
    )

    add(ch, "Geminal vs Vicinal Dihalides",
        "How are geminal dihalides (alkylidene halides) structurally distinguished from vicinal dihalides (alkylene dihalides)?",
        [
            "Geminal dihalides have two halogen atoms attached to the same carbon atom, whereas vicinal dihalides have two halogen atoms attached to two adjacent carbon atoms",
            "Geminal dihalides have halogen atoms on adjacent carbons, whereas vicinal dihalides have both halogens on the same carbon",
            "Geminal dihalides contain halogens on terminal carbons only, whereas vicinal dihalides contain halogens on non-terminal carbons",
            "Geminal dihalides are formed exclusively from alkynes, whereas vicinal dihalides are formed exclusively from alkanes"
        ],
        "A",
        "Dihaloalkanes having the same halogen atoms are categorized into two types: (i) Geminal dihalides (gem-dihalides or alkylidene halides) where both halogen atoms are present on the same carbon atom (e.g., $CH_3CHBr_2$, ethylidene dibromide); (ii) Vicinal dihalides (vic-dihalides or alkylene dihalides) where halogen atoms are present on two adjacent carbon atoms (e.g., $CH_2Br-CH_2Br$, ethylene dibromide)."
    )

    add(ch, "IUPAC Nomenclature of Haloalkanes",
        "What is the correct IUPAC name for the haloalkane with the structural formula $CH_3-C(CH_3)_2-CH(Cl)-CH_3$?",
        [
            "2-Chloro-3,3-dimethylbutane",
            "3-Chloro-2,2-dimethylbutane",
            "2,2-Dimethyl-3-chlorobutane",
            "1-Chloro-1,2,2-trimethylpropane"
        ],
        "A",
        "Numbering the four-carbon main chain from right to left gives the lowest set of locants for the substituents: C2 has the chloro group and C3 has two methyl groups (locant set 2, 3, 3). Numbering from left to right would give locants 2, 2, 3, but alphabetical precedence of 'chloro' over 'methyl' at equivalent lowest set gives 2-chloro-3,3-dimethylbutane."
    )

    # 6-15: Preparation from Alcohols & Alkenes
    add(ch, "Preparation from Alcohols Using Thionyl Chloride",
        "Why is thionyl chloride ($SOCl_2$) regarded as the most preferred reagent for preparing alkyl chlorides from primary and secondary alcohols?",
        [
            "The byproducts ($SO_2$ and $HCl$) are both gaseous and easily escape, leaving behind pure alkyl chloride",
            "It prevents carbocation rearrangement by reacting through an explosive intermediate",
            "It is the only reagent that can convert tertiary alcohols into alkyl chlorides at $0^\\circ\\text{C}$",
            "It acts as a reducing agent, converting any dialkyl ether side-products into alkyl halides"
        ],
        "A",
        "The reaction $R-OH + SOCl_2 \\xrightarrow{\\text{reflux/pyridine}} R-Cl + SO_2\\uparrow + HCl\\uparrow$ is preferred because both side products, sulfur dioxide ($SO_2$) and hydrogen chloride ($HCl$), are gases that escape from the reaction mixture, affording the alkyl chloride in high purity without complex purification steps."
    )

    add(ch, "Reaction of Alcohols with Phosphorus Halides",
        "When ethanol reacts with phosphorus pentachloride ($PCl_5$), what phosphorus-containing byproduct is produced alongside ethyl chloride and $HCl$?",
        [
            "Phosphoryl chloride ($POCl_3$)",
            "Phosphorous acid ($H_3PO_3$)",
            "Phosphorus trichloride ($PCl_3$)",
            "Phosphoric acid ($H_3PO_4$)"
        ],
        "A",
        "The reaction of an alcohol with $PCl_5$ proceeds as: $R-OH + PCl_5 \\rightarrow R-Cl + POCl_3 + HCl$. Phosphoryl chloride ($POCl_3$) is the phosphorus byproduct. In contrast, reaction with $PCl_3$ yields phosphorous acid: $3R-OH + PCl_3 \\rightarrow 3R-Cl + H_3PO_3$."
    )

    add(ch, "Preparation of Alkyl Iodides Using Red Phosphorus",
        "Alkyl iodides are typically prepared from alcohols by heating them with which in situ generated reagent?",
        [
            "Red phosphorus and iodine ($P + I_2$ forming $PI_3$ in situ)",
            "Potassium iodide in concentrated sulfuric acid ($KI + H_2SO_4$)",
            "Sodium iodide in aqueous sodium hypochlorite",
            "Iodine monochloride ($ICl$) in dry ether"
        ],
        "A",
        "Alkyl iodides are prepared by treating alcohols with red phosphorus and iodine, which react in situ to generate phosphorus triiodide ($PI_3$): $3R-OH + P + \\frac{3}{2}I_2 \\rightarrow 3R-I + H_3PO_3$. Phosphorus triiodide is unstable and therefore generated directly in the reaction vessel."
    )

    add(ch, "Incompatibility of KI with Sulfuric Acid",
        "Why is concentrated sulfuric acid ($H_2SO_4$) NOT used during the reaction of an alcohol with potassium iodide ($KI$) to prepare an alkyl iodide?",
        [
            "Concentrated $H_2SO_4$ is a strong oxidizing agent that oxidizes $HI$ to elemental $I_2$, preventing alkyl iodide formation",
            "Sulfuric acid precipitates potassium iodide as an insoluble sulfate complex",
            "Sulfuric acid reacts violently with the alcohol to form toxic alkyl sulfates that explode",
            "Sulfuric acid causes complete racemization of the potassium counterion"
        ],
        "A",
        "Sulfuric acid is a strong oxidizing agent. When $KI$ is treated with $H_2SO_4$, it first produces $HI$, but $H_2SO_4$ promptly oxidizes $HI$ to elemental iodine ($2HI + H_2SO_4 \\rightarrow I_2 + SO_2 + 2H_2O$), so no $HI$ remains to react with the alcohol. Instead, a non-oxidizing acid like orthophosphoric acid ($H_3PO_4$) is used."
    )

    add(ch, "Electrophilic Addition of HBr to Alkenes",
        "According to Markovnikov's rule, what is the major organic product formed by the addition of gaseous hydrogen bromide ($HBr$) to propene in the absence of peroxides?",
        [
            "2-Bromopropane",
            "1-Bromopropane",
            "1,2-Dibromopropane",
            "Cyclopropane"
        ],
        "A",
        "Electrophilic addition of $HBr$ to propene proceeds via the more stable intermediate carbocation. The proton ($H^+$) adds to the $sp^2$ carbon with more hydrogens ($C1$), producing the more stable secondary carbocation ($CH_3-\\overset{+}{C}H-CH_3$), which is then attacked by $Br^-$ to give 2-bromopropane as the major product."
    )

    add(ch, "Peroxide Effect Mechanism with HBr",
        "When propene is treated with hydrogen bromide ($HBr$) in the presence of benzoyl peroxide, the major product obtained is 1-bromopropane. What is the fundamental mechanism of this reaction?",
        [
            "Free radical addition where a bromine radical adds to the terminal carbon to generate the more stable secondary free radical",
            "Electrophilic addition where peroxide stabilizes a primary carbocation over a secondary carbocation",
            "Nucleophilic addition where the peroxide anion directly attacks the double bond",
            "Concerted pericyclic cycloaddition without any radical or ionic intermediates"
        ],
        "A",
        "In the presence of peroxides, $HBr$ adds by a free-radical mechanism (Kharasch effect). The bromine radical ($Br^\\bullet$) generated by peroxide adds to the double bond such that the more stable secondary alkyl radical ($CH_3-\\dot{C}H-CH_2Br$) is formed. This radical then abstracts a hydrogen atom from $HBr$ to give 1-bromopropane."
    )

    add(ch, "Specificity of Peroxide Effect to HBr",
        "Why is the peroxide effect (anti-Markovnikov addition) observed only with $HBr$ and neither with $HCl$ nor with $HI$?",
        [
            "The $H-Cl$ bond is too strong for homolytic cleavage by alkoxy radicals, while for $HI$, the iodine-alkene addition step is endothermic and iodine radicals dimerize into $I_2$",
            "Both $HCl$ and $HI$ react explosively with peroxides to generate toxic halogen gases",
            "Chlorine radicals are too bulky to attack alkenes, while iodine radicals reduce peroxides to water",
            "Hydrogen fluoride and hydrogen iodide form insoluble polymeric complexes with benzoyl peroxide"
        ],
        "A",
        "For the free radical chain propagation steps to proceed, both propagation steps must be exothermic. For $HCl$, the $H-Cl$ bond dissociation energy ($430.5\\text{ kJ/mol}$) is too high, making the hydrogen abstraction step endothermic. For $HI$, the $H-I$ bond is weak, but the addition of $I^\\bullet$ to the alkene double bond is endothermic; instead, iodine radicals rapidly combine with each other to regenerate $I_2$ ($2I^\\bullet \\rightarrow I_2$)."
    )

    add(ch, "Allylic Halogenation of Alkenes",
        "What product is predominantly formed when propene is treated with chlorine gas ($Cl_2$) at an elevated temperature of $773\\text{ K}$?",
        [
            "3-Chloroprop-1-ene (allyl chloride)",
            "1,2-Dichloropropane",
            "2-Chloropropane",
            "1-Chloroprop-1-ene"
        ],
        "A",
        "At high temperatures ($773\\text{ K}$) or in the presence of UV light / NBS, halogenation of alkenes proceeds via a free-radical substitution pathway at the weaker allylic $C-H$ bond rather than addition across the double bond. The allylic free radical ($CH_2=CH-\\dot{C}H_2$) is resonance-stabilized, yielding 3-chloroprop-1-ene (allyl chloride)."
    )

    add(ch, "Monochlorination Isomers of 2-Methylbutane",
        "How many distinct monochloro structural isomers are formed upon the photochemical free-radical chlorination of 2-methylbutane?",
        [
            "Four structural isomers",
            "Two structural isomers",
            "Three structural isomers",
            "Five structural isomers"
        ],
        "A",
        "2-Methylbutane ($CH_3-CH(CH_3)-CH_2-CH_3$) possesses four chemically non-equivalent sets of hydrogen atoms: (1) C1 methyl hydrogens give 1-chloro-2-methylbutane; (2) C2 tertiary hydrogen gives 2-chloro-2-methylbutane; (3) C3 secondary hydrogens give 2-chloro-3-methylbutane (3-chloro-2-methylbutane); (4) C4 methyl hydrogens give 1-chloro-3-methylbutane. Thus, exactly 4 structural isomers are formed."
    )

    add(ch, "Finkelstein Halogen Exchange Reaction",
        "In the Finkelstein reaction, an alkyl chloride or bromide is converted to an alkyl iodide using $NaI$ in dry acetone. What drives this reaction to completion according to Le Chatelier's principle?",
        [
            "Precipitation of sodium chloride ($NaCl$) or sodium bromide ($NaBr$) in dry acetone",
            "Distillation of acetone at low boiling point",
            "Formation of insoluble covalent iodine complexes with acetone",
            "High volatility of alkyl iodides compared to alkyl chlorides"
        ],
        "A",
        "Sodium iodide ($NaI$) is soluble in dry acetone due to its covalent character (Fajans' rule), whereas the resulting sodium chloride ($NaCl$) and sodium bromide ($NaBr$) are predominantly ionic and virtually insoluble in acetone. They precipitate out of the reaction mixture, shifting the equilibrium forward according to Le Chatelier's principle."
    )

    # 16-20: Halogen Exchange & Physical Properties
    add(ch, "Swarts Fluorination Reaction",
        "Which of the following reagents is specifically employed in the Swarts reaction to synthesize alkyl fluorides from alkyl chlorides or bromides?",
        [
            "Heavy metallic fluorides such as $AgF$, $Hg_2F_2$, $CoF_2$, or $SbF_3$",
            "Aqueous hydrofluoric acid ($HF$) in concentrated sulfuric acid",
            "Elemental fluorine ($F_2$) dissolved in carbon tetrachloride",
            "Sodium fluoride ($NaF$) in aqueous ethanol"
        ],
        "A",
        "The Swarts reaction is the standard method for preparing alkyl fluorides by heating an alkyl chloride or bromide with metallic fluorides such as $AgF$, $Hg_2F_2$, $CoF_2$, or $SbF_3$: $R-Br + AgF \\rightarrow R-F + AgBr\\downarrow$."
    )

    add(ch, "Boiling Point Trend with Halogen Size",
        "For a given alkyl group $R$, which of the following represents the correct decreasing order of boiling points among haloalkanes?",
        [
            "$R-I > R-Br > R-Cl > R-F$",
            "$R-F > R-Cl > R-Br > R-I$",
            "$R-Cl > R-Br > R-I > R-F$",
            "$R-I > R-F > R-Br > R-Cl$"
        ],
        "A",
        "As the size and mass of the halogen atom increase from fluorine to iodine, the magnitude of van der Waals (London dispersion) forces increases due to increased polarizability and molecular weight. Consequently, for a given alkyl group, the boiling point decreases in the order: $R-I > R-Br > R-Cl > R-F$."
    )

    add(ch, "Boiling Points of Isomeric Haloalkanes",
        "Among the isomeric butyl chlorides (1-chlorobutane, 2-chlorobutane, and 2-chloro-2-methylpropane), what is the correct trend of boiling points?",
        [
            "1-Chlorobutane > 2-Chlorobutane > 2-Chloro-2-methylpropane",
            "2-Chloro-2-methylpropane > 2-Chlorobutane > 1-Chlorobutane",
            "2-Chlorobutane > 1-Chlorobutane > 2-Chloro-2-methylpropane",
            "All three isomers have identical boiling points because their molecular formulas are the same"
        ],
        "A",
        "For isomeric alkyl halides, the boiling point decreases with increasing branching of the carbon chain. Branching makes the molecule more spherical, decreasing its surface area and weakening intermolecular van der Waals forces. Hence, straight-chain 1-chlorobutane ($351.5\\text{ K}$) > 2-chlorobutane ($341\\text{ K}$) > spherical 2-chloro-2-methylpropane ($324\\text{ K}$)."
    )

    add(ch, "Dipole Moments of Chloromethane vs Fluoromethane",
        "Why does chloromethane ($CH_3Cl$) possess a higher dipole moment ($1.860\\text{ D}$) than fluoromethane ($CH_3F$, $1.847\\text{ D}$), despite fluorine being more electronegative than chlorine?",
        [
            "The $C-Cl$ bond length is significantly longer than the $C-F$ bond length, outweighing the electronegativity difference in dipole moment ($\\mu = q \\times d$)",
            "Chlorine has vacant 3d orbitals that donate electrons back to carbon",
            "Fluoromethane undergoes dimerization through hydrogen bonding, canceling its dipole moment",
            "The carbon atom in fluoromethane is $sp^2$ hybridized, reducing charge separation"
        ],
        "A",
        "Dipole moment is the product of charge separation ($q$) and bond distance ($d$): $\\mu = q \\times d$. Although the $C-F$ bond is more polar due to the greater electronegativity of fluorine, the $C-Cl$ bond distance ($177.8\\text{ pm}$) is significantly longer than the $C-F$ bond distance ($138.5\\text{ pm}$). The greater distance more than compensates for the smaller charge difference, giving $CH_3Cl$ a higher dipole moment."
    )

    add(ch, "Melting Points of Dichlorobenzene Isomers Lattice Symmetry",
        "What structural characteristic accounts for para-dichlorobenzene having a significantly higher melting point than its ortho and meta isomers?",
        [
            "Its symmetrical molecular shape fits much more compactly into the crystal lattice",
            "It forms strong intermolecular hydrogen bonds in the solid state",
            "Its net dipole moment is much larger than that of ortho-dichlorobenzene",
            "It possesses an odd number of chlorine atoms per unit cell"
        ],
        "A",
        "The para-isomer is symmetrical and compact, allowing it to pack much more uniformly and tightly into the crystal lattice than the unsymmetrical ortho- or meta-isomers. Greater lattice packing energy requires higher thermal energy to disrupt, leading to a much higher melting point ($325\\text{ K}$ for para vs $256\\text{ K}$ for ortho and $249\\text{ K}$ for meta)."
    )

    # 21-33: Nucleophilic Substitution Mechanisms (SN1 & SN2)
    add(ch, "SN2 Mechanism Transition State Structure",
        "Which of the following statements accurately characterizes the transition state of an $S_N2$ reaction of an alkyl halide?",
        [
            "The central carbon atom is bonded to both the incoming nucleophile and the departing leaving group with a pentacoordinate, planar $sp^2$-like arrangement",
            "A stable planar carbocation intermediate is formed after complete departure of the leaving group",
            "A cyclic three-membered bromonium ion intermediate is formed with retention of configuration",
            "A radical pair intermediate is formed within an electrostatic solvent cage"
        ],
        "A",
        "The $S_N2$ reaction is a concerted one-step mechanism that proceeds through a single transition state. In this transition state, the incoming nucleophile attacks from the side opposite to the leaving group. The central carbon is partially bonded to five groups simultaneously, with the three non-reacting groups lying in a nearly planar $sp^2$ arrangement."
    )

    add(ch, "Stereochemical Outcome of SN2 Inversion",
        "What specific stereochemical transformation occurs during the bimolecular nucleophilic substitution ($S_N2$) of an optically active haloalkane?",
        [
            "Complete inversion of configuration (Walden inversion)",
            "Complete retention of configuration with zero change in optical rotation",
            "Equimolar racemization yielding an optically inactive mixture",
            "Loss of optical activity due to internal meso compensation"
        ],
        "A",
        "Because the nucleophile in an $S_N2$ pathway attacks the carbon atom from the rear side (opposite to the leaving halide ion) to minimize electrostatic and steric repulsion, the configuration of the chiral center is inverted like an umbrella blown inside out. This phenomenon is known as Walden inversion."
    )

    add(ch, "SN2 Reactivity Order and Steric Hindrance",
        "What is the correct order of reactivity of alkyl halides toward bimolecular nucleophilic substitution ($S_N2$)?",
        [
            "Methyl halide > Primary ($1^\\circ$) > Secondary ($2^\\circ$) > Tertiary ($3^\\circ$)",
            "Tertiary ($3^\\circ$) > Secondary ($2^\\circ$) > Primary ($1^\\circ$) > Methyl halide",
            "Secondary ($2^\\circ$) > Tertiary ($3^\\circ$) > Primary ($1^\\circ$) > Methyl halide",
            "Tertiary ($3^\\circ$) > Methyl halide > Primary ($1^\\circ$) > Secondary ($2^\\circ$)"
        ],
        "A",
        "In $S_N2$ substitution, the nucleophile must approach the backside of the carbon bearing the halogen. Increasing alkyl substitution at this carbon introduces steric hindrance that crowds the transition state and raises the activation energy. Thus, reactivity decreases in the order: $CH_3X > 1^\\circ > 2^\\circ > 3^\\circ$."
    )

    add(ch, "Polar Aprotic Solvent Effect on SN2",
        "Why do polar aprotic solvents (e.g., DMSO, DMF, acetone) dramatically accelerate $S_N2$ nucleophilic substitutions compared to polar protic solvents?",
        [
            "Polar aprotic solvents solvate metal cations strongly but leave nucleophilic anions bare and highly reactive",
            "Polar aprotic solvents protonate the leaving group to make it a better leaving group",
            "Polar aprotic solvents stabilize carbocation intermediates by dipole-dipole interactions",
            "Polar aprotic solvents reduce the polarity of the carbon-halogen bond to promote homolysis"
        ],
        "A",
        "Polar protic solvents (like water or ethanol) form strong hydrogen bonds with nucleophilic anions, surrounding them in a solvent shell that lowers their nucleophilicity. In contrast, polar aprotic solvents (like DMSO or DMF) solvate cations efficiently through negative dipoles but cannot hydrogen-bond with anions. The 'naked' anions remain at high energy and react much faster in $S_N2$ reactions."
    )

    add(ch, "SN1 Kinetics and Rate Law",
        "For the nucleophilic substitution reaction $(CH_3)_3C-Br + OH^- \\rightarrow (CH_3)_3C-OH + Br^-$, the rate law is observed to be $\\text{Rate} = k[(CH_3)_3C-Br]$. This indicates that the reaction is:",
        [
            "Unimolecular nucleophilic substitution ($S_N1$) where nucleophilic attack occurs after the slow rate-determining ionization",
            "Bimolecular substitution ($S_N2$) with pseudo-first-order kinetics",
            "A concerted pericyclic substitution independent of temperature",
            "Electrophilic aromatic substitution involving a transient phenonium ion"
        ],
        "A",
        "The rate of reaction depends only on the concentration of the alkyl halide and is independent of the concentration of the nucleophile. This first-order kinetics confirms an $S_N1$ mechanism, in which the slow, rate-determining step is the heterolytic cleavage of the $C-Br$ bond to form a carbocation intermediate."
    )

    add(ch, "SN1 Reactivity Order and Carbocation Stability",
        "What is the primary factor dictating the reactivity order of alkyl halides in $S_N1$ substitution reactions ($3^\\circ > 2^\\circ > 1^\\circ > CH_3X$)?",
        [
            "The thermodynamic stability of the intermediate carbocation formed in the rate-determining step",
            "The steric accessibility of the leaving group to frontside attack",
            "The bond polarity of the carbon-halogen bond in the ground state",
            "The coordination number of the solvent cage around the nucleophile"
        ],
        "A",
        "In an $S_N1$ reaction, the rate-determining step is the formation of a carbocation intermediate. The greater the stability of this carbocation (tertiary > secondary > primary > methyl, due to inductive effects and hyperconjugation), the lower the activation energy for its formation, and the faster the reaction proceeds."
    )

    add(ch, "Stereochemical Outcome of SN1 Solvolysis",
        "When an optically pure enantiomer of a chiral alkyl halide undergoes hydrolysis exclusively via the $S_N1$ pathway, the product mixture typically exhibits:",
        [
            "Racemization with slight net inversion of configuration",
            "100% retention of configuration with zero optical rotation loss",
            "100% inversion of configuration identical to $S_N2$",
            "Formation of an optically inactive meso diastereomer"
        ],
        "A",
        "In $S_N1$, the planar ($sp^2$-hybridized) carbocation intermediate can be attacked by the nucleophile with equal probability from either face, theoretically resulting in complete racemization (50% retention, 50% inversion). In practice, because the departed leaving group shields the front side momentarily (intimate ion pair), attack from the rear face is slightly favored, giving partial racemization with an excess of inversion."
    )

    add(ch, "Reactivity of Allylic and Benzylic Halides in Substitution",
        "Why do allylic and benzylic halides show exceptionally high reactivity toward both $S_N1$ and $S_N2$ nucleophilic substitutions?",
        [
            "Their carbocations are resonance-stabilized (favoring $S_N1$), and their transition states are stabilized by orbital overlap with adjacent $\\pi$ bonds (favoring $S_N2$)",
            "The carbon-halogen bond in these halides is pure ionic and dissociates spontaneously in any solvent",
            "They undergo rapid aromatic ring cleavage to form linear polyenes",
            "They do not undergo substitution but only polymerization at room temperature"
        ],
        "A",
        "Allylic and benzylic halides react rapidly in $S_N1$ because the intermediate allyl ($CH_2=CH-\\overset{+}{C}H_2$) and benzyl ($C_6H_5-\\overset{+}{C}H_2$) carbocations are stabilized by resonance delocalization of positive charge. They also react rapidly in $S_N2$ because the adjacent $\\pi$ system provides electronic stabilization to the incoming nucleophile's developing orbital in the transition state."
    )

    add(ch, "Leaving Group Ability of Halide Ions",
        "Which of the following represents the correct decreasing order of leaving group ability among halide ions in nucleophilic substitution reactions?",
        [
            "$I^- > Br^- > Cl^- > F^-$",
            "$F^- > Cl^- > Br^- > I^-$",
            "$Cl^- > Br^- > I^- > F^-$",
            "$Br^- > I^- > Cl^- > F^-$"
        ],
        "A",
        "Leaving group ability is directly related to the stability of the departing anion as a weak base. The iodide ion ($I^-$) is the largest, least basic, and most stable anion, and the $C-I$ bond is the weakest ($234\\text{ kJ/mol}$). Consequently, iodide is the best leaving group: $I^- > Br^- > Cl^- > F^-$."
    )

    add(ch, "Chiral Centers in Haloalkanes",
        "Which of the following haloalkanes contains an asymmetric (chiral) carbon atom?",
        [
            "2-Bromobutane",
            "1-Bromobutane",
            "2-Bromopropane",
            "1-Bromo-2-methylpropane"
        ],
        "A",
        "A carbon atom bonded to four different atoms or groups is an asymmetric or chiral carbon. In 2-bromobutane ($CH_3-\\overset{\\ast}{C}H(Br)-CH_2CH_3$), C2 is bonded to: $-H$, $-Br$, $-CH_3$, and $-CH_2CH_3$. Since all four groups are different, C2 is chiral. In 1-bromobutane, 2-bromopropane, and 1-bromo-2-methylpropane, no carbon is bonded to four distinct groups."
    )

    add(ch, "Optical Inactivity of Racemic Mixtures",
        "Why is an equimolar mixture of two enantiomers (a racemic modification, $d,l$ or $\\pm$) optically inactive?",
        [
            "The optical rotation caused by molecules of one enantiomer is exactly canceled by the equal and opposite rotation of the other enantiomer (external compensation)",
            "The two enantiomers react chemically with each other to produce an achiral dimer",
            "The plane-polarized light is completely absorbed by the solvent molecules",
            "The two enantiomers possess internal planes of symmetry that cancel optical activity (internal compensation)"
        ],
        "A",
        "A racemic mixture contains equal amounts of dextrorotatory ($+$) and laevorotatory ($-$) enantiomers. The rotation caused by molecules of one isomer is exactly cancelled by an equal and opposite rotation caused by molecules of the other isomer. This mutual cancellation is called external compensation."
    )

    add(ch, "Role of Polar Protic Solvents in SN1",
        "Why are polar protic solvents such as water, methanol, or acetic acid particularly effective in promoting $S_N1$ reactions?",
        [
            "They facilitate the rate-determining heterolytic bond cleavage by solvating and stabilizing both the developing carbocation and the leaving halide anion",
            "They directly attack the alkyl halide from the front side to push out the halogen",
            "They convert the substrate into a volatile alkene prior to substitution",
            "They neutralize the halide ion to form insoluble elemental halogens"
        ],
        "A",
        "In the $S_N1$ mechanism, the rate-determining step requires ionization of the $C-X$ bond into a carbocation and a halide ion. Polar protic solvents possess high dielectric constants and hydrogen-bonding capabilities: their partially negative oxygen atoms solvate the carbocation, while their partially positive protons solvate the leaving halide ion through hydrogen bonds, lowering the activation energy for ionization."
    )

    add(ch, "Retention vs Inversion in Stereochemistry",
        "If an asymmetric chemical transformation at a chiral center proceeds such that the relative spatial arrangement of the remaining bonds is preserved without inversion, the process is termed:",
        [
            "Retention of configuration",
            "Racemization",
            "Walden inversion",
            "Enantiomeric resolution"
        ],
        "A",
        "Retention of configuration is the preservation of the spatial arrangement of bonds to an asymmetric center during a chemical reaction. If the reaction breaks no bonds to the stereocenter (or if double inversion occurs), the spatial orientation remains intact, corresponding to retention of configuration."
    )

    # 34-37: Ambident Nucleophiles
    add(ch, "Ambident Nucleophile Definition and Characteristics",
        "What defines an ambident nucleophile in organic reaction mechanisms?",
        [
            "A nucleophile possessing two different electron-rich donor atoms through either of which it can form a covalent bond",
            "A reagent that functions simultaneously as a nucleophile and an electrophile in the same elementary step",
            "A neutral species capable of displacing both halogens and alkyl groups in a single turnover",
            "An electrophile that contains two distinct leaving groups"
        ],
        "A",
        "Nucleophiles that possess two different electron-rich donor atoms through which they can attack an electrophilic center are known as ambident nucleophiles. Examples include cyanide ion ($:C\\equiv N:^-$) which can coordinate through carbon or nitrogen, and nitrite ion ($[O-N=O]^-$) which can coordinate through nitrogen or oxygen."
    )

    add(ch, "Ambident Cyanide: KCN vs AgCN",
        "When an alkyl halide is treated with alcoholic potassium cyanide ($KCN$), an alkyl cyanide is the major product, whereas treatment with silver cyanide ($AgCN$) yields an alkyl isocyanide. Why?",
        [
            "$KCN$ is predominantly ionic and carbon-carbon bonding is thermodynamically more stable than carbon-nitrogen bonding, whereas $AgCN$ is largely covalent so only the nitrogen lone pair is available for attack",
            "$AgCN$ decomposes the alkyl halide into a free radical that attacks the nitrogen atom",
            "$KCN$ forms a pentacoordinate silver complex that shields nitrogen from attack",
            "Potassium cyanide is insoluble in alcohol, forcing reaction at the liquid-solid boundary"
        ],
        "A",
        "$KCN$ is predominantly ionic: $K^+ [:C\\equiv N:]^-$. Both C and N can donate electrons, but the $C-C$ bond is much stronger and thermodynamically more stable than the $C-N$ bond, so alkyl cyanides (nitriles) form predominantly. In contrast, $AgCN$ is largely covalent ($Ag-C\\equiv N$). The carbon is not free, leaving only the nitrogen lone pair available for nucleophilic attack, leading to alkyl isocyanides (isonitriles)."
    )

    add(ch, "Ambident Nitrite: KNO2 vs AgNO2",
        "Reaction of haloalkanes with potassium nitrite ($KNO_2$) predominantly yields alkyl nitrites ($R-ONO$), while reaction with silver nitrite ($AgNO_2$) predominantly yields nitroalkanes ($R-NO_2$). What explains this difference?",
        [
            "$KNO_2$ is ionic so attack occurs primarily through the electronegative oxygen atom bearing negative charge, whereas $AgNO_2$ is covalent so attack occurs through the nitrogen lone pair",
            "$AgNO_2$ acts as an oxidizing agent that inserts oxygen into the $C-C$ bond",
            "Potassium nitrite forms a sterically hindered cyclic intermediate that blocks nitrogen",
            "Silver nitrite dissolves only in nonpolar solvents that prevent oxygen bonding"
        ],
        "A",
        "Potassium nitrite is an ionic compound ($K^+ [O-N=O]^-$). The negative charge resides on oxygen, and the $C-O$ linkage forms easily, giving alkyl nitrite ($R-O-N=O$). In contrast, silver nitrite ($Ag-O-N=O$) is predominantly covalent; the nitrogen lone pair is more nucleophilic than the bonded oxygen, attacking the carbon to form a nitroalkane ($R-NO_2$)."
    )

    add(ch, "Ammonolysis Reaction Selectivity",
        "When ethyl chloride is heated with a large excess of alcoholic ammonia in a sealed tube at $373\\text{ K}$, what is the predominant amine product formed?",
        [
            "Ethylamine (primary amine)",
            "Diethylamine (secondary amine)",
            "Triethylamine (tertiary amine)",
            "Tetraethylammonium chloride (quaternary salt)"
        ],
        "A",
        "When an excess of ammonia is used, the probability of an alkyl halide molecule colliding with $NH_3$ is vastly greater than colliding with the newly formed primary amine. Thus, ethylamine ($CH_3CH_2NH_2$) is obtained as the predominant product. If alkyl halide were in excess, further alkylation would produce a mixture of $2^\\circ, 3^\\circ$ amines and quaternary ammonium salts."
    )

    # 38-42: Elimination vs Substitution & Saytzeff Rule
    add(ch, "Dehydrohalogenation Regiochemistry: Saytzeff Rule",
        "When 2-bromobutane is heated with alcoholic potassium hydroxide ($KOH$), the predominant elimination product is:",
        [
            "But-2-ene (major product)",
            "But-1-ene (major product)",
            "But-1-yne",
            "Butane"
        ],
        "A",
        "According to Saytzeff's (Zaitsev's) rule, in dehydrohalogenation reactions, the preferred product is the alkene that has the greater number of alkyl groups attached to the doubly bonded carbon atoms (the more substituted and stable alkene). Elimination from 2-bromobutane can remove a proton from C1 or C3; removing from C3 gives the more substituted but-2-ene (~81% major product)."
    )

    add(ch, "Alcoholic KOH vs Aqueous KOH Role",
        "Why does aqueous potassium hydroxide ($KOH$) promote substitution to give alcohols, whereas alcoholic potassium hydroxide ($KOH$) promotes $\\beta$-elimination to give alkenes?",
        [
            "In alcohol, the ethoxide/alkoxide ion formed is a stronger base and less solvated than the heavily hydrated hydroxide ion in water",
            "Aqueous $KOH$ is an acidic reagent that prevents proton abstraction",
            "Alcoholic $KOH$ acts as an electrophilic reducing agent",
            "Water converts the alkyl halide into a carboxylic acid before substitution"
        ],
        "A",
        "In aqueous solution, hydroxide ions ($OH^-$) are heavily hydrated, which diminishes their basicity and favors nucleophilic substitution ($S_N$). In alcoholic solution (e.g., $KOH$ in ethanol), alkoxide ions ($C_2H_5O^-$) are formed. Alkoxide ions are much stronger bases and less solvated than hydrated hydroxide ions, favoring abstraction of a $\\beta$-hydrogen and promoting elimination ($E2$) over substitution."
    )

    add(ch, "Elimination Favored by Bulky Strong Bases",
        "When 2-bromopropane is treated with potassium tert-butoxide ($KOC(CH_3)_3$), the predominant product formed is propene rather than tert-butyl isopropyl ether. Why?",
        [
            "The tert-butoxide ion is sterically bulky, hindering backside nucleophilic attack on carbon and favoring abstraction of an accessible $\\beta$-proton",
            "Potassium tert-butoxide is an extremely weak base that cannot displace bromide",
            "The isopropyl group undergoes rapid free-radical halogenation instead of substitution",
            "tert-Butoxide ion selectively cleaves the carbon-carbon single bond of the substrate"
        ],
        "A",
        "Potassium tert-butoxide is a sterically hindered, bulky base. Its bulky methyl groups prevent it from easily approaching the electrophilic carbon to carry out an $S_N2$ displacement. Instead, it readily abstracts an exposed peripheral $\\beta$-hydrogen, steering the reaction exclusively toward $E2$ $\\beta$-elimination to form propene."
    )

    add(ch, "Temperature Effect on Elimination vs Substitution",
        "How does increasing the reaction temperature generally influence the competition between elimination ($E$) and substitution ($S_N$) for an alkyl halide?",
        [
            "Higher temperatures favor elimination because elimination reactions involve cleavage of two bonds and have higher activation energies (larger $\\Delta S^\\ddagger$)",
            "Higher temperatures favor substitution because nucleophiles move faster",
            "Temperature has zero effect on the branching ratio between $E$ and $S_N$",
            "Higher temperatures exclusively convert alkyl halides into free radicals without reaction"
        ],
        "A",
        "Elimination reactions involve breaking two bonds (a $C-H$ and a $C-X$ bond) and producing three species from two, meaning they have higher activation energies ($E_a$) and a more positive entropy of activation ($\\Delta S^\\ddagger > 0$) than substitution reactions. Therefore, according to the Arrhenius equation and $\\Delta G^\\ddagger = \\Delta H^\\ddagger - T\\Delta S^\\ddagger$, higher temperatures strongly favor elimination over substitution."
    )

    # 43-47: Reaction with Metals
    add(ch, "Grignard Reagent Preparation and Anhydrous Requirement",
        "In the preparation of a Grignard reagent ($R-Mg-X$), why must diethyl ether or THF solvent be strictly anhydrous (dry)?",
        [
            "Grignard reagents are extremely strong bases and react instantly with traces of water to form alkanes ($R-MgX + H_2O \\rightarrow R-H + Mg(OH)X$)",
            "Traces of water cause magnesium metal to dissolve as an insoluble oxide coating that ignites ether",
            "Water reacts with alkyl halides to form non-reactive quaternary ether complexes",
            "Water oxidizes magnesium into elemental manganese"
        ],
        "A",
        "The carbon-magnesium bond in a Grignard reagent is highly polar covalent with a strong carbanionic character ($R^{\\delta-}-Mg^{\\delta+}X$). Grignard reagents are powerful bases that react instantaneously with any source of active protons, such as water, alcohols, or amines, to produce the corresponding alkane: $RMgX + H_2O \\rightarrow RH + Mg(OH)X$. Hence, anhydrous conditions are essential."
    )

    add(ch, "Freons Synthesis and Environmental Impact",
        "What is Freon-12 ($CCl_2F_2$), and what major environmental threat does its atmospheric release pose?",
        [
            "Dichlorodifluoromethane manufactured from $CCl_4$ via Swarts reaction; it releases chlorine free radicals in the stratosphere that catalytically deplete ozone",
            "Trichlorofluoromethane; it forms dense ground-level acid rain clouds by reacting with sulfur dioxide",
            "Tetrafluoroethane; it causes rapid soil salinization upon deposition",
            "Dichloromethane; it oxidizes atmospheric nitrogen to form poisonous nitrous oxide"
        ],
        "A",
        "Freon-12 ($CCl_2F_2$, dichlorodifluoromethane) is manufactured industrially by treating $CCl_4$ with $SbF_3$ in the presence of $SbCl_5$ catalyst (Swarts reaction). CFCs are extremely stable and diffuse into the stratosphere, where UV radiation causes homolytic fission to generate reactive chlorine radicals ($Cl^\\bullet$). These radicals catalyze the destruction of ozone molecules into dioxygen, causing ozone layer depletion."
    )

    add(ch, "Wurtz Reaction Coupling Limitations",
        "Why is the Wurtz reaction ($2R-X + 2Na \\xrightarrow{\\text{dry ether}} R-R + 2NaX$) generally NOT suitable for preparing unsymmetrical alkanes containing an odd number of carbon atoms?",
        [
            "A mixture of two different alkyl halides ($R-X$ and $R'-X$) yields a complex mixture of three different alkanes ($R-R, R-R', R'-R$) with close boiling points that are difficult to separate",
            "Unsymmetrical alkanes undergo spontaneous combustion in the presence of sodium metal",
            "The reaction with two different halides halts after forming sodium halide without alkane formation",
            "Sodium metal can only accept electrons from symmetrical carbon skeletons"
        ],
        "A",
        "When two different alkyl halides (e.g. $CH_3Br$ and $C_2H_5Br$) are reacted with sodium, three different coupling products are obtained ($CH_3-CH_3$, $CH_3-C_2H_5$, and $C_2H_5-C_2H_5$) along with alkene side-products. Because their boiling points are very close, separating the desired unsymmetrical alkane in pure form and good yield is virtually impossible."
    )

    add(ch, "Wurtz-Fittig Alkylarene Synthesis",
        "What organic product is formed when an equimolar mixture of bromobenzene and bromomethane is treated with sodium metal in dry ether?",
        [
            "Toluene (methylbenzene)",
            "Biphenyl (diphenyl)",
            "Ethane",
            "Chlorobenzene"
        ],
        "A",
        "The reaction of a mixture of an aryl halide and an alkyl halide with sodium metal in dry ether is called the Wurtz-Fittig reaction: $C_6H_5Br + 2Na + CH_3Br \\xrightarrow{\\text{dry ether}} C_6H_5-CH_3 + 2NaBr$. The cross-coupling product formed is toluene."
    )

    add(ch, "Fittig Biaryl Synthesis",
        "The Fittig reaction involves treating an aryl halide with sodium metal in dry ether. What is the primary product formed when chlorobenzene undergoes this reaction?",
        [
            "Diphenyl (biphenyl)",
            "Toluene",
            "Benzene",
            "Phenol"
        ],
        "A",
        "When aryl halides are treated with sodium in dry ether, two aryl groups couple together to form a diaryl compound. This is known as the Fittig reaction: $2C_6H_5Cl + 2Na \\xrightarrow{\\text{dry ether}} C_6H_5-C_6H_5 + 2NaCl$. The product is diphenyl (biphenyl)."
    )

    # 48-54: Haloarenes Nucleophilic Substitution Resistance & Dow Process
    add(ch, "Haloarene Inertness: Partial Double Bond Resonance",
        "Why do haloarenes exhibit markedly lower reactivity toward nucleophilic substitution compared to haloalkanes?",
        [
            "Resonance delocalization of halogen lone pair electrons imparts partial double-bond character to the $C-X$ bond, making it stronger and harder to cleave",
            "The benzene ring carries a permanent net positive charge that repels nucleophiles",
            "The halogen atom in haloarenes cannot act as a leaving group because it has no lone pairs",
            "The carbon atom bonded to halogen in haloarenes is $sp^3$ hybridized"
        ],
        "A",
        "In haloarenes, the lone pairs on the halogen atom are in resonance with the $\\pi$-electrons of the benzene ring. This delocalization imparts partial double-bond character to the carbon-halogen bond (bond length in chlorobenzene is $169\\text{ pm}$ vs $178\\text{ pm}$ in chloroalkane). Cleaving a bond with partial double-bond character requires significantly more energy than cleaving a single bond."
    )

    add(ch, "Haloarene Inertness: sp2 Hybridization of Carbon",
        "How does the hybridization of the carbon atom bonded to the halogen atom contribute to the low reactivity of haloarenes toward nucleophiles?",
        [
            "The carbon is $sp^2$ hybridized with greater s-character, holding the halogen electron pair more tightly and creating a shorter, stronger bond than an $sp^3$ carbon",
            "The carbon is $sp$ hybridized and undergoes instant linear nucleophilic addition",
            "The $sp^2$ orbital has lower electronegativity, making the carbon less electrophilic than an $sp^3$ carbon",
            "The carbon is $dsp^2$ hybridized and forms planar coordinate bonds with halogens"
        ],
        "A",
        "In haloarenes, the halogen is attached to an $sp^2$-hybridized carbon (33% s-character), whereas in haloalkanes it is attached to an $sp^3$-hybridized carbon (25% s-character). An $sp^2$ carbon is more electronegative and holds the shared electron pair of the $C-X$ bond more tightly, resulting in a shorter ($169\\text{ pm}$ vs $178\\text{ pm}$), stronger, and less easily cleaved bond."
    )

    add(ch, "Haloarene Inertness: Instability of Phenyl Cation",
        "Why is the unimolecular nucleophilic substitution ($S_N1$) pathway completely ruled out for haloarenes?",
        [
            "Self-ionization would generate a phenyl cation ($C_6H_5^+$), whose positive charge resides in an $sp^2$ orbital perpendicular to the ring $\\pi$-system and cannot be resonance-stabilized",
            "The phenyl cation is so stable that it never reacts with incoming nucleophiles",
            "Aryl halides do not dissolve in any polar protic solvents required for $S_N1$",
            "The halogen atom in haloarenes cannot bear a negative charge in solution"
        ],
        "A",
        "In an $S_N1$ mechanism, the carbon-halogen bond must cleave heterolytically to yield a carbocation. For chlorobenzene, this would produce a phenyl cation ($C_6H_5^+$). In the phenyl cation, the empty $sp^2$ orbital is orthogonal to the $\\pi$-cloud of the benzene ring, making resonance stabilization impossible. The phenyl cation is extremely unstable, preventing $S_N1$."
    )

    add(ch, "Haloarene Inertness: Pi-Cloud Electrostatic Repulsion",
        "How does the $\\pi$-electron cloud of the aromatic ring in haloarenes affect the approach of an incoming nucleophile?",
        [
            "The electron-rich $\\pi$-electron cloud of the benzene ring repels the electron-rich incoming nucleophile",
            "The $\\pi$-electrons pull the nucleophile into the center of the ring to form a benzyne",
            "The $\\pi$-electrons protonate the nucleophile into an unreactive neutral molecule",
            "The aromatic $\\pi$-system donates electrons to the nucleophile, reversing its polarity"
        ],
        "A",
        "Because of the possible repulsion, it is less likely for an electron-rich nucleophile to approach an electron-rich aromatic ring. The cloud of delocalized $\\pi$-electrons creates an electrostatic barrier that repels incoming nucleophiles."
    )

    add(ch, "Industrial Dow Process Conditions",
        "Under what specific conditions does chlorobenzene undergo nucleophilic substitution with sodium hydroxide (Dow process) to yield phenol upon acidification?",
        [
            "Aqueous $NaOH$ at $623\\text{ K}$ and $300\\text{ atm}$ pressure",
            "Aqueous $NaOH$ at room temperature ($298\\text{ K}$) and $1\\text{ atm}$",
            "Alcoholic $KOH$ at $373\\text{ K}$ with UV light irradiation",
            "Solid $NaOH$ at $100\\text{ K}$ in liquid ammonia"
        ],
        "A",
        "Because chlorobenzene is extremely unreactive toward nucleophilic substitution, the displacement of chlorine by hydroxide requires drastic conditions: heating with aqueous $NaOH$ at $623\\text{ K}$ under $300\\text{ atm}$ pressure to form sodium phenoxide, which upon acidification with dilute $HCl$ gives phenol."
    )

    add(ch, "Nitro Group Activation in Nucleophilic Aromatic Substitution",
        "Why does the presence of an electron-withdrawing nitro group ($-NO_2$) at the ortho or para positions dramatically facilitate nucleophilic substitution in chlorobenzene?",
        [
            "The $-NO_2$ group withdraws electron density via both $-I$ and $-R$ effects, directly stabilizing the negative charge on the carbanion (Meisenheimer intermediate) formed during nucleophilic attack",
            "The $-NO_2$ group releases electrons by resonance to weaken the carbon-chlorine bond",
            "The nitro group donates oxygen atoms to convert chlorobenzene into nitrobenzene",
            "The nitro group sterically blocks the ortho positions, forcing nucleophilic substitution at the chlorine atom"
        ],
        "A",
        "Nucleophilic aromatic substitution ($S_NAr$) proceeds via addition of the nucleophile to form a resonance-stabilized carbanionic Meisenheimer intermediate. When the $-NO_2$ group is at the ortho or para positions, the negative charge is delocalized directly onto the electronegative oxygen atoms of the nitro group, providing strong resonance stabilization. This lowers the activation energy."
    )

    add(ch, "Reactivity Trend of Poly-Nitrochlorobenzenes",
        "Arrange the following compounds in order of increasing ease of nucleophilic substitution by aqueous $NaOH$:\n(I) Chlorobenzene, (II) 4-Nitrochlorobenzene, (III) 2,4-Dinitrochlorobenzene, (IV) 2,4,6-Trinitrochlorobenzene (picryl chloride)",
        [
            "I < II < III < IV",
            "IV < III < II < I",
            "II < I < III < IV",
            "I < III < II < IV"
        ],
        "A",
        "As the number of electron-withdrawing nitro groups at ortho and para positions increases, the Meisenheimer carbanion intermediate becomes progressively more stabilized: Chlorobenzene requires $623\\text{ K}, 300\\text{ atm}$; 4-nitrochlorobenzene requires $443\\text{ K}$; 2,4-dinitrochlorobenzene requires $368\\text{ K}$; and 2,4,6-trinitrochlorobenzene (picryl chloride) hydrolyzes simply upon warming with warm water. Thus: I < II < III < IV."
    )

    add(ch, "Lack of Activation by Meta-Nitro Group",
        "Why does an electron-withdrawing nitro group ($-NO_2$) at the meta position have virtually no activating effect on nucleophilic substitution of chlorobenzene?",
        [
            "The negative charge generated in the intermediate carbanion never resides on the meta carbon bearing the nitro group, preventing resonance stabilization by $-R$",
            "The meta-nitro group donates electron density through resonance to the ring",
            "The nitro group at the meta position undergoes nucleophilic displacement instead of the chlorine",
            "The meta-nitro group forms an intramolecular five-membered ring that locks the chlorine atom"
        ],
        "A",
        "When a nucleophile attacks the carbon bearing the halogen, the negative charge in the resulting carbanion is delocalized only over the ortho and para carbons of the ring. It is never placed on the carbon atom bearing the meta-nitro group. Therefore, the strong $-R$ resonance electron-withdrawing stabilization of the nitro group cannot be utilized, showing only a weak inductive ($-I$) effect."
    )

    # 55-59: Electrophilic Aromatic Substitution of Haloarenes
    add(ch, "Dual Directing and Deactivating Nature of Halogens",
        "Why are halogens in haloarenes ortho-para directing yet moderately deactivating toward electrophilic aromatic substitution?",
        [
            "The strong electron-withdrawing inductive ($-I$) effect deactivates the ring by decreasing electron density, while the resonance ($+R$) effect delocalizes lone pairs specifically to the ortho and para positions",
            "The inductive effect donates electrons, whereas the resonance effect withdraws electrons",
            "Halogens only deactivate the meta position, leaving ortho and para unaffected",
            "Halogens act exclusively as Lewis acids that abstract electrophiles from the ortho and para positions"
        ],
        "A",
        "Halogens withdraw electrons through a strong inductive ($-I$) effect because of their high electronegativity, which decreases overall electron density on the benzene ring and makes electrophilic substitution slower than on benzene (deactivating). However, their resonance ($+R$) donation of lone pairs stabilizes the arenium ion intermediate selectively when electrophilic attack occurs at the ortho and para positions, making them ortho-para directing."
    )

    add(ch, "Electrophilic Chlorination of Chlorobenzene",
        "When chlorobenzene is treated with chlorine in the presence of anhydrous $FeCl_3$, what is the major organic product?",
        [
            "1,4-Dichlorobenzene (p-dichlorobenzene)",
            "1,2-Dichlorobenzene (o-dichlorobenzene)",
            "1,3-Dichlorobenzene (m-dichlorobenzene)",
            "Hexachlorobenzene"
        ],
        "A",
        "Electrophilic chlorination of chlorobenzene yields a mixture of ortho- and para-dichlorobenzene. The para isomer, 1,4-dichlorobenzene, is the major product because it experiences less steric repulsion between the two chlorine atoms compared to the 1,2-dichlorobenzene (ortho) isomer."
    )

    add(ch, "Nitration of Chlorobenzene Regiochemistry",
        "What is the major product formed when chlorobenzene is heated with a nitrating mixture of concentrated $HNO_3$ and concentrated $H_2SO_4$?",
        [
            "1-Chloro-4-nitrobenzene",
            "1-Chloro-2-nitrobenzene",
            "1-Chloro-3-nitrobenzene",
            "2,4,6-Trinitrochlorobenzene"
        ],
        "A",
        "Nitration of chlorobenzene gives 1-chloro-2-nitrobenzene (ortho) and 1-chloro-4-nitrobenzene (para). The para isomer (1-chloro-4-nitrobenzene) is the major product due to minimal steric hindrance between the chloro and nitro groups."
    )

    add(ch, "Sulfonation of Chlorobenzene Regiochemistry",
        "Heating chlorobenzene with concentrated sulfuric acid ($H_2SO_4$) results in the formation of which major product?",
        [
            "4-Chlorobenzenesulfonic acid",
            "2-Chlorobenzenesulfonic acid",
            "3-Chlorobenzenesulfonic acid",
            "Benzenesulfonic acid"
        ],
        "A",
        "Sulfonation of chlorobenzene by electrophilic substitution ($SO_3$) occurs predominantly at the para position due to steric factors, yielding 4-chlorobenzenesulfonic acid as the major product and 2-chlorobenzenesulfonic acid as the minor product."
    )

    add(ch, "Friedel-Crafts Alkylation of Chlorobenzene Regiochemistry",
        "What is the major product obtained when chlorobenzene reacts with methyl chloride ($CH_3Cl$) in the presence of anhydrous aluminum chloride ($AlCl_3$)?",
        [
            "1-Chloro-4-methylbenzene (p-chlorotoluene)",
            "1-Chloro-2-methylbenzene (o-chlorotoluene)",
            "1-Chloro-3-methylbenzene (m-chlorotoluene)",
            "Toluene"
        ],
        "A",
        "In Friedel-Crafts alkylation, the methyl carbocation acts as the electrophile. Because the chloro substituent directs incoming electrophiles to ortho and para positions, a mixture of ortho- and para-chlorotoluene is produced, with 1-chloro-4-methylbenzene (p-chlorotoluene) being the major product due to reduced steric clash."
    )

    # 60-65: Polyhalogen Compounds
    add(ch, "Dichloromethane Industrial Uses and Toxicity",
        "Dichloromethane (methylene chloride, $CH_2Cl_2$) is widely used as a solvent in paint removers. What is the primary toxicological effect of human exposure to dichloromethane vapor?",
        [
            "Depression of the central nervous system, leading to dizziness, nausea, and impaired hearing and vision",
            "Immediate irreversible destruction of red blood cells leading to severe anemia",
            "Spontaneous pulmonary fibrosis caused by covalent binding to lung surfactants",
            "Calcification of cardiac muscle tissue within minutes of exposure"
        ],
        "A",
        "Dichloromethane harms the human central nervous system. Exposure to lower levels in air can lead to slightly impaired hearing and vision. Higher levels cause dizziness, nausea, tingling and numbness in fingers and toes. Direct contact with skin causes intense burning and mild redness."
    )

    add(ch, "Photochemical Oxidation of Chloroform to Phosgene",
        "Why must chloroform ($CHCl_3$) be stored in closed dark-colored glass bottles completely filled to the brim?",
        [
            "In the presence of light and atmospheric oxygen, chloroform is slowly oxidized to phosgene ($COCl_2$), an extremely poisonous gas",
            "Chloroform spontaneously polymerizes into toxic polytetrafluoroethylene in light",
            "Light induces homolysis of the carbon-hydrogen bond to release flammable hydrogen gas",
            "Air oxidizes chloroform into insoluble carbon tetrachloride crystals"
        ],
        "A",
        "Chloroform is slowly oxidized by air in the presence of light to form an extremely poisonous gas, carbonyl chloride, commonly known as phosgene: $2CHCl_3 + O_2 \\xrightarrow{\\text{light}} 2COCl_2 + 2HCl$. Storing it in dark brown bottles filled to the neck excludes both light and air."
    )

    add(ch, "Stabilization of Chloroform by Ethanol",
        "Why is about 1% ethanol added to commercial chloroform stored for anesthetic or laboratory use?",
        [
            "Ethanol converts any toxic phosgene ($COCl_2$) formed into non-toxic diethyl carbonate",
            "Ethanol acts as an acid catalyst to accelerate the evaporation of chloroform",
            "Ethanol prevents the freezing of chloroform at low winter temperatures",
            "Ethanol forms an azeotrope that inhibits the inhalation of chloroform vapor"
        ],
        "A",
        "If any trace of poisonous phosgene ($COCl_2$) is formed by aerial oxidation, the added 1% ethanol reacts with it to convert it into non-toxic diethyl carbonate: $COCl_2 + 2C_2H_5OH \\rightarrow (C_2H_5O)_2C=O + 2HCl$."
    )

    add(ch, "Iodoform Antiseptic Action Mechanism",
        "The historical use of triiodomethane (iodoform, $CHI_3$) as an antiseptic was due to which property?",
        [
            "Its slow liberation of free elemental iodine when in contact with wound tissues",
            "The inherent toxicity of the intact $CHI_3$ molecule toward bacterial cell walls",
            "Its ability to chelate iron atoms in bacterial hemoglobin",
            "Its high volatility which creates a protective vacuum over skin lesions"
        ],
        "A",
        "Iodoform was formerly used as an antiseptic, but its antiseptic properties are due to the liberation of free iodine ($I_2$) on contact with skin or tissues, and not due to the iodoform molecule itself. Due to its objectionable odor, it has been largely replaced by other formulations containing iodine."
    )

    add(ch, "Iodoform Test Structural Requirements",
        "Which of the following organic compounds will yield a yellow precipitate of iodoform ($CHI_3$) when treated with $I_2$ and aqueous $NaOH$?",
        [
            "Pentan-2-one",
            "Pentan-3-one",
            "Methanol",
            "Benzophenone"
        ],
        "A",
        "The iodoform test is given by compounds containing the $CH_3-C=O$ group (methyl ketones) or the $CH_3-CH(OH)-$ group (which oxidizes to a methyl ketone). Pentan-2-one contains the $CH_3-CO-CH_2CH_2CH_3$ unit and gives a yellow precipitate of $CHI_3$. Pentan-3-one, methanol, and benzophenone lack the required $CH_3-C=O$ or $CH_3-CH(OH)-$ group."
    )

    add(ch, "DDT Structure and Environmental Persistence",
        "What is the systematic chemical name of the insecticide DDT, and why was its agricultural use banned in many countries?",
        [
            "2,2-bis(4-chlorophenyl)-1,1,1-trichloroethane; it is chemically non-biodegradable and accumulates in the fatty tissues of animals (biomagnification)",
            "1,2,3,4,5,6-hexachlorocyclohexane; it reacts with soil moisture to form volatile chlorine gas",
            "Dichlorodiphenyltrichloroethylene; it hydrolyzes instantly into toxic hydrochloric acid in water bodies",
            "Bis(4-chlorobenzyl) ether; it induces spontaneous mutation of crop seeds"
        ],
        "A",
        "DDT stands for p,p'-dichlorodiphenyltrichloroethane, systematically named 2,2-bis(4-chlorophenyl)-1,1,1-trichloroethane. Although highly effective against malaria-carrying mosquitoes and crop pests, DDT is extremely lipophilic, chemical-resistant, and non-biodegradable. It accumulates in body fat across trophic levels (biomagnification), leading to reproductive failure in birds (thinning of eggshells) and long-term ecological damage, prompting global bans."
    )

    return qs
