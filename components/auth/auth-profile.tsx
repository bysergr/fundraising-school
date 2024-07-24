'use client';

import { Session } from 'next-auth';
import Image from 'next/image';

import useUserInfo from '@/utils/validations';

export default function AuthProfile({ data }: { data: Session }) {
  const { imageProfile, name } = useUserInfo({ data });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Image
        src={imageProfile}
        className="rounded-full"
        width={150}
        height={150}
        quality={100}
        alt={`Linkedin Profile Picture of ${name}`}
      />
      <h3 className="h3 text-center">{name}</h3>
    </div>
  );
}
