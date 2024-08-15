'use client';

import 'react-phone-number-input/style.css';

import { useState, useEffect, FormEvent } from 'react';
import { CheckIcon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';
import ClipLoader from 'react-spinners/ClipLoader';
import { Countries, UserFormRoles } from '@/data/enums';
import { useAppStore } from '@/providers/app-store-providers';
import { toast } from 'react-toastify';
import { Session } from 'next-auth';
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';

export default function ConfirmUserDataForm({ data }: { data: Session | null }) {
  const { setSignInStage } = useAppStore((state) => state);

  const [phoneNumber, setPhoneNumber] = useState<any>();
  const [validWhatsApp, setValidWhatsApp] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validWhatsApp) {
      toast('Please enter a valid WhatsApp number', {
        theme: 'light',
        type: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      const countrySelect = e.currentTarget.elements.namedItem('country') as HTMLSelectElement;
      const roleSelect = e.currentTarget.elements.namedItem('role') as HTMLSelectElement;

      const response = await fetch('/api/user/auth', {
        method: 'POST',
        body: JSON.stringify({
          nickname: data?.user?.name as string,
          email: data?.user?.email as string,
          country_code: parsePhoneNumber(phoneNumber)?.countryCallingCode,
          phone_number: parsePhoneNumber(phoneNumber)?.nationalNumber,
          location: countrySelect.value,
        }),
      });

      if (response.status !== 201) {
        console.error('Error update contact info');
        return;
      }

      if (roleSelect.value === 'Entrepreneur (Founder)') {
        setSignInStage('founder');
      } else if (roleSelect.value === 'Investor') {
        setSignInStage('investor');
      } else if (roleSelect.value === 'Attendee') {
        setSignInStage('attendee');
      }
    } catch {
      console.error('Error update contact info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!phoneNumber) {
      setValidWhatsApp(false);
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setValidWhatsApp(false);
      return;
    }

    setValidWhatsApp(true);
  }, [phoneNumber]);

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
          WhatsApp Number
          <span className="mt-2 block text-xs font-normal">With Country Code</span>
        </label>
        <div className="flex h-11 w-full max-w-[365px] items-center rounded-[22px] border border-green-950 bg-white px-5 py-1">
          <PhoneInput
            defaultCountry="CO"
            onChange={(value) => setPhoneNumber(value)}
            value={phoneNumber}
          />
          {validWhatsApp ? (
            <CheckIcon className="size-6 text-blue-500" />
          ) : (
            <XMarkIcon className="size-6 text-red-500" />
          )}
        </div>
        <label
          className="mt-2 block w-full max-w-[365px] text-left font-semibold"
          htmlFor="country"
        >
          Country
        </label>
        <select id="country" className="w-full max-w-[365px] rounded-md focus:border-fsPurple">
          {Countries.map((Name, i) => (
            <option key={i}>{Name}</option>
          ))}
        </select>
        <label className="mt-2 block w-full max-w-[365px] text-left font-semibold" htmlFor="role">
          Role
        </label>
        <select id="role" className="w-full max-w-[365px] rounded-md focus:border-fsPurple">
          {UserFormRoles.map((Name, i) => (
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
