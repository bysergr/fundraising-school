'use client';

import React from 'react';
import LinkedInSignIn from '@/components/auth/linkedin-sign-in';
import Logo from '@/components/ui/logo-ctw';
import { useAppStore } from '@/providers/app-store-providers';

export default function AuthLinkedinStage({ is_modal = false }: { is_modal?: boolean }) {
  const { closeSignInModal } = useAppStore((state) => state);

  return (
    <div className="flex size-full flex-col justify-around px-8 py-6 lg:p-0">
      <div className="flex flex-col items-center justify-between gap-12 ">
        <div className="block w-56 md:w-72 lg:hidden">
          <Logo bgWhite />
        </div>
        <h3 className="h3 mb-4 mt-8 max-w-xs text-center text-neutral-900">
          Elevate your fundraising skills
          <span className="mt-3 block text-sm font-normal text-neutral-500 sm:mt-4 sm:text-base lg:hidden">
            Sign up now
          </span>
        </h3>

        <LinkedInSignIn className="hidden lg:flex" />
        <LinkedInSignIn className="mx-auto lg:hidden" />
        {is_modal && (
          <div className="flex">
            <button
              onClick={closeSignInModal}
              className="m-0 border-0 p-0 underline"
              rel="noopener noreferrer"
              type="button"
            >
              Or continue later
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
