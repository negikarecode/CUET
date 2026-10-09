import * as React from "react";
import { useInView } from "framer-motion";

export interface UseIsInViewOptions {
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: string;
}

export function useIsInView(
  ref?: React.Ref<HTMLElement | null> | null,
  options: UseIsInViewOptions = {}
) {
  const { inView, inViewOnce = false, inViewMargin = "0px" } = options;
  const localRef = React.useRef<HTMLElement | null>(null);

  React.useImperativeHandle(ref, () => localRef.current);

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin as any,
  });

  const isInView = !inView || inViewResult;
  return { ref: localRef, isInView };
}
