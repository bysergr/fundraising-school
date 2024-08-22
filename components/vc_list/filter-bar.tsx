'use client';

import { useAppStore } from '@/providers/app-store-providers';
import { FilterFundsOptions } from '@/stores/app-store';
import { useEffect } from 'react';
import { Select, SelectItem } from '@/components/ui/select';
export default function FilterBar() {
  const {
    filter_funds_options: filter_options,
    selected_funds_filter_options: selected_filter_options,
    setFundFilterOptions: setFilterOptions,
    setFundSelectedFilterOptions: setSelectedFilterOptions,
  } = useAppStore((state) => state);

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
      cache: 'no-store',
    })
      .then((response) => response.json())
      .then((data) => {
        const filterOptions: FilterFundsOptions = {
          rounds: data.rounds,
          check_size: data.check_size,
          sectors: data.sectors,
          locations: data.countries,
        };

        if (
          filter_options.rounds.length === 0 &&
          filterOptions.check_size.length === 0 &&
          filterOptions.sectors.length === 0 &&
          filterOptions.locations.length === 0
        )
          return;

        setFilterOptions(filterOptions);
      })
      .catch((error) => console.error('Error:', error));
  }, [filter_options, setFilterOptions]);

  return (
    <div className="mt-4 flex gap-6">
      <label className="flex flex-col gap-1 whitespace-nowrap text-xs font-bold">
        Rounds They invest In
        <Select
          onChange={(e) =>
            setSelectedFilterOptions({
              ...selected_filter_options,
              round: e.target.value === 'All' ? null : e.target.value,
            })
          }
          // className="h-5 w-36 rounded-lg border-0 bg-[#e4e7f8] py-0 text-[11px] font-normal outline-0 ring-0 focus:border-0 focus:ring-0"
        >
          <SelectItem>All</SelectItem>
          {Array.from(new Set(filter_options.rounds)).map((option) => (
            <SelectItem key={option}>{option}</SelectItem>
          ))}
        </Select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-bold">
        Check Size Ranges
        <Select
          onChange={(e) =>
            setSelectedFilterOptions({
              ...selected_filter_options,
              check_size: e.target.value === 'All' ? null : e.target.value,
            })
          }
          // className="h-5 w-36 rounded-lg border-0 bg-[#e4e7f8] py-0 text-[11px] font-normal outline-0 ring-0 focus:border-0 focus:ring-0"
        >
          <SelectItem>All</SelectItem>
          {Array.from(new Set(filter_options.check_size)).map((option) => (
            <SelectItem key={option}>{option}</SelectItem>
          ))}
        </Select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-bold">
        Sector Specialty
        <Select
          onChange={(e) =>
            setSelectedFilterOptions({
              ...selected_filter_options,
              sector: e.target.value === 'All' ? null : e.target.value,
            })
          }
          // className="h-5 w-36 rounded-lg border-0 bg-[#e4e7f8] py-0 text-[11px] font-normal outline-0 ring-0 focus:border-0 focus:ring-0"
        >
          <SelectItem>All</SelectItem>
          {Array.from(new Set(filter_options.sectors)).map((option) => (
            <SelectItem key={option}>{option}</SelectItem>
          ))}
        </Select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-bold">
        Geographic Focus
        <Select
          onChange={(e) =>
            setSelectedFilterOptions({
              ...selected_filter_options,
              location: e.target.value === 'All' ? null : e.target.value,
            })
          }
          // className="h-5 w-36 rounded-lg border-0 bg-[#e4e7f8] py-0 text-[11px] font-normal outline-0 ring-0 focus:border-0 focus:ring-0"
        >
          <SelectItem>All</SelectItem>
          {Array.from(new Set(filter_options.locations)).map((option) => (
            <SelectItem key={option}>{option}</SelectItem>
          ))}
        </Select>
      </label>
    </div>
  );
}
