'use client';

import { useRouter } from 'next/navigation';

export default function DefaultLayout() {
  const router = useRouter();

  router.push('/product/');

  return;
}
