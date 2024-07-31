import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { useRefinementList } from 'react-instantsearch';
import FilterIcons from './FilterIcons';
import { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';

type UnifiedRefinementItem = RefinementListItem & {
  attribute: string;
  refine: (value: string) => void;
};

const FilterButton: React.FC<UnifiedRefinementItem> = ({ refine, label, value, isRefined }) => {
  return (
    <Button
      onClick={() => refine(value)}
      className={`${isRefined ? 'border-none bg-[#DBDBDB]' : 'border-gray-400'} flex min-w-max items-center justify-center gap-2 rounded-md border px-2 py-1.5 text-lg text-black`}
    >
      <FilterIcons label={label} className="w-[28px]" />
      <div className="w-full">
        <span className="whitespace-nowrap">{label}</span>
      </div>
      {isRefined && <XMarkIcon color="#000" className="w-[18px]" />}
    </Button>
  );
};

interface FiltersProps {
  attributes: string[];
}

export const Filters: React.FC<FiltersProps> = ({ attributes }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const refinementLists = [];
  for (const attribute of attributes) {
    refinementLists.push({
      attribute,
      ...useRefinementList({ attribute }),
    });
  }

  const unifiedRefinements: UnifiedRefinementItem[] = refinementLists.flatMap(
    ({ attribute, items, refine }) => items.map((item) => ({ ...item, attribute, refine })),
  );

  // Sort the unified refinements, putting refined items first
  const sortedRefinements = unifiedRefinements.sort((a, b) => {
    if (a.isRefined === b.isRefined) {
      return 0; // maintain original order if refinement status is the same
    }
    return a.isRefined ? -1 : 1; // refined items come first
  });

  // Do not show the refinement list if there are no refinements
  if (sortedRefinements.length === 0) {
    return <p>There are no more refinements for this query</p>;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Adjust this value as needed
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex items-center gap-5 py-2 max-md:flex-wrap">
      <button
        onClick={() => scroll('left')}
        className="my-auto flex size-[30px] items-center justify-center self-stretch rounded-none border border-solid bg-ctwLightPurple p-1.5 text-white"
      >
        <ChevronLeftIcon className="aspect-square w-[18px] font-bold" />
      </button>

      <div ref={scrollRef} className="flex flex-1 gap-2.5 overflow-x-auto">
        {sortedRefinements.map((item) => (
          <FilterButton key={`${item.attribute}-${item.label}`} {...item} />
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="my-auto flex size-[30px] items-center justify-center self-stretch rounded-none border border-solid bg-ctwLightPurple p-1.5 text-white"
      >
        <ChevronRightIcon className="aspect-square w-[18px] font-bold" />
      </button>
    </div>
  );
};
