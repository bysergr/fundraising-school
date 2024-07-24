'use client';

import { useCallback, useState, useEffect } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

import ClipLoader from 'react-spinners/ClipLoader';

import SignOutButton from '@/components/auth/sign-out-button';
import { AppLink } from '@/data/enums';
import { validateNewUser } from '@/utils/auth';
import { useUserStore } from '@/providers/user-store-provider';

export default function ValidateUser({ user }: { user: Session | null }) {
  const { updateUserInfo } = useUserStore((state) => state);

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // When the component is mounted, setLoading is set to false

    return () => {
      setLoading(false);
    };
  }, []);

  /**
   * Handles the button click event.
   * If there is no user, it signs out and redirects to the sign-in page.
   * Otherwise, it validates the new user and performs necessary actions.
   */
  const handleButton = useCallback(async () => {
    setLoading(true);

    if (!user) {
      signOut({ callbackUrl: AppLink.Auth.SignIn });
      return;
    }

    await validateNewUser(user, router, updateUserInfo);
  }, [user, router, updateUserInfo]);

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
        className="btn flex h-11 w-full max-w-[335px] items-center rounded-3xl bg-fsPurple px-4 text-white"
      >
        Continue
      </button>
      <SignOutButton text="Use a different account" />
    </div>
  );
}
