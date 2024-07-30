'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CheckIcon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';
import ClipLoader from 'react-spinners/ClipLoader';
import { AppLink, Countries, UserFormRoles } from '@/data/enums';

export default function ConfirmUserDataForm() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState<string>('57 3199876543');

  const [validWhatsApp, setValidWhatsApp] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validWhatsApp) {
      return;
    }

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

  useEffect(() => {
    // Validate phone number, if empty set validWhatsApp to false
    if (
      phoneNumber.trim() === '' ||
      phoneNumber.length < 6 ||
      phoneNumber.length > 17 ||
      isNaN(Number(phoneNumber.replace(/\s/g, '')))
    ) {
      setValidWhatsApp(false);
    } else {
      setValidWhatsApp(true);
    }
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
      className="flex w-full flex-col items-center justify-between gap-12"
    >
      <div className="flex w-full flex-col items-center gap-1">
        <label className="mt-2 block w-full max-w-[335px] text-left font-semibold">
          WhatsApp Number
          <span className="mt-2 block text-xs font-normal">With Country Code</span>
        </label>
        <div className="flex h-11 w-full max-w-[335px] items-center rounded-[22px] border border-green-950 bg-white px-5 py-1">
          <PhoneIcon className="size-6" />
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border-0 focus:border-0 focus:outline-none focus:ring-0 active:border-0"
            type="number"
            placeholder={phoneNumber}
          />
          {validWhatsApp ? (
            <CheckIcon className="size-6 text-blue-500" />
          ) : (
            <XMarkIcon className="size-6 text-red-500" />
          )}
        </div>
        <label
          className="mt-2 block w-full max-w-[335px] text-left font-semibold"
          htmlFor="country"
        >
          Country
        </label>
        <select id="country" className="w-full max-w-[335px] rounded-md focus:border-fsPurple">
          {Countries.map((Name, i) => (
            <option key={i}>{Name}</option>
          ))}
        </select>
        <label className="mt-2 block w-full max-w-[335px] text-left font-semibold" htmlFor="role">
          Role
        </label>
        <select id="role" className="w-full max-w-[335px] rounded-md focus:border-fsPurple">
          {UserFormRoles.map((Name, i) => (
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
