'use client';

import { useAppStore } from '@/providers/app-store-providers';
import { FilterStartupOptions } from '@/stores/app-store';
import { useEffect } from 'react';

export default function FilterBar() {
  const {
    filter_startups_options: filter_options,
    setStartupFilterOptions: setFilterOptions,
    setStartupSelectedFilterOptions: setSelectedFilterOptions,
    selected_startups_filter_options: selected_filter_options,
  } = useAppStore((state) => state);

  useEffect(() => {
    if (
      !(
        filter_options.traction.length === 0 ||
        filter_options.sectors.length === 0 ||
        filter_options.locations.length === 0
      )
    ) {
      return;
    }

    fetch(`/api/startups/filter/options`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        const filterOptions: FilterStartupOptions = {
          traction: data.tractions,
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
        Traction
        <select
          onChange={(e) =>
            setSelectedFilterOptions({
              ...selected_filter_options,
              traction: e.target.value === 'All' ? null : e.target.value,
            })
          }
          className="h-5 w-36 rounded-lg border-0 bg-[#e4e7f8] py-0 text-[11px] font-normal outline-0 ring-0 focus:border-0 focus:ring-0"
        >
          <option>All</option>
          {Array.from(new Set(filter_options.traction)).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-bold">
        Sector Speciality
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
          {Array.from(new Set(filter_options.sectors)).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-bold">
        Startup base in
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
          {Array.from(new Set(filter_options.locations)).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
