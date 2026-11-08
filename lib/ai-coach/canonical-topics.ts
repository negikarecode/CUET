/**
 * Canonical Topics Registry and Question Mapping for CUET AI Coach
 *
 * Ensures:
 * 1. Every question maps to a single authoritative canonical topic ID and clean title.
 * 2. Variant names (e.g., "Current Electricity" vs "Current Electricity & Semiconductor Electronics",
 *    or "Semiconductors" vs "Semiconductor Electronics") are resolved to the proper canonical chapter.
 * 3. "Wave Optics" and "Ray Optics" are distinctly resolved, ensuring Wave Optics is never missing.
 * 4. Sub-topic and chapter sharing the same name merge into one canonical topic ID.
 * 5. All report sections (Topics to Fix, Critical Score Leaks, Strengths, Topics Needing Data, Plan)
 *    read from the SAME computed topic table, partitioning topics into 4 strictly mutually exclusive buckets:
 *    - fix: accuracy < 60% and attempts >= 5
 *    - strength: accuracy >= 70% and attempts >= 10
 *    - needs_data: attempts < 5
 *    - neutral: all other topics (e.g. 60-69% accuracy with >=5 attempts, or >=70% with 5-9 attempts)
 */

export interface CanonicalTopicDefinition {
  id: string;
  name: string;
  subject: string;
  chapter: string;
  aliases: string[];
}

export type TopicBucket = "fix" | "strength" | "needs_data" | "neutral";

export interface CanonicalTopicMeta {
  id: string;
  name: string;
  chapter: string;
}

