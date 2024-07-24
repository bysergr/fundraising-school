'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { UserIcon, EnvelopeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ClipLoader from 'react-spinners/ClipLoader';
import { IsValidEmail, IsValidName } from '@/utils/validations';
import { AppLink } from '@/data/enums';
import { updateContactInfoUser } from '@/utils/auth';
import { useUserStore } from '@/providers/user-store-provider';

export default function ConfirmUserDataForm({ data }: { data: Session | null }) {
  const router = useRouter();

  const [name, setName] = useState<string>(data?.user?.name as string);
  const [validName, setValidName] = useState<boolean>(true);

  const [email, setEmail] = useState<string>(data?.user?.email as string);
  const [validEmail, setValidEmail] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const { updateUserInfo } = useUserStore((state) => state);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validName || !validEmail) {
      return;
    }

    setLoading(true);

    try {
      await updateContactInfoUser({
        contact_email: email,
        email: data?.user?.email as string,
        nickname: name,
      });

      updateUserInfo(name, email, data?.user?.image as string, data?.user?.image as string, '');

      router.replace(AppLink.Activation.Round);
    } catch {
      console.error('Error update contact info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Validate name, if empty set validName to false
    if (!IsValidName(name)) {
      setValidName(false);
    } else {
      setValidName(true);
    }
  }, [name]);

  useEffect(() => {
    // Validate email, if empty set validEmail to false
    if (!IsValidEmail(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }, [email]);

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
      className="flex h-44 w-full flex-col items-center justify-between gap-12"
    >
      <div className="flex w-full flex-col items-center gap-1">
        <div className="flex h-11 w-full max-w-[335px] items-center rounded-[22px] border border-green-950 px-5 py-1">
          <UserIcon className="size-6" />
          <input
            onChange={(e) => setName(e.target.value)}
            className="w-full border-0 focus:border-0 focus:outline-none focus:ring-0 active:border-0"
            type="text"
            placeholder={name}
          />
          {validName ? (
            <CheckIcon className="size-6 text-blue-500" />
          ) : (
            <XMarkIcon className="size-6 text-red-500" />
          )}
        </div>
        <div className="flex h-11 w-full max-w-[335px] items-center rounded-[22px] border border-green-950 px-5 py-1">
          <EnvelopeIcon className="size-6" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-0 focus:border-0 focus:outline-none focus:ring-0 active:border-0"
            type="email"
            placeholder={email}
          />
          {validEmail ? (
            <CheckIcon className="size-6 text-blue-500" />
          ) : (
            <XMarkIcon className="size-6 text-red-500" />
          )}
        </div>
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
