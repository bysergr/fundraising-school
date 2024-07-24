'use client';

import { AppLink } from '@/data/enums';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';

export default function LinkedInSignIn({ className }: { className: string }) {
  return (
    <button
      onClick={() => signIn('linkedin', { callbackUrl: AppLink.Activation.Home })}
      className={clsx(
        'btn flex h-11 w-full max-w-[335px] items-center gap-[6px] rounded-3xl bg-fsPurple px-4 text-white',
        className,
      )}
    >
      <EnvelopeIcon className="size-6" />
      Continue with LinkedIn
    </button>
  );
}
