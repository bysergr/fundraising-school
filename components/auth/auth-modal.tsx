'use client';

import { useAppStore } from '@/providers/app-store-providers';
import { useEffect, useRef } from 'react';
import AuthLinkedinStage from './stages/auth-linkedin';
import { Session } from 'next-auth';
import ValidationStage from './stages/validation';

export default function AuthModal({ data }: { data: Session | null }) {
  const { modal_sign_in, sign_in_stage } = useAppStore((state) => state);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modal_sign_in) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [modal_sign_in]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
      }
    };

    if (modal_sign_in) {
      dialogRef.current?.showModal();
      window.addEventListener('keydown', handleEscape);
    } else {
      dialogRef.current?.close();
      window.removeEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [modal_sign_in]);

  return (
    <dialog
      id="modal-auth"
      className="left-auto right-0 top-0 m-0 h-screen w-1/2 max-w-[763px] overflow-y-auto bg-neutral-50 px-14 py-8"
      ref={dialogRef}
    >
      {sign_in_stage === null && <AuthLinkedinStage />}
      {sign_in_stage === 'linkedin' && <ValidationStage data={data} />}
    </dialog>
  );
}
