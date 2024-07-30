import {
  IdentificationIcon,
  PresentationChartLineIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import React from 'react';

type Icon = 'identification' | 'presentation' | 'camera';

export default function TitleSection({
  nameSection,
  description,
  icon,
  children,
}: {
  nameSection: string;
  icon: Icon;
  description?: string;
  children?: JSX.Element;
}) {
  const iconMap: Record<Icon, JSX.Element> = {
    identification: <IdentificationIcon className="mr-2 size-8" />,
    presentation: <PresentationChartLineIcon className="mr-2 size-8" />,
    camera: <VideoCameraIcon className="mr-2 size-8" />,
  };

  return (
    <header className="flex h-24 w-full flex-col justify-center bg-[#F9F9FA] lg:bg-white lg:pl-3">
      <div className="flex items-center">
        {iconMap[icon]}
        <h2 className="text-2xl font-black text-darkFsGray">{nameSection}</h2>
        {children}
      </div>
      <p className="block font-normal ">{description}</p>
    </header>
  );
}
