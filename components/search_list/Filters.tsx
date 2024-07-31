import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { useRefinementList } from 'react-instantsearch';
import FilterIcons from './FilterIcons';
import { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';

const FilterButton: React.FC<RefinementListItem & { refine: (value: string) => void }> = ({
  refine,
  label,
  count,
  value,
  isRefined,
}) => {
  return (
    <Button
      onClick={() => refine(value)}
      className={`${isRefined ? 'border-none bg-[#DBDBDB]' : 'border-gray-400'} flex min-w-max  items-center justify-center gap-2 rounded-md border px-2 py-1.5 text-lg  text-black`}
    >
      <FilterIcons label={label} className="w-[28px]" />
      <div className="w-full">
        <span className=" whitespace-nowrap">{label}</span>
      </div>
      {isRefined && <XMarkIcon color="#000" className="w-[18px] " />} ({count})
    </Button>
  );
};

export const Filters: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const formatRefinement = useRefinementList({
    attribute: 'format',
  });
  const intentionRefinement = useRefinementList({
    attribute: 'intention',
  });
  const topicRefinement = useRefinementList({
    attribute: 'topic',
  });

  // Do not show the refinement list if there are no refinements
  if (
    formatRefinement.items.length +
      intentionRefinement.items.length +
      topicRefinement.items.length ===
    0
  ) {
    return null;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Ajusta este valor según necesites
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex items-center gap-5 py-2 max-md:flex-wrap">
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() => scroll('left')}
        className="my-auto flex size-[30px] items-center justify-center self-stretch  rounded-none border border-solid bg-ctwLightPurple p-1.5 text-white"
      >
        <ChevronLeftIcon className="aspect-square w-[18px] font-bold" />
      </button>

      <div ref={scrollRef} className="flex flex-1 gap-2.5 overflow-x-auto">
        {formatRefinement.items.map((item) => (
          <FilterButton key={item.label} {...item} refine={formatRefinement.refine} />
        ))}
        {intentionRefinement.items.map((item) => (
          <FilterButton key={item.label} {...item} refine={intentionRefinement.refine} />
        ))}
        {topicRefinement.items.map((item) => (
          <FilterButton key={item.label} {...item} refine={topicRefinement.refine} />
        ))}
      </div>

      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() => scroll('right')}
        className="my-auto flex size-[30px] items-center justify-center self-stretch  rounded-none border border-solid bg-ctwLightPurple p-1.5 text-white"
      >
        <ChevronRightIcon className="aspect-square w-[18px] font-bold" />
      </button>
    </div>
  );
};
