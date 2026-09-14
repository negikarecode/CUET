from scripts.chem_generators.common import make_question, normalize_text

def get_biomolecules_questions(seen):
    qs = []

    def add(ch, top, text, opts, ans, sol):
        norm = normalize_text(text)
        assert norm not in seen, f"Duplicate detected in biomolecules: {text[:50]}"
        seen.add(norm)
        qs.append(make_question(ch, top, text, opts, ans, sol))

    ch = "Biomolecules"

    # 1-5: Carbohydrates Classification & Reducing/Non-reducing Nature
    add(ch, "Carbohydrates Classification Monosaccharides",
        "Which class of carbohydrates cannot undergo further hydrolysis into simpler polyhydroxy aldehydes or ketones?",
        [
            "Monosaccharides",
            "Disaccharides",
            "Oligosaccharides",
            "Polysaccharides"
        ],
        "A",
        "Monosaccharides are the simplest carbohydrate units that cannot be hydrolysed further to give simpler units of polyhydroxy aldehydes or ketones. Examples include D-glucose, D-fructose, D-galactose, and D-ribose. In contrast, oligosaccharides yield 2 to 10 monosaccharide units on hydrolysis, and polysaccharides yield a large number of monosaccharide units."
    )

    add(ch, "Carbohydrates Classification Oligosaccharides",
        "Carbohydrates that yield between two and ten monosaccharide units upon hydrolysis are systematically categorized as:",
        [
            "Oligosaccharides",
            "Polysaccharides",
            "Monosaccharides",
            "Mucopolysaccharides"
        ],
        "A",
        "According to NCERT classification, carbohydrates that yield 2 to 10 monosaccharide units upon hydrolysis are termed oligosaccharides. Depending on whether they produce two, three, or four monosaccharide molecules, they are further designated as disaccharides, trisaccharides, or tetrasaccharides."
    )

    add(ch, "Reducing and Non-reducing Sugars Chemical Criteria",
        "What essential structural feature determines whether a carbohydrate functions as a reducing sugar?",
        [
            "The presence of a free or hemiacetal carbonyl group (aldehyde or ketone) capable of opening into an active carbonyl form",
            "The presence of an esterified carboxyl group at the terminal carbon of the sugar",
            "The presence of exclusively $\\beta-1,4$-glycosidic linkages connecting the sugar rings",
            "The complete absence of asymmetric (chiral) carbon atoms in the molecule"
        ],
        "A",
        "Carbohydrates that reduce Fehling's solution and Tollens' reagent are termed reducing sugars. This reducing ability requires the presence of a free aldehyde or ketone group, or a cyclic hemiacetal/hemiketal that can readily open in aqueous alkaline solution to expose a free carbonyl group. When the anomeric carbon is tied up in a glycosidic acetal bond, the sugar is non-reducing."
    )

    add(ch, "Sucrose Non-reducing Nature",
        "Why is sucrose classified as a non-reducing disaccharide, whereas maltose and lactose are reducing disaccharides?",
        [
            "Both the reducing groups ($C_1$ of $\\alpha$-D-glucose and $C_2$ of $\\beta$-D-fructose) are involved in forming the glycosidic linkage",
            "Sucrose consists solely of secondary alcoholic groups and lacks ring oxygen heteroatoms",
            "Sucrose undergoes spontaneous dehydration in aqueous solution to yield an enol",
            "The glycosidic linkage in sucrose is formed strictly between the primary alcohol groups at $C_6$"
        ],
        "A",
        "In sucrose, the glycosidic bond joins the anomeric carbon $C_1$ of $\\alpha$-D-glucose with the anomeric carbon $C_2$ of $\\beta$-D-fructose. Since both potential reducing carbonyl centers are involved in the glycosidic linkage, neither unit has a free hemiacetal or hemiketal group to open and reduce Fehling's or Tollens' reagent. Hence, sucrose is a non-reducing sugar."
    )

    add(ch, "Reducing Disaccharides Maltose and Lactose",
        "Which of the following explains why maltose retains reducing properties despite being a disaccharide?",
        [
            "The hemiacetal group at $C_1$ of the second glucose unit remains free and can open to form a free aldehyde group",
            "The glycosidic bond between the two glucose rings is an unstable ionic bond",
            "Maltose contains an open ketone group at $C_3$ in both glucose rings",
            "The $\\alpha-1,4$-glycosidic bond readily hydrolyses into free formaldehyde"
        ],
        "A",
        "Maltose is composed of two $\\alpha$-D-glucose units joined by an $\\alpha-1,4$-glycosidic linkage. The $C_1$ of the first glucose is bonded to $C_4$ of the second glucose. The hemiacetal group at $C_1$ of the second glucose residue is free, allowing ring opening in solution to yield a free aldehyde group capable of reducing Tollens' and Fehling's solutions."
    )

    # 6-16: Glucose Structure, Reactions, Limitations of Open Chain, Anomers
    add(ch, "Glucose Reduction with HI",
        "Prolonged heating of D-glucose with concentrated hydriodic acid ($\\text{HI}$) and red phosphorus at $373\\text{ K}$ yields:",
        [
            "n-Hexane, proving that all six carbon atoms are linked in a continuous unbranched chain",
            "Cyclohexane, indicating the presence of a six-membered carbocyclic ring",
            "Gluconic acid, indicating selective reduction of terminal primary alcohols",
            "Hexanoic acid, indicating reduction followed by monodecarboxylation"
        ],
        "A",
        "On prolonged heating with concentrated hydriodic acid ($\\text{HI}$) in the presence of red phosphorus, D-glucose undergoes complete reduction of all hydroxyl groups and the carbonyl group to give n-hexane ($\\text{CH}_3-(\\text{CH}_2)_4-\\text{CH}_3$). This classic reaction demonstrates that all six carbon atoms in glucose are linked in a continuous straight chain."
    )

    add(ch, "Glucose Reaction with Hydroxylamine",
        "When D-glucose is treated with hydroxylamine ($\\text{NH}_2\\text{OH}$), it reacts to form an oxime. This reaction provides experimental evidence for:",
        [
            "The presence of a carbonyl group ($>C=O$) in the glucose molecule",
            "The presence of exactly five hydroxyl groups distributed along the chain",
            "The presence of an aromatic benzene nucleus in glucose",
            "The existence of a glycosidic ether linkage in glucose"
        ],
        "A",
        "Glucose reacts with hydroxylamine ($\\text{NH}_2\\text{OH}$) via nucleophilic addition followed by dehydration to yield glucose oxime. It also adds one molecule of hydrogen cyanide ($\\text{HCN}$) to form a cyanohydrin. Both of these addition reactions confirm the presence of a carbonyl group ($>C=O$) in glucose."
    )

    add(ch, "Glucose Reaction with HCN",
        "Reaction of D-glucose with hydrogen cyanide ($\\text{HCN}$) yields glucose cyanohydrin. This provides chemical evidence that:",
        [
            "A carbonyl group ($>C=O$) is present and accessible for nucleophilic addition",
            "Glucose contains a primary alcohol group at $C_6$",
            "Glucose contains five asymmetric carbon centers in its open chain",
            "The molecule contains a terminal carbon-carbon triple bond"
        ],
        "A",
        "Nucleophilic addition of cyanide ion from $\\text{HCN}$ to the carbonyl group of glucose produces glucose cyanohydrin. This reaction confirms the presence of a carbonyl group ($>C=O$) in glucose."
    )

    add(ch, "Glucose Mild Oxidation with Bromine Water",
        "When D-glucose is treated with a mild oxidizing agent like bromine water ($\\text{Br}_2/\\text{H}_2\\text{O}$), it is selectively converted to:",
        [
            "Gluconic acid, indicating that the carbonyl group is an aldehyde ($-CHO$)",
            "Saccharic acid, indicating simultaneous oxidation of both terminal carbons",
            "Tartaric acid, formed by oxidative cleavage of the central carbon-carbon bond",
            "Sorbitol, formed by selective catalytic hydrogenation"
        ],
        "A",
        "Bromine water is a mild oxidizing agent that selectively oxidizes the aldehyde group ($-CHO$) of glucose to a monocarboxylic acid without oxidizing the primary or secondary alcohol groups. The resulting six-carbon monocarboxylic acid is gluconic acid ($\\text{HOCH}_2-(\\text{CHOH})_4-\\text{COOH}$). This confirms that the carbonyl group in glucose is an aldehydic group."
    )

    add(ch, "Glucose Strong Oxidation with Nitric Acid",
        "Oxidation of D-glucose with concentrated nitric acid ($\\text{HNO}_3$) yields a dicarboxylic acid known as:",
        [
            "Saccharic acid (glucaric acid), confirming the presence of a primary alcohol group alongside the aldehyde",
            "Gluconic acid, confirming the presence of only a single oxidizable group",
            "Adipic acid, formed by complete dehydroxylation followed by oxidation",
            "Oxalic acid, formed by fragmentation into two-carbon units"
        ],
        "A",
        "Concentrated nitric acid ($\\text{HNO}_3$) is a strong oxidizing agent. It oxidizes both the terminal aldehyde group ($-CHO$ at $C_1$) and the terminal primary alcohol group ($-\\text{CH}_2\\text{OH}$ at $C_6$) of glucose to carboxylic acid groups ($-COOH$), yielding the six-carbon dicarboxylic acid saccharic acid (glucaric acid). This confirms that glucose contains a primary alcoholic group."
    )

    add(ch, "Glucose Acetylation Evidence for Hydroxyl Groups",
        "Acetylation of D-glucose with acetic anhydride in the presence of pyridine produces glucose pentaacetate. What does this result prove about glucose?",
        [
            "Glucose contains five hydroxyl ($-OH$) groups attached to five distinct carbon atoms",
            "Glucose contains five aldehyde groups along its carbon backbone",
            "Glucose contains five carboxyl groups forming internal lactones",
            "All five oxygen atoms in glucose belong to cyclic ether linkages"
        ],
        "A",
        "Reaction of glucose with acetic anhydride yields a stable pentaacetate derivative (glucose pentaacetate), indicating the presence of five $-OH$ groups. Because glucose is a stable compound, these five $-OH$ groups must be attached to five distinct carbon atoms, since having two or more $-OH$ groups on the same carbon atom would result in instability and spontaneous loss of water."
    )

    add(ch, "Limitations of Open-Chain Structure Schiff and Bisulphite",
        "Which of the following experimental facts could NOT be explained by the open-chain aldehyde formula of D-glucose?",
        [
            "Glucose does not react with $\\text{NaHSO}_3$, fails to react with 2,4-DNP, and does not restore the pink color of Schiff's reagent",
            "Glucose is completely reduced to n-hexane upon prolonged heating with $\\text{HI}$",
            "Glucose forms an oxime upon reaction with hydroxylamine",
            "Glucose is oxidized to gluconic acid by bromine water"
        ],
        "A",
        "Despite having an aldehyde group in its proposed open-chain formula, glucose fails to give certain characteristic aldehyde reactions: it does not form a hydrogensulphite addition compound with $\\text{NaHSO}_3$, does not react with 2,4-DNP, and does not give a pink color with Schiff's reagent. This proved that the aldehyde group is not freely available in substantial amounts and pointed to a cyclic hemiacetal structure."
    )

    add(ch, "Limitations of Open-Chain Structure Glucose Pentaacetate",
        "Glucose pentaacetate does not react with hydroxylamine ($\\text{NH}_2\\text{OH}$) to form an oxime. What structural conclusion is drawn from this behavior?",
        [
            "The anomeric $-OH$ at $C_1$ is locked as an acetate ester, preventing open-chain $-CHO$ regeneration",
            "Hydroxylamine is rendered chemically inactive by acetate ions",
            "All five acetate groups are attached exclusively to the $C_1$ carbon atom",
            "Glucose pentaacetate possesses a linear keto-enol equilibrium"
        ],
        "A",
        "In glucose pentaacetate, the $-OH$ on the anomeric carbon ($C_1$) is converted into an acetate ester ($C_1-O-\\text{COCH}_3$). Unlike the free hemiacetal $-OH$ of glucose, this acetal/ester group cannot readily open under mild conditions to regenerate a free aldehyde ($-CHO$) group. The absence of a free $-CHO$ group prevents oxime formation with $\\text{NH}_2\\text{OH}$, proving that glucose exists as a cyclic hemiacetal involving the $C_1$ hydroxyl."
    )

    add(ch, "Anomers and Anomeric Carbon in D-Glucose",
        "The two cyclic isomeric forms of D-glucose, $\\alpha$-D-glucopyranose and $\\beta$-D-glucopyranose, are termed anomers because they differ solely in:",
        [
            "The spatial configuration of the hydroxyl group at the anomeric hemiacetal carbon ($C_1$)",
            "The absolute configuration at the penultimate asymmetric carbon ($C_5$)",
            "The position of the primary alcohol group at $C_6$",
            "The ring size, one being five-membered and the other being six-membered"
        ],
        "A",
        "$\\alpha$-D-(+)-glucopyranose and $\\beta$-D-(+)-glucopyranose differ in configuration only at $C_1$, which was the carbonyl carbon in the open-chain form and became an asymmetric center upon cyclization to a hemiacetal. This carbon is called the anomeric carbon, and such stereoisomeric pairs are known as anomers."
    )

    add(ch, "Mutarotation in D-Glucose",
        "Freshly prepared aqueous solutions of pure $\\alpha$-D-glucose and pure $\\beta$-D-glucose have initial specific optical rotations of $+112^\\circ$ and $+19^\\circ$, respectively. Over time, both solutions equilibrate to $+52.5^\\circ$. What is this phenomenon called?",
        [
            "Mutarotation, caused by slow interconversion between $\\alpha$ and $\\beta$ anomers via the open-chain form",
            "Optical inversion, caused by hydrolysis of the pyranose ring into lactic acid",
            "Enantiomeric resolution, caused by selective precipitation of the $\\alpha$-anomer",
            "Photochemical racemization, caused by ultraviolet excitation of the hemiacetal bond"
        ],
        "A",
        "The spontaneous change in specific optical rotation of an optically active carbohydrate solution until reaching a constant equilibrium value is called mutarotation. When either pure $\\alpha$-D-glucose ($+112^\\circ$) or pure $\\beta$-D-glucose ($+19^\\circ$) is dissolved in water, the ring opens and closes reversibly, establishing an equilibrium mixture containing $\\sim 36\\%\\ \\alpha$-anomer, $\\sim 64\\%\\ \\beta$-anomer, and trace open-chain form, with a net rotation of $+52.5^\\circ$ (or $+52.7^\\circ$)."
    )

    add(ch, "Haworth Projection of Alpha-D-Glucopyranose",
        "In the Haworth projection of $\\alpha$-D-glucopyranose, the orientation of the hydroxyl ($-OH$) groups relative to the plane of the six-membered pyranose ring is:",
        [
            "Below the plane at $C_1$, $C_2$, and $C_4$, and above the plane at $C_3$",
            "Above the plane at $C_1$, $C_2$, and $C_4$, and below the plane at $C_3$",
            "Below the plane at all carbons $C_1$ through $C_4$",
            "Above the plane at $C_1$ and $C_2$, and below the plane at $C_3$ and $C_4$"
        ],
        "A",
        "In Haworth projection rules: groups situated on the right side of the vertical Fischer projection point downward (below the plane of the ring), while groups on the left point upward (above the plane). For $\\alpha$-D-glucopyranose, the $-OH$ groups at $C_1$, $C_2$, and $C_4$ are on the right in the Fischer projection and thus point downwards (below the plane), whereas the $-OH$ at $C_3$ is on the left and points upwards (above the plane). The $-\\text{CH}_2\\text{OH}$ group at $C_5$ points upwards for D-sugars."
    )

    # 17-20: Fructose Structure, Furanose Ring, Anomeric Carbon, Reducing Behavior
    add(ch, "D-Fructose Structural Classification",
        "Based on its carbonyl functional group and total number of carbon atoms, D-fructose is systematically classified as a:",
        [
            "Ketohexose",
            "Aldohexose",
            "Ketopentose",
            "Aldopentose"
        ],
        "A",
        "D-fructose has the molecular formula $\\text{C}_6\\text{H}_{12}\\text{O}_6$. It contains a ketone carbonyl group at $C_2$ and a total of six carbon atoms, so it is systematically classified as a ketohexose."
    )

    add(ch, "Furanose Ring Formation in D-Fructose",
        "In solution, D-fructose predominantly forms a five-membered furanose ring. This cyclic hemiketal is formed by the nucleophilic addition of:",
        [
            "The hydroxyl group at $C_5$ to the ketonic carbonyl carbon at $C_2$",
            "The primary alcohol group at $C_1$ to the carbonyl at $C_2$",
            "The hydroxyl group at $C_4$ to the aldehyde at $C_1$",
            "The primary alcohol group at $C_6$ to the ketonic carbonyl at $C_3$"
        ],
        "A",
        "D-fructose cyclizes through intramolecular nucleophilic addition of the $-OH$ group at $C_5$ to the ketonic carbonyl carbon at $C_2$. This forms a five-membered cyclic hemiketal ring consisting of four carbon atoms ($C_2, C_3, C_4, C_5$) and one ring oxygen atom, resembling furan (hence called a furanose ring)."
    )

    add(ch, "Anomeric Carbon in D-Fructose",
        "Which carbon atom acts as the anomeric carbon in the cyclic furanose form of D-fructose?",
        [
            "$C_2$",
            "$C_1$",
            "$C_3$",
            "$C_5$"
        ],
        "A",
        "In D-fructose, the carbonyl carbon in the open-chain form is at $C_2$. When cyclization occurs by addition of the $C_5-OH$ onto the $C_2$ carbonyl, $C_2$ becomes a chiral hemiketal center. Therefore, $C_2$ is the anomeric carbon in fructose (unlike glucose, where the anomeric carbon is $C_1$)."
    )

    add(ch, "Reducing Nature of Fructose via Enediol Tautomerism",
        "Even though D-fructose is a ketose rather than an aldose, it actively reduces Fehling's solution and Tollens' reagent. This reducing capability is attributed to:",
        [
            "Keto-enol tautomerization in alkaline solution via an enediol intermediate to form aldoses (glucose and mannose)",
            "Spontaneous acid-catalyzed cleavage of the furanose ring into formaldehyde molecules",
            "Direct hydride transfer from the $C_6$ primary alcoholic carbon to silver ions",
            "The presence of a hidden aldehyde group at the $C_4$ position of the furanose ring"
        ],
        "A",
        "Tollens' and Fehling's reagents are alkaline solutions. Under mildly alkaline conditions, $\\alpha$-hydroxy ketones like D-fructose undergo base-catalyzed enolization (Lobry de Bruyn-van Ekenstein transformation) via an enediol intermediate, isomerizing into aldoses (D-glucose and D-mannose). These aldoses readily reduce the metal cations in the reagents, making fructose act as a reducing sugar."
    )

    # 21-26: Disaccharides & Invert Sugar
    add(ch, "Inversion of Optical Rotation in Sucrose Hydrolysis",
        "Sucrose is dextrorotatory ($[\\alpha]_D = +66.5^\\circ$), but its acid hydrolysis yields an equimolar mixture of glucose and fructose that is levorotatory ($[\\alpha]_D = -19.9^\\circ$). Why does this optical inversion take place?",
        [
            "The levorotation of D-(-)-fructose ($-92.4^\\circ$) is significantly greater in magnitude than the dextrorotation of D-(+)-glucose ($+52.5^\\circ$)",
            "D-(+)-glucose is completely destroyed during hydrolysis, leaving only levorotatory fructose",
            "The acid catalyst induces an inversion of configuration at all asymmetric centers via an $S_N2$ mechanism",
            "Sucrose racemizes completely into an optically inactive meso compound"
        ],
        "A",
        "Sucrose is dextrorotatory ($+66.5^\\circ$). Upon hydrolysis, it breaks down into equimolar amounts of D-(+)-glucose ($[\\alpha]_D = +52.5^\\circ$) and D-(-)-fructose ($[\\alpha]_D = -92.4^\\circ$). Because the magnitude of levorotation of fructose ($-92.4^\\circ$) is much larger than the dextrorotation of glucose ($+52.5^\\circ$), the net resulting mixture has a levorotatory rotation of approximately $-19.95^\\circ \\approx -19.9^\\circ$. The sign of rotation changes from dextro (+) to levo (-), which is why the hydrolysed mixture is called invert sugar."
    )

    add(ch, "Sucrose Glycosidic Linkage",
        "What are the specific monosaccharide components and glycosidic linkage connecting them in sucrose?",
        [
            "$\\alpha$-D-glucopyranose and $\\beta$-D-fructofuranose joined by an $\\alpha-1,\\beta-2$-glycosidic linkage",
            "Two $\\alpha$-D-glucopyranose units joined by an $\\alpha-1,4$-glycosidic linkage",
            "$\\beta$-D-galactopyranose and $\\beta$-D-glucopyranose joined by a $\\beta-1,4$-glycosidic linkage",
            "Two $\\beta$-D-glucopyranose units joined by a $\\beta-1,6$-glycosidic linkage"
        ],
        "A",
        "Sucrose (cane sugar) is a disaccharide composed of an $\\alpha$-D-glucopyranose unit and a $\\beta$-D-fructofuranose unit. The glycosidic linkage connects the $C_1$ anomeric carbon of $\\alpha$-D-glucose to the $C_2$ anomeric carbon of $\\beta$-D-fructose ($\\alpha-1,\\beta-2$-glycosidic bond)."
    )

    add(ch, "Invertase Enzyme Catalysis",
        "The industrial hydrolysis of cane sugar (sucrose) into invert sugar is catalysed biologically by which enzyme?",
        [
            "Invertase (sucrase)",
            "Maltase",
            "Lactase",
            "Zymase"
        ],
        "A",
        "The hydrolysis of sucrose into equimolar glucose and fructose is catalysed either by dilute mineral acids or by the enzyme invertase (also called sucrase). Zymase converts glucose/fructose into ethanol, maltase hydrolyses maltose, and lactase hydrolyses lactose."
    )

    add(ch, "Maltose Structure and Linkage",
        "Maltose is a disaccharide formed during starch digestion. What are its constituent monosaccharide units and the nature of its glycosidic linkage?",
        [
            "Two $\\alpha$-D-glucose units joined by an $\\alpha-1,4$-glycosidic linkage",
            "One $\\alpha$-D-glucose and one $\\beta$-D-fructose joined by an $\\alpha-1,2$-glycosidic linkage",
            "One $\\beta$-D-galactose and one $\\beta$-D-glucose joined by a $\\beta-1,4$-glycosidic linkage",
            "Two $\\beta$-D-glucose units joined by a $\\beta-1,4$-glycosidic linkage"
        ],
        "A",
        "Maltose is composed of two $\\alpha$-D-glucose units. The glycosidic bond is formed between the hemiacetal carbon $C_1$ of the first $\\alpha$-D-glucose unit and the $C_4$ hydroxyl of the second $\\alpha$-D-glucose unit (an $\\alpha-1,4$-glycosidic linkage)."
    )

    add(ch, "Lactose Monosaccharide Composition",
        "Hydrolysis of lactose (milk sugar) by the enzyme lactase yields an equimolar mixture of:",
        [
            "$\\beta$-D-galactose and $\\beta$-D-glucose",
            "Two molecules of $\\alpha$-D-glucose",
            "$\\alpha$-D-glucose and $\\beta$-D-fructose",
            "Two molecules of $\\beta$-D-galactose"
        ],
        "A",
        "Lactose is a disaccharide commonly known as milk sugar. Upon hydrolysis by dilute acid or the enzyme lactase, it yields an equimolar mixture of $\\beta$-D-galactose and $\\beta$-D-glucose."
    )

    add(ch, "Lactose Glycosidic Linkage",
        "What specific glycosidic linkage joins the monosaccharide residues in lactose?",
        [
            "$\\beta-1,4$-glycosidic linkage connecting $C_1$ of $\\beta$-D-galactose to $C_4$ of $\\beta$-D-glucose",
            "$\\alpha-1,4$-glycosidic linkage connecting $C_1$ of $\\alpha$-D-glucose to $C_4$ of $\\alpha$-D-galactose",
            "$\\beta-1,6$-glycosidic linkage connecting $C_1$ of $\\beta$-D-galactose to $C_6$ of $\\beta$-D-glucose",
            "$\\alpha-1,\\beta-2$-glycosidic linkage connecting $C_1$ of $\\alpha$-D-galactose to $C_2$ of $\\beta$-D-glucose"
        ],
        "A",
        "Lactose is composed of $\\beta$-D-galactose and $\\beta$-D-glucose. The glycosidic linkage is formed between $C_1$ of $\\beta$-D-galactose and $C_4$ of $\\beta$-D-glucose, making it a $\\beta-1,4$-glycosidic linkage."
    )

    # 27-32: Polysaccharides: Starch, Cellulose, Glycogen
    add(ch, "Starch Components Amylose and Amylopectin",
        "Starch is composed of two distinct polysaccharide fractions: amylose and amylopectin. Which statement accurately contrasts their relative proportions and water solubility?",
        [
            "Amylose makes up $15-20\\%$ and is water-soluble; amylopectin makes up $80-85\\%$ and is water-insoluble",
            "Amylose makes up $80-85\\%$ and is water-insoluble; amylopectin makes up $15-20\\%$ and is water-soluble",
            "Both amylose and amylopectin are water-insoluble linear polymers of $\\beta$-D-glucose",
            "Amylose is an insoluble branched polymer ($80-85\\%$); amylopectin is a soluble linear polymer ($15-20\\%$)"
        ],
        "A",
        "Starch can be separated into two fractions: Amylose constitutes about $15-20\\%$ of starch, is water-soluble, and consists of an unbranched chain of $\\alpha$-D-glucose units. Amylopectin constitutes about $80-85\\%$ of starch, is insoluble in water, and is a branched-chain polymer."
    )

    add(ch, "Amylose Chain Structure and Linkage",
        "Which glycosidic linkage is present in the linear, unbranched polymer chain of amylose?",
        [
            "$\\alpha-1,4$-glycosidic linkage between $\\alpha$-D-glucose units",
            "$\\beta-1,4$-glycosidic linkage between $\\beta$-D-glucose units",
            "$\\alpha-1,6$-glycosidic linkage between $\\alpha$-D-glucose units",
            "$\\beta-1,6$-glycosidic linkage between $\\beta$-D-fructose units"
        ],
        "A",
        "Amylose is a long, unbranched chain polymer composed of 200 to 1000 $\\alpha$-D-glucose units held together solely by $\\alpha-1,4$-glycosidic linkages between $C_1$ of one glucose unit and $C_4$ of the next."
    )

    add(ch, "Amylopectin Branch Points Linkage",
        "In the branched architecture of amylopectin, the branch points along the linear polyglucose backbone are formed by which linkage?",
        [
            "$\\alpha-1,6$-glycosidic linkages",
            "$\\beta-1,4$-glycosidic linkages",
            "$\\alpha-1,2$-glycosidic linkages",
            "$\\beta-1,6$-glycosidic linkages"
        ],
        "A",
        "Amylopectin consists of linear chains of $\\alpha$-D-glucose units joined by $\\alpha-1,4$-glycosidic linkages, with branching occurring every 24-30 residues through $\\alpha-1,6$-glycosidic linkages between $C_1$ of the branch chain and $C_6$ of the main chain."
    )

    add(ch, "Amylose Iodine Complex Mechanism",
        "Why does amylose give an intense blue-black coloration with iodine solution, whereas cellulose produces no color change?",
        [
            "Amylose forms a helical coil that physically traps polyiodide anions inside its hollow hydrophobic interior",
            "Amylose chemically reduces elemental iodine into colored iodide anions",
            "Cellulose contains excess nitrogen that quenches iodine fluorescence",
            "Cellulose oxidizes iodine into colorless iodate anions"
        ],
        "A",
        "Amylose chains naturally adopt a helical secondary conformation with about 6 glucose units per turn. Polyiodide species (such as $\\text{I}_3^-$ and $\\text{I}_5^-$) slip inside the hydrophobic central channel of this helix, forming a charge-transfer complex that absorbs light and imparts a deep blue-black color. Cellulose has an extended, uncoiled linear $\\beta$-structure and cannot form this helical inclusion complex."
    )

    add(ch, "Cellulose Structure and Linkage",
        "Cellulose, the primary structural component of plant cell walls, is a linear unbranched polymer composed of:",
        [
            "$\\beta$-D-glucose units joined by $\\beta-1,4$-glycosidic linkages",
            "$\\alpha$-D-glucose units joined by $\\alpha-1,4$-glycosidic linkages",
            "$\\alpha$-D-glucose units joined by alternating $\\alpha-1,4$ and $\\alpha-1,6$ linkages",
            "$\\beta-D-galactose units joined by $\\beta-1,4$-glycosidic linkages"
        ],
        "A",
        "Cellulose is a straight-chain, unbranched polysaccharide composed exclusively of $\\beta$-D-glucose units linked together by $\\beta-1,4$-glycosidic bonds. The linear chains lie side by side, held together by extensive intermolecular hydrogen bonds, creating strong microfibrils."
    )

    add(ch, "Cellulose Indigestibility in Humans",
        "Why can humans easily digest starch and glycogen for energy, but are completely unable to digest cellulose?",
        [
            "Human digestive fluids lack the enzyme cellulase needed to cleave $\\beta-1,4$-glycosidic linkages",
            "Cellulose is toxic to human gastrointestinal epithelial cells",
            "The human stomach acid hydrolyses cellulose into poisonous cyanogenic compounds",
            "Cellulose has an unnatural D-enantiomeric inversion that blocks gut receptors"
        ],
        "A",
        "Human digestive enzymes like salivary and pancreatic $\\alpha$-amylase specifically hydrolyse $\\alpha-1,4$-glycosidic linkages found in starch and glycogen. The human body lacks the enzyme cellulase, which is required to hydrolyse the $\\beta-1,4$-glycosidic linkages in cellulose. Consequently, cellulose passes through the human digestive tract as undigested dietary fiber (roughage)."
    )

    # 33-39: Glycogen & Amino Acids
    add(ch, "Glycogen Storage and Architecture",
        "Glycogen, known as 'animal starch', is stored primarily in which tissues, and how does its molecular branching compare to amylopectin?",
        [
            "Stored in the liver and skeletal muscles; structurally similar to amylopectin but much more frequently branched",
            "Stored in adipose tissue; structurally identical to linear unbranched amylose",
            "Stored in the spleen; composed of $\\beta-1,4$-linked galactose monomers",
            "Stored in bone marrow; unbranched helical polymer of $\\alpha-1,6$-linked fructose"
        ],
        "A",
        "In animals, excess carbohydrates are stored as glycogen, mainly in the liver and skeletal muscles. Structurally, glycogen is an $\\alpha$-D-glucose polymer containing linear $\\alpha-1,4$ bonds and $\\alpha-1,6$ branch points, similar to amylopectin, but it is much more compactly and frequently branched (branch points occur every 8 to 12 glucose units compared to every 24 to 30 in amylopectin)."
    )

    add(ch, "Alpha-Amino Acids General Formula",
        "What is the general chemical formula of an $\\alpha$-amino acid obtained from the hydrolysis of natural proteins?",
        [
            "$\\text{R}-\\text{CH}(\\text{NH}_2)\\text{COOH}$",
            "$\\text{R}-\\text{CH}_2-\\text{CH}(\\text{NH}_2)\\text{COOH}$",
            "$\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{CH}_2\\text{COOH}$",
            "$\\text{R}-\\text{CO}-\\text{NH}-\\text{COOH}$"
        ],
        "A",
        "In $\\alpha$-amino acids, both the basic amino group ($-NH_2$) and the acidic carboxyl group ($-COOH$) are bonded to the same carbon atom (the $\\alpha$-carbon), giving the general formula $\\text{R}-\\text{CH}(\\text{NH}_2)\\text{COOH}$."
    )

    add(ch, "Essential Amino Acids Dietary Requirement",
        "Which of the following amino acids CANNOT be synthesized by the human body and must be supplied in the regular diet (essential amino acid)?",
        [
            "Valine",
            "Glycine",
            "Alanine",
            "Glutamic acid"
        ],
        "A",
        "Amino acids that cannot be synthesized by the body and must be obtained through the diet are known as essential amino acids. The essential amino acids in humans include Valine, Leucine, Isoleucine, Lysine, Methionine, Phenylalanine, Threonine, Tryptophan, Histidine, and Arginine. Glycine, alanine, serine, and glutamic acid are non-essential amino acids synthesized in the body."
    )

    add(ch, "Glycine Optical Inactivity",
        "Which naturally occurring $\\alpha$-amino acid is optically INACTIVE (achiral)?",
        [
            "Glycine",
            "L-Alanine",
            "L-Valine",
            "L-Serine"
        ],
        "A",
        "In glycine, the side chain $\\text{R}$ is a single hydrogen atom ($\\text{H}_2\\text{N}-\\text{CH}_2-\\text{COOH}$). Because the $\\alpha$-carbon is bonded to two identical hydrogen atoms, it lacks four different substituent groups and is therefore achiral (optically inactive). All other 19 common $\\alpha-amino acids contain an asymmetric $\\alpha-carbon and are optically active."
    )

    add(ch, "Configuration of Naturally Occurring Amino Acids",
        "Most naturally occurring $\\alpha$-amino acids obtained from proteins have which stereochemical configuration at the $\\alpha$-carbon?",
        [
            "L-configuration (with the $-NH_2$ group positioned on the left in the Fischer projection)",
            "D-configuration (with the $-NH_2$ group positioned on the right in the Fischer projection)",
            "A racemic 50:50 mixture of D and L configurations",
            "Meso configuration due to internal symmetry planes"
        ],
        "A",
        "All naturally occurring optically active $\\alpha$-amino acids found in proteins belong to the L-series. When drawn in a standard Fischer projection with the $-COOH$ group at the top and the $\\text{R}$ group at the bottom, the $-NH_2$ group is on the left-hand side, representing the L-configuration."
    )

    add(ch, "Zwitterion Structure of Amino Acids",
        "In neutral aqueous solution, $\\alpha$-amino acids exist predominantly as internal dipolar salts known as zwitterions. What is the ionic structure of this zwitterion?",
        [
            "$\\text{H}_3\\text{N}^+-\\text{CH}(\\text{R})-\\text{COO}^-$",
            "$\\text{H}_2\\text{N}-\\text{CH}(\\text{R})-\\text{COOH}$",
            "$\\text{H}_3\\text{N}^+-\\text{CH}(\\text{R})-\\text{COOH}$",
            "$\\text{H}_2\\text{N}-\\text{CH}(\\text{R})-\\text{COO}^-$"
        ],
        "A",
        "In aqueous solution, an intramolecular proton transfer occurs where the acidic carboxyl group ($-COOH$) loses a proton to form a carboxylate anion ($-COO^-$), while the basic amino group ($-NH_2$) accepts that proton to form an ammonium cation ($-NH_3^+$). This dipolar ion with both positive and negative charges is called a zwitterion: $\\text{H}_3\\text{N}^+-\\text{CH}(\\text{R})-\\text{COO}^-$."
    )

    add(ch, "Amphoteric Nature of Amino Acids",
        "Why do $\\alpha$-amino acid zwitterions display amphoteric behavior in aqueous solution?",
        [
            "The $-COO^-$ group can accept a proton from acids, while the $-NH_3^+$ group can donate a proton to bases",
            "The $\\alpha$-carbon undergoes reversible homolytic cleavage in aqueous acid or base",
            "The hydrocarbon side chain ($\\text{R}$) reacts equally with both hydronium and hydroxide ions",
            "The zwitterion acts exclusively as an oxidizing agent in water"
        ],
        "A",
        "In the zwitterionic form, the basic carboxylate ion ($-COO^-$) can accept a proton in acidic solution to form a cation ($\\text{H}_3\\text{N}^+-\\text{CH}(\\text{R})\\text{COOH}$), and the acidic ammonium ion ($-NH_3^+$) can donate a proton in basic solution to form an anion ($\\text{H}_2\\text{N}-\\text{CH}(\\text{R})\\text{COO}^-$). Because they react with both acids and bases, amino acids are amphoteric."
    )

    # 40-45: Isoelectric Point, Peptide Linkage & Protein Classification
    add(ch, "Isoelectric Point Definition and Behavior",
        "What is the isoelectric point (pI) of an amino acid, and how does the amino acid behave in an electric field at this specific pH?",
        [
            "The pH at which the net electrical charge on the amino acid is zero; it does not migrate toward either electrode during electrophoresis",
            "The pH at which all peptide bonds in the amino acid are spontaneously hydrolysed",
            "The pH at which the amino acid carries a net $+2$ charge and migrates rapidly to the cathode",
            "The pH at which the amino acid reaches its minimum boiling point in solution"
        ],
        "A",
        "The isoelectric point (pI) is the characteristic pH at which the dipolar zwitterion concentration is maximal and the net electrical charge of the amino acid is exactly zero. At its isoelectric point, an amino acid does not migrate toward either the cathode or the anode when placed in an electric field."
    )

    add(ch, "Peptide Linkage Chemical Nature",
        "A peptide linkage connecting two $\\alpha$-amino acids in a protein chain is chemically classified as an:",
        [
            "Amide linkage ($-CO-NH-$) formed by condensation with elimination of a water molecule",
            "Ester linkage ($-CO-O-$) formed between a carboxyl group and an alcohol",
            "Ether linkage ($-C-O-C-$) formed between two aliphatic alcohols",
            "Anhydride linkage ($-CO-O-CO-$) formed between two carboxylic acid groups"
        ],
        "A",
        "A peptide linkage is an amide bond ($-CO-NH-$) formed when the carboxylic acid group ($-COOH$) of one $\\alpha$-amino acid condenses with the amino group ($-NH_2$) of an adjacent $\\alpha$-amino acid, with the loss of one molecule of water."
    )

    add(ch, "Peptide Bonds in Oligopeptides",
        "How many peptide bonds are present in a linear pentapeptide composed of five $\\alpha$-amino acid residues?",
        [
            "Four",
            "Five",
            "Three",
            "Six"
        ],
        "A",
        "In any linear peptide chain containing $n$ amino acid residues, the residues are joined by $(n - 1)$ peptide bonds. For a pentapeptide ($n = 5$), there are $5 - 1 = 4$ peptide linkages."
    )

    add(ch, "Fibrous Proteins Characteristics",
        "Which combination of physical and structural properties correctly characterizes fibrous proteins?",
        [
            "Polypeptide chains lie parallel, held by hydrogen and disulphide bonds; thread-like structure; insoluble in water",
            "Polypeptide chains fold into spherical shapes; hydrophilic surface; soluble in water",
            "Low molecular mass peptides; unstable at room temperature; soluble in non-polar solvents only",
            "Single-stranded uncoiled peptides lacking any secondary structure"
        ],
        "A",
        "In fibrous proteins, polypeptide chains run parallel to each other and are held together by hydrogen bonds and disulphide bonds, forming long, thread-like fiber structures. They are generally insoluble in water. Examples include keratin and myosin."
    )

    add(ch, "Fibrous Proteins Examples",
        "Which of the following biological proteins is an example of a fibrous protein?",
        [
            "Keratin (found in hair, wool, and nails)",
            "Insulin (hormone regulating blood glucose)",
            "Albumin (found in egg white and blood serum)",
            "Hemoglobin (oxygen-transporting protein)"
        ],
        "A",
        "Keratin (present in hair, wool, silk, and nails) and myosin (present in muscles) are fibrous proteins. In contrast, insulin, albumin, and hemoglobin are globular proteins."
    )

    add(ch, "Globular Proteins Characteristics",
        "Which of the following is a characteristic feature of globular proteins such as albumin and insulin?",
        [
            "Polypeptide chains fold around into compact three-dimensional spherical shapes that are generally soluble in water",
            "Polypeptide chains form long, rigid, insoluble fiber sheets held strictly by ester bonds",
            "They are insoluble in aqueous solutions and resistant to thermal denaturation",
            "They consist solely of D-amino acids linked by glycosidic linkages"
        ],
        "A",
        "In globular proteins, the polypeptide chains fold around into compact three-dimensional spherical or globular shapes. The polar, hydrophilic amino acid side chains are positioned on the outer surface, making them soluble in water. Examples include insulin, albumins, and hemoglobin."
    )

    # 46-50: Protein Structure Levels: Primary, Secondary, Tertiary, Quaternary
    add(ch, "Primary Structure of Proteins",
        "What does the 'primary structure' of a protein specifically describe?",
        [
            "The precise linear sequence of $\\alpha$-amino acids linked by peptide bonds in the polypeptide chain",
            "The spatial coiling into $\\alpha$-helices or folding into $\\beta$-pleated sheets",
            "The overall three-dimensional folding into globular or fibrous shapes",
            "The association of multiple distinct polypeptide subunits into an oligomeric protein"
        ],
        "A",
        "The primary structure of a protein refers to the specific linear sequence in which $\\alpha$-amino acids are joined to each other by peptide bonds along the polypeptide chain. Any change in this primary sequence creates a different protein with altered biological properties (for example, the replacement of glutamic acid by valine in hemoglobin causes sickle-cell anemia)."
    )

    add(ch, "Secondary Structure Alpha-Helix Stabilization",
        "In the $\\alpha$-helix secondary conformation of proteins, how is the right-handed helical coil stabilized?",
        [
            "By intramolecular hydrogen bonds between the $-NH$ group of each residue and the $>C=O$ group of the fourth residue ahead",
            "By intermolecular disulphide bridges between parallel adjacent chains",
            "By covalent ester bonds connecting alternating $\\alpha$-carbon atoms",
            "By electrostatic salt bridges between adjacent hydrophobic residues"
        ],
        "A",
        "In an $\\alpha$-helix, the polypeptide chain coils into a right-handed helix. It is stabilized by intramolecular hydrogen bonds formed between the amide $-NH$ group of each amino acid residue and the carbonyl oxygen ($>C=O$) of the fourth amino acid residue ahead in the coil."
    )

    add(ch, "Secondary Structure Beta-Pleated Sheet",
        "In the $\\beta$-pleated sheet secondary structure of proteins, how are adjacent polypeptide strands held together?",
        [
            "By intermolecular hydrogen bonds between the $-NH$ and $>C=O$ groups of adjacent extended chains lying side by side",
            "By intramolecular hydrogen bonds within a single tightly coiled turn",
            "By covalent phosphodiester linkages between peptide backbones",
            "By hydrophobic exclusions in the absence of any dipole interactions"
        ],
        "A",
        "In the $\\beta$-pleated sheet conformation, polypeptide chains are extended to nearly maximum length and laid side by side. They are held together by intermolecular hydrogen bonds formed between the $-NH$ group of one strand and the $>C=O$ group of the adjacent strand, forming a pleated sheet resembling the drapery of cloth."
    )

    add(ch, "Tertiary Structure Stabilizing Interactions",
        "The tertiary structure represents the overall 3D folding of the secondary structure into compact shapes. Which forces stabilize this tertiary structure?",
        [
            "Hydrogen bonds, disulphide linkages, electrostatic attractions (salt bridges), and van der Waals forces",
            "Only covalent peptide bonds and coordinate covalent bonds with iron",
            "Exclusively phosphodiester bonds and glycosidic ether linkages",
            "Only dipole-induced magnetic interactions among aromatic rings"
        ],
        "A",
        "The tertiary structure represents further folding and coiling of the secondary structure to give globular or fibrous architecture. It is stabilized by several interactions: hydrogen bonds, disulphide linkages ($-S-S-$ bonds between cysteine residues), electrostatic attractions (salt bridges between charged side chains), and hydrophobic / van der Waals interactions."
    )

    add(ch, "Quaternary Structure of Proteins",
        "Some proteins, such as adult hemoglobin, exhibit a quaternary structure. This quaternary organization refers to:",
        [
            "The spatial arrangement and non-covalent assembly of two or more distinct polypeptide subunits",
            "The presence of four different peptide linkages in a single chain",
            "The four sequential thermal unfolding steps during denaturation",
            "The presence of four different kinds of metal ions in the active site"
        ],
        "A",
        "Some proteins are composed of two or more individual polypeptide chains, known as subunits. The spatial arrangement of these subunits with respect to each other is referred to as the quaternary structure of the protein. For example, adult hemoglobin consists of four subunits ($2\\alpha$ and $2\\beta$ chains) organized in a specific quaternary assembly."
    )

    # 51-54: Denaturation of Proteins
    add(ch, "Protein Denaturation Structural Consequences",
        "When a native protein undergoes denaturation due to elevated temperature or changes in pH, which structural levels are disrupted and which remains intact?",
        [
            "Secondary and tertiary structures are destroyed, while the primary structure remains completely intact",
            "Primary peptide bonds are hydrolysed, while secondary helices remain unaffected",
            "All four structural levels (primary, secondary, tertiary, quaternary) are destroyed into individual atoms",
            "The primary sequence is inverted while tertiary folding is preserved"
        ],
        "A",
        "During denaturation, physical changes (like heating) or chemical changes (like pH alteration) disrupt hydrogen bonds and other secondary/tertiary interactions, causing globules to unfold and helices to uncoil. The protein loses its native shape and biological activity. Because covalent peptide bonds are not cleaved, the primary structure (amino acid sequence) remains completely intact."
    )

    add(ch, "Coagulation of Egg White Denaturation",
        "The irreversible coagulation and hardening of egg white upon boiling in water is a classic demonstration of:",
        [
            "Thermal denaturation of the soluble globular protein ovalbumin into an insoluble mass",
            "Acid-catalyzed hydrolysis of ovalbumin into individual amino acid monomers",
            "Esterification of glucose with fatty acids present in the egg white",
            "Mutarotation of the peptide backbone into D-stereoisomers"
        ],
        "A",
        "Egg white contains the soluble globular protein ovalbumin. When heated, the thermal energy disrupts the hydrogen bonds and secondary/tertiary interactions stabilizing the native globular fold. The uncoiled polypeptide chains tangle and aggregate into an insoluble, opaque fibrous coagulum, representing irreversible denaturation."
    )

    add(ch, "Curdling of Milk Denaturation Mechanism",
        "The curdling of milk upon adding lemon juice or during souring by lactic acid bacteria is chemically explained by:",
        [
            "Denaturation and coagulation of the milk protein casein caused by a decrease in pH",
            "Hydrolysis of lactose disaccharide into gaseous carbon dioxide",
            "Precipitation of calcium lactate without any change in casein conformation",
            "Oxidation of peptide bonds in casein into nitrous acid"
        ],
        "A",
        "Milk contains the protein casein dispersed as soluble colloidal micelles. When lactic acid bacteria produce lactic acid, the pH of milk decreases toward the isoelectric point of casein. The change in pH disrupts electrostatic and hydrogen bonds holding casein in its native state, causing denaturation and precipitation (curdling)."
    )

    add(ch, "Loss of Biological Activity upon Denaturation",
        "Why does denaturation of an enzyme cause a complete and irreversible loss of its catalytic biological activity?",
        [
            "The loss of tertiary and secondary folding disrupts the precise three-dimensional geometry of the catalytic active site",
            "The enzyme reacts with water to convert all nitrogen atoms into ammonia gas",
            "Denaturation destroys the substrate molecules before they can bind",
            "All peptide bonds in the enzyme backbone are hydrolysed within milliseconds"
        ],
        "A",
        "An enzyme's catalytic activity is strictly dependent on its precise three-dimensional tertiary conformation, which positions specific catalytic amino acid residues together to form an active site. Denaturation unfolds this conformation, destroying the active site geometry so it can no longer bind or convert substrates, leading to total loss of biological activity."
    )

    # 55-60: Vitamins: Classification, Storage & Deficiencies
    add(ch, "Vitamins Solubility Classification",
        "Vitamins are divided into two main categories based on solubility. Which of the following sets contains ONLY fat-soluble vitamins?",
        [
            "Vitamins A, D, E, and K",
            "Vitamins B1, B2, B6, and C",
            "Vitamins B12, C, D, and K",
            "Vitamins A, B1, C, and E"
        ],
        "A",
        "Vitamins are classified into: (1) Fat-soluble vitamins, which are soluble in fats and organic oils but insoluble in water: Vitamins A, D, E, and K. They are stored in the liver and adipose tissues. (2) Water-soluble vitamins, which dissolve in water: B-group vitamins and Vitamin C."
    )

    add(ch, "Vitamin C Excretion and Deficiency",
        "Why must Vitamin C (ascorbic acid) be supplied regularly in our daily diet, and what deficiency disease results from its prolonged lack?",
        [
            "It is water-soluble and readily excreted in urine, so it cannot be stored in the body; its deficiency causes scurvy (bleeding gums)",
            "It is fat-soluble and stored permanently in bone marrow; its deficiency causes rickets",
            "It decomposes in human blood into toxic cyanides; its deficiency causes beri-beri",
            "It is synthesized by red blood cells; its deficiency causes xerophthalmia"
        ],
        "A",
        "Vitamin C (ascorbic acid) is a water-soluble vitamin. Because water-soluble vitamins are readily excreted in urine, they cannot be stored in the human body in significant amounts and must be supplied regularly in the diet. Prolonged deficiency of Vitamin C leads to scurvy, characterized by bleeding spongy gums, loose teeth, and poor wound healing."
    )

    add(ch, "Vitamin A and Vitamin D Deficiency Disorders",
        "Deficiency of Vitamin A and Vitamin D in the human diet causes which respective pathological disorders?",
        [
            "Xerophthalmia (hardening of the cornea) / night blindness from lack of Vitamin A; rickets / osteomalacia from lack of Vitamin D",
            "Beri-beri from lack of Vitamin A; scurvy from lack of Vitamin D",
            "Cheilosis from lack of Vitamin A; pernicious anemia from lack of Vitamin D",
            "Prolonged blood clotting from lack of Vitamin A; muscular dystrophy from lack of Vitamin D"
        ],
        "A",
        "Deficiency of Vitamin A (retinol) causes night blindness and xerophthalmia (dryness and hardening of the cornea of the eye). Deficiency of Vitamin D causes rickets (soft, bent bones in children) and osteomalacia (bone pain and softening in adults) due to impaired calcium and phosphate metabolism."
    )

    add(ch, "Vitamin B1 and Vitamin B2 Deficiency Disorders",
        "Deficiency of Vitamin B1 (thiamine) and Vitamin B2 (riboflavin) lead to which characteristic nutritional diseases, respectively?",
        [
            "Beri-beri (loss of appetite and neuromuscular weakness) from lack of B1; cheilosis (fissuring at mouth corners) from lack of B2",
            "Scurvy from lack of B1; rickets from lack of B2",
            "Pernicious anemia from lack of B1; night blindness from lack of B2",
            "Osteomalacia from lack of B1; increased blood clotting time from lack of B2"
        ],
        "A",
        "Deficiency of Vitamin B1 (thiamine) causes beri-beri, characterized by loss of appetite, muscular weakness, and peripheral nerve disorders. Deficiency of Vitamin B2 (riboflavin) causes cheilosis (cracking and fissuring at the corners of the mouth and lips), burning sensation of the skin, and digestive disorders."
    )

    add(ch, "Vitamin B12 Pernicious Anemia",
        "Deficiency of Vitamin B12 (cyanocobalamin) results in a severe condition characterized by a deficit of red blood cells and neurological symptoms known as:",
        [
            "Pernicious anemia (RBCs deficient in hemoglobin)",
            "Scurvy",
            "Beri-beri",
            "Xerophthalmia"
        ],
        "A",
        "Vitamin B12 (cyanocobalamin) contains cobalt and is essential for red blood cell maturation and myelin sheath maintenance. Its deficiency causes pernicious anemia, where red blood cells fail to mature properly and are severely reduced in count, accompanied by neurological complications."
    )

    add(ch, "Vitamin K and Vitamin E Deficiency Effects",
        "Deficiency of Vitamin K and Vitamin E in human physiology leads respectively to:",
        [
            "Prolonged blood clotting time / increased bleeding tendency (Vit K); muscular weakness and increased fragility of RBCs (Vit E)",
            "Xerophthalmia (Vit K); scurvy (Vit E)",
            "Beri-beri (Vit K); rickets (Vit E)",
            "Cheilosis (Vit K); pernicious anemia (Vit E)"
        ],
        "A",
        "Vitamin K (phylloquinone) is required for the liver synthesis of prothrombin and other blood clotting factors; its deficiency results in prolonged blood clotting time and increased hemorrhagic tendency. Vitamin E (tocopherol) acts as a lipid-soluble antioxidant; its deficiency leads to muscular weakness and increased fragility of red blood cells (hemolytic anemia)."
    )

    # 61-65: Nucleic Acids: DNA vs RNA, Nucleotides, Double Helix, RNA Types
    add(ch, "Pentose Sugar in DNA vs RNA",
        "What is the structural difference between the pentose sugar component of DNA and that of RNA?",
        [
            "DNA contains $\\beta$-D-2-deoxyribose (lacking an $-OH$ group at $C_2'$), whereas RNA contains $\\beta$-D-ribose (having an $-OH$ group at $C_2'$)",
            "DNA contains an aldohexose sugar, whereas RNA contains an aldopentose sugar",
            "DNA contains an L-pentose sugar, whereas RNA contains a D-pentose sugar",
            "DNA contains $\\beta$-D-fructofuranose, whereas RNA contains $\\beta$-D-glucopyranose"
        ],
        "A",
        "The pentose sugar present in RNA is $\\beta$-D-ribose, which possesses a hydroxyl group ($-OH$) at the $C_2'$ carbon of the furanose ring. In DNA, the sugar is $\\beta$-D-2-deoxyribose, which lacks an oxygen atom at $C_2'$ (having two hydrogen atoms at $C_2'$ instead of one $-H$ and one $-OH$)."
    )

    add(ch, "Nitrogenous Bases in DNA vs RNA",
        "Which of the following pyrimidine nitrogenous bases is found exclusively in ribonucleic acid (RNA) and replaces thymine?",
        [
            "Uracil",
            "Thymine",
            "Guanine",
            "Cytosine"
        ],
        "A",
        "DNA contains four nitrogenous bases: two purines (Adenine and Guanine) and two pyrimidines (Cytosine and Thymine). RNA contains the same two purines (Adenine and Guanine) and Cytosine, but Thymine is replaced by Uracil (U), a pyrimidine base."
    )

    add(ch, "Nucleoside vs Nucleotide Structure",
        "How does the chemical structure of a nucleoside differ from that of a nucleotide?",
        [
            "A nucleoside contains only a pentose sugar and a nitrogenous base; a nucleotide contains a sugar, a base, and a phosphate group esterified at the $5'$-OH",
            "A nucleoside contains a phosphate group; a nucleotide lacks any phosphorus atoms",
            "A nucleoside is a polymer of amino acids; a nucleotide is a monomer of carbohydrates",
            "A nucleoside contains purines only; a nucleotide contains pyrimidines only"
        ],
        "A",
        "A nucleoside is formed by the attachment of a nitrogenous base to the $1'$ position of a pentose sugar via an N-glycosidic linkage (Sugar + Base = Nucleoside). When the $5'$-hydroxyl group of the pentose sugar in a nucleoside is esterified with phosphoric acid, the resulting compound is a nucleotide (Sugar + Base + Phosphate = Nucleotide)."
    )

    add(ch, "Phosphodiester Linkage in Nucleic Acids",
        "In a polynucleotide chain of DNA or RNA, successive nucleotide units are joined together by:",
        [
            "Phosphodiester linkages connecting the $3'$ carbon of one pentose sugar to the $5'$ carbon of the adjoining pentose sugar",
            "Peptide linkages connecting amino groups on adjacent nitrogenous bases",
            "Glycosidic ether linkages connecting the $1'$ carbons of adjacent pentose sugars",
            "Disulphide bridges connecting pyrimidine rings across the chain"
        ],
        "A",
        "Nucleotides are linked together in a nucleic acid polymer by phosphodiester linkages. The phosphate group forms an ester bond between the $5'$-hydroxyl group of one nucleotide's sugar and the $3'$-hydroxyl group of the sugar of the adjacent nucleotide, forming the backbone of the polynucleotide strand."
    )

    add(ch, "Watson-Crick Double Helix Base Pairing",
        "According to the Watson and Crick double helix model of DNA, how are the complementary nitrogenous bases paired between the two antiparallel strands?",
        [
            "Adenine pairs specifically with Thymine through two hydrogen bonds ($A=T$), and Guanine pairs with Cytosine through three hydrogen bonds ($G \\equiv C$)",
            "Adenine pairs with Cytosine through two hydrogen bonds, and Guanine pairs with Thymine through three hydrogen bonds",
            "Adenine pairs with Guanine through two covalent bonds, and Cytosine pairs with Thymine through three covalent bonds",
            "Adenine pairs with Thymine through three hydrogen bonds, and Guanine pairs with Cytosine through two hydrogen bonds"
        ],
        "A",
        "In the Watson-Crick double helix model of DNA, the two polynucleotide chains are antiparallel and wound around a common axis. The strands are held together by specific complementary hydrogen bonding between nitrogenous base pairs: Adenine (A) forms two hydrogen bonds with Thymine (T) ($A=T$), and Guanine (G) forms three hydrogen bonds with Cytosine (C) ($G \\equiv C$)."
    )

    return qs
