"use client"
import type React from 'react';
import { useState, useEffect, useRef, forwardRef } from 'react';
import Navbar from '@/components/vc_list/navbar';
import type { Session } from 'next-auth';
import menu from '@/public/images/icons/menu.svg';
import Image from 'next/image';

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
      <div className={`flex-1 flex flex-col overflow-hidden ${sidebarCollapsed ? 'ml-0' : 'ml-0 md:ml-0'}`}>
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {children}
        </main>
      </div>
    </div>
  );
}


