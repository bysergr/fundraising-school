'use client';

import { AppLink } from '@/data/enums';
import { signOut } from 'next-auth/react';

export default function SignOutButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: AppLink.Auth.SignIn })}
      className="btn flex h-11  w-full max-w-[335px] items-center rounded-3xl border-fsPurple bg-white px-4 text-fsPurple"
    >
      {text}
    </button>
  );
}