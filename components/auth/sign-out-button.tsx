'use client';

import { AppLink } from '@/data/enums';
import { useUserStore } from '@/providers/user-store-provider';
import { signOut } from 'next-auth/react';

export default function SignOutButton({
  text,
  className = 'btn flex h-11 w-full max-w-[335px] items-center rounded-3xl border-ctwLightPurple bg-white px-4 text-ctwLightPurple',
}: {
  text: string;
  className?: string;
}) {
  const { updateUserInfo } = useUserStore((state) => state);

  return (
    <button
      onClick={() => {
        updateUserInfo('', '', '', '', '');
        signOut({ callbackUrl: AppLink.Product.Home });
      }}
      className={className}
    >
      {text}
    </button>
  );
}
