import React, { useState, ReactNode, useRef, useEffect } from 'react';

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  className?: string;
}

const Popover: React.FC<PopoverProps> = ({ trigger, content, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      ref={popoverRef}
      onClick={handleTriggerClick}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {trigger}
      {isOpen && (
        <div
          className={`absolute z-50 w-72 rounded-md border bg-gray-100 p-4 text-gray-800 shadow-sm outline-none 
            ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      )}
    </div>
  );
};

const PopoverTrigger: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const PopoverContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export { Popover, PopoverTrigger, PopoverContent };
