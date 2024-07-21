'use client';

import {
  IdentificationIcon,
  HomeIcon,
  PresentationChartLineIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/providers/user-store-provider';
import { useEffect } from 'react';

const Navbar = ({ userEmail }: { userEmail: string }) => {
  const { role, email, updateRole, updateEmail } = useUserStore((state) => state);

  useEffect(() => {
    if (email.trim() === '') {
      updateEmail(userEmail);
      return;
    }

    if (role !== undefined) return;

    const syncRole = async () => {
      const roleResponse = await fetch(`/api/user/startups/${email}`, {
        method: 'GET',
      });

      if (roleResponse.status !== 200) {
        console.error('Error validating user: ', roleResponse.status);
      }

      const roleBody = await roleResponse.json();

      let roleResp: string | undefined = roleBody['response'];

      if (roleResp === undefined) {
        console.error('Error validating user: ', roleResponse.status);

        roleResp = 'guest';
      }

      updateRole(roleResp);
    };

    syncRole();
  }, [email, updateRole, role, updateEmail, userEmail]);

  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-4">
      <Link
        href="/product"
        className={clsx(
          pathname === '/product' && 'bg-secondLightFsPurple font-semibold text-fsPurple',
          'flex h-10 items-center gap-2 rounded-3xl px-6 text-sm font-semibold text-fsGray hover:bg-secondLightFsPurple hover:text-fsPurple',
        )}
      >
        <HomeIcon className="size-5" />
        Home
      </Link>
      <Link
        href="/product/courses"
        className={clsx(
          pathname === '/product/courses' && 'bg-secondLightFsPurple font-semibold text-fsPurple',
          'flex h-10 items-center gap-2 rounded-3xl px-6 text-sm font-semibold text-fsGray hover:bg-secondLightFsPurple hover:text-fsPurple',
        )}
      >
        <VideoCameraIcon className="size-5" />
        Courses
      </Link>
      {role === 'startup' && (
        <Link
          href="/product/vc_list"
          className={clsx(
            pathname === '/product/vc_list' && 'bg-secondLightFsPurple font-semibold text-fsPurple',
            'flex h-10 items-center gap-2 rounded-3xl px-6 text-sm font-semibold text-fsGray hover:bg-secondLightFsPurple hover:text-fsPurple',
          )}
        >
          <IdentificationIcon className="size-5" />
          VC List
        </Link>
      )}

      {role === 'fund' && (
        <Link
          href="/product/startups_list"
          className={clsx(
            pathname === '/product/startups_list' &&
              'bg-secondLightFsPurple font-semibold text-fsPurple',
            'flex h-10 items-center gap-2 rounded-3xl px-6 text-sm font-semibold text-fsGray hover:bg-secondLightFsPurple hover:text-fsPurple',
          )}
        >
          <PresentationChartLineIcon className="size-5" />
          Startups List
        </Link>
      )}

      <hr className="mt-4 " />
    </nav>
  );
};

export default Navbar;
