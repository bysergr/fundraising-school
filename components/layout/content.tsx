'use client';
import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/vc_list/navbar';
import type { Session } from 'next-auth';
import menu from '@/public/images/icons/menu.svg';
import Image from 'next/image';
import Link from 'next/link';
import onde_logo_gray from '@/public/images/ctw/onde_logo_gray.svg';
import logo from '@/public/images/ctw/logo.svg';
import AuthModal from '@/components/auth/auth-modal';

export const Content = ({
  data,
  children,
}: {
  children: React.ReactNode;
  data: Session | null;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  // <div className="flex h-screen w-full gap-1 overflow-y-hidden bg-gray-100 font-josefin">
  //   <div className="h-screen w-full max-w-64 flex-col justify-between bg-[red] py-8 hidden lg:flex">
  //     <div>
  //       <Logo className="mx-auto mb-6 mt-4 w-3/5" />
  //       <Navbar userEmail={data.user?.email as string} />
  //     </div>

  //   </div>
  //   <main className="flex w-full flex-col gap-1 overflow-x-auto"></main>
  // </div>

  return (
    <div className="flex h-screen bg-gray-100">
      <AuthModal data={data} />
      <Navbar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        ref={sidebarRef}
        data={data}
      />
      <div
        className={`flex flex-1 flex-col overflow-hidden  lg:flex-row ${sidebarCollapsed ? 'ml-0' : 'ml-0 md:ml-0'}`}
      >
        <header className="block bg-white shadow-md lg:hidden ">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
            <Image alt="CTW logo" src={logo} className="w-4/12" />
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              type="button"
            >
              <Image alt="colapse button" src={menu} className="w-6" />
            </button>
          </div>
        </header>
        <main className="flex h-screen flex-1 flex-col space-y-1 overflow-y-auto overflow-x-hidden bg-[#F9F9FA] px-2 lg:w-10/12 lg:px-4">
          <div className="min-h-[95%] overflow-y-auto">{children}</div>
        </main>
        <aside className="hidden w-full flex-col items-center justify-center bg-[#F9F9FA] p-4 lg:flex lg:w-1/5 ">
          <div className="space-y-6 text-base ">
            <div>
              <h2 className="text-lg font-semibold text-gray-500">Brought to you by</h2>
              <Link href="https://onde-vamos.com/" target="_blank" prefetch={false}>
                <Image alt="onde logo" src={onde_logo_gray} className="mt-1 w-4/12" />
              </Link>
            </div>
            <p className="text-gray-500">
              AI-powered event planning marketplace of venues and service providers.
            </p>
            <p className="text-wrap break-all text-gray-500">
              Plan your next event at{' '}
              <Link
                href="https://onde-vamos.com/"
                target="_blank"
                className="text-gray-700  underline"
                prefetch={false}
              >
                onde-vamos.com
              </Link>
            </p>
            <p className="text-gray-500">
              We’re organizing a series of thoughtfully curated dinners across Colombia and the US
              designed to accelerate personal and professional growth.
            </p>
            <p className="text-gray-500">
              To join, apply{' '}
              <Link href="#" target="_blank" className="text-gray-700  underline" prefetch={false}>
                here
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
