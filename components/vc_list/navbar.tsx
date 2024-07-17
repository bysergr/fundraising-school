'use client';

import {
  IdentificationIcon,
  HomeIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/providers/user-store-provider';

const Navbar = () => {
  const { is_from_startups } = useUserStore((state) => state);

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
      {is_from_startups ? (
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
      ) : (
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
