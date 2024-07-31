import React from 'react';
import { LuCalendarMinus, LuCalendarPlus } from 'react-icons/lu';

const CalendarToggleButton = ({
  isAddedToCalendar,
  isLoading,
  onClick,
  className,
}: {
  isAddedToCalendar: boolean;
  isLoading: boolean;
  onClick: () => void;
  className?: string;
}) => {
  const buttonText = isAddedToCalendar ? 'Remove from Calendar' : 'Add to Calendar';
  const Icon = isAddedToCalendar ? LuCalendarMinus : LuCalendarPlus;

  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      aria-label={buttonText}
      className={`
        flex items-center justify-center rounded-md px-4 py-2
        text-sm font-medium transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          isAddedToCalendar
            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
        }
        ${isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        w-full text-white sm:w-auto
        ${className}
      `}
    >
      <Icon className="mr-2 size-5" />
      <span className="hidden sm:inline">{buttonText}</span>
      <span className="sm:hidden">{isAddedToCalendar ? 'Remove' : 'Add'}</span>
      {isLoading && (
        <svg
          className="ml-2 size-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default CalendarToggleButton;