// Canonical Class 12 NCERT / CUET chapters by subject
const CANONICAL_PHYSICS_TOPICS: CanonicalTopicDefinition[] = [
  {
    id: "electric-charges-fields",
    name: "Electric Charges and Fields",
    subject: "physics",
    chapter: "Electric Charges and Fields",
    aliases: [
      "electric charges and fields",
      "electric charge",
      "charges and fields",
      "coulomb's law",
      "gauss's law",
    ],
  },
  {
    id: "electrostatic-potential-capacitance",
    name: "Electrostatic Potential and Capacitance",
    subject: "physics",
    chapter: "Electrostatic Potential and Capacitance",
    aliases: [
      "electrostatic potential and capacitance",
      "capacitance",
      "electrostatic potential",
      "capacitors",
      "capacitance and potential",
    ],
  },
  {
    id: "current-electricity",
    name: "Current Electricity",
    subject: "physics",
    chapter: "Current Electricity",
    aliases: [
      "current electricity",
      "electric current",
      "kirchhoff's laws",
      "wheatstone bridge",
      "ohm's law",
      "drift velocity",
      "cells and internal resistance",
    ],
  },
  {
    id: "moving-charges-magnetism",
    name: "Moving Charges and Magnetism",
    subject: "physics",
    chapter: "Moving Charges and Magnetism",
    aliases: [
      "moving charges and magnetism",
      "magnetic effects of current",
      "biot-savart law",
      "ampere's circuital law",
      "lorentz force",
      "cyclotron",
    ],
  },
  {
    id: "magnetism-matter",
    name: "Magnetism and Matter",
    subject: "physics",
    chapter: "Magnetism and Matter",
    aliases: [
      "magnetism and matter",
      "magnetic dipole",
      "magnetic properties of materials",
      "earth's magnetism",
      "dia para ferro magnetism",
    ],
  },
  {
    id: "electromagnetic-induction",
    name: "Electromagnetic Induction",
    subject: "physics",
    chapter: "Electromagnetic Induction",
    aliases: [
      "electromagnetic induction",
      "faraday's law",
      "lenz's law",
      "inductance",
      "eddy currents",
      "emi",
    ],
  },
  {
    id: "alternating-current",
    name: "Alternating Current",
    subject: "physics",
    chapter: "Alternating Current",
    aliases: [
      "alternating current",
      "ac circuits",
      "lcr circuit",
      "resonance in ac",
      "transformer",
      "power in ac",
      "ac generator",
    ],
  },
  {
    id: "electromagnetic-waves",
    name: "Electromagnetic Waves",
    subject: "physics",
    chapter: "Electromagnetic Waves",
    aliases: [
      "electromagnetic waves",
      "displacement current",
      "em spectrum",
      "maxwell's equations",
      "em waves",
    ],
  },
  {
    id: "ray-optics",
    name: "Ray Optics and Optical Instruments",
    subject: "physics",
    chapter: "Ray Optics and Optical Instruments",
    aliases: [
      "ray optics and optical instruments",
      "ray optics",
      "geometric optics",
      "reflection of light",
      "refraction of light",
      "lenses",
      "prisms",
      "microscope",
      "telescope",
      "total internal reflection",
    ],
  },
  {
    id: "wave-optics",
    name: "Wave Optics",
    subject: "physics",
    chapter: "Wave Optics",
    aliases: [
      "wave optics",
      "interference of light",
      "young's double slit",
      "diffraction",
      "polarization",
      "huygens principle",
      "wavefront",
      "coherent sources",
    ],
  },
  {
    id: "dual-nature",
    name: "Dual Nature of Radiation and Matter",
    subject: "physics",
    chapter: "Dual Nature of Radiation and Matter",
    aliases: [
      "dual nature of radiation and matter",
      "dual nature of matter and radiation",
      "photoelectric effect",
      "de broglie wavelength",
      "matter waves",
      "photons",
      "einstein photoelectric equation",
    ],
  },
  {
    id: "atoms",
    name: "Atoms",
    subject: "physics",
    chapter: "Atoms",
    aliases: [
      "atoms",
      "bohr model",
      "rutherford model",
      "hydrogen spectrum",
      "atomic spectra",
    ],
  },
  {
    id: "nuclei",
    name: "Nuclei",
    subject: "physics",
    chapter: "Nuclei",
    aliases: [
      "nuclei",
      "radioactivity",
      "nuclear binding energy",
      "nuclear fission",
      "nuclear fusion",
      "mass defect",
    ],
  },
  {
    id: "semiconductor-electronics",
    name: "Semiconductor Electronics",
    subject: "physics",
    chapter: "Semiconductor Electronics",
    aliases: [
      "semiconductor electronics",
      "semiconductors",
      "semiconductor electronics: materials, devices and simple circuits",
      "electronic devices",
      "p-n junction",
      "diodes",
      "logic gates",
      "rectifiers",
      "zener diode",
    ],
  },
];

const CANONICAL_CHEMISTRY_TOPICS: CanonicalTopicDefinition[] = [
  { id: "solutions", name: "Solutions", subject: "chemistry", chapter: "Solutions", aliases: ["solutions", "colligative properties", "raoult's law", "henry's law", "van't hoff factor"] },
  { id: "electrochemistry", name: "Electrochemistry", subject: "chemistry", chapter: "Electrochemistry", aliases: ["electrochemistry", "galvanic cells", "nernst equation", "kohlrausch law", "conductance"] },
  { id: "chemical-kinetics", name: "Chemical Kinetics", subject: "chemistry", chapter: "Chemical Kinetics", aliases: ["chemical kinetics", "rate of reaction", "order and molecularity", "arrhenius equation", "integrated rate laws"] },
  { id: "d-and-f-block", name: "d and f Block Elements", subject: "chemistry", chapter: "d and f Block Elements", aliases: ["d and f block elements", "transition elements", "lanthanoids", "actinoids", "d-block"] },
  { id: "coordination-compounds", name: "Coordination Compounds", subject: "chemistry", chapter: "Coordination Compounds", aliases: ["coordination compounds", "werner's theory", "crystal field theory", "isomerism in coordination compounds", "iupac nomenclature of coordination"] },
  { id: "haloalkanes-haloarenes", name: "Haloalkanes and Haloarenes", subject: "chemistry", chapter: "Haloalkanes and Haloarenes", aliases: ["haloalkanes and haloarenes", "haloalkanes", "haloarenes", "sn1 sn2 reactions"] },
  { id: "alcohols-phenols-ethers", name: "Alcohols, Phenols and Ethers", subject: "chemistry", chapter: "Alcohols, Phenols and Ethers", aliases: ["alcohols, phenols and ethers", "alcohols", "phenols", "ethers"] },
  { id: "aldehydes-ketones-carboxylic-acids", name: "Aldehydes, Ketones and Carboxylic Acids", subject: "chemistry", chapter: "Aldehydes, Ketones and Carboxylic Acids", aliases: ["aldehydes, ketones and carboxylic acids", "aldehydes", "ketones", "carboxylic acids", "carbonyl compounds"] },
  { id: "amines", name: "Amines", subject: "chemistry", chapter: "Amines", aliases: ["amines", "diazonium salts", "nitro compounds", "organic compounds containing nitrogen"] },
  { id: "biomolecules", name: "Biomolecules", subject: "chemistry", chapter: "Biomolecules", aliases: ["biomolecules", "carbohydrates", "proteins", "nucleic acids", "vitamins", "amino acids"] },
];

