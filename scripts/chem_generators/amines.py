from scripts.chem_generators.common import make_question, normalize_text

def get_amines_questions(seen):
    qs = []
    
    def add(ch, top, text, opts, ans, sol):
        norm = normalize_text(text)
        assert norm not in seen, f"Duplicate detected in amines: {text[:50]}"
        seen.add(norm)
        qs.append(make_question(ch, top, text, opts, ans, sol))

    ch = "Amines"

    # 1. Hybridization and geometry of nitrogen in amines
    add(ch, "Amine Nitrogen Hybridization & Geometry",
        "In simple aliphatic amines such as trimethylamine, what is the hybridization of the nitrogen atom and what is the molecular geometry around it?",
        [
            "$sp^3$ hybridized with trigonal pyramidal geometry and bond angles slightly less than $109.5^\\circ$ (~$108^\\circ$)",
            "$sp^2$ hybridized with trigonal planar geometry and bond angles of $120^\\circ$",
            "$sp^3$ hybridized with regular tetrahedral geometry and bond angles of $109.5^\\circ$",
            "$sp$ hybridized with linear geometry and bond angles of $180^\\circ$"
        ],
        "A",
        "The nitrogen atom in amines is $sp^3$ hybridized. Three of the $sp^3$ hybrid orbitals overlap with orbitals of hydrogen or carbon to form $\\sigma$ bonds, while the fourth contains an unshared lone pair. Because of lone pair-bond pair repulsion, the $C-N-C$ or $C-N-H$ bond angles are slightly compressed from the tetrahedral angle ($109.5^\\circ$) to approximately $108^\\circ$ (e.g. $108^\\circ$ in trimethylamine), giving a pyramidal geometry."
    )

    # 2. Classification of amines
    add(ch, "Classification of Amines",
        "How are amines classified into primary ($1^\\circ$), secondary ($2^\\circ$), and tertiary ($3^\\circ$) classes in organic chemistry?",
        [
            "Based on the number of alkyl or aryl groups attached directly to the nitrogen atom (one, two, or three, respectively)",
            "Based on the degree of substitution of the carbon atom bearing the amino group",
            "Based on the total number of carbon atoms present in the entire molecule",
            "Based on the number of lone pairs present on the nitrogen atom"
        ],
        "A",
        "Unlike alcohols (which are classified based on the nature of the carbon bearing the $-OH$ group), amines are classified based on the number of hydrogen atoms of ammonia that have been replaced by alkyl or aryl groups. Replacement of one $H$ yields a primary ($1^\\circ$) amine ($RNH_2$), two yields a secondary ($2^\\circ$) amine ($R_2NH$), and three yields a tertiary ($3^\\circ$) amine ($R_3N$)."
    )

    # 3. IUPAC nomenclature of branched primary amines
    add(ch, "IUPAC Nomenclature of Branched Primary Amines",
        "What is the systematic IUPAC name of the branched amine $(CH_3)_2CH-CH_2-NH_2$?",
        [
            "2-Methylpropan-1-amine",
            "1-Amino-2-methylpropane",
            "Isobutylamine",
            "2-Aminobutane"
        ],
        "A",
        "The longest continuous carbon chain containing the $-NH_2$ group consists of three carbon atoms (propane). Numbering from the end closest to the amino group gives $C1$ for the $-NH_2$ carbon and a methyl substituent at $C2$. Thus, the IUPAC name is 2-methylpropan-1-amine."
    )

    # 4. IUPAC nomenclature of secondary amines
    add(ch, "IUPAC Nomenclature of Secondary Amines",
        "What is the correct IUPAC name for the secondary amine $CH_3-NH-CH_2CH_3$?",
        [
            "N-Methylethanamine",
            "N-Ethylmethanamine",
            "Methylaminoethane",
            "1-(Methylamino)ethane"
        ],
        "A",
        "In IUPAC nomenclature for secondary amines, the larger alkyl group (two carbons, ethane) forms the parent alkanamine chain (ethanamine), and the smaller group (methyl) is treated as an N-substituent. Hence, the systematic name is N-methylethanamine."
    )

    # 5. IUPAC nomenclature of tertiary amines
    add(ch, "IUPAC Nomenclature of Tertiary Amines",
        "What is the IUPAC name of triethylamine, $(C_2H_5)_3N$?",
        [
            "N,N-Diethylethanamine",
            "Triethylnitride",
            "Triethylammonium",
            "1-(Diethylamino)ethane"
        ],
        "A",
        "One ethyl group is selected as the parent chain (ethanamine), while the remaining two ethyl groups attached to nitrogen are designated with locant 'N'. Therefore, the IUPAC name is N,N-diethylethanamine."
    )

    # 6. Boiling point comparison of isomeric amines
    add(ch, "Boiling Point Comparison of Isomeric Amines",
        "Which of the following correctly lists the isomeric amines of molecular formula $C_4H_{11}N$ in order of decreasing boiling point?",
        [
            "Butan-1-amine ($1^\\circ$) > N-Ethylethanamine ($2^\\circ$) > N,N-Dimethylethanamine ($3^\\circ$)",
            "N,N-Dimethylethanamine ($3^\\circ$) > N-Ethylethanamine ($2^\\circ$) > Butan-1-amine ($1^\\circ$)",
            "N-Ethylethanamine ($2^\\circ$) > Butan-1-amine ($1^\\circ$) > N,N-Dimethylethanamine ($3^\\circ$)",
            "N,N-Dimethylethanamine ($3^\\circ$) > Butan-1-amine ($1^\\circ$) > N-Ethylethanamine ($2^\\circ$)"
        ],
        "A",
        "Primary amines have two hydrogen atoms bonded to electronegative nitrogen, enabling extensive intermolecular hydrogen bonding. Secondary amines have one hydrogen atom on nitrogen, leading to less extensive hydrogen bonding. Tertiary amines have no hydrogen atoms bonded to nitrogen and cannot form intermolecular hydrogen bonds with themselves. Therefore, boiling points follow: $1^\\circ > 2^\\circ > 3^\\circ$."
    )

    # 7. Water solubility of lower aliphatic amines
    add(ch, "Water Solubility of Lower Aliphatic Amines",
        "Why are lower aliphatic amines such as methanamine and ethanamine freely miscible with water, whereas higher amines are practically insoluble?",
        [
            "Lower amines form intermolecular hydrogen bonds with water molecules, but solubility decreases as the hydrophobic hydrocarbon chain enlarges",
            "Lower amines completely hydrolyze water to generate soluble ammonium hydroxide salts",
            "Higher amines form intramolecular hydrogen bonds that prevent interaction with water",
            "Lower amines are purely ionic compounds whereas higher amines are strictly covalent"
        ],
        "A",
        "Lower aliphatic amines form intermolecular hydrogen bonds between water molecules and the polar amino group ($-NH_2$). As the size of the non-polar alkyl group (hydrophobic hydrocarbon part) increases, the hydrophobic effect dominates, resisting hydrogen bond formation and drastically decreasing solubility in water."
    )

    # 8. Basicity order in gas phase
    add(ch, "Basicity Order in Gas Phase",
        "What is the order of basicity of alkylamines and ammonia in the gaseous phase (where solvation effects are absent)?",
        [
            "$3^\\circ\\text{ amine} > 2^\\circ\\text{ amine} > 1^\\circ\\text{ amine} > NH_3$",
            "$NH_3 > 1^\\circ\\text{ amine} > 2^\\circ\\text{ amine} > 3^\\circ\\text{ amine}$",
            "$2^\\circ\\text{ amine} > 1^\\circ\\text{ amine} > 3^\\circ\\text{ amine} > NH_3$",
            "$2^\\circ\\text{ amine} > 3^\\circ\\text{ amine} > 1^\\circ\\text{ amine} > NH_3$"
        ],
        "A",
        "In the gas phase, basicity is governed purely by the electron-donating inductive ($+I$) effect of alkyl groups. Each alkyl group disperses the positive charge on the conjugate ammonium cation ($R_3NH^+$) and increases electron density on the nitrogen lone pair. Therefore, basicity strictly follows the order of alkyl substitution: tertiary > secondary > primary > ammonia ($3^\\circ > 2^\\circ > 1^\\circ > NH_3$)."
    )

    # 9. Basicity order of methyl-substituted amines in water
    add(ch, "Basicity Order of Methyl-Substituted Amines in Water",
        "In aqueous solution, what is the correct order of basicity among methyl-substituted amines and ammonia?",
        [
            "$(CH_3)_2NH > CH_3NH_2 > (CH_3)_3N > NH_3$",
            "$(CH_3)_3N > (CH_3)_2NH > CH_3NH_2 > NH_3$",
            "$CH_3NH_2 > (CH_3)_2NH > (CH_3)_3N > NH_3$",
            "$(CH_3)_2NH > (CH_3)_3N > CH_3NH_2 > NH_3$"
        ],
        "A",
        "In aqueous medium, basicity is determined by a subtle balance of three competing factors: (1) $+I$ inductive effect, (2) extent of hydration/solvation of the conjugate ammonium cation via hydrogen bonding, and (3) steric hindrance. For methyl groups, secondary amine is most basic, followed by primary, then tertiary: $(CH_3)_2NH > CH_3NH_2 > (CH_3)_3N > NH_3$ ($2^\\circ > 1^\\circ > 3^\\circ > NH_3$)."
    )

    # 10. Basicity order of ethyl-substituted amines in water
    add(ch, "Basicity Order of Ethyl-Substituted Amines in Water",
        "In aqueous solution, what is the correct order of basic strength among ethyl-substituted amines and ammonia?",
        [
            "$(C_2H_5)_2NH > (C_2H_5)_3N > C_2H_5NH_2 > NH_3$",
            "$(C_2H_5)_3N > (C_2H_5)_2NH > C_2H_5NH_2 > NH_3$",
            "$(C_2H_5)_2NH > C_2H_5NH_2 > (C_2H_5)_3N > NH_3$",
            "$C_2H_5NH_2 > (C_2H_5)_2NH > (C_2H_5)_3N > NH_3$"
        ],
        "A",
        "For ethyl-substituted amines in aqueous solution, the larger $+I$ inductive effect of the ethyl group overcomes some steric hindrance, making the tertiary amine more basic than the primary amine. The secondary amine remains the strongest base due to optimal balance of inductive and hydration stabilization: $(C_2H_5)_2NH > (C_2H_5)_3N > C_2H_5NH_2 > NH_3$ ($2^\\circ > 3^\\circ > 1^\\circ > NH_3$)."
    )

    # 11. Basicity comparison: Aniline vs ammonia
    add(ch, "Basicity Comparison: Aniline vs Ammonia",
        "Aniline ($pK_b = 9.38$) is a substantially weaker base than ammonia ($pK_b = 4.75$). What is the primary physical reason for this difference?",
        [
            "The unshared electron pair on nitrogen is delocalized over the aromatic ring via resonance, reducing its availability for protonation",
            "Aniline is completely non-polar and fails to dissolve in aqueous acidic media",
            "The phenyl ring donates electron density into nitrogen via hyperconjugation",
            "Nitrogen in aniline undergoes $sp$ hybridization which binds the lone pair too tightly"
        ],
        "A",
        "In aniline, the lone pair of electrons on nitrogen is conjugated with the $\\pi$-electron system of the benzene ring. Resonance structures show that the lone pair is delocalized into the ortho and para positions of the ring ($C_6H_5-NH_2 \\leftrightarrow$ quinonoid structures). Consequently, the electron density on nitrogen is significantly reduced compared to ammonia, making it less prone to accept a proton."
    )

    # 12. Resonance stability: Aniline vs anilinium ion
    add(ch, "Resonance Stability: Aniline vs Anilinium Ion",
        "How does the number of resonance contributors explain why the protonation of aniline is thermodynamically unfavorable?",
        [
            "Aniline has 5 resonance contributors whereas the anilinium cation has only 2, meaning protonation results in a net loss of resonance stabilization",
            "The anilinium ion has 10 resonance structures which causes rapid homolytic cleavage",
            "Aniline has only 1 canonical structure while anilinium has 5 canonical structures",
            "Both aniline and anilinium ion have equal numbers of resonance structures with identical energies"
        ],
        "A",
        "Unprotonated aniline is stabilized by 5 resonance structures (including charge-separated quinonoid forms). When aniline accepts a proton to form the anilinium ion ($C_6H_5NH_3^+$), the nitrogen atom no longer has a lone pair to delocalize into the ring; the anilinium ion is stabilized by only 2 Kekule structures. This greater resonance stabilization of aniline relative to anilinium ion disfavors protonation."
    )

    # 13. Effect of EWGs on aromatic amine basicity
    add(ch, "Effect of Electron-Withdrawing Groups on Aromatic Amine Basicity",
        "How does the introduction of a nitro group ($-NO_2$) at the para position of aniline influence its basicity?",
        [
            "It markedly decreases basicity because its strong $-R$ and $-I$ effects withdraw electron density from the amino group",
            "It increases basicity because the oxygen atoms of the nitro group hydrogen-bond with incoming protons",
            "It has zero effect on basicity because substituents at the para position are too far from nitrogen",
            "It increases basicity by stabilizing the conjugate cation via steric hindrance"
        ],
        "A",
        "The nitro group ($-NO_2$) is a powerful electron-withdrawing group via both resonance ($-R$) and inductive ($-I$) effects. At the para position, $-NO_2$ withdraws electron density directly from the $-NH_2$ nitrogen lone pair through extended resonance, strongly destabilizing the conjugate acid and drastically decreasing the basic strength ($pK_b$ of 4-nitroaniline is $\\approx 13.0$ vs $9.38$ for aniline)."
    )

    # 14. Effect of EDGs on aromatic amine basicity
    add(ch, "Effect of Electron-Donating Groups on Aromatic Amine Basicity",
        "Which of the following substituted anilines is the strongest base in aqueous solution?",
        [
            "4-Methoxyaniline (p-anisidine)",
            "Aniline",
            "4-Chloroaniline",
            "4-Nitroaniline"
        ],
        "A",
        "Electron-donating groups (EDGs) such as $-OCH_3$ (by $+R$ effect) and $-CH_3$ (by $+I$ and hyperconjugation) push electron density into the aromatic ring and onto the amino nitrogen, increasing the availability of the lone pair and stabilizing the conjugate cation. Therefore, 4-methoxyaniline ($pK_b \\approx 8.7$) is a stronger base than aniline ($pK_b \\approx 9.38$), while chloro- and nitro-derivatives are weaker."
    )

    # 15. Ortho effect in substituted anilines
    add(ch, "Ortho Effect in Substituted Anilines",
        "Regardless of whether the substituent is electron-donating (e.g. $-CH_3$) or electron-withdrawing (e.g. $-NO_2$), ortho-substituted anilines are almost always weaker bases than aniline. This phenomenon is known as the:",
        [
            "Ortho effect in anilines, caused by steric hindrance to protonation and disruption of conjugate acid hydration",
            "Field effect, caused by through-space electrostatic attraction of protons",
            "Inductive saturation effect, caused by over-crowding of $\\sigma$ electrons",
            "Electromeric effect, caused by complete displacement of $\\pi$ electrons upon reagent approach"
        ],
        "A",
        "The 'ortho effect' in anilines refers to the observation that ortho-substituted anilines (such as o-toluidine and o-nitroaniline) are weaker bases than aniline itself. The bulky ortho group creates steric hindrance to the approach of a proton to the $-NH_2$ nitrogen and sterically hinders the hydration/solvation of the resulting anilinium cation."
    )

    # 16. Basicity comparison: Benzylamine vs aniline
    add(ch, "Basicity Comparison: Benzylamine vs Aniline",
        "Benzylamine ($C_6H_5CH_2NH_2$, $pK_b = 4.70$) is a much stronger base than aniline ($C_6H_5NH_2$, $pK_b = 9.38$). What explains this dramatic difference?",
        [
            "In benzylamine, the $-NH_2$ group is attached to an $sp^3$ hybridized carbon, preventing resonance delocalization of the lone pair into the benzene ring",
            "Benzylamine contains a benzyl carbocation that donates hydride ions to water",
            "Aniline forms an intramolecular five-membered ring that locks its lone pair",
            "Benzylamine is aromatic while aniline is antiaromatic"
        ],
        "A",
        "In benzylamine ($C_6H_5CH_2NH_2$), the amino group is attached to an aliphatic $sp^3$ hybridized carbon ($-CH_2-$). The nitrogen lone pair is not in direct conjugation with the $\\pi$-system of the benzene ring, so it remains fully localized on nitrogen. Thus, benzylamine behaves like an aliphatic primary amine with basicity comparable to ammonia ($pK_b \\approx 4.75$)."
    )

    # 17. Relation between pKb and base strength
    add(ch, "Relation Between pKb and Base Strength",
        "Which of the following compounds has the lowest $pK_b$ value in aqueous solution?",
        [
            "Dimethylamine ($(CH_3)_2NH$)",
            "Methanamine ($CH_3NH_2$)",
            "Ammonia ($NH_3$)",
            "Aniline ($C_6H_5NH_2$)"
        ],
        "A",
        "A lower $pK_b$ value corresponds to a higher $K_b$ and greater basic strength ($pK_b = -\\log K_b$). Among the given compounds, dimethylamine is the strongest base in aqueous solution ($pK_b = 3.27$), followed by methanamine ($3.38$), ammonia ($4.75$), and aniline ($9.38$)."
    )

    # 18. Basicity order of nitroaniline isomers
    add(ch, "Basicity Order of Nitroaniline Isomers",
        "Which of the following correctly arranges aniline and its nitro-substituted isomers in order of decreasing basicity?",
        [
            "Aniline > m-Nitroaniline > p-Nitroaniline > o-Nitroaniline",
            "o-Nitroaniline > m-Nitroaniline > p-Nitroaniline > Aniline",
            "m-Nitroaniline > Aniline > p-Nitroaniline > o-Nitroaniline",
            "Aniline > p-Nitroaniline > m-Nitroaniline > o-Nitroaniline"
        ],
        "A",
        "Aniline has no deactivating nitro group and is the most basic ($pK_b = 9.38$). In m-nitroaniline, the $-NO_2$ group operates only via $-I$ inductive effect (no resonance withdrawal from meta position), making it moderately weaker ($pK_b = 11.53$). In p-nitroaniline, $-NO_2$ exerts both $-I$ and strong $-R$ effects, reducing basicity further ($pK_b = 13.0$). In o-nitroaniline, strong $-I$, $-R$, and steric ortho effects combine to make it the weakest base ($pK_b = 14.3$)."
    )

    # 19. Reduction of nitro compounds with Fe/HCl
    add(ch, "Reduction of Nitro Compounds with Fe/HCl",
        "In the industrial preparation of aniline from nitrobenzene, reduction using iron scrap and hydrochloric acid ($Fe / HCl$) is preferred over tin and hydrochloric acid ($Sn / HCl$). Why?",
        [
            "The $FeCl_2$ formed during the reaction undergoes hydrolysis to regenerate $HCl$, requiring only a small catalytic amount of $HCl$",
            "Iron reacts much more violently than tin, giving higher reaction temperatures",
            "Tin produces toxic tin hydride gas as a byproduct",
            "Iron prevents the over-reduction of aniline into cyclohexylamine"
        ],
        "A",
        "Reduction with $Fe$ scrap and $HCl$ is economically preferred because the ferrous chloride ($FeCl_2$) produced is hydrolyzed by water during the reaction ($FeCl_2 + 2H_2O \\to Fe(OH)_2 + 2HCl$), releasing $HCl$. Hence, only a small catalytic amount of hydrochloric acid is required to initiate the reduction process."
    )

    # 20. Catalytic hydrogenation of nitro compounds
    add(ch, "Catalytic Hydrogenation of Nitro Compounds",
        "What product is obtained when nitrobenzene is subjected to catalytic hydrogenation using molecular hydrogen ($H_2$) over finely divided nickel, platinum, or palladium in ethanol?",
        [
            "Aniline ($C_6H_5NH_2$)",
            "Nitrosobenzene ($C_6H_5NO$)",
            "N-Phenylhydroxylamine ($C_6H_5NHOH$)",
            "Azobenzene ($C_6H_5N=NC_6H_5$)"
        ],
        "A",
        "Catalytic hydrogenation of aromatic nitro compounds using $H_2$ gas over finely divided $Ni$, $Pt$, or $Pd$ catalyst in ethanol cleanly reduces the nitro group ($-NO_2$) to a primary amino group ($-NH_2$): $C_6H_5NO_2 + 3H_2 \\xrightarrow{Pd/C,\\text{ ethanol}} C_6H_5NH_2 + 2H_2O$."
    )

    # 21. Hofmann ammonolysis of alkyl halides
    add(ch, "Hofmann Ammonolysis of Alkyl Halides",
        "When an alkyl halide is heated with an ethanolic solution of ammonia in a sealed tube at 373 K (Hofmann ammonolysis), what is the major drawback of this method for laboratory preparation?",
        [
            "It yields a complex mixture of primary, secondary, and tertiary amines along with quaternary ammonium salts",
            "It causes complete elimination to yield alkenes with zero amine formation",
            "The reaction is explosive and releases toxic cyanogen gas",
            "The ammonia molecule is oxidized to nitric oxide before nucleophilic attack can occur"
        ],
        "A",
        "The primary amine formed by nucleophilic substitution ($RX + NH_3 \\to RNH_2 + HX$) is itself a nucleophile and continues to react with remaining alkyl halide to form a secondary amine ($R_2NH$), a tertiary amine ($R_3N$), and finally a quaternary ammonium salt ($R_4N^+X^-$). This mixture of products is difficult to separate by fractional distillation."
    )

    # 22. Major product control in ammonolysis
    add(ch, "Major Product Control in Hofmann Ammonolysis",
        "In Hofmann ammonolysis of alkyl halides, how can the reaction be steered to obtain the primary amine ($1^\\circ$) as the major product?",
        [
            "By using a large excess of ammonia",
            "By using a large excess of the alkyl halide",
            "By conducting the reaction at $-78^\\circ\\text{C}$ in liquid nitrogen",
            "By adding a strong oxidizing agent such as potassium dichromate"
        ],
        "A",
        "When a large molar excess of ammonia ($NH_3$) is used, an incoming alkyl halide molecule is overwhelmingly likely to collide with and be attacked by an $NH_3$ molecule rather than the newly formed primary amine ($RNH_2$). Consequently, further alkylation is minimized and the primary amine is obtained as the chief product."
    )

    # 23. Reduction of nitriles with LiAlH4
    add(ch, "Reduction of Nitriles with LiAlH4",
        "When ethanenitrile ($CH_3CN$) is treated with lithium aluminium hydride ($LiAlH_4$) or sodium in boiling ethanol (Mendius reaction), what amine is produced?",
        [
            "Ethanamine ($CH_3CH_2NH_2$)",
            "Methanamine ($CH_3NH_2$)",
            "N-Methylethanamine ($CH_3NHCH_2CH_3$)",
            "Ethanamide ($CH_3CONH_2$)"
        ],
        "A",
        "Reduction of nitriles with $LiAlH_4$ or $Na / C_2H_5OH$ reduces the triple bond of the cyano group ($-C\\equiv N$) into a primary amino group ($-CH_2-NH_2$). Ethanenitrile ($CH_3CN$, 2 carbons) yields ethanamine ($CH_3CH_2NH_2$, 2 carbons)."
    )

    # 24. Carbon chain extension via nitrile reduction
    add(ch, "Carbon Chain Extension via Nitrile Reduction",
        "Which two-step synthetic sequence converts chloromethane ($CH_3Cl$) into ethanamine ($CH_3CH_2NH_2$), thereby stepping up the carbon chain by one carbon?",
        [
            "Reaction with ethanolic $KCN$ followed by reduction with $LiAlH_4$ or catalytic $H_2/Ni$",
            "Reaction with ethanolic $AgCN$ followed by acidic hydrolysis",
            "Reaction with aqueous $KOH$ followed by treatment with $NH_3$",
            "Reaction with $NH_3$ followed by Hofmann bromamide degradation"
        ],
        "A",
        "Nucleophilic substitution of chloromethane ($CH_3Cl$) with ethanolic potassium cyanide ($KCN$) introduces a cyano carbon to give ethanenitrile ($CH_3CN$). Subsequent reduction of the nitrile with $LiAlH_4$ or $H_2/Ni$ converts the $-CN$ group into $-CH_2NH_2$, producing ethanamine ($CH_3CH_2NH_2$)."
    )

    # 25. Reduction of amides to amines
    add(ch, "Reduction of Amides to Amines",
        "What is the organic product formed when propanamide ($CH_3CH_2CONH_2$) is reduced with lithium aluminium hydride ($LiAlH_4$) followed by treatment with water?",
        [
            "Propan-1-amine ($CH_3CH_2CH_2NH_2$)",
            "Ethanamine ($CH_3CH_2NH_2$)",
            "Propan-1-ol ($CH_3CH_2CH_2OH$)",
            "Propanoic acid ($CH_3CH_2COOH$)"
        ],
        "A",
        "Reduction of primary amides with $LiAlH_4$ in dry ether followed by hydrolysis reduces the carbonyl group to a methylene group without changing the number of carbon atoms: $RCONH_2 \\xrightarrow{1.\\text{ }LiAlH_4, 2.\\text{ }H_2O} RCH_2NH_2$. Propanamide yields propan-1-amine."
    )

    # 26. Gabriel phthalimide synthesis sequence
    add(ch, "Gabriel Phthalimide Synthesis Sequence",
        "In the Gabriel phthalimide synthesis, phthalimide is converted into a pure primary amine through which sequence of operations?",
        [
            "Deprotonation with ethanolic $KOH$ to form potassium phthalimide, nucleophilic alkylation with $RX$ to give N-alkylphthalimide, and alkaline hydrolysis with aqueous $NaOH$",
            "Reduction with $LiAlH_4$ followed by treatment with alkyl halide and warming with $HCl$",
            "Bromination with $Br_2 / KOH$ followed by catalytic hydrogenation over palladium",
            "Reaction with nitrous acid followed by coupling with an alkyl Grignard reagent"
        ],
        "A",
        "In the Gabriel phthalimide synthesis: (1) Phthalimide is treated with ethanolic $KOH$ to yield potassium phthalimide. (2) Potassium phthalimide reacts with an alkyl halide ($RX$) via an $S_N2$ mechanism to yield N-alkylphthalimide. (3) Alkaline hydrolysis of N-alkylphthalimide with aqueous $NaOH$ yields a pure primary aliphatic amine ($RNH_2$) and sodium phthalate."
    )

    # 27. Limitation of Gabriel phthalimide synthesis
    add(ch, "Limitation of Gabriel Phthalimide Synthesis",
        "Why cannot aromatic primary amines such as aniline be prepared by the Gabriel phthalimide synthesis?",
        [
            "Aryl halides do not undergo nucleophilic aromatic substitution ($S_N2$) with the phthalimide anion under normal conditions",
            "Potassium phthalimide is oxidized by aryl halides to phthalic anhydride",
            "Aniline decomposes immediately in the alkaline hydrolysis step",
            "Aromatic rings cannot fit into the active site of the phthalimide anion"
        ],
        "A",
        "The second step of the Gabriel synthesis requires an $S_N2$ nucleophilic displacement of a halide ion by the phthalimide anion. Aryl halides (like chlorobenzene) do not undergo nucleophilic substitution under ordinary conditions because the carbon-halogen bond has partial double bond character due to resonance with the aromatic ring, and the benzene ring repels nucleophiles."
    )

    # 28. Hofmann bromamide degradation reaction
    add(ch, "Hofmann Bromamide Degradation Reaction",
        "When ethanamide ($CH_3CONH_2$) is heated with bromine and concentrated aqueous potassium hydroxide ($Br_2 + 4KOH$), what amine is produced?",
        [
            "Methanamine ($CH_3NH_2$)",
            "Ethanamine ($CH_3CH_2NH_2$)",
            "Bromoethanamine ($BrCH_2CH_2NH_2$)",
            "N-Bromoethanamide ($CH_3CONHBr$)"
        ],
        "A",
        "In the Hofmann bromamide degradation reaction, a primary acid amide is treated with bromine and aqueous alkali: $RCONH_2 + Br_2 + 4KOH \\to RNH_2 + K_2CO_3 + 2KBr + 2H_2O$. The amine produced contains one carbon atom less than the starting amide. Ethanamide ($2$ carbons) yields methanamine ($1$ carbon)."
    )

    # 29. Step-down degradation in Hofmann bromamide
    add(ch, "Step-Down Degradation in Hofmann Bromamide Reaction",
        "Which of the following primary amides must be treated with $Br_2 / KOH$ to prepare propan-1-amine?",
        [
            "Butanamide ($CH_3CH_2CH_2CONH_2$)",
            "Propanamide ($CH_3CH_2CONH_2$)",
            "Pentanamide ($CH_3CH_2CH_2CH_2CONH_2$)",
            "Ethanamide ($CH_3CONH_2$)"
        ],
        "A",
        "Because the Hofmann bromamide degradation eliminates the carbonyl carbon as carbonate ($CO_3^{2-}$), the amine formed contains one carbon less than the parent amide. To prepare propan-1-amine (3 carbons), the starting amide must contain 4 carbons, which is butanamide: $CH_3CH_2CH_2CONH_2 + Br_2 + 4KOH \\to CH_3CH_2CH_2NH_2 + K_2CO_3 + 2KBr + 2H_2O$."
    )

    # 30. Carbylamine test / isocyanide reaction
    add(ch, "Carbylamine Test / Isocyanide Reaction",
        "When an aliphatic or aromatic primary amine is warmed with chloroform and alcoholic potassium hydroxide ($CHCl_3 + 3KOH$), what observable change confirms the carbylamine test?",
        [
            "Evolution of an extremely unpleasant, foul odor due to the formation of an isocyanide (carbylamine, $R-NC$)",
            "Deposition of a brilliant silver mirror on the glass surface",
            "Precipitation of a bright yellow crystalline solid of iodoform",
            "Formation of an intense deep-blue coordination complex"
        ],
        "A",
        "In the carbylamine (or isocyanide) test, primary amines react with chloroform and alcoholic $KOH$ to yield isocyanides (carbylamines): $RNH_2 + CHCl_3 + 3KOH \\xrightarrow{\\Delta} R-NC + 3KCl + 3H_2O$. Isocyanides have extremely repulsive and characteristic foul odors."
    )

    # 31. Specificity of carbylamine test
    add(ch, "Specificity of Carbylamine Test",
        "Which of the following amines will give a positive carbylamine test?",
        [
            "Aniline ($C_6H_5NH_2$)",
            "N-Methylaniline ($C_6H_5NHCH_3$)",
            "N,N-Dimethylaniline ($C_6H_5N(CH_3)_2$)",
            "Diethylamine ($(C_2H_5)_2NH$)"
        ],
        "A",
        "The carbylamine test is specific for primary amines ($1^\\circ$), both aliphatic and aromatic. Secondary ($2^\\circ$) and tertiary ($3^\\circ$) amines do not give this test because they lack the two protons on nitrogen required for the elimination steps leading to the isocyanide functional group ($-N\\equiv C$)."
    )

    # 32. Reaction of primary aliphatic amines with nitrous acid
    add(ch, "Reaction of Primary Aliphatic Amines with Nitrous Acid",
        "When ethanamine ($CH_3CH_2NH_2$) is treated with nitrous acid ($NaNO_2 + \\text{dil. } HCl$) at room temperature, what gas is evolved vigorously and what is the major organic product?",
        [
            "Nitrogen gas ($N_2 \\uparrow$) is evolved quantitatively, and ethanol ($CH_3CH_2OH$) is formed",
            "Oxygen gas ($O_2 \\uparrow$) is evolved, and ethanal is formed",
            "Nitric oxide gas ($NO \\uparrow$) is evolved, and nitroethane is formed",
            "Hydrogen gas ($H_2 \\uparrow$) is evolved, and ethane is formed"
        ],
        "A",
        "Primary aliphatic amines react with freshly prepared nitrous acid ($NaNO_2 + HCl$) to form highly unstable alkyldiazonium salts ($[R-N_2^+]Cl^-$), which instantly decompose even at $0^\\circ\\text{C}$ to liberate nitrogen gas quantitatively along with carbocation intermediates that react with water to form alcohols: $RNH_2 + HNO_2 \\to ROH + N_2\\uparrow + H_2O$."
    )

    # 33. Estimation of amino acids (Van Slyke method)
    add(ch, "Estimation of Amino Acids and Proteins (Van Slyke Method)",
        "Why is the reaction between primary aliphatic amino groups and nitrous acid utilized in the quantitative estimation of amino acids and proteins?",
        [
            "Nitrogen gas ($N_2$) is liberated quantitatively (one mole of $N_2$ per mole of $-NH_2$), allowing precise gasometric measurement",
            "The alcohol formed can be titrated directly with standard alkali",
            "A brightly colored azo dye is produced that can be analyzed by colorimetry",
            "The reaction generates a precipitate of elemental carbon proportional to protein mass"
        ],
        "A",
        "In the Van Slyke method, primary aliphatic amines react with nitrous acid to liberate nitrogen gas in a strictly stoichiometric 1:1 molar ratio: $RNH_2 + HNO_2 \\to ROH + H_2O + N_2\\uparrow$. By measuring the volume of $N_2$ gas released gasometrically, the exact quantity of free primary amino groups in amino acids and proteins is determined."
    )

    # 34. Reaction of primary aromatic amines with nitrous acid
    add(ch, "Reaction of Primary Aromatic Amines with Nitrous Acid",
        "When aniline is dissolved in cold aqueous hydrochloric acid and treated with sodium nitrite at 273–278 K ($0-5^\\circ\\text{C}$), what stable species is obtained?",
        [
            "Benzenediazonium chloride ($C_6H_5N_2^+Cl^-$)",
            "Phenol ($C_6H_5OH$)",
            "Chlorobenzene ($C_6H_5Cl$)",
            "Nitrobenzene ($C_6H_5NO_2$)"
        ],
        "A",
        "Aromatic primary amines react with nitrous acid ($NaNO_2 + 2HCl$) at low temperature ($273-278\\text{ K}$) to form arenediazonium salts: $C_6H_5NH_2 + NaNO_2 + 2HCl \\xrightarrow{273-278\\text{ K}} C_6H_5N_2^+Cl^- + NaCl + 2H_2O$. This process is known as diazotisation."
    )

    # 35. Reaction of secondary amines with nitrous acid
    add(ch, "Reaction of Secondary Amines with Nitrous Acid",
        "What product is formed when a secondary amine such as diethylamine ($(C_2H_5)_2NH$) reacts with nitrous acid ($NaNO_2 + HCl$)?",
        [
            "N-Nitrosodiethylamine ($(C_2H_5)_2N-NO$), which separates as a yellow oily liquid",
            "A diazonium salt that evolves nitrogen gas immediately",
            "A white crystalline precipitate of an ammonium chloride salt",
            "An isocyanide having an offensive odor"
        ],
        "A",
        "Both aliphatic and aromatic secondary amines react slowly with nitrous acid to form N-nitrosamines: $R_2NH + HNO_2 \\to R_2N-NO + H_2O$. N-Nitrosamines are yellow, neutral oily liquids that are insoluble in water and do not liberate nitrogen gas."
    )

    # 36. Reaction of tertiary aliphatic amines with nitrous acid
    add(ch, "Reaction of Tertiary Aliphatic Amines with Nitrous Acid",
        "How do tertiary aliphatic amines such as triethylamine react with cold nitrous acid?",
        [
            "They dissolve to form clear, water-soluble trialkylammonium nitrite salts ($[R_3NH]^+NO_2^-$) without evolution of gas",
            "They evolve nitrogen gas and form tertiary alcohols",
            "They undergo oxidative cleavage into secondary amines and formaldehyde",
            "They form a bright red insoluble nitroso derivative"
        ],
        "A",
        "Tertiary aliphatic amines lack replaceable hydrogen atoms on nitrogen. When treated with cold nitrous acid, they merely undergo acid-base neutralization to form water-soluble trialkylammonium nitrite salts: $R_3N + HNO_2 \\rightleftharpoons [R_3NH]^+NO_2^-$. No nitrogen gas is evolved."
    )

    # 37. Hinsberg reagent identity
    add(ch, "Hinsberg Reagent Identity",
        "What chemical compound is known as the Hinsberg reagent and used to distinguish between primary, secondary, and tertiary amines?",
        [
            "Benzenesulphonyl chloride ($C_6H_5SO_2Cl$)",
            "Benzoyl chloride ($C_6H_5COCl$)",
            "p-Toluenesulfonic acid ($p-CH_3C_6H_4SO_3H$)",
            "Benzenesulfonic acid ($C_6H_5SO_3H$)"
        ],
        "A",
        "The Hinsberg reagent is benzenesulphonyl chloride ($C_6H_5SO_2Cl$). It reacts differently with primary, secondary, and tertiary amines depending on the number of replaceable hydrogen atoms bonded to the nitrogen atom."
    )

    # 38. Hinsberg test on primary amines
    add(ch, "Hinsberg Test on Primary Amines",
        "When ethanamine is shaken with benzenesulphonyl chloride in aqueous $KOH$, the resulting sulphonamide dissolves completely in the alkaline solution. Why is it soluble in alkali?",
        [
            "The sulphonamide (N-ethylbenzenesulphonamide) contains an acidic hydrogen on nitrogen attached to the strongly electron-withdrawing $-SO_2-$ group, forming a water-soluble potassium salt",
            "The sulphonamide decomposes into water-soluble potassium sulfate and ethylamine",
            "The product is non-polar and dissolves in water via hydrophobic interactions",
            "The lone pair on sulfur forms a covalent coordinate bond with potassium ion"
        ],
        "A",
        "The reaction of a primary amine with benzenesulphonyl chloride yields an N-alkylbenzenesulphonamide: $C_6H_5SO_2Cl + RNH_2 \\to C_6H_5SO_2NHR + HCl$. The hydrogen atom attached to nitrogen is strongly acidic due to the powerful electron-withdrawing effect of the adjacent sulfonyl ($-SO_2-$) group. Consequently, it dissolves in aqueous alkali ($KOH$ or $NaOH$) to form a water-soluble salt: $C_6H_5SO_2N^-(K^+)R$."
    )

    # 39. Hinsberg test on secondary amines
    add(ch, "Hinsberg Test on Secondary Amines",
        "When diethylamine reacts with benzenesulphonyl chloride, the product formed remains insoluble in aqueous potassium hydroxide ($KOH$). What is the reason for its insolubility?",
        [
            "The product (N,N-diethylbenzenesulphonamide) has no acidic hydrogen atom attached to the nitrogen atom and cannot form an alkali salt",
            "The product undergoes instant polymerization into an insoluble resin",
            "Potassium hydroxide hydrolyzes the product back into insoluble diethyl ether",
            "The sulfonyl group becomes positively charged in basic solution, repelling hydroxide ions"
        ],
        "A",
        "Secondary amines react with benzenesulphonyl chloride to form N,N-dialkylbenzenesulphonamides: $C_6H_5SO_2Cl + R_2NH \\to C_6H_5SO_2NR_2 + HCl$. Because there is no hydrogen atom attached to the nitrogen in this product, it lacks acidic character and is completely insoluble in aqueous alkali, separating as an insoluble solid or oil."
    )

    # 40. Hinsberg test on tertiary amines
    add(ch, "Hinsberg Test on Tertiary Amines",
        "What happens when a tertiary amine such as triethylamine is treated with the Hinsberg reagent ($C_6H_5SO_2Cl$) in the presence of aqueous alkali?",
        [
            "No reaction occurs because tertiary amines lack any hydrogen atom directly attached to nitrogen",
            "It forms a soluble quaternary sulphonamide salt",
            "It decomposes with vigorous evolution of sulfur dioxide gas",
            "It oxidizes immediately into a bright green nitro compound"
        ],
        "A",
        "Tertiary amines do not have any hydrogen atom bonded to the nitrogen atom and therefore do not react with benzenesulphonyl chloride under Hinsberg test conditions. The unreacted tertiary amine remains insoluble in aqueous alkali but dissolves when the mixture is acidified with mineral acid."
    )

    # 41. Separation of amine mixtures via Hinsberg method
    add(ch, "Separation of Amine Mixtures via Hinsberg Method",
        "In the separation of a mixture containing primary, secondary, and tertiary amines by the Hinsberg method, what treatment regenerates the pure primary amine from its alkali-soluble fraction?",
        [
            "Acidification with concentrated hydrochloric acid followed by heating with aqueous mineral acid to hydrolyze the sulphonamide",
            "Direct distillation with metallic sodium",
            "Reaction with ammoniacal silver nitrate solution",
            "Treatment with sodium borohydride at room temperature"
        ],
        "A",
        "The alkaline solution containing the potassium salt of the N-alkylbenzenesulphonamide is separated from the insoluble secondary sulphonamide. Acidification with $HCl$ precipitates the free N-alkylbenzenesulphonamide ($C_6H_5SO_2NHR$). Subsequent prolonged boiling with concentrated $HCl$ or $H_2SO_4$ hydrolyzes the sulphonamide bond, regenerating the pure primary amine salt: $C_6H_5SO_2NHR + H_2O + HCl \\xrightarrow{\\Delta} RNH_3^+Cl^- + C_6H_5SO_3H$."
    )

    # 42. Acylation of amines with acid chlorides
    add(ch, "Acylation of Amines with Acid Chlorides",
        "When ethanamine ($CH_3CH_2NH_2$) reacts with acetyl chloride ($CH_3COCl$) in the presence of pyridine, what is the structure and IUPAC name of the organic product?",
        [
            "$CH_3CONHCH_2CH_3$, N-Ethylethanamide",
            "$CH_3CH_2CONH_2$, Propanamide",
            "$CH_3COOCH_2CH_3$, Ethyl ethanoate",
            "$CH_3CH_2NHCOCH_2CH_3$, N-Ethylpropanamide"
        ],
        "A",
        "Aliphatic primary amines undergo nucleophilic acyl substitution with acid chlorides to replace a hydrogen atom on nitrogen with an acyl group: $CH_3CH_2NH_2 + CH_3COCl \\xrightarrow{\\text{pyridine}} CH_3CONHCH_2CH_3 + HCl$. The product is N-ethylethanamide (an N-substituted amide)."
    )

    # 43. Function of pyridine in amine acylation
    add(ch, "Function of Pyridine in Amine Acylation",
        "Why is a base such as pyridine usually added to the reaction mixture during the acylation of primary and secondary amines with acid chlorides or anhydrides?",
        [
            "Pyridine removes the byproduct $HCl$ as pyridinium chloride, preventing protonation of the amine and shifting equilibrium forward",
            "Pyridine acts as a reducing agent to prevent oxidation of the amino group",
            "Pyridine coordinates with the amine to make nitrogen a stronger electrophile",
            "Pyridine hydrolyzes excess acid chloride to prevent explosion"
        ],
        "A",
        "Acylation of amines with acyl chlorides generates $HCl$ as a byproduct. Because the starting amine is basic, $HCl$ would react with unreacted amine to form an inactive ammonium salt ($RNH_3^+Cl^-$), consuming half of the amine. Pyridine is a stronger base than the amide product and removes $HCl$ ($C_5H_5N + HCl \\to C_5H_5NH^+Cl^-$), ensuring that the amine remains free to react and driving the equilibrium to completion."
    )

    # 44. Bromination of aniline with bromine water
    add(ch, "Bromination of Aniline with Bromine Water",
        "When aniline is treated with bromine water ($Br_2 / H_2O$) at room temperature without any Lewis acid catalyst, what is formed and what is observed?",
        [
            "A white precipitate of 2,4,6-tribromoaniline is formed immediately",
            "A yellow oily liquid of 4-bromoaniline is formed",
            "A red solution of 2-bromoaniline is formed",
            "No reaction occurs unless anhydrous $AlCl_3$ is added"
        ],
        "A",
        "The amino group ($-NH_2$) is an extraordinarily powerful activating group due to $+R$ resonance donation of the nitrogen lone pair into the aromatic ring. Consequently, aniline undergoes electrophilic aromatic substitution so rapidly that all three activated positions (both ortho and the para position) are substituted simultaneously, forming a white precipitate of 2,4,6-tribromoaniline without any catalyst."
    )

    # 45. Monobromination of aniline via protection
    add(ch, "Monobromination of Aniline via Protection",
        "To prepare 4-bromoaniline (p-bromoaniline) as the major product from aniline, what synthetic route is employed to avoid polybromination?",
        [
            "Protecting the $-NH_2$ group by acetylation with acetic anhydride to form acetanilide, brominating with $Br_2$ in acetic acid, and then hydrolyzing the amide",
            "Carrying out bromination in liquid ammonia at $-33^\\circ\\text{C}$",
            "Reacting aniline with phosphorus tribromide ($PBr_3$) followed by aqueous base",
            "Treating aniline with excess sodium hydroxide prior to adding bromine"
        ],
        "A",
        "To obtain a monobromo derivative, the activating power of the $-NH_2$ group must be moderated. Aniline is first acetylated with acetic anhydride/pyridine to form acetanilide ($C_6H_5NHCOCH_3$). Bromination of acetanilide with $Br_2$ in ethanoic acid yields predominantly 4-bromoacetanilide (due to steric hindrance at ortho positions). Acidic or alkaline hydrolysis of the amide group then cleanly produces 4-bromoaniline."
    )

    # 46. Mechanism of deactivation in acetanilide
    add(ch, "Mechanism of Deactivation in Acetanilide",
        "Why is the activating effect of the acetamido group ($-NHCOCH_3$) in acetanilide significantly less than that of the amino group ($-NH_2$) in aniline?",
        [
            "The lone pair of electrons on nitrogen is delocalized into the carbonyl group of the acetyl moiety through resonance, reducing its donation to the benzene ring",
            "The acetyl group has a powerful $+I$ effect that repels electrophiles",
            "Acetanilide exists as an enol tautomer that lacks an aromatic $\\pi$-system",
            "The presence of the acetyl group causes nitrogen to invert its configuration permanently"
        ],
        "A",
        "In acetanilide ($C_6H_5-\\overset{\\cdot\\cdot}{N}H-C(=O)-CH_3$), the lone pair on nitrogen is conjugated with both the benzene ring and the carbonyl double bond: $\\text{Ph}-\\overset{+}{N}H=C(O^-)-CH_3$. The strong electron-withdrawing nature of the carbonyl oxygen draws the nitrogen lone pair toward itself, thereby diminishing the lone pair electron density available for donation into the benzene ring (+R effect)."
    )

    # 47. Direct nitration of aniline
    add(ch, "Direct Nitration of Aniline with Conc. HNO3/H2SO4",
        "When aniline is nitrated directly with a mixture of concentrated nitric acid and concentrated sulfuric acid at 288 K, what are the observed product percentages?",
        [
            "51% p-nitroaniline, 47% m-nitroaniline, and 2% o-nitroaniline",
            "98% p-nitroaniline and 2% o-nitroaniline with 0% m-nitroaniline",
            "80% o-nitroaniline and 20% p-nitroaniline with 0% m-nitroaniline",
            "100% m-nitroaniline exclusively"
        ],
        "A",
        "Direct nitration of aniline with concentrated $HNO_3 + H_2SO_4$ at 288 K yields an unusual product distribution: 51% p-nitroaniline, 47% m-nitroaniline, and 2% o-nitroaniline. In addition, concentrated nitric acid oxidizes the activated aromatic ring to form tarry oxidation products."
    )

    # 48. Formation of meta-nitroaniline in acidic nitration
    add(ch, "Formation of Meta-Nitroaniline in Acidic Nitration",
        "Why does direct nitration of aniline produce a surprisingly large yield (47%) of m-nitroaniline, even though the $-NH_2$ group is ortho/para-directing?",
        [
            "In strongly acidic nitrating mixture, aniline is extensively protonated to the anilinium ion ($-NH_3^+$), which is a powerful meta-directing deactivator",
            "The nitronium ion ($NO_2^+$) undergoes steric repulsion that forces it exclusively to the meta position",
            "The amino group undergoes rearrangement from para to meta at 288 K",
            "Sulfuric acid sulfonates the para position first, forcing nitration into the meta position"
        ],
        "A",
        "In the strongly acidic nitrating medium ($HNO_3 + H_2SO_4$), aniline acts as a base and is largely protonated to form the anilinium cation: $C_6H_5NH_2 + H^+ \\rightleftharpoons C_6H_5NH_3^+$. The positively charged $-NH_3^+$ group has a strong $-I$ effect and lacks a lone pair, making it strongly deactivating and meta-directing. Electrophilic nitration of this anilinium ion accounts for the high (47%) yield of m-nitroaniline."
    )

    # 49. Preparation of pure p-nitroaniline
    add(ch, "Preparation of Pure p-Nitroaniline",
        "How can p-nitroaniline be prepared as the sole major product from aniline without forming significant amounts of m-nitroaniline or oxidation tars?",
        [
            "By protecting the $-NH_2$ group via acetylation to acetanilide, nitrating with $HNO_3/H_2SO_4$, followed by hydrolysis of p-nitroacetanilide",
            "By reacting aniline with liquid $NO_2$ at $-50^\\circ\\text{C}$",
            "By heating aniline with sodium nitrite and hydrochloric acid at $100^\\circ\\text{C}$",
            "By carrying out nitration in the presence of excess sodium hydroxide"
        ],
        "A",
        "To obtain p-nitroaniline cleanly: (1) Aniline is protected by acetylation with acetic anhydride in pyridine to form acetanilide ($C_6H_5NHCOCH_3$). (2) Acetanilide is not significantly protonated under nitrating conditions, and the bulky $-NHCOCH_3$ group directs the incoming nitronium ion ($NO_2^+$) predominantly to the para position, giving 4-nitroacetanilide. (3) Hydrolysis of 4-nitroacetanilide with aqueous acid or base yields pure p-nitroaniline."
    )

    # 50. Aniline and Friedel-Crafts reaction
    add(ch, "Aniline and Friedel-Crafts Reaction",
        "Why does aniline NOT undergo Friedel-Crafts alkylation or acylation reactions when treated with an alkyl/acyl halide and anhydrous $AlCl_3$?",
        [
            "Anhydrous $AlCl_3$ (Lewis acid) forms a coordination complex with the basic nitrogen lone pair, creating a positive charge that strongly deactivates the ring",
            "Alkyl halides undergo instant reduction in the presence of aromatic amines",
            "The benzene ring of aniline is too electron-deficient to react with electrophiles",
            "Aniline dimerizes into azobenzene as soon as aluminium chloride is introduced"
        ],
        "A",
        "Aniline is a Lewis base (due to the lone pair on $-NH_2$) while aluminium chloride ($AlCl_3$) is a strong Lewis acid. They undergo an acid-base complexation reaction: $C_6H_5NH_2 + AlCl_3 \\to C_6H_5NH_2^+-AlCl_3^-$. The development of a positive charge on the nitrogen directly bonded to the aromatic ring exerts a strong $-I$ effect, heavily deactivating the benzene ring toward electrophilic attack and preventing Friedel-Crafts reactions."
    )

    # 51. Sulphonation of aniline
    add(ch, "Sulphonation of Aniline",
        "When aniline is heated with concentrated sulfuric acid at 453–473 K, what is the major organic product formed?",
        [
            "Sulphanilic acid (4-aminobenzenesulphonic acid)",
            "2-Aminobenzenesulphonic acid (orthanilic acid)",
            "3-Aminobenzenesulphonic acid (metanilic acid)",
            "Benzenesulphonic acid"
        ],
        "A",
        "Aniline reacts initially with concentrated $H_2SO_4$ to form anilinium hydrogen sulphate ($C_6H_5NH_3^+HSO_4^-$). On prolonged heating at 453–473 K, this salt undergoes rearrangement to yield sulphanilic acid (4-aminobenzenesulphonic acid, p-aminobenzenesulphonic acid) as the major product."
    )

    # 52. Zwitterion structure of sulphanilic acid
    add(ch, "Zwitterion Structure of Sulphanilic Acid",
        "Sulphanilic acid exists predominantly in the form of an internal dipolar ion (zwitterion). What is the chemical formula of this species?",
        [
            "$^+H_3N-C_6H_4-SO_3^-$",
            "$H_2N-C_6H_4-SO_3H$",
            "$^+H_3N-C_6H_4-SO_3H \\cdot Cl^-$",
            "$H_2N-C_6H_4-SO_2^-$"
        ],
        "A",
        "Sulphanilic acid contains both an acidic sulfonic group ($-SO_3H$) and a basic amino group ($-NH_2$) in the same molecule. The strongly acidic sulfonic group transfers a proton to the basic amino group, forming a dipolar internal salt known as a zwitterion: $^+H_3N-C_6H_4-SO_3^-$. Because of this ionic structure, sulphanilic acid has a high melting point and is insoluble in non-polar organic solvents."
    )

    # 53. Diazotisation reaction conditions
    add(ch, "Diazotisation Reaction Conditions",
        "In the preparation of benzenediazonium chloride from aniline, why must the temperature be strictly maintained between 273 and 278 K ($0-5^\\circ\\text{C}$)?",
        [
            "Arenediazonium salts are thermally unstable and decompose into phenol and nitrogen gas at temperatures above $5^\\circ\\text{C}$",
            "Sodium nitrite fails to dissolve in aqueous hydrochloric acid below $273\\text{ K}$",
            "Aniline solidifies into an unreactive crystalline mass at $10^\\circ\\text{C}$",
            "Hydrochloric acid evaporates completely at room temperature, halting the reaction"
        ],
        "A",
        "Benzenediazonium chloride is stable only in cold aqueous solution ($273-278\\text{ K}$). At higher temperatures (above $5^\\circ\\text{C}$), it readily undergoes nucleophilic attack by water (hydrolysis), decomposing into phenol and liberating nitrogen gas: $C_6H_5N_2^+Cl^- + H_2O \\xrightarrow{\\Delta} C_6H_5OH + N_2\\uparrow + HCl$."
    )

    # 54. Stability difference: arenediazonium vs alkanediazonium
    add(ch, "Stability Difference: Arenediazonium vs Alkanediazonium Salts",
        "Why are arenediazonium salts ($ArN_2^+X^-$) significantly more stable than primary aliphatic diazonium salts ($RN_2^+X^-$)?",
        [
            "The positive charge on the diazonium group is delocalized over the benzene ring through resonance, whereas aliphatic diazonium ions cannot delocalize charge and rapidly expel $N_2$",
            "Aliphatic diazonium salts are ionic while arenediazonium salts are non-polar covalent",
            "Arenediazonium salts contain strong intramolecular hydrogen bonds that aliphatic salts lack",
            "The phenyl cation formed upon nitrogen loss is far more stable than an aliphatic carbocation"
        ],
        "A",
        "In arenediazonium ions, the positive charge on the diazonium group is dispersed over the aromatic ring through resonance structures involving the ring $\\pi$-electrons ($C_6H_5-N^+\\equiv N \\leftrightarrow$ ortho/para-positive structures). In contrast, aliphatic diazonium ions have no resonance stabilization; furthermore, loss of extremely stable $N_2$ gas generates an aliphatic carbocation with high thermodynamic driving force, causing instant decomposition even below $0^\\circ\\text{C}$."
    )

    # 55. Benzenediazonium fluoroborate isolation
    add(ch, "Benzenediazonium Fluoroborate Isolation",
        "Unlike benzenediazonium chloride which is usually kept in cold solution, benzenediazonium fluoroborate ($C_6H_5N_2^+BF_4^-$) is unique because:",
        [
            "It is insoluble in water and stable as a dry solid at room temperature",
            "It is a volatile liquid that can be purified by fractional distillation",
            "It spontaneously converts into liquid benzene upon standing",
            "It dissolves in non-polar hexane without dissociation"
        ],
        "A",
        "Benzenediazonium fluoroborate ($C_6H_5N_2^+BF_4^-$) precipitates out as a water-insoluble crystalline solid when fluoroboric acid ($HBF_4$) is added to a diazonium solution. It is remarkably stable at room temperature and can be filtered, dried, and stored safely without exploding."
    )

    # 56. Hazard of dry diazonium salts
    add(ch, "Hazard of Dry Diazonium Salts",
        "Why are dry solid arenediazonium halides, such as benzenediazonium chloride, never isolated in the solid state during organic syntheses?",
        [
            "They are dangerously explosive and detonate violently upon drying, friction, or slight shock",
            "They are intensely radioactive and emit alpha particles",
            "They absorb atmospheric moisture and revert into aniline within seconds",
            "They react with atmospheric oxygen to form toxic chloramine gas"
        ],
        "A",
        "Dry arenediazonium chlorides and nitrates are shock-sensitive and thermally unstable; they can detonate violently when dry. Therefore, they are virtually never isolated in solid form, but are instead kept in cold aqueous solution and used in situ immediately after preparation."
    )

    # 57. Sandmeyer reaction for halobenzenes
    add(ch, "Sandmeyer Reaction for Halobenzenes",
        "In the Sandmeyer reaction, freshly prepared benzenediazonium chloride is converted to chlorobenzene or bromobenzene using which catalytic reagents?",
        [
            "Cuprous chloride dissolved in $HCl$ ($Cu_2Cl_2 / HCl$) or cuprous bromide dissolved in $HBr$ ($Cu_2Br_2 / HBr$)",
            "Chlorine gas or bromine liquid in the presence of anhydrous $FeCl_3$",
            "Sodium chloride or sodium bromide dissolved in liquid ammonia",
            "Hydrochloric acid or hydrobromic acid with zinc dust"
        ],
        "A",
        "In the Sandmeyer reaction, the diazonium group ($-N_2^+Cl^-$) is replaced by $-Cl$ or $-Br$ by treating the cold diazonium salt solution with cuprous chloride in $HCl$ ($Cu_2Cl_2/HCl$) or cuprous bromide in $HBr$ ($Cu_2Br_2/HBr$), liberating nitrogen gas: $ArN_2^+Cl^- \\xrightarrow{Cu_2Cl_2/HCl} ArCl + N_2$."
    )

    # 58. Sandmeyer reaction for benzonitrile
    add(ch, "Sandmeyer Reaction for Benzonitrile",
        "How is benzenediazonium chloride converted into benzonitrile (cyanobenzene) via the Sandmeyer reaction?",
        [
            "By treatment with cuprous cyanide and potassium cyanide ($CuCN / KCN$)",
            "By reaction with aqueous hydrogen cyanide ($HCN$) in the presence of $NaOH$",
            "By heating with silver cyanide ($AgCN$) in ethanol",
            "By passing cyanogen gas ($C_2N_2$) over dry diazonium salt"
        ],
        "A",
        "Benzenediazonium chloride reacts smoothly with a solution of cuprous cyanide in aqueous potassium cyanide ($CuCN/KCN$) to yield benzonitrile with evolution of nitrogen gas: $C_6H_5N_2^+Cl^- + CuCN \\to C_6H_5CN + N_2 + CuCl$."
    )

    # 59. Gatterman reaction reagents
    add(ch, "Gatterman Reaction Reagents",
        "How does the Gatterman reaction differ from the Sandmeyer reaction for introducing a chlorine or bromine atom onto the benzene ring from a diazonium salt?",
        [
            "The Gatterman reaction uses copper powder ($Cu$) in the presence of halogen acid ($HCl$ or $HBr$) instead of cuprous halide ($Cu_2X_2$)",
            "The Gatterman reaction uses copper sulfate in alkaline medium instead of cuprous chloride",
            "The Gatterman reaction produces higher yields than the Sandmeyer reaction",
            "The Gatterman reaction does not liberate nitrogen gas"
        ],
        "A",
        "In the Gatterman reaction, chlorine or bromine is introduced into the benzene ring by treating the diazonium salt solution with copper powder ($Cu$) in the presence of the corresponding halogen acid ($HCl$ or $HBr$): $ArN_2^+Cl^- \\xrightarrow{Cu/HCl} ArCl + N_2 + CuCl$. The yield in the Gatterman reaction is generally lower than that in the Sandmeyer reaction."
    )

    # 60. Balz-Schiemann reaction
    add(ch, "Balz-Schiemann Reaction",
        "Fluorobenzene cannot be prepared efficiently by direct fluorination of benzene. Which sequence of reagents in the Balz-Schiemann reaction prepares pure fluorobenzene from benzenediazonium chloride?",
        [
            "Treatment with fluoroboric acid ($HBF_4$) to precipitate benzenediazonium fluoroborate ($C_6H_5N_2^+BF_4^-$), followed by dry heating",
            "Treatment with liquid hydrogen fluoride ($HF$) at $200^\\circ\\text{C}$ in an autoclave",
            "Treatment with fluorine gas ($F_2$) over a copper catalyst",
            "Reaction with sodium fluoride ($NaF$) in dimethyl sulfoxide at room temperature"
        ],
        "A",
        "In the Balz-Schiemann reaction, benzenediazonium chloride is treated with fluoroboric acid ($HBF_4$) to precipitate insoluble benzenediazonium fluoroborate: $C_6H_5N_2^+Cl^- + HBF_4 \\to C_6H_5N_2^+BF_4^- \\downarrow + HCl$. The isolated and dried fluoroborate salt is then heated gently, undergoing thermal decomposition to yield fluorobenzene, boron trifluoride, and nitrogen: $C_6H_5N_2^+BF_4^- \\xrightarrow{\\Delta} C_6H_5F + BF_3 + N_2$."
    )

    # 61. Iodobenzene preparation from diazonium salt
    add(ch, "Iodobenzene Preparation from Diazonium Salt",
        "How is benzenediazonium chloride converted into iodobenzene ($C_6H_5I$)?",
        [
            "Simply by warming the aqueous diazonium salt solution with potassium iodide ($KI$) without any copper catalyst",
            "By reaction with iodine crystals ($I_2$) in the presence of anhydrous $AlCl_3$",
            "By treatment with cuprous iodide ($Cu_2I_2$) in hydriodic acid ($HI$)",
            "By heating with sodium hypoiodite ($NaOI$) in basic solution"
        ],
        "A",
        "Unlike chlorine, bromine, or cyanide substitution, the introduction of iodine does not require a cuprous halide or copper catalyst. Shaking or warming the diazonium salt solution with aqueous potassium iodide ($KI$) cleanly yields iodobenzene with nitrogen evolution: $C_6H_5N_2^+Cl^- + KI \\to C_6H_5I + KCl + N_2\\uparrow$."
    )

    # 62. Reduction of diazonium salt to benzene
    add(ch, "Deamination / Reduction of Diazonium Salt to Benzene",
        "Which of the following mild reducing agents converts benzenediazonium chloride directly into benzene ($C_6H_6$)?",
        [
            "Hypophosphorous acid ($H_3PO_2$) in the presence of water, or ethanol ($CH_3CH_2OH$)",
            "Concentrated nitric acid ($HNO_3$)",
            "Lithium aluminium hydride ($LiAlH_4$) in ether",
            "Potassium permanganate ($KMnO_4$) in alkaline solution"
        ],
        "A",
        "Mild reducing agents such as hypophosphorous acid (phosphinic acid, $H_3PO_2$) or ethanol reduce arenediazonium salts to arenes while themselves being oxidized to phosphorous acid ($H_3PO_3$) or ethanal ($CH_3CHO$), respectively: $ArN_2^+Cl^- + H_3PO_2 + H_2O \\to ArH + N_2 + H_3PO_3 + HCl$ and $ArN_2^+Cl^- + CH_3CH_2OH \\to ArH + N_2 + CH_3CHO + HCl$."
    )

    # 63. Hydrolysis of diazonium salt to phenol
    add(ch, "Hydrolysis of Diazonium Salt to Phenol",
        "When an aqueous solution of benzenediazonium chloride is warmed to above 283 K (or boiled with dilute sulfuric acid), what is the major organic product?",
        [
            "Phenol ($C_6H_5OH$)",
            "Chlorobenzene ($C_6H_5Cl$)",
            "Diphenyl ether ($C_6H_5OC_6H_5$)",
            "Benzoic acid ($C_6H_5COOH$)"
        ],
        "A",
        "When the temperature of a diazonium salt solution rises above $10^\\circ\\text{C}$ (283 K) or the solution is heated with dilute sulfuric acid, water acts as a nucleophile, displacing the diazonium group to yield phenol and releasing nitrogen gas: $C_6H_5N_2^+Cl^- + H_2O \\xrightarrow{\\Delta} C_6H_5OH + N_2\\uparrow + HCl$."
    )

    # 64. Azo coupling with phenol
    add(ch, "Azo Coupling with Phenol",
        "When benzenediazonium chloride is reacted with an alkaline solution of phenol at pH 9–10 at 273–278 K, what dye is produced?",
        [
            "p-Hydroxyazobenzene (an orange azo dye)",
            "p-Aminoazobenzene (a yellow azo dye)",
            "Phenolphthalein (a colorless indicator)",
            "Fluorescein (a green fluorescent dye)"
        ],
        "A",
        "Benzenediazonium chloride acts as an electrophile and couples with phenol at the para position in mildly alkaline medium (pH 9–10, which converts phenol into the more nucleophilic phenoxide ion) to produce p-hydroxyazobenzene, an orange-colored azo dye: $C_6H_5N_2^+Cl^- + C_6H_5OH + OH^- \\to C_6H_5-N=N-C_6H_4-OH + Cl^- + H_2O$."
    )

    # 65. Azo coupling with aniline
    add(ch, "Azo Coupling with Aniline",
        "When benzenediazonium chloride reacts with aniline in a mildly acidic medium (pH 4–5) at 273–278 K, what is the product and its color?",
        [
            "p-Aminoazobenzene (a yellow azo dye)",
            "p-Hydroxyazobenzene (an orange dye)",
            "Azobenzene (a red crystalline solid)",
            "Hydrazobenzene (a colorless compound)"
        ],
        "A",
        "In a mildly acidic medium (pH 4–5), benzenediazonium chloride couples with aniline at the para position to form p-aminoazobenzene, which is a bright yellow azo dye: $C_6H_5N_2^+Cl^- + C_6H_5NH_2 \\xrightarrow{\\text{pH 4-5}} C_6H_5-N=N-C_6H_4-NH_2 + HCl$. The acidic pH maintains sufficient free, unprotonated aniline to act as the nucleophile."
    )

    return qs
