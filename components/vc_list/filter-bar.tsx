'use client';

import { useFundStore } from '@/providers/funds-store-providers';
import { FilterOptions } from '@/stores/funds-store';
import { useEffect } from 'react';

export default function FilterBar() {
  const { filter_options, setFilterOptions, setSelectedFilterOptions, selected_filter_options } =
    useFundStore((state) => state);

  useEffect(() => {
    if (
      !(
        filter_options.rounds.length === 0 ||
        filter_options.check_size.length === 0 ||
        filter_options.sectors.length === 0 ||
        filter_options.locations.length === 0
      )
    ) {
      return;
    }

    fetch(`/api/funds/filter/options`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        const filterOptions: FilterOptions = {
          rounds: data.rounds,
          check_size: data.check_size,
          sectors: data.sectors,
          locations: data.countries,
        };

        setFilterOptions(filterOptions);
      })
      .catch((error) => console.error('Error:', error));
  }, [filter_options, setFilterOptions]);

  return (
    <div className="mt-4 flex gap-6">
      <label className="flex flex-col gap-1 text-xs font-bold">
        Rounds They invest In
        <select
          onChange={(e) =>
            setSelectedFilterOptions({
              ...selected_filter_options,
              round: e.target.value === 'All' ? null : e.target.value,
            })
          }
          className="h-5 w-36 rounded-lg border-0 bg-[#e4e7f8] py-0 text-[11px] font-normal outline-0 ring-0 focus:border-0 focus:ring-0"
        >
          <option>All</option>
          {filter_options.rounds.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-bold">
        Check Size Ranges
        <select
          onChange={(e) =>
            setSelectedFilterOptions({
              ...selected_filter_options,
              check_size: e.target.value === 'All' ? null : e.target.value,
            })
          }
          className="h-5 w-36 rounded-lg border-0 bg-[#e4e7f8] py-0 text-[11px] font-normal outline-0 ring-0 focus:border-0 focus:ring-0"
        >
          <option>All</option>
          {filter_options.check_size.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-bold">
        Sector Specialty
        <select
          onChange={(e) =>
            setSelectedFilterOptions({
              ...selected_filter_options,
              sector: e.target.value === 'All' ? null : e.target.value,
            })
          }
          className="h-5 w-36 rounded-lg border-0 bg-[#e4e7f8] py-0 text-[11px] font-normal outline-0 ring-0 focus:border-0 focus:ring-0"
        >
          <option>All</option>
          {filter_options.sectors.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-bold">
        Geographic Focus
        <select
          onChange={(e) =>
            setSelectedFilterOptions({
              ...selected_filter_options,
              location: e.target.value === 'All' ? null : e.target.value,
            })
          }
          className="h-5 w-36 rounded-lg border-0 bg-[#e4e7f8] py-0 text-[11px] font-normal outline-0 ring-0 focus:border-0 focus:ring-0"
        >
          <option>All</option>
          {filter_options.locations.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