const CANONICAL_MATHEMATICS_TOPICS: CanonicalTopicDefinition[] = [
  { id: "relations-and-functions", name: "Relations and Functions", subject: "mathematics", chapter: "Relations and Functions", aliases: ["relations and functions", "relations", "functions", "types of relations"] },
  { id: "inverse-trig", name: "Inverse Trigonometric Functions", subject: "mathematics", chapter: "Inverse Trigonometric Functions", aliases: ["inverse trigonometric functions", "itf", "inverse trig"] },
  { id: "matrices-determinants", name: "Matrices and Determinants", subject: "mathematics", chapter: "Matrices and Determinants", aliases: ["matrices and determinants", "matrices", "determinants", "matrix operations"] },
  { id: "continuity-differentiability", name: "Continuity and Differentiability", subject: "mathematics", chapter: "Continuity and Differentiability", aliases: ["continuity and differentiability", "differentiation", "chain rule", "mean value theorem"] },
  { id: "application-derivatives", name: "Application of Derivatives", subject: "mathematics", chapter: "Application of Derivatives", aliases: ["application of derivatives", "maxima and minima", "rate of change", "tangents and normals"] },
  { id: "integrals", name: "Integrals", subject: "mathematics", chapter: "Integrals", aliases: ["integrals", "indefinite integrals", "definite integrals", "integration by parts"] },
  { id: "application-integrals", name: "Application of Integrals", subject: "mathematics", chapter: "Application of Integrals", aliases: ["application of integrals", "area under simple curves", "area between two curves"] },
  { id: "differential-equations", name: "Differential Equations", subject: "mathematics", chapter: "Differential Equations", aliases: ["differential equations", "order and degree", "separation of variables", "linear differential equations"] },
  { id: "vector-algebra", name: "Vector Algebra", subject: "mathematics", chapter: "Vector Algebra", aliases: ["vector algebra", "vectors", "dot product", "cross product", "scalar triple product"] },
  { id: "three-dimensional-geometry", name: "Three-Dimensional Geometry", subject: "mathematics", chapter: "Three-Dimensional Geometry", aliases: ["three-dimensional geometry", "3d geometry", "lines in space", "direction cosines"] },
  { id: "linear-programming", name: "Linear Programming", subject: "mathematics", chapter: "Linear Programming", aliases: ["linear programming", "lpp", "linear programming problems"] },
  { id: "probability", name: "Probability", subject: "mathematics", chapter: "Probability", aliases: ["probability", "conditional probability", "bayes theorem", "bernoulli trials"] },
];

