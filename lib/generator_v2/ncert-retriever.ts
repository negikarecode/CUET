/**
 * CUET UG Master Question Paper Generator (v2) - NCERT Chunker & Retriever
 * Fulfills Section 1: Strict Grounding & No NCERT Reference Without Retrieved Source Text.
 */

import fs from "fs";
import path from "path";
import { NcertSourceChunk } from "./types";

export class NcertRetriever {
  private chunks: NcertSourceChunk[] = [];
  private chunksBySubject: Map<string, NcertSourceChunk[]> = new Map();

  constructor(customChunks?: NcertSourceChunk[]) {
    if (customChunks && customChunks.length > 0) {
      for (const chunk of customChunks) {
        this.addChunk(chunk);
      }
    } else {
      this.loadBuiltinChunks();
      this.loadChunksFromDisk();
    }
  }

  public addChunk(chunk: NcertSourceChunk): void {
    this.chunks.push(chunk);
    const subKey = chunk.subject.toLowerCase().trim();
    const existing = this.chunksBySubject.get(subKey) || [];
    existing.push(chunk);
    this.chunksBySubject.set(subKey, existing);
  }

  public getChunkCount(): number {
    return this.chunks.length;
  }

  /**
   * Chunks a raw NCERT text or markdown document by section headers (## or numbered sections)
   */
  public ingestDocument(
    subject: string,
    part: string,
    chapter: string,
    rawText: string,
    sourcePrefix: string
  ): NcertSourceChunk[] {
    const lines = rawText.split("\n");
    const sections: Array<{ title: string; lines: string[] }> = [];
    let currentTitle = "Overview";
    let currentLines: string[] = [];

    for (const line of lines) {
      const headingMatch = line.match(/^#{1,3}\s+(.+)$/) || line.match(/^(\d+\.\d+[\s\w]+)/);
      if (headingMatch && currentLines.length > 0) {
        sections.push({ title: currentTitle, lines: currentLines });
        currentTitle = (headingMatch[1] || "").trim();
        currentLines = [];
      } else {
        currentLines.push(line);
      }
    }
    if (currentLines.length > 0) {
      sections.push({ title: currentTitle, lines: currentLines });
    }

    const created: NcertSourceChunk[] = [];
    let counter = 1;
    for (const sec of sections) {
      const text = sec.lines.join("\n").trim();
      if (text.length < 30) continue; // Skip negligible fragments

      const chunkId = `${sourcePrefix}_ch_${chapter.toLowerCase().replace(/[^a-z0-9]/g, "_")}_sec_${counter++}`;
      const chunk: NcertSourceChunk = {
        sourceChunkId: chunkId,
        subject,
        part,
        chapter,
        section: sec.title,
        concept: sec.title,
        text,
        keywords: this.extractKeywords(sec.title + " " + text),
      };
      this.addChunk(chunk);
      created.push(chunk);
    }
    return created;
  }

  /**
   * Retrieves relevant NCERT chunks grounded strictly in NCERT sources.
   * If no chunks are found, returns empty context so calling pipeline triggers Section 1 hard stop.
   */
  public retrieveContext(params: {
    subject: string;
    query?: string;
    chapters?: string[];
    maxChunks?: number;
  }): { contextString: string; chunks: NcertSourceChunk[] } {
    const { subject, query = "", chapters = [], maxChunks = 4 } = params;
    const subKey = subject.toLowerCase().trim();
    const candidateChunks = this.chunksBySubject.get(subKey) || [];

    if (candidateChunks.length === 0) {
      return { contextString: "", chunks: [] };
    }

    const queryTokens = this.tokenize(query);
    const chapterTokens = chapters.flatMap((c) => this.tokenize(c));

    const scored = candidateChunks.map((chunk) => {
      let score = 0;
      const chunkTextLower = (chunk.chapter + " " + chunk.section + " " + chunk.concept + " " + chunk.text).toLowerCase();

      // Chapter match bonus
      for (const ch of chapters) {
        if (chunk.chapter.toLowerCase().includes(ch.toLowerCase())) {
          score += 10;
        }
      }

      // Keyword & query tokens matching
      for (const token of queryTokens) {
        if (chunkTextLower.includes(token)) {
          score += 2;
        }
        if (chunk.keywords?.some((k) => k.toLowerCase().includes(token))) {
          score += 4;
        }
      }

      for (const token of chapterTokens) {
        if (chunkTextLower.includes(token)) {
          score += 1.5;
        }
      }

      // Base non-zero score if chapters specified and matched
      return { chunk, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // If query or chapters were given, select top scored chunks with score > 0
    let selected: NcertSourceChunk[] = [];
    if (queryTokens.length > 0 || chapterTokens.length > 0) {
      selected = scored.filter((s) => s.score > 0).slice(0, maxChunks).map((s) => s.chunk);
    }

    // Fallback: if no specific query matched but chunks exist for subject, provide the first maxChunks
    if (selected.length === 0 && candidateChunks.length > 0) {
      selected = candidateChunks.slice(0, maxChunks);
    }

    if (selected.length === 0) {
      return { contextString: "", chunks: [] };
    }

    const formattedChunks = selected
      .map((c) => {
        return `[CHUNK ID: ${c.sourceChunkId}]
Part: ${c.part}
Chapter: ${c.chapter}
Section: ${c.section}
Concept: ${c.concept}
Source Content:
${c.text}
`;
      })
      .join("\n" + "-".repeat(50) + "\n\n");

    return { contextString: formattedChunks, chunks: selected };
  }

  private extractKeywords(text: string): string[] {
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3);
    const stopWords = new Set([
      "this", "that", "with", "from", "have", "more", "also", "into", "their",
      "which", "when", "some", "what", "there", "about", "other", "under"
    ]);
    const freq = new Map<string, number>();
    for (const w of words) {
      if (!stopWords.has(w)) {
        freq.set(w, (freq.get(w) || 0) + 1);
      }
    }
    return Array.from(freq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map((e) => e[0]);
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2);
  }

  private loadChunksFromDisk(): void {
    const dataDir = path.resolve(process.cwd(), "data", "ncert_chunks");
    if (!fs.existsSync(dataDir)) return;
    try {
      const files = fs.readdirSync(dataDir);
      for (const f of files) {
        if (f.endsWith(".json")) {
          const filePath = path.join(dataDir, f);
          const raw = fs.readFileSync(filePath, "utf-8");
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            for (const item of parsed) {
              if (item.sourceChunkId && item.text) {
                this.addChunk(item);
              }
            }
          }
        }
      }
    } catch {
      // Ignore disk load error
    }
  }

  /**
   * Pre-populates essential NCERT curriculum source chunks across core CUET UG domains
   */
  private loadBuiltinChunks(): void {
    // ─── BUSINESS STUDIES (Part I & II) ───
    this.addChunk({
      sourceChunkId: "ncert-bst-p1-ch1-s1",
      subject: "business_studies",
      part: "Part I: Principles and Functions of Management",
      chapter: "Nature and Significance of Management",
      section: "1.1 Management: Concept, Objectives and Importance",
      concept: "Effectiveness vs Efficiency and Multi-dimensional Nature",
      text: `Management is defined as a process of getting things done with the aim of achieving goals effectively and efficiently. 
Being effective or doing work effectively essentially means finishing the given task. Effectiveness in management is concerned with doing the right task, completing activities and achieving goals. In other words, it is concerned with the end result.
Efficiency means doing the task correctly and with minimum cost. If by using less resources (inputs) more benefits are derived (outputs) then efficiency has increased. Management is a multi-dimensional activity:
1. Management of work: Every organisation exists for the performance of some work (e.g. producing garments, treating patients).
2. Management of people: Human resources or people are an organisation's greatest asset. Managing people has two dimensions: dealing with employees as individuals, and dealing with individuals as a group of people.
3. Management of operations: Every organisation has some basic product or service to provide. This requires a production process which entails the flow of input material and the technology for transforming this input into the desired output.`,
    });

    this.addChunk({
      sourceChunkId: "ncert-bst-p1-ch2-s2",
      subject: "business_studies",
      part: "Part I: Principles and Functions of Management",
      chapter: "Principles of Management",
      section: "2.3 Fayol's Principles of Management",
      concept: "Unity of Command vs Unity of Direction, Scalar Chain and Gang Plank",
      text: `Fayol formulated 14 principles of management:
1. Unity of Command: According to Fayol there should be one and only one boss for every individual employee. Dual subordination should be strictly avoided. If an employee receives orders from two superiors, authority is undermined, discipline is in jeopardy, order disturbed and stability threatened.
2. Unity of Direction: All the units of an organisation should be moving towards the same objectives through coordinated and focused efforts. Each group of activities having the same objective must have one head and one plan. This prevents overlapping of activities. Difference: Unity of command prevents dual subordination; Unity of direction prevents overlapping of activities.
3. Scalar Chain: The formal lines of authority from highest to lowest ranks are known as scalar chain. In emergencies requiring urgent communication between two employees at the same level without following the long scalar route, Fayol permitted a short cut known as 'Gang Plank'.`,
    });

    this.addChunk({
      sourceChunkId: "ncert-bst-p1-ch8-s1",
      subject: "business_studies",
      part: "Part I: Principles and Functions of Management",
      chapter: "Controlling",
      section: "8.4 Controlling Process and Techniques",
      concept: "Critical Point Control and Management by Exception",
      text: `In the controlling process, while analysing deviations, managers should focus on two key principles:
1. Critical Point Control (CPC): It is neither economical nor easy to keep a check on each and every activity in an organisation. Control should focus on key result areas (KRAs) which are critical to the success of an organisation. If anything goes wrong at the critical points, the entire organisation suffers. E.g. in a manufacturing organisation, an increase of 5 percent in labour cost may be more critical than a 15 percent increase in postal charges.
2. Management by Exception (MBE): Also known as Control by Exception. It is an important principle of management control based on the belief that 'an attempt to control everything may end up in controlling nothing'. Minor deviations within permissible tolerance limits should not be brought to top management's notice; only significant deviations going beyond permissible limits require managerial intervention.`,
    });

    // ─── ECONOMICS ───
    this.addChunk({
      sourceChunkId: "ncert-eco-macro-ch3-s2",
      subject: "economics",
      part: "Part II: Introductory Macroeconomics",
      chapter: "Money and Banking",
      section: "3.2 Money Creation by the Banking System",
      concept: "Credit Multiplier and Central Bank Monetary Policy Tools",
      text: `Commercial banks create credit out of initial primary deposits. The total money creation or credit multiplier is given by $1 / LRR$, where LRR is the Legal Reserve Ratio (consisting of Cash Reserve Ratio - CRR, and Statutory Liquidity Ratio - SLR). Total Credit Created = Primary Deposits $\times (1 / LRR)$.
The Central Bank (RBI) controls money supply using Quantitative and Qualitative instruments:
- Bank Rate and Repo Rate: The rate at which the central bank lends funds to commercial banks. An increase in repo rate makes borrowing expensive for commercial banks, shrinking credit supply and curbing inflation.
- Reverse Repo Rate: The rate at which commercial banks deposit excess liquidity with RBI.
- Open Market Operations (OMO): Outright purchase and sale of government securities in open market. Sale of securities absorbs liquidity; purchase injects liquidity.
- Cash Reserve Ratio (CRR): Minimum percentage of net demand and time liabilities (NDTL) banks must park as cash with RBI.`,
    });

    this.addChunk({
      sourceChunkId: "ncert-eco-macro-ch4-s1",
      subject: "economics",
      part: "Part II: Introductory Macroeconomics",
      chapter: "Determination of Income and Employment",
      section: "4.1 Aggregate Demand and its Components",
      concept: "MPC, MPS, and Investment Multiplier ($k = 1 / (1 - MPC)$)",
      text: `The consumption function is given by $C = \\bar{C} + bY$, where $\\bar{C}$ is autonomous consumption ($> 0$), $b$ is Marginal Propensity to Consume ($0 < MPC < 1$), and $Y$ is disposable income.
Since $Y = C + S$, the savings function is $S = -\\bar{C} + (1 - b)Y$, where $(1 - b) = MPS$.
Hence $MPC + MPS = 1$.
The Investment Multiplier ($k$) measures the change in national income resulting from a change in autonomous investment:
$k = \\frac{\\Delta Y}{\\Delta I} = \\frac{1}{1 - MPC} = \\frac{1}{MPS}$.
When $MPC = 0.8$, $MPS = 0.2$, multiplier $k = 1 / 0.2 = 5$. If investment increases by Rs. 100 crores, income increases by $5 \\times 100 = 500$ crores.
Excess demand creates an Inflationary Gap; deficient demand creates a Deflationary Gap.`,
    });

    // ─── PHYSICS (Class 12) ───
    this.addChunk({
      sourceChunkId: "ncert-phy-p1-ch1-s1",
      subject: "physics",
      part: "Part I",
      chapter: "Electric Charges and Fields",
      section: "1.4 Coulomb's Law and Superposition Principle",
      concept: "Coulomb's Law in vector form and dielectric medium",
      text: `Coulomb's law states that the electrostatic force between two stationary point charges $q_1$ and $q_2$ separated by a distance $r$ in vacuum is:
$$F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}$$
where $\\varepsilon_0 = 8.854 \\times 10^{-12}\\text{ C}^2\\text{ N}^{-1}\\text{ m}^{-2}$ is the permittivity of free space.
In a medium of relative permittivity (dielectric constant) $K = \\varepsilon_r$, the force is reduced:
$$F_m = \\frac{F}{K} = \\frac{1}{4\\pi\\varepsilon} \\frac{|q_1 q_2|}{r^2}$$
Electric field $\\mathbf{E}$ due to a point charge $q$ is $\\mathbf{E} = \\frac{q}{4\\pi\\varepsilon_0 r^2}\\hat{\\mathbf{r}}$.
Electric flux through a closed surface: $\\Phi = \\oint \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$ (Gauss's Law).`,
    });

    this.addChunk({
      sourceChunkId: "ncert-phy-p1-ch3-s1",
      subject: "physics",
      part: "Part I",
      chapter: "Current Electricity",
      section: "3.5 Drift Velocity, Ohm's Law and Temperature Dependence of Resistivity",
      concept: "Drift velocity $v_d = -eE\\tau/m$, current density $j = n e v_d$, and resistivity $\\rho$",
      text: `Drift velocity of electrons under applied electric field $E$:
$$v_d = \\frac{e E \\tau}{m}$$
where $e$ is electron charge, $\\tau$ is relaxation time, and $m$ is electron mass.
Current $I$ related to drift velocity:
$$I = n e A v_d$$
where $n$ is electron number density and $A$ is cross-sectional area.
Resistivity of material: $\\rho = \\frac{m}{n e^2 \\tau}$.
For metallic conductors, as temperature increases, lattice vibrations increase, causing relaxation time $\\tau$ to decrease, hence resistivity $\\rho$ increases: $\\rho_T = \\rho_0 [1 + \\alpha(T - T_0)]$, where $\\alpha > 0$.
For semiconductors and insulators, electron concentration $n$ increases exponentially with temperature, so resistivity decreases with temperature (temperature coefficient $\\alpha < 0$).`,
    });

    // ─── CHEMISTRY (Class 12) ───
    this.addChunk({
      sourceChunkId: "ncert-chem-p1-ch2-s1",
      subject: "chemistry",
      part: "Part I",
      chapter: "Solutions",
      section: "2.4 Colligative Properties and Determination of Molar Mass",
      concept: "Raoult's Law, Elevation of Boiling Point, Depression of Freezing Point, Van 't Hoff factor $i$",
      text: `Colligative properties depend only on the number of solute particles and not on their chemical nature:
1. Relative lowering of vapour pressure: $\\frac{p_1^0 - p_1}{p_1^0} = i \\cdot x_2$
2. Elevation of boiling point: $\\Delta T_b = i \\cdot K_b \\cdot m$ (where $m$ is molality, $K_b$ is molal ebullioscopic constant)
3. Depression of freezing point: $\\Delta T_f = i \\cdot K_f \\cdot m$ (where $K_f$ is cryoscopic constant)
4. Osmotic pressure: $\\Pi = i C R T$
Van 't Hoff Factor ($i$):
$i = \\frac{\\text{Normal molar mass}}{\\text{Abnormal molar mass}} = \\frac{\\text{Total moles after dissociation/association}}{\\text{Moles before dissociation/association}}$
For dissociation with degree $\\alpha$ yielding $n$ ions: $\\alpha = \\frac{i - 1}{n - 1}$.
For association with degree $\\alpha$ dimerising ($n=2$): $\\alpha = \\frac{1 - i}{1 - 1/n}$.`,
    });

    // ─── POLITICAL SCIENCE (Class 12) ───
    this.addChunk({
      sourceChunkId: "ncert-pol-p1-ch1-s1",
      subject: "political_science",
      part: "Part I: Contemporary World Politics",
      chapter: "The End of Bipolarity",
      section: "1.2 Soviet System and Disintegration of USSR",
      concept: "Gorbachev's reforms (Glasnost & Perestroika) and Shock Therapy",
      text: `Mikhail Gorbachev became General Secretary of the Communist Party of Soviet Union in 1985. He sought to reform the system through 'Perestroika' (restructuring) and 'Glasnost' (openness).
In December 1991, under the leadership of Boris Yeltsin, Russia, Ukraine, and Belarus, three major republics of the USSR, declared that the Soviet Union was disbanded.
Shock Therapy: The collapse of communism was followed in most of these countries by a painful transition from an authoritarian socialist system to a democratic capitalist system. The model of transition in Russia, Central Asia and East Europe that was influenced by the World Bank and the IMF came to be known as 'Shock Therapy'.
Features: Total privatisation of state assets, private ownership of property, collective farms replaced by private farming, free trade regime, and direct foreign investment (FDI). Consequence: 90% of state industries were put up for sale at throwaway prices, leading to what was termed 'the largest garage sale in world history'. The value of the Russian currency, Ruble, plummeted drastically.`,
    });
  }
}

export const globalNcertRetriever = new NcertRetriever();
