import type React from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-[30%] z-50 items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative mx-auto my-6 max-h-[90vh] w-auto max-w-[90vw]">
        <div className="relative flex min-w-full flex-col border-0 bg-white shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 ">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <button
              className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black outline-none focus:outline-none"
              onClick={onClose}
              type="button"
            >
              <span className="block size-6 text-2xl text-black outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative flex-auto overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
