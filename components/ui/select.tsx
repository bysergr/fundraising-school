import type * as React from 'react';

// Componente Select
const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({
  className,
  children,
  ...props
}) => (
  <select
    className={`flex rounded-md border border-gray-400 px-3 py-2 text-sm  ${className}`}
    {...props}
  >
    {children}
  </select>
);

const SelectItem: React.FC<React.OptionHTMLAttributes<HTMLOptionElement>> = ({
  className,
  children,
  ...props
}) => (
  <option className={`text-sm ${className}`} {...props}>
    {children}
  </option>
);

export { Select, SelectItem };
