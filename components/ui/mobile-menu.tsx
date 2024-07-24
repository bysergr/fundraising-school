'use client';

import { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="flex justify-between gap-4 md:hidden">
      <a
        href="/signin"
        className="btn-sm w-full rounded-lg border-fsPurple bg-white px-10 text-fsPurple duration-150 hover:bg-fsPurple hover:text-white focus:bg-darkFsPurple focus:text-white sm:mb-0 sm:w-auto"
      >
        Sign in
      </a>

      <button
        ref={trigger}
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`hamburger ${mobileNavOpen && 'active'}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="size-6 fill-current text-gray-900"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute left-0 top-full z-20 h-screen w-full overflow-scroll bg-white pb-16"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2">
            <li>
              <a
                href="/#about"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/#speakers"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
              >
                Speakers & Mentors
              </a>
            </li>
            <li>
              <a
                href="/#curriculum"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
              >
                Curriculum
              </a>
            </li>
            <li>
              <a
                href="/#questions"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center px-5 py-3 font-medium text-gray-600 transition duration-150 ease-in-out hover:text-gray-900"
              >
                Q&A
              </a>
            </li>
          </ul>
        </Transition>
      </div>
    </div>
  );
}
