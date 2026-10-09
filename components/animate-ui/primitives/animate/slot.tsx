"use client";

import * as React from "react";
import { motion, isMotionComponent } from "framer-motion";
import { cn } from "@/lib/utils";

function mergeRefs(...refs: any[]) {
  return (node: any) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(node);
      } else {
        ref.current = node;
      }
    });
  };
}

function mergeProps(childProps: any, slotProps: any) {
  const merged = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className, slotProps.className);
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...childProps.style,
      ...slotProps.style,
    };
  }

  return merged;
}

export function Slot({
  children,
  ref,
  ...props
}: {
  children?: React.ReactNode;
  ref?: any;
  [key: string]: any;
}) {
  if (!React.isValidElement(children)) return null;

  const isAlreadyMotion =
    typeof children.type === "object" &&
    children.type !== null &&
    isMotionComponent(children.type);

  const Base = isAlreadyMotion
    ? (children.type as any)
    : (motion as any)(children.type);

  const { ref: childRef, ...childProps } = (children as any).props;
  const mergedProps = mergeProps(childProps, props);

  return <Base {...mergedProps} ref={mergeRefs(childRef, ref)} />;
}
