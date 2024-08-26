'use client';

import { Session } from 'next-auth';
import { useUserStore } from '@/providers/user-store-provider';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';

export default function ValidateFund({ user }: { user: Session }) {
  const { updateUserInfo } = useUserStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    updateUserInfo(
      user.user?.name as string,
      user.user?.email as string,
      user.user?.email as string,
      user.user?.image ? (user.user.image as string) : '',
      'fund',
    );

    router.push('/matchmaking/startup-list');
  }, [router, updateUserInfo, user.user?.email, user.user?.image, user.user?.name]);

  return (
    <div className="grid size-full place-content-center">
      <p>Made with ❤️ by Sergio Rey and Fabian Espitia</p>
      <div className="mx-auto mt-6">
        <ClipLoader color="#637EE0" size={55} />
      </div>
    </div>
  );
}
