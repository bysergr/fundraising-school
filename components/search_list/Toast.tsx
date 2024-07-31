import type React from 'react';

export interface ToastProps {
  color?: 'green' | 'blue' | 'red' | 'yellow';
  icon?: React.ReactNode;
  text: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ color = 'green', icon, text, onClose }) => {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <div
      className={`mb-4 flex items-center rounded-lg p-4 text-white shadow ${colorClasses[color]} transition-opacity duration-300`}
      role="alert"
    >
      {icon && <span className="mr-2">{icon}</span>}
      <div className="text-sm font-normal">{text}</div>
      <button onClick={onClose} className="ml-auto text-white hover:text-gray-200">
        ×
      </button>
    </div>
  );
};