const CANONICAL_BIOLOGY_TOPICS: CanonicalTopicDefinition[] = [
  { id: "reproduction-organisms", name: "Reproduction in Organisms & Flowering Plants", subject: "biology", chapter: "Reproduction", aliases: ["reproduction", "sexual reproduction in flowering plants", "pollination", "embryogenesis"] },
  { id: "human-reproduction", name: "Human Reproduction & Health", subject: "biology", chapter: "Human Reproduction", aliases: ["human reproduction", "gametogenesis", "menstrual cycle", "reproductive health", "contraception"] },
  { id: "genetics-evolution", name: "Genetics and Evolution", subject: "biology", chapter: "Genetics and Evolution", aliases: ["genetics and evolution", "principles of inheritance and variation", "molecular basis of inheritance", "dna replication", "evolution"] },
  { id: "biology-human-welfare", name: "Biology in Human Welfare", subject: "biology", chapter: "Biology and Human Welfare", aliases: ["biology and human welfare", "human health and disease", "microbes in human welfare", "immunity", "pathogens"] },
  { id: "biotechnology", name: "Biotechnology and Applications", subject: "biology", chapter: "Biotechnology", aliases: ["biotechnology", "biotechnology and its applications", "biotechnology: principles and processes", "r-dna technology"] },
  { id: "ecology-environment", name: "Ecology and Environment", subject: "biology", chapter: "Ecology and Environment", aliases: ["ecology and environment", "organisms and populations", "ecosystem", "biodiversity and conservation", "environmental issues"] },
];

const REGISTRY_BY_SUBJECT: Record<string, CanonicalTopicDefinition[]> = {
  physics: CANONICAL_PHYSICS_TOPICS,
  chemistry: CANONICAL_CHEMISTRY_TOPICS,
  mathematics: CANONICAL_MATHEMATICS_TOPICS,
  biology: CANONICAL_BIOLOGY_TOPICS,
};

