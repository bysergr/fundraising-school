'use client';

import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '@/providers/user-store-provider';

export default function DownloadVC() {
  const { email } = useUserStore((state) => state);

  const handleClick = async () => {
    try {
      const response = await fetch(`/api/funds/fav/csv/${email}`, {
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
      a.download = 'favorite_funds.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mx-2 flex items-center gap-2 rounded-lg bg-ctwLightPurple p-3 text-white"
    >
      {/* <span className="text-sm font-semibold">Download your favorite VCs</span> */}
      <ArrowDownOnSquareIcon className="size-5" />
    </button>
  );
}
