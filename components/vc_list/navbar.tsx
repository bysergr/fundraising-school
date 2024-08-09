'use client';

import UpdateStartupModal from '@/components/startups_list/update-startup-modal';
import OpenAuthModal from '@/components/auth/open-auth-modal';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/providers/user-store-provider';
import React, { useEffect } from 'react';
import Profile from '@/components/vc_list/profile';
import type { Session } from 'next-auth';
import Image from 'next/image';
import menu from '@/public/images/icons/menu.svg';
import exit from '@/public/images/icons/exit.svg';
import logo from '@/public/images/ctw/logo.svg';

import { PlayIcon, NewspaperIcon } from '@heroicons/react/24/outline';

import { VCListIcon } from '@/public/images/icons/vc_list';
import { StartupsIcon } from '@/public/images/icons/startups';
import { AgendaIcon } from '@/public/images/icons/agenda';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  data: Session | null;
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  pathname: string;
  collapsed: boolean;
  exact?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, collapsed, pathname, href, exact }) => {
  const isActivate = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={clsx(
        isActivate
          ? 'bg-[#3C0560] fill-white font-semibold text-white'
          : 'fill-[#32083E] text-[#32083E]',
        'flex rounded-lg p-2.5 text-lg',
      )}
    >
      {icon}
      {!collapsed && <span className="ml-3">{text}</span>}
    </Link>
  );
};

const Navbar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ isOpen, setIsOpen, isCollapsed, setIsCollapsed, data }, ref) => {
    const { role, email, updateRole, updateEmail } = useUserStore((state) => state);

    useEffect(() => {
      if (email.trim() === '' && data?.user && data.user.email) {
        updateEmail(data.user.email);
        return;
      }

      if (role !== undefined) return;

      const syncRole = async () => {
        const roleResponse = await fetch(`/api/user/startups/${email}`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (roleResponse.status !== 200) {
          console.error('Error validating user: ', roleResponse.status);
        }

        const roleBody = await roleResponse.json();

        let roleResp: string | undefined = roleBody.response;

        if (roleResp === undefined) {
          console.error('Error validating user: ', roleResponse.status);

          roleResp = 'guest';
        }

        updateRole(roleResp);
      };

      syncRole();
    }, [email, updateRole, role, updateEmail, data]);

    const pathname = usePathname();

    const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';

    return (
      <nav
        ref={ref}
        className={`flex flex-col justify-between bg-white text-black ${sidebarWidth} absolute inset-y-0 left-0 z-40 space-y-6 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex-col ">
          <div className="mb-6 flex justify-between px-5 py-2.5">
            <button
              className="hidden lg:block"
              onClick={() => setIsCollapsed(!isCollapsed)}
              type="button"
            >
              <Image alt="colapse button" src={menu} className="w-6" />
            </button>
            {!isCollapsed && <Image alt="CTW logo" src={logo} className="w-9/12" />}
            <button className="block lg:hidden" onClick={() => setIsOpen(false)} type="button">
              <Image alt="close button" src={exit} className="w-6" />
            </button>
          </div>
          <div className="space-y-4 px-2">
            <NavItem
              icon={
                <NewspaperIcon
                  className="size-6"
                  stroke={pathname === '/product' ? '#fff' : '#32083E'}
                />
              }
              text="Match Making"
              collapsed={isCollapsed}
              href="/product"
              pathname={pathname}
              exact
            />

            {data && data.user && (
              <NavItem
                icon={
                  <PlayIcon
                    className="size-6"
                    stroke={pathname.startsWith('/product/courses') ? '#fff' : '#32083E'}
                  />
                }
                text="Courses"
                collapsed={isCollapsed}
                href="/product/courses"
                pathname={pathname}
              />
            )}

            {role === 'startup' && (
              <NavItem
                icon={<VCListIcon stroke={pathname === '/product/vc_list' ? '#fff' : '#32083E'} />}
                text="VC List"
                collapsed={isCollapsed}
                href="/product/vc_list"
                pathname={pathname}
              />
            )}
            {role === 'fund' && (
              <NavItem
                icon={
                  <StartupsIcon
                    stroke={pathname === '/product/startups_list' ? '#fff' : '#32083E'}
                  />
                }
                text="Startup List"
                collapsed={isCollapsed}
                href="/product/startups_list"
                pathname={pathname}
              />
            )}
            <NavItem
              icon={
                <AgendaIcon stroke={pathname === '/product/search_list' ? '#fff' : '#32083E'} />
              }
              text="Agenda"
              collapsed={isCollapsed}
              href="/product/search_list"
              pathname={pathname}
            />
          </div>
        </div>
        <div className="space-y-3.5 px-2 py-5">
          {data?.user ? (
            <>
              <UpdateStartupModal />
              <Profile data={data} collapsed={isCollapsed} />
            </>
          ) : (
            <OpenAuthModal className="btn mt-auto flex h-11 w-full max-w-[335px] items-center rounded-3xl border-ctwLightPurple bg-white px-4 text-ctwLightPurple" />
          )}
          <p className={`${isCollapsed ? 'text-[12px]' : 'text-sm'} `}>
            {`${!isCollapsed ? 'Made with 💜 ' : ''}`}
            by{' '}
            <a
              href="https://onde-vamos.com/"
              target="_blank"
              className="underline"
              rel="noopener noreferrer"
            >
              Onde
            </a>
          </p>
        </div>
      </nav>
    );
  },
);

Navbar.displayName = 'Navbar';

export default Navbar;