function normalizeStr(s?: string | null): string {
  if (!s) return "";
  return s
    .toLowerCase()
    .replace(/[&]/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Resolves question metadata (subject, chapter, micro_topic) to a canonical topic ID and clean name.
 * Handles known edge cases:
 * - "Current Electricity & Semiconductor Electronics" -> checks for semiconductor keywords vs current electricity
 * - "Wave Optics" vs "Ray Optics" -> ensures Wave Optics is never lost or merged under a generic "Optics" name
 * - Sub-topic and chapter sharing the same name -> merged into one single canonical topic ID
 */
export function resolveCanonicalTopic(
  subject: string,
  rawChapter?: string | null,
  rawMicroTopic?: string | null
): CanonicalTopicMeta {
  const normSubKey = normalizeStr(subject).replace(/\s+/g, "-");
  const candidates = REGISTRY_BY_SUBJECT[normSubKey] || [];

  const cleanChap = normalizeStr(rawChapter);
  const cleanMicro = normalizeStr(rawMicroTopic);
  const combined = `${cleanChap} ${cleanMicro}`.trim();

  // Special disambiguation for Physics combined strings
  if (normSubKey === "physics" || normSubKey.includes("phys")) {
    // Current Electricity vs Semiconductor Electronics
    if (combined.includes("current electricity") && combined.includes("semiconductor")) {
      if (
        cleanMicro.includes("semiconductor") ||
        cleanMicro.includes("diode") ||
        cleanMicro.includes("logic gate") ||
        cleanMicro.includes("transistor")
      ) {
        return {
          id: "semiconductor-electronics",
          name: "Semiconductor Electronics",
          chapter: "Semiconductor Electronics",
        };
      }
      return {
        id: "current-electricity",
        name: "Current Electricity",
        chapter: "Current Electricity",
      };
    }

    // Wave Optics vs Ray Optics
    const waveKeywords = [
      "wave optics",
      "interference",
      "diffraction",
      "polarization",
      "huygens",
      "wavefront",
      "coherent",
      "slit",
      "fringe",
    ];
    const isWave = waveKeywords.some((kw) => combined.includes(kw));
    if (isWave) {
      return {
        id: "wave-optics",
        name: "Wave Optics",
        chapter: "Wave Optics",
      };
    }

    const rayKeywords = [
      "ray optics",
      "optical instruments",
      "reflection",
      "refraction",
      "lens",
      "mirror",
      "prism",
      "microscope",
      "telescope",
      "snell",
    ];
    const isRay = rayKeywords.some((kw) => combined.includes(kw));
    if (isRay || combined.includes("optics")) {
      return {
        id: "ray-optics",
        name: "Ray Optics and Optical Instruments",
        chapter: "Ray Optics and Optical Instruments",
      };
    }

    // Electrostatics sub-classification
    if (combined.includes("capacit") || combined.includes("potential")) {
      return {
        id: "electrostatic-potential-capacitance",
        name: "Electrostatic Potential and Capacitance",
        chapter: "Electrostatic Potential and Capacitance",
      };
    }
    if (combined.includes("electrostat") || combined.includes("electric charge") || combined.includes("gauss")) {
      return {
        id: "electric-charges-fields",
        name: "Electric Charges and Fields",
        chapter: "Electric Charges and Fields",
      };
    }
  }

  // Exact or alias match against subject registry
  for (const def of candidates) {
    const defNameNorm = normalizeStr(def.name);
    const defChapNorm = normalizeStr(def.chapter);

    if (cleanChap === defNameNorm || cleanChap === defChapNorm) {
      return { id: def.id, name: def.name, chapter: def.chapter };
    }
    if (cleanMicro === defNameNorm || cleanMicro === defChapNorm) {
      return { id: def.id, name: def.name, chapter: def.chapter };
    }
    for (const alias of def.aliases) {
      const aliasNorm = normalizeStr(alias);
      if (cleanMicro.includes(aliasNorm) || cleanChap.includes(aliasNorm)) {
        return { id: def.id, name: def.name, chapter: def.chapter };
      }
    }
  }

  // Fallback: If sub-topic and chapter share a name or no registry matched,
  // produce a clean, deterministic canonical topic ID and title
  const primaryTitle = (rawChapter?.trim() || rawMicroTopic?.trim() || "Core Syllabus Topic").trim();
  const slugId = normalizeStr(primaryTitle).replace(/\s+/g, "-") || "general-core";

  return {
    id: slugId,
    name: primaryTitle,
    chapter: rawChapter?.trim() || primaryTitle,
  };
}

/**
 * Categorizes a topic into one of 4 mutually exclusive status buckets:
 * - fix: accuracy < 60% and attempts >= 5
 * - strength: accuracy >= 70% and attempts >= 10
 * - needs_data: attempts < 5
 * - neutral: all other topics
 */
export function getTopicBucket(topic: { attempted: number; accuracyPercentage: number }): TopicBucket {
  const attempts = topic.attempted ?? 0;
  const accuracy = topic.accuracyPercentage ?? 0;

  if (attempts < 5) {
    return "needs_data";
  }
  if (accuracy < 60) {
    return "fix";
  }
  if (accuracy >= 70 && attempts >= 10) {
    return "strength";
  }
  return "neutral";
}

/**
 * Partitions a list of topics into the 4 mutually exclusive buckets.
 * Guarantees that every topic appears in exactly one bucket.
 */
export function partitionTopics<T extends { attempted: number; accuracyPercentage: number }>(topics: T[]): {
  fix: T[];
  strength: T[];
  needs_data: T[];
  neutral: T[];
} {
  const fix: T[] = [];
  const strength: T[] = [];
  const needs_data: T[] = [];
  const neutral: T[] = [];

  for (const t of topics) {
    const bucket = getTopicBucket(t);
    switch (bucket) {
      case "fix":
        fix.push(t);
        break;
      case "strength":
        strength.push(t);
        break;
      case "needs_data":
        needs_data.push(t);
        break;
      case "neutral":
        neutral.push(t);
        break;
    }
  }

  return { fix, strength, needs_data, neutral };
}
