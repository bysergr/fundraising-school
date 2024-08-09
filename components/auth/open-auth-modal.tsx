'use client';

import { useAppStore } from '@/providers/app-store-providers';
import clsx from 'clsx';
import React from 'react';

export default function OpenAuthModal({ className }: { className?: string }) {
  const { openSignInModal } = useAppStore((state) => state);

  return (
    <button className={clsx('block text-center', className)} onClick={openSignInModal}>
      Sign In
    </button>
  );
}
