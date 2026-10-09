import { createContext, useContext, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const DisclosureContext = createContext(null)

function useDisclosureContext(componentName) {
  const context = useContext(DisclosureContext)
  if (!context) throw new Error(`${componentName} must be used inside Disclosure`)
  return context
}

function Disclosure({ as: Component = 'div', className, defaultOpen = false, open: controlledOpen, onOpenChange, children, ...props }) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const open = controlledOpen === undefined ? internalOpen : controlledOpen
  const setOpen = nextOpen => {
    const value = typeof nextOpen === 'function' ? nextOpen(open) : nextOpen
    if (controlledOpen === undefined) setInternalOpen(value)
    onOpenChange?.(value)
  }
  const id = useId()

  return (
    <DisclosureContext.Provider value={{ open, setOpen, buttonId: `${id}-button`, panelId: `${id}-panel` }}>
      <Component {...props} className={cn(className)} data-state={open ? 'open' : 'closed'}>
        {children}
      </Component>
    </DisclosureContext.Provider>
  )
}

function DisclosureButton({ as: Component = 'button', className, onClick, ...props }) {
  const { open, setOpen, buttonId, panelId } = useDisclosureContext('DisclosureButton')

  return (
    <Component
      {...props}
      id={buttonId}
      type={Component === 'button' ? 'button' : undefined}
      className={cn(className)}
      aria-expanded={open}
      aria-controls={panelId}
      data-state={open ? 'open' : 'closed'}
      onClick={event => {
        onClick?.(event)
        if (!event.defaultPrevented) setOpen(value => !value)
      }}
    />
  )
}

function DisclosurePanel({ className, keepRendered = false, children, ...props }) {
  const { open, buttonId, panelId } = useDisclosureContext('DisclosurePanel')
  const panelProps = {
    ...props,
    id: panelId,
    className: cn(className),
    role: 'region',
    'aria-labelledby': buttonId,
    'aria-hidden': !open,
    style: { overflow: 'hidden', ...props.style },
  }

  if (keepRendered) {
    return (
      <motion.div
        {...panelProps}
        inert={!open}
        initial={false}
        animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          {...panelProps}
          key={panelId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { Disclosure, DisclosureButton, DisclosurePanel }