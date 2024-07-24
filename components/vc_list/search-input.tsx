'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '@/providers/app-store-providers';

export default function SearchInput({ searchType }: { searchType: 'VC' | 'Startup' }) {
  const {
    selected_funds_filter_options,
    selected_startups_filter_options,
    setFundSelectedFilterOptions,
    setStartupSelectedFilterOptions,
  } = useAppStore((state) => state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchText: string | null = e.target.value;

    if (searchText === '') {
      searchText = null;
    }

    if (searchType === 'VC') {
      setFundSelectedFilterOptions({
        ...selected_funds_filter_options,
        search_term: searchText,
      });
    } else {
      setStartupSelectedFilterOptions({
        ...selected_startups_filter_options,
        search_term: searchText,
      });
    }
  };

  return (
    <div>
      <div className="mt-2 flex">
        <input
          type="text"
          id="search"
          className="block h-9 w-72 rounded-s-lg border border-gray-100 bg-gray-100 text-xs text-gray-900 focus:border-fsPurple focus:ring-0"
          placeholder={`Search ${searchType}s...`}
          onChange={(e) => handleChange(e)}
          required
        />
        <div className="-ml-12 flex h-9 items-center justify-center rounded-e-lg bg-none px-3 text-xs font-medium text-ctwPurple focus:outline-none focus:ring-0">
          <MagnifyingGlassIcon className="size-5" />
        </div>
      </div>
    </div>
  );
}
