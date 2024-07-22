'use client';

import { FormEvent, useEffect, useState } from 'react';

export default function SearchInput() {
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {}, [searchInput]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search" className="text-sm font-bold">
        Search
      </label>
      <div className="mt-2 flex">
        <input
          type="text"
          id="search"
          className="block h-9 w-72 rounded-s-lg border border-gray-100 bg-gray-100 text-xs text-gray-900 focus:border-fsPurple focus:ring-0"
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="h-9 rounded-e-lg bg-fsPurple px-3 text-xs font-medium text-white  focus:outline-none focus:ring-0 "
        >
          Search
        </button>
      </div>
    </form>
  );
}
