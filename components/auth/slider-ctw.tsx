'use client';

import { useEffect, useState } from 'react';
import SliderItem1 from '@/public/images/ctw/slider/slider-item1.svg';
import SliderItem2 from '@/public/images/ctw/slider/slider-item2.svg';
import SliderItem3 from '@/public/images/ctw/slider/slider-item3.svg';
import Image from 'next/image';
import clsx from 'clsx';

const SliderItems = [SliderItem1, SliderItem2, SliderItem3];

const setIndex = (prevIndex: number) => {
  if (prevIndex === SliderItems.length - 1) {
    return 0;
  }

  return prevIndex + 1;
};

export default function SliderCTW() {
  const [showIndex, setShowIndex] = useState<number>(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setShowIndex((prev) => setIndex(prev));
    }, 15000);

    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <section className="">
      {SliderItems.map((item, index) => {
        return (
          <div key={index} className={clsx(index === showIndex ? 'block' : 'hidden', 'h-screen')}>
            <Image src={item} alt={`Slider item ${index + 1}`} className="h-screen w-full" />
          </div>
        );
      })}
    </section>
  );
}
