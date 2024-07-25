"use client"
import type React from 'react';
import { useState, useEffect, useRef, forwardRef } from 'react';
import Navbar from '@/components/vc_list/navbar';
import type { Session } from 'next-auth';
import menu from '@/public/images/icons/menu.svg';
import Image from 'next/image';
import Link from 'next/link';
import onde_logo_gray from '@/public/images/ctw/onde_logo_gray.svg';
import logo from '@/public/images/ctw/logo.svg';

export const Content = ({ data, children }: { children: React.ReactNode; data: Session }) => {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      <Navbar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
        ref={sidebarRef}
        data={data}
      />
      <div className={`flex-1 flex flex-col lg:flex-row  overflow-hidden ${sidebarCollapsed ? 'ml-0' : 'ml-0 md:ml-0'}`}>
        <header className="bg-white shadow-md lg:hidden block ">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Image
              alt="CTW logo"
              src={logo}
              className="w-4/12"
            />
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              type='button'
            >
              <Image
                alt="colapse button"
                src={menu}
                className="w-6"
              />
            </button>
          </div>
        </header>
        <main className="flex flex-col lg:px-4 space-y-1 lg:w-10/12 flex-1 overflow-x-hidden overflow-y-auto bg-[#F9F9FA]">
          <div className="overflow-y-auto">
            {children}
          </div>
        </main>
        <aside className="lg:flex flex-col w-full justify-center bg-[#F9F9FA] items-center p-4 lg:w-1/5 hidden ">
          <div className="space-y-6 text-base ">
            <div>
              <h2 className="text-lg font-semibold text-gray-500">Brought to you by</h2>
              <Link href="https://onde-vamos.com/" target='_blank' prefetch={false}>
                <Image
                  alt="onde logo"
                  src={onde_logo_gray}
                  className='h-4/12 w-4/12 mt-1'
                />
              </Link>
            </div>
            <p className="text-gray-500">AI-powered event planning marketplace of venues and service providers.</p>
            <p className="text-gray-500 break-all text-wrap">
              Plan your next event at{" "}
              <Link href="https://onde-vamos.com/" target='_blank' className="text-gray-700  underline" prefetch={false}>
                onde-vamos.com
              </Link>
            </p>
            <p className="text-gray-500">
              We’re organizing a series of thoughtfully curated dinners across Colombia and the US designed to accelerate
              personal and professional growth.
            </p>
            <p className="text-gray-500">
              To join, apply{" "}
              <Link href="#" target='_blank' className="text-gray-700  underline" prefetch={false}>
                here
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}


