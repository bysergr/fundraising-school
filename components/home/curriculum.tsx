'use client';

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import curriculumImage from '@/public/images/curriculum/curriculum.jpg';
import curriculumMovilImage from '@/public/images/curriculum/curriculum_movil.jpg';

interface CurriculumProps {
  srcImage: StaticImageData;
  height: number;
  width: number;
}

const curriculum: CurriculumProps = {
  srcImage: curriculumImage,
  height: 600,
  width: 869,
};

const curriculum_movil: CurriculumProps = {
  srcImage: curriculumMovilImage,
  height: 600,
  width: 800,
};

export default function Curriculum() {
  const [imageProps, setImageProps] = useState<CurriculumProps>(curriculum);

  useEffect(() => {
    function handlerResize() {
      const width = window.innerWidth;
      if (width <= 640) {
        setImageProps(curriculum_movil);
      } else {
        setImageProps(curriculum);
      }
    }

    handlerResize();
    window.addEventListener('resize', handlerResize);
    return () => window.removeEventListener('resize', handlerResize);
  }, []);

  return (
    <section id="curriculum" className="relative px-4 py-12 text-center sm:px-6 md:py-20">
      <div className="mx-auto max-w-4xl" data-aos="zoom-y-out">
        <h2 className="h2 mb-2" data-aos="zoom-y-out">
          Preliminary Curriculum{' '}
        </h2>
        <Image
          src={imageProps.srcImage}
          alt={'Image with the curriculum of fundraising school'}
          height={imageProps.height}
          width={imageProps.width}
          priority
        />
      </div>
    </section>
  );
}
