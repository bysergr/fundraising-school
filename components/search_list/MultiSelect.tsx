'use client';

import * as React from 'react';

export type Framework = { value: string; label: string };

type FancyMultiSelectProps = {
  data?: Framework[];
  selected: Framework[];
  setSelected: React.Dispatch<React.SetStateAction<Framework[]>>;
};

export const FancyMultiSelect = ({ data = [], selected, setSelected }: FancyMultiSelectProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = (framework: Framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if ((e.key === 'Delete' || e.key === 'Backspace') && input.value === '') {
        setSelected((prev) => {
          const newSelected = [...prev];
          newSelected.pop();
          return newSelected;
        });
      }
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  };

  const selectables = data.filter((framework) => !selected.includes(framework));

  return (
    <div onKeyDown={handleKeyDown}>
      <div className="group rounded-md border border-[#DBDBDB] bg-white p-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => (
            <span
              key={framework.value}
              className="inline-flex items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700"
            >
              {framework.label}
              <button
                className="ml-1 rounded-full focus:outline-none"
                onClick={() => handleUnselect(framework)}
                type="button"
              >
                <span className="text-gray-500 hover:text-gray-700">×</span>
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select..."
            className="ml-2 flex-1 border-none bg-transparent placeholder:text-gray-400"
          />
        </div>
      </div>
      {open && selectables.length > 0 && (
        <ul className="relative mt-2 max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
          {selectables.map((framework) => (
            <li
              key={framework.value}
              onMouseDown={(e) => {
                e.preventDefault();
                setSelected((prev) => [...prev, framework]);
                setInputValue('');
              }}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {framework.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
