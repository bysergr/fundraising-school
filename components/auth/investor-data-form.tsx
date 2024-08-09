'use client';

import { useState, FormEvent } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import ClipLoader from 'react-spinners/ClipLoader';
import { InvestmentStage, InvestmentGeography, MainIndustries, TicketSize } from '@/data/enums';
import { Session } from 'next-auth';
import { useAppStore } from '@/providers/app-store-providers';

export default function InvestorDataForm({ data }: { data: Session | null }) {
  const { closeSignInModal } = useAppStore((state) => state);

  const [jobTitle, setJobTitle] = useState<string>('Partner');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const investmentStageSelect = e.currentTarget.elements.namedItem(
        'investment_stage',
      ) as HTMLSelectElement;
      const investmentGeographySelect = e.currentTarget.elements.namedItem(
        'investment_geography',
      ) as HTMLSelectElement;
      const industrySelect = e.currentTarget.elements.namedItem('industry') as HTMLSelectElement;
      const ticketSelect = e.currentTarget.elements.namedItem('ticket_size') as HTMLSelectElement;

      const response = await fetch('/api/user/auth/investor', {
        method: 'PUT',
        body: JSON.stringify({
          email: data?.user?.email,
          investment_stage: investmentStageSelect.value,
          investment_geography: investmentGeographySelect.value,
          industry_to_invest: industrySelect.value,
          check_size: ticketSelect.value,
        }),
      });

      if (response.status !== 201) {
        console.error('Error create founder');
        return;
      }

      closeSignInModal();
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
      className="flex w-full flex-col items-center justify-between gap-12"
    >
      <div className="flex w-full flex-col items-center gap-1">
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
          htmlFor="investment_stage"
        >
          Investment Stage
        </label>
        <select
          id="investment_stage"
          className="w-full max-w-[365px] rounded-md focus:border-ctwLightPurple"
        >
          {InvestmentStage.map((Name, i) => (
            <option key={i}>{Name}</option>
          ))}
        </select>

        <label
          className="mt-2 block w-full max-w-[365px] text-left font-semibold"
          htmlFor="investment_geography"
        >
          Investment Geography
        </label>
        <select
          id="investment_geography"
          className="w-full max-w-[365px] rounded-md focus:border-ctwLightPurple"
        >
          {InvestmentGeography.map((Name, i) => (
            <option key={i}>{Name}</option>
          ))}
        </select>

        <label
          className="mt-2 block w-full max-w-[365px] text-left font-semibold"
          htmlFor="industry"
        >
          Industry to Invest
        </label>
        <select
          id="industry"
          className="w-full max-w-[365px] rounded-md focus:border-ctwLightPurple"
        >
          {MainIndustries.map((Name, i) => (
            <option key={i}>{Name}</option>
          ))}
        </select>

        <label
          className="mt-2 block w-full max-w-[365px] text-left font-semibold"
          htmlFor="ticket_size"
        >
          Ticket Size
        </label>
        <select
          id="ticket_size"
          className="w-full max-w-[365px] rounded-md focus:border-ctwLightPurple"
        >
          {TicketSize.map((Name, i) => (
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
