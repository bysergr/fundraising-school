'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAppStore } from '@/providers/app-store-providers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="mt-2 flex flex-col gap-1 text-xs font-bold">
      <label>Search</label>
      <div className="col-span-5 flex w-full content-center items-center justify-center rounded-md border border-gray-400 bg-white  lg:col-span-4">
        <Input
          className="mr-2 grow rounded-none border-none bg-transparent focus:border-none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoCapitalize="off"
          autoFocus
          placeholder={`Search ${searchType}s...`}
          onChange={(e) => handleChange(e)}
          required
        />
        <Button
          className=" inset-y-0 right-0 z-10 mx-2 my-1 flex cursor-pointer items-center  rounded-none bg-ctwLightPurple px-2 text-white focus:outline-none"
          variant="ghost"
          type="submit"
        >
          <MagnifyingGlassIcon className="size-4 font-bold text-white" />
        </Button>
      </div>
    </div>
  );
}
