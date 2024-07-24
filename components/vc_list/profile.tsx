'use client';

import Image from 'next/image';
import SignOutButton from '@/components/auth/sign-out-button';
import useUserInfo from '@/utils/validations';
import { Session } from 'next-auth';
import clsx from 'clsx';

import { useAppStore } from '@/providers/app-store-providers';
import { useUserStore } from '@/providers/user-store-provider';

export default function Profile({ data, className }: { data: Session; className?: string }) {
  const { imageProfile, name } = useUserInfo({ data });

  const { openUpdateStartupModal } = useAppStore((state) => state);
  const { role } = useUserStore((state) => state);

  return (
    <div className={clsx('flex flex-col items-center', className)}>
      <Image
        src={imageProfile}
        className="rounded-full"
        width={86}
        height={86}
        quality={100}
        alt={`Linkedin Profile Picture of ${name}`}
        priority
      />
      <p className="my-2 text-center text-base font-bold text-white">{name}</p>
      <SignOutButton className="text-sm text-white" text="Sign Out" />

      {role === 'startup' && (
        <button
          className="mt-2 rounded-md bg-fsPurple px-3 py-1 text-sm font-semibold text-white"
          onClick={openUpdateStartupModal}
        >
          My Startup
        </button>
      )}
    </div>
  );
}
