'use client';

import { useAppStore } from '@/providers/app-store-providers';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const { setSignInStage, openSignInModal } = useAppStore((state) => state);

  setSignInStage('linkedin');
  openSignInModal();

  const router = useRouter();

  router.push('/matchmaking/');

  return;
}
