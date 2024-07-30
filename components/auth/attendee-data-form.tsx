'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { HomeIcon } from '@heroicons/react/24/outline';
import ClipLoader from 'react-spinners/ClipLoader';
import { AppLink, JobLevel, EcosystemRoles } from '@/data/enums';

export default function AttendeeDataForm() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState<string>('Naurat');

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      // await updateContactInfoUser({
      //   email: data?.user?.email as string,
      // });

      // updateUserInfo(name, email, data?.user?.image as string, data?.user?.image as string, '');

      router.replace(AppLink.Activation.Round);
    } catch {
      console.error('Error update contact info');
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
      className="flex w-full flex-col items-center justify-between gap-12"
    >
      <div className="flex w-full flex-col items-center gap-1">
        <label className="mt-2 block w-full max-w-[335px] text-left font-semibold">
          Company Name
        </label>
        <div className="flex h-11 w-full max-w-[335px] items-center rounded-[22px] border border-green-950 bg-white px-5 py-1">
          <HomeIcon className="size-6" />
          <input
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border-0 focus:border-0 focus:outline-none focus:ring-0 active:border-0"
            type="text"
            placeholder={companyName}
          />
        </div>

        <label
          className="mt-2 block w-full max-w-[335px] text-left font-semibold"
          htmlFor="country"
        >
          Job Level
        </label>
        <select id="country" className="w-full max-w-[335px] rounded-md focus:border-fsPurple">
          {JobLevel.map((Name, i) => (
            <option key={i}>{Name}</option>
          ))}
        </select>

        <label
          className="mt-2 block w-full max-w-[335px] text-left font-semibold"
          htmlFor="country"
        >
          Ecosystem Role
        </label>
        <select id="country" className="w-full max-w-[335px] rounded-md focus:border-fsPurple">
          {EcosystemRoles.map((Name, i) => (
            <option key={i}>{Name}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="btn flex h-11 w-full max-w-[335px] items-center gap-[6px] rounded-3xl bg-fsPurple px-4 text-white"
      >
        Continue
      </button>
    </form>
  );
}
