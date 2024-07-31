import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement>;
}

const TooltipContext = createContext<TooltipContextType | null>(null);

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      {children}
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children, asChild }) => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error('TooltipTrigger must be used within a Tooltip');

  const { setIsOpen, triggerRef } = context;

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    });
  }

  return (
    <span ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </span>
  );
};

interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
}

export const TooltipContent: React.FC<TooltipContentProps> = ({
  children,
  className = '',
  sideOffset = 5,
}) => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error('TooltipContent must be used within a Tooltip');

  const { isOpen, triggerRef } = context;
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      const top = triggerRect.top - contentRect.height - sideOffset;
      const left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;

      contentRef.current.style.top = `${top + window.scrollY}px`;
      contentRef.current.style.left = `${left + window.scrollX}px`;
    }
  }, [isOpen, sideOffset]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      className={`fixed z-50 rounded bg-gray-800 px-2 py-1 text-sm text-white ${className}`}
    >
      {children}
    </div>,
    document.body,
  );
};
