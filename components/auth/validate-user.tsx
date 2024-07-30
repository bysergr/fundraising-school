'use client';

import { useCallback, useState, useEffect } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import ClipLoader from 'react-spinners/ClipLoader';

import SignOutButton from '@/components/auth/sign-out-button';
import { AppLink } from '@/data/enums';
import validateUser from '@/utils/validateUser';
import { useUserStore } from '@/providers/user-store-provider';
import { useAppStore } from '@/providers/app-store-providers';

export default function ValidateUser({ user }: { user: Session | null }) {
  const { updateUserInfo } = useUserStore((state) => state);
  const setSignInStage = useAppStore((state) => state.setSignInStage);

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const handleButton = useCallback(async () => {
    setLoading(true);

    if (!user) {
      signOut({ callbackUrl: AppLink.Product.Home });
      return;
    }

    await validateUser(user, router, updateUserInfo, setSignInStage);
  }, [user, router, updateUserInfo, setSignInStage]);

  if (loading) {
    return (
      <div className="grid h-28 w-full place-content-center">
        <ClipLoader color="#637EE0" size={55} />
        <p className="pt-4 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-28 w-full flex-col items-center gap-4 lg:gap-2">
      <button
        onClick={handleButton}
        className="btn flex h-11 w-full max-w-[335px] items-center rounded-3xl bg-ctwLightPurple px-4 text-white"
      >
        Continue
      </button>
      <SignOutButton text="Use a different account" />
    </div>
  );
}
