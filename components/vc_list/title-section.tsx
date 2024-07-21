import {
  IdentificationIcon,
  PresentationChartLineIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

export default function TitleSection({
  nameSection,
  description,
}: {
  nameSection: string;
  description?: string;
}) {
  return (
    <header className="flex h-24 w-full flex-col justify-center bg-white pl-7">
      <div className="flex items-center">
        {nameSection === 'VC List' && <IdentificationIcon className="mr-2 size-8" />}
        {nameSection === 'Startups List' && <PresentationChartLineIcon className="mr-2 size-8" />}
        {nameSection === 'Course' && <VideoCameraIcon className="mr-2 size-8" />}
        <h2 className="text-2xl font-black text-darkFsGray ">{nameSection}</h2>
      </div>
      <p className="block font-normal ">{description}</p>
    </header>
  );
}
