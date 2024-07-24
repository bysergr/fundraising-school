'use client';

import { useState, useCallback, FormEvent } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';

import { RoundRequestBody, updateRoundInfoUser } from '@/utils/auth';
import { AppLink, Rounds } from '@/data/enums';

export default function RoundForm({ data }: { data: Session }) {
  const router = useRouter();

  const [seekingCapital, setSeekingCapital] = useState<boolean>(false);
  const [agreeTermsAndConditions, setAgreeTermsAndConditions] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!agreeTermsAndConditions) {
        return;
      }

      setLoading(true);

      const request_body: RoundRequestBody = {
        seeking_capital: seekingCapital,
        accept_terms_and_condition: agreeTermsAndConditions,
        email: data.user?.email as string,
      };

      if (seekingCapital) {
        request_body['round_name'] = (e.target as HTMLFormElement)['round'].value;
      }

      try {
        await updateRoundInfoUser(request_body);

        router.replace(AppLink.Product.Home);
      } catch {
        console.error('Error update round user info');
      } finally {
        setLoading(false);
      }
    },
    [agreeTermsAndConditions, data.user?.email, router, seekingCapital],
  );

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
      className="flex h-1/2 min-h-64 w-full max-w-[335px] flex-col justify-between gap-2 "
    >
      <div className="flex flex-col gap-2">
        <label className="block font-semibold" htmlFor="seeking-capital">
          Seeking capital?
        </label>
        <label className="flex h-11 w-full max-w-[335px] items-center gap-2 rounded-md bg-neutral-200 px-4">
          <input
            checked={seekingCapital}
            onChange={() => setSeekingCapital((e) => !e)}
            id="seeking-capital"
            type="checkbox"
          />
          <span>Yes</span>
        </label>
        {seekingCapital && (
          <>
            <label className="block font-semibold" htmlFor="round">
              Which round?
            </label>
            <select id="round" className="rounded-md focus:border-fsPurple">
              {Rounds.map(({ Name }, i) => (
                <option key={i}>{Name}</option>
              ))}
            </select>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <input
            checked={agreeTermsAndConditions}
            onChange={() => setAgreeTermsAndConditions((e) => !e)}
            type="checkbox"
            required
          />
          I agree with Terms & Conditions
        </label>
        <button
          type="submit"
          className="btn flex h-11 w-full max-w-[335px] items-center gap-[6px] rounded-3xl bg-fsPurple px-4 text-white"
        >
          Create
        </button>
      </div>
    </form>
  );
}
