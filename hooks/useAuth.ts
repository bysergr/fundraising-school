import { useAppStore } from '@/providers/app-store-providers';
import { useEffect } from 'react';

export default function useAuth() {
  const { sign_in_stage, openSignInModal } = useAppStore((state) => state);

  useEffect(() => {
    if (sign_in_stage !== null) {
      openSignInModal();
    }
  });
}
