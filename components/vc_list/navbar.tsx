'use client';

import UpdateStartupModal from '@/components/startups_list/update-startup-modal';
import OpenAuthModal from '@/components/auth/open-auth-modal';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/providers/user-store-provider';
import React, { useEffect } from 'react';
import Logo from '@/components/ui/logo-ctw';
import Profile from '@/components/vc_list/profile';
import type { Session } from 'next-auth';
import Image from 'next/image';
import menu from '@/public/images/icons/menu.svg';
import exit from '@/public/images/icons/exit.svg';
import logo from '@/public/images/ctw/logo.svg';

import { HomeIcon } from '@/public/images/icons/home';
import { PodcastIcon } from '@/public/images/icons/podcast';
import { ClassRoomIcon } from '@/public/images/icons/classroom';
import { VCListIcon } from '@/public/images/icons/vc_list';
import { StartupsIcon } from '@/public/images/icons/startups';
import { AgendaIcon } from '@/public/images/icons/agenda';


interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  data: Session
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  pathname: string;
  collapsed: boolean;
}

interface IconProps {
  icon: typeof menu;
}


const NavItem: React.FC<NavItemProps> = ({ icon, text, collapsed, pathname, href }) => (
  <Link
    href={href}
    className={clsx(
      pathname === href ? 'bg-[#3C0560] font-semibold text-white fill-white' : "fill-[#32083E] text-[#32083E]",
      'flex rounded-lg text-lg p-2.5',
    )}
  >
    {icon}
    {!collapsed && <span className="ml-3">{text}</span>}
  </Link>
);

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

    const SELECTED_STYLES =
      'rounded-r-lg rounded-bl-lg bg-ctwLightPurple font-bold border-l-4 border-ctwGreen';
    const STANDARD_LINK_STYLES =
      'flex h-10 items-center gap-2 pl-4 pr-6 text-xl font-semibold text-white hover:bg-ctwLightPurple hover:rounded-r-lg hover:rounded-bl-lg';

    const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';

    return (
      <nav ref={ref} className={`bg-white justify-between flex flex-col text-black ${sidebarWidth} space-y-6 absolute z-40 inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <div className="flex-col ">
          <div className="flex justify-between py-2.5 px-5">
            <button
              className="hidden lg:block"
              onClick={() => setIsCollapsed(!isCollapsed)}
              type="button"
            >
              <Image
                alt="colapse button"
                src={menu}
                className="w-6"
              />
            </button>
            {
              !isCollapsed && (
                <Image
                  alt="CTW logo"
                  src={logo}
                  className="w-9/12"
                />
              )
            }
            <button
              className="block lg:hidden"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <Image
                alt="close button"
                src={exit}
                className="w-6"
              />
            </button>
          </div>
          <div className="space-y-4 px-2">

            <NavItem
              icon={<HomeIcon stroke={pathname === "/product" ? '#fff' : "#32083E"} />}
              text="Home"
              collapsed={isCollapsed}
              href="/product"
              pathname={pathname}
            />
            {/* 
            <NavItem
              icon={<PodcastIcon stroke={pathname === "/podcast" ? '#fff' : "#32083E"} />}
              text="Podcast"
              collapsed={isCollapsed}
              href="/podcast"
              pathname={pathname}
            />
            <NavItem
              icon={<ClassRoomIcon stroke={pathname === "/classroom" ? '#fff' : "#32083E"} />}
              text="Classroom"
              collapsed={isCollapsed}
              href="/"
              pathname={pathname}
            /> */}

            {role === 'startup' && (
              <NavItem
                icon={<VCListIcon stroke={pathname === "/product/vc_list" ? '#fff' : "#32083E"} />}
                text="VC List"
                collapsed={isCollapsed}
                href="/product/vc_list"
                pathname={pathname}
              />
            )}
            {role === 'fund' && (
              <NavItem
                icon={<StartupsIcon stroke={pathname === "/product/startups_list" ? '#fff' : "#32083E"} />}
                text="Startup List"
                collapsed={isCollapsed}
                href="/product/startups_list"
                pathname={pathname}
              />
            )}
            <NavItem
              icon={<AgendaIcon stroke={pathname === "/product/search_list" ? '#fff' : "#32083E"} />}
              text="Agenda"
              collapsed={isCollapsed}
              href="/product/search_list"
              pathname={pathname}
            />
          </div>
        </div>
        <div className="py-5 px-2 space-y-3.5">
          {data?.user ? (
            <>
              <UpdateStartupModal />
              <Profile data={data} collapsed={isCollapsed} />
            </>
          ) : (
            <OpenAuthModal className="mt-auto" />
          )}
          <p className={`${isCollapsed ? "text-[12px]" : "text-sm"} `}>
            {`${!isCollapsed ? "Made with 💜 " : ""}`}
            by <a href="https://onde-vamos.com/" target="_blank" className='underline' rel="noopener noreferrer">Onde</a>
          </p>
        </div>
      </nav>
    );
  });

export default Navbar;
