import * as React from "react";
import armchair from './icons/armchair.svg';
import beer from './icons/beer.svg';
import bike from './icons/bike.svg';
import chefHat from './icons/chef-hat.svg';
import croissant from './icons/croissant.svg';
import fish from './icons/fish.svg';
import heartHandshake from './icons/heart-handshake.svg';
import laptop from './icons/laptop.svg';
import wand from './icons/wand.svg';
import rocket from './icons/rocket.svg';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Button } from "../ui/button";

type FilterButtonProps = {
  icon: string;
  name: string;
}

const filters: FilterButtonProps[] = [
  { icon: laptop, name: "Coworking" },
  { icon: chefHat, name: "Dinner" },
  { icon: wand, name: "Experience" },
  { icon: croissant, name: "Breakfast / Brunch" },
  { icon: beer, name: "Happy Hour" },
  { icon: armchair, name: "Panel" },
  { icon: heartHandshake, name: "Mixer / Network" },
  { icon: fish, name: "Lunch" },
  { icon: rocket, name: "Workshop" },
  { icon: bike, name: "Workout" }
];

const FilterButton: React.FC<FilterButtonProps> = ({ icon, name }) => {
  const [active, setActive] = React.useState(false)
  return (
    <Button onClick={() => setActive(!active)} className={` ${active ? "border-[#7D0991] border-2" : "border-black"} rounded-none  border-solid border flex gap-2 justify-center items-center px-2 py-1.5 text-lg text-black  min-w-max`}>
      <Image
        loading="lazy"
        alt={name}
        src={icon}
        className="w-[18px]"
        width={18}
        height={18}
      />
      <div className="w-full">
        <span className=" whitespace-nowrap">{name}</span>
      </div>
      {
        active && (
          <XMarkIcon
            color="#7D0991"
            className="w-[18px] "
          />
        )
      }
    </Button>
  )
}

export const Filters: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Ajusta este valor según necesites
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex gap-5 items-center py-2 max-md:flex-wrap px-6">
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() => scroll('left')}
        className="flex justify-center items-center self-stretch p-1.5 my-auto  h-[30px] w-[30px] border-black rounded-none border border-solid"
      >
        <ChevronLeftIcon className="aspect-square w-[18px]" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto flex-1 gap-2.5 scrollbar-hide"
      >
        {filters.map(filter => <FilterButton key={filter.name} {...filter} />)}
      </div>

      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() => scroll('right')}
        className="flex justify-center items-center self-stretch p-1.5 my-auto  h-[30px] w-[30px] border-black rounded-none border border-solid"
      >
        <ChevronRightIcon className="aspect-square w-[18px]" />
      </button>
    </div>
  );
}