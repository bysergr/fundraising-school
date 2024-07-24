'use client';

import Image from 'next/image';
import { LegacyRef } from 'react';

import { StartupProfile } from '@/models/vc_list';
import { useAppStore } from '@/providers/app-store-providers';
import StartupsLinks from '@/components/startups_list/table_startups/startups-links';
import FavStartup from '@/components/startups_list/table_startups/fav-startup';

function InnerRowTableStartups({ startups_profile }: { startups_profile: StartupProfile }) {
  const { openStartupModal: openModal } = useAppStore((state) => state);

  const handleClick = () => {
    openModal(startups_profile.id);
  };

  return (
    <>
      <td className="flex w-60 justify-start gap-6">
        <Image
          className="size-[110px] cursor-pointer rounded-md bg-black object-cover"
          alt={`image of ${startups_profile.name}`}
          src={startups_profile.photo}
          width={64}
          height={64}
          onClick={handleClick}
        />
        <div className="my-auto w-fit">
          <p onClick={handleClick} className="cursor-pointer text-base font-semibold">
            {startups_profile.name}
          </p>
          <StartupsLinks startup_profile={startups_profile} />
        </div>
      </td>

      <FavStartup startup_id={startups_profile.id} favorite={startups_profile.favorite} />
      <td className="grid w-96 place-content-center">
        <p className="w-96 text-left text-sm  text-black">
          {startups_profile.description.length > 120
            ? startups_profile.description.substring(0, 115) + '...'
            : startups_profile.description}
        </p>
      </td>
      <td className="grid w-36 place-content-center">
        <p className="">{startups_profile.traction ? startups_profile.traction.name : 'None'}</p>
      </td>
      <td className="grid w-44 place-content-center">
        <p className="mx-0.5 mt-1 w-full rounded-sm bg-ctwLightGreen/35 px-2 py-1 text-center text-xs font-semibold text-ctwDarkGreen2">
          {startups_profile.round ? startups_profile.round.stage : 'None'}
        </p>
      </td>
    </>
  );
}

export default function RowTableStartups({
  startups_profile,
  refProp,
}: {
  startups_profile: StartupProfile;
  refProp?: LegacyRef<HTMLTableRowElement> | undefined;
}) {
  if (refProp) {
    return (
      <tr ref={refProp} className="my-4 ">
        <InnerRowTableStartups startups_profile={startups_profile} />
      </tr>
    );
  }

  return (
    <tr className="my-4 ">
      <InnerRowTableStartups startups_profile={startups_profile} />
    </tr>
  );
}
