'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchInput({ searchType }: { searchType: 'VC' | 'Startup' }) {
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {}, [searchInput]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-2 flex">
        <input
          type="text"
          id="search"
          className="block h-9 w-72 rounded-s-lg border border-gray-100 bg-gray-100 text-xs text-gray-900 focus:border-fsPurple focus:ring-0"
          placeholder={`Search ${searchType}s...`}
          onChange={(e) => setSearchInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="-ml-14 h-9 rounded-e-lg bg-none px-3 text-xs font-medium  text-ctwPurple focus:outline-none focus:ring-0"
        >
          <MagnifyingGlassIcon className="size-5" />
        </button>
      </div>
    </form>
  );
}
