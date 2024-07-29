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

const Navbar = ({ userEmail }: { userEmail: string | null }) => {
  const { role, email, updateRole, updateEmail } = useUserStore((state) => state);

  useEffect(() => {
    if (userEmail === null) {
      return;
    }

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

  const SELECTED_STYLES =
    'rounded-r-lg rounded-bl-lg bg-ctwLightPurple font-bold border-l-4 border-ctwGreen';
  const STANDARD_LINK_STYLES =
    'flex h-10 items-center gap-2 pl-4 pr-6 text-xl font-semibold text-white hover:bg-ctwLightPurple hover:rounded-r-lg hover:rounded-bl-lg';

  if (userEmail === null) {
    return (
      <nav className="flex flex-col gap-1 p-4">
        <Link
          href="/product"
          className={clsx(pathname === '/product' && SELECTED_STYLES, STANDARD_LINK_STYLES)}
        >
          <HomeIcon className="size-5 stroke-white" />
          <span>Home</span>
        </Link>
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-1 p-4">
      <Link
        href="/product"
        className={clsx(pathname === '/product' && SELECTED_STYLES, STANDARD_LINK_STYLES)}
      >
        <HomeIcon className="size-5 stroke-white" />
        <span>Home</span>
      </Link>
      <Link
        href="/product/courses"
        className={clsx(
          pathname.startsWith('/product/courses') && SELECTED_STYLES,
          STANDARD_LINK_STYLES,
        )}
      >
        <VideoCameraIcon className="size-5" />
        Courses
      </Link>
      {role === 'startup' && (
        <Link
          href="/product/vc_list"
          className={clsx(pathname === '/product/vc_list' && SELECTED_STYLES, STANDARD_LINK_STYLES)}
        >
          <IdentificationIcon className="size-5" />
          VC List
        </Link>
      )}

      {role === 'fund' && (
        <Link
          href="/product/startups_list"
          className={clsx(
            pathname === '/product/startups_list' && SELECTED_STYLES,
            STANDARD_LINK_STYLES,
          )}
        >
          <PresentationChartLineIcon className="size-5" />
          Startups List
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
