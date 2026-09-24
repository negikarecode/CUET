"use client";

import LatexRenderer, {
  LatexRendererProps,
  cleanLatex,
  parseLatexSegments,
  sanitizeConceptText,
} from "@/components/common/LatexRenderer";

export type MathRendererProps = LatexRendererProps;
export { cleanLatex, parseLatexSegments, sanitizeConceptText };
export default LatexRenderer;
