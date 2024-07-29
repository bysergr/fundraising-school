import type React from 'react';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';

interface ToastProps {
  color?: 'green' | 'blue' | 'red' | 'yellow';
  icon?: React.ReactNode;
  text: string;
  duration?: number;
}

export interface ToastRef {
  show: () => void;
}

export const Toast = forwardRef<ToastRef, ToastProps>(({ color = 'green', icon, text, duration = 3000 }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => setIsVisible(true)
  }));

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible) {
      timer = setTimeout(() => setIsVisible(false), duration);
    }
    return () => clearTimeout(timer);
  }, [isVisible, duration]);

  if (!isVisible) return null;

  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 text-white rounded-lg shadow ${colorClasses[color]}`} role="alert">
      {icon && <span className="mr-2">{icon}</span>}
      <div className="text-sm font-normal">{text}</div>
    </div>
  );
});
