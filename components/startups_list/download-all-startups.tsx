'use client';

import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline';

export default function DownloadAllStartUps() {
  const handleClick = async () => {
    try {
      const response = await fetch(`/api/startups/csv`, {
        method: 'GET',
        cache: 'no-store',
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
      a.download = 'startups.xlsx';
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
      className="mr-2 flex items-center gap-2 rounded-lg bg-ctwLightPurple p-3 text-white"
    >
      <ArrowDownOnSquareIcon className="size-5" /> All
    </button>
  );
}
