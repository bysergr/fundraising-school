'use client';

import { useAppStore } from '@/providers/app-store-providers';
import { useEffect, useRef } from 'react';
import AuthLinkedinStage from './stages/auth-linkedin';
import { Session } from 'next-auth';
import ValidationStage from './stages/validation';
import BasicInfoStage from './stages/basic-info';
import { ToastContainer } from 'react-toastify';

export default function AuthModal({ data }: { data: Session | null }) {
  const { modal_sign_in, sign_in_stage } = useAppStore((state) => state);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef.current) {
      try {
        if (modal_sign_in && !dialogRef.current.open) {
          dialogRef.current.showModal();
        } else if (!modal_sign_in && dialogRef.current.open) {
          dialogRef.current.close();
        }
      } catch (e) {
        console.error('Failed to show modal:', e);
      }
    }
  }, [modal_sign_in]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
      }
    };
    try {
      if (modal_sign_in) {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
        window.addEventListener('keydown', handleEscape);
      } else {
        dialogRef.current?.close();
        window.removeEventListener('keydown', handleEscape);
      }
    } catch (e) {
      console.error('Failed to show modal:', e);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [modal_sign_in]);

  return (
    <dialog
      id="modal-auth"
      className="left-auto right-0 top-0 m-0 h-screen w-full max-w-[763px] overflow-y-auto bg-neutral-50 px-6 py-8 md:w-1/2 md:px-14"
      ref={dialogRef}
    >
      <ToastContainer position="bottom-left" limit={3} />

      {sign_in_stage === null && <AuthLinkedinStage />}
      {sign_in_stage === 'linkedin' && <ValidationStage data={data} />}
      {sign_in_stage !== 'linkedin' && sign_in_stage !== null && (
        <BasicInfoStage data={data} stage={sign_in_stage} />
      )}
    </dialog>
  );
}
