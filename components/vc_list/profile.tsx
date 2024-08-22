'use client';

import Image from 'next/image';
import SignOutButton from '@/components/auth/sign-out-button';
import useUserInfo from '@/utils/validations';
import type { Session } from 'next-auth';
import logout from '@/public/images/icons/logout.svg';
import clsx from 'clsx';
import { useAppStore } from '@/providers/app-store-providers';
import { useUserStore } from '@/providers/user-store-provider';
import { StartupsIcon } from '@/public/images/icons/startups';
import { signOut } from 'next-auth/react';
import { AppLink } from '@/data/enums';

export default function Profile({
  data,
  collapsed,
  className,
}: {
  data: Session;
  collapsed: boolean;
  className?: string;
}) {
  const { imageProfile, name } = useUserInfo({ data });

  const { openUpdateStartupModal } = useAppStore((state) => state);
  const { role, updateUserInfo } = useUserStore((state) => state);

  return (
    <div
      className={clsx(
        `flex flex-col space-y-3.5 ${!collapsed ? 'justify-start' : 'items-center justify-center'} `,
        className,
      )}
    >
      <Image
        src={imageProfile}
        className="rounded-full"
        width={86}
        height={86}
        quality={100}
        alt={`Linkedin Profile Picture of ${name}`}
        priority
      />
      {!collapsed ? (
        <>
          <p className="my-2 text-base font-semibold">{name}</p>
          <SignOutButton className="flex w-auto text-sm" text="Sign Out" />
          {role === 'startup' && (
            <button
              className="mt-2 rounded-md bg-[#32083E] px-3 py-1 text-sm font-semibold text-white"
              onClick={openUpdateStartupModal}
              type="button"
            >
              My Startup
            </button>
          )}
        </>
      ) : (
        <>
          {role === 'startup' && (
            <button
              className={clsx('fill-[#32083E] text-[#32083E]', 'flex  p-2.5 text-lg')}
              onClick={openUpdateStartupModal}
              type="button"
            >
              <StartupsIcon stroke={'#32083E'} />
            </button>
          )}
          <button
            onClick={() => {
              updateUserInfo('', '', '', '', '');
              signOut({ callbackUrl: AppLink.Product.Home });
            }}
          >
            <Image alt="icon" src={logout} className="w-6" />
          </button>
        </>
      )}
    </div>
  );
}
