'use client';

import Logo from '@/components/ui/logo';
import SliderIntro from '@/components/auth/slider-intro';
import SliderProfile from '@/components/auth/slider-profile';
import { useEffect, useState } from 'react';
import sliderProfiles from '@/data/slider';

type SliderElement = {
  component: JSX.Element;
  key: number;
};

const elements: SliderElement[] = [
  { component: <SliderIntro key={0} />, key: 0 },
  { component: <SliderProfile profileInfo={sliderProfiles['simon-borrero']} key={1} />, key: 1 },
  { component: <SliderProfile profileInfo={sliderProfiles['david-velez']} key={2} />, key: 2 },
];

const setIndex = (prevIndex: number) => {
  if (prevIndex === elements.length - 1) {
    return 0;
  }

  return prevIndex + 1;
};

export default function Slider() {
  const [showIndex, setShowIndex] = useState<number>(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setShowIndex((prev) => setIndex(prev));
    }, 15000);

    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <section className="hidden w-full flex-col items-center justify-center gap-4 bg-fsPurple lg:flex">
      <div className="hidden w-64 lg:block">
        <Logo />
      </div>
      <div className="grid h-1/2 w-full place-content-center px-16">
        {elements.map(({ component }, index) => {
          return (
            <div key={Math.random()} className={index === showIndex ? 'block' : 'hidden'}>
              {component}
            </div>
          );
        })}
      </div>

      <ul className="mt-8 flex gap-1">
        {elements.map(({ key }) => {
          return (
            <li
              key={key}
              onClick={() => setShowIndex(key)}
              className={`size-2 rounded-full ${key === showIndex ? 'bg-white' : 'bg-neutral-300'}`}
            />
          );
        })}
      </ul>
    </section>
  );
}
