'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Toast, ToastProps } from '@/components/search_list/Toast'; // Import your existing Toast component

interface ToastContextType {
  showToast: (props: Omit<ToastProps, 'onClose'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastItem extends ToastProps {
  id: string;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (props: Omit<ToastProps, 'onClose'>) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastItem = { ...props, id, onClose: () => removeToast(id) };
      setToasts((prevToasts) => [...prevToasts, newToast]);

      // Automatically remove toast after duration
      setTimeout(() => removeToast(id), props.duration || 3000);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="fixed bottom-0 right-4 z-50 flex flex-col items-end space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
