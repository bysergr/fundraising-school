'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import Logo from '@/components/ui/logo';
import MobileMenu from '@/components/ui/mobile-menu';

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.scrollY > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed z-30 w-full transition duration-300 ease-in-out ${!top ? 'bg-white shadow-lg backdrop-blur-sm md:bg-white/90' : ''}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Site branding */}
          <div className="block w-[90px] shrink-0">
            <Logo />
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow flex-wrap items-center justify-end">
              <li>
                <a
                  href="/#about"
                  className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#speakers"
                  className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Speakers & Mentors
                </a>
              </li>
              <li>
                <a
                  href="/#curriculum"
                  className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Curriculum
                </a>
              </li>
              <li>
                <a
                  href="/#questions"
                  className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
                >
                  Q&A
                </a>
              </li>
              <li>
                <Link
                  href="/signin"
                  className="btn-sm w-full rounded-3xl border-fsPurple bg-white px-14 text-fsPurple duration-150 hover:bg-fsPurple hover:text-white focus:bg-darkFsPurple focus:text-white sm:mb-0 sm:w-auto"
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
