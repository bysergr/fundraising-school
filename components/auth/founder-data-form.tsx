'use client';

import { useState, FormEvent } from 'react';
import { HomeIcon, LinkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import ClipLoader from 'react-spinners/ClipLoader';
import { MainIndustries } from '@/data/enums';
import { Session } from 'next-auth';
import { useAppStore } from '@/providers/app-store-providers';
import { useUserStore } from '@/providers/user-store-provider';

export default function FounderDataForm({ data }: { data: Session | null }) {
  const { closeSignInModal, openUpdateStartupModal } = useAppStore((state) => state);
  const { updateRole } = useUserStore((state) => state);

  const [companyName, setCompanyName] = useState<string>('Naurat');
  const [startupURL, setStartupURL] = useState<string>('https://naurat.com/');
  const [jobTitle, setJobTitle] = useState<string>('CEO');

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const industrySelect = e.currentTarget.elements.namedItem('industry') as HTMLSelectElement;

      const response = await fetch('/api/user/auth/founder', {
        method: 'PUT',
        body: JSON.stringify({
          email: data?.user?.email,
          startup_name: companyName,
          startup_url: startupURL,
          role: jobTitle,
          main_industry: industrySelect.value,
        }),
      });

      if (response.status !== 201) {
        console.error('Error create founder');
        return;
      }

      closeSignInModal();
      openUpdateStartupModal();
      updateRole('startup');
    } catch {
      console.error('Error create founder');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid h-44 w-full place-content-center">
        <ClipLoader color="#637EE0" size={55} />
        <p className="pt-4 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-12 flex w-full flex-col items-center justify-between gap-12"
    >
      <div className="flex w-full flex-col items-center gap-1">
        <label className="mt-2 block w-full max-w-[365px] text-left font-semibold">
          Company Name
        </label>
        <div className="flex h-11 w-full max-w-[365px] items-center rounded-[22px] border border-green-950 bg-white px-5 py-1">
          <HomeIcon className="size-6" />
          <input
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border-0 focus:border-0 focus:outline-none focus:ring-0 active:border-0"
            type="text"
            placeholder={companyName}
          />
        </div>
        <label className="mt-2 block w-full max-w-[365px] text-left font-semibold">
          Startup URL
        </label>
        <div className="flex h-11 w-full max-w-[365px] items-center rounded-[22px] border border-green-950 bg-white px-5 py-1">
          <LinkIcon className="size-6" />
          <input
            onChange={(e) => setStartupURL(e.target.value)}
            className="w-full border-0 focus:border-0 focus:outline-none focus:ring-0 active:border-0"
            type="text"
            placeholder={startupURL}
          />
        </div>

        <label className="mt-2 block w-full max-w-[365px] text-left font-semibold">Job Title</label>
        <div className="flex h-11 w-full max-w-[365px] items-center rounded-[22px] border border-green-950 bg-white px-5 py-1">
          <UserCircleIcon className="size-6" />
          <input
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full border-0 focus:border-0 focus:outline-none focus:ring-0 active:border-0"
            type="text"
            placeholder={jobTitle}
          />
        </div>

        <label
          className="mt-2 block w-full max-w-[365px] text-left font-semibold"
          htmlFor="industry"
        >
          Main Industries
        </label>
        <select
          id="industry"
          className="w-full max-w-[365px] rounded-md focus:border-ctwLightPurple"
        >
          {MainIndustries.map((Name, i) => (
            <option key={i}>{Name}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="btn mb-12 flex h-11 w-full max-w-[365px] items-center gap-[6px] rounded-3xl bg-ctwLightPurple px-4 text-white"
      >
        Continue
      </button>
    </form>
  );
}
