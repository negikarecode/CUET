"use client";

import React, { createContext, useContext, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DisclosureContextType {
  open: boolean;
  setOpen: (next: boolean | ((prev: boolean) => boolean)) => void;
  buttonId: string;
  panelId: string;
}

const DisclosureContext = createContext<DisclosureContextType | null>(null);

function useDisclosureContext(componentName: string) {
  const context = useContext(DisclosureContext);
  if (!context) throw new Error(`${componentName} must be used inside Disclosure`);
  return context;
}

export function Disclosure({
  as: Component = "div",
  className,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  children,
  ...props
}: {
  as?: any;
  className?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen === undefined ? internalOpen : controlledOpen;

  const setOpen = (nextOpen: boolean | ((prev: boolean) => boolean)) => {
    const value = typeof nextOpen === "function" ? nextOpen(open) : nextOpen;
    if (controlledOpen === undefined) setInternalOpen(value);
    onOpenChange?.(value);
  };
  const id = useId();

  return (
    <DisclosureContext.Provider
      value={{
        open,
        setOpen,
        buttonId: `${id}-button`,
        panelId: `${id}-panel`,
      }}
    >
      <Component
        {...props}
        className={cn(className)}
        data-state={open ? "open" : "closed"}
      >
        {children}
      </Component>
    </DisclosureContext.Provider>
  );
}

export function DisclosureButton({
  as: Component = "button",
  className,
  onClick,
  children,
  ...props
}: {
  as?: any;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const { open, setOpen, buttonId, panelId } =
    useDisclosureContext("DisclosureButton");

  return (
    <Component
      {...props}
      id={buttonId}
      type={Component === "button" ? "button" : undefined}
      className={cn(className)}
      aria-expanded={open}
      aria-controls={panelId}
      data-state={open ? "open" : "closed"}
      onClick={(event: React.MouseEvent) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen((value) => !value);
      }}
    >
      {children}
    </Component>
  );
}

export function DisclosurePanel({
  className,
  keepRendered = false,
  children,
  style,
  ...props
}: {
  className?: string;
  keepRendered?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}) {
  const { open, buttonId, panelId } = useDisclosureContext("DisclosurePanel");
  const panelProps = {
    ...props,
    id: panelId,
    className: cn(className),
    role: "region",
    "aria-labelledby": buttonId,
    "aria-hidden": !open,
    style: { overflow: "hidden", ...style },
  };

  if (keepRendered) {
    return (
      <motion.div
        {...panelProps}
        initial={false}
        animate={
          open
            ? { height: "auto", opacity: 1 }
            : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          {...panelProps}
          key={panelId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
