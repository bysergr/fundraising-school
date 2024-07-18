'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '@/providers/user-store-provider';

export default function DownloadStartUps() {
  const { email } = useUserStore((state) => state);

  const handleClick = async () => {
    try {
      const response = await fetch(`/api/startups/fav/csv/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'text/csv',
        },
      });

      if (!response.ok) {
        return;
      }

      if (response.status !== 200) {
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.href = url;
      a.download = 'favorite_startups.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex h-9 items-center gap-2 rounded-e-lg bg-fsPurple px-3 text-white"
    >
      <StarIcon className="size-5" />
      <span className="mr-6 text-xs font-semibold">Download your favorites</span>
      <ArrowDownTrayIcon className="size-5" />
    </button>
  );
}
