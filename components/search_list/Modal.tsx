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
    <div className="fixed inset-0 z-50 top-[30%] items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative w-auto mx-auto my-6 max-w-[90vw] max-h-[90vh]">
        <div className="relative flex flex-col bg-white border-0 shadow-lg outline-none focus:outline-none min-w-full">
          <div className="flex items-start justify-between p-5 ">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
              type='button'
            >
              <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div className="relative p-6 flex-auto overflow-y-auto">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};
