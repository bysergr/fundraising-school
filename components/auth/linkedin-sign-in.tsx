'use client';

import { useAppStore } from '@/providers/app-store-providers';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';

export default function LinkedInSignIn({ className }: { className: string }) {
  const setStage = useAppStore((state) => state.setSignInStage);

  return (
    <button
      onClick={() => {
        signIn('linkedin', { redirect: true, callbackUrl: '/matchmaking/auth' });

        setStage('linkedin');
      }}
      className={clsx(
        'btn flex h-11 w-full max-w-[335px] items-center gap-[6px] rounded-3xl bg-ctwLightPurple px-4 text-white',
        className,
      )}
    >
      <EnvelopeIcon className="size-6" />
      Continue with LinkedIn
    </button>
  );
}
